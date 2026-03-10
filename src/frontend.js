// ─────────────────────────────────────────────
//  Ubani Hosting — Frontend (Phase 1 Rebuild)
//  Dark premium UI · GitHub/Raycast/Linear feel
//  All pages: marketing + portal + admin
// ─────────────────────────────────────────────

// ── Shared CSS ────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0c10;
    --bg1:       #0f1117;
    --bg2:       #161b24;
    --bg3:       #1c2333;
    --border:    rgba(255,255,255,0.07);
    --border2:   rgba(255,255,255,0.12);
    --text:      #e6edf3;
    --muted:     #7d8590;
    --muted2:    #6e7781;
    --accent:    #f97316;
    --accent2:   #fb923c;
    --blue:      #388bfd;
    --green:     #3fb950;
    --red:       #f85149;
    --yellow:    #d29922;
    --sidebar-w: 220px;
    --header-h:  56px;
    --radius:    8px;
    --radius-lg: 12px;
    --shadow:    0 8px 32px rgba(0,0,0,0.4);
    --glow:      0 0 0 1px rgba(249,115,22,0.3), 0 0 20px rgba(249,115,22,0.12);
  }

  html, body { height: 100%; }

  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--blue); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* ── MARKETING LAYOUT ─────────────────────── */
  .mkt-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: var(--header-h);
    border-bottom: 1px solid var(--border);
    background: rgba(10,12,16,0.85);
    backdrop-filter: blur(20px);
    display: flex; align-items: center;
  }
  .mkt-header-inner {
    max-width: 1100px; width: 100%; margin: 0 auto;
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .wordmark {
    font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
    color: var(--text); display: flex; align-items: center; gap: 8px;
  }
  .wordmark-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }
  .mkt-nav { display: flex; align-items: center; gap: 4px; }
  .mkt-nav a {
    padding: 6px 12px; border-radius: var(--radius);
    color: var(--muted); font-size: 13px; font-weight: 500;
    transition: color 0.15s, background 0.15s;
  }
  .mkt-nav a:hover { color: var(--text); background: var(--bg2); text-decoration: none; }
  .mkt-nav a.active { color: var(--text); }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: var(--radius);
    font: inherit; font-weight: 600; font-size: 13px;
    cursor: pointer; border: none; transition: all 0.15s;
    text-decoration: none !important;
  }
  .btn-primary {
    background: var(--accent); color: #fff;
    box-shadow: 0 1px 3px rgba(249,115,22,0.4);
  }
  .btn-primary:hover { background: var(--accent2); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(249,115,22,0.4); }
  .btn-ghost {
    background: var(--bg2); color: var(--text);
    border: 1px solid var(--border2);
  }
  .btn-ghost:hover { background: var(--bg3); border-color: var(--border2); }
  .btn-danger {
    background: rgba(248,81,73,0.15); color: var(--red);
    border: 1px solid rgba(248,81,73,0.3);
  }
  .btn-danger:hover { background: rgba(248,81,73,0.25); }

  .mkt-main {
    max-width: 1100px; margin: 0 auto;
    padding: calc(var(--header-h) + 48px) 24px 80px;
  }

  /* ── HERO ─────────────────────────────────── */
  .hero {
    padding: 64px 0 48px;
    position: relative;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px 4px 6px; border-radius: 999px;
    border: 1px solid rgba(249,115,22,0.3);
    background: rgba(249,115,22,0.08);
    color: var(--accent); font-size: 12px; font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 20px;
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; } 50% { opacity: 0.4; }
  }
  .hero h1 {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
    margin-bottom: 18px;
  }
  .hero h1 em { font-style: normal; color: var(--accent); }
  .hero p {
    font-size: 17px; color: var(--muted); max-width: 540px;
    line-height: 1.65; margin-bottom: 28px;
  }
  .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  /* ── FEATURE GRID ─────────────────────────── */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin: 48px 0;
    background: var(--border);
  }
  .feature-card {
    background: var(--bg1);
    padding: 28px 24px;
    transition: background 0.15s;
  }
  .feature-card:hover { background: var(--bg2); }
  .feature-icon {
    width: 36px; height: 36px; border-radius: var(--radius);
    background: var(--bg3);
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px;
  }
  .feature-card h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
  .feature-card p { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* ── PRICING ──────────────────────────────── */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px; margin: 40px 0;
  }
  .plan-card {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    background: var(--bg1);
    position: relative;
    transition: border-color 0.2s, transform 0.2s;
  }
  .plan-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .plan-card.featured {
    border-color: rgba(249,115,22,0.5);
    background: linear-gradient(135deg, rgba(249,115,22,0.06), var(--bg1));
    box-shadow: var(--glow);
  }
  .plan-badge {
    position: absolute; top: -10px; left: 24px;
    padding: 2px 10px; border-radius: 999px;
    background: var(--accent); color: #fff;
    font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .plan-name { font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
  .plan-price { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .plan-price span { font-size: 14px; font-weight: 400; color: var(--muted); }
  .plan-desc { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
  .plan-features li { font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; font-size: 12px; flex-shrink: 0; }

  /* ── DIVIDER ──────────────────────────────── */
  .section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 12px;
  }
  .divider { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

  /* ── PORTAL LAYOUT (sidebar) ──────────────── */
  .portal-wrap {
    display: flex; min-height: 100vh;
  }
  .sidebar {
    width: var(--sidebar-w); flex-shrink: 0;
    background: var(--bg1);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; bottom: 0;
    z-index: 50;
    transition: transform 0.2s;
  }
  .sidebar-top {
    padding: 18px 16px 12px;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-wordmark { font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 7px; }
  .sidebar-section-label {
    padding: 16px 16px 6px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted2);
  }
  .sidebar-nav { padding: 4px 8px; flex: 1; overflow-y: auto; }
  .sidebar-nav a {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: var(--radius);
    color: var(--muted); font-size: 13px; font-weight: 500;
    transition: all 0.12s; margin-bottom: 2px;
    text-decoration: none !important;
  }
  .sidebar-nav a:hover { color: var(--text); background: var(--bg2); }
  .sidebar-nav a.active { color: var(--text); background: var(--bg3); }
  .sidebar-nav a .icon { font-size: 15px; width: 18px; text-align: center; flex-shrink: 0; }
  .sidebar-bottom {
    padding: 12px 8px;
    border-top: 1px solid var(--border);
  }
  .sidebar-user {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: var(--radius);
  }
  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), #9333ea);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .user-info { min-width: 0; flex: 1; }
  .user-email { font-size: 12px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-plan { font-size: 11px; color: var(--muted); }

  .portal-content {
    margin-left: var(--sidebar-w);
    flex: 1; display: flex; flex-direction: column; min-height: 100vh;
  }
  .portal-topbar {
    height: var(--header-h); border-bottom: 1px solid var(--border);
    background: var(--bg); padding: 0 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 40;
  }
  .portal-topbar h1 { font-size: 15px; font-weight: 600; }
  .portal-main { padding: 28px; max-width: 960px; }

  /* ── CARDS ────────────────────────────────── */
  .card {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg1);
    overflow: hidden;
  }
  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-header h2 { font-size: 14px; font-weight: 600; }
  .card-header p { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .card-body { padding: 20px; }

  .stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .stat-card {
    border: 1px solid var(--border); border-radius: var(--radius-lg);
    padding: 16px; background: var(--bg1);
  }
  .stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 8px; }
  .stat-value { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; }
  .stat-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* ── FORM ELEMENTS ────────────────────────── */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
  .form-input {
    width: 100%; padding: 9px 12px;
    background: var(--bg); border: 1px solid var(--border2);
    border-radius: var(--radius); color: var(--text);
    font: inherit; font-size: 14px;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }
  .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
  .form-input::placeholder { color: var(--muted2); }
  textarea.form-input { min-height: 100px; resize: vertical; }

  /* ── ALERTS / STATUS ──────────────────────── */
  .alert {
    padding: 10px 14px; border-radius: var(--radius);
    font-size: 13px; display: flex; align-items: center; gap: 8px;
    margin-top: 12px;
  }
  .alert-error { background: rgba(248,81,73,0.1); border: 1px solid rgba(248,81,73,0.3); color: var(--red); }
  .alert-success { background: rgba(63,185,80,0.1); border: 1px solid rgba(63,185,80,0.3); color: var(--green); }
  .alert-info { background: rgba(56,139,253,0.1); border: 1px solid rgba(56,139,253,0.3); color: var(--blue); }
  .alert-warn { background: rgba(210,153,34,0.1); border: 1px solid rgba(210,153,34,0.3); color: var(--yellow); }
  .alert:empty { display: none; }

  /* ── BADGE / CHIPS ────────────────────────── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 999px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.03em;
    border: 1px solid transparent;
  }
  .badge-green { background: rgba(63,185,80,0.15); color: var(--green); border-color: rgba(63,185,80,0.3); }
  .badge-yellow { background: rgba(210,153,34,0.15); color: var(--yellow); border-color: rgba(210,153,34,0.3); }
  .badge-red { background: rgba(248,81,73,0.15); color: var(--red); border-color: rgba(248,81,73,0.3); }
  .badge-blue { background: rgba(56,139,253,0.15); color: var(--blue); border-color: rgba(56,139,253,0.3); }

  /* ── TABLE ────────────────────────────────── */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    text-align: left; padding: 10px 16px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--muted); border-bottom: 1px solid var(--border);
  }
  .data-table td {
    padding: 12px 16px; font-size: 13px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: rgba(255,255,255,0.02); }
  .mono { font-family: 'DM Mono', monospace; font-size: 12px; }

  /* ── EMPTY STATE ──────────────────────────── */
  .empty-state {
    text-align: center; padding: 48px 24px; color: var(--muted);
  }
  .empty-state .empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.5; }
  .empty-state h3 { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .empty-state p { font-size: 13px; max-width: 300px; margin: 0 auto 20px; }

  /* ── AUTH PAGES ───────────────────────────── */
  .auth-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px;
    background:
      radial-gradient(600px 400px at 20% 30%, rgba(249,115,22,0.06) 0%, transparent 70%),
      radial-gradient(800px 600px at 80% 80%, rgba(56,139,253,0.05) 0%, transparent 70%),
      var(--bg);
  }
  .auth-card {
    width: 100%; max-width: 400px;
    border: 1px solid var(--border2); border-radius: 16px;
    background: var(--bg1); padding: 32px;
    box-shadow: var(--shadow);
  }
  .auth-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 28px; font-size: 15px; font-weight: 700; }
  .auth-card h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 6px; }
  .auth-card p { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .auth-footer { margin-top: 20px; text-align: center; font-size: 13px; color: var(--muted); }
  .auth-footer a { color: var(--accent); }

  /* ── LOADING ──────────────────────────────── */
  .spinner {
    display: inline-block; width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── TICKET THREAD ────────────────────────── */
  .ticket-thread { display: flex; flex-direction: column; gap: 12px; }
  .ticket-msg {
    padding: 12px 16px; border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--bg2);
  }
  .ticket-msg.admin {
    border-color: rgba(249,115,22,0.25);
    background: rgba(249,115,22,0.06);
  }
  .ticket-msg-meta { font-size: 11px; color: var(--muted); margin-bottom: 6px; }
  .ticket-msg p { font-size: 13px; }

  /* ── ANIMATIONS ───────────────────────────── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.35s ease both; }
  .fade-up-1 { animation-delay: 0.05s; }
  .fade-up-2 { animation-delay: 0.10s; }
  .fade-up-3 { animation-delay: 0.15s; }
  .fade-up-4 { animation-delay: 0.20s; }

  /* ── MARKETING FOOTER ─────────────────────── */
  .mkt-footer {
    border-top: 1px solid var(--border);
    padding: 40px 24px;
    text-align: center;
    color: var(--muted); font-size: 13px;
  }
  .mkt-footer a { color: var(--muted); }
  .mkt-footer a:hover { color: var(--text); }

  /* ── RESPONSIVE ───────────────────────────── */
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .portal-content { margin-left: 0; }
    .hero h1 { font-size: 28px; }
    .pricing-grid { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: 1fr 1fr; }
  }
