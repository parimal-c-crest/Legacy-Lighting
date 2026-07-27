# Functional Specification

> **Purpose**
>
> Detailed system behavior for the Reports module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Reports |
| Version | 1.0 |
| Status | Draft |

---

# 1. Overview

Scope: FR-REPORTS-001 through 008.

---

# 2. Functional Scope

Implemented: six tabular reports, shared filters, per-report and all-reports export.

Excluded: line/bar chart visualizations (future phase per FR-REPORTS-003).

---

# 3. Feature Specifications

## FR-REPORTS-001 — Estimator Workload Report

### Description
Rows per estimator: Open Tasks, Overdue Tasks, Completed This Week, Completion Rate.

### Main Flow
Aggregates `tasks` grouped by `assigned_estimator_id`; sortable, filterable by date range.

---

## FR-REPORTS-002 — Overdue Aging Report

### Description
Overdue tasks grouped into 1-7, 8-14, 15-30, 30+ day buckets with blocker tags.

### Main Flow
Computed from `tasks.due_date`/`extended_due_date` vs. today; drill-down to task detail.

---

## FR-REPORTS-003 — Request Type Volume Report

### Description
Request volume over time by type (New Quote, Revision, Takeoff, Submittal, Clarification),
daily/weekly/monthly views.

### Main Flow
Aggregates `requests` grouped by `request_type_id` and time bucket.

---

## FR-REPORTS-004 — NetSuite Coverage Report

### Description
Tasks with vs. without a NetSuite reference, counts and percentages, filterable by project type.

### Main Flow
Aggregates `tasks` joined to `netsuite_references`; lists tasks missing NetSuite IDs.

---

## FR-REPORTS-005 — Project Health Rollup

### Description
Project counts by status, progress distribution, top blockers, average task completion time.

### Main Flow
Aggregates `projects`/`tasks` per the derived fields defined in Projects 360's
`3-business-rules.md`.

---

## FR-REPORTS-006 — Customer Activity Report

### Description
Rows per customer: Total Requests, Avg Turnaround Time, Overdue Count, Completion Rate.

### Main Flow
Aggregates `requests`/`tasks` grouped by `customer_id`.

---

## FR-REPORTS-007 — Report Filters

### Description
Common filters across all reports: date range (Week/Month/Quarter/Custom), team/estimator
selector, status filter; persisted per report type; "Reset Filters" button.

---

## FR-REPORTS-008 — Export All Reports

### Description
"Export All" generates a ZIP of all six reports as CSV, respecting current filters, max 50MB.

### Exception Flow
Resulting ZIP exceeds 50MB — user notified to narrow filters.

---

# 4. Business Process Flow

See `1-module.md` Section 9.

---

# 5. System Behavior

Read-only reports; export generates files synchronously in MVP.

---

# 6. Data Processing

Inputs: filter selections. Outputs: tabular report data, CSV/Excel/ZIP files.

---

# 7. Integrations

NetSuite reference data (Coverage Report only).

---

# 8. Error Handling

Export exceeding size cap — 422 with guidance to narrow filters.

---

# 9. Performance Requirements

Report queries per NFR-PERF-002; export ≤5s for up to 1000 records.

---

# 10. Security Requirements

Manager/Admin full access; Viewer read-only (no export in MVP unless confirmed otherwise in
Milestone 1 — see `7-permissions.md`).

---

# 11. Edge Cases

No data in selected range — empty state, not an error. Very wide date ranges — may require
pagination or a warning about performance.

---

# 12. Assumptions

Filter presets and default date ranges confirmed in Milestone 1.

---

# 13. Constraints

Export All capped at 50MB.

---

# 14. Traceability

FR-REPORTS-001..008 map 1:1 to Section 3.

---

# 15. Related Documents

`1-module.md`, `8-api.md`, `9-ui.md`, `7-permissions.md`

---

# AI Generation Notes

Keep each report's aggregation logic traceable to its owning source tables (tasks, requests,
projects) rather than inventing new stored fields.
