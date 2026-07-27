# UI Specification

> **Purpose**
>
> UI for the Reports module.

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

Purpose: define the Reports screen with six report tabs and shared filter bar.

Target users: Manager (primary), Admin.

---

# 2. Screen Inventory

| Screen | Purpose |
|----------|---------|
| Reports | Tabbed access to all six reports with shared filters |

---

# 3. Navigation

Entry point: "Reports" sidebar item. Tabs: Estimator Workload, Overdue Aging, Request Type
Volume, NetSuite Coverage, Project Health Rollup, Customer Activity.

---

# 4. Screen Specifications

## Reports

Purpose: single screen, tab-switched reports with a persistent filter bar.

Layout: filter bar (date range, team/estimator, status, Reset) + active report table + Export /
Export All buttons.

Displayed columns: per report, as defined in `2-functional-specification.md`.

Sorting: sortable by relevant metric columns per report.

Available actions: switch tab, apply filters, Export (single), Export All.

Permissions: Export controls hidden for Processor/Estimator; visible to Viewer.

Empty state: "No data for the selected filters."

Loading state: skeleton table rows.

---

# 5. Forms

Filter bar only (date range picker, dropdowns) per `docs/4-ui/5-form-standards.md`.

---

# 6. UI Components

Report tab bar, shared filter bar (persisted per tab), data table with sort, Export/Export All
buttons.

---

# 7. User Interactions

Filtering (date range/team/status), Sorting (table columns), Export (CSV/Excel), Export All
(ZIP), Reset Filters.

---

# 8. Responsive Behavior

Tables scroll horizontally on tablet/mobile rather than reflow; filter bar collapses into a
drawer below tablet width.

---

# 9. Accessibility

Sortable column headers must be keyboard-operable and announce sort direction to screen
readers.

---

# 10. UI States

Loading, Empty, No Permission (hide export), Network Errors (retry), Export size warning (over
50MB on Export All).

---

# 11. Notifications

Success: "Report exported." Warning: "Export exceeds 50MB — narrow your filters." Error:
"Could not generate report."

---

# 12. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`, `8-api.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| UI/UX Designer | | Pending | |

# AI Generation Notes

No chart rendering in MVP — tabular reports only.
