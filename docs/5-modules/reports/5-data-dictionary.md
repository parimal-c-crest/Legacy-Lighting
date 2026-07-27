# Data Dictionary

> **Purpose**
>
> Business meaning of the Reports module's computed fields.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Reports |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

All fields below are computed at report-generation time from source tables owned by other
modules.

---

# 2. Entity Definitions

None owned.

---

# 3. Field Definitions

| Field | Description | Business Purpose | Example |
|--------|-------------|------------------|----------|
| open_tasks (per estimator) | Count of non-completed assigned tasks | Workload balancing | 12 |
| completion_rate | Completed / (Completed + Open) | Performance measure | 0.87 |
| overdue_bucket | 1-7 / 8-14 / 15-30 / 30+ days overdue | Prioritization | "8-14" |
| netsuite_coverage_pct | % of tasks with a NetSuite reference | Integration compliance | 91% |
| avg_turnaround_time | Mean days from request creation to task completion, per customer | Service level tracking | 4.2 days |

---

# 4. Enumerations

Overdue buckets: 1-7, 8-14, 15-30, 30+ (see `3-business-rules.md`).

---

# 5. Reference Data

Request Types, Customers, Users — owned by their respective modules.

---

# 6. Default Values

N/A (all computed).

---

# 7. Data Ownership

Business Owner: Operations Manager. System Owner: Reports module (aggregation only).

---

# 8. Data Classification

Internal.

---

# 9. Data Lifecycle

Computed on-demand per report request; exports are generated files with no retention
(BRD Section 7.1: "Reports/Exports: No retention").

---

# 10. Related Documents

`3-business-rules.md`, `8-api.md`, `9-ui.md`

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

Keep clear these are computed, not stored, fields.
