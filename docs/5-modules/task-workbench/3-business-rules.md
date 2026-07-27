# Business Rules

> **Purpose**
>
> Business rules and decision logic for the Task Workbench module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Task Workbench |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: govern task status transitions, due-date extensions, and information-blocking flags.

Business objectives: accurate, accountable task state at all times.

Scope: task lifecycle from creation to completion or on-hold.

---

# 2. Rule Categories

Workflow (status transitions), Data lifecycle (completion), Accountability (extension reasons).

---

# 3. Business Rules

## BR-WORKBENCH-001

Title: Estimators can view and update only their own assigned tasks

Business Rationale: BRD Section 3.2, Estimator role scope.

Trigger: any task read/write request.

Conditions: `assigned_estimator_id` != current user and role = Estimator.

Expected Outcome: 403 Forbidden.

Related Requirements: FR-WORKBENCH-001, NFR-SEC-002.

---

## BR-WORKBENCH-002

Title: Status transitions must follow the configured workflow

Business Rationale: prevents skipping steps (e.g. Not Started → Completed directly).

Trigger: status update request.

Conditions: target status is not a valid next state from the current status.

Expected Outcome: 409 Conflict, transition blocked.

Related Requirements: FR-WORKBENCH-007.

---

## BR-WORKBENCH-003

Title: Completing a task requires confirmation and records a timestamp

Trigger: status set to "Completed".

Conditions: none (always applies).

Expected Outcome: confirmation modal shown; `completed_at` timestamp recorded on confirm.

Related Requirements: FR-WORKBENCH-007.

---

## BR-WORKBENCH-004

Title: Due-date extension requires a reason of at least 20 characters

Trigger: "Extend Due Date" submitted.

Conditions: reason field length < 20.

Expected Outcome: validation error, extension blocked.

Related Requirements: FR-WORKBENCH-006.

---

## BR-WORKBENCH-005

Title: Awaiting Information flag requires a clarification note to set, and a resolution note to clear

Trigger: flag toggled on or off.

Conditions: note field empty.

Expected Outcome: validation error, toggle blocked.

Related Requirements: FR-WORKBENCH-008.

---

# 4. Decision Tables

| Condition | Result |
|-----------|--------|
| Current status = Not Started | Allowed next: Assigned |
| Current status = Assigned | Allowed next: In Progress |
| Current status = In Progress | Allowed next: Awaiting Info, Needs Review, Under Review, On Hold |
| Current status = Needs Review | Allowed next: Under Review, In Progress |
| Current status = Under Review | Allowed next: Completed, In Progress |
| Current status = Completed | No further transitions (terminal) |

"Assigned" and "Needs Review" confirmed against the live Lovable UI's actual status values,
added to the BRD's example workflow (Not Started → In Progress → Awaiting Info/Under Review →
Completed, or On Hold).

---

# 5. Calculations

Workflow progress % = (completed steps / total steps) × 100 (FR-WORKBENCH-003), display only.

---

# 6. State Transition Rules

```
Not Started → Assigned → In Progress → Awaiting Info / Needs Review / Under Review → Completed
                                ↕
                             On Hold
```

Allowed transitions: per Section 4 decision table.

Restricted transitions: any transition out of Completed.

---

# 7. Workflow Rules

No manager-approval gate on due-date extensions in MVP (BRD notes this as future phase).
Awaiting Info notifies relevant stakeholders per FR-WORKBENCH-008.

---

# 8. Exception Rules

Concurrency: last write wins on simultaneous status updates. Invalid states: attempting to
reopen a Completed task is blocked at the API layer.

---

# 9. External Dependencies

None beyond reference links (NetSuite/OneDrive).

---

# 10. Assumptions

Status list and transition graph confirmed in Milestone 1.

---

# 11. Constraints

No approval workflow for extensions in MVP.

---

# 12. Traceability

| Rule | Requirement | API | Test |
|------|-------------|-----|------|
| BR-WORKBENCH-001 | FR-WORKBENCH-001 | GET/PUT /tasks/{id} | TC-WORKBENCH-001 |
| BR-WORKBENCH-002 | FR-WORKBENCH-007 | PATCH /tasks/{id}/status | TC-WORKBENCH-002 |
| BR-WORKBENCH-003 | FR-WORKBENCH-007 | PATCH /tasks/{id}/status | TC-WORKBENCH-003 |
| BR-WORKBENCH-004 | FR-WORKBENCH-006 | POST /tasks/{id}/extend | TC-WORKBENCH-004 |
| BR-WORKBENCH-005 | FR-WORKBENCH-008 | PATCH /tasks/{id}/awaiting-info | TC-WORKBENCH-005 |

---

# 13. Related Documents

`1-module.md`, `2-functional-specification.md`, `6-validation.md`, `7-permissions.md`,
`8-api.md`, `9-ui.md`, `11-testing.md`

---

# AI Generation Notes

Every rule must trace to an FR-WORKBENCH-* requirement.