`;

// ── Shared JS utilities (injected into every authenticated page) ──────────
const PORTAL_SCRIPT = `
const _K = 'ubani_t';
const _getToken = () => localStorage.getItem(_K) || '';
const _setToken = v => v ? localStorage.setItem(_K, v) : localStorage.removeItem(_K);
const _getUser  = () => { try { return JSON.parse(localStorage.getItem('ubani_u') || 'null'); } catch { return null; } };
const _setUser  = u => u ? localStorage.setItem('ubani_u', JSON.stringify(u)) : localStorage.removeItem('ubani_u');
const APP = window.__UBANI_ORIGIN || window.location.origin;

// Redirect to login if no token
if (!_getToken()) { window.location.replace(APP + '/portal/login'); }

// Populate user info in sidebar
window.addEventListener('DOMContentLoaded', () => {
  const u = _getUser();
  if (u) {
    const avatar = document.getElementById('userAvatar');
    const email  = document.getElementById('userEmail');
    const plan   = document.getElementById('userPlan');
    if (avatar) avatar.textContent = (u.email || '?')[0].toUpperCase();
    if (email)  email.textContent  = u.email || '';
    if (plan)   plan.textContent   = u.plan  || 'Free Plan';
  }
  // Highlight active nav link
  const current = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});

const api = async (path, options = {}, auth = true) => {
  const url = path.startsWith('http') ? path : APP + path;
  const headers = { 'content-type': 'application/json', ...(options.headers || {}) };
  if (auth && _getToken()) headers.authorization = 'Bearer ' + _getToken();
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) { _setToken(null); _setUser(null); window.location.replace(APP + '/portal/login'); }
  if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
  return data;
};

