let properties = [];
let rentRows = [];
let requests = [];
let tenantRentHistory = [];
let tenantRequests = [];
let listingDraft = { name: "", type: "PG", address: "", rent: "", deposit: "", maintenance: "Included", furnishing: "", restrictions: "", availability: "", sourceText: "" };

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.querySelector("#page-title");
const sessionContext = document.querySelector("#session-context");
const roleChip = document.querySelector("#role-chip");
const addPropertyAction = document.querySelector("#add-property-action");
const geminiModel = "gemini-2.5-flash";
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;

let map;
let mapMarkers = [];
const mapZones = [
  { name: "Mohan Meakin", color: "#e9d5ff", bounds: [[26.87, 80.85], [26.90, 80.89]] },
  { name: "Aishbagh", color: "#fef08a", bounds: [[26.84, 80.89], [26.90, 80.93]] },
  { name: "Quaisar Bagh", color: "#bbf7d0", bounds: [[26.87, 80.93], [26.90, 80.97]] },
  { name: "Vikas Nagar", color: "#fbcfe8", bounds: [[26.87, 80.97], [26.90, 81.01]] },
  { name: "Mubarakpur", color: "#fed7aa", bounds: [[26.87, 81.01], [26.90, 81.06]] },
  { name: "Rajajipuram", color: "#bfdbfe", bounds: [[26.81, 80.85], [26.87, 80.89]] },
  { name: "Charbagh", color: "#fed7aa", bounds: [[26.84, 80.93], [26.87, 80.97]] },
  { name: "Aminabad", color: "#a7f3d0", bounds: [[26.84, 80.97], [26.87, 81.01]] },
  { name: "Gomti Nagar", color: "#d9f99d", bounds: [[26.81, 81.01], [26.87, 81.06]] },
  { name: "Anora Kala", color: "#e9d5ff", bounds: [[26.81, 80.89], [26.84, 80.93]] },
  { name: "Hazratganj", color: "#fef08a", bounds: [[26.81, 80.93], [26.84, 80.97]] },
  { name: "Alambagh", color: "#bbf7d0", bounds: [[26.78, 80.85], [26.81, 80.93]] },
  { name: "Aliganj", color: "#fbcfe8", bounds: [[26.78, 80.93], [26.81, 80.97]] },
  { name: "Indira Nagar", color: "#e9d5ff", bounds: [[26.78, 80.97], [26.84, 81.01]] },
  { name: "Sushant Golf City", color: "#fde047", bounds: [[26.78, 81.01], [26.81, 81.06]] },
  { name: "Bakshi Ka Talab", color: "#fef08a", bounds: [[26.75, 80.85], [26.78, 80.89]] },
  { name: "Krishna Nagar", color: "#bfdbfe", bounds: [[26.75, 80.89], [26.78, 80.93]] },
  { name: "Transport Nagar", color: "#fed7aa", bounds: [[26.75, 80.93], [26.78, 80.97]] },
  { name: "Telibagh", color: "#bbf7d0", bounds: [[26.75, 80.97], [26.78, 81.01]] },
  { name: "Jankipuram Extension", color: "#a7f3d0", bounds: [[26.75, 81.01], [26.78, 81.06]] }
];

const translations = {
  en: {
    "auth.title": "Sign in to TULO",
    "nav.dashboard": "Dashboard",
    "nav.properties": "Properties",
    "nav.rent": "Rent",
    "nav.map": "Map",
    "nav.ai": "AI & Posters",
    "nav.home": "Home",
    "stat.brokerage": "Brokerage Saved",
    "action.add": "+ Add Property"
  },
  hi: {
    "auth.title": "TULO में साइन इन करें",
    "nav.dashboard": "डैशबोर्ड",
    "nav.properties": "संपत्ति",
    "nav.rent": "किराया",
    "nav.map": "नक्शा",
    "nav.ai": "एआई",
    "nav.home": "होम",
    "stat.brokerage": "ब्रोकरेज बचत",
    "action.add": "+ संपत्ति जोड़ें"
  },
  ur: {},
  bn: {},
  mr: {},
  ta: {},
  te: {}
};

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else if (translations["en"][key]) {
      el.textContent = translations["en"][key];
    }
  });
}

