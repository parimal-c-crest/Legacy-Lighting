# Implementation Plan

> **Purpose**
>
> Executable development plan for the Settings & Administration module.

---

# Module

Settings & Administration

---

# Status

Planning

---

# Dependencies

None upstream — this module must be built first; every other module depends on its tables.

---

# Task Breakdown

## Phase 1 — Database

- Create `roles`, `users` migrations + seed 5 fixed roles
- Create `request_types`, `project_types`, `locations`, `statuses`, `priorities` migrations
- Seed initial master data (confirmed in Milestone 1) and default priorities (min 3 active)
- One-time CSV import script + templates for initial Customers/Users/representative active
  Projects load (BRD Section 7.2) — not a persistent Admin UI feature

---

## Phase 2 — Backend

- Auth service (login, JWT issuance, password reset) — see `docs/3-api/2-authentication.md`
- UserService, MasterDataService (shared CRUD pattern across 5 types)
- AuthorizationMiddleware (RBAC enforcement)
- ConnectedSystemsService (status, manual NetSuite sync trigger)

---

## Phase 3 — Frontend

- Login page
- Users management page
- Five master-data config pages
- Connected Systems page
- My Profile page

---

## Phase 4 — Testing

- Unit tests: priority-floor enforcement, in-use deletion blocking, password complexity
- Integration tests: full user lifecycle, master-data CRUD
- UI tests: form validation, in-use block messaging

---

## Phase 5 — Documentation

- API reference update
- Release notes for Milestone 2

---

# Checklist

- [ ] Schema
- [ ] Validation
- [ ] API
- [ ] UI
- [ ] Tests

---

# Risks

Master-data seed values not finalized before this module's Phase 1 begins — mitigate by
confirming request types/project types/locations in Milestone 1 discovery.

---

# AI Generation Notes

Align with Project Plan Milestone 2 (Platform Foundation & Request Intake, 70 hrs) — this
module IS the "Platform Foundation" portion of that milestone.
