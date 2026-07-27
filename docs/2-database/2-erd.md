# Entity Relationship Diagram (ERD)

> **Purpose:**
> This document provides a high-level view of the application's database structure. It identifies the entities (tables), their relationships, ownership, and cardinality. Detailed table definitions, columns, indexes, and constraints are documented in each module's `4-schema.md`.

---

# Document Information

| Property | Value |
|----------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Document | Entity Relationship Diagram (ERD) |
| Version | 1.0 |
| Status | Draft |
| Owner | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Purpose

The ERD provides database overview, module relationships, foreign key relationships,
cardinality, and cross-module dependencies. Column definitions, data types, indexes, and
validation rules live in `docs/5-modules/<module>/4-schema.md`.

---

# 2. Database Overview

```
Administration
Users
Roles

Master Data
Request Types
Project Types
Locations
Statuses
Priorities

Customers

Request Intake
Requests

Task Workbench
Tasks
Notes

Projects 360
Projects

Integration
NetSuite References
OneDrive Links

Audit
Activity Logs
```

---

# 3. High-Level Relationship Diagram

```
Roles
   │
   ▼
Users ────────────────┐
   │                   │
   ▼                   ▼
Requests           Tasks (assigned_estimator_id)
   │                   ▲
   ▼                   │
Projects ───────────────┘
   │        │        │
   ▼        ▼        ▼
Notes   NetSuite   OneDrive
        References  Links

Customers
   │
   ├──────────────┐
   ▼              ▼
Projects       Requests

Request Types → Requests
Project Types → Projects
Locations     → Projects
Statuses      → Tasks / Projects / Requests   (scoped by entity_type)
Priorities    → Tasks / Requests

Tasks / Projects / Requests → Activity Logs   (polymorphic: entity_type + entity_id)
```

---

# 4. Entity List

| Module | Primary Entity |
|----------|----------------|
| Administration | users |
| Administration | roles |
| Master Data | request_types |
| Master Data | project_types |
| Master Data | locations |
| Master Data | statuses |
| Master Data | priorities |
| Customers | customers |
| Request Intake | requests |
| Task Workbench | tasks |
| Task Workbench | notes |
| Task Workbench | workflow_steps |
| Projects 360 | projects |
| Integration | netsuite_references |
| Integration | onedrive_links |
| Audit | activity_logs |

---

# 5. Relationships

## Users

```
Role
  1
  ↓
  Many
Users
```

Foreign Key: `users.role_id`

---

## Customers → Projects

```
Customer
  1
  ↓
  Many
Projects
```

Foreign Key: `projects.customer_id`

---

## Customers → Requests

```
Customer
  1
  ↓
  Many
Requests
```

Foreign Key: `requests.customer_id`

---

## Projects → Requests

```
Project
  1
  ↓
  Many
Requests
```

Foreign Key: `requests.project_id`

---

## Projects → Tasks

```
Project
  1
  ↓
  Many
Tasks
```

Foreign Key: `tasks.project_id`

---

## Requests → Tasks

```
Request
  1
  ↓
  1
Task
```

Foreign Key: `tasks.request_id` (nullable — a task may also be created manually without a
source request)

---

## Users → Tasks (Estimator Assignment)

```
User
  1
  ↓
  Many
Tasks
```

Foreign Key: `tasks.assigned_estimator_id`

---

## Users → Requests (Processor Assignment)

```
User
  1
  ↓
  Many
Requests
```

Foreign Key: `requests.assigned_processor_id`

---

## Tasks / Projects → Notes

```
Task or Project
  1
  ↓
  Many
Notes
```

Foreign Key: `notes.task_id` or `notes.project_id` (mutually exclusive per note)

---

## Master Data Relationships

```
Request Type   1 → Many  Requests     (requests.request_type_id)
Project Type   1 → Many  Projects     (projects.project_type_id)
Location       1 → Many  Projects     (projects.location_id)
Status         1 → Many  Tasks/Projects/Requests   (scoped by entity_type column on statuses)
Priority       1 → Many  Tasks/Requests
```