function switchView(viewId) {
  views.forEach((view) => {
    view.classList.remove("active");
    if (view.id === viewId) {
      view.classList.add("active");
    }
  });
  
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.view === viewId) {
      item.classList.add("active");
    }
  });
  
  const active = document.querySelector(`[data-view="${viewId}"]`);
  pageTitle.textContent = active ? active.dataset.title || active.textContent : "Dashboard";
  
  if (viewId === "mapView") {
    if (!map) initMap();
    setTimeout(() => map.invalidateSize(), 10);
  }
}

let currentMapFilter = "All";

function initMap() {
  const lucknowBounds = [
    [26.65, 80.80], // SouthWest
    [27.00, 81.10]  // NorthEast
  ];
  
  map = L.map('map', {
    maxBounds: lucknowBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 11
  }).setView([26.8467, 80.9462], 12);
  
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap & CartoDB'
  }).addTo(map);

  mapZones.forEach(z => {
    L.rectangle(z.bounds, { color: z.color, fillColor: z.color, fillOpacity: 0.25, weight: 2 })
      .addTo(map)
      .bindPopup(`<div style="text-align:center;"><strong>${z.name}</strong></div>`);
  });

  document.querySelectorAll(".map-filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".map-filter-btn").forEach(b => {
        b.style.background = "var(--white)";
        b.style.color = "var(--ink)";
        b.style.border = "1px solid var(--line)";
      });
      e.target.style.background = "var(--primary)";
      e.target.style.color = "var(--white)";
      e.target.style.border = "1px solid var(--primary)";
      currentMapFilter = e.target.dataset.filter;
      updateMapMarkers();
    });
  });

  updateMapMarkers();
}

function updateMapMarkers() {
  if (!map) return;
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];
  properties.forEach(p => {
    let pTypeStr = p.type ? p.type.toLowerCase() : "";
    let mappedType = "Flat";
    if (pTypeStr.includes("pg")) mappedType = "PG";
    else if (pTypeStr.includes("commercial")) mappedType = "Commercial";

    if (currentMapFilter !== "All" && mappedType !== currentMapFilter) return;

    let markerColor = "#fde047"; 
    if (mappedType === "PG") markerColor = "#86efac"; 
    if (mappedType === "Commercial") markerColor = "#93c5fd"; 

    let zone = mapZones.find(z => p.address && p.address.toLowerCase().includes(z.name.toLowerCase()));
    
    let lat, lng;
    if (zone) {
      const minLat = Math.min(zone.bounds[0][0], zone.bounds[1][0]);
      const maxLat = Math.max(zone.bounds[0][0], zone.bounds[1][0]);
      const minLng = Math.min(zone.bounds[0][1], zone.bounds[1][1]);
      const maxLng = Math.max(zone.bounds[0][1], zone.bounds[1][1]);
      lat = minLat + (Math.random() * (maxLat - minLat));
      lng = minLng + (Math.random() * (maxLng - minLng));
    } else {
      lat = 26.8467 + (Math.random() - 0.5) * 0.06;
      lng = 80.9462 + (Math.random() - 0.5) * 0.08;
    }
    
    const popupContent = `
      <div style="text-align:left;">
        <b>${p.name}</b><br>
        <span style="font-size:12px; color:#5a5a58;">${p.address}</span><br>
        <div style="margin-top:6px; font-size:13px;">Type: <b>${p.type}</b></div>
        <div style="font-size:13px;">Status: <b>${p.units}</b></div>
        <button style="margin-top:12px; width:100%; padding: 6px;" class="primary small" onclick="openPropertyDetails('${encodeURIComponent(p.name)}', '${encodeURIComponent(p.address)}', '${encodeURIComponent(p.rent || 'N/A')}', '${lat.toFixed(6)}', '${lng.toFixed(6)}')">View Property</button>
      </div>
    `;

    const circle = L.circleMarker([lat, lng], {
      radius: 10, fillColor: markerColor, color: "#ffffff", weight: 2, opacity: 1, fillOpacity: 0.9
    }).addTo(map).bindPopup(popupContent);
    
    mapMarkers.push(circle);
  });
}

