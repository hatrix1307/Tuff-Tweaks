/* ── TUFF TWEAKS — app.js ─────────────────────────────────── */

const CAT_ICONS = {
  Terrain:     '🌿',
  Unobtrusive: '👁',
  Utility:     '⚙',
  Aesthetic:   '✨',
  GUI:         '🖥',
  Variation:   '🎲',
  // VT may use slightly different names
  'Terrain Tweaks':     '🌿',
  'Unobtrusive Tweaks': '👁',
  'Survival Utility':   '⚙',
  'Aesthetic':          '✨',
  'HUD / Interface':    '🖥',
  'Variation':          '🎲',
};

function getCatIcon(name) {
  if (!name) return '📦';
  return CAT_ICONS[name]
    || (name.toLowerCase().includes('terrain')     ? '🌿' : null)
    || (name.toLowerCase().includes('unobtrus')    ? '👁' : null)
    || (name.toLowerCase().includes('utility')     ? '⚙' : null)
    || (name.toLowerCase().includes('aesthetic')   ? '✨' : null)
    || (name.toLowerCase().includes('gui')         ? '🖥' : null)
    || (name.toLowerCase().includes('hud')         ? '🖥' : null)
    || (name.toLowerCase().includes('variation')   ? '🎲' : null)
    || (name.toLowerCase().includes('peace')       ? '☮' : null)
    || (name.toLowerCase().includes('fun')         ? '🎭' : null)
    || '📦';
}

// ── Pick the best preview texture from a pack's file list ─────
// Always prefer blocks/ then items/ then anything else.
// Avoid animations, overlays, destroy stages, sub-folders.
function getPreviewFile(pack) {
  const files = pack.files || [];

  const score = f => {
    if (!f.endsWith('.png')) return -1;
    const lower = f.toLowerCase();
    // Discard known-bad
    if (lower.includes('destroy_stage'))   return -1;
    if (lower.includes('_overlay'))        return -1;
    if (lower.includes('/variated/'))      return -1;
    if (lower.includes('/particle/'))      return -1;
    if (/\/\d+\.png$/.test(f))             return -1; // bare numbered frames

    let s = 0;
    if (lower.includes('/textures/blocks/')) s += 30;
    else if (lower.includes('/textures/items/')) s += 20;
    else if (lower.includes('/textures/gui/')) s += 10;
    else if (lower.includes('/textures/')) s += 5;

    // Prefer clean, non-variant textures
    if (lower.includes('_side'))   s += 2;
    if (lower.includes('_top'))    s += 1;
    if (lower.includes('_front'))  s += 1;

    return s;
  };

  return files
    .map(f => ({ f, s: score(f) }))
    .filter(x => x.s >= 0)
    .sort((a, b) => b.s - a.s)
    [0]?.f || null;
}

// ── STATE ──────────────────────────────────────────────────────
let MANIFEST = [];
let CATS     = [];
const SEL    = new Set();

// ── INTERSECTION OBSERVER for sidebar ─────────────────────────
const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const cat = e.target.dataset.cat;
    document.querySelectorAll('.sb-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.cat === cat));
  });
}, { rootMargin: '-60px 0px -55% 0px', threshold: 0 });

// ── BOOT ───────────────────────────────────────────────────────
async function boot() {
  drawLogo();

  try {
    const res = await fetch('./packs/manifest.json');
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
    MANIFEST = await res.json();
  } catch (err) {
    document.getElementById('content').innerHTML = `
      <div class="err-banner">
        <strong>⚠ Could not load <code>packs/manifest.json</code></strong><br><br>
        Make sure the <code>packs/</code> folder (produced by the console extractor)
        sits alongside <code>index.html</code> in the same directory.<br><br>
        If testing locally use an HTTP server, not <code>file://</code>:<br>
        <code>npx serve .</code>&nbsp; or &nbsp;<code>python3 -m http.server</code>
      </div>`;
    return;
  }

  // Group by category, preserve order
  const catMap = new Map();
  for (const p of MANIFEST) {
    const cat = p.category || 'Other';
    if (!catMap.has(cat)) catMap.set(cat, []);
    catMap.get(cat).push(p);
  }
  CATS = [...catMap.entries()].map(([name, packs]) => ({ name, packs }));

  buildSidebar();
  buildContent();

  document.getElementById('search').addEventListener('input', e => {
    buildContent(e.target.value);
  });
}

