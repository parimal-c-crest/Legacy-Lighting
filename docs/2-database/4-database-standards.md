# Database Standards

> **Purpose**
>
> This document defines the database development standards and conventions that must be followed throughout the project. It ensures consistency, maintainability, performance, data integrity, and scalability across all database objects and implementations.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Database | PostgreSQL |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

Normalized (3NF) PostgreSQL schema, UUID primary keys, soft delete, and full audit columns on
every business table, with snake_case naming throughout. These standards apply uniformly across
the Request Intake, Task Workbench, Projects 360, Executive Dashboard, Reports, and Settings &
Administration modules.

---

# 2. Design Principles

- Normalize data to Third Normal Form (3NF)
- Avoid redundant data — reference master data by foreign key (statuses, priorities, request
  types, project types, locations) rather than duplicating strings
- Maintain referential integrity via foreign key constraints
- Use UUID primary keys
- Support soft deletion (`deleted_at`) on every business entity
- Maintain audit history (`created_by`, `updated_by`, plus `activity_logs`)
- Optimize for readability and maintainability given the 2-developer team and 5-week timeline

---

# 3. Naming Conventions

## Tables

- snake_case, plural nouns

```
users
requests
tasks
projects
notes
activity_logs
request_types
project_types
locations
statuses
priorities
netsuite_references
onedrive_links
```

## Columns

- snake_case, descriptive, no non-standard abbreviations

```
first_name
last_name
due_date
extended_due_date
intake_status
assigned_estimator_id
created_at
updated_at
deleted_at
```

## Primary Keys

```
id UUID PRIMARY KEY
```

## Foreign Keys

```
user_id
customer_id
project_id
request_id
task_id
request_type_id
project_type_id
location_id
status_id
priority_id
```

## Indexes

```
idx_tasks_status_id
idx_tasks_assigned_estimator_id
idx_requests_intake_status_id
idx_projects_customer_id
idx_users_email
```

## Constraints

```
pk_tasks
fk_tasks_project
uq_users_email
uq_priorities_level
chk_priorities_min_active
```

---

# 4. Standard Columns

Unless otherwise specified, every business table includes:

| Column | Type | Description |
|----------|------|-------------|
| id | UUID | Primary Key |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation time |
| updated_at | TIMESTAMP WITH TIME ZONE | Last modified time |
| deleted_at | TIMESTAMP WITH TIME ZONE | Soft delete timestamp (nullable) |
| created_by | UUID | References `users.id` |
| updated_by | UUID | References `users.id` |

