# Requirements

> **Purpose**
>
> This document captures the complete set of approved business and functional requirements for the project. It serves as the primary source for feature identification, project scope, module design, architecture, database design, API specifications, UI design, and testing.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Version | 1.0 |
| Status | Approved |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-08 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

The MVP replaces fragmented systems (Outlook, NetSuite, OneDrive, Planner) with one platform for
request intake, task management, Project 360 visibility, executive dashboards, and core reporting,
plus lightweight read-only NetSuite and OneDrive references. Requirements below are grouped by
module and are sourced from the BRD (FR-* IDs) and the Project Plan.

---

## Source Document Reconciliation

The BRD and Project Plan disagree on one point; this section records the resolution so it does
not resurface as an ambiguity during build.

**NetSuite / OneDrive integration timing.** BRD Section 8.2 Constraint #5 states "Real
NetSuite/OneDrive integrations deferred to Phase 2 (mock services in MVP)". The Project Plan's
Milestone 5 (90 hrs, "Integrations, Testing & Production Launch") lists "Lightweight NetSuite
read-only integration (confirmed objects & fields)" and "OneDrive folder/document visibility"
as an actual MVP deliverable — consistent with the BRD's own INT-NS-001/INT-OD-001 detail
sections, which describe real (if lightweight) read-only access, not mocks.

**Resolution (confirmed 2026-07-27):** Real, lightweight, read-only NetSuite and OneDrive
integration ships in the MVP, per the Project Plan (the commercial scope/hours document).
"Mock services" only apply as the Milestone 5 fallback if live credentials/access are not
available in time — matching the Project Plan's own risk mitigation ("use NetSuite deep
links/manual reference mapping as fallback"). All module docs (`docs/5-modules/`) are written
against this resolution.

**Request attachment/reference links wording.** The Project Plan's Request Intake feature list
names a generic "Attachment/reference links" field; the BRD's FR-INTAKE-007 is more specific —
a OneDrive folder URL (plus optional prep-folder URL), link-only, no upload (per BRD INT-OD-003:
"No file upload/download in MVP"). Resolution: treat these as the same field — the BRD's
OneDrive-specific, link-only version is authoritative and is what `docs/5-modules/request-intake/`
implements. No generic file-attachment mechanism exists in MVP.

**New-project field on Request Intake.** The BRD's request form lists an optional "Project
Name" text field (Section 4.1); the Project Plan says "Customer and Project selection," which
reads as selecting an existing project only. Resolution (confirmed 2026-07-27): support both —
a request may reference an existing project (`project_id`) or supply a new project name
(`new_project_name`), mutually exclusive. If a new name is given, the Project row is created at
request-to-task conversion time. See `docs/5-modules/request-intake/4-schema.md` and
`3-business-rules.md` (BR-INTAKE-005).

**Location/State field.** The Project Plan explicitly names a "Location/State" field on the
request form; the BRD's location examples ("Austin, TX" / "AUS") fold state into a single
display name. Resolution (confirmed 2026-07-27): Locations master data stores `state` as its
own column, separate from `name` and `code`, so reports can filter/group by state. See
`docs/5-modules/settings-administration/4-schema.md`. Real location rows are not invented here —
Legacy Lighting supplies the actual list in Milestone 1 (Open Question Q-005). This was
double-checked against a real screenshot of the live Lovable UI (`lovable-screen/`), which
shows Location entered as free-text city + a State dropdown at intake time — a UI convenience
in front of the same underlying master-data list, confirmed 2026-07-27 to stay as configurable
master data rather than switching to unconstrained free text.

**Additional fields found in the live Lovable UI.** A review of six screenshots of the actual
deployed prototype (`lovable-screen/`, captured 2026-07-27) surfaced real fields/values not
present in either the BRD or Project Plan text. Confirmed 2026-07-27 to add as straightforward
detail (not scope changes):

- **Sales Rep** — a free-text name field on requests/tasks (not a platform user; sales reps are
  a BRD stakeholder group, not one of the 5 roles). See `request-intake/4-schema.md`
  (`sales_rep_name`).
