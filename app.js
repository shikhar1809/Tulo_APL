const properties = [
  {
    name: "Gomti Nagar PG",
    type: "PG",
    address: "Vibhuti Khand, Gomti Nagar",
    units: "7/8 occupied",
    rent: "₹56,000 monthly",
    status: "Attested · 52 days left",
    statusClass: "success",
  },
  {
    name: "Hazratganj Flat",
    type: "3 BHK Flat",
    address: "Near Vidhan Sabha Marg",
    units: "Occupied",
    rent: "₹18,000 monthly",
    status: "Rent paid",
    statusClass: "success",
  },
  {
    name: "Aliganj Shop",
    type: "Commercial",
    address: "Sector Q, Aliganj",
    units: "Vacant",
    rent: "₹22,000 expected",
    status: "Make poster",
    statusClass: "vacant",
  },
];

const rentRows = [
  ["Room 1", "Ajay Kumar", "₹7,000", "Paid", "Receipt"],
  ["Room 2", "Priya Singh", "₹7,000", "Overdue", "Mark paid"],
  ["Room 3", "Vacant", "—", "Vacant", "Add tenant"],
  ["Flat A", "Nisha Verma", "₹18,000", "Paid", "Receipt"],
];

const requests = [
  { title: "Bathroom tap dripping", unit: "Room 2 · Priya Singh", status: "In progress", priority: "Medium", emergency: false },
  { title: "Main gate lock broken", unit: "Gomti Nagar PG", status: "Open", priority: "Emergency", emergency: true },
  { title: "AC service needed", unit: "Flat A · Nisha Verma", status: "Assigned", priority: "Low", emergency: false },
];

const tenantRentHistory = [
  ["Apr 2026", "₹7,000", "Paid", "02/04/2026", "Receipt"],
  ["Mar 2026", "₹7,000", "Paid", "01/03/2026", "Receipt"],
  ["Feb 2026", "₹7,000", "Paid", "03/02/2026", "Receipt"],
];

const tenantRequests = [
  { title: "Bathroom tap dripping", status: "In progress", priority: "Medium", emergency: false, date: "20/04/2026" },
  { title: "WiFi router restart", status: "Resolved", priority: "Low", emergency: false, date: "15/03/2026" },
];

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.querySelector("#page-title");
const sessionContext = document.querySelector("#session-context");
const roleChip = document.querySelector("#role-chip");
const addPropertyAction = document.querySelector("#add-property-action");
const geminiModel = "gemini-2.5-flash";
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;

function switchView(id) {
  views.forEach((view) => view.classList.toggle("active", view.id === id));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === id));
  const active = document.querySelector(`[data-view="${id}"]`);
  pageTitle.textContent = active ? active.dataset.title || active.textContent : "Dashboard";
}

function applyAuthRole(role) {
  const isTenant = role === "tenant";
  document.body.classList.add("authenticated");
  document.body.dataset.role = role;
  if (sessionContext) sessionContext.textContent = isTenant ? "Hello, Priya" : "Good evening, Ramesh ji";
  if (roleChip) roleChip.textContent = isTenant ? "Tenant" : "Landlord";
  if (addPropertyAction) addPropertyAction.style.display = isTenant ? "none" : "";
  
  const landlordNav = document.getElementById("landlord-nav");
  const tenantNav = document.getElementById("tenant-nav");
  if (landlordNav) landlordNav.style.display = isTenant ? "none" : "";
  if (tenantNav) tenantNav.style.display = isTenant ? "" : "none";

  switchView(isTenant ? "tenantHome" : "dashboard");
}

function signInWithGoogle(role) {
  localStorage.setItem("tulo_auth_role", role);
  applyAuthRole(role);
}

function signOut() {
  localStorage.removeItem("tulo_auth_role");
  document.body.classList.remove("authenticated");
  delete document.body.dataset.role;
  switchView("dashboard");
}