---

## Projects → NetSuite References / OneDrive Links

```
Project
  1
  ↓
  Many
NetSuite References

Project or Task
  1
  ↓
  Many
OneDrive Links
```

---

# 6. Many-to-Many Relationships

None required for MVP. Role-permission mapping is handled via a fixed enum on `roles`
(Admin, Manager, Processor, Estimator, Viewer) rather than a junction table, per the BRD's
fixed 5-role model.

---

# 7. Relationship Matrix

| Parent | Child | Type |
|----------|--------|------|
| roles | users | 1:N |
| customers | projects | 1:N |
| customers | requests | 1:N |
| projects | requests | 1:N |
| projects | tasks | 1:N |
| requests | tasks | 1:1 |
| users | tasks | 1:N |
| users | requests | 1:N |
| tasks | notes | 1:N |
| projects | notes | 1:N |
| request_types | requests | 1:N |
| project_types | projects | 1:N |
| locations | projects | 1:N |
| statuses | tasks/projects/requests | 1:N |
| priorities | tasks/requests | 1:N |
| projects | netsuite_references | 1:N |
| projects/tasks | onedrive_links | 1:N |
| tasks/projects/requests | activity_logs | 1:N (polymorphic) |

---

# 8. Cross-Module Dependencies

| Module | Depends On |
|----------|------------|
| Request Intake | Customers, Master Data (request_types, locations, priorities), Users |
| Task Workbench | Request Intake, Projects, Users, Master Data (statuses, priorities) |
| Projects 360 | Task Workbench, Request Intake, Customers, Master Data |
| Executive Dashboard & Reports | Projects 360, Task Workbench |
| Settings & Administration | Users, Roles, all Master Data tables |
| Integration (NetSuite/OneDrive) | Projects, Tasks, Settings & Administration |

---

# 9. Entity Ownership

| Entity | Module |
|----------|--------|
| users | Settings & Administration |
| roles | Settings & Administration |
| request_types, project_types, locations, statuses, priorities | Settings & Administration |
| customers | Settings & Administration (master) / referenced by Request Intake, Projects 360 |
| requests | Request Intake |
| tasks | Task Workbench |
| notes | Task Workbench / Projects 360 |
| workflow_steps | Task Workbench (seeded per request_type_id) |
| projects | Projects 360 |
| netsuite_references, onedrive_links | Integration (cross-cutting) |
| activity_logs | Audit (cross-cutting) |

---

# 10. Business Rules Reference

Business rules are documented per-module in `docs/5-modules/<module>/3-business-rules.md`.

Examples:

- A task must reference a valid project.
- A request converted to a task cannot be converted again (enforced via `intake_status`).
- Master-data values in use cannot be deleted (only deactivated).

---

# 11. Detailed Schema References

| Module | Schema Document |
|----------|-----------------|
| Request Intake | `docs/5-modules/request-intake/4-schema.md` |
| Task Workbench | `docs/5-modules/task-workbench/4-schema.md` |
| Projects 360 | `docs/5-modules/projects-360/4-schema.md` |
| Executive Dashboard | `docs/5-modules/executive-dashboard/4-schema.md` |
| Reports | `docs/5-modules/reports/4-schema.md` |
| Settings & Administration | `docs/5-modules/settings-administration/4-schema.md` |

---

# 12. Related Documents

| Document | Purpose |
|----------|---------|
| `4-database-standards.md` | Database conventions |
| `1-database-design.md` | Overall database design |
| `3-migration-strategy.md` | Migration approach |
| `docs/5-modules/*/3-business-rules.md` | Business constraints per module |

---

# 13. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial version derived from BRD/Project Plan entities |

---

# Notes

- This document provides a high-level view of the database.
- Detailed table definitions belong in each module's `4-schema.md`.
- Changes to entity relationships should be reflected here before implementation.
- Every foreign key relationship should be represented in this document.
