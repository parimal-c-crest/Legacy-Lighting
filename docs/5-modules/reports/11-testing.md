# Module Testing

> **Purpose**
>
> Test specification for the Reports module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Reports |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: verify each report's accuracy, filter behavior, and export limits.

---

# 2. Test Scope

Included: all six reports, shared filters, single and Export All.

Excluded: chart rendering (not built).

---

# 3. Traceability Matrix

| Requirement | Business Rule | Validation | Permission | Test Case |
|-------------|---------------|------------|------------|-----------|
| FR-REPORTS-001 | BR-REPORTS-001 | — | PERM-REPORTS-01 | TC-REPORTS-001 |
| FR-REPORTS-002 | BR-REPORTS-002 | — | PERM-REPORTS-01 | TC-REPORTS-002 |
| FR-REPORTS-008 | BR-REPORTS-003 | VR-REPORTS-003 | PERM-REPORTS-03 | TC-REPORTS-003 |

---

# 4. Functional Tests

## TC-REPORTS-001

Title: Estimator Workload completion rate calculates correctly

Steps: seed an estimator with 8 completed and 2 open tasks; load report

Expected Result: completion rate = 0.8

Priority: High

---

## TC-REPORTS-002

Title: Overdue Aging buckets correctly

Steps: seed tasks overdue by 3, 10, 20, and 35 days; load report

Expected Result: each task appears in its correct bucket

Priority: High

---

## TC-REPORTS-003

Title: Export All blocked when over 50MB

Steps: seed a dataset producing a projected export >50MB; request Export All

Expected Result: 422 with guidance to narrow filters

Priority: Medium

---

# 5. Validation Tests

Invalid custom date range (start after end) rejected; unknown estimator/customer filter
rejected.

---

# 6. Permission Tests

Viewer: view and export, same as Manager. Processor/Estimator: no access (menu hidden, API 403
if called directly).

---

# 7. API Tests

All six GET report endpoints with varying filters; both export endpoints.

---

# 8. UI Tests

Tab switching preserves filter state per report; Reset Filters restores defaults; responsive
horizontal scroll on tables.

---

# 9. Business Rule Tests

One test per BR-REPORTS-001 through BR-REPORTS-003.

---

# 10. Edge Cases

Zero tasks/requests in range — completion rate shows "—" not a division error.

---

# 11. Performance Tests

Reports return within NFR-PERF-002 at target data volumes (NFR-SCALE-001).

---

# 12. Security Tests

Unauthenticated/unauthorized access — 401/403 on all endpoints.

---

# 13. Regression Checklist

Task/request changes elsewhere reflect correctly in the next report generation (no caching
staleness in MVP).

---

# 14. Test Data

Seed: tasks/requests spanning multiple estimators, customers, request types, and overdue ages.

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

Verify each calculation against seeded source data, not hardcoded report output.
