/* ============================================================
   DRAGON FORGE — script.js  v4.0  (site público)
   Auth JWT + Catálogo + Configurador + Rastreio + Área cliente
   ============================================================ */
'use strict';

const QR_PIX = 'data:image/png;base64,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';


const API = (typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:3001/api');

/* ── Escape / validação ──────────────────────────────────── */
function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validText(s, mn, mx) { const t = (s||'').trim(); return t.length >= mn && t.length <= mx; }
function formatCurrency(v) { return 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 }); }

/* ── Store ───────────────────────────────────────────────── */
const Store = {
  get(k, fb = null) { try { const v = localStorage.getItem('df_' + k); return v !== null ? JSON.parse(v) : fb; } catch { return fb; } },
  set(k, v) { try { localStorage.setItem('df_' + k, JSON.stringify(v)); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem('df_' + k); } catch {} },
};

/* ── Auth State ──────────────────────────────────────────── */
const Auth = {
  get token()   { return Store.get('access_token'); },
  get refresh() { return Store.get('refresh_token'); },
  get user()    { return Store.get('current_user'); },
  save(data) {
    Store.set('access_token',  data.accessToken);
    Store.set('refresh_token', data.refreshToken);
    Store.set('current_user',  data.user);
  },
  clear() { Store.del('access_token'); Store.del('refresh_token'); Store.del('current_user'); },
  isLoggedIn() { return !!this.token; },
};

/* ── API Client ──────────────────────────────────────────── */
const api = {
  async request(method, endpoint, body, retry = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (Auth.token) headers['Authorization'] = `Bearer ${Auth.token}`;
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method, headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.status === 401 && retry && Auth.refresh) {
        const ok = await this.tryRefresh();
        if (ok) return this.request(method, endpoint, body, false);
        Auth.clear(); updateNavbar();
        toast('Sessão expirada. Faça login novamente.', 'err');
        return null;
      }
      return res.json();
    } catch {
      // Silencioso — API offline, sistema usa dados locais
      return null;
    }
  },
  async tryRefresh() {
    try {
      const res = await fetch(`${API}/auth/refresh`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: Auth.refresh }),
      });
      const data = await res.json();
      if (data?.success) { Store.set('access_token', data.accessToken); return true; }
      return false;
    } catch { return false; }
  },
  get:    (ep)       => api.request('GET',    ep),
  post:   (ep, body) => api.request('POST',   ep, body),
  put:    (ep, body) => api.request('PUT',    ep, body),
  delete: (ep)       => api.request('DELETE', ep),
};

/* ── Toast ───────────────────────────────────────────────── */
function toast(msg, type = '') {
  const box = document.getElementById('toastBox');
  if (!box) return;
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; t.style.transition = 'all .28s';
    setTimeout(() => t.remove(), 300);
  }, 3200);
}

/* ── Modal ───────────────────────────────────────────────── */
function openModal(title, body, onOk, okLabel) {
  const ov = document.getElementById('modalOv');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  const btn = document.getElementById('modalOkBtn');
  btn.onclick = () => { if (onOk) onOk(); };
  btn.textContent = okLabel || 'Confirmar';
  ov.classList.add('open');
}
function closeModal() { document.getElementById('modalOv')?.classList.remove('open'); }
document.addEventListener('click', e => { if (e.target === document.getElementById('modalOv')) closeModal(); });

/* ── Routing ─────────────────────────────────────────────── */
function showPub(name) {
  document.querySelectorAll('.pub-sec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nl').forEach(n => n.classList.remove('active'));
  const sec = document.getElementById('pub-' + name);
  if (sec) sec.classList.add('active');
  document.querySelectorAll('.nl').forEach(n => {
    if ((n.getAttribute('onclick') || '').includes(`'${name}'`)) n.classList.add('active');
  });
  closeMob();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'my-orders') loadMyOrders();
}

function toggleMob() {
  document.getElementById('hamburger')?.classList.toggle('open');
  document.getElementById('mobMenu')?.classList.toggle('open');
}
function closeMob() {
  document.getElementById('hamburger')?.classList.remove('open');
  document.getElementById('mobMenu')?.classList.remove('open');
}

window.addEventListener('scroll', () => {
  document.getElementById('pubNav')?.classList.toggle('scrolled', window.scrollY > 38);
}, { passive: true });

/* ══ AUTH ════════════════════════════════════════════════════ */

function updateNavbar() {
  const user = Auth.user;
  document.querySelectorAll('.nav-logged-in').forEach(el  => el.style.display = user ? '' : 'none');
  document.querySelectorAll('.nav-logged-out').forEach(el => el.style.display = user ? 'none' : '');
  document.querySelectorAll('.nav-username').forEach(el   => el.textContent = user?.name?.split(' ')[0] || '');
}

function openLoginModal() {
  openModal('Entrar na minha conta', `
    <div id="custLoginError" class="login-err" style="display:none"></div>
    <div class="fg"><label>E-mail</label><input type="email" id="custLoginEmail" placeholder="seu@email.com" autocomplete="username"/></div>
    <div class="fg"><label>Senha</label><input type="password" id="custLoginPassword" placeholder="••••••••" autocomplete="current-password"/></div>
    <p style="text-align:center;margin-top:12px;color:var(--metal);font-size:.82rem">
      Não tem conta? <a onclick="closeModal();openRegisterModal()" style="color:var(--orange);cursor:pointer">Criar agora</a>
    </p>`, doCustomerLogin, 'Entrar');
  setTimeout(() => {
    document.getElementById('custLoginPassword')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') doCustomerLogin();
    });
  }, 100);
}

function openRegisterModal() {
  openModal('Criar conta', `
    <div id="regError" class="login-err" style="display:none"></div>
    <div class="fg"><label>Nome completo</label><input type="text" id="regName" placeholder="Seu nome"/></div>
    <div class="fg"><label>E-mail</label><input type="email" id="regEmail" placeholder="seu@email.com"/></div>
    <div class="fg"><label>Senha</label><input type="password" id="regPassword" placeholder="Mínimo 6 caracteres"/></div>
    <p style="text-align:center;margin-top:12px;color:var(--metal);font-size:.82rem">
      Já tem conta? <a onclick="closeModal();openLoginModal()" style="color:var(--orange);cursor:pointer">Fazer login</a>
    </p>`, doRegister, 'Criar conta');
}