Pure lookup/master tables (e.g. `statuses`, `priorities`) may omit `deleted_at` in favor of an
`active` boolean flag, per FR-SETTINGS-002 through FR-SETTINGS-006 ("Inactive types hidden in
dropdowns but retained in historical data").

---

# 5. Data Types

| Purpose | Data Type |
|----------|-----------|
| Primary Key | UUID |
| Name / short text | VARCHAR |
| Notes / long text | TEXT |
| Boolean flags (e.g. `awaiting_information`, `not_in_netsuite`) | BOOLEAN |
| Numeric rank (e.g. `priorities.level`) | INTEGER |
| Monetary values (e.g. quote value, future phase) | NUMERIC |
| Dates (e.g. `due_date`) | DATE |
| Date & time (e.g. `created_at`) | TIMESTAMP WITH TIME ZONE |
| Flexible metadata (e.g. NetSuite payload snapshot) | JSONB |

---

# 6. Constraints

- Primary Key on every table
- Foreign Key on every relationship documented in `2-erd.md`
- Unique: `users.email`, `priorities.level`, `(entity_type, name)` on `statuses`
- NOT NULL on required business fields (Customer, Request Type, Due Date, Priority on requests
  per FR-INTAKE-002)
- CHECK: due dates cannot be in the past at creation time (FR-INTAKE-002); minimum 20 characters
  enforced at the application layer for extension reasons (FR-WORKBENCH-006)
- DEFAULT: `created_at`/`updated_at` default to `now()`; boolean flags default `false`

---

# 7. Indexing Standards

- Index all primary keys (automatic) and foreign keys
- Index frequently filtered/sorted columns: `tasks.status_id`, `tasks.due_date`,
  `requests.intake_status`, `projects.status_id`
- Unique index on `users.email`
- Composite index on `activity_logs(entity_type, entity_id, created_at)` for per-record history
- Avoid unnecessary indexes given MVP data volumes (10,000+ tasks, 5,000+ projects target)

---

# 8. Relationships

- One-to-One: `requests.id` ↔ `tasks.request_id` (converted request to its task)
- One-to-Many: the majority of relationships — see `2-erd.md` Relationship Matrix
- Many-to-Many: none required for MVP (roles are a fixed enum, not a junction table)
- Foreign key constraints enforced for every relationship unless explicitly justified in
  `1-database-design.md`

---

# 9. Audit Standards

Every auditable table supports:

- created_at
- updated_at
- created_by
- updated_by
- deleted_at (soft delete, business tables) or active (master/lookup tables)

Optional (future phase):

- deleted_by
- version (optimistic locking)

Cross-cutting audit trail lives in `activity_logs`, capturing status changes, assignments,
reassignments, and due-date extensions per NFR-COMP-002 (7-year retention, read-only).

---

# 10. Security Standards

- Store passwords using bcrypt (10 rounds); never plaintext
- No sensitive NetSuite/OneDrive credentials stored in application tables — use the platform
  secrets manager
- Restrict direct database access to the application's least-privilege role
- Apply least-privilege principles for any reporting/read-replica access (future phase)

---

# 11. Performance Standards

- Optimize indexes for dashboard and report aggregation queries (Section 7)
- Avoid unnecessary joins in list endpoints; denormalize read-heavy dashboard counts only if
  profiling shows it's needed
- Use pagination for all list endpoints (Project List, Task List, Reports)
- Optimize frequently executed queries (task list, project 360 detail, dashboard KPIs) to meet
  NFR-PERF-002 (≤200ms simple, ≤500ms complex aggregations)

---

# 12. Data Integrity Standards

- Enforce foreign keys for all relationships
- Prevent orphan records (e.g. a task must reference a valid project)
- Validate required data at both application (Zod) and database (NOT NULL) layers
- Use transactions for multi-step operations (e.g. request-to-task conversion)
- Maintain referential integrity for master-data references (`ON DELETE RESTRICT` when in use)

---

# 13. Soft Delete Standards

- Use `deleted_at` on customers, projects, requests, tasks, users, notes
- Exclude soft-deleted records from default queries
- Avoid permanent deletion unless explicitly approved (e.g. GDPR-style request, future phase)
- Master/lookup tables use an `active` boolean instead, per FR-SETTINGS-002 through -006

---

# 14. Backup & Recovery Standards

- Daily automated backups, retained 30 days
- Point-in-time recovery within 24 hours (RPO); RTO 4 hours
- Backup restoration tested quarterly
- Disaster recovery procedure documented in `docs/6-development/7-deployment-strategy.md`

---

# 15. Best Practices

- Keep schemas normalized (3NF)
- Use meaningful, descriptive names
- Document complex structures (e.g. polymorphic `activity_logs`) inline in schema docs
- Keep migrations small (see `3-migration-strategy.md`)
- Avoid duplicate data — reference master data by FK
- Use lookup tables for statuses/priorities/types instead of hardcoded enums, so Admins can
  configure them per FR-SETTINGS-002 through -006
- Review database changes before deployment (peer review, 2-developer team)

---

# 16. Assumptions

- ORM and migration tooling: Prisma (see `1-project/4-tech-stack.md`)
- PostgreSQL 16, hosted on Render (managed instance)

---

# 17. Constraints

- PostgreSQL database only
- UUID primary keys
- UTF-8 encoding
- UTC timestamps
- Soft delete required on business tables

---

# 18. Related Documents

- `1-project/1-project-overview.md`
- `1-project/2-requirements.md`
- `1-database-design.md`
- `2-erd.md`
- `3-migration-strategy.md`
- `docs/5-modules/*/4-schema.md`
- `docs/5-modules/*/5-data-dictionary.md`
- `docs/3-api/1-api-design.md`

---

# 19. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Database Architect | | Pending | |
| Technical Lead | | Pending | |
| Solution Architect | | Pending | |

---

# AI Generation Notes

When generating this document, the AI should:

- Follow PostgreSQL best practices and project architecture.
- Apply consistent naming conventions across all database objects.
- Recommend normalized schemas unless otherwise specified.
- Define standard columns for auditability and soft deletion.
- Encourage referential integrity and appropriate indexing.
- Keep standards technology-specific but implementation-independent.
- Ensure consistency with the Database Design, Migration Strategy, Schema Design, and Data Dictionary documents.
- Do not include project-specific table definitions; those belong in the Schema Design document.