const showAlert = (id, msg, type = 'info') => {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert alert-' + type;
  el.textContent = msg;
};
const clearAlert = id => { const el = document.getElementById(id); if (el) { el.className = 'alert'; el.textContent = ''; } };

const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const fmtDate = v => { if (!v) return '—'; const d = new Date(String(v).replace(' ','T') + (String(v).endsWith('Z') ? '' : 'Z')); return isNaN(d) ? String(v) : d.toLocaleDateString('en-ZA', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); };
const fmtRand = cents => 'R' + (Number(cents || 0) / 100).toFixed(2);
const statusBadge = s => {
  const m = {paid:'green', open:'yellow', closed:'blue', failed:'red', pending:'yellow', live:'green', draft:'blue'};
  return '<span class="badge badge-' + (m[s] || 'blue') + '">' + esc(s) + '</span>';
};

const logout = () => { _setToken(null); _setUser(null); window.location.replace(APP + '/portal/login'); };
`;

// ── Admin shared JS ───────────────────────────
const ADMIN_SCRIPT = `
const APP = window.__UBANI_ORIGIN || window.location.origin;
const _adminKey = () => sessionStorage.getItem('ubani_akey') || '';
const _setAdminKey = k => sessionStorage.setItem('ubani_akey', k);

const adminApi = async path => {
  const key = _adminKey();
  if (!key) throw new Error('No admin key set');
  const res = await fetch(APP + path, { headers: { 'x-admin-key': key } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
  return data;
};

const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const fmtDate = v => { if (!v) return '—'; const d = new Date(String(v).replace(' ','T') + (String(v).endsWith('Z') ? '' : 'Z')); return isNaN(d) ? String(v) : d.toLocaleDateString('en-ZA', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); };
const fmtRand = cents => 'R' + (Number(cents || 0) / 100).toFixed(2);
const statusBadge = s => {
  const m = {paid:'green', open:'yellow', closed:'blue', failed:'red', pending:'yellow', live:'green', draft:'blue'};
  return '<span class="badge badge-' + (m[s] || 'blue') + '">' + esc(s) + '</span>';
};

// Auto-restore admin key & load data on page load
window.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('adminKeyInput');
  if (inp && _adminKey()) {
    inp.value = _adminKey();
    document.getElementById('autoLoadTrigger') && document.getElementById('autoLoadTrigger').click();
  }
  const current = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});

const saveKey = () => {
  const k = document.getElementById('adminKeyInput')?.value.trim();
  if (k) _setAdminKey(k);
};
`;

// ── HTML shell builders ───────────────────────

function mktShell({ title, body, path = '/' }) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/hosting', label: 'Hosting' },
    { href: '/contact', label: 'Contact' },
  ].map(l => `<a href="${l.href}" class="mkt-nav-link${path === l.href ? ' active' : ''}">${l.label}</a>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="description" content="Ubani Hosting — Web design, hosting and client management for South African businesses."/>
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
</head>
<body>
  <header class="mkt-header">
    <div class="mkt-header-inner">
      <a href="/" class="wordmark" style="text-decoration:none">
        <div class="wordmark-dot"></div>Ubani Hosting
      </a>
      <nav class="mkt-nav">
        ${navLinks}
      </nav>
      <div style="display:flex;gap:8px;align-items:center">
        <a href="/portal/login" class="btn btn-ghost" style="font-size:13px">Sign in</a>
        <a href="/portal/register" class="btn btn-primary">Get started</a>
      </div>
    </div>
  </header>
  <main class="mkt-main">
    ${body}
  </main>
  <footer class="mkt-footer">
    <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px">
      <span>© ${new Date().getFullYear()} Ubani Hosting · Built for South Africa</span>
      <div style="display:flex;gap:20px">
        <a href="/pricing">Pricing</a>
        <a href="/hosting">Hosting</a>
        <a href="/contact">Contact</a>
        <a href="/portal/login">Client Portal</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function portalShell({ title, body, script = '', path = '', apiOrigin = '' }) {
  const navItems = [
    { href: '/portal/dashboard', icon: '⊞', label: 'Dashboard' },
    { href: '/portal/projects',  icon: '◈', label: 'Projects'  },
    { href: '/portal/billing',   icon: '◎', label: 'Billing'   },
    { href: '/portal/support',   icon: '◷', label: 'Support'   },
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Ubani Hosting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
</head>
<body>
  <div class="portal-wrap">
    <aside class="sidebar">
      <div class="sidebar-top">
        <a href="/" class="sidebar-wordmark" style="text-decoration:none;color:var(--text)">
          <div class="wordmark-dot"></div>Ubani Hosting
        </a>
      </div>
      <div class="sidebar-section-label">Client Portal</div>
      <nav class="sidebar-nav">
        ${navItems.map(i => `<a href="${i.href}"><span class="icon">${i.icon}</span>${i.label}</a>`).join('')}
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-user">
          <div class="user-avatar" id="userAvatar">?</div>
          <div class="user-info">
            <div class="user-email" id="userEmail">Loading...</div>
            <div class="user-plan" id="userPlan">Free Plan</div>
          </div>
        </div>
        <button onclick="logout()" class="btn btn-danger" style="width:100%;margin-top:8px;font-size:12px">Sign out</button>
      </div>
    </aside>
    <div class="portal-content">
      <div class="portal-topbar">
        <h1>${title}</h1>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--muted)" id="topbarEmail"></span>
        </div>
      </div>
      <div class="portal-main">
        ${body}
      </div>
    </div>
  </div>
  <script>
    window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin || '')};
    ${PORTAL_SCRIPT}
    ${script}
    // Update topbar email
    window.addEventListener('DOMContentLoaded', () => {
      const u = _getUser();
      const el = document.getElementById('topbarEmail');
      if (u && el) el.textContent = u.email;
    });
  </script>
