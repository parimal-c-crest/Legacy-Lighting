# Schema

> **Purpose**
>
> Database schema for the Projects 360 module: the `projects` table.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Projects 360 |
| Version | 1.0 |
| Status | Draft |
| Database | PostgreSQL |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define the `projects` table; this module also reads (but does not own) `tasks`,
`requests`, `notes`, `activity_logs`, `netsuite_references`, `onedrive_links`.

Design principles: UUID PK, soft delete, audit columns.

---

# 2. Entity Relationship Diagram

See `docs/2-database/2-erd.md` Section 5 ("Customers → Projects", "Projects → Requests",
"Projects → Tasks").

---

# 3. Entities

## Project

Purpose: high-level container for a customer engagement, aggregating tasks and requests.

Relationships: belongs to a Customer; references Project Type, Location, Status; has many
Tasks, Requests, Notes, NetSuite References, OneDrive Links.

---

# 4. Table Definitions

## projects

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| customer_id | UUID | No | — |
| name | VARCHAR | No | — |
| project_type_id | UUID | Yes | — |
| location_id | UUID | Yes | — |
| status_id | UUID | No | — |
| owner_id | UUID | Yes | — |
| created_at | TIMESTAMP WITH TIME ZONE | No | now() |
| updated_at | TIMESTAMP WITH TIME ZONE | No | now() |
| deleted_at | TIMESTAMP WITH TIME ZONE | Yes | — |
| created_by | UUID | No | — |
| updated_by | UUID | No | — |

Primary Key: `id`

Foreign Keys: `customer_id` → customers.id, `project_type_id` → project_types.id,
`location_id` → locations.id, `status_id` → statuses.id, `owner_id` → users.id

Indexes: `idx_projects_customer_id`, `idx_projects_status_id`

Constraints: NOT NULL on customer_id, name, status_id

---

# 5. Relationships

One-to-Many: Customer→Projects, Project→Tasks, Project→Requests, Project→Notes,
Project→NetSuite References, Project/Task→OneDrive Links.

---

# 6. Constraints

Primary/Foreign Keys as above. Progress %, Overdue, and Awaiting Info are derived at query time
(see `3-business-rules.md`), not stored columns.

---

# 7. Index Strategy

`idx_projects_status_id` and `idx_projects_customer_id` support list filtering; the 360 detail
aggregation relies on the indexes already defined on `tasks.project_id` and
`requests.project_id` (see their respective `4-schema.md`).

---

# 8. Cascading Rules

ON DELETE: RESTRICT — a project with related tasks/requests cannot be hard-deleted (soft delete
only in any case).

---

# 9. Data Integrity

Referential integrity via FKs; derived metrics recalculated on read, never cached in a stale
column for MVP.

---

# 10. Migration Notes

Created early (Milestone 2) since `requests` and `tasks` both reference `projects.id`.

---

# 11. Related Documents

`5-data-dictionary.md`, `3-business-rules.md`, `8-api.md`, `docs/2-database/2-erd.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Database Architect | | Pending | |

# AI Generation Notes

Keep consistent with `docs/2-database/1-database-design.md`.
