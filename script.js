// ════ STARRY BACKGROUND ════
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function initStars() {
  stars = Array.from({length: 150}, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2, o: Math.random() * 0.5 + 0.1, s: Math.random() * 0.003 + 0.001 }));
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => { s.o += s.s; if (s.o > 0.6 || s.o < 0.05) s.s *= -1; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(148,163,184,${s.o})`; ctx.fill(); });
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', () => { resize(); initStars(); });
resize(); initStars(); drawStars();

// ════ DATA ════
const REGIONS = [
  { id:'kanto',  name:'Kanto',  gen:'GEN I',   realCity:'Tokyo',    lat:35.6762, lon:139.6503, color:'#ef4444', pokemon:[1,4,7,25,52,54,63,94,113,129,143,150] },
  { id:'johto',  name:'Johto',  gen:'GEN II',  realCity:'Kyoto',    lat:35.0116, lon:135.7681, color:'#a78bfa', pokemon:[152,155,158,175,196,197,212,243,244,245,249,250] },
  { id:'hoenn',  name:'Hoenn',  gen:'GEN III', realCity:'Fukuoka',  lat:33.5904, lon:130.4017, color:'#38bdf8', pokemon:[252,255,258,280,302,334,350,376,382,383,384,385] },
  { id:'sinnoh', name:'Sinnoh', gen:'GEN IV',  realCity:'Sapporo',  lat:43.0618, lon:141.3545, color:'#60a5fa', pokemon:[393,396,403,431,442,448,479,483,484,487,489,492] },
  { id:'unova',  name:'Unova',  gen:'GEN V',   realCity:'New York', lat:40.7128, lon:-74.0060, color:'#f59e0b', pokemon:[495,498,501,529,550,570,571,587,612,643,644,646] },
  { id:'kalos',  name:'Kalos',  gen:'GEN VI',  realCity:'Paris',    lat:48.8566, lon:2.3522,   color:'#f472b6', pokemon:[650,653,656,669,678,700,706,710,714,716,717,718] },
  { id:'alola',  name:'Alola',  gen:'GEN VII', realCity:'Honolulu', lat:21.3069, lon:-157.8583,color:'#fb923c', pokemon:[722,725,728,745,758,769,771,785,786,787,788,791] },
  { id:'galar',  name:'Galar',  gen:'GEN VIII',realCity:'London',   lat:51.5074, lon:-0.1278,  color:'#818cf8', pokemon:[810,813,816,840,859,877,884,888,889,890,893,898] },
  { id:'paldea', name:'Paldea', gen:'GEN IX',  realCity:'Madrid',   lat:40.4168, lon:-3.7038,  color:'#34d399', pokemon:[906,909,912,921,935,950,963,971,987,994,1007,1008] }
];

const WMO = {
  0:  { desc:'Céu limpo',          icon:'☀️', types:['fire','flying','grass','ground'] },
  1:  { desc:'Principalmente limpo',icon:'🌤️', types:['normal','flying','grass','fairy'] },
  2:  { desc:'Parcialmente nublado',icon:'⛅', types:['normal','psychic','flying'] },
  3:  { desc:'Nublado',             icon:'☁️', types:['normal','rock','steel','poison','fighting'] },
  45: { desc:'Neblina',             icon:'🌫️', types:['ghost','psychic','dark','poison'] },
  48: { desc:'Neblina com gelo',    icon:'🌫️', types:['ghost','ice','dark','steel'] },
  51: { desc:'Garoa fraca',         icon:'🌦️', types:['water','grass','bug','fairy'] },
  61: { desc:'Chuva',               icon:'🌧️', types:['water','grass','bug','poison'] },
  71: { desc:'Neve',                icon:'❄️', types:['ice','steel','ground','fighting'] },
  95: { desc:'Trovoada',            icon:'⛈️', types:['electric','dragon','dark','fighting'] }
};
function getWeather(code) { return WMO[code] || WMO[61]; }

// ════ RARITY ════
const LEGENDARY_IDS = new Set([144,145,146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,638,639,640,641,642,643,644,645,646,716,717,718,785,786,787,788,789,790,791,792,800,801,802,888,889,890,891,892,893,894,895,896,897,898,905,1007,1008]);
const EPIC_IDS      = new Set([94,130,131,143,196,197,212,248,373,376,445,448,350,609,612,635,700,703,706,710,714,877,884]);
const RARITY = {
  common:    { label:'Comum',    color:'#94a3b8', catchRate:0.90 },
  uncommon:  { label:'Incomum',  color:'#4ade80', catchRate:0.70 },
  rare:      { label:'Raro',     color:'#38bdf8', catchRate:0.45 },
  epic:      { label:'Épico',    color:'#a78bfa', catchRate:0.25 },
  legendary: { label:'Lendário', color:'#f59e0b', catchRate:0.10 },
};
function getRarity(id) {
  if (LEGENDARY_IDS.has(id)) return RARITY.legendary;
  if (EPIC_IDS.has(id))      return RARITY.epic;
  if (id >= 600)             return RARITY.rare;
  if (id >= 300)             return RARITY.uncommon;
  return RARITY.common;
}

// ════ INVENTORY ════
function loadInv() { try { return JSON.parse(localStorage.getItem('geodex_inv') || '[]'); } catch { return []; } }
function saveInv(inv) { localStorage.setItem('geodex_inv', JSON.stringify(inv)); syncBadges(); }
function hasInv(id) { return loadInv().some(e => e.id === id); }
function addInv(entry) { const inv = loadInv(); if (!inv.some(e => e.id === entry.id)) { inv.push(entry); saveInv(inv); } }
function removeInv(id) { saveInv(loadInv().filter(e => e.id !== id)); }
function syncBadges() {
  const n = loadInv().length;
  ['inv-badge','inv-fab-badge','inv-count-sm'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = n;
    if (id === 'inv-badge' || id === 'inv-fab-badge') el.style.opacity = n > 0 ? '1' : '0.4';
  });
}

// ════ RENDER GRID ════
function renderGrid() {
  document.getElementById('regions-grid').innerHTML = REGIONS.map((r, i) => `
    <div class="region-card" style="--region-color:${r.color}" onclick="selectRegion('${r.id}')" id="card-${r.id}">
      <span class="region-gen-badge">${r.gen}</span>
      <div class="region-card-top">
        <div class="region-number">${r.id==='local'?'📍 LOCAL':String(i+1).padStart(2,'0')}</div>
        <div class="region-name">${r.name}</div>
        <div class="region-city">${r.realCity}</div>
      </div>
      <div class="region-spawn-dot"></div>
      <div class="region-card-bar"></div>
    </div>`).join('');
}

// ════ API CALLS ════
async function fetchWeatherData(lat, lon) {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
    const d = await r.json(); return d.current;
  } catch { return null; }
}

const pokeCache = {};
async function fetchPokemon(id) {
  if (pokeCache[id]) return pokeCache[id];
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!r.ok) return null;
    const d = await r.json();
    const p = {
      id: d.id, name: d.name,
      types: d.types.map(t => t.type.name),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
      art:    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
    };
    pokeCache[id] = p; return p;
  } catch { return null; }
}

// ════ GEOLOCATION ════
function geolocateUser() {
  if (!navigator.geolocation) return alert('GPS não disponível neste navegador.');
  navigator.geolocation.getCurrentPosition(pos => {
    const local = { id:'local', name:'Sua Localização', gen:'GPS', realCity:'Aqui', lat:pos.coords.latitude, lon:pos.coords.longitude, color:'#34d399', pokemon:[1,4,7,25,94,133,143,150] };
    const idx = REGIONS.findIndex(r => r.id==='local');
    if (idx !== -1) REGIONS[idx] = local; else REGIONS.unshift(local);
    renderGrid(); selectRegion('local');
  });
}

// ════ GLOBAL SEARCH ════
async function globalSearch() {
  const input = document.getElementById('pokeSearchInput').value.toLowerCase().trim();
  if (!input) return;
  const btn = document.getElementById('searchBtn');
  btn.textContent = '⏳';
  const resultDiv = document.getElementById('search-result');
  resultDiv.classList.remove('visible');

  const p = await fetchPokemon(input);
  if (!p) { alert('Pokémon não encontrado! Use o nome em inglês (ex: pikachu, charizard).'); btn.textContent = 'Buscar'; return; }

  const regionPool = REGIONS.filter(r => r.id !== 'local');
  const wResults = await Promise.all(regionPool.map(r => fetchWeatherData(r.lat, r.lon)));
  let matches = [];
  wResults.forEach((w, i) => {
    if (!w) return;
    const info = getWeather(w.weather_code);
    if (p.types.some(t => info.types.includes(t)))
      matches.push({ region: regionPool[i], info, temp: Math.round(w.temperature_2m) });
  });

  const rar = getRarity(p.id);
  const caught = hasInv(p.id);
  const typesHtml = p.types.map(t => `<span class="type-badge t-${t}">${t}</span>`).join('');
  const matchHtml = matches.length > 0
    ? matches.map(m => `<div class="best-region-tag">${m.region.name} (${m.region.realCity}) — ${m.info.desc} ${m.info.icon} · ${m.temp}°C</div>`).join('')
    : '<div style="color:var(--muted);font-size:0.9rem;margin-top:10px;">Clima não está ideal agora em nenhuma região.</div>';

  resultDiv.innerHTML = `
    <img src="${p.art}" style="width:110px;image-rendering:pixelated;" onerror="this.src='${p.sprite}'">
    <h2>${p.name}</h2>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;">${typesHtml}</div>
    <div class="rarity-tag" style="color:${rar.color};border-color:${rar.color}">${rar.label} · ${Math.round(rar.catchRate*100)}% base</div>
    <div class="search-spawn-label">Regiões com spawn ativo agora</div>
    <div class="search-best-regions">${matchHtml}</div>
    ${matches.length > 0 && !caught
      ? `<button class="btn-capture-search" id="search-capture-btn" onclick="captureFromSearch(${p.id},'${matches[0].region.id}')">
           <span class="pokeball-icon">⬤</span> Capturar em ${matches[0].region.name}
         </button>`
      : caught
        ? `<div class="already-caught-tag">✓ Já está na sua mochila!</div>`
        : ''}
    <br>
    <button class="ctrl-btn ctrl-btn--close ctrl-btn--sm" style="margin-top:16px;" onclick="document.getElementById('search-result').classList.remove('visible')">✕ Fechar</button>
  `;
  resultDiv.classList.add('visible');
  btn.textContent = 'Buscar';
}

// ════ CAPTURE ════
let currentWeatherInfo = null;

function getCatchRate(poke, wInfo) {
  const base = getRarity(poke.id).catchRate;
  const bonus = (wInfo && poke.types.some(t => wInfo.types.includes(t))) ? 0.25 : 0;
  return Math.min(base + bonus, 1.0);
}

function attemptCapture(pokemonId, regionId) {
  const poke = pokeCache[pokemonId];
  if (!poke) return;
  if (hasInv(pokemonId)) { showToast(`${poke.name} já está na mochila!`, 'info'); return; }

  const rate = getCatchRate(poke, currentWeatherInfo);
  const success = Math.random() < rate;
  const btn = document.getElementById(`capture-btn-${pokemonId}`);
  if (btn) { btn.innerHTML = '<span class="pokeball-spin">⬤</span> Jogando...'; btn.disabled = true; }

  animatePokeball(btn, success, () => {
    if (success) {
      const region = REGIONS.find(r => r.id === regionId) || {};
      addInv({
        id: poke.id, name: poke.name, types: poke.types,
        sprite: poke.sprite, spriteArt: poke.art,
        region: region.name || regionId,
        regionCity: region.realCity || '—',
        regionColor: region.color || '#38bdf8',
        weather: currentWeatherInfo?.desc || '—',
        weatherIcon: currentWeatherInfo?.icon || '—',
        capturedAt: new Date().toLocaleDateString('pt-BR'),
        rarity: getRarity(poke.id).label,
        rarityColor: getRarity(poke.id).color,
      });
      showToast(`${poke.name} foi capturado! ✓`, 'success');
      if (btn) { btn.innerHTML = '<span>✓ Capturado</span>'; btn.classList.add('captured'); btn.disabled = true; }
      // Mark card
      const card = btn?.closest('.pokemon-card');
      if (card && !card.querySelector('.captured-overlay')) {
        card.classList.add('is-captured');
        const ov = document.createElement('div');
        ov.className = 'captured-overlay';
        ov.innerHTML = '<span>✓</span>';
        card.prepend(ov);
      }
    } else {
      showToast(`${poke.name} escapou! Tente de novo.`, 'fail');
      if (btn) { btn.innerHTML = '<span class="pokeball-icon">⬤</span> Capturar'; btn.disabled = false; }
    }
  });
}

async function captureFromSearch(pokemonId, regionId) {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return;
  const sbtn = document.getElementById('search-capture-btn');
  if (sbtn) sbtn.disabled = true;
  const w = await fetchWeatherData(region.lat, region.lon);
  currentWeatherInfo = w ? getWeather(w.weather_code) : null;
  attemptCapture(pokemonId, regionId);
}

// ════ POKEBALL ANIMATION ════
function animatePokeball(triggerEl, success, cb) {
  const ball = document.createElement('div');
  ball.className = 'pokeball-throw';
  ball.textContent = '⬤';
  if (triggerEl) {
    const r = triggerEl.getBoundingClientRect();
    ball.style.left = (r.left + r.width/2) + 'px';
    ball.style.top  = (r.top  + r.height/2) + 'px';
  } else { ball.style.left = '50%'; ball.style.top = '50%'; }
  document.body.appendChild(ball);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ball.classList.add('throw-active');
      setTimeout(() => {
        ball.classList.add(success ? 'throw-success' : 'throw-fail');
        setTimeout(() => { ball.remove(); cb(); }, 500);
      }, 600);
    });
  });
}

// ════ TOAST ════
function showToast(msg, type = 'info') {
  document.querySelector('.geodex-toast')?.remove();
  const t = document.createElement('div');
  t.className = `geodex-toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('toast-visible')); });
  setTimeout(() => { t.classList.remove('toast-visible'); setTimeout(() => t.remove(), 400); }, 2800);
}

