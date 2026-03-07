function shell({ title, body, nav = "", script = "", apiOrigin = "" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #f3f5f8;
        --panel: #ffffff;
        --ink: #0f172a;
        --muted: #4b5563;
        --brand: #0ea5e9;
        --brand-2: #16a34a;
        --line: #d1d5db;
      }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: "Segoe UI", Tahoma, sans-serif; color: var(--ink); background: linear-gradient(180deg, #e2e8f0 0, #f8fafc 280px, var(--bg) 100%); }
      a { color: #0369a1; text-decoration: none; }
      a:hover { text-decoration: underline; }
      header { background: #0b1220; color: #e2e8f0; border-bottom: 3px solid #0ea5e9; }
      .bar { max-width: 1080px; margin: 0 auto; padding: 14px 18px; display: flex; gap: 14px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
      .brand { font-weight: 800; letter-spacing: .02em; }
      nav { display: flex; gap: 12px; flex-wrap: wrap; }
      nav a { color: #cbd5e1; font-size: 0.95rem; }
      nav a strong { color: #fff; }
      main { max-width: 1080px; margin: 0 auto; padding: 20px 18px 44px; }
      .grid { display: grid; gap: 14px; }
      .two { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .three { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
      .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 14px; box-shadow: 0 2px 10px rgba(2, 6, 23, 0.04); }
      h1, h2, h3 { margin: 0 0 10px; }
      p { margin: 0 0 8px; color: var(--muted); line-height: 1.45; }
      .row { display: grid; gap: 6px; margin-bottom: 10px; }
      input, textarea, select, button { font: inherit; }
      input, textarea, select { width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 9px 10px; background: #fff; }
      textarea { min-height: 110px; resize: vertical; }
      button { border: 0; border-radius: 9px; padding: 10px 14px; background: linear-gradient(135deg, var(--brand), var(--brand-2)); color: #fff; font-weight: 700; cursor: pointer; }
      button.secondary { background: #e5e7eb; color: #111827; }
      .status { min-height: 20px; margin-top: 8px; color: var(--muted); font-size: .92rem; }
      .status.error { color: #b91c1c; }
      ul { margin: 0; padding-left: 18px; color: var(--muted); }
      pre { white-space: pre-wrap; word-break: break-word; margin: 0; background: #0b1220; color: #e2e8f0; border-radius: 8px; padding: 10px; font-size: .85rem; }
      .cta { display: inline-block; padding: 10px 14px; background: #0ea5e9; color: #fff; border-radius: 9px; font-weight: 700; }
      .pill { display: inline-block; border: 1px solid var(--line); border-radius: 999px; padding: 3px 8px; font-size: .75rem; color: var(--muted); margin-right: 6px; }
      footer { margin-top: 20px; font-size: .85rem; color: #6b7280; }
    </style>
  </head>
  <body>
    <header>
      <div class="bar">
        <div class="brand">Ubani Hosting</div>
        <nav>${nav}</nav>
      </div>
    </header>
    <main>${body}<footer>API Origin: ${apiOrigin}</footer></main>
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
    `<a href="/portal/login">Client Portal</a>`,
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
    `<a href="/admin/dashboard">Admin Dashboard</a>`,
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
      <section class="grid two">
        <article class="card">
          <h1>Blazing Fast Hosting For South Africa</h1>
          <p>Launch websites globally in seconds with local-first support, instant deploys, and built-in billing.</p>
          <p><span class="pill">Cloudflare Edge</span><span class="pill">Yoco Payments</span><span class="pill">R0 Launch Stack</span></p>
          <p><a class="cta" href="/portal/register">Start Free</a></p>
        </article>
        <article class="card">
          <h3>First 100 Customers Engine</h3>
          <ul>
            <li>Free plan funnel with instant onboarding</li>
            <li>Agency reseller model with recurring commissions</li>
            <li>Referral credits for organic growth</li>
            <li>SEO landing pages for local search demand</li>
          </ul>
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
      <h1>Pricing</h1>
      <section class="grid three">
        <article class="card"><h3>Free</h3><p>R0/mo</p><ul><li>1 site</li><li>500MB storage</li><li>ubani subdomain</li></ul></article>
        <article class="card"><h3>Starter</h3><p>R99/mo</p><ul><li>5 sites</li><li>10GB storage</li><li>Custom domains</li></ul></article>
        <article class="card"><h3>Pro Agency</h3><p>R299/mo</p><ul><li>Unlimited clients</li><li>Priority support</li><li>Reseller dashboard</li></ul></article>
      </section>`
    });
  }

  if (pathname === "/hosting") {
    return shell({
      title: "Hosting | Ubani Hosting",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <h1>Hosting Products</h1>
      <section class="grid two">
        <article class="card"><h3>Static + Jamstack</h3><p>Upload files or deploy from GitHub with global edge delivery.</p></article>
        <article class="card"><h3>WordPress Quickstart</h3><p>One-click managed WordPress bootstrap for rapid launches.</p></article>
        <article class="card"><h3>Client Billing</h3><p>Yoco checkout links, invoice tracking, webhook-driven status sync.</p></article>
        <article class="card"><h3>Support + AI</h3><p>Ticketing with automation-ready API flows for high-volume support.</p></article>
      </section>`
    });
  }

  if (pathname === "/contact") {
    return shell({
      title: "Contact | Ubani Hosting",
      nav: marketingNav(),
      apiOrigin,
      body: `
      <h1>Contact</h1>
      <section class="grid two">
        <article class="card">
          <p>Sales: sales@ubanihosting.co.za</p>
          <p>Support: support@ubanihosting.co.za</p>
          <p>Partnerships: partners@ubanihosting.co.za</p>
        </article>
        <article class="card">
          <h3>Need a demo?</h3>
          <p>Open the client portal and test the full register, billing, and deploy flow instantly.</p>
          <a class="cta" href="/portal/register">Go To Portal</a>
        </article>
      </section>`
    });
  }

  if (pathname === "/portal" || pathname === "/portal/dashboard") {
    return shell({
      title: "Portal Dashboard | Ubani Hosting",
      nav: portalNav(),
      apiOrigin,
      body: `
      <h1>Client Dashboard</h1>
      <section class="grid two">
        <article class="card">
          <h3>Account</h3>
          <button id="loadMe">Load Profile</button>
          <div id="meStatus" class="status"></div>
          <pre id="meData">Sign in first.</pre>
        </article>
        <article class="card">
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
      <h1>Login</h1>
      <section class="grid two">
        <article class="card">
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
      <h1>Create Account</h1>
      <section class="grid two">
        <article class="card">
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
      <h1>Billing</h1>
      <section class="grid two">
        <article class="card">
          <div class="row"><label>Amount (cents)</label><input id="amount" value="9900" /></div>
          <button id="checkoutBtn">Create Yoco Checkout</button>
          <div id="checkoutStatus" class="status"></div>
        </article>
        <article class="card">
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
      <h1>Projects</h1>
      <section class="grid two">
        <article class="card">
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
      <h1>Support</h1>
      <section class="grid two">
        <article class="card">
          <div class="row"><label>Subject</label><input id="subject" placeholder="Need help with deployment" /></div>
          <button id="createTicketBtn">Create Ticket</button>
          <div id="ticketStatus" class="status"></div>
        </article>
        <article class="card">
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
      <h1>Admin Dashboard</h1>
      <section class="grid two">
        <article class="card">
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
      <h1>Users</h1>
      <section class="grid two">
        <article class="card">
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
      <h1>Revenue</h1>
      <section class="grid two">
        <article class="card">
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
