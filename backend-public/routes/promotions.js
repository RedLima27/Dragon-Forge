/**
 * Dragon Forge — Promoções
 */
'use strict';

const express = require('express');
const pool    = require('../db/pool');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

/* ── GET /promotions ────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM promotions
      WHERE active = true AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY discount DESC
    `);
    return res.json({ success: true, promotions: result.rows });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── GET /promotions/all (admin) ────────────────────────────── */
router.get('/all', authRequired, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM promotions ORDER BY created_at DESC');
    return res.json({ success: true, promotions: result.rows });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── POST /promotions ───────────────────────────────────────── */
router.post('/', authRequired, adminOnly, async (req, res) => {
  const { name, description, price_old, price_now, discount, badge, expires_at } = req.body;
  if (!name || !price_old || !price_now || !discount)
    return res.status(400).json({ success: false, error: 'Campos obrigatórios: name, price_old, price_now, discount.' });
  try {
    const result = await pool.query(`
      INSERT INTO promotions (name,description,price_old,price_now,discount,badge,expires_at,active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,true) RETURNING *
    `, [name,description,price_old,price_now,discount,badge,expires_at||null]);
    return res.status(201).json({ success: true, promotion: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro ao criar promoção.' });
  }
});

/* ── PUT /promotions/:id ────────────────────────────────────── */
router.put('/:id', authRequired, adminOnly, async (req, res) => {
  const { name, description, price_old, price_now, discount, badge, expires_at, active } = req.body;
  try {
    const result = await pool.query(`
      UPDATE promotions SET
        name=COALESCE($1,name), description=COALESCE($2,description),
        price_old=COALESCE($3,price_old), price_now=COALESCE($4,price_now),
        discount=COALESCE($5,discount), badge=COALESCE($6,badge),
        expires_at=COALESCE($7,expires_at), active=COALESCE($8,active)
      WHERE id=$9 RETURNING *
    `, [name,description,price_old,price_now,discount,badge,expires_at,active,req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Promoção não encontrada.' });
    return res.json({ success: true, promotion: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro ao atualizar promoção.' });
  }
});

/* ── DELETE /promotions/:id ─────────────────────────────────── */
router.delete('/:id', authRequired, adminOnly, async (req, res) => {
  try {
    await pool.query('UPDATE promotions SET active=false WHERE id=$1', [req.params.id]);
    return res.json({ success: true, message: 'Promoção desativada.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

module.exports = router;
