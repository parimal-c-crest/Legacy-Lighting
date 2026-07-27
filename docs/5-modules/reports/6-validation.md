# Validation Rules

> **Purpose**
>
> Validation rules for the Reports module.

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

Read-only module; validation limited to filter parameters and export size.

---

# 2. Validation Categories

Format Validation (date range), Range Validation (custom date range bounds), Business
Validation (export size cap).

---

# 3. Field Validation

| Field | Rule | Error Message |
|--------|------|---------------|
| date_range | Valid preset or custom start/end (start ≤ end) | "Invalid date range." |
| estimator_id / customer_id filter | Must reference an existing record | "Unknown filter value." |
| export size | Projected ZIP ≤ 50MB | "Export too large — narrow your filters." |

---

# 4. Cross-Field Validation

Custom date range: start date must be before or equal to end date.

---

# 5. Business Validation

Filter values (estimator, customer, request type) must reference active/existing records.

---

# 6. File Validation

Not applicable (report exports are generated, not uploaded).

---

# 7. Import Validation

Not applicable.

---

# 8. API Validation

Standard Bearer token auth; query params per Section 3.

---

# 9. Validation Order

1. Auth
2. Filter format
3. Business validation (referenced record exists)
4. Export size check (on export only)

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

Keep validation focused on filters and export bounds.
