/**
 * Dragon Forge — Seed inicial
 * Uso: node db/seed.js  (ou chamado por init.js)
 */
'use strict';

require('dotenv').config();
const bcrypt = require('bcryptjs');

const STEP_LABELS = [
  { label: 'Pedido Confirmado',   detail: 'Pagamento aprovado. Produção agendada.' },
  { label: 'Em Produção',         detail: 'Lâmina sendo forjada e temperada.' },
  { label: 'Acabamento',          detail: 'Polimento, stonewash e montagem do cabo.' },
  { label: 'Controle de Qualidade', detail: 'Inspeção final de fio, acabamento e bainha.' },
  { label: 'Enviado',             detail: 'Postado nos Correios. Rastreio ativo.' },
  { label: 'Entregue',            detail: 'Produto entregue ao destinatário.' },
];

const PRODUCTS = [
  {
    name:'DF Hunter X', type:'Hunter', steel:'D2', handle:'Imbuia', finish:'Stonewash',
    price:890, status:'ready', length:'240mm', weight:'185g', thick:'4mm', hrc:'60-62',
    application:'Caça e atividades ao ar livre',
    description:'Ideal para caçadores exigentes. Lâmina robusta em D2 com cabo em imbuia envelhecida.',
    img_url:'https://whitehillsknives.com/cdn/shop/files/handmade-damascus-steel-hunting-knife-with-rose-wood-handle-skinner-130.webp?v=1686333208',
    specs:{ 'Tipo de Aço':'D2 Tool Steel','Material do Cabo':'Imbuia envelhecida','Comprimento':'240mm','Espessura':'4mm','Acabamento':'Stonewash','Dureza (HRC)':'60-62','Aplicação':'Caça e uso ao ar livre','Construção':'Full Tang' }
  },
  {
    name:'DF Bowie Prime', type:'Bowie', steel:'5160', handle:'Jacarandá', finish:'Satin',
    price:1250, status:'order', length:'300mm', weight:'280g', thick:'5mm', hrc:'57-59',
    application:'Coleção e uso geral em campo',
    description:'Clássica americana reinventada. Aço mola 5160 forjado com acabamento satin premium.',
    img_url:'https://whitehillsknives.com/cdn/shop/files/jim-bowie-hunting-knife-279.webp?v=1686290219',
    specs:{ 'Tipo de Aço':'Aço Mola 5160','Material do Cabo':'Jacarandá selecionado','Comprimento':'300mm','Espessura':'5mm','Acabamento':'Satin polido','Dureza (HRC)':'57-59','Aplicação':'Coleção e campo','Construção':'Full Tang' }
  },
  {
    name:'DF Chef Elite', type:'Chef', steel:'Inox 420', handle:'Micarta', finish:'Espelhado',
    price:780, status:'ready', length:'220mm', weight:'160g', thick:'3mm', hrc:'56-58',
    application:'Cozinha profissional e doméstica',
    description:'Precisão cirúrgica para a cozinha. Inox 420 polido em espelho com cabo micarta.',
    img_url:null,
    specs:{ 'Tipo de Aço':'Inox 420HC','Material do Cabo':'Micarta preta','Comprimento':'220mm','Espessura':'3mm','Acabamento':'Espelho','Dureza (HRC)':'56-58','Aplicação':'Cozinha profissional','Construção':'Full Tang' }
  },
  {
    name:'DF Bushcraft Inferno', type:'Bushcraft', steel:'1095', handle:'Nogueira', finish:'Fosco',
    price:690, status:'ready', length:'210mm', weight:'170g', thick:'4.5mm', hrc:'58-60',
    application:'Sobrevivência, camping e bushcraft',
    description:'Companheira perfeita para o campo. Carbono 1095 de alta resistência com cabo nogueira.',
    img_url:'https://whitehillsknives.com/cdn/shop/files/10-handmade-hunting-bushcraft-knife-forged-damascus-steel-survival-edc-walnut-handle-wh-3416-skinner-544.webp',
    specs:{ 'Tipo de Aço':'Carbono 1095','Material do Cabo':'Nogueira natural','Comprimento':'210mm','Espessura':'4.5mm','Acabamento':'Fosco acetinado','Dureza (HRC)':'58-60','Aplicação':'Bushcraft e sobrevivência','Construção':'Full Tang' }
  },
  {
    name:'DF Tactical Ember', type:'Tactical', steel:'Damascus', handle:'Resina híbrida', finish:'Stonewash',
    price:1890, status:'order', length:'260mm', weight:'240g', thick:'4mm', hrc:'62-64',
    application:'Coleção premium e uso tático',
    description:'A joia da Dragon Forge. Damascus forjado à mão com cabo em resina laranja/preto.',
    img_url:'https://whitehillsknives.com/cdn/shop/files/custom-handmade-forged-damascus-steel-hunting-bushcraft-survival-tracker-knife-199.webp',
    specs:{ 'Tipo de Aço':'Damascus forjado à mão','Material do Cabo':'Resina híbrida laranja/preto','Comprimento':'260mm','Espessura':'4mm','Acabamento':'Stonewash','Dureza (HRC)':'62-64','Aplicação':'Coleção premium e tático','Construção':'Full Tang' }
  },
];

