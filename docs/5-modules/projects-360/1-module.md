# Module Specification

Purpose

Document the complete business specification of the Projects 360 module.

---

# Document Information

- Module Name: Projects 360
- Version: 1.0
- Status: Draft
- Owner: Development Team (NuVista AI)
- Priority: Critical

---

# 1. Executive Summary

Purpose: give Managers a single-page, portfolio-level and per-project view combining tasks,
requests, blockers, activity, and connected-system references.

Business objective: eliminate the need to check multiple systems for project status (BRD
Section 1.3).

Scope: project list (List/Kanban/Update Call views), saved views, metrics header, Project 360
detail view, CSV export.

---

# 2. Business Context

Problem statement: managers currently cannot see real-time project status without checking
Outlook, NetSuite, OneDrive, and Planner separately (BRD Section 2.1).

Business value: a single, always-current view of every project's tasks, blockers, and activity.

Dependencies: Task Workbench (tasks), Request Intake (requests), Settings & Administration
(master data), NetSuite/OneDrive reference data.

---

# 3. Module Overview

Description: a project list with multiple view modes plus a detailed 360 view per project.

Responsibilities: aggregate and present project-level status; support Monday Meeting reviews.

Out of scope: editing task/request data directly (redirect to Task Workbench/Request Intake).

---

# 4. Actors

- Manager (primary: reviews projects, reassigns work)
- Estimator (views own project context)
- Viewer (read-only)
- Admin (full access)

---

# 5. Goals

Business goals: real-time project visibility replacing weekly manual reports.

User goals: a Manager can answer "what's the status of Project X" in one view, no cross-system
lookups.

Success metrics: reduction in manual reporting effort; adoption of Project 360 as the review
tool of record.

---

# 6. Functional Requirements

- FR-PROJECTS-001 Project List View
- FR-PROJECTS-002 View Selector
- FR-PROJECTS-003 Saved Views
- FR-PROJECTS-004 Metrics Header
- FR-PROJECTS-005 Project 360 Detail View
- FR-PROJECTS-006 Export Functionality

---

# 7. User Stories

- As a Manager, I want a Project 360 view per project so I can see tasks, blockers, and
  activity without switching systems.
- As a Manager, I want saved views (Due This Week, Overdue) so I can triage quickly.
- As any authorized role, I want to export the project list to CSV for offline analysis.

---

# 8. Acceptance Criteria

Given a Manager on the Project List,
When they click a project row,
Then the Project 360 detail view loads with related tasks, requests, blockers, and activity.

Given a Manager applies the "Overdue" saved view,
When the list refreshes,
Then only projects with at least one overdue task are shown.

---

# 9. Business Process

```
Manager opens Projects 360
   ↓
Selects view mode (List / Kanban / Update Call) and/or saved view
   ↓
Reviews metrics header and project list
   ↓
Opens Project 360 detail for a specific project
   ↓
Reviews tasks/requests/blockers/activity, optionally reassigns a task
```

---

# 10. Module Navigation

See `docs/4-ui/1-navigation.md` — "Projects 360" menu.

---

# 11. Dependencies

Modules: Task Workbench, Request Intake, Settings & Administration.

External systems: NetSuite, OneDrive (reference display only).

---

# 12. Events

Triggers: project status recalculated when a related task/request changes.

Notifications: none module-specific (notifications live in Task Workbench/Request Intake).

Background jobs: metrics header refresh every 30 seconds (client-side polling per FR-PROJECTS-004).

---

# 13. Non-Functional Requirements

Performance: project list ≤200ms; complex aggregation (360 detail) ≤500ms (NFR-PERF-002).

Security: Estimator/Viewer read-only; Manager/Admin full (see `7-permissions.md`).

Accessibility: WCAG 2.1 Level A.

---

# 14. Assumptions

Project status/stage values confirmed in Milestone 1.

---

# 15. Constraints

Export capped at 1000 projects per BRD FR-PROJECTS-006.

---

# 16. Risks

Aggregation queries across tasks/requests/notes could be slow at scale — mitigate with the
indexing strategy in `4-schema.md`.

---

# 17. Related Documents

`4-schema.md`, `8-api.md`, `7-permissions.md`, `6-validation.md`, `3-business-rules.md`,
`9-ui.md`, `11-testing.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | | Pending | |

---

# AI Generation Notes

Derive content only from approved FR-PROJECTS-* requirements.
