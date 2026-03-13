/* ════════════════════════════════
   KE · Global Entrepreneurship Dashboard
   index.js
════════════════════════════════ */

// ─── CONSTANTS ───
let GEI = null;
const YEARS = ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
const PILLARS = ['economic','human_capital','connectedness','governance','market_potential'];
const PILLAR_LABELS = ['Economic & Financial','Human Capital','Connectedness','Governance','Market Potential'];
let charts = {};

// ─── COUNTRY COORDINATES (matching exact Excel names) ───
const countryCoords = {
  'Albania': [41.15, 20.17], 'Algeria': [28.03, 1.66], 'Angola': [-11.20, 17.87],
  'Argentina': [-38.42, -63.62], 'Armenia': [40.07, 45.04], 'Australia': [-25.27, 133.78],
  'Austria': [47.52, 14.55], 'Azerbaijan': [40.14, 47.58],
  'Bangladesh': [23.68, 90.36], 'Barbados': [13.19, -59.54], 'Belarus': [53.71, 27.97],
  'Belgium': [50.50, 4.47], 'Belize': [17.19, -88.50], 'Benin': [9.31, 2.32],
  'Bosnia and Herzegovina': [43.92, 17.68], 'Botswana': [-22.33, 24.68],
  'Brazil': [-14.24, -51.93], 'Brunei Darussalam': [4.54, 114.73], 'Bulgaria': [42.73, 25.48],
  'Burkina Faso': [12.36, -1.53], 'Burundi': [-3.37, 29.92],
  'Cabo Verde': [14.93, -23.51], 'Cambodia': [12.57, 104.99],
  'Cameroon': [7.37, 12.35], 'Canada': [56.13, -106.35], 'Chad': [15.45, 18.73],
  'Chile': [-35.68, -71.54], 'China': [35.86, 104.19], 'Colombia': [4.57, -74.30],
  'Congo, Democratic Republic of': [-4.04, 21.76], 'Costa Rica': [9.75, -83.75],
  'Croatia': [45.10, 15.20], 'Cyprus': [35.13, 33.43], 'Czech Republic': [49.82, 15.47],
  "Côte d'Ivoire": [7.54, -5.55],
  'Denmark': [56.26, 9.50], 'Djibouti': [11.83, 42.59],
  'Dominican Republic': [18.74, -70.16], 'Ecuador': [-1.83, -78.18],
  'Egypt, Arab Republic of': [26.82, 30.80], 'El Salvador': [13.79, -88.90],
  'Estonia': [58.60, 25.01], 'Eswatini': [-26.52, 31.47], 'Ethiopia': [9.14, 40.49],
  'Fiji': [-17.71, 178.07], 'Finland': [61.92, 25.75], 'France': [46.23, 2.21],
  'Georgia': [42.32, 43.36], 'Germany': [51.17, 10.45], 'Ghana': [7.95, -1.02],
  'Greece': [39.07, 21.82], 'Guatemala': [15.78, -90.23], 'Guinea': [9.95, -11.19],
  'Guyana': [4.86, -58.93],
  'Hong Kong (SAR, China)': [22.32, 114.17], 'Hungary': [47.16, 19.50],
  'Iceland': [64.96, -19.02], 'India': [20.59, 78.96], 'Indonesia': [-0.79, 113.92],
  'Iran, Islamic Republic of': [32.43, 53.69], 'Ireland': [53.41, -8.24],
  'Israel': [31.05, 34.85], 'Italy': [41.87, 12.57], 'Jamaica': [18.11, -77.30],
  'Japan': [36.20, 138.25], 'Jordan': [30.59, 36.24],
  'Kazakhstan': [48.02, 66.92], 'Kenya': [-0.02, 37.91], 'Korea, Republic of': [35.91, 127.77],
  'Kuwait': [29.31, 47.48], 'Kyrgyz Republic': [41.20, 74.77],
  'Laos': [19.86, 102.50], 'Latvia': [56.88, 24.60], 'Lesotho': [-29.61, 28.23],
  'Lithuania': [55.17, 23.88], 'Luxembourg': [49.82, 6.13],
  'Macau (SAR, China)': [22.17, 113.55], 'Madagascar': [-18.77, 46.87],
  'Malaysia': [4.21, 101.98], 'Mali': [17.57, -3.99], 'Malta': [35.94, 14.37],
  'Mauritania': [21.01, -10.94], 'Mauritius': [-20.35, 57.55], 'Mexico': [23.63, -102.55],
  'Moldova': [47.41, 28.37], 'Mongolia': [46.86, 103.85], 'Montenegro': [42.71, 19.37],
  'Morocco': [31.79, -7.09], 'Mozambique': [-18.67, 35.53],
  'Namibia': [-22.96, 18.49], 'Nepal': [28.39, 84.12], 'Netherlands': [52.13, 5.29],
  'New Zealand': [-40.90, 174.89], 'Nicaragua': [12.87, -85.21], 'Niger': [17.61, 8.08],
  'North Macedonia': [41.61, 21.75], 'Norway': [60.47, 8.47],
  'Oman': [21.51, 55.92], 'Pakistan': [30.38, 69.35], 'Panama': [8.54, -80.78],
  'Paraguay': [-23.44, -58.44], 'Peru': [-9.19, -75.02], 'Philippines': [12.88, 121.77],
  'Poland': [51.92, 19.15], 'Portugal': [39.40, -8.22], 'Romania': [45.94, 24.97],
  'Russian Federation': [61.52, 105.32], 'Rwanda': [-1.94, 29.87],
  'Samoa': [-13.76, -172.10], 'Saudi Arabia': [23.89, 45.08], 'Senegal': [14.50, -14.45],
  'Serbia': [44.02, 21.01], 'Singapore': [1.35, 103.82], 'Slovak Republic': [48.67, 19.70],
  'Slovenia': [46.15, 14.99], 'South Africa': [-30.56, 22.94], 'Spain': [40.46, -3.75],
  'Sri Lanka': [7.87, 80.77], 'Suriname': [3.92, -56.03], 'Sweden': [60.13, 18.64],
  'Switzerland': [46.82, 8.23], 'Tajikistan': [38.86, 71.28], 'Tanzania': [-6.37, 34.89],
  'Thailand': [15.87, 100.99], 'Timor-Leste': [-8.87, 125.73], 'Togo': [8.62, 0.82],
  'Tunisia': [33.89, 9.54], 'Turkey': [38.96, 35.24], 'Uganda': [1.37, 32.29],
  'Ukraine': [48.38, 31.17], 'United Arab Emirates': [23.42, 53.85],
  'United Kingdom': [55.38, -3.44], 'United States of America': [37.09, -95.71],
  'Uruguay': [-32.52, -55.77], 'Uzbekistan': [41.38, 64.59],
  'Vanuatu': [-15.38, 166.96], 'Vietnam': [14.06, 108.28]
};

