# Schema

> **Purpose**
>
> Database schema for the Task Workbench module: `tasks`, `notes`, and `workflow_steps`.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Task Workbench |
| Version | 1.0 |
| Status | Draft |
| Database | PostgreSQL |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define `tasks` and `notes` table structures.

High-level entities: tasks (references projects, requests, users, statuses, priorities), notes
(polymorphic to tasks or projects).

Design principles: UUID PK, soft delete, audit columns.

---

# 2. Entity Relationship Diagram

See `docs/2-database/2-erd.md` Section 5 ("Requests → Tasks", "Projects → Tasks",
"Users → Tasks").

---

# 3. Entities

## Task

Purpose: actionable work item assigned to an estimator.

Relationships: belongs to a Project; optionally sourced from a Request; references Status,
Priority, assigned Estimator; has many Notes.

## Note

Purpose: internal comment attached to a task (or project).

Relationships: belongs to a Task or a Project (mutually exclusive), authored by a User.

---

# 4. Table Definitions

## tasks

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| project_id | UUID | No | — |
| request_id | UUID | Yes | — |
| assigned_estimator_id | UUID | Yes | — |
| sales_rep_name | VARCHAR | Yes | — |
| source | VARCHAR | No | 'Manual' |
| status_id | UUID | No | — |
| priority_id | UUID | No | — |
| due_date | DATE | No | — |
| extended_due_date | DATE | Yes | — |
| extension_reason | TEXT | Yes | — |
| awaiting_information | BOOLEAN | No | false |
| awaiting_info_note | TEXT | Yes | — |
| not_in_netsuite | BOOLEAN | No | false |
| needs_netsuite_review | BOOLEAN | No | false |
| counts_provided | BOOLEAN | No | false |
| takeoff_completed | BOOLEAN | No | false |
| layover | BOOLEAN | No | false |
| revision_completed | BOOLEAN | No | false |
| ve_request | BOOLEAN | No | false |
| completed_at | TIMESTAMP WITH TIME ZONE | Yes | — |
| netsuite_reference_id | UUID | Yes | — |
| onedrive_link_id | UUID | Yes | — |
| created_at | TIMESTAMP WITH TIME ZONE | No | now() |
| updated_at | TIMESTAMP WITH TIME ZONE | No | now() |
| deleted_at | TIMESTAMP WITH TIME ZONE | Yes | — |
| created_by | UUID | No | — |
| updated_by | UUID | No | — |

Primary Key: `id`

Foreign Keys: `project_id` → projects.id, `request_id` → requests.id,
`assigned_estimator_id` → users.id, `status_id`/`priority_id` → statuses.id/priorities.id

Indexes: `idx_tasks_status_id`, `idx_tasks_assigned_estimator_id`, `idx_tasks_due_date`,
`idx_tasks_project_id`

Constraints: `extended_due_date` > `due_date` when set; `extension_reason` required (≥20 chars,
application-level) when `extended_due_date` set

`sales_rep_name` and `source` are copied from the originating request at conversion time (see
`request-intake/2-functional-specification.md` FR-INTAKE-004). `needs_netsuite_review` powers
the "Needs NetSuite Review" saved view in Projects 360, distinct from `not_in_netsuite` (a task
with no NetSuite counterpart at all vs. one whose NetSuite reference needs a human check).
`layover`/`ve_request` extend the task-level work indicators to match the 6 confirmed on the
intake form.

---

## notes

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| task_id | UUID | Yes | — |
| project_id | UUID | Yes | — |
| note_type | VARCHAR | No | 'General' |
| body | TEXT | No | — |
| created_at | TIMESTAMP WITH TIME ZONE | No | now() |
| updated_at | TIMESTAMP WITH TIME ZONE | No | now() |
| created_by | UUID | No | — |

Primary Key: `id`

Foreign Keys: `task_id` → tasks.id, `project_id` → projects.id, `created_by` → users.id

Constraints: exactly one of `task_id`/`project_id` set (application-level CHECK);
`body` length ≤ 2000 characters

---

## workflow_steps

Description: the guided-workflow step sequence shown on the task detail card, scoped per
request type — confirmed against the live Lovable UI, which shows a Revision-specific 5-step
sequence rather than one fixed sequence for all request types (FR-WORKBENCH-003).

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | No | gen_random_uuid() |
| request_type_id | UUID | No | — |
| step_order | INTEGER | No | — |
| name | VARCHAR | No | — |
| action_label | VARCHAR | No | — |

Primary Key: `id`. Foreign Key: `request_type_id` → request_types.id. Unique:
`(request_type_id, step_order)`. Seeded per request type in Milestone 1/2 (e.g. Revision:
Request Review, Quote Comparison, Line Item Updates, NetSuite Update, Review & Send).

---

# 5. Relationships

One-to-Many: Project→Tasks, Task→Notes, Project→Notes, User→Tasks (as estimator).

---

# 6. Constraints

Primary/Foreign Keys as above; NOT NULL on `project_id`, `status_id`, `priority_id`, `due_date`.

---

# 7. Index Strategy

Composite index candidate: `tasks(status_id, due_date)` for dashboard aggregation performance.

---

# 8. Cascading Rules

ON DELETE: RESTRICT on project_id/request_id; notes cascade-delete if their parent task is
hard-deleted (never happens in practice — soft delete only).

---

# 9. Data Integrity

`activity_logs` records every status change and extension, independent of the row's current
state, per NFR-COMP-002.

---

# 10. Migration Notes

Created in Milestone 3 (Task Management Workbench), after `projects` and `requests` exist.

---

# 11. Related Documents

`5-data-dictionary.md`, `6-validation.md`, `3-business-rules.md`, `8-api.md`

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
