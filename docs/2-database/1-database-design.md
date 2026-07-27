# Database Design

> **Purpose**
>
> This document defines the logical and physical database design for the project. It describes the database architecture, entities, relationships, naming conventions, indexing strategy, constraints, and design standards. It serves as the primary reference for database implementation and future maintenance.

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

A single PostgreSQL database backs the platform: users/roles, master/config data (request types,
project types, locations, statuses, priorities), the Customer master, and the core transactional
chain Request → Task → Project, plus supporting Notes, Activity History, and connected-system
reference tables for NetSuite and OneDrive. Normalized relational design (3NF), UUID primary
keys, soft delete, and standard audit columns throughout.

---

# 2. Database Overview

## Database Engine

- PostgreSQL

## Architecture

- Relational, normalized schema
- UUID primary keys
- Soft delete support (`deleted_at`)
- Standard audit columns on all tables
- Per-entity-type status/priority master tables rather than hardcoded enums, so Admins can
  configure them (FR-SETTINGS-002 through FR-SETTINGS-006)

---

# 3. Design Principles

- Third Normal Form (3NF)
- Avoid redundant data — master data (request types, project types, locations, statuses,
  priorities) lives in dedicated config tables, referenced by FK, not duplicated as strings
- UUID primary keys
- Foreign key integrity enforced at the database level
- Soft delete on all business entities (never hard-delete customer/project/task/request data)
- Audit trail via `created_by`/`updated_by` plus a dedicated `activity_logs` table
- Consistent snake_case naming

---

# 4. Entity Overview

| Entity | Description |
|---------|-------------|
| users | Platform user accounts |
| roles | Admin, Manager, Processor, Estimator, Viewer |
| customers | Customer master (name, NetSuite reference) |
| requests | Incoming/manual requests prior to task conversion |
| tasks | Actionable work items assigned to estimators |
| projects | High-level container linking requests/tasks for a customer engagement |
| notes | Internal notes attached to tasks/projects |
| activity_logs | Audit trail of status changes, assignments, extensions |
| request_types | Master data: New Quote, Revision, Takeoff, Submittal, Clarification |
| project_types | Master data: Multifamily, Commercial, Retail, Hospitality |
| locations | Master data: office/region locations (name, state, short code) |
| statuses | Master data: per-entity-type (task/project/request) status list with color |
| priorities | Master data: priority levels with numeric rank and color |
| netsuite_references | Linked NetSuite customer/project/quote records (read-only cache) |
| onedrive_links | Manual project/task-to-OneDrive-folder associations |

---

# 5. Entity Relationships

| Parent Entity | Child Entity | Relationship |
|---------------|--------------|--------------|
| roles | users | One-to-Many |
| customers | projects | One-to-Many |
| customers | requests | One-to-Many |
| projects | requests | One-to-Many |
| projects | tasks | One-to-Many |
| requests | tasks | One-to-One (a converted request produces one task) |
| tasks | notes | One-to-Many |
| projects | notes | One-to-Many |
| users | tasks | One-to-Many (assigned estimator) |
| users | requests | One-to-Many (assigned processor) |
| request_types | requests | One-to-Many |
| project_types | projects | One-to-Many |
| locations | projects | One-to-Many |
| statuses | tasks / projects / requests | One-to-Many (scoped by entity_type) |
| priorities | tasks / requests | One-to-Many |
| projects | netsuite_references | One-to-Many |
| projects / tasks | onedrive_links | One-to-Many |
| tasks / projects / requests | activity_logs | One-to-Many (polymorphic via entity_type + entity_id) |

---

# 6. Database Schema Overview

## Security

- users
- roles

## Master Data

- customers
- request_types
- project_types
- locations
- statuses
- priorities

## Transactions

- requests
- tasks
- projects
- notes

## Integration Reference

- netsuite_references
- onedrive_links

## Audit

- activity_logs

---

# 7. Naming Conventions

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

- snake_case: `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`

## Primary Keys

- `id` (UUID)

## Foreign Keys

- `user_id`, `customer_id`, `project_id`, `request_id`, `task_id`, `request_type_id`,
  `project_type_id`, `location_id`, `status_id`, `priority_id`

## Index Names

- `idx_tasks_status_id`, `idx_tasks_assigned_estimator_id`, `idx_requests_intake_status_id`,
  `idx_projects_customer_id`

---

# 8. Standard Columns

Every table includes the following unless noted otherwise (see entity-specific schema docs
under `docs/5-modules/<module>/4-schema.md` for exceptions on pure lookup tables):

