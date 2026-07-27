# Permissions

> **Purpose**
>
> Authorization rules for the Settings & Administration module.

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

Purpose: define who can manage users, master data, and connected systems.

Authorization model: RBAC.

---

# 2. Roles

Admin, Manager, Processor, Estimator, Viewer.

---

# 3. Permission Matrix

| Permission | Admin | Manager | Processor | Estimator | Viewer |
|---|---|---|---|---|---|
| users.manage | ✔ | — | — | — | — |
| master_data.manage | ✔ | — | — | — | — |
| connected_systems.view | ✔ | ✔ | — | — | — |
| connected_systems.sync_trigger | ✔ | — | — | — | — |
| profile.manage_own | ✔ | ✔ | ✔ | ✔ | ✔ |

---

# 4. Ownership Rules

Every user can manage only their own profile (`profile.manage_own`); no cross-user profile
editing except by Admin via `users.manage`.

---

# 5. Record-Level Permissions

Active users/master data: fully manageable by Admin. Inactive: reactivatable by Admin only.

---

# 6. Field-Level Permissions

`users.password_hash` never exposed via API in any response.

---

# 7. Action Permissions

Create/Update/Deactivate: Admin only, for users and master data. Manual NetSuite sync trigger:
Admin only.

---

# 8. API Authorization

| Endpoint | Required Permission |
|---|---|
| POST/PUT/PATCH /users | users.manage |
| POST/PUT/PATCH/DELETE /request-types (and other master data) | master_data.manage |
| GET /connected-systems | connected_systems.view |
| POST /connected-systems/netsuite/sync | connected_systems.sync_trigger |
| PUT /profile | profile.manage_own |

---

# 9. UI Authorization

Settings menu items for Users/Master Data hidden for non-Admin; Connected Systems visible
read-only to Manager; My Profile visible to all.

---

# 10. Audit Requirements

All user and master-data changes logged to `activity_logs` with actor, before/after values.

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

Admin-only enforcement is the default posture for this module — least privilege.
