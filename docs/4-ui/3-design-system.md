# Design System

> **Purpose**
>
> This document defines the application's visual language, design principles, design tokens, reusable UI foundations, and consistency rules. It serves as the single source of truth for designers, developers, and AI assistants to create a unified user experience across the entire application.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Design Framework | Extends the existing Lovable-generated UI (`https://legacylighting.nuvistaai.app/`) |
| UI Framework | React + TypeScript |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

The MVP reuses and extends the existing Lovable-generated UI rather than starting a new visual
language. Design tokens (colors, typography, spacing) in Section 4 below should be extracted
from that prototype during Milestone 1 rather than invented, so the new Request Intake, Task
Workbench, Projects 360, Executive Dashboard, Reports, and Settings screens feel native to the
existing product. Accessibility target: WCAG 2.1 Level A minimum (NFR-USAB-002).

---

# 2. Objectives

The Design System aims to:

- Create a consistent user experience.
- Reduce UI inconsistencies.
- Improve development speed.
- Encourage component reuse.
- Simplify maintenance.
- Support accessibility standards.
- Enable AI-assisted UI generation.

---

# 3. Design Principles

Every interface should follow these principles.

- Consistency
- Simplicity
- Clarity
- Accessibility
- Efficiency
- Responsiveness
- Predictability
- Scalability

---

# 4. Design Tokens

All values below are to be extracted from the existing Lovable-generated UI during Milestone 1
(Discovery, Workflow & Technical Setup) and recorded here — not invented independently, to keep
new screens visually consistent with the existing prototype.

## Colors

| Token | Usage | Value |
|--------|-------|-------|
| Primary | Brand color | Extract from Lovable UI |
| Secondary | Secondary actions | Extract from Lovable UI |
| Success | Success messages / On Track status | Extract from Lovable UI |
| Warning | Warning messages / Needing Attention status | Extract from Lovable UI |
| Danger | Errors / At Risk / Overdue status | Extract from Lovable UI |
| Info | Information | Extract from Lovable UI |
| Background | Page background | Extract from Lovable UI |
| Surface | Cards & panels | Extract from Lovable UI |
| Border | Borders | Extract from Lovable UI |
| Text Primary | Main text | Extract from Lovable UI |
| Text Secondary | Secondary text | Extract from Lovable UI |

Status/priority colors are also user-configurable per FR-SETTINGS-005/006 (color picker), so the
tokens above are defaults, not hardcoded values.

---

## Typography

| Token | Usage | Size | Weight |
|--------|-------|------|--------|
| Heading 1 | | | |
| Heading 2 | | | |
| Heading 3 | | | |
| Body | | | |
| Caption | | | |
| Label | | | |
| Button | | | |

---

## Spacing Scale

| Token | Value |
|--------|------|
| XS | |
| SM | |
| MD | |
| LG | |
| XL | |
| XXL | |

---

## Border Radius

| Token | Value |
|--------|------|
| Small | |
| Medium | |
| Large | |
| Pill | |

---

## Shadows

| Token | Usage |
|--------|-------|
| Small | |
| Medium | |
| Large | |

---

## Z-Index Scale

| Layer | Value |
|--------|------|
| Dropdown | |
| Sticky Header | |
| Modal | |
| Toast | |
| Tooltip | |

---

# 5. Grid System

Define layout grid.

Examples

- 12-column desktop
- 8-column tablet
- 4-column mobile

Specify:

- Gutters
- Margins
- Breakpoints
- Maximum width

---

# 6. Layout Standards

Define common layout patterns.

Examples

- Dashboard
- List Page
- Detail Page
- Form Page
- Wizard
- Modal
- Settings Page

---

# 7. Iconography

Define icon standards.

Include

- Icon library
- Icon sizes
- Filled vs outlined
- Action icons
- Navigation icons
- Status icons

---

# 8. Illustration Standards

Specify usage for

- Empty states
- Error pages
- Onboarding
- Success screens
- Loading screens

---

# 9. Image Standards

Define

- Image formats
- Responsive images
- Aspect ratios
- Compression
- Lazy loading
- Placeholders

---

# 10. Motion & Animation

Define animation standards.

Examples

- Hover
- Focus
- Loading
- Modal
- Page transition
- Expand/Collapse
- Toast notification

Guidelines

- Keep animations subtle.
- Respect reduced-motion preferences.
- Maintain consistent durations.

---

# 11. State Standards

Every interactive component should support:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Success
- Selected

---

# 12. Responsive Design Tokens

Define responsive behavior.

Desktop

Tablet

Mobile

Include

- Font scaling
- Spacing adjustments
- Grid behavior
- Navigation changes

---

# 13. Accessibility Standards

Design must comply with:

- WCAG 2.2 AA (or project standard)
- Color contrast
- Focus visibility
- Keyboard navigation
- Screen reader compatibility
- Touch target sizing

---

# 14. Theme Support

Specify supported themes.

Examples

- Light
- Dark
- High Contrast

Include

- Theme switching
- Color token mapping
- Logo variations

---

# 15. Internationalization Considerations

Support

- RTL languages
- Long translations
- Variable text lengths
- Locale-specific typography
- Date & number formatting

---

# 16. Design Governance

Define ownership.

Include

- Component approval process
- Design review process
- Version management
- Contribution guidelines
- Deprecation policy

---

# 17. Best Practices

- Reuse existing patterns.
- Avoid custom styling without approval.
- Use design tokens instead of hard-coded values.
- Keep interfaces simple.
- Maintain visual hierarchy.
- Prioritize accessibility.
- Design for responsiveness first.
- Keep components consistent across modules.

---

# 18. Assumptions

-

-

-

---

# 19. Constraints

Examples

- All UI must use design tokens.
- Custom components require approval.
- Accessibility compliance is mandatory.
- Responsive layouts required.
- Theme support must be maintained.

---

# 20. Related Documents

- Navigation
- User Flows
- Layout Guidelines
- Component Library
- Form Standards
- Data Table Standards
- Responsive Design
- Accessibility
- UI Patterns
- Theme & Branding
- Frontend Coding Standards

---

# 21. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | | | Initial Draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| UI/UX Designer | | | |
| Design Lead | | | |
| Solution Architect | | | |

---

# AI Generation Notes

When generating this document, the AI should:

- Follow the approved UI/UX requirements and branding guidelines.
- Define reusable design tokens instead of hard-coded styles.
- Establish a scalable visual language for all modules.
- Ensure consistency across typography, colors, spacing, icons, and layouts.
- Design with accessibility, responsiveness, and maintainability as first-class requirements.
- Reuse existing patterns before introducing new ones.
- Keep this document framework-level only; component-specific behavior belongs in the Component Library, and page-specific layouts belong in Layout Guidelines.