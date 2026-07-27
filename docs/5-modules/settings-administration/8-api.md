# API Specification

> **Purpose**
>
> REST API contract for the Settings & Administration module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |
| API Version | v1 |
| Base Path | /api/v1 |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: expose user management, five master-data CRUD resources, connected-systems status, and
profile endpoints. Also owns `/auth/*` endpoints (see `docs/3-api/2-authentication.md`).

---

# 2. API Summary

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET/POST | /users | List/create users |
| PUT/PATCH | /users/{id} | Update / deactivate user |
| GET/POST/PUT/DELETE | /request-types | Request Types CRUD |
| GET/POST/PUT/DELETE | /project-types | Project Types CRUD |
| GET/POST/PUT/DELETE | /locations | Locations CRUD |
| GET/POST/PUT/DELETE | /statuses | Statuses CRUD (scoped by entity_type) |
| GET/POST/PUT/DELETE | /priorities | Priorities CRUD |
| GET | /connected-systems | Connected systems status |
| POST | /connected-systems/netsuite/sync | Manual NetSuite sync trigger |
| GET/PUT | /profile | Own profile view/update |

---

# 3. Endpoints

## POST /users

Purpose: create a user.

Authorization: users.manage (PERM-SETTINGS-01)

Validation References: VR-SETTINGS-001 (email), VR-SETTINGS-002 (password)

Request Body: `{ email, display_name, role_id, password }`

Success Response: 201 Created

Errors: 422 (validation, duplicate email)

---

## PATCH /users/{id}/deactivate

Purpose: deactivate a user.

Authorization: users.manage (PERM-SETTINGS-01)

Business Rule References: BR-SETTINGS-001

Success Response: 200 OK

---

## DELETE /request-types/{id} (representative of all 5 master-data DELETE endpoints)

Purpose: attempt deletion; blocked if in use.

Authorization: master_data.manage (PERM-SETTINGS-02)

Business Rule References: BR-SETTINGS-002

Success Response: 204 No Content (if not in use)

Errors: 409 Conflict (in use)

---

## PATCH /priorities/{id}

Purpose: update a priority, including active flag.

Authorization: master_data.manage (PERM-SETTINGS-02)

Business Rule References: BR-SETTINGS-003, BR-SETTINGS-004

Errors: 409 (would breach minimum-3-active floor), 422 (duplicate level)

---

## GET /connected-systems

Purpose: status for NetSuite, OneDrive, Outlook, Planner.

Authorization: connected_systems.view (PERM-SETTINGS-03)

Response: array of `{ system, status, last_sync_at }`

---

## POST /connected-systems/netsuite/sync

Purpose: trigger manual NetSuite sync.

Authorization: connected_systems.sync_trigger (PERM-SETTINGS-04)

Success Response: 202 Accepted

---

## GET/PUT /profile

Purpose: view/update own profile.

Authorization: profile.manage_own (PERM-SETTINGS-05)

Request Body (PUT): `{ display_name, time_zone, notification_preferences, password? }`

---

# 4. Request Models

Reference `User` and each master-data DTO (see `5-data-dictionary.md`).

---

# 5. Response Models

Follow `docs/3-api/5-response-standards.md`; `password_hash` never included in any response.

---

# 6. Validation References

VR-SETTINGS-001 Email format/uniqueness
VR-SETTINGS-002 Password complexity
VR-SETTINGS-003 Master-data name/code/level uniqueness
VR-SETTINGS-004 Status entity_type+name uniqueness
VR-SETTINGS-005 Hex color format

---

# 7. Authorization References

PERM-SETTINGS-01 users.manage
PERM-SETTINGS-02 master_data.manage
PERM-SETTINGS-03 connected_systems.view
PERM-SETTINGS-04 connected_systems.sync_trigger
PERM-SETTINGS-05 profile.manage_own

---

# 8. Business Rule References

BR-SETTINGS-001 through BR-SETTINGS-005

---

# 9. Events

Notifications: password reset email; user deactivation notice (internal, optional).

---

# 10. Integrations

NetSuite (manual sync), Microsoft Graph (status display).

---

# 11. Performance

Master-data lists are small; standard NFR-PERF-002 targets apply.

---

# 12. Related Documents

`1-module.md`, `2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`,
`docs/3-api/2-authentication.md`, `docs/3-api/3-authorization.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| API Lead | | Pending | |

# AI Generation Notes

Keep the 5 master-data resources' endpoint shapes identical to each other for consistency.
