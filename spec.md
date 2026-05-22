# SPEC.md — Technical Specification
## TULO Lucknow — Multi-Tenant Property Management Agent

**Version:** 1.0  
**Stack:** Flutter (Frontend) · Firebase (Backend, Auth, Deployment)  
**Date:** May 2026

---

## 1. System Architecture

### 1.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Flutter App (Client)                   │
│   Landlord App  │  Tenant App  │  Admin Dashboard        │
└────────┬────────────────┬──────────────────┬────────────┘
         │                │                  │
         ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│              Firebase Services Layer                     │
│  Auth │ Firestore │ Storage │ Functions │ Messaging      │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│           Firebase Cloud Functions (Node.js)             │
│  Rent Engine │ Notification Agent │ AI Services Layer    │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│              External Integrations                       │
│  Razorpay │ Google Maps API │ Firebase ML │ Gemini API   │
└─────────────────────────────────────────────────────────┘
```

### 1.2 User Roles

| Role | Description | App Entry |
|------|-------------|-----------|
| `landlord` | Property owner managing one or more units | Landlord module |
| `tenant` | Occupant of a unit | Tenant module |
| `admin` | Platform super-admin | Web dashboard (Firebase Hosting) |
| `caretaker` | On-ground agent assigned by landlord | Caretaker sub-role |

---

## 2. Firebase Architecture

### 2.1 Firebase Services Used

| Service | Purpose |
|---------|---------|
| Firebase Auth | Phone OTP + Google Sign-In |
| Cloud Firestore | Primary database (real-time sync) |
| Cloud Storage | Videos, images, documents |
| Cloud Functions | Business logic, scheduled jobs, webhooks |
| Firebase Messaging (FCM) | Push notifications |
| Firebase Hosting | Admin web dashboard |
| Firebase App Check | API abuse prevention |
| Firebase Remote Config | Feature flags |
| Firebase Analytics | Usage tracking |

### 2.2 Firestore Data Model

```
/users/{userId}
  - uid, name, phone, email, role, createdAt, fcmToken

/properties/{propertyId}
  - ownerId, title, type (PG|flat|commercial), address
  - city: "Lucknow", locality, pincode
  - totalUnits, amenities[], geoPoint
  - attestVideo: { url, uploadedAt, expiresAt }
  - posterTemplateId
  - verificationStatus: (pending|verified|rejected)
  - nearbyPlaces[]: { name, type, distanceKm }   ← auto-populated via Maps API

/properties/{propertyId}/units/{unitId}
  - unitNumber, floor, bhkType, rentAmount, deposit
  - status: (vacant|occupied|maintenance)
  - currentTenantId, leaseStartDate, leaseEndDate
  - amenities[], photos[]

/leases/{leaseId}
  - propertyId, unitId, tenantId, landlordId
  - startDate, endDate, rentAmount, depositAmount
  - status: (active|expired|terminated)
  - documents[]: { url, type, uploadedAt }
  - eSignature: { tenantSigned, landlordSigned, signedAt }

/rentPayments/{paymentId}
  - leaseId, tenantId, landlordId, unitId, propertyId
  - amount, dueDate, paidDate
  - status: (pending|paid|overdue|waived)
  - razorpayOrderId, razorpayPaymentId
  - receiptUrl, month, year

/maintenanceRequests/{requestId}
  - propertyId, unitId, tenantId
  - category: (plumbing|electrical|carpentry|cleaning|other)
  - title, description, photos[]
  - priority: (low|medium|high|emergency)
  - status: (open|assigned|in_progress|resolved|closed)
  - assignedTo (caretakerId), resolvedAt
  - timeline[]: { status, note, timestamp, actorId }

/notifications/{notificationId}
  - userId, type, title, body, data{}, read, createdAt

/posterTemplates/{templateId}
  - name, previewUrl, category
  - fields[]: { key, label, type, position }
  - svgTemplate (string)

/attestVideos/{videoId}
  - propertyId, uploadedBy, url, thumbnailUrl
  - duration, uploadedAt, expiresAt (90 days)
  - status: (processing|active|expired)
  - amenitiesTagged[]: { timestamp, label }
