# Validation Rules

> **Purpose**
>
> Validation rules for the Request Intake module.

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

Purpose: ensure request data is complete and consistent before conversion to a task.

Scope: request creation/edit form and API.

Validation philosophy: validate at the API boundary with Zod; drafts are exempt from mandatory
field checks.

---

# 2. Validation Categories

- Required Fields (submit only, not draft)
- Format Validation (NetSuite ID, OneDrive URL)
- Date Validation (due date not in the past)
- Cross-Field Validation (NetSuite ID required when NetSuite Relevant is checked; project_id
  and new_project_name mutually exclusive)
- Business Validation (cannot convert an already-converted request)

---

# 3. Field Validation

| Field | Rule | Error Message |
|--------|------|---------------|
| customer_id | Required on submit | "Customer is required." |
| request_type_id | Required on submit | "Request Type is required." |
| due_date | Required on submit; not before today | "Due date is required and cannot be in the past." |
| priority_id | Required on submit | "Priority is required." |
| netsuite_id | Required and format-checked when netsuite_relevant = true | "NetSuite ID is required and must match the expected format." |
| onedrive_folder_url | Must be a onedrive.live.com / sharepoint.com domain when provided | "OneDrive link must be a valid OneDrive URL." |
| new_project_name | Not blank if provided; cannot be set together with project_id | "New project name cannot be combined with an existing project selection." |

---

# 4. Cross-Field Validation

- `netsuite_relevant = true` → `netsuite_id` required (BR-INTAKE-003).
- `project_id` and `new_project_name` are mutually exclusive (BR-INTAKE-005).

---

# 5. Business Validation

- `customer_id` must reference an active (non-deleted) customer.
- `assigned_estimator_id`, if set, must reference a user with the Estimator role.
- A request with `intake_status = 'Converted'` cannot be edited or re-converted (BR-INTAKE-004).

---

# 6. File Validation

Not applicable — no file uploads in this module (link-only OneDrive references).

---

# 7. Import Validation

Not applicable in MVP (no bulk import for requests).

---

# 8. API Validation

Headers: `Authorization: Bearer <token>` required.

Parameters: pagination (`page`, `page_size`), filters (`status`, `source`, `search`).

Request body: validated per Section 3 via Zod schema.

Authentication: required for all endpoints.

---

# 9. Validation Order

1. Required (submit only)
2. Format (NetSuite ID, OneDrive URL)
3. Cross-field (NetSuite ID dependency)
4. Business validation (customer active, estimator role, conversion state)
5. Database constraints (FK integrity)

---

# 10. Error Messages

Centralized in the standard error response format — see `docs/3-api/6-error-handling.md`.

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

Keep every rule traceable to an FR-INTAKE-* requirement or BR-INTAKE-* business rule.