// ─── INCOME TYPE COLOR SYSTEM ───
const INCOME_COLORS = {
  'High income':           { base:'#1a6bb5', shades:['#0d4a82','#1a6bb5','#3b9ee8','#6fbff5','#a0d4fa'] },
  'Upper middle income':   { base:'#1a9b7a', shades:['#0d6e55','#1a9b7a','#27c99a','#5ddab7','#90ead4'] },
  'Lower middle income':   { base:'#c8a800', shades:['#8a7400','#c8a800','#f5d000','#f7dc55','#f9e88a'] },
  'Low income':            { base:'#c86432', shades:['#8a4020','#c86432','#e08050','#eda880','#f5c8a8'] }
};

function getIncomeColor(income, score) {
  const ic = INCOME_COLORS[income] || INCOME_COLORS['Low income'];
  // Use score to pick shade: 0-20=4, 20-40=3, 40-60=2, 60-80=1, 80-100=0 (darkest=highest score)
  const idx = Math.max(0, Math.min(4, Math.floor((100-(score||0))/20)));
  return ic.shades[idx];
}

function getColor(score) {
  if (!score) return '#ccddcc';
  if (score >= 80) return '#0d6e42';
  if (score >= 70) return '#1a9b5f';
  if (score >= 60) return '#2ecc8a';
  if (score >= 50) return '#7fd4ae';
  if (score >= 40) return '#a8d8c0';
  if (score >= 30) return '#c8e8d8';
  return '#e8f5f0';
}

// ─── NAVIGATION ───
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const nav = document.querySelector(`.nav-item[onclick="showPage('${name}')"]`);
  if (nav) nav.classList.add('active');
  // Sync bottom nav
  document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
  const mobNav = document.querySelector(`.mob-nav-item[data-page="${name}"]`);
  if (mobNav) mobNav.classList.add('active');
  // Scroll to top
  window.scrollTo({top:0, behavior:'smooth'});
  if (name === 'cambodia' && GEI) renderCambodiaPage();
  if (name === 'insights' && GEI) renderInsightsPage();
  if (name === 'comparison' && GEI) initComparison();
}

