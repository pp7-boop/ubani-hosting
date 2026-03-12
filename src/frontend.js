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

  /* ── PROFILE ──────────────────────────────── */
  .profile-avatar {
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), #9333ea);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .plan-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 999px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
    background: rgba(249,115,22,0.15); color: var(--accent); border: 1px solid rgba(249,115,22,0.3);
  }

  /* ── TICKET THREAD ────────────────────────── */
  .thread { display: flex; flex-direction: column; gap: 12px; padding: 20px; }
  .thread-msg {
    padding: 14px 16px; border-radius: var(--radius);
    border: 1px solid var(--border); background: var(--bg2);
    max-width: 90%;
  }
  .thread-msg.from-admin {
    border-color: rgba(249,115,22,0.3);
    background: rgba(249,115,22,0.06);
    align-self: flex-end;
  }
  .thread-msg.from-client { align-self: flex-start; }
  .thread-msg-meta { font-size: 11px; color: var(--muted); margin-bottom: 6px; font-weight: 600; }
  .thread-msg p { font-size: 13px; line-height: 1.6; white-space: pre-wrap; }

  /* ── NOTIFICATION DOT ─────────────────────── */
  .notif-dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); margin-left: 6px; vertical-align: middle;
    animation: pulse 2s infinite;
  }

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
    if (avatar) avatar.textContent = (u.name || u.email || '?')[0].toUpperCase();
    if (email)  email.textContent  = u.name || u.email || '';
    if (plan)   plan.textContent   = (u.plan ? u.plan.charAt(0).toUpperCase() + u.plan.slice(1) : 'Free') + ' Plan';
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
    { href: '/portal/profile',   icon: '◉', label: 'Profile'   },
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
    { href: '/admin/projects',  icon: '◈', label: 'Projects'  },
    { href: '/admin/revenue',   icon: '◉', label: 'Revenue'   },
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
        <label class="form-label" for="email">Email address</label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" autocomplete="email"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password</label>
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
        <label class="form-label" for="name">Full name</label>
        <input id="name" type="text" class="form-input" placeholder="Jane Smith" autocomplete="name"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="email">Email address</label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" autocomplete="email"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password</label>
        <input id="password" type="password" class="form-input" placeholder="Min. 8 characters" autocomplete="new-password"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="password2">Confirm password</label>
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
    <div style="display:grid;grid-template-columns:320px 1fr;gap:16px;min-height:500px">

      <!-- Left: project list -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn btn-primary" onclick="showNewProject()" style="width:100%;justify-content:center">+ New Project</button>
        <div class="card" style="flex:1">
          <div class="card-header"><h2>Your Projects</h2><p id="projCount">Loading...</p></div>
          <div id="projectListPanel" style="overflow-y:auto;max-height:520px">
            <div class="empty-state"><div class="spinner"></div></div>
          </div>
        </div>
      </div>

      <!-- Right: project detail -->
      <div id="projectDetailPanel" class="card">
        <div class="empty-state" style="padding:60px 24px">
          <div class="empty-icon">◈</div>
          <h3>Select a project</h3>
          <p>Choose a project from the left or create a new one to get started.</p>
        </div>
      </div>

    </div>`,
    script: `
    let activeProjectId = null;

    const showNewProject = () => {
      activeProjectId = null;
      document.querySelectorAll('.proj-item').forEach(el => el.style.background = '');
      document.getElementById('projectDetailPanel').innerHTML = \`
        <div class="card-header"><h2>New Project</h2><p>Create a new client deployment</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label" for="newDomain">Domain / Project name</label>
            <input id="newDomain" class="form-input" placeholder="client-site.co.za"/>
          </div>
          <div class="form-group">
            <label class="form-label" for="newDesc">Description (optional)</label>
            <input id="newDesc" class="form-input" placeholder="Brief project notes"/>
          </div>
          <button class="btn btn-primary" onclick="doCreateProject()" id="createProjBtn" style="padding:9px 20px">Create Project</button>
          <div id="createProjAlert" class="alert" style="margin-top:10px"></div>
        </div>
      \`;
    };

    const doCreateProject = async () => {
      const btn = document.getElementById('createProjBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const domain = document.getElementById('newDomain').value.trim();
        const description = document.getElementById('newDesc').value.trim();
        if (!domain) throw new Error('Domain is required');
        const data = await api('/api/projects', { method:'POST', body: JSON.stringify({ domain, description }) });
        await loadProjects();
        openProject(data.project.id);
      } catch(err) {
        showAlert('createProjAlert', err.message, 'error');
        btn.innerHTML = 'Create Project';
        btn.disabled = false;
      }
    };

    const openProject = async (projectId) => {
      activeProjectId = projectId;
      document.querySelectorAll('.proj-item').forEach(el => {
        el.style.background = el.dataset.id === projectId ? 'var(--bg3)' : '';
      });
      document.getElementById('projectDetailPanel').innerHTML = '<div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading project...</p></div>';
      try {
        const data = await api('/api/projects/' + projectId);
        const proj  = data.project;
        const files = data.files || [];
        const deploys = data.deployments || [];
        const isLive  = proj.status === 'live';
        const isBuild = proj.status === 'building';

        document.getElementById('projectDetailPanel').innerHTML =
          '<div class="card-header">' +
          '<div><h2>' + esc(proj.domain) + '</h2>' +
          '<p style="margin-top:3px">' + statusBadge(proj.status || 'draft') +
          (isLive && proj.cf_pages_url ? ' &nbsp;<a href="' + esc(proj.cf_pages_url) + '" target="_blank" rel="noopener" style="font-size:12px;color:var(--blue)">↗ ' + esc(proj.cf_pages_url) + '</a>' : '') +
          '</p></div>' +
          '<div style="display:flex;gap:8px">' +
          (!isBuild ? '<button class="btn btn-primary" onclick="doDeploy(\'' + esc(projectId) + '\')" id="deployBtn" style="font-size:13px">' + (isLive ? '↺ Redeploy' : '🚀 Deploy to Pages') + '</button>' : '<button class="btn btn-ghost" disabled>Building...</button>') +
          '</div></div>' +

          // Description
          (proj.description ? '<div style="padding:12px 20px;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted)">' + esc(proj.description) + '</div>' : '') +

          // File upload area
          '<div style="padding:16px 20px;border-bottom:1px solid var(--border)">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
          '<div class="section-label">Files (' + files.length + ')</div>' +
          '<label class="btn btn-ghost" style="font-size:12px;cursor:pointer">+ Upload File<input type="file" multiple style="display:none" onchange="uploadFiles(\'' + esc(projectId) + '\', this)"/></label>' +
          '</div>' +
          (files.length ? '<table class="data-table"><thead><tr><th>Filename</th><th>Type</th><th>Size</th><th></th></tr></thead><tbody>' +
          files.map(f => '<tr><td class="mono" style="font-size:12px">' + esc(f.filename) + '</td><td style="color:var(--muted);font-size:12px">' + esc(f.content_type) + '</td><td style="font-size:12px">' + formatBytes(f.size_bytes) + '</td><td><button onclick="deleteFile(\'' + esc(projectId) + '\',\'' + esc(f.id) + '\')" class="btn btn-danger" style="font-size:11px;padding:3px 8px">✕</button></td></tr>').join('') +
          '</tbody></table>'
          : '<div style="border:2px dashed var(--border2);border-radius:8px;padding:24px;text-align:center;color:var(--muted);font-size:13px">Drop files here or click Upload File above</div>') +
          '<div id="uploadAlert" class="alert" style="margin-top:8px"></div>' +
          '</div>' +

          // Deploy log
          '<div style="padding:16px 20px">' +
          '<div class="section-label" style="margin-bottom:10px">Deployment History</div>' +
          (deploys.length ? '<table class="data-table"><thead><tr><th>Status</th><th>URL</th><th>Date</th></tr></thead><tbody>' +
          deploys.map(d => '<tr><td>' + statusBadge(d.status) + '</td><td>' +
          (d.pages_url ? '<a href="' + esc(d.pages_url) + '" target="_blank" style="font-size:12px">' + esc(d.pages_url) + '</a>' : (d.error_message ? '<span style="color:var(--red);font-size:12px">' + esc(d.error_message) + '</span>' : '—')) +
          '</td><td style="font-size:12px">' + fmtDate(d.triggered_at) + '</td></tr>').join('') +
          '</tbody></table>'
          : '<p style="color:var(--muted);font-size:13px">No deployments yet. Upload files then click Deploy.</p>') +
          '</div>';
      } catch(err) {
        document.getElementById('projectDetailPanel').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    const formatBytes = n => {
      const v = Number(n || 0);
      if (v < 1024) return v + ' B';
      if (v < 1024*1024) return (v/1024).toFixed(1) + ' KB';
      return (v/1024/1024).toFixed(1) + ' MB';
    };

    const uploadFiles = async (projectId, input) => {
      const filesToUpload = Array.from(input.files);
      if (!filesToUpload.length) return;
      showAlert('uploadAlert', 'Uploading ' + filesToUpload.length + ' file(s)...', 'info');
      try {
        for (const file of filesToUpload) {
          await fetch(APP + '/api/projects/' + projectId + '/files', {
            method: 'POST',
            headers: {
              authorization: 'Bearer ' + _getToken(),
              'content-type': file.type || 'application/octet-stream',
              'x-filename': encodeURIComponent(file.name)
            },
            body: file
          }).then(async r => {
            if (!r.ok) { const d = await r.json().catch(()=>{}); throw new Error(d?.error || 'Upload failed'); }
          });
        }
        showAlert('uploadAlert', filesToUpload.length + ' file(s) uploaded!', 'success');
        setTimeout(() => openProject(projectId), 500);
      } catch(err) {
        showAlert('uploadAlert', err.message, 'error');
      }
    };

    const deleteFile = async (projectId, fileId) => {
      if (!confirm('Delete this file?')) return;
      try {
        await api('/api/projects/' + projectId + '/files/' + fileId, { method:'DELETE' });
        openProject(projectId);
      } catch(err) { alert(err.message); }
    };

    const doDeploy = async (projectId) => {
      const btn = document.getElementById('deployBtn');
      if (btn) { btn.innerHTML = '<span class="spinner"></span> Deploying...'; btn.disabled = true; }
      try {
        const data = await api('/api/projects/' + projectId + '/deploy', { method:'POST' });
        if (data.pagesUrl) {
          showAlert('uploadAlert', '🚀 Deployed! Live at: ' + data.pagesUrl, 'success');
        } else {
          showAlert('uploadAlert', data.note || 'Deployment queued.', 'info');
        }
        await loadProjects();
        setTimeout(() => openProject(projectId), 800);
      } catch(err) {
        showAlert('uploadAlert', err.message, 'error');
        if (btn) { btn.innerHTML = '🚀 Deploy to Pages'; btn.disabled = false; }
      }
    };

    const loadProjects = async () => {
      try {
        const data = await api('/api/projects');
        const projects = data.projects || [];
        document.getElementById('projCount').textContent = projects.length + ' project' + (projects.length !== 1 ? 's' : '');
        if (!projects.length) {
          document.getElementById('projectListPanel').innerHTML = '<div class="empty-state" style="padding:24px 16px"><p>No projects yet</p></div>';
          return;
        }
        document.getElementById('projectListPanel').innerHTML = projects.map(p =>
          '<div class="proj-item" data-id="' + esc(p.id) + '" onclick="openProject(\'' + esc(p.id) + '\')"' +
          ' style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s' + (p.id === activeProjectId ? ';background:var(--bg3)' : '') + '">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px">' +
          '<strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">' + esc(p.domain) + '</strong>' +
          statusBadge(p.status || 'draft') + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + formatBytes(p.storage) + ' · ' + fmtDate(p.created_at) + '</div></div>'
        ).join('');
      } catch(err) {
        document.getElementById('projectListPanel').innerHTML = '<div style="padding:12px"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
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
            <label class="form-label" for="invoiceAmount">Amount (ZAR)</label>
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
    <div style="display:grid;grid-template-columns:300px 1fr;gap:16px;min-height:500px">
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn btn-primary" onclick="showNewTicket()" style="width:100%;justify-content:center">+ New Ticket</button>
        <div class="card" style="flex:1">
          <div class="card-header"><h2>My Tickets</h2></div>
          <div id="ticketListPanel" style="overflow-y:auto;max-height:520px">
            <div class="empty-state"><div class="spinner"></div></div>
          </div>
        </div>
      </div>
      <div class="card" id="threadPanel">
        <div class="empty-state" style="padding:60px 24px">
          <div class="empty-icon">◷</div>
          <h3>Select a ticket</h3>
          <p>Choose a ticket from the left, or create a new one.</p>
        </div>
      </div>
    </div>`,
    script: `
    let activeTicketId = null;

    const showNewTicket = () => {
      activeTicketId = null;
      document.querySelectorAll('.ticket-item').forEach(el => el.style.background = '');
      document.getElementById('threadPanel').innerHTML = \`
        <div class="card-header"><h2>New Support Ticket</h2><p>Our team typically responds within 24 hours</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label" for="newSubject">Subject</label>
            <input id="newSubject" class="form-input" placeholder="Brief description of your issue"/>
          </div>
          <div class="form-group">
            <label class="form-label" for="newMessage">Message</label>
            <textarea id="newMessage" class="form-input" placeholder="Describe your issue in detail..." style="min-height:140px"></textarea>
          </div>
          <button class="btn btn-primary" onclick="submitNewTicket()" id="submitTicketBtn" style="padding:10px 20px">Submit Ticket</button>
          <div id="newTicketAlert" class="alert" style="margin-top:10px"></div>
        </div>
      \`;
    };

    const submitNewTicket = async () => {
      const btn = document.getElementById('submitTicketBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const subject = document.getElementById('newSubject').value.trim();
        const message = document.getElementById('newMessage').value.trim();
        if (!subject) throw new Error('Subject is required');
        const data = await api('/api/support/tickets', { method:'POST', body: JSON.stringify({ subject, message }) });
        await loadTickets();
        openTicket(data.ticket.id);
      } catch(err) {
        showAlert('newTicketAlert', err.message, 'error');
        btn.innerHTML = 'Submit Ticket';
        btn.disabled = false;
      }
    };

    const openTicket = async (ticketId) => {
      activeTicketId = ticketId;
      document.querySelectorAll('.ticket-item').forEach(el => {
        el.style.background = el.dataset.id === ticketId ? 'var(--bg3)' : '';
      });
      document.getElementById('threadPanel').innerHTML = '<div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>';
      try {
        const data = await api('/api/support/tickets/' + ticketId);
        const ticket = data.ticket;
        const messages = data.messages || [];
        const isClosed = ticket.status === 'closed';
        document.getElementById('threadPanel').innerHTML =
          '<div class="card-header"><div><h2>' + esc(ticket.subject) + '</h2>' +
          '<p style="margin-top:4px">Opened ' + fmtDate(ticket.created_at) + ' &nbsp;' + statusBadge(ticket.status) + '</p></div></div>' +
          '<div class="thread" id="messageThread">' +
          (messages.length ? messages.map(m =>
            '<div class="thread-msg ' + (m.author_role === 'admin' ? 'from-admin' : 'from-client') + '">' +
            '<div class="thread-msg-meta">' + (m.author_role === 'admin' ? '🟠 Ubani Support' : '◉ You') + ' · ' + fmtDate(m.created_at) + '</div>' +
            '<p>' + esc(m.body) + '</p></div>'
          ).join('') : '<p style="color:var(--muted);font-size:13px;padding:8px 0">No messages yet.</p>') +
          '</div>' +
          (!isClosed
            ? '<div style="padding:16px;border-top:1px solid var(--border)">' +
              '<textarea id="replyText" class="form-input" placeholder="Write a reply..." style="min-height:80px;margin-bottom:10px"></textarea>' +
              '<button class="btn btn-primary" onclick="sendReply(\'' + esc(ticketId) + '\')" id="replyBtn">Send Reply</button>' +
              '<div id="replyAlert" class="alert" style="margin-top:8px"></div></div>'
            : '<div style="padding:16px;color:var(--muted);font-size:13px;border-top:1px solid var(--border)">This ticket is closed.</div>'
          );
      } catch(err) {
        document.getElementById('threadPanel').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    const sendReply = async (ticketId) => {
      const btn = document.getElementById('replyBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const message = document.getElementById('replyText').value.trim();
        if (!message) throw new Error('Message is required');
        await api('/api/support/tickets/' + ticketId + '/reply', { method:'POST', body: JSON.stringify({ message }) });
        openTicket(ticketId);
        loadTickets();
      } catch(err) {
        showAlert('replyAlert', err.message, 'error');
        btn.innerHTML = 'Send Reply';
        btn.disabled = false;
      }
    };

    const loadTickets = async () => {
      try {
        const data = await api('/api/support/tickets');
        const tickets = data.tickets || [];
        if (!tickets.length) {
          document.getElementById('ticketListPanel').innerHTML = '<div class="empty-state" style="padding:24px 16px"><p>No tickets yet.</p></div>';
          return;
        }
        document.getElementById('ticketListPanel').innerHTML = tickets.map(t =>
          '<div class="ticket-item" data-id="' + esc(t.id) + '" onclick="openTicket(\'' + esc(t.id) + '\')"' +
          ' style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px">' +
          '<strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px">' + esc(t.subject) + '</strong>' +
          statusBadge(t.status) + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + fmtDate(t.updated_at || t.created_at) + '</div></div>'
        ).join('');
      } catch(err) {
        document.getElementById('ticketListPanel').innerHTML = '<div style="padding:12px"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadTickets);
    `
  });
}

