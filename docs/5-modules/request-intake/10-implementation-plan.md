# Implementation Plan

> **Purpose**
>
> Executable development plan for the Request Intake module. Living document, updated as work progresses.

---

# Module

Request Intake

---

# Status

Planning

---

# Dependencies

Schema (`4-schema.md`), API (`8-api.md`), Permissions (`7-permissions.md`), Validation
(`6-validation.md`); depends on Settings & Administration master data and Users existing first.

---

# Task Breakdown

## Phase 1 — Database

- Create `requests` migration
- Create indexes (`intake_status`, `customer_id`, `due_date`)
- No seed data required (transactional table)

---

## Phase 2 — Backend

- Request model/entity
- RequestService (create, update, soft-delete, convert)
- RequestController (routes per `8-api.md`)
- Authorization policy per `7-permissions.md`
- Zod validation schemas per `6-validation.md`

---

## Phase 3 — Frontend

- Request Queue page
- Create/Edit Request form
- Drafts list
- Request Detail page with Convert action

---

## Phase 4 — Testing

- Unit tests: validation rules, conversion state machine
- Integration tests: full create → convert flow
- UI tests: form validation, convert confirmation

---

## Phase 5 — Documentation

- API reference update (OpenAPI)
- Release notes entry for Milestone 2

---

# Checklist

- [ ] Schema
- [ ] Validation
- [ ] API
- [ ] UI
- [ ] Tests

---

# Risks

Legacy label inconsistency delaying Request Type/Project Type seed data — mitigate by
confirming master data in Milestone 1 before this module's Phase 1 begins.

---

# AI Generation Notes

Align phases with Project Plan Milestone 2 (Platform Foundation & Request Intake, 70 hrs).
