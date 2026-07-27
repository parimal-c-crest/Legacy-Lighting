# Validation Rules

> **Purpose**
>
> Validation rules for the Executive Dashboard module.

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

This is a read-only module; validation is limited to query parameters.

---

# 2. Validation Categories

Format Validation (period selector), Range Validation (n/a beyond enum).

---

# 3. Field Validation

| Field | Rule | Error Message |
|--------|------|---------------|
| period | Must be one of Week/Month/Quarter | "Invalid period." |
| estimator_filter (Monday Meeting) | Must reference an existing user | "Unknown estimator." |

---

# 4. Cross-Field Validation

None.

---

# 5. Business Validation

None beyond parameter existence checks.

---

# 6. File Validation

Not applicable.

---

# 7. Import Validation

Not applicable.

---

# 8. API Validation

Standard Bearer token auth; query params per Section 3.

---

# 9. Validation Order

1. Auth
2. Query parameter format

---

# 10. Error Messages

Per `docs/3-api/6-error-handling.md`.

---

# 11. Related Documents

`2-functional-specification.md`, `8-api.md`

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

Keep minimal — this module has no write operations.
