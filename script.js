// ════ STARRY BACKGROUND ════
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function initStars() {
  stars = Array.from({length:200}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    r: Math.random()*1.4, o: Math.random()*0.5+0.1, s: Math.random()*0.003+0.001
  }));
}
function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s => {
    s.o += s.s; if(s.o>0.6||s.o<0.05) s.s*=-1;
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(148,163,184,${s.o})`; ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize',()=>{resize();initStars();});
resize(); initStars(); drawStars();

// ════ REGIONS ════
const REGIONS = [
  {
    id:'kanto', name:'Kanto', gen:'GEN I', color:'#ef4444',
    biome:'Temperado · Costeiro · Urbano',
    landmark:'Pallet Town → Shimokitazawa  ·  Viridian Forest → Okutama  ·  Mt. Silver → Mt. Fuji',
    description:'A metrópole de Kantō: 37 milhões de pessoas, o Monte Fuji ao horizonte e ilhas vulcânicas que inspiraram Cinnabar Island.',
    cities:[
      {name:'Tokyo',    label:'Capital',   lat:35.6762, lon:139.6503},
      {name:'Yokohama', label:'Porto',      lat:35.4437, lon:139.6380},
      {name:'Nikko',    label:'Montanhas',  lat:36.7486, lon:139.5990},
      {name:'Kamakura', label:'Histórica',  lat:35.3197, lon:139.5506},
    ],
    pokemon:[1,4,7,16,19,25,35,37,39,52,54,58,63,74,77,90,94,113,125,129,131,132,133,143,147,150,151],
  },
  {
    id:'johto', name:'Johto', gen:'GEN II', color:'#a78bfa',
    biome:'Subtropical · Espiritual · Floresta antiga',
    landmark:'Ecruteak City → Kyoto  ·  Bell Tower → Pagoda Toji  ·  Azalea Town → Nara',
    description:'A alma do Japão antigo — templos xintoístas, cerejeiras e bambus inspiram cada cidade de Johto, terra dos Pokémon Sagrados.',
    cities:[
      {name:'Kyoto',  label:'Templos',    lat:35.0116, lon:135.7681},
      {name:'Osaka',  label:'Metrópole',  lat:34.6937, lon:135.5023},
      {name:'Nara',   label:'Histórica',  lat:34.6851, lon:135.8048},
      {name:'Kobe',   label:'Porto',      lat:34.6901, lon:135.1956},
    ],
    pokemon:[152,155,158,175,179,187,190,196,197,206,209,211,212,234,236,238,239,240,242,243,244,245,246,248,249,250,251],
  },
  {
    id:'hoenn', name:'Hoenn', gen:'GEN III', color:'#38bdf8',
    biome:'Subtropical úmido · Vulcânico · Marinho',
    landmark:'Slateport → Nagasaki  ·  Mt. Chimney → Mt. Aso  ·  Ever Grande → Yakushima',
    description:'Kyushu e suas ilhas vulcânicas: 60% de Hoenn é oceano — como a ilha cercada por três mares com o vulcão Aso ativo ao centro.',
    cities:[
      {name:'Fukuoka',   label:'Capital',    lat:33.5904, lon:130.4017},
      {name:'Nagasaki',  label:'Porto',      lat:32.7503, lon:129.8777},
      {name:'Kumamoto',  label:'Vulcão',     lat:32.8032, lon:130.7079},
      {name:'Kagoshima', label:'Extremo Sul',lat:31.5966, lon:130.5571},
    ],
    pokemon:[252,255,258,261,278,280,293,302,315,318,325,334,335,337,338,350,357,359,370,373,376,380,381,382,383,384,385],
  },
  {
    id:'sinnoh', name:'Sinnoh', gen:'GEN IV', color:'#60a5fa',
    biome:'Boreal · Tundra · Montanhoso',
    landmark:'Snowpoint City → Abashiri  ·  Mt. Coronet → Cordilheira Hidaka  ·  Hearthome → Sapporo',
    description:'Hokkaido — a fronteira selvagem do norte japonês. Ursos, raposas árticas, nevascas épicas e um isolamento primordial.',
    cities:[
      {name:'Sapporo',   label:'Capital',  lat:43.0618, lon:141.3545},
      {name:'Hakodate',  label:'Porto',    lat:41.7688, lon:140.7290},
      {name:'Asahikawa', label:'Floresta', lat:43.7706, lon:142.3650},
      {name:'Abashiri',  label:'Ártico',   lat:44.0204, lon:144.2730},
    ],
    pokemon:[387,390,393,396,403,415,420,425,427,429,431,433,436,438,442,443,445,448,459,463,466,471,479,483,484,487,492],
  },
  {
    id:'unova', name:'Unova', gen:'GEN V', color:'#f59e0b',
    biome:'Temperado continental · Urbano · Pantanoso',
    landmark:'Castelia → Manhattan  ·  Skyarrow Bridge → Brooklyn Bridge  ·  Nimbasa → Times Square',
    description:'Nova York e arredores — o melting pot do mundo Pokémon. Arranha-céus, metrô, jazz clubs e uma diversidade sem paralelo.',
    cities:[
      {name:'New York',    label:'Manhattan', lat:40.7128, lon:-74.0060},
      {name:'Chicago',     label:'Meio-Oeste',lat:41.8781, lon:-87.6298},
      {name:'New Orleans', label:'Sul',       lat:29.9511, lon:-90.0715},
      {name:'Boston',      label:'Nordeste',  lat:42.3601, lon:-71.0589},
    ],
    pokemon:[495,498,501,504,519,524,529,532,550,554,559,570,571,572,578,587,595,599,609,612,621,635,641,643,644,646],
  },
  {
    id:'kalos', name:'Kalos', gen:'GEN VI', color:'#f472b6',
    biome:'Oceânico temperado · Mediterrâneo · Campestre',
    landmark:'Lumiose City → Paris  ·  Prism Tower → Torre Eiffel  ·  Anistar → Mont-Saint-Michel',
    description:'A França em toda sua elegância — arte, gastronomia, vinhos e a Belle Époque refletida nos Pokémon mais estilosos de todas as gerações.',
    cities:[
      {name:'Paris',    label:'Capital',      lat:48.8566, lon:2.3522},
      {name:'Lyon',     label:'Gastronômica', lat:45.7640, lon:4.8357},
      {name:'Nice',     label:'Riviera',      lat:43.7102, lon:7.2620},
      {name:'Bordeaux', label:'Vinhedos',     lat:44.8378, lon:-0.5792},
    ],
    pokemon:[650,653,656,661,667,669,671,673,678,686,694,700,701,703,706,710,712,714,716,717,718,719,720,721],
  },
  {
    id:'alola', name:'Alola', gen:'GEN VII', color:'#fb923c',
    biome:'Tropical oceânico · Vulcânico · Recifes de coral',
    landmark:'Melemele → Oahu  ·  Akala → Maui  ·  Wela Volcano → Kilauea  ·  Poni → Kauai',
    description:'O arquipélago do Havaí — quatro ilhas distintas, cultura polinésia, vulcões ativos e o aloha spirit em cada encontro.',
    cities:[
      {name:'Honolulu', label:'Oahu',      lat:21.3069, lon:-157.8583},
      {name:'Kahului',  label:'Maui',      lat:20.8893, lon:-156.4729},
      {name:'Hilo',     label:'Big Island',lat:19.7297, lon:-155.0900},
      {name:'Lihue',    label:'Kauai',     lat:21.9811, lon:-159.3711},
    ],
    pokemon:[722,725,728,731,734,738,741,742,744,745,747,751,757,762,764,769,771,776,781,785,786,787,788,791,792,800,801],
  },
  {
    id:'galar', name:'Galar', gen:'GEN VIII', color:'#818cf8',
    biome:'Oceânico temperado · Moors · Industrial',
    landmark:'Wyndon → Londres  ·  Wild Area → Yorkshire Dales  ·  Circhester → Bath romana',
    description:'O Reino Unido em toda sua glória — castelos medievais, moors neblinosos, revolução industrial e o orgulho britânico do Dynamax.',
    cities:[
      {name:'London',     label:'Capital',       lat:51.5074, lon:-0.1278},
      {name:'Edinburgh',  label:'Escócia',       lat:55.9533, lon:-3.1883},
      {name:'Manchester', label:'Industrial',    lat:53.4808, lon:-2.2426},
      {name:'Cardiff',    label:'País de Gales', lat:51.4816, lon:-3.1791},
    ],
    pokemon:[810,813,816,819,821,826,835,838,840,843,847,854,858,862,868,876,877,879,884,886,887,888,889,890,892,893,898],
  },
  {
    id:'paldea', name:'Paldea', gen:'GEN IX', color:'#34d399',
    biome:'Mediterrâneo · Árido · Montanhoso',
    landmark:'Mesagoza → Salamanca  ·  Area Zero → Tabernas Desert  ·  Porto Marinada → Cádiz',
    description:'A Península Ibérica — touradas, tapas, Gaudí, fado e a convivência única de tradição milenar com inovação tecnológica.',
    cities:[
      {name:'Madrid',    label:'Capital',   lat:40.4168, lon:-3.7038},
      {name:'Barcelona', label:'Catalunha', lat:41.3851, lon:2.1734},
      {name:'Seville',   label:'Andaluzia', lat:37.3891, lon:-5.9845},
      {name:'Lisbon',    label:'Portugal',  lat:38.7169, lon:-9.1399},
    ],
    pokemon:[906,909,912,915,919,921,924,926,928,931,935,940,944,947,950,956,963,971,974,987,992,994,1001,1004,1007,1008],
  },
];

// ════ WEATHER ════
const WMO = {
  0: {desc:'Céu limpo',icon:'☀️',types:['fire','flying','grass','ground']},
  1: {desc:'Principalmente limpo',icon:'🌤️',types:['normal','flying','grass','fairy']},
  2: {desc:'Parcialmente nublado',icon:'⛅',types:['normal','psychic','flying']},
  3: {desc:'Nublado',icon:'☁️',types:['normal','rock','steel','poison','fighting']},
  45:{desc:'Neblina',icon:'🌫️',types:['ghost','psychic','dark','poison']},
  48:{desc:'Neblina gelada',icon:'🌫️',types:['ghost','ice','dark','steel']},
  51:{desc:'Garoa leve',icon:'🌦️',types:['water','grass','bug','fairy']},
  53:{desc:'Garoa moderada',icon:'🌦️',types:['water','grass','bug']},
  61:{desc:'Chuva',icon:'🌧️',types:['water','grass','bug','poison']},
  63:{desc:'Chuva moderada',icon:'🌧️',types:['water','fighting','poison']},
  65:{desc:'Chuva forte',icon:'⛈️',types:['water','dragon']},
  71:{desc:'Neve leve',icon:'🌨️',types:['ice','steel','fighting']},
  73:{desc:'Neve',icon:'❄️',types:['ice','steel','ground']},
  80:{desc:'Pancadas de chuva',icon:'🌦️',types:['water','electric','bug']},
  95:{desc:'Trovoada',icon:'⛈️',types:['electric','dragon','dark','fighting']},
  99:{desc:'Trovoada severa',icon:'🌪️',types:['electric','flying','dragon']},
};
function getWeather(code){return WMO[code]||WMO[3];}

// ════ RARITY ════
const LEGENDARY_IDS = new Set([
  144,145,146,150,151,243,244,245,249,250,251,
  377,378,379,380,381,382,383,384,385,386,
  480,481,482,483,484,485,486,487,488,489,490,491,492,493,
  638,639,640,641,642,643,644,645,646,
  716,717,718,719,720,721,
  785,786,787,788,789,790,791,792,800,801,802,
  888,889,890,891,892,893,894,895,896,897,898,905,
  1001,1002,1003,1004,1005,1006,1007,1008
]);
const EPIC_IDS = new Set([
  6,9,34,36,59,65,68,73,76,80,89,94,103,110,112,121,
  130,131,143,196,197,212,248,373,376,445,448,
  350,609,612,635,700,703,706,710,714,877,884,887,879
]);
const RARITY = {
  common:   {label:'Comum',    color:'#94a3b8',catchRate:0.90,stars:1},
  uncommon: {label:'Incomum',  color:'#4ade80',catchRate:0.70,stars:2},
  rare:     {label:'Raro',     color:'#38bdf8',catchRate:0.45,stars:3},
  epic:     {label:'Épico',    color:'#a78bfa',catchRate:0.25,stars:4},
  legendary:{label:'Lendário', color:'#f59e0b',catchRate:0.08,stars:5},
};
function getRarity(id){
  if(LEGENDARY_IDS.has(id)) return RARITY.legendary;
  if(EPIC_IDS.has(id))      return RARITY.epic;
  if(id>=600)               return RARITY.rare;
  if(id>=300)               return RARITY.uncommon;
  return RARITY.common;
}

// ════ INVENTORY ════
function loadInv(){try{return JSON.parse(localStorage.getItem('geodex_inv')||'[]');}catch{return[];}}
function saveInv(inv){localStorage.setItem('geodex_inv',JSON.stringify(inv));syncBadges();}
function hasInv(id){return loadInv().some(e=>e.id===id);}
function addInv(entry){const inv=loadInv();if(!inv.some(e=>e.id===entry.id)){inv.push(entry);saveInv(inv);}}
function removeInv(id){saveInv(loadInv().filter(e=>e.id!==id));}
function syncBadges(){
  const n=loadInv().length;
  ['inv-badge','inv-fab-badge','inv-count-sm'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    el.textContent=n;
    if(id!=='inv-count-sm') el.style.opacity=n>0?'1':'0.4';
  });
}

// ════ RENDER REGION GRID ════
function renderGrid(){
  document.getElementById('regions-grid').innerHTML = REGIONS.map((r,i)=>{
    const cityChips = r.cities.map(c=>`<span class="region-city-chip">${c.name}</span>`).join('');
    return `
    <div class="region-card" style="--rc:${r.color}" onclick="selectRegion('${r.id}')" id="card-${r.id}">
      <div class="region-card-shimmer"></div>
      <div class="region-card-corner-glow"></div>
      <div class="region-card-top">
        <div class="region-meta-row">
          <span class="region-number">${String(i+1).padStart(2,'0')}</span>
          <span class="region-gen-badge">${r.gen}</span>
        </div>
        <div class="region-name">${r.name}</div>
        <div class="region-biome">${r.biome}</div>
        <div class="region-desc-preview">${r.description.substring(0,90)}…</div>
      </div>
      <div class="region-card-bottom">
        <div class="region-cities-row">${cityChips}</div>
        <div class="region-poke-count">${r.pokemon.length} pokémon</div>
      </div>
      <div class="region-card-bar"></div>
    </div>`;
  }).join('');
}

// ════ API ════
async function fetchWeatherData(lat,lon){
  try{
    const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto`);
    const d=await r.json();return d.current;
  }catch{return null;}
}
const pokeCache={};
async function fetchPokemon(id){
  if(pokeCache[id])return pokeCache[id];
  try{
    const r=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if(!r.ok)return null;
    const d=await r.json();
    const p={
      id:d.id,name:d.name,
      types:d.types.map(t=>t.type.name),
      sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
      art:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
    };
    pokeCache[id]=p;return p;
  }catch{return null;}
}