const PROMOS = [
  { name:'DF Hunter X', description:'D2 + Imbuia envelhecida. Stonewash exclusivo.', price_old:890, price_now:712, discount:20, badge:'Pronta entrega', expires_at: new Date(Date.now() + 2*24*3600*1000) },
  { name:'DF Chef Elite', description:'Inox 420HC espelhado. Perfeita para presente.', price_old:780, price_now:624, discount:20, badge:'Últimas 3 unid.', expires_at: new Date(Date.now() + 5*24*3600*1000) },
  { name:'DF Bushcraft Inferno', description:'1095 + Nogueira. Sobrevivência premium.', price_old:690, price_now:518, discount:25, badge:'Estoque limitado', expires_at: new Date(Date.now() + 5*24*3600*1000) },
];

async function seed(pool) {
  // Admin
  const adminHash = await bcrypt.hash(process.env.ADMIN_PASS || 'Forja@2025', 12);
  await pool.query(`
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, 'admin')
    ON CONFLICT (email) DO NOTHING
  `, [
    process.env.ADMIN_NAME  || 'Rodrigo Barbosa',
    process.env.ADMIN_EMAIL || 'gestor@dragonforge.com.br',
    adminHash,
  ]);

  // Cliente demo
  const clientHash = await bcrypt.hash('Cliente@123', 12);
  const clientRes = await pool.query(`
    INSERT INTO users (name, email, password, role, phone)
    VALUES ('Carlos Mendes', 'carlos@email.com', $1, 'customer', '(11) 99999-0001')
    ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name
    RETURNING id
  `, [clientHash]);
  const clientId = clientRes.rows[0]?.id;

  // Produtos
  for (const p of PRODUCTS) {
    await pool.query(`
      INSERT INTO products (name,type,steel,handle,finish,price,status,length,weight,thick,hrc,application,description,img_url,specs)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      ON CONFLICT DO NOTHING
    `, [p.name,p.type,p.steel,p.handle,p.finish,p.price,p.status,p.length,p.weight,p.thick,p.hrc,p.application,p.description,p.img_url,JSON.stringify(p.specs)]);
  }

  // Promoções
  for (const pr of PROMOS) {
    await pool.query(`
      INSERT INTO promotions (name,description,price_old,price_now,discount,badge,expires_at,active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,true)
      ON CONFLICT DO NOTHING
    `, [pr.name,pr.description,pr.price_old,pr.price_now,pr.discount,pr.badge,pr.expires_at]);
  }

  // Pedidos de exemplo
  const sampleOrders = [
    { code:'DF001', tracking:'SQ123456789BR', client:'Carlos Mendes', email:'carlos@email.com', model:'DF Bowie Prime', steel:'5160', handle:'Jacarandá', finish:'Satin', amount:1250, method:'pix',    payment:'confirmed', status:'progress', step:1, uid: clientId },
    { code:'DF002', tracking:'SQ234567890BR', client:'Fernanda Lima',  email:'fernanda@email.com', model:'DF Chef Elite',  steel:'Inox 420', handle:'Micarta', finish:'Espelhado', amount:780, method:'credit', payment:'confirmed', status:'finishing', step:2, uid: null },
    { code:'DF003', tracking:'SQ345678901BR', client:'Marcos Teixeira',email:'marcos@email.com',   model:'DF Hunter X',    steel:'D2', handle:'Imbuia', finish:'Stonewash', amount:890, method:'bank',   payment:'confirmed', status:'shipped',   step:4, uid: null },
    { code:'DF004', tracking:'SQ456789012BR', client:'Ana Paula Costa',email:'ana@email.com',      model:'DF Bushcraft Inferno', steel:'1095', handle:'Nogueira', finish:'Fosco', amount:690, method:'pix', payment:'confirmed', status:'delivered', step:5, uid: null },
  ];

  for (const o of sampleOrders) {
    const res = await pool.query(`
      INSERT INTO orders (order_code,tracking_code,user_id,client_name,client_email,model,steel,handle,finish,amount,payment_method,payment_status,status,current_step)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      ON CONFLICT (order_code) DO NOTHING
      RETURNING id
    `, [o.code,o.tracking,o.uid,o.client,o.email,o.model,o.steel,o.handle,o.finish,o.amount,o.method,o.payment,o.status,o.step]);

    const orderId = res.rows[0]?.id;
    if (!orderId) continue;

    for (let i = 0; i < STEP_LABELS.length; i++) {
      const done = i <= o.step;
      await pool.query(`
        INSERT INTO order_steps (order_id, step_index, label, detail, done, done_at)
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT DO NOTHING
      `, [orderId, i, STEP_LABELS[i].label, STEP_LABELS[i].detail, done, done ? new Date() : null]);
    }
  }

  console.log('  ↳ Admin, cliente demo, 5 produtos, 3 promoções, 4 pedidos criados');
}

// Executar diretamente se chamado como script
if (require.main === module) {
  require('dotenv').config();
  const pool = require('./pool');
  seed(pool)
    .then(() => { console.log('✓ Seed concluído'); process.exit(0); })
    .catch(err => { console.error('❌', err.message); process.exit(1); });
}

module.exports = { seed };
