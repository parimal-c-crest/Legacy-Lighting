# Business Rules

> **Purpose**
>
> This document defines the business rules and decision logic for the Request Intake module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Request Intake |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: govern how requests are created, classified, and converted.

Business objectives: standardized, high-quality data entering the platform.

Scope: request lifecycle from creation through conversion or archival.

---

# 2. Rule Categories

- Data lifecycle (draft → new → triaged → converted)
- Workflow (conversion gating)
- Validation dependency (NetSuite ID required when flagged)

---

# 3. Business Rules

## BR-INTAKE-001

Title: Mandatory fields for a submitted (non-draft) request

Description: Customer, Request Type, Due Date, and Priority are required before a request can
leave Draft status.

Business Rationale: ensures downstream task creation has the minimum data needed for
assignment and reporting.

Trigger: user submits (not saves as draft) a request.

Conditions: any of the four fields is empty.

Expected Outcome: submission blocked with field-level validation errors.

Exceptions: none.

Related Requirements: FR-INTAKE-002.

---

## BR-INTAKE-002

Title: Due date cannot be in the past

Description: the due date field must be today or later at creation time.

Business Rationale: prevents accidental backdating that would misrepresent SLA performance.

Trigger: request creation or edit.

Conditions: due date < today.

Expected Outcome: validation error.

Exceptions: none.

Related Requirements: FR-INTAKE-002.

---

## BR-INTAKE-003

Title: NetSuite ID required when NetSuite Relevant is checked

Description: if a request is flagged NetSuite Relevant, the NetSuite ID field becomes mandatory
and format-validated.

Business Rationale: guarantees the reference is usable later for NetSuite lookups (FR-INTAKE-006).

Trigger: NetSuite Relevant checkbox toggled or form submitted.

Conditions: flag is true and NetSuite ID is empty or malformed.

Expected Outcome: validation error; conversion warning if unresolved at conversion time.

Exceptions: none.

Related Requirements: FR-INTAKE-006.

---

## BR-INTAKE-004

Title: A request can be converted to a task at most once

Description: once a request's Intake Status is "Converted", it cannot be converted again.

Business Rationale: prevents duplicate tasks from a single request.

Trigger: "Create Task" action.

Conditions: request Intake Status already "Converted".

Expected Outcome: action blocked, 409 Conflict returned.

Exceptions: none.

Related Requirements: FR-INTAKE-004.

---

## BR-INTAKE-005

Title: A request references at most one project source — existing OR new, never both

Description: `project_id` (existing project) and `new_project_name` (project to be created on
conversion) are mutually exclusive on a single request.

Business Rationale: prevents ambiguity about which project a converted task should belong to.

Trigger: request create/update.

Conditions: both `project_id` and `new_project_name` are set.

Expected Outcome: validation error; request rejected until only one is set (or neither).

Exceptions: none.

Related Requirements: FR-INTAKE-002, FR-INTAKE-004.

---

# 4. Decision Tables

| Condition | Result |
|-----------|--------|
| Intake Status = Draft | Editable, all fields optional except none |
| Intake Status = New/Triaged | Editable, can be converted |
| Intake Status = Converted | Read-only, cannot be converted again |

---

# 5. Calculations

None (no pricing/tax/commission logic in this module).

---

# 6. State Transition Rules

```
Draft → New → Triaged → Converted
```

Allowed transitions: Draft→New, New→Triaged, Triaged→Converted, New→Converted.

Restricted transitions: any transition out of Converted.

---

# 7. Workflow Rules

- Conversion auto-notifies the assigned estimator (email/in-app per user preference).
- No approval step required before conversion in MVP (Processor/Manager self-serve).

---

# 8. Exception Rules

Duplicate records: allowed (business decision, not a system constraint).

Invalid states: attempting to edit a Converted request is blocked at the API layer.

Concurrency: last write wins; no optimistic locking in MVP.

---

# 9. External Dependencies

NetSuite (ID format validation only, no live sync from this module), OneDrive (URL validation
only).

---

# 10. Assumptions

Request Type/Project Type/Location master data confirmed by Legacy Lighting in Milestone 1.

---

# 11. Constraints

Manual classification only in MVP.

---

# 12. Traceability

| Rule | Requirement | API | Test |
|------|-------------|-----|------|
| BR-INTAKE-001 | FR-INTAKE-002 | POST /requests | TC-INTAKE-001 |
| BR-INTAKE-002 | FR-INTAKE-002 | POST /requests | TC-INTAKE-002 |
| BR-INTAKE-003 | FR-INTAKE-006 | POST /requests | TC-INTAKE-003 |
| BR-INTAKE-004 | FR-INTAKE-004 | POST /requests/{id}/convert | TC-INTAKE-004 |
| BR-INTAKE-005 | FR-INTAKE-002 | POST /requests | TC-INTAKE-005 |

---

# 13. Related Documents

`1-module.md`, `2-functional-specification.md`, `6-validation.md`, `7-permissions.md`,
`8-api.md`, `9-ui.md`, `11-testing.md`

---

# AI Generation Notes

Every rule here must trace to an approved FR-INTAKE-* requirement; do not invent business logic
not present in the BRD or Project Plan.
