# Schema

> **Purpose**
>
> Database schema notes for the Executive Dashboard module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Executive Dashboard |
| Version | 1.0 |
| Status | Draft |
| Database | PostgreSQL |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

This module owns no tables of its own — it is a read/aggregation layer over `projects`,
`tasks`, `requests`, and `netsuite_references` (owned by Projects 360, Task Workbench, Request
Intake, and the Integration layer respectively).

---

# 2. Entity Relationship Diagram

See `docs/2-database/2-erd.md`; no new entities introduced here.

---

# 3. Entities

None owned by this module.

---

# 4. Table Definitions

None — see `docs/5-modules/projects-360/4-schema.md`, `task-workbench/4-schema.md`,
`request-intake/4-schema.md`.

---

# 5. Relationships

N/A (read-only aggregation across existing FKs).

---

# 6. Constraints

N/A.

---

# 7. Index Strategy

Relies on indexes already defined on `tasks.status_id`, `tasks.due_date`, `projects.status_id`
(see their schema docs) to keep dashboard aggregation within NFR-PERF-002 targets.

---

# 8. Cascading Rules

N/A.

---

# 9. Data Integrity

N/A — this module does not write data.

---

# 10. Migration Notes

No dedicated migration; built once `projects`, `tasks`, `requests` exist (Milestone 4).

---

# 11. Related Documents

`docs/2-database/2-erd.md`, `docs/5-modules/projects-360/4-schema.md`,
`docs/5-modules/task-workbench/4-schema.md`

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

Do not duplicate table definitions owned by other modules; reference them instead.
