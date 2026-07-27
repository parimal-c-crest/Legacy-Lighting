# Module Specification

Purpose

Document the complete business specification of the Task Management Workbench module.

---

# Document Information

- Module Name: Task Workbench
- Version: 1.0
- Status: Draft
- Owner: Development Team (NuVista AI)
- Priority: Critical

---

# 1. Executive Summary

Purpose: give Estimators a dedicated operational workspace to execute assigned tasks, replacing
the existing overloaded-label planner.

Business objective: 95% task assignment accuracy; reduced overdue tasks (BRD Section 1.4).

Scope: task list/board views, task detail, assignment, due dates/extensions, status lifecycle,
flags, notes, quick actions.

---

# 2. Business Context

Problem statement: the existing planner uses overloaded labels rather than structured fields,
making workload and due-date visibility unreliable (BRD Section 2.1).

Business value: structured fields replace labels; estimators and managers get accurate
workload/due-date visibility.

Dependencies: Request Intake (source of most tasks), Projects 360 (aggregates tasks), Settings &
Administration (statuses, priorities).

---

# 3. Module Overview

Description: List and Kanban views of tasks, a detailed task card, and quick actions for status/
notes/due-date management.

Responsibilities: task lifecycle execution and estimator workload visibility.

Out of scope: automated workflow routing, AI-suggested prioritization (Phase 2).

---

# 4. Actors

- Estimator (primary: executes tasks)
- Manager (reassigns, overrides priority/deadlines)
- Processor (assigns tasks at creation)
- System (activity logging, notifications)

---

# 5. Goals

Business goals: accurate workload visibility, on-time task completion.

User goals: an Estimator always knows what's next and can update status in one click.

Success metrics: 30% reduction in overdue tasks within 3 months (BRD Section 1.4).

---

# 6. Functional Requirements

- FR-WORKBENCH-001 Task List View
- FR-WORKBENCH-002 Task Card Display
- FR-WORKBENCH-003 Workflow Visualization
- FR-WORKBENCH-004 Quick Actions
- FR-WORKBENCH-005 Notes and Communication
- FR-WORKBENCH-006 Due Date Extension
- FR-WORKBENCH-007 Status Updates
- FR-WORKBENCH-008 Awaiting Information Flag

---

# 7. User Stories

- As an Estimator, I want a personal task list sorted by due date so I know what to work on next.
- As an Estimator, I want to extend a due date with a reason so scheduling stays realistic.
- As a Manager, I want to reassign a task so I can rebalance workload.

---

# 8. Acceptance Criteria

Given an Estimator viewing their Task List,
When they mark a task "Awaiting Information",
Then a mandatory clarification note is required and the task appears in the Awaiting Info view.

Given a task in progress,
When the Estimator marks it "Completed",
Then a confirmation is required and a completed timestamp is recorded.

---

# 9. Business Process

```
Task created (from converted request or manually)
   ↓
Estimator works task through status lifecycle
   ↓
Estimator updates status / extends due date / adds notes as needed
   ↓
Task marked Completed (confirmed)
   ↓
Reflected in Projects 360 and Executive Dashboard
```

---

# 10. Module Navigation

See `docs/4-ui/1-navigation.md` — "Task Workbench" menu with List and Board views.

---

# 11. Dependencies

Modules: Request Intake (task source), Projects 360 (aggregation), Settings & Administration
(statuses/priorities).

External systems: NetSuite, OneDrive (reference links only).

Shared services: Authentication/RBAC, Activity Logging.

---

# 12. Events

Triggers: status change, due-date extension, awaiting-info flag toggle.

Notifications: relevant stakeholders notified on Awaiting Info flag (FR-WORKBENCH-008).

Background jobs: none in MVP.

---

# 13. Non-Functional Requirements

Performance: task list ≤200ms (NFR-PERF-002).

Availability: standard platform SLA.

Security: Estimators view only their own tasks (see `7-permissions.md`).

Accessibility: WCAG 2.1 Level A.

Localization: English-only.

---

# 14. Assumptions

Status and priority master data confirmed in Milestone 1.

---

# 15. Constraints

No approval workflow for due-date extensions in MVP (BRD notes this as future phase).

---

# 16. Risks

Overloaded legacy labels may not map cleanly to new structured statuses — handle via confirmed
active data only (Project Plan risk register).

---

# 17. Related Documents

`4-schema.md`, `8-api.md`, `7-permissions.md`, `6-validation.md`, `3-business-rules.md`,
`9-ui.md`, `11-testing.md`

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-27 | Development Team (NuVista AI) | Initial draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | | Pending | |

---

# AI Generation Notes

Derive content only from approved FR-WORKBENCH-* requirements in `1-project/2-requirements.md`.
