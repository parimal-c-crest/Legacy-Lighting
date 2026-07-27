# Development Environment

> **Purpose**
>
> This document defines the standard development environment, required software, tooling, installation procedures, configuration guidelines, and development workflow for the project. It ensures every developer and AI coding assistant works in a consistent, reproducible environment, minimizing setup issues and improving productivity.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Development Platforms | Windows / macOS / Linux |
| Environment Type | Local Development |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

Node.js + TypeScript backend (Express, Prisma) and a React + Vite frontend, both run locally
against a natively installed local PostgreSQL instance — no Docker (confirmed 2026-07-27). No
containerization is required anywhere in this project; Vercel/Render handle deployment without
containers, and local Postgres runs as a native OS service on each developer's machine.

---

# 2. Objectives

- Be easy to install (single `npm install` per app).
- Be reproducible across the 2 developers' machines.
- Minimize "works on my machine" issues via a pinned Node version and consistent local PostgreSQL major version.
- Match production closely enough that Prisma migrations behave the same locally and on Render.

---

# 3. Supported Platforms

| Platform | Supported | Notes |
|----------|-----------|------|
| Windows | ✔ | Native PostgreSQL service (verified: 18.4) — no WSL2/Docker required |
| macOS | ✔ | Native |
| Linux | ✔ | Native |
| WSL2 | ✔ | Recommended for Windows developers |

---

# 4. Minimum Hardware Requirements

| Resource | Minimum | Recommended |
|----------|----------|-------------|
| CPU | 2 cores | 4 cores |
| Memory | 8 GB | 16 GB |
| Disk Space | 5 GB free | 15 GB free |
| Internet | Required (NetSuite/OneDrive sandbox access) | Broadband |

---

# 5. Required Software

| Software | Version | Required |
|----------|---------|----------|
| Git | latest | ✓ |
| Node.js | 20.x LTS | ✓ |
| NPM | bundled with Node 20 | ✓ |
| PostgreSQL (native install, not Docker) | 16.x+ | ✓ |
| PostgreSQL Client (psql) | bundled with PostgreSQL install | ✓ |
| VS Code | latest | Recommended |

---

# 6. Repository Setup

```bash
git clone <repository-url>
cd legacy-lighting-p360
git checkout main
```

Branch strategy: `main` (production), `staging`, feature branches — see
`docs/6-development/4-git-workflow.md`.

---

# 7. Project Structure

```text
legacy-lighting-p360/
├── backend/
├── frontend/
├── docs/
├── tests/
├── .env.example
└── README.md
```

See `docs/6-development/2-folder-structure.md` for the full backend/frontend layout.

---

# 8. Dependency Installation

Backend

```bash
cd backend
npm install
npx prisma generate
```

Frontend

```bash
cd frontend
npm install
```

---

# 9. Environment Configuration

```
backend/.env
frontend/.env.local
```

Required variables (backend): `DATABASE_URL`, `JWT_SECRET`, `NETSUITE_*` (sandbox
credentials), `MS_GRAPH_*` (OneDrive credentials), `EMAIL_PROVIDER_API_KEY` (Resend).

Local database name: **`claude_legacy_lighting`**. Local dev connection string:

```
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/claude_legacy_lighting"
```

The database does not need to be created manually — `npx prisma migrate dev` creates it
automatically on first run if it doesn't already exist (Prisma issues a `CREATE DATABASE` using
the connecting role's privileges before applying migrations). Staging/production databases on
Render are provisioned by Render itself and named per Render's convention, not this name.

Required variables (frontend): `VITE_API_BASE_URL`.

Secrets are never committed — `.env.example` files list required keys with placeholder values.
In deployed environments (Vercel/Render), secrets are set via the provider's environment
variable UI, not files.

---

# 10. Local PostgreSQL (no Docker)

Local development uses a natively installed PostgreSQL server, not a Docker container —
confirmed 2026-07-27. Each developer installs PostgreSQL directly (verified working: PostgreSQL
18.4, running as a Windows service on port 5432). No `docker-compose.yml` for the database is
needed; remove/skip that step if it appears in older setup notes.

The `claude_legacy_lighting` database itself does not need manual creation — see Section 9
(Prisma creates it automatically on first migration).

---

# 11. Database Setup

