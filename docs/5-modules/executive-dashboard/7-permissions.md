# Permissions

> **Purpose**
>
> Authorization rules for the Executive Dashboard module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Executive Dashboard |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define who can view the dashboard and Monday Meeting View.

Authorization model: RBAC.

---

# 2. Roles

Admin, Manager, Viewer (dashboard view only). Processor and Estimator have no dashboard menu
item (`docs/4-ui/1-navigation.md`) and are hard-blocked at the API layer too (confirmed
2026-07-27) — not just hidden from navigation.

---

# 3. Permission Matrix

| Permission | Admin | Manager | Processor | Estimator | Viewer |
|---|---|---|---|---|---|
| dashboard.view | ✔ | ✔ | ✘ (403) | ✘ (403) | ✔ |
| dashboard.monday_meeting.view | ✔ | ✔ | ✘ (403) | ✘ (403) | — |

---

# 4. Ownership Rules

None — dashboard shows portfolio-wide data, not user-scoped.

---

# 5. Record-Level Permissions

Not applicable (aggregated view, no individual records).

---

# 6. Field-Level Permissions

All fields read-only to all permitted roles.

---

# 7. Action Permissions

View only — no create/update/delete/export actions in this module (export lives in Reports).

---

# 8. API Authorization

| Endpoint | Required Permission |
|---|---|
| GET /dashboard/project-status | dashboard.view |
| GET /dashboard/sales-outlook | dashboard.view |
| GET /dashboard/top-blockers | dashboard.view |
| GET /dashboard/monday-meeting | dashboard.monday_meeting.view |

---

# 9. UI Authorization

Executive Dashboard menu item hidden for Processor/Estimator per `docs/4-ui/1-navigation.md`,
backed by the API-level 403 in Section 3 — not navigation-only.

---

# 10. Audit Requirements

No write actions to audit; page views not logged in MVP.

---

# 11. Related Documents

`1-module.md`, `8-api.md`, `docs/3-api/3-authorization.md`

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

Processor/Estimator dashboard access is resolved: hard-blocked at the API (403), not just
hidden from navigation.
