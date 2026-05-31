/**
 * Dragon Forge — Rotas de produtos
 * GET    /api/products           — lista pública com filtros
 * GET    /api/products/:id       — detalhe público
 * POST   /api/products           — criar (admin)
 * PUT    /api/products/:id       — editar (admin)
 * DELETE /api/products/:id       — remover (admin)
 */
'use strict';

const express = require('express');
const pool    = require('../db/pool');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

/* ── GET /products ──────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const { type, status, min, max, search } = req.query;
    const conditions = ["p.status != 'inactive'"];
    const params = [];
    let i = 1;

    if (type)   { conditions.push(`p.type = $${i++}`);            params.push(type); }
    if (status) { conditions.push(`p.status = $${i++}`);          params.push(status); }
    if (min)    { conditions.push(`p.price >= $${i++}`);          params.push(Number(min)); }
    if (max)    { conditions.push(`p.price <= $${i++}`);          params.push(Number(max)); }
    if (search) { conditions.push(`p.name ILIKE $${i++}`);        params.push(`%${search}%`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    const sql = `SELECT * FROM products p ${where} ORDER BY p.id`;
    const result = await pool.query(sql, params);

    return res.json({ success: true, products: result.rows, total: result.rowCount });
  } catch (err) {
    console.error('GET /products:', err.message);
    return res.status(500).json({ success: false, error: 'Erro ao buscar produtos.' });
  }
});

/* ── GET /products/:id ──────────────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Produto não encontrado.' });
    return res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── POST /products ─────────────────────────────────────────── */
router.post('/', authRequired, adminOnly, async (req, res) => {
  const { name,type,steel,handle,finish,price,status,length,weight,thick,hrc,application,description,img_url,specs } = req.body;
  if (!name || !type || !steel || !handle || !finish || !price)
    return res.status(400).json({ success: false, error: 'Campos obrigatórios: name, type, steel, handle, finish, price.' });

  try {
    const result = await pool.query(`
      INSERT INTO products (name,type,steel,handle,finish,price,status,length,weight,thick,hrc,application,description,img_url,specs)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *
    `, [name,type,steel,handle,finish,Number(price),status||'order',length,weight,thick,hrc,application,description,img_url,JSON.stringify(specs||{})]);
    return res.status(201).json({ success: true, product: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro ao criar produto.' });
  }
});

/* ── PUT /products/:id ──────────────────────────────────────── */
router.put('/:id', authRequired, adminOnly, async (req, res) => {
  const fields = ['name','type','steel','handle','finish','price','status','length','weight','thick','hrc','application','description','img_url','specs'];
  const updates = [];
  const params  = [];
  let i = 1;

  for (const f of fields) {
    if (req.body[f] !== undefined) {
      updates.push(`${f}=$${i++}`);
      params.push(f === 'specs' ? JSON.stringify(req.body[f]) : req.body[f]);
    }
  }
  if (!updates.length) return res.status(400).json({ success: false, error: 'Nenhum campo para atualizar.' });

  params.push(req.params.id);
  try {
    const result = await pool.query(
      `UPDATE products SET ${updates.join(',')} WHERE id=$${i} RETURNING *`,
      params
    );
    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Produto não encontrado.' });
    return res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro ao atualizar produto.' });
  }
});

/* ── DELETE /products/:id ───────────────────────────────────── */
router.delete('/:id', authRequired, adminOnly, async (req, res) => {
  try {
    // Soft delete — marca como inativo
    const result = await pool.query(
      "UPDATE products SET status='inactive' WHERE id=$1 RETURNING id",
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Produto não encontrado.' });
    return res.json({ success: true, message: 'Produto desativado.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro ao remover produto.' });
  }
});

module.exports = router;
