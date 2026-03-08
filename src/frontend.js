import {
  BRAND_LOGO_LEFT_DATA_URL,
  BRAND_LOGO_RIGHT_DATA_URL,
  LANDING_ART_DATA_URL,
  PANEL_1_DATA_URL,
  PANEL_2_DATA_URL,
  PANEL_3_DATA_URL
} from "./embedded-assets.js";

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
        --bg: #f5f7ff;
        --bg-2: #eef2ff;
        --panel: rgba(255, 255, 255, 0.82);
        --panel-strong: rgba(244, 248, 255, 0.92);
        --ink: #151e35;
        --muted: #5d6785;
        --brand: #4f46e5;
        --brand-2: #06b6d4;
        --line: rgba(125, 145, 205, 0.28);
        --ok: #0284c7;
        --danger: #b91c1c;
        --shadow: 0 14px 35px rgba(49, 67, 126, 0.12);
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font-family: "Sora", "Avenir Next", "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          linear-gradient(180deg, rgba(8, 14, 30, 0.74), rgba(8, 14, 30, 0.74)),
          url('${LANDING_ART_DATA_URL}') center/cover fixed no-repeat,
          radial-gradient(900px 500px at 0% -10%, rgba(79, 70, 229, 0.18) 0%, transparent 52%),
          radial-gradient(850px 420px at 100% -5%, rgba(6, 182, 212, 0.16) 0%, transparent 46%),
          radial-gradient(700px 300px at 50% 120%, rgba(99, 102, 241, 0.14) 0%, transparent 56%),
          linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%);
        min-height: 100vh;
      }
      a { color: #4338ca; text-decoration: none; }
      a:hover { text-decoration: underline; }

      header {
        position: sticky;
        top: 0;
        z-index: 20;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.78);
        border-bottom: 1px solid rgba(111, 127, 187, 0.24);
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
      }
      nav { display: flex; flex-wrap: wrap; gap: 6px; }
      nav a {
        display: inline-flex;
        align-items: center;
        padding: 8px 10px;
        border-radius: 10px;
        color: #4d5a7f;
        font-size: 0.9rem;
      }
      nav a:hover { text-decoration: none; background: rgba(99, 102, 241, 0.12); }
      nav a strong { color: #1c2550; }

      main { max-width: 1160px; margin: 0 auto; padding: 28px 18px 60px; }
      .hero {
        margin-bottom: 18px;
        padding: 20px;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: linear-gradient(140deg, rgba(255, 255, 255, 0.9), rgba(240, 246, 255, 0.9));
        box-shadow: var(--shadow);
      }
      .hero.hosting {
        background:
          radial-gradient(500px 220px at 50% 100%, rgba(255, 122, 24, 0.24) 0%, transparent 70%),
          radial-gradient(900px 300px at 0% 0%, rgba(39, 84, 184, 0.34) 0%, transparent 60%),
          linear-gradient(180deg, #0a1731 0%, #081126 100%);
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
      .hero p { margin: 0; color: #5f6782; }

      .grid { display: grid; gap: 14px; }
      .two { grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); }
      .three { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }

      .card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 15px;
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

      .pill {
        display: inline-block;
        border: 1px solid rgba(129, 146, 212, 0.45);
        background: rgba(243, 247, 255, 0.9);
        color: #37456d;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 0.74rem;
        margin-right: 6px;
        margin-top: 4px;
      }
      .cta, button {
        border: 0;
        border-radius: 11px;
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
        color: #f8f9ff;
        padding: 10px 14px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 180ms ease, box-shadow 180ms ease;
      }
      .cta { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
      .cta:hover, button:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14); text-decoration: none; }
      button.secondary { background: rgba(227, 234, 255, 0.85); color: #2f3c66; border: 1px solid rgba(145, 159, 214, 0.4); }

      .row { display: grid; gap: 6px; margin-bottom: 10px; }
      label { color: #4f5f85; font-size: 0.9rem; }
      input, textarea {
        width: 100%;
        border: 1px solid rgba(137, 153, 209, 0.45);
        border-radius: 10px;
        padding: 10px 11px;
        font: inherit;
        background: rgba(255, 255, 255, 0.9);
        color: #1a2647;
      }
      textarea { min-height: 110px; resize: vertical; }
      pre {
        margin: 0;
        padding: 11px;
        border-radius: 10px;
        border: 1px solid rgba(142, 157, 214, 0.35);
        background: rgba(248, 251, 255, 0.94);
        color: #203058;
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
        color: #5f6f95;
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
`;

export function renderFrontend(pathname, apiOrigin) {
  if (pathname === "/") {
    return shell({
      title: "Ubani Hosting | Fast Hosting for South Africa",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <section class="hero hosting reveal">
        <img src="${BRAND_LOGO_LEFT_DATA_URL}" alt="Ubani hosting logo" style="width:220px;max-width:58%;display:block;margin-bottom:14px;filter:drop-shadow(0 6px 16px rgba(0,0,0,.35));" />
        <h1>WEB PLATFORM<br/>FOR SOUTH AFRICA</h1>
        <p>Design, hosting, billing, and support workflows in one operational platform.</p>
        <p>
          <span class="pill">Project Deployments</span>
          <span class="pill">Billing Integration</span>
          <span class="pill">Admin Controls</span>
        </p>
        <div class="row" style="margin-top:12px;grid-template-columns:1fr auto;">
          <input placeholder="Tell us your project domain" />
          <a class="cta" href="/portal/register">Start Project</a>
        </div>
      </section>
      <section class="grid three">
        <article class="card reveal" data-delay="1">
          <img class="thumb" src="${PANEL_1_DATA_URL}" alt="Design preview panel 1" />
          <h3>What You Get</h3>
          <ul>
            <li>Account registration and authentication APIs</li>
            <li>Project deployment and storage tracking</li>
            <li>Invoice and checkout session creation</li>
            <li>Support tickets and admin reporting endpoints</li>
          </ul>
        </article>
        <article class="card reveal" data-delay="2">
          <img class="thumb" src="${PANEL_2_DATA_URL}" alt="Design preview panel 2" />
          <h3>How We Work</h3>
          <p><strong>1.</strong> Discovery and scope</p>
          <p><strong>2.</strong> Design and build</p>
          <p><strong>3.</strong> Deploy and handover</p>
        </article>
        <article class="card accent reveal" data-delay="3">
          <img class="thumb" src="${PANEL_3_DATA_URL}" alt="Design preview panel 3" />
          <h3>Need Clarity First?</h3>
          <p>Tell us your goal, timeline, and stack preference. We’ll map the cleanest build path.</p>
          <p style="margin-top:12px;"><a class="cta" href="/contact">Book Discovery</a></p>
        </article>
      </section>
      <section class="grid two" style="margin-top:14px;">
        <article class="card reveal">
          <h3>Frequently Asked</h3>
          <p><strong>Can we use our own domain?</strong> Yes, domains are mapped through your Cloudflare zone.</p>
          <p><strong>Can your team handle support flows?</strong> Yes, ticketing and admin controls are built in.</p>
        </article>
        <article class="card reveal" data-delay="1">
          <h3>Primary Next Step</h3>
          <p>Create an account and submit your first project scope from the portal.</p>
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
          <pre id="meData">Sign in first.</pre>
        </article>
        <article class="card reveal" data-delay="1">
          <h3>Quick Deploy</h3>
          <div class="row"><label>Domain</label><input id="deployDomain" placeholder="example.co.za" /></div>
          <button id="deployBtn">Deploy Sample Site</button>
          <div id="deployStatus" class="status"></div>
        </article>
      </section>`,
      script: `${portalScript}
document.getElementById("loadMe").onclick = async () => {
  try {
    setStatus("meStatus", "Loading...");
    const data = await api("/api/me", {}, true);
    document.getElementById("meData").textContent = JSON.stringify(data, null, 2);
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
          <pre id="invoicesData">No data loaded.</pre>
        </article>
      </section>`,
      script: `${portalScript}
document.getElementById("checkoutBtn").onclick = async () => {
  try {
    setStatus("checkoutStatus", "Creating...");
    const amount = Number(document.getElementById("amount").value);
    const data = await api("/api/invoice/checkout", { method: "POST", body: JSON.stringify({ amount }) }, true);
    if (data.checkoutUrl) window.open(data.checkoutUrl, "_blank", "noopener,noreferrer");
    setStatus("checkoutStatus", "Invoice " + data.invoiceId + " created.");
  } catch (error) { setStatus("checkoutStatus", error.message, true); }
};
document.getElementById("loadInvoices").onclick = async () => {
  try {
    const data = await api("/api/invoices", {}, true);
    document.getElementById("invoicesData").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("invoicesData").textContent = error.message;
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
      <section class="hero reveal"><h1>Projects</h1><p>Inspect all deployments linked to your account.</p></section>
      <section class="grid two">
        <article class="card reveal">
          <button id="loadProjects">Load Projects</button>
          <pre id="projectsData">No data loaded.</pre>
        </article>
      </section>`,
      script: `${portalScript}
document.getElementById("loadProjects").onclick = async () => {
  try {
    const data = await api("/api/projects", {}, true);
    document.getElementById("projectsData").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("projectsData").textContent = error.message;
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
          <pre id="ticketsData">No data loaded.</pre>
        </article>
      </section>`,
      script: `${portalScript}
document.getElementById("createTicketBtn").onclick = async () => {
  try {
    setStatus("ticketStatus", "Submitting...");
    const subject = document.getElementById("subject").value.trim();
    const data = await api("/api/support/tickets", { method: "POST", body: JSON.stringify({ subject }) }, true);
    setStatus("ticketStatus", "Ticket created: " + data.ticket.id);
  } catch (error) { setStatus("ticketStatus", error.message, true); }
};
document.getElementById("loadTicketsBtn").onclick = async () => {
  try {
    const data = await api("/api/support/tickets", {}, true);
    document.getElementById("ticketsData").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("ticketsData").textContent = error.message;
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
          <pre id="summaryData">No data loaded.</pre>
        </article>
      </section>`,
      script: `
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
    document.getElementById("summaryData").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("summaryData").textContent = error.message;
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
          <pre id="usersData">No data loaded.</pre>
        </article>
      </section>`,
      script: `
document.getElementById("loadUsersBtn").onclick = async () => {
  try {
    const key = document.getElementById("adminKey").value.trim();
    const response = await fetch("/api/admin/users", { headers: { "x-admin-key": key } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
    document.getElementById("usersData").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("usersData").textContent = error.message;
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
          <pre id="revenueData">No data loaded.</pre>
        </article>
      </section>`,
      script: `
document.getElementById("loadRevenueBtn").onclick = async () => {
  try {
    const key = document.getElementById("adminKey").value.trim();
    const response = await fetch("/api/admin/revenue", { headers: { "x-admin-key": key } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
    document.getElementById("revenueData").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("revenueData").textContent = error.message;
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
      url('${LANDING_ART_DATA_URL}') center/cover no-repeat;">
      <img src="${BRAND_LOGO_RIGHT_DATA_URL}" alt="Ubani studio logo" style="width:210px;max-width:56%;display:block;margin-bottom:14px;filter:drop-shadow(0 6px 16px rgba(0,0,0,.35));" />
      <h1>WEB DESIGN STUDIO<br/>FOR SOUTH AFRICA</h1>
      <p>Web design, frontend build, and deployment support for brands that need a serious digital presence.</p>
      <p>
        <span class="pill">Branding</span>
        <span class="pill">Web Design</span>
        <span class="pill">Production Build</span>
      </p>
      <p style="margin-top:12px;"><a class="cta" href="${apiOrigin}/portal/register">Start a Project</a></p>
    </section>
    <section class="grid three">
      <article class="card reveal" data-delay="1"><img class="thumb" src="${PANEL_1_DATA_URL}" alt="Studio work sample 1" /><h3>Design System</h3><p>Layout hierarchy, typography, and component language aligned to your brand.</p></article>
      <article class="card reveal" data-delay="2"><img class="thumb" src="${PANEL_2_DATA_URL}" alt="Studio work sample 2" /><h3>Build Delivery</h3><p>Production-ready frontend build with clear asset structure and deployment paths.</p></article>
      <article class="card reveal" data-delay="3"><img class="thumb" src="${PANEL_3_DATA_URL}" alt="Studio work sample 3" /><h3>Post-Launch</h3><p>Iteration support for content updates, performance tuning, and feature refinement.</p></article>
    </section>
    <section class="grid two" style="margin-top:14px;">
      <article class="card reveal"><h3>FAQ</h3><p><strong>Do you redesign existing sites?</strong> Yes, we can work from a live or legacy codebase.</p><p><strong>Can design and hosting be bundled?</strong> Yes, this studio flow is connected to the hosting platform.</p></article>
      <article class="card reveal" data-delay="1"><h3>Start Here</h3><p>Open the portal, add your scope, and we’ll move your project into the design/build pipeline.</p><p style="margin-top:12px;"><a class="cta" href="${apiOrigin}/portal/register">Open Portal</a></p></article>
    </section>`
  });
}
