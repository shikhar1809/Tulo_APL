# Tulo: The Future of Transparent Renting

Tulo is a next-generation, AI-powered real estate platform designed to make finding and listing rental properties completely transparent and effortless. By leveraging intelligent semantic search, mandatory "attest" video verifications, and an AI-driven concierge, Tulo completely eliminates the friction of traditional renting. 

## The Core Insight & Inspiration
While navigating the streets, we saw countless **"TO-LET"** posters that hardly converted and mostly led to dead-ends. After talking to friends who struggled with finding good PGs, dealing with unverified listings, and paying exorbitant brokerages, we realized the system was broken. Inspired by the sound of the word "TO LET", we built **Tulo** to bring trust, speed, and fairness back to renting.

## Meet the Team
* **Shikhar Shahi** (Leader) - [GitHub Profile](https://github.com/shikhar1809)
* **Yogendra Tiwari** (UI/UX) - [GitHub Profile](https://github.com/yogendra12tiwari)
* **Jigyasa Tiwari** (Research And Testing) - [GitHub Profile](https://github.com/jigyasa1809)

## Problem Statement & Pain Points Addressed
**The Pain Points:**
1. **Fake & Outdated Listings**: Tenants waste time visiting properties that look nothing like their pictures.
2. **High Brokerage Fees**: Middlemen extract huge cuts without adding proportional value.
3. **Information Asymmetry**: Tenants have no idea if the rent they are paying is fair market value.
4. **Poor Discovery**: Traditional keyword searches fail when users have highly specific lifestyle needs (e.g., "quiet place for a night shift worker with a pet").

**How Tulo Tackles Them:**
* **Mandatory Attest Videos**: Landlords *must* upload a continuous video walkthrough. The AI verifies the video for freshness and authenticity, entirely eliminating fake or doctored photos.
* **Direct Matchmaking**: Semantic search connects tenants and landlords based on deep lifestyle compatibility, bypassing the need for brokers.
* **AI Rent Recommendation**: Evaluates market trends and property features to suggest fair, unbiased pricing.

## Hero Features
* **AI Concierge**: A highly responsive, conversational assistant that helps tenants find exactly what they are looking for through natural language.
* **Semantic Search**: Replaces rigid keyword filters with contextual matchmaking (e.g., matching a tenant's specific lifestyle prompt against a landlord's ideal tenant profile).
* **AI Auto-Filling**: The AI automatically extracts property details directly from the uploaded attest video, saving landlords from manual data entry.
* **Attest Video (Cheat-Proof)**: Continuous, tamper-proof video uploads are required to make a listing live.
* **15-Days Attest Rule**: Videos expire, forcing landlords to record fresh walkthroughs to keep their listing active and fair.
* **State of the Art Map**: An interactive Leaflet map featuring beautifully divided zones/areas of Lucknow to visualize localized rent trends and property availability.
* **Easy Step-Wise Property Listing**: A completely frictionless onboarding flow for landlords.
* **Dedicated Landlord Tools**: Dashboard with tenant requests, rent tracking, and attention metrics.
* **Responsive UI**: A highly polished, Airbnb-style user interface that flawlessly adapts to any screen size.

## Improvements From The Qualifiers Version
We underwent a massive UI, architecture, and backend overhaul for the final version:
* **Modularized Architecture**: Moved away from monolithic client-side logic into a secure Firebase Cloud Functions backend to safely proxy Gemini AI calls.
* **UI Polish**: Upgraded property cards to a stunning, compact Airbnb-style layout featuring real Unsplash cover images.
* **Map Engine Rewrite**: Improved map clustering and marker coordinate jitter to perfectly render hundreds of properties across Lucknow without overlap.
* **Enhanced AI Workflows**: Replaced basic string matching with true multimodal Gemini API integration.

*(See the Tulo Transformation below)*

### Before vs After: The Tulo Transformation
![The Old Way vs The New Way](./docs/screenshots/before_after.png)

### The New Tulo Dashboard
![Tulo Dashboard](./docs/screenshots/dashboard.png)

### Tulo AI Voice Concierge
![Tulo AI Concierge](./docs/screenshots/concierge.png)

### Live Map View
![Tulo Map View](./docs/screenshots/map.png)

## Tech Stack & Tools Used
* **Frontend**: HTML5, Vanilla CSS3 (Custom Design System, no external bulky frameworks), Vanilla JavaScript.
* **Mapping**: Leaflet.js with OpenStreetMap.
* **Backend**: Firebase Hosting & Firebase Cloud Functions (Node.js 20).
* **Database**: Firestore (Mocked in-memory for testing, configured for production).
* **AI Engine**: Google Gemini Flash via Vertex AI / Firebase Functions.

## Setup / Run Instructions
Since the app relies on Firebase Cloud Functions for its AI backend, you must have the Firebase CLI installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shikhar1809/Tulo_APL.git
   cd Tulo_APL
   ```
2. **Install Backend Dependencies:**
   ```bash
   cd functions
   npm install
   cd ..
   ```
3. **Run Locally:**
   Start the Firebase local emulator suite to run the backend and frontend together:
   ```bash
   firebase emulators:start
   ```
   *Alternatively, you can just open `index.html` in a browser, but AI features will require the live Cloud Functions backend to be reachable.*

## Known Limitations & Incomplete Features
* Map routing and live GPS navigation to the property are not yet fully implemented.
* The backend currently uses mock Firestore collections seeded from local arrays to ensure reviewers can immediately see rich data without manual entry.

## Future Scope
* **3D Visual Walkthrough**: We plan to stitch attest videos into navigable 3D property walkthroughs for tenants.
* **Voice-Enabled Concierge**: Upgrading the AI Concierge to a fully conversational Voice Agent for hands-free property discovery.