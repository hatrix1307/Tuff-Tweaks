/* ── TUFF TWEAKS — app.js ─────────────────────────────────── */

const CAT_ICONS = {
  Terrain:     '🌿',
  Unobtrusive: '👁',
  Utility:     '⚙',
  Aesthetic:   '✨',
  GUI:         '🖥',
  Variation:   '🎲',
};

// Best preview texture to use per pack id (hand-picked fallback hints)
const PREVIEW_HINTS = {
  'lower-grass':            'assets/minecraft/textures/block/grass_block_side.png',
  'grass-sides':            'assets/minecraft/textures/block/grass_block_side.png',
  'lower-snow':             'assets/minecraft/textures/block/snow.png',
  'whiter-snow':            'assets/minecraft/textures/block/snow.png',
  'mycelium-sides':         'assets/minecraft/textures/block/mycelium_side.png',
  'lower-mycelium':         'assets/minecraft/textures/block/mycelium_side.png',
  'snow-sides':             'assets/minecraft/textures/block/snow.png',
  'clearer-water':          'assets/minecraft/textures/block/water_still.png',
  'bushy-leaves':           'assets/minecraft/textures/block/oak_leaves.png',
  'fancy-sunflowers':       'assets/minecraft/textures/block/sunflower_front.png',
  'circular-log-tops':      'assets/minecraft/textures/block/oak_log_top.png',
  'brighter-nether':        'assets/minecraft/textures/block/netherrack.png',
  'black-nether-bricks':    'assets/minecraft/textures/block/nether_bricks.png',
  'better-bedrock':         'assets/minecraft/textures/block/bedrock.png',
  'darker-dark-oak':        'assets/minecraft/textures/block/dark_oak_leaves.png',
  'podzol-sides':           'assets/minecraft/textures/block/podzol_side.png',
  'path-sides':             'assets/minecraft/textures/block/dirt_path_side.png',
  'borderless-glass':       'assets/minecraft/textures/block/glass.png',
  'clean-glass':            'assets/minecraft/textures/block/glass.png',
  'borderless-stained-glass':'assets/minecraft/textures/block/white_stained_glass.png',
  'clean-stained-glass':    'assets/minecraft/textures/block/white_stained_glass.png',
  'lower-fire':             'assets/minecraft/textures/block/fire_0.png',
  'no-pumpkin-overlay':     'assets/minecraft/textures/misc/pumpkinblur.png',
  'translucent-pumpkin':    'assets/minecraft/textures/misc/pumpkinblur.png',
  'no-vignette':            'assets/minecraft/textures/misc/vignette.png',
  'lower-shield':           'assets/minecraft/textures/item/shield.png',
  'invisible-totem':        'assets/minecraft/textures/item/totem_of_undying.png',
  'unobtrusive-scaffolding':'assets/minecraft/textures/block/scaffolding_top.png',
  'accurate-scaffolding':   'assets/minecraft/textures/block/scaffolding_side.png',
  'no-fog':                 'assets/minecraft/textures/block/glass.png',
  'no-leaf-particles':      'assets/minecraft/textures/block/oak_leaves.png',
  'ore-borders':            'assets/minecraft/textures/block/diamond_ore.png',
  'sticky-piston-sides':    'assets/minecraft/textures/block/piston_side_sticky.png',
  'directional-hoppers':    'assets/minecraft/textures/block/hopper_outside.png',
  'directional-dispensers': 'assets/minecraft/textures/block/dispenser_front_horizontal.png',
  'visible-tripwires':      'assets/minecraft/textures/block/tripwire.png',
  'different-stems':        'assets/minecraft/textures/block/melon_stem.png',
  'mine-progress-bar':      'assets/minecraft/textures/block/destroy_stage_4.png',
  'alt-block-destruction':  'assets/minecraft/textures/block/destroy_stage_4.png',
  'brewing-guide':          'assets/minecraft/textures/item/potion.png',
  'clean-redstone-dust':    'assets/minecraft/textures/block/redstone_dust_dot.png',
  'better-observers':       'assets/minecraft/textures/block/observer_front.png',
  'visual-honey':           'assets/minecraft/textures/block/beehive_front_filled_1.png',
  'visual-composter':       'assets/minecraft/textures/block/composter_side.png',
  'softer-wool':            'assets/minecraft/textures/block/white_wool.png',
  'horizontal-nuggets':     'assets/minecraft/textures/item/gold_nugget.png',
  'sideways-nuggets':       'assets/minecraft/textures/item/gold_nugget.png',
  'pink-end-rods':          'assets/minecraft/textures/block/end_rod.png',
  'ashless-campfires':      'assets/minecraft/textures/block/campfire_log.png',
  'flint-tipped-arrows':    'assets/minecraft/textures/item/arrow.png',
  'golden-crown':           'assets/minecraft/textures/item/golden_helmet.png',
  'solid-honey':            'assets/minecraft/textures/block/honey_block_side.png',
  'solid-slime':            'assets/minecraft/textures/block/slime_block.png',
  'cherry-picking':         'assets/minecraft/textures/block/cherry_leaves.png',
  'unbundled-hay-bales':    'assets/minecraft/textures/block/hay_block_side.png',
  'plain-leather-armor':    'assets/minecraft/textures/item/leather_chestplate.png',
  'accurate-spyglass':      'assets/minecraft/textures/item/spyglass.png',
  'no-spyglass-overlay':    'assets/minecraft/textures/misc/spyglass_scope.png',
  'glass-doors':            'assets/minecraft/textures/block/oak_door_top.png',
  'unbundled-kelp':         'assets/minecraft/textures/block/dried_kelp_side.png',
  'less-purple-purpur':     'assets/minecraft/textures/block/purpur_block.png',
  'rainbow-xp':             'assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png',
  'numbered-hotbar':        'assets/minecraft/textures/gui/widgets.png',
  'dark-ui':                'assets/minecraft/textures/gui/container/inventory.png',
  'wither-hearts':          'assets/minecraft/textures/gui/sprites/hud/heart/withered_full.png',
  'no-crosshair':           'assets/minecraft/textures/gui/sprites/hud/crosshair.png',
  'small-crosshair':        'assets/minecraft/textures/gui/sprites/hud/crosshair.png',
  'dot-crosshair':          'assets/minecraft/textures/gui/sprites/hud/crosshair.png',
  'circle-crosshair':       'assets/minecraft/textures/gui/sprites/hud/crosshair.png',
  'heart-crosshair':        'assets/minecraft/textures/gui/sprites/hud/crosshair.png',
  'variated-cobblestone':   'assets/minecraft/textures/block/cobblestone.png',
  'variated-dirt':          'assets/minecraft/textures/block/dirt.png',
  'variated-stone':         'assets/minecraft/textures/block/stone.png',
  'variated-bricks':        'assets/minecraft/textures/block/bricks.png',
  'variated-gravel':        'assets/minecraft/textures/block/gravel.png',
  'variated-planks':        'assets/minecraft/textures/block/oak_planks.png',
};

