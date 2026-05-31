/**
 * Dragon Forge — Pool de conexão PostgreSQL
 */
'use strict';

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'dragon_forge',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASS,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL pool error:', err.message);
});

// Testar conexão ao iniciar
pool.query('SELECT NOW()')
  .then(() => console.log('✓ PostgreSQL conectado'))
  .catch(err => {
    console.error('❌ Falha ao conectar ao PostgreSQL:', err.message);
    process.exit(1);
  });

module.exports = pool;