</body>
</html>`;
}

function adminShell({ title, body, script = '', apiOrigin = '' }) {
  const navItems = [
    { href: '/admin/dashboard', icon: '⊞', label: 'Overview'  },
    { href: '/admin/users',     icon: '◎', label: 'Users'     },
    { href: '/admin/revenue',   icon: '◈', label: 'Revenue'   },
    { href: '/admin/tickets',   icon: '◷', label: 'Tickets'   },
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Ubani Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}
  .sidebar { background: #0a0c10; }
  .sidebar-section-label::before { content: ''; }
  </style>
</head>
<body>
  <div class="portal-wrap">
    <aside class="sidebar">
      <div class="sidebar-top">
        <a href="/" class="sidebar-wordmark" style="text-decoration:none;color:var(--text)">
          <div class="wordmark-dot"></div>Admin Panel
        </a>
      </div>
      <div class="sidebar-section-label">Management</div>
      <nav class="sidebar-nav">
        ${navItems.map(i => `<a href="${i.href}"><span class="icon">${i.icon}</span>${i.label}</a>`).join('')}
        <hr style="border:none;border-top:1px solid var(--border);margin:8px 0"/>
        <a href="/portal/dashboard"><span class="icon">←</span>Client Portal</a>
        <a href="/"><span class="icon">⌂</span>Marketing Site</a>
      </nav>
      <div class="sidebar-bottom">
        <div style="padding:8px 10px">
          <div class="form-label">Admin Key</div>
          <input id="adminKeyInput" type="password" class="form-input" placeholder="Enter admin key" oninput="saveKey()" style="font-size:12px"/>
        </div>
      </div>
    </aside>
    <div class="portal-content">
      <div class="portal-topbar">
        <h1>${title}</h1>
        <span class="badge badge-red" style="font-size:11px">Admin Access</span>
      </div>
      <div class="portal-main">
        ${body}
      </div>
    </div>
  </div>
  <script>
    window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin || '')};
    ${ADMIN_SCRIPT}
    ${script}
  </script>
</body>
</html>`;
}

