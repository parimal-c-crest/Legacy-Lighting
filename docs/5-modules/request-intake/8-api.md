# API Specification

> **Purpose**
>
> REST API contract for the Request Intake module. Global behavior follows `docs/3-api/`.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Request Intake |
| Version | 1.0 |
| Status | Draft |
| API Version | v1 |
| Base Path | /api/v1 |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: expose CRUD and conversion operations for requests.

Scope: `/requests` resource.

Dependencies: customers, master data (request types/project types/locations/priorities), users.

Related project API documents: `docs/3-api/1-api-design.md`, `5-response-standards.md`.

---

# 2. API Summary

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /requests | List requests (queue), paginated/filtered |
| GET | /requests/{id} | Get a single request |
| POST | /requests | Create a request (or draft) |
| PUT | /requests/{id} | Update a request |
| DELETE | /requests/{id} | Soft-delete a request |
| POST | /requests/{id}/convert | Convert request to task |

---

# 3. Endpoints

## GET /requests

Purpose: list requests for the intake queue.

Authorization: requests.view (PERM-INTAKE-01)

Related Requirements: FR-INTAKE-001

Related Business Rules: —

Query Parameters: `page`, `page_size`, `status`, `source`, `search`, `sort`

Response: paginated array of request summaries (see `docs/3-api/5-response-standards.md`)

Errors: 401, 403

---

## POST /requests

Purpose: create a request or save a draft.

Authorization: requests.create (PERM-INTAKE-02)

Request Body: customer_id, request_type_id, project_type_id?, location_id?, priority_id,
due_date, project_id? / new_project_name? (mutually exclusive), assigned_processor_id?,
assigned_estimator_id?, sales_rep_name?, source, work indicator flags (counts_provided,
takeoff_required, layover, submittal, spec_package, ve_request), netsuite_relevant,
netsuite_id?, onedrive_folder_url?, is_draft (boolean)

Validation References: VR-INTAKE-001..006 (see `6-validation.md`)

Business Rule References: BR-INTAKE-001, BR-INTAKE-002, BR-INTAKE-003

Success Response: 201 Created, request object

Errors: 422 (validation), 401, 403

---

## PUT /requests/{id}

Purpose: update a request (blocked once Converted).

Authorization: requests.edit (PERM-INTAKE-03)

Request Body: same fields as POST, partial allowed

Validation References: VR-INTAKE-001..006

Business Rule References: BR-INTAKE-004 (blocks edit if Converted)

Success Response: 200 OK, updated request

Errors: 422, 401, 403, 409 (if Converted)

---

## DELETE /requests/{id}

Purpose: soft-delete a request.

Authorization: requests.delete (PERM-INTAKE-04)

Success Response: 204 No Content

Errors: 401, 403, 404

---

## POST /requests/{id}/convert

Purpose: convert a request into a task; creates the Project first if the request carries
`new_project_name` instead of an existing `project_id`.

Authorization: requests.convert (PERM-INTAKE-05)

Business Rule References: BR-INTAKE-004, BR-INTAKE-005

Success Response: 201 Created, task object (and project object if newly created); request
`intake_status` set to "Converted"

Errors: 409 (already converted), 422 (neither project_id nor new_project_name set), 401, 403, 404

---

# 4. Request Models

Reference the `Request` DTO (see `5-data-dictionary.md` field list). Avoid redefining shared
Customer/User summary objects — reference the project-level DTOs.

---

# 5. Response Models

Success/Pagination/Error responses follow `docs/3-api/5-response-standards.md`.

---

# 6. Validation References

VR-INTAKE-001 Required fields on submit
VR-INTAKE-002 Due date not in past
VR-INTAKE-003 NetSuite ID format/requiredness
VR-INTAKE-004 OneDrive URL domain
VR-INTAKE-005 Customer must be active
VR-INTAKE-006 Estimator assignment must reference an Estimator-role user
VR-INTAKE-007 project_id and new_project_name mutually exclusive

---

# 7. Authorization References

PERM-INTAKE-01 requests.view
PERM-INTAKE-02 requests.create
PERM-INTAKE-03 requests.edit
PERM-INTAKE-04 requests.delete
PERM-INTAKE-05 requests.convert

---

# 8. Business Rule References

BR-INTAKE-001, BR-INTAKE-002, BR-INTAKE-003, BR-INTAKE-004, BR-INTAKE-005 (see `3-business-rules.md`)

---

# 9. Events

Notifications: estimator notified on conversion.

Queues/Webhooks: none in MVP.

---

# 10. Integrations

NetSuite: format validation only (no live API call from this endpoint in MVP).
Microsoft Graph: URL validation only.

---

# 11. Performance

Pagination: default 20/page. Caching: none required at MVP scale. Timeouts: standard project
default. Rate limits: per project standards (`docs/3-api/1-api-design.md`).

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

Do not redefine global response/error formats here — reference `docs/3-api/`.
