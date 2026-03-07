export function renderPortal() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ubani Client Portal</title>
    <style>
      :root {
        --bg: #0b1220;
        --panel: #101a2d;
        --ink: #e8f0ff;
        --muted: #9fb3d9;
        --brand: #33d6a6;
        --brand-2: #4b8bff;
        --danger: #ff6b6b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Space Grotesk", "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(1200px 500px at 20% -10%, #1c3160 0%, transparent 50%),
          radial-gradient(900px 500px at 100% 0%, #114252 0%, transparent 45%),
          var(--bg);
      }
      main { max-width: 980px; margin: 32px auto; padding: 0 18px 48px; }
      h1 { margin: 0 0 10px; font-size: 2rem; letter-spacing: 0.02em; }
      p { margin: 0; color: var(--muted); }
      .grid { display: grid; gap: 14px; margin-top: 20px; }
      .grid.two { grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); }
      .card {
        background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 16px;
        padding: 16px;
        backdrop-filter: blur(4px);
      }
      .row { display: grid; gap: 8px; margin-bottom: 10px; }
      label { font-size: 0.85rem; color: var(--muted); }
      input, textarea {
        width: 100%;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 10px;
        background: rgba(8,13,24,0.8);
        color: var(--ink);
        padding: 10px 12px;
        font: inherit;
      }
      textarea { min-height: 120px; resize: vertical; }
      button {
        border: 0;
        border-radius: 10px;
        padding: 10px 14px;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        color: #05141f;
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
      }
      button.secondary { color: var(--ink); background: rgba(255,255,255,0.08); }
      .status { margin-top: 8px; min-height: 20px; color: var(--muted); }
      .status.error { color: var(--danger); }
      .pill {
        display: inline-block;
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 999px;
        padding: 3px 9px;
        font-size: 0.75rem;
        margin-right: 6px;
      }
      ul { list-style: none; padding: 0; margin: 10px 0 0; display: grid; gap: 8px; }
      li {
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 12px;
        padding: 10px;
        background: rgba(8,13,24,0.55);
      }
      .meta { color: var(--muted); font-size: 0.85rem; margin-top: 4px; }
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }
      .hidden { display: none; }
    </style>
  </head>
  <body>
    <main>
      <div class="top">
        <div>
          <h1>Ubani Client Portal</h1>
          <p>Manage your account and deploy site content instantly.</p>
        </div>
        <div>
          <span id="authPill" class="pill">Not signed in</span>
          <button id="logoutBtn" class="secondary hidden">Log out</button>
        </div>
      </div>

      <section class="grid two">
        <article class="card">
          <h3>Register</h3>
          <div class="row"><label>Email</label><input id="regEmail" type="email" /></div>
          <div class="row"><label>Password</label><input id="regPassword" type="password" /></div>
          <button id="registerBtn">Create Account</button>
          <div id="registerStatus" class="status"></div>
        </article>

        <article class="card">
          <h3>Login</h3>
          <div class="row"><label>Email</label><input id="loginEmail" type="email" /></div>
          <div class="row"><label>Password</label><input id="loginPassword" type="password" /></div>
          <button id="loginBtn">Login</button>
          <div id="loginStatus" class="status"></div>
        </article>
      </section>

      <section class="grid two">
        <article class="card">
          <h3>Deploy File</h3>
          <div class="row"><label>Domain</label><input id="deployDomain" placeholder="example.co.za" /></div>
          <div class="row"><label>Path</label><input id="deployPath" value="index.html" /></div>
          <div class="row"><label>Content (HTML)</label><textarea id="deployContent"><h1>Hello Ubani</h1></textarea></div>
          <button id="deployBtn">Deploy Now</button>
          <div id="deployStatus" class="status"></div>
        </article>

        <article class="card">
          <h3>Billing</h3>
          <div class="row"><label>Amount (cents)</label><input id="checkoutAmount" value="9900" /></div>
          <button id="checkoutBtn">Create Yoco Checkout</button>
          <div id="checkoutStatus" class="status"></div>
        </article>
      </section>

      <section class="grid two">
        <article class="card">
          <h3>Account</h3>
          <div id="meCard" class="meta">Sign in to load account data.</div>
          <button id="refreshBtn" class="secondary">Refresh Data</button>
          <div id="refreshStatus" class="status"></div>
        </article>
      </section>

      <section class="grid two">
        <article class="card">
          <h3>Projects</h3>
          <ul id="projectsList"></ul>
        </article>
        <article class="card">
          <h3>Invoices</h3>
          <ul id="invoicesList"></ul>
        </article>
      </section>
    </main>
    <script>
      const tokenKey = "ubani_portal_token";
      const readToken = () => localStorage.getItem(tokenKey) || "";
      const writeToken = (token) => {
        if (token) localStorage.setItem(tokenKey, token);
        else localStorage.removeItem(tokenKey);
        updateAuthPill();
      };
      const updateAuthPill = () => {
        const token = readToken();
        const authPill = document.getElementById("authPill");
        const logoutBtn = document.getElementById("logoutBtn");
        authPill.textContent = token ? "Signed in" : "Not signed in";
        logoutBtn.classList.toggle("hidden", !token);
      };
      const setStatus = (id, text, isError = false) => {
        const node = document.getElementById(id);
        node.textContent = text;
        node.classList.toggle("error", !!isError);
      };
      const api = async (path, opts = {}, auth = false) => {
        const headers = { "content-type": "application/json", ...(opts.headers || {}) };
        if (auth && readToken()) headers.authorization = "Bearer " + readToken();
        const response = await fetch(path, { ...opts, headers });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || ("HTTP " + response.status));
        return data;
      };
      const renderList = (id, items, mapper) => {
        const list = document.getElementById(id);
        list.innerHTML = "";
        if (!items.length) {
          list.innerHTML = "<li class='meta'>No records yet.</li>";
          return;
        }
        for (const item of items) {
          const li = document.createElement("li");
          li.innerHTML = mapper(item);
          list.appendChild(li);
        }
      };

      document.getElementById("registerBtn").onclick = async () => {
        try {
          setStatus("registerStatus", "Creating account...");
          const email = document.getElementById("regEmail").value.trim();
          const password = document.getElementById("regPassword").value;
          const result = await api("/api/register", { method: "POST", body: JSON.stringify({ email, password }) });
          writeToken(result.token);
          setStatus("registerStatus", "Account created.");
        } catch (error) {
          setStatus("registerStatus", error.message, true);
        }
      };

      document.getElementById("loginBtn").onclick = async () => {
        try {
          setStatus("loginStatus", "Signing in...");
          const email = document.getElementById("loginEmail").value.trim();
          const password = document.getElementById("loginPassword").value;
          const result = await api("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
          writeToken(result.token);
          setStatus("loginStatus", "Login successful.");
        } catch (error) {
          setStatus("loginStatus", error.message, true);
        }
      };

      document.getElementById("logoutBtn").onclick = () => {
        writeToken("");
        document.getElementById("meCard").textContent = "Signed out.";
      };

      document.getElementById("deployBtn").onclick = async () => {
        try {
          setStatus("deployStatus", "Deploying...");
          const domain = document.getElementById("deployDomain").value.trim();
          const path = document.getElementById("deployPath").value.trim();
          const content = document.getElementById("deployContent").value;
          const result = await api("/api/deploy", {
            method: "POST",
            body: JSON.stringify({
              domain,
              files: [{ name: path, contentType: "text/html", content }]
            })
          }, true);
          setStatus("deployStatus", "Live project " + result.projectId);
          await refreshData();
        } catch (error) {
          setStatus("deployStatus", error.message, true);
        }
      };

      document.getElementById("checkoutBtn").onclick = async () => {
        try {
          setStatus("checkoutStatus", "Creating checkout...");
          const amount = Number(document.getElementById("checkoutAmount").value.trim());
          const result = await api("/api/invoice/checkout", {
            method: "POST",
            body: JSON.stringify({ amount })
          }, true);
          if (result.checkoutUrl) {
            setStatus("checkoutStatus", "Checkout created. Opening Yoco...");
            window.open(result.checkoutUrl, "_blank", "noopener,noreferrer");
          } else {
            setStatus("checkoutStatus", "Checkout created, but no checkoutUrl returned.", true);
          }
          await refreshData();
        } catch (error) {
          setStatus("checkoutStatus", error.message, true);
        }
      };

      async function refreshData() {
        try {
          setStatus("refreshStatus", "Refreshing...");
          const me = await api("/api/me", {}, true);
          const projects = await api("/api/projects", {}, true);
          const invoices = await api("/api/invoices", {}, true);
          document.getElementById("meCard").textContent =
            me.user.email + " | credit: " + me.user.credit + " | joined: " + me.user.created_at;
          renderList("projectsList", projects.projects || [], (project) =>
            "<strong>" + project.domain + "</strong><div class='meta'>storage: " + project.storage +
            " bytes | " + project.created_at + "</div>"
          );
          renderList("invoicesList", invoices.invoices || [], (invoice) =>
            "<strong>R " + invoice.amount + "</strong><div class='meta'>status: " + invoice.status +
            " | " + invoice.created_at + "</div>"
          );
          setStatus("refreshStatus", "Up to date.");
        } catch (error) {
          setStatus("refreshStatus", error.message, true);
        }
      }

      document.getElementById("refreshBtn").onclick = refreshData;
      updateAuthPill();
    </script>
  </body>
</html>`;
}
