# Sprint Plan

> **Purpose**
>
> Weekly sprint breakdown for the 2-developer team, translating `11-milestone-plan.md` into concrete tasks per person. One sprint = one calendar week = 80 hours (2 devs × 40 hrs). Living document — update actuals as sprints complete.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Sprint Length | 1 week (Mon–Fri) |
| Team | Dev A, Dev B (both full-stack) |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Capacity & Assignment Model

Each sprint is 80 hours (40/developer). Rather than splitting by frontend/backend (both
developers are full-stack per the Project Plan), work is split by **module ownership** so each
developer can go deep on a vertical slice (schema → API → UI → tests) without waiting on the
other:

- **Dev A:** Settings & Administration, Request Intake, Task Workbench, NetSuite integration
- **Dev B:** Projects 360, Executive Dashboard, Reports, OneDrive integration

Both developers pair on Milestone 1 discovery and Milestone 5 integration testing/launch, where
cross-module work dominates.

---

# 2. Sprint 1 — Week 1 (2026-07-27 to 2026-07-31)

**Milestones covered:** M1 (full, 40h) + M2 start (40h) — 80h total

### Both developers (M1, 40h combined)
- Discovery sessions with Legacy Lighting: confirm workflows, statuses, roles, NetSuite
  objects, OneDrive structure
- Resolve Q-005b (Locations/office list) with Legacy Lighting
- Sign off tech stack (`1-project/4-tech-stack.md`): Express, Prisma, React+Vite, Vercel+Render
- Set up repository (`legacy-lighting-p360`), GitHub Actions CI skeleton, Render + Vercel
  projects (staging environments)
- Finalize `docs/2-database/1-database-design.md` and `2-erd.md` against discovery outcomes

### Dev A (M2 start, ~20h)
- Backend skeleton: Express app, Prisma init, folder structure per `2-folder-structure.md`
- `users`, `roles` migrations + role seed (per `settings-administration/10-implementation-plan.md` Phase 1)
- Auth service: login, JWT issuance, bcrypt hashing (`docs/3-api/2-authentication.md`)

### Dev B (M2 start, ~20h)
- Frontend skeleton: Vite + React + Tailwind/shadcn setup, routing, layout shell
- Master-data migrations: `request_types`, `project_types`, `locations` (with `state` column),
  `statuses`, `priorities` + seed data (Request/Project Types confirmed; Locations from M1
  discovery)
- `customers` migration

**Sprint 1 exit check:** repo/CI live; local dev environments working for both developers;
auth backend returns a JWT for a seeded user; master data tables exist and are seeded.

---

# 3. Sprint 2 — Week 2 (2026-08-03 to 2026-08-07)

**Milestones covered:** M2 finish (30h) + M3 start (50h) — 80h total

### Dev A — M2 finish (Settings & Administration + Request Intake backend, ~30h)
- Settings & Administration: MasterDataService (shared CRUD across 5 types), UserService,
  RBAC middleware (`settings-administration/10-implementation-plan.md` Phase 2)
- Request Intake: `requests` migration (including `new_project_name`, `sales_rep_name`,
  `source`, 6 work-indicator columns per `request-intake/4-schema.md`)
- Request Intake backend: RequestService (create/update/soft-delete/convert), validation
  schemas, RequestController

### Dev B — M2 finish (Settings & Administration + Request Intake frontend, ~30h)
- Settings & Administration frontend: Users page, 5 master-data config pages, Connected
  Systems status page
- Request Intake frontend: Request Queue, Create/Edit Request form (including the
  existing/new-project toggle), Drafts list

### Dev A — M3 start (Task Workbench backend, ~25h)
- `tasks`, `notes`, `workflow_steps` migrations + workflow_steps seed per request type
  (`task-workbench/4-schema.md`)
- TaskService: status transition engine (state machine per `task-workbench/3-business-rules.md`
  Section 6), extension, reassignment, awaiting-info

### Dev B — M3 start (Task Workbench frontend groundwork, ~25h)
- Task List page (list view, quick filters, summary counts)
- Shared components needed for Task Board/Detail (status badge, priority badge)

**Sprint 2 exit check:** a Processor can create a request end-to-end and convert it to a task;
an Admin can manage users and master data through the UI; Task List renders seeded tasks.

---

# 4. Sprint 3 — Week 3 (2026-08-10 to 2026-08-14)

**Milestones covered:** M3 finish (50h) + M4 start (30h) — 80h total