function authShell({ title, body, script = '', apiOrigin = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Ubani Hosting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
</head>
<body>
  <div class="auth-wrap">
    ${body}
  </div>
  <script>
    window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin || '')};
    const APP = window.__UBANI_ORIGIN || window.location.origin;
    const _K = 'ubani_t';
    const _getToken = () => localStorage.getItem(_K) || '';
    const _setToken = v => v ? localStorage.setItem(_K, v) : localStorage.removeItem(_K);
    const _setUser  = u => u ? localStorage.setItem('ubani_u', JSON.stringify(u)) : localStorage.removeItem('ubani_u');
    const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    // Already logged in? Go to dashboard
    if (_getToken() && !window.location.pathname.includes('logout')) {
      window.location.replace(APP + '/portal/dashboard');
    }

    const api = async (path, options = {}) => {
      const res = await fetch(APP + path, {
        ...options,
        headers: { 'content-type': 'application/json', ...(options.headers || {}) }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
      return data;
    };
    const showAlert = (id, msg, type='error') => {
      const el = document.getElementById(id);
      if (!el) return;
      el.className = 'alert alert-' + type;
      el.textContent = msg;
    };
    ${script}
  </script>
</body>
</html>`;
}

// ════════════════════════════════════════════════
//  PAGE RENDERERS
// ════════════════════════════════════════════════

function pageHome(apiOrigin) {
  return mktShell({
    title: 'Ubani Hosting — Web Design & Hosting for South Africa',
    path: '/',
    body: `
    <div class="hero fade-up">
      <div class="hero-badge"><div class="hero-badge-dot"></div>Now live in South Africa</div>
      <h1>Web design, hosting &amp;<br/>client management — <em>in one platform</em></h1>
      <p>Built for SA web designers. Manage clients, deploy sites, send invoices, and handle support without switching tools.</p>
      <div class="hero-actions">
        <a href="/portal/register" class="btn btn-primary" style="font-size:15px;padding:10px 22px">Start free →</a>
        <a href="/pricing" class="btn btn-ghost" style="font-size:15px;padding:10px 22px">View pricing</a>
      </div>
    </div>

    <div class="features">
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">◈</div>
        <h3>Client Portal</h3>
        <p>Every client gets a branded portal to view their project status, pay invoices, and raise support tickets.</p>
      </div>
      <div class="feature-card fade-up fade-up-2">
        <div class="feature-icon">◎</div>
        <h3>Yoco Billing</h3>
        <p>Create invoices and collect payment in ZAR via Yoco. Webhook-verified, automatically reconciled.</p>
      </div>
      <div class="feature-card fade-up fade-up-3">
        <div class="feature-icon">◷</div>
        <h3>Support Tickets</h3>
        <p>Clients submit tickets; you respond from the admin panel. Full thread history, open/close workflow.</p>
      </div>
      <div class="feature-card fade-up fade-up-4">
        <div class="feature-icon">⊞</div>
        <h3>Project Tracking</h3>
        <p>Track every project from scope to live. Status updates, storage tracking, domain mapping included.</p>
      </div>
      <div class="feature-card fade-up">
        <div class="feature-icon">⚡</div>
        <h3>Cloudflare-Powered</h3>
        <p>Built on Cloudflare Workers + Turso. Sub-100ms globally distributed, zero cold starts.</p>
      </div>
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">🔒</div>
        <h3>Secure by Default</h3>
        <p>PBKDF2 password hashing, JWT auth, rate limiting, and HSTS headers out of the box.</p>
      </div>
    </div>

    <div style="text-align:center;padding:20px 0 48px">
      <p style="color:var(--muted);font-size:15px;margin-bottom:20px">Ready to replace your patchwork of tools?</p>
      <a href="/portal/register" class="btn btn-primary" style="font-size:15px;padding:10px 24px">Create your free account →</a>
    </div>`
  });
}

function pagePricing(apiOrigin) {
  return mktShell({
    title: 'Pricing — Ubani Hosting',
    path: '/pricing',
    body: `
    <div class="hero fade-up" style="text-align:center;padding-bottom:12px">
      <div class="hero-badge" style="margin:0 auto 16px"><div class="hero-badge-dot"></div>Simple pricing</div>
      <h1 style="max-width:560px;margin:0 auto 14px">Start free.<br/>Scale when you're ready.</h1>
      <p style="margin:0 auto">No contracts, no surprises. All plans include the full platform.</p>
    </div>

    <div class="pricing-grid">
      <div class="plan-card fade-up">
        <div class="plan-name">Free</div>
        <div class="plan-price">R0<span>/mo</span></div>
        <div class="plan-desc">Perfect for testing or a single personal project.</div>
        <ul class="plan-features">
          <li>1 active project</li>
          <li>500MB storage</li>
          <li>Ubani subdomain</li>
          <li>Client portal access</li>
          <li>Community support</li>
        </ul>
        <a href="/portal/register" class="btn btn-ghost" style="width:100%;justify-content:center">Get started free</a>
      </div>

      <div class="plan-card featured fade-up fade-up-1">
        <div class="plan-badge">Most popular</div>
        <div class="plan-name">Starter</div>
        <div class="plan-price">R99<span>/mo</span></div>
        <div class="plan-desc">For designers managing a handful of client sites.</div>
        <ul class="plan-features">
          <li>5 active projects</li>
          <li>10GB storage</li>
          <li>Custom domains</li>
          <li>Yoco billing integration</li>
          <li>Support ticket system</li>
          <li>Email notifications</li>
        </ul>
        <a href="/portal/register" class="btn btn-primary" style="width:100%;justify-content:center">Start with Starter →</a>
      </div>

      <div class="plan-card fade-up fade-up-2">
        <div class="plan-name">Agency</div>
        <div class="plan-price">R299<span>/mo</span></div>
        <div class="plan-desc">For studios managing multiple clients at scale.</div>
        <ul class="plan-features">
          <li>Unlimited projects</li>
          <li>100GB storage</li>
          <li>Priority support</li>
          <li>Admin + team workflows</li>
          <li>Revenue analytics</li>
          <li>White-label portal (coming)</li>
        </ul>
        <a href="/contact" class="btn btn-ghost" style="width:100%;justify-content:center">Contact sales</a>
      </div>
    </div>

    <div style="text-align:center;padding:16px 0 40px;color:var(--muted);font-size:13px">
      All prices in South African Rand (ZAR) · Yoco powers secure checkout · Cancel anytime
    </div>`
  });
}

function pageHosting(apiOrigin) {
  return mktShell({
    title: 'Hosting — Ubani Hosting',
    path: '/hosting',
    body: `
    <div class="hero fade-up">
      <div class="hero-badge"><div class="hero-badge-dot"></div>Infrastructure</div>
      <h1>Hosting built for<br/>South African velocity</h1>
      <p>Every project deployed on Cloudflare's global edge. No servers to manage, no capacity planning.</p>
    </div>

    <div class="features" style="margin-top:0">
      <div class="feature-card fade-up">
        <div class="feature-icon">⚡</div>
        <h3>Edge-first deployment</h3>
        <p>Static files and API routes served from Cloudflare's 300+ PoPs. SA clients see sub-50ms response times.</p>
      </div>
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">◈</div>
        <h3>Project-level storage</h3>
        <p>Each project tracks its own file storage. Upgrade plans as client sites grow without affecting others.</p>
      </div>
      <div class="feature-card fade-up fade-up-2">
        <div class="feature-icon">◎</div>
        <h3>Billing-native</h3>
        <p>Invoice creation and Yoco checkout baked in. Accept ZAR payments without a third-party billing tool.</p>
      </div>
      <div class="feature-card fade-up fade-up-3">
        <div class="feature-icon">◷</div>
        <h3>Turso database</h3>
        <p>libSQL-powered relational database with global replication. Your data is always close to your clients.</p>
      </div>
      <div class="feature-card fade-up">
        <div class="feature-icon">🔒</div>
        <h3>Security included</h3>
        <p>JWT auth, PBKDF2 hashing, rate limiting, HSTS, and CSP headers configured by default on every route.</p>
      </div>
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">⊞</div>
        <h3>Webhook reconciliation</h3>
        <p>Yoco webhook signatures verified cryptographically. Payment state always reflects reality.</p>
      </div>
    </div>

    <div style="margin:40px 0">
      <a href="/portal/register" class="btn btn-primary" style="font-size:15px;padding:10px 22px">Deploy your first project →</a>
    </div>`
  });
}

function pageContact(apiOrigin) {
  return mktShell({
    title: 'Contact — Ubani Hosting',
    path: '/contact',
    body: `
    <div class="hero fade-up">
      <div class="hero-badge"><div class="hero-badge-dot"></div>Get in touch</div>
      <h1>Let's build something<br/>together</h1>
      <p>Whether you need hosting, a website, or want to discuss agency plans — we're here.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:40px">
      <div class="card fade-up">
        <div class="card-header"><h2>Sales &amp; Onboarding</h2></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Ready to get started or want to understand what plan fits best?</p>
          <a href="mailto:sales@ubanihosting.co.za" class="btn btn-primary">sales@ubanihosting.co.za</a>
        </div>
      </div>
      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>Technical Support</h2></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Existing clients can raise tickets directly from the portal. General queries welcome here.</p>
          <a href="mailto:support@ubanihosting.co.za" class="btn btn-ghost">support@ubanihosting.co.za</a>
        </div>
      </div>
      <div class="card fade-up fade-up-2">
        <div class="card-header"><h2>Partnerships</h2></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Agencies, resellers, or integration partners — let's explore how we can work together.</p>
          <a href="mailto:partners@ubanihosting.co.za" class="btn btn-ghost">partners@ubanihosting.co.za</a>
        </div>
      </div>
    </div>

    <div class="card fade-up" style="max-width:480px">
      <div class="card-header"><h2>Quick start</h2></div>
      <div class="card-body">
        <p style="color:var(--muted);font-size:13px;margin-bottom:16px">The fastest path is creating a free account and exploring the platform yourself.</p>
        <a href="/portal/register" class="btn btn-primary" style="width:100%;justify-content:center">Create free account →</a>
      </div>
    </div>`
  });
}

function pageLogin(apiOrigin) {
  return authShell({
    apiOrigin,
    title: 'Sign in',
    body: `
    <div class="auth-card fade-up">
      <div class="auth-logo"><div class="wordmark-dot"></div>Ubani Hosting</div>
      <h1>Welcome back</h1>
      <p>Sign in to your client portal</p>

      <div class="form-group">
        <label class="form-label">Email address</label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" autocomplete="email"/>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input id="password" type="password" class="form-input" placeholder="••••••••" autocomplete="current-password"/>
      </div>

      <button id="loginBtn" class="btn btn-primary" style="width:100%;justify-content:center;padding:10px" onclick="doLogin()">
        Sign in
      </button>
      <div id="loginAlert" class="alert"></div>

      <div class="auth-footer">
        Don't have an account? <a href="/portal/register">Create one free</a>
      </div>
    </div>`,
    script: `
    const doLogin = async () => {
      const btn = document.getElementById('loginBtn');
      btn.innerHTML = '<span class="spinner"></span> Signing in...';
      btn.disabled = true;
      clearAlert && clearAlert('loginAlert');
      try {
        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        if (!email || !password) throw new Error('Email and password are required');
        const data = await api('/api/login', { method:'POST', body: JSON.stringify({ email, password }) });
        _setToken(data.token);
        _setUser(data.user);
        showAlert('loginAlert', 'Success! Redirecting...', 'success');
        setTimeout(() => window.location.replace(APP + '/portal/dashboard'), 500);
      } catch(err) {
        showAlert('loginAlert', err.message, 'error');
        btn.innerHTML = 'Sign in';
        btn.disabled = false;
      }
    };
    document.getElementById('password').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    `
  });
}

function pageRegister(apiOrigin) {
  return authShell({
    apiOrigin,
    title: 'Create account',
    body: `
    <div class="auth-card fade-up">
      <div class="auth-logo"><div class="wordmark-dot"></div>Ubani Hosting</div>
      <h1>Create your account</h1>
      <p>Start with a free plan — no credit card needed</p>

      <div class="form-group">
        <label class="form-label">Full name</label>
        <input id="name" type="text" class="form-input" placeholder="Jane Smith" autocomplete="name"/>
      </div>
      <div class="form-group">
        <label class="form-label">Email address</label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" autocomplete="email"/>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input id="password" type="password" class="form-input" placeholder="Min. 8 characters" autocomplete="new-password"/>
      </div>
      <div class="form-group">
        <label class="form-label">Confirm password</label>
        <input id="password2" type="password" class="form-input" placeholder="Repeat password" autocomplete="new-password"/>
      </div>

      <button id="regBtn" class="btn btn-primary" style="width:100%;justify-content:center;padding:10px" onclick="doRegister()">
        Create account
      </button>
      <div id="regAlert" class="alert"></div>

      <div class="auth-footer">
        Already have an account? <a href="/portal/login">Sign in</a>
      </div>
    </div>`,
    script: `
    const doRegister = async () => {
      const btn = document.getElementById('regBtn');
      btn.innerHTML = '<span class="spinner"></span> Creating account...';
      btn.disabled = true;
      try {
        const name  = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const pass  = document.getElementById('password').value;
        const pass2 = document.getElementById('password2').value;
        if (!email || !pass) throw new Error('Email and password are required');
        if (pass.length < 8) throw new Error('Password must be at least 8 characters');
        if (pass !== pass2) throw new Error('Passwords do not match');
        const data = await api('/api/register', { method:'POST', body: JSON.stringify({ email, password: pass, name }) });
        _setToken(data.token);
        _setUser(data.user);
        showAlert('regAlert', 'Account created! Redirecting...', 'success');
        setTimeout(() => window.location.replace(APP + '/portal/dashboard'), 600);
      } catch(err) {
        showAlert('regAlert', err.message, 'error');
        btn.innerHTML = 'Create account';
        btn.disabled = false;
      }
    };
    `
  });
}

function pagePortalDashboard(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: 'Dashboard',
    path: '/portal/dashboard',
    body: `
    <div class="stat-grid fade-up" id="statsGrid">
      <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value" id="statProjects">—</div><div class="stat-sub">Active deployments</div></div>
      <div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value" id="statInvoices">—</div><div class="stat-sub">All time</div></div>
      <div class="stat-card"><div class="stat-label">Open tickets</div><div class="stat-value" id="statTickets">—</div><div class="stat-sub">Awaiting response</div></div>
      <div class="stat-card"><div class="stat-label">Account credit</div><div class="stat-value" id="statCredit">—</div><div class="stat-sub">Available balance</div></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-top:20px">
      <div class="card fade-up fade-up-1">
        <div class="card-header">
          <div><h2>Recent projects</h2><p>Your latest deployments</p></div>
          <a href="/portal/projects" class="btn btn-ghost" style="font-size:12px">View all</a>
        </div>
        <div id="recentProjects"><div class="empty-state"><div class="empty-icon">◈</div><h3>No projects yet</h3><p>Deploy your first project to get started</p><a href="/portal/projects" class="btn btn-primary">Create project</a></div></div>
      </div>

      <div class="card fade-up fade-up-2">
        <div class="card-header">
          <div><h2>Recent invoices</h2><p>Latest billing activity</p></div>
          <a href="/portal/billing" class="btn btn-ghost" style="font-size:12px">View all</a>
        </div>
        <div id="recentInvoices"><div class="empty-state"><div class="empty-icon">◎</div><h3>No invoices yet</h3><p>Invoices will appear here when created</p></div></div>
      </div>
    </div>`,
    script: `
    window.addEventListener('DOMContentLoaded', async () => {
      try {
        const [me, projects, invoices, tickets] = await Promise.all([
          api('/api/me'),
          api('/api/projects'),
          api('/api/invoices'),
          api('/api/support/tickets')
        ]);

        // Stats
        document.getElementById('statProjects').textContent = (projects.projects || []).length;
        document.getElementById('statInvoices').textContent = (invoices.invoices || []).length;
        const open = (tickets.tickets || []).filter(t => t.status === 'open').length;
        document.getElementById('statTickets').textContent = open;
        document.getElementById('statCredit').textContent = 'R' + (Number(me.user?.credit || 0) / 100).toFixed(2);

        // Recent projects
        const projs = (projects.projects || []).slice(0, 3);
        if (projs.length) {
          document.getElementById('recentProjects').innerHTML =
            '<table class="data-table"><thead><tr><th>Domain</th><th>Status</th><th>Storage</th></tr></thead><tbody>' +
            projs.map(p => '<tr><td class="mono">' + esc(p.domain) + '</td><td>' + statusBadge(p.status || 'live') + '</td><td>' + esc(Math.round((p.storage||0)/1024)) + ' KB</td></tr>').join('') +
            '</tbody></table>';
        }

        // Recent invoices
        const invs = (invoices.invoices || []).slice(0, 3);
        if (invs.length) {
          document.getElementById('recentInvoices').innerHTML =
            '<table class="data-table"><thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
            invs.map(i => '<tr><td>' + fmtRand(i.amount) + '</td><td>' + statusBadge(i.status) + '</td><td>' + fmtDate(i.created_at) + '</td></tr>').join('') +
            '</tbody></table>';
        }
      } catch(err) {
        console.error('Dashboard load error:', err);
      }
    });
    `
  });
}

function pagePortalProjects(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: 'Projects',
    path: '/portal/projects',
    body: `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px" class="fade-up">
      <div>
        <h2 style="font-size:16px;font-weight:600">Your Projects</h2>
        <p style="color:var(--muted);font-size:13px">All active deployments linked to your account</p>
      </div>
      <button class="btn btn-primary" onclick="showCreateModal()">+ New Project</button>
    </div>

    <div id="projectsContainer" class="fade-up fade-up-1">
      <div class="card"><div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading projects...</p></div></div>
    </div>

    <!-- Create modal -->
    <div id="createModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px">
      <div class="card" style="max-width:420px;width:100%;background:var(--bg2)">
        <div class="card-header"><h2>Create New Project</h2></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Domain / Project name</label>
            <input id="newDomain" class="form-input" placeholder="client-site.co.za"/>
          </div>
          <div id="createAlert" class="alert"></div>
          <div style="display:flex;gap:8px;margin-top:16px">
            <button class="btn btn-primary" onclick="doCreate()" id="createBtn">Deploy Project</button>
            <button class="btn btn-ghost" onclick="hideCreateModal()">Cancel</button>
          </div>
        </div>
      </div>
    </div>`,
    script: `
    const showCreateModal = () => {
      document.getElementById('createModal').style.display = 'flex';
      document.getElementById('newDomain').focus();
    };
    const hideCreateModal = () => {
      document.getElementById('createModal').style.display = 'none';
    };

    const renderProjects = projects => {
      if (!projects.length) {
        document.getElementById('projectsContainer').innerHTML =
          '<div class="card"><div class="empty-state"><div class="empty-icon">◈</div><h3>No projects yet</h3><p>Create your first project to start tracking client deployments.</p><button class="btn btn-primary" onclick="showCreateModal()">+ New Project</button></div></div>';
        return;
      }
      document.getElementById('projectsContainer').innerHTML =
        '<div class="card"><table class="data-table"><thead><tr><th>Domain</th><th>Status</th><th>Storage</th><th>Created</th></tr></thead><tbody>' +
        projects.map(p => '<tr><td class="mono">' + esc(p.domain) + '</td><td>' + statusBadge(p.status || 'live') + '</td><td>' + esc(Math.round((p.storage||0)/1024)) + ' KB</td><td>' + fmtDate(p.created_at) + '</td></tr>').join('') +
        '</tbody></table></div>';
    };

    const doCreate = async () => {
      const btn = document.getElementById('createBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const domain = document.getElementById('newDomain').value.trim() || ('project-' + Date.now() + '.co.za');
        await api('/api/deploy', {
          method: 'POST',
          body: JSON.stringify({ domain, files: [{ name:'index.html', contentType:'text/html', content:'<h1>' + domain + '</h1>' }] })
        });
        hideCreateModal();
        loadProjects();
      } catch(err) {
        showAlert('createAlert', err.message, 'error');
      } finally {
        btn.innerHTML = 'Deploy Project';
        btn.disabled = false;
      }
    };

    const loadProjects = async () => {
      try {
        const data = await api('/api/projects');
        renderProjects(data.projects || []);
      } catch(err) {
        document.getElementById('projectsContainer').innerHTML = '<div class="card"><div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadProjects);
    `
  });
}

function pagePortalBilling(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: 'Billing',
    path: '/portal/billing',
    body: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      <div class="card fade-up">
        <div class="card-header"><h2>Create Invoice</h2><p>Initiate a Yoco payment session</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Amount (ZAR)</label>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="color:var(--muted);font-size:18px;font-weight:600">R</span>
              <input id="amountRand" class="form-input" type="number" min="1" step="0.01" placeholder="99.00" style="font-size:18px;font-weight:600"/>
            </div>
          </div>
          <button class="btn btn-primary" onclick="doCheckout()" id="checkoutBtn" style="width:100%;justify-content:center;padding:10px">
            Pay with Yoco →
          </button>
          <div id="checkoutAlert" class="alert" style="margin-top:10px"></div>
        </div>
      </div>

      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>Invoice History</h2><p>All payment records</p></div>
        <div id="invoiceList">
          <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
        </div>
      </div>
    </div>`,
    script: `
    const doCheckout = async () => {
      const btn = document.getElementById('checkoutBtn');
      btn.innerHTML = '<span class="spinner"></span> Creating checkout...';
      btn.disabled = true;
      try {
        const rand = parseFloat(document.getElementById('amountRand').value);
        if (!rand || rand <= 0) throw new Error('Enter a valid amount');
        const cents = Math.round(rand * 100);
        const data = await api('/api/invoice/checkout', { method:'POST', body: JSON.stringify({ amount: cents }) });
        if (data.checkoutUrl) {
          window.open(data.checkoutUrl, '_blank', 'noopener,noreferrer');
          showAlert('checkoutAlert', 'Checkout opened in a new tab. Invoice ID: ' + data.invoiceId, 'success');
        } else {
          showAlert('checkoutAlert', 'Invoice created but no checkout URL returned. Invoice: ' + data.invoiceId, 'warn');
        }
        loadInvoices();
      } catch(err) {
        showAlert('checkoutAlert', err.message, 'error');
      } finally {
        btn.innerHTML = 'Pay with Yoco →';
        btn.disabled = false;
      }
    };

    const loadInvoices = async () => {
      try {
        const data = await api('/api/invoices');
        const invs = data.invoices || [];
        if (!invs.length) {
          document.getElementById('invoiceList').innerHTML = '<div class="empty-state"><div class="empty-icon">◎</div><h3>No invoices yet</h3><p>Create your first invoice above</p></div>';
          return;
        }
        document.getElementById('invoiceList').innerHTML =
          '<table class="data-table"><thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
          invs.map(i => '<tr><td style="font-weight:600">' + fmtRand(i.amount) + '</td><td>' + statusBadge(i.status) + '</td><td>' + fmtDate(i.created_at) + '</td></tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('invoiceList').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadInvoices);
    `
  });
}

function pagePortalSupport(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: 'Support',
    path: '/portal/support',
    body: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      <div class="card fade-up">
        <div class="card-header"><h2>New Ticket</h2><p>Our team typically responds within 24 hours</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Subject</label>
            <input id="ticketSubject" class="form-input" placeholder="Brief description of your issue"/>
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea id="ticketMessage" class="form-input" placeholder="Describe your issue in detail..."></textarea>
          </div>
          <button class="btn btn-primary" onclick="submitTicket()" id="ticketBtn" style="width:100%;justify-content:center;padding:10px">
            Submit Ticket
          </button>
          <div id="ticketAlert" class="alert" style="margin-top:10px"></div>
        </div>
      </div>

      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>My Tickets</h2><p>Track your open &amp; closed requests</p></div>
        <div id="ticketList">
          <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
        </div>
      </div>
    </div>`,
    script: `
    const submitTicket = async () => {
      const btn = document.getElementById('ticketBtn');
      btn.innerHTML = '<span class="spinner"></span> Submitting...';
      btn.disabled = true;
      try {
        const subject = document.getElementById('ticketSubject').value.trim();
        const message = document.getElementById('ticketMessage').value.trim();
        if (!subject) throw new Error('Subject is required');
        await api('/api/support/tickets', { method:'POST', body: JSON.stringify({ subject, message }) });
        document.getElementById('ticketSubject').value = '';
        document.getElementById('ticketMessage').value = '';
        showAlert('ticketAlert', 'Ticket submitted! We will respond shortly.', 'success');
        loadTickets();
      } catch(err) {
        showAlert('ticketAlert', err.message, 'error');
      } finally {
        btn.innerHTML = 'Submit Ticket';
        btn.disabled = false;
      }
    };

    const loadTickets = async () => {
      try {
        const data = await api('/api/support/tickets');
        const tickets = data.tickets || [];
        if (!tickets.length) {
          document.getElementById('ticketList').innerHTML = '<div class="empty-state"><div class="empty-icon">◷</div><h3>No tickets yet</h3><p>Submit a ticket if you need help</p></div>';
          return;
        }
        document.getElementById('ticketList').innerHTML =
          '<table class="data-table"><thead><tr><th>Subject</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
          tickets.map(t => '<tr><td>' + esc(t.subject) + '</td><td>' + statusBadge(t.status) + '</td><td>' + fmtDate(t.created_at) + '</td></tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('ticketList').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadTickets);
    `
  });
}

function pageAdminDashboard(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: 'Overview',
    body: `
    <div class="stat-grid fade-up" id="statsGrid">
      <div class="stat-card"><div class="stat-label">Total users</div><div class="stat-value" id="sUsers">—</div></div>
      <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value" id="sProjects">—</div></div>
      <div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value" id="sInvoices">—</div></div>
      <div class="stat-card"><div class="stat-label">Paid revenue</div><div class="stat-value" id="sRevenue">—</div></div>
    </div>
    <div id="adminAlert" class="alert fade-up" style="margin-top:16px;max-width:500px"></div>`,
    script: `
    const load = async () => {
      try {
        const data = await adminApi('/api/admin/summary');
        document.getElementById('sUsers').textContent    = data.users;
        document.getElementById('sProjects').textContent = data.projects;
        document.getElementById('sInvoices').textContent = data.invoices;
        document.getElementById('sRevenue').textContent  = fmtRand(data.paidRevenueCents);
      } catch(err) {
        document.getElementById('adminAlert').className   = 'alert alert-error fade-up';
        document.getElementById('adminAlert').textContent = err.message;
      }
    };
    document.getElementById('autoLoadTrigger') || (window._autoLoad = load);
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) load(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', load);
    `
  });
}

function pageAdminUsers(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: 'Users',
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">All Users</h2><p style="color:var(--muted);font-size:13px">Registered accounts</p></div>
      <button class="btn btn-ghost" onclick="loadUsers()">↺ Refresh</button>
    </div>
    <div class="card fade-up" id="usersContainer">
      <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
    </div>`,
    script: `
    const loadUsers = async () => {
      try {
        const data = await adminApi('/api/admin/users');
        const users = data.users || [];
        if (!users.length) {
          document.getElementById('usersContainer').innerHTML = '<div class="empty-state"><div class="empty-icon">◎</div><h3>No users yet</h3></div>';
          return;
        }
        document.getElementById('usersContainer').innerHTML =
          '<table class="data-table"><thead><tr><th>Email</th><th>Credit</th><th>Registered</th><th>ID</th></tr></thead><tbody>' +
          users.map(u => '<tr><td>' + esc(u.email) + '</td><td>R' + (Number(u.credit||0)/100).toFixed(2) + '</td><td>' + fmtDate(u.created_at) + '</td><td class="mono" style="color:var(--muted)">' + esc(u.id.slice(0,8)) + '…</td></tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('usersContainer').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadUsers(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadUsers);
    `
  });
}

function pageAdminRevenue(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: 'Revenue',
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">Revenue Analytics</h2><p style="color:var(--muted);font-size:13px">Invoice totals by status</p></div>
      <button class="btn btn-ghost" onclick="loadRevenue()">↺ Refresh</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      <div class="card fade-up" id="totalsCard">
        <div class="card-header"><h2>By Status</h2></div>
        <div class="empty-state"><div class="spinner"></div></div>
      </div>
      <div class="card fade-up fade-up-1" id="paidCard">
        <div class="card-header"><h2>Latest Paid</h2></div>
        <div class="empty-state"><div class="spinner"></div></div>
      </div>
    </div>`,
    script: `
    const loadRevenue = async () => {
      try {
        const data = await adminApi('/api/admin/revenue');
        const totals = data.totals || [];
        const paid   = data.latestPaid || [];

        document.getElementById('totalsCard').innerHTML =
          '<div class="card-header"><h2>By Status</h2></div>' +
          (totals.length
            ? '<table class="data-table"><thead><tr><th>Status</th><th>Count</th><th>Total</th></tr></thead><tbody>' +
              totals.map(t => '<tr><td>' + statusBadge(t.status) + '</td><td>' + esc(t.count) + '</td><td style="font-weight:600">' + fmtRand(t.cents) + '</td></tr>').join('') +
              '</tbody></table>'
            : '<div class="empty-state"><p>No data</p></div>');

        document.getElementById('paidCard').innerHTML =
          '<div class="card-header"><h2>Latest Paid</h2></div>' +
          (paid.length
            ? '<table class="data-table"><thead><tr><th>Amount</th><th>User</th><th>Date</th></tr></thead><tbody>' +
              paid.map(i => '<tr><td style="font-weight:600">' + fmtRand(i.amount) + '</td><td class="mono" style="color:var(--muted)">' + esc(i.user_id.slice(0,8)) + '…</td><td>' + fmtDate(i.created_at) + '</td></tr>').join('') +
              '</tbody></table>'
            : '<div class="empty-state"><p>No paid invoices yet</p></div>');
      } catch(err) {
        document.getElementById('totalsCard').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadRevenue(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadRevenue);
    `
  });
}

function pageAdminTickets(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: 'Tickets',
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">Support Tickets</h2><p style="color:var(--muted);font-size:13px">All client requests</p></div>
      <button class="btn btn-ghost" onclick="loadTickets()">↺ Refresh</button>
    </div>
    <div class="card fade-up" id="ticketsContainer">
      <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
    </div>`,
    script: `
    const loadTickets = async () => {
      try {
        const data = await adminApi('/api/admin/tickets');
        const tickets = data.tickets || [];
        if (!tickets.length) {
          document.getElementById('ticketsContainer').innerHTML = '<div class="empty-state"><div class="empty-icon">◷</div><h3>No tickets yet</h3><p>Client support tickets will appear here</p></div>';
          return;
        }
        document.getElementById('ticketsContainer').innerHTML =
          '<table class="data-table"><thead><tr><th>Subject</th><th>Status</th><th>User</th><th>Date</th></tr></thead><tbody>' +
          tickets.map(t => '<tr><td><strong>' + esc(t.subject) + '</strong></td><td>' + statusBadge(t.status) + '</td><td class="mono" style="color:var(--muted)">' + esc((t.user_id||'').slice(0,8)) + '…</td><td>' + fmtDate(t.created_at) + '</td></tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('ticketsContainer').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadTickets(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadTickets);
    `
  });
}

// ════════════════════════════════════════════════
//  MAIN ROUTER
// ════════════════════════════════════════════════

export function renderFrontend(pathname, apiOrigin) {
  switch (pathname) {
    case '/':              return pageHome(apiOrigin);
    case '/pricing':       return pagePricing(apiOrigin);
    case '/hosting':       return pageHosting(apiOrigin);
    case '/contact':       return pageContact(apiOrigin);
    case '/portal/login':  return pageLogin(apiOrigin);
    case '/portal/register': return pageRegister(apiOrigin);
    case '/portal':
    case '/portal/dashboard': return pagePortalDashboard(apiOrigin);
    case '/portal/projects':  return pagePortalProjects(apiOrigin);
    case '/portal/billing':   return pagePortalBilling(apiOrigin);
    case '/portal/support':   return pagePortalSupport(apiOrigin);
    case '/admin/dashboard':  return pageAdminDashboard(apiOrigin);
    case '/admin/users':      return pageAdminUsers(apiOrigin);
    case '/admin/revenue':    return pageAdminRevenue(apiOrigin);
    case '/admin/tickets':    return pageAdminTickets(apiOrigin);
    default: return null;
  }
}

// Keep backward compat export
export function renderDesignerLanding(apiOrigin) {
  return pageHome(apiOrigin);
}