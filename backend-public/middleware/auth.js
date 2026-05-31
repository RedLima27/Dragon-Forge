/**
 * Dragon Forge — Middlewares de autenticação JWT
 */
'use strict';

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dragon_forge_secret';

/**
 * Verifica token JWT e popula req.user
 */
function authRequired(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token não informado.' });
  }
  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError' ? 'Token expirado.' : 'Token inválido.';
    return res.status(401).json({ success: false, error: msg });
  }
}

/**
 * Exige role admin
 */
function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Acesso restrito ao administrador.' });
  }
  next();
}

/**
 * Auth opcional — não bloqueia, só popula req.user se houver token válido
 */
function authOptional(req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try { req.user = jwt.verify(auth.slice(7), SECRET); } catch {}
  }
  next();
}

/**
 * Gera access token (curto prazo)
 */
function signAccess(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

/**
 * Gera refresh token (longo prazo)
 */
function signRefresh(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' });
}

module.exports = { authRequired, adminOnly, authOptional, signAccess, signRefresh };
