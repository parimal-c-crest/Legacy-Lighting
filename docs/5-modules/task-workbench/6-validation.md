# Validation Rules

> **Purpose**
>
> Validation rules for the Task Workbench module.

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

Purpose: ensure task updates (status, due-date extension, notes, flags) are valid before
persisting.

Scope: task detail actions and API.

Validation philosophy: server-side enforcement via Zod, mirrored in UI for immediate feedback.

---

# 2. Validation Categories

Required Fields, Length Validation (notes), Cross-Field Validation (extension date vs. reason),
Business Validation (status transition legality, ownership).

---

# 3. Field Validation

| Field | Rule | Error Message |
|--------|------|---------------|
| status_id | Must be a valid next state from current status | "That status change isn't allowed from the current state." |
| extended_due_date | Must be after current due_date | "Extended due date must be after the original due date." |
| extension_reason | Required, minimum 20 characters, when extending | "Please provide a reason of at least 20 characters." |
| note.body | Required, maximum 2000 characters | "Note cannot be empty and must be under 2000 characters." |
| awaiting_info_note | Required when setting Awaiting Information | "Please describe what information is needed." |

---

# 4. Cross-Field Validation

- Extended due date requires a reason (BR-WORKBENCH-004).
- Awaiting Information toggle requires a note in both directions (set and clear) (BR-WORKBENCH-005).

---

# 5. Business Validation

- Estimator can only update tasks where `assigned_estimator_id` = current user (BR-WORKBENCH-001).
- Status transition must be a valid edge in the configured workflow graph (BR-WORKBENCH-002).
- Completing a task requires explicit confirmation (BR-WORKBENCH-003).

---

# 6. File Validation

Not applicable (no file uploads in this module).

---

# 7. Import Validation

Not applicable.

---

# 8. API Validation

Headers: `Authorization: Bearer <token>` required. Request body validated per Section 3.

---

# 9. Validation Order

1. Required fields
2. Length (notes)
3. Cross-field (extension reason, awaiting-info note)
4. Business validation (ownership, transition legality)
5. Database constraints

---

# 10. Error Messages

Centralized per `docs/3-api/6-error-handling.md`.

---

# 11. Related Documents

`2-functional-specification.md`, `4-schema.md`, `3-business-rules.md`, `8-api.md`, `9-ui.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Technical Lead | | Pending | |

# AI Generation Notes

Trace every rule to an FR-WORKBENCH-* requirement or BR-WORKBENCH-* rule.
