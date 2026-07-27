# Schema

> **Purpose**
>
> Database schema for the Request Intake module: the `requests` table and its direct references.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Request Intake |
| Version | 1.0 |
| Status | Draft |
| Database | PostgreSQL |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define the `requests` table structure feeding the intake queue and conversion flow.

High-level entities: requests (references customers, request_types, project_types, locations,
priorities, users).

Design principles: UUID PK, soft delete, audit columns — per `docs/2-database/4-database-standards.md`.

---

# 2. Entity Relationship Diagram

See `docs/2-database/2-erd.md` Section 5 ("Customers → Requests", "Projects → Requests",
"Requests → Tasks").

---

# 3. Entities

## Request

Purpose: an incoming/manual project request prior to task conversion.

Relationships: belongs to a Customer, optionally an existing Project (`project_id`) or a
not-yet-created project named inline (`new_project_name`) — never both; references Request
Type, Priority, Location, assigned Processor and Estimator; produces at most one Task.

---

# 4. Table Definitions

## requests

Description: incoming/manual requests captured via Request Intake.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| customer_id | UUID | No | — |
| project_id | UUID | Yes | — |
| new_project_name | VARCHAR | Yes | — |
| request_type_id | UUID | No | — |
| project_type_id | UUID | Yes | — |
| location_id | UUID | Yes | — |
| priority_id | UUID | No | — |
| due_date | DATE | No | — |
| assigned_processor_id | UUID | Yes | — |
| assigned_estimator_id | UUID | Yes | — |
| sales_rep_name | VARCHAR | Yes | — |
| source | VARCHAR | No | 'Manual' |
| clarification_required | BOOLEAN | No | false |
| counts_provided | BOOLEAN | No | false |
| takeoff_required | BOOLEAN | No | false |
| layover | BOOLEAN | No | false |
| submittal | BOOLEAN | No | false |
| spec_package | BOOLEAN | No | false |
| ve_request | BOOLEAN | No | false |
| netsuite_relevant | BOOLEAN | No | false |
| netsuite_id | VARCHAR | Yes | — |
| onedrive_folder_url | VARCHAR | Yes | — |
| onedrive_prep_folder_url | VARCHAR | Yes | — |
| intake_status | VARCHAR | No | 'Draft' |
| notes | TEXT | Yes | — |
| created_at | TIMESTAMP WITH TIME ZONE | No | now() |
| updated_at | TIMESTAMP WITH TIME ZONE | No | now() |
| deleted_at | TIMESTAMP WITH TIME ZONE | Yes | — |
| created_by | UUID | No | — |
| updated_by | UUID | No | — |

Primary Key: `id`

Foreign Keys: `customer_id` → customers.id, `project_id` → projects.id, `request_type_id` →
request_types.id, `project_type_id` → project_types.id, `location_id` → locations.id,
`priority_id` → priorities.id, `assigned_processor_id`/`assigned_estimator_id` → users.id

Indexes: `idx_requests_intake_status`, `idx_requests_customer_id`, `idx_requests_due_date`

`sales_rep_name` is free text, not a `users.id` reference — sales reps originate requests but
are not one of the 5 platform roles (BRD Section 3.1 lists them as a stakeholder group, not a
user role) and don't necessarily log into the platform. `source` records the channel a request
arrived through (e.g. Outlook/Quotes Inbox, NetSuite, OneDrive, Manual) — confirmed against the
live Lovable UI's Intake Queue, which tags each item with its originating channel.
`layover`/`ve_request` extend the BRD's 4 work indicators (Counts Provided, Takeoff Required,
Submittal, Spec Package) to the 6 shown on the actual intake form.

Constraints: `netsuite_id` required (application-level) when `netsuite_relevant` = true;
`due_date` >= creation date (application-level, per BR-INTAKE-002); at most one of `project_id`
/ `new_project_name` set (application-level CHECK, per BR-INTAKE-005)

---

# 5. Relationships

One-to-One: `requests.id` ↔ `tasks.request_id` (once converted).

One-to-Many: Customer→Requests, Project→Requests, Request Type→Requests.

Many-to-Many: none.

---

# 6. Constraints

Primary Key on `id`; Foreign Keys as listed above; NOT NULL on customer_id, request_type_id,
priority_id, due_date, intake_status.

---

# 7. Index Strategy

Performance indexes on `intake_status`, `customer_id`, `due_date` to support queue filtering
and sorting.

---

# 8. Cascading Rules

ON DELETE: RESTRICT for master-data FKs still in use; SET NULL for `assigned_estimator_id`/
`assigned_processor_id` if a user is deactivated (soft-deleted).

ON UPDATE: CASCADE for surrogate key changes (not expected in practice with UUIDs).

---

# 9. Data Integrity

Referential integrity enforced via FKs. `intake_status` transitions restricted at the
application layer per `3-business-rules.md` Section 6.

---

# 10. Migration Notes

Created in Milestone 2 (Platform Foundation & Request Intake) after master data and customers
tables exist.

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

Keep this schema consistent with `docs/2-database/1-database-design.md` naming and standard
column conventions.