// ─── DATA LOAD ───
async function loadData() {
  try {
    const res = await fetch('gei_data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    GEI = await res.json();
    document.getElementById('loader').style.display = 'none';
    initAll();
  } catch(e) {
    console.error(e);
    document.getElementById('loader').innerHTML = '<div style="color:red;font-size:16px;text-align:center;padding:20px">⚠️ Could not load data.<br><small>Make sure gei_data.json is in the same folder.</small></div>';
  }
}

function initAll() {
  populateFilters();
  populateCountrySelectors();
  applyFilters();
  renderCambodiaPage();
  renderInsightsPage();
  initComparison();
}

function populateFilters() {
  const rSel = document.getElementById('filter-region');
  const iSel = document.getElementById('filter-income');
  const cSel = document.getElementById('filter-country');
  GEI.regions.forEach(r => rSel.innerHTML += `<option value="${r}">${r}</option>`);
  GEI.incomes.forEach(i => iSel.innerHTML += `<option value="${i}">${i}</option>`);
  GEI.country_names.forEach(c => cSel.innerHTML += `<option value="${c}">${c}</option>`);
}

function populateCountrySelectors() {
  ['cmp-c1','cmp-c2','cmp-c3','detail-country'].forEach(id => {
    const sel = document.getElementById(id);
    GEI.country_names.forEach(c => sel.innerHTML += `<option value="${c}">${c}</option>`);
  });
  document.getElementById('cmp-c1').value = 'Cambodia';
  document.getElementById('cmp-c2').value = 'Singapore';
  document.getElementById('cmp-c3').value = 'Thailand';
  document.getElementById('detail-country').value = 'Cambodia';
}

// ─── FILTERS ───
function getFiltered() {
  const r = document.getElementById('filter-region').value;
  const i = document.getElementById('filter-income').value;
  const c = document.getElementById('filter-country').value;
  return GEI.countries.filter(row => {
    if (r && row.region !== r) return false;
    if (i && row.income !== i) return false;
    if (c && row.country !== c) return false;
    return true;
  });
}

function resetFilters() {
  document.getElementById('filter-region').value = '';
  document.getElementById('filter-income').value = '';
  document.getElementById('filter-country').value = '';
  applyFilters();
}

function applyFilters() {
  const data = getFiltered();
  updateKPIs(data);
  renderMap(data);
  renderTopTable(data);
  renderRegionChart(data);
  renderIncomeChart(data);
  renderPillarRadar(data);
  renderDistribution(data);
  renderMainTable(data);
}

// ─── KPI UPDATE ───
function updateKPIs(data) {
  document.getElementById('kpi-count').textContent = data.length;
  if (!data.length) return;
  const avg = Math.round(data.reduce((s,c) => s+(c.index_score||0),0) / data.length);
  document.getElementById('kpi-avg').textContent = avg;
  const sorted = [...data].sort((a,b) => (b.index_score||0)-(a.index_score||0));
  document.getElementById('kpi-top').textContent = sorted[0]?.country || '—';
  document.getElementById('kpi-top-score').textContent = `Score: ${sorted[0]?.index_score||'—'}/100`;
  const allSorted = [...GEI.countries].sort((a,b)=>(b.index_score||0)-(a.index_score||0));
  const camIdx = allSorted.findIndex(c=>c.country==='Cambodia');
  document.getElementById('kpi-cambodia-rank').textContent = camIdx >= 0 ? `#${camIdx+1}` : '—';
  const cam = GEI.countries.find(c=>c.country==='Cambodia');
  document.getElementById('kpi-cambodia-score').textContent = `Score: ${cam?.index_score||'—'}/100`;
}

// ─── MAP ───
let mapInstance = null;
let mapLayers = [];

function renderMap(data) {
  if (!mapInstance) {
    mapInstance = L.map('world-map', { center:[20,10], zoom:2, minZoom:1, maxZoom:6, zoomControl:true, attributionControl:false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution:'&copy; CartoDB'
    }).addTo(mapInstance);
  }
  mapLayers.forEach(l => mapInstance.removeLayer(l));
  mapLayers = [];
  data.forEach(c => {
    const coords = countryCoords[c.country];
    if (!coords || !c.index_score) return;
    const lat = coords[0], lng = coords[1];
    if (isNaN(lat)||isNaN(lng)) return;
    const incomeColor = getIncomeColor(c.income, c.index_score);
    const radius = 5 + (c.index_score/100)*9;
    const marker = L.circleMarker([lat,lng], {
      radius, color:'rgba(255,255,255,0.9)', weight:1.5,
      fillColor: incomeColor, fillOpacity:0.88
    }).addTo(mapInstance);
    const incBase = (INCOME_COLORS[c.income]||INCOME_COLORS['Low income']).base;
    marker.bindPopup(`
      <div style="font-family:Poppins,sans-serif;min-width:170px">
        <div style="font-weight:700;font-size:14px;margin-bottom:3px">${c.country}</div>
        <div style="font-size:11px;color:#555;margin-bottom:4px">${c.region}</div>
        <div style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600;color:#fff;background:${incBase};margin-bottom:6px">${c.income}</div>
        <div style="font-size:22px;font-weight:800;color:${incBase};margin:4px 0">${c.index_score}<span style="font-size:13px;color:#888">/100</span></div>
        <div style="font-size:10px;display:grid;grid-template-columns:1fr 1fr;gap:3px;color:#555">
          <span>💰 Eco: ${c.economic}</span><span>👥 HC: ${c.human_capital}</span>
          <span>🔗 Con: ${c.connectedness}</span><span>⚖️ Gov: ${c.governance}</span>
          <span>🛒 Mkt: ${c.market_potential}</span>
        </div>
      </div>`);
    mapLayers.push(marker);
  });
}

// ─── TOP TABLE ───
function renderTopTable(data) {
  const sorted = [...data].sort((a,b)=>(b.index_score||0)-(a.index_score||0)).slice(0,20);
  const allSorted = [...GEI.countries].sort((a,b)=>(b.index_score||0)-(a.index_score||0));
  let html = '';
  sorted.forEach((c,i) => {
    const globalRank = allSorted.findIndex(x=>x.country===c.country)+1;
    const bar = `<div class="score-bar"><div class="score-bar-bg"><div class="score-bar-fill" style="width:${c.index_score}%;background:${getColor(c.index_score)}"></div></div><span style="font-size:11px;font-weight:700;color:var(--green-dark)">${c.index_score}</span></div>`;
    html += `<tr><td><div class="rank-badge${globalRank<=3?' top3':''}">${globalRank}</div></td><td><strong>${c.country}</strong></td><td style="min-width:110px">${bar}</td></tr>`;
  });
  document.getElementById('top-table-body').innerHTML = html;
}

// ─── REGION CHART ───
function renderRegionChart(data) {
  const regionMap = {};
  data.forEach(c => {
    if (!c.region) return;
    if (!regionMap[c.region]) regionMap[c.region] = { scores:[], incomes:{} };
    regionMap[c.region].scores.push(c.index_score||0);
    if (c.income) regionMap[c.region].incomes[c.income] = (regionMap[c.region].incomes[c.income]||0)+1;
  });
  const labels = Object.keys(regionMap);
  const avgs = labels.map(r => Math.round(regionMap[r].scores.reduce((s,v)=>s+v,0)/regionMap[r].scores.length));
  // Color bars by dominant income type in each region
  const REGION_COLORS = ['#1a6bb5','#27a891','#c8a800','#c86432','#7b4fbf','#2ecc8a','#e05252'];
  const ctx = document.getElementById('regionChart');
  if (charts.region) charts.region.destroy();
  charts.region = new Chart(ctx, {
    type:'bar',
    data:{ labels, datasets:[{
      label:'Avg Index Score', data:avgs,
      backgroundColor: labels.map((_,i)=>REGION_COLORS[i%REGION_COLORS.length]+'bb'),
      borderColor: labels.map((_,i)=>REGION_COLORS[i%REGION_COLORS.length]),
      borderWidth:2, borderRadius:7
    }] },
    options:{ plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,max:100,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:9}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:8}}}}, responsive:true, maintainAspectRatio:true }
  });
}