- **Request Source** — the channel a request arrived through (Outlook/Quotes Inbox, NetSuite,
  OneDrive, Manual, etc.), shown on both the intake queue and task detail. See
  `request-intake/4-schema.md` (`source`).
- **Two additional work indicators** — Layover and VE Request (Value Engineering Request),
  alongside the BRD's Counts Provided, Takeoff Required, Submittal, Spec Package (6 total).
- **Two additional Projects saved views** — "Needs NetSuite Review" and "Classification
  Review," alongside the BRD's 6 (All Active, Due This Week, Overdue, Awaiting Info, By
  Estimator, By Customer).
- **An additional portfolio metric** — "High Priority" count, alongside Active Projects, Open
  Tasks, Due This Week, Overdue, Needing Attention.
- **Additional status values** — "Assigned" and "Needs Review" appear as task/project statuses
  in the live UI, beyond the BRD's example list.

Explicitly confirmed **out of scope for MVP** despite appearing in the Lovable screens (real
conflicts, not just missing detail):

- **File upload** to OneDrive (an "Upload Files" button and "not yet uploaded" file states
  appear on-screen) — BRD INT-OD-003 is authoritative: links only, no upload, in MVP.
- **Pluggable task-system architecture** (Microsoft Planner / Monday.com shown as alternate,
  swappable backends to the custom workspace) — not mentioned in either source document; noted
  as a possible Phase 2 direction only.
- **Rich threaded chat on tasks** (@mentions, dynamic tag chips, attachments — "Teams Chatter")
  — BRD FR-WORKBENCH-005 only specifies simple typed notes with author/timestamp; kept simple
  for MVP.
- **Scheduled/pre-computed report generation** ("Last run: 9:00 AM" timestamps) — reports stay
  on-demand live queries per BRD FR-REPORTS-*; no background job added.
- **Flexible multi-role/multi-person team assignment** (a role+person array with "Add Role") —
  kept as the BRD's single Assigned Processor / Assigned Estimator fields.

---

# 2. Business Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| BR-001 | Centralize request intake so all incoming work enters through one standardized process | High | Replaces email/manual triage |
| BR-002 | Optimize estimator workload distribution and due-date visibility | High | |
| BR-003 | Provide real-time project visibility for managers and executives | High | Project 360 + Dashboard |
| BR-004 | Enable data-driven decisions via executive KPIs and reporting | High | |
| BR-005 | Reduce manual status-update and reporting effort | Medium | |
| BR-006 | Improve customer response time / turnaround tracking | Medium | |
| BR-007 | Provide read-only visibility into NetSuite and OneDrive without write-back in MVP | Medium | Deferred: write-back, deep integration |

---

# 3. Functional Requirements

## 3.1 Request Intake Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-INTAKE-001 | Display incoming/manual requests in a unified queue with source, timestamp, and filters | High |
| FR-INTAKE-002 | Create requests via a standardized form (Customer, Request Type, Project Type, Location/State, Due Date, Priority, Assigned Processor, Estimator Assignment, Project: select existing or type a new project name) | High |
| FR-INTAKE-003 | Tag requests with work indicators (Counts Provided, Takeoff Required, Layover, Submittal, Spec Package, VE Request) | Medium |
| FR-INTAKE-004 | Convert an approved request into a task in one action, transferring all data | High |
| FR-INTAKE-005 | Save incomplete requests as drafts, editable later | Medium |
| FR-INTAKE-006 | Flag requests as NetSuite Relevant with a NetSuite ID field and validation | Medium |
| FR-INTAKE-007 | Associate a request with a OneDrive folder via manual URL entry | Medium |

## 3.2 Task Management Workbench Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-WORKBENCH-001 | Task List View showing current-user tasks with status counts and quick filters | High |
| FR-WORKBENCH-002 | Task Board View (Kanban) by status | High |
| FR-WORKBENCH-003 | Comprehensive task detail: metadata, dates, status badges, work indicators, integration links | High |
| FR-WORKBENCH-004 | Guided workflow visualization with progress tracking | Medium |
| FR-WORKBENCH-005 | Quick actions (Open OneDrive/NetSuite, Add Note, Mark Awaiting Info, Update Status, Extend Due Date) | High |
| FR-WORKBENCH-006 | Internal notes with type, author, and timestamp | Medium |
| FR-WORKBENCH-007 | Due date extension with mandatory justification and activity-log entry | High |
| FR-WORKBENCH-008 | Status updates with workflow validation and Awaiting Information flag with mandatory clarification | High |

