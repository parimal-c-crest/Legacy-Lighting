# Functional Specification

> **Purpose**
>
> This document translates approved business requirements into detailed system behavior for the Request Intake module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Request Intake |
| Version | 1.0 |
| Status | Draft |

---

# 1. Overview

Purpose: define exact system behavior for capturing, classifying, and converting requests.

Scope: request queue, creation form, drafts, work indicators, NetSuite/OneDrive linking,
request-to-task conversion.

References: `1-module.md`, `1-project/2-requirements.md` (FR-INTAKE-001..007).

---

# 2. Functional Scope

Implemented Features: unified queue, standardized form, work indicators, draft saving,
request-to-task conversion, NetSuite relevance flag, OneDrive folder link.

Excluded Features: AI-based email classification, automated NetSuite write-back.

Dependencies: Customers, Master Data (request types/project types/locations/priorities), Users.

---

# 3. Feature Specifications

## FR-INTAKE-001 — Request Queue Display

### Description
Unified queue of incoming/manual requests with source, timestamp, and filters.

### Trigger
User navigates to Request Intake.

### Preconditions
User has Processor, Manager, or Admin role.

### Main Flow
1. System loads requests not yet converted, sorted by created date descending.
2. User filters by source/date/status/search keyword.

### Alternate Flow
No requests match filter — show empty state.

### Exception Flow
Query failure — show retry option, log error.

### Post Conditions
Queue reflects current filter/sort state.

---

## FR-INTAKE-002 — Standardized Request Form

### Description
Create a request through a standardized capture form.

### Trigger
User clicks "Create Request".

### Preconditions
User has Processor, Manager, or Admin role.

### Main Flow
1. User fills mandatory fields (Customer, Request Type, Due Date, Priority) and optional fields.
2. For Project, user either selects an existing project or types a new project name
   (`new_project_name`) — the two are mutually exclusive.
3. User submits; system validates and creates the request with Intake Status "New".

### Alternate Flow
User clicks "Save Draft" instead of submit — see FR-INTAKE-005. User provides neither
`project_id` nor `new_project_name` — allowed; the request is simply not yet tied to a project
until conversion or a later edit.

### Exception Flow
Validation failure — return field-level errors (see `6-validation.md`).

### Post Conditions
Request persisted; visible in queue.

---

## FR-INTAKE-003 — Work Indicators

### Description
Tag a request with Counts Provided / Takeoff Required / Layover / Submittal / Spec Package /
VE Request flags (6 total, confirmed against the live Lovable intake screen).

### Trigger
User selects indicator chips on the request form.

### Preconditions
Request is in Draft or New status.

### Main Flow
Multiple indicators can be selected; stored as boolean flags on the request.

### Alternate Flow
None selected — request has no work indicators.

### Exception Flow
N/A.

### Post Conditions
Indicators visible on the request card and carried to the task on conversion.

---

## FR-INTAKE-004 — Request to Task Conversion

### Description
Convert an approved request into a task in one action.

### Trigger
Processor/Manager clicks "Create Task" on a request.

### Preconditions
Request Intake Status is "New" or "Triaged" (not already "Converted").

### Main Flow
1. If `new_project_name` is set (no existing `project_id`), system creates a new Project row
   first, using `new_project_name` as the Project name and the request's customer/project
   type/location.
2. System creates a task linked to the (existing or newly created) project, copying all request
   fields.
3. Request Intake Status set to "Converted".
4. Task appears in Task Workbench; assigned estimator notified.

### Alternate Flow
Request flagged "NetSuite Relevant" without a NetSuite ID — warn before allowing conversion.
Request has neither `project_id` nor `new_project_name` — block conversion; a project is
required at the task/project level (see `docs/5-modules/projects-360/4-schema.md`,
`projects.name` NOT NULL).

### Exception Flow
Conversion fails mid-transaction — roll back; request remains unconverted.

### Post Conditions
Exactly one task exists per converted request (see `2-erd.md` 1:1 relationship).

---

## FR-INTAKE-005 — Draft Saving

### Description
Save an incomplete request as a draft.