// ─── INCOME CHART ───
function renderIncomeChart(data) {
  const incMap = {};
  data.forEach(c => { if (!c.income) return; if (!incMap[c.income]) incMap[c.income]=[]; incMap[c.income].push(c.index_score||0); });
  const order = ['High income','Upper middle income','Lower middle income','Low income'];
  const labels = order.filter(k=>incMap[k]);
  const avgs = labels.map(k=>Math.round(incMap[k].reduce((s,v)=>s+v,0)/incMap[k].length));
  const incomeColors = labels.map(l => (INCOME_COLORS[l]||INCOME_COLORS['Low income']).base);
  const ctx = document.getElementById('incomeChart');
  if (charts.income) charts.income.destroy();
  charts.income = new Chart(ctx, {
    type:'doughnut',
    data:{ labels, datasets:[{ data:avgs, backgroundColor:incomeColors.map(c=>c+'cc'), borderColor:incomeColors, borderWidth:2.5, hoverOffset:8 }] },
    options:{ plugins:{ legend:{position:'bottom',labels:{font:{family:'Poppins',size:10},padding:10,usePointStyle:true}}, tooltip:{callbacks:{label:ctx=>`${ctx.label}: ${ctx.parsed}/100 avg`}} }, responsive:true, maintainAspectRatio:true, aspectRatio: 3}
  });
}

// ─── PILLAR RADAR ───
function renderPillarRadar(data) {
  if (!data.length) return;
  const avgs = PILLARS.map(p=>Math.round(data.reduce((s,c)=>s+(c[p]||0),0)/data.length));
  const ctx = document.getElementById('pillarRadar');
  if (charts.radar) charts.radar.destroy();
  charts.radar = new Chart(ctx, {
    type:'radar',
    data:{ labels:PILLAR_LABELS, datasets:[{ label:'Average Score', data:avgs, backgroundColor:'rgba(26,155,95,0.18)', borderColor:'rgba(26,155,95,0.9)', pointBackgroundColor:'rgba(26,155,95,1)', borderWidth:2, pointRadius:3 }] },
    options:{ scales:{r:{min:0,max:100,ticks:{stepSize:20,font:{family:'Poppins',size:8}},grid:{color:'rgba(26,107,181,0.10)'},pointLabels:{font:{family:'Poppins',size:9}}}}, plugins:{legend:{display:false}}, responsive:true, maintainAspectRatio:true, aspectRatio: 3}
  });
}

