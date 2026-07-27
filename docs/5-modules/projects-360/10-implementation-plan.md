# Implementation Plan

> **Purpose**
>
> Executable development plan for the Projects 360 module.

---

# Module

Projects 360

---

# Status

Planning

---

# Dependencies

Requires `tasks`, `requests`, `notes` schemas (Milestones 2-3) in place before aggregation
queries can be built.

---

# Task Breakdown

## Phase 1 — Database

- Create `projects` migration
- Create indexes (status_id, customer_id)

---

## Phase 2 — Backend

- Project model/entity
- ProjectAggregationService (360 detail, metrics, derived fields)
- ProjectController (routes per `8-api.md`)
- CSV export service

---

## Phase 3 — Frontend

- Project List page (List/Kanban/Update Call view toggle)
- Metrics header component
- Project 360 Detail page

---

## Phase 4 — Testing

- Unit tests: derived field calculation (overdue, awaiting info, progress %)
- Integration tests: 360 detail aggregation correctness
- UI tests: saved view filters, export

---

## Phase 5 — Documentation

- API reference update
- Release notes for Milestone 4

---

# Checklist

- [ ] Schema
- [ ] Validation
- [ ] API
- [ ] UI
- [ ] Tests

---

# Risks

Aggregation query performance at scale — mitigate with indexing per `4-schema.md` and
`docs/2-database/4-database-standards.md`.

---

# AI Generation Notes

Align with Project Plan Milestone 4 (Project 360, Dashboard & Reports, 100 hrs) — shared
milestone with Executive Dashboard.