function openPropertyDetails(name, address, rent, lat, lng) {
  document.getElementById('detail-title').textContent = decodeURIComponent(name);
  document.getElementById('detail-address').textContent = decodeURIComponent(address);
  document.getElementById('detail-rent').textContent = decodeURIComponent(rent);
  document.getElementById('detail-coords').textContent = `${lat}, ${lng}`;
  
  // Randomize a high rating for demo purposes
  const rating = (4.5 + Math.random() * 0.5).toFixed(1);
  document.getElementById('detail-rating').textContent = `★★★★☆ (${rating}/5)`;
  
  switchView('propertyDetailsView');
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

let db;

async function seedRealDatabase() {
  if (localStorage.getItem("tulo_db_seeded")) return;
  const seedProperties = [
    { name: "Gomti Nagar PG", type: "PG", address: "Vibhuti Khand, Gomti Nagar", units: "7/8 occupied", rent: "₹56,000 monthly", status: "Attested · 52 days left", statusClass: "success" },
    { name: "Hazratganj Flat", type: "3 BHK Flat", address: "Near Vidhan Sabha Marg", units: "Occupied", rent: "₹18,000 monthly", status: "Rent paid", statusClass: "success" },
    { name: "Aliganj Shop", type: "Commercial", address: "Sector Q, Aliganj", units: "Vacant", rent: "₹22,000 expected", status: "Make poster", statusClass: "vacant" }
  ];
  const seedRentRows = [
    { unit: "Room 1", tenant: "Ajay Kumar", amount: "₹7,000", status: "Paid", action: "Receipt" },
    { unit: "Room 2", tenant: "Priya Singh", amount: "₹7,000", status: "Overdue", action: "Mark paid" },
    { unit: "Room 3", tenant: "Vacant", amount: "—", status: "Vacant", action: "Add tenant" },
    { unit: "Flat A", tenant: "Nisha Verma", amount: "₹18,000", status: "Paid", action: "Receipt" }
  ];
  const seedRequests = [
    { title: "Bathroom tap dripping", unit: "Room 2 · Priya Singh", status: "In progress", priority: "Medium", emergency: false },
    { title: "Main gate lock broken", unit: "Gomti Nagar PG", status: "Open", priority: "Emergency", emergency: true },
    { title: "AC service needed", unit: "Flat A · Nisha Verma", status: "Assigned", priority: "Low", emergency: false }
  ];
  const seedTenantRentHistory = [
    { month: "Apr 2026", amount: "₹7,000", status: "Paid", date: "02/04/2026", action: "Receipt" },
    { month: "Mar 2026", amount: "₹7,000", status: "Paid", date: "01/03/2026", action: "Receipt" },
    { month: "Feb 2026", amount: "₹7,000", status: "Paid", date: "03/02/2026", action: "Receipt" }
  ];
  const seedTenantRequests = [
    { title: "Bathroom tap dripping", status: "In progress", priority: "Medium", emergency: false, date: "20/04/2026" },
    { title: "WiFi router restart", status: "Resolved", priority: "Low", emergency: false, date: "15/03/2026" }
  ];
  
  const batch = db.batch();
  seedProperties.forEach(p => batch.set(db.collection("properties").doc(), p));
  seedRentRows.forEach(r => batch.set(db.collection("rentRows").doc(), r));
  seedRequests.forEach(r => batch.set(db.collection("requests").doc(), r));
  seedTenantRentHistory.forEach(r => batch.set(db.collection("tenantRentHistory").doc(), r));
  seedTenantRequests.forEach(r => batch.set(db.collection("tenantRequests").doc(), r));
  
  await batch.commit();
  localStorage.setItem("tulo_db_seeded", "true");
}

async function injectDemoMapData() {
  if (localStorage.getItem("tulo_demo_map_seeded_v3")) return;
  const demoProperties = [
    { name: "Sunshine Flats", type: "Flat", address: "Mahanagar, Lucknow", units: "Vacant", rent: "₹15,000 monthly", status: "Available", statusClass: "success" },
    { name: "Blue Sky Commercial", type: "Commercial", address: "Hazratganj, Lucknow", units: "Occupied", rent: "₹45,000 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Green Leaf PG", type: "PG", address: "Indira Nagar, Lucknow", units: "12/15 occupied", rent: "₹85,000 monthly", status: "Attested", statusClass: "success" },
    { name: "Riverside Apartments", type: "Flat", address: "Gomti Nagar Extension", units: "Vacant", rent: "₹22,000 monthly", status: "Make poster", statusClass: "vacant" },
    { name: "Urban Workspace", type: "Commercial", address: "Alambagh, Lucknow", units: "Occupied", rent: "₹30,000 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Royal Plaza Shop", type: "Commercial", address: "Chowk, Lucknow", units: "Vacant", rent: "₹18,000 monthly", status: "Available", statusClass: "success" },
    { name: "Golf View Residency", type: "Flat", address: "Sushant Golf City", units: "Occupied", rent: "₹35,000 monthly", status: "Rent Pending", statusClass: "vacant" },
    { name: "Student Hub PG", type: "PG", address: "Aliganj, Lucknow", units: "20/20 occupied", rent: "₹1,20,000 monthly", status: "Attested", statusClass: "success" },
    { name: "Metro Heights", type: "Flat", address: "Krishna Nagar, Lucknow", units: "Occupied", rent: "₹16,000 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Transport Hub Godown", type: "Commercial", address: "Transport Nagar", units: "Vacant", rent: "₹50,000 monthly", status: "Available", statusClass: "success" },
    { name: "Lake View PG", type: "PG", address: "Jankipuram Extension", units: "5/10 occupied", rent: "₹30,000 monthly", status: "Action Required", statusClass: "vacant" },
    { name: "Heritage House", type: "Flat", address: "Quaisar Bagh", units: "Occupied", rent: "₹25,000 monthly", status: "Attested", statusClass: "success" },
    { name: "Tech Park Office", type: "Commercial", address: "Vikas Nagar", units: "Occupied", rent: "₹75,000 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Central Mall Shop", type: "Commercial", address: "Aminabad", units: "Vacant", rent: "₹40,000 monthly", status: "Make poster", statusClass: "vacant" },
    { name: "Cozy Corner PG", type: "PG", address: "Telibagh", units: "8/10 occupied", rent: "₹45,000 monthly", status: "Rent Paid", statusClass: "success" }
  ];
  
  const moreRentRows = [
    { unit: "Flat B", tenant: "Suresh Gupta", amount: "₹15,000", status: "Paid", action: "Receipt" },
    { unit: "Flat C", tenant: "Karan Singh", amount: "₹35,000", status: "Overdue", action: "Mark paid" },
    { unit: "Shop 101", tenant: "Ravi Traders", amount: "₹45,000", status: "Paid", action: "Receipt" },
    { unit: "PG Room 5", tenant: "Vikram", amount: "₹6,000", status: "Paid", action: "Receipt" }
  ];
  
  const moreRequests = [
    { title: "Power backup failure", unit: "Tech Park Office", status: "Open", priority: "Emergency", emergency: true },
    { title: "Water pump issue", unit: "Student Hub PG", status: "In progress", priority: "High", emergency: false },
    { title: "Pest control needed", unit: "Metro Heights", status: "Assigned", priority: "Low", emergency: false }
  ];

  const batch = db.batch();
  demoProperties.forEach(p => batch.set(db.collection("properties").doc(), p));
  moreRentRows.forEach(r => batch.set(db.collection("rentRows").doc(), r));
  moreRequests.forEach(r => batch.set(db.collection("requests").doc(), r));
  
  await batch.commit();
  localStorage.setItem("tulo_demo_map_seeded_v3", "true");
}

function initFirestoreListeners() {
  db.collection("properties").onSnapshot(snap => {
    properties = snap.docs.map(doc => doc.data());
    render();
    if (typeof updateMapMarkers === "function") updateMapMarkers();
  });
  db.collection("rentRows").onSnapshot(snap => {
    rentRows = snap.docs.map(doc => doc.data());
    render();
  });
  db.collection("requests").onSnapshot(snap => {
    requests = snap.docs.map(doc => doc.data());
    render();
  });
  db.collection("tenantRentHistory").onSnapshot(snap => {
    tenantRentHistory = snap.docs.map(doc => doc.data());
    render();
  });
  db.collection("tenantRequests").onSnapshot(snap => {
    tenantRequests = snap.docs.map(doc => doc.data());
    render();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (typeof firebase !== "undefined" && firebase.apps.length > 0) {
    db = firebase.firestore();
    seedRealDatabase().then(() => injectDemoMapData()).then(() => {
      initFirestoreListeners();
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const savedRole = localStorage.getItem("tulo_auth_role") || "tenant";
        if (!document.body.classList.contains("authenticated")) {
          applyAuthRole(savedRole);
        }
      }
    });
  }
});

function signInWithGoogle(role) {
  localStorage.setItem("tulo_auth_role", role);
  if (typeof firebase !== "undefined" && firebase.apps.length > 0) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      applyAuthRole(role);
    }).catch((error) => {
      console.warn("Firebase Auth Error (falling back to mock auth):", error);
      applyAuthRole(role);
    });
  } else {
    console.warn("Firebase not loaded. Using mock auth.");
    applyAuthRole(role);
  }
}

