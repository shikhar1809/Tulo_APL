# DESIGN.md — UI/UX Design System
## PropEase Lucknow — Multi-Tenant Property Management Agent

**Version:** 1.0  
**Framework:** Flutter  
**Design Philosophy:** Functional clarity for first-time smartphone users in Tier-1 India

---

## 1. Design Principles

**1. Lucknow-First**  
UI copy in English + Hindi (Hinglish where appropriate). Currency always in ₹. Dates in DD/MM/YYYY. Time in IST.

**2. Trust Through Transparency**  
Every piece of data (rent history, maintenance status, property condition) is shown with timestamps. No ambiguity.

**3. Works on Low-End Devices**  
Optimised for ₹8,000–₹15,000 Android phones (4GB RAM, Android 10). No heavy animations. Compressed image assets. Lazy loading everywhere.

**4. Action-Forward**  
Each screen has one primary CTA. No feature discovery mazes. Landlord's home screen shows exactly what needs attention today.

---

## 2. Color System

### 2.1 Brand Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#1A56DB` | Primary actions, active states, links |
| `primaryDark` | `#1343B0` | Pressed states |
| `primaryLight` | `#EBF0FD` | Backgrounds, chips, selected states |
| `secondary` | `#FF6B35` | Alerts, overdue badges, urgent actions |
| `success` | `#0E9F6E` | Paid status, verified badges, confirmed |
| `warning` | `#FBBF24` | Due soon, pending, caution states |
| `error` | `#E02424` | Failed payments, errors, critical alerts |
| `neutral900` | `#111928` | Primary text |
| `neutral700` | `#374151` | Secondary text |
| `neutral400` | `#9CA3AF` | Placeholder, disabled |
| `neutral100` | `#F3F4F6` | Card backgrounds |
| `neutral50` | `#F9FAFB` | App background |
| `white` | `#FFFFFF` | Surfaces |

### 2.2 Semantic Colors

