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
  { id: 'kanto', name: 'Kanto', gen: 'GEN I', realCity: 'Tokyo', lat: 35.6762, lon: 139.6503, color: '#ef4444', pokemon: [1, 4, 7, 25, 52, 54, 63, 94, 113, 129, 143, 150] },
  { id: 'johto', name: 'Johto', gen: 'GEN II', realCity: 'Kyoto', lat: 35.0116, lon: 135.7681, color: '#a78bfa', pokemon: [152, 155, 158, 175, 196, 197, 212, 243, 244, 245, 249, 250] },
  { id: 'hoenn', name: 'Hoenn', gen: 'GEN III', realCity: 'Fukuoka', lat: 33.5904, lon: 130.4017, color: '#38bdf8', pokemon: [252, 255, 258, 280, 302, 334, 350, 376, 382, 383, 384, 385] },
  { id: 'sinnoh', name: 'Sinnoh', gen: 'GEN IV', realCity: 'Sapporo', lat: 43.0618, lon: 141.3545, color: '#60a5fa', pokemon: [393, 396, 403, 431, 442, 448, 479, 483, 484, 487, 489, 492] },
  { id: 'unova', name: 'Unova', gen: 'GEN V', realCity: 'New York', lat: 40.7128, lon: -74.0060, color: '#f59e0b', pokemon: [495, 498, 501, 529, 550, 570, 571, 587, 612, 643, 644, 646] },
  { id: 'kalos', name: 'Kalos', gen: 'GEN VI', realCity: 'Paris', lat: 48.8566, lon: 2.3522, color: '#f472b6', pokemon: [650, 653, 656, 669, 678, 700, 706, 710, 714, 716, 717, 718] },
  { id: 'alola', name: 'Alola', gen: 'GEN VII', realCity: 'Honolulu', lat: 21.3069, lon: -157.8583, color: '#fb923c', pokemon: [722, 725, 728, 745, 758, 769, 771, 785, 786, 787, 788, 791] },
  { id: 'galar', name: 'Galar', gen: 'GEN VIII', realCity: 'London', lat: 51.5074, lon: -0.1278, color: '#818cf8', pokemon: [810, 813, 816, 840, 859, 877, 884, 888, 889, 890, 893, 898] },
  { id: 'paldea', name: 'Paldea', gen: 'GEN IX', realCity: 'Madrid', lat: 40.4168, lon: -3.7038, color: '#34d399', pokemon: [906, 909, 912, 921, 935, 950, 963, 971, 987, 994, 1007, 1008] }
];

const WMO_WEATHER = {
  0:  { desc: 'Céu limpo',        icon: '☀️', types: ['fire', 'flying', 'grass', 'ground'] },
  1:  { desc: 'Principalmente limpo', icon: '🌤️', types: ['normal', 'flying', 'grass', 'fairy'] },
  2:  { desc: 'Parcialmente nublado', icon: '⛅', types: ['normal', 'psychic', 'flying'] },
  3:  { desc: 'Nublado',          icon: '☁️', types: ['normal', 'rock', 'steel', 'poison', 'fighting'] },
  45: { desc: 'Neblina',          icon: '🌫️', types: ['ghost', 'psychic', 'dark', 'poison'] },
  48: { desc: 'Neblina com gelo', icon: '🌫️', types: ['ghost', 'ice', 'dark', 'steel'] },
  51: { desc: 'Garoa fraca',      icon: '🌦️', types: ['water', 'grass', 'bug', 'fairy'] },
  61: { desc: 'Chuva',            icon: '🌧️', types: ['water', 'grass', 'bug', 'poison'] },
  71: { desc: 'Neve',             icon: '❄️', types: ['ice', 'steel', 'ground', 'fighting'] },
  95: { desc: 'Trovoada',         icon: '⛈️', types: ['electric', 'dragon', 'dark', 'fighting'] }
};
function getWeatherInfo(code) { return WMO_WEATHER[code] || WMO_WEATHER[61]; }

// ════ RARITY CONFIG ════
const RARITY = {
  common:    { label: 'Comum',    color: '#94a3b8', catchRate: 0.90, emoji: '⬜' },
  uncommon:  { label: 'Incomum',  color: '#4ade80', catchRate: 0.70, emoji: '🟩' },
  rare:      { label: 'Raro',     color: '#38bdf8', catchRate: 0.45, emoji: '🟦' },
  epic:      { label: 'Épico',    color: '#a78bfa', catchRate: 0.25, emoji: '🟪' },
  legendary: { label: 'Lendário', color: '#f59e0b', catchRate: 0.10, emoji: '🟨' },
};

