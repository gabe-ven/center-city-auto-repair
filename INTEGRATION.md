# George's Auto Repair — Integration Reference

> **Purpose:** Authoritative technical reference for every customer-facing API
> integration in this codebase. Use this document to replicate the integration
> in a different front-end framework.

---

## Table of Contents

1. [Environment Variables](#1-environment-variables)
2. [Track My Car — Oil Change](#2-track-my-car--oil-change)
3. [Track My Car — Service Repair](#3-track-my-car--service-repair)
4. [Ticket Submission (Schedule Service)](#4-ticket-submission-schedule-service)
5. [/admin Redirect](#5-admin-redirect)
6. [API Endpoint Reference](#6-api-endpoint-reference)
7. [File Map](#7-file-map)
8. [Replicate in a New Next.js Front End — Step-by-Step Checklist](#8-replicate-in-a-new-nextjs-front-end--step-by-step-checklist)

---

## 1. Environment Variables

**File:** `.env.local`

```
NEXT_PUBLIC_SHOP_ID=georges-auto-repair
NEXT_PUBLIC_DASHBOARD_API_URL=https://auto-repair-dashboard.vercel.app
```

| Variable | Value | Used In |
|---|---|---|
| `NEXT_PUBLIC_SHOP_ID` | `georges-auto-repair` | Every API call as the `shop_id` discriminator |
| `NEXT_PUBLIC_DASHBOARD_API_URL` | `https://auto-repair-dashboard.vercel.app` | Base URL prefixed to every API path |

Both are prefixed `NEXT_PUBLIC_` so they are inlined into the browser bundle at
build time. **No server-side secret is involved.** Any new front end needs these
two values available at runtime (as client-side env vars or equivalent).

---

## 2. Track My Car — Oil Change

**File:** `components/TrackMyCarModal.tsx`

### State managed

| State variable | Type | Purpose |
|---|---|---|
| `flow` | `'choose' \| 'oil-lookup' \| 'oil-active' \| 'oil-ready' \| 'repair-lookup' \| 'repair-status'` | Which screen is rendered |
| `lookup` | `{ plate: string; phone: string }` | Form inputs for the oil-change lookup |
| `remaining` | `number` | Seconds left on the countdown (counts down via `setInterval`) |
| `totalSeconds` | `number` | Full duration used to calculate the ring fill percentage |
| `adjustmentMins` | `number` | Minutes added/subtracted by the shop; shown as an early/late note |
| `loading` | `boolean` | Disables the submit button while the request is in-flight |
| `lookupError` | `string` | Inline error message shown beneath the form |

### API call

```ts
// components/TrackMyCarModal.tsx — handleOilLookup()
const res = await fetch(
  `${process.env.NEXT_PUBLIC_DASHBOARD_API_URL}/api/oil-changes/track`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      shop_id:       process.env.NEXT_PUBLIC_SHOP_ID,
      license_plate: lookup.plate,
      phone:         lookup.phone,
    }),
  }
);
```

### Response handling

```ts
const json = await res.json();
const record = json.data ?? json;          // unwrap optional { data: … } envelope

if (record.status === 'ready') {
  setFlow('oil-ready');                    // → "Ready for Pickup" screen
  return;
}

// Calculate ETA from record fields
const eta      = new Date(record.started_at).getTime()
               + (record.estimated_minutes + record.adjustment_minutes) * 60000;
const secs     = Math.max(0, Math.floor((eta - Date.now()) / 1000));
const total    = (record.estimated_minutes + record.adjustment_minutes) * 60;

setRemaining(secs);
setTotalSeconds(total > 0 ? total : 45 * 60);  // fallback: 45 min
setAdjustmentMins(record.adjustment_minutes ?? 0);
setFlow('oil-active');                     // → countdown timer screen
```

### Countdown tick

```ts
useEffect(() => {
  if (flow !== 'oil-active') return;
  const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
  return () => clearInterval(id);
}, [flow]);
```

The ring fill percentage is computed inside `CountdownRing`:

```ts
const pct  = Math.max(0, Math.min(1, 1 - seconds / totalSeconds));
const dash = circumference * pct;   // how much of the SVG stroke is "consumed"
```

As `remaining` ticks down, `pct` grows from 0 → 1 and the gold arc sweeps
clockwise around the ring.

### Screens

| `flow` value | What is shown |
|---|---|
| `'oil-lookup'` | Form: License Plate + Phone, "Find My Car" button |
| `'oil-active'` | SVG countdown ring + adjustment note + shop address |
| `'oil-ready'` | Full-screen green check mark + "Get Directions" + "Call the Shop" |

---

## 3. Track My Car — Service Repair

**File:** `components/TrackMyCarModal.tsx`

### State managed

| State variable | Type | Purpose |
|---|---|---|
| `repairLookup` | `{ ticket: string; phone: string }` | Form inputs for the repair lookup |
| `ticketResult` | `{ ticket_number, status, notes? } \| null` | API response stored and passed to `<LiveRepairStatus>` |
| `repairError` | `string` | Inline error message |

### API call

```ts
// components/TrackMyCarModal.tsx — handleRepairLookup()
const params = new URLSearchParams({
  ticket_number: repairLookup.ticket,
  phone:         repairLookup.phone,
  shop_id:       process.env.NEXT_PUBLIC_SHOP_ID ?? 'georges-auto-repair',
});
const res = await fetch(
  `${process.env.NEXT_PUBLIC_DASHBOARD_API_URL}/api/tickets/status?${params}`
  // GET — no body
);
const json = await res.json();
setTicketResult(json.data ?? json);
setFlow('repair-status');
```

### Lookup form

Two fields rendered in `flow === 'repair-lookup'`:

| Field | Input type | Placeholder | State key |
|---|---|---|---|
| Ticket Number | `text` | `GAR-XXXXXXXXXX` | `repairLookup.ticket` (auto-uppercased) |
| Phone (verification) | `tel` | `(530) 555-0100` | `repairLookup.phone` |

### Status display — `<LiveRepairStatus>`

The raw `status` string from the API is mapped through `STATUS_MAP`:

```ts
const STATUS_MAP: Record<string, { label: string; icon: string }> = {
  new:        { label: "Received — we'll be in touch soon",            icon: 'inbox' },
  reviewing:  { label: "Under Review — our mechanic is looking at it", icon: 'clipboard-list' },
  in_repair:  { label: "In Progress — your car is being worked on",    icon: 'wrench' },
  ready:      { label: "Ready for Pickup!",                            icon: 'badge-check' },
  completed:  { label: "Completed",                                    icon: 'check-circle' },
};
```

Any unrecognised status value falls back to `{ label: ticket.status, icon: 'wrench' }`.

The UI renders:
1. **Ticket header card** — monospace ticket number (`GAR-…`)
2. **Status card** — dark navy card with gold left-border, icon + human-readable label
3. **Shop note** (conditional) — shown only when `ticket.notes` is non-empty
4. **Shop footer** — address + phone link

---

## 4. Ticket Submission (Schedule Service)

**File:** `components/ServiceRequestWizard.tsx`

### Wizard steps

| Step | Screen | Key state |
|---|---|---|
| 1 | Issue picker (13 toggle cards) | `issues: string[]` |
| 2 | Vehicle details | `car: { make, model, year }` |
| 3 | Photo / video upload (UI only — files are **not sent** to the API) | `files[]` — display only |
| 4 | Contact + preferred method + notes | `contact: { name, phone, email, method, notes }` |
| 5 | Confirmation (post-submit) | `ticket: string` — the returned ticket number |

### API call — `submit()`

```ts
// components/ServiceRequestWizard.tsx — submit()
const res = await fetch(
  `${process.env.NEXT_PUBLIC_DASHBOARD_API_URL}/api/tickets`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      shop_id:         process.env.NEXT_PUBLIC_SHOP_ID,
      customer_name:   contact.name,
      customer_phone:  contact.phone,
      customer_email:  contact.email,
      license_plate:   '',           // intentionally blank in wizard flow
      car_make:        car.make,
      car_model:       car.model,
      car_year:        car.year,
      issues,                        // string[] of selected issue IDs
      notes:           contact.notes,
    }),
  }
);
const data = await res.json();
setTicket(data.ticket_number);       // e.g. "GAR-1748968849734"
setStep(5);
```

> **Note:** The file upload UI (step 3) captures file metadata locally for
> display purposes but does **not** POST files to the API. The `issues` array
> contains short IDs like `'battery'`, `'check'`, `'oil'`, etc. (see
> `issueOptions` for the full list).

### Confirmation screen (Step 5)

- Animated gold check-mark circle (`pop-check` keyframe)
- Ticket number displayed in a monospace pill badge: `data.ticket_number`
- "What happens next?" 3-step numbered list
- Google Maps link hardcoded to `1600 E 8th St Davis CA 95616`
- "Done" button calls `onClose()` and the wizard resets via the `useEffect` on `open`

---

## 5. /admin Redirect

**File:** `next.config.ts`

```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source:      '/admin',
        destination: 'https://auto-repair-dashboard.vercel.app/login',
        permanent:   false,          // HTTP 307
      },
    ];
  },
};
```

This is a **server-side Next.js redirect** — it runs in the routing layer before
any React code. Visiting `/admin` on the customer site issues a `307 Temporary
Redirect` to the dashboard login page. No client-side component is involved.

---

## 6. API Endpoint Reference

All endpoints share the same base URL: **`https://auto-repair-dashboard.vercel.app`**

---

### 6.1 Track Oil Change

| | |
|---|---|
| **URL** | `https://auto-repair-dashboard.vercel.app/api/oil-changes/track` |
| **Method** | `POST` |
| **Content-Type** | `application/json` |

**Request body:**
```json
{
  "shop_id":       "georges-auto-repair",
  "license_plate": "7ABC123",
  "phone":         "5305550100"
}
```

**Response (in-progress):**
```json
{
  "data": {
    "status":               "in_progress",
    "started_at":           "2025-05-24T18:00:00.000Z",
    "estimated_minutes":    45,
    "adjustment_minutes":   0
  }
}
```

**Response (ready):**
```json
{
  "data": {
    "status": "ready"
  }
}
```

**Error responses:**
- `404` — no matching record for that plate + phone + shop_id
- `5xx` — treated as a generic "Something went wrong" error

> The response may be a bare object or wrapped in `{ data: … }`. The code
> handles both via `const record = json.data ?? json`.

---

### 6.2 Get Ticket Status (Repair Tracking)

| | |
|---|---|
| **URL** | `https://auto-repair-dashboard.vercel.app/api/tickets/status` |
| **Method** | `GET` |
| **Query params** | `ticket_number`, `phone`, `shop_id` |

**Example full URL:**
```
GET /api/tickets/status?ticket_number=GAR-1748968849734&phone=5305550100&shop_id=georges-auto-repair
```

**Response:**
```json
{
  "data": {
    "ticket_number": "GAR-1748968849734",
    "status":        "in_repair",
    "notes":         "Waiting on brake pads — should be ready by 3 PM."
  }
}
```

**Known `status` values:** `new` | `reviewing` | `in_repair` | `ready` | `completed`

**Error responses:**
- `404` — ticket not found for that number + phone + shop_id

---

### 6.3 Create Ticket (Schedule Service)

| | |
|---|---|
| **URL** | `https://auto-repair-dashboard.vercel.app/api/tickets` |
| **Method** | `POST` |
| **Content-Type** | `application/json` |

**Request body:**
```json
{
  "shop_id":        "georges-auto-repair",
  "customer_name":  "Jane Smith",
  "customer_phone": "5305550100",
  "customer_email": "jane@example.com",
  "license_plate":  "",
  "car_make":       "Toyota",
  "car_model":      "Camry",
  "car_year":       "2019",
  "issues":         ["oil", "check"],
  "notes":          "Overdue for service, started vibrating last week."
}
```

**Valid `issues` values:**
`battery` | `check` | `oil` | `brakes` | `tire` | `ac` | `noise` | `smog` |
`overheat` | `elec` | `trans` | `body` | `other`

**Response:**
```json
{
  "ticket_number": "GAR-1748968849734"
}
```

**Error responses:**
- `4xx` / `5xx` — treated as a generic "Something went wrong, please try again."

---

## 7. File Map

Files that form the customer-facing integration (no design-only or purely
decorative files).

| File | Description |
|---|---|
| `.env.local` | Declares `NEXT_PUBLIC_SHOP_ID` and `NEXT_PUBLIC_DASHBOARD_API_URL`; required at build and runtime |
| `next.config.ts` | Defines the server-side `/admin` → dashboard redirect; the only Next.js config that affects integration routing |
| `app/page.tsx` | Root page; owns `scheduleOpen` and `trackOpen` state; mounts `<ServiceRequestWizard>` and `<TrackMyCarModal>` and passes open/close callbacks down to `<Navbar>` and `<HeroSection>` |
| `components/TrackMyCarModal.tsx` | Full "Track My Car" modal: oil-change lookup + countdown timer + service-repair lookup + status display; contains both API calls (`/api/oil-changes/track` and `/api/tickets/status`) |
| `components/ServiceRequestWizard.tsx` | 4-step "Schedule Service" wizard; contains the ticket-creation API call (`POST /api/tickets`) and the confirmation screen |
| `components/ModalShell.tsx` | Reusable modal wrapper (backdrop, scroll-lock, Escape key, animations) and `<ModalHeader>` (eyebrow, title, back button, progress bar) |
| `components/_shared.tsx` | Shared style constants (`btnFilledGold`, `btnOutlineNavy`, `inputStyle`, etc.) and the `<Field>` form-label wrapper used by both interactive modals |
| `components/DynamicIcon.tsx` | Thin wrapper that resolves a string name (e.g. `'wrench'`) to the corresponding `lucide-react` icon; used throughout the modals |
| `components/Navbar.tsx` | Sticky nav; "TRACK MY CAR" button calls `onTrack()` prop; "SCHEDULE SERVICE" button calls `onSchedule()` prop |
| `components/HeroSection.tsx` | Hero section; "SCHEDULE SERVICE" button calls `onSchedule()` prop |

---

## 8. Replicate in a New Next.js Front End — Step-by-Step Checklist

Follow these steps in order to wire up the same three customer-facing features
(Oil Change Tracker, Service Repair Tracker, Schedule Service) in a brand-new
Next.js (App Router) project.

---

### Phase 1 — Project setup

- [ ] **1.** Bootstrap: `npx create-next-app@latest --typescript --app --tailwind`
  (Tailwind is optional; the existing codebase uses inline styles — both work)
- [ ] **2.** Create `.env.local` in the project root:
  ```
  NEXT_PUBLIC_SHOP_ID=georges-auto-repair
  NEXT_PUBLIC_DASHBOARD_API_URL=https://auto-repair-dashboard.vercel.app
  ```
- [ ] **3.** Install `lucide-react` for icons: `npm install lucide-react`

---

### Phase 2 — /admin redirect

- [ ] **4.** In `next.config.ts`, add:
  ```ts
  async redirects() {
    return [
      {
        source:      '/admin',
        destination: 'https://auto-repair-dashboard.vercel.app/login',
        permanent:   false,
      },
    ];
  }
  ```

---

### Phase 3 — Shared primitives

- [ ] **5.** Create `components/_shared.tsx` (or equivalent) with at minimum:
  - `btnFilledGold` — gold filled button style
  - `btnOutlineNavy` — navy outline button style
  - `inputStyle` — text input base style
  - `modalBodyStyle` / `modalFooterStyle` — modal layout containers
  - `wizardLead` — subtitle paragraph style
  - `<Field label children>` — form label wrapper component

- [ ] **6.** Create `components/ModalShell.tsx` with:
  - A fixed full-screen backdrop (`position: fixed; inset: 0; z-index: 200`)
  - Click-outside-to-close (click on backdrop calls `onClose`)
  - Escape key listener via `useEffect`
  - `document.body.style.overflow = 'hidden'` while open
  - An inner card with `maxWidth` prop, `maxHeight: calc(100vh - 48px)`,
    `display: flex; flex-direction: column`
  - A `ModalHeader` export with: eyebrow label, title, close (×) button,
    optional back (‹) button, optional step/totalSteps progress bar

- [ ] **7.** Create `components/DynamicIcon.tsx` that accepts `name: string` and
  maps it to the correct `lucide-react` icon. The icons actually used are:
  `ArrowRight`, `Car`, `Check`, `MapPin`, `Navigation`, `Phone`, `File`,
  `UploadCloud`, `Wrench`, `Droplets`, `AlertTriangle`, `CircleSlash`,
  `Circle`, `Thermometer`, `Volume2`, `Wind`, `Flame`, `Zap`, `Settings`,
  `Battery`, `InboxIcon`, `ClipboardList`, `BadgeCheck`, `CheckCircle`,
  `ChevronLeft`, `X`

---

### Phase 4 — Track My Car modal (Oil Change)

- [ ] **8.** Create `components/TrackMyCarModal.tsx` as a `'use client'` component.
- [ ] **9.** Add a `flow` state variable typed as a union:
  `'choose' | 'oil-lookup' | 'oil-active' | 'oil-ready' | 'repair-lookup' | 'repair-status'`.
  Initial value: `'choose'`.
- [ ] **10.** Add state: `lookup { plate, phone }`, `remaining: number`,
  `totalSeconds: number`, `adjustmentMins: number`, `loading: boolean`,
  `lookupError: string`.
- [ ] **11.** Implement `handleOilLookup()`:
  - `POST ${NEXT_PUBLIC_DASHBOARD_API_URL}/api/oil-changes/track`
  - Body: `{ shop_id, license_plate: lookup.plate, phone: lookup.phone }`
  - On `404`: set `lookupError`
  - On success: if `record.status === 'ready'` → `setFlow('oil-ready')`
  - Otherwise calculate:
    ```ts
    const eta   = new Date(record.started_at).getTime()
                + (record.estimated_minutes + record.adjustment_minutes) * 60000;
    const secs  = Math.max(0, Math.floor((eta - Date.now()) / 1000));
    const total = (record.estimated_minutes + record.adjustment_minutes) * 60;
    ```
    then `setRemaining(secs)`, `setTotalSeconds(total || 2700)`,
    `setAdjustmentMins(record.adjustment_minutes ?? 0)`,
    `setFlow('oil-active')`
- [ ] **12.** Add a `useEffect` that runs a `setInterval` decrementing `remaining`
  by 1 every 1000 ms when `flow === 'oil-active'`. Clear on cleanup.
- [ ] **13.** Build the `CountdownRing` SVG component:
  - Size 240×240, stroke 14, radius `(240-14)/2`
  - Background circle: grey stroke
  - Progress circle: gold stroke, `strokeDasharray="${c * pct} ${c * (1-pct)}"`
    where `pct = 1 - remaining / totalSeconds`
  - Centre text: HH:MM:SS derived from `remaining`
- [ ] **14.** Show the `adjustmentMins` banner:
  - `< 0` → green "ready early" note
  - `> 0` → red "delayed" note
- [ ] **15.** Build the `'oil-ready'` screen: green checkmark, "Get Directions"
  (Google Maps link), "Call the Shop" (`tel:` link).
- [ ] **16.** Add reset logic in a `useEffect` on `open`: when `open` becomes
  `false`, reset all state (with a 250 ms delay so the close animation plays).

---

### Phase 5 — Track My Car modal (Service Repair)

- [ ] **17.** In the same `TrackMyCarModal.tsx`, add state:
  `repairLookup { ticket, phone }`, `ticketResult`, `repairError`.
- [ ] **18.** Implement `handleRepairLookup()`:
  - Build `URLSearchParams`: `{ ticket_number, phone, shop_id }`
  - `GET ${NEXT_PUBLIC_DASHBOARD_API_URL}/api/tickets/status?${params}`
  - On `404`: set `repairError`
  - On success: `setTicketResult(json.data ?? json)`, `setFlow('repair-status')`
- [ ] **19.** Build the `repair-lookup` form: Ticket Number input (monospace,
  auto-uppercase) + Phone input.
- [ ] **20.** Build the `<LiveRepairStatus>` component:
  - Ticket header card (monospace ticket number)
  - `STATUS_MAP` lookup: `new | reviewing | in_repair | ready | completed`
    → human-readable label + lucide icon name
  - Status card (dark navy background, gold left border, icon + label)
  - Optional shop notes block (yellow tint, gold left border)
  - Shop footer (address + phone)

---

### Phase 6 — Schedule Service wizard

- [ ] **21.** Create `components/ServiceRequestWizard.tsx` as `'use client'`.
- [ ] **22.** Add state: `step: 1–5`, `issues: string[]`, `car { make, model, year }`,
  `files[]`, `contact { name, phone, email, method, notes }`,
  `ticket: string`, `submitLoading: boolean`, `submitError: string`.
- [ ] **23.** Step 1 — Issue picker: render 13 toggle-button cards using
  `issueOptions`. Each card shows a lucide icon + label. Selected state
  highlighted with gold border / gold background. Show selected count in footer.
  "Continue" disabled until at least one issue selected.
- [ ] **24.** Step 2 — Vehicle: Make (text), Model (text), Year (number 1950–2026).
  "Continue" always enabled (fields are optional).
- [ ] **25.** Step 3 — File upload (UI only):
  - Drag-and-drop zone + hidden `<input type="file" multiple accept="image/*,video/*">`
  - Store file metadata (`name`, `size`, `type`) in `files` state for display
  - **Do not POST files to the API** — this step is informational only
  - "Skip" and "Continue" both advance to step 4
- [ ] **26.** Step 4 — Contact form: Full Name (full-width), Phone, Email,
  Preferred Contact toggle (`phone` / `email`), Notes textarea.
- [ ] **27.** Implement `submit()`:
  ```ts
  POST /api/tickets
  Body: {
    shop_id, customer_name, customer_phone, customer_email,
    license_plate: '',
    car_make, car_model, car_year,
    issues,     // string[]
    notes
  }
  Response: { ticket_number }
  ```
  On success: `setTicket(data.ticket_number)`, `setStep(5)`.
  On failure: `setSubmitError('Something went wrong, please try again.')`.
- [ ] **28.** Step 5 — Confirmation screen:
  - Animated gold checkmark circle
  - Heading "We've got your request."
  - Ticket number in a monospace pill badge (`data.ticket_number`)
  - "What happens next?" 3-step numbered list
  - Google Maps link to shop address
  - "Done" button calls `onClose()`
- [ ] **29.** Add reset logic: on `open → false`, reset all state after 250 ms delay.

---

### Phase 7 — Trigger points

- [ ] **30.** In your root page (or layout), lift two pieces of boolean state:
  `scheduleOpen` and `trackOpen`.
- [ ] **31.** Pass `() => setScheduleOpen(true)` and `() => setTrackOpen(true)`
  as props to any component that has a "Schedule Service" or "Track My Car"
  button (Navbar, Hero, etc.).
- [ ] **32.** Mount both modals at the bottom of the root layout:
  ```tsx
  <ServiceRequestWizard open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
  <TrackMyCarModal      open={trackOpen}    onClose={() => setTrackOpen(false)} />
  ```
- [ ] **33.** In `Navbar`, wire the two buttons:
  ```tsx
  <button onClick={onTrack}>TRACK MY CAR</button>
  <button onClick={onSchedule}>SCHEDULE SERVICE</button>
  ```
- [ ] **34.** In `HeroSection`, wire the hero CTA:
  ```tsx
  <button onClick={onSchedule}>SCHEDULE SERVICE</button>
  ```

---

### Phase 8 — Final checks

- [ ] **35.** Verify `.env.local` is in `.gitignore` (it is by default in Next.js).
- [ ] **36.** On the deployment platform (Vercel, etc.), add the two env vars as
  **build-time** environment variables:
  - `NEXT_PUBLIC_SHOP_ID`
  - `NEXT_PUBLIC_DASHBOARD_API_URL`
- [ ] **37.** Test the `/admin` redirect: visiting `/admin` should issue a 307 to
  `https://auto-repair-dashboard.vercel.app/login`.
- [ ] **38.** Test the Oil Change flow end-to-end: submit a known plate/phone, confirm
  the countdown ring appears and counts down.
- [ ] **39.** Test the Service Repair flow: submit a known ticket number/phone,
  confirm the status card renders with the correct label.
- [ ] **40.** Test the Schedule Service wizard: complete all 4 steps, submit, confirm
  a ticket number appears on the confirmation screen.

---

*Last updated: 2026-05-24*
