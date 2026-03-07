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
        --bg: #fff9f0;
        --bg-2: #eefbf7;
        --panel: #ffffff;
        --panel-strong: #f7fff9;
        --ink: #142033;
        --muted: #536075;
        --brand: #009f72;
        --brand-2: #ff7a1a;
        --line: #d7e3db;
        --ok: #0f766e;
        --danger: #b91c1c;
        --shadow: 0 8px 30px rgba(18, 26, 40, 0.08);
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font-family: "Sora", "Avenir Next", "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(900px 500px at 0% -10%, #dbf4e9 0%, transparent 52%),
          radial-gradient(850px 420px at 100% -5%, #ffe4cc 0%, transparent 46%),
          linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%);
        min-height: 100vh;
      }
      a { color: #0c7e5d; text-decoration: none; }
      a:hover { text-decoration: underline; }

      header {
        position: sticky;
        top: 0;
        z-index: 20;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.78);
        border-bottom: 1px solid rgba(182, 206, 194, 0.75);
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
      .brand-dot {
        width: 11px;
        height: 11px;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
        box-shadow: 0 0 0 4px rgba(0, 159, 114, 0.12);
      }
      nav { display: flex; flex-wrap: wrap; gap: 6px; }
      nav a {
        display: inline-flex;
        align-items: center;
        padding: 8px 10px;
        border-radius: 10px;
        color: #29354d;
        font-size: 0.9rem;
      }
      nav a:hover { text-decoration: none; background: rgba(0, 159, 114, 0.1); }
      nav a strong { color: #0e2038; }

      main { max-width: 1160px; margin: 0 auto; padding: 28px 18px 60px; }
      .hero {
        margin-bottom: 18px;
        padding: 20px;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: linear-gradient(120deg, rgba(0,159,114,0.1), rgba(255,122,26,0.08));
        box-shadow: var(--shadow);
      }
      .hero h1 { margin: 0 0 8px; font-size: clamp(1.7rem, 4vw, 2.5rem); line-height: 1.05; }
      .hero p { margin: 0; color: #36435a; }

      .grid { display: grid; gap: 14px; }
      .two { grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); }
      .three { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }

      .card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 15px;
        box-shadow: var(--shadow);
      }
      .card.accent { background: var(--panel-strong); }
      .card h2, .card h3 { margin: 0 0 10px; letter-spacing: -0.01em; }
      .card p { margin: 0 0 8px; color: var(--muted); line-height: 1.45; }
      .card ul { margin: 0; padding-left: 18px; color: var(--muted); }

      .pill {
        display: inline-block;
        border: 1px solid #b9d8c8;
        background: #f4fff9;
        color: #315244;
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
        color: #fff;
        padding: 10px 14px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 180ms ease, box-shadow 180ms ease;
      }
      .cta { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
      .cta:hover, button:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14); text-decoration: none; }
      button.secondary { background: #e5ece9; color: #1f2937; }

      .row { display: grid; gap: 6px; margin-bottom: 10px; }
      label { color: #405069; font-size: 0.9rem; }
      input, textarea {
        width: 100%;
        border: 1px solid #cfe0d8;
        border-radius: 10px;
        padding: 10px 11px;
        font: inherit;
        background: #fff;
      }
      textarea { min-height: 110px; resize: vertical; }
      pre {
        margin: 0;
        padding: 11px;
        border-radius: 10px;
        border: 1px solid #c8d6ce;
        background: #f7faf8;
        color: #1f2937;
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
        color: #5f6f83;
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
        <div class="brand"><span class="brand-dot"></span>Ubani Hosting</div>
        <nav>${nav}</nav>
      </div>
    </header>
    <main>${body}<footer>API Origin: <span class="mono">${apiOrigin}</span></footer></main>
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
const readToken = () => localStorage.getItem(tokenKey) || "";
const writeToken = (value) => value ? localStorage.setItem(tokenKey, value) : localStorage.removeItem(tokenKey);
const api = async (path, options = {}, auth = false) => {
  const headers = { "content-type": "application/json", ...(options.headers || {}) };
  if (auth && readToken()) headers.authorization = "Bearer " + readToken();
  const response = await fetch(path, { ...options, headers });
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
      <section class="hero reveal">
        <h1>Build, bill, and deploy at startup speed</h1>
        <p>Production hosting stack for South African founders and agencies, with integrated payments and edge delivery.</p>
        <p>
          <span class="pill">Cloudflare Edge</span>
          <span class="pill">Yoco Checkout</span>
          <span class="pill">Turso Storage</span>
        </p>
        <p><a class="cta" href="/portal/register">Start Free Trial</a></p>
      </section>
      <section class="grid two">
        <article class="card reveal" data-delay="1">
          <h3>Why teams pick Ubani</h3>
          <ul>
            <li>Instant account to deployment flow</li>
            <li>Checkout and invoice APIs ready out of the box</li>
            <li>Admin visibility for users and revenue</li>
            <li>Support ticket workflow for fast issue handling</li>
          </ul>
        </article>
        <article class="card accent reveal" data-delay="2">
          <h3>Growth Engine Included</h3>
          <p>Referral loops, conversion-focused pricing, and reusable page architecture to scale from first customers to agency volume.</p>
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
    setTimeout(() => location.href = "/portal/dashboard", 400);
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
    setTimeout(() => location.href = "/portal/dashboard", 400);
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
