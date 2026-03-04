// ── Rates per second (based on scientific averages) ──────────────
const RATES = {
    trees: 15.3,        // pohon/detik  (480M/tahun)
    plastic: 253,         // kg/detik     (8M ton/tahun)
    co2: 1173,        // ton/detik    (37B ton/tahun)
    ice: 8876,        // ton/detik    (280B ton/tahun)
    species: 0.00174,     // spesies/detik (150/hari)
    water: 23148,       // liter/detik  (2B ton/hari)
    fire: 1.268,       // ha/detik     (40M ha/tahun)
    energy: 172454,      // kWh/detik    (15 PWh fosil/tahun)
};

// ── State ─────────────────────────────────────────────────────────
const startTime = Date.now();
const midnightOffset = (() => {
    const now = new Date();
    return (now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds());
})();

let totals = { trees: 0, plastic: 0, co2: 0, ice: 0, species: 0, water: 0, fire: 0, energy: 0 };
let midnightTotals = { trees: 0, plastic: 0, co2: 0, species: 0 };
let co2ppm = 421.28;
const co2Start = 421.28;
const co2RatePerSec = 0.00000372; // ~0.0002 ppm/min increase

// Sparkline histories (last 40 points)
const sparkHistory = {};
['trees', 'plastic', 'co2', 'ice', 'species', 'water', 'fire', 'energy'].forEach(k => sparkHistory[k] = []);

// Log events pool
const logEvents = [
    { color: '#C0392B', text: 'Kebakaran hutan terdeteksi di <strong>Kalimantan Tengah</strong> — luas terbakar: <strong>~340 ha</strong>' },
    { color: '#2E86AB', text: 'Tumpahan minyak kecil terdeteksi di <strong>Selat Malaka</strong> — respons dikerahkan' },
    { color: '#5A8A2A', text: 'Sinyal deforestasi baru dari <strong>Amazon Brasil</strong> — estimasi <strong>2.400 pohon</strong> hilang' },
    { color: '#C4933A', text: 'Suhu laut Mediterania mencatat rekor baru: <strong>+1.7°C</strong> di atas normal musiman' },
    { color: '#7B5EA7', text: 'Peneliti menemukan spesies amfibi baru — saat yang sama <strong>3 spesies lain</strong> dinyatakan punah' },
    { color: '#C65D2A', text: 'Badai tropis kategori 3 berkembang di <strong>Pasifik Barat</strong> — diperkuat suhu laut tinggi' },
    { color: '#2A9D8F', text: 'Pemutihan terumbu karang massal di <strong>Great Barrier Reef</strong> — suhu laut melampaui ambang' },
    { color: '#C0392B', text: 'Kekeringan ekstrem di <strong>Afrika Timur</strong> — 12 juta orang terancam kelaparan' },
    { color: '#2E86AB', text: 'Mikroplastik ditemukan dalam sampel air hujan di <strong>pegunungan Alpen</strong>' },
    { color: '#5A8A2A', text: '<strong>Ethiopia</strong> berhasil menanam 350 juta bibit pohon dalam program reforestasi hari ini' },
    { color: '#C4933A', text: 'Kadar CO₂ di stasiun Mauna Loa mencatat <strong>421.4 ppm</strong> — tertinggi dalam 3,5 juta tahun' },
    { color: '#7B5EA7', text: 'Populasi harimau Sumatera turun ke <strong>287 individu</strong> — penurunan 12% dari tahun lalu' },
    { color: '#2A9D8F', text: 'Cakupan es laut Arktik musim panas: <strong>4.1 juta km²</strong> — terendah sejak pengukuran 1979' },
    { color: '#5A8A2A', text: 'Program solar komunal baru diluncurkan di <strong>Bangladesh</strong> — 50.000 rumah terdampak' },
    { color: '#C65D2A', text: 'Emisi metana dari permafrost Siberia meningkat <strong>8%</strong> dibanding tahun lalu' },
    { color: '#2E86AB', text: 'Plastik sekali pakai dilarang di <strong>27 negara baru</strong> sejak Januari tahun ini' },
];

let logIndex = Math.floor(Math.random() * logEvents.length);
let logCount = 0;

// ── Helpers ───────────────────────────────────────────────────────
function jitter(rate, pct = 0.05) {
    return rate * (1 + (Math.random() - 0.5) * 2 * pct);
}

