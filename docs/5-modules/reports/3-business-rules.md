# Business Rules

> **Purpose**
>
> Business rules for the Reports module.

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

Purpose: govern aggregation logic and export limits across the six reports.

---

# 2. Rule Categories

Aggregation/calculation, Export limits.

---

# 3. Business Rules

## BR-REPORTS-001

Title: Completion Rate = Completed Tasks / (Completed + Open Tasks) within the filter period

Business Rationale: standard, comparable metric across estimators and customers.

Related Requirements: FR-REPORTS-001, FR-REPORTS-006.

---

## BR-REPORTS-002

Title: Overdue Aging bucket is based on days past `due_date` (or `extended_due_date` if set)

Business Rationale: uses the most current committed date, not the original if extended.

Related Requirements: FR-REPORTS-002.

---

## BR-REPORTS-003

Title: Export All is capped at 50MB total

Business Rationale: BRD FR-REPORTS-008 explicit limit.

Trigger: "Export All" requested.

Expected Outcome: if projected size exceeds 50MB, block with guidance to narrow filters.

Related Requirements: FR-REPORTS-008.

---

# 4. Decision Tables

| Days Overdue | Bucket |
|---|---|
| 1–7 | Bucket 1 |
| 8–14 | Bucket 2 |
| 15–30 | Bucket 3 |
| 30+ | Bucket 4 |

---

# 5. Calculations

Completion Rate (BR-REPORTS-001); Average Turnaround Time = mean(task completed_at − request
created_at) per customer (FR-REPORTS-006).

---

# 6. State Transition Rules

Not applicable (read-only reports).

---

# 7. Workflow Rules

Filter state persists per report type (FR-REPORTS-007); "Reset Filters" clears to report
defaults.

---

# 8. Exception Rules

Zero tasks/requests in range — report shows empty state, not a division-by-zero error for rate
calculations (display "—").

---

# 9. External Dependencies

NetSuite reference data (Coverage Report).

---

# 10. Assumptions

Default date range and filter presets confirmed in Milestone 1.

---

# 11. Constraints

50MB export cap.

---

# 12. Traceability

| Rule | Requirement | API | Test |
|------|-------------|-----|------|
| BR-REPORTS-001 | FR-REPORTS-001, FR-REPORTS-006 | GET /reports/estimator-workload | TC-REPORTS-001 |
| BR-REPORTS-002 | FR-REPORTS-002 | GET /reports/overdue-aging | TC-REPORTS-002 |
| BR-REPORTS-003 | FR-REPORTS-008 | GET /reports/export-all | TC-REPORTS-003 |

---

# 13. Related Documents

`1-module.md`, `2-functional-specification.md`, `8-api.md`, `11-testing.md`

---

# AI Generation Notes

Keep calculations consistent with fields defined in Task Workbench/Request Intake schemas.
