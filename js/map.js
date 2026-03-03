// ── Region Data ──────────────────────────
const regionData = {
    'north-america': {
        name: 'Amerika Utara',
        sub: 'USA, Kanada, Meksiko & Amerika Tengah',
        emoji: '<i class="fa-solid fa-earth-americas"></i>',
        severity: 68,
        severityLabel: 'Tinggi — Memerlukan tindakan segera',
        sevColor: '#C65D2A',
        keyStat: '70%',
        keyStatDesc: 'Pengurangan satwa liar Amerika Utara sejak 1970',
        issues: [
            { icon: '🔥', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Kebakaran Hutan', desc: 'Musim kebakaran semakin panjang — California & Canada mengalami kebakaran rekor berturut-turut.' },
            { icon: '🌡️', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Krisis Iklim', desc: 'Gelombang panas ekstrem, badai, dan cuaca anomali meningkat drastis di seluruh benua.' },
            { icon: '🏭', color: '#9B6BC4', bg: 'rgba(155,107,196,0.15)', title: 'Polusi Industri', desc: 'Emisi karbon industri Amerika Utara masih di antara tertinggi per kapita di dunia.' },
            { icon: '💧', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Krisis Air', desc: 'Danau Mead & Powell mencapai level terendah. Jutaan orang terancam kekurangan air.' },
        ]
    },
    'south-america': {
        name: 'Amerika Selatan',
        sub: 'Brasil, Peru, Kolombia & sekitarnya',
        emoji: '<i class="fa-solid fa-earth-americas"></i>',
        severity: 88,
        severityLabel: 'Kritis — Mendekati titik tidak bisa balik',
        sevColor: '#8B2A2A',
        keyStat: '17%',
        keyStatDesc: 'Kawasan Amazon yang telah hilang — mendekati batas kritis 20%',
        issues: [
            { icon: '🪓', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Deforestasi Amazon', desc: 'Paru-paru Bumi kehilangan rata-rata 10.000 km² per tahun. Lebih dari 1 juta km² sudah gundul.' },
            { icon: '🌊', color: '#4A7DB5', bg: 'rgba(74,125,181,0.15)', title: 'Kontaminasi Sungai', desc: 'Penambangan ilegal mencemari sungai Amazon dengan merkuri, mengancam ratusan komunitas adat.' },
            { icon: '🦜', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Kepunahan Spesies', desc: 'Brasil rumah bagi 10% spesies dunia. Ribuan terancam punah akibat hilangnya habitat.' },
            { icon: '🌧️', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Gangguan Siklus Hujan', desc: '"Sungai terbang" Amazon terganggu, menyebabkan kekeringan parah di Brasil bagian tengah-selatan.' },
        ]
    },
    'europe': {
        name: 'Eropa',
        sub: 'Uni Eropa, UK, Skandinavia & Eropa Timur',
        emoji: '<i class="fa-solid fa-earth-europe"></i>',
        severity: 55,
        severityLabel: 'Sedang-Tinggi — Tindakan legislatif aktif',
        sevColor: '#C4933A',
        keyStat: '2.3°C',
        keyStatDesc: 'Kenaikan suhu rata-rata Eropa — lebih cepat dari rata-rata global',
        issues: [
            { icon: '☀️', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Gelombang Panas Mematikan', desc: 'Eropa memanas 2x lebih cepat dari rata-rata global. Gelombang panas 2023 menewaskan 60.000+ orang.' },
            { icon: '🏔️', color: '#6ABBE0', bg: 'rgba(106,187,224,0.15)', title: 'Gletser Alpen Mencair', desc: 'Gletser di Alpen kehilangan 50% volume sejak 1900 dan diperkirakan hampir hilang pada 2100.' },
            { icon: '🌾', color: '#C4933A', bg: 'rgba(196,147,58,0.15)', title: 'Ketahanan Pangan', desc: 'Kekeringan ekstrem mengancam pertanian Eropa — hasil panen gandum turun hingga 30% di beberapa negara.' },
            { icon: '🐟', color: '#4A7DB5', bg: 'rgba(74,125,181,0.15)', title: 'Overfishing Laut Mediterania', desc: 'Lebih dari 90% ikan di Mediterania ditangkap melebihi batas keberlanjutan.' },
        ]
    },
    'africa': {
        name: 'Afrika',
        sub: 'Sub-Sahara, Afrika Utara & Timur',
        emoji: '<i class="fa-solid fa-earth-africa"></i>',
        severity: 82,
        severityLabel: 'Kritis — Paling rentan terhadap perubahan iklim',
        sevColor: '#8B2A2A',
        keyStat: '55%',
        keyStatDesc: 'Lahan pertanian Afrika berisiko rusak akibat perubahan iklim pada 2050',
        issues: [
            { icon: '🏜️', color: '#C4933A', bg: 'rgba(196,147,58,0.15)', title: 'Desertifikasi Sahel', desc: 'Sabuk Sahel mengalami perluasan gurun. 250 juta orang terancam kehilangan tanah produktif.' },
            { icon: '💧', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Krisis Air Akut', desc: 'Sub-Sahara Afrika: 400 juta orang tanpa akses air minum bersih. Konflik atas sumber air meningkat.' },
            { icon: '🌾', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Ketidakamanan Pangan', desc: 'Iklim yang tidak stabil menghancurkan pola pertanian tradisional. 100+ juta orang rawan kelaparan.' },
            { icon: '🦁', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Hilangnya Satwa Liar', desc: 'Populasi gajah, singa, dan cheetah turun 70–90% dalam 50 tahun akibat perburuan & habitat hilang.' },
        ]
    },
    'middle-east': {
        name: 'Timur Tengah',
        sub: 'Arab Saudi, Iran, Irak, Yordania & sekitarnya',
        emoji: '<i class="fa-solid fa-hamsa"></i>',
        severity: 79,
        severityLabel: 'Tinggi — Wilayah paling terancam kekurangan air',
        sevColor: '#C65D2A',
        keyStat: '14',
        keyStatDesc: 'Negara Timur Tengah menghadapi "water stress" level ekstrem',
        issues: [
            { icon: '💧', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Krisis Air Parah', desc: 'Akuifer bawah tanah mengering dengan kecepatan mengkhawatirkan. Iran, Yaman & Irak dalam kedaruratan air.' },
            { icon: '🌡️', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Suhu Ekstrem', desc: 'Suhu Kuwait & Irak melewati 54°C. Beberapa kota diperkirakan tak layak huni pada 2050.' },
            { icon: '🏜️', color: '#C4933A', bg: 'rgba(196,147,58,0.15)', title: 'Badai Debu', desc: 'Frekuensi badai debu meningkat 5x lipat dalam 20 tahun. Mengancam kesehatan jutaan orang.' },
            { icon: '⛽', color: '#9B6BC4', bg: 'rgba(155,107,196,0.15)', title: 'Ketergantungan Fosil', desc: 'Ekonomi berbasis minyak membuat transisi energi bersih lambat di tengah urgensi krisis.' },
        ]
    },
    'russia': {
        name: 'Rusia & Asia Utara',
        sub: 'Siberia, Kazakhstan & Asia Tengah',
        emoji: '<i class="fa-solid fa-bowl-rice"></i>',
        severity: 62,
        severityLabel: 'Tinggi — Permafrost mencair menyimpan risiko tersembunyi',
        sevColor: '#C65D2A',
        keyStat: '1.7M km²',
        keyStatDesc: 'Permafrost Siberia yang mencair dalam 40 tahun terakhir',
        issues: [
            { icon: '🧊', color: '#6ABBE0', bg: 'rgba(106,187,224,0.15)', title: 'Pencairan Permafrost', desc: 'Permafrost Siberia menyimpan 1,5 triliun ton karbon. Pencairannya dapat memicu lingkaran umpan balik tak terkendali.' },
            { icon: '🔥', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Kebakaran Tundra', desc: 'Kebakaran hutan Siberia 2021 menghanguskan 19 juta hektar — luasnya hampir setara Jerman.' },
            { icon: '🏭', color: '#9B6BC4', bg: 'rgba(155,107,196,0.15)', title: 'Polusi Industri Arktik', desc: 'Tumpahan minyak dan polutan industri mengancam ekosistem Arktik yang sangat rentan.' },
            { icon: '🐻', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Gangguan Ekosistem', desc: 'Beruang kutub, walrus, dan rusa kutub kehilangan habitat es dan tundra yang stabil.' },
        ]
    },
    'south-asia': {
        name: 'Asia Selatan & Tenggara',
        sub: 'India, Indonesia, Thailand, Vietnam & sekitarnya',
        emoji: '<i class="fa-solid fa-earth-asia"></i>',
        severity: 85,
        severityLabel: 'Kritis — Deforestasi & polusi akut',
        sevColor: '#8B2A2A',
        keyStat: '684K ha',
        keyStatDesc: 'Hutan Indonesia yang hilang setiap tahun (rata-rata 2015–2022)',
        issues: [
            { icon: '🪓', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Deforestasi Tropis', desc: 'Indonesia & Malaysia kehilangan hutan Borneo dan Sumatra dengan cepat demi perkebunan sawit.' },
            { icon: '🏭', color: '#9B6BC4', bg: 'rgba(155,107,196,0.15)', title: 'Polusi Udara Parah', desc: 'Jakarta, Delhi & Bangkok masuk 10 kota dengan udara paling kotor di dunia. AQI berbahaya rutin terjadi.' },
            { icon: '🌊', color: '#4A7DB5', bg: 'rgba(74,125,181,0.15)', title: 'Plastik Laut', desc: 'Asia Tenggara bertanggung jawab atas 60% sampah plastik yang masuk ke laut global.' },
            { icon: '💧', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Krisis Air India', desc: 'India akan menjadi negara yang paling tertekan air pada 2030. 600 juta orang sudah kekurangan air.' },
        ]
    },
    'east-asia': {
        name: 'Asia Timur',
        sub: 'Tiongkok, Jepang, Korea & sekitarnya',
        emoji: '<i class="fa-solid fa-torii-gate"></i>',
        severity: 74,
        severityLabel: 'Tinggi — Polusi & industrialisasi masif',
        sevColor: '#C65D2A',
        keyStat: '30%',
        keyStatDesc: 'Pangsa emisi CO₂ global yang dihasilkan Tiongkok',
        issues: [
            { icon: '😷', color: '#9B6BC4', bg: 'rgba(155,107,196,0.15)', title: 'Polusi Udara Kronis', desc: 'Tiongkok & Korea mengalami "airpocalypse" musiman. PM2.5 di Beijing sering 10x batas aman WHO.' },
            { icon: '🌊', color: '#4A7DB5', bg: 'rgba(74,125,181,0.15)', title: 'Pencemaran Laut & Sungai', desc: 'Sungai Yangtze membawa jutaan ton plastik ke laut per tahun. Ekosistem pesisir hancur.' },
            { icon: '🏭', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Emisi Industri Tinggi', desc: 'Asia Timur menghasilkan 35% emisi global. Tiongkok berkomitmen netral karbon 2060, tapi tantangan besar.' },
            { icon: '🐠', color: '#E06A5A', bg: 'rgba(224,106,90,0.15)', title: 'Kerusakan Terumbu Karang', desc: 'Laut Cina Selatan kehilangan 80% terumbu karangnya akibat polusi, penangkapan ikan berlebih & suhu naik.' },
        ]
    },
    'oceania': {
        name: 'Oseania & Pasifik',
        sub: 'Australia, Selandia Baru & Kepulauan Pasifik',
        emoji: '<i class="fa-solid fa-earth-oceania"></i>',
        severity: 76,
        severityLabel: 'Tinggi — Garis depan krisis iklim & laut',
        sevColor: '#C65D2A',
        keyStat: '50%',
        keyStatDesc: 'Terumbu Karang Besar (Great Barrier Reef) yang mengalami pemutihan massal',
        issues: [
            { icon: '🪸', color: '#E06A5A', bg: 'rgba(224,106,90,0.15)', title: 'Pemutihan Great Barrier Reef', desc: 'Terumbu terbesar di dunia mengalami pemutihan massal 6 kali dalam 8 tahun. Suhu laut naik terlalu cepat.' },
            { icon: '🔥', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Kebakaran & Kekeringan Australia', desc: 'Musim panas "Black Summer" 2019–2020 membakar 18 juta hektar & menewaskan 3 miliar satwa liar.' },
            { icon: '🌊', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Kenaikan Permukaan Laut', desc: 'Kepulauan Pasifik seperti Tuvalu dan Kiribati terancam tenggelam dalam 30–50 tahun ke depan.' },
            { icon: '🐊', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Spesies Endemik Terancam', desc: 'Australia memiliki tingkat kepunahan mamalia tertinggi di dunia. 1.700+ spesies terancam.' },
        ]
    },
    'arctic': {
        name: 'Arktik & Greenland',
        sub: 'Lingkaran Arktik & Es Laut Kutub Utara',
        emoji: '<i class="fa-solid fa-igloo"></i>',
        severity: 92,
        severityLabel: 'Sangat Kritis — Mencair 3x lebih cepat dari rata-rata global',
        sevColor: '#8B2A2A',
        keyStat: '75%',
        keyStatDesc: 'Pengurangan volume es laut Arktik musim panas sejak 1979',
        issues: [
            { icon: '🧊', color: '#6ABBE0', bg: 'rgba(106,187,224,0.15)', title: 'Es Laut Mencair', desc: 'Arktik memanas 3–4x lebih cepat dari rata-rata global. 2035 mungkin menjadi musim panas bebas es pertama.' },
            { icon: '🐻‍❄️', color: '#5A8A2A', bg: 'rgba(90,138,42,0.15)', title: 'Beruang Kutub Terancam', desc: 'Populasi beruang kutub turun 30% dalam 3 generasi. Diperkirakan punah fungsional pada akhir abad ini.' },
            { icon: '🌊', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Kenaikan Permukaan Laut Global', desc: 'Pencairan es Greenland & Arktik berkontribusi besar pada kenaikan permukaan laut yang mengancam kota pesisir.' },
            { icon: '🔄', color: '#C65D2A', bg: 'rgba(198,93,42,0.15)', title: 'Umpan Balik Iklim', desc: 'Es yang hilang mengurangi pantulan sinar matahari, mempercepat pemanasan dalam lingkaran yang sulit dihentikan.' },
        ]
    },
    'antarctic': {
        name: 'Antartika',
        sub: 'Lapisan Es Antartika & Laut Selatan',
        emoji: '<i class="fa-solid fa-igloo"></i>',
        severity: 70,
        severityLabel: 'Tinggi — Kehilangan es dengan kecepatan rekor',
        sevColor: '#C65D2A',
        keyStat: '150B ton',
        keyStatDesc: 'Es yang hilang dari Antartika setiap tahun',
        issues: [
            { icon: '🧊', color: '#6ABBE0', bg: 'rgba(106,187,224,0.15)', title: 'Lapisan Es Runtuh', desc: 'Gletser Thwaites — "Gletser Kiamat" — mungkin runtuh dalam dekade ini, menaikkan laut 65cm secara global.' },
            { icon: '🐧', color: '#4A7DB5', bg: 'rgba(74,125,181,0.15)', title: 'Ekosistem Penguin Terancam', desc: 'Populasi penguin kaisar turun 40% akibat kehilangan es laut tempat mereka berkembang biak.' },
            { icon: '🌊', color: '#3A9EBF', bg: 'rgba(58,158,191,0.15)', title: 'Sirkulasi Laut Terganggu', desc: 'Pencairan es memperlambat "sabuk konveyor" laut dunia yang mengatur iklim seluruh planet.' },
            { icon: '🔬', color: '#9B6BC4', bg: 'rgba(155,107,196,0.15)', title: 'Lubang Ozon', desc: 'Meski membaik, lubang ozon Antartika masih terbuka setiap tahun, meningkatkan radiasi UV berbahaya.' },
        ]
    }
};

// ── Issue type → color mapping ───────────
const issueColors = {
    deforestation: '#5A8A2A',
    plastic: '#4A7DB5',
    climate: '#C65D2A',
    water: '#3A9EBF',
    pollution: '#9B6BC4',
    desertification: '#C4933A',
    ice: '#6ABBE0',
    coral: '#E06A5A'
};

// ── Build Region List ────────────────────
function buildRegionList() {
    const list = document.getElementById('regionList');
    list.innerHTML = '';

    Object.entries(regionData).forEach(([id, data]) => {
        const issueKeys = [...new Set(
            [...document.querySelectorAll(`.map-pin[data-region="${id}"]`)]
                .map(p => p.dataset.issue)
        )];

        const item = document.createElement('div');
        item.className = 'region-item';
        item.dataset.region = id;

        const badgesHtml = issueKeys.slice(0, 3).map(iss => {
            const color = issueColors[iss] || '#A3B18A';
            return `<span class="ri-badge" style="background:${color}22;color:${color}">${issueName(iss)}</span>`;
        }).join('');

        item.innerHTML = `
    <div class="ri-icon" style="background:${data.sevColor}22">${data.emoji}</div>
    <div class="ri-text">
      <strong>${data.name}</strong>
      <div class="ri-issues">${badgesHtml}</div>
    </div>
  `;

        item.addEventListener('click', () => selectRegion(id));
        list.appendChild(item);
    });
}

function issueName(key) {
    const names = {
        deforestation: 'Deforestasi', plastic: 'Plastik', climate: 'Iklim',
        water: 'Air', pollution: 'Polusi', desertification: 'Desertifikasi',
        ice: 'Es Mencair', coral: 'Terumbu'
    };
    return names[key] || key;
}

// ── Select Region ────────────────────────
let activeRegion = null;

function selectRegion(regionId) {
    const data = regionData[regionId];
    if (!data) return;

    activeRegion = regionId;

    // Update region list highlight
    document.querySelectorAll('.region-item').forEach(el => {
        el.classList.toggle('active', el.dataset.region === regionId);
    });
    // Scroll list item into view
    const listItem = document.querySelector(`.region-item[data-region="${regionId}"]`);
    if (listItem) listItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

    // Highlight map regions
    document.querySelectorAll('.map-region').forEach(el => {
        if (el.id === `region-${regionId}`) {
            el.classList.remove('dimmed');
            el.classList.add('highlighted');
        } else {
            el.classList.add('dimmed');
            el.classList.remove('highlighted');
        }
    });

    // Populate info panel
    document.getElementById('ipEmoji').innerHTML = data.emoji;
    document.getElementById('ipName').textContent = data.name;
    document.getElementById('ipSub').textContent = data.sub;

    const sevBar = document.getElementById('sevBar');
    sevBar.style.background = data.sevColor;
    // Animate bar
    requestAnimationFrame(() => {
        sevBar.style.width = '0%';
        requestAnimationFrame(() => {
            sevBar.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1)';
            sevBar.style.width = data.severity + '%';
        });
    });
    document.getElementById('sevDesc').textContent = data.severityLabel;

    document.getElementById('ksVal').textContent = data.keyStat;
    document.getElementById('ksDesc').textContent = data.keyStatDesc;

    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = data.issues.map(iss => `
  <div class="issue-item">
    <div class="issue-icon-wrap" style="background:${iss.bg}">
      <span style="font-size:1.1rem">${iss.icon}</span>
    </div>
    <div class="issue-item-text">
      <strong style="color:${iss.color}">${iss.title}</strong>
      <p>${iss.desc}</p>
    </div>
  </div>
`).join('');

    // Open panel
    document.getElementById('infoPanel').classList.add('open');
}

function clearSelection() {
    activeRegion = null;
    document.querySelectorAll('.map-region').forEach(el => {
        el.classList.remove('dimmed', 'highlighted');
    });
    document.querySelectorAll('.region-item').forEach(el => el.classList.remove('active'));
    document.getElementById('infoPanel').classList.remove('open');
}

// ── Tooltip ──────────────────────────────
const tooltip = document.getElementById('mapTooltip');
const ttTitle = document.getElementById('ttTitle');
const ttSub = document.getElementById('ttSub');

function showTooltip(el, e) {
    const regionId = el.dataset.region;
    const issue = el.dataset.issue || el.dataset.region;
    const label = el.dataset.label || (regionData[regionId] && regionData[regionId].name) || regionId;
    const reg = regionData[regionId];

    ttTitle.textContent = label;
    ttSub.textContent = reg ? reg.name : '';

    const rect = document.getElementById('worldMap').getBoundingClientRect();
    const mapArea = document.querySelector('.map-area').getBoundingClientRect();
    tooltip.style.left = (e.clientX - mapArea.left) + 'px';
    tooltip.style.top = (e.clientY - mapArea.top) + 'px';
    tooltip.classList.add('visible');
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

// ── Event Listeners ───────────────────────
document.querySelectorAll('.map-region').forEach(el => {
    el.addEventListener('click', () => selectRegion(el.dataset.region));
    el.addEventListener('mouseenter', (e) => {
        const regId = el.dataset.region;
        const reg = regionData[regId];
        if (reg) {
            ttTitle.textContent = reg.name;
            ttSub.textContent = reg.sub;
            const mapArea = document.querySelector('.map-area').getBoundingClientRect();
            tooltip.style.left = (e.clientX - mapArea.left) + 'px';
            tooltip.style.top = (e.clientY - mapArea.top) + 'px';
            tooltip.classList.add('visible');
        }
    });
    el.addEventListener('mousemove', (e) => {
        const mapArea = document.querySelector('.map-area').getBoundingClientRect();
        tooltip.style.left = (e.clientX - mapArea.left) + 'px';
        tooltip.style.top = (e.clientY - mapArea.top) + 'px';
    });
    el.addEventListener('mouseleave', hideTooltip);
});

document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', (e) => {
        e.stopPropagation();
        selectRegion(pin.dataset.region);
    });
    pin.addEventListener('mouseenter', (e) => showTooltip(pin, e));
    pin.addEventListener('mousemove', (e) => {
        const mapArea = document.querySelector('.map-area').getBoundingClientRect();
        tooltip.style.left = (e.clientX - mapArea.left) + 'px';
        tooltip.style.top = (e.clientY - mapArea.top) + 'px';
    });
    pin.addEventListener('mouseleave', hideTooltip);
});

// Close info panel
document.getElementById('ipClose').addEventListener('click', clearSelection);

// Click ocean = clear
document.getElementById('worldMap').addEventListener('click', (e) => {
    if (e.target.tagName === 'rect' || e.target.tagName === 'svg') clearSelection();
});

// ── Filter Pills ─────────────────────────
document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const issue = pill.dataset.issue;
        const pins = document.querySelectorAll('.map-pin');

        if (issue === 'all') {
            pins.forEach(p => p.classList.remove('hidden'));
            document.querySelectorAll('.map-region').forEach(r => {
                r.classList.remove('dimmed', 'highlighted');
            });
        } else {
            pins.forEach(p => {
                p.classList.toggle('hidden', p.dataset.issue !== issue);
            });
            // Dim regions without this issue
            const affectedRegions = new Set([...pins]
                .filter(p => p.dataset.issue === issue)
                .map(p => p.dataset.region)
            );
            document.querySelectorAll('.map-region').forEach(r => {
                const id = r.dataset.region;
                r.classList.toggle('dimmed', !affectedRegions.has(id));
                r.classList.toggle('highlighted', affectedRegions.has(id));
            });
        }
    });
});

// ── Init ─────────────────────────────────
buildRegionList();

// Auto-select first region after short delay for demo
setTimeout(() => selectRegion('south-america'), 800);