function propertyCard(property) {
  return `
    <article class="property-card">
      <div class="property-photo"></div>
      <div class="property-body">
        <span class="pill ${property.statusClass}">${property.status}</span>
        <h3>${property.name}</h3>
        <p class="property-meta">${property.type} · ${property.address}</p>
        <p><strong>${property.units}</strong><br>${property.rent}</p>
        <div class="card-actions">
          <button data-open="attest">Attest</button>
          <button data-view-jump="rentTenant">Rent</button>
          <button data-view-jump="poster">Poster</button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  document.querySelector("#dashboard-properties").innerHTML = properties.slice(0, 2).map(propertyCard).join("");
  document.querySelector("#properties-list").innerHTML = properties.map(propertyCard).join("");
  document.querySelector("#rent-list").innerHTML = rentRows.map(([unit, tenant, amount, status, action]) => `
    <div class="table-row">
      <span>${unit}</span><span>${tenant}</span><span>${amount}</span>
      <span><span class="pill ${status === "Paid" ? "success" : status === "Overdue" ? "danger" : "vacant"}">${status}</span></span>
      <span><button class="secondary small">${action}</button></span>
    </div>
  `).join("");
  document.querySelector("#request-list").innerHTML = requests.map((request) => `
    <article class="request-card ${request.emergency ? "emergency" : ""}">
      <div>
        <span class="pill ${request.emergency ? "danger" : "warning"}">${request.priority}</span>
        <h3>${request.title}</h3>
        <p>${request.unit}</p>
      </div>
      <div>
        <strong>${request.status}</strong>
        <p>Updated today</p>
      </div>
    </article>
  `).join("");

  document.querySelector("#tenant-rent-history").innerHTML = tenantRentHistory.map(([month, amount, status, date, action]) => `
    <div class="table-row">
      <span>${month}</span><span>${amount}</span>
      <span><span class="pill success">${status}</span></span>
      <span>${date}</span>
      <span><button class="secondary small">${action}</button></span>
    </div>
  `).join("");

  document.querySelector("#tenant-request-list").innerHTML = tenantRequests.map((request) => `
    <article class="request-card ${request.emergency ? "emergency" : ""}">
      <div>
        <span class="pill ${request.emergency ? "danger" : request.status === "Resolved" ? "success" : "warning"}">${request.priority}</span>
        <h3>${request.title}</h3>
        <p>Reported on ${request.date}</p>
      </div>
      <div>
        <strong>${request.status}</strong>
      </div>
    </article>
  `).join("");
}

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
const sheets = {
  geminiKey: `
    <h2>Gemini API key</h2>
    <p>Your key is stored only in this browser's localStorage for the prototype. Do not commit API keys to git.</p>
    <label>API key<input id="gemini-key-input" type="password" placeholder="Paste Gemini API key"></label>
    <div class="button-row">
      <button class="primary" id="save-gemini-key">Save key</button>
      <button class="secondary" id="clear-gemini-key">Clear key</button>
    </div>
  `,
  addProperty: `
    <h2>Add property</h2>
    <p>Capture the minimum details needed to create the property and fetch verified nearby places.</p>
    <div class="form-grid">
      <label>Property name<input placeholder="Gomti Nagar PG"></label>
      <label>Type<input placeholder="PG / flat / commercial"></label>
      <label>Address<input placeholder="Full address, Lucknow"></label>
      <label>Pincode<input placeholder="226010"></label>
      <button class="primary">Save property</button>
    </div>
  `,
  attest: `
    <h2>Attest property</h2>
    <p>Record a timestamped walkthrough up to 3 minutes. The uploaded video expires after 90 days and cannot be edited.</p>
    <div class="attention-band"><div><span class="pill danger">REC</span><h2>00:00 / 03:00</h2></div><button class="secondary">Start</button></div>
    <button class="primary">Upload attest video</button>
  `,
  newRequest: `
    <h2>New maintenance request</h2>
    <div class="form-grid">
      <label>Category<input placeholder="Plumbing"></label>
      <label>Priority<input placeholder="Medium"></label>
      <label>Description<input placeholder="Describe the issue"></label>
      <button class="primary">Submit request</button>
    </div>
  `,
};

const aiPrompts = {
  listing: `Write a concise rental listing for Gomti Nagar PG in Lucknow. Details: Room 2 vacant, rent INR 7,000 per month, AC, WiFi, meals, verified nearby hospital/market/metro, attest video available. Use Indian English, trustworthy tone, WhatsApp-ready, under 90 words.`,
  maintenanceTriage: `Act as TULO's Smart Maintenance Router. Triage this request: "Bathroom tap is dripping constantly since 2 days" for Room 2 at Gomti Nagar PG. Available caretaker: Vikram, plumbing and electrical, average response 2 hours. Return strict short bullets for priority, suggestedAssignee, estimatedResolutionHours, draftTenantReply, caretakerNote, and confidence.`,
  leaseAutofill: `Act as TULO's Lease Autofill Engine. Pre-fill a lease summary for Room 2, Gomti Nagar PG, tenant Priya Singh, landlord Ramesh Gupta, rent INR 7,000, deposit INR 14,000, start 01/06/2026, end 31/12/2026. Return mandatory fields, missing fields, editable fields, and a landlord confirmation checklist.`,
  kycReview: `Act as TULO's AI KYC Review assistant. For a sample Aadhaar upload where tenant profile name is Priya Singh and the document appears readable, return an advisory review with documentType, nameMatch, imageQuality, flags, recommendation, and the disclaimer that this is not legal identity verification.`,
  leaseExplainer: `Act as TULO's Tenant Concierge. Explain the standard 'Notice Period' clause (typically 30 days notice required before vacating, otherwise deposit is forfeited) to a tenant in simple, friendly, easy-to-understand terms. Do not use legal jargon. Explain in both English and Hindi.`,
  draftMessage: `Act as TULO's Tenant Concierge. Draft a polite WhatsApp message from tenant Priya to landlord Ramesh ji asking for a 5-day extension to pay the May rent (INR 7,000) because her salary is delayed. Keep it respectful, concise, and in standard Indian English.`,
};

