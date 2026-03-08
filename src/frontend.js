const LANDING_ART_URL = "/assets/landing.png";
const PANEL_1_URL = "/assets/panel-1.png";
const PANEL_2_URL = "/assets/panel-2.png";
const PANEL_3_URL = "/assets/panel-3.png";

function shell({ title, body, nav = "", script = "", apiOrigin = "" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Ubani Hosting - High-performance hosting and deployment platform for South Africa." />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <style>
      :root {
        --bg: #081425;
        --bg-2: #0d1d34;
        --panel: rgba(10, 24, 44, 0.72);
        --panel-strong: rgba(16, 34, 60, 0.82);
        --ink: #ecf2ff;
        --muted: #adc1e8;
        --brand: #ff7a18;
        --brand-2: #4f7fff;
        --line: rgba(141, 174, 236, 0.24);
        --ok: #7dd3fc;
        --danger: #fca5a5;
        --shadow: 0 18px 44px rgba(1, 10, 28, 0.42);
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font-family: "Sora", "Avenir Next", "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          linear-gradient(180deg, rgba(8, 14, 30, 0.74), rgba(8, 14, 30, 0.74)),
          url('${LANDING_ART_URL}') center/cover fixed no-repeat,
          radial-gradient(900px 500px at 0% -10%, rgba(79, 70, 229, 0.18) 0%, transparent 52%),
          radial-gradient(850px 420px at 100% -5%, rgba(6, 182, 212, 0.16) 0%, transparent 46%),
          radial-gradient(700px 300px at 50% 120%, rgba(99, 102, 241, 0.14) 0%, transparent 56%),
          linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%);
        min-height: 100vh;
      }
      a { color: #b6d3ff; text-decoration: none; }
      a:hover { text-decoration: underline; }

      header {
        position: sticky;
        top: 0;
        z-index: 20;
        backdrop-filter: blur(12px);
        background: linear-gradient(180deg, rgba(5, 13, 28, 0.82), rgba(5, 13, 28, 0.62));
        border-bottom: 1px solid rgba(128, 157, 220, 0.24);
      }
      .bar {
        max-width: 1160px;
        margin: 0 auto;
        padding: 14px 18px;
        display: flex;
        gap: 14px;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 9px;
        font-weight: 800;
        letter-spacing: 0.02em;
        color: #f6f9ff;
      }
      nav { display: flex; flex-wrap: wrap; gap: 6px; }
      nav a {
        display: inline-flex;
        align-items: center;
        padding: 8px 10px;
        border-radius: 10px;
        color: #c5d6f5;
        font-size: 0.9rem;
      }
      nav a:hover { text-decoration: none; background: rgba(97, 133, 216, 0.22); }
      nav a strong { color: #f6f9ff; }

      main { max-width: 1160px; margin: 0 auto; padding: 28px 18px 60px; }
      .hero {
        margin-bottom: 18px;
        padding: 28px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: linear-gradient(155deg, rgba(10, 24, 46, 0.88), rgba(12, 30, 56, 0.86));
        box-shadow: var(--shadow);
        backdrop-filter: blur(12px);
      }
      .hero.hosting {
        background:
          radial-gradient(560px 260px at 84% 104%, rgba(255, 122, 24, 0.30) 0%, transparent 75%),
          radial-gradient(1000px 360px at 8% 2%, rgba(57, 97, 206, 0.34) 0%, transparent 64%),
          linear-gradient(180deg, #091325 0%, #08101f 100%);
        border-color: rgba(103, 136, 220, 0.5);
      }
      .hero.hosting h1,
      .hero.hosting p { color: #eef3ff; }
      .hero.hosting .pill {
        background: rgba(17, 41, 86, 0.82);
        color: #dce9ff;
      }
      .hero h1 {
        margin: 0 0 8px;
        font-size: clamp(1.7rem, 4vw, 2.5rem);
        line-height: 1.05;
        letter-spacing: -0.02em;
      }
      .hero p { margin: 0; color: #bfd0f3; }

      .grid { display: grid; gap: 14px; }
      .two { grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); }
      .three { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }

      .card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 16px;
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
      }
      .card.accent { background: var(--panel-strong); }
      .card .thumb {
        width: 100%;
        display: block;
        border-radius: 12px;
        border: 1px solid var(--line);
        margin-bottom: 10px;
      }
      .card h2, .card h3 { margin: 0 0 10px; letter-spacing: -0.01em; }
      .card p { margin: 0 0 8px; color: var(--muted); line-height: 1.45; }
      .card ul { margin: 0; padding-left: 18px; color: var(--muted); }
      .card li + li { margin-top: 7px; }
      .profile-output {
        margin-top: 10px;
        border: 1px solid rgba(133, 164, 224, 0.35);
        border-radius: 12px;
        background: rgba(7, 19, 38, 0.62);
        padding: 12px;
      }
      .profile-placeholder {
        color: #9ab3df;
        margin: 0;
        font-size: 0.9rem;
      }
      .profile-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 10px;
      }
      .profile-item {
        border: 1px solid rgba(145, 176, 235, 0.24);
        background: rgba(11, 27, 50, 0.74);
        border-radius: 10px;
        padding: 9px;
      }
      .profile-item .label {
        display: block;
        color: #95b0e1;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.68rem;
        margin-bottom: 4px;
      }
      .profile-item .value {
        color: #eef4ff;
        font-size: 0.9rem;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .profile-raw {
        margin-top: 10px;
      }
      .profile-raw summary {
        cursor: pointer;
        color: #b6cefb;
        font-size: 0.84rem;
      }
      .profile-raw pre {
        margin-top: 8px;
      }
      .stack-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 9px;
      }
      .stack-list li {
        border: 1px solid rgba(145, 176, 235, 0.24);
        background: rgba(11, 27, 50, 0.74);
        border-radius: 10px;
        padding: 10px;
      }
      .inline-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 6px;
        margin-top: 8px;
      }
      .inline-meta span {
        color: #9ab3df;
        font-size: 0.78rem;
      }
      .status-chip {
        display: inline-flex;
        align-items: center;
        padding: 3px 8px;
        border-radius: 999px;
        border: 1px solid rgba(145, 176, 235, 0.3);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .status-chip.paid { color: #86efac; border-color: rgba(74, 222, 128, 0.35); }
      .status-chip.pending { color: #fcd34d; border-color: rgba(250, 204, 21, 0.35); }
      .status-chip.failed { color: #fca5a5; border-color: rgba(248, 113, 113, 0.35); }

      .pill {
        display: inline-block;
        border: 1px solid rgba(135, 168, 231, 0.42);
        background: rgba(18, 43, 82, 0.64);
        color: #d8e6ff;
        border-radius: 999px;
        padding: 5px 11px;
        font-size: 0.74rem;
        margin-right: 6px;
        margin-top: 4px;
      }
      .eyebrow {
        display: inline-block;
        margin-bottom: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: 0.72rem;
        color: #98b7ee;
      }
      .cta, button {
        border: 0;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--brand), #ff9f43);
        color: #f8f9ff;
        padding: 10px 14px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 180ms ease, box-shadow 180ms ease;
      }
      .cta { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
      .cta:hover, button:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14); text-decoration: none; }
      .cta.ghost, button.secondary {
        background: rgba(28, 55, 101, 0.75);
        color: #dce9ff;
        border: 1px solid rgba(145, 179, 239, 0.4);
      }
      .cta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 14px;
      }
      .stat-strip {
        margin-top: 16px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 10px;
      }
      .stat {
        border: 1px solid rgba(150, 181, 238, 0.28);
        border-radius: 12px;
        background: rgba(8, 24, 48, 0.62);
        padding: 10px;
      }
      .stat strong {
        display: block;
        font-size: 1.08rem;
        color: #f3f8ff;
      }
      .stat span {
        color: #a9c1e9;
        font-size: 0.78rem;
      }

      .row { display: grid; gap: 6px; margin-bottom: 10px; }
      label { color: #b9cdf0; font-size: 0.9rem; }
      input, textarea {
        width: 100%;
        border: 1px solid rgba(137, 164, 221, 0.42);
        border-radius: 10px;
        padding: 10px 11px;
        font: inherit;
        background: rgba(8, 24, 45, 0.74);
        color: #f0f6ff;
      }
      input::placeholder, textarea::placeholder { color: #89a4d4; }
      textarea { min-height: 110px; resize: vertical; }
      pre {
        margin: 0;
        padding: 11px;
        border-radius: 10px;
        border: 1px solid rgba(133, 164, 224, 0.35);
        background: rgba(7, 19, 38, 0.72);
        color: #dbe8ff;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.8rem;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .status { min-height: 20px; margin-top: 8px; color: var(--ok); font-size: .92rem; }
      .status.error { color: var(--danger); }

      .reveal { opacity: 0; transform: translateY(14px); animation: rise 500ms ease forwards; }
      .reveal[data-delay="1"] { animation-delay: 80ms; }
      .reveal[data-delay="2"] { animation-delay: 140ms; }
      .reveal[data-delay="3"] { animation-delay: 200ms; }
      @keyframes rise { to { opacity: 1; transform: translateY(0); } }

      footer {
        margin-top: 20px;
        color: #89a5d8;
        font-size: .82rem;
      }
      .mono { font-family: "IBM Plex Mono", monospace; }

      @media (max-width: 720px) {
        .hero { padding: 16px; border-radius: 16px; }
        .bar { padding: 12px; }
        main { padding: 18px 12px 44px; }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="bar">
        <div class="brand">Ubani Hosting</div>
        <nav>${nav}</nav>
      </div>
    </header>
    <main>${body}<footer>API Origin: <span class="mono">${apiOrigin}</span></footer></main>
    <script>
      window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin)};
      (function () {
        const APP_ORIGIN = window.__UBANI_ORIGIN || window.location.origin;
        document.addEventListener("click", (event) => {
          const link = event.target && event.target.closest ? event.target.closest("a[href^='/']") : null;
          if (!link) return;
          if (window.location.origin === APP_ORIGIN) return;
          event.preventDefault();
          window.location.href = APP_ORIGIN + link.getAttribute("href");
        });
      })();
    </script>
    ${script ? `<script>${script}</script>` : ""}
  </body>
</html>`;
}

function marketingNav() {
  return [
    `<a href="/"><strong>Home</strong></a>`,
    `<a href="/pricing">Pricing</a>`,
    `<a href="/hosting">Hosting</a>`,
    `<a href="/contact">Contact</a>`,
    `<a href="/portal/login">Portal</a>`,
    `<a href="/admin/dashboard">Admin</a>`
  ].join("");
}

function portalNav() {
  return [
    `<a href="/"><strong>Marketing</strong></a>`,
    `<a href="/portal/login">Login</a>`,
    `<a href="/portal/register">Register</a>`,
    `<a href="/portal/dashboard">Dashboard</a>`,
    `<a href="/portal/billing">Billing</a>`,
    `<a href="/portal/projects">Projects</a>`,
    `<a href="/portal/support">Support</a>`
  ].join("");
}

function adminNav() {
  return [
    `<a href="/"><strong>Marketing</strong></a>`,
    `<a href="/admin/dashboard">Dashboard</a>`,
    `<a href="/admin/users">Users</a>`,
    `<a href="/admin/revenue">Revenue</a>`
  ].join("");
}

const portalScript = `
const tokenKey = "ubani_portal_token";
const APP_ORIGIN = window.__UBANI_ORIGIN || window.location.origin;
const readToken = () => localStorage.getItem(tokenKey) || "";
const writeToken = (value) => value ? localStorage.setItem(tokenKey, value) : localStorage.removeItem(tokenKey);
const api = async (path, options = {}, auth = false) => {
  const target = path.startsWith("http") ? path : (APP_ORIGIN + path);
  const headers = { "content-type": "application/json", ...(options.headers || {}) };
  if (auth && readToken()) headers.authorization = "Bearer " + readToken();
  const response = await fetch(target, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
  return data;
};
const setStatus = (id, msg, isError = false) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle("error", !!isError);
};
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const formatDateTime = (input) => {
  if (!input) return "Not available";
  const normalized = String(input).replace(" ", "T");
  const maybeDate = new Date(normalized.endsWith("Z") ? normalized : normalized + "Z");
  if (Number.isNaN(maybeDate.getTime())) return String(input);
  return maybeDate.toLocaleString();
};
const centsToRand = (value) => {
  const numeric = Number(value || 0);
  return "R" + (numeric / 100).toFixed(2);
};
const statusChip = (value) => {
  const raw = String(value || "pending").toLowerCase();
  const allowed = raw === "paid" || raw === "failed" ? raw : "pending";
  return "<span class=\\"status-chip " + allowed + "\\">" + escapeHtml(raw) + "</span>";
};
`;

export function renderFrontend(pathname, apiOrigin) {
  if (pathname === "/") {
    return shell({
      title: "Ubani Hosting | Fast Hosting for South Africa",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <section class="hero hosting reveal">
        <span class="eyebrow">Ubani Platform</span>
        <h1>Design, Hosting, Billing,<br/>and Support in One Stack</h1>
        <p>A cleaner way to run client website operations: launch projects, track billing, and manage support from one platform.</p>
        <p>
          <span class="pill">Project Deployments</span>
          <span class="pill">Yoco Billing</span>
          <span class="pill">Admin Reporting</span>
          <span class="pill">Ticket Workflow</span>
        </p>
        <div class="cta-row">
          <a class="cta" href="/portal/register">Open Client Portal</a>
          <a class="cta ghost" href="/pricing">View Plans</a>
        </div>
        <div class="stat-strip">
          <div class="stat"><strong>API + Frontend</strong><span>Single deployment surface</span></div>
          <div class="stat"><strong>R0 Launch Stack</strong><span>Cloudflare-first architecture</span></div>
          <div class="stat"><strong>SA Payments</strong><span>Yoco checkout flow integrated</span></div>
        </div>
      </section>
      <section class="grid three">
        <article class="card reveal" data-delay="1">
          <img class="thumb" src="${PANEL_1_URL}" alt="Design preview panel 1" />
          <h3>Platform Coverage</h3>
          <ul>
            <li>Account registration and authentication APIs</li>
            <li>Project deployment and storage tracking</li>
            <li>Invoice and checkout session creation</li>
            <li>Support tickets and admin reporting endpoints</li>
          </ul>
        </article>
        <article class="card reveal" data-delay="2">
          <img class="thumb" src="${PANEL_2_URL}" alt="Design preview panel 2" />
          <h3>Delivery Flow</h3>
          <p><strong>1.</strong> Scope your project in the portal</p>
          <p><strong>2.</strong> Build and deploy from dashboard tools</p>
          <p><strong>3.</strong> Track billing and support in production</p>
        </article>
        <article class="card accent reveal" data-delay="3">
          <img class="thumb" src="${PANEL_3_URL}" alt="Design preview panel 3" />
          <h3>Project Planning</h3>
          <p>Share your timeline and target outcome. We’ll align platform setup, design scope, and delivery sequencing.</p>
          <p style="margin-top:12px;"><a class="cta" href="/contact">Book Discovery</a></p>
        </article>
      </section>
      <section class="grid two" style="margin-top:14px;">
        <article class="card reveal">
          <h3>Frequently Asked</h3>
          <p><strong>Can we use our own domain?</strong> Yes, domains are mapped through your Cloudflare zone.</p>
          <p><strong>Can your team handle support flows?</strong> Yes, ticketing and admin controls are built in.</p>
          <p><strong>Can we start free?</strong> Yes, use the Free plan and upgrade when traffic grows.</p>
        </article>
        <article class="card reveal" data-delay="1">
          <h3>Primary Next Step</h3>
          <p>Create an account, deploy your first project, then test billing + support from the same dashboard.</p>
          <p style="margin-top:12px;"><a class="cta" href="/portal/register">Create Account</a></p>
        </article>
      </section>`
    });
  }

  if (pathname === "/pricing") {
    return shell({
      title: "Pricing | Ubani Hosting",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Simple pricing, serious performance</h1><p>Start free, then scale to agency-grade operations.</p></section>
      <section class="grid three">
        <article class="card reveal"><h3>Free</h3><p>R0/mo</p><ul><li>1 site</li><li>500MB storage</li><li>ubani subdomain</li></ul></article>
        <article class="card accent reveal" data-delay="1"><h3>Starter</h3><p>R99/mo</p><ul><li>5 sites</li><li>10GB storage</li><li>Custom domains</li><li>Yoco billing</li></ul></article>
        <article class="card reveal" data-delay="2"><h3>Agency</h3><p>R299/mo</p><ul><li>Unlimited clients</li><li>Priority support</li><li>Admin + team workflows</li></ul></article>
      </section>`
    });
  }

  if (pathname === "/hosting") {
    return shell({
      title: "Hosting | Ubani Hosting",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Hosting products built for velocity</h1><p>Everything needed to launch client sites quickly and safely.</p></section>
      <section class="grid two">
        <article class="card reveal"><h3>Static + API</h3><p>Upload and deploy with project-level tracking and storage accounting.</p></article>
        <article class="card reveal" data-delay="1"><h3>Billing-native</h3><p>Invoice checkout creation and webhook-based payment state sync.</p></article>
        <article class="card reveal" data-delay="2"><h3>Support workflow</h3><p>Native support ticket endpoints for operations and retention.</p></article>
        <article class="card reveal" data-delay="3"><h3>Admin analytics</h3><p>Live user counts, invoice totals, and paid revenue summaries.</p></article>
      </section>`
    });
  }

  if (pathname === "/contact") {
    return shell({
      title: "Contact | Ubani Hosting",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Let’s launch your platform</h1><p>Sales and support channels for founders, dev teams, and agencies.</p></section>
      <section class="grid two">
        <article class="card reveal"><p>Sales: sales@ubanihosting.co.za</p><p>Support: support@ubanihosting.co.za</p><p>Partnerships: partners@ubanihosting.co.za</p></article>
        <article class="card accent reveal" data-delay="1"><h3>Want instant access?</h3><p>Create your account and deploy in minutes.</p><p><a class="cta" href="/portal/register">Open Client Portal</a></p></article>
      </section>`
    });
  }

  if (pathname === "/portal" || pathname === "/portal/dashboard") {
    return shell({
      title: "Portal Dashboard | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Client Dashboard</h1><p>Manage account, deploy projects, and monitor billing from one place.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <h3>Account</h3>
          <button id="loadMe">Load Profile</button>
          <div id="meStatus" class="status"></div>
          <div id="meData" class="profile-output">
            <p class="profile-placeholder">Sign in first, then click <strong>Load Profile</strong>.</p>
          </div>
        </article>
        <article class="card reveal" data-delay="1">
          <h3>Quick Deploy</h3>
          <div class="row"><label>Domain</label><input id="deployDomain" placeholder="example.co.za" /></div>
          <button id="deployBtn">Deploy Sample Site</button>
          <div id="deployStatus" class="status"></div>
        </article>
      </section>`,
      script: `${portalScript}
const renderProfile = (payload) => {
  const user = payload && payload.user ? payload.user : {};
  return \`
    <div class="profile-grid">
      <div class="profile-item">
        <span class="label">User ID</span>
        <div class="value">\${escapeHtml(user.id || "Not available")}</div>
      </div>
      <div class="profile-item">
        <span class="label">Email</span>
        <div class="value">\${escapeHtml(user.email || "Not available")}</div>
      </div>
      <div class="profile-item">
        <span class="label">Credit</span>
        <div class="value">\${escapeHtml(String(user.credit ?? 0))}</div>
      </div>
      <div class="profile-item">
        <span class="label">Created</span>
        <div class="value">\${escapeHtml(formatDateTime(user.created_at))}</div>
      </div>
    </div>
    <details class="profile-raw">
      <summary>Show raw profile JSON</summary>
      <pre>\${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
    </details>
  \`;
};
document.getElementById("loadMe").onclick = async () => {
  try {
    setStatus("meStatus", "Loading...");
    const data = await api("/api/me", {}, true);
    document.getElementById("meData").innerHTML = renderProfile(data);
    setStatus("meStatus", "Loaded.");
  } catch (error) { setStatus("meStatus", error.message, true); }
};
document.getElementById("deployBtn").onclick = async () => {
  try {
    setStatus("deployStatus", "Deploying...");
    const domain = document.getElementById("deployDomain").value.trim() || ("demo-" + Date.now() + ".co.za");
    const data = await api("/api/deploy", {
      method: "POST",
      body: JSON.stringify({
        domain,
        files: [{ name: "index.html", contentType: "text/html", content: "<h1>Ubani Deployment Live</h1>" }]
      })
    }, true);
    setStatus("deployStatus", "Live: " + data.projectId);
  } catch (error) { setStatus("deployStatus", error.message, true); }
};`
    });
  }

  if (pathname === "/portal/login") {
    return shell({
      title: "Login | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Welcome back</h1><p>Sign in to manage sites, invoices, and support.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Email</label><input id="email" type="email" /></div>
          <div class="row"><label>Password</label><input id="password" type="password" /></div>
          <button id="loginBtn">Sign In</button>
          <div id="loginStatus" class="status"></div>
        </article>
      </section>`,
      script: `${portalScript}
document.getElementById("loginBtn").onclick = async () => {
  try {
    setStatus("loginStatus", "Signing in...");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const data = await api("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
    writeToken(data.token);
    setStatus("loginStatus", "Success. Redirecting...");
    setTimeout(() => location.href = APP_ORIGIN + "/portal/dashboard", 400);
  } catch (error) { setStatus("loginStatus", error.message, true); }
};`
    });
  }

  if (pathname === "/portal/register") {
    return shell({
      title: "Register | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Create your account</h1><p>Start with free hosting and scale as your business grows.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Email</label><input id="email" type="email" /></div>
          <div class="row"><label>Password</label><input id="password" type="password" /></div>
          <button id="registerBtn">Create Account</button>
          <div id="registerStatus" class="status"></div>
        </article>
      </section>`,
      script: `${portalScript}
document.getElementById("registerBtn").onclick = async () => {
  try {
    setStatus("registerStatus", "Creating...");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const data = await api("/api/register", { method: "POST", body: JSON.stringify({ email, password }) });
    writeToken(data.token);
    setStatus("registerStatus", "Success. Redirecting...");
    setTimeout(() => location.href = APP_ORIGIN + "/portal/dashboard", 400);
  } catch (error) { setStatus("registerStatus", error.message, true); }
};`
    });
  }

  if (pathname === "/portal/billing") {
    return shell({
      title: "Billing | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Billing</h1><p>Create checkout sessions and inspect invoice history instantly.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Amount (cents)</label><input id="amount" value="9900" /></div>
          <button id="checkoutBtn">Create Yoco Checkout</button>
          <div id="checkoutStatus" class="status"></div>
        </article>
        <article class="card reveal" data-delay="1">
          <h3>Invoices</h3>
          <button id="loadInvoices">Refresh</button>
          <div id="invoicesData" class="profile-output">
            <p class="profile-placeholder">No invoice data loaded yet.</p>
          </div>
        </article>
      </section>`,
      script: `${portalScript}
const renderInvoices = (payload) => {
  const invoices = Array.isArray(payload && payload.invoices) ? payload.invoices : [];
  if (!invoices.length) return '<p class="profile-placeholder">No invoices found for this account.</p>';
  return \`
    <ul class="stack-list">
      \${invoices.map((invoice) => \`
        <li>
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
            <strong>\${escapeHtml(centsToRand(invoice.amount))}</strong>
            \${statusChip(invoice.status)}
          </div>
          <div class="inline-meta">
            <span>ID: \${escapeHtml(invoice.id)}</span>
            <span>Created: \${escapeHtml(formatDateTime(invoice.created_at))}</span>
          </div>
        </li>
      \`).join("")}
    </ul>
  \`;
};
document.getElementById("checkoutBtn").onclick = async () => {
  try {
    setStatus("checkoutStatus", "Creating...");
    const amount = Number(document.getElementById("amount").value);
    const data = await api("/api/invoice/checkout", { method: "POST", body: JSON.stringify({ amount }) }, true);
    if (data.checkoutUrl) window.open(data.checkoutUrl, "_blank", "noopener,noreferrer");
    setStatus("checkoutStatus", "Invoice " + data.invoiceId + " created.");
    document.getElementById("loadInvoices").click();
  } catch (error) { setStatus("checkoutStatus", error.message, true); }
};
document.getElementById("loadInvoices").onclick = async () => {
  try {
    const data = await api("/api/invoices", {}, true);
    document.getElementById("invoicesData").innerHTML = renderInvoices(data);
  } catch (error) {
    document.getElementById("invoicesData").innerHTML = '<p class="profile-placeholder">' + escapeHtml(error.message) + '</p>';
  }
};`
    });
  }

  if (pathname === "/portal/projects") {
    return shell({
      title: "Projects | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Projects</h1><p>Create deployments and inspect all projects linked to your account.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <h3>Create Project</h3>
          <div class="row"><label>Domain</label><input id="projectDomain" placeholder="myproject.co.za" /></div>
          <button id="createProjectBtn">Create Project</button>
          <div id="createProjectStatus" class="status"></div>
          <p style="margin-top:8px;">Creates a new deployment with a starter <code>index.html</code> file and stores it in your account.</p>
        </article>
        <article class="card reveal" data-delay="1">
          <h3>Your Deployments</h3>
          <button id="loadProjects">Load Projects</button>
          <div id="projectsData" class="profile-output">
            <p class="profile-placeholder">No projects loaded yet.</p>
          </div>
        </article>
      </section>`,
      script: `${portalScript}
const renderProjects = (payload) => {
  const projects = Array.isArray(payload && payload.projects) ? payload.projects : [];
  if (!projects.length) return '<p class="profile-placeholder">No deployments yet. Use "Create Project" to start.</p>';
  return \`
    <ul class="stack-list">
      \${projects.map((project) => \`
        <li>
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
            <strong>\${escapeHtml(project.domain || "Untitled domain")}</strong>
            <span>\${escapeHtml(String(project.storage || 0))} bytes</span>
          </div>
          <div class="inline-meta">
            <span>Project ID: \${escapeHtml(project.id)}</span>
            <span>Created: \${escapeHtml(formatDateTime(project.created_at))}</span>
          </div>
        </li>
      \`).join("")}
    </ul>
  \`;
};
document.getElementById("createProjectBtn").onclick = async () => {
  try {
    setStatus("createProjectStatus", "Creating project...");
    const domain = document.getElementById("projectDomain").value.trim() || ("project-" + Date.now() + ".co.za");
    const data = await api("/api/deploy", {
      method: "POST",
      body: JSON.stringify({
        domain,
        files: [{ name: "index.html", contentType: "text/html", content: "<h1>Project created and live</h1>" }]
      })
    }, true);
    setStatus("createProjectStatus", "Created and deployed. Project ID: " + data.projectId);
    document.getElementById("loadProjects").click();
  } catch (error) {
    setStatus("createProjectStatus", error.message, true);
  }
};
document.getElementById("loadProjects").onclick = async () => {
  try {
    const data = await api("/api/projects", {}, true);
    document.getElementById("projectsData").innerHTML = renderProjects(data);
  } catch (error) {
    document.getElementById("projectsData").innerHTML = '<p class="profile-placeholder">' + escapeHtml(error.message) + '</p>';
  }
};`
    });
  }

  if (pathname === "/portal/support") {
    return shell({
      title: "Support | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Support Center</h1><p>Create and track tickets without leaving your dashboard.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Subject</label><input id="subject" placeholder="Need help with deployment" /></div>
          <button id="createTicketBtn">Create Ticket</button>
          <div id="ticketStatus" class="status"></div>
        </article>
        <article class="card reveal" data-delay="1">
          <button id="loadTicketsBtn">Load My Tickets</button>
          <div id="ticketsData" class="profile-output">
            <p class="profile-placeholder">No ticket data loaded yet.</p>
          </div>
        </article>
      </section>`,
      script: `${portalScript}
const renderTickets = (payload) => {
  const tickets = Array.isArray(payload && payload.tickets) ? payload.tickets : [];
  if (!tickets.length) return '<p class="profile-placeholder">No support tickets yet.</p>';
  return \`
    <ul class="stack-list">
      \${tickets.map((ticket) => \`
        <li>
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
            <strong>\${escapeHtml(ticket.subject || "Untitled ticket")}</strong>
            \${statusChip(ticket.status)}
          </div>
          <div class="inline-meta">
            <span>Ticket ID: \${escapeHtml(ticket.id)}</span>
            <span>Created: \${escapeHtml(formatDateTime(ticket.created_at))}</span>
          </div>
        </li>
      \`).join("")}
    </ul>
  \`;
};
document.getElementById("createTicketBtn").onclick = async () => {
  try {
    setStatus("ticketStatus", "Submitting...");
    const subject = document.getElementById("subject").value.trim();
    const data = await api("/api/support/tickets", { method: "POST", body: JSON.stringify({ subject }) }, true);
    setStatus("ticketStatus", "Ticket created: " + data.ticket.id);
    document.getElementById("loadTicketsBtn").click();
  } catch (error) { setStatus("ticketStatus", error.message, true); }
};
document.getElementById("loadTicketsBtn").onclick = async () => {
  try {
    const data = await api("/api/support/tickets", {}, true);
    document.getElementById("ticketsData").innerHTML = renderTickets(data);
  } catch (error) {
    document.getElementById("ticketsData").innerHTML = '<p class="profile-placeholder">' + escapeHtml(error.message) + '</p>';
  }
};`
    });
  }

  if (pathname === "/admin/dashboard") {
    return shell({
      title: "Admin Dashboard | Ubani Hosting",
      nav: adminNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Admin Command Center</h1><p>Monitor growth and platform health in real time.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Admin API Key</label><input id="adminKey" type="password" /></div>
          <button id="loadSummaryBtn">Load Summary</button>
          <div id="summaryData" class="profile-output">
            <p class="profile-placeholder">No summary data loaded yet.</p>
          </div>
        </article>
      </section>`,
      script: `
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const adminApi = async (path) => {
  const key = document.getElementById("adminKey").value.trim();
  const response = await fetch(path, { headers: { "x-admin-key": key } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
  return data;
};
document.getElementById("loadSummaryBtn").onclick = async () => {
  try {
    const data = await adminApi("/api/admin/summary");
    document.getElementById("summaryData").innerHTML = \`
      <div class="profile-grid">
        <div class="profile-item"><span class="label">Users</span><div class="value">\${escapeHtml(data.users)}</div></div>
        <div class="profile-item"><span class="label">Projects</span><div class="value">\${escapeHtml(data.projects)}</div></div>
        <div class="profile-item"><span class="label">Invoices</span><div class="value">\${escapeHtml(data.invoices)}</div></div>
        <div class="profile-item"><span class="label">Paid Revenue</span><div class="value">R\${escapeHtml((Number(data.paidRevenueCents || 0) / 100).toFixed(2))}</div></div>
      </div>
    \`;
  } catch (error) {
    document.getElementById("summaryData").innerHTML = '<p class="profile-placeholder">' + escapeHtml(error.message) + '</p>';
  }
};`
    });
  }

  if (pathname === "/admin/users") {
    return shell({
      title: "Admin Users | Ubani Hosting",
      nav: adminNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>User Management</h1><p>Review account creation velocity and customer profiles.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Admin API Key</label><input id="adminKey" type="password" /></div>
          <button id="loadUsersBtn">Load Users</button>
          <div id="usersData" class="profile-output">
            <p class="profile-placeholder">No users loaded yet.</p>
          </div>
        </article>
      </section>`,
      script: `
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const formatDateTime = (input) => {
  if (!input) return "Not available";
  const normalized = String(input).replace(" ", "T");
  const maybeDate = new Date(normalized.endsWith("Z") ? normalized : normalized + "Z");
  if (Number.isNaN(maybeDate.getTime())) return String(input);
  return maybeDate.toLocaleString();
};
document.getElementById("loadUsersBtn").onclick = async () => {
  try {
    const key = document.getElementById("adminKey").value.trim();
    const response = await fetch("/api/admin/users", { headers: { "x-admin-key": key } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
    const users = Array.isArray(data.users) ? data.users : [];
    if (!users.length) {
      document.getElementById("usersData").innerHTML = '<p class="profile-placeholder">No users found.</p>';
      return;
    }
    document.getElementById("usersData").innerHTML = \`
      <ul class="stack-list">
        \${users.map((user) => \`
          <li>
            <strong>\${escapeHtml(user.email || "No email")}</strong>
            <div class="inline-meta">
              <span>ID: \${escapeHtml(user.id)}</span>
              <span>Credit: \${escapeHtml(String(user.credit ?? 0))}</span>
              <span>Created: \${escapeHtml(formatDateTime(user.created_at))}</span>
            </div>
          </li>
        \`).join("")}
      </ul>
    \`;
  } catch (error) {
    document.getElementById("usersData").innerHTML = '<p class="profile-placeholder">' + escapeHtml(error.message) + '</p>';
  }
};`
    });
  }

  if (pathname === "/admin/revenue") {
    return shell({
      title: "Admin Revenue | Ubani Hosting",
      nav: adminNav(),
      apiOrigin,
      body: `
      <section class="hero reveal"><h1>Revenue Analytics</h1><p>Track payment state and monetization in one view.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <div class="row"><label>Admin API Key</label><input id="adminKey" type="password" /></div>
          <button id="loadRevenueBtn">Load Revenue</button>
          <div id="revenueData" class="profile-output">
            <p class="profile-placeholder">No revenue data loaded yet.</p>
          </div>
        </article>
      </section>`,
      script: `
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const formatDateTime = (input) => {
  if (!input) return "Not available";
  const normalized = String(input).replace(" ", "T");
  const maybeDate = new Date(normalized.endsWith("Z") ? normalized : normalized + "Z");
  if (Number.isNaN(maybeDate.getTime())) return String(input);
  return maybeDate.toLocaleString();
};
document.getElementById("loadRevenueBtn").onclick = async () => {
  try {
    const key = document.getElementById("adminKey").value.trim();
    const response = await fetch("/api/admin/revenue", { headers: { "x-admin-key": key } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
    const totals = Array.isArray(data.totals) ? data.totals : [];
    const latestPaid = Array.isArray(data.latestPaid) ? data.latestPaid : [];
    document.getElementById("revenueData").innerHTML = \`
      <h4 style="margin:0 0 8px;">Status Totals</h4>
      <ul class="stack-list" style="margin-bottom:10px;">
        \${totals.length ? totals.map((item) => \`
          <li>
            <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
              <strong>\${escapeHtml(item.status || "unknown")}</strong>
              <span>R\${escapeHtml((Number(item.cents || 0) / 100).toFixed(2))}</span>
            </div>
            <div class="inline-meta"><span>Invoices: \${escapeHtml(item.count)}</span></div>
          </li>
        \`).join("") : '<li><span class="profile-placeholder">No totals available.</span></li>'}
      </ul>
      <h4 style="margin:0 0 8px;">Latest Paid Invoices</h4>
      <ul class="stack-list">
        \${latestPaid.length ? latestPaid.map((invoice) => \`
          <li>
            <strong>\${escapeHtml(invoice.id)}</strong>
            <div class="inline-meta">
              <span>User: \${escapeHtml(invoice.user_id)}</span>
              <span>Amount: R\${escapeHtml((Number(invoice.amount || 0) / 100).toFixed(2))}</span>
              <span>Created: \${escapeHtml(formatDateTime(invoice.created_at))}</span>
            </div>
          </li>
        \`).join("") : '<li><span class="profile-placeholder">No paid invoices yet.</span></li>'}
      </ul>
    \`;
  } catch (error) {
    document.getElementById("revenueData").innerHTML = '<p class="profile-placeholder">' + escapeHtml(error.message) + '</p>';
  }
};`
    });
  }

  return null;
}

export function renderDesignerLanding(apiOrigin) {
  return shell({
    title: "Ubani Studio | Web Design & Build",
    nav: [
      `<a href="/"><strong>Studio</strong></a>`,
      `<a href="${apiOrigin}/portal/register">Client Portal</a>`,
      `<a href="${apiOrigin}/contact">Contact</a>`
    ].join(""),
      apiOrigin,
      body: `
      <section class="hero hosting reveal" style="background:
      linear-gradient(180deg, rgba(6,13,31,0.72), rgba(6,13,31,0.92)),
      url('${LANDING_ART_URL}') center/cover no-repeat;">
      <span class="eyebrow">Ubani Studio</span>
      <h1>Web Design Studio<br/>for South African Brands</h1>
      <p>Modern interface design, production frontend builds, and deployment support for businesses that need a stronger web presence.</p>
      <p>
        <span class="pill">Branding</span>
        <span class="pill">Web Design</span>
        <span class="pill">Production Build</span>
      </p>
      <div class="cta-row">
        <a class="cta" href="${apiOrigin}/portal/register">Start a Project</a>
        <a class="cta ghost" href="${apiOrigin}/contact">Book Discovery</a>
      </div>
    </section>
    <section class="grid three">
      <article class="card reveal" data-delay="1"><img class="thumb" src="${PANEL_1_URL}" alt="Studio work sample 1" /><h3>Design System</h3><p>Layout hierarchy, typography, and component language aligned to your brand.</p></article>
      <article class="card reveal" data-delay="2"><img class="thumb" src="${PANEL_2_URL}" alt="Studio work sample 2" /><h3>Build Delivery</h3><p>Production-ready frontend build with clear asset structure and deployment paths.</p></article>
      <article class="card reveal" data-delay="3"><img class="thumb" src="${PANEL_3_URL}" alt="Studio work sample 3" /><h3>Post-Launch</h3><p>Iteration support for content updates, performance tuning, and feature refinement.</p></article>
    </section>
    <section class="grid two" style="margin-top:14px;">
      <article class="card reveal"><h3>FAQ</h3><p><strong>Do you redesign existing sites?</strong> Yes, we can work from a live or legacy codebase.</p><p><strong>Can design and hosting be bundled?</strong> Yes, this studio flow is connected to the hosting platform.</p></article>
      <article class="card reveal" data-delay="1"><h3>Start Here</h3><p>Open the portal, add your scope, and we’ll move your project into the design/build pipeline.</p><p style="margin-top:12px;"><a class="cta" href="${apiOrigin}/portal/register">Open Portal</a></p></article>
    </section>`
  });
}