```

### 2.3 Security Rules Strategy

- Landlords can only read/write their own properties and associated units/leases
- Tenants can only read their own lease, unit, and submit maintenance requests
- Rent payment records: tenant can read, landlord can read/update
- Admin role bypasses all restrictions via custom claims
- `propertyId` always validated against `ownerId === request.auth.uid`

---

## 3. Feature Specifications

### 3.1 Attest Video System

**Purpose:** Owner-recorded walkthrough video as live proof of property condition and amenities — timestamped and tamper-evident.

**Flow:**
1. Landlord opens "Attest Property" screen
2. App records video via `camera` Flutter plugin (max 3 min)
3. Upload to Firebase Storage at `attestVideos/{propertyId}/{timestamp}.mp4`
4. Cloud Function triggers on upload:
   - Generates thumbnail
   - Stores metadata with `uploadedAt` timestamp
   - Sets `expiresAt = uploadedAt + 90 days`
   - Sends Firestore write with `status: processing → active`
5. Video is served with expiry badge visible to tenants
6. Tenant onboarding flow shows attest video before signing lease

**Technical Details:**
- Storage path: `gs://tulo/attestVideos/{propertyId}/{videoId}.mp4`
- Max size: 500MB
- Supported formats: MP4, MOV
- Thumbnail generated via Cloud Function (ffmpeg layer)
- Signed URLs with 7-day expiry for sharing
- Renewal reminder sent 14 days before expiry via FCM

### 3.2 Nearby Places (Amenity Proof)

**Purpose:** Auto-fetch and display verified amenities near the property using Google Maps Places API — not manually entered by owner.

**Flow:**
1. Landlord enters property address → Geocoded to `GeoPoint`
2. Cloud Function calls Google Places API for each category:
   - Hospitals, schools, metro stations, markets, restaurants, ATMs, gyms
3. Results stored in `properties/{id}/nearbyPlaces[]`
4. Refreshed every 30 days via scheduled Cloud Function
5. Displayed on property listing with distance in km/walking time
6. Tenants see map view with pins

**Data Fields per Place:**
```json
{
  "name": "Medanta Hospital",
  "type": "hospital",
  "distanceKm": 1.2,
  "walkingMinutes": 15,
  "googlePlaceId": "ChIJ...",
  "verified": true
}
```

### 3.3 Poster Generation System

**Purpose:** Landlords generate branded "For Rent" posters with property details, QR code, and photos — without design skills.

**Flow:**
1. Landlord selects template (5 initial templates)
2. App pre-fills: property name, rent, BHK type, key amenities, contact
3. Landlord optionally customizes colors/photos
4. Poster generated client-side via Flutter `pdf` package
5. Exported as high-res JPG (1080×1350 for Instagram/WhatsApp) or PDF
6. Shared via system share sheet

**Template Data:**
- SVG templates stored in Firestore `/posterTemplates`
- Fields: property name, price, BHK, floor, amenities (3 max), phone, QR code
- QR code points to property listing URL (Firebase Dynamic Link)

### 3.4 Rent Collection Engine

**Gateway:** Razorpay (supports UPI, cards, netbanking)

**Flow:**
1. Cloud Function scheduler runs daily at 8 AM IST
2. Identifies leases where `dueDate = today` or `dueDate < today AND status = pending`
3. Creates Razorpay Order via API
4. Sends FCM + SMS to tenant with payment link
5. Tenant pays via in-app Razorpay checkout
6. Webhook received → Firestore updated → Receipt generated → FCM to landlord
7. Overdue escalation: D+3 (reminder), D+7 (strong reminder + landlord alert), D+15 (flag for action)

**Receipt:**
- Auto-generated PDF via Cloud Function
- Uploaded to Storage, URL stored in payment record
- Sent to tenant via FCM

### 3.5 Maintenance Request Lifecycle

```
Tenant submits → Open → Landlord assigns caretaker → In Progress → Resolved → Tenant confirms → Closed
                                    ↓
                          Landlord resolves directly
```

**SLA Timers:**
- Emergency: 2-hour response target
- High: 24 hours
- Medium: 72 hours
- Low: 7 days

**Notifications at each state transition via FCM.**

### 3.6 Tenant Onboarding

**Steps:**
1. Landlord generates invite link/code for unit
2. Tenant installs app, enters code
3. Tenant views: attest video, nearby places, unit photos
4. Tenant fills KYC: name, Aadhaar upload, emergency contact
5. Lease agreement shown (PDF)
6. e-Signature captured (drawn or typed)
7. Both parties receive signed lease PDF
8. Unit status flips to `occupied`

---

## 4. Cloud Functions Inventory

| Function | Trigger | Description |
|----------|---------|-------------|
| `onAttestVideoUpload` | Storage finalizeObject | Process video, generate thumbnail, set metadata |
| `scheduledRentReminders` | Cron (daily 8 AM IST) | Send rent due/overdue notifications |
| `onRazorpayWebhook` | HTTP POST | Handle payment success/failure, update Firestore |
| `generateReceipt` | Firestore write (payment paid) | Create PDF receipt, upload, notify |
| `refreshNearbyPlaces` | Cron (monthly) | Re-fetch Google Places for all active properties |
| `onPropertyCreate` | Firestore write | Geocode address, fetch initial nearby places |
| `onMaintenanceCreate` | Firestore write | Notify landlord, start SLA timer |
| `onMaintenanceUpdate` | Firestore write | Notify relevant parties on status change |
| `onLeaseExpiry` | Cron (daily) | Alert landlord 30/15/7/1 days before lease end |
| `generatePoster` | HTTP (callable) | Server-side poster generation fallback |

