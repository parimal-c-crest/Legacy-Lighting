# Functional Specification

> **Purpose**
>
> Detailed system behavior for the Task Management Workbench module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Task Workbench |
| Version | 1.0 |
| Status | Draft |

---

# 1. Overview

Purpose: define exact behavior of task list/board, task detail, and status/due-date/notes actions.

Scope: FR-WORKBENCH-001 through 008.

References: `1-module.md`, `1-project/2-requirements.md`.

---

# 2. Functional Scope

Implemented: List/Board views, task detail card, workflow visualization, quick actions, notes,
due-date extension, status updates, awaiting-info flag.

Excluded: automated task routing/prioritization (Phase 2).

Dependencies: Request Intake, Projects 360, Settings & Administration.

---

# 3. Feature Specifications

## FR-WORKBENCH-001 — Task List View

### Description
List of tasks assigned to the current user (or all, for Manager/Admin) with summary counts.

### Trigger
User navigates to Task Workbench.

### Preconditions
Authenticated user with Estimator, Manager, Processor, or Admin role.

### Main Flow
System loads tasks sorted by due date ascending; shows counts (Due This Week, Overdue,
Awaiting Info, Ready for Review); user applies quick filters.

### Alternate Flow
Switch to Task Board (Kanban) view — same data, grouped by status.

### Exception Flow
Load failure — retry option shown.

### Post Conditions
List reflects current filter/view state.

---

## FR-WORKBENCH-002 — Task Card Display

### Description
Comprehensive detail card: metadata, dates, status/priority badges, work indicators,
integration links.

### Trigger
User opens a task from the list/board.

### Preconditions
User has access to the task (own task, or Manager/Admin/Processor).

### Main Flow
System renders task header (ID, Project ID/Name), metadata, dates, status badges, and
OneDrive/NetSuite links.

### Exception Flow
Missing NetSuite/OneDrive reference — links hidden, "Not linked" shown.

### Post Conditions
None (read view).

---

## FR-WORKBENCH-003 — Workflow Visualization

### Description
Numbered workflow steps with progress percentage. The live Lovable UI confirms these steps
differ by request type rather than being one fixed sequence — e.g. a Revision task shows
Request Review → Quote Comparison → Line Item Updates → NetSuite Update → Review & Send, which
maps closely to the BRD's generic example (Review Request, Compare Products, Update Line Items,
Enter in System, Distribute Quote) but is request-type-specific in practice.

### Trigger
Task detail opened.

### Main Flow
System selects the step sequence for the task's `request_type_id`; progress auto-calculated
from completed steps; current step highlighted.

### Post Conditions
None (display only in MVP; step completion tracked via status, not individually toggled).

---

## FR-WORKBENCH-004 — Quick Actions

### Description
One-click buttons: Open OneDrive/NetSuite, Add Note, Mark Awaiting Info, Update Status, Extend
Due Date, Send for Review, Ready for Handoff.

### Trigger
User clicks an action button on the task card.

### Main Flow
Action triggers an immediate API call; optimistic UI update; success/error toast.

### Exception Flow
API failure — revert optimistic update, show error toast.

### Post Conditions
Task state updated and activity logged.

---

## FR-WORKBENCH-005 — Notes and Communication

### Description
Rich text notes attached to a task, typed (General/Follow-Up/Internal/Blocker).

### Trigger
User clicks "Add Note".

### Main Flow
Note saved with user attribution/timestamp; displayed chronologically; max 2000 characters.

### Exception Flow
Exceeds character limit — inline error.

### Post Conditions
Note visible to all users with task view access; only author can edit/delete their own note.

---

## FR-WORKBENCH-006 — Due Date Extension

### Description
Request additional time with a mandatory justification.

### Trigger
User clicks "Extend Due Date".

### Preconditions
New date must be after the current due date.

### Main Flow
User enters new date and reason (min 20 characters); system records `extended_due_date` and
`extension_reason`; activity log entry created.

### Exception Flow
Reason under 20 characters, or new date not after current — validation error.

### Post Conditions
Task shows both original and extended due date.

---

## FR-WORKBENCH-007 — Status Updates

### Description
Change task status through the configured workflow.

### Trigger
User selects a new status.

### Preconditions
Transition must be valid (cannot skip statuses per configured workflow).

### Main Flow
Status updated; "Completed" requires a confirmation modal and records a completed timestamp.

### Exception Flow
Invalid transition attempted — blocked with explanation.

### Post Conditions
Activity log entry created for every status change.

---

## FR-WORKBENCH-008 — Awaiting Information Flag

### Description
Mark a task blocked by missing information.

### Trigger
User toggles "Mark Awaiting Info".

### Main Flow
Mandatory clarification text required; task appears in the "Awaiting Info" saved view;
resolving requires a resolution note.

### Post Conditions
Flag cleared only with a resolution note recorded.

---

# 4. Business Process Flow

See `1-module.md` Section 9 and `docs/4-ui/2-user-flows.md` "Task Execution (Estimator)".

---

# 5. System Behavior

Create: system-generated on request conversion, or manual (Manager/Processor). Update: status,
notes, due date, flags. Delete: soft delete, Manager/Admin only. Search: by project, estimator,
status. Notifications: on Awaiting Info flag and reassignment.

---

# 6. Data Processing

Inputs: status changes, note text, due-date extension requests, flag toggles.

Outputs: updated task record, activity log entries, notifications.

---

# 7. Integrations

NetSuite/OneDrive: reference links only (open in new tab), no data pulled into the task record
beyond stored reference IDs/URLs.

---

# 8. Error Handling

Validation Errors: see `6-validation.md`. Business Errors: invalid status transition → 409.
System Errors: standard project format.

---

# 9. Performance Requirements

Task list ≤200ms; quick actions apply optimistically with rollback on failure.

---

# 10. Security Requirements

Estimators see only assigned tasks; Manager/Admin/Processor see all (see `7-permissions.md`).

---

# 11. Edge Cases

Concurrent status updates by two users — last write wins; large task volumes — pagination.

---

# 12. Assumptions

Status workflow (Not Started → In Progress → Awaiting Info → Under Review → Completed / On
Hold) confirmed in Milestone 1.

---

# 13. Constraints

No manager-approval gate on due-date extensions in MVP.

---

# 14. Traceability

FR-WORKBENCH-001..008 map 1:1 to the sections above.

---

# 15. Related Documents

`1-module.md`, `4-schema.md`, `6-validation.md`, `8-api.md`, `9-ui.md`, `7-permissions.md`,
`11-testing.md`

---

# AI Generation Notes

Keep feature specs traceable to FR-WORKBENCH-* IDs; do not add workflow steps beyond the BRD's
5-step example unless confirmed.
