# Cabinet Dentaire Rive Droite — Next.js App

What changed & why
- Removed direct Postgres/Prisma. All data access now uses the Supabase JS client only.
- Deleted unused deps and scripts. Added Prettier, ESLint (flat config), Vitest.
- Centralized API calls for testimonials. Replaced console logs with a tiny logger.

## Quickstart (5 minutes)

1) Prerequisites
- Node.js 20+ and pnpm 9 (Corepack auto-activates in the devcontainer)

2) Install
```bash
pnpm install
```

3) Configure environment
- Copy `.env.example` to `.env.local` and fill in values:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only, recommended for API routes)

4) Run
```bash
pnpm dev
```

5) Test & lint
```bash
pnpm test      # run tests
pnpm lint      # eslint
pnpm format    # prettier write
pnpm typecheck # TS type checks
```

## Required Environment Variables (names only)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

## Develop
- Code lives under `src/` with a small, conventional layout.
- Avoid direct DB access. Use `/api/*` routes (server) and `src/lib/api/*` (client helpers).
- Keep components presentational and pure; side-effects in hooks or API layer.

## Build
```bash
pnpm build
pnpm start
```

## Deploy
- Set env vars in your host (e.g., Vercel Project Settings):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Deploy as a standard Next.js app.

## Project Structure

```
src/
  app/                 # Next.js App Router pages & API routes
    api/testimonials   # Testimonials API (Supabase server client)
    testimonials       # Testimonials page (client)
  components/          # UI components
  lib/                 # Framework-agnostic utilities
    api/               # Client-side API helpers
    logger.ts          # Tiny logger wrapper
    supabaseServer.ts  # Server-side Supabase client
public/                # Static assets
```

One-line purposes
- `src/app/*`: Pages & routes, no cross-cutting utilities.
- `src/lib/*`: Pure utilities, shared logic, no DOM.
- `src/components/*`: Presentational UI components only.
- `src/lib/api/*`: Centralized fetch helpers for client-side code.

## Code Style & Tooling
- ESLint flat config (Next+TS). Run `pnpm lint`.
- Prettier with simple rules. Run `pnpm format`.
- TypeScript strict-ish settings; keep types approachable.
- Vitest for unit and example component tests.

## Tests
- Unit test example: `src/lib/__tests__/date.test.ts`
- Component test example: `src/components/__tests__/header.test.tsx`

## Notes on Data & Security
- No direct Postgres connections. Use Supabase JS only.
- Never put `SUPABASE_SERVICE_ROLE_KEY` in client code; keep it server-side.
- For public inserts (e.g., testimonials), either:
  - add RLS policies for `insert` on `public.testimonials`, or
  - set `SUPABASE_SERVICE_ROLE_KEY` for server routes to bypass RLS safely.

