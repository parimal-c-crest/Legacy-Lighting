# Documentation — Legacy Lighting Project 360 Visibility Platform (MVP)

Source of truth for scope, data model, API, UI, module specs, and dev workflow.
Built from `Project Req Doc/` (Project Plan PDF + BRD) and cross-checked against
`lovable-screen/` (six screenshots of the live Lovable UI prototype — Executive Dashboard,
Project Intake, All Projects, Reports, Settings, Estimator Workbench), which surfaced real
fields/values not present in the text documents (see `1-project/2-requirements.md`, Source
Document Reconciliation section). See `APPLICABILITY.md` for the per-folder applicability
decision.

## Structure

- `1-project/` — overview, requirements, feature breakdown, tech stack
- `2-database/` — schema design, ERD, migration strategy, standards
- `3-api/` — API design, auth, standards, OpenAPI/Postman
- `4-ui/` — navigation, user flows, design system, component/form/accessibility standards
- `5-modules/` — per-feature specs (Request Intake, Task Workbench, Projects 360, Executive Dashboard, Reports, Settings & Administration)
- `6-development/` — dev environment, git workflow, testing, deployment, CI/CD

## Status

Phase A (scaffold) complete. Phase B (fill) in progress — see each folder's files.
No code implementation until Phase B is reviewed and approved (Checkpoint B).
