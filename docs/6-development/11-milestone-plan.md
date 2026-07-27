# Milestone Plan

> **Purpose**
>
> Calendar-dated version of the Project Plan's 5 milestones, with entry/exit criteria and deliverables per milestone. Companion to `12-sprint-plan.md`, which breaks these into weekly sprint tasks for the 2-developer team.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Total Duration | 5 weeks (2026-07-27 to 2026-08-28) |
| Total Effort | 400 hours (2 developers × 80 hrs/week × 5 weeks) |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Timeline Overview

| Milestone | Weeks | Dates | Hours |
|---|---|---|---|
| M1 — Discovery, Workflow & Technical Setup | Week 1 | 2026-07-27 to 2026-07-31 | 40 |
| M2 — Platform Foundation & Request Intake | Weeks 1–2 | 2026-07-27 to 2026-08-07 | 70 |
| M3 — Task Management Workbench | Weeks 2–3 | 2026-08-03 to 2026-08-14 | 100 |
| M4 — Project 360, Dashboard & Reports | Weeks 3–4 | 2026-08-10 to 2026-08-21 | 100 |
| M5 — Integrations, Testing & Production Launch | Weeks 4–5 | 2026-08-17 to 2026-08-28 | 90 |
| **Total** | 5 weeks | 2026-07-27 to 2026-08-28 | **400** |

Weekly capacity is a flat 80 hours (2 developers × 40 hrs). Milestones overlap by design (per
the Project Plan); `12-sprint-plan.md` shows exactly how each week's 80 hours splits across the
overlapping milestones.

---

# 2. M1 — Discovery, Workflow & Technical Setup

**Dates:** 2026-07-27 to 2026-07-31 (Week 1) · **Hours:** 40

**Entry criteria:** Docs Phase B approved (this documentation set); Legacy Lighting available
for discovery sessions.

**Focus:**
- Confirm MVP workflows, Lovable screens, and functional boundaries
- Finalize project/task statuses, structured fields, and permissions matrix
- Confirm NetSuite objects/fields and review OneDrive structure with Legacy Lighting
- Finalize data model and integration approach
- Sign off on the proposed tech stack (`1-project/4-tech-stack.md`)
- Resolve remaining open questions: **Q-005b (Locations/office list)** — the only item still
  genuinely open per `1-project/2-requirements.md`

**Deliverables:**
- Approved MVP scope (this docs set, ratified)
- Finalized workflows and role matrix
- Finalized data model (`docs/2-database/`)
- Integration mapping (`docs/3-api/`, module `8-api.md` files)
- Prioritized development backlog (`12-sprint-plan.md`)
- Repository created, CI pipeline skeleton in place

**Exit criteria:** Q-005b resolved; tech stack signed off; repository and CI exist;
Milestone 2 can start without blocking on data-model questions.

---

# 3. M2 — Platform Foundation & Request Intake

**Dates:** 2026-07-27 to 2026-08-07 (Weeks 1–2) · **Hours:** 70

**Entry criteria:** M1 exit criteria met (data model finalized, repo/CI ready).

**Focus:**
- Application foundation: Express + Prisma backend skeleton, React + Vite frontend skeleton
- Database: `users`, `roles`, master data tables (request_types, project_types, locations,
  statuses, priorities), `customers`
- Authentication and RBAC middleware
- Settings & Administration module (Users, 5 master-data CRUD screens)
- Request Intake module: queue, standardized form, drafts, work indicators, request-to-task
  conversion, NetSuite/OneDrive linking

**Deliverables:**
- Secure application foundation (auth, RBAC, deployed to staging)
- Functional Settings & Administration screens
- Functional Request Intake workspace
- Request-to-task conversion working end-to-end

**Exit criteria:** A Processor can log in, create/triage/convert a request to a task; an Admin
can manage users and all five master-data types.

---

# 4. M3 — Task Management Workbench

**Dates:** 2026-08-03 to 2026-08-14 (Weeks 2–3) · **Hours:** 100

**Entry criteria:** M2's Request Intake conversion flow works (tasks can be created).

**Focus:**
- `tasks`, `notes`, `workflow_steps` schema and seed data
- Task List and Task Board (Kanban) views
- Task detail card, quick actions, status lifecycle, due-date extension, Awaiting Info flag
- Guided workflow visualization (per-request-type step sequences)

**Deliverables:**
- Functional Task Workbench (Estimator Workbench in the UI) — list, board, detail, all quick
  actions working
- Task lifecycle management with full status-transition enforcement
- Assignment and workload visibility

**Exit criteria:** An Estimator can execute a task through its full lifecycle (Not Started →
Completed) using only the Task Workbench UI.

---

# 5. M4 — Project 360, Dashboard & Reports

**Dates:** 2026-08-10 to 2026-08-21 (Weeks 3–4) · **Hours:** 100

**Entry criteria:** M3's tasks and M2's requests/projects exist with real data flowing through
them (from dev/staging usage or seed data).

**Focus:**
- Projects 360 (All Projects) module: list/kanban/update-call views, 8 saved views, metrics
  header, 360 detail aggregation, CSV export
- Executive Dashboard: Project Status, Sales Outlook, Top Blockers widgets, Monday Meeting View
- Reports module: all 6 reports, shared filters, export/export-all

**Deliverables:**
- Functional Projects 360 workspace
- Functional Executive Dashboard
- Functional core reporting with export

**Exit criteria:** A Manager can review portfolio status, drill into a project, and generate/
export any of the 6 core reports without leaving the platform.

---

# 6. M5 — Integrations, Testing & Production Launch

**Dates:** 2026-08-17 to 2026-08-28 (Weeks 4–5) · **Hours:** 90

**Entry criteria:** All four prior milestones functionally complete in staging; NetSuite
sandbox and OneDrive/Graph credentials available (per M1 dependency).

**Focus:**
- Lightweight NetSuite read-only integration (confirmed objects: Customer, Project/Job,
  Quote/Estimate)
- OneDrive folder/document visibility (link-only, no upload — per confirmed MVP scope)
- End-to-end testing, permission testing, bug fixing
- UAT support with Legacy Lighting
- Production deployment (Vercel + Render)
- Documentation, Known Limitations Register, Phase 2 AI & Automation Roadmap

**Deliverables:**
- Connected-system visibility (NetSuite + OneDrive) live in production
- Tested end-to-end MVP
- UAT-ready release, then production deployment
- User/admin documentation, Known Limitations Register, Phase 2 roadmap

**Exit criteria:** Production MVP live, UAT signed off by Legacy Lighting, all 5 success criteria
from `1-project/1-project-overview.md` Section 14 measurable (or explicitly deferred with
reason).

---

# 7. Related Documents

- `1-project/1-project-overview.md` (Section 15, Deliverables)
- `12-sprint-plan.md`
- Each module's `docs/5-modules/<module>/10-implementation-plan.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, calendar-dated from 2026-07-27 kickoff |