// Legendary & epic Pokémon IDs (simplified)
const LEGENDARY_IDS = new Set([144,145,146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,638,639,640,641,642,643,644,645,646,716,717,718,785,786,787,788,789,790,791,792,800,801,802,888,889,890,891,892,893,894,895,896,897,898,905,1007,1008]);
const EPIC_IDS      = new Set([94,130,131,143,196,197,212,248,373,376,445,448,350,609,612,635,700,703,706,710,714,877,884]);

function getRarity(id) {
  if (LEGENDARY_IDS.has(id)) return RARITY.legendary;
  if (EPIC_IDS.has(id))      return RARITY.epic;
  if (id >= 600)             return RARITY.rare;
  if (id >= 300)             return RARITY.uncommon;
  return RARITY.common;
}

// ════ INVENTORY (localStorage) ════
function loadInventory() {
  try { return JSON.parse(localStorage.getItem('geodex_inventory') || '[]'); }
  catch { return []; }
}
function saveInventory(inv) {
  localStorage.setItem('geodex_inventory', JSON.stringify(inv));
  updateInventoryBadge();
}
function isInInventory(pokemonId) {
  return loadInventory().some(e => e.id === pokemonId);
}
function addToInventory(entry) {
  const inv = loadInventory();
  if (!inv.some(e => e.id === entry.id)) { inv.push(entry); saveInventory(inv); }
}
function removeFromInventory(pokemonId) {
  const inv = loadInventory().filter(e => e.id !== pokemonId);
  saveInventory(inv);
}
function updateInventoryBadge() {
  const count = loadInventory().length;
  const badge = document.getElementById('inv-badge');
  const sm = document.getElementById('inv-count-sm');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
  if (sm) sm.textContent = count;
}

// ════ RENDER GRID ════
function renderGrid() {
  document.getElementById('regions-grid').innerHTML = REGIONS.map((r, i) => `
    <div class="region-card" style="--region-color:${r.color}" onclick="selectRegion('${r.id}')" id="card-${r.id}">
      <span class="region-gen-badge">${r.gen}</span>
      <div class="region-card-top">
        <div class="region-number">${r.id === 'local' ? '📍 LOCAL' : String(i+1).padStart(2,'0')}</div>
        <div class="region-name">${r.name}</div>
        <div class="region-city">${r.realCity}</div>
      </div>
      <div class="region-spawn-dot"></div>
      <div class="region-card-bar"></div>
    </div>`).join('');
}

// ════ WEATHER & POKEMON FETCH ════
async function fetchWeather(lat, lon) {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
    const d = await r.json(); return d.current;
  } catch(e) { return null; }
}

const pokeCache = {};
async function fetchPokemon(id) {
  if (pokeCache[id]) return pokeCache[id];
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!r.ok) return null;
    const data = await r.json();
    const result = {
      id: data.id, name: data.name,
      types: data.types.map(t => t.type.name),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      spriteArt: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    };
    pokeCache[id] = result; return result;
  } catch(e) { return null; }
}

// ════ GEOLOCATION ════
async function geolocateUser() {
  if (!navigator.geolocation) return alert('Sem suporte a GPS.');
  navigator.geolocation.getCurrentPosition(pos => {
    const localRegion = { id: 'local', name: 'Sua Localização', gen: 'GPS', realCity: 'Aqui', lat: pos.coords.latitude, lon: pos.coords.longitude, color: '#34d399', pokemon: [1, 4, 7, 25, 94, 133, 143, 150] };
    const idx = REGIONS.findIndex(r => r.id === 'local');
    if (idx !== -1) REGIONS[idx] = localRegion; else REGIONS.unshift(localRegion);
    renderGrid(); selectRegion('local');
  });
}

