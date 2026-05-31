/**
 * ╔══════════════════════════════════════════════════════╗
 *   Dragon Forge — Public API  v2.0
 *   Serve o site público (clientes)
 *   Porta padrão: 3001
 * ╚══════════════════════════════════════════════════════╝
 */
'use strict';

require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes   = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes  = require('./routes/orders');
const promoRoutes  = require('./routes/promotions');

const app  = express();
const PORT = parseInt(process.env.PORT) || 3001;

/* ── Segurança ────────────────────────────────────────── */
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

/* ── Rate limiting ────────────────────────────────────── */
app.use(rateLimit({ windowMs: 15*60*1000, max: 200, standardHeaders: true, legacyHeaders: false }));
app.use(express.json({ limit: '1mb' }));

/* ── Health ───────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({
  status: 'ok', service: 'Dragon Forge Public API', version: '2.0.0'
}));

/* ── Rotas públicas ───────────────────────────────────── */
app.use('/api/auth',       rateLimit({ windowMs:15*60*1000, max:20 }), authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/orders',     orderRoutes);
app.use('/api/promotions', promoRoutes);

/* ── 404 / Error ──────────────────────────────────────── */
app.use((_req, res) => res.status(404).json({ success:false, error:'Rota não encontrada.' }));
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ success:false, error:'Erro interno.' });
});

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║  🌐 Dragon Forge PUBLIC API  v2.0    ║');
  console.log(`  ║  http://localhost:${PORT}              ║`);
  console.log('  ╠══════════════════════════════════════╣');
  console.log('  ║  POST /api/auth/register             ║');
  console.log('  ║  POST /api/auth/login                ║');
  console.log('  ║  GET  /api/products                  ║');
  console.log('  ║  POST /api/orders/payment            ║');
  console.log('  ║  GET  /api/orders/track?code=...     ║');
  console.log('  ║  GET  /api/orders/my  (cliente)      ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