## 3.3 Projects 360 Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PROJECTS-001 | Project List View: paginated table with sortable columns and status badges | High |
| FR-PROJECTS-002 | View selector: List, Kanban, Update Call (Monday Meeting) views | Medium |
| FR-PROJECTS-003 | Saved/predefined views (All Active, Due This Week, Overdue, Awaiting Info, By Estimator, By Customer, Needs NetSuite Review, Classification Review) | Medium |
| FR-PROJECTS-004 | Metrics header with clickable, real-time-refreshed KPIs (Active Projects, Open Tasks, Due This Week, Overdue, Awaiting Info, High Priority) | High |
| FR-PROJECTS-005 | Project 360 detail view: related tasks/requests, activity timeline, documents, NetSuite status, blockers, next actions | High |
| FR-PROJECTS-006 | Export project list to CSV respecting active filters | Medium |

## 3.4 Executive Dashboard Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DASHBOARD-001 | Project status widget (On Track / Needing Attention / At Risk) with drill-down | High |
| FR-DASHBOARD-002 | Sales outlook widget (Active Quote Value, Value At Risk, Ready for Review) | Medium |
| FR-DASHBOARD-003 | Top blockers widget (top 5 categories with counts) | Medium |
| FR-DASHBOARD-004 | Monday Meeting View: completed last week, due this week, overdue with aging, new requests, printable | High |
| FR-DASHBOARD-005 | Dashboard auto-refresh, manual refresh, and last-updated timestamp | Medium |

## 3.5 Reports Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-REPORTS-001 | Estimator Workload Report (open/overdue/completed tasks, completion rate) | High |
| FR-REPORTS-002 | Overdue Aging Report (1-7, 8-14, 15-30, 30+ day buckets) | High |
| FR-REPORTS-003 | Request Type Volume Report (time series by type) | Medium |
| FR-REPORTS-004 | NetSuite Coverage Report (tasks with vs without NetSuite reference) | Medium |
| FR-REPORTS-005 | Project Health Rollup (status counts, progress distribution, top blockers) | Medium |
| FR-REPORTS-006 | Customer Activity Report (requests, turnaround, overdue, completion rate per customer) | Medium |
| FR-REPORTS-007 | Common report filters (date range, team/estimator, status), persisted per report type | Medium |
| FR-REPORTS-008 | Export all reports as a single ZIP of CSVs | Low |

## 3.6 Settings & Administration Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SETTINGS-001 | User management: create/edit/deactivate, role assignment, password reset, audit log | High |
| FR-SETTINGS-002 | Request Types configuration (CRUD, active flag, sort order) | Medium |
| FR-SETTINGS-003 | Project Types configuration (CRUD, active flag, sort order) | Medium |
| FR-SETTINGS-004 | Locations configuration (name, code, active, sort order) | Medium |
| FR-SETTINGS-005 | Statuses configuration per entity type (Task/Project/Request), with color | Medium |
| FR-SETTINGS-006 | Priorities configuration with level and color; minimum 3 active priorities enforced | Medium |
| FR-SETTINGS-007 | Connected Systems status display (NetSuite, OneDrive, Outlook, Planner) with manual sync trigger | Medium |
| FR-SETTINGS-008 | User profile: display name, password change, notification preferences, time zone | Low |

---

# 4. Non-Functional Requirements

## Performance

- Initial page load ≤ 2s (95th percentile); SPA navigation ≤ 500ms
- Simple API queries ≤ 200ms; complex aggregations (dashboard/reports) ≤ 500ms (95th percentile)
- Export operations ≤ 5s for up to 1000 records

## Security

