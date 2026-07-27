# UI Specification

> **Purpose**
>
> UI for the Request Intake module, following `docs/4-ui/` project-wide standards.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Request Intake |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: define the Request Queue, Create/Edit Request, and Drafts screens.

Scope: intake-specific screens only; shared components per `docs/4-ui/4-component-standards.md`.

Target users: Processor (primary), Manager, Admin.

References: `docs/4-ui/1-navigation.md`, `2-user-flows.md`.

---

# 2. Screen Inventory

| Screen | Purpose |
|----------|---------|
| Request Queue | Browse/filter incoming and manual requests |
| Create/Edit Request | Capture or edit a request |
| Drafts | List of saved, incomplete requests |
| Request Detail | View a single request and trigger conversion |

---

# 3. Navigation

Entry point: "Request Intake" in the main sidebar (see `docs/4-ui/1-navigation.md`).

Navigation paths: Queue → Create Request → back to Queue; Queue → Request Detail → Convert.

Breadcrumbs: Request Intake > Request Detail.

Related screens: Task Workbench (post-conversion).

---

# 4. Screen Specifications

## Request Queue

Purpose: primary landing view for Processors.

Layout: table/list with source, customer, request type, due date, priority, status columns.

Displayed columns: Source, Customer, Request Type, Due Date, Priority, Intake Status.

Filters: source, status, date range, search keyword.

Sorting: default by created date descending.

Pagination: 20 per page.

Available actions: Create Request, open Request Detail, Convert to Task (inline).

Permissions: Processor/Manager/Admin full; Viewer read-only.

Empty state: "No requests match your filters."

Loading state: skeleton rows.

Error state: retry banner.

---

## Create/Edit Request

Fields: Customer, Request Type, Project Type, Location/State, Due Date, Priority, Sales Rep
(free text), Assigned Processor, Assigned Estimator, Clarification Required, 6 work indicator
chips (Counts Provided, Takeoff Required, Layover, Submittal, Spec Package, VE Request),
NetSuite Relevant + ID, OneDrive folder URL, notes, and a Project control offering two mutually
exclusive modes: "Select existing project" (typeahead) or "New project" (free-text name) —
switching modes clears the other field. `source` is set automatically from the originating
channel (Outlook/Quotes Inbox, NetSuite, OneDrive, Manual), not user-entered.

Validation references: `6-validation.md`.

Default values: `intake_status = Draft` until submitted.

Buttons: Save Draft, Submit, Cancel.

Success flow: request created/updated, return to Queue.

Failure flow: inline field errors, form remains populated.

---

## Drafts

Purpose: resume incomplete requests.

Layout: simplified list (customer if entered, last edited date).

Actions: Edit, Discard.

---

## Request Detail

Purpose: view a request and convert it.

Layout: read-only summary of all fields, work indicators, NetSuite/OneDrive links.

Actions: Edit (if not Converted), Convert to Task (if New/Triaged).

Permissions: per `7-permissions.md`.

---

# 5. Forms

Reference `docs/4-ui/5-form-standards.md`. Module-specific: work-indicator chip group,
conditional NetSuite ID field (shown only when NetSuite Relevant is checked).

---

# 6. UI Components

Work indicator chip selector, Intake Status badge (color per `docs/5-modules/settings-administration/` status config), Convert-to-Task confirmation dialog.

---

# 7. User Interactions

Search (keyword), Filtering (source/status/date), Sorting (columns), no bulk actions in MVP,
no import/export at this module's level, no drag & drop.

---

# 8. Responsive Behavior

Reference `docs/4-ui/6-responsive-design.md`. Queue collapses to card list on tablet/mobile;
Create/Edit form stacks fields vertically below tablet width.

---

# 9. Accessibility

Reference `docs/4-ui/7-accessibility.md`. Work-indicator chips must be keyboard-selectable and
screen-reader labeled with their on/off state.

---

# 10. UI States

Loading, Empty, No Permission (hide Create/Convert), Validation Errors (inline), Network
Errors (retry banner), Read Only (Converted requests), Disabled (Convert button when already
converted).

---

# 11. Notifications

Success: "Request created." / "Converted to task." Warning: "NetSuite ID missing — continue?"
Error: "Could not save request." Confirmation dialogs: convert-to-task confirmation.

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

Build on the existing Lovable UI's existing intake-adjacent screens where present rather than
designing from scratch.
