# UI Specification

> **Purpose**
>
> UI for the Projects 360 module.

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

Purpose: define Project List (List/Kanban/Update Call) and Project 360 Detail screens.

Target users: Manager (primary), Estimator, Viewer, Admin.

---

# 2. Screen Inventory

| Screen | Purpose |
|----------|---------|
| Project List | Browse/filter/sort projects across view modes |
| Project 360 Detail | Single-project aggregated view |

---

# 3. Navigation

Entry point: "Projects 360" sidebar item. Path: List → row click → 360 Detail → back to List.

---

# 4. Screen Specifications

## Project List

Purpose: primary Manager landing view.

Layout: metrics header row (Active Projects, Open Tasks, Due This Week, Overdue, Awaiting Info,
High Priority) + table/kanban/update-call body.

Displayed columns: Project Name (with Location/Type as subtext), Customer, Request Type,
Assigned To, Status, Due Date, Blocker, NetSuite Ref, Progress %, Notes, Next Action.

Filters: saved view tabs (All Active, Due This Week, Overdue, Awaiting Info, By Estimator, By
Customer, Needs NetSuite Review, Classification Review).

Sorting: all columns sortable.

Available actions: open 360 Detail, Export.

Permissions: Export hidden for Estimator/Viewer/Processor.

Empty state: "No projects match this view."

---

## Project 360 Detail

Purpose: single-project deep dive.

Layout: header (Name, Customer, Type, Status, Owner), Related Tasks list, Related Requests
list, Activity Timeline, Document Links, NetSuite Status, Blockers section, Next Actions panel.

Available actions: status override (Manager/Admin), open OneDrive/NetSuite links, jump to Task
Workbench for a specific task.

Permissions: per `7-permissions.md`.

---

# 5. Forms

Status override is a simple dropdown + confirm, per `docs/4-ui/5-form-standards.md` — no
complex form in this module.

---

# 6. UI Components

Metrics header tiles (clickable to filter), saved-view tab bar, status/priority badges, activity
timeline component, blocker chip list.

---

# 7. User Interactions

Search (project/customer name), Filtering (saved views), Sorting (all list columns), Export
(CSV), no bulk actions/import.

---

# 8. Responsive Behavior

List collapses to card view on tablet/mobile; 360 Detail sections stack vertically below tablet
width. Reference `docs/4-ui/6-responsive-design.md`.

---

# 9. Accessibility

Metrics tiles must be keyboard-focusable and announce their filter action to screen readers.

---

# 10. UI States

Loading, Empty, No Permission (hide Export/status override), Network Errors (retry banner).

---

# 11. Notifications

Success: "Status updated." Error: "Export failed — try narrowing your filters."

---

# 12. Related Documents

`2-functional-specification.md`, `7-permissions.md`, `8-api.md`, `docs/4-ui/`

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

Build on existing Lovable UI's project-adjacent screens where present.
