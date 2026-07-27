# Data Dictionary

> **Purpose**
>
> Business meaning and governance of the Task Workbench module's data elements.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Task Workbench |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Business purpose: define task and note fields so estimators, managers, and reports interpret
them consistently.

Scope: `tasks`, `notes` tables.

---

# 2. Entity Definitions

## Task

Description: an actionable work item derived from a request or created manually.

Business Purpose: the unit of estimator execution and workload measurement.

Owner: Estimator (execution), Manager (oversight).

Lifecycle: Not Started → In Progress → (Awaiting Info / Under Review) → Completed, or On Hold.

## Note

Description: a timestamped internal comment on a task or project.

Owner: author (edit/delete own only).

Lifecycle: created, optionally edited by author, never deleted from audit history.

---

# 3. Field Definitions

| Field | Description | Business Purpose | Example |
|--------|-------------|------------------|----------|
| status_id | Current workflow state | Drives dashboards/reports | "In Progress" |
| due_date | Original due date | SLA tracking | 2026-08-05 |
| extended_due_date | Revised due date | Realistic scheduling with accountability | 2026-08-10 |
| extension_reason | Why the date moved | Accountability trail | "Awaiting revised specs from customer" |
| awaiting_information | Blocked-on-info flag | Blocker visibility | true |
| awaiting_info_note | Clarification detail | Explains the block | "Need updated fixture count" |
| not_in_netsuite | Flag: task has no NetSuite counterpart | Coverage reporting | false |
| completed_at | Timestamp task marked done | Completion tracking, reporting | 2026-08-04T15:02:00Z |
| note_type | General / Follow-Up / Internal / Blocker | Categorizes notes for filtering | "Blocker" |

---

# 4. Enumerations

- `note_type`: General, Follow-Up, Internal, Blocker
- Task `status_id` values (configurable, seeded): Not Started, In Progress, Awaiting Info,
  Under Review, Completed, On Hold

---

# 5. Reference Data

Statuses and Priorities owned by Settings & Administration, referenced here by FK.

---

# 6. Default Values

`awaiting_information` defaults false; `not_in_netsuite` defaults false; `note_type` defaults
"General".

---

# 7. Data Ownership

Business Owner: Estimator / Operations Manager. System Owner: Task Workbench module.

---

# 8. Data Classification

Internal.

---

# 9. Data Lifecycle

Creation: on request conversion or manual entry. Modification: throughout task execution.
Archival: soft delete if abandoned. Retention: activity history 7 years (NFR-COMP-002).

---

# 10. Related Documents

`4-schema.md`, `6-validation.md`, `3-business-rules.md`, `8-api.md`, `9-ui.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | | Pending | |

# AI Generation Notes

Keep definitions business-readable; column types belong in `4-schema.md`.
