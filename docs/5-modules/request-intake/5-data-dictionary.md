# Data Dictionary

> **Purpose**
>
> Business meaning and governance of the Request Intake module's data elements.

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

Business purpose: define what each request field means so Processors and downstream reports
interpret them consistently.

Scope: `requests` table fields.

Naming conventions: snake_case, matches `docs/2-database/4-database-standards.md`.

---

# 2. Entity Definitions

## Request

Description: an incoming/manual project request awaiting or after task conversion.

Business Purpose: the single point of standardized entry for new work.

Owner: Processor role (creation), Manager (oversight).

Lifecycle: Draft → New → Triaged → Converted (soft-deleted if abandoned).

---

# 3. Field Definitions

| Field | Description | Business Purpose | Example |
|--------|-------------|------------------|----------|
| customer_id | Linked customer | Ties request to a known account | Acme Multifamily LLC |
| new_project_name | Name for a not-yet-created project | Lets a request start a brand-new project on conversion, instead of requiring one to pre-exist | "Riverside Apartments – Phase 3" |
| request_type_id | New Quote / Revision / Takeoff / Submittal / Clarification | Drives downstream routing | "Revision" |
| due_date | Date the request needs to be actioned | SLA/turnaround tracking | 2026-08-05 |
| priority_id | Urgent / High / Medium / Low | Queue ordering | "High" |
| clarification_required | Flag for missing info from requester | Signals a blocker before conversion | true |
| sales_rep_name | Free-text name of the originating sales rep | Traceability to whoever brought the request in; not a platform user | "Trevor Nash" |
| source | Channel the request arrived through | Reporting on intake channel mix | "Outlook", "NetSuite", "Manual" |
| counts_provided / takeoff_required / layover / submittal / spec_package / ve_request | Work indicator flags (6 total) | Communicates deliverable scope | true/false |
| netsuite_relevant | Whether a NetSuite record applies | Gates NetSuite ID requirement | true |
| netsuite_id | NetSuite record reference | Links to ERP record | "SO-10234" |
| onedrive_folder_url | Linked OneDrive project folder | Document access | `https://...` |
| intake_status | Draft / New / Triaged / Converted | Lifecycle state | "New" |

---

# 4. Enumerations

- `intake_status`: Draft, New, Triaged, Converted
- Request Type (configurable, seeded): New Quote, Revision, Takeoff, Submittal, Clarification
- Project Type (configurable, seeded): Multifamily, Commercial, Retail, Hospitality
- Priority (configurable, seeded): Urgent, High, Medium, Low

---

# 5. Reference Data

Statuses, Priorities, Request Types, Project Types, Locations — all owned by Settings &
Administration (`docs/5-modules/settings-administration/`), referenced here by FK.

---

# 6. Default Values

`intake_status` defaults to "Draft"; all work-indicator flags default to `false`.

---

# 7. Data Ownership

Business Owner: Processor / Operations Manager.

System Owner: Request Intake module.

Source: manual entry (MVP); future phase may add email-based intake.

---

# 8. Data Classification

Internal (customer name, request details) — not Public, not Confidential/Restricted beyond
normal internal business data handling.

---

# 9. Data Lifecycle

Creation: Processor via intake form. Modification: while Draft/New/Triaged. Archival: soft
delete (`deleted_at`) if abandoned. Deletion: never physical. Retention: indefinite while
customer/project relationship active; audit trail retained 7 years (NFR-COMP-002).

---

# 10. Related Documents

`4-schema.md`, `6-validation.md`, `3-business-rules.md`, `8-api.md`, `9-ui.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | | Pending | |

# AI Generation Notes

Keep field definitions business-readable; do not restate column types (see `4-schema.md`).