| Column | Type | Description |
|----------|------|-------------|
| id | UUID | Primary Key |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation time |
| updated_at | TIMESTAMP WITH TIME ZONE | Last update time |
| deleted_at | TIMESTAMP WITH TIME ZONE | Soft delete timestamp (nullable) |
| created_by | UUID | References `users.id` |
| updated_by | UUID | References `users.id` |

---

# 9. Constraints

- Primary keys on all tables (UUID)
- Foreign keys enforced for all relationships in Section 5
- Unique constraint on `users.email`
- Unique constraint on `(entity_type, name)` for `statuses` (so "In Progress" is distinct per task/project/request)
- Unique constraint on `priorities.level`
- CHECK constraint enforcing minimum 3 active rows in `priorities` (application-level enforcement, documented here for traceability — see FR-SETTINGS-006)
- NOT NULL on required fields per each module's `4-schema.md`

---

# 10. Indexing Strategy

- Primary keys (automatic)
- Foreign keys: `tasks.project_id`, `tasks.assigned_estimator_id`, `requests.customer_id`,
  `requests.project_id`, `projects.customer_id`
- Frequently filtered columns: `tasks.status_id`, `tasks.due_date`, `requests.intake_status`,
  `projects.status_id`
- Unique index: `users.email`
- Composite index: `activity_logs(entity_type, entity_id, created_at)` for fast per-record history lookups

---

# 11. Data Integrity

- Referential integrity enforced via foreign keys; `ON DELETE RESTRICT` for master-data
  references still in use (request_types, project_types, locations, statuses, priorities)
- Soft delete only — `deleted_at` set, never a physical `DELETE`, on customers/projects/
  requests/tasks/users
- Request-to-task conversion is transactional: task row insert + request `intake_status` update
  happen in one transaction

---

# 12. Performance Considerations

- Pagination on all list endpoints (project list, task list, reports) — see `3-api/1-api-design.md`
- Composite indexes for dashboard aggregation queries (status + due_date)
- Connection pooling (min/max confirmed in Milestone 1)
- No partitioning required at MVP data volumes (10,000+ tasks, 5,000+ projects target scale)

---

# 13. Security Considerations

- Least-privilege database role for the application user (no superuser)
- Passwords hashed with bcrypt at the application layer; never stored in this database in
  plaintext
- No sensitive NetSuite/OneDrive credentials stored in application tables — secrets live in
  the platform's secrets manager (see `6-development/7-deployment-strategy.md`)
- Audit logging via `activity_logs` for all privileged operations

---

# 14. Backup & Recovery

- Automated daily backups, retained 30 days
- Point-in-time recovery within 24 hours (RPO)
- RTO: 4 hours
- Backup restoration tested quarterly

---

# 15. Migration Strategy

See `docs/2-database/3-migration-strategy.md` for full detail. Summary:

- Versioned, ORM-native migrations (tool confirmed in Milestone 1)
- One logical schema change per migration; rollback required for each
- Master-data seed migrations kept separate from schema migrations

---

# 16. Assumptions

- Migration/ORM tooling is confirmed during Milestone 1 (Discovery, Workflow & Technical Setup)
- Confirmed active customer/project/task data will be used for initial load; broader historical
  migration is out of scope for MVP

---

# 17. Constraints

- PostgreSQL only
- UUID primary keys throughout
- UTC timestamps
- Soft delete required on all business entities

---

# 18. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Historical data quality (overloaded labels) | Inconsistent project/task data on import | Load confirmed active data first with structured fields; handle broader migration separately |
| Undecided ORM/migration tool | Blocks schema implementation start | Confirm in Milestone 1 before Milestone 2 begins |

---

# 19. Related Documents

- `1-project/1-project-overview.md`
- `1-project/2-requirements.md`
- `2-erd.md`
- `3-migration-strategy.md`
- `4-database-standards.md`
- `docs/5-modules/*/4-schema.md` and `5-data-dictionary.md`
- `docs/3-api/1-api-design.md`

---

# 20. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft derived from BRD and Project Plan |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Solution Architect | | Pending | |
| Database Architect | | Pending | |
| Technical Lead | | Pending | |

---

# AI Generation Notes

When generating this document, the AI should:

- Follow the approved project requirements and architecture.
- Design a normalized relational database unless otherwise specified.
- Use consistent naming conventions across all database objects.
- Identify entities and relationships from approved features.
- Apply appropriate primary keys, foreign keys, indexes, and constraints.
- Include standard audit and soft-delete columns where applicable.
- Avoid implementation-specific SQL statements in this document.
- Ensure consistency with the Schema Design, Data Dictionary, and Module Specifications.