function fmt(n, decimals = 0) {
    if (decimals > 0) return n.toFixed(decimals);
    return Math.floor(n).toLocaleString('id-ID');
}

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

function hms(sec) {
    return `${pad(sec / 3600)}:${pad((sec % 3600) / 60)}:${pad(sec % 60)}`;
}

function flashEl(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
}

// ── Sparkline renderer ─────────────────────────────────────────────
function updateSparkline(key, val) {
    const hist = sparkHistory[key];
    hist.push(val);
    if (hist.length > 40) hist.shift();
    if (hist.length < 2) return;

    const min = Math.min(...hist);
    const max = Math.max(...hist);
    const range = max - min || 1;
    const W = 200, H = 30;

    const pts = hist.map((v, i) => {
        const x = (i / (hist.length - 1)) * W;
        const y = H - ((v - min) / range) * H;
        return `${x},${y}`;
    });

    const pathD = 'M ' + pts.join(' L ');
    const fillD = pathD + ` L ${W},${H} L 0,${H} Z`;

    const p = document.getElementById(`sparkpath-${key}`);
    const f = document.getElementById(`sparkfill-${key}`);
    if (p) p.setAttribute('d', pathD);
    if (f) f.setAttribute('d', fillD);
}

// ── CO2 Gauge ─────────────────────────────────────────────────────
function updateGauge(ppm) {
    // Map 280–500 ppm to 0–302 dash (the track length)
    const pct = Math.min(1, Math.max(0, (ppm - 280) / (500 - 280)));
    const dash = pct * 302;
    const gaugeFill = document.getElementById('gaugeFill');
    if (gaugeFill) gaugeFill.setAttribute('stroke-dasharray', `${dash} 402`);

    const el = document.getElementById('gaugePPM');
    if (el) el.textContent = ppm.toFixed(2);
    const le = document.getElementById('legendPPM');
    if (le) le.textContent = `~${Math.round(ppm)} ppm`;
    const li = document.getElementById('legendIncrease');
    if (li) li.textContent = (ppm - co2Start).toFixed(4);
}

