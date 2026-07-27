# Data Dictionary

> **Purpose**
>
> Business meaning of the Projects 360 module's data elements.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Projects 360 |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Business purpose: define what a "project" represents and how its derived status/metrics are
interpreted.

Scope: `projects` table plus derived (computed, not stored) fields used in list/360 views.

---

# 2. Entity Definitions

## Project

Description: a customer engagement grouping related requests and tasks.

Business Purpose: the unit of portfolio-level visibility for Managers and Executives.

Owner: Manager (oversight), created alongside first task/request for a customer.

Lifecycle: Active → (At Risk / Blocked, derived) → Completed.

---

# 3. Field Definitions

| Field | Description | Business Purpose | Example |
|--------|-------------|------------------|----------|
| name | Project name | Human-readable identifier | "Riverside Apartments – Phase 2" |
| status_id | Project status | Portfolio health tracking | "Active" |
| owner_id | Assigned owner/estimator | Accountability | Estimator user |
| (derived) is_overdue | true if any task past due | Drives Overdue saved view | true |
| (derived) is_awaiting_info | true if any task/request flagged | Drives Awaiting Info saved view | false |
| (derived) progress_pct | Completed tasks / total tasks | Progress indicator in list | 62% |

---

# 4. Enumerations

Project `status_id` values (configurable, seeded): Active, At Risk, Blocked, Completed.

---

# 5. Reference Data

Project Types, Locations, Statuses — owned by Settings & Administration.

---

# 6. Default Values

New projects default to status "Active".

---

# 7. Data Ownership

Business Owner: Operations Manager. System Owner: Projects 360 module (read aggregation);
`projects` row creation triggered from Request Intake/Task Workbench flows.

---

# 8. Data Classification

Internal.

---

# 9. Data Lifecycle

Creation: alongside first request/task for a customer engagement. Modification: status change
by Manager/Admin. Archival: soft delete or status "Completed". Retention: 7 years for
completed projects (NFR-COMP-002 audit; BRD Section 7.1 data retention).

---

# 10. Related Documents

`4-schema.md`, `3-business-rules.md`, `8-api.md`, `9-ui.md`

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

Distinguish stored vs. derived fields clearly, as done above.
