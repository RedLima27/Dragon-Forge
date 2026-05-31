/**
 * Dragon Forge — Rotas de autenticação
 * POST /api/auth/register
 * POST /api/auth/login
 * POST /api/auth/refresh
 * POST /api/auth/logout
 * GET  /api/auth/me
 */
'use strict';

const express  = require('express');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');
const pool     = require('../db/pool');
const { authRequired, signAccess, signRefresh } = require('../middleware/auth');

const router = express.Router();

/* ── POST /register ─────────────────────────────────────────── */
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name?.trim() || !email?.trim() || !password)
    return res.status(400).json({ success: false, error: 'Nome, e-mail e senha são obrigatórios.' });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, error: 'E-mail inválido.' });

  if (password.length < 6)
    return res.status(400).json({ success: false, error: 'Senha deve ter ao menos 6 caracteres.' });

  try {
    const exists = await pool.query('SELECT id FROM users WHERE email=$1', [email.toLowerCase()]);
    if (exists.rows.length)
      return res.status(409).json({ success: false, error: 'E-mail já cadastrado.' });

    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, phone)
       VALUES ($1,$2,$3,'customer',$4) RETURNING id, name, email, role, created_at`,
      [name.trim(), email.toLowerCase(), hash, phone?.trim() || null]
    );

    const user = result.rows[0];
    const accessToken  = signAccess({ id: user.id, email: user.email, role: user.role, name: user.name });
    const refreshToken = signRefresh({ id: user.id });
    const expiresAt    = new Date(Date.now() + 30 * 24 * 3600 * 1000);

    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)',
      [user.id, refreshToken, expiresAt]
    );

    return res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('register error:', err.message);
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── POST /login ────────────────────────────────────────────── */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, error: 'E-mail e senha são obrigatórios.' });

  try {
    const result = await pool.query(
      'SELECT id, name, email, password, role FROM users WHERE email=$1',
      [email.toLowerCase()]
    );
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ success: false, error: 'Credenciais incorretas.' });

    const accessToken  = signAccess({ id: user.id, email: user.email, role: user.role, name: user.name });
    const refreshToken = signRefresh({ id: user.id });
    const expiresAt    = new Date(Date.now() + 30 * 24 * 3600 * 1000);

    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)',
      [user.id, refreshToken, expiresAt]
    );

    return res.json({
      success: true,
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('login error:', err.message);
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

/* ── POST /refresh ──────────────────────────────────────────── */
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ success: false, error: 'Refresh token não informado.' });

  try {
    const jwt = require('jsonwebtoken');
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET || 'dragon_forge_secret');

    const stored = await pool.query(
      'SELECT id FROM refresh_tokens WHERE token=$1 AND expires_at > NOW()',
      [refreshToken]
    );
    if (!stored.rows.length)
      return res.status(401).json({ success: false, error: 'Token inválido ou expirado.' });

    const userRes = await pool.query('SELECT id, name, email, role FROM users WHERE id=$1', [payload.id]);
    const user = userRes.rows[0];
    if (!user) return res.status(401).json({ success: false, error: 'Usuário não encontrado.' });

    const newAccess = signAccess({ id: user.id, email: user.email, role: user.role, name: user.name });

    return res.json({ success: true, accessToken: newAccess });
  } catch {
    return res.status(401).json({ success: false, error: 'Token inválido.' });
  }
});

/* ── POST /logout ───────────────────────────────────────────── */
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await pool.query('DELETE FROM refresh_tokens WHERE token=$1', [refreshToken]).catch(() => {});
  }
  return res.json({ success: true, message: 'Sessão encerrada.' });
});

/* ── GET /me ────────────────────────────────────────────────── */
router.get('/me', authRequired, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, phone, created_at FROM users WHERE id=$1',
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Erro interno.' });
  }
});

module.exports = router;
