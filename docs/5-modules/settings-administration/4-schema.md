# Schema

> **Purpose**
>
> Database schema for the Settings & Administration module: `users`, `roles`, and the five
> master-data tables.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |
| Database | PostgreSQL |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define `users`, `roles`, `request_types`, `project_types`, `locations`, `statuses`,
`priorities` — the foundation tables every other module references.

Design principles: UUID PK, audit columns; master/lookup tables use `active` boolean instead of
`deleted_at` (per `docs/2-database/4-database-standards.md` Section 4).

---

# 2. Entity Relationship Diagram

See `docs/2-database/2-erd.md` Section 2 ("Administration", "Master Data").

---

# 3. Entities

## User

Purpose: platform account with a fixed role.

Relationships: has one Role; referenced by tasks (assigned_estimator_id), requests
(assigned_processor_id/assigned_estimator_id), projects (owner_id), and as created_by/updated_by
throughout.

## Role

Purpose: fixed enum (Admin, Manager, Processor, Estimator, Viewer).

## Request Type / Project Type / Location / Status / Priority

Purpose: configurable master data referenced by Requests, Tasks, and Projects.

---

# 4. Table Definitions

## users

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| email | VARCHAR | No | — |
| password_hash | VARCHAR | No | — |
| display_name | VARCHAR | No | — |
| role_id | UUID | No | — |
| time_zone | VARCHAR | Yes | 'UTC' |
| notification_preferences | JSONB | Yes | '{}' |
| active | BOOLEAN | No | true |
| failed_login_attempts | INTEGER | No | 0 |
| locked_until | TIMESTAMP WITH TIME ZONE | Yes | — |
| created_at | TIMESTAMP WITH TIME ZONE | No | now() |
| updated_at | TIMESTAMP WITH TIME ZONE | No | now() |

Primary Key: `id`. Foreign Keys: `role_id` → roles.id. Unique: `email`.

## roles

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| name | VARCHAR | No | — |

Seeded fixed set: Admin, Manager, Processor, Estimator, Viewer.

## request_types / project_types

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| name | VARCHAR | No | — |
| description | TEXT | Yes | — |
| active | BOOLEAN | No | true |
| sort_order | INTEGER | No | 0 |

## locations

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| name | VARCHAR | No | — |
| state | VARCHAR | No | — |
| code | VARCHAR | No | — |
| active | BOOLEAN | No | true |
| sort_order | INTEGER | No | 0 |

Unique: `code`. `state` added per Project Plan's "Location/State" field naming (see
`1-project/2-requirements.md` Open Question Q-005) — stored as its own column rather than
folded into `name`, so reports can filter/group by state independently of the display name.

## statuses

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| entity_type | VARCHAR | No | — |
| name | VARCHAR | No | — |
| color | VARCHAR | No | — |
| active | BOOLEAN | No | true |
| sort_order | INTEGER | No | 0 |

Unique: `(entity_type, name)`. `entity_type` in ('Task', 'Project', 'Request').

## priorities

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| name | VARCHAR | No | — |
| level | INTEGER | No | — |
| color | VARCHAR | No | — |
| active | BOOLEAN | No | true |

Unique: `level`.

---

# 5. Relationships

One-to-Many: Role→Users, RequestType→Requests, ProjectType→Projects, Location→Projects,
Status→Tasks/Projects/Requests (scoped by entity_type), Priority→Tasks/Requests.

---

# 6. Constraints

Primary keys on all tables; `users.email` unique; `locations.code` unique; `priorities.level`
unique; `statuses(entity_type, name)` unique; application-level CHECK maintaining ≥3 active
priorities.

---

# 7. Index Strategy

`idx_users_email` (unique), `idx_statuses_entity_type`.

---

# 8. Cascading Rules

ON DELETE: RESTRICT on all master-data FKs while referenced (enforced at application layer per
BR-SETTINGS-002, since these tables use `active` flags rather than hard delete in normal
operation).

---

# 9. Data Integrity

Master-data tables never hard-deleted while referenced; `active` flag governs dropdown
visibility without breaking historical FK integrity.

---

# 10. Migration Notes

Created first, in Milestone 2, before any dependent table (requests, tasks, projects).

---

# 11. Related Documents

`5-data-dictionary.md`, `6-validation.md`, `3-business-rules.md`, `8-api.md`,
`docs/2-database/2-erd.md`

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

These tables are prerequisites for every other module's schema — build first.