// ── Log feed ──────────────────────────────────────────────────────
function addLog() {
    const feed = document.getElementById('logFeed');
    if (!feed) return;

    const ev = logEvents[logIndex % logEvents.length];
    logIndex++;

    const now = new Date();
    const timeStr = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
<span class="log-time">${timeStr} UTC</span>
<span class="log-dot" style="background:${ev.color}"></span>
<span class="log-text">${ev.text}</span>
`;

    feed.insertBefore(entry, feed.firstChild);

    // Keep max 20 entries
    while (feed.children.length > 20) feed.removeChild(feed.lastChild);

    logCount++;
}

// ── Clock ─────────────────────────────────────────────────────────
function updateClock() {
    const now = new Date();
    const h = pad(now.getUTCHours());
    const m = pad(now.getUTCMinutes());
    const s = pad(now.getUTCSeconds());
    const cl = document.getElementById('worldClock');
    if (cl) cl.textContent = `${h}:${m}:${s}`;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dateEl = document.getElementById('clockDate');
    if (dateEl) dateEl.textContent = `${days[now.getUTCDay()]}, ${now.getUTCDate()} ${months[now.getUTCMonth()]} ${now.getUTCFullYear()} · UTC`;

    const initEl = document.getElementById('initTime');
    if (initEl && initEl.textContent === '--:--:--') {
        initEl.textContent = `${h}:${m}:${s} UTC`;
    }
}

// ── AQI simulation ────────────────────────────────────────────────
const aqiBase = { delhi: 158, beijing: 112, jakarta: 89, nairobi: 41 };
function updateAQI() {
    const cities = ['delhi', 'beijing', 'jakarta', 'nairobi'];
    const maxes = [200, 200, 200, 80];
    cities.forEach((city, i) => {
        const val = Math.round(aqiBase[city] * (1 + (Math.random() - 0.5) * 0.08));
        const el = document.getElementById(`aqi-${city}`);
        if (el) el.textContent = `${val} µg/m³`;
        const fillEl = document.getElementById(`filli-${city}`);
        if (fillEl) fillEl.style.width = `${Math.min(100, (val / maxes[i]) * 100).toFixed(1)}%`;
    });

    // People exposed counter
    const baseExposed = 2_400_000_000;
    const exposed = Math.round(baseExposed + (Math.random() - 0.5) * 5_000_000);
    const el = document.getElementById('ticker-aqi');
    if (el) el.textContent = exposed.toLocaleString('id-ID') + ' orang';
}

// ── Temperature simulation ────────────────────────────────────────
function updateTemp() {
    const base = 14.89;
    const fluctuation = (Math.random() - 0.5) * 0.04;
    const el = document.getElementById('ticker-temp');
    if (el) el.textContent = (base + fluctuation).toFixed(2) + '°C';
}

// ── Main tick ─────────────────────────────────────────────────────
let tickCount = 0;

function tick() {
    tickCount++;
    const elapsedSec = (Date.now() - startTime) / 1000;
    const midnightSec = midnightOffset + elapsedSec;

    // ── Update totals with jitter ──
    totals.trees += jitter(RATES.trees);
    totals.plastic += jitter(RATES.plastic / 1000); // display in tons
    totals.co2 += jitter(RATES.co2);
    totals.ice += jitter(RATES.ice);
    totals.species += jitter(RATES.species);
    totals.water += jitter(RATES.water);
    totals.fire += jitter(RATES.fire);
    totals.energy += jitter(RATES.energy);

    // ── Midnight totals ──
    midnightTotals.trees = midnightSec * RATES.trees;
    midnightTotals.plastic = (midnightSec * RATES.plastic) / 1000;
    midnightTotals.co2 = midnightSec * RATES.co2;
    midnightTotals.species = midnightSec * RATES.species;

    // ── CO2 ppm ──
    co2ppm += co2RatePerSec + (Math.random() - 0.5) * 0.000001;

    // ── DOM updates ──
    document.getElementById('c-trees').textContent = fmt(totals.trees);
    document.getElementById('c-plastic').textContent = fmt(totals.plastic, 1);
    document.getElementById('c-co2').textContent = fmt(totals.co2);
    document.getElementById('c-ice').textContent = fmt(totals.ice);
    document.getElementById('c-species').textContent = totals.species.toFixed(3);
    document.getElementById('c-water').textContent = fmt(totals.water);
    document.getElementById('c-fire').textContent = fmt(totals.fire, 1);
    document.getElementById('c-energy').textContent = fmt(totals.energy);

    // Midnight banner
    document.getElementById('mb-trees').textContent = fmt(midnightTotals.trees);
    document.getElementById('mb-plastic').textContent = fmt(midnightTotals.plastic, 1);
    document.getElementById('mb-co2').textContent = fmt(midnightTotals.co2);
    document.getElementById('mb-species').textContent = midnightTotals.species.toFixed(2);

    // Elapsed
    document.getElementById('elapsed').textContent = hms(elapsedSec);

    // Sparklines
    Object.keys(sparkHistory).forEach(k => updateSparkline(k, totals[k]));

    // Flash every 3 ticks randomly
    if (tickCount % 3 === 0) {
        const keys = ['c-trees', 'c-co2', 'c-ice', 'c-plastic'];
        flashEl(keys[Math.floor(Math.random() * keys.length)]);
    }

    // CO2 gauge
    updateGauge(co2ppm);

    // Clock
    updateClock();

    // AQI every 5s
    if (tickCount % 5 === 0) updateAQI();

    // Temp every 3s
    if (tickCount % 3 === 0) updateTemp();

    // Log entry every 12–18 seconds
    if (tickCount % (12 + Math.floor(Math.random() * 6)) === 0) addLog();
}

// ── Init ─────────────────────────────────────────────────────────
updateClock();
updateAQI();
updateTemp();
updateGauge(co2ppm);

// First tick immediately, then every second
tick();
setInterval(tick, 1000);

// Log clear button
document.getElementById('logClear').addEventListener('click', () => {
    const feed = document.getElementById('logFeed');
    feed.innerHTML = '';
    const now = new Date();
    const timeStr = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
    feed.innerHTML = `<div class="log-entry"><span class="log-time">${timeStr} UTC</span><span class="log-dot" style="background:var(--olive)"></span><span class="log-text">🌿 Log dibersihkan. Monitoring berlanjut...</span></div>`;
});
