# Module Testing

> **Purpose**
>
> Test specification for the Request Intake module, tracing requirements to test cases.

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

Purpose: verify request creation, validation, drafts, and conversion behave per spec.

Scope: `requests` API and UI.

References: `2-functional-specification.md`, `3-business-rules.md`, `6-validation.md`.

---

# 2. Test Scope

Included: create/edit/delete/convert requests, draft save, work indicators, NetSuite/OneDrive
linking.

Excluded: AI-based classification (not built in MVP).

Dependencies: Customers, Master Data, Users must exist as test fixtures.

---

# 3. Traceability Matrix

| Requirement | Business Rule | Validation | Permission | Test Case |
|-------------|---------------|------------|------------|-----------|
| FR-INTAKE-002 | BR-INTAKE-001, BR-INTAKE-002 | VR-INTAKE-001, VR-INTAKE-002 | PERM-INTAKE-02 | TC-INTAKE-001 |
| FR-INTAKE-006 | BR-INTAKE-003 | VR-INTAKE-003 | PERM-INTAKE-02 | TC-INTAKE-002 |
| FR-INTAKE-004 | BR-INTAKE-004 | — | PERM-INTAKE-05 | TC-INTAKE-003 |
| FR-INTAKE-005 | — | — | PERM-INTAKE-02 | TC-INTAKE-004 |
| FR-INTAKE-002 | BR-INTAKE-005 | VR-INTAKE-007 | PERM-INTAKE-02 | TC-INTAKE-005 |

---

# 4. Functional Tests

## TC-INTAKE-001

Title: Create request with all mandatory fields

Requirement: FR-INTAKE-002

Preconditions: logged in as Processor; a Customer exists

Steps: open Create Request, fill Customer/Request Type/Due Date/Priority, submit

Expected Result: request created with Intake Status "New"

Priority: High

---

## TC-INTAKE-002

Title: NetSuite ID required when NetSuite Relevant checked

Requirement: FR-INTAKE-006

Preconditions: Create Request form open

Steps: check NetSuite Relevant, leave NetSuite ID blank, submit

Expected Result: validation error on NetSuite ID field

Priority: Medium

---

## TC-INTAKE-003

Title: Convert request to task

Requirement: FR-INTAKE-004

Preconditions: request exists with Intake Status "New"

Steps: open Request Detail, click Convert to Task

Expected Result: task created with copied fields; request status becomes "Converted"; repeat
attempt returns 409

Priority: High

---

## TC-INTAKE-004

Title: Save and resume a draft

Requirement: FR-INTAKE-005

Preconditions: Create Request form open, mandatory fields left blank

Steps: click Save Draft, navigate away, reopen from Drafts list

Expected Result: draft preserved with entered fields

Priority: Medium

---

## TC-INTAKE-005

Title: Project field rejects both existing and new project set together

Requirement: FR-INTAKE-002

Preconditions: Create Request form open

Steps: select an existing project, then also type a new project name, submit

Expected Result: validation error; submission blocked until only one is set

Priority: Medium

---

# 5. Validation Tests

Required fields (Customer, Request Type, Due Date, Priority) — submit blocked if any missing.
Due date in the past — rejected. OneDrive URL with wrong domain — rejected.

---

# 6. Permission Tests

Processor: full create/edit/convert. Estimator: view own only, no create/edit. Viewer:
read-only. Unauthenticated: 401 on all endpoints.

---

# 7. API Tests

GET /requests (pagination/filtering), POST /requests (create/draft), PUT /requests/{id}
(edit, blocked if Converted), DELETE /requests/{id} (soft delete), POST /requests/{id}/convert
(success + 409 on repeat).

---

# 8. UI Tests

Queue filters and sorting; Create form validation messages; Convert confirmation dialog;
responsive layout at tablet/mobile widths; keyboard navigation of work-indicator chips.

---

# 9. Business Rule Tests

One test per BR-INTAKE-001 through BR-INTAKE-004 (see Section 4 above; BR-INTAKE-001/002
covered by TC-INTAKE-001 variants).

---

# 10. Edge Cases

Duplicate request for same customer — allowed. Concurrent edit by two Processors — last write
wins, verify no data corruption. Large queue (1000+ requests) — pagination performs within
NFR-PERF-002 targets.

---

# 11. Performance Tests

Queue list response time under load matching NFR-PERF-002 (≤200ms).

---

# 12. Security Tests

Unauthorized role attempting create/convert — 403. Estimator attempting to view another
estimator's assigned request — 403 (view own only).

---

# 13. Regression Checklist

Create → Convert → Task appears in Task Workbench (cross-module flow).

---

# 14. Test Data

Seed: 3 customers, 5 request types, 4 priorities, 2 processors, 3 estimators.

---

# 15. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `6-validation.md`, `7-permissions.md`,
`8-api.md`, `9-ui.md`, `docs/6-development/6-testing-strategy.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| QA Lead | | Pending | |

# AI Generation Notes

Ensure every BR-INTAKE-* rule has at least one corresponding test case.
