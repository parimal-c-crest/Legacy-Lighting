# Functional Specification

> **Purpose**
>
> Detailed system behavior for the Projects 360 module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Projects 360 |
| Version | 1.0 |
| Status | Draft |

---

# 1. Overview

Purpose: define exact behavior of the project list, view modes, saved views, metrics header,
360 detail view, and export.

Scope: FR-PROJECTS-001 through 006.

---

# 2. Functional Scope

Implemented: List/Kanban/Update Call views, saved/predefined filters, metrics header, 360
detail aggregation, CSV export.

Excluded: direct task/request editing (redirect to their modules).

Dependencies: Task Workbench, Request Intake, master data.

---

# 3. Feature Specifications

## FR-PROJECTS-001 — Project List View

### Description
Paginated table of active projects with sortable columns and status badges.

### Trigger
User navigates to Projects 360.

### Main Flow
System loads projects (20/page), sorted by default column; row click opens 360 detail.

### Post Conditions
List reflects sort/filter state.

---

## FR-PROJECTS-002 — View Selector

### Description
Switch between List (default), Kanban (by status), and Update Call (Monday Meeting) views.

### Trigger
User clicks a view tab.

### Main Flow
Same underlying data rendered differently; preference persisted per user.

---

## FR-PROJECTS-003 — Saved Views

### Description
Predefined filter sets: All Active, Due This Week, Overdue, Awaiting Info, By Estimator, By
Customer, Needs NetSuite Review, Classification Review (8 total, confirmed against the live
Lovable All Projects screen).

### Trigger
User selects a saved view tab.

### Main Flow
List re-queries with the view's filter applied; active view highlighted; filter count shown.

---

## FR-PROJECTS-004 — Metrics Header

### Description
Summary KPIs: Active Projects, Open Tasks, Due This Week, Overdue, Awaiting Info, High
Priority (6 total, confirmed against the live Lovable All Projects screen — "Needing
Attention" from the BRD maps to the "Awaiting Info" tile in the actual product).

### Trigger
Screen load / 30-second refresh.

### Main Flow
Metrics computed server-side; clicking a metric filters the list to that subset; visual alert
if a threshold is exceeded (e.g. >10 overdue).

---

## FR-PROJECTS-005 — Project 360 Detail View

### Description
Single-project dashboard: header, related tasks, related requests, activity timeline, document
links, NetSuite status, blockers, next actions.

### Trigger
User opens a project from the list.

### Main Flow
System aggregates data from tasks, requests, notes, activity_logs, netsuite_references,
onedrive_links for the selected project.

### Exception Flow
Missing NetSuite/OneDrive reference — section shows "Not linked".

---

## FR-PROJECTS-006 — Export Functionality

### Description
Export the visible (filtered) project list to CSV.

### Trigger
User clicks "Export".

### Main Flow
System generates a CSV of up to 1000 projects respecting current filters; filename
`projects_YYYY-MM-DD_HHMMSS.csv`; browser download triggered.

### Exception Flow
More than 1000 projects match — export capped, user notified.

---

# 4. Business Process Flow

See `1-module.md` Section 9 and `docs/4-ui/2-user-flows.md` "Project 360 Review (Manager)".

---

# 5. System Behavior

Read-heavy module: no create/update/delete of projects directly from this module in MVP
(projects are created alongside the first task/request for a customer engagement, confirmed in
Milestone 1). Search: by customer, project name, location. Export: CSV.

---

# 6. Data Processing

Inputs: filter/sort/view selections.

Transformations: aggregation joins across tasks, requests, notes, activity_logs.

Outputs: list rows, 360 detail payload, CSV file.

---

# 7. Integrations

NetSuite/OneDrive: reference display via `netsuite_references`/`onedrive_links`.

---

# 8. Error Handling

Aggregation query failure — show retry, log error. Export failure — toast error, no partial file.

---

# 9. Performance Requirements

List ≤200ms; 360 detail aggregation ≤500ms (NFR-PERF-002); export ≤5s for up to 1000 records.

---

# 10. Security Requirements

Viewer/Estimator: read-only. Manager/Admin: full, including reassignment shortcuts into Task
Workbench.

---

# 11. Edge Cases

Project with no tasks/requests yet — 360 view shows empty sections gracefully. Large project
count — pagination and capped export.

---

# 12. Assumptions

Project status/stage taxonomy confirmed in Milestone 1.

---

# 13. Constraints

Export capped at 1000 projects.

---

# 14. Traceability

FR-PROJECTS-001..006 map 1:1 to Section 3.

---

# 15. Related Documents

`1-module.md`, `4-schema.md`, `6-validation.md`, `8-api.md`, `9-ui.md`, `7-permissions.md`

---

# AI Generation Notes

Keep this module read/aggregation-focused; do not introduce create/edit flows for tasks/
requests here — those belong to their own modules.
