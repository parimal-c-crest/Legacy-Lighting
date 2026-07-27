# Tech Stack

> **Purpose:**  
> This document defines the official technology stack for the project. It specifies the programming languages, frameworks, libraries, development tools, infrastructure, coding patterns, and version requirements that must be followed throughout the project. All developers and AI coding assistants must use this document as the authoritative reference when implementing features.

---

# Document Information

| Property | Value |
|----------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Version | 1.1 |
| Status | Proposed — pending final sign-off with Legacy Lighting |
| Owner | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

> Package/tool choices below were previously marked "confirmed in Milestone 1." They are now
> concrete proposed picks (confirmed by the project owner on 2026-07-27) so implementation isn't
> blocked — chosen for fit with a 2-developer, 5-week, no-dedicated-DevOps team. Still subject to
> final approval alongside the real Milestone 1 session.

---

# 1. Technology Overview

This project is built using a modern full-stack TypeScript architecture.

| Layer | Technology |
|--------|------------|
| Frontend | React 18 + TypeScript, built with Vite (extends existing Lovable-generated UI) |
| Backend | Node.js 20 LTS + TypeScript, Express.js |
| Database | PostgreSQL 16 (managed) |
| ORM | Prisma |
| API | REST |
| Authentication | JWT-based, Role-Based Access Control (RBAC) |
| Cache | None in MVP — not required at target data volumes (NFR-SCALE-001) |
| Queue | None in MVP — manual/synchronous NetSuite sync is sufficient at MVP scope |
| Storage | Cloud-hosted; documents remain in OneDrive (link-only, no upload in MVP) |
| Hosting | Vercel (frontend) + Render (backend API + managed PostgreSQL) |

---

# 2. Backend Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Runtime | Node.js | 20.x LTS |
| Language | TypeScript | 5.x, strict mode enabled |
| Web Framework | Express.js | 4.x |
| ORM | Prisma | 5.x |
| Validation | Zod schemas on all API inputs | 3.x |
| Authentication | jsonwebtoken + bcrypt | latest stable |
| Logging | Winston (app logs), Morgan (request/response logs) | latest stable |

**Rationale:** Express over Fastify/NestJS — smallest learning curve for a 2-developer team on
a 5-week timeline, largest ecosystem for troubleshooting. Prisma over TypeORM — built-in
migration CLI and generated types reduce boilerplate and match the "ORM-native migration
tooling" approach already assumed in `docs/2-database/3-migration-strategy.md`.

---

# 3. Frontend Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | React | 18.x |
| Build Tool | Vite | 5.x |
| Language | TypeScript | 5.x, strict mode enabled |
| Base UI | Existing Lovable-generated UI (`https://legacylighting.nuvistaai.app/`) | — |
| Routing | React Router | 6.x |
| Server State | TanStack Query (React Query) | 5.x |
| Client State | React Context + hooks (no Redux — app state is mostly server-derived) | — |
| HTTP Client | Native `fetch`, thin wrapper for auth headers/error handling | — |
| CSS Framework | Tailwind CSS + shadcn/ui | latest stable |

**Rationale:** Vite + Tailwind + shadcn/ui matches what Lovable-generated projects typically
produce, minimizing rework to align the new screens with the existing UI. TanStack Query
handles server-state caching/refetching needed for the 30-60 second auto-refresh behavior in
Projects 360 and the Executive Dashboard (FR-PROJECTS-004, FR-DASHBOARD-005) without a heavier
state library.

---

# 4. Database

| Component | Technology |
|-----------|------------|
| Database | PostgreSQL 16 (managed instance on Render) |
| ORM | Prisma |
| Migrations | Prisma Migrate |
| Seeding | Prisma seed scripts for reference/master data and the one-time CSV initial load (see `docs/2-database/3-migration-strategy.md`) |

---

# 5. API Standards

| Item | Standard |
|------|----------|
| Architecture | REST |
| Data Format | JSON |
| Authentication | Bearer Token (JWT) |
| Response Format | Standard JSON envelope (see `3-api/5-response-standards.md`) |
| Validation | Zod schemas |
| Pagination | Offset-based (`page`/`page_size`), per `3-api/1-api-design.md` |

> Detailed API conventions are documented in `docs/3-api/`.

---

# 6. Authentication

| Feature | Technology |
|----------|------------|
| Login | Username/email + password |
| Session | JWT, 24-hour expiry, signed with a secret from the hosting provider's environment/secrets store |
| Authorization | RBAC (Admin, Manager, Processor, Estimator, Viewer) |
| Password Hashing | bcrypt (10 rounds) |
| Account Lockout | 5 failed attempts, 15-minute lockout |
| Password Reset | Email-based reset flow (see Section 15, email provider) |

---

# 7. File Storage

| Purpose | Technology |
|----------|------------|
| Project documents | OneDrive (referenced via Microsoft Graph API; link-only, no upload in MVP) |
| Application assets | Vercel's built-in static hosting/CDN for the frontend build |

---

# 8. Background Processing