// ── SIDEBAR ────────────────────────────────────────────────────
function buildSidebar() {
  const root = document.getElementById('sb-cats');
  root.innerHTML = '';
  for (const cat of CATS) {
    const btn = document.createElement('button');
    btn.className  = 'sb-btn';
    btn.dataset.cat = cat.name;
    btn.innerHTML = `
      <span class="sb-icon">${getCatIcon(cat.name)}</span>
      <span class="sb-label">${cat.name}</span>
      <span class="sb-count" id="sc-${CSS.escape(cat.name)}">0</span>`;
    btn.addEventListener('click', () =>
      document.getElementById('sec-' + cat.name)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    root.appendChild(btn);
  }
}

// ── CONTENT ────────────────────────────────────────────────────
function buildContent(filter = '') {
  const root = document.getElementById('content');
  const q    = filter.trim().toLowerCase();

  sectionIO.disconnect();

  if (q) {
    const results = MANIFEST.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
    root.innerHTML = '';
    if (!results.length) {
      root.innerHTML = '<div class="empty-msg">No tweaks matched that search.</div>';
      return;
    }
    const sec  = makeSectionEl('Search Results', null, results.length);
    const grid = sec.querySelector('.grid');
    results.forEach(p => grid.appendChild(makeCard(p)));
    root.appendChild(sec);
    return;
  }

  root.innerHTML = '';
  for (const cat of CATS) {
    const sec  = makeSectionEl(cat.name, getCatIcon(cat.name), cat.packs.length);
    sec.id           = 'sec-' + cat.name;
    sec.dataset.cat  = cat.name;
    const grid = sec.querySelector('.grid');
    cat.packs.forEach(p => grid.appendChild(makeCard(p)));
    root.appendChild(sec);
    sectionIO.observe(sec);
  }
}

function makeSectionEl(name, icon, count) {
  const sec = document.createElement('div');
  sec.className = 'section';
  sec.innerHTML = `
    <div class="sec-header">
      ${icon ? `<span class="sec-icon">${icon}</span>` : ''}
      <h2 class="sec-title">${name.toUpperCase()}</h2>
      <span class="sec-count">${count}</span>
    </div>
    <div class="grid"></div>`;
  return sec;
}

// ── CARD ───────────────────────────────────────────────────────
function makeCard(pack) {
  const isSel = SEL.has(pack.id);
  const isCfl = !isSel && (pack.conflicts || []).some(c => SEL.has(c));

  const card = document.createElement('div');
  card.className = ['card', isSel && 'selected', isCfl && 'conflict'].filter(Boolean).join(' ');
  card.dataset.id = pack.id;
  card.addEventListener('click', () => togglePack(pack.id));

  // Preview image
  const imgWrap = document.createElement('div');
  imgWrap.className = 'card-img';
  imgWrap.textContent = getCatIcon(pack.category);

  const previewFile = getPreviewFile(pack);
  if (previewFile) {
    const img = new Image();
    img.src = `./packs/${pack.id}/${previewFile}`;
    img.onload  = () => { imgWrap.textContent = ''; imgWrap.appendChild(img); };
    // img.onerror: leave the emoji fallback
  }

  // Body
  const body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML = `
    <div class="card-name">${pack.name}</div>
    <div class="card-desc">${pack.description || ''}</div>`;

  // Checkbox
  const chk = document.createElement('div');
  chk.className = 'card-check';

  card.appendChild(imgWrap);
  card.appendChild(body);
  card.appendChild(chk);
  return card;
}

// ── TOGGLE ─────────────────────────────────────────────────────
function togglePack(id) {
  if (SEL.has(id)) {
    SEL.delete(id);
  } else {
    const pack       = MANIFEST.find(p => p.id === id);
    const conflictId = (pack?.conflicts || []).find(c => SEL.has(c));
    if (conflictId) {
      const conflictName = MANIFEST.find(p => p.id === conflictId)?.name || conflictId;
      showToast(`⚠ Conflicts with "${conflictName}" — deselect it first`, 'warn');
      const el = document.querySelector(`.card[data-id="${CSS.escape(conflictId)}"]`);
      if (el) {
        el.style.outline    = '2px solid var(--wn)';
        el.style.boxShadow  = '0 0 16px rgba(200,154,26,.35)';
        setTimeout(() => { el.style.outline = ''; el.style.boxShadow = ''; }, 1400);
      }
      return;
    }
    SEL.add(id);
  }
  refreshCards();
  updateBadge();
}

function refreshCards() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    const id     = card.dataset.id;
    const pack   = MANIFEST.find(p => p.id === id);
    const isSel  = SEL.has(id);
    const isCfl  = !isSel && (pack?.conflicts || []).some(c => SEL.has(c));
    card.classList.toggle('selected', isSel);
    card.classList.toggle('conflict', isCfl);
  });
}