- JWT authentication, 24-hour token expiry; bcrypt password hashing (10 rounds)
- Password complexity: min 8 chars, 1 uppercase, 1 number, 1 special character
- Account lockout after 5 failed attempts (15-minute lockout)
- Role-based access control enforced at the API level; frontend hides unauthorized actions
- HTTPS only (TLS 1.2+); sensitive data encrypted at rest; no sensitive data in logs
- Input validation via schema validation (e.g. Zod); parameterized queries via ORM; XSS/CSP protections

## Availability

- Target 99.5% uptime; scheduled maintenance communicated 48 hours in advance, off-peak
- Automated daily backups retained 30 days; RTO 4 hours; RPO 24 hours

## Scalability

- Support 10,000+ tasks, 5,000+ projects, 1,000+ users (future growth), 100,000+ activity records
- Stateless backend API for horizontal scaling

## Reliability

- Graceful degradation on partial feature failure; retry logic for transient failures
- Circuit breaker pattern for external (NetSuite/OneDrive) integrations

## Accessibility

- WCAG 2.1 Level A minimum; keyboard navigation; ARIA labels; text resizing to 200%

## Compatibility

- Chrome 90+, Firefox 88+, Edge 90+, Safari 14+; responsive down to tablet/mobile (read-only)

## Maintainability

- TypeScript strict mode; ESLint enforced; code review required; unit test coverage ≥ 70% for
  business logic; API documentation (OpenAPI/Swagger); Git-based version control with
  main/staging/feature branch strategy

## Compliance & Regulatory

- No PII shared with third parties beyond the confirmed NetSuite/OneDrive integrations
- Privacy policy and terms of service displayed to users
- User data deletion capability (GDPR right to be forgotten) is out of scope for MVP, deferred
  to a future phase
- All CRUD operations logged with user, timestamp, and IP; audit log retained 7 years,
  read-only, and exportable for compliance reporting (see `docs/2-database/4-database-standards.md`
  Section 9, Audit Standards)

---

# 5. User Roles

| Role | Description |
|------|-------------|
| Admin | Full system access; user management; master data and integration configuration |
| Manager | Views all projects/tasks/requests; dashboards and reports; reassigns tasks; overrides status/deadlines; exports data |
| Processor | Creates/edits intake requests; converts requests to tasks; assigns estimators |
| Estimator | Views assigned tasks; updates status/notes; extends due dates with justification |
| Viewer | Read-only access to projects, dashboards, and reports |

---

# 6. User Stories

| ID | User Story | Priority |
|----|------------|----------|
| US-001 | As a Processor, I want to see all incoming requests in one queue so I don't miss requests arriving via different channels | High |
| US-002 | As a Processor, I want to convert a validated request into a task in one click so work starts without re-entering data | High |
| US-003 | As an Estimator, I want a personal task list sorted by due date so I know what to work on next | High |
| US-004 | As an Estimator, I want to extend a due date with a reason so scheduling stays realistic and accountable | Medium |
| US-005 | As a Manager, I want a Project 360 view per project so I can see tasks, blockers, and activity without switching systems | High |
| US-006 | As a Manager, I want to reassign a task and adjust its priority so I can rebalance workload | Medium |
| US-007 | As an Executive, I want a KPI dashboard so I can assess portfolio health at a glance | High |
| US-008 | As a Manager, I want a Monday Meeting View so weekly status reviews take minutes, not hours | High |
| US-009 | As an Admin, I want to configure request types, statuses, and priorities so the platform matches our workflow | Medium |
| US-010 | As any authorized role, I want to export report/project data to CSV so I can do offline analysis | Medium |

---

# 7. Business Rules

- Only active users can log in
- Deleted records are soft-deleted (marked inactive), never physically removed
- Estimators can view and update only tasks assigned to them
- A task's "Completed" status requires confirmation and records a completed timestamp
- Marking a task "Awaiting Information" requires a mandatory clarification note; clearing it requires a resolution note
- A due-date extension requires a reason of at least 20 characters and is recorded in the activity log
- Inactive master-data values (request types, project types, etc.) are hidden from new-entry dropdowns but retained on historical records
- Master-data values in use cannot be deleted
- Priority configuration must always retain at least 3 active priority levels
- NetSuite integration in MVP is read-only; no write-back to NetSuite