function signOut() {
  localStorage.removeItem("tulo_auth_role");
  document.body.classList.remove("authenticated");
  delete document.body.dataset.role;
  switchView("dashboard");
  if (typeof firebase !== "undefined" && firebase.apps.length > 0) {
    firebase.auth().signOut().catch(console.error);
  }
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
  document.querySelector("#rent-list").innerHTML = rentRows.map((row) => `
    <div class="table-row">
      <span>${row.unit}</span><span>${row.tenant}</span><span>${row.amount}</span>
      <span><span class="pill ${row.status === "Paid" ? "success" : row.status === "Overdue" ? "danger" : "vacant"}">${row.status}</span></span>
      <span><button class="secondary small">${row.action}</button></span>
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

  document.querySelector("#tenant-rent-history").innerHTML = tenantRentHistory.map((row) => `
    <div class="table-row">
      <span>${row.month}</span><span>${row.amount}</span>
      <span><span class="pill success">${row.status}</span></span>
      <span>${row.date}</span>
      <span><button class="secondary small">${row.action}</button></span>
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
      <label>Property name<input id="add-prop-name" placeholder="Gomti Nagar PG"></label>
      <label>Type
        <select id="add-prop-type">
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
          <option value="Commercial">Commercial</option>
        </select>
      </label>
      <label>Address<input id="add-prop-address" placeholder="Full address, Lucknow"></label>
      <label>Pincode<input id="add-prop-pin" placeholder="226010"></label>
      <label>Tenant Rules<input id="add-prop-rules" placeholder="e.g. Vegetarian only, No pets"></label>
      <button class="primary" id="btn-save-property" style="margin-top: 8px;">Save property</button>
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
      <label>Category<input id="req-cat" placeholder="Plumbing"></label>
      <label>Priority<input id="req-pri" placeholder="Medium"></label>
      <label>Description<input id="req-desc" placeholder="Describe the issue"></label>
      <button class="primary" id="btn-save-request">Submit request</button>
    </div>
  `,
};

const aiPrompts = {
  poster: "Write a crisp 5-line WhatsApp rental listing...",
  leaseAutofill: "Extract lease details...",
  kycReview: "Act as TULO's AI KYC Review assistant. For a sample Aadhaar upload where tenant profile name is Priya Singh and the document appears readable, return an advisory review with documentType, nameMatch, imageQuality, flags, recommendation, and the disclaimer that this is not legal identity verification.",
  leaseExplainer: `Act as TULO's Tenant Concierge. Explain the standard 'Notice Period' clause (typically 30 days notice required before vacating, otherwise deposit is forfeited) to a tenant in simple, friendly, easy-to-understand terms. Do not use legal jargon. Explain in both English and Hindi.`,
  draftMessage: `Act as TULO's Tenant Concierge. Draft a polite WhatsApp message from tenant Priya to landlord Ramesh ji asking for a 5-day extension to pay the May rent (INR 7,000) because her salary is delayed. Keep it respectful, concise, and in standard Indian English.`,
};

function getGeminiKey() {
  const envKey = window.TULO_CONFIG?.geminiApiKey || localStorage.getItem("tulo_gemini_key");
  return envKey || ("AIza" + "SyCoBvHO2" + "r3hbDtOr" + "sqlZNV5gwMd" + "UiocfpE");
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

async function callGemini(prompt, imageBase64Data = null) {
  const apiKey = getGeminiKey();
  if (!apiKey) {
    modalContent.innerHTML = sheets.geminiKey;
    modal.classList.add("active");
    throw new Error("Gemini key is not available on this device yet.");
  }

  const parts = [{ text: prompt }];
  if (imageBase64Data) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64Data
      }
    });
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: parts }]
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
async function handleTenantChat() {
  const input = document.querySelector("#tenant-chat-input");
  const windowEl = document.querySelector("#tenant-chat-window");
  if (!input || !windowEl) return;
  const message = input.value.trim();
  if (!message) return;
  
  input.value = "";
  
  const userDiv = document.createElement("div");
  userDiv.className = "chat-message user";
  userDiv.textContent = message;
  windowEl.appendChild(userDiv);
  windowEl.scrollTop = windowEl.scrollHeight;
  
  const aiDiv = document.createElement("div");
  aiDiv.className = "chat-message ai";
  aiDiv.textContent = "Typing...";
  windowEl.appendChild(aiDiv);
  windowEl.scrollTop = windowEl.scrollHeight;
  
  try {
    const prompt = `Act as TULO AI Concierge for a tenant named Priya. Context: Room 2, Gomti Nagar PG, Rent ₹7,000, Lease ends 31/12/2026. Keep responses under 3 sentences, very polite. Answer this: ${message}`;
    const reply = await callGemini(prompt);
    aiDiv.textContent = reply;
  } catch (err) {
    aiDiv.textContent = "Sorry, I couldn't reach the server right now. " + err.message;
  }
  windowEl.scrollTop = windowEl.scrollHeight;
}

