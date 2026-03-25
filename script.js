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
  0: { desc: 'Céu limpo', icon: '☀️', types: ['fire', 'flying', 'grass', 'ground'] },
  1: { desc: 'Principalmente limpo', icon: '🌤️', types: ['normal', 'flying', 'grass', 'fairy'] },
  2: { desc: 'Parcialmente nublado', icon: '⛅', types: ['normal', 'psychic', 'flying'] },
  3: { desc: 'Nublado', icon: '☁️', types: ['normal', 'rock', 'steel', 'poison', 'fighting'] },
  45: { desc: 'Neblina', icon: '🌫️', types: ['ghost', 'psychic', 'dark', 'poison'] },
  48: { desc: 'Neblina com gelo', icon: '🌫️', types: ['ghost', 'ice', 'dark', 'steel'] },
  51: { desc: 'Garoa fraca', icon: '🌦️', types: ['water', 'grass', 'bug', 'fairy'] },
  61: { desc: 'Chuva', icon: '🌧️', types: ['water', 'grass', 'bug', 'poison'] },
  71: { desc: 'Neve', icon: '❄️', types: ['ice', 'steel', 'ground', 'fighting'] },
  95: { desc: 'Trovoada', icon: '⛈️', types: ['electric', 'dragon', 'dark', 'fighting'] }
};
function getWeatherInfo(code) { return WMO_WEATHER[code] || WMO_WEATHER[61]; } // default to rain if unknown

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
    const result = { id: data.id, name: data.name, types: data.types.map(t => t.type.name), sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png` };
    pokeCache[id] = result; return result;
  } catch(e) { return null; }
}

// ════ GEOLOCATION ════
async function geolocateUser() {
  if (!navigator.geolocation) return alert('Sem suporte a GPS.');
  navigator.geolocation.getCurrentPosition(pos => {
    const localRegion = { id: 'local', name: 'Sua Localização', gen: 'GPS', realCity: 'Aqui', lat: pos.coords.latitude, lon: pos.coords.longitude, color: '#34d399', pokemon: [1, 4, 7, 25, 94, 133, 143, 150] };
    const idx = REGIONS.findIndex(r => r.id === 'local');
    if(idx !== -1) REGIONS[idx] = localRegion; else REGIONS.unshift(localRegion);
    renderGrid(); selectRegion('local');
  });
}

// ════ GLOBAL SEARCH ════
async function globalSearch() {
  const input = document.getElementById('pokeSearchInput').value.toLowerCase().trim();
  if(!input) return;
  
  const btn = document.getElementById('searchBtn');
  btn.innerText = '⏳';
  const resultDiv = document.getElementById('search-result');
  resultDiv.style.display = 'none';

  const p = await fetchPokemon(input);
  if(!p) {
    alert('Pokémon não encontrado! Digite o nome em inglês (ex: pikachu, charizard).');
    btn.innerText = 'Buscar'; return;
  }

  // Busca o clima de todas as regiões simultaneamente
  // ✅ CORREÇÃO: usa regionPool separado para evitar índice deslocado quando 'local' existe
  const regionPool = REGIONS.filter(r => r.id !== 'local');
  const weatherResults = await Promise.all(regionPool.map(r => fetchWeather(r.lat, r.lon)));

  let bestMatches = [];
  weatherResults.forEach((w, i) => {
    if(!w) return;
    const region = regionPool[i]; // ✅ sempre alinhado com weatherResults
    const info = getWeatherInfo(w.weather_code);
    // Se o tipo do pokemon estiver no clima atual daquela região
    if(p.types.some(t => info.types.includes(t))) {
      bestMatches.push(`${region.name} (${region.realCity}) - ${info.desc} ${info.icon}`);
    }
  });

  const typesHtml = p.types.map(t => `<span class="type-badge t-${t}">${t}</span>`).join('');
  const matchesHtml = bestMatches.length > 0 
    ? bestMatches.map(m => `<div class="best-region-tag">${m}</div>`).join('')
    : '<div style="color:var(--muted); font-size: 0.9rem; margin-top:10px;">O clima no mundo não está ideal para ele agora.</div>';

  resultDiv.innerHTML = `
    <img src="${p.sprite}" style="width:110px; image-rendering:pixelated;">
    <h2>${p.name}</h2>
    <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">${typesHtml}</div>
    <div class="search-spawn-label">Onde ele está spawnando agora pelo mundo</div>
    <div class="search-best-regions">${matchesHtml}</div>
    <button class="close-detail" style="margin-top:24px; margin-bottom:0;" onclick="document.getElementById('search-result').style.display='none'">✕ Fechar Pesquisa</button>
  `;
  
  resultDiv.style.display = 'block';
  btn.innerText = 'Buscar';
}

// ════ SELECT REGION ════
async function selectRegion(id) {
  const r = REGIONS.find(x => x.id === id);
  if(!r) return;

  document.querySelectorAll('.region-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById('card-' + id);
  if(card) card.classList.add('active');

  document.getElementById('search-result').style.display = 'none';
  document.getElementById('detail-panel').classList.add('visible');
  document.getElementById('detail-content').innerHTML = '<div class="spinner"></div>';

  const [w, ...pokes] = await Promise.all([ fetchWeather(r.lat, r.lon), ...r.pokemon.map(fetchPokemon) ]);
  const info = w ? getWeatherInfo(w.weather_code) : null;

  const typeBadges = info ? info.types.map(t => '<span class="type-badge t-' + t + '">' + t + '</span>').join('') : '';
  const matchCount = pokes.filter(Boolean).filter(p => info && p.types.some(t => info.types.includes(t))).length;

  let pokesHtml = pokes.filter(Boolean).map(p => {
    const isMatch = info && p.types.some(t => info.types.includes(t));
    return '<div class="pokemon-card ' + (isMatch ? 'weather-match' : '') + '">' +
      '<img class="pokemon-sprite" src="' + p.sprite + '" alt="' + p.name + '">' +
      '<div class="pokemon-name">' + p.name + '</div>' +
      '</div>';
  }).join('');

  const typesSection = typeBadges ? '<div class="weather-types-strip"><span class="types-strip-label">Tipos favorecidos agora · ' + matchCount + ' Pokémon em spawn</span>' + typeBadges + '</div>' : '';

  document.getElementById('detail-content').innerHTML =
    '<div class="detail-header">' +
      '<div>' +
        '<div class="detail-region-name">' + r.name + '</div>' +
        '<div class="detail-city">' + r.realCity + '</div>' +
      '</div>' +
      '<div class="weather-card">' +
        '<div class="weather-label">Clima Atual</div>' +
        '<div class="weather-temp">' + (w ? Math.round(w.temperature_2m) : '--') + '°C</div>' +
        '<div class="weather-icon-row">' + (info ? info.icon : '—') + '</div>' +
        '<div class="weather-desc-text">' + (info ? info.desc : '') + '</div>' +
      '</div>' +
    '</div>' +
    typesSection +
    '<div class="pokemon-grid">' + pokesHtml + '</div>';
}
function closeDetail() {
  document.getElementById('detail-panel').classList.remove('visible');
  document.querySelectorAll('.region-card').forEach(c => c.classList.remove('active'));
}

renderGrid();