// ════ GEOLOCATION ════
function geolocateUser(){
  if(!navigator.geolocation)return alert('GPS não disponível.');
  navigator.geolocation.getCurrentPosition(pos=>{
    const local={
      id:'local',name:'Sua Localização',gen:'GPS',color:'#34d399',
      biome:'Local · Ao vivo',landmark:'Sua posição atual via GPS',
      description:'Pokémon do seu entorno geográfico em tempo real.',
      cities:[{name:'Aqui',label:'GPS',lat:pos.coords.latitude,lon:pos.coords.longitude}],
      pokemon:[1,4,7,25,94,133,143,150],
    };
    const idx=REGIONS.findIndex(r=>r.id==='local');
    if(idx!==-1)REGIONS[idx]=local; else REGIONS.unshift(local);
    renderGrid();selectRegion('local');
  });
}

// ════ GLOBAL SEARCH ════
async function globalSearch(){
  const input=document.getElementById('pokeSearchInput').value.toLowerCase().trim();
  if(!input)return;
  const btn=document.getElementById('searchBtn');
  btn.textContent='⏳';
  document.getElementById('search-result')?.classList.remove('visible');

  const p=await fetchPokemon(input);
  if(!p){alert('Pokémon não encontrado! Use o nome em inglês.');btn.textContent='Buscar';return;}

  const pool=REGIONS.filter(r=>r.id!=='local');
  const wAll=await Promise.all(pool.map(r=>fetchWeatherData(r.cities[0].lat,r.cities[0].lon)));
  let matches=[];
  wAll.forEach((w,i)=>{
    if(!w)return;
    const info=getWeather(w.weather_code);
    if(p.types.some(t=>info.types.includes(t)))
      matches.push({region:pool[i],info,temp:Math.round(w.temperature_2m)});
  });

  const rar=getRarity(p.id);
  const caught=hasInv(p.id);
  const stars='★'.repeat(rar.stars)+'☆'.repeat(5-rar.stars);
  const typesHtml=p.types.map(t=>`<span class="type-badge t-${t}">${t}</span>`).join('');
  const matchHtml=matches.length>0
    ?matches.map(m=>`<div class="best-region-tag"><span style="color:${m.region.color}">◆ ${m.region.name}</span> · ${m.region.cities[0].name} · ${m.info.desc} ${m.info.icon} · ${m.temp}°C</div>`).join('')
    :`<div style="color:var(--muted);font-size:.85rem;margin-top:8px">Nenhuma região com clima ideal no momento.</div>`;

  const resultDiv=document.getElementById('search-result');
  resultDiv.innerHTML=`
    <div class="search-result-inner">
      <img src="${p.art}" onerror="this.src='${p.sprite}'" class="search-sprite">
      <div class="search-info">
        <div class="search-poke-name">${p.name.replace(/-/g,' ')}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">${typesHtml}</div>
        <div class="rarity-tag" style="color:${rar.color};border-color:${rar.color}">${rar.label} <span style="font-size:10px;letter-spacing:1px">${stars}</span></div>
        <div class="catch-chance-text">Base ${Math.round(rar.catchRate*100)}% · Com bônus ${Math.round(Math.min(rar.catchRate+0.25,1)*100)}%</div>
      </div>
    </div>
    <div class="search-spawn-label">Regiões com spawn ativo agora</div>
    <div class="search-best-regions">${matchHtml}</div>
    ${matches.length>0&&!caught
      ?`<button class="btn-capture-search" id="search-capture-btn" onclick="captureFromSearch(${p.id},'${matches[0].region.id}')">
          <span class="pokeball-icon">⬤</span> Capturar em ${matches[0].region.name}
        </button>`
      :caught?`<div class="already-caught-tag">✓ Já está na sua mochila!</div>`:''}
    <button class="ctrl-btn ctrl-btn--close ctrl-btn--sm" style="margin-top:16px" onclick="document.getElementById('search-result').classList.remove('visible')">✕ Fechar</button>
  `;
  resultDiv.classList.add('visible');
  btn.textContent='Buscar';
}

