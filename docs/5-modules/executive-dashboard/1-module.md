# Module Specification

Purpose

Document the complete business specification of the Executive Dashboard & Core Reporting
module.

---

# Document Information

- Module Name: Executive Dashboard
- Version: 1.0
- Status: Draft
- Owner: Development Team (NuVista AI)
- Priority: High

---

# 1. Executive Summary

Purpose: give executives and managers real-time KPIs and a Monday Meeting View, replacing
manually compiled reports.

Business objective: dashboard loads within 2 seconds; reduces manual reporting effort (BRD
Section 1.4).

Scope: project status/sales outlook/top blockers widgets, Monday Meeting View, dashboard
refresh.

Note: this module's KPI widgets are distinct from, but data-adjacent to, the `reports` module
(see `docs/5-modules/reports/`), which covers the exportable core reports (Estimator Workload,
Overdue Aging, etc.).

---

# 2. Business Context

Problem statement: executive reports currently require manual data compilation (BRD Section
2.1).

Business value: always-current KPIs and a one-page weekly meeting view.

Dependencies: Projects 360, Task Workbench (source data for KPIs).

---

# 3. Module Overview

Description: a dashboard of widgets plus a specialized Monday Meeting View for weekly reviews.

Responsibilities: KPI computation and presentation only — no data entry.

Out of scope: charting library selection details (future phase notes pie/bar charts as
"future phase" in the BRD).

---

# 4. Actors

- Executive Leadership (primary consumer)
- Manager (reviews and drills down)
- Admin (full access)

---

# 5. Goals

Business goals: replace weekly manual reports with real-time dashboards.

User goals: an executive can assess portfolio health in under a minute.

Success metrics: dashboard loads ≤2 seconds (NFR-PERF-001/BRD Section 1.4).

---

# 6. Functional Requirements

- FR-DASHBOARD-001 Project Status Widget
- FR-DASHBOARD-002 Sales Outlook Widget
- FR-DASHBOARD-003 Top Blockers Widget
- FR-DASHBOARD-004 Monday Meeting View
- FR-DASHBOARD-005 Dashboard Refresh

---

# 7. User Stories

- As an Executive, I want a KPI dashboard so I can assess portfolio health at a glance.
- As a Manager, I want a Monday Meeting View so weekly status reviews take minutes, not hours.

---

# 8. Acceptance Criteria

Given an Executive opens the dashboard,
When the page loads,
Then all widgets render within 2 seconds with current data and a "last updated" timestamp.

Given a Manager opens the Monday Meeting View,
When the page renders,
Then it shows Completed Last Week, Due This Week, Overdue (aged), and New Requests sections in
a one-page printable format.

---

# 9. Business Process

```
User opens Executive Dashboard
   ↓
Widgets load (Project Status, Sales Outlook, Top Blockers)
   ↓
Auto-refresh every 60 seconds, or manual refresh
   ↓
User optionally switches to Monday Meeting View for weekly review
```

---

# 10. Module Navigation

See `docs/4-ui/1-navigation.md` — "Executive Dashboard" top-level menu.

---

# 11. Dependencies

Modules: Projects 360, Task Workbench (source data).

---

# 12. Events

Triggers: 60-second auto-refresh (FR-DASHBOARD-005).

Background jobs: none (client-side polling in MVP).

---

# 13. Non-Functional Requirements

Performance: page load ≤2s (NFR-PERF-001); complex aggregation ≤500ms (NFR-PERF-002).

Security: Manager/Admin/Executive access; Viewer sees dashboard only (see `7-permissions.md`).

---

# 14. Assumptions

Executive KPI definitions and thresholds are confirmed (Q-002 in `1-project/2-requirements.md`);
see `3-business-rules.md` BR-DASHBOARD-001.

---

# 15. Constraints

Sales Outlook pie-chart and Top Blockers bar-chart visualizations are future-phase; MVP shows
numeric/tabular widgets only (BRD Sections 4.4.2, 4.4.3).

---

# 16. Risks

KPI definitions are now confirmed (Q-002); residual risk is the alert threshold (>10 overdue)
proving wrong in practice once real data volume is seen — revisit after Milestone 1 pilot data.

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

Derive content only from approved FR-DASHBOARD-* requirements.
