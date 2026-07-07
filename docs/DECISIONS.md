# DECISIONS.md

# Engineering Decision Log

**Version:** 1.0

**Purpose**

This document records the key architectural and engineering decisions made during the design phase of the project.

Each decision documents:

* Decision
* Reason
* Alternatives Considered
* Why Alternatives Were Rejected
* Trade-offs
* Future Improvements

The goal is to make architectural reasoning transparent and provide context during future maintenance, design reviews, and technical interviews.

---

# Decision 1 — React Instead of Next.js

## Decision

Use **React + TypeScript**.

---

## Reason

The assignment is a client-side application that communicates with a REST API.

There is:

* No SEO requirement
* No server-side rendering requirement
* No static site generation requirement

Using React keeps the application simple and aligns with the requested technology stack.

---

## Alternatives Considered

* Next.js
* Remix
* Vue

---

## Why Alternatives Were Rejected

### Next.js

Provides SSR, routing, and server components that are unnecessary for this assignment.

Would introduce additional complexity without delivering measurable value.

### Remix

Excellent routing and data loading but unnecessary for the project scope.

### Vue

Not aligned with the required stack.

---

## Trade-offs

Pros

* Smaller project
* Faster development
* Simpler deployment

Cons

* No SSR
* No SEO optimization

---

## Future Improvements

If the application becomes publicly accessible or SEO becomes important, migration to Next.js could be considered.

---

# Decision 2 — Express Instead of Elysia

## Decision

Use **Express**.

---

## Reason

Express is mature, stable, and widely adopted.

It provides:

* predictable middleware
* excellent ecosystem
* straightforward REST development

The focus of the assessment is architecture rather than framework experimentation.

---

## Alternatives Considered

* Elysia
* Fastify
* NestJS

---

## Why Alternatives Were Rejected

### Elysia

Very fast but tied to Bun and has a smaller ecosystem.

Not as universally recognized during interviews.

### Fastify

Higher performance than Express.

Performance benefits are unnecessary for the expected workload.

### NestJS

Excellent architecture but significantly more opinionated.

Would add unnecessary framework complexity.

---

## Trade-offs

Pros

* Large ecosystem
* Familiar to reviewers
* Flexible architecture

Cons

* Slightly lower performance than Fastify or Elysia

---

## Future Improvements

If performance requirements increase significantly, migration to Fastify would be relatively straightforward because business logic is isolated from the framework.

---

# Decision 3 — Drizzle ORM

## Decision

Use Drizzle ORM.

---

## Reason

Provides:

* Type-safe SQL
* Lightweight abstraction
* Excellent TypeScript support
* Predictable migrations

It keeps SQL visible while avoiding excessive ORM magic.

---

## Alternatives Considered

* Prisma
* TypeORM
* Raw SQL

---

## Why Alternatives Were Rejected

### Prisma

Excellent developer experience but generates an additional client layer and abstracts SQL more heavily.

### TypeORM

More mature but historically more complex and less type-safe.

### Raw SQL

Maximum control but more repetitive and error-prone.

---

## Trade-offs

Pros

* Lightweight
* Strong typing
* SQL transparency

Cons

* Smaller ecosystem than Prisma

---

## Future Improvements

Adopt advanced migration workflows and query optimization as the application grows.

---

# Decision 4 — SQLite for Assessment, PostgreSQL for Production

## Decision

Develop using SQLite while designing for PostgreSQL compatibility.

---

## Reason

SQLite enables:

* zero configuration
* fast local setup
* easy submission

PostgreSQL provides production scalability.

---

## Alternatives Considered

* PostgreSQL only
* MySQL
* MongoDB

---

## Why Alternatives Were Rejected

### PostgreSQL Only

Requires additional environment setup for reviewers.

### MySQL

No advantage over PostgreSQL for this use case.

### MongoDB

The application is highly relational.

Relationships are better modeled using SQL.

---

## Trade-offs

Pros

* Easy assessment setup
* Production migration path

Cons

* SQLite concurrency limitations

---

## Future Improvements

Switch to PostgreSQL in production without changing application architecture.

---

# Decision 5 — Layered Architecture

## Decision

Adopt a layered architecture.

---

## Reason

Each layer owns one responsibility.

Presentation

↓

Controller

↓

Service

↓

Repository

↓

Database

This improves maintainability and testability.

---

## Alternatives Considered

* MVC only
* Feature-first monolith
* Direct controller-to-database

---

## Why Alternatives Were Rejected

### MVC Only

Often results in controllers accumulating business logic.

### Direct Database Access

Violates separation of concerns.

Difficult to test.

---

## Trade-offs

Pros

* Clean boundaries
* Easier testing
* Better maintainability

Cons

* Slightly more files

---

## Future Improvements

Feature modules can be introduced while preserving the layered design.

---

# Decision 6 — Repository Pattern

## Decision

Repositories exclusively manage persistence.

---

## Reason

Separates business logic from data access.

Makes persistence replaceable.

Improves unit testing.

---

## Alternatives Considered

* Services using ORM directly

---

## Why Alternatives Were Rejected

Mixes business rules with persistence.

Creates tighter coupling.

---

## Trade-offs

Pros

* Cleaner architecture
* Better testing
* Easier refactoring

Cons

* Additional abstraction layer

---

## Future Improvements

Add repository interfaces if multiple storage implementations become necessary.

---

# Decision 7 — Business Logic in Services

## Decision

All business rules belong in services.

---

## Reason

Creates a single source of truth.

Supports unit testing.

Avoids duplication.

---

## Alternatives Considered

* Controllers
* Database
* Middleware

---

