# 🍱 FeedForward v3 — Complete Full-Stack Platform

> Hyperlocal smart food redistribution for India.  
> **Lucknow-first. Offline-capable. Real-time. Production-ready.**

---

## 🚀 Quick Start

```bash
# 1 — Frontend (works WITHOUT backend using demo data)
npm install
cp .env.example .env
npm run dev
# → Open http://localhost:5173

# 2 — Backend (optional, for real database)
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL + JWT secrets
node server.js
# → API running at http://localhost:5000
```

---

## 🔑 Demo Login Credentials

| Role      | Email                        | Password      |
|-----------|------------------------------|---------------|
| 🍱 Donor     | donor@feedforward.com        | donor123      |
| 🚴 Volunteer | volunteer@feedforward.com    | volunteer123  |
| 🛡️ Admin    | admin@feedforward.com        | admin123      |

---

## 📁 Project Structure

```
FeedForward-v3/
├── src/
│   ├── api/index.js              ← Centralised API client, auto token refresh
│   ├── context/AppContext.jsx    ← Global state: auth, notifications, SSE, chat
│   ├── hooks/
│   │   ├── useSSE.js             ← Real-time Server-Sent Events (auto-reconnect)
│   │   ├── usePolling.js         ← Smart polling (pauses when tab hidden)
│   │   ├── useGeolocation.js     ← GPS with Lucknow fallback
│   │   ├── useApi.js             ← Generic fetch with loading/error/refetch
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Home.jsx              ← Landing, live stats, ticker
│   │   ├── Donate.jsx            ← List + browse donations with photo upload
│   │   ├── DonationDetail.jsx    ← Full tracking timeline per donation
│   │   ├── Volunteer.jsx         ← Join + volunteer directory
│   │   ├── DropPoints.jsx        ← Map + capacity bars
│   │   ├── Partner.jsx           ← NGO registration
│   │   ├── Impact.jsx            ← Live counters, share card
│   │   ├── Leaderboard.jsx       ← Real data + podium
│   │   ├── About.jsx             ← Team, mission, values, timeline
│   │   ├── FAQ.jsx               ← Searchable accordion help centre
│   │   ├── Login.jsx             ← Email + demo quick-login + forgot password
│   │   ├── Signup.jsx            ← 2-step with role, phone, vehicle type
│   │   ├── ResetPassword.jsx
│   │   ├── EmailVerify.jsx       ← Token-based email verification
│   │   ├── Profile.jsx           ← Avatar upload, live impact stats, ImpactCard
│   │   ├── Chat.jsx              ← Real-time polling + SSE, quick replies
│   │   ├── Ratings.jsx           ← Star rating with tabs
│   │   ├── Settings.jsx          ← Notification prefs, dark/light, language
│   │   └── Dashboard/
│   │       ├── DonorDashboard.jsx     ← Photo upload, draft save, SSE matched alerts
│   │       ├── VolunteerDashboard.jsx ← GPS queue, persistent availability, certificate
│   │       ├── AdminDashboard.jsx     ← Real analytics, user mgmt, CSV export, broadcast
│   │       └── PartnerDashboard.jsx   ← Incoming food, capacity, analytics, report
│   ├── components/
│   │   ├── Navbar.jsx                 ← Avatar, unread count, About/Help links
│   │   ├── Footer.jsx                 ← Multi-col, newsletter, social
│   │   ├── Map.jsx                    ← Lucknow-centred, demand colour-coding
│   │   ├── OnboardingHints.jsx        ← Role-specific first-step cards
│   │   ├── EmailVerificationBanner.jsx← Sticky banner for unverified users
│   │   ├── ImpactCard.jsx             ← Shareable gradient card (Web Share API)
│   │   ├── NotificationPanel.jsx      ← Bell dropdown, mark read, links
│   │   └── ... (Badge, Button, Modal, ConfirmDialog, Skeleton, etc.)
│   └── utils/
│       ├── storage.js                 ← IndexedDB with localStorage fallback
│       ├── pushNotifications.js       ← Web Push + local browser notifications
│       ├── generateCertificate.js     ← Client-side HTML→PDF impact certificate
│       ├── donationUtils.js           ← Freshness, expiry, CO₂, duplicate detect
│       └── matchLogic.js              ← Haversine-based matching algorithm
├── public/
│   ├── sw.js                          ← Service worker: cache, push, background sync
│   └── manifest.json                  ← PWA: shortcuts, screenshots, maskable icons
└── backend/
    ├── server.js                      ← Express REST API + SSE + schedulers
    └── seed.js                        ← Seed DB with Lucknow demo data
```