function showErr(el, msg) { if (!el) return; el.textContent = msg; el.style.display = 'block'; }

async function doCustomerLogin() {
  const email = document.getElementById('custLoginEmail')?.value.trim() || '';
  const pass  = document.getElementById('custLoginPassword')?.value || '';
  const errEl = document.getElementById('custLoginError');
  if (!validEmail(email)) { showErr(errEl, 'E-mail inválido.'); return; }
  if (!pass)              { showErr(errEl, 'Digite sua senha.'); return; }
  const btn = document.getElementById('custLoginBtn');
  if (btn) { btn.textContent = 'Entrando...'; btn.disabled = true; }
  const data = await api.post('/auth/login', { email, password: pass });
  if (btn) { btn.textContent = 'Entrar'; btn.disabled = false; }
  if (!data?.success) { showErr(errEl, data?.error || 'Credenciais incorretas.'); return; }
  if (data.user.role === 'admin') {
    window.location.href = '../admin/index.html';
    return;
  }
  Auth.save(data);
  updateNavbar();
  closeModal();
  toast('Bem-vindo(a), ' + data.user.name.split(' ')[0] + '!', 'ok');
  showPub('my-orders');
}

async function doRegister() {
  const name  = document.getElementById('regName')?.value.trim() || '';
  const email = document.getElementById('regEmail')?.value.trim() || '';
  const pass  = document.getElementById('regPassword')?.value || '';
  const errEl = document.getElementById('regError');
  if (!validText(name, 2, 120)) { showErr(errEl, 'Nome inválido.'); return; }
  if (!validEmail(email))       { showErr(errEl, 'E-mail inválido.'); return; }
  if (pass.length < 6)          { showErr(errEl, 'Senha mínimo 6 caracteres.'); return; }
  const btn = document.getElementById('regBtn');
  if (btn) { btn.textContent = 'Criando conta...'; btn.disabled = true; }
  const data = await api.post('/auth/register', { name, email, password: pass });
  if (btn) { btn.textContent = 'Criar conta'; btn.disabled = false; }
  if (!data?.success) { showErr(errEl, data?.error || 'Erro ao criar conta.'); return; }
  Auth.save(data);
  updateNavbar();
  closeModal();
  toast('Conta criada! Bem-vindo(a), ' + name.split(' ')[0] + '!', 'ok');
  showPub('my-orders');
}

async function doLogout() {
  await api.post('/auth/logout', { refreshToken: Auth.refresh });
  Auth.clear();
  updateNavbar();
  showPub('home');
  toast('Sessão encerrada.', '');
}

/* ══ CATALOG ═════════════════════════════════════════════════ */

const PRODUCTS_LOCAL = [
  { id:1, name:'DF Hunter X',          type:'Hunter',    img_url:'https://whitehillsknives.com/cdn/shop/files/handmade-damascus-steel-hunting-knife-with-rose-wood-handle-skinner-130.webp?v=1686333208', steel:'D2',       handle:'Imbuia',        finish:'Stonewash', price:890,  status:'ready', length:'240mm', weight:'185g', thick:'4mm',  hrc:'60-62', description:'Ideal para caçadores exigentes. Lâmina robusta em D2 com cabo em imbuia envelhecida.' },
  { id:2, name:'DF Bowie Prime',        type:'Bowie',     img_url:'https://whitehillsknives.com/cdn/shop/files/jim-bowie-hunting-knife-279.webp?v=1686290219',                                           steel:'5160',     handle:'Jacarandá',     finish:'Satin',     price:1250, status:'order', length:'300mm', weight:'280g', thick:'5mm',  hrc:'57-59', description:'Clássica americana reinventada. Aço mola 5160 forjado com acabamento satin premium.' },
  { id:3, name:'DF Chef Elite',         type:'Chef',      img_url:null,                                                                                                                                   steel:'Inox 420', handle:'Micarta',       finish:'Espelhado', price:780,  status:'ready', length:'220mm', weight:'160g', thick:'3mm',  hrc:'56-58', description:'Precisão cirúrgica para a cozinha. Inox 420 polido em espelho com cabo micarta.' },
  { id:4, name:'DF Bushcraft Inferno',  type:'Bushcraft', img_url:'https://whitehillsknives.com/cdn/shop/files/10-handmade-hunting-bushcraft-knife-forged-damascus-steel-survival-edc-walnut-handle-wh-3416-skinner-544.webp', steel:'1095', handle:'Nogueira', finish:'Fosco', price:690, status:'ready', length:'210mm', weight:'170g', thick:'4.5mm', hrc:'58-60', description:'Companheira perfeita para o campo. Carbono 1095 de alta resistência com cabo nogueira.' },
  { id:5, name:'DF Tactical Ember',     type:'Tactical',  img_url:'https://whitehillsknives.com/cdn/shop/files/custom-handmade-forged-damascus-steel-hunting-bushcraft-survival-tracker-knife-199.webp', steel:'Damascus', handle:'Resina híbrida', finish:'Stonewash', price:1890, status:'order', length:'260mm', weight:'240g', thick:'4mm',  hrc:'62-64', description:'A joia da Dragon Forge. Damascus forjado à mão com cabo em resina laranja/preto.' },
];
let PRODUCTS = [...PRODUCTS_LOCAL];

async function initCatalog() {
  const data = await api.get('/products');
  if (data?.success && data.products.length) PRODUCTS = data.products;
  renderCatalog();
}

