# Business Rules

> **Purpose**
>
> Business rules for the Executive Dashboard module.

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

Purpose: govern KPI classification thresholds and Monday Meeting View date ranges.

Scope: dashboard widgets and Monday Meeting View only.

---

# 2. Rule Categories

Classification thresholds, Date-range computation, Aggregation.

---

# 3. Business Rules

## BR-DASHBOARD-001

Title: Project classification (On Track / Needing Attention / At Risk)

Description: derived from `is_overdue` and `is_awaiting_info`. **On Track** = no overdue tasks
and not Awaiting Info. **Needing Attention** = Awaiting Info flag set but not yet overdue.
**At Risk** = one or more overdue tasks. Confirmed per `1-project/2-requirements.md` Q-002.

Business Rationale: gives executives a simple traffic-light view without manual judgment calls.

Trigger: widget computation.

Related Requirements: FR-DASHBOARD-001.

---

## BR-DASHBOARD-002

Title: Monday Meeting "week" boundary

Description: the reporting week runs Monday–Sunday; "Due This Week" and "Completed Last Week"
are computed relative to the most recent Monday.

Business Rationale: matches the BRD's naming of the view around a Monday meeting cadence.

Trigger: Monday Meeting View load.

Related Requirements: FR-DASHBOARD-004.

---

## BR-DASHBOARD-003

Title: Sales Outlook excludes projects with no NetSuite quote reference

Description: projects without a synced NetSuite quote are excluded from dollar totals rather
than counted as $0.

Business Rationale: avoids understating pipeline value due to missing integration data.

Trigger: Sales Outlook widget computation.

Related Requirements: FR-DASHBOARD-002.

---

# 4. Decision Tables

| Condition | Classification |
|-----------|--------|
| No overdue tasks, no blockers | On Track |
| Awaiting Info flag set, not yet overdue | Needing Attention |
| One or more overdue tasks | At Risk |

---

# 5. Calculations

Trend indicator = current period count − prior period count (up/down arrow).

---

# 6. State Transition Rules

Not applicable (read-only classification, not a stored state machine).

---

# 7. Workflow Rules

Auto-refresh every 60 seconds (FR-DASHBOARD-005); manual refresh available at any time.

---

# 8. Exception Rules

Missing KPI source data (e.g. no NetSuite sync yet) — widget shows "No data" rather than
erroring.

---

# 9. External Dependencies

NetSuite quote/value data (Sales Outlook widget only).

---

# 10. Assumptions

Classification thresholds confirmed (Q-002); the alert threshold (>10 overdue) may need
revisiting once real data volume is seen at Legacy Lighting.

---

# 11. Constraints

No chart visualizations in MVP.

---

# 12. Traceability

| Rule | Requirement | API | Test |
|------|-------------|-----|------|
| BR-DASHBOARD-001 | FR-DASHBOARD-001 | GET /dashboard/project-status | TC-DASHBOARD-001 |
| BR-DASHBOARD-002 | FR-DASHBOARD-004 | GET /dashboard/monday-meeting | TC-DASHBOARD-002 |
| BR-DASHBOARD-003 | FR-DASHBOARD-002 | GET /dashboard/sales-outlook | TC-DASHBOARD-003 |

---

# 13. Related Documents

`1-module.md`, `2-functional-specification.md`, `8-api.md`, `11-testing.md`

---

# AI Generation Notes

BR-DASHBOARD-001 thresholds are confirmed (Q-002) — implement exactly as specified above.
