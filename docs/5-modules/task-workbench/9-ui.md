# UI Specification

> **Purpose**
>
> UI for the Task Workbench module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Task Workbench |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define Task List, Task Board, and Task Detail screens.

Target users: Estimator (primary), Manager, Processor, Admin.

References: `docs/4-ui/1-navigation.md`, `2-user-flows.md`.

---

# 2. Screen Inventory

| Screen | Purpose |
|----------|---------|
| Task List | Sortable/filterable list of tasks |
| Task Board | Kanban view grouped by status |
| Task Detail | Full task card with quick actions |

---

# 3. Navigation

Entry point: "Task Workbench" sidebar item. Paths: List ↔ Board toggle; List → Task Detail →
back to List.

---

# 4. Screen Specifications

## Task List

Purpose: primary Estimator landing view.

Layout: table with summary metric row (Due This Week, Overdue, Awaiting Info, Ready for Review).

Displayed columns: Task ID, Project, Type, Estimator, Due Date, Status, Priority.

Filters: All / In Progress / Overdue / Awaiting Info quick filters.

Sorting: due date ascending by default.

Available actions: open Task Detail.

Permissions: Estimator sees own tasks only; Manager/Admin/Processor see all.

Empty state: "No tasks match this filter."

---

## Task Board

Purpose: Kanban view by status for quick status overview.

Layout: columns per configured status; cards show Task ID, Project, due date, priority badge.

Available actions: drag-and-drop status change (maps to PATCH /tasks/{id}/status), open detail.

---

## Task Detail

Purpose: full task context and quick actions.

Layout: header (Task ID, Project), metadata block, workflow progress bar, work-indicator flags,
notes thread, quick action buttons.

Available actions: Open OneDrive/NetSuite, Add Note, Mark Awaiting Info, Update Status, Extend
Due Date.

Permissions: per `7-permissions.md`.

Empty state: n/a (always has task data).

---

# 5. Forms

Reference `docs/4-ui/5-form-standards.md`. Module-specific: due-date extension modal (new date +
reason, min 20 chars); Awaiting Info modal (clarification note).

---

# 6. UI Components

Status badge, priority badge, workflow progress bar, note thread with type tags, drag-and-drop
Kanban card.

---

# 7. User Interactions

Search (project/customer), Filtering (status quick filters), Sorting (due date), Drag & Drop
(Kanban status change), no bulk actions/import/export at this module's level.

---

# 8. Responsive Behavior

Task Board collapses to a single scrollable column list on tablet/mobile; Task List remains a
stacked card view below tablet width. Reference `docs/4-ui/6-responsive-design.md`.

---

# 9. Accessibility

Drag-and-drop status change must have a keyboard-accessible equivalent (status dropdown) per
`docs/4-ui/7-accessibility.md`.

---

# 10. UI States

Loading, Empty, No Permission (hide reassign/extend for Estimator), Validation Errors (modal
inline), Read Only (Completed tasks), Disabled (status options that violate BR-WORKBENCH-002).

---

# 11. Notifications

Success: "Status updated." / "Due date extended." Warning: "This task is Completed and read-only."
Error: "Could not save change." Confirmation dialogs: mark-complete confirmation.

---

# 12. Related Documents

`2-functional-specification.md`, `6-validation.md`, `7-permissions.md`, `8-api.md`,
`docs/4-ui/`

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

Build on existing Lovable UI task-adjacent screens where present.