function renderCatalog() {
  const tf = document.getElementById('filterType')?.value  || 'all';
  const pf = parseInt(document.getElementById('filterPrice')?.value || '9999');
  const af = document.getElementById('filterAvail')?.value || 'all';
  const filtered = PRODUCTS.filter(p => {
    if (tf !== 'all' && p.type !== tf) return false;
    if (p.price > pf) return false;
    if (af !== 'all' && p.status !== af) return false;
    return true;
  });
  const g = document.getElementById('prodGrid');
  if (!g) return;
  if (!filtered.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--metal)"><div style="font-size:2.8rem;margin-bottom:14px">—</div><div style="font-family:'Cinzel',serif;margin-bottom:7px">Nenhuma faca encontrada</div><div style="font-size:.86rem">Ajuste os filtros acima.</div></div>`;
    return;
  }
  g.innerHTML = filtered.map(p => `
    <div class="prod-card">
      <div class="prod-img">
        <img src="${esc(p.img_url || '')}" alt="${esc(p.name)}" loading="lazy"/>
        <div class="prod-img-overlay">
          <button class="btn btn-secondary btn-sm" onclick="openProdModal(${p.id})" style="font-size:.72rem">Ver Detalhes</button>
          <button class="btn btn-primary btn-sm" onclick="requestQuote('${esc(p.name)}')" style="font-size:.72rem">Orçamento</button>
        </div>
        <div class="prod-stag">${p.status === 'ready' ? '<span style="background:rgba(76,175,125,.2);color:#4caf7d;padding:3px 8px;font-size:.68rem;font-weight:600;letter-spacing:.05em">● PRONTA</span>' : '<span style="background:rgba(255,106,0,.15);color:var(--orange);padding:3px 8px;font-size:.68rem;font-weight:600;letter-spacing:.05em">● ENCOMENDA</span>'}</div>
      </div>
      <div class="prod-body">
        <div class="prod-type-tag">${esc(p.type)}</div>
        <div class="prod-name">${esc(p.name)}</div>
        <div class="prod-specs">
          <div class="prod-spec"><span>Aço</span><strong>${esc(p.steel)}</strong></div>
          <div class="prod-spec"><span>Cabo</span><strong>${esc(p.handle)}</strong></div>
          <div class="prod-spec"><span>Lâmina</span><strong>${esc(p.length || '—')} · ${esc(p.thick || '—')}</strong></div>
          <div class="prod-spec"><span>Dureza</span><strong>${esc(p.hrc || '—')} HRC</strong></div>
        </div>
        <p class="prod-desc">${esc(p.description || '')}</p>
        <div class="prod-foot">
          <div>
            <div class="prod-price">${formatCurrency(p.price)}</div>
            <div class="prod-price-sub">${p.status === 'ready' ? 'Pronta entrega' : 'Sob encomenda'}</div>
          </div>
          <div style="display:grid;gap:8px">
            <button class="btn btn-secondary btn-sm" onclick="openProdModal(${p.id})">Detalhes</button>
            <button class="btn btn-primary btn-sm" onclick="openPaymentForProduct(${p.id})">Pagar agora</button>
          </div>
        </div>
      </div>
    </div>`).join('');
  setTimeout(setupImgFallbacks, 200);
}

function openProdModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const specsObj = typeof p.specs === 'string' ? JSON.parse(p.specs || '{}') : (p.specs || {});
  const specsHtml = Object.entries(specsObj).map(([k, v]) => `<div class="spec-item"><div class="spec-key">${esc(k)}</div><div class="spec-val">${esc(v)}</div></div>`).join('');
  openModal(p.name, `
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      ${p.img_url ? `<img src="${esc(p.img_url)}" alt="${esc(p.name)}" style="width:100%;max-width:240px;border-radius:8px;object-fit:cover;background:var(--graphite2)"/>` : ''}
      <div style="flex:1;min-width:200px">
        <p style="color:var(--metal);margin-bottom:12px">${esc(p.description || '')}</p>
        ${specsHtml ? `<div class="specs-grid">${specsHtml}</div>` : ''}
        <div style="margin-top:14px;font-size:1.4rem;font-weight:700;color:var(--orange)">${formatCurrency(p.price)}</div>
        <div style="font-size:.8rem;color:var(--metal)">${p.status === 'ready' ? '✓ Pronta entrega' : 'Sob encomenda'}</div>
      </div>
    </div>`, () => openPaymentForProduct(p.id), 'Comprar agora');
}

function requestQuote(name) { openWA(`Olá! Gostaria de um orçamento para a faca ${name}.`); }

/* ══ CONFIGURADOR ════════════════════════════════════════════ */

const CFG = {
  model:        [{ label:'Chef', img: typeof MAT_IMGS !== 'undefined' ? MAT_IMGS.faca_chef : '', extra:0, days:0 },{ label:'Bowie', img:'https://whitehillsknives.com/cdn/shop/files/jim-bowie-hunting-knife-279.webp?v=1686290219', extra:50, days:5 },{ label:'Bushcraft', img:'https://whitehillsknives.com/cdn/shop/files/10-handmade-hunting-bushcraft-knife-forged-damascus-steel-survival-edc-walnut-handle-wh-3416-skinner-544.webp', extra:30, days:3 },{ label:'Churrasco', img:'https://whitehillsknives.com/cdn/shop/files/handmade-damascus-steel-hunting-knife-with-rose-wood-handle-skinner-130.webp?v=1686333208', extra:20, days:2 },{ label:'Tactical', img:'https://whitehillsknives.com/cdn/shop/files/custom-handmade-forged-damascus-steel-hunting-bushcraft-survival-tracker-knife-199.webp', extra:80, days:7 }],
  construction: [{ label:'Full Tang', extra:0, days:0 },{ label:'Hidden Tang', extra:30, days:3 },{ label:'Em Talas', extra:20, days:2 }],
  steel:        [{ label:'1070', extra:0, days:0 },{ label:'5160', extra:50, days:3 },{ label:'D2', extra:120, days:5 },{ label:'Inox 420', extra:40, days:2 },{ label:'Damascus', extra:350, days:10 }],
  handle:       [{ label:'Imbuia', extra:0, days:0 },{ label:'Jacarandá', extra:80, days:3 },{ label:'Nogueira', extra:50, days:2 },{ label:'Micarta', extra:30, days:1 },{ label:'Resina híbrida', extra:60, days:3 }],
  finish:       [{ label:'Fosco', extra:0, days:0 },{ label:'Espelhado', extra:60, days:4 },{ label:'Stonewash', extra:40, days:2 },{ label:'Satin', extra:50, days:3 }],
  sheath:       [{ label:'Sem bainha', extra:0, days:0 },{ label:'Couro', extra:90, days:5 },{ label:'Kydex', extra:70, days:4 }],
};
const cfgState = { model:null, construction:null, steel:null, handle:null, finish:null, sheath:null };

function getSettings() { return Store.get('settings', { basePrice: 450, deadline: 45 }); }

