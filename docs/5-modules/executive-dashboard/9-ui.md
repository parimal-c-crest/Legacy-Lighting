# UI Specification

> **Purpose**
>
> UI for the Executive Dashboard module.

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

Purpose: define the Dashboard and Monday Meeting View screens.

Target users: Executive Leadership, Manager.

---

# 2. Screen Inventory

| Screen | Purpose |
|----------|---------|
| Executive Dashboard | Widget overview (Project Status, Sales Outlook, Top Blockers) |
| Monday Meeting View | One-page printable weekly review |

---

# 3. Navigation

Entry point: "Executive Dashboard" sidebar item. Path: Dashboard → Monday Meeting View tab.

---

# 4. Screen Specifications

## Executive Dashboard

Purpose: at-a-glance portfolio health.

Layout: widget grid (Project Status, Sales Outlook, Top Blockers), last-updated timestamp,
manual refresh button.

Available actions: click a widget metric to drill into Projects 360.

Permissions: per `7-permissions.md`.

Loading state: skeleton widgets. Error state: widget-level fallback ("data unavailable"),
other widgets unaffected.

---

## Monday Meeting View

Purpose: printable weekly review.

Layout: four sections (Completed Last Week, Due This Week, Overdue with aging, New Requests).

Filters: estimator/team selector.

Available actions: print (browser print dialog).

---

# 5. Forms

None (read-only, period/estimator selectors are simple dropdowns per `docs/4-ui/5-form-standards.md`).

---

# 6. UI Components

KPI tile with trend arrow, color-coded status widget, blocker bar list, printable section
layout.

---

# 7. User Interactions

Period selector (Sales Outlook), estimator/team filter (Monday Meeting), manual refresh, print.

---

# 8. Responsive Behavior

Widget grid stacks to single column on tablet/mobile. Monday Meeting View retains print layout
regardless of viewport.

---

# 9. Accessibility

Color-coded status widgets must also convey state via text/icon, not color alone
(`docs/4-ui/7-accessibility.md`).

---

# 10. UI States

Loading, Empty (no data yet), No Permission (menu hidden), Network Errors (per-widget fallback).

---

# 11. Notifications

Error: "Could not refresh dashboard — showing last known data."

---

# 12. Related Documents

`2-functional-specification.md`, `8-api.md`, `7-permissions.md`

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

No chart libraries in MVP — numeric/tabular widgets only, per BRD future-phase notes.