### Dev A — M3 finish (Task Workbench completion, ~40h)
- TaskController (all routes per `task-workbench/8-api.md`)
- Task Board (Kanban) drag-and-drop wired to status API
- Task Detail page: quick actions, due-date extension modal, Awaiting Info modal, notes thread,
  guided workflow visualization
- Unit + integration tests for the status state machine and extension validation

### Dev B — M3 finish support + M4 start (Projects 360 backend, ~40h)
- `projects` migration (`projects-360/4-schema.md`)
- ProjectAggregationService: derived fields (is_overdue, is_awaiting_info, progress_pct per
  `projects-360/3-business-rules.md`), 360 detail aggregation, metrics endpoint
- ProjectController, CSV export service (1000-row cap)

**Sprint 3 exit check:** an Estimator can run a task through its full lifecycle in the Task
Workbench UI; Projects 360 API returns correct derived fields against seeded task/request data.

---

# 5. Sprint 4 — Week 4 (2026-08-17 to 2026-08-21)

**Milestones covered:** M4 finish (70h) + M5 start (10h) — 80h total

### Dev B — M4 finish (Projects 360 frontend + Executive Dashboard + Reports, ~55h)
- Projects 360 frontend: Project List (List/Kanban/Update Call views), 8 saved-view tabs,
  metrics header, 360 Detail page
- Executive Dashboard: all 4 widgets (Project Status, Sales Outlook, Top Blockers, Monday
  Meeting View), backend aggregation endpoints (`executive-dashboard/8-api.md`)
- Reports: backend queries for all 6 reports, Reports page with shared filter bar and
  export/export-all

### Dev A — M4 support + M5 start (~25h)
- Cross-review Projects 360 / Dashboard / Reports against their `7-permissions.md` matrices
  (RBAC correctness pass)
- NetSuite integration: read-only client for Customer/Project/Job/Quote objects, manual sync
  endpoint (`docs/1-project/2-requirements.md` Q-001 scope)
- Begin OneDrive integration: Microsoft Graph read-only folder/document listing

**Sprint 4 exit check:** a Manager can review Projects 360, the Executive Dashboard, and all 6
reports end-to-end in staging; NetSuite manual sync returns real sandbox data for at least one
object type.

---

# 6. Sprint 5 — Week 5 (2026-08-24 to 2026-08-28)

**Milestones covered:** M5 finish (80h) — 80h total

### Both developers
- Finish NetSuite + OneDrive integration (reference links on tasks/projects, Connected Systems
  status page wired to real connection state)
- End-to-end testing across all 6 modules (Playwright specs per each module's `11-testing.md`)
- Permission testing sweep (every `7-permissions.md` matrix, both roles that should pass and
  roles that should get 403)
- Bug fixing from UAT feedback
- Production deployment: Render (backend + Postgres) and Vercel (frontend) production
  environments, cut over from staging
- Finalize documentation: user/admin guide, Known Limitations Register, Phase 2 AI &
  Automation Roadmap (folding in the items marked out-of-scope in
  `1-project/2-requirements.md` Source Document Reconciliation: file upload, Planner/Monday.com
  pluggability, rich chat notes, scheduled reports, multi-role assignment)

**Sprint 5 exit check:** production MVP live; UAT signed off by Legacy Lighting; M5 exit
criteria in `11-milestone-plan.md` Section 6 met.

---

# 7. Risk Watch Per Sprint

| Sprint | Primary Risk | Mitigation |
|---|---|---|
| 1 | Q-005b (Locations) not resolved in time | Escalate to Legacy Lighting Day 1; block only the Locations seed step, not the whole sprint |
| 2 | Request Intake conversion logic more complex than estimated (new-project creation path) | Time-boxed; fall back to existing-project-only if conversion isn't stable by sprint end |
| 3 | Status state machine edge cases (Assigned/Needs Review additions) | Business rules already fully specified in `task-workbench/3-business-rules.md` before coding starts |
| 4 | Dev B module load is heaviest (3 modules) | Dev A's ~25h of slack in Sprint 4 is reserved as swing capacity if Dev B falls behind |
| 5 | Compressed integration+launch window | NetSuite/OneDrive read-only scope kept deliberately narrow (Q-001 resolution) to protect this sprint |

---

# 8. Related Documents

- `11-milestone-plan.md`
- Each module's `docs/5-modules/<module>/10-implementation-plan.md`
- `1-project/2-requirements.md` (Source Document Reconciliation, Open Questions)

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, module-ownership split across 2 developers |