function buildCfg() {
  const ids = { model:'cfgModel', construction:'cfgConstruction', steel:'cfgSteel', handle:'cfgHandle', finish:'cfgFinish', sheath:'cfgSheath' };
  Object.entries(ids).forEach(([k, elId]) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = CFG[k].map(opt =>
      `<div class="cfg-opt" onclick="selectOpt('${k}','${esc(opt.label)}')">${esc(opt.label)}${opt.extra ? `<span class="cfg-extra">+R$${opt.extra}</span>` : ''}</div>`
    ).join('');
  });
  updateCfgSummary();
}

function selectOpt(key, val) {
  cfgState[key] = val;
  const elId = { model:'cfgModel', construction:'cfgConstruction', steel:'cfgSteel', handle:'cfgHandle', finish:'cfgFinish', sheath:'cfgSheath' }[key];
  document.querySelectorAll(`#${elId} .cfg-opt`).forEach(el => {
    el.classList.toggle('sel', el.textContent.startsWith(val));
  });
  if (key === 'model') {
    const opt = CFG.model.find(o => o.label === val);
    const preview = document.getElementById('cfgPreviewImg');
    if (preview && opt?.img) { preview.src = opt.img; preview.style.opacity = '1'; }
  }
  updateCfgSummary();
}

function updateCfgSummary() {
  const s = getSettings();
  let price = s.basePrice, days = s.deadline;
  Object.keys(cfgState).forEach(k => {
    const opt = CFG[k]?.find(o => o.label === cfgState[k]);
    if (opt) { price += opt.extra; days += opt.days; }
  });
  const pEl = document.getElementById('cfgPrice');
  if (pEl) animNum(pEl, parseInt(pEl.textContent.replace(/\D/g,'')) || s.basePrice, price, 380);
  const dEl = document.getElementById('cfgDeadline');
  if (dEl) dEl.textContent = days + ' dias';
  const sums = { model:'sumModel', construction:'sumConstr', steel:'sumSteel', handle:'sumHandle', finish:'sumFinish', sheath:'sumSheath' };
  Object.entries(sums).forEach(([k, id]) => { const el = document.getElementById(id); if (el) el.textContent = cfgState[k] || '—'; });
  const nEl = document.getElementById('cfgName');
  if (nEl) { const parts = []; if (cfgState.model) parts.push(cfgState.model); if (cfgState.steel) parts.push(cfgState.steel); nEl.textContent = parts.length ? 'DF ' + parts.join(' · ') : 'Dragon Forge Custom'; }
}

function animNum(el, from, to, dur) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = 'R$ ' + Math.round(from + (to - from) * e).toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function requestOrder() { openPaymentForConfig(); }

/* ══ PAYMENT ═════════════════════════════════════════════════ */

const PAYMENT_METHODS = [
  { id:'pix',    label:'PIX',                   desc:'Pagamento instantâneo com 5% de desconto.', icon:'⚡' },
  { id:'credit', label:'Cartão de crédito',      desc:'Parcelamento em até 12x.',                  icon:'💳' },
  { id:'bank',   label:'Boleto / Transferência', desc:'Confirmação em até 24h.',                   icon:'🏦' },
];

function openPaymentForProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) { toast('Produto não encontrado.', 'err'); return; }
  openPayment({
    title: `Pagamento — ${p.name}`,
    model: p.name, amount: p.price,
    summary: `${p.type} · ${p.steel} · Cabo ${p.handle}`,
    steel: p.steel, handle: p.handle, finish: p.finish,
    details: [`Modelo: ${p.name}`, `Aço: ${p.steel}`, `Cabo: ${p.handle}`, `Acabamento: ${p.finish}`, `Valor: ${formatCurrency(p.price)}`],
    deadline: '30 dias',
    client: Auth.user?.name || 'Cliente Dragon Forge',
  });
}

function openPaymentForConfig() {
  const req = ['model', 'construction', 'steel', 'handle'];
  const missing = req.filter(k => !cfgState[k]);
  if (missing.length) { const labels = { model:'Modelo', construction:'Construção', steel:'Aço', handle:'Cabo' }; toast('Selecione: ' + missing.map(k => labels[k]).join(', '), 'err'); return; }
  const s = getSettings(); let price = s.basePrice, days = s.deadline;
  Object.keys(cfgState).forEach(k => { const o = CFG[k]?.find(x => x.label === cfgState[k]); if (o) { price += o.extra; days += o.days; } });
  openPayment({
    title: 'Pagamento — Faca personalizada',
    model: `DF ${cfgState.model} Custom`, amount: price,
    summary: `${cfgState.model} · ${cfgState.steel} · Cabo ${cfgState.handle}`,
    steel: cfgState.steel, handle: cfgState.handle, finish: cfgState.finish,
    construction: cfgState.construction, sheath: cfgState.sheath,
    details: [`Modelo: ${cfgState.model}`, `Construção: ${cfgState.construction}`, `Aço: ${cfgState.steel}`, `Cabo: ${cfgState.handle}`, `Acabamento: ${cfgState.finish || 'Padrão'}`, `Bainha: ${cfgState.sheath || 'Sem bainha'}`, `Valor: ${formatCurrency(price)}`, `Prazo: ${days} dias`],
    deadline: `${days} dias`,
    client: Auth.user?.name || 'Cliente Dragon Forge',
  });
}

function openPayment(data) {
  const methodRows = PAYMENT_METHODS.map((m, i) => `
    <div class="payment-method-card" onclick="selectPaymentMethod('${esc(m.id)}',this)">
      <div class="payment-method-select"><input type="radio" name="payMethod" value="${esc(m.id)}" ${i === 0 ? 'checked' : ''}></div>
      <div class="payment-method-icon">${esc(m.icon)}</div>
      <div class="payment-method-content">
        <div class="payment-method-title">${esc(m.label)}</div>
        <div class="payment-method-desc">${esc(m.desc)}</div>
      </div>
    </div>`).join('');
  const detailsHtml = (data.details || []).map(line => `<div class="payment-detail-row">${esc(line)}</div>`).join('');
  openModal(data.title, `
    <div class="payment-box">
      <div class="payment-summary-card">
        <div class="payment-summary-title">Resumo do pedido</div>
        <div class="payment-summary-text">${esc(data.summary)}</div>
        <div class="payment-summary-total">${formatCurrency(data.amount)}</div>
      </div>
      <div class="payment-details-card">${detailsHtml}</div>
      <div class="payment-methods-grid">${methodRows}</div>
      <div id="payment-form-area"></div>
      <div class="payment-help">Após confirmar, você receberá um código de rastreio válido.</div>
    </div>`, () => {
      const sel = document.querySelector('input[name="payMethod"]:checked');
      if (!sel) { toast('Selecione a forma de pagamento.', 'err'); return; }
      processPayment(data, sel.value);
    }, 'Confirmar pagamento');
  setTimeout(() => selectPaymentMethod('pix'), 300);
}

