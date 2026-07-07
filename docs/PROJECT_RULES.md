# PROJECT_RULES.md

# Engineering Standards & Implementation Rules

**Version:** 1.0

**Purpose**

This document defines the mandatory engineering standards for the project.

Every implementation must follow these rules.

If implementation conflicts with this document, this document takes precedence.

---

# Core Engineering Principles

The project must prioritize:

* Correctness over speed
* Maintainability over cleverness
* Simplicity over unnecessary abstraction
* Readability over brevity
* Consistency over personal preference
* Separation of concerns
* Single responsibility
* Testability
* Type safety

---

# General Rules

## Rule 1

Always write production-quality code.

Never write temporary or shortcut implementations.

---

## Rule 2

Prefer simple, readable code over complex optimizations.

---

## Rule 3

Do not over-engineer.

Only implement features required by the assignment.

---

## Rule 4

Every file should have a clear responsibility.

Avoid "utility" files that become dumping grounds.

---

## Rule 5

Favor composition over duplication.

---

## Rule 6

Every implementation should be easy for another engineer to understand.

---

# Architecture Rules

## Rule 7

Always follow layered architecture.

```text id="2r1ujx"
Presentation

↓

Hooks

↓

API Client

↓

Controller

↓

Service

↓

Repository

↓

Database
```

Do not bypass layers.

---

## Rule 8

Each layer must have exactly one responsibility.

---

## Rule 9

Never allow the frontend to communicate directly with the database.

---

## Rule 10

Never allow services to know Express-specific details.

Services should be framework independent.

---

## Rule 11

Repositories should never contain business logic.

---

## Rule 12

Controllers should never contain business logic.

---

## Rule 13

Business logic must exist in only one location.

Never duplicate business rules.

---

# Backend Rules

## Controllers

Controllers must only:

* Receive requests
* Call services
* Return responses

Controllers must **not**

* Validate business rules
* Execute SQL
* Make authorization decisions
* Perform calculations
* Implement application logic

Controllers should remain small.

---

## Services

Services own all business rules.

Services should:

* Validate business conditions
* Perform authorization
* Coordinate repositories
* Handle idempotency
* Enforce domain rules

Services should not

* Know HTTP
* Know Express
* Know SQL syntax

---

## Repositories

Repositories own persistence.

Repositories should

* Read data
* Write data
* Execute queries

Repositories must not

* Perform authorization
* Perform validation
* Apply business rules

---

## Middleware

Middleware owns cross-cutting concerns.

Examples

* Authentication
* Validation
* Error handling
* Logging (future)

---

# Database Rules

## Never access the database outside repositories.

---

## Use foreign keys wherever relationships exist.

---

## Create indexes for frequently queried columns.

---

## Use soft delete for saved posts.

Never physically delete save history.

---

## Prevent duplicate save relationships.

Reuse existing records when reactivating.

---

## Always preserve historical data.

---

## Use transactions when multiple writes must succeed together.

---

# Business Logic Rules

Business rules belong only inside services.

Examples

* Enrollment validation
* Authorization
* Save reactivation
* Idempotency
* Duplicate prevention

No other layer may implement these rules.

---

## Save Operations

Saving a post must be idempotent.

Saving the same post twice must not create duplicates.

---

## Remove Operations

Removing a save must use soft delete.

Never remove rows permanently.

---

## Reactivation

Saving an inactive bookmark must reactivate it.

Never create a second row.

---

# API Rules

Follow REST conventions.

---

## Resources

Use nouns.

Correct

```text id="w0hnfu"
/posts

/courses

/saved-posts
```

Avoid verbs in URLs.

---

## HTTP Methods

GET

Retrieve data.

POST

Create resources.

PUT

Replace or perform idempotent updates.

PATCH

Partial updates (if introduced later).

DELETE

Remove resources (soft delete internally if required).

---

## Status Codes

Use appropriate status codes.

400

Validation error

401

Unauthenticated

403

Forbidden

404

Not found

500

Unexpected error

---

## Response Format

Every endpoint should return a consistent response structure.

---

## Never expose database errors directly.

Return user-friendly messages.

---

# Validation Rules

Validate all external input before calling services.

Validation should include

* Required fields
* Data types
* Parameter formats
* Pagination values

Invalid requests must never reach business logic.

---

# Authorization Rules

Authentication occurs before controllers.

Authorization occurs inside services.

Never perform authorization in repositories.

Never perform authorization in React.

Frontend authorization is for user experience only, not security.

The backend is the source of truth.

---

# Frontend Rules

## Components

Components should be presentation only.

Components should

* Render UI
* Receive props
* Emit events

Components should not

* Fetch data
* Know API endpoints
* Contain business logic

---

## Pages

Pages compose components.

Pages call hooks.

Pages should remain small.

---

## Hooks

Hooks own client-side feature behavior.

Hooks may

* Use React Query
* Call APIs
* Transform responses
* Manage loading states
* Manage optimistic updates

