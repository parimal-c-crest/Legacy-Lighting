# Data Dictionary

> **Purpose**
>
> Business meaning of the Settings & Administration module's data elements.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Business purpose: define the shared identity and master-data vocabulary used by every module.

Scope: `users`, `roles`, `request_types`, `project_types`, `locations`, `statuses`,
`priorities`.

---

# 2. Entity Definitions

## User

Description: a platform account with exactly one role.

Owner: Admin (creation/deactivation).

Lifecycle: Active → Inactive (never deleted, per BR-SETTINGS-001).

## Master Data (Request Type, Project Type, Location, Status, Priority)

Description: configurable vocabulary referenced by Requests, Tasks, and Projects.

Owner: Admin.

Lifecycle: Active → Inactive (never deleted while referenced, per BR-SETTINGS-002).

---

# 3. Field Definitions

| Field | Description | Business Purpose | Example |
|--------|-------------|------------------|----------|
| role_id | Fixed role assignment | Drives RBAC permissions | "Estimator" |
| notification_preferences | JSON of user notification settings | Personalization | `{"email_on_assignment": true}` |
| statuses.entity_type | Which entity a status applies to | Keeps Task/Project/Request statuses independent | "Task" |
| priorities.level | Numeric rank, 1 = highest | Sort/priority ordering | 1 |
| locations.state | State/region the location belongs to | Enables state-level filtering in reports, independent of the display name | "Texas" |
| locations.code | Short location code | Compact display/reporting | "AUS" |

---

# 4. Enumerations

- `roles.name`: Admin, Manager, Processor, Estimator, Viewer
- `statuses.entity_type`: Task, Project, Request

---

# 5. Reference Data

This module IS the source of reference data for the rest of the platform — no upstream
dependency.

---

# 6. Default Values

New users: `active = true`, `time_zone = 'UTC'`. New master-data rows: `active = true`.

---

# 7. Data Ownership

Business Owner: Admin. System Owner: Settings & Administration module.

---

# 8. Data Classification

`users.password_hash` is Confidential; all other fields Internal.

---

# 9. Data Lifecycle

Creation: Admin via Settings screens. Modification: Admin (master data), self-service (profile
fields). Archival: `active = false`. Retention: indefinite (foundation reference data).

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

Flag `password_hash` explicitly as Confidential per Section 8.