// ════ GLOBAL SEARCH ════
async function globalSearch() {
  const input = document.getElementById('pokeSearchInput').value.toLowerCase().trim();
  if (!input) return;
  const btn = document.getElementById('searchBtn');
  btn.innerText = '⏳';
  const resultDiv = document.getElementById('search-result');
  resultDiv.style.display = 'none';

  const p = await fetchPokemon(input);
  if (!p) { alert('Pokémon não encontrado! Use o nome em inglês (ex: pikachu, charizard).'); btn.innerText = 'Buscar'; return; }

  const regionPool = REGIONS.filter(r => r.id !== 'local');
  const weatherResults = await Promise.all(regionPool.map(r => fetchWeather(r.lat, r.lon)));
  let bestMatches = [];
  weatherResults.forEach((w, i) => {
    if (!w) return;
    const region = regionPool[i];
    const info = getWeatherInfo(w.weather_code);
    if (p.types.some(t => info.types.includes(t)))
      bestMatches.push({ region, info, temp: Math.round(w.temperature_2m) });
  });

  const rarity = getRarity(p.id);
  const captured = isInInventory(p.id);
  const typesHtml = p.types.map(t => `<span class="type-badge t-${t}">${t}</span>`).join('');
  const matchesHtml = bestMatches.length > 0
    ? bestMatches.map(m => `<div class="best-region-tag">${m.region.name} (${m.region.realCity}) — ${m.info.desc} ${m.info.icon} · ${m.temp}°C</div>`).join('')
    : '<div style="color:var(--muted); font-size: 0.9rem; margin-top:10px;">O clima no mundo não está ideal para ele agora.</div>';

  resultDiv.innerHTML = `
    <img src="${p.spriteArt || p.sprite}" style="width:110px; image-rendering:pixelated;">
    <h2>${p.name}</h2>
    <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:8px;">${typesHtml}</div>
    <div class="rarity-tag" style="color:${rarity.color}; border-color:${rarity.color}">${rarity.emoji} ${rarity.label}</div>
    <div class="search-spawn-label">Onde ele está spawnando agora pelo mundo</div>
    <div class="search-best-regions">${matchesHtml}</div>
    ${bestMatches.length > 0 && !captured
      ? `<button class="btn-capture-search" onclick="captureFromSearch(${p.id}, '${p.name}', '${bestMatches[0].region.id}')">
           <span class="pokeball-icon">⬤</span> Tentar Capturar em ${bestMatches[0].region.name}
         </button>`
      : captured
        ? `<div class="already-caught-tag">✓ Já capturado!</div>`
        : ''}
    <button class="close-detail" style="margin-top:18px; margin-bottom:0;" onclick="document.getElementById('search-result').style.display='none'">✕ Fechar</button>
  `;
  resultDiv.style.display = 'block';
  btn.innerText = 'Buscar';
}

// ════ CAPTURE LOGIC ════
let currentWeatherInfo = null;

function getCatchRate(pokemon, weatherInfo) {
  const rarity = getRarity(pokemon.id);
  let rate = rarity.catchRate;
  // Boost if weather matches
  if (weatherInfo && pokemon.types.some(t => weatherInfo.types.includes(t))) rate = Math.min(rate + 0.25, 1.0);
  return rate;
}

function attemptCapture(pokemonId, regionId, fromSearch = false) {
  const pokemon = pokeCache[pokemonId];
  if (!pokemon) return;
  if (isInInventory(pokemonId)) { showToast(`${pokemon.name} já está na sua mochila!`, 'info'); return; }

  const catchRate = getCatchRate(pokemon, currentWeatherInfo);
  const success = Math.random() < catchRate;
  const btn = document.getElementById(`capture-btn-${pokemonId}`);

  // Animate
  startPokeballAnimation(pokemonId, success, () => {
    if (success) {
      const region = REGIONS.find(r => r.id === regionId) || {};
      addToInventory({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        sprite: pokemon.sprite,
        spriteArt: pokemon.spriteArt,
        region: region.name || regionId,
        regionCity: region.realCity || '—',
        regionColor: region.color || '#38bdf8',
        weather: currentWeatherInfo ? currentWeatherInfo.desc : '—',
        weatherIcon: currentWeatherInfo ? currentWeatherInfo.icon : '—',
        capturedAt: new Date().toLocaleDateString('pt-BR'),
        rarity: getRarity(pokemon.id).label,
        rarityColor: getRarity(pokemon.id).color,
      });
      showToast(`${pokemon.name} foi capturado! ✓`, 'success');
      if (btn) {
        btn.innerHTML = '<span>✓ Capturado</span>';
        btn.classList.add('captured');
        btn.disabled = true;
      }
    } else {
      showToast(`${pokemon.name} escapou! Tente novamente.`, 'fail');
      if (btn) {
        btn.innerHTML = '<span class="pokeball-icon">⬤</span> Tentar Capturar';
        btn.disabled = false;
      }
    }
  });
}

async function captureFromSearch(pokemonId, name, regionId) {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return;
  const w = await fetchWeather(region.lat, region.lon);
  currentWeatherInfo = w ? getWeatherInfo(w.weather_code) : null;

  const btn = document.querySelector('.btn-capture-search');
  if (btn) btn.disabled = true;
  attemptCapture(pokemonId, regionId, true);
}

