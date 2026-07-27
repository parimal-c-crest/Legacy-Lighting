# Data Dictionary

> **Purpose**
>
> Business meaning of the Executive Dashboard module's computed KPI fields.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Executive Dashboard |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

This module has no owned entities — all fields below are computed at request time from
`projects`, `tasks`, `requests`, and `netsuite_references`.

---

# 2. Entity Definitions

None owned; see Projects 360, Task Workbench, Request Intake data dictionaries for source
fields.

---

# 3. Field Definitions

| Field | Description | Business Purpose | Example |
|--------|-------------|------------------|----------|
| projects_on_track | Count of projects classified On Track | Portfolio health | 42 |
| projects_needing_attention | Count classified Needing Attention | Early-warning signal | 6 |
| projects_at_risk | Count classified At Risk | Escalation trigger | 2 |
| active_quote_value | Sum of open NetSuite quote values | Pipeline visibility | $184,500 |
| top_blockers | Top 5 blocker categories with counts | Proactive issue resolution | "Missing Customer Info: 5" |
| completed_last_week | Tasks completed in prior Mon–Sun week | Monday Meeting recap | 18 |
| due_this_week | Tasks due in current Mon–Sun week | Monday Meeting lookahead | 25 |

---

# 4. Enumerations

Project classification: On Track, Needing Attention, At Risk (see `3-business-rules.md`
BR-DASHBOARD-001).

---

# 5. Reference Data

None owned; sourced from Projects 360/Task Workbench/Request Intake reference data.

---

# 6. Default Values

N/A (all computed).

---

# 7. Data Ownership

Business Owner: Executive Leadership / Operations Manager (consumers). System Owner: dashboard
aggregation service.

---

# 8. Data Classification

Internal.

---

# 9. Data Lifecycle

Computed on each request/refresh; never persisted as a snapshot in MVP.

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
