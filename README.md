# TULO - Property Management Application

## Project Overview
TULO is a vanilla JS and Firebase-based web application tailored for property management (landlords and tenants) in Lucknow. 
The application manages property listings, rent payments, maintenance requests, AI workflows (via Gemini), and tenant/landlord specific dashboards.

## Architecture & Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+). No build tools, React, or Tailwind.
- **Backend & Database**: Firebase (Auth, Firestore).
- **Map View**: Leaflet.js

## Progress & Changelog

### Phase 1: Project Architecture & State Scaffold
- Set up exact global state variables in `app.js` (`rentRows`, `requests`, `tenantRentHistory`, `tenantRequests`, `listingDraft`).
- Ensured `<main>` in `index.html` structure conforms to exactly the required 10 section views (`dashboard`, `properties`, `mapView`, `propertyDetailsView`, `aiAndPosters`, `rentTenant`, `tenantHome`, `tenantRentAndRepair`, `tenantProperty`, `tenantAi`).
- Updated `styles.css` `:root` variables to reflect the new strict color palette (`--primary`, `--surface`, `--bg`, `--text`, etc.).