function selectPaymentMethod(method, el) {
  document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('sel'));
  if (el) el.classList.add('sel');
  const radio = document.querySelector(`input[name="payMethod"][value="${method}"]`);
  if (radio) radio.checked = true;
  const formArea = document.getElementById('payment-form-area');
  if (!formArea) return;
  if (method === 'pix') {
    formArea.innerHTML = `
      <div class="payment-pix-box">
        <div class="payment-pix-title">Escaneie o QR Code PIX</div>
        <div style="display:flex;justify-content:center;margin:14px 0">
          <div style="border-radius:16px;overflow:hidden;box-shadow:0 0 0 2px rgba(255,106,0,.4),0 8px 32px rgba(0,0,0,.6);display:inline-block">
            <img src="${QR_PIX}" alt="QR Code PIX" style="width:160px;height:160px;display:block"/>
          </div>
        </div>
        <div class="payment-pix-key" style="text-align:center;margin-top:4px">
          <strong>Chave PIX:</strong> pagamentos@dragonforge.com.br
        </div>
        <div class="payment-pix-hint" style="text-align:center;margin-top:5px;font-size:.78rem;color:var(--metal)">
          Escaneie o QR ou copie a chave no seu banco
        </div>
      </div>`;
  } else if (method === 'credit') {
    formArea.innerHTML = `<div class="payment-card-form"><div class="form-group"><label>Número do cartão</label><input type="text" placeholder="0000 0000 0000 0000" maxlength="19"></div><div class="form-row"><div class="form-group"><label>Validade</label><input type="text" placeholder="MM/AA" maxlength="5"></div><div class="form-group"><label>CVV</label><input type="text" placeholder="000" maxlength="3"></div></div><div class="form-group"><label>Nome no cartão</label><input type="text" placeholder="NOME SOBRENOME"></div></div>`;
  } else {
    formArea.innerHTML = `<div class="payment-bank-box"><div class="payment-bank-info"><strong>Boleto ou Transferência</strong></div><div class="payment-bank-data"><div>Banco: Dragon Forge Pagamentos</div><div>Agência: 0001 · Conta: 123456-7</div><div>Chave PIX: pagamentos@dragonforge.com.br</div></div><div class="payment-bank-hint">Confirmação em até 24h após o pagamento</div></div>`;
  }
}

async function processPayment(data, methodId) {
  closeModal();
  toast('Processando pagamento...', '');
  const result = await api.post('/orders/payment', {
    paymentMethod: methodId,
    amount: data.amount, model: data.model,
    steel: data.steel, handle: data.handle, finish: data.finish,
    construction: data.construction, sheath: data.sheath,
    client: data.client, email: Auth.user?.email || '',
    deadline: data.deadline,
  }) || {
    success: true,
    orderId: 'DF' + Math.floor(100 + Math.random() * 900),
    trackingCode: (() => { const l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; return l[Math.floor(Math.random()*26)] + l[Math.floor(Math.random()*26)] + String(Math.floor(100000000 + Math.random() * 900000000)) + 'BR'; })(),
    paymentMethod: methodId, amount: data.amount,
    client: data.client,
    createdAt: new Date().toLocaleDateString('pt-BR'),
    deadline: data.deadline, _offline: true,
  };
  toast('Pagamento confirmado!', 'ok');
  setTimeout(() => openReceipt({ ...result, details: data.details, value: formatCurrency(data.amount) }), 600);
  if (Auth.isLoggedIn()) setTimeout(() => loadMyOrders(), 2000);
}

function openReceipt(r) {
  const detailsHtml = (r.details || []).map(line => `<div class="receipt-row"><span>${esc((line.split(':')[0] || '').trim())}</span><strong>${esc((line.split(':').slice(1).join(':') || '').trim())}</strong></div>`).join('');
  openModal('✓ Pagamento Confirmado', `
    <div class="receipt-card">
      <div class="receipt-head">Recibo #${esc(r.orderId)}</div>
      ${r._offline ? '<div style="background:rgba(255,106,0,.08);border:1px solid rgba(255,106,0,.2);border-radius:6px;padding:8px 12px;margin-bottom:10px;font-size:.8rem;color:var(--metal)">⚠️ Modo offline — conecte o servidor para salvar</div>' : ''}
      <div class="receipt-code-box">
        <div class="receipt-code-label">Código de Rastreio</div>
        <div class="receipt-code-value" onclick="copyToClipboard(this.textContent)" style="cursor:pointer" title="Clique para copiar">${esc(r.trackingCode)}</div>
        <div class="receipt-code-hint">Use em "Rastrear Pedido" para acompanhar</div>
      </div>
      <div class="receipt-grid">
        <div><span>Pedido</span><strong>${esc(r.orderId)}</strong></div>
        <div><span>Cliente</span><strong>${esc(r.client)}</strong></div>
        <div><span>Valor</span><strong>${esc(r.value || formatCurrency(r.amount))}</strong></div>
        <div><span>Pagamento</span><strong>${esc(r.paymentMethod)}</strong></div>
        <div><span>Prazo</span><strong>${esc(r.deadline || '—')}</strong></div>
        <div><span>Data</span><strong>${esc(r.createdAt || new Date().toLocaleDateString('pt-BR'))}</strong></div>
      </div>
      <div class="receipt-divider"></div>
      <div class="receipt-detail-list">${detailsHtml}</div>
    </div>`, () => {}, 'Fechar');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => toast('Código copiado!', 'ok'))
    .catch(() => toast(text, 'ok'));
}

/* ══ TRACKING ════════════════════════════════════════════════ */

