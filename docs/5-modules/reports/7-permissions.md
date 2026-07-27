# Permissions

> **Purpose**
>
> Authorization rules for the Reports module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Reports |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define who can view and export each report.

Authorization model: RBAC.

---

# 2. Roles

Admin, Manager, Viewer. Viewer has export rights, same as Manager (confirmed 2026-07-27).

---

# 3. Permission Matrix

| Permission | Admin | Manager | Processor | Estimator | Viewer |
|---|---|---|---|---|---|
| reports.view | ✔ | ✔ | — | — | ✔ |
| reports.export | ✔ | ✔ | — | — | ✔ |
| reports.export_all | ✔ | ✔ | — | — | ✔ |

---

# 4. Ownership Rules

None — reports are portfolio-wide, not user-scoped.

---

# 5. Record-Level Permissions

Not applicable (aggregated view).

---

# 6. Field-Level Permissions

All fields read-only.

---

# 7. Action Permissions

View: Admin, Manager, Viewer. Export (single report): Admin, Manager, Viewer. Export All:
Admin, Manager, Viewer.

---

# 8. API Authorization

| Endpoint | Required Permission |
|---|---|
| GET /reports/{report-name} | reports.view |
| GET /reports/{report-name}/export | reports.export |
| GET /reports/export-all | reports.export_all |

---

# 9. UI Authorization

Export buttons hidden for Processor/Estimator only; visible to Viewer.

---

# 10. Audit Requirements

Exports logged (report name, filters, row count, requesting user).

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

Viewer export rights are resolved: Viewer can export, same as Manager.
