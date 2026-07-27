# Implementation Plan

> **Purpose**
>
> Executable development plan for the Executive Dashboard module.

---

# Module

Executive Dashboard

---

# Status

Planning

---

# Dependencies

Requires Projects 360 and Task Workbench data available; no dedicated schema of its own.

---

# Task Breakdown

## Phase 1 — Database

- None (no owned tables); confirm indexes on `projects.status_id`/`tasks.status_id` support
  aggregation performance.

---

## Phase 2 — Backend

- DashboardAggregationService (project status, sales outlook, top blockers, Monday meeting)
- DashboardController (routes per `8-api.md`)

---

## Phase 3 — Frontend

- Executive Dashboard page (widget grid)
- Monday Meeting View page (printable layout)

---

## Phase 4 — Testing

- Unit tests: classification thresholds, week-boundary calculation
- Integration tests: widget data correctness against seeded projects/tasks
- UI tests: refresh behavior, print layout

---

## Phase 5 — Documentation

- API reference update
- Release notes for Milestone 4

---

# Checklist

- [ ] Schema (n/a — reference only)
- [ ] Validation
- [ ] API
- [ ] UI
- [ ] Tests

---

# Risks

KPI thresholds are confirmed (Q-002) — no longer a Phase 2 blocker.

---

# AI Generation Notes

Align with Project Plan Milestone 4 (Project 360, Dashboard & Reports, 100 hrs) — shared
milestone with Projects 360 and Reports.
