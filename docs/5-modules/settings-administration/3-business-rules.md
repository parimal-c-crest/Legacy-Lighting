# Business Rules

> **Purpose**
>
> Business rules for the Settings & Administration module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: govern master-data lifecycle, user account handling, and priority-floor enforcement.

---

# 2. Rule Categories

Data lifecycle (deactivate not delete), Referential protection (in-use records), Floor
enforcement (minimum active priorities).

---

# 3. Business Rules

## BR-SETTINGS-001

Title: Users are deactivated, never deleted

Business Rationale: preserves historical attribution on tasks/requests/notes created by that
user.

Trigger: "Deactivate User" action.

Expected Outcome: `active = false`; user cannot log in; existing records retain the reference.

Related Requirements: FR-SETTINGS-001.

---

## BR-SETTINGS-002

Title: Master data in use cannot be deleted

Description: applies to Request Types, Project Types, Locations, Statuses, Priorities.

Trigger: delete attempted on a record referenced by an existing request/task/project.

Expected Outcome: 409 Conflict; only deactivation (active=false) is allowed.

Related Requirements: FR-SETTINGS-002 through FR-SETTINGS-006.

---

## BR-SETTINGS-003

Title: Minimum 3 active priorities enforced at all times

Trigger: attempt to deactivate or delete a priority that would drop active count below 3.

Expected Outcome: action blocked with explanation.

Related Requirements: FR-SETTINGS-006.

---

## BR-SETTINGS-004

Title: Location codes and priority levels must be unique

Trigger: create/update a Location or Priority with a duplicate code/level.

Expected Outcome: 422 validation error.

Related Requirements: FR-SETTINGS-004, FR-SETTINGS-006.

---

## BR-SETTINGS-005

Title: Status names must be unique within their entity type

Description: "In Progress" can exist once for Tasks and once for Projects, but not twice for
the same entity type.

Trigger: create/update a status with a duplicate name for the same entity_type.

Expected Outcome: 422 validation error.

Related Requirements: FR-SETTINGS-005.

---

# 4. Decision Tables

| Condition | Result |
|-----------|--------|
| Master-data record referenced elsewhere | Deletion blocked; deactivation allowed |
| Active priorities = 3, deactivation attempted | Blocked |
| Active priorities > 3 | Deactivation allowed |

---

# 5. Calculations

None.

---

# 6. State Transition Rules

Users: Active ↔ Inactive (deactivate/reactivate). Master data: Active ↔ Inactive.

---

# 7. Workflow Rules

Deactivating any master-data record immediately hides it from new-entry dropdowns in dependent
modules without affecting historical records (FR-SETTINGS-002).

---

# 8. Exception Rules

Attempt to reactivate a user whose role no longer exists (should not occur given fixed 5-role
model, but guarded at the application layer regardless).

---

# 9. External Dependencies

None.

---

# 10. Assumptions

Initial master-data values confirmed by Legacy Lighting in Milestone 1.

---

# 11. Constraints

Fixed 5-role model (Admin, Manager, Processor, Estimator, Viewer) — no custom roles in MVP.

---

# 12. Traceability

| Rule | Requirement | API | Test |
|------|-------------|-----|------|
| BR-SETTINGS-001 | FR-SETTINGS-001 | PATCH /users/{id}/deactivate | TC-SETTINGS-001 |
| BR-SETTINGS-002 | FR-SETTINGS-002..006 | DELETE /request-types/{id} (etc.) | TC-SETTINGS-002 |
| BR-SETTINGS-003 | FR-SETTINGS-006 | PATCH /priorities/{id} | TC-SETTINGS-003 |
| BR-SETTINGS-004 | FR-SETTINGS-004, 006 | POST /locations, /priorities | TC-SETTINGS-004 |
| BR-SETTINGS-005 | FR-SETTINGS-005 | POST /statuses | TC-SETTINGS-005 |

---

# 13. Related Documents

`1-module.md`, `2-functional-specification.md`, `8-api.md`, `11-testing.md`

---

# AI Generation Notes

Keep the "deactivate not delete" pattern consistent across users and all five master-data
types.
