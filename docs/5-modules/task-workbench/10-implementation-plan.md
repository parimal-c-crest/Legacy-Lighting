# Implementation Plan

> **Purpose**
>
> Executable development plan for the Task Workbench module.

---

# Module

Task Workbench

---

# Status

Planning

---

# Dependencies

Requires Request Intake (`requests` table) and Settings & Administration (statuses, priorities)
in place first.

---

# Task Breakdown

## Phase 1 — Database

- Create `tasks` migration
- Create `notes` migration
- Create indexes (status_id, assigned_estimator_id, due_date, project_id)

---

## Phase 2 — Backend

- Task model/entity, Note model
- TaskService (status transition engine, extension, reassignment, awaiting-info)
- TaskController (routes per `8-api.md`)
- Authorization policy (ownership enforcement for Estimator)

---

## Phase 3 — Frontend

- Task List page
- Task Board (Kanban) page
- Task Detail page with quick actions
- Due-date extension modal, Awaiting Info modal, Notes thread

---

## Phase 4 — Testing

- Unit tests: status transition state machine, extension validation
- Integration tests: full status lifecycle, reassignment
- UI tests: drag-and-drop, quick actions, ownership scoping

---

## Phase 5 — Documentation

- API reference update
- Release notes for Milestone 3

---

# Checklist

- [ ] Schema
- [ ] Validation
- [ ] API
- [ ] UI
- [ ] Tests

---

# Risks

Status workflow graph not finalized before Phase 1 begins — mitigate by confirming in
Milestone 1.

---

# AI Generation Notes

Align phases with Project Plan Milestone 3 (Task Management Workbench, 100 hrs).