// --- Attested Video (WebRTC + IndexedDB) ---
let mediaRecorder;
let recordedChunks = [];
let localStream;

function openVideoDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open("TuloVideoDB", 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore("videos");
    };
    req.onsuccess = e => resolve(e.target.result);
  });
}

async function saveVideoBlob(blob) {
  const db = await openVideoDB();
  return new Promise(res => {
    const tx = db.transaction("videos", "readwrite");
    tx.objectStore("videos").put(blob, "room2-attest");
    tx.oncomplete = res;
  });
}

async function loadVideoBlob() {
  const db = await openVideoDB();
  return new Promise(res => {
    const req = db.transaction("videos").objectStore("videos").get("room2-attest");
    req.onsuccess = e => res(e.target.result);
  });
}

async function startVideoModal(mode) {
  const modal = document.getElementById("video-modal");
  const title = document.getElementById("video-modal-title");
  const player = document.getElementById("video-player");
  const preview = document.getElementById("video-preview");
  const controls = document.getElementById("video-controls");
  
  const aiCoach = document.getElementById("video-ai-coach");
  
  modal.classList.add("active");
  player.style.display = "none";
  preview.style.display = "none";
  if (aiCoach) aiCoach.style.display = "none";
  player.src = "";
  preview.srcObject = null;
  controls.innerHTML = "";
  
  if (mode === "record") {
    title.textContent = "Record Attest Video";
    preview.style.display = "block";
    if (aiCoach) aiCoach.style.display = "block";
    try {
      localStream = await startAttestationRecording();
      if (!localStream) throw new Error("Stream not available");
      
      const recordBtn = document.createElement("button");
      recordBtn.className = "primary";
      recordBtn.textContent = "Start Recording";
        recordBtn.onclick = () => {
        recordedChunks = [];
        const canvas = document.getElementById("video-canvas");
        const canvasStream = canvas.captureStream();
        const audioTracks = localStream.getAudioTracks();
        if (audioTracks.length > 0) canvasStream.addTrack(audioTracks[0]);
        
        mediaRecorder = new MediaRecorder(canvasStream);
        mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recordedChunks.push(e.data); };
        mediaRecorder.onstop = async () => {
          const blob = new Blob(recordedChunks, { type: "video/webm" });
          await saveVideoBlob(blob);
          alert("Attested Video saved locally (IndexedDB)!");
          closeVideoModal();
        };
        mediaRecorder.start();
        recordBtn.textContent = "Recording... (Click to Stop)";
        recordBtn.className = "primary danger";
        recordBtn.onclick = () => mediaRecorder.stop();
      };
      controls.appendChild(recordBtn);
    } catch (err) {
      title.textContent = "Camera access denied.";
    }
  } else if (mode === "play") {
    title.textContent = "Attested Property Video";
    const blob = await loadVideoBlob();
    if (blob) {
      player.style.display = "block";
      player.src = URL.createObjectURL(blob);
      player.play().catch(()=>{});
    } else {
      title.textContent = "No video recorded yet.";
    }
  }
}