| Feature | Technology |
|----------|------------|
| NetSuite sync | Manual trigger via API endpoint (`POST /connected-systems/netsuite/sync`); no scheduler needed for MVP scope |
| Scheduler | None in MVP — revisit if Phase 2 requires scheduled sync beyond manual trigger |

---

# 9. Development Tools

| Tool | Purpose |
|------|---------|
| Visual Studio Code | IDE |
| Claude Code | AI-assisted development |
| Git + GitHub | Version control and hosting |
| NPM | Package manager (frontend and backend) |
| Prisma Studio | Local database inspection during development |
| Postman / Bruno | API testing (see `3-api/10-postman-collection.json`) |

---

# 10. Testing Tools

| Tool | Purpose |
|------|---------|
| Vitest | Backend and frontend unit tests |
| Supertest | API integration tests (against the Express app) |
| Playwright | End-to-end testing |

---

# 11. Coding Standards

The project follows:

- TypeScript strict mode across frontend and backend
- ESLint rules enforced (no warnings in production build)
- REST API best practices
- Service/repository-style separation on the backend (Express controllers stay thin; Prisma
  calls live in a repository/service layer, not in controllers)

See `docs/6-development/3-coding-standards.md` for complete details.

---

# 12. Directory Structure

```text
backend/
  src/
    controllers/
    services/
    repositories/
    middleware/
    routes/
    schemas/       (Zod validation schemas)
  prisma/
    schema.prisma
    migrations/
    seed.ts
frontend/
  src/
    pages/
    components/
    hooks/
    api/           (fetch wrapper + React Query hooks)
docs/
tests/
```

Detailed folder conventions are documented in `docs/6-development/2-folder-structure.md`.

---

# 13. Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome 90+ | ✔ |
| Edge 90+ | ✔ |
| Firefox 88+ | ✔ |
| Safari 14+ | ✔ |
| Internet Explorer | ✘ (not supported) |

---

# 14. Environment Requirements

| Component | Requirement |
|-----------|-------------|
| Node.js | 20.x LTS |
| PostgreSQL | 16.x |
| NPM | Bundled with Node.js 20.x |

---

# 15. Third-Party Services

- NetSuite REST APIs / SuiteTalk REST Web Services (read-only)
- Microsoft Graph API (OneDrive, read-only folder/document visibility)
- Render (backend API hosting + managed PostgreSQL)
- Vercel (frontend static hosting/CDN)
- Email provider for password reset and assignment notifications — **Resend** proposed
  (developer-friendly, generous free tier suitable for MVP volume; SendGrid is the fallback if
  Legacy Lighting has an existing account)

**Hosting rationale:** the Project Plan constrains the team to 2 full-stack developers with "no
dedicated QA or DevOps in MVP" (BRD Section 8.2). Vercel + Render are managed PaaS platforms
that need no server/infrastructure management, which fits that constraint far better than
self-managed cloud infrastructure (e.g. raw AWS EC2/ECS) would for a 5-week build.

---

# 16. Package Guidelines

## Backend Packages

| Package | Purpose |
|----------|---------|
| express | Web framework |
| @prisma/client, prisma | ORM and migrations |
| zod | Request validation |
| jsonwebtoken | JWT issuance/verification |
| bcrypt | Password hashing |
| winston, morgan | Logging |
| dotenv | Environment variable loading (local dev only — hosting provider manages env vars in deployed environments) |

## Frontend Packages

| Package | Purpose |
|----------|---------|
| react, react-dom | UI framework |
| react-router-dom | Routing |
| @tanstack/react-query | Server state management |
| tailwindcss | Styling |
| shadcn/ui (generated components, not an npm dependency) | Component primitives, matching existing Lovable UI |

---

# 17. Upgrade Policy

Technology versions should only be upgraded when:

- Security updates are required.
- Long-Term Support (LTS) versions are released.
- Existing packages remain compatible.
- Regression testing is completed.

---

# 18. Related Documents

| Document | Purpose |
|----------|---------|
| `1-project-overview.md` | High-level project summary |
| `2-requirements.md` | Functional and non-functional requirements |
| `docs/2-database/` | Database design and standards |
| `docs/3-api/` | API design and standards |
| `docs/4-ui/` | Frontend design system and standards |
| `docs/6-development/` | Dev environment, coding standards, deployment |

---

# 19. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, based on Project Plan Technical Architecture section |
| 1.1 | 2026-07-27 | Development Team (NuVista AI) | Replaced Milestone-1 placeholders with concrete proposed picks (Express, Prisma, Vite, TanStack Query, Tailwind/shadcn, Vercel+Render, Resend) |

---

# Notes

- This document is the official reference for all project technologies.
- All choices above are **proposed**, confirmed by the project owner to unblock implementation
  planning — final sign-off with Legacy Lighting still happens in the real Milestone 1 session,
  particularly the hosting provider choice if Legacy Lighting has an existing cloud contract.
- Developers and AI coding assistants must follow the versions and technologies defined here.
- Any changes to the technology stack require project approval and documentation updates.
- Avoid introducing new frameworks or packages unless they are approved and documented.
