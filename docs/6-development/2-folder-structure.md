# Folder Structure

> **Purpose**
>
> This document defines the standard project directory structure, folder organization, naming conventions, ownership, and responsibilities for the entire codebase. It ensures consistency, maintainability, scalability, and easier navigation for developers and AI coding assistants.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Repository Type | Monorepo (frontend + backend + docs) |
| Primary Languages | TypeScript |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

A single monorepo holds `backend/` (Express + Prisma), `frontend/` (React + Vite), and `docs/`.
Each module (Request Intake, Task Workbench, Projects 360, Executive Dashboard, Reports,
Settings & Administration) gets its own controller/service/repository trio on the backend and
its own page/component folder on the frontend, mirroring `docs/5-modules/`.

---

# 2. Objectives

- Be easy to understand for a 2-developer team.
- Keep each of the six modules' backend and frontend code easy to locate against its docs.
- Minimize nesting — flat enough to navigate quickly under a 5-week timeline.

---

# 3. Design Principles

- Layered backend: controller → service → repository, matching `1-project/4-tech-stack.md`.
- Feature-oriented frontend: one folder per module under `pages/`, shared UI in `components/`.
- One-to-one naming between `docs/5-modules/<module>/` and the corresponding backend/frontend
  module folders, so any developer or AI assistant can find the spec for a given piece of code.

---

# 4. Repository Structure

```text
legacy-lighting-p360/
│
├── backend/
├── frontend/
├── docs/
├── tests/
├── .github/
│   └── workflows/
├── .env.example
└── README.md
```

- `backend/` — Express + Prisma API
- `frontend/` — React + Vite SPA
- `docs/` — this documentation set
- `tests/` — Playwright end-to-end tests (unit/integration tests live alongside their code in
  `backend/`/`frontend/`)
- `.github/workflows/` — CI/CD pipeline definitions (see `9-ci-cd.md`)

---

# 5. Backend Structure

```text
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── modules/
│   │   ├── request-intake/
│   │   │   ├── request-intake.controller.ts
│   │   │   ├── request-intake.service.ts
│   │   │   ├── request-intake.repository.ts
│   │   │   └── request-intake.schema.ts   (Zod validation)
│   │   ├── task-workbench/
│   │   ├── projects-360/
│   │   ├── executive-dashboard/
│   │   ├── reports/
│   │   └── settings-administration/
│   ├── integrations/
│   │   ├── netsuite/
│   │   └── onedrive/
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── rbac.ts
│   ├── shared/
│   │   ├── activity-log.ts
│   │   └── response.ts
│   ├── routes.ts
│   └── server.ts
└── tests/
    ├── unit/
    └── integration/
```

Each `modules/<name>/` folder maps 1:1 to `docs/5-modules/<name>/`. `integrations/` holds the
NetSuite and OneDrive read-only client code (cross-cutting, per
`docs/1-project/3-feature-breakdown.md` Feature Mapping). `middleware/rbac.ts` enforces the
permission matrices defined in each module's `7-permissions.md`.

---

# 6. Frontend Structure

```text
frontend/
├── src/
│   ├── pages/
│   │   ├── request-intake/
│   │   ├── task-workbench/
│   │   ├── projects-360/
│   │   ├── executive-dashboard/
│   │   ├── reports/
│   │   └── settings-administration/
│   ├── components/        (shared UI, per docs/4-ui/4-component-standards.md)
│   ├── hooks/              (shared React hooks)
│   ├── api/                (fetch wrapper + TanStack Query hooks, one file per module)
│   ├── layouts/
│   ├── router/
│   ├── styles/             (Tailwind config, global styles)
│   └── types/
├── public/
└── tests/
```

`pages/<module>/` mirrors the backend module folders and `docs/5-modules/<module>/9-ui.md`.

---

# 7. Documentation Structure

```text
docs/
├── 1-project/
├── 2-database/
├── 3-api/
├── 4-ui/
├── 5-modules/
│   ├── request-intake/
│   ├── task-workbench/
│   ├── projects-360/
│   ├── executive-dashboard/
│   ├── reports/
│   └── settings-administration/
└── 6-development/
```

