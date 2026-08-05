# Deployment Guide

Three parts: (1) Google Sheet + Apps Script backend, (2) environment variables, (3) hosting the Next.js app.

---

## 1. Google Sheet + Apps Script backend

1. Go to **sheets.google.com** and create a new spreadsheet. Name it e.g. "Shrandha Labs — Registrations".
   - You don't need to create the header row yourself — the script creates a `Registrations` sheet/tab with headers automatically the first time it runs.
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the default `Code.gs` content and paste in the full contents of `apps-script/Code.gs` from this project.
4. Set your secrets: in the Apps Script editor, go to **Project Settings (gear icon) → Script Properties → Add script property**, and add:
   - `API_SECRET` — a long random string (this must match `APPS_SCRIPT_SECRET` in your `.env`).
   - `ADMIN_NOTIFY_EMAIL` — the email address that should get "new registration" notifications (defaults to your Google account email if omitted).
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize the requested permissions (Sheets, Drive, Gmail send) when prompted.
6. Copy the **Web app URL** (ends in `/exec`). This is your `NEXT_PUBLIC_APPS_SCRIPT_URL` / `APPS_SCRIPT_URL`.

**Re-deploying after editing the script:** Apps Script Web App URLs stay the same across deployments as long as you use **Deploy → Manage deployments → Edit (pencil) → New version**, rather than creating a brand-new deployment each time.

Drive files are saved under a folder called **"Shrandha Labs — Registrations"** in the Drive of whichever account you deployed as, in `Resumes` and `Payment Screenshots` subfolders, and are set to "Anyone with the link can view" so admin/mentors can open them from the dashboard.

## 2. Environment variables

Copy `.env.example` to `.env.local` (for local dev) and fill in real values. For production hosting, add the same variables in your host's dashboard (see below) — never commit `.env.local`.

Generate strong random secrets for `APPS_SCRIPT_SECRET` and `SESSION_SECRET`, e.g.:
```bash
openssl rand -hex 32
```

## 3. Hosting the Next.js app (Vercel — recommended)

1. Push this project to a GitHub repository.
2. Go to **vercel.com → New Project**, import the repo.
3. Framework preset: Next.js (auto-detected).
4. Add the environment variables from `.env.example` in **Settings → Environment Variables** (Production + Preview).
5. Deploy. Vercel gives you a `*.vercel.app` URL immediately; add your custom domain (e.g. `shrandhalabs.com`) under **Settings → Domains**.

Any other Node-capable host (Netlify, Render, a VPS with `next start`) works the same way — just make sure the environment variables are set and outbound internet access is available at build time (for Google Fonts).

## 4. Post-deploy checklist

- [ ] Submit a test registration on `/register` — confirm the row appears in the Sheet and both emails arrive.
- [ ] Log into `/admin/login` with your `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- [ ] Confirm the dashboard loads the test registration, and that Approve/Reject, Edit, Delete, Export Excel, and Download PDF all work.
- [ ] Update the placeholder phone number, WhatsApp link, email, and social links (`Navbar`/`Footer`/`Contact` components use `+91 90000 00000` and `hello@shrandhalabs.com` as placeholders — swap for your real details).
- [ ] Update the UPI ID shown on the Payment step of `/register` (currently `shrandhalabs@upi`).