## Why Alternatives Were Rejected

Controllers should remain transport-oriented.

Databases should not enforce application rules.

Middleware is intended for cross-cutting concerns.

---

## Trade-offs

Pros

* Testability
* Maintainability

Cons

* Slight increase in project structure

---

## Future Improvements

Extract domain services if the application grows substantially.

---

# Decision 8 — React Query

## Decision

Use React Query for server state.

---

## Reason

Provides:

* caching
* synchronization
* retries
* optimistic updates
* background refetching

without additional boilerplate.

---

## Alternatives Considered

* Redux Toolkit
* Context API
* Manual fetch

---

## Why Alternatives Were Rejected

### Redux

Excellent for global client state.

Server state is better handled by React Query.

### Context

Not intended for asynchronous server data.

### Manual Fetch

Creates duplicated loading and caching logic.

---

## Trade-offs

Pros

* Less boilerplate
* Better caching
* Cleaner UI

Cons

* Additional dependency

---

## Future Improvements

Introduce persistence or offline support if required.

---

# Decision 9 — Soft Delete for Saved Posts

## Decision

Saved posts use soft delete.

---

## Reason

Preserves save history.

Supports reactivation.

Prevents duplicate records.

Aligns with assignment requirements.

---

## Alternatives Considered

* Hard delete

---

## Why Alternatives Were Rejected

Hard delete loses historical information and requires creating new rows when re-saving.

---

## Trade-offs

Pros

* Preserves history
* Simpler reactivation

Cons

* Requires filtering inactive records

---

## Future Improvements

Add audit metadata for historical analysis.

---

# Decision 10 — Idempotent Save Operations

## Decision

Saving the same post multiple times should produce the same final state.

---

## Reason

Supports retries.

Improves API reliability.

Prevents duplicates.

---

## Alternatives Considered

* Return an error on duplicate saves
* Toggle endpoint

---

## Why Alternatives Were Rejected

Returning errors complicates client retries.

Toggle endpoints are not idempotent and make behavior less predictable.

---

## Trade-offs

Pros

* Simpler clients
* Reliable retries

Cons

* Slightly more service logic

---

## Future Improvements

Support idempotency keys for distributed systems if needed.

---

# Decision 11 — Stub Authentication

## Decision

Authentication will be stubbed.

---

## Reason

Authentication is outside the assessment scope.

The focus is authorization and business logic.

---

## Alternatives Considered

* JWT
* OAuth
* Session authentication

---

## Why Alternatives Were Rejected

Would consume significant development time without improving evaluation criteria.

---

## Trade-offs

Pros

* Faster implementation
* Keeps focus on architecture

Cons

* Not production authentication

---

## Future Improvements

Replace stub with JWT authentication and refresh tokens.

---

# Decision 12 — REST API Design

## Decision

Use RESTful resource-oriented endpoints.

---

## Reason

REST is widely understood and appropriate for CRUD-style operations.

Resources map naturally to:

* courses
* posts
* saved-posts

---

## Alternatives Considered

* GraphQL
* RPC endpoints

---

## Why Alternatives Were Rejected

GraphQL introduces unnecessary complexity.

RPC-style URLs are less resource-oriented.

---

## Trade-offs

Pros

* Familiar
* Predictable
* Easy to document

Cons

* Multiple endpoints instead of flexible queries

---

## Future Improvements

Add OpenAPI documentation and API versioning.

---

# Decision 13 — Reusable UI Components

## Decision

Use reusable presentation components.

---

## Reason

Reduces duplication.

Improves maintainability.

Supports consistent UI.

---

## Alternatives Considered

Feature-specific duplicated components.

---

## Why Alternatives Were Rejected

Creates unnecessary maintenance overhead.

---

## Trade-offs

Pros

* Reusability
* Consistency

Cons

* Slightly more initial design effort

---

## Future Improvements

Create a shared design system if the application expands.

---

# Decision 14 — TypeScript Strict Mode

## Decision

Enable TypeScript strict mode.

---

## Reason

Improves reliability.

Catches errors during development.

Provides stronger contracts.

---

## Alternatives Considered

Relaxed compiler settings.

---

## Why Alternatives Were Rejected

Allows avoidable runtime errors.

---

## Trade-offs

Pros

* Better correctness
* Safer refactoring

Cons

* Slightly more verbose typing

---

## Future Improvements

Adopt stricter linting and type coverage metrics.

---

# Decision 15 — Testing Strategy

## Decision

Prioritize service-level tests, followed by API integration tests.

---

## Reason

Business logic represents the highest-risk area.

Testing services provides maximum confidence with minimal maintenance.

---

## Alternatives Considered

* UI-heavy testing
* End-to-end only

---

## Why Alternatives Were Rejected

UI tests are more brittle.

End-to-end tests are slower and harder to debug.

---

## Trade-offs

Pros

* Fast feedback
* Stable tests
* High business rule coverage

Cons

* Less visual regression coverage

---

## Future Improvements

Introduce end-to-end tests with Playwright or Cypress after the core implementation stabilizes.

---

# Summary

The overarching theme behind every decision is to optimize for **clarity, maintainability, and correctness** rather than unnecessary complexity. The architecture intentionally favors well-understood patterns—layered architecture, repository pattern, REST APIs, React Query, and TypeScript strict mode—because they make the codebase easier to test, easier to explain during technical interviews, and easier to evolve as new features are introduced.

These decisions also preserve flexibility: replacing SQLite with PostgreSQL, Express with another HTTP framework, or the authentication stub with JWT authentication can all be achieved with minimal impact because responsibilities are cleanly separated across the architecture.
