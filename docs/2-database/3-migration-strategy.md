# Migration Strategy

> **Purpose**
>
> This document defines the database migration strategy for the project. It establishes standards for creating, managing, reviewing, and deploying database schema changes across all environments while ensuring data integrity, version control, and rollback capability.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Database | PostgreSQL |
| Migration Tool | Prisma Migrate |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

Schema changes are made through versioned, ORM-native migrations, one logical change per
migration, each with a rollback. Given the compressed 5-week timeline, the schema is largely
finalized during Milestone 1 (data model) and built out incrementally through Milestone 2
(Platform Foundation & Request Intake); later milestones add narrowly-scoped migrations rather
than large schema rewrites.

---

# 2. Migration Objectives

- Maintain a consistent schema across development, staging, and production
- Support automated deployment as part of the production launch in Milestone 5
- Preserve existing/imported customer, project, and task data during schema evolution
- Enable rollback if a migration causes issues during the 5-week build

---

# 3. Migration Tool

| Item | Value |
|------|-------|
| Framework | Node.js 20 LTS + TypeScript + Express.js (see `1-project/4-tech-stack.md`) |
| ORM | Prisma 5.x |
| Migration Tool | Prisma Migrate |
| Version | Bundled with Prisma 5.x |

---

# 4. Migration Principles

- One logical change per migration
- Every migration must have a rollback (`down` migration)
- Never modify a migration that has already run in any shared environment
- Migrations are deterministic and idempotent where possible
- No manual/ad hoc schema changes outside the migration tool — including during the Milestone 1
  data-model finalization spike

---

# 5. Migration Workflow

1. Create migration
2. Review migration (peer review between the 2 full-stack developers)
3. Execute locally
4. Test rollback
5. Commit to repository
6. Deploy to staging
7. Validate
8. Deploy to production (Milestone 5)

---

# 6. Migration Types

| Type | Description |
|------|-------------|
| Schema Migration | Create/modify core tables: users, roles, customers, requests, tasks, projects, notes |
| Data Migration | Backfill/transform data (e.g. mapping legacy planner labels to structured fields) |
| Seed Migration | Insert initial data (roles, default statuses/priorities) |
| Reference Data Migration | Populate request_types, project_types, locations master tables |
| Hotfix Migration | Emergency production fixes post-launch |

---

# 7. Versioning Strategy

- Timestamp-based naming, applied in order

```
202607271000_create_users_and_roles
202607271030_create_master_data_tables
202607271100_create_customers
202607271130_create_requests
202607271200_create_tasks
202607271230_create_projects
202607271300_create_notes_and_activity_logs
202607271330_create_integration_reference_tables
```

---

# 8. Naming Conventions

Migration file names:

```
create_users_table
create_roles_table
create_request_types_table
add_intake_status_to_requests
add_extended_due_date_to_tasks
create_netsuite_references_table
```

Migration classes/functions:

```
CreateUsersTable
AddIntakeStatusToRequests
```

---

# 9. Rollback Strategy

- Reverse schema changes exactly (drop what was created, revert altered columns)
- Never destroy production data as part of a routine rollback
- Roll back only the failed release, not unrelated prior migrations
- Validate against a staging snapshot before rolling back production

---

# 10. Seed Data Strategy

Seed migrations populate, at minimum:

- Roles: Admin, Manager, Processor, Estimator, Viewer
- Default statuses per entity type (Task: Not Started, Assigned, In Progress, Awaiting Info,
  Needs Review, Under Review, Completed, On Hold; Request: New, Triaged, Converted; Project:
  Active, At Risk, Blocked, Completed) — "Assigned" and "Needs Review" confirmed against the
  live Lovable UI's actual status values, added to the BRD's example list
- Default priorities: Urgent, High, Medium, Low (minimum 3 active, per FR-SETTINGS-006)
- Initial request types: New Quote, Revision, Takeoff, Submittal, Clarification
- Initial project types: Multifamily, Commercial, Retail, Hospitality
- Locations: loaded from Legacy Lighting's confirmed office/region list (Milestone 1 input)

This is separate from the one-time **initial data load** (BRD Section 7.2): Customers, Users,
and representative active Projects/Tasks are imported via manual CSV during Milestone 2 setup,
using CSV templates produced as a Milestone 2 deliverable. This is a Data Migration (per Section
6 above), not a Seed Migration — it loads real, project-specific records rather than fixed
reference values, is run once, and is not exposed as an ongoing Admin UI feature in MVP. No
legacy system migration is in scope (greenfield project).

---

# 11. Environment Strategy

| Environment | Migration Policy |
|-------------|------------------|
| Development | Migrations run freely by either developer; reset allowed |
| Testing | Migrations run automatically before test suite execution |
| Staging | Migrations run as part of the deploy step; validated before promoting to production |
| Production | Migrations run only during a planned deploy window (Milestone 5 launch and subsequent releases), with a backup taken first |

---

# 12. Deployment Strategy

- Migrations run before application code deploy in each environment
- A database backup is taken immediately before any production migration
- Post-migration smoke test: verify core tables are queryable and seed data is present
- Any failed production migration triggers an immediate rollback per Section 9

---

# 13. Validation Checklist

Before executing migrations, verify:

- Migration reviewed by the other developer
- Rollback implemented and tested
- Tested locally
- Tested on staging
- Backup completed (staging/production)
- No unexpected data loss
- Dependent migrations identified and ordered correctly

---

# 14. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data loss during backfill from legacy planner labels | High | Backup before migration; validate row counts before/after |
| Failed migration during Milestone 5 production launch | High | Rollback plan tested on staging first; deploy in a maintenance window |
| Long execution time on large seed loads | Medium | Batch inserts; run during low-traffic windows |
| Compressed timeline leaves little slack for migration issues | Medium | Finalize data model in Milestone 1 to minimize later schema churn |

---

# 15. Best Practices

- Keep migrations small and single-purpose
- Avoid combining unrelated schema changes
- Test every migration locally and on staging before production
- Review generated SQL before execution
- Never edit a migration that has already run in a shared environment
- Document any non-obvious migration (e.g. legacy label backfill logic)
- Keep seed data migrations separate from schema migrations

---

# 16. Assumptions

- Migration/ORM tooling (Prisma) is confirmed — see `1-project/4-tech-stack.md`
- Legacy Lighting provides representative active project/task data for validating backfill
  migrations, per the Project Plan's "What We Need to Begin the Project" section

---

# 17. Constraints

- PostgreSQL only
- Version-controlled migrations only, committed to the project repository
- No manual production schema changes outside the migration tool

---

# 18. Related Documents

- `1-database-design.md`
- `2-erd.md`
- `4-database-standards.md`
- `docs/5-modules/*/4-schema.md`
- `docs/6-development/7-deployment-strategy.md`

---

# 19. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Database Architect | | Pending | |
| Technical Lead | | Pending | |
| DevOps Engineer | | Pending | |

---

# AI Generation Notes

When generating this document, the AI should:

- Follow the project's approved database design and development standards.
- Recommend version-controlled, incremental migrations.
- Ensure every migration supports rollback where feasible.
- Separate schema migrations from data and seed migrations.
- Keep migration naming consistent and descriptive.
- Avoid manual database changes outside the migration framework.
- Ensure migration strategy aligns with the deployment process.
- Maintain consistency with all database documentation.
