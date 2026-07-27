# API Specification

> **Purpose**
>
> REST API contract for the Projects 360 module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Projects 360 |
| Version | 1.0 |
| Status | Draft |
| API Version | v1 |
| Base Path | /api/v1 |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: expose read/aggregation endpoints for the project list and 360 detail, plus export and
status override.

Dependencies: tasks, requests, notes, activity_logs, netsuite_references, onedrive_links.

---

# 2. API Summary

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /projects | List projects (List/Kanban/Update Call), paginated/filtered |
| GET | /projects/{id} | Project 360 detail (aggregated) |
| GET | /projects/metrics | Metrics header data |
| GET | /projects/export | CSV export of filtered list |
| PATCH | /projects/{id}/status | Manager/Admin status override |

---

# 3. Endpoints

## GET /projects

Purpose: list projects for the selected view/saved filter.

Authorization: projects.view (PERM-PROJECTS-01)

Related Requirements: FR-PROJECTS-001, FR-PROJECTS-002, FR-PROJECTS-003

Query Parameters: `page`, `page_size`, `view` (all/due-this-week/overdue/awaiting-info/
by-estimator/by-customer), `sort`

Response: paginated project summaries with derived fields (is_overdue, is_awaiting_info,
progress_pct)

Errors: 401, 403

---

## GET /projects/{id}

Purpose: Project 360 detail aggregation.

Authorization: projects.view (PERM-PROJECTS-01)

Related Requirements: FR-PROJECTS-005

Response: project header + related tasks + related requests + activity timeline + document/
NetSuite references + blockers + next actions

Errors: 401, 403, 404

---

## GET /projects/metrics

Purpose: metrics header data.

Authorization: projects.view (PERM-PROJECTS-01)

Related Requirements: FR-PROJECTS-004

Response: `{ active_projects, open_tasks, due_this_week, overdue, needing_attention }`

---

## GET /projects/export

Purpose: CSV export respecting current filters.

Authorization: projects.export (PERM-PROJECTS-02)

Business Rule References: BR-PROJECTS-003 (1000-row cap)

Response: CSV file, `Content-Disposition: attachment; filename="projects_YYYY-MM-DD_HHMMSS.csv"`

Errors: 401, 403, 422 (over row cap, if not silently truncated)

---

## PATCH /projects/{id}/status

Purpose: manual status override.

Authorization: projects.status_override (PERM-PROJECTS-03)

Request Body: `{ status_id }`

Success Response: 200 OK

Errors: 401, 403, 404, 422

---

# 4. Request Models

Reference the `Project` DTO (see `5-data-dictionary.md`); 360 detail composes Task, Request,
Note, and reference DTOs from their owning modules.

---

# 5. Response Models

Follow `docs/3-api/5-response-standards.md`.

---

# 6. Validation References

VR-PROJECTS-001 Pagination bounds
VR-PROJECTS-002 Valid `view` parameter
VR-PROJECTS-003 Export row cap

---

# 7. Authorization References

PERM-PROJECTS-01 projects.view
PERM-PROJECTS-02 projects.export
PERM-PROJECTS-03 projects.status_override

---

# 8. Business Rule References

BR-PROJECTS-001 through BR-PROJECTS-004 (see `3-business-rules.md`)

---

# 9. Events

None module-specific (status override logged to activity_logs).

---

# 10. Integrations

NetSuite/OneDrive: reference display via already-synced tables.

---

# 11. Performance

List ≤200ms; 360 detail ≤500ms (NFR-PERF-002); export ≤5s for up to 1000 rows.

---

# 12. Related Documents

`1-module.md`, `2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`,
`docs/3-api/1-api-design.md`

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

Reference global response/error formats from `docs/3-api/`.
