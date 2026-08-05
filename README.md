# Shrandha Labs

Production website + admin panel for Shrandha Labs, an internship-program EdTech company.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Google Sheets (via Google Apps Script) as the database.

---

## What's included

- **Public site** — Home, About, Courses (10 tracks), Internship, Testimonials, FAQ, Register, Contact, Privacy Policy, Terms. Dark glassmorphism theme, scroll-reveal animations, mobile responsive, SEO metadata + schema markup + sitemap/robots.
- **Registration flow** — 5-step form (Personal → Academic → Program → Payment → Review) that uploads the resume (PDF) and payment screenshot straight to Google Drive and writes a row to Google Sheets, then emails the student a confirmation and emails you a notification.
- **Admin panel** — `/admin/login` → `/admin/dashboard`. Stats (total, today, course-wise), searchable/filterable student table, approve/reject/status change, inline edit, delete, Export to Excel, Export to PDF.
- **Backend** — a single Google Apps Script (`apps-script/Code.gs`) that is the entire API: it reads/writes the Sheet, saves files to Drive, and sends emails. No other database is used, per spec.

## Project structure

```
shrandha-labs/
├── src/
│   ├── app/                # pages (App Router)
│   │   ├── admin/          # admin login + dashboard (protected by middleware)
│   │   ├── api/admin/      # server routes: login, logout, students proxy
│   │   ├── register/       # multi-step registration form
│   │   └── ...              # about, courses, internship, faq, contact, etc.
│   ├── components/         # Navbar, Footer, Loader, Knot (brand motif), ui.tsx
│   ├── lib/                # data.ts (courses/testimonials/faq), session.ts, types.ts
│   └── middleware.ts        # protects /admin/dashboard
├── apps-script/
│   └── Code.gs              # the entire backend — paste into Google Apps Script
├── public/images/logo.png
└── .env.example
```

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in the values — see DEPLOYMENT.md
npm run dev
```

Visit `http://localhost:3000`. Admin panel at `/admin/login`.

## Environment variables

See `.env.example` for the full list. In short:

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | browser | Registration form posts directly here |
| `APPS_SCRIPT_URL` | server | Admin API proxy calls here |
| `APPS_SCRIPT_SECRET` | server | Must match `API_SECRET` Script Property in Apps Script |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | server | Admin panel login |
| `SESSION_SECRET` | server | Signs the admin session cookie |

## Deployment

Full step-by-step (Google Sheet setup, Apps Script deployment, Vercel deployment) is in **`DEPLOYMENT.md`**.

## Notes on scope

- Payment is **screenshot-upload based**, matching the spec — there's no payment gateway integration. If you want automatic verification, swap this for Razorpay/Instamojo later; the Sheet's `Status` column already supports an approval workflow for manual verification in the meantime.
- Admin credentials are single-user (one email/password pair via env vars), matching "Admin Login" in the spec. For multiple admins, move credentials into the Sheet and check against a hashed column.
- The Google Fonts (Bricolage Grotesque, IBM Plex Sans/Mono) are fetched at build time — this needs outbound internet access during `next build`, which any standard host (Vercel, Netlify, etc.) has.