---

# 8. Validation Requirements

- Required fields: Customer, Request Type, Due Date, Priority (request creation)
- Due dates cannot be set in the past
- NetSuite ID required and format-validated when a request is flagged "NetSuite Relevant"
- OneDrive URLs validated against the OneDrive domain
- Note text limited to 2000 characters
- Due-date extension reason: minimum 20 characters
- Email addresses must be unique (user accounts)
- Status transitions follow the configured workflow (cannot skip statuses)

---

# 9. Data Requirements

## Master Data

- Customers, Users, Request Types, Project Types, Locations, Statuses (per entity type), Priorities

## Transaction Data

- Requests, Tasks, Projects, Notes, Activity History entries

## Reference Data

- NetSuite record references (customer, project/job, quote/estimate, quote status, memo)
- OneDrive folder/document references

## Audit Data

- Activity history (status changes, assignments, extensions)
- Audit log of privileged operations (user management, master-data changes), retained 7 years

## Data Migration & Initial Load (from BRD Section 7.2)

- Greenfield project — no legacy system migration required.
- Initial load of Customers, Users, and representative active Projects/Tasks is via manual CSV
  import, executed once during Milestone 2 setup (not a persistent Admin UI feature — no
  ongoing bulk-import screen is in scope for MVP).
- CSV templates for Customers, Users, and Projects are a Milestone 2 deliverable, matching the
  "Data Import Templates" the BRD calls for.
- Historical/legacy planner data with overloaded labels is explicitly out of scope for
  migration; only confirmed active data is loaded (see Risk: Historical Data Quality).

---

# 10. Integration Requirements

| System | Purpose |
|---------|---------|
| NetSuite (REST/SuiteTalk) | Read-only reference to customer, project/job, and quote/estimate records; manual/limited scheduled sync |
| Microsoft Graph (OneDrive) | Manual project-to-folder association; related document listing where API access permits |

---

# 11. Reporting Requirements

| Report | Description |
|--------|-------------|
| Estimator Workload Report | Open/overdue/completed task counts and completion rate per estimator |
| Overdue Aging Report | Overdue tasks bucketed by age with blocker tags |
| Request Type Volume Report | Request volume over time by request type |
| NetSuite Coverage Report | Tasks with vs. without a NetSuite reference |
| Project Health Rollup | Project counts by status, progress distribution, top blockers |
| Customer Activity Report | Request volume and turnaround per customer |
| Executive Dashboard KPIs | Active projects, open/overdue tasks, tasks due this week, projects awaiting information/requiring attention, estimator workload |
| Monday Meeting View | Completed last week, due this week, overdue (aged), new requests |

---

# 12. Notification Requirements

Confirmed scope (Q-003):

- Email notification to the assigned estimator when a request converts to a task or a task is
  reassigned
- In-app toast/badge on task status changes
- Daily digest email and SMS/push notifications deferred to Phase 2
- User-level notification preferences (email on assignment) configurable in profile settings
  (FR-SETTINGS-008)

---

# 13. Assumptions

- Stakeholders are available for weekly reviews and UAT
- Cloud hosting is approved and provisioned
- A PostgreSQL instance is available in development and production
- NetSuite sandbox/API credentials are provided by Legacy Lighting
- Microsoft 365 tenant and admin access are available for OneDrive setup
- Legacy Lighting handles internal user training after launch

---

# 14. Constraints

- 5-week delivery timeline (400 hours total)
- 2 full-stack developers, no dedicated QA/DevOps in MVP
- React + TypeScript frontend, Node.js + TypeScript backend, PostgreSQL database
- No native mobile app; no offline mode; English-only
- Real NetSuite/OneDrive integrations are lightweight/read-only in MVP (mockable where access is delayed)

---

# 15. Dependencies

| Dependency | Description |
|------------|-------------|
| Lovable UI prototypes | Assumed final/approved as the starting UI design |
| PostgreSQL infrastructure | Must be available early in delivery |
| NetSuite API documentation & sandbox access | Required before integration work in Milestone 5 |
| OneDrive/Graph API documentation & access | Required before integration work in Milestone 5 |
| User accounts and role assignments | Provided by Legacy Lighting before launch |
| Customer/project/task sample data | Provided for initial data load |

