# API Design

> **Purpose**
>
> This document defines the API architecture, standards, conventions, and integration approach for the project. It serves as the primary reference for designing, implementing, testing, and maintaining REST APIs while ensuring consistency, security, scalability, and interoperability across all services.

---

# Document Information

| Field | Value |
|--------|-------|
| Project Name | Legacy Lighting – Project Management & Project 360 Visibility Platform (MVP) |
| API Style | REST |
| Version | 1.0 |
| Status | Draft |
| Author | Development Team (NuVista AI) |
| Created Date | 2026-07-27 |
| Last Updated | 2026-07-27 |

---

# 1. Executive Summary

A single Node.js + TypeScript REST API backs the React frontend and serves as the integration
layer for read-only NetSuite (REST/SuiteTalk) and Microsoft Graph (OneDrive) access. Consumers
are the platform's own web frontend only in MVP (no public/partner API). Authenticated via JWT
bearer tokens; authorized via RBAC (Admin, Manager, Processor, Estimator, Viewer).

---

# 2. API Overview

## API Type

- REST API

## Base URL

```
https://<confirmed-domain>/api/v1
```

## Protocol

- HTTPS

## Data Format

- JSON

## Character Encoding

- UTF-8

---

# 3. API Design Principles

Examples

- Resource-oriented endpoints
- Stateless communication
- Standard HTTP methods
- Consistent naming conventions
- Versioned APIs
- Idempotent operations where applicable
- Standard response format
- Secure by default

---

# 4. Authentication & Authorization

- JWT Authentication (24-hour token expiry, bcrypt-hashed passwords)
- Role Based Access Control (RBAC): Admin, Manager, Processor, Estimator, Viewer
- See `2-authentication.md` and `3-authorization.md` for full detail

---

# 5. API Resources

| Resource | Description |
|----------|-------------|
| Auth | Login, logout, refresh, password reset |
| Users | User accounts and roles (Settings & Administration) |
| Customers | Customer master data |
| Requests | Request Intake queue and request-to-task conversion |
| Tasks | Task Management Workbench |
| Projects | Projects 360 |
| Notes | Notes attached to tasks/projects |
| Dashboard | Executive Dashboard KPIs and Monday Meeting View |
| Reports | Estimator Workload, Overdue Aging, Request Type Volume, NetSuite Coverage, Project Health, Customer Activity |
| Master Data | Request Types, Project Types, Locations, Statuses, Priorities |
| Integrations | NetSuite reference sync, OneDrive folder/document visibility, connected-systems status |
| Activity Logs | Audit trail read endpoints |

---

# 6. Endpoint Standards

Define endpoint naming conventions.

Examples

```
GET    /users
GET    /users/{id}
POST   /users
PUT    /users/{id}
PATCH  /users/{id}
DELETE /users/{id}
```

Guidelines

- Use plural resource names.
- Use lowercase URLs.
- Use nouns instead of verbs.
- Avoid deeply nested resources.
- Keep URLs predictable.

---

# 7. HTTP Methods

| Method | Purpose |
|---------|----------|
| GET | Retrieve data |
| POST | Create resource |
| PUT | Replace resource |
| PATCH | Partial update |
| DELETE | Remove resource |

---

# 8. Request Standards

Define request structure.

Include

- Headers
- Query Parameters
- Path Parameters
- Request Body
- Content-Type

Example Headers

```
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
```

---

# 9. Response Standards

Define the standard API response format.

## Success Response

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

---

# 10. HTTP Status Codes

| Status | Meaning |
|---------|----------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# 11. Validation Standards

Define request validation rules.

Examples

- Required fields
- Data types
- Length validation
- Enum validation
- Business rule validation
- File validation

---

# 12. Pagination, Filtering & Sorting

Describe supported query conventions.

Pagination

```
?page=1
&page_size=20
```

Filtering

```
?status=active
```

Sorting

```
?sort=name
?sort=-created_at
```

Searching

```
?search=keyword
```

---

# 13. Versioning Strategy

Describe API version management.

Examples

```
/api/v1/
/api/v2/
```

Guidelines

- Backward compatibility
- Deprecation policy
- Version lifecycle

---

# 14. Error Handling

Define error handling strategy.

Include

- Validation errors
- Authentication errors
- Authorization errors
- Business errors
- Server errors

---

# 15. Rate Limiting

Define rate limiting policy.

Examples

- Requests per minute
- Requests per user
- Requests per IP

---

# 16. Security Standards

Examples

- HTTPS only
- JWT authentication
- Password hashing
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection (if applicable)
- CORS policy

---

# 17. Performance Standards

Examples

- Response time targets
- Pagination for collections
- Compression
- Caching
- Database query optimization
- Asynchronous processing where appropriate

---

# 18. API Documentation

Specify documentation standards.

Examples

- OpenAPI (Swagger)
- ReDoc
- Postman Collection
- Example requests
- Example responses

---

# 19. Monitoring & Logging

Examples

- Request logging
- Error logging
- Audit logging
- Performance monitoring
- API usage metrics

---

# 20. Assumptions

-

-

-

---

# 21. Constraints

Examples

- REST APIs only
- JSON payloads only
- HTTPS required
- UTF-8 encoding
- Maximum request size
- Authentication mandatory

---

# 22. Related Documents

- Project Overview
- Requirements
- Feature Breakdown
- Architecture
- Database Design
- API Standards
- Module Specifications
- Security Standards
- Testing Strategy

---

# 23. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | | | Initial Draft |

---

# Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Solution Architect | | | |
| Technical Lead | | | |
| API Lead | | | |

---

# AI Generation Notes

When generating this document, the AI should:

- Follow the approved Requirements, Architecture, and Database Design documents.
- Design resource-oriented REST APIs using consistent naming conventions.
- Keep APIs stateless and versioned.
- Apply standard HTTP methods and status codes.
- Define reusable request and response structures.
- Recommend secure authentication and authorization mechanisms.
- Support pagination, filtering, sorting, and searching for collection endpoints.
- Do not define module-specific endpoints in this document; detailed endpoint specifications belong in individual module API documents.
- Maintain consistency with all project documentation.