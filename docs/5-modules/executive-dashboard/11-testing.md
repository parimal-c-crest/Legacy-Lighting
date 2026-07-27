# Module Testing

> **Purpose**
>
> Test specification for the Executive Dashboard module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Executive Dashboard |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: verify widget accuracy, refresh behavior, and Monday Meeting View correctness.

---

# 2. Test Scope

Included: all four widgets/endpoints, auto/manual refresh.

Excluded: chart rendering (not built in MVP).

---

# 3. Traceability Matrix

| Requirement | Business Rule | Validation | Permission | Test Case |
|-------------|---------------|------------|------------|-----------|
| FR-DASHBOARD-001 | BR-DASHBOARD-001 | — | PERM-DASHBOARD-01 | TC-DASHBOARD-001 |
| FR-DASHBOARD-004 | BR-DASHBOARD-002 | VR-DASHBOARD-002 | PERM-DASHBOARD-02 | TC-DASHBOARD-002 |
| FR-DASHBOARD-005 | — | — | PERM-DASHBOARD-01 | TC-DASHBOARD-003 |

---

# 4. Functional Tests

## TC-DASHBOARD-001

Title: Project Status widget classifies correctly

Steps: seed one On Track, one Needing Attention, one At Risk project; load widget

Expected Result: counts match seeded data

Priority: High

---

## TC-DASHBOARD-002

Title: Monday Meeting View respects week boundary

Steps: seed tasks completed before/after last Monday; load view

Expected Result: only tasks completed within the current Mon–Sun week appear in "Completed
Last Week"

Priority: Medium

---

## TC-DASHBOARD-003

Title: Dashboard auto-refreshes every 60 seconds

Steps: load dashboard, wait 60s, observe network calls

Expected Result: widgets re-fetch and "last updated" timestamp changes

Priority: Low

---

# 5. Validation Tests

Invalid `period` value rejected on Sales Outlook endpoint.

---

# 6. Permission Tests

Viewer: dashboard.view only, no Monday Meeting access. Processor/Estimator: menu hidden AND
direct API call to any /dashboard/* endpoint returns 403.

---

# 7. API Tests

GET /dashboard/project-status, /sales-outlook, /top-blockers, /monday-meeting.

---

# 8. UI Tests

Widget drill-down navigation, print layout rendering, responsive stacking.

---

# 9. Business Rule Tests

One test per BR-DASHBOARD-001 through BR-DASHBOARD-003.

---

# 10. Edge Cases

No data yet — zero-state widgets, not errors.

---

# 11. Performance Tests

All widget endpoints ≤500ms with target data volumes (NFR-SCALE-001).

---

# 12. Security Tests

Unauthenticated request — 401 on all endpoints. Processor/Estimator calling any /dashboard/*
endpoint directly (bypassing the hidden menu) — 403.

---

# 13. Regression Checklist

Task/project status changes elsewhere reflect in dashboard counts on next refresh.

---

# 14. Test Data

Seed: projects/tasks across all classification states, a mix of NetSuite-linked and unlinked
projects.

---

# 15. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`, `8-api.md`

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

Verify classification against seeded source data, not hardcoded expected widget values.