---

## 5. Flutter App Architecture

### 5.1 Package Structure

```
lib/
  core/
    auth/         # AuthBloc, AuthRepository
    firebase/     # FirebaseService wrappers
    theme/        # AppTheme, colors, typography
    utils/        # formatters, validators, helpers
  features/
    onboarding/   # Splash, role selection, phone OTP
    landlord/
      properties/ # CRUD, attest video, nearby places
      units/      # Unit management
      tenants/    # Tenant list, invite flow
      rent/       # Rent dashboard, history
      maintenance/# Requests inbox
      poster/     # Template picker, editor, export
    tenant/
      home/       # Dashboard: lease, rent, requests
      payment/    # Razorpay checkout
      maintenance/# Submit request
      lease/      # View lease, attest video
    shared/
      notifications/
      profile/
      chat/       # In-app messaging (landlord ↔ tenant)
  widgets/        # Reusable UI components
```

### 5.2 State Management

- **BLoC + Cubit** (flutter_bloc) for all features
- **Riverpod** considered but BLoC preferred for team scalability
- **go_router** for navigation with deep linking support

### 5.3 Key Flutter Packages

| Package | Purpose |
|---------|---------|
| `firebase_auth` | Authentication |
| `cloud_firestore` | Database |
| `firebase_storage` | File uploads |
| `firebase_messaging` | Push notifications |
| `razorpay_flutter` | Payment gateway |
| `camera` | Attest video recording |
| `video_player` | Video playback |
| `pdf` | Poster/receipt generation |
| `google_maps_flutter` | Nearby places map |
| `geolocator` | Location services |
| `flutter_bloc` | State management |
| `go_router` | Navigation |
| `cached_network_image` | Image caching |
| `image_picker` | Photo selection |
| `share_plus` | Poster sharing |
| `flutter_signature_pad` | e-Signature |
| `qr_flutter` | QR code generation |
| `intl` | Date/currency formatting (INR) |

---

## 6. Authentication Flow

```
App Launch
    │
    ├── No user → Onboarding
    │       ├── Enter phone number
    │       ├── Firebase Phone OTP
    │       ├── Role selection (landlord / tenant)
    │       └── Profile setup
    │
    └── Existing user → Role-based home screen
            ├── landlord → LandlordShell
            └── tenant → TenantShell
```

**Custom Claims (set via Admin SDK in Cloud Functions):**
- `role`: landlord | tenant | admin | caretaker
- `propertyIds[]`: landlord's accessible properties (for security rules)

---

## 7. Deployment

### 7.1 Firebase Project Setup

- **Project:** `tulo-lucknow`
- **Firestore:** `nam5` region (closest to India = `asia-south1`)
- **Cloud Functions:** `asia-south1` (Mumbai)
- **Storage:** Multi-region (Asia)

### 7.2 CI/CD

- GitHub Actions → `flutter build apk --release` + `flutter build ipa`
- Firebase App Distribution for beta testing
- Firebase Hosting for admin dashboard
- Functions deployed via `firebase deploy --only functions`

### 7.3 Environments

| Env | Firebase Project | Purpose |
|-----|-----------------|---------|
| dev | tulo-dev | Local development |
| staging | tulo-staging | QA testing |
| prod | tulo-prod | Live users |

---

## 8. Security & Compliance

- All Aadhaar/KYC docs stored in private Firebase Storage bucket (no public URLs)
- Signed URLs generated per-request with 1-hour TTL
- Firebase App Check enforced on all callable functions
- Razorpay PCI-DSS compliant — no card data stored in Firestore
- Phone numbers hashed in analytics events
- DPDP Act 2023 (India) compliance: consent recorded at onboarding
- Data retention: tenant data deleted 90 days post lease termination on request

---

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| App cold start | < 3s |
| Firestore query (indexed) | < 500ms |
| Video upload (100MB) | < 60s on 4G |
| Poster generation | < 5s |
| Payment success webhook processing | < 2s |
| Push notification delivery | < 5s |

---

## 10. Monitoring

- Firebase Crashlytics (crash reporting)
- Firebase Performance Monitoring (app traces)
- Cloud Functions logs → Google Cloud Logging
- Alerting via Cloud Monitoring for function errors > threshold
