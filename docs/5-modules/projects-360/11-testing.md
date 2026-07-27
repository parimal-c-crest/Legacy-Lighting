# Module Testing

> **Purpose**
>
> Test specification for the Projects 360 module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Projects 360 |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: verify project list views, saved views, metrics, 360 detail aggregation, and export.

Scope: `projects` API/UI and its aggregation of tasks/requests/notes.

---

# 2. Test Scope

Included: list/filter/sort, saved views, metrics header, 360 detail, export, status override.

Excluded: task/request editing (tested in their own modules).

---

# 3. Traceability Matrix

| Requirement | Business Rule | Validation | Permission | Test Case |
|-------------|---------------|------------|------------|-----------|
| FR-PROJECTS-003 | BR-PROJECTS-001, BR-PROJECTS-002 | VR-PROJECTS-002 | PERM-PROJECTS-01 | TC-PROJECTS-001 |
| FR-PROJECTS-005 | — | — | PERM-PROJECTS-01 | TC-PROJECTS-002 |
| FR-PROJECTS-006 | BR-PROJECTS-003 | VR-PROJECTS-003 | PERM-PROJECTS-02 | TC-PROJECTS-003 |

---

# 4. Functional Tests

## TC-PROJECTS-001

Title: Overdue saved view shows only projects with an overdue task

Requirement: FR-PROJECTS-003

Steps: create a project with one overdue task and one with no overdue tasks; apply "Overdue"
saved view

Expected Result: only the first project is shown

Priority: High

---

## TC-PROJECTS-002

Title: Project 360 detail aggregates correctly

Requirement: FR-PROJECTS-005

Steps: open 360 detail for a project with 2 tasks, 1 request, 3 notes

Expected Result: all related items appear correctly; NetSuite/OneDrive sections show "Not
linked" if absent

Priority: High

---

## TC-PROJECTS-003

Title: Export respects the 1000-row cap

Requirement: FR-PROJECTS-006

Steps: seed 1500 matching projects, request export

Expected Result: export truncated to 1000 rows with a user-facing notice, per BR-PROJECTS-003

Priority: Medium

---

# 5. Validation Tests

Invalid `view` parameter rejected; pagination bounds enforced.

---

# 6. Permission Tests

Estimator/Viewer: view-only, no Export/status override controls. Manager/Admin: full access.

---

# 7. API Tests

GET /projects (all saved views), GET /projects/{id}, GET /projects/metrics, GET
/projects/export, PATCH /projects/{id}/status.

---

# 8. UI Tests

View mode toggle (List/Kanban/Update Call), metrics tile click-to-filter, responsive collapse.

---

# 9. Business Rule Tests

One test per BR-PROJECTS-001 through BR-PROJECTS-004.

---

# 10. Edge Cases

Project with zero tasks — Progress % shows "—" not 0%. Metrics threshold alert (>10 overdue)
displays correctly.

---

# 11. Performance Tests

360 detail aggregation ≤500ms with 5,000+ projects / 10,000+ tasks (NFR-SCALE-001 target scale).

---

# 12. Security Tests

Estimator attempting status override — 403.

---

# 13. Regression Checklist

Task status change in Task Workbench reflects immediately in Projects 360 derived fields.

---

# 14. Test Data

Seed: 10 projects across statuses, with varying task/request counts and overdue/awaiting-info
states.

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

Verify derived-field correctness against the source tasks/requests, not hardcoded expectations.
