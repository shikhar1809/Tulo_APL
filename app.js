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

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.querySelector("#page-title");

function switchView(id) {
  views.forEach((view) => view.classList.toggle("active", view.id === id));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === id));
  const active = document.querySelector(`[data-view="${id}"]`);
  pageTitle.textContent = active ? active.textContent : "Dashboard";
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
          <button data-view-jump="rent">Rent</button>
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
}

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
const sheets = {
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

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  const jump = event.target.closest("[data-view-jump]");
  const open = event.target.closest("[data-open]");
  if (nav) switchView(nav.dataset.view);
  if (jump) switchView(jump.dataset.viewJump);
  if (open) {
    modalContent.innerHTML = sheets[open.dataset.open] || "";
    modal.classList.add("active");
  }
  if (event.target.closest(".close") || event.target === modal) modal.classList.remove("active");
});

document.querySelector("#poster-rent").addEventListener("input", (event) => {
  document.querySelector("#poster-price").textContent = event.target.value;
});
document.querySelector("#poster-locality").addEventListener("input", (event) => {
  document.querySelector("#poster-place").textContent = event.target.value;
});

render();
