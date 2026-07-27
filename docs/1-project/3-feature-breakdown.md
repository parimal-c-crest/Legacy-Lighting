# Feature Breakdown

> **Purpose**
>
> This document breaks down the approved project requirements into logical business features. It groups related functionality into manageable feature sets that serve as the foundation for module identification, sprint planning, architecture, database design, API design, UI design, and implementation.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Version | 1.0 |
| Status | Approved |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-08 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

The MVP's functionality is organized into six business features, matching the six modules
called out in the BRD and Project Plan: Request Intake, Task Management Workbench, Projects 360,
Executive Dashboard, Reports, and Settings & Administration. Each maps 1:1 to a folder under
`docs/5-modules/`.

---

# 2. Feature Categories

| Category | Description |
|----------|-------------|
| Intake | Standardized capture and triage of incoming project requests |
| Task Execution | Estimator-facing task lifecycle management |
| Project Visibility | Cross-cutting single-project and portfolio views |
| Reporting & Analytics | Executive KPIs, dashboards, and exportable reports |
| Administration | Users, roles, master data, and connected-system configuration |
| Integration | Read-only NetSuite and OneDrive visibility |

---

# 3. Feature List

| Feature ID | Feature Name | Category | Priority | Status |
|------------|--------------|----------|----------|--------|
| FEAT-001 | Request Intake & Processing | Intake | Critical | Planned |
| FEAT-002 | Task Management Workbench | Task Execution | Critical | Planned |
| FEAT-003 | Projects 360 Visibility | Project Visibility | Critical | Planned |
| FEAT-004 | Executive Dashboard & Core Reporting | Reporting & Analytics | High | Planned |
| FEAT-005 | Lightweight NetSuite & OneDrive Visibility | Integration | High | Planned |
| FEAT-006 | Platform Administration | Administration | High | Planned |

---

# 4. Feature Details

## Feature: Request Intake & Processing

### Description

Unified queue for incoming and manually created project requests, with structured fields,
work indicators, and one-click conversion to a task.

### Business Value

Replaces email/manual triage with a standardized process, giving Processors consistent data
quality and full visibility into what's arrived and what's still pending classification.

### Included Functionality

- Unified request queue with source, filters, and search
- Standardized request creation form
- Work indicators (Counts Provided, Takeoff, Submittal, Spec Package)
- Draft saving
- Request-to-task conversion
- NetSuite Relevant flag and OneDrive folder linking

### Primary Users

- Processor
- Manager
- Admin

### Related Requirements

- BR-001
- FR-INTAKE-001 through FR-INTAKE-007

---

## Feature: Task Management Workbench

### Description

Dedicated operational workspace for estimators to view, execute, and update their assigned
tasks, with list and board views.

### Business Value

Gives estimators a single, structured task queue and gives managers workload/due-date
visibility, replacing overloaded labels on the existing planner.

### Included Functionality

- Task List and Task Board (Kanban) views
- Task creation, editing, assignment, and reassignment
- Due dates, extended due dates with justification
- Status workflow with validation
- Awaiting Information flag
- Internal notes and basic activity history
- Quick actions (open OneDrive/NetSuite, update status, extend due date)

### Primary Users

- Estimator
- Manager
- Processor

### Related Requirements

- BR-002
- FR-WORKBENCH-001 through FR-WORKBENCH-008

---

## Feature: Projects 360 Visibility

### Description

Portfolio-level project list plus a single-project 360 view combining tasks, requests,
blockers, activity, and connected-system references.

### Business Value

Eliminates the need to check multiple systems to understand a project's current state;
central reference for management reviews.

### Included Functionality

- Active project list with sortable columns and pagination
- List / Kanban / Update Call (Monday Meeting) view modes
- Saved/predefined filter views
- Project 360 detail view (tasks, requests, blockers, activity, notes, references)
- CSV export

### Primary Users

- Manager
- Estimator
- Viewer

### Related Requirements

- BR-003
- FR-PROJECTS-001 through FR-PROJECTS-006

---

## Feature: Executive Dashboard & Core Reporting

### Description

Executive KPI dashboard, Monday Meeting View, and a set of core operational reports with
export.

### Business Value

Replaces manually compiled executive reports with real-time KPIs and a one-page weekly
meeting view, supporting data-driven resource decisions.

### Included Functionality

- Project status, sales outlook, and top blockers widgets
- Monday Meeting View (completed/due/overdue/new)
- Estimator Workload, Overdue Aging, Request Type Volume, NetSuite Coverage, Project Health
  Rollup, and Customer Activity reports
- Common report filters and CSV/Excel/ZIP export

### Primary Users

- Executive Leadership
- Manager

### Related Requirements

- BR-004
- BR-005
- FR-DASHBOARD-001 through FR-DASHBOARD-005
- FR-REPORTS-001 through FR-REPORTS-008

---

## Feature: Lightweight NetSuite & OneDrive Visibility

### Description

Read-only reference data from NetSuite (customer, project/job, quote/estimate) and manual
project-to-OneDrive-folder association with document listing.

### Business Value

Gives users one-click access to related NetSuite and OneDrive context without leaving the
platform, without the cost/risk of a full bidirectional integration in MVP.

### Included Functionality

- NetSuite read-only reference sync for confirmed objects
- Manual/limited scheduled synchronization with basic error logging
- Manual OneDrive project-to-folder association
- Document listing and direct open-in-OneDrive links

### Primary Users

- Estimator
- Manager
- Admin (sync/configuration)

### Related Requirements

- BR-007
- FR-INTAKE-006, FR-INTAKE-007
- FR-WORKBENCH-003, FR-WORKBENCH-005
- FR-PROJECTS-005
- FR-REPORTS-004
- FR-SETTINGS-007

---

## Feature: Platform Administration