// ─── DISTRIBUTION ───
function renderDistribution(data) {
  const bins=[0,10,20,30,40,50,60,70,80,90,100];
  const counts=new Array(10).fill(0);
  data.forEach(c=>{ if(c.index_score){ const b=Math.min(Math.floor(c.index_score/10),9); counts[b]++; } });
  const labels=bins.slice(0,-1).map((b,i)=>`${b}-${bins[i+1]}`);
  const ctx=document.getElementById('distributionChart');
  if(charts.dist) charts.dist.destroy();
  charts.dist=new Chart(ctx,{
    type:'bar',
    data:{labels,datasets:[{label:'Countries',data:counts,backgroundColor:'rgba(26,107,181,0.55)',borderColor:'rgba(26,107,181,0.8)',borderWidth:2,borderRadius:5}]},
    options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:9}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:8}}}},responsive:true,maintainAspectRatio:true}
  });
}

// ─── MAIN TABLE (with global rank) ───
let currentTablePillar = 'index_score';

const PILLAR_META = {
  'index_score':     { label:'Index Score',    key:'index_score' },
  'economic':        { label:'Economic',        key:'economic' },
  'human_capital':   { label:'Human Capital',   key:'human_capital' },
  'connectedness':   { label:'Connected',       key:'connectedness' },
  'governance':      { label:'Governance',      key:'governance' },
  'market_potential':{ label:'Market Potential',key:'market_potential' }
};

function setTablePillar(pillar) {
  currentTablePillar = pillar;
  document.querySelectorAll('.pillar-tab').forEach(b => b.classList.remove('active'));
  const activeTab = document.getElementById('ptab-' + pillar);
  if (activeTab) activeTab.classList.add('active');
  const hdr = document.getElementById('main-table-score-header');
  if (hdr) hdr.textContent = PILLAR_META[pillar]?.label || 'Score';
  if (GEI) renderMainTable(getFiltered());
}

function renderMainTable(data) {
  const pillar = currentTablePillar || 'index_score';
  const pillarKey = PILLAR_META[pillar]?.key || 'index_score';
  const allSorted = [...GEI.countries].sort((a,b)=>(b[pillarKey]||0)-(a[pillarKey]||0));
  const sorted = [...data].sort((a,b)=>(b[pillarKey]||0)-(a[pillarKey]||0));

  const colHeaders = document.querySelectorAll('#main-table thead th');
  const colMap = {'index_score':4,'economic':5,'human_capital':6,'connectedness':7,'governance':8,'market_potential':9};
  colHeaders.forEach((th,i) => th.classList.toggle('pillar-col-highlight', i === colMap[pillar]));

  const bar = (v, isActive) => {
    if (v === null || v === undefined) return '—';
    const fillStyle = isActive ? 'background:var(--grad-main)' : `background:${getColor(v)}`;
    return `<div class="score-bar"><div class="score-bar-bg"><div class="score-bar-fill" style="width:${v}%;${fillStyle}"></div></div><span style="font-size:10px;font-weight:${isActive?'800':'600'};${isActive?'color:var(--green-dark)':''}">${v}</span></div>`;
  };

  let html = '';
  sorted.forEach(c => {
    const globalRank = allSorted.findIndex(x=>x.country===c.country)+1;
    html += `<tr>
      <td><div class="rank-badge${globalRank<=3?' top3':''}">${globalRank}</div></td>
      <td><strong style="font-size:11.5px">${c.country}</strong></td>
      <td style="font-size:11px;color:var(--text-light)">${c.region||'—'}</td>
      <td style="font-size:11px">${c.income||'—'}</td>
      <td class="${pillar==='index_score'?'pillar-col-highlight':''}">${bar(c.index_score, pillar==='index_score')}</td>
      <td class="${pillar==='economic'?'pillar-col-highlight':''}">${bar(c.economic, pillar==='economic')}</td>
      <td class="${pillar==='human_capital'?'pillar-col-highlight':''}">${bar(c.human_capital, pillar==='human_capital')}</td>
      <td class="${pillar==='connectedness'?'pillar-col-highlight':''}">${bar(c.connectedness, pillar==='connectedness')}</td>
      <td class="${pillar==='governance'?'pillar-col-highlight':''}">${bar(c.governance, pillar==='governance')}</td>
      <td class="${pillar==='market_potential'?'pillar-col-highlight':''}">${bar(c.market_potential, pillar==='market_potential')}</td>
    </tr>`;
  });
  document.getElementById('main-table-body').innerHTML = html;
}