Already scaffolded — see `docs/README.md` and `docs/APPLICABILITY.md`.

---

# 8. Shared Libraries

No separate `shared/` package is needed at this project's size — `backend/src/shared/` and
`frontend/src/components/` + `frontend/src/hooks/` cover cross-module reuse without the
overhead of a monorepo package-workspace setup.

---

# 9. Asset Organization

Frontend static assets (icons, images) live in `frontend/public/` and `frontend/src/assets/`.
No user-uploaded assets exist in MVP (documents stay in OneDrive, link-only).

---

# 10. Configuration Files

```text
.env.example              # root-level, documents required vars for both apps
backend/.env
backend/prisma/schema.prisma
backend/tsconfig.json
frontend/.env.local
frontend/tsconfig.json
frontend/vite.config.ts
frontend/tailwind.config.ts
```

---

# 11. Scripts Organization

No dedicated `scripts/` directory — each app's `package.json` scripts (`dev`, `build`, `test`,
`lint`, `typecheck`) cover the project's needs at this size. Prisma's CLI (`npx prisma migrate`,
`npx prisma db seed`) handles database scripting.

---

# 12. Testing Structure

```text
backend/tests/
├── unit/            (Vitest, one file per service/repository)
└── integration/     (Supertest, one file per module's API)

frontend/tests/
└── unit/            (Vitest, component/hook tests)

tests/
└── e2e/             (Playwright, one spec per module's key flow)
```

Naming: `<name>.test.ts` for unit/integration, `<flow-name>.spec.ts` for Playwright.

---

# 13. Naming Conventions

- kebab-case for folders and files (`request-intake/`, `task-workbench.service.ts`)
- Module folder names match `docs/5-modules/` exactly, both backend and frontend
- No abbreviations beyond the project's own established ones (e.g. `rbac`)

---

# 14. Dependency Rules

```
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma Client
```

Controllers never call Prisma directly; services never import Express types; repositories
contain no business logic (per `docs/3-api/7-api-development-standards.md` Section 5, Layer
Responsibilities).

---

# 15. Module Organization

Standard shape for every backend module (see Section 5); standard shape for every frontend
module page folder:

```text
pages/<module>/
├── <Module>ListPage.tsx (or equivalent primary screen)
├── components/           (module-specific components, not shared)
└── <module>.queries.ts   (TanStack Query hooks for this module's API)
```

---

# 16. Generated Files

Excluded from version control: `node_modules/`, `dist/`/`build/`, `.env`, Prisma's generated
client output, test coverage reports, Playwright's `test-results/`.

---

# 17. Version Control Guidelines

Commit: source code, `prisma/schema.prisma` and `prisma/migrations/`, `.env.example`,
`package.json`/lockfiles, docs. Ignore everything in Section 16, plus IDE-specific folders.

---

# 18. Review Checklist

- New module folders follow the standard shape (Section 5/6/15)
- No business logic in controllers or repositories
- Docs folder name matches the code module folder name exactly
- No secrets committed

---

# 19. Best Practices

- Keep the controller→service→repository chain unbroken — no shortcuts under deadline pressure.
- Match module folder names to `docs/5-modules/` exactly so navigation stays predictable.
- Keep shared code in `shared/`/`components/`, not duplicated per module.

---

# 20. Assumptions

- The stack in `1-project/4-tech-stack.md` (Express, Prisma, React+Vite) is confirmed and
  stable for the duration of the build.

---

# 21. Constraints

- kebab-case folder names.
- Module folder names must match `docs/5-modules/` exactly.
- No monorepo package-workspace tooling (Nx/Turborepo) — unnecessary overhead at this scale.

---

# 22. Related Documents

- `1-project/4-tech-stack.md`
- `1-development-environment.md`
- `3-coding-standards.md`
- `docs/5-modules/`

---

# 23. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, aligned to confirmed tech stack and module list |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Technical Lead | | Pending | |

---

# AI Generation Notes

Keep module folder names identical to `docs/5-modules/` folder names — this is what makes the
docs-to-code mapping useful.
