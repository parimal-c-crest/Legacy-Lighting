# Project Overview

> **Purpose**
>
> This document provides a high-level overview of the project. It defines the business context, objectives, stakeholders, scope, and success criteria. It serves as the primary reference for understanding the project before reviewing detailed documentation.

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
| Approved By | Legacy Lighting Executive Sponsor |

---

# 1. Executive Summary

## Purpose

Build a centralized web platform (Project 360 Visibility Platform) so Legacy Lighting can manage
incoming project requests, task execution, project status, estimator workload, and management
reporting from one system instead of email, OneDrive, NetSuite, and a project board/planner.

## Background

Legacy Lighting currently spreads project-related information across Outlook email, an existing
project board/planner, OneDrive, NetSuite, and manual reporting. Staff must check multiple systems
to understand incoming requests, task ownership, deadlines, estimator workload, blockers,
documents, and NetSuite activity, causing delayed responses, unbalanced estimator workloads,
missed deadlines, and executive reporting built by hand.

## Expected Outcome

A production-ready MVP delivering standardized request intake, a Task Management Workbench,
Project 360 visibility, an Executive Dashboard with a Monday Meeting View, core operational
reports with CSV/Excel export, and lightweight read-only visibility into NetSuite and OneDrive —
validating the platform concept and user adoption before Phase 2 AI and automation investment.

---

# 2. Business Objectives

- Centralize request intake so all incoming work enters through one standardized process
- Optimize estimator workload distribution and due-date visibility
- Increase real-time project visibility for managers and executives
- Enable data-driven decisions via executive KPIs and dashboards
- Reduce manual status-update and reporting effort
- Improve customer response time by tracking turnaround and SLA-relevant dates

---

# 3. Project Objectives

- Deliver a structured Request Intake workspace replacing ad hoc email/manual triage
- Deliver a dedicated Task Management Workbench (list + board views) with structured fields
  replacing overloaded labels
- Deliver a Project 360 workspace showing tasks, requests, deadlines, blockers, and activity
  per project
- Deliver an Executive Dashboard and Monday Meeting View with core KPIs and reports
- Provide lightweight, read-only NetSuite and OneDrive visibility (no write-back in MVP)
- Provide role-based access control, user management, and master-data administration
- Ship within 5 weeks / 400 hours using 2 full-time full-stack developers

---

# 4. Business Problem

## Existing process

Requests arrive via email or phone, are triaged manually, assigned by email, tracked individually
per estimator, checked on via manual status checks, and reported on ad hoc.

## Pain points

- Fragmented systems: Outlook, NetSuite, OneDrive, Planner, with no unified view
- No centralized intake queue for incoming requests
- Limited real-time visibility into workload or project status for managers
- Estimators spend time manually updating multiple systems
- No systematic task prioritization
- Executive reports require manual data compilation

## Limitations

- Existing project board/planner uses overloaded labels rather than structured fields
- No single place to see a project's tasks, requests, blockers, and related documents together

## Risks (of not solving)

- Continued missed deadlines and SLA violations
- Unbalanced estimator workloads persist
- Executives lack timely pipeline/workload visibility

---

# 5. Proposed Solution

## Overall approach

Deliver a practical MVP using structured workflows, manual user controls, and lightweight
(read-only, mostly manual-sync) integrations. Defer AI-driven classification, complex workflow
automation, deep document intelligence, and NetSuite write-back to Phase 2, after the platform
concept and operational workflows are validated with real users.

## Main capabilities

- Request Intake & Processing
- Task Management Workbench
- Project 360 Visibility
- Executive Dashboard & Core Reporting
- Lightweight NetSuite & OneDrive Visibility (read-only)
- Platform Administration (auth, RBAC, master data, audit log)

## Technology direction (high level only)

Cloud-hosted web application: React + TypeScript frontend (building on the existing
Lovable-generated UI), Node.js + TypeScript backend APIs, PostgreSQL database. See
`4-tech-stack.md` for full detail.

---

# 6. Target Users

| User Type | Description |
|-----------|-------------|
| Administrator | Full system access; manages users, roles, and master/config data |
| Manager | Views all projects/tasks/requests; reassigns work; accesses dashboards and all reports |
| Processor | Manages request intake; converts requests to tasks; assigns estimators |
| Estimator | Executes assigned tasks; updates status/notes; requests due-date extensions |
| Viewer | Read-only access to projects, dashboards, and reports |

---

# 7. Stakeholders

| Stakeholder | Role | Responsibility |
|-------------|------|----------------|
| Executive Leadership (Legacy Lighting) | Decision makers | KPI visibility, pipeline health, resource utilization, sign-off |
| Operations Managers | Workflow oversight | Project status review, blocker resolution, team performance |
| Sales Estimators | Task execution | Work assigned tasks, keep status/notes current |
| Project Processors | Request intake | Triage and convert incoming requests to tasks |
| Sales Representatives | Request originators | Submit requests, track turnaround |
| IT/Support (Legacy Lighting) | System maintenance | Provide NetSuite/OneDrive access, support integration setup |
| NuVista AI | Delivery partner | Design, build, test, and deploy the MVP (2 full-stack developers) |

---

# 8. Project Scope

## In Scope