// ════ CAPTURE ════
let currentWeatherInfo=null;
let currentRegionId=null;
let currentCityName=null;

function getCatchRate(poke,wInfo){
  const base=getRarity(poke.id).catchRate;
  const bonus=(wInfo&&poke.types.some(t=>wInfo.types.includes(t)))?0.25:0;
  return Math.min(base+bonus,1.0);
}

function attemptCapture(pokemonId,regionId){
  const poke=pokeCache[pokemonId];if(!poke)return;
  if(hasInv(pokemonId)){showToast(`${poke.name} já está na mochila!`,'info');return;}
  const rate=getCatchRate(poke,currentWeatherInfo);
  const success=Math.random()<rate;
  const btn=document.getElementById(`capture-btn-${pokemonId}`);
  if(btn){btn.innerHTML='<span class="pokeball-spin">⬤</span>';btn.disabled=true;}
  animatePokeball(btn,success,()=>{
    if(success){
      const region=REGIONS.find(r=>r.id===regionId)||{};
      addInv({
        id:poke.id,name:poke.name,types:poke.types,
        sprite:poke.sprite,spriteArt:poke.art,
        region:region.name||regionId,
        regionCity:currentCityName||region.cities?.[0]?.name||'—',
        regionColor:region.color||'#38bdf8',
        weather:currentWeatherInfo?.desc||'—',
        weatherIcon:currentWeatherInfo?.icon||'—',
        capturedAt:new Date().toLocaleDateString('pt-BR'),
        rarity:getRarity(poke.id).label,
        rarityColor:getRarity(poke.id).color,
      });
      showToast(`${poke.name} capturado! ✓`,'success');
      if(btn){btn.innerHTML='<span>✓ Capturado</span>';btn.classList.add('captured');btn.disabled=true;}
      const card=btn?.closest('.pokemon-card');
      if(card&&!card.querySelector('.captured-overlay')){
        card.classList.add('is-captured');
        const ov=document.createElement('div');
        ov.className='captured-overlay';ov.innerHTML='<span>✓</span>';card.prepend(ov);
      }
    }else{
      showToast(`${poke.name} escapou!`,'fail');
      if(btn){btn.innerHTML='<span class="pokeball-icon">⬤</span><span>Capturar</span>';btn.disabled=false;}
    }
  });
}