function pagePortalProfile(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: 'Profile',
    path: '/portal/profile',
    body: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px">
      <div class="card fade-up">
        <div class="card-header"><h2>Account Details</h2><p>Your personal information</p></div>
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
            <div class="profile-avatar" id="profileAvatar">?</div>
            <div>
              <div style="font-size:16px;font-weight:600" id="profileName">Loading...</div>
              <div style="font-size:13px;color:var(--muted)" id="profileEmail"></div>
              <div style="margin-top:4px"><span class="plan-pill" id="profilePlan">Free</span></div>
            </div>
          </div>
          <hr style="border:none;border-top:1px solid var(--border);margin-bottom:20px"/>
          <div class="form-group">
            <label class="form-label" for="nameInput">Full Name</label>
            <input id="nameInput" class="form-input" placeholder="Your name"/>
          </div>
          <button class="btn btn-primary" onclick="saveProfile()" id="saveBtn" style="padding:9px 20px">Save Changes</button>
          <div id="profileAlert" class="alert" style="margin-top:10px"></div>
        </div>
      </div>

      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>Account Stats</h2><p>Your usage at a glance</p></div>
        <div class="card-body" id="statsBody">
          <div class="empty-state" style="padding:20px"><div class="spinner"></div></div>
        </div>
      </div>

      <div class="card fade-up fade-up-2">
        <div class="card-header"><h2>Upgrade Plan</h2><p>Get more from Ubani</p></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:16px">Unlock more projects, storage, and priority support by upgrading your plan.</p>
          <a href="/pricing" class="btn btn-primary" style="width:100%;justify-content:center">View plans →</a>
        </div>
      </div>
    </div>`,
    script: `
    window.addEventListener('DOMContentLoaded', async () => {
      try {
        const [meData, projects, invoices, tickets] = await Promise.all([
          api('/api/me'),
          api('/api/projects'),
          api('/api/invoices'),
          api('/api/support/tickets')
        ]);
        const u = meData.user || {};

        // Update local storage with fresh data
        _setUser({ ..._getUser(), name: u.name, plan: u.plan });

        document.getElementById('profileAvatar').textContent = (u.name || u.email || '?')[0].toUpperCase();
        document.getElementById('profileName').textContent   = u.name || '(no name set)';
        document.getElementById('profileEmail').textContent  = u.email || '';
        document.getElementById('profilePlan').textContent   = u.plan ? u.plan.charAt(0).toUpperCase() + u.plan.slice(1) : 'Free';
        document.getElementById('nameInput').value           = u.name || '';

        // Update sidebar too
        const sAvatar = document.getElementById('userAvatar');
        const sEmail  = document.getElementById('userEmail');
        const sPlan   = document.getElementById('userPlan');
        if (sAvatar) sAvatar.textContent = (u.name || u.email || '?')[0].toUpperCase();
        if (sEmail)  sEmail.textContent  = u.name || u.email || '';
        if (sPlan)   sPlan.textContent   = (u.plan ? u.plan.charAt(0).toUpperCase() + u.plan.slice(1) : 'Free') + ' Plan';

        document.getElementById('statsBody').innerHTML =
          '<div class="stat-grid">' +
          '<div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value">' + (projects.projects||[]).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value">' + (invoices.invoices||[]).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">Tickets</div><div class="stat-value">' + (tickets.tickets||[]).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">Credit</div><div class="stat-value">R' + (Number(u.credit||0)/100).toFixed(2) + '</div></div>' +
          '<div class="stat-card" style="grid-column:1/-1"><div class="stat-label">Member since</div><div class="stat-value" style="font-size:16px">' + fmtDate(u.created_at) + '</div></div>' +
          '</div>';
      } catch(err) {
        showAlert('profileAlert', err.message, 'error');
      }
    });

    const saveProfile = async () => {
      const btn = document.getElementById('saveBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const name = document.getElementById('nameInput').value.trim();
        if (!name) throw new Error('Name cannot be empty');
        await api('/api/me', { method:'PATCH', body: JSON.stringify({ name }) });
        // Update local user cache
        const u = _getUser() || {};
        _setUser({ ...u, name });
        document.getElementById('profileAvatar').textContent = name[0].toUpperCase();
        document.getElementById('profileName').textContent   = name;
        const sAvatar = document.getElementById('userAvatar');
        const sEmail  = document.getElementById('userEmail');
        if (sAvatar) sAvatar.textContent = name[0].toUpperCase();
        if (sEmail)  sEmail.textContent  = name;
        showAlert('profileAlert', 'Profile updated!', 'success');
      } catch(err) {
        showAlert('profileAlert', err.message, 'error');
      } finally {
        btn.innerHTML = 'Save Changes';
        btn.disabled = false;
      }
    };
    `
  });
}

function pageAdminProjects(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: 'Projects',
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">All Projects</h2><p style="color:var(--muted);font-size:13px">Every deployment across all clients</p></div>
      <div style="display:flex;gap:8px">
        <select id="statusFilter" class="form-input" style="width:auto;font-size:12px" onchange="loadProjects()">
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="building">Building</option>
          <option value="live">Live</option>
          <option value="paused">Paused</option>
        </select>
        <button class="btn btn-ghost" onclick="loadProjects()">↺ Refresh</button>
      </div>
    </div>
    <div class="card fade-up" id="projectsContainer">
      <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
    </div>`,
    script: `
    const setStatus = async (projectId, status) => {
      try {
        await adminApi('/api/admin/projects/' + projectId + '/status', { method:'POST', body: JSON.stringify({ status }) });
        loadProjects();
      } catch(err) { alert(err.message); }
    };

    const adminApiPost = async (path, body) => {
      const key = _adminKey();
      if (!key) throw new Error('No admin key');
      const res = await fetch(APP + path, {
        method: 'POST',
        headers: { 'x-admin-key': key, 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
      return data;
    };

    const loadProjects = async () => {
      try {
        const data = await adminApi('/api/admin/projects');
        let projects = data.projects || [];
        const filter = document.getElementById('statusFilter').value;
        if (filter) projects = projects.filter(p => p.status === filter);
        if (!projects.length) {
          document.getElementById('projectsContainer').innerHTML = '<div class="empty-state"><div class="empty-icon">◈</div><h3>No projects found</h3></div>';
          return;
        }
        document.getElementById('projectsContainer').innerHTML =
          '<table class="data-table"><thead><tr><th>Domain</th><th>Client</th><th>Status</th><th>Live URL</th><th>Storage</th><th>Actions</th></tr></thead><tbody>' +
          projects.map(p => '<tr>' +
            '<td><strong style="font-size:13px">' + esc(p.domain) + '</strong></td>' +
            '<td style="font-size:12px;color:var(--muted)">' + esc(p.name || p.email || '') + '</td>' +
            '<td>' + statusBadge(p.status || 'draft') + '</td>' +
            '<td>' + (p.cf_pages_url ? '<a href="' + esc(p.cf_pages_url) + '" target="_blank" style="font-size:12px">↗ View</a>' : '<span style="color:var(--muted);font-size:12px">—</span>') + '</td>' +
            '<td style="font-size:12px">' + (p.storage > 0 ? (p.storage/1024).toFixed(1) + ' KB' : '—') + '</td>' +
            '<td><select onchange="setStatus('" + esc(p.id) + "', this.value)" style="background:var(--bg2);border:1px solid var(--border2);color:var(--text);border-radius:6px;padding:3px 6px;font-size:11px;cursor:pointer">' +
            ['draft','live','paused','building'].map(s => '<option value="' + s + '"' + (p.status === s ? ' selected' : '') + '>' + s + '</option>').join('') +
            '</select></td>' +
          '</tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('projectsContainer').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadProjects(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadProjects);
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
    <div style="display:grid;grid-template-columns:320px 1fr;gap:16px;min-height:540px" class="fade-up">
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" onclick="loadTickets()" style="flex:1">↺ Refresh</button>
          <select id="statusFilter" class="form-input" style="width:auto;font-size:12px" onchange="loadTickets()">
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="card" style="flex:1">
          <div class="card-header"><h2>All Tickets</h2><p id="ticketCount">Loading...</p></div>
          <div id="ticketListPanel" style="overflow-y:auto;max-height:520px">
            <div class="empty-state"><div class="spinner"></div></div>
          </div>
        </div>
      </div>

      <div class="card" id="adminThreadPanel">
        <div class="empty-state" style="padding:60px 24px">
          <div class="empty-icon">◷</div>
          <h3>Select a ticket</h3>
          <p>Click a ticket on the left to view the full thread and reply.</p>
        </div>
      </div>
    </div>`,
    script: `
    let activeId = null;

    const openAdminTicket = async (ticketId) => {
      activeId = ticketId;
      document.querySelectorAll('.admin-ticket-item').forEach(el => {
        el.style.background = el.dataset.id === ticketId ? 'var(--bg3)' : '';
      });
      document.getElementById('adminThreadPanel').innerHTML = '<div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading thread...</p></div>';
      try {
        const data = await adminApi('/api/admin/tickets/' + ticketId);
        const ticket = data.ticket;
        const messages = data.messages || [];
        const isClosed = ticket.status === 'closed';
        document.getElementById('adminThreadPanel').innerHTML =
          '<div class="card-header">' +
          '<div><h2>' + esc(ticket.subject) + '</h2>' +
          '<p style="margin-top:4px">From: <strong>' + esc(ticket.name || ticket.email || '') + '</strong> (' + esc(ticket.email || '') + ') &nbsp;' + statusBadge(ticket.status) + '</p>' +
          '<p style="margin-top:2px;font-size:12px;color:var(--muted)">Opened ' + fmtDate(ticket.created_at) + '</p>' +
          '</div>' +
          (isClosed
            ? '<button class="btn btn-ghost" style="font-size:12px" disabled>Closed</button>'
            : '<button class="btn btn-danger" style="font-size:12px" onclick="closeTicket(\'' + esc(ticketId) + '\')">Close Ticket</button>'
          ) +
          '</div>' +
          '<div class="thread" id="adminMsgThread">' +
          (messages.length ? messages.map(m =>
            '<div class="thread-msg ' + (m.author_role === 'admin' ? 'from-admin' : 'from-client') + '">' +
            '<div class="thread-msg-meta">' + (m.author_role === 'admin' ? '🟠 You (Admin)' : '◉ Client') + ' · ' + fmtDate(m.created_at) + '</div>' +
            '<p>' + esc(m.body) + '</p></div>'
          ).join('') : '<p style="color:var(--muted);font-size:13px;padding:4px 0">No messages in thread yet.</p>') +
          '</div>' +
          (!isClosed
            ? '<div style="padding:16px;border-top:1px solid var(--border)">' +
              '<textarea id="adminReplyText" class="form-input" placeholder="Type your reply to the client..." style="min-height:100px;margin-bottom:10px"></textarea>' +
              '<button class="btn btn-primary" onclick="sendAdminReply(\'' + esc(ticketId) + '\')" id="adminReplyBtn">Send Reply &amp; Notify Client</button>' +
              '<div id="adminReplyAlert" class="alert" style="margin-top:8px"></div></div>'
            : '<div style="padding:16px;color:var(--muted);font-size:13px;border-top:1px solid var(--border)">This ticket is closed.</div>'
          );
      } catch(err) {
        document.getElementById('adminThreadPanel').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    const sendAdminReply = async (ticketId) => {
      const btn = document.getElementById('adminReplyBtn');
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;
      try {
        const message = document.getElementById('adminReplyText').value.trim();
        if (!message) throw new Error('Reply cannot be empty');
        await adminApi('/api/admin/tickets/' + ticketId + '/reply', { method: 'POST', body: JSON.stringify({ message }) });
        showAdminAlert('adminReplyAlert', 'Reply sent — client notified by email ✓', 'success');
        openAdminTicket(ticketId);
        loadTickets();
      } catch(err) {
        showAdminAlert('adminReplyAlert', err.message, 'error');
        btn.innerHTML = 'Send Reply & Notify Client';
        btn.disabled = false;
      }
    };

    const closeTicket = async (ticketId) => {
      if (!confirm('Close this ticket?')) return;
      try {
        await adminApi('/api/admin/tickets/' + ticketId + '/close', { method: 'POST' });
        loadTickets();
        openAdminTicket(ticketId);
      } catch(err) { alert(err.message); }
    };

    const showAdminAlert = (id, msg, type) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.className = 'alert alert-' + type;
      el.textContent = msg;
    };

    const adminApi2 = async (path, options = {}) => {
      const key = _adminKey();
      if (!key) throw new Error('No admin key set');
      const opts = { ...options, headers: { 'x-admin-key': key, 'content-type': 'application/json', ...(options.headers||{}) } };
      const res = await fetch(APP + path, opts);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
      return data;
    };
    // Override adminApi to support POST
    const _origAdminApi = adminApi;
    const adminApi = async (path, options = {}) => {
      if (options.method) return adminApi2(path, options);
      return _origAdminApi(path);
    };

    const loadTickets = async () => {
      try {
        const data = await adminApi('/api/admin/tickets');
        let tickets = data.tickets || [];
        const filter = document.getElementById('statusFilter').value;
        if (filter) tickets = tickets.filter(t => t.status === filter);
        document.getElementById('ticketCount').textContent = tickets.length + ' ticket' + (tickets.length !== 1 ? 's' : '');
        if (!tickets.length) {
          document.getElementById('ticketListPanel').innerHTML = '<div class="empty-state" style="padding:24px 16px"><p>No tickets found</p></div>';
          return;
        }
        document.getElementById('ticketListPanel').innerHTML = tickets.map(t =>
          '<div class="admin-ticket-item" data-id="' + esc(t.id) + '" onclick="openAdminTicket('" + esc(t.id) + "')"' +
          ' style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s' + (t.id === activeId ? ';background:var(--bg3)' : '') + '">' +
          '<div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:3px">' +
          '<strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px">' + esc(t.subject) + '</strong>' +
          statusBadge(t.status) + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + esc((t.user_id||'').slice(0,8)) + '… · ' + fmtDate(t.created_at) + '</div></div>'
        ).join('');
      } catch(err) {
        document.getElementById('ticketListPanel').innerHTML = '<div style="padding:12px"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
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
    case '/portal/profile':   return pagePortalProfile(apiOrigin);
    case '/admin/dashboard':  return pageAdminDashboard(apiOrigin);
    case '/admin/users':      return pageAdminUsers(apiOrigin);
    case '/admin/projects':   return pageAdminProjects(apiOrigin);
    case '/admin/revenue':    return pageAdminRevenue(apiOrigin);
    case '/admin/tickets':    return pageAdminTickets(apiOrigin);
    default: return null;
  }
}

// Keep backward compat export
export function renderDesignerLanding(apiOrigin) {
  return pageHome(apiOrigin);
}