- Request Intake & Processing (manual creation, classification, request-to-task conversion)
- Task Management Workbench (list/board views, assignment, due dates, extensions, flags, notes)
- Project 360 Visibility (status, related tasks/requests, blockers, activity, document/NetSuite refs)
- Executive Dashboard & Core Reporting (KPIs, Monday Meeting View, core reports, CSV/Excel export)
- Lightweight NetSuite read-only visibility for confirmed objects (customer, project/job, quote)
- OneDrive folder/document visibility via manual project-to-folder association
- Platform Administration: authentication, RBAC, user management, master data configuration,
  basic activity history and audit logging

## Out of Scope (Phase 1 / MVP)

- AI-driven email extraction and request classification
- Complex workflow automation
- Deep document intelligence
- NetSuite write-back (read-only only in MVP)
- Automated OneDrive folder matching (manual association only)
- Native mobile application
- Offline support
- Multi-language support (English-only)
- Historical data migration beyond confirmed active records

---

# 9. High-Level Features

| Feature | Description |
|---------|-------------|
| Request Intake & Processing | Structured intake queue, manual request creation, request-to-task conversion |
| Task Management Workbench | List/board task views, assignment, due dates/extensions, statuses, flags, notes |
| Project 360 Visibility | Single-page project view: tasks, requests, blockers, activity, document/NetSuite refs |
| Executive Dashboard & Core Reporting | KPIs, Monday Meeting View, core reports, CSV/Excel export |
| Lightweight NetSuite & OneDrive Visibility | Read-only NetSuite references; manual OneDrive folder links |
| Platform Administration | Auth, RBAC, user management, master data config, audit logging |

---

# 10. Assumptions

- Stakeholders are available for weekly reviews and UAT throughout the 5-week schedule
- Legacy Lighting provides NetSuite sandbox/API credentials and sample records
- Legacy Lighting provides Microsoft 365/OneDrive access and sample folder structures
- Users, roles, and executive KPI/Monday Meeting reporting requirements are confirmed early
- Representative active project/task data is available for initial load
- Users have modern browsers and stable internet access (no offline mode required)
- Existing Lovable UI prototypes are treated as approved starting-point designs

---

# 11. Constraints

- Timeline: 5-week delivery (400 total estimated hours)
- Team: 2 full-time full-stack developers, no dedicated QA/DevOps in MVP
- Technology: React + TypeScript frontend, Node.js + TypeScript backend, PostgreSQL database
- Budget: no external service costs planned in MVP beyond hosting
- Real NetSuite/OneDrive integrations are lightweight and read-only in MVP; deeper integration
  and write-back deferred to Phase 2

---

# 12. Dependencies

| Dependency | Description |
|------------|-------------|
| NetSuite API access | Sandbox credentials and confirmed object list needed by Week 1 |
| Microsoft Graph / OneDrive access | Tenant/admin access for folder visibility |
| PostgreSQL infrastructure | Managed database instance available early in delivery |
| Lovable UI prototypes | Assumed final/approved as the frontend design starting point |
| User & role list | Provided by Legacy Lighting before launch |
| Customer/project/task sample data | Provided for initial data load and workflow validation |

---

# 13. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| NetSuite API access & data availability | Integration delays affect connected-system visibility | Validate credentials/records in Week 1; fall back to NetSuite deep links/manual reference mapping |
| OneDrive folder inconsistency | Automatic folder association unreliable | Use manual folder association for MVP; automate later |
| Scope expansion | Additional reports/workflows/integrations threaten the 5-week schedule | Lock MVP backlog after Week 1; move extras to Phase 2 |
| Historical data quality | Overloaded labels/naming create inconsistent project/task data | Start with confirmed active data and structured fields; handle broader migration separately |
| Compressed timeline | Late decisions/feedback delay production readiness | Weekly reviews; require timely stakeholder feedback |
| User adoption | Users continue using existing tools | Focus MVP on existing operational workflows; pilot validation with actual users |

---

# 14. Success Criteria

- 100% of new requests flow through the intake system
- 95% task assignment accuracy
- Executive dashboard loads within 2 seconds
- 30% reduction in overdue tasks within 3 months of launch
- 90% user adoption within first month
- Zero data loss or security incidents
- Production-ready MVP delivered within the 5-week / 400-hour schedule

---

# 15. Project Deliverables

- Production-ready MVP web application
- Request Intake Workspace
- Task Management Workbench
- Project 360 Workspace
- Executive Dashboard and Monday Meeting View
- Core operational reports with CSV/Excel export
- Lightweight NetSuite read-only visibility
- OneDrive folder/document visibility
- User and role management, master data configuration
- Basic activity history and audit logging
- CSV import templates and one-time initial data load (Customers, Users, active Projects)
- Production deployment, user/admin documentation
- Known Limitations Register and Phase 2 AI & Automation Roadmap

---

# 16. References

- `Project Req Doc/LL – Project Management & Project 360 Visibility Platform (MVP) Project Plan 2 (1).pdf`
- `Project Req Doc/Business Requirements Document (BRD).docx`
- `docs/1-project/2-requirements.md`
- `docs/1-project/3-feature-breakdown.md`
- `docs/1-project/4-tech-stack.md`

---

# 17. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft, generated from Project Plan PDF and BRD |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Business Owner | Legacy Lighting Executive Sponsor | Pending | |
| Project Manager | | Pending | |
| Technical Lead | | Pending | |

---

# AI Generation Notes

When generating this document, the AI should:

- Focus on business objectives rather than implementation details.
- Keep descriptions concise and non-technical.
- Do not define database schemas, APIs, or UI details.
- Avoid repeating information that belongs in other project documents.
- Ensure consistency with all related project documentation.