async function captureFromSearch(pokemonId,regionId){
  const region=REGIONS.find(r=>r.id===regionId);if(!region)return;
  const sbtn=document.getElementById('search-capture-btn');if(sbtn)sbtn.disabled=true;
  const w=await fetchWeatherData(region.cities[0].lat,region.cities[0].lon);
  currentWeatherInfo=w?getWeather(w.weather_code):null;
  currentCityName=region.cities[0].name;
  attemptCapture(pokemonId,regionId);
}

// ════ POKEBALL ANIMATION ════
function animatePokeball(triggerEl,success,cb){
  const ball=document.createElement('div');
  ball.className='pokeball-throw';ball.textContent='⬤';
  if(triggerEl){
    const r=triggerEl.getBoundingClientRect();
    ball.style.left=(r.left+r.width/2)+'px';ball.style.top=(r.top+r.height/2)+'px';
  }else{ball.style.left='50%';ball.style.top='50%';}
  document.body.appendChild(ball);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    ball.classList.add('throw-active');
    setTimeout(()=>{
      ball.classList.add(success?'throw-success':'throw-fail');
      setTimeout(()=>{ball.remove();cb();},500);
    },700);
  }));
}

// ════ TOAST ════
function showToast(msg,type='info'){
  document.querySelector('.geodex-toast')?.remove();
  const t=document.createElement('div');
  t.className=`geodex-toast toast-${type}`;t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('toast-visible')));
  setTimeout(()=>{t.classList.remove('toast-visible');setTimeout(()=>t.remove(),400);},2800);
}

