# Functional Specification

> **Purpose**
>
> Detailed system behavior for the Settings & Administration module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |

---

# 1. Overview

Scope: FR-SETTINGS-001 through 008.

---

# 2. Functional Scope

Implemented: user management, five master-data configuration screens, connected-systems status,
user profile.

Excluded: full OAuth connection flows for OneDrive/Outlook (status display only in MVP beyond
NetSuite manual sync trigger).

---

# 3. Feature Specifications

## FR-SETTINGS-001 — User Management

### Description
Create, edit, deactivate users; assign roles; reset passwords.

### Main Flow
Admin fills Name/Email/Role/Active form; email uniqueness validated; deactivation (not
deletion) preserves historical attribution; audit log entry created.

---

## FR-SETTINGS-002 — Request Types Configuration

### Description
CRUD for request types (Name, Description, Active, Sort Order).

### Main Flow
Inactive types hidden from new-entry dropdowns but retained on historical records; in-use types
cannot be deleted.

---

## FR-SETTINGS-003 — Project Types Configuration

### Description
Same CRUD pattern as Request Types (Name, Description, Active, Sort Order); name uniqueness
enforced.

---

## FR-SETTINGS-004 — Locations Configuration

### Description
CRUD with Name, Code (e.g. "Austin, TX" / "AUS"), Active, Sort Order; Code must be unique.

---

## FR-SETTINGS-005 — Statuses Configuration

### Description
Separate status lists per entity type (Task, Project, Request), each with Name, Color (hex),
Active, Sort Order.

### Exception Flow
Duplicate name within the same entity type — rejected.

---

## FR-SETTINGS-006 — Priorities Configuration

### Description
CRUD with Name, Level (1=highest), Color, Active; no duplicate levels; minimum 3 active
priorities enforced at all times.

### Exception Flow
Attempt to deactivate the 3rd-to-last active priority — blocked with explanation.

---

## FR-SETTINGS-007 — Connected Systems

### Description
Status display for NetSuite, OneDrive, Outlook, Planner: Connected / Available / Not
Configured / Error, last sync timestamp, manual sync trigger (NetSuite).

---

## FR-SETTINGS-008 — User Profile

### Description
Display name edit, read-only email, password change, notification preferences, time zone.

---

# 4. Business Process Flow

See `1-module.md` Section 9.

---

# 5. System Behavior

Create/Update/Delete(soft): all master data via Admin CRUD screens. Search: users/master data
lists searchable/filterable.

---

# 6. Data Processing

Inputs: CRUD form fields. Outputs: updated master-data rows immediately available to dependent
modules.

---

# 7. Integrations

NetSuite (manual sync trigger + status), Microsoft Graph (status display, OAuth flow future
phase).

---

# 8. Error Handling

In-use master data deletion attempt — 409 Conflict, explanatory message.

---

# 9. Performance Requirements

Master-data lists are small (tens of rows); no special performance concerns beyond standard
NFR-PERF-002.

---

# 10. Security Requirements

Admin-only for user management and most master-data writes; Manager limited to viewing
connected-systems status (see `7-permissions.md`).

---

# 11. Edge Cases

Attempt to delete the last active priority category below the minimum-3 floor — blocked.
Duplicate email on user creation — 422.

---

# 12. Assumptions

Initial seed values for each master-data type confirmed in Milestone 1.

---

# 13. Constraints

Minimum 3 active priorities always enforced.

---

# 14. Traceability

FR-SETTINGS-001..008 map 1:1 to Section 3.

---

# 15. Related Documents

`1-module.md`, `4-schema.md`, `6-validation.md`, `8-api.md`, `9-ui.md`, `7-permissions.md`

---

# AI Generation Notes

Keep the five master-data types' CRUD patterns consistent with each other (same field
structure: Name, Active, Sort Order, plus type-specific fields).