// ════ SELECT REGION ════
async function selectRegion(id) {
  const r = REGIONS.find(x => x.id === id);
  if (!r) return;
  document.querySelectorAll('.region-card').forEach(c => c.classList.remove('active'));
  document.getElementById('card-' + id)?.classList.add('active');
  document.getElementById('search-result')?.classList.remove('visible');

  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  panel.classList.add('visible');
  content.innerHTML = '<div class="spinner"></div>';
  panel.scrollIntoView({ behavior:'smooth', block:'start' });

  const [w, ...pokes] = await Promise.all([fetchWeatherData(r.lat, r.lon), ...r.pokemon.map(fetchPokemon)]);
  const info = w ? getWeather(w.weather_code) : null;
  currentWeatherInfo = info;

  const valid = pokes.filter(Boolean);
  const activeTypes = info?.types || [];
  const matchCount = valid.filter(p => p.types.some(t => activeTypes.includes(t))).length;
  const typeBadges = activeTypes.map(t => `<span class="type-badge t-${t}">${t}</span>`).join('');

  const pokesHtml = valid.map(p => {
    const isMatch = p.types.some(t => activeTypes.includes(t));
    const captured = hasInv(p.id);
    const rar = getRarity(p.id);
    const rate = Math.round(getCatchRate(p, info) * 100);
    const dots = p.types.map(t => `<span class="ptype-dot t-${t}" title="${t}"></span>`).join('');

    return `
      <div class="pokemon-card${isMatch?' weather-match':''}${captured?' is-captured':''}">
        ${captured ? '<div class="captured-overlay"><span>✓</span></div>' : ''}
        <div class="pokemon-rarity-dot" style="background:${rar.color};box-shadow:0 0 6px ${rar.color}" title="${rar.label}"></div>
        <img class="pokemon-sprite" src="${p.sprite}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.2'">
        <div class="pokemon-name">${p.name.replace('-',' ')}</div>
        <div class="pokemon-type-dots">${dots}</div>
        <div class="catch-rate-bar-wrap" title="${rate}% chance">
          <div class="catch-rate-bar" style="width:${rate}%;background:${rar.color}"></div>
        </div>
        <button
          class="btn-capture${captured?' captured':''}"
          id="capture-btn-${p.id}"
          ${captured ? 'disabled' : ''}
          onclick="attemptCapture(${p.id},'${r.id}')"
        >${captured ? '<span>✓ Capturado</span>' : '<span class="pokeball-icon">⬤</span><span>Capturar</span>'}</button>
      </div>`;
  }).join('');

  const strip = typeBadges
    ? `<div class="weather-types-strip">
         <span class="types-strip-label">Tipos ativos agora · ${matchCount} Pokémon em vantagem · +25% de captura</span>
         ${typeBadges}
       </div>` : '';

  content.innerHTML = `
    <div class="detail-header">
      <div>
        <div class="detail-region-name">${r.name}</div>
        <div class="detail-city">${r.realCity}</div>
      </div>
      <div class="weather-card">
        <div class="weather-label">Clima Atual</div>
        <div class="weather-temp">${w ? Math.round(w.temperature_2m) : '--'}°C</div>
        <div class="weather-icon-row">${info?.icon || '—'}</div>
        <div class="weather-desc-text">${info?.desc || ''}</div>
      </div>
    </div>
    ${strip}
    <div class="pokemon-grid">${pokesHtml}</div>
  `;
}

