# Module Specification

Purpose

Document the complete business specification of the Reports module.

---

# Document Information

- Module Name: Reports
- Version: 1.0
- Status: Draft
- Owner: Development Team (NuVista AI)
- Priority: Medium

---

# 1. Executive Summary

Purpose: provide core operational reports with filters and export, reducing manual reporting
effort.

Business objective: replace ad-hoc manual data compilation (BRD Section 1.3/2.1).

Scope: Estimator Workload, Overdue Aging, Request Type Volume, NetSuite Coverage, Project
Health Rollup, Customer Activity reports; common filters; export.

---

# 2. Business Context

Problem statement: executive reports currently require manual data compilation (BRD Section
2.1).

Business value: on-demand, filterable, exportable operational reports.

Dependencies: Task Workbench, Request Intake, Projects 360, Settings & Administration.

---

# 3. Module Overview

Description: a set of six tabular reports with shared filter controls and export.

Responsibilities: report computation, filtering, and CSV/Excel/ZIP export.

Out of scope: chart visualizations (BRD marks line/bar charts as future phase for some reports).

---

# 4. Actors

- Manager (primary consumer)
- Admin (full access)
- Executive Leadership (via dashboard drill-down, not direct report access necessarily)

---

# 5. Goals

Business goals: reduce manual reporting effort.

User goals: a Manager can answer "who's overloaded" or "which customer is slipping" in one
report, filtered and exported in seconds.

Success metrics: adoption as the reporting tool of record; reduction in manual report requests.

---

# 6. Functional Requirements

- FR-REPORTS-001 Estimator Workload Report
- FR-REPORTS-002 Overdue Aging Report
- FR-REPORTS-003 Request Type Volume Report
- FR-REPORTS-004 NetSuite Coverage Report
- FR-REPORTS-005 Project Health Rollup
- FR-REPORTS-006 Customer Activity Report
- FR-REPORTS-007 Report Filters
- FR-REPORTS-008 Export All Reports

---

# 7. User Stories

- As a Manager, I want an Estimator Workload report so I can rebalance assignments.
- As a Manager, I want an Overdue Aging report so I can prioritize the oldest overdue work.
- As a Manager, I want to export all reports at once for a board meeting package.

---

# 8. Acceptance Criteria

Given a Manager on the Reports screen,
When they select the Overdue Aging report and apply a date range filter,
Then the report shows tasks grouped into 1-7/8-14/15-30/30+ day overdue buckets.

Given a Manager clicks "Export All",
When the export completes,
Then a ZIP file containing all six reports as CSV is downloaded, respecting active filters.

---

# 9. Business Process

```
Manager opens Reports
   ↓
Selects a report tab and applies filters (date range, team/estimator, status)
   ↓
Reviews tabular data, sorts as needed
   ↓
Exports single report (CSV/Excel) or all reports (ZIP)
```

---

# 10. Module Navigation

See `docs/4-ui/1-navigation.md` — "Reports" top-level menu with six report tabs.

---

# 11. Dependencies

Modules: Task Workbench, Request Intake, Projects 360, Settings & Administration.

---

# 12. Events

Triggers: report requested; export requested. Background jobs: none (synchronous generation in
MVP, capped at 50MB per FR-REPORTS-008).

---

# 13. Non-Functional Requirements

Performance: report query per NFR-PERF-002; export ≤5s for up to 1000 records (aligned with
FR-PROJECTS-006 cap philosophy).

Security: Manager/Admin/Viewer full view+export; Processor/Estimator no access (see `7-permissions.md`).

---

# 14. Assumptions

Report filter presets (date ranges) confirmed in Milestone 1.

---

# 15. Constraints

Export All capped at 50MB (FR-REPORTS-008).

---

# 16. Risks

Large datasets could slow report generation — mitigate with pagination/date-range defaults.

---

# 17. Related Documents

`4-schema.md`, `8-api.md`, `7-permissions.md`, `6-validation.md`, `3-business-rules.md`,
`9-ui.md`, `11-testing.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | | Pending | |

---

# AI Generation Notes

Derive content only from approved FR-REPORTS-* requirements.
