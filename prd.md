# PRD.md — Product Requirements Document
## PropEase — Agentic Property Management for Lucknow Landlords

**Version:** 1.0  
**Owner:** Founding Team  
**Status:** Draft — Ready for Engineering Review  
**Date:** May 2026

---

## 1. Executive Summary

Lucknow's real estate market has over 80,000 small landlords managing PGs, flats, and commercial spaces — nearly all doing it manually via WhatsApp, cash receipts, and verbal agreements. PropEase is an agentic SaaS that handles the full landlord-tenant lifecycle: from property attestation to rent collection, maintenance, and tenant onboarding.

Three differentiators set PropEase apart from generic property apps:
1. **Attest Video** — Owner-recorded, timestamped walkthrough that serves as live proof of property condition
2. **Verified Nearby Places** — Auto-fetched, not self-declared, amenity data from Google Maps
3. **Poster Maker** — One-tap, branded property advertisement for WhatsApp and Instagram

**Target market:** Lucknow-first, expanding to Kanpur, Agra, Varanasi in Phase 2.

---

## 2. Problem Statement

### 2.1 The Landlord Problem

Small landlords in Lucknow manage 1–20 units each with no tools:
- Rent is tracked in notebooks or memory. Collections are missed.
- Maintenance requests come via WhatsApp. No tracking, no accountability.
- New tenant onboarding is manual, undocumented, and exposes the landlord to legal risk.
- Marketing a vacancy means posting a handwritten notice or relying on a broker (15–30 days rent commission).
- Disputes arise because there's no documented proof of property condition at the time of possession.

### 2.2 The Tenant Problem

Tenants renting in an unfamiliar city have no reliable way to:
- Verify that the property matches what was advertised
- Know what amenities actually exist nearby (claimed vs. verified)
- Track rent payments and get receipts
- Submit and track maintenance requests formally

### 2.3 Market Gap

Existing apps (NoBroker, MagicBricks, Housing) are listing platforms, not management tools. They drop the landlord the moment a tenant is found. PropEase starts where they end.

---

## 3. Goals & Success Metrics

### 3.1 Business Goals

| Goal | 6-Month Target | 12-Month Target |
|------|---------------|----------------|
| Registered landlords | 500 | 3,000 |
| Active units managed | 2,000 | 15,000 |
| Monthly rent volume processed | ₹1 Cr | ₹8 Cr |
| Landlord retention (90-day) | 60% | 75% |
| Vacancy-to-tenant time | — | < 10 days average |

### 3.2 Product KPIs