function updateBadge() {
  const n = SEL.size;
  const badge = document.getElementById('badge');
  badge.textContent = n === 0 ? '0 selected' : `${n} selected`;
  badge.classList.toggle('active', n > 0);
  document.getElementById('dl-btn').disabled = n === 0;

  for (const cat of CATS) {
    const cnt = cat.packs.filter(p => SEL.has(p.id)).length;
    const el  = document.getElementById('sc-' + CSS.escape(cat.name));
    if (el) el.textContent = cnt || '';
  }
}

function clearAll() {
  SEL.clear();
  refreshCards();
  updateBadge();
}

// ── DOWNLOAD ────────────────────────────────────────────────────
function setProgress(pct, label, sub = '') {
  document.getElementById('dl-bar').style.width   = pct + '%';
  document.getElementById('dl-pct').textContent   = Math.round(pct) + '%';
  document.getElementById('dl-label').textContent = label;
  document.getElementById('dl-sub').textContent   = sub;
}

async function startDownload() {
  if (!SEL.size) return;

  document.getElementById('overlay').classList.add('show');
  document.getElementById('dl-btn').disabled = true;
  setProgress(0, 'Collecting files…');

  try {
    const zip = new JSZip();

    // pack.mcmeta — pack_format 3 = 1.12.2
    zip.file('pack.mcmeta', JSON.stringify({
      pack: { pack_format: 3, description: 'Tuff Tweaks — 1.12.2 resource pack' }
    }, null, 2));

    // Collect dest → url, last-pack-wins on collision
    // Only include files in blocks/ and items/ (and gui/, misc/, etc.)
    // Never include block/ or item/ — those are excluded by the extractor already,
    // but filter defensively here too.
    const selectedPacks = MANIFEST.filter(p => SEL.has(p.id));
    const fileMap = new Map();

    for (const pack of selectedPacks) {
      for (const file of (pack.files || [])) {
        // Defensively skip any 1.13+ paths that might have slipped through
        if (file.match(/\/textures\/block\//) || file.match(/\/textures\/item\//)) continue;
        fileMap.set(file, `./packs/${pack.id}/${file}`);
      }
    }

    const entries = [...fileMap.entries()];
    const total   = entries.length;
    let   done    = 0;
    const BATCH   = 24;

    setProgress(2, `Fetching ${total} files…`);

    for (let i = 0; i < entries.length; i += BATCH) {
      const batch = entries.slice(i, i + BATCH);
      await Promise.all(batch.map(async ([dest, url]) => {
        try {
          const r = await fetch(url);
          if (r.ok) zip.file(dest, await r.arrayBuffer());
        } catch { /* skip missing */ }
        done++;
        setProgress(
          2 + Math.round((done / total) * 88),
          `Fetching files… (${done}/${total})`,
          dest.split('/').pop()
        );
      }));
    }

    setProgress(92, 'Compressing…');
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    setProgress(100, 'Done!');
    await new Promise(r => setTimeout(r, 350));

    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `TuffTweaks_${SEL.size}packs.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);

    const kb = (blob.size / 1024).toFixed(0);
    showToast(`✓ Downloaded ${SEL.size} packs · ${total} files · ${kb} KB`, 'ok');

  } catch (err) {
    showToast('Download failed: ' + err.message, 'err');
  } finally {
    document.getElementById('overlay').classList.remove('show');
    setProgress(0, '');
    document.getElementById('dl-btn').disabled = SEL.size === 0;
  }
}

// ── TOAST ───────────────────────────────────────────────────────
let _toastTimer = null;
function showToast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = `toast show ${type}`.trim();
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 5000);
}

// ── LOGO CANVAS ─────────────────────────────────────────────────
function drawLogo() {
  const c   = document.getElementById('logo-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  const S   = 5; // 8×8 grid at 5px = 40px

  const palette = ['#4a5845','#5a6855','#6a7a64','#7a8e74','#3a4835','#556050'];
  const hash    = (x, y) => ((x * 73856093 ^ y * 19349663) >>> 0) % palette.length;

  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) {
      ctx.fillStyle = palette[hash(x, y)];
      ctx.fillRect(x * S, y * S, S, S);
    }

  // Grass top strip
  ctx.fillStyle = '#3d6d1e'; ctx.fillRect(0, 0, 40, 3);
  ctx.fillStyle = '#5a9e2f'; ctx.fillRect(0, 3, 40, 4);
  ctx.fillStyle = '#74c93c'; ctx.fillRect(0, 3, 40, 2);
}

// ── GO ──────────────────────────────────────────────────────────
boot();
