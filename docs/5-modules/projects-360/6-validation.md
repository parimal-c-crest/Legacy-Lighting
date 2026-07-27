# Validation Rules

> **Purpose**
>
> Validation rules for the Projects 360 module.

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

Purpose: validate list/filter/export requests; this module has minimal write validation since
it is primarily a read/aggregation layer.

Scope: query parameters, export request.

---

# 2. Validation Categories

Format Validation (query params), Range Validation (pagination), Business Validation (export
row cap).

---

# 3. Field Validation

| Field | Rule | Error Message |
|--------|------|---------------|
| page / page_size | Positive integers; page_size ≤ 100 | "Invalid pagination parameters." |
| view | Must be one of the predefined saved views | "Unknown view." |
| export row count | ≤ 1000 | "Export is limited to 1000 projects; narrow your filters." |

---

# 4. Cross-Field Validation

None beyond standard filter combinations.

---

# 5. Business Validation

Status override (Manager/Admin action from 360 detail) must reference a valid, active status
for the "Project" entity type.

---

# 6. File Validation

Not applicable.

---

# 7. Import Validation

Not applicable.

---

# 8. API Validation

Standard Bearer token auth; query params validated per Section 3.

---

# 9. Validation Order

1. Auth
2. Query parameter format
3. Business validation (export cap, valid status)

---

# 10. Error Messages

Per `docs/3-api/6-error-handling.md`.

---

# 11. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `8-api.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Technical Lead | | Pending | |

# AI Generation Notes

Keep this module's validation minimal, reflecting its read-heavy nature.