### Description

Authentication, role-based access control, user management, master-data configuration, and
audit logging underpinning all other features.

### Business Value

Ensures secure, role-appropriate access and lets Admins configure request types, project
types, locations, statuses, and priorities without code changes.

### Included Functionality

- Authentication and RBAC
- User management (create/edit/deactivate, roles, password reset)
- Master data configuration (request types, project types, locations, statuses, priorities)
- Connected systems status display
- User profile settings
- Basic activity history and audit logging

### Primary Users

- Admin
- Manager (limited)

### Related Requirements

- FR-SETTINGS-001 through FR-SETTINGS-008
- NFR-SEC-001 through NFR-SEC-005 (see `2-requirements.md`)

---

# 5. Feature Prioritization

| Priority | Features |
|----------|----------|
| Critical | Request Intake & Processing, Task Management Workbench, Projects 360 Visibility |
| High | Executive Dashboard & Core Reporting, Lightweight NetSuite & OneDrive Visibility, Platform Administration |
| Medium | — |
| Low | — |

---

# 6. Feature Dependencies

| Feature | Depends On | Description |
|----------|------------|-------------|
| Task Management Workbench | Request Intake & Processing | Tasks are created via request-to-task conversion |
| Projects 360 Visibility | Task Management Workbench, Request Intake & Processing | 360 view aggregates tasks and requests per project |
| Executive Dashboard & Core Reporting | Projects 360 Visibility, Task Management Workbench | KPIs and reports aggregate task/project data |
| Lightweight NetSuite & OneDrive Visibility | Platform Administration | Connected-systems config lives in Settings |
| All features | Platform Administration | Auth/RBAC and master data are prerequisites for every module |

---

# 7. Module Mapping

| Feature | Module (docs/5-modules/) |
|----------|--------|
| Request Intake & Processing | `request-intake` |
| Task Management Workbench | `task-workbench` |
| Projects 360 Visibility | `projects-360` |
| Executive Dashboard & Core Reporting | `executive-dashboard`, `reports` |
| Lightweight NetSuite & OneDrive Visibility | cross-cutting (see `3-api` integration layer + relevant modules) |
| Platform Administration | `settings-administration` |

---

# 8. User Access

| Feature | Admin | Manager | Processor | Estimator | Viewer |
|----------|---------------|---------|-------|----------|-------|
| Request Intake & Processing | ✔ | ✔ | ✔ | | |
| Task Management Workbench | ✔ | ✔ | ✔ | ✔ | |
| Projects 360 Visibility | ✔ | ✔ | ✔ | ✔ | ✔ |
| Executive Dashboard & Core Reporting | ✔ | ✔ | | | ✔ (dashboard only) |
| Lightweight NetSuite & OneDrive Visibility | ✔ | ✔ | ✔ | ✔ | ✔ (read-only) |
| Platform Administration | ✔ | limited | | | |

---

# 9. Feature Workflow

1. Request Intake & Processing — request arrives/created, triaged, converted to task
2. Task Management Workbench — estimator executes task through its status lifecycle
3. Projects 360 Visibility — manager reviews project state aggregating tasks/requests
4. Executive Dashboard & Core Reporting — executives/managers review KPIs and reports
5. Lightweight NetSuite & OneDrive Visibility — referenced throughout intake/task/project views
6. Platform Administration — configures roles, master data, and integrations underpinning all of the above

---

# 10. Assumptions

- Approved requirements in `2-requirements.md` are complete for MVP scope
- User roles (Admin, Manager, Processor, Estimator, Viewer) are finalized
- NetSuite and OneDrive access will be available per the integration dependencies
- Required cloud infrastructure will be provisioned in Milestone 1

---

# 11. Constraints

- 5-week / 400-hour delivery budget across the six features
- React + TypeScript / Node.js + TypeScript / PostgreSQL stack (see `4-tech-stack.md`)
- 2 full-stack developers; no dedicated QA/DevOps role

---

# 12. Dependencies

| Dependency | Description |
|------------|-------------|
| NetSuite sandbox/API access | Required for Lightweight NetSuite & OneDrive Visibility |
| Microsoft Graph / OneDrive access | Required for OneDrive folder/document visibility |
| Cloud infrastructure | Required for all features (hosting, database, backups) |
| Lovable UI prototypes | Starting point for all UI-facing features |

---

# 13. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| NetSuite/OneDrive access delays | Blocks Lightweight NetSuite & OneDrive Visibility feature | Validate access Week 1; fall back to manual reference links |
| Scope expansion within any feature | Threatens 5-week schedule | Lock feature scope after Milestone 1; move extras to Phase 2 |

---

# 14. Acceptance Criteria

The feature breakdown is considered complete when:

- All approved requirements are mapped to business features.
- Every feature has a unique Feature ID.
- Features are grouped into logical categories.
- Dependencies between features are identified.
- Features are prioritized.
- Module mapping is completed.
- Stakeholders approve the feature list.

---

# 15. Related Documents

- `1-project-overview.md`
- `2-requirements.md`
- `4-tech-stack.md`
- `docs/5-modules/` (per-feature specs)

---

# 16. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, derived from `2-requirements.md` |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Business Owner | | Pending | |
| Product Owner | | Pending | |
| Technical Lead | | Pending | |

---

# AI Generation Notes

When generating this document, the AI should:

- Derive features only from the approved Requirements document.
- Group related requirements into meaningful business features.
- Assign a unique Feature ID to every feature.
- Avoid introducing new requirements.
- Identify feature dependencies and implementation priorities.
- Ensure every requirement is traceable to at least one feature.
- Keep descriptions business-focused and implementation-independent.
- Do not define database schemas, APIs, UI layouts, or technical architecture.
- Maintain consistency with all related project documentation.