// ─── COUNTRY DETAIL ───
function showCountryDetail() {
  const sel = document.getElementById('detail-country').value;
  if (!sel) return;
  const c = GEI.countries.find(x=>x.country===sel);
  if (!c) return;
  document.getElementById('country-detail-content').style.display = 'block';
  document.getElementById('dh-name').textContent = c.country;
  document.getElementById('dh-sub').textContent = `${c.region||''} · ${c.income||''}`;
  document.getElementById('dh-score').textContent = c.index_score||'—';
  document.getElementById('dh-detail').textContent = c.detail||'No detail available.';
  const allSorted = [...GEI.countries].sort((a,b)=>(b.index_score||0)-(a.index_score||0));
  const rank = allSorted.findIndex(x=>x.country===c.country)+1;
  document.getElementById('dh-meta').innerHTML = `
    <div class="detail-meta-item"><strong>#${rank}</strong>Global Rank</div>
    <div class="detail-meta-item"><strong>${c.region||'—'}</strong>Region</div>
    <div class="detail-meta-item"><strong>${c.income||'—'}</strong>Income Class</div>`;
  document.getElementById('p-eco').textContent = c.economic||'—';
  document.getElementById('p-hum').textContent = c.human_capital||'—';
  document.getElementById('p-con').textContent = c.connectedness||'—';
  document.getElementById('p-gov').textContent = c.governance||'—';
  document.getElementById('p-mkt').textContent = c.market_potential||'—';

  const rCtx = document.getElementById('detailRadar');
  if (charts.detailRadar) charts.detailRadar.destroy();
  charts.detailRadar = new Chart(rCtx, {
    type:'radar',
    data:{ labels:PILLAR_LABELS, datasets:[{ label:c.country, data:PILLARS.map(p=>c[p]||0), backgroundColor:'rgba(26,155,95,0.18)', borderColor:'rgba(26,155,95,0.9)', pointBackgroundColor:'#1a9b5f', borderWidth:2, pointRadius:4 }] },
    options:{ scales:{r:{min:0,max:100,ticks:{stepSize:20,font:{family:'Poppins',size:8}},pointLabels:{font:{family:'Poppins',size:9}}}}, plugins:{legend:{display:false}}, responsive:true, maintainAspectRatio:true, aspectRatio:2}
  });

  const hist = GEI.historical[c.country]||{};
  const trendData = YEARS.map(y=>hist[y]||null);
  const tCtx = document.getElementById('detailTrend');
  if (charts.detailTrend) charts.detailTrend.destroy();
  charts.detailTrend = new Chart(tCtx, {
    type:'line',
    data:{ labels:YEARS, datasets:[{ label:c.country, data:trendData, borderColor:'rgba(26,107,181,0.9)', backgroundColor:'rgba(26,107,181,0.10)', fill:true, tension:0.4, borderWidth:2, pointRadius:3 }] },
    options:{ scales:{y:{min:0,max:100,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:8}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:8}}}}, plugins:{legend:{display:false}}, responsive:true, maintainAspectRatio:true, aspectRatio:2}
  });
}

// ─── COMPARISON ───
function initComparison() { updateComparison(); }

function updateComparison() {
  const c1n = document.getElementById('cmp-c1').value;
  const c2n = document.getElementById('cmp-c2').value;
  const c3n = document.getElementById('cmp-c3').value;
  const cs = [c1n,c2n,c3n].filter(Boolean).map(n=>GEI.countries.find(x=>x.country===n)).filter(Boolean);
  const palette = [
    {border:'rgba(26,155,95,1)',bg:'rgba(26,155,95,0.15)'},
    {border:'rgba(26,107,181,1)',bg:'rgba(26,107,181,0.15)'},
    {border:'rgba(200,184,0,0.9)',bg:'rgba(200,184,0,0.12)'}
  ];
  const allSorted = [...GEI.countries].sort((a,b)=>(b.index_score||0)-(a.index_score||0));
  let kpiHtml = '';
  cs.forEach((c,i) => {
    const rank = allSorted.findIndex(x=>x.country===c.country)+1;
    const incColor = (INCOME_COLORS[c.income]||INCOME_COLORS['Low income']).base;
    const scoreColor = ['var(--green-dark)','var(--blue-dark)','#8a6800'][i];
    kpiHtml += `<div class="kpi-card" style="border-top:3px solid ${scoreColor}">
      <div class="kpi-label" style="font-size:12px;font-weight:700;color:var(--text-dark);text-transform:none;letter-spacing:0">${c.country}</div>
      <div class="kpi-value" style="font-size:44px;color:${scoreColor};margin:6px 0">${c.index_score}</div>
      <div class="kpi-sub" style="font-size:12px">Rank <strong>#${rank}</strong> of 137</div>
      <div style="margin-top:6px;font-size:10px;color:var(--text-light)">${c.region}</div>
      <div style="margin-top:4px;display:inline-block;padding:2px 8px;border-radius:10px;font-size:9.5px;font-weight:600;color:#fff;background:${incColor}">${c.income}</div>
    </div>`;
  });
  document.getElementById('cmp-kpi-row').innerHTML = kpiHtml;
  if (!cs.length) return;

  // Radar
  const rCtx = document.getElementById('cmpRadar');
  if (charts.cmpRadar) charts.cmpRadar.destroy();
  charts.cmpRadar = new Chart(rCtx, {
    type:'radar',
    data:{ labels:PILLAR_LABELS, datasets:cs.map((c,i)=>({ label:c.country, data:PILLARS.map(p=>c[p]||0), backgroundColor:palette[i].bg, borderColor:palette[i].border, pointBackgroundColor:palette[i].border, borderWidth:2, pointRadius:3 })) },
    options:{ scales:{r:{min:0,max:100,ticks:{stepSize:20,font:{family:'Poppins',size:8}},pointLabels:{font:{family:'Poppins',size:9,weight:'600'}}}}, plugins:{legend:{position:'bottom',labels:{font:{family:'Poppins',size:10},padding:10}}}, responsive:true, maintainAspectRatio:true, aspectRatio: 3}
  });

  // Trend
  const tCtx = document.getElementById('cmpTrend');
  if (charts.cmpTrend) charts.cmpTrend.destroy();
  charts.cmpTrend = new Chart(tCtx, {
    type:'line',
    data:{ labels:YEARS, datasets:cs.map((c,i)=>{ const hist=GEI.historical[c.country]||{}; return { label:c.country, data:YEARS.map(y=>hist[y]||null), borderColor:palette[i].border, backgroundColor:palette[i].bg, fill:false, tension:0.4, borderWidth:2, pointRadius:3 }; }) },
    options:{ scales:{y:{min:0,max:100,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:8}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:8}}}}, plugins:{legend:{position:'bottom',labels:{font:{family:'Poppins',size:10}}}}, responsive:true, maintainAspectRatio:true}
  });

  // Bar
  const bCtx = document.getElementById('cmpBar');
  if (charts.cmpBar) charts.cmpBar.destroy();
  charts.cmpBar = new Chart(bCtx, {
    type:'bar',
    data:{ labels:PILLAR_LABELS, datasets:cs.map((c,i)=>({ label:c.country, data:PILLARS.map(p=>c[p]||0), backgroundColor:palette[i].bg.replace('0.15','0.65').replace('0.12','0.65'), borderColor:palette[i].border, borderWidth:2, borderRadius:5 })) },
    options:{ scales:{y:{beginAtZero:true,max:100,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:8}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:9}}}}, plugins:{legend:{position:'bottom',labels:{font:{family:'Poppins',size:10}}}}, responsive:true, maintainAspectRatio:true}
  });
}

