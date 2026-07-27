# API Specification

> **Purpose**
>
> REST API contract for the Executive Dashboard module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Executive Dashboard |
| Version | 1.0 |
| Status | Draft |
| API Version | v1 |
| Base Path | /api/v1 |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: expose read-only KPI/widget endpoints. Dependencies: projects, tasks, requests,
netsuite_references.

---

# 2. API Summary

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /dashboard/project-status | Project Status widget data |
| GET | /dashboard/sales-outlook | Sales Outlook widget data |
| GET | /dashboard/top-blockers | Top Blockers widget data |
| GET | /dashboard/monday-meeting | Monday Meeting View data |

---

# 3. Endpoints

## GET /dashboard/project-status

Purpose: On Track / Needing Attention / At Risk counts with trend.

Authorization: dashboard.view (PERM-DASHBOARD-01)

Related Requirements: FR-DASHBOARD-001

Response: `{ on_track, needing_attention, at_risk, trend }`

---

## GET /dashboard/sales-outlook

Purpose: Active Quote Value, Value At Risk, Ready for Review.

Authorization: dashboard.view (PERM-DASHBOARD-01)

Related Requirements: FR-DASHBOARD-002

Query Parameters: `period` (week/month/quarter)

Business Rule References: BR-DASHBOARD-003

---

## GET /dashboard/top-blockers

Purpose: top 5 blocker categories.

Authorization: dashboard.view (PERM-DASHBOARD-01)

Related Requirements: FR-DASHBOARD-003

Response: array of `{ category, count }`

---

## GET /dashboard/monday-meeting

Purpose: weekly review data.

Authorization: dashboard.monday_meeting.view (PERM-DASHBOARD-02)

Related Requirements: FR-DASHBOARD-004

Query Parameters: `estimator_id?`, `team?`

Business Rule References: BR-DASHBOARD-002

Response: `{ completed_last_week[], due_this_week[], overdue[], new_requests[] }`

---

# 4. Request Models

No request bodies (all GET endpoints).

---

# 5. Response Models

Follow `docs/3-api/5-response-standards.md`.

---

# 6. Validation References

VR-DASHBOARD-001 Valid `period` enum
VR-DASHBOARD-002 Valid `estimator_id` reference

---

# 7. Authorization References

PERM-DASHBOARD-01 dashboard.view
PERM-DASHBOARD-02 dashboard.monday_meeting.view

---

# 8. Business Rule References

BR-DASHBOARD-001, BR-DASHBOARD-002, BR-DASHBOARD-003

---

# 9. Events

None (read-only).

---

# 10. Integrations

NetSuite quote data for Sales Outlook.

---

# 11. Performance

All endpoints ≤500ms (NFR-PERF-002); client polls every 60s (FR-DASHBOARD-005).

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

All endpoints are read-only; do not add write operations here.
