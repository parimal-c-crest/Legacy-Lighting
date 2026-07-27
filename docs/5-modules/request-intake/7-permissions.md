# Permissions

> **Purpose**
>
> Authorization rules for the Request Intake module.

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

Purpose: define who can view, create, edit, and convert requests.

Scope: request queue, creation form, draft management, conversion action.

Authorization model: RBAC (see `docs/3-api/3-authorization.md`).

---

# 2. Roles

Admin, Manager, Processor, Estimator, Viewer.

---

# 3. Permission Matrix

| Permission | Admin | Manager | Processor | Estimator | Viewer |
|---|---|---|---|---|---|
| requests.view | ✔ | ✔ | ✔ | own only | ✔ |
| requests.create | ✔ | ✔ | ✔ | — | — |
| requests.edit | ✔ | ✔ | ✔ (own) | — | — |
| requests.delete (soft) | ✔ | ✔ | — | — | — |
| requests.convert | ✔ | ✔ | ✔ | — | — |

---

# 4. Ownership Rules

Processors can edit requests they created or are assigned as processor; Managers and Admins can
edit any request.

---

# 5. Record-Level Permissions

Draft: editable by creator, Manager, Admin.

New/Triaged: editable by assigned Processor, Manager, Admin.

Converted: read-only to all roles.

---

# 6. Field-Level Permissions

Editable fields: all, until Converted.

Read-only fields (post-conversion): all fields, plus `intake_status`.

Hidden fields: none role-specific in MVP.

---

# 7. Action Permissions

Create: Processor, Manager, Admin. Update: Processor (own), Manager, Admin. Delete (soft):
Manager, Admin. Convert: Processor, Manager, Admin. Export: not applicable to this module
directly (covered at Projects 360/Reports level).

---

# 8. API Authorization

| Endpoint | Required Permission |
|---|---|
| GET /requests | requests.view |
| POST /requests | requests.create |
| PUT /requests/{id} | requests.edit |
| DELETE /requests/{id} | requests.delete |
| POST /requests/{id}/convert | requests.convert |

---

# 9. UI Authorization

"Create Request" and "Convert to Task" buttons hidden for Estimator/Viewer. Edit controls
disabled for Converted requests for all roles.

---

# 10. Audit Requirements

Logging: creation, edits, conversion all written to `activity_logs`.

Permission failures: logged with user, endpoint, timestamp (NFR-SEC-002).

---

# 11. Related Documents

`1-module.md`, `3-business-rules.md`, `8-api.md`, `9-ui.md`, `docs/3-api/2-authentication.md`,
`docs/3-api/3-authorization.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Security Architect | | Pending | |

# AI Generation Notes

Keep this matrix consistent with `docs/3-api/3-authorization.md` Section 7 (Resource Access Matrix).