// ─── INSIGHTS PAGE ───
function renderInsightsPage() {
  const regions = GEI.regions;
  const regionPillarData = PILLARS.map((p,pi) => ({
    label:PILLAR_LABELS[pi],
    data:regions.map(r => { const cs=GEI.countries.filter(c=>c.region===r); return cs.length ? Math.round(cs.reduce((s,c)=>s+(c[p]||0),0)/cs.length) : 0; }),
    backgroundColor:['rgba(26,155,95,0.65)','rgba(26,107,181,0.65)','rgba(200,184,0,0.65)','rgba(224,82,82,0.55)','rgba(100,60,200,0.55)'][pi],
    borderRadius:4
  }));
  const rpCtx = document.getElementById('regionalPillarChart');
  if (charts.regionalPillar) charts.regionalPillar.destroy();
  charts.regionalPillar = new Chart(rpCtx, {
    type:'bar',
    data:{ labels:regions.map(r=>r.replace('& ','&\n')), datasets:regionPillarData },
    options:{ scales:{y:{beginAtZero:true,max:100,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:8}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:8}}}}, plugins:{legend:{position:'bottom',labels:{font:{family:'Poppins',size:9}}}}, responsive:true, maintainAspectRatio: window.innerWidth>768, aspectRatio: window.innerWidth>768 ? 4 : 1.4 }
  });

  const allSorted = [...GEI.countries].sort((a,b)=>(b.index_score||0)-(a.index_score||0));
  let html = '';
  allSorted.slice(0,20).forEach((c,i) => { html += `<div class="league-item"><div class="league-rank">${i+1}</div><div class="league-country">${c.country}</div><div class="league-score">${c.index_score}/100</div></div>`; });
  document.getElementById('insight-top-20').innerHTML = html;

  const rising  = [{country:'Kuwait',change:9,rank:34},{country:'Mexico',change:8,rank:73},{country:'Albania',change:6,rank:66},{country:'Italy',change:5,rank:36},{country:'Saudi Arabia',change:5,rank:41},{country:'New Zealand',change:4,rank:14},{country:'Japan',change:4,rank:15},{country:'Oman',change:4,rank:43}];
  const falling = [{country:'Russian Federation',change:-18,rank:79},{country:'Hungary',change:-11,rank:48},{country:'Poland',change:-7,rank:45},{country:'Cyprus',change:-7,rank:31},{country:'Finland',change:-5,rank:16},{country:'South Korea',change:-4,rank:17}];
  let rHtml='', fHtml='';
  rising.forEach(r  => rHtml += `<div class="league-item"><div class="league-rank" style="font-size:11px">#${r.rank}</div><div class="league-country">${r.country}</div><div class="league-change up">▲${r.change}</div></div>`);
  falling.forEach(f => fHtml += `<div class="league-item"><div class="league-rank" style="font-size:11px">#${f.rank}</div><div class="league-country">${f.country}</div><div class="league-change down">▼${Math.abs(f.change)}</div></div>`);
  document.getElementById('insight-rising').innerHTML = rHtml;
  document.getElementById('insight-falling').innerHTML = fHtml;
}

