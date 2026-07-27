# API Specification

> **Purpose**
>
> REST API contract for the Reports module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Reports |
| Version | 1.0 |
| Status | Draft |
| API Version | v1 |
| Base Path | /api/v1 |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: expose the six core reports plus common filtering and export. Dependencies: tasks,
requests, projects, customers, netsuite_references.

---

# 2. API Summary

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /reports/estimator-workload | FR-REPORTS-001 |
| GET | /reports/overdue-aging | FR-REPORTS-002 |
| GET | /reports/request-type-volume | FR-REPORTS-003 |
| GET | /reports/netsuite-coverage | FR-REPORTS-004 |
| GET | /reports/project-health | FR-REPORTS-005 |
| GET | /reports/customer-activity | FR-REPORTS-006 |
| GET | /reports/{report-name}/export | Export a single report (CSV/Excel) |
| GET | /reports/export-all | Export all reports as ZIP |

---

# 3. Endpoints

## GET /reports/estimator-workload

Purpose: workload per estimator.

Authorization: reports.view (PERM-REPORTS-01)

Query Parameters: `date_range`, `team`, `status`

Response: array of `{ estimator, open_tasks, overdue_tasks, completed_this_week, completion_rate }`

---

## GET /reports/overdue-aging

Purpose: overdue tasks by age bucket.

Authorization: reports.view (PERM-REPORTS-01)

Business Rule References: BR-REPORTS-002

Response: `{ buckets: [{ range, count, tasks[] }] }`

---

## GET /reports/request-type-volume

Purpose: request volume over time by type.

Authorization: reports.view (PERM-REPORTS-01)

Query Parameters: `granularity` (daily/weekly/monthly)

---

## GET /reports/netsuite-coverage

Purpose: NetSuite reference coverage.

Authorization: reports.view (PERM-REPORTS-01)

Query Parameters: `project_type`

Response: `{ with_reference, without_reference, missing_task_ids[] }`

---

## GET /reports/project-health

Purpose: portfolio status rollup.

Authorization: reports.view (PERM-REPORTS-01)

---

## GET /reports/customer-activity

Purpose: per-customer request/turnaround metrics.

Authorization: reports.view (PERM-REPORTS-01)

---

## GET /reports/{report-name}/export

Purpose: export a single report to CSV/Excel.

Authorization: reports.export (PERM-REPORTS-02)

Response: file download, `Content-Disposition: attachment`

---

## GET /reports/export-all

Purpose: export all six reports as a ZIP.

Authorization: reports.export_all (PERM-REPORTS-03)

Business Rule References: BR-REPORTS-003 (50MB cap)

Response: ZIP file, `reports_YYYY-MM-DD.zip`

Errors: 422 (over size cap)

---

# 4. Request Models

No request bodies (all GET). Filter params shared across endpoints per `2-functional-specification.md`
Section 3, FR-REPORTS-007.

---

# 5. Response Models

Follow `docs/3-api/5-response-standards.md`; file responses follow its "File Response
Standards" section.

---

# 6. Validation References

VR-REPORTS-001 Valid date range
VR-REPORTS-002 Valid filter references
VR-REPORTS-003 Export size cap

---

# 7. Authorization References

PERM-REPORTS-01 reports.view
PERM-REPORTS-02 reports.export
PERM-REPORTS-03 reports.export_all

---

# 8. Business Rule References

BR-REPORTS-001, BR-REPORTS-002, BR-REPORTS-003

---

# 9. Events

None (read-only, no notifications).

---

# 10. Integrations

NetSuite reference data (Coverage Report).

---

# 11. Performance

Reports per NFR-PERF-002; exports ≤5s for up to 1000 records; Export All capped 50MB.

---

# 12. Related Documents

`1-module.md`, `2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`

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

All endpoints read-only; reference global response/error formats, don't redefine them.
