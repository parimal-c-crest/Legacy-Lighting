# Functional Specification

> **Purpose**
>
> Detailed system behavior for the Executive Dashboard module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Executive Dashboard |
| Version | 1.0 |
| Status | Draft |

---

# 1. Overview

Scope: FR-DASHBOARD-001 through 005. References: `1-module.md`.

---

# 2. Functional Scope

Implemented: Project Status, Sales Outlook, Top Blockers widgets; Monday Meeting View; refresh.

Excluded: chart visualizations (pie/bar) — future phase.

---

# 3. Feature Specifications

## FR-DASHBOARD-001 — Project Status Widget

### Description
Counts of Projects On Track / Needing Attention / At Risk, with trend indicators and
color-coding (Green/Yellow/Red).

### Trigger
Dashboard load or refresh.

### Main Flow
System computes counts from `projects` derived status; clicking a count drills into Projects
360 filtered to that subset.

---

## FR-DASHBOARD-002 — Sales Outlook Widget

### Description
Active Quote Value, Value At Risk, Ready for Customer Review — dollar amounts with a time
period selector (Week/Month/Quarter).

### Trigger
Dashboard load; period selector change.

### Main Flow
Values sourced from NetSuite quote references where available; formatted with currency symbol.

### Exception Flow
No NetSuite quote data available for a project — excluded from the total, not shown as $0.

---

## FR-DASHBOARD-003 — Top Blockers Widget

### Description
Top 5 blocker categories with counts (e.g. Missing Customer Info, Sales Clarification Needed,
NetSuite Review).

### Trigger
Dashboard load or refresh.

### Main Flow
Aggregates `awaiting_info_note`/blocker tags across open tasks; clicking a category drills into
affected projects.

---

## FR-DASHBOARD-004 — Monday Meeting View

### Description
One-page printable view: Completed Last Week, Due This Week, Overdue (aged), New Requests.

### Trigger
User selects Monday Meeting View.

### Main Flow
System queries tasks completed in the last 7 days, due in the next 7 days, overdue (with age),
and requests created since last Monday; filterable by estimator/team.

---

## FR-DASHBOARD-005 — Dashboard Refresh

### Description
Auto-refresh every 60 seconds; manual refresh button; last-updated timestamp.

### Trigger
Timer or manual click.

### Main Flow
Widgets re-fetch; loading indicator shown during refresh; timestamp updates on success.

---

# 4. Business Process Flow

See `1-module.md` Section 9.

---

# 5. System Behavior

Read-only module — no create/update/delete. Aggregates from projects, tasks, requests,
netsuite_references.

---

# 6. Data Processing

Inputs: none (auto-computed). Outputs: widget payloads, Monday Meeting View payload.

---

# 7. Integrations

NetSuite: quote value/status for Sales Outlook widget (read-only reference data).

---

# 8. Error Handling

Partial widget failure (e.g. NetSuite reference unavailable) — degrade gracefully, show other
widgets, per NFR-AVAIL-003.

---

# 9. Performance Requirements

Page load ≤2s (NFR-PERF-001); widget aggregation ≤500ms (NFR-PERF-002).

---

# 10. Security Requirements

Manager/Admin/Executive full access; Viewer dashboard-only (no Reports/Projects export rights).

---

# 11. Edge Cases

No data yet (new deployment) — widgets show zero-state, not errors.

---

# 12. Assumptions

KPI thresholds confirmed — see `3-business-rules.md` BR-DASHBOARD-001.

---

# 13. Constraints

Chart visualizations deferred to Phase 2.

---

# 14. Traceability

FR-DASHBOARD-001..005 map 1:1 to Section 3.

---

# 15. Related Documents

`1-module.md`, `8-api.md`, `9-ui.md`, `7-permissions.md`

---

# AI Generation Notes

Do not build chart rendering — BRD marks charts as future phase; numeric/tabular widgets only.