// ─── CAMBODIA PAGE ───
function renderCambodiaPage() {
  const cam = GEI.countries.find(c=>c.country==='Cambodia');
  if (!cam) return;
  const allSorted = [...GEI.countries].sort((a,b)=>(b.index_score||0)-(a.index_score||0));
  const rank = allSorted.findIndex(c=>c.country==='Cambodia')+1;
  document.getElementById('cam-rank').textContent = `#${rank}`;

  const hist = GEI.historical['Cambodia']||{};
  const tData = YEARS.map(y=>hist[y]||null);
  const camTrendCtx = document.getElementById('camTrend');
  if (charts.camTrend) charts.camTrend.destroy();
  charts.camTrend = new Chart(camTrendCtx, {
    type:'line',
    data:{ labels:YEARS, datasets:[{ label:'Cambodia', data:tData, borderColor:'rgba(26,155,95,1)', backgroundColor:'rgba(26,155,95,0.12)', fill:true, tension:0.4, borderWidth:2.5, pointRadius:4, pointBackgroundColor:'#0d6e42', pointBorderColor:'#fff', pointBorderWidth:1.5 }] },
    options:{ scales:{y:{min:0,max:60,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:8}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:8}}}}, plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`Score: ${ctx.parsed.y}/100`}}}, responsive:true, maintainAspectRatio:true }
  });

  const neighbors = ['Cambodia','Thailand','Vietnam','Singapore','Malaysia','Myanmar'];
  const nLabels = neighbors.filter(n=>GEI.countries.find(x=>x.country===n));
  const nData = nLabels.map(n=>{ const c=GEI.countries.find(x=>x.country===n); return c?c.index_score:null; });
  const camCmpCtx = document.getElementById('camCompare');
  if (charts.camCompare) charts.camCompare.destroy();
  charts.camCompare = new Chart(camCmpCtx, {
    type:'bar',
    data:{ labels:nLabels, datasets:[{ label:'Index Score', data:nData, backgroundColor:nLabels.map(n=>n==='Cambodia'?'rgba(26,155,95,0.8)':'rgba(26,107,181,0.5)'), borderColor:nLabels.map(n=>n==='Cambodia'?'rgba(26,155,95,1)':'rgba(26,107,181,0.8)'), borderWidth:2, borderRadius:7 }] },
    options:{ scales:{y:{beginAtZero:true,max:100,grid:{color:'rgba(26,107,181,0.07)'},ticks:{font:{family:'Poppins',size:8}}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:9}}}}, plugins:{legend:{display:false}}, responsive:true, maintainAspectRatio:true }
  });

  const peers = ['Cambodia','Thailand','Vietnam','Malaysia'];
  const peerColors = ['rgba(26,155,95','rgba(26,107,181','rgba(200,184,0','rgba(200,100,50'];
  const camRadarCtx = document.getElementById('camRadar');
  if (charts.camRadar) charts.camRadar.destroy();
  charts.camRadar = new Chart(camRadarCtx, {
    type:'radar',
    data:{ labels:PILLAR_LABELS, datasets:peers.map((pName,i)=>{ const c=GEI.countries.find(x=>x.country===pName); if(!c) return null; return { label:pName, data:PILLARS.map(p=>c[p]||0), backgroundColor:`${peerColors[i]},0.12)`, borderColor:`${peerColors[i]},1)`, pointBackgroundColor:`${peerColors[i]},1)`, borderWidth:2, pointRadius:3 }; }).filter(Boolean) },
    options:{ scales:{r:{min:0,max:100,ticks:{stepSize:20,font:{family:'Poppins',size:8}},pointLabels:{font:{family:'Poppins',size:9,weight:'600'}}}}, plugins:{legend:{position:'bottom',labels:{font:{family:'Poppins',size:10}}}}, responsive:true, maintainAspectRatio: window.innerWidth>768, aspectRatio: window.innerWidth>768 ? 3 : 1.2 }
  });
}

// ─── BOOT ───
window.addEventListener('load', () => {
  loadData();
  setTimeout(() => { if(GEI) showCountryDetail(); }, 1200);
});

// ─── MOBILE SIDEBAR TOGGLE ───
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const btn = document.getElementById('mobileMenuBtn');
  const isOpen = sidebar.classList.toggle('mobile-open');
  overlay.classList.toggle('active', isOpen);
  btn.classList.toggle('open', isOpen);
}

// Close sidebar on nav item click (mobile)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const btn = document.getElementById('mobileMenuBtn');
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        btn.classList.remove('open');
      }
    });
  });
});
