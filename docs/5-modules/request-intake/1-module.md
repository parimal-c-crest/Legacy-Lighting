# Module Specification

Purpose

Document the complete business specification of the Request Intake module.

---

# Document Information

- Module Name: Request Intake
- Version: 1.0
- Status: Draft
- Owner: Development Team (NuVista AI)
- Priority: Critical

---

# 1. Executive Summary

Purpose: give Processors a single standardized queue for capturing and triaging incoming
project requests, replacing email/manual triage.

Business objective: 100% of new requests flow through this module (BR-001, success criterion
in `1-project/1-project-overview.md`).

Scope: request queue, standardized creation form, work indicators, draft saving, NetSuite/
OneDrive linking, and conversion to a Task.

---

# 2. Business Context

Problem statement: requests currently arrive via email/phone with no standardized intake,
causing delayed responses and inconsistent data quality (BRD Section 2.1).

Business value: consistent, structured data at the point of entry improves everything
downstream — task assignment, project visibility, and reporting.

Dependencies: Customers, Users (Processor/Estimator), Master Data (Request Types, Project
Types, Locations, Priorities).

---

# 3. Module Overview

Description: a queue view of incoming/manual requests plus a standardized creation form and a
one-click "Convert to Task" action.

Responsibilities: request capture, validation, draft management, and handoff to Task Workbench.

Out of scope: AI-driven email extraction/classification (Phase 2); automated NetSuite write-back.

---

# 4. Actors

- Processor (primary: creates/triages requests, converts to task)
- Manager (views/reassigns requests)
- Admin (configures request types, priorities, locations used by this module)
- System (auto-fills request source, timestamps)

---

# 5. Goals

Business goals: eliminate email-based triage; standardize data for downstream reporting.

User goals: a Processor can capture a request in under a minute and know exactly what's still
pending classification.

Success metrics: 100% of new requests flow through intake; 95% task assignment accuracy after
conversion (BRD Section 1.4).

---

# 6. Functional Requirements

- FR-INTAKE-001 Request Queue Display
- FR-INTAKE-002 Standardized Request Form
- FR-INTAKE-003 Work Indicators
- FR-INTAKE-004 Request to Task Conversion
- FR-INTAKE-005 Draft Saving
- FR-INTAKE-006 NetSuite Relevance Flag
- FR-INTAKE-007 OneDrive Linking

---

# 7. User Stories

- As a Processor, I want to see all incoming requests in one queue so I don't miss requests
  arriving via different channels.
- As a Processor, I want to save an incomplete request as a draft so I can finish it later.
- As a Processor, I want to convert a validated request into a task in one click so work starts
  without re-entering data.

---

# 8. Acceptance Criteria

Given a Processor with valid Customer, Request Type, Due Date, and Priority,
When they submit the request creation form,
Then the request appears in the queue with Intake Status "New" and is searchable/filterable.

Given a request with Intake Status "New" or "Triaged",
When a Processor clicks "Create Task",
Then a task is created with all request data copied over and the request is marked "Converted".

---

# 9. Business Process

```
Request arrives (email/phone) or is entered manually
   ↓
Processor creates/edits request in Intake Queue (or saves as draft)
   ↓
Processor validates and classifies (Request Type, Project Type, Priority, Estimator)
   ↓
Processor converts request to Task
   ↓
Request marked Converted; Task appears in Task Workbench
```

---

# 10. Module Navigation

See `docs/4-ui/1-navigation.md` — "Request Intake" top-level menu with Request Queue, Create
Request, and Drafts.

---

# 11. Dependencies

Modules: Task Workbench (receives converted requests), Settings & Administration (master data).

External systems: NetSuite (relevance flag/ID reference), OneDrive (folder link).

Shared services: Authentication/RBAC.

---

# 12. Events

Triggers: request created, request converted to task.

Notifications: assigned estimator notified on conversion (FR-INTAKE-004).

Background jobs: none in MVP (auto-save draft every 30s is a frontend timer, not a backend job).

---

# 13. Non-Functional Requirements

Performance: request list query ≤200ms (NFR-PERF-002).

Availability: standard platform SLA (NFR-AVAIL-001).

Security: Processor/Manager/Admin only (see `7-permissions.md`).

Accessibility: WCAG 2.1 Level A (NFR-USAB-002).

Localization: English-only (MVP).

---

# 14. Assumptions

- Legacy Lighting confirms the initial Request Type, Project Type, and Location lists in
  Milestone 1.

---

# 15. Constraints

- Manual classification only in MVP; no AI-driven email parsing.

---

# 16. Risks

- Historical/legacy label inconsistency could complicate initial Request Type mapping — see
  `1-project/2-requirements.md` Section 16.

---

# 17. Related Documents

- `4-schema.md`
- `8-api.md`
- `7-permissions.md`
- `6-validation.md`
- `3-business-rules.md`
- `9-ui.md`
- `11-testing.md`

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

Derive this module's content only from the approved `1-project/2-requirements.md` and
`1-project/3-feature-breakdown.md`; keep it business-focused and consistent with the BRD's
FR-INTAKE-* requirements.
