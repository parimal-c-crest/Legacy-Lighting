# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This repository is currently **documentation-only** — no `backend/`, `frontend/`, or
`package.json` exists yet. Everything under `docs/` is the approved specification for an MVP
that has not been implemented. Do not assume code exists; check before referencing paths like
`backend/src/...` as if they were real.

- `Project Req Doc/` — original source documents: the BRD (`.docx`) and Project Plan (`.pdf`)
- `lovable-screen/` — six screenshots of the actual live Lovable UI prototype (Executive
  Dashboard, Project Intake, All Projects, Reports, Settings, Estimator Workbench). Treat these
  as ground truth for UI/field details that aren't in the text documents.
- `docs/` — the full specification (see below). This is the source of truth for any
  implementation work, not the BRD/PDF directly — the docs already reconcile the two.

## Project

Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP). Centralizes
request intake, task management, project visibility, executive dashboards, and reporting for
Legacy Lighting, replacing fragmented use of Outlook, NetSuite, OneDrive, and a project
planner. 5-week delivery, 2 full-stack developers, 400 hours total.

## Where to look first

- `docs/1-project/2-requirements.md` — **read the "Source Document Reconciliation" section
  before touching anything ambiguous.** The BRD and Project Plan disagree or under-specify in
  several places (NetSuite/OneDrive integration timing, the new-project-on-intake field,
  Location/State modeling, file upload scope, and more found from the Lovable screenshots).
  Every one of those has an explicit, dated resolution there — don't re-litigate them or invent
  a different answer.
- `docs/1-project/4-tech-stack.md` — the confirmed technology stack (see below).
- `docs/2-database/` — schema design, ERD, migration strategy, standards.
- `docs/3-api/` — REST API conventions (response envelope, error format, auth, versioning).
- `docs/4-ui/` — navigation, design system, component/form/accessibility standards.
- `docs/5-modules/<module>/` — one folder per feature module, each with 11 docs
  (`1-module.md` business spec through `11-testing.md`). This is the primary spec to implement
  against for any feature work. The six modules: `request-intake`, `task-workbench`,
  `projects-360`, `executive-dashboard`, `reports`, `settings-administration`.
- `docs/6-development/` — dev environment, folder structure, coding/git standards, deployment,
  CI/CD, and the **milestone plan** (`11-milestone-plan.md`) and **sprint plan**
  (`12-sprint-plan.md`).

## Confirmed tech stack

Full detail and rationale in `docs/1-project/4-tech-stack.md`. Summary:

- **Backend:** Node.js + TypeScript, Express.js, Prisma ORM, Zod validation, JWT auth (bcrypt),
  Winston/Morgan logging
- **Frontend:** React + TypeScript, Vite, Tailwind CSS + shadcn/ui, React Router, TanStack Query
  — extends the existing Lovable-generated UI, doesn't replace it
- **Database:** PostgreSQL, installed **natively** (no Docker, confirmed) — local database name
  is `claude_legacy_lighting`, auto-created by `npx prisma migrate dev` on first run, no manual
  `CREATE DATABASE` step
- **Hosting:** Vercel (frontend) + Render (backend API + managed PostgreSQL) — chosen because
  the team has no dedicated DevOps role
- **Testing:** Vitest (unit), Supertest (API integration), Playwright (E2E)

## Planned commands (once code exists)

From `docs/6-development/1-development-environment.md` — these are the documented plan, not
yet runnable:

```bash
# Backend
cd backend && npm install && npx prisma generate
npx prisma migrate dev     # creates claude_legacy_lighting if missing, applies migrations
npx prisma db seed
npm run dev
npm test                   # Vitest unit + Supertest integration
npm run lint
npm run typecheck

# Frontend
cd frontend && npm install
npm run dev
npm test

# E2E (repo root)
npm run test:e2e           # Playwright, per docs/6-development/6-testing-strategy.md
```

## Architecture pattern

Backend: **controller → service → repository → Prisma**, one folder per module under
`backend/src/modules/<module-name>/`, matching `docs/5-modules/<module-name>/` exactly.
Controllers stay thin; business rules live in services; repositories are Prisma-only, no
business logic. Full layout in `docs/6-development/2-folder-structure.md`.

Frontend: one `pages/<module-name>/` folder per module, mirroring the same module names.

RBAC: every module has a `7-permissions.md` with its exact permission matrix — implement
authorization middleware against that, not ad hoc role checks. Five fixed roles: Admin,
Manager, Processor, Estimator, Viewer (no custom roles in MVP).

## Explicitly out of scope for MVP

Confirmed decisions, not oversights — don't add these even though the Lovable screenshots show
them:

- File upload to OneDrive (link-only, no upload)
- Pluggable task-system backends (Microsoft Planner / Monday.com as alternatives)
- Rich threaded chat/mentions on tasks (simple typed notes only)
- Scheduled/pre-computed report generation (on-demand live queries only)
- Flexible multi-role/multi-person task assignment (single Assigned Processor / Assigned
  Estimator fields only)

See `docs/1-project/2-requirements.md` Source Document Reconciliation for the full reasoning
behind each.
