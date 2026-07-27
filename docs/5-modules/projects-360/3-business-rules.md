# Business Rules

> **Purpose**
>
> Business rules for the Projects 360 module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Projects 360 |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: govern how project status/metrics are derived and how exports are bounded.

Scope: aggregation and export logic only (this module does not own task/request creation
rules).

---

# 2. Rule Categories

Aggregation/derivation, Export limits, Visibility scope.

---

# 3. Business Rules

## BR-PROJECTS-001

Title: A project is "Overdue" if it has at least one task past its due date

Business Rationale: surfaces at-risk projects without requiring a separate manual status field.

Trigger: metrics/list computation.

Conditions: any related task has `due_date` (or `extended_due_date` if set) < today and status
not Completed.

Expected Outcome: project flagged Overdue in list/metrics.

Related Requirements: FR-PROJECTS-001, FR-PROJECTS-004.

---

## BR-PROJECTS-002

Title: A project is "Awaiting Information" if any related task or request carries that flag

Trigger: metrics/list computation.

Expected Outcome: project appears in the "Awaiting Info" saved view.

Related Requirements: FR-PROJECTS-003.

---

## BR-PROJECTS-003

Title: Export is capped at 1000 projects

Business Rationale: BRD FR-PROJECTS-006 explicit limit.

Trigger: export request matching more than 1000 projects.

Expected Outcome: export blocked or truncated with a user-facing notice (confirmed behavior in
Milestone 1).

Related Requirements: FR-PROJECTS-006.

---

## BR-PROJECTS-004

Title: Estimators and Viewers see all projects but cannot edit from this module

Business Rationale: Projects 360 is a visibility layer; edits happen in Task Workbench/Request
Intake.

Trigger: any write attempt from this module's UI/API.

Expected Outcome: 403 or UI controls simply not shown for non-Manager/Admin roles.

Related Requirements: FR-PROJECTS-005.

---

# 4. Decision Tables

| Condition | Result |
|-----------|--------|
| Any related task overdue | Project = Overdue |
| No open tasks, all completed | Project = Completed |
| Any task/request Awaiting Info | Project = Awaiting Information |

---

# 5. Calculations

Progress % (shown in list per FR-PROJECTS-001 column) = (completed tasks / total tasks) × 100
for the project.

---

# 6. State Transition Rules

Not applicable — project status is derived, not directly set by users in this module.

---

# 7. Workflow Rules

Metrics header refreshes every 30 seconds (FR-PROJECTS-004); clicking a metric applies the
corresponding saved view filter.

---

# 8. Exception Rules

Project with zero tasks — Progress % shown as "—" rather than 0% to avoid implying no work is
needed.

---

# 9. External Dependencies

NetSuite/OneDrive reference tables (display only, no direct rule dependency).

---

# 10. Assumptions

Project status/stage values and thresholds (e.g. ">10 overdue" alert) confirmed in Milestone 1.

---

# 11. Constraints

Export cap of 1000 rows.

---

# 12. Traceability

| Rule | Requirement | API | Test |
|------|-------------|-----|------|
| BR-PROJECTS-001 | FR-PROJECTS-004 | GET /projects | TC-PROJECTS-001 |
| BR-PROJECTS-002 | FR-PROJECTS-003 | GET /projects?view=awaiting-info | TC-PROJECTS-002 |
| BR-PROJECTS-003 | FR-PROJECTS-006 | GET /projects/export | TC-PROJECTS-003 |

---

# 13. Related Documents

`1-module.md`, `2-functional-specification.md`, `8-api.md`, `9-ui.md`, `11-testing.md`

---

# AI Generation Notes

Keep derivation rules consistent with the `tasks`/`requests` schema fields they read from.