// ════ SELECT REGION ════
async function selectRegion(id){
  const r=REGIONS.find(x=>x.id===id);if(!r)return;
  currentRegionId=id;
  document.querySelectorAll('.region-card').forEach(c=>c.classList.remove('active'));
  document.getElementById('card-'+id)?.classList.add('active');
  document.getElementById('search-result')?.classList.remove('visible');
  const panel=document.getElementById('detail-panel');
  panel.classList.add('visible');
  document.getElementById('detail-content').innerHTML='<div class="spinner"></div>';
  panel.scrollIntoView({behavior:'smooth',block:'start'});

  // Fetch all cities weather + all pokemon in parallel
  const [weatherArr,...pokes]=await Promise.all([
    Promise.all(r.cities.map(c=>fetchWeatherData(c.lat,c.lon))),
    ...r.pokemon.map(fetchPokemon)
  ]);

  currentCityName=r.cities[0].name;
  const activeW=weatherArr[0];
  currentWeatherInfo=activeW?getWeather(activeW.weather_code):null;

  renderDetailContent(r,weatherArr,pokes.filter(Boolean),0);
}

function switchCity(regionId,cityIdx){
  const r=REGIONS.find(x=>x.id===regionId);if(!r)return;
  const city=r.cities[cityIdx];if(!city)return;
  document.querySelectorAll('.city-tab').forEach((t,i)=>t.classList.toggle('active',i===cityIdx));

  const tab=document.querySelectorAll('.city-tab')[cityIdx];if(!tab)return;
  const code=parseInt(tab.dataset.code||'3');
  const temp=parseFloat(tab.dataset.temp||'20');
  const hum=parseFloat(tab.dataset.hum||'50');
  const wind=parseFloat(tab.dataset.wind||'10');
  const info=getWeather(code);
  currentWeatherInfo=info;currentCityName=city.name;

  const wCard=document.getElementById('main-weather-card');
  if(wCard) wCard.innerHTML=buildWeatherHTML(city,Math.round(temp),Math.round(hum),Math.round(wind),info,r.color);

  const valid=[];
  document.querySelectorAll('.pokemon-card[data-pid]').forEach(c=>{
    const poke=pokeCache[parseInt(c.dataset.pid)];if(poke)valid.push(poke);
  });
  const matchCount=valid.filter(p=>p.types.some(t=>info.types.includes(t))).length;
  const strip=document.getElementById('weather-strip');
  if(strip){
    const badges=info.types.map(t=>`<span class="type-badge t-${t}">${t}</span>`).join('');
    strip.innerHTML=`<span class="types-strip-label">Tipos ativos em ${city.name} · ${matchCount} Pokémon em vantagem · +25%</span>${badges}`;
  }
  document.querySelectorAll('.pokemon-card[data-pid]').forEach(card=>{
    const poke=pokeCache[parseInt(card.dataset.pid)];if(!poke)return;
    card.classList.toggle('weather-match',poke.types.some(t=>info.types.includes(t)));
  });
}

