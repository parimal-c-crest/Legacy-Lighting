# UI Specification

> **Purpose**
>
> UI for the Settings & Administration module.

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

Purpose: define Users, five master-data config screens, Connected Systems, and My Profile.

Target users: Admin (primary), Manager (Connected Systems view), all users (My Profile).

---

# 2. Screen Inventory

| Screen | Purpose |
|----------|---------|
| Users | User list, create/edit/deactivate |
| Request Types / Project Types / Locations / Statuses / Priorities | Master-data CRUD (same pattern) |
| Connected Systems | Integration status and manual sync |
| My Profile | Personal settings |

---

# 3. Navigation

Entry point: "Settings" sidebar item. Sub-navigation to each config screen.

---

# 4. Screen Specifications

## Users

Layout: table (Name, Email, Role, Active). Actions: Create, Edit, Deactivate, Reset Password.
Permissions: Admin only.

---

## Master Data (Request Types / Project Types / Locations / Statuses / Priorities)

Layout: table (Name, [type-specific field], Active, Sort Order). Actions: Create, Edit,
Deactivate/Delete (delete blocked if in use, per BR-SETTINGS-002).

Statuses screen additionally groups by entity_type tab (Task/Project/Request).

Priorities screen shows a warning if attempting to deactivate below the 3-active floor.

---

## Connected Systems

Layout: card per system (NetSuite, OneDrive, Outlook, Planner) showing status badge, last sync
timestamp. Actions: manual sync trigger (NetSuite, Admin only).

Permissions: Manager sees read-only; Admin sees sync trigger.

---

## My Profile

Layout: form — display name, read-only email, password change, notification preferences,
time zone.

Permissions: all authenticated users, own profile only.

---

# 5. Forms

Reference `docs/4-ui/5-form-standards.md`. Master-data forms share a consistent field layout
(Name, type-specific field, Active toggle, Sort Order) across all five types.

---

# 6. UI Components

Status badge (Connected/Available/Not Configured/Error), color picker (Statuses/Priorities),
deactivate confirmation dialog with "in use" explanation.

---

# 7. User Interactions

Search/filter (Users, master-data lists), Sort (by sort_order or name), Deactivate
confirmation, manual sync trigger.

---

# 8. Responsive Behavior

Standard table-to-card collapse on tablet/mobile per `docs/4-ui/6-responsive-design.md`.

---

# 9. Accessibility

Color picker must have a text/hex input alternative to pure color-swatch selection.

---

# 10. UI States

Loading, Empty, No Permission (hide Admin-only screens for other roles), Validation Errors,
In-Use block (explains why delete is disabled).

---

# 11. Notifications

Success: "User created." / "Priority updated." Error: "Cannot delete — still in use." Warning:
"This would drop active priorities below the required minimum of 3."

---

# 12. Related Documents

`2-functional-specification.md`, `3-business-rules.md`, `7-permissions.md`, `8-api.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| UI/UX Designer | | Pending | |

# AI Generation Notes

Keep all five master-data screens visually and behaviorally identical except for their
type-specific field.