---

## ✅ Features Implemented

### 🔴 Critical (all done)
| Feature | Where |
|---------|-------|
| Real-time donation queue | SSE broadcast on new donation → VolunteerDashboard |
| Real-time chat | 5s polling + SSE `new_message` event in Chat.jsx |
| Live "donation matched" alert for donor | SSE + pushNotif in DonorDashboard |
| Browser push notifications | `pushNotifications.js` + service worker |
| GPS-sorted job queue | `useGeolocation` + Haversine in VolunteerDashboard |
| Photo upload with preview | `FileReader` + base64 in Donate, DonorDashboard, VolunteerDashboard |
| Availability persists across refresh | IndexedDB via `idbSet/idbGet` per userId |

### 🟠 High (all done)
| Feature | Where |
|---------|-------|
| About Us page | `/about` |
| FAQ / Help Centre | `/faq` (searchable) |
| Partner Dashboard | `/dashboard/partner` (not a clone of Donor) |
| Donation tracking page | `/donations/:id` — status timeline, impact stats |
| Onboarding hints | `OnboardingHints.jsx` in all dashboards |
| Email verification | `/verify-email` + backend tokens + banner |
| Recurring donation scheduler | Backend `recurringScheduler()` every hour |
| Donation expiry auto-close | Backend `expiryScheduler()` every 15 mins |
| PDF impact certificate | `generateCertificate.js` — prints via browser |

### 🟡 Medium (all done)
| Feature | Where |
|---------|-------|
| Skeleton loading | All list pages |
| Empty states | All list views |
| Confirm dialogs | All destructive actions |
| Draft autosave | DonorDashboard (1s debounce → localStorage + IDB) |
| Pagination | Donate, Volunteer, DonorDashboard |
| Search + filter | Donate, DropPoints, FAQ, Admin users |
| Dark mode everywhere | All components and pages |
| Scroll to top on route change | MainLayout |
| 404 page with countdown | NotFound.jsx |
| Error boundary | App.jsx wraps all routes |

---

## 🗄️ Database Schema

| Table | Purpose |
|-------|---------|
| `users` | Roles, ratings, availability, verify tokens |
| `drop_points` | NGO locations with capacity |
| `donations` | Full lifecycle with recurring support |
| `notifications` | Per-user inbox |
| `ratings` | Donor ↔ volunteer ↔ drop point |
| `messages` | Chat per delivery |
| `audit_log` | Admin action tracking |
| `push_subscriptions` | Web push VAPID subscriptions |

---

## ⚙️ Backend Environment (`backend/.env`)

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/feedforward
JWT_SECRET=min_32_chars_random_string
JWT_REFRESH_SECRET=different_min_32_chars
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🏭 Production Deployment

| Layer | Recommended |
|-------|-------------|
| Frontend | Vercel |
| Backend API | Railway or Render |
| Database | Supabase (PostgreSQL) |
| Files | Cloudinary |
| Email | Resend or SendGrid |
| SMS | MSG91 (India) |
| Push | VAPID (`npx web-push generate-vapid-keys`) |

---

## 📌 Phase 4 Remaining

- [ ] Google OAuth login
- [ ] Real email sending (Resend/SendGrid)
- [ ] WhatsApp notifications (Twilio)
- [ ] TypeScript migration
- [ ] Unit tests (Vitest) + E2E (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Sentry error monitoring
- [ ] Hindi language support