function buildWeatherHTML(city,temp,hum,wind,info,color){
  return `
    <div class="wc-city-name">${city.name}<span class="wc-city-label">${city.label}</span></div>
    <div class="wc-temp-row"><span class="wc-temp">${temp}</span><span class="wc-unit">°C</span></div>
    <div class="wc-icon">${info.icon}</div>
    <div class="wc-desc">${info.desc}</div>
    <div class="wc-details">
      <div class="wc-detail"><div class="wc-dl">Umidade</div><div class="wc-dv">${hum}%</div></div>
      <div class="wc-detail"><div class="wc-dl">Vento</div><div class="wc-dv">${wind} km/h</div></div>
    </div>`;
}

function renderDetailContent(r,weatherArr,pokes,activeIdx){
  const city=r.cities[activeIdx];
  const activeW=weatherArr[activeIdx];
  const info=activeW?getWeather(activeW.weather_code):null;
  const activeTypes=info?.types||[];
  const matchCount=pokes.filter(p=>p.types.some(t=>activeTypes.includes(t))).length;

  const cityTabsHtml=r.cities.map((c,i)=>{
    const w=weatherArr[i];
    const inf=w?getWeather(w.weather_code):null;
    const temp=w?Math.round(w.temperature_2m):'-';
    return `<button class="city-tab${i===activeIdx?' active':''}"
      data-code="${w?.weather_code||3}"
      data-temp="${w?.temperature_2m||20}"
      data-hum="${w?Math.round(w.relative_humidity_2m):50}"
      data-wind="${w?Math.round(w.wind_speed_10m):10}"
      onclick="switchCity('${r.id}',${i})">
      <span class="city-tab-icon">${inf?.icon||'—'}</span>
      <span class="city-tab-name">${c.name}</span>
      <span class="city-tab-temp">${temp}°C</span>
      <span class="city-tab-label">${c.label}</span>
    </button>`;
  }).join('');

  const typeBadges=activeTypes.map(t=>`<span class="type-badge t-${t}">${t}</span>`).join('');

  const pokesHtml=pokes.map(p=>{
    const isMatch=p.types.some(t=>activeTypes.includes(t));
    const captured=hasInv(p.id);
    const rar=getRarity(p.id);
    const rate=Math.round(getCatchRate(p,info)*100);
    const dots=p.types.map(t=>`<span class="ptype-dot t-${t}" title="${t}"></span>`).join('');
    return `
      <div class="pokemon-card${isMatch?' weather-match':''}${captured?' is-captured':''}" data-pid="${p.id}">
        ${captured?'<div class="captured-overlay"><span>✓</span></div>':''}
        <div class="pokemon-rarity-pip" style="background:${rar.color}" title="${rar.label}"></div>
        <div class="pokemon-sprite-wrap">
          <img class="pokemon-sprite" src="${p.sprite}" alt="${p.name}" loading="lazy"
            onerror="this.style.opacity='.15'"
            onmouseover="this.src='${p.art}';this.classList.add('showing-art')"
            onmouseout="this.src='${p.sprite}';this.classList.remove('showing-art')">
        </div>
        <div class="pokemon-name">${p.name.replace(/-/g,' ')}</div>
        <div class="pokemon-type-dots">${dots}</div>
        <div class="catch-rate-wrap">
          <div class="catch-rate-bar-track"><div class="catch-rate-bar-fill" style="width:${rate}%;background:${rar.color}"></div></div>
          <span class="catch-rate-pct">${rate}%</span>
        </div>
        <button class="btn-capture${captured?' captured':''}" id="capture-btn-${p.id}" ${captured?'disabled':''} onclick="attemptCapture(${p.id},'${r.id}')">
          ${captured?'<span>✓ Capturado</span>':'<span class="pokeball-icon">⬤</span><span>Capturar</span>'}
        </button>
      </div>`;
  }).join('');

  document.getElementById('detail-content').innerHTML=`
    <div class="detail-region-header" style="--rc:${r.color}">
      <div class="drh-left">
        <div class="drh-gen-badge">${r.gen}</div>
        <div class="drh-name">${r.name}</div>
        <div class="drh-biome">${r.biome}</div>
        <p class="drh-desc">${r.description}</p>
        <div class="drh-landmark">
          <span class="drh-landmark-icon">◈</span>
          <span>${r.landmark}</span>
        </div>
      </div>
      <div class="drh-right">
        <div class="weather-main-card" id="main-weather-card" style="border-top-color:${r.color}">
          ${buildWeatherHTML(city,activeW?Math.round(activeW.temperature_2m):'-',activeW?Math.round(activeW.relative_humidity_2m):0,activeW?Math.round(activeW.wind_speed_10m):0,info||{icon:'—',desc:'—',types:[]},r.color)}
        </div>
      </div>
    </div>

    <div class="city-tabs-section">
      <div class="city-tabs-header">
        <span class="city-tabs-title">Cidades · Clima ao vivo</span>
        <span class="city-tabs-hint">Clique para mudar o clima ativo</span>
      </div>
      <div class="city-tabs-row">${cityTabsHtml}</div>
    </div>

    <div class="weather-types-strip" id="weather-strip">
      <span class="types-strip-label">Tipos ativos em ${city.name} · ${matchCount} Pokémon em vantagem · +25% de captura</span>
      ${typeBadges}
    </div>

    <div class="pokemon-section-header">
      <div class="psh-left">
        <span class="psh-title">Pokémon da Região</span>
        <span class="psh-count">${pokes.length} registrados</span>
      </div>
      <span class="psh-hint">Passe o mouse para arte oficial · ◆ tipo ativo</span>
    </div>
    <div class="pokemon-grid">${pokesHtml}</div>
  `;
}

