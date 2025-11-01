# Theater Community Manager (MVP)

**What it is:** Multi-tenant app for improv theaters to build lineups, invite performers, and send confirmations.

**Demo script (2 min):**

1. Log in with GitHub
2. Switch to “Focus Theater”
3. Open **Shows → Friday 8pm**
4. Drag performers into lineup slots → Save
5. Click “Send reminder to lineup”

## Tech

- Next.js App Router, React 19, Tailwind v4
- Auth: <TBD>
- DB: <TBD> (Postgres)
- ORM: Prisma
- Email: Resend

## Getting started

1. Copy `.env.example` → `.env` and fill values
2. `pnpm i`
3. `pnpm db:push && pnpm db:seed`
4. `pnpm dev` → http://localhost:3000