---

# 16. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| NetSuite API access & data availability | Integration delays | Validate credentials/records in Week 1; fallback to manual deep links |
| OneDrive folder inconsistency | Unreliable auto-association | Manual folder association in MVP |
| Scope expansion | Schedule risk | Lock MVP backlog after Week 1; defer extras to Phase 2 |
| Historical data quality | Inconsistent project/task data | Start with confirmed active data and structured fields |
| Compressed timeline | Delayed production readiness | Weekly reviews; require timely stakeholder feedback |
| User adoption | Continued use of legacy tools | Focus MVP on existing workflows; pilot with real users |

---

# 17. Open Questions

Q-001 through Q-004, and the Request/Project Types portion of Q-005, were confirmed directly by
the project owner on 2026-07-27 (not yet by Legacy Lighting/the client — that confirmation
still happens in the real Milestone 1 session). They are recorded as **Resolved** below so the
rest of the documentation set stops hedging on them. Locations remains genuinely open — no
office/region list exists in either source document, so nothing was invented.

| ID | Question | Owner | Status | Confirmed Answer |
|----|----------|-------|--------|-------------------|
| Q-001 | Which specific NetSuite objects/fields are "confirmed" for read-only sync? | — | Resolved | Customer, Project/Job, Quote/Estimate only (quote status, memo/reference text included). No other NetSuite objects (e.g. Sales Order line items, Item records) in MVP. |
| Q-002 | What are the exact executive KPI definitions and thresholds for the Monday Meeting View? | — | Resolved | Project classification: **On Track** = no overdue tasks and not Awaiting Info; **Needing Attention** = Awaiting Info flag set but not yet overdue; **At Risk** = one or more overdue tasks. Alert threshold: flag when overdue project count exceeds 10. |
| Q-003 | Which notification channels are required at MVP launch vs Phase 2? | — | Resolved | MVP: email notification on task assignment/reassignment plus in-app toast/badge for status changes. Daily digest email and SMS/push deferred to Phase 2. |
| Q-004 | What is the final confirmed role list? | — | Resolved | BRD's 5-role model as-is: Admin, Manager, Processor, Estimator, Viewer, with permissions per BRD Section 3.2. |
| Q-005a | Initial Request Types / Project Types values? | — | Resolved | Request Types: New Quote, Revision, Takeoff, Submittal, Clarification. Project Types: Multifamily, Commercial, Retail, Hospitality. |
| Q-005b | Initial Locations (office/region list, with State)? | Legacy Lighting | Open | No real location rows invented — Legacy Lighting must supply the actual office/region/state list in the real Milestone 1 session. |

---

# 18. Acceptance Criteria

This document is considered complete when:

- All business requirements are documented.
- All functional requirements are approved.
- Non-functional requirements are defined.
- Business rules are identified.
- User roles are confirmed.
- Open questions are resolved or assigned.
- Stakeholders approve the documented requirements.

---

# 19. Related Documents

- `1-project-overview.md`
- `3-feature-breakdown.md`
- `4-tech-stack.md`
- `Project Req Doc/Business Requirements Document (BRD).docx`
- `Project Req Doc/LL – Project Management & Project 360 Visibility Platform (MVP) Project Plan 2 (1).pdf`

---

# 20. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, generated from BRD FR-* items and Project Plan |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Business Owner | | Pending | |
| Product Owner | | Pending | |
| Technical Lead | | Pending | |

---

# AI Generation Notes

When generating this document, the AI should:

- Capture business requirements before proposing technical solutions.
- Clearly separate business, functional, and non-functional requirements.
- Remove duplicate or conflicting requirements.
- Identify missing requirements and ambiguities.
- Prioritize requirements using Critical, High, Medium, or Low.
- Keep requirements implementation-independent.
- Do not define database schemas, APIs, UI layouts, or technical architecture.
- Ensure every requirement can be traced to one or more features in the Feature Breakdown document.
- Maintain consistency with all project documentation.