function closeDetail(){
  document.getElementById('detail-panel').classList.remove('visible');
  document.querySelectorAll('.region-card').forEach(c=>c.classList.remove('active'));
  currentWeatherInfo=null;currentRegionId=null;currentCityName=null;
}

// ════ INVENTORY ════
function openInventory(){
  const panel=document.getElementById('inventory-panel');
  panel.classList.remove('inv-opening');
  panel.setAttribute('aria-hidden','false');
  requestAnimationFrame(()=>{
    panel.classList.add('inv-opening');
    document.body.style.overflow='hidden';
    renderInventoryPanel(true);
  });
}
function closeInventory(){
  document.getElementById('inventory-panel').classList.remove('inv-opening');
  document.getElementById('inventory-panel').setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
let invFilter='all';
function setInvFilter(type){
  invFilter=type;
  document.querySelectorAll('.inv-filter-btn').forEach(b=>b.classList.toggle('active',b.dataset.filter===type));
  renderInventoryPanel(false);
}
function renderInventoryPanel(full=true){
  const inv=loadInv();
  if(full){
    const byRegion={};inv.forEach(p=>{byRegion[p.region]=(byRegion[p.region]||0)+1;});
    const top=Object.entries(byRegion).sort((a,b)=>b[1]-a[1])[0];
    const stats=document.getElementById('inv-stats');
    if(stats)stats.innerHTML=`
      <div class="inv-stat"><span class="inv-stat-num">${inv.length}</span><span class="inv-stat-label">Capturados</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${Object.keys(byRegion).length}</span><span class="inv-stat-label">Regiões</span></div>
      <div class="inv-stat"><span class="inv-stat-num">${inv.filter(p=>p.rarity==='Lendário').length}</span><span class="inv-stat-label">Lendários</span></div>
      <div class="inv-stat"><span class="inv-stat-num" style="font-size:clamp(.7rem,1.5vw,1.1rem)">${top?top[0]:'—'}</span><span class="inv-stat-label">Região top</span></div>
    `;
  }
  const grid=document.getElementById('inv-grid');if(!grid)return;
  const filtered=invFilter==='all'?inv
    :invFilter==='legendary'?inv.filter(p=>p.rarity==='Lendário')
    :invFilter==='epic'?inv.filter(p=>p.rarity==='Épico')
    :inv.filter(p=>p.types?.includes(invFilter));
  if(filtered.length===0){
    grid.innerHTML=`<div class="inv-empty"><div class="inv-empty-icon">🎒</div><div>${invFilter!=='all'?'Nenhum Pokémon nesta categoria.':'Mochila vazia — explore as regiões!'}</div><div class="inv-empty-sub">Clique em "Capturar" nos cards de cada região.</div></div>`;
    return;
  }
  grid.innerHTML=filtered.map(p=>{
    const rc=p.regionColor||'#38bdf8';
    const dots=(p.types||[]).map(t=>`<span class="ptype-dot t-${t}" title="${t}"></span>`).join('');
    return `
      <div class="inv-pokemon-card" style="--rc:${rc}">
        <div class="inv-card-region-bar"></div>
        <div class="inv-card-top-row">
          <span class="inv-card-rarity" style="color:${p.rarityColor||'#94a3b8'}">${p.rarity||'—'}</span>
          <span class="inv-card-region" style="color:${rc}">${p.region}</span>
        </div>
        <img class="inv-sprite" src="${p.spriteArt||p.sprite}" alt="${p.name}" onerror="this.src='${p.sprite}'">
        <div class="inv-poke-name">${p.name}</div>
        <div class="inv-poke-types">${dots}</div>
        <div class="inv-poke-meta">
          <div class="inv-meta-item"><span class="inv-meta-l">Cidade</span><span class="inv-meta-v">${p.regionCity}</span></div>
          <div class="inv-meta-item"><span class="inv-meta-l">Clima</span><span class="inv-meta-v">${p.weatherIcon} ${p.weather}</span></div>
          <div class="inv-meta-item"><span class="inv-meta-l">Data</span><span class="inv-meta-v">${p.capturedAt}</span></div>
        </div>
        <button class="btn-release" onclick="releasePokemon(${p.id})">↩ Soltar</button>
      </div>`;
  }).join('');
}
function releasePokemon(id){
  const p=loadInv().find(e=>e.id===id);
  if(!p||!confirm(`Soltar ${p.name}?`))return;
  removeInv(id);showToast(`${p.name} solto.`,'info');renderInventoryPanel(true);
  const btn=document.getElementById(`capture-btn-${id}`);
  if(btn){btn.innerHTML='<span class="pokeball-icon">⬤</span><span>Capturar</span>';btn.disabled=false;btn.classList.remove('captured');}
}

// ════ INIT ════
renderGrid();syncBadges();