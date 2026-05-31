/**
 * Dragon Forge — Rotas de pedidos
 * POST /api/orders/payment       — processar pagamento e criar pedido
 * GET  /api/orders/track         — rastrear por código (público)
 * GET  /api/orders/my            — meus pedidos (cliente autenticado)
 * GET  /api/orders               — listar todos (admin)
 * GET  /api/orders/:id           — detalhe (admin ou dono)
 * PUT  /api/orders/:id/status    — atualizar status (admin)
 */
'use strict';

const express = require('express');
const pool    = require('../db/pool');
const { authRequired, adminOnly, authOptional } = require('../middleware/auth');

const router = express.Router();

const STEP_LABELS = [
  { label:'Pedido Confirmado',       detail:'Pagamento aprovado. Produção agendada.' },
  { label:'Em Produção',             detail:'Lâmina sendo forjada e temperada.' },
  { label:'Acabamento',              detail:'Polimento, stonewash e montagem do cabo.' },
  { label:'Controle de Qualidade',   detail:'Inspeção final de fio, acabamento e bainha.' },
  { label:'Enviado',                 detail:'Postado nos Correios. Rastreio ativo.' },
  { label:'Entregue',               detail:'Produto entregue ao destinatário.' },
];

const STATUS_MAP = ['new','progress','finishing','quality','shipped','delivered'];

function generateTracking() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const p = letters[Math.floor(Math.random()*26)] + letters[Math.floor(Math.random()*26)];
  const n = String(Math.floor(100000000 + Math.random() * 900000000)).padStart(9,'0');
  return `${p}${n}BR`;
}

function generateOrderCode(existing) {
  let code;
  let attempts = 0;
  do {
    code = 'DF' + String(Math.floor(100 + Math.random() * 900)).padStart(3,'0');
    attempts++;
  } while (existing.has(code) && attempts < 100);
  return code;
}

/* ── POST /orders/payment ───────────────────────────────────── */
router.post('/payment', authOptional, async (req, res) => {
  const { paymentMethod, amount, model, steel, handle, finish, sheath, construction, client, email, deadline, notes } = req.body;

  if (!amount || !model || !paymentMethod)
    return res.status(400).json({ success: false, error: 'amount, model e paymentMethod são obrigatórios.' });

  if (!['pix','credit','bank'].includes(paymentMethod))
    return res.status(400).json({ success: false, error: 'Método de pagamento inválido.' });

  try {
    // Buscar códigos existentes para evitar colisão
    const existing = await pool.query('SELECT order_code FROM orders');
    const existingSet = new Set(existing.rows.map(r => r.order_code));

    const orderCode    = generateOrderCode(existingSet);
    const trackingCode = generateTracking();
    const pixKey       = paymentMethod === 'pix'
      ? [...Array(32)].map(() => Math.random().toString(36)[2]).join('').slice(0,32)
      : null;

    const clientName  = client || (req.user?.name) || 'Cliente Dragon Forge';
    const clientEmail = email  || (req.user?.email) || null;
    const userId      = req.user?.id || null;

    const deadlineDate = deadline ? new Date(deadline) : new Date(Date.now() + 45*24*3600*1000);

    const orderRes = await pool.query(`
      INSERT INTO orders
        (order_code, tracking_code, user_id, client_name, client_email,
         model, steel, handle, finish, sheath, construction,
         amount, payment_method, payment_status, status, current_step,
         deadline, notes, pix_key)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'confirmed','new',0,$14,$15,$16)
      RETURNING *
    `, [orderCode,trackingCode,userId,clientName,clientEmail,model,steel,handle,finish,sheath,construction,Number(amount),paymentMethod,deadlineDate,notes,pixKey]);

    const order = orderRes.rows[0];

    // Criar steps de timeline
    for (let i = 0; i < STEP_LABELS.length; i++) {
      await pool.query(`
        INSERT INTO order_steps (order_id, step_index, label, detail, done, done_at)
        VALUES ($1,$2,$3,$4,$5,$6)
      `, [order.id, i, STEP_LABELS[i].label, STEP_LABELS[i].detail, i===0, i===0 ? new Date() : null]);
    }

    return res.status(201).json({
      success: true,
      orderId:       order.order_code,
      trackingCode:  order.tracking_code,
      pixKey:        order.pix_key,
      paymentMethod: order.payment_method,
      amount:        order.amount,
      client:        order.client_name,
      createdAt:     new Date().toLocaleDateString('pt-BR'),
      deadline:      deadlineDate.toLocaleDateString('pt-BR'),
    });
  } catch (err) {
    console.error('POST /orders/payment:', err.message);
    return res.status(500).json({ success: false, error: 'Erro ao processar pagamento.' });
  }
});