### Trigger
User clicks "Save Draft" or 30-second auto-save fires.

### Preconditions
None (drafts may omit mandatory fields).

### Main Flow
Draft persisted with Intake Status "Draft"; appears in a separate Drafts section.

### Alternate Flow
User resumes and completes a draft later.

### Exception Flow
Auto-save failure — retry silently; do not interrupt user.

### Post Conditions
Draft is editable until submitted or discarded.

---

## FR-INTAKE-006 — NetSuite Relevance Flag

### Description
Mark a request as requiring a NetSuite reference.

### Trigger
User checks "NetSuite Relevant".

### Preconditions
None.

### Main Flow
NetSuite ID field becomes mandatory; validated against expected format.

### Alternate Flow
User unchecks the flag — NetSuite ID field cleared and hidden.

### Exception Flow
Invalid NetSuite ID format — inline validation error.

### Post Conditions
Flag and ID (if present) carried to the task on conversion.

---

## FR-INTAKE-007 — OneDrive Linking

### Description
Associate a OneDrive folder URL with the request.

### Trigger
User pastes a folder URL into the OneDrive field.

### Preconditions
None.

### Main Flow
System validates the URL is a OneDrive domain; stores it as a clickable reference.

### Alternate Flow
Optional "prep folder" URL also provided.

### Exception Flow
Invalid domain — inline validation error.

### Post Conditions
Link opens in a new tab; carried to the task on conversion.

---

# 4. Business Process Flow

See `1-module.md` Section 9 and `docs/4-ui/2-user-flows.md` "Request Intake → Task Conversion".

---

# 5. System Behavior

Create: FR-INTAKE-002. Update: edit request while Draft/New. Delete: soft delete only, Admin/
Manager. Search: by customer, request type, status, keyword. Import/Export: not in MVP scope
for this module (project-level export covered in Reports/Projects 360). Notifications:
estimator notified on conversion. Background Jobs: none.

---

# 6. Data Processing

Inputs: form fields per FR-INTAKE-002/003/006/007.

Transformations: request → task field copy on conversion.

Outputs: request record; task record (on conversion); activity log entry.

---

# 7. Integrations

External APIs: NetSuite (ID format validation only, no live lookup in MVP), Microsoft Graph
(OneDrive URL open, not upload).

---

# 8. Error Handling

Validation Errors: see `6-validation.md`.

Business Errors: converting an already-converted request → 409 Conflict.

System Errors: standard project error format, see `docs/3-api/6-error-handling.md`.

Recovery: draft auto-save retries silently; conversion is transactional (all-or-nothing).

---

# 9. Performance Requirements

Maximum response time: ≤200ms for queue list (NFR-PERF-002).

Maximum records: paginated, 20 per page default.

Concurrency: two Processors editing the same draft — last write wins (no MVP locking).

---

# 10. Security Requirements

Authentication: JWT bearer token required.

Authorization: Processor/Manager/Admin can create/edit; Estimator/Viewer read-only where
applicable (see `7-permissions.md`).

Audit: creation, edits, and conversion logged to `activity_logs`.

---

# 11. Edge Cases

Duplicate Data: two requests for the same customer/project — allowed (no uniqueness constraint;
duplicates are a business, not a system, concern).

Timeouts: NetSuite ID format check is local/synchronous, no timeout risk in MVP.

Concurrent Updates: last write wins.

Large Data: queue paginated to avoid large payloads.

---

# 12. Assumptions

Legacy Lighting confirms request type/project type/location master data in Milestone 1.

---

# 13. Constraints

Manual classification only; no AI-assisted parsing in MVP.

---

# 14. Traceability

| Requirement | Feature |
|---|---|
| FR-INTAKE-001..007 | Request Intake module (this document) |

---

# 15. Related Documents

`1-module.md`, `4-schema.md`, `6-validation.md`, `8-api.md`, `9-ui.md`, `7-permissions.md`,
`11-testing.md`

---

# AI Generation Notes

Keep feature specs traceable 1:1 to the FR-INTAKE-* IDs in `1-project/2-requirements.md`;
do not introduce behavior not backed by an approved requirement.