// ── STATE ──────────────────────────────────────────────────────
let MANIFEST = [];
let CATS     = [];           // [{name, packs}]
const SEL    = new Set();    // selected pack IDs

// ── INTERSECTION OBSERVER for sidebar highlight ────────────────
const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const cat = e.target.dataset.cat;
    document.querySelectorAll('.sb-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
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
        Make sure the <code>packs/</code> folder (produced by the extractor) sits alongside <code>index.html</code>.<br>
        If testing locally use an HTTP server, not <code>file://</code>:<br><br>
        <code>npx serve .</code>&nbsp; or &nbsp;<code>python3 -m http.server</code>
      </div>`;
    return;
  }

  // Group by category, preserve insertion order
  const catMap = new Map();
  for (const p of MANIFEST) {
    if (!catMap.has(p.category)) catMap.set(p.category, []);
    catMap.get(p.category).push(p);
  }
  CATS = [...catMap.entries()].map(([name, packs]) => ({ name, packs }));

  buildSidebar();
  buildContent();

  // Wire search
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
    btn.className = 'sb-btn';
    btn.dataset.cat = cat.name;
    btn.innerHTML = `
      <span class="sb-icon">${CAT_ICONS[cat.name] || '📦'}</span>
      <span class="sb-label">${cat.name}</span>
      <span class="sb-count" id="sc-${cat.name}">0</span>`;
    btn.addEventListener('click', () => {
      document.getElementById('sec-' + cat.name)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    root.appendChild(btn);
  }
}

// ── CONTENT ────────────────────────────────────────────────────
function buildContent(filter = '') {
  const root = document.getElementById('content');
  const q    = filter.trim().toLowerCase();

  // Disconnect old observers
  sectionIO.disconnect();

  if (q) {
    const results = MANIFEST.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
    if (!results.length) {
      root.innerHTML = '<div class="empty-msg">No tweaks matched that search.</div>';
      return;
    }
    root.innerHTML = '';
    const sec = makeSectionEl('Search Results', null, results.length);
    const grid = sec.querySelector('.grid');
    results.forEach(p => grid.appendChild(makeCard(p)));
    root.appendChild(sec);
    return;
  }

  root.innerHTML = '';
  for (const cat of CATS) {
    const sec  = makeSectionEl(cat.name, CAT_ICONS[cat.name], cat.packs.length);
    sec.id          = 'sec-' + cat.name;
    sec.dataset.cat = cat.name;
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
  imgWrap.textContent = CAT_ICONS[pack.category] || '📦';

  const hint = PREVIEW_HINTS[pack.id];
  // Try hint first, then auto-find from files
  const candidates = hint
    ? [hint, ...getPreviewCandidates(pack)]
    : getPreviewCandidates(pack);

  tryLoadImage(pack.id, candidates, imgWrap);

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

function getPreviewCandidates(pack) {
  const files = pack.files || [];
  // Prefer clean block textures (no overlay, no destroy stage, no variated subfolders)
  const blockTex = files.filter(f =>
    f.includes('/textures/block/') &&
    f.endsWith('.png') &&
    !f.includes('overlay') &&
    !f.includes('destroy_stage') &&
    !f.includes('variated/') &&
    !f.includes('_bush') &&
    !f.match(/\d\.png$/)    // skip animation frames
  );
  const itemTex = files.filter(f =>
    f.includes('/textures/item/') && f.endsWith('.png')
  );
  const guiTex = files.filter(f =>
    f.includes('/textures/gui/') && f.endsWith('.png')
  );
  const anyPng = files.filter(f => f.endsWith('.png'));
  return [...blockTex, ...itemTex, ...guiTex, ...anyPng];
}

// Try each candidate URL in order, load first that succeeds
function tryLoadImage(packId, candidates, container, index = 0) {
  if (index >= candidates.length) return;
  const img = new Image();
  const src = `./packs/${packId}/${candidates[index]}`;
  img.onload = () => {
    container.textContent = '';
    container.appendChild(img);
  };
  img.onerror = () => tryLoadImage(packId, candidates, container, index + 1);
  img.src = src;
}

// ── TOGGLE ─────────────────────────────────────────────────────
function togglePack(id) {
  if (SEL.has(id)) {
    SEL.delete(id);
  } else {
    // Check for conflicts
    const pack     = MANIFEST.find(p => p.id === id);
    const conflictId = (pack?.conflicts || []).find(c => SEL.has(c));
    if (conflictId) {
      const conflictName = MANIFEST.find(p => p.id === conflictId)?.name || conflictId;
      showToast(`⚠ Conflicts with "${conflictName}" — deselect it first`, 'warn');
      // Flash the conflicting card
      const el = document.querySelector(`.card[data-id="${CSS.escape(conflictId)}"]`);
      if (el) {
        el.style.outline = '2px solid var(--wn)';
        el.style.boxShadow = '0 0 16px rgba(200,154,26,.4)';
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
    const id   = card.dataset.id;
    const pack = MANIFEST.find(p => p.id === id);
    const isSel = SEL.has(id);
    const isCfl = !isSel && (pack?.conflicts || []).some(c => SEL.has(c));
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

  // Sidebar counts
  for (const cat of CATS) {
    const cnt = cat.packs.filter(p => SEL.has(p.id)).length;
    const el  = document.getElementById('sc-' + cat.name);
    if (el) {
      el.textContent = cnt || '';
    }
  }
}

function clearAll() {
  SEL.clear();
  refreshCards();
  updateBadge();
}

// ── DOWNLOAD ────────────────────────────────────────────────────
function setProgress(pct, label, sub = '') {
  document.getElementById('dl-bar').style.width = pct + '%';
  document.getElementById('dl-pct').textContent  = Math.round(pct) + '%';
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
      pack: {
        pack_format: 3,
        description: 'Tuff Tweaks — 1.12.2 resource pack'
      }
    }, null, 2));

    // Collect file → source URL, last-writer wins on path collision
    const selectedPacks = MANIFEST.filter(p => SEL.has(p.id));
    const fileMap = new Map(); // destPath → fetchURL
    for (const pack of selectedPacks) {
      for (const file of (pack.files || [])) {
        fileMap.set(file, `./packs/${pack.id}/${file}`);
      }
    }

    const entries  = [...fileMap.entries()];
    const total    = entries.length;
    let   done     = 0;
    const BATCH    = 20;

    setProgress(2, `Fetching ${total} files…`);

    for (let i = 0; i < entries.length; i += BATCH) {
      const batch = entries.slice(i, i + BATCH);
      await Promise.all(batch.map(async ([dest, url]) => {
        try {
          const r = await fetch(url);
          if (r.ok) zip.file(dest, await r.arrayBuffer());
        } catch { /* skip missing files */ }
        done++;
        const pct  = 2 + Math.round((done / total) * 88);
        const name = dest.split('/').pop();
        setProgress(pct, `Fetching files… (${done}/${total})`, name);
      }));
    }

    setProgress(92, 'Compressing…');
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
      streamFiles: true,
    });

    setProgress(100, 'Done!');
    await new Promise(r => setTimeout(r, 350));

    // Trigger download
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
  const ctx = c.getContext('2d');
  const W   = 40, H = 40, S = 5;  // 8×8 grid of 5px cells

  // Seeded hash for deterministic pixel colors
  const palette = ['#4a5845','#5a6855','#6a7a64','#7a8e74','#3a4835','#556050'];
  const hash = (x, y) => ((x * 73856093 ^ y * 19349663) >>> 0) % palette.length;

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      ctx.fillStyle = palette[hash(x, y)];
      ctx.fillRect(x * S, y * S, S, S);
    }
  }

  // Grass strip at top (2px dark green + 3px bright green)
  ctx.fillStyle = '#3d6d1e';
  ctx.fillRect(0, 0, W, 3);
  ctx.fillStyle = '#5a9e2f';
  ctx.fillRect(0, 3, W, 4);
  ctx.fillStyle = '#74c93c';
  ctx.fillRect(0, 3, W, 2);

  // Subtle pixel highlight
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, 0, W, H);
}

// ── GO ──────────────────────────────────────────────────────────
boot();