| KPI | Target |
|-----|--------|
| Attest video creation rate (new properties) | > 70% |
| Rent collection via app (vs. cash) | > 50% within 60 days |
| Maintenance request resolution rate | > 85% within SLA |
| Poster shares per landlord per month | ≥ 2 |
| Tenant app adoption (of landlord's tenants) | > 60% |

---

## 4. User Personas

### Persona 1: Ramesh Gupta — The PG Owner
- Age 48, semi-retired, owns a 10-room PG in Gomti Nagar
- Manages everything on phone, uses WhatsApp heavily
- Loses ₹15,000–₹20,000/month to delayed collections and broker fees
- Pain: "Tenants say they paid, I have no proof. Arguments every month."
- Not very tech-savvy; needs large tap targets and simple language

### Persona 2: Kavita Srivastava — The Working Landlord
- Age 35, school teacher, owns 2 flats she inherited
- Rents to young professionals; tenants are tech-savvy
- Pain: "I can't visit for every small complaint. I need someone to track repairs."
- Would pay for peace of mind, not just features

### Persona 3: Priya Singh — The Out-of-City Tenant
- Age 24, moved from Kanpur for a job in Lucknow's tech corridor
- Renting a PG room; wants transparency and digital receipts for HRA
- Pain: "I never know if my rent is received. No receipt = no HRA claim."
- Already uses PhonePe, Zomato, Instagram daily

### Persona 4: Vikram Sharma — The Broker-Turned-Caretaker
- Age 32, local broker who also manages 3 landlords' properties
- Acts as the on-ground problem solver
- Pain: "I get called at midnight for issues I could have tracked earlier."
- Needs a simple task inbox, not a full app

---

## 5. Feature Requirements

### 5.1 Core Features (MVP — Phase 1)

---

#### F1: Landlord Onboarding & Property Setup

**User Story:** As a landlord, I want to add my property with photos and details so I can manage it digitally.

**Acceptance Criteria:**
- [ ] Landlord can register via phone OTP (Firebase Auth)
- [ ] Can add property: name, type (PG / flat / commercial), address, pincode, locality
- [ ] Can add up to 10 photos per property
- [ ] Can define units: number, BHK type, floor, rent amount, deposit
- [ ] Address geocoded automatically on save
- [ ] Property shown on landlord's dashboard within 5 seconds of save

**Out of scope (Phase 1):** Video call verification of landlord identity, RERA number validation

---

#### F2: Attest Video

**User Story:** As a landlord, I want to record and publish a timestamped walkthrough video of my property so tenants can see the true condition before moving in — and I have proof.

**Acceptance Criteria:**
- [ ] "Attest Property" option visible on every property card
- [ ] In-app camera opens with recording tips overlay
- [ ] Max recording time: 3 minutes (enforced)
- [ ] Progress bar visible during upload with estimated time
- [ ] Video assigned: `uploadedAt` timestamp (immutable), `expiresAt` = 90 days
- [ ] Active attest badge shown on property listing: "✓ Attested · Expires in X days"
- [ ] Tenants can view the video before signing lease
- [ ] Reminder notification sent to landlord at 14 days and 3 days before expiry
- [ ] Expired videos show "Attest Expired" badge; landlord prompted to re-record
- [ ] Video cannot be edited or trimmed after upload (ensures tamper-evidence)

**Priority:** P0 (differentiator)

---

#### F3: Verified Nearby Places

**User Story:** As a landlord, I want potential tenants to see verified nearby amenities so I don't have to manually list them and they can trust the information.

**Acceptance Criteria:**
- [ ] On property creation/edit, nearby places auto-fetched from Google Places API
- [ ] Categories fetched: hospitals, schools, metro/bus stops, markets, restaurants, ATMs, gyms, pharmacies
- [ ] Display: place name, category icon, distance (km), walking time estimate
- [ ] Maximum 3 places shown per category on the card; full list on detail screen
- [ ] Map view available: pins on Google Maps within app
- [ ] "Verified by Google Maps" label displayed — not editable by landlord
- [ ] Data refreshed every 30 days automatically
- [ ] If fewer than 3 relevant places found within 5km, show "Limited amenities nearby"
- [ ] Landlord cannot add, edit, or remove entries from the verified list

**Priority:** P0 (differentiator)

---

#### F4: Poster Maker

**User Story:** As a landlord with a vacant unit, I want to create a professional "Room Available" poster in 2 minutes that I can share on WhatsApp and Instagram.

**Acceptance Criteria:**
- [ ] Accessible from property/unit screen: "Make Poster" button
- [ ] 5 visual templates available at launch
- [ ] Auto-populated fields: property name, locality, rent, BHK type, up to 3 amenities, landlord phone
- [ ] QR code auto-generated linking to property's PropEase listing
- [ ] Landlord can change: main photo, color theme, displayed amenities, rent amount
- [ ] Preview renders in real-time (< 2s update delay)
- [ ] Export options: WhatsApp (800×800px), Instagram Post (1080×1080px), Instagram Story (1080×1920px), PDF A4
- [ ] Exported to device gallery + shareable via system share sheet
- [ ] No watermark on exported poster (landlord sees PropEase branding only in app)
- [ ] Template selection remembered per property for next time

**Priority:** P0 (differentiator)

---

#### F5: Tenant Onboarding

**User Story:** As a landlord, I want to onboard a new tenant digitally so we have a proper agreement and I don't need a broker or lawyer for standard cases.

**Acceptance Criteria:**
- [ ] Landlord generates a unique invite code/link for a specific unit
- [ ] Tenant downloads app, enters code, sees property details + attest video
- [ ] Tenant fills profile: full name, phone, email, emergency contact name + phone
- [ ] Tenant uploads Aadhaar (front + back) — stored in private Firebase Storage
- [ ] Standard lease agreement generated as PDF with:  property address, unit, rent, deposit, start date, end date, landlord + tenant names
- [ ] Tenant reviews lease in-app (scrollable PDF viewer)
- [ ] Both parties e-sign (drawn signature captured as image)
- [ ] Signed lease PDF generated, stored, and shared to both parties via FCM + download
- [ ] Unit status auto-changes to `occupied` after both signatures
- [ ] Landlord receives notification: "Priya Singh has signed the lease for Room 2"

**Priority:** P0

---

#### F6: Rent Collection

**User Story:** As a landlord, I want rent collected automatically so I don't have to chase tenants every month.

**Acceptance Criteria:**
- [ ] Rent due dates configured per unit (day of month: 1–28)
- [ ] Tenant receives FCM notification + (optional) SMS 3 days before due date
- [ ] In-app Razorpay checkout: UPI, cards, netbanking
- [ ] Payment success: Firestore updated, landlord notified, receipt PDF generated and sent to tenant
- [ ] Overdue flow: reminder on D+3, strong reminder on D+7, landlord alert on D+7
- [ ] Landlord can also manually mark payment as received (cash payment logging)
- [ ] Rent history view: per tenant, per unit, per month — with filter
- [ ] Monthly collection summary on dashboard: collected / total, percentage bar
- [ ] Landlord can waive a payment (with reason note) — recorded in history

**Priority:** P0

---

#### F7: Maintenance Requests

**User Story:** As a tenant, I want to report maintenance issues formally so they don't get ignored and I can track progress.

**Acceptance Criteria:**
- [ ] Tenant submits request: category, description, priority, optional photos (max 5)
- [ ] Landlord receives immediate FCM notification
- [ ] Landlord can assign to caretaker (by phone number invite, Phase 1 basic)
- [ ] Status updates: Open → In Progress → Resolved
- [ ] Tenant notified at every status change
- [ ] Tenant must confirm resolution before status moves to Closed
- [ ] Landlord can add notes at each stage
- [ ] Emergency requests trigger an additional SMS to landlord (not just FCM)
- [ ] Open requests older than SLA show warning badge on landlord dashboard
- [ ] Full request timeline visible to both parties

**Priority:** P0

---

#### F8: Notifications & Alerts

**User Story:** As a landlord, I want to know about important events without opening the app.

**Acceptance Criteria:**
- [ ] FCM push notifications for all key events (see event list below)
- [ ] In-app notification bell with unread count
- [ ] Notification history stored for 30 days
- [ ] Landlord can configure quiet hours (default: 10 PM – 7 AM, emergencies bypass)

**Notification Events:**
| Event | Recipient | Channel |
|-------|-----------|---------|
| Rent due in 3 days | Tenant | FCM |
| Rent paid | Landlord | FCM |
| Rent overdue D+3 | Tenant | FCM + SMS |
| Rent overdue D+7 | Landlord + Tenant | FCM + SMS |
| New maintenance request | Landlord | FCM |
| Maintenance status changed | Tenant | FCM |
| Emergency maintenance | Landlord | FCM + SMS |
| Lease expiry: 30 / 15 / 7 / 1 days | Landlord | FCM |
| Attest video expiring: 14 / 3 days | Landlord | FCM |
| Tenant signed lease | Landlord | FCM |
| New tenant joined (via invite) | Landlord | FCM |

---

### 5.2 Phase 2 Features (Post-MVP)

| Feature | Description | Priority |
|---------|-------------|---------|
| In-app chat | Direct messaging between landlord and tenant | P1 |
| Expense tracking | Log property expenses for tax records | P1 |
| Multi-caretaker management | Full caretaker onboarding + task assignment | P1 |
| Hindi language support | Full app in Devanagari | P1 |
| Automated lease renewal | System proposes renewal 45 days before expiry | P2 |
| Utility bill tracking | Electricity/water bill logging per unit | P2 |
| Rent analytics | Occupancy trends, income forecasts | P2 |
| Landlord marketplace | Connect with trusted plumbers, electricians | P2 |
| AI rent price suggestion | Suggest rent based on Lucknow locality data | P3 |
| Dark mode | UI theme | P3 |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Requirement | Target |
|-------------|--------|
| App launch (cold start) | < 3 seconds |
| Screen navigation transition | < 200ms |
| Firestore read (cached) | < 100ms |
| Payment initiation to checkout open | < 2 seconds |
| Attest video upload (100MB, 4G) | < 90 seconds |
| Poster export (any format) | < 5 seconds |

### 6.2 Reliability

- Uptime target: 99.5% (Firebase SLA + functions)
- Offline mode: Dashboard viewable offline (Firestore cache); payment and uploads require connectivity
- Failed payment webhook: retry 3× with exponential backoff before alerting admin

### 6.3 Scalability

- Firestore designed for horizontal scaling; no structural changes needed up to 100,000 properties
- Cloud Functions auto-scale; no manual configuration needed
- Video storage: Firebase Storage scales automatically; cost reviewed at 10TB threshold

### 6.4 Security

- All API calls require Firebase Auth token (enforced via App Check)
- KYC documents (Aadhaar): private storage bucket, signed URLs only, 1-hour TTL
- Razorpay: no card/UPI data stored in PropEase systems
- Security rules audited before launch: tenants cannot read other tenants' data
- Phone numbers: not exposed in any public API response

### 6.5 Legal & Compliance

- DPDP Act 2023 (India): explicit consent recorded at onboarding for data collection
- Lease agreements: standard clauses reviewed by a Lucknow-based property lawyer before launch
- Aadhaar collection: compliant with UIDAI guidelines (no biometric data, document image only)
- GST: platform fee invoices issued via Razorpay with GSTIN

---

## 7. Monetisation

### 7.1 Phase 1 — Free Launch

All features free for 90 days post-launch to drive landlord adoption.

### 7.2 Phase 2 — Subscription

| Plan | Price | Limits | Target User |
|------|-------|--------|-------------|
| Starter | Free | 1 property, 3 units, no poster export | Try before buy |
| Basic | ₹499/month | 3 properties, 15 units, 3 posters/month | Small landlord |
| Pro | ₹1,199/month | Unlimited properties & units, unlimited posters, priority support | Active landlord |
| Elite | ₹2,499/month | Pro + caretaker accounts, analytics, API access | Property managers |

### 7.3 Transaction Fee

- 1.5% of rent collected via PropEase (absorbed in Pro/Elite plans)
- Razorpay platform fee passed through at cost (~1.9% + GST)

### 7.4 Poster Marketplace (Phase 3)

- Premium poster templates: ₹29–₹99 one-time
- Festival/seasonal packs: ₹149 per pack

---

## 8. Go-to-Market

### 8.1 Launch Strategy — Lucknow Focus

**Month 1–2: Warm Launch**
- 50 landlords recruited via personal networks in Gomti Nagar, Hazratganj, Aliganj
- White-glove onboarding: team visits to help add first property
- Attest video recording assistance in-person

**Month 3–4: Referral Growth**
- "Refer a landlord, get 1 month Pro free" referral program
- WhatsApp groups for Lucknow landlords (existing communities)
- Collaboration with 2–3 local property broker networks (they become caretakers)

**Month 5–6: Digital Growth**
- Instagram Reels: "See how Ramesh ji manages 10 rooms from his phone"
- Google Ads targeting "PG management Lucknow", "rent collection app"
- Testimonial videos from early landlords

### 8.2 Tenant Acquisition

Tenants are pulled in by landlords (invite flow). No direct-to-tenant marketing in Phase 1. Organic tenant growth = landlord growth × average units occupied.

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Low landlord tech literacy | High | High | In-person onboarding, Hindi UI in Phase 2, large UI elements |
| Tenants refuse to pay digitally | Medium | High | Cash logging feature; digital incentive (instant receipt for HRA) |
| Attest video storage costs | Medium | Medium | 90-day auto-expiry; compress video server-side; review at 1TB |
| Payment gateway disputes | Low | High | Razorpay dispute resolution; receipts as legal proof |
| Google Maps API cost overrun | Low | Medium | Caching nearby places in Firestore; 30-day refresh only |
| Competitor copies features | Medium | Medium | First-mover in Lucknow; network effects; landlord-tenant relationships sticky |
| Aadhaar data breach | Low | Critical | Private storage, encrypted at rest, access logging, minimal retention |

---

## 10. Milestones & Timeline

| Milestone | Target Date | Owner |
|-----------|------------|-------|
| Spec + PRD finalized | Week 2 | Product |
| Firebase project setup + auth working | Week 3 | Engineering |
| Landlord property CRUD + unit management | Week 5 | Engineering |
| Attest video (record + upload + display) | Week 6 | Engineering |
| Nearby places integration | Week 7 | Engineering |
| Tenant onboarding + e-signature | Week 8 | Engineering |
| Rent collection (Razorpay integration) | Week 10 | Engineering |
| Maintenance request flow | Week 11 | Engineering |
| Poster maker (3 templates) | Week 12 | Design + Engineering |
| Notifications (FCM) | Week 12 | Engineering |
| Internal QA + bug fix | Week 13–14 | QA |
| Beta launch (50 landlords, Lucknow) | Week 15 | Growth |
| Public launch (Android) | Week 18 | All |
| iOS launch | Week 22 | Engineering |

---

## 11. Open Questions

| # | Question | Owner | Deadline |
|---|----------|-------|---------|
| 1 | Which Razorpay plan covers PG rent verticals? Does it require NBFC license? | Legal | Week 2 |
| 2 | Is a standard lease template legally enforceable in UP without notarization? | Legal | Week 3 |
| 3 | Should attest video URL be shareable outside the app (for WhatsApp)? If yes, what access controls? | Product | Week 3 |
| 4 | Do we support Aadhaar XML verification (DigiLocker) or just image upload? | Product | Week 4 |
| 5 | What happens to a landlord's data if they delete their account mid-lease? | Legal + Engineering | Week 4 |
| 6 | Should caretakers see financial data (rent amounts)? | Product | Week 5 |
| 7 | Poster: include PropEase branding on free tier only? | Product / Growth | Week 6 |

---

## 12. Appendix

### A. Glossary

| Term | Definition |
|------|-----------|
| Attest Video | Timestamped walkthrough video recorded by landlord, stored immutably |
| Unit | A single rentable space within a property (room, flat, shop) |
| Lease | Legally binding rental agreement between landlord and tenant |
| Caretaker | On-ground person assigned by landlord to manage day-to-day issues |
| SLA | Service Level Agreement — time target for maintenance resolution |
| FCM | Firebase Cloud Messaging — push notification service |
| KYC | Know Your Customer — tenant identity verification |
| DPDP | Digital Personal Data Protection Act, India, 2023 |

### B. Competitive Landscape

| Product | Type | Strength | Weakness vs. PropEase |
|---------|------|----------|-----------------------|
| NoBroker | Listing platform | Large user base | No post-listing management |
| MagicBricks | Listing platform | Brand recognition | No rent collection or maintenance |
| Rentberry | Management SaaS | Feature-rich | Not India-focused; no Hindi; no UPI |
| Buildium | Management SaaS | Enterprise-grade | Too complex; US-focused; expensive |
| WhatsApp | Communication | Universal adoption | No structure, no payments, no receipts |

### C. India-Specific Considerations

- UPI is the dominant payment method; Razorpay UPI intent flow preferred over QR
- Phone OTP authentication preferred over email (most landlords use phone as primary identity)
- WhatsApp sharing is the primary distribution channel for posters and links
- 4G connectivity assumed; no 5G-only features; graceful degradation on 3G
- Power cuts common; app state must be preserved on unexpected backgrounding
- Indian English spelling (colour, favour) in all UI copy
