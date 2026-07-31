# Ora Tulum — CRM Demo

Clickable preview of the Ora Tulum command center (Owner Dashboard + module map).
Built in the real product stack so it becomes the seed of the delivered CRM — not a throwaway mockup.

## Stack
Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · lucide-react.
Fonts: Fraunces (display) · DM Sans (UI) · DM Mono (labels).

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy (for the client to click on their phone)
Push to GitHub, import in Vercel → live staging URL. Mobile-first by design.

## What's live in the demo
- **Command** (Owner Dashboard) — full screen: revenue, occupancy, outstanding balances, new inquiries, AI concierge performance.
- **Leads · Reservations · Concierge · Staff** — module previews (built out during the project).
- **Payments · SOPs · Settings** — marked "soon" in the nav to show the full scope.

Data in `src/lib/mock.ts` is seeded demo data (Ora rooms, ceremonies, sample leads) — not wired to a database.
