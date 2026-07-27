# Module Testing

> **Purpose**
>
> Test specification for the Task Workbench module.

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

Purpose: verify task list/board, status lifecycle, extension, notes, and awaiting-info flows.

Scope: `tasks`/`notes` API and UI.

---

# 2. Test Scope

Included: status transitions, extension, reassignment, notes, awaiting-info flag, ownership
scoping.

Excluded: workflow step-by-step completion tracking beyond status (display only in MVP).

---

# 3. Traceability Matrix

| Requirement | Business Rule | Validation | Permission | Test Case |
|-------------|---------------|------------|------------|-----------|
| FR-WORKBENCH-007 | BR-WORKBENCH-002, BR-WORKBENCH-003 | — | PERM-WORKBENCH-02 | TC-WORKBENCH-001 |
| FR-WORKBENCH-006 | BR-WORKBENCH-004 | VR-WORKBENCH-001, VR-WORKBENCH-002 | PERM-WORKBENCH-03 | TC-WORKBENCH-002 |
| FR-WORKBENCH-008 | BR-WORKBENCH-005 | VR-WORKBENCH-004 | PERM-WORKBENCH-02 | TC-WORKBENCH-003 |
| FR-WORKBENCH-001 | BR-WORKBENCH-001 | — | PERM-WORKBENCH-01 | TC-WORKBENCH-004 |

---

# 4. Functional Tests

## TC-WORKBENCH-001

Title: Status transition follows the workflow graph

Requirement: FR-WORKBENCH-007

Steps: attempt Not Started → Completed directly; then Not Started → In Progress → Completed

Expected Result: direct jump rejected (409); valid sequence succeeds with confirmation and
`completed_at` set

Priority: High

---

## TC-WORKBENCH-002

Title: Extend due date requires valid date and reason

Requirement: FR-WORKBENCH-006

Steps: submit extension with reason under 20 characters; then resubmit with valid reason

Expected Result: first rejected, second succeeds and both dates visible on task

Priority: High

---

## TC-WORKBENCH-003

Title: Awaiting Information requires a note to set and to clear

Requirement: FR-WORKBENCH-008

Steps: toggle flag on without note; then with note; then clear without resolution note

Expected Result: both note-less attempts rejected; flagged task appears in Awaiting Info view

Priority: Medium

---

## TC-WORKBENCH-004

Title: Estimator sees only their own tasks

Requirement: FR-WORKBENCH-001

Steps: log in as Estimator A, request Estimator B's task by ID

Expected Result: 403 Forbidden

Priority: High

---

# 5. Validation Tests

Note body over 2000 characters rejected; extended due date not after original rejected.

---

# 6. Permission Tests

Estimator: own-task scope enforced on all endpoints. Manager/Admin: full access. Viewer:
read-only, no status/extension/note actions.

---

# 7. API Tests

GET /tasks (filter/sort), PATCH /tasks/{id}/status (valid/invalid transitions), POST
/tasks/{id}/extend, PATCH /tasks/{id}/reassign, PATCH /tasks/{id}/awaiting-info, POST
/tasks/{id}/notes.

---

# 8. UI Tests

Kanban drag-and-drop status change; keyboard-only status change; quick-action optimistic update
and rollback on API failure.

---

# 9. Business Rule Tests

One test per BR-WORKBENCH-001 through BR-WORKBENCH-005 (see Section 4).

---

# 10. Edge Cases

Concurrent status updates by two sessions — last write wins. Large task volume — pagination
holds NFR-PERF-002 targets.

---

# 11. Performance Tests

Task list response time under NFR-PERF-002 with 10,000+ tasks (target scale per NFR-SCALE-001).

---

# 12. Security Tests

Estimator attempting to reassign a task — 403. Cross-estimator task access — 403.

---

# 13. Regression Checklist

Request conversion → task appears correctly in Task Workbench (cross-module).

---

# 14. Test Data

Seed: 6 statuses, 4 priorities, 3 estimators, 10 tasks across statuses.

---

# 15. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `6-validation.md`, `7-permissions.md`,
`8-api.md`, `9-ui.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| QA Lead | | Pending | |

# AI Generation Notes

Ensure every BR-WORKBENCH-* rule has a corresponding test case.