Hooks should not contain reusable UI.

---

## API Client

All HTTP requests must go through the API layer.

Never call fetch() or axios directly inside components or pages.

---

## React Query

React Query owns server state.

Do not duplicate server data in React state.

Use query invalidation instead of manual refreshes.

Implement optimistic updates only when they can be safely rolled back.

---

## Local State

React state should only manage UI state.

Examples

* Modal visibility
* Selected item
* Form values
* Current page

Never duplicate server state.

---

# Component Design Rules

Keep components reusable.

Prefer composition over inheritance.

Avoid deeply nested props.

Avoid massive components.

If a component exceeds approximately 200 lines, consider splitting it.

---

# TypeScript Rules

Use TypeScript strict mode.

Avoid the use of `any`.

Prefer explicit types over implicit assumptions.

Define shared interfaces in dedicated type files.

Keep types close to the domain they represent.

---

# Function Design Rules

Functions should perform one task.

Prefer early returns over deeply nested conditions.

Avoid long functions.

Break large workflows into smaller helper functions when appropriate.

Use descriptive names.

---

# Naming Conventions

Use consistent naming.

Examples

Components

```text id="j1xjhm"
PostCard
BookmarkButton
SavedPostsPage
```

Hooks

```text id="qbq7wb"
useFeed
useSavePost
useSavedPosts
```

Services

```text id="0o0xmt"
FeedService
SaveService
```

Repositories

```text id="6miy5d"
PostRepository
SaveRepository
```

Files should match exported names whenever practical.

---

# Error Handling Rules

Never swallow errors.

Handle expected errors explicitly.

Unexpected errors should reach the global error handler.

Always return meaningful error messages without exposing internal implementation details.

---

# Logging Rules

Avoid excessive logging.

Do not log sensitive information.

Reserve detailed logging for debugging and future production monitoring.

---

# Testing Rules

Business logic must be tested.

Priority

1. Service tests
2. API tests
3. Frontend tests

Critical business rules should never rely only on manual testing.

Test at least:

* Save
* Duplicate save
* Remove
* Reactivate
* Authorization
* Validation failures

---

# Performance Rules

Avoid unnecessary database queries.

Avoid N+1 query patterns.

Select only required columns.

Reuse React Query cache.

Prevent unnecessary React re-renders.

Do not optimize prematurely.

Measure before optimizing.

---

# Security Rules

Never trust client input.

Validate everything.

Authorize every protected action.

Never expose stack traces.

Never expose internal database information.

Treat all request data as untrusted.

---

# Git Rules

Keep commits focused.

Each commit should represent one logical change.

Use conventional commit messages.

Examples

```text id="aaw0v8"
feat:
fix:
test:
docs:
refactor:
chore:
```

Avoid mixing unrelated changes in the same commit.

---

# Documentation Rules

Document important architectural decisions.

Keep README accurate.

Update architecture documentation if implementation changes significantly.

Document assumptions and trade-offs.

---

# Code Review Checklist

Before considering a feature complete, verify:

* [ ] Layered architecture respected.
* [ ] Controllers remain thin.
* [ ] Business logic exists only in services.
* [ ] Database accessed only through repositories.
* [ ] Validation performed before services.
* [ ] Authorization enforced in services.
* [ ] No duplicated business logic.
* [ ] Components remain reusable.
* [ ] React Query logic isolated in hooks.
* [ ] API follows REST conventions.
* [ ] TypeScript strict mode maintained.
* [ ] No unnecessary `any` usage.
* [ ] Functions are small and focused.
* [ ] Error handling is consistent.
* [ ] Business logic is tested.
* [ ] Documentation updated if required.

---

# Anti-Patterns (Do Not Introduce)

Never:

* Put SQL inside controllers.
* Put SQL inside services.
* Call repositories directly from React.
* Fetch data directly inside UI components.
* Duplicate business rules.
* Hardcode API URLs across multiple files.
* Mix presentation with business logic.
* Physically delete saved posts.
* Create duplicate save records.
* Ignore validation errors.
* Ignore authorization checks.
* Return inconsistent API responses.
* Use global mutable state without a clear need.
* Introduce unnecessary abstractions for a small project.

---

# Definition of Done

A feature is considered complete only when:

* The architecture rules are respected.
* Business logic is correctly implemented.
* Authorization and validation are enforced.
* Error handling is complete.
* TypeScript passes without errors.
* Tests covering the feature pass.
* The implementation remains readable and maintainable.
* The feature integrates cleanly with the existing architecture.
* Documentation remains accurate if behavior changes.

---

# Final Principle

Every implementation decision should answer **yes** to the following questions:

1. Is this the simplest solution that correctly satisfies the requirement?
2. Does this preserve the layered architecture?
3. Is the business logic located in exactly one place?
4. Can this code be tested independently?
5. Will another engineer understand this code six months from now?
6. Can this feature be extended without major refactoring?

If the answer to any question is **no**, reconsider the implementation before proceeding.