function closeDetail() {
  document.getElementById('detail-panel').classList.remove('visible');
  document.querySelectorAll('.region-card').forEach(c => c.classList.remove('active'));
  currentWeatherInfo = null;
}

// ════ INVENTORY PANEL ════
function openInventory() {
  const panel = document.getElementById('inventory-panel');
  // Remove first, then add — guarantees fresh animation each open
  panel.classList.remove('inv-opening');
  panel.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    panel.classList.add('inv-opening');
    document.body.style.overflow = 'hidden';
    renderInventoryPanel(true);
  });
}
function closeInventory() {
  const panel = document.getElementById('inventory-panel');
  panel.classList.remove('inv-opening');
  panel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

let invFilter = 'all';
function setInvFilter(type) {
  invFilter = type;
  document.querySelectorAll('.inv-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === type);
  });
  renderInventoryPanel(false);
}

function renderInventoryPanel(full = true) {
  const inv = loadInv();

  if (full) {
    const byRegion = {};
    inv.forEach(p => { byRegion[p.region] = (byRegion[p.region] || 0) + 1; });
    const top = Object.entries(byRegion).sort((a,b) => b[1]-a[1])[0];
    const stats = document.getElementById('inv-stats');
    if (stats) stats.innerHTML = `
      <div class="inv-stat"><span class="inv-stat-num">${inv.length}</span><span class="inv-stat-label">Capturados</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${Object.keys(byRegion).length}</span><span class="inv-stat-label">Regiões</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${inv.filter(p=>p.rarity==='Lendário').length}</span><span class="inv-stat-label">Lendários</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${top ? top[0] : '—'}</span><span class="inv-stat-label">Região top</span></div>
    `;
  }

  const grid = document.getElementById('inv-grid');
  if (!grid) return;

  const filtered = invFilter === 'all'       ? inv
    : invFilter === 'legendary' ? inv.filter(p => p.rarity === 'Lendário')
    : invFilter === 'epic'      ? inv.filter(p => p.rarity === 'Épico')
    : inv.filter(p => p.types?.includes(invFilter));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="inv-empty">
        <div class="inv-empty-icon">🎒</div>
        <div>${invFilter !== 'all' ? 'Nenhum Pokémon nesta categoria ainda.' : 'Sua mochila está vazia!'}</div>
        <div class="inv-empty-sub">Explore as regiões e use o botão Capturar nos cards.</div>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const rc = p.regionColor || '#38bdf8';
    const dots = (p.types||[]).map(t => `<span class="ptype-dot t-${t}" title="${t}"></span>`).join('');
    return `
      <div class="inv-pokemon-card" style="--rc:${rc}">
        <div class="inv-card-region-bar"></div>
        <div class="inv-card-rarity" style="color:${p.rarityColor||'#94a3b8'}">${p.rarity||'—'}</div>
        <img class="inv-sprite" src="${p.spriteArt||p.sprite}" alt="${p.name}" onerror="this.src='${p.sprite}'">
        <div class="inv-poke-name">${p.name}</div>
        <div class="inv-poke-types">${dots}</div>
        <div class="inv-poke-meta">
          <div class="inv-meta-item"><span class="inv-meta-label">Região</span><span class="inv-meta-val" style="color:${rc}">${p.region}</span></div>
          <div class="inv-meta-item"><span class="inv-meta-label">Clima</span><span class="inv-meta-val">${p.weatherIcon} ${p.weather}</span></div>
          <div class="inv-meta-item"><span class="inv-meta-label">Data</span><span class="inv-meta-val">${p.capturedAt}</span></div>
        </div>
        <button class="btn-release" onclick="releasePokemon(${p.id})">↩ Soltar</button>
      </div>`;
  }).join('');
}

function releasePokemon(id) {
  const p = loadInv().find(e => e.id === id);
  if (!p || !confirm(`Soltar ${p.name}? Ele voltará para a natureza.`)) return;
  removeInv(id);
  showToast(`${p.name} foi solto.`, 'info');
  renderInventoryPanel(true);
  // Restore capture btn if region panel is open
  const btn = document.getElementById(`capture-btn-${id}`);
  if (btn) { btn.innerHTML = '<span class="pokeball-icon">⬤</span><span>Capturar</span>'; btn.disabled = false; btn.classList.remove('captured'); }
  document.querySelector(`.pokemon-card.is-captured .captured-overlay`)?.closest('.pokemon-card')?.classList.remove('is-captured');
}

// ════ INIT ════
renderGrid();
syncBadges();