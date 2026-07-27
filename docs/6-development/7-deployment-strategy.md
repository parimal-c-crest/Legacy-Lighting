# Deployment Strategy

> **Purpose**
>
> This document defines the project's deployment strategy, release process, environment management, deployment architecture, rollback procedures, and operational readiness requirements. It ensures software is deployed consistently, securely, reliably, and with minimal downtime across all environments.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| Deployment Model | Cloud-hosted, deployed at end of Milestone 5 (Integrations, Testing & Production Launch) |
| Hosting Platform | Vercel (frontend) + Render (backend API + managed PostgreSQL) |
| Cloud Provider | Vercel / Render (managed PaaS — no self-managed cloud infrastructure) |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

The frontend deploys to Vercel (static build + CDN, auto-deployed from `main`/`staging`
branches). The backend API and PostgreSQL database deploy to Render (managed web service +
managed Postgres instance). Both platforms handle infrastructure, TLS, and scaling without a
dedicated DevOps role, matching the project's 2-developer / no-DevOps constraint. Rollback is a
one-click redeploy of the previous build on both platforms.

---

# 2. Objectives

The deployment strategy should:

- Deliver software safely.
- Minimize downtime.
- Reduce deployment risk.
- Support rapid recovery.
- Ensure repeatable deployments.
- Support continuous delivery.

---

# 3. Deployment Principles

Deployments should be:

- Automated where practical.
- Repeatable.
- Version controlled.
- Auditable.
- Secure.
- Reversible.
- Monitored.

---

# 4. Deployment Workflow

```text
Development
      ↓
Code Review
      ↓
Automated Tests
      ↓
Build
      ↓
Artifact Creation
      ↓
Deployment
      ↓
Smoke Tests
      ↓
Monitoring
      ↓
Release Complete
```

---

# 5. Deployment Environments

| Environment | Purpose | Platform |
|------------|---------|----------|
| Development | Local dev, native PostgreSQL service (no Docker) | Developer machines |
| Staging | Pre-production validation, mirrors production config | Vercel preview + Render staging service/database |
| Production | Live system for Legacy Lighting users | Vercel production + Render production service/database |

Access control: only the 2 developers (and Admin role within the app) have deploy access on
Vercel/Render. Configuration: environment variables set per-environment in each platform's
dashboard, never committed. Deployment frequency: staging on every merge to `staging`;
production on every merge to `main` (see `9-ci-cd.md`).

---

# 6. Infrastructure Overview

- Application server: Render web service running the Express API (auto-scaling handled by Render)
- Web/CDN: Vercel's edge network serves the built React frontend
- Database: Render managed PostgreSQL (automated backups, per `docs/2-database/3-migration-strategy.md`)
- No load balancer, cache server, message queue, or object storage needed at MVP scale/scope
  (documents stay in OneDrive; no file uploads)

---

# 7. Build Process

Document:

- Source checkout
- Dependency installation
- Build commands
- Static analysis
- Unit testing
- Artifact generation
- Versioning

---

# 8. Release Strategy

Specify the release model.

Examples

- Continuous Deployment
- Continuous Delivery
- Scheduled Releases
- Sprint Releases
- Hotfix Releases

Document:

- Release approval
- Release cadence
- Freeze periods

---

# 9. Database Deployment

Document:

- Migration strategy
- Schema updates
- Data migrations
- Rollback procedures
- Backup requirements

Ensure migrations are version-controlled.

---

# 10. Configuration Management

Document:

- Environment variables
- Secret management
- Feature flags
- Configuration files
- Environment-specific overrides

Never store secrets in source control.

---

# 11. Deployment Automation

Document:

- CI/CD pipeline
- Deployment scripts
- Infrastructure as Code
- Artifact repositories
- Deployment approvals

---

# 12. Rollback Strategy

Define rollback procedures.

Include:

- Rollback triggers
- Rollback steps
- Database rollback
- Configuration rollback
- Validation after rollback

Specify maximum acceptable recovery time.

---

# 13. Health Checks

After deployment verify:

- Application startup
- Database connectivity
- API availability
- Authentication
- Background jobs
- Scheduled tasks
- External integrations

---

# 14. Smoke Testing

Minimum deployment validation should include:

- Login
- Dashboard
- Core business workflow
- API endpoints
- Database connectivity
- Logging
- Monitoring

---

# 15. Monitoring & Alerting

Monitor:

- Availability
- Error rates
- Response times
- CPU
- Memory
- Disk usage
- Database health
- Queue health

Configure alerts for critical failures.

---

# 16. Security Requirements

Deployment should ensure:

- HTTPS enabled
- Secure secrets management
- Access control
- Least-privilege permissions
- Encrypted communication
- Security scanning
- Dependency vulnerability checks

---

# 17. Backup & Disaster Recovery

Document:

- Backup frequency
- Backup retention
- Recovery procedures
- Disaster recovery plan
- Recovery Time Objective (RTO)
- Recovery Point Objective (RPO)

---

# 18. Release Validation Checklist

Before release verify:

- Build successful
- Tests passed
- Security scan completed
- Database migration reviewed
- Documentation updated
- Release approved

After deployment verify:

- Smoke tests passed
- Monitoring healthy
- No critical errors
- Performance acceptable

---

# 19. Deployment Risks

Examples

| Risk | Mitigation |
|------|------------|
| Failed deployment | Rollback plan |
| Database migration failure | Backup before migration |
| Configuration errors | Environment validation |
| Performance degradation | Post-deployment monitoring |

---

# 20. Best Practices

- Automate deployments.
- Keep deployments repeatable.
- Version all deployment artifacts.
- Validate every deployment.
- Monitor continuously.
- Test rollback procedures regularly.
- Deploy small, incremental changes.
- Document every release.

---

# 21. Assumptions

-

-

-

---

# 22. Constraints

Examples

- Production deployments require approval.
- Database backups required before migrations.
- All automated tests must pass.
- Rollback procedures must be documented.
- Deployment artifacts must be versioned.

---

# 23. Related Documents

- Implementation Workflow
- Development Environment
- Testing Strategy
- CI/CD Pipeline
- Infrastructure Architecture
- Configuration Management
- Security Standards
- Monitoring & Logging
- Disaster Recovery Plan
- Release Management

---

# 24. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | | | Initial Draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| DevOps Engineer | | | |
| Technical Lead | | | |
| Solution Architect | | | |

---

# AI Generation Notes

When generating this document, the AI should:

- Follow the approved Infrastructure Architecture, CI/CD Pipeline, and Security Standards.
- Recommend automated, repeatable, and secure deployment practices.
- Define environment management, release strategy, rollback procedures, monitoring, and disaster recovery.
- Ensure deployments are auditable, version-controlled, and minimize service disruption.
- Keep cloud provider, deployment platform, and CI/CD tooling configurable based on the project's technology stack.