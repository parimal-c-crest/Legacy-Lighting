# Permissions

> **Purpose**
>
> Authorization rules for the Task Workbench module.

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

Purpose: define who can view, update, reassign, and complete tasks.

Authorization model: RBAC.

---

# 2. Roles

Admin, Manager, Processor, Estimator, Viewer.

---

# 3. Permission Matrix

| Permission | Admin | Manager | Processor | Estimator | Viewer |
|---|---|---|---|---|---|
| tasks.view | ✔ (all) | ✔ (all) | ✔ (all) | own only | ✔ (all, read-only) |
| tasks.create | ✔ | ✔ | ✔ | — | — |
| tasks.update | ✔ | ✔ | assignment only | own only | — |
| tasks.reassign | ✔ | ✔ | ✔ | — | — |
| tasks.delete (soft) | ✔ | ✔ | — | — | — |
| tasks.extend_due_date | ✔ | ✔ | — | own only | — |

---

# 4. Ownership Rules

Estimators can view/update only tasks where they are the assigned estimator (BR-WORKBENCH-001).
Managers/Admin/Processor act on any task.

---

# 5. Record-Level Permissions

Not Started / In Progress / Awaiting Info / Under Review: editable by owner and Manager/Admin.

Completed: read-only to all (no further status changes, BR-WORKBENCH rules Section 6).

---

# 6. Field-Level Permissions

Editable fields: status, notes, due-date extension, awaiting-info flag — all by the assigned
Estimator; assignment/priority override — Manager/Admin only.

---

# 7. Action Permissions

Create: Manager/Admin/Processor (via request conversion or manual). Update: assigned Estimator
(own), Manager/Admin (any). Reassign: Manager/Admin/Processor. Delete (soft): Manager/Admin.

---

# 8. API Authorization

| Endpoint | Required Permission |
|---|---|
| GET /tasks | tasks.view |
| GET /tasks/{id} | tasks.view |
| PATCH /tasks/{id}/status | tasks.update |
| POST /tasks/{id}/extend | tasks.extend_due_date |
| PATCH /tasks/{id}/reassign | tasks.reassign |
| POST /tasks/{id}/notes | tasks.update |

---

# 9. UI Authorization

Reassignment control hidden from Estimator/Viewer. Status dropdown disabled once Completed.

---

# 10. Audit Requirements

All status changes, reassignments, and extensions logged to `activity_logs` with actor and
timestamp.

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

Keep consistent with `docs/3-api/3-authorization.md` Section 7.