async function doTrack() {
  const code   = (document.getElementById('trackInput')?.value || '').trim().toUpperCase();
  const result = document.getElementById('trackResult');
  if (!code) { toast('Digite o código do pedido ou de rastreio.', 'err'); return; }
  if (result) result.innerHTML = '<div style="text-align:center;padding:30px;color:var(--metal)">Consultando...</div>';
  const data = await api.get(`/orders/track?code=${encodeURIComponent(code)}`);
  if (!data?.success) {
    if (result) result.innerHTML = `<div class="track-notfound"><div class="track-nf-icon">—</div><div class="track-nf-txt">Pedido <strong>${esc(code)}</strong> não encontrado.</div><div class="track-nf-hint">Verifique o código e tente novamente.</div></div>`;
    return;
  }
  const steps    = Array.isArray(data.steps) ? data.steps : [];
  const progress = steps.length ? Math.round(steps.filter(s => s.done).length / steps.length * 100) : 0;
  if (result) result.innerHTML = `
    <div class="track-box">
      <div class="track-header">
        <div class="track-order-id">Pedido ${esc(data.orderId)}</div>
        <div class="track-tracking-badge" onclick="copyToClipboard('${esc(data.trackingCode)}')" title="Clique para copiar">📬 ${esc(data.trackingCode)}</div>
      </div>
      <div class="track-info-grid">
        <div><span>Modelo</span><strong>${esc(data.model || '—')}</strong></div>
        <div><span>Aço</span><strong>${esc(data.steel || '—')}</strong></div>
        <div><span>Cabo</span><strong>${esc(data.handle || '—')}</strong></div>
        <div><span>Prazo</span><strong>${esc(data.deadline || '—')}</strong></div>
      </div>
      <div class="track-progress-wrap">
        <div class="track-progress-bar"><div class="track-progress-fill" style="width:${progress}%"></div></div>
        <span class="track-pct">${progress}% concluído</span>
      </div>
      <div class="track-timeline">
        ${steps.map(s => `
          <div class="track-step ${s.done ? 'done' : ''}">
            <div class="step-dot"></div>
            <div class="step-content">
              <div class="step-title">${esc(s.label)}</div>
              <div class="step-desc">${esc(s.detail || '')}</div>
              ${s.done_at ? `<div class="step-date">${new Date(s.done_at).toLocaleDateString('pt-BR')}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function preloadTracking(code) {
  const inp = document.getElementById('trackInput');
  if (inp) { inp.value = code; doTrack(); }
}

/* ══ MEUS PEDIDOS ════════════════════════════════════════════ */

async function loadMyOrders() {
  const el = document.getElementById('myOrdersContent');
  if (!el) return;
  if (!Auth.isLoggedIn()) {
    el.innerHTML = `
      <div style="text-align:center;padding:60px 20px">
        <div style="font-size:3rem;margin-bottom:16px">🔐</div>
        <div style="font-family:'Cinzel',serif;font-size:1.1rem;margin-bottom:8px">Faça login para ver seus pedidos</div>
        <p style="color:var(--metal);margin-bottom:20px">Acompanhe o status e rastreio de cada encomenda.</p>
        <button class="btn btn-primary" onclick="openLoginModal()">Entrar / Criar conta</button>
      </div>`;
    return;
  }
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--metal)">Carregando pedidos...</div>';
  const data = await api.get('/orders/my');
  if (!data?.success || !data.orders.length) {
    el.innerHTML = `
      <div style="text-align:center;padding:60px 20px">
        <div style="font-size:3rem;margin-bottom:16px">📦</div>
        <div style="font-family:'Cinzel',serif;font-size:1.1rem;margin-bottom:8px">Nenhum pedido ainda</div>
        <p style="color:var(--metal);margin-bottom:20px">Explore nosso catálogo e faça sua primeira encomenda!</p>
        <button class="btn btn-primary" onclick="showPub('catalog')">Ver Catálogo</button>
      </div>`;
    return;
  }
  el.innerHTML = `
    <div style="max-width:800px;margin:0 auto">
      <h2 style="font-family:'Cinzel',serif;font-size:1.3rem;margin-bottom:24px;color:var(--orange)">
        Olá, ${esc(Auth.user.name.split(' ')[0])}! Seus pedidos:
      </h2>
      ${data.orders.map(o => {
        const steps    = Array.isArray(o.steps) ? o.steps : [];
        const progress = steps.length ? Math.round(steps.filter(s => s.done).length / steps.length * 100) : 0;
        return `
        <div class="my-order-card">
          <div class="my-order-header">
            <div>
              <div class="my-order-code">${esc(o.order_code)}</div>
              <div class="my-order-model">${esc(o.model)}</div>
            </div>
            <div style="text-align:right">
              <div style="color:var(--orange);font-weight:700;font-size:1.1rem">${formatCurrency(o.amount)}</div>
            </div>
          </div>
          <div class="my-order-meta">
            <span>📅 ${new Date(o.created_at).toLocaleDateString('pt-BR')}</span>
            ${o.deadline ? `<span>🎯 Prazo: ${new Date(o.deadline).toLocaleDateString('pt-BR')}</span>` : ''}
            ${o.tracking_code ? `<span>📬 <strong style="color:var(--orange);cursor:pointer" onclick="copyToClipboard('${esc(o.tracking_code)}')">${esc(o.tracking_code)}</strong></span>` : ''}
          </div>
          <div class="my-order-progress-bar"><div class="my-order-progress-fill" style="width:${progress}%"></div></div>
          <div class="my-order-steps">
            ${steps.map(s => `
              <div class="my-step ${s.done ? 'done' : ''}">
                <div class="my-step-dot">${s.done ? '✓' : ''}</div>
                <div class="my-step-label">${esc(s.label)}</div>
              </div>`).join('')}
          </div>
          <div style="text-align:right;margin-top:10px">
            <button class="btn btn-secondary btn-sm" onclick="showPub('tracking');preloadTracking('${esc(o.order_code)}')">Rastrear</button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

/* ══ MATERIAIS ═══════════════════════════════════════════════ */

const MAT_DATA = {
  steels: [
    { key:'aco_d2',   name:'Aço D2',      specs:{ 'Dureza HRC':'60-62','Composição':'1.5%C, 12%Cr, 0.9%Mo','Tenacidade':'Média-Alta','Resistência à corrosão':'Média','Indicação':'Facas de caça e uso pesado','Acabamento':'Stonewash / Satin' } },
    { key:'aco_1095', name:'Aço 1095',    specs:{ 'Dureza HRC':'58-60','Composição':'0.95%C, 0.4%Mn','Tenacidade':'Alta','Resistência à corrosão':'Baixa','Indicação':'Bushcraft e sobrevivência','Acabamento':'Fosco / Stonewash' } },
    { key:'aco_5160', name:'Aço 5160',    specs:{ 'Dureza HRC':'57-59','Composição':'0.6%C, 0.9%Cr, 0.22%Si','Tenacidade':'Muito Alta','Resistência à corrosão':'Baixa','Indicação':'Bowies e uso pesado','Acabamento':'Satin / Fosco' } },
    { key:'damascus', name:'Damascus',    specs:{ 'Dureza HRC':'62-64','Composição':'Multicamadas forjadas','Tenacidade':'Alta','Resistência à corrosão':'Média','Indicação':'Coleção premium','Acabamento':'Stonewash revelado' } },
    { key:'inox_420', name:'Inox 420',    specs:{ 'Dureza HRC':'56-58','Composição':'0.38%C, 13%Cr','Tenacidade':'Média','Resistência à corrosão':'Muito Alta','Indicação':'Cozinha e ambientes úmidos','Acabamento':'Espelho / Satin' } },
  ],
  woods: [
    { key:'imbuia',    name:'Imbuia',    specs:{ 'Dureza Janka':'780 lbf','Cor':'Castanho médio a escuro','Textura':'Média, irregular','Resistência':'Alta','Indicação':'Facas rústicas e caça','Óleo natural':'Sim','Origem':'Brasil — PR/SC' } },
    { key:'jacaranda', name:'Jacarandá', specs:{ 'Dureza Janka':'1100 lbf','Cor':'Roxo-amarronzado','Textura':'Fina e uniforme','Resistência':'Muito Alta','Indicação':'Facas de coleção','Óleo natural':'Sim','Origem':'Mata Atlântica' } },
    { key:'nogueira',  name:'Nogueira',  specs:{ 'Dureza Janka':'1010 lbf','Cor':'Marrom escuro uniforme','Textura':'Fina','Resistência':'Alta','Indicação':'Facas premium e tático','Óleo natural':'Sim','Origem':'América do Norte' } },
    { key:'micarta',   name:'Micarta',   specs:{ 'Dureza':'8/10','Cor':'Preta / linho / café','Textura':'Lisa ou texturizada','Resistência':'Muito Alta','Indicação':'Facas táticas e cozinha','Impermeável':'Sim','Origem':'Material composto' } },
  ],
};

function renderMaterials() {
  ['steels', 'woods'].forEach(type => {
    const el = document.getElementById('mat-' + type);
    if (!el) return;
    el.innerHTML = MAT_DATA[type].map(m => {
      const src = (typeof MAT_IMGS !== 'undefined' && MAT_IMGS[m.key]) ? MAT_IMGS[m.key] : `assets/IMG/materiais/${m.key}.webp`;
      return `<div class="mat-card" onclick="openMatModal('${type}','${m.key}')">
        <div class="mat-img-wrap">
          <img class="mat-card-img" src="${src}" alt="${esc(m.name)}" loading="lazy" onerror="this.style.display='none'"/>
          <div class="mat-img-overlay"></div>
        </div>
        <div class="mat-body">
          <div class="mat-name">${esc(m.name)}</div>
          <div class="mat-cat">${type === 'steels' ? 'Aço' : 'Madeira / Cabo'}</div>
        </div>
      </div>`;
    }).join('');
  });
}

function openMatModal(type, key) {
  const m = MAT_DATA[type]?.find(x => x.key === key);
  if (!m) return;
  const specsHtml = Object.entries(m.specs).map(([k, v]) => `<div class="spec-item"><div class="spec-key">${esc(k)}</div><div class="spec-val">${esc(v)}</div></div>`).join('');
  openModal(m.name, `<div class="specs-grid">${specsHtml}</div>`, null, 'Fechar');
  document.getElementById('modalOkBtn').onclick = closeModal;
  document.querySelector?.('.modal-foot .btn-secondary') && (document.querySelector('.modal-foot .btn-secondary').style.display = 'none');
}

/* ══ PROMOÇÕES ═══════════════════════════════════════════════ */

async function renderPubPromos() {
  const el = document.getElementById('promoCards');
  if (!el) return;

  // Imagens mapeadas por nome de produto
  const PROMO_IMGS = {
    'DF Hunter X':          'https://whitehillsknives.com/cdn/shop/files/handmade-damascus-steel-hunting-knife-with-rose-wood-handle-skinner-130.webp?v=1686333208',
    'DF Chef Elite':        typeof MAT_IMGS !== 'undefined' ? MAT_IMGS.faca_chef : '',
    'DF Bushcraft Inferno': 'https://whitehillsknives.com/cdn/shop/files/10-handmade-hunting-bushcraft-knife-forged-damascus-steel-survival-edc-walnut-handle-wh-3416-skinner-544.webp',
    'DF Bowie Prime':       'https://whitehillsknives.com/cdn/shop/files/jim-bowie-hunting-knife-279.webp?v=1686290219',
    'DF Tactical Ember':    'https://whitehillsknives.com/cdn/shop/files/custom-handmade-forged-damascus-steel-hunting-bushcraft-survival-tracker-knife-199.webp',
  };

  const FALLBACK = [
    { name:'DF Hunter X',          price_old:890, price_now:712, discount:20, description:'D2 + Imbuia envelhecida. Stonewash exclusivo. Pronta para uso imediato.', badge:'Pronta entrega',   expires_at: new Date(Date.now() + 2*86400000) },
    { name:'DF Chef Elite',        price_old:780, price_now:624, discount:20, description:'Inox 420HC espelhado. Acabamento perfeito. Ideal para presente premium.', badge:'Últimas 3 unid.', expires_at: new Date(Date.now() + 5*86400000) },
    { name:'DF Bushcraft Inferno', price_old:690, price_now:518, discount:25, description:'Carbono 1095 + Nogueira natural. A escolha dos aventureiros exigentes.', badge:'Estoque limitado', expires_at: new Date(Date.now() + 5*86400000) },
  ];

  let list = FALLBACK;
  const data = await api.get('/promotions');
  if (data?.success && data.promotions?.length) list = data.promotions;

  el.innerHTML = list.map(p => {
    const ms   = p.expires_at ? new Date(p.expires_at) - Date.now() : 0;
    const days = Math.floor(ms / 86400000);
    const hrs  = Math.floor((ms % 86400000) / 3600000);
    const img  = PROMO_IMGS[p.name] || '';
    const saved = p.price_old - p.price_now;

    return `
      <div class="promo-card">
        ${img ? `
        <div style="height:180px;margin:-20px -20px 16px;overflow:hidden;position:relative">
          <img src="${esc(img)}" alt="${esc(p.name)}"
            style="width:100%;height:100%;object-fit:cover;transition:transform .4s"
            onmouseover="this.style.transform='scale(1.06)'"
            onmouseout="this.style.transform='scale(1)'"
            onerror="this.parentElement.style.display='none'"/>
          <div style="position:absolute;inset:0;background:linear-gradient(to top,var(--graphite) 0%,transparent 50%)"></div>
          <div class="promo-disc" style="top:12px;right:12px">-${p.discount}%</div>
          ${p.badge ? `<div style="position:absolute;top:12px;left:12px;background:var(--orange);color:#fff;padding:3px 10px;border-radius:20px;font-size:.72rem;font-weight:700">${esc(p.badge)}</div>` : ''}
        </div>` : `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          ${p.badge ? `<div class="promo-badge" style="position:static">${esc(p.badge)}</div>` : '<span></span>'}
          <div class="promo-disc" style="position:static">-${p.discount}%</div>
        </div>`}
        <div class="promo-name">${esc(p.name)}</div>
        <div class="promo-desc">${esc(p.description || '')}</div>
        <div class="promo-px" style="margin-bottom:8px">
          <span class="promo-old">${formatCurrency(p.price_old)}</span>
          <span class="promo-new">${formatCurrency(p.price_now)}</span>
        </div>
        <div style="font-size:.75rem;color:#4caf7d;margin-bottom:${ms > 0 ? '6px':'12px'}">
          💰 Você economiza ${formatCurrency(saved)}
        </div>
        ${ms > 0 ? `<div style="font-size:.75rem;color:var(--metal);margin-bottom:12px">⏱ Encerra em ${days}d ${hrs}h</div>` : ''}
        <button class="btn btn-primary btn-sm btn-full" onclick="openWA('Olá! Vi a promoção de ${esc(p.name)} (${formatCurrency(p.price_now)}) e quero aproveitar!')">
          Aproveitar oferta →
        </button>
      </div>`;
  }).join('');
}

/* ══ MISC ════════════════════════════════════════════════════ */

function setupImgFallbacks() {
  document.querySelectorAll('.prod-img img, .cfg-preview img').forEach(img => {
    if (!img.dataset.fb) {
      img.dataset.fb = '1';
      img.addEventListener('error', () => imgFallback(img, img.alt || 'Dragon Forge'), { once: true });
      if (img.complete && img.naturalWidth === 0) imgFallback(img, img.alt || 'Dragon Forge');
    }
  });
}

function imgFallback(img, name) {
  const c = document.createElement('canvas'); c.width = 400; c.height = 280;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0,0,400,280); g.addColorStop(0,'#1e1a14'); g.addColorStop(1,'#0e0c08');
  ctx.fillStyle = g; ctx.fillRect(0,0,400,280);
  ctx.strokeStyle = 'rgba(255,106,0,0.04)'; ctx.lineWidth = 1;
  for (let i = 0; i < 400; i += 18) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,280); ctx.stroke(); }
  for (let i = 0; i < 280; i += 18) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(400,i); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,106,0,0.2)'; ctx.lineWidth = 1.5; ctx.strokeRect(16,16,368,248);
  ctx.font = '52px serif'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,106,0,0.18)'; ctx.fillText('⚔',200,140);
  // Usar nome do produto, não iniciais do alt
  const displayName = name.replace(/^DF\s+/,'').split(' ').slice(0,2).join(' ');
  ctx.font = 'bold 16px Rajdhani,sans-serif'; ctx.fillStyle = 'rgba(255,106,0,0.6)'; ctx.fillText(name.toUpperCase(), 200, 195);
  ctx.font = '11px Rajdhani,sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillText('Imagem indisponível', 200, 215);
  img.src = c.toDataURL('image/png'); img.style.objectFit = 'contain'; img.style.padding = '14px';
}

function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const was  = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!was) item.classList.add('open');
}

function submitContact() {
  const name  = document.getElementById('contactName')?.value.trim() || '';
  const email = document.getElementById('contactEmail')?.value.trim() || '';
  const msg   = document.getElementById('contactMsg')?.value.trim() || '';
  if (!validText(name, 2, 100)) { toast('Nome inválido.', 'err'); return; }
  if (!validEmail(email))       { toast('E-mail inválido.', 'err'); return; }
  if (!validText(msg, 10, 2000)){ toast('Mensagem muito curta.', 'err'); return; }
  const ok = document.getElementById('contactOk');
  if (ok) { ok.style.display = 'block'; setTimeout(() => ok.style.display = 'none', 5000); }
  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMsg').value = '';
  toast('Mensagem enviada!', 'ok');
}

function openWA(msg) {
  window.open('https://wa.me/5511999999999?text=' + encodeURIComponent((msg || '').substring(0, 1000)), '_blank', 'noopener,noreferrer');
}

function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ══ INIT ════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const ld = document.getElementById('loader');
  setTimeout(() => {
    if (ld) { ld.classList.add('out'); setTimeout(() => ld.style.display = 'none', 620); }
  }, 2000);

  // Restaurar sessão
  updateNavbar();

  // Iniciar features
  initCatalog();
  buildCfg();
  renderPubPromos();
  renderMaterials();
  initScrollReveal();
  setTimeout(setupImgFallbacks, 800);

  // Configurador com defaults
  setTimeout(() => {
    selectOpt('model',        'Chef');
    selectOpt('construction', 'Full Tang');
    selectOpt('steel',        '1070');
    selectOpt('handle',       'Imbuia');
    selectOpt('finish',       'Fosco');
    selectOpt('sheath',       'Sem bainha');
  }, 200);
});
