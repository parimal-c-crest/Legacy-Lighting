# API Specification

> **Purpose**
>
> REST API contract for the Task Workbench module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Task Workbench |
| Version | 1.0 |
| Status | Draft |
| API Version | v1 |
| Base Path | /api/v1 |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: expose read/update operations for tasks, plus focused actions (status, extend,
reassign, notes, awaiting-info).

Dependencies: projects, requests, users, statuses, priorities.

---

# 2. API Summary

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /tasks | List tasks (List/Board view), paginated/filtered |
| GET | /tasks/{id} | Get task detail |
| PATCH | /tasks/{id}/status | Update task status |
| POST | /tasks/{id}/extend | Extend due date with reason |
| PATCH | /tasks/{id}/reassign | Reassign estimator |
| PATCH | /tasks/{id}/awaiting-info | Set/clear Awaiting Information flag |
| POST | /tasks/{id}/notes | Add a note |
| GET | /tasks/{id}/activity | Get activity history |

---

# 3. Endpoints

## GET /tasks

Purpose: list tasks for the workbench.

Authorization: tasks.view (PERM-WORKBENCH-01)

Related Requirements: FR-WORKBENCH-001

Query Parameters: `page`, `page_size`, `status`, `assigned_estimator_id`, `sort` (default due_date asc)

Response: paginated task summaries

Errors: 401, 403

---

## PATCH /tasks/{id}/status

Purpose: change task status.

Authorization: tasks.update (PERM-WORKBENCH-02), ownership enforced for Estimator

Business Rule References: BR-WORKBENCH-001, BR-WORKBENCH-002, BR-WORKBENCH-003

Request Body: `{ status_id }`

Success Response: 200 OK, updated task

Errors: 409 (invalid transition), 401, 403

---

## POST /tasks/{id}/extend

Purpose: extend the due date.

Authorization: tasks.extend_due_date (PERM-WORKBENCH-03)

Validation References: VR-WORKBENCH-001, VR-WORKBENCH-002

Business Rule References: BR-WORKBENCH-004

Request Body: `{ extended_due_date, extension_reason }`

Success Response: 200 OK

Errors: 422, 401, 403

---

## PATCH /tasks/{id}/reassign

Purpose: change the assigned estimator.

Authorization: tasks.reassign (PERM-WORKBENCH-04)

Request Body: `{ assigned_estimator_id }`

Success Response: 200 OK

Errors: 401, 403, 404

---

## PATCH /tasks/{id}/awaiting-info

Purpose: set or clear the Awaiting Information flag.

Authorization: tasks.update (PERM-WORKBENCH-02)

Business Rule References: BR-WORKBENCH-005

Request Body: `{ awaiting_information, note }`

Success Response: 200 OK

Errors: 422 (missing note), 401, 403

---

## POST /tasks/{id}/notes

Purpose: add a note to the task.

Authorization: tasks.update (PERM-WORKBENCH-02)

Request Body: `{ note_type, body }`

Success Response: 201 Created

Errors: 422 (length), 401, 403

---

# 4. Request Models

Reference the `Task` and `Note` DTOs (see `5-data-dictionary.md`).

---

# 5. Response Models

Follow `docs/3-api/5-response-standards.md`.

---

# 6. Validation References

VR-WORKBENCH-001 Extended due date after original
VR-WORKBENCH-002 Extension reason ≥20 characters
VR-WORKBENCH-003 Note body ≤2000 characters
VR-WORKBENCH-004 Awaiting-info note required on toggle

---

# 7. Authorization References

PERM-WORKBENCH-01 tasks.view
PERM-WORKBENCH-02 tasks.update
PERM-WORKBENCH-03 tasks.extend_due_date
PERM-WORKBENCH-04 tasks.reassign

---

# 8. Business Rule References

BR-WORKBENCH-001 through BR-WORKBENCH-005 (see `3-business-rules.md`)

---

# 9. Events

Notifications: stakeholders notified when Awaiting Info is set; estimator notified on
reassignment.

---

# 10. Integrations

NetSuite/OneDrive: reference link retrieval only.

---

# 11. Performance

List response ≤200ms (NFR-PERF-002); optimistic UI updates on quick actions.

---

# 12. Related Documents

`1-module.md`, `2-functional-specification.md`, `6-validation.md`, `3-business-rules.md`,
`7-permissions.md`, `docs/3-api/1-api-design.md`

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

Reference global response/error formats from `docs/3-api/`, do not redefine here.
