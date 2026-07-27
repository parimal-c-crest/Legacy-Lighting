# Permissions

> **Purpose**
>
> Authorization rules for the Projects 360 module.

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

Purpose: define who can view the project list/360 detail and trigger export or status override.

Authorization model: RBAC.

---

# 2. Roles

Admin, Manager, Processor, Estimator, Viewer.

---

# 3. Permission Matrix

| Permission | Admin | Manager | Processor | Estimator | Viewer |
|---|---|---|---|---|---|
| projects.view | ✔ | ✔ | ✔ | ✔ | ✔ |
| projects.export | ✔ | ✔ | — | — | — |
| projects.status_override | ✔ | ✔ | — | — | — |
| projects.reassign_task (shortcut into Task Workbench) | ✔ | ✔ | — | — | — |

---

# 4. Ownership Rules

No ownership restriction — all roles can view all projects (this module is a visibility layer,
per FR-PROJECTS-001).

---

# 5. Record-Level Permissions

Active/At Risk/Blocked: viewable by all; status override by Manager/Admin only.

Completed: read-only to all roles.

---

# 6. Field-Level Permissions

All fields read-only except `status_id`, editable by Manager/Admin only.

---

# 7. Action Permissions

Export: Manager/Admin. Status override: Manager/Admin. Reassign task shortcut: Manager/Admin
(delegates to Task Workbench's `tasks.reassign` permission).

---

# 8. API Authorization

| Endpoint | Required Permission |
|---|---|
| GET /projects | projects.view |
| GET /projects/{id} | projects.view |
| GET /projects/export | projects.export |
| PATCH /projects/{id}/status | projects.status_override |

---

# 9. UI Authorization

Export button hidden for Estimator/Viewer/Processor. Status dropdown in 360 detail disabled for
non-Manager/Admin.

---

# 10. Audit Requirements

Status overrides logged to `activity_logs`; exports logged with row count and filter state
applied.

---

# 11. Related Documents

`1-module.md`, `3-business-rules.md`, `8-api.md`, `9-ui.md`, `docs/3-api/3-authorization.md`

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

Consistent with `docs/3-api/3-authorization.md` Section 7.