// ════ POKEBALL ANIMATION ════
function startPokeballAnimation(pokemonId, success, callback) {
  const btn = document.getElementById(`capture-btn-${pokemonId}`);
  if (btn) { btn.innerHTML = '<span class="pokeball-spin">⬤</span> Jogando...'; btn.disabled = true; }

  // Create floating ball element
  const ball = document.createElement('div');
  ball.className = 'pokeball-throw';
  ball.innerHTML = '⬤';
  if (btn) {
    const rect = btn.getBoundingClientRect();
    ball.style.left = rect.left + rect.width / 2 + 'px';
    ball.style.top = rect.top + 'px';
  } else {
    ball.style.left = '50%';
    ball.style.top = '50%';
  }
  document.body.appendChild(ball);

  setTimeout(() => {
    ball.classList.add('throw-active');
    setTimeout(() => {
      ball.classList.add(success ? 'throw-success' : 'throw-fail');
      setTimeout(() => { ball.remove(); callback(); }, 700);
    }, 600);
  }, 50);
}

// ════ TOAST NOTIFICATIONS ════
function showToast(message, type = 'info') {
  const existing = document.querySelector('.geodex-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `geodex-toast toast-${type}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('toast-visible'), 10);
  setTimeout(() => { toast.classList.remove('toast-visible'); setTimeout(() => toast.remove(), 400); }, 2800);
}

// ════ SELECT REGION ════
async function selectRegion(id) {
  const r = REGIONS.find(x => x.id === id);
  if (!r) return;

  document.querySelectorAll('.region-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById('card-' + id);
  if (card) card.classList.add('active');

  document.getElementById('search-result').style.display = 'none';
  document.getElementById('detail-panel').classList.add('visible');
  document.getElementById('detail-content').innerHTML = '<div class="spinner"></div>';
  document.getElementById('detail-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [w, ...pokes] = await Promise.all([fetchWeather(r.lat, r.lon), ...r.pokemon.map(fetchPokemon)]);
  const info = w ? getWeatherInfo(w.weather_code) : null;
  currentWeatherInfo = info;

  const validPokes = pokes.filter(Boolean);
  const typeBadges = info ? info.types.map(t => '<span class="type-badge t-' + t + '">' + t + '</span>').join('') : '';
  const matchCount = validPokes.filter(p => info && p.types.some(t => info.types.includes(t))).length;
  const inventory = loadInventory();

  let pokesHtml = validPokes.map(p => {
    const isMatch = info && p.types.some(t => info.types.includes(t));
    const captured = isInInventory(p.id);
    const rarity = getRarity(p.id);
    const catchRate = Math.round(getCatchRate(p, info) * 100);
    const typeDots = p.types.map(t => `<span class="ptype-dot t-${t}" title="${t}"></span>`).join('');

    return `
      <div class="pokemon-card ${isMatch ? 'weather-match' : ''} ${captured ? 'is-captured' : ''}">
        ${captured ? '<div class="captured-overlay"><span>✓</span></div>' : ''}
        <div class="pokemon-rarity-dot" style="background:${rarity.color}" title="${rarity.label}"></div>
        <img class="pokemon-sprite" src="${p.sprite}" alt="${p.name}">
        <div class="pokemon-name">${p.name}</div>
        <div class="pokemon-type-dots">${typeDots}</div>
        <div class="catch-rate-bar-wrap" title="Taxa de captura: ${catchRate}%">
          <div class="catch-rate-bar" style="width:${catchRate}%; background:${rarity.color}"></div>
        </div>
        ${!captured
          ? `<button class="btn-capture" id="capture-btn-${p.id}" onclick="attemptCapture(${p.id}, '${r.id}')">
               <span class="pokeball-icon">⬤</span> Capturar
             </button>`
          : `<button class="btn-capture captured" disabled><span>✓ Capturado</span></button>`
        }
      </div>`;
  }).join('');

  const typesSection = typeBadges
    ? `<div class="weather-types-strip">
         <span class="types-strip-label">Tipos ativos agora · ${matchCount} Pokémon em vantagem · Taxa de captura +25%</span>
         ${typeBadges}
       </div>`
    : '';

  document.getElementById('detail-content').innerHTML = `
    <div class="detail-header">
      <div>
        <div class="detail-region-name">${r.name}</div>
        <div class="detail-city">${r.realCity}</div>
      </div>
      <div class="weather-card">
        <div class="weather-label">Clima Atual</div>
        <div class="weather-temp">${w ? Math.round(w.temperature_2m) : '--'}°C</div>
        <div class="weather-icon-row">${info ? info.icon : '—'}</div>
        <div class="weather-desc-text">${info ? info.desc : ''}</div>
      </div>
    </div>
    ${typesSection}
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
  panel.classList.add('visible');
  document.body.style.overflow = 'hidden';
  renderInventoryPanel();
}
function closeInventory() {
  document.getElementById('inventory-panel').classList.remove('visible');
  document.body.style.overflow = '';
}

let invFilter = 'all';
function setInvFilter(type) {
  invFilter = type;
  document.querySelectorAll('.inv-filter-btn').forEach(b => b.classList.remove('active'));
  const active = document.querySelector(`.inv-filter-btn[data-filter="${type}"]`);
  if (active) active.classList.add('active');
  renderInventoryPanel(false);
}

function renderInventoryPanel(full = true) {
  const inv = loadInventory();
  const stats = document.getElementById('inv-stats');
  const grid = document.getElementById('inv-grid');

  if (full && stats) {
    const byRegion = {};
    inv.forEach(p => { byRegion[p.region] = (byRegion[p.region] || 0) + 1; });
    const topRegion = Object.entries(byRegion).sort((a,b) => b[1]-a[1])[0];
    stats.innerHTML = `
      <div class="inv-stat"><span class="inv-stat-num">${inv.length}</span><span class="inv-stat-label">Capturados</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${Object.keys(byRegion).length}</span><span class="inv-stat-label">Regiões</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${inv.filter(p=>p.rarity==='Lendário').length}</span><span class="inv-stat-label">Lendários</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${topRegion ? topRegion[0] : '—'}</span><span class="inv-stat-label">Região favorita</span></div>
    `;
  }

  if (!grid) return;

  const filtered = invFilter === 'all' ? inv
    : invFilter === 'legendary' ? inv.filter(p => p.rarity === 'Lendário')
    : invFilter === 'epic'      ? inv.filter(p => p.rarity === 'Épico')
    : inv.filter(p => p.types && p.types.includes(invFilter));

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="inv-empty"><div class="inv-empty-icon">🎒</div><div>Nenhum Pokémon ${invFilter !== 'all' ? 'nesta categoria' : 'capturado ainda'}!</div><div class="inv-empty-sub">Explore as regiões e capture Pokémon pelo mundo.</div></div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const regionColor = p.regionColor || '#38bdf8';
    const typeDots = (p.types || []).map(t => `<span class="ptype-dot t-${t}" title="${t}"></span>`).join('');
    return `
      <div class="inv-pokemon-card" style="--rc:${regionColor}">
        <div class="inv-card-region-bar" style="background:${regionColor}"></div>
        <div class="inv-card-rarity" style="color:${p.rarityColor || '#94a3b8'}">${p.rarity || '—'}</div>
        <img class="inv-sprite" src="${p.spriteArt || p.sprite}" alt="${p.name}">
        <div class="inv-poke-name">${p.name}</div>
        <div class="inv-poke-types">${typeDots}</div>
        <div class="inv-poke-meta">
          <div class="inv-meta-item"><span class="inv-meta-label">Região</span><span class="inv-meta-val" style="color:${regionColor}">${p.region}</span></div>
          <div class="inv-meta-item"><span class="inv-meta-label">Clima</span><span class="inv-meta-val">${p.weatherIcon} ${p.weather}</span></div>
          <div class="inv-meta-item"><span class="inv-meta-label">Capturado</span><span class="inv-meta-val">${p.capturedAt}</span></div>
        </div>
        <button class="btn-release" onclick="releasePokemon(${p.id})">↩ Soltar</button>
      </div>`;
  }).join('');
}

function releasePokemon(id) {
  const inv = loadInventory();
  const p = inv.find(e => e.id === id);
  if (!p) return;
  if (!confirm(`Soltar ${p.name}? Ele voltará para a natureza.`)) return;
  removeFromInventory(id);
  showToast(`${p.name} foi solto de volta à natureza.`, 'info');
  renderInventoryPanel();
  // Update capture btn in region view if open
  const btn = document.getElementById(`capture-btn-${id}`);
  if (btn) {
    btn.innerHTML = '<span class="pokeball-icon">⬤</span> Capturar';
    btn.disabled = false;
    btn.classList.remove('captured');
  }
  const overlay = document.querySelector(`.pokemon-card.is-captured .captured-overlay`);
  if (overlay) overlay.closest('.pokemon-card')?.classList.remove('is-captured');
}

// ════ INIT ════
renderGrid();
updateInventoryBadge();