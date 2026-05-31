/**
 * Dragon Forge — Inicialização do banco
 * Uso: node db/init.js
 */
'use strict';

require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function init() {
  const pool = new Pool({
    host:     process.env.DB_HOST || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'dragon_forge',
    user:     process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS,
  });

  try {
    console.log('🔧 Inicializando schema...');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('✓ Schema criado com sucesso');

    console.log('🌱 Executando seed...');
    const { seed } = require('./seed');
    await seed(pool);
    console.log('✓ Dados iniciais inseridos');

  } catch (err) {
    console.error('❌ Erro na inicialização:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('✓ Conexão encerrada. Banco pronto!');
  }
}

init();