```bash
cd backend
npx prisma migrate dev     # creates claude_legacy_lighting if missing, then applies migrations
npx prisma db seed         # load master data + reference seed values
```

Reset: `npx prisma migrate reset` (drops and recreates `claude_legacy_lighting`).

---

# 12. Running the Application

Backend

```bash
cd backend
npm run dev
```

Frontend

```bash
cd frontend
npm run dev
```

Full stack: run both commands in separate terminals (no combined orchestration script needed at
this team size).

---

# 13. Development Workflow

```
Pull latest code
        ↓
npm install (if package.json changed)
        ↓
npx prisma migrate dev (if schema changed)
        ↓
Start backend + frontend dev servers
        ↓
Develop
        ↓
Run tests (npm test)
        ↓
Commit
```

---

# 14. Code Quality Tools

- ESLint (backend and frontend) — `npm run lint`
- TypeScript compiler in strict mode — `npm run typecheck`
- Prettier (formatting) — run via ESLint integration or pre-commit hook

---

# 15. Debugging

- VS Code debugger attached to the Node.js backend process
- Browser DevTools for the React frontend
- Prisma Studio (`npx prisma studio`) for direct database inspection
- Winston/Morgan logs in the terminal during local development

---

# 16. Testing Environment

- Unit tests: Vitest, run against a test-only Prisma schema/database
- Integration tests: Supertest against the Express app, using a disposable test database
- End-to-end tests: Playwright against a locally running full stack
- Test fixtures: seeded via the same Prisma seed pattern as local dev, scoped to test data

---

# 17. Development Utilities

- `npm run` scripts in each app's `package.json` cover lint/typecheck/test/build — no separate
  Makefile or task runner needed given the project's size.

---

# 18. Security Guidelines

- Never commit secrets — `.env` files are gitignored.
- Use environment variables for all credentials (NetSuite, OneDrive, JWT secret, email provider).
- Rotate NetSuite/OneDrive sandbox credentials if exposed.
- Keep dependencies updated (`npm audit` as part of Milestone reviews).

---

# 19. Troubleshooting

| Problem | Cause | Solution |
|----------|-------|----------|
| Prisma migration fails locally | Local Postgres container not running | `docker compose up -d`, retry |
| 401 on all API calls | Missing/expired JWT | Re-login; check `JWT_SECRET` matches between restarts |
| NetSuite sync fails locally | Sandbox credentials not set in `.env` | Set `NETSUITE_*` vars per `.env.example` |

---

# 20. Maintenance

- Update dependencies during each milestone review, not ad hoc mid-sprint.
- Update local PostgreSQL installs only alongside a deliberate, team-wide version bump.
- Reset local environment via `npx prisma migrate reset` when schema drift is suspected.

---

# 21. Onboarding Checklist

- [ ] Repository cloned
- [ ] Node 20 LTS installed
- [ ] Backend and frontend dependencies installed
- [ ] `.env` files configured from `.env.example`
- [ ] Local PostgreSQL service running natively; `claude_legacy_lighting` migrated
- [ ] Backend and frontend dev servers start successfully
- [ ] Tests pass (`npm test` in both apps)
- [ ] Linting passes (`npm run lint`)

---

# 22. Best Practices

- Keep local environments close to production (same Node/Postgres major versions).
- Use `.env.example` as the source of truth for required configuration.
- Keep tooling versions pinned (Node 20 LTS, Postgres 16) across both developers' machines.
- Verify the onboarding checklist before starting feature work.

---

# 23. Assumptions

- Both developers have PostgreSQL installed natively (verified on this machine: 18.4, no Docker).
- NetSuite/OneDrive sandbox credentials are available before Milestone 2 backend work begins.

---

# 24. Constraints

- Node 20 LTS and PostgreSQL 16 are the approved versions (see `1-project/4-tech-stack.md`).
- Secrets must never be stored in source control.

---

# 25. Related Documents

- `1-project/4-tech-stack.md`
- `2-folder-structure.md`
- `3-coding-standards.md`
- `4-git-workflow.md`
- `docs/2-database/3-migration-strategy.md`

---

# 26. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, filled against confirmed tech stack |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Technical Lead | | Pending | |

---

# AI Generation Notes

Keep commands and versions in sync with `1-project/4-tech-stack.md` — update both together if
the stack changes.
