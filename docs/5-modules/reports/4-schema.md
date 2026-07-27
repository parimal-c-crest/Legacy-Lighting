# Schema

> **Purpose**
>
> Database schema notes for the Reports module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Reports |
| Version | 1.0 |
| Status | Draft |
| Database | PostgreSQL |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

This module owns no tables — it aggregates `tasks`, `requests`, `projects`, `customers`, and
`netsuite_references` owned by other modules.

---

# 2. Entity Relationship Diagram

See `docs/2-database/2-erd.md`.

---

# 3. Entities

None owned.

---

# 4. Table Definitions

None — see Task Workbench, Request Intake, Projects 360 schema docs.

---

# 5. Relationships

N/A.

---

# 6. Constraints

N/A.

---

# 7. Index Strategy

Relies on indexes defined in owning modules (`tasks.assigned_estimator_id`, `tasks.due_date`,
`requests.customer_id`, `requests.request_type_id`) to keep report generation within
NFR-PERF-002 targets.

---

# 8. Cascading Rules

N/A.

---

# 9. Data Integrity

N/A — read-only.

---

# 10. Migration Notes

No dedicated migration; built once source tables exist (Milestone 4).

---

# 11. Related Documents

`docs/2-database/2-erd.md`, source module schema docs.

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft — no owned tables |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Database Architect | | Pending | |

# AI Generation Notes

Reference source tables rather than redefining them.
