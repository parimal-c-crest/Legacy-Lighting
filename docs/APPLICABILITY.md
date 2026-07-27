# Documentation applicability

Project: Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP)

| Folder | Status | Reason |
|---|---|---|
| 1-project | applicable | Core project scope, requirements, features, tech stack — always required |
| 2-database | applicable | PostgreSQL persistent store; structured entities (requests, tasks, projects, users, master data) |
| 3-api | applicable | Node.js + TypeScript REST APIs; NetSuite REST/SuiteTalk and Microsoft Graph integration endpoints |
| 4-ui | applicable | React + TypeScript web app (existing Lovable-generated UI) with multiple screens: Intake, Task Workbench, Project 360, Executive Dashboard, Reports, Settings |
| 5-modules | applicable | 6 distinct business feature modules per BRD Section 4 (Request Intake, Task Workbench, Projects 360, Executive Dashboard, Reports, Settings & Administration) |
| 6-development | applicable | 2-developer team, 5-week/400-hour delivery, needs environment setup, git workflow, deployment strategy |

## Modules (docs/5-modules/)

- `request-intake` — FR-INTAKE-001..007
- `task-workbench` — FR-WORKBENCH-001..008
- `projects-360` — FR-PROJECTS-001..006
- `executive-dashboard` — FR-DASHBOARD-001..005
- `reports` — FR-REPORTS-001..008
- `settings-administration` — FR-SETTINGS-001..008

## Source documents

- `Project Req Doc/LL – Project Management & Project 360 Visibility Platform (MVP) Project Plan 2 (1).pdf`
- `Project Req Doc/Business Requirements Document (BRD).docx`