| State | Color Token |
|-------|------------|
| Rent Paid | `success` (#0E9F6E) |
| Rent Overdue | `error` (#E02424) |
| Rent Pending | `warning` (#FBBF24) |
| Unit Vacant | `primaryLight` + `primary` text |
| Unit Occupied | `success` light bg |
| Unit Maintenance | `warning` light bg |
| Emergency Request | `error` |
| High Priority | `secondary` |

---

## 3. Typography

### 3.1 Type Scale

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `displayLarge` | Poppins | 28sp | SemiBold | Screen titles |
| `displayMedium` | Poppins | 22sp | SemiBold | Section headers |
| `headlineMedium` | Poppins | 18sp | SemiBold | Card titles |
| `titleMedium` | Poppins | 16sp | Medium | List item titles |
| `bodyLarge` | Inter | 16sp | Regular | Primary body |
| `bodyMedium` | Inter | 14sp | Regular | Secondary body |
| `bodySmall` | Inter | 12sp | Regular | Captions, labels |
| `labelLarge` | Inter | 14sp | SemiBold | Button text |
| `labelSmall` | Inter | 11sp | Medium | Tags, chips |

**Hindi/Devanagari:** Noto Sans Devanagari — same size scale, Regular/SemiBold only.

### 3.2 Number Formatting

- Currency: `₹1,20,000` (Indian numbering system — lakh/crore)
- Dates: `15 Jun 2026` or `15/06/2026`
- Phone: `+91 98XXX XXXXX`

---

## 4. Component Library

### 4.1 Buttons

```
Primary Button (full-width, 52px height)
├── Background: primary (#1A56DB)
├── Text: white, labelLarge
├── Border radius: 12px
├── States: default | hover | pressed (primaryDark) | disabled (neutral400)
└── Icon: optional leading icon (20px)

Secondary Button
├── Background: white
├── Border: 1.5px primary
├── Text: primary, labelLarge
└── Same sizing as primary

Destructive Button
├── Background: error (#E02424)
└── Text: white

Text Button (inline actions)
├── No background, no border
└── Text: primary, labelLarge
```

### 4.2 Cards

```
Property Card (in list view)
├── Border radius: 16px
├── Shadow: 0 2px 8px rgba(0,0,0,0.08)
├── Background: white
├── Padding: 16px
├── Structure:
│   ├── Property photo (full width, 180px, border-radius top)
│   ├── Status pill (top-right absolute: Occupied/Vacant/Maintenance)
│   ├── Property name (headlineMedium)
│   ├── Address (bodySmall, neutral700)
│   ├── Unit count + monthly collection (row)
│   └── Quick action row (Collect Rent | Add Tenant | Maintenance)

Unit Card (in property detail)
├── Horizontal layout
├── Left: unit number + BHK badge
├── Center: tenant name (or "Vacant"), rent amount
├── Right: status dot + chevron
└── Swipe right: Quick collect; swipe left: Edit

Payment Record Card
├── Left icon: status icon (tick=paid, clock=pending, X=overdue)
├── Month/year as title
├── Amount in headlineMedium with status color
├── Date paid / days overdue as bodySmall
└── Tap: opens receipt
```

### 4.3 Status Pills / Badges

```
Pill (compact, 6px padding horizontal, 4px vertical, border-radius: 99px)
├── PAID     → success bg light, success text
├── OVERDUE  → error bg light, error text
├── PENDING  → warning bg light, warning text
├── VACANT   → primaryLight, primary text
├── OCCUPIED → success bg light, success text
├── VERIFIED → success + checkmark icon
└── EXPIRING SOON → warning + clock icon
```

### 4.4 Form Inputs

```
Text Field
├── Height: 52px
├── Border: 1px neutral400 (default), 2px primary (focused), 1px error (error)
├── Border radius: 12px
├── Background: white
├── Label: floats on focus (12sp)
├── Helper text: bodySmall below field
└── Error text: error color below field

Phone Input (special)
├── Country code prefix: +91 (fixed, non-editable)
├── 10-digit number field
└── Validates on blur

OTP Input
├── 6 boxes, 48×52px each, 8px gap
├── Auto-advance on digit entry
└── Paste support (auto-populates all boxes)
```

### 4.5 Bottom Sheets

All contextual actions use modal bottom sheets (not full-screen navigation).

```
Bottom Sheet
├── Handle bar: 4×36px, neutral300, centered, 8px from top
├── Border radius top: 20px
├── Max height: 80% of screen
├── Background: white
├── Padding: 20px
└── Dismiss: swipe down or tap overlay
```

---

## 5. Screen Designs

### 5.1 Landlord App

**Home Dashboard**
```
┌─────────────────────────────────────┐
│  Good morning, Ramesh ji  👋         │
│  3 properties · 12 units active     │
│─────────────────────────────────────│
│  🔴 ATTENTION TODAY                  │
│  ├─ ₹8,500 overdue (2 tenants)      │
│  ├─ 1 maintenance emergency          │
│  └─ Attest video expiring: 7 days   │
│─────────────────────────────────────│
│  THIS MONTH                         │
│  Collected: ₹62,000 / ₹74,000       │
│  ████████████░░░  84%               │
│─────────────────────────────────────│
│  YOUR PROPERTIES  [+ Add]           │
│  ┌──────────────┐ ┌──────────────┐  │
│  │ Gomti Nagar  │ │ Hazratganj   │  │
│  │ PG · 8 rooms │ │ Flat · 3 BHK │  │
│  │ 7/8 occupied │ │ Occupied     │  │
│  └──────────────┘ └──────────────┘  │
│─────────────────────────────────────│
│  [Home] [Properties] [₹ Rent] [☰]  │
└─────────────────────────────────────┘
```

**Property Detail**
```
┌─────────────────────────────────────┐
│  ← Gomti Nagar PG      [Edit] [⋮]  │
│─────────────────────────────────────│
│  [Photo carousel: 3 images]         │
│  ● ● ○                              │
│─────────────────────────────────────│
│  📹 Attest Video  [ACTIVE · 52d]   │
│  Recorded 5 Jun · Expires 3 Sep    │
│  [▶ Play]  [🔄 Re-record]          │
│─────────────────────────────────────│
│  📍 Nearby (Auto-verified)          │
│  🏥 Medanta 1.2km  🚉 Metro 0.8km  │
│  🏫 St. Francis 0.6km  🛒 D-Mart 1km│
│  [View map]                         │
│─────────────────────────────────────│
│  UNITS (8)          [+ Add Unit]   │
│  Room 1 · Ajay K.   ₹7,000  ● PAID │
│  Room 2 · Priya S.  ₹7,000  ⏰ DUE  │
│  Room 3 · —         ₹7,000  ○ VACANT│
│─────────────────────────────────────│
│  [🎨 Make Poster]  [📤 Share Link] │
└─────────────────────────────────────┘
```

**Rent Collection Screen**
```
┌─────────────────────────────────────┐
│  ← June 2026 Rent                  │
│─────────────────────────────────────│
│  ₹62,000  collected                 │
│  ₹12,000  pending                   │
│─────────────────────────────────────│
│  [Filter: All ▾]  [Send Reminders] │
│─────────────────────────────────────│
│  ✅ Room 1 — Ajay Kumar    ₹7,000  │
│     Paid 2 Jun · UPI               │
│                                     │
│  ⏰ Room 2 — Priya Singh   ₹7,000  │
│     Due 1 Jun · 4 days overdue     │
│     [Send Reminder]  [Mark Paid]   │
│                                     │
│  ○  Room 3 — Vacant        —       │
└─────────────────────────────────────┘
```

**Attest Video Recording Screen**
```
┌─────────────────────────────────────┐
│  ← Attest Your Property             │
│─────────────────────────────────────│
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │   LIVE CAMERA PREVIEW       │    │
│  │                             │    │
│  │  🔴 REC  01:24 / 03:00      │    │
│  └─────────────────────────────┘    │
│                                     │
│  📌 Tips while recording:           │
│  • Show entrance clearly            │
│  • Walk through each room           │
│  • Show bathrooms, kitchen          │
│  • Say today's date aloud           │
│  • Show windows and ventilation     │
│                                     │
│  [⏹ Stop & Save]                   │
└─────────────────────────────────────┘
```

**Poster Maker Screen**
```
┌─────────────────────────────────────┐
│  ← Create Poster   [Export] [Share]│
│─────────────────────────────────────│
│  Templates:                         │
│  [Modern Blue ✓] [Classic] [Bold]  │
│  [Minimal] [Festive]                │
│─────────────────────────────────────│
│  ┌─────────────────────────────┐    │
│  │  [Property Photo]           │    │
│  │                             │    │
│  │  🏠 ROOM AVAILABLE          │    │
│  │  Gomti Nagar, Lucknow       │    │
│  │  ₹7,000/month               │    │
│  │  ✓ AC  ✓ WiFi  ✓ Meals      │    │
│  │                             │    │
│  │  📞 98XXX XXXXX  [QR Code]  │    │
│  └─────────────────────────────┘    │
│                                     │
│  Customise:                         │
│  Rent: [₹7,000______]              │
│  Amenities: [AC ✓] [WiFi ✓] [Gym] │
└─────────────────────────────────────┘
```

### 5.2 Tenant App

**Tenant Home**
```
┌─────────────────────────────────────┐
│  Hello, Priya 👋                     │
│  Room 2, Gomti Nagar PG             │
│─────────────────────────────────────│
│  JUNE RENT                          │
│  ₹7,000  ⏰ Due 1 Jun               │
│  [Pay Now →]                        │
│─────────────────────────────────────│
│  YOUR LEASE                         │
│  Active · Ends 31 Dec 2026          │
│  [View Lease] [View Property Video] │
│─────────────────────────────────────│
│  MAINTENANCE                        │
│  1 open request                     │
│  Bathroom tap — In Progress         │
│  [View] [+ New Request]            │
│─────────────────────────────────────│
│  [🏠 Home] [₹ Pay] [🔧 Requests]  │
└─────────────────────────────────────┘
```

**Payment Screen**
```
┌─────────────────────────────────────┐
│  ← Pay June Rent                   │
│─────────────────────────────────────│
│  To: Gomti Nagar PG (Ramesh Gupta) │
│  Period: June 2026                  │
│  Amount: ₹7,000                     │
│─────────────────────────────────────│
│  Payment Method:                    │
│  ◉ UPI   ○ Card   ○ Netbanking     │
│                                     │
│  UPI ID: [priya@upi_________]      │
│                                     │
│  [Pay ₹7,000 →]                    │
│─────────────────────────────────────│
│  🔒 Secured by Razorpay             │
│  You'll receive a receipt via SMS   │
└─────────────────────────────────────┘
```

**Maintenance Request Screen**
```
┌─────────────────────────────────────┐
│  ← New Request                     │
│─────────────────────────────────────│
│  Category:                          │
│  [🔧 Plumbing] [⚡ Electrical]      │
│  [🪚 Carpentry] [🧹 Cleaning]       │
│  [Other]                            │
│─────────────────────────────────────│
│  Describe the issue:                │
│  [Bathroom tap is dripping         ]│
│  [constantly since 2 days...       ]│
│─────────────────────────────────────│
│  Priority: ○ Low ◉ Medium ○ High   │
│                                     │
│  Add photos (optional):             │
│  [📷 Add Photo]                     │
│                                     │
│  [Submit Request]                   │
└─────────────────────────────────────┘
```

---

## 6. Navigation Structure

### 6.1 Landlord Navigation

```
Bottom Nav (4 tabs):
├── 🏠 Home (Dashboard)
├── 🏢 Properties (list + detail + units)
├── ₹  Rent (all collections, history)
└── ☰  More (maintenance, profile, settings, poster maker)
```

### 6.2 Tenant Navigation

```
Bottom Nav (3 tabs):
├── 🏠 Home
├── ₹  Pay Rent
└── 🔧 Maintenance
```

---

## 7. Illustration & Iconography

**Icons:** `lucide` icon set (consistent, minimal line icons)  
**Illustrations:** Custom Lottie animations for:
- Empty states (no properties, no tenants, no requests)
- Success states (payment received, request resolved)
- Loading states (video uploading)

**Illustration Style:**
- Flat, 2D characters with Indian features
- Colors from brand palette
- Lucknow architectural motifs in backgrounds (Rumi Darwaza silhouette, subtle)

---

## 8. Accessibility

- Minimum tap target: 44×44px
- Contrast ratio ≥ 4.5:1 for all body text (WCAG AA)
- All interactive elements have semantic labels
- Font scaling supported up to 1.3× (beyond that, layout adapts gracefully)
- Error states never conveyed by color alone (always includes icon + text)

---

## 9. Micro-interactions & Animations

| Interaction | Animation |
|-------------|-----------|
| Payment success | Lottie confetti + checkmark (0.8s) |
| Rent reminder sent | Slide-up toast (2s auto-dismiss) |
| Maintenance resolved | Green fill animation on card |
| Video recording start | Pulse on REC dot |
| Poster generation | Progress bar + shimmer on preview |
| Status pill update | Fade transition (300ms) |

**Performance rule:** No animation on scroll. All animations capped at 300ms unless it's a one-time success state.

---

## 10. Localization

**Languages (Phase 1):** English  
**Languages (Phase 2):** Hindi (Devanagari)

All strings in `l10n/` ARB files from day one.  
RTL support not required (Hindi is LTR).  
Date/number formatting via `intl` package with `en_IN` locale.

---

## 11. Dark Mode

Phase 2 feature. Architecture supports it (all colors via ThemeData tokens).  
Phase 1: Light mode only.

---

## 12. Poster Template Visual Specs

| Template Name | Primary Color | Style | Best For |
|---------------|-------------|-------|---------|
| Modern Blue | #1A56DB | Clean grid, minimal | Flats, professionals |
| Classic Cream | #D4A862 | Traditional border | PGs, families |
| Bold Red | #E02424 | High contrast | Commercial spaces |
| Minimal White | #111928 | Typography-first | Premium flats |
| Festive Saffron | #FF6B35 | Decorative | Festival season |

**Export sizes:**
- Instagram Post: 1080×1080px (square)
- Instagram Story / WhatsApp Status: 1080×1920px
- Print A4: 2480×3508px (300dpi)
- WhatsApp share: 800×800px (compressed)