function getGeminiKey() {
  return window.TULO_CONFIG?.geminiApiKey || localStorage.getItem("tulo_gemini_key") || "";
}

function updateGeminiState() {
  const state = document.querySelector("#gemini-state");
  if (state) {
    state.textContent = getGeminiKey()
      ? "Gemini is ready for poster copy, reminders, maintenance triage, and tenant invites."
      : "Gemini key missing locally. Add config.local.js or save a key in this browser.";
  }
}

function setBusy(target, message) {
  const output = document.querySelector(target);
  if (output) output.textContent = message;
}

async function callGemini(prompt) {
  const apiKey = getGeminiKey();
  if (!apiKey) {
    modalContent.innerHTML = sheets.geminiKey;
    modal.classList.add("active");
    throw new Error("Gemini key is not available on this device yet.");
  }

  const response = await fetch(geminiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "No Gemini output returned.";
}

function parseJsonBlock(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function generatePosterWithGemini() {
  setBusy("#poster-ai-output", "Asking Gemini for poster copy...");
  const prompt = `Create poster copy for a Lucknow rental poster. Return only JSON with keys headline, locality, rent, amenities, caption. Context: Gomti Nagar PG, Room 2 vacant, INR 7,000/month, AC, WiFi, meals, verified nearby amenities, tenant should trust the attest video. Headline max 20 characters. amenities must be exactly 3 short strings.`;
  const text = await callGemini(prompt);
  const data = parseJsonBlock(text);

  if (data) {
    document.querySelector("#poster-headline-input").value = data.headline || "ROOM AVAILABLE";
    document.querySelector("#poster-headline").textContent = data.headline || "ROOM AVAILABLE";
    document.querySelector("#poster-locality").value = data.locality || "Gomti Nagar, Lucknow";
    document.querySelector("#poster-place").textContent = data.locality || "Gomti Nagar, Lucknow";
    document.querySelector("#poster-rent").value = data.rent || "INR 7,000/month";
    document.querySelector("#poster-price").textContent = data.rent || "INR 7,000/month";
    const amenities = Array.isArray(data.amenities) ? data.amenities.slice(0, 3) : ["AC", "WiFi", "Meals"];
    document.querySelector("#poster-amenities").innerHTML = amenities.map((item) => `<span>${item}</span>`).join("");
    setBusy("#poster-ai-output", data.caption || text);
    return;
  }

  setBusy("#poster-ai-output", text);
}

async function runAiAction(action) {
  if (action === "poster") {
    await generatePosterWithGemini();
    return;
  }

  const isTenantAction = ["leaseExplainer", "draftMessage"].includes(action);
  const targetOutput = isTenantAction ? "#tenant-ai-output" : "#ai-output";

  setBusy(targetOutput, "Asking Gemini...");
  const text = await callGemini(aiPrompts[action]);
  setBusy(targetOutput, text);
}

function exportPoster() {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  const headline = document.querySelector("#poster-headline").textContent;
  const place = document.querySelector("#poster-place").textContent;
  const price = document.querySelector("#poster-price").textContent;
  const amenities = [...document.querySelectorAll("#poster-amenities span")].map((item) => item.textContent);

  ctx.fillStyle = "#e1f5ee";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(70, 70, 940, 940);
  const gradient = ctx.createLinearGradient(100, 100, 980, 360);
  gradient.addColorStop(0, "#9fe1cb");
  gradient.addColorStop(1, "#ef9f27");
  ctx.fillStyle = gradient;
  ctx.fillRect(110, 110, 860, 300);

  ctx.fillStyle = "#1d9e75";
  ctx.font = "700 86px Arial";
  ctx.fillText(headline, 110, 540);
  ctx.fillStyle = "#2c2c2a";
  ctx.font = "500 42px Arial";
  ctx.fillText(place, 110, 615);
  ctx.font = "700 64px Arial";
  ctx.fillText(price, 110, 720);

  ctx.font = "700 34px Arial";
  amenities.forEach((item, index) => {
    const x = 110 + index * 210;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#d3d1c7";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(x, 780, 175, 70, 35);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2c2c2a";
    ctx.fillText(item, x + 28, 826);
  });

  ctx.fillStyle = "#2c2c2a";
  ctx.font = "700 38px Arial";
  ctx.fillText("98XXX XXXXX", 110, 940);
  ctx.strokeStyle = "#2c2c2a";
  ctx.lineWidth = 5;
  ctx.strokeRect(810, 860, 110, 110);
  ctx.font = "700 32px Arial";
  ctx.fillText("QR", 844, 928);

  const link = document.createElement("a");
  link.download = "tulo-poster.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

document.addEventListener("click", (event) => {
  const auth = event.target.closest("[data-auth-role]");
  const nav = event.target.closest("[data-view]");
  const jump = event.target.closest("[data-view-jump]");
  const open = event.target.closest("[data-open]");
  const aiAction = event.target.closest("[data-ai]");
  if (auth) signInWithGoogle(auth.dataset.authRole);
  if (nav) switchView(nav.dataset.view);
  if (jump) switchView(jump.dataset.viewJump);
  if (open) {
    modalContent.innerHTML = sheets[open.dataset.open] || "";
    modal.classList.add("active");
  }
  if (aiAction) {
    runAiAction(aiAction.dataset.ai).catch((error) => {
      let target = "#ai-output";
      if (aiAction.dataset.ai === "poster") target = "#poster-ai-output";
      if (["leaseExplainer", "draftMessage"].includes(aiAction.dataset.ai)) target = "#tenant-ai-output";
      setBusy(target, error.message);
    });
  }
  if (event.target.closest("#save-gemini-key")) {
    const input = document.querySelector("#gemini-key-input");
    localStorage.setItem("tulo_gemini_key", input.value.trim());
    updateGeminiState();
    modal.classList.remove("active");
  }
  if (event.target.closest("#clear-gemini-key")) {
    localStorage.removeItem("tulo_gemini_key");
    updateGeminiState();
    modal.classList.remove("active");
  }
  if (event.target.closest("#export-poster")) exportPoster();
  if (event.target.closest("#sign-out")) signOut();
  if (event.target.closest(".close") || event.target === modal) modal.classList.remove("active");
});

document.querySelector("#poster-rent").addEventListener("input", (event) => {
  document.querySelector("#poster-price").textContent = event.target.value;
});
document.querySelector("#poster-locality").addEventListener("input", (event) => {
  document.querySelector("#poster-place").textContent = event.target.value;
});
document.querySelector("#poster-headline-input").addEventListener("input", (event) => {
  document.querySelector("#poster-headline").textContent = event.target.value;
});

render();
updateGeminiState();
const savedRole = localStorage.getItem("tulo_auth_role");
if (savedRole) applyAuthRole(savedRole);