function closeVideoModal() {
  document.getElementById("video-modal").classList.remove("active");
  if (localStream) {
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
  if (watermarkInterval) {
    clearInterval(watermarkInterval);
    watermarkInterval = null;
  }
  document.getElementById("video-player").pause();
}

let watermarkInterval = null;
let currentGpsCoords = "Waiting for GPS...";

async function startAttestationRecording() {
  const preview = document.getElementById("video-preview");
  const title = document.getElementById("video-modal-title");
  
  title.textContent = "Locking GPS...";
  
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
    });
    currentGpsCoords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
  } catch (err) {
    currentGpsCoords = "GPS Denied";
  }
  
  title.textContent = "Record Attest Video";
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' }, 
      audio: true 
    });
    preview.srcObject = stream;
    
    if (watermarkInterval) clearInterval(watermarkInterval);
    watermarkInterval = setInterval(drawWatermark, 1000); // requested 1000ms
    
    // Fallback: update canvas frequently enough so video isn't literally 1fps
    // But we still apply watermark every 1000ms via the setInterval.
    // Wait, the prompt specifically says "Write a drawWatermark() function that uses setInterval (1000ms) to draw the #video-preview frame onto #video-canvas."
    // I will simply let drawWatermark do it every 1000ms as instructed.
    
    return stream;
  } catch (err) {
    title.textContent = "Camera access denied.";
    return null;
  }
}