/* ── GET /orders/track ──────────────────────────────────────── */
router.get('/track', async (req, res) => {
  const code = (req.query.code || '').trim();
  if (!code) return res.status(400).json({ success: false, error: 'Código não informado.' });

  try {
    const result = await pool.query(`
      SELECT o.*, 
        json_agg(s ORDER BY s.step_index) AS steps
      FROM orders o
      LEFT JOIN order_steps s ON s.order_id = o.id
      WHERE o.order_code = $1 OR o.tracking_code = $1
      GROUP BY o.id
    `, [code.toUpperCase()]);

    if (!result.rows.length)
      return res.status(404).json({ success: false, error: 'Pedido não encontrado.' });

    const o = result.rows[0];
    return res.json({
      success: true,
      orderId:       o.order_code,
      trackingCode:  o.tracking_code,
      model:         o.model,
      steel:         o.steel,
      handle:        o.handle,
      finish:        o.finish,
      client:        o.client_name,
      amount:        o.amount,
      deadline:      o.deadline ? new Date(o.deadline).toLocaleDateString('pt-BR') : null,
      created:       new Date(o.created_at).toLocaleDateString('pt-BR'),
      currentStep:   o.current_step,
      status:        o.status,
      steps:         o.steps,
    });
  } catch (err) {
    console.error('GET /orders/track:', err.message);
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── GET /orders/my ─────────────────────────────────────────── */
router.get('/my', authRequired, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*,
        json_agg(s ORDER BY s.step_index) AS steps
      FROM orders o
      LEFT JOIN order_steps s ON s.order_id = o.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.user.id]);

    return res.json({ success: true, orders: result.rows, total: result.rowCount });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── GET /orders (admin) ─────────────────────────────────────── */
router.get('/', authRequired, adminOnly, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const conditions = [];
    const params = [];
    let i = 1;

    if (status) { conditions.push(`o.status=$${i++}`); params.push(status); }
    if (search) {
      conditions.push(`(o.order_code ILIKE $${i} OR o.client_name ILIKE $${i} OR o.tracking_code ILIKE $${i})`);
      params.push(`%${search}%`); i++;
    }

    const where  = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    const offset = (Number(page) - 1) * Number(limit);

    const total  = await pool.query(`SELECT COUNT(*) FROM orders o ${where}`, params);
    const result = await pool.query(`
      SELECT o.* FROM orders o ${where}
      ORDER BY o.created_at DESC
      LIMIT $${i} OFFSET $${i+1}
    `, [...params, Number(limit), offset]);

    return res.json({
      success: true,
      orders:  result.rows,
      total:   Number(total.rows[0].count),
      page:    Number(page),
      pages:   Math.ceil(Number(total.rows[0].count) / Number(limit)),
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── GET /orders/:id (admin ou dono) ─────────────────────────── */
router.get('/:id', authRequired, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*,
        json_agg(s ORDER BY s.step_index) AS steps
      FROM orders o
      LEFT JOIN order_steps s ON s.order_id = o.id
      WHERE o.id=$1
      GROUP BY o.id
    `, [req.params.id]);

    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Pedido não encontrado.' });
    const order = result.rows[0];

    // Cliente só pode ver os próprios pedidos
    if (req.user.role !== 'admin' && order.user_id !== req.user.id)
      return res.status(403).json({ success: false, error: 'Acesso negado.' });

    return res.json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── PUT /orders/:id/status (admin) ─────────────────────────── */
router.put('/:id/status', authRequired, adminOnly, async (req, res) => {
  const { status } = req.body;
  if (!STATUS_MAP.includes(status))
    return res.status(400).json({ success: false, error: `Status inválido. Use: ${STATUS_MAP.join(', ')}` });

  const stepIndex = STATUS_MAP.indexOf(status);

  try {
    const result = await pool.query(`
      UPDATE orders SET status=$1, current_step=$2
      WHERE id=$3 RETURNING *
    `, [status, stepIndex, req.params.id]);

    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Pedido não encontrado.' });

    // Marcar steps como concluídos até o step atual
    await pool.query(`
      UPDATE order_steps SET done=true, done_at=NOW()
      WHERE order_id=$1 AND step_index <= $2
    `, [req.params.id, stepIndex]);

    await pool.query(`
      UPDATE order_steps SET done=false, done_at=NULL
      WHERE order_id=$1 AND step_index > $2
    `, [req.params.id, stepIndex]);

    return res.json({ success: true, order: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro ao atualizar status.' });
  }
});

module.exports = router;
