# Validation Rules

> **Purpose**
>
> Validation rules for the Settings & Administration module.

---

# Document Information

| Field | Value |
|--------|-------|
| Module | Settings & Administration |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Last Updated | 2026-07-27 |

---

# 1. Overview

Purpose: ensure user and master-data records are valid and consistent.

Scope: user CRUD, five master-data CRUD screens, profile updates.

---

# 2. Validation Categories

Required Fields, Uniqueness, Format Validation (email, password, hex color), Business
Validation (in-use protection, priority floor).

---

# 3. Field Validation

| Field | Rule | Error Message |
|--------|------|---------------|
| users.email | Required, unique, valid email format | "A valid, unique email is required." |
| users.password | Min 8 chars, 1 uppercase, 1 number, 1 special char | "Password does not meet complexity requirements." |
| request_types.name / project_types.name | Required, unique | "Name is required and must be unique." |
| locations.state | Required | "State is required." |
| locations.code | Required, unique | "Location code is required and must be unique." |
| statuses.color / priorities.color | Valid hex code | "Color must be a valid hex code." |
| priorities.level | Required, unique integer | "Priority level must be unique." |

---

# 4. Cross-Field Validation

`statuses(entity_type, name)` combination must be unique (BR-SETTINGS-005).

---

# 5. Business Validation

- Master data referenced by an existing record cannot be deleted (BR-SETTINGS-002).
- Deactivating a priority is blocked if it would drop active count below 3 (BR-SETTINGS-003).
- User deactivation, not deletion, on "remove user" action (BR-SETTINGS-001).

---

# 6. File Validation

Not applicable (no file uploads; profile photo is future phase per BRD FR-SETTINGS-008).

---

# 7. Import Validation

Not applicable in MVP.

---

# 8. API Validation

Standard Bearer token auth; request bodies validated per Section 3.

---

# 9. Validation Order

1. Required fields
2. Format (email, password, hex color)
3. Uniqueness
4. Business validation (in-use protection, priority floor)

---

# 10. Error Messages

Per `docs/3-api/6-error-handling.md`.

---

# 11. Related Documents

`2-functional-specification.md`, `4-schema.md`, `3-business-rules.md`, `8-api.md`

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

Apply the same CRUD validation pattern consistently across all five master-data types.