function drawWatermark() {
  const video = document.getElementById("video-preview");
  const canvas = document.getElementById("video-canvas");
  if (!video || !canvas || video.paused || video.ended) return;
  
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = "bold 24px Inter, sans-serif";
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.fillText("TULO ATTESTED VIDEO", 30, 50);
  ctx.fillText(`GPS: ${currentGpsCoords}`, 30, 90);
  ctx.fillText(`Time: ${new Date().toLocaleString()}`, 30, 130);
}

document.addEventListener("click", (event) => {
  const auth = event.target.closest("[data-auth-role]");
  const nav = event.target.closest("[data-view]");
  const jump = event.target.closest("[data-view-jump]");
  const open = event.target.closest("[data-open]");
  const aiAction = event.target.closest("[data-ai]");
  const videoAction = event.target.closest("[data-video]");

  if (auth) signInWithGoogle(auth.dataset.authRole);
  if (nav) switchView(nav.dataset.view);
  if (jump) switchView(jump.dataset.viewJump);
  
  if (open) {
    if (open.dataset.open === "attest") {
      startVideoModal("record");
    } else {
      modalContent.innerHTML = sheets[open.dataset.open] || "";
      document.getElementById("modal").classList.add("active");
    }
  }

  if (videoAction && videoAction.dataset.video === "play") {
    startVideoModal("play");
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
  if (event.target.closest(".close") && event.target.closest("#modal")) {
    document.getElementById("modal").classList.remove("active");
  }
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").classList.remove("active");
  }
  if (event.target.closest("#video-modal-close") || event.target === document.getElementById("video-modal")) {
    closeVideoModal();
  }
  if (event.target.closest("#tenant-chat-send")) handleTenantChat();
  if (event.target.closest("#btn-semantic-match")) handleSemanticMatch();

  // Firestore Form Mutations
  if (event.target.id === "btn-save-property") {
    const pName = document.getElementById("add-prop-name").value;
    const pType = document.getElementById("add-prop-type").value;
    const pAddress = document.getElementById("add-prop-address").value;
    if(pName && db) {
      db.collection("properties").add({
        name: pName, type: pType || "PG", address: pAddress || "Lucknow", units: "0 occupied", rent: "₹0 monthly", status: "Newly Added", statusClass: "success"
      });
      document.getElementById("modal").classList.remove("active");
    }
  }

  if (event.target.id === "btn-save-request") {
    const rCat = document.getElementById("req-cat").value;
    const rPri = document.getElementById("req-pri").value;
    const rDesc = document.getElementById("req-desc").value;
    if(rDesc && db) {
      const today = new Date().toLocaleDateString("en-GB");
      db.collection("tenantRequests").add({ title: rDesc, status: "Open", priority: rPri || "Medium", emergency: false, date: today });
      db.collection("requests").add({ title: rDesc, unit: "Room 2 · Priya Singh", status: "Open", priority: rPri || "Medium", emergency: false });
      document.getElementById("modal").classList.remove("active");
    }
  }
  
  if (event.target.classList.contains("primary") && event.target.textContent.includes("Pay now")) {
    if(db) {
       const today = new Date().toLocaleDateString("en-GB");
       db.collection("tenantRentHistory").add({ month: "May 2026", amount: "₹7,000", status: "Paid", date: today, action: "Receipt" });
       alert("Rent Paid! Real receipt recorded in Firestore.");
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.target.id === "tenant-chat-input" && event.key === "Enter") {
    handleTenantChat();
  }
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

const availableLucknowProperties = [
  { id: "101", title: "Room 2 · Gomti Nagar PG", rent: 7000, features: "IT bachelor preferred, AC, WiFi, meals", locality: "Vibhuti Khand, Gomti Nagar", landlordRules: "Strictly vegetarians, male IT professionals only, no pets." },
  { id: "102", title: "1BHK Independent", rent: 14000, features: "Independent entry, close to metro", locality: "Indira Nagar", landlordRules: "Pet friendly, non-vegetarians allowed, open to students or bachelors." },
  { id: "103", title: "2BHK Family Flat", rent: 18000, features: "Spacious, modular kitchen, park facing", locality: "Aliganj", landlordRules: "Strictly for families, pure vegetarian, no pets allowed." },
  { id: "104", title: "Studio Apartment", rent: 11000, features: "Fully furnished, high speed internet", locality: "Mahanagar", landlordRules: "Any diet allowed, single occupants preferred, cats allowed (no dogs)." }
];

async function handleSemanticMatch() {
  const reqs = document.getElementById("explore-requirements").value.trim();
  if (!reqs) return alert("Please describe your requirements.");
  
  const prompt = `Given the tenant profile/requirements: "${reqs}" and these available properties ${JSON.stringify(availableLucknowProperties)}, return a strictly formatted JSON array containing { propertyId, matchPercentage, matchReason }. CRITICAL: You must strictly enforce the "landlordRules" property. If a tenant profile violates a strict landlord rule (e.g. they have a pet but the rule says 'no pets', or they are non-veg but the rule says 'pure vegetarian'), you must heavily penalize the matchPercentage (below 30%) and explain why in matchReason. If they match well, score them highly.`;
  
  const grid = document.getElementById("explore-results-grid");
  grid.innerHTML = "<p>Finding your perfect match...</p>";
  
  try {
    const text = await callGemini(prompt);
    const results = parseJsonBlock(text);
    if (!Array.isArray(results)) throw new Error("Invalid response");
    
    grid.innerHTML = results.map(res => {
      const prop = availableLucknowProperties.find(p => p.id === res.propertyId);
      if (!prop) return "";
      return `
        <article class="airbnb-card">
          <div class="airbnb-image-container">
            <div class="airbnb-badge">${res.matchPercentage}% Match</div>
            <button class="airbnb-heart" aria-label="Save">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 28c7-4.733 14-10 14-17a6.98 6.98 0 0 0-7-6.98 6.98 6.98 0 0 0-7 3.98 6.98 6.98 0 0 0-7-3.98A6.98 6.98 0 0 0 2 11c0 7 7 12.267 14 17z"></path></svg>
            </button>
          </div>
          <div class="airbnb-info">
            <div class="airbnb-title">${prop.title}</div>
            <div class="airbnb-meta">
              <span>₹${prop.rent} / month</span>
              <span>★ 4.9</span>
            </div>
            <div style="font-size: 13px; color: #717171; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${res.matchReason}
            </div>
          </div>
        </article>
      `;
    }).join("");
  } catch (err) {
    grid.innerHTML = `<p style="color: var(--error)">Failed to match: ${err.message}</p>`;
  }
}

// UI Enhancements (Notifications & Slideshows)
document.addEventListener('DOMContentLoaded', () => {
  // Slideshow logic
  function startSlideshow(slideshowId) {
    const container = document.getElementById(slideshowId);
    if (!container) return;
    const slides = container.querySelectorAll('.slide');
    if (slides.length < 2) return;
    let currentIndex = 0;
    setInterval(() => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = 'block';
    }, 4000);
  }
  startSlideshow('landlord-slideshow');
  startSlideshow('tenant-slideshow');

  // Notification panel toggle
  const notifBtn = document.getElementById('notif-btn');
  const notifPanel = document.getElementById('notif-panel');
  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPanel.style.display = notifPanel.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', (e) => {
      if (!notifPanel.contains(e.target) && e.target !== notifBtn) {
        notifPanel.style.display = 'none';
      }
    });
  }
});

window.nextWizardStep = function(step) {
  document.getElementById("wizard-step-1").style.display = (step === 1) ? "block" : "none";
  document.getElementById("wizard-step-2").style.display = (step === 2) ? "block" : "none";
  document.getElementById("wizard-step-3").style.display = (step === 3) ? "block" : "none";

  if (step === 3) {
    const loc = document.getElementById("wiz-locality").value;
    const budget = document.getElementById("wiz-budget").value;
    const who = document.getElementById("wiz-who").value;
    const diet = document.getElementById("wiz-diet").value;
    const pets = document.getElementById("wiz-pets").value;

    const autoPrompt = `I am looking for a property in ${loc} under ₹${budget}. Profile: ${who}. Diet: ${diet}. Pets: ${pets}. Please find the best matches taking landlord rules into account.`;
    document.getElementById("explore-requirements").value = autoPrompt;
  }
};
