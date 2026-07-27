# Module Testing

> **Purpose**
>
> Test specification for the Settings & Administration module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: verify user management, master-data CRUD, connected-systems status, and profile
behavior.

---

# 2. Test Scope

Included: user CRUD/deactivation, five master-data CRUD screens, priority floor, connected
systems status/sync, profile updates, authentication.

---

# 3. Traceability Matrix

| Requirement | Business Rule | Validation | Permission | Test Case |
|-------------|---------------|------------|------------|-----------|
| FR-SETTINGS-001 | BR-SETTINGS-001 | VR-SETTINGS-001, VR-SETTINGS-002 | PERM-SETTINGS-01 | TC-SETTINGS-001 |
| FR-SETTINGS-002..006 | BR-SETTINGS-002 | VR-SETTINGS-003, VR-SETTINGS-004 | PERM-SETTINGS-02 | TC-SETTINGS-002 |
| FR-SETTINGS-006 | BR-SETTINGS-003 | — | PERM-SETTINGS-02 | TC-SETTINGS-003 |
| FR-SETTINGS-007 | — | — | PERM-SETTINGS-03/04 | TC-SETTINGS-004 |

---

# 4. Functional Tests

## TC-SETTINGS-001

Title: Deactivate a user preserves historical attribution

Steps: create a user, assign them a task, deactivate the user

Expected Result: user cannot log in; the task's `assigned_estimator_id` reference remains
intact

Priority: High

---

## TC-SETTINGS-002

Title: In-use master data cannot be deleted

Steps: create a Request Type, use it on a request, attempt to delete the Request Type

Expected Result: 409 Conflict; deactivation succeeds instead

Priority: High

---

## TC-SETTINGS-003

Title: Cannot deactivate a priority below the minimum-3 floor

Steps: seed exactly 3 active priorities, attempt to deactivate one

Expected Result: blocked with explanatory error

Priority: Medium

---

## TC-SETTINGS-004

Title: Manual NetSuite sync trigger

Steps: as Admin, click "Sync Now" on Connected Systems

Expected Result: 202 Accepted; last_sync_at timestamp updates

Priority: Medium

---

# 5. Validation Tests

Duplicate email on user creation rejected; weak password rejected; duplicate location code/
priority level rejected; duplicate status name within the same entity_type rejected.

---

# 6. Permission Tests

Non-Admin attempting user/master-data management — 403. Manager viewing Connected Systems — 200
but sync trigger — 403. All users can update own profile only.

---

# 7. API Tests

Full CRUD on /users and all five master-data resources; /connected-systems GET/sync; /profile
GET/PUT; /auth/login, /auth/refresh-token, /auth/forgot-password.

---

# 8. UI Tests

Master-data form validation, in-use deletion block messaging, priority-floor warning, profile
form save.

---

# 9. Business Rule Tests

One test per BR-SETTINGS-001 through BR-SETTINGS-005.

---

# 10. Edge Cases

Concurrent deactivation of two priorities simultaneously dropping below floor — server-side
check must catch this even under race conditions (last valid state wins, second request
rejected).

---

# 11. Performance Tests

Not a primary concern (small tables); standard NFR-PERF-002 targets apply.

---

# 12. Security Tests

Account lockout after 5 failed login attempts (NFR-SEC-001); password never returned in any API
response; JWT expiry enforced at 24 hours.

---

# 13. Regression Checklist

Deactivating a master-data value immediately removes it from dropdowns in Request Intake/Task
Workbench without breaking existing records (cross-module).

---

# 14. Test Data

Seed: 5 roles, 3+ users per role, minimal master data (3 request types, 3 project types, 2
locations, statuses per entity type, exactly 3 priorities for floor testing).

---

# 15. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`, `8-api.md`, `9-ui.md`

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

This module is foundational — test it thoroughly since every other module depends on its data.
