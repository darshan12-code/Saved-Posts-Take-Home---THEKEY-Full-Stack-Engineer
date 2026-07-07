# ARCHITECTURE.md

# Community Forum – Saved Posts

**Version:** 1.0

**Document Type:** Internal Engineering Design Document

**Status:** Approved for Implementation

---

# 1. Project Overview

## Objective

Build a production-quality full-stack implementation of a **Saved Posts** feature for a discussion forum used within an online learning platform.

The application allows students to browse discussion posts from courses they are enrolled in, save posts for later, remove saved posts, and view a personal saved posts list.

Moderators have elevated permissions allowing them to access all posts across all courses and remove posts.

This project intentionally focuses on engineering quality rather than feature quantity. The goal is to demonstrate sound software architecture, separation of concerns, business rule implementation, authorization, testing, maintainability, and clean engineering practices.

---

# 2. Architecture Goals

The architecture is designed around the following principles:

* Separation of concerns
* High cohesion and low coupling
* Clear ownership of responsibilities
* Testable business logic
* Simple but scalable architecture
* Maintainable folder organization
* Predictable request lifecycle
* Clean REST API
* Efficient database access
* Easy future extensibility

Primary design philosophy:

> Business rules should exist in exactly one place.

---

# 3. Technology Stack

| Layer                | Technology                                    | Reason                                               |
| -------------------- | --------------------------------------------- | ---------------------------------------------------- |
| Frontend             | React + TypeScript                            | Component-based architecture with strong typing      |
| Routing              | React Router                                  | Simple client-side routing                           |
| Server State         | React Query (TanStack Query)                  | Caching, synchronization, optimistic updates         |
| Backend              | Express + TypeScript                          | Mature, flexible REST framework                      |
| ORM                  | Drizzle ORM                                   | Type-safe SQL with lightweight abstraction           |
| Database             | SQLite (Assessment) / PostgreSQL (Production) | SQLite for fast setup, PostgreSQL for scalability    |
| Validation           | Zod                                           | Runtime request validation with TypeScript inference |
| Testing              | Vitest + Supertest                            | Unit and API testing                                 |
| Internationalization | react-i18next                                 | Localization and pluralization                       |
| Package Manager      | npm / Bun                                     | Standard dependency management                       |

---

# 4. High-Level Architecture

```
React Application
        │
        ▼
React Query
        │
        ▼
API Client
        │
        ▼
Express REST API
        │
        ▼
Authentication
Validation
Controllers
        │
        ▼
Business Services
        │
        ▼
Repositories
        │
        ▼
Drizzle ORM
        │
        ▼
SQLite / PostgreSQL
```

The architecture follows a layered approach where each layer has a single responsibility.

---

# 5. Layered Architecture

## Presentation Layer

Responsibilities

* UI rendering
* User interaction
* Routing
* Loading states
* Error states
* Empty states

Contains

* Pages
* Components
* Layout

Does **not**

* Fetch data directly
* Contain business logic
* Know database structure

---

## Client Data Layer

Responsibilities

* React Query
* API communication
* Cache management
* Optimistic updates
* Background refetching

Contains

* Custom hooks
* Query keys
* API client

---

## API Layer

Responsibilities

* Receive HTTP requests
* Route requests
* Execute middleware
* Return HTTP responses

Contains

* Routes
* Controllers

Does **not**

* Implement business rules

---

## Middleware Layer

Responsibilities

* Authentication
* Request validation
* Error handling
* Logging (future)

Cross-cutting concerns live here.

---

## Business Service Layer

The heart of the application.

Responsibilities

* Authorization
* Business rules
* Idempotency
* Soft delete behavior
* Save reactivation
* Domain validation

Business logic remains framework independent.

---

## Repository Layer

Responsibilities

* Database access
* Query construction
* Persistence

Repositories never implement business decisions.

---

## Database Layer

Responsibilities

* Data persistence
* Constraints
* Indexes
* Relationships

No business rules exist inside the database.

---

# 6. Folder Structure

## Backend

```
server/

├── routes/
├── controllers/
├── middleware/
├── services/
├── repositories/
├── database/
│   ├── schema/
│   ├── migrations/
│   └── seed/
├── validators/
├── types/
├── utils/
├── config/
└── tests/
```

---

## Frontend

```
src/

├── app/
├── pages/
├── components/
├── hooks/
├── api/
├── queries/
├── services/
├── types/
├── utils/
├── constants/
├── i18n/
└── assets/
```

---

# 7. Database Design Summary

Core tables

* users
* courses
* course_enrollments
* posts
* saved_posts

Relationships

```
Users
    │
    ├─────────────┐
    │             │
    ▼             ▼
Posts      Saved Posts
    │
    ▼
Courses
    ▲
    │
Course Enrollments
```

## Key Design Decisions

### Soft Delete

Saved posts are never physically deleted.

Instead

```
deleted_at = NULL
```

means active

```
deleted_at = timestamp
```

means inactive.

---

### Save Reactivation

If a user saves the same post again after removing it,

the existing record is reactivated instead of creating another row.

---

### Duplicate Prevention

One save relationship exists per

```
(user_id, post_id)
```

pair.

The service layer reactivates existing records instead of inserting duplicates.

---

### Important Indexes

Posts

* course_id
* (course_id, created_at)

Saved Posts

* user_id
* post_id
* (user_id, deleted_at)
* (post_id, deleted_at)

Enrollments

* (user_id, course_id)

---

# 8. Business Logic Summary

## Feed

* Verify course exists
* Verify enrollment
* Return paginated posts
* Include hasSaved
* Include savesCount

---

## Save Post

* Verify authorization
* Verify post exists
* Create save if none exists
* Ignore duplicate saves
* Reactivate soft-deleted saves

---

## Remove Saved Post

* Verify authorization
* Soft delete save
* Preserve history
* Idempotent operation

---

## Saved Posts

* Return only current user's saves
* Active saves only
* Most recently saved first
* Paginated

---

# 9. Authorization Strategy

Authentication is intentionally stubbed.

Authenticated user is provided through

* request header
* token
* session

Authentication middleware attaches

```
req.user
```

Authorization lives inside the service layer.

## Student

Can

* View enrolled course posts
* Save posts
* Remove saved posts
* View own saved posts

Cannot

* Access unenrolled courses
* Access another user's saved list
* Delete posts

## Moderator

Can

* View every course
* Save posts
* Remove saved posts
* Delete forum posts

---

# 10. API Overview

## Feed

```
GET /api/courses/:courseId/posts
```

Returns

* paginated posts
* hasSaved
* savesCount

---

## Save Post

```
PUT /api/posts/:postId/save
```

Idempotent.

---

## Remove Save

```
DELETE /api/posts/:postId/save
```

Soft delete.

---

## Saved Posts

```
GET /api/me/saved-posts
```

Returns current user's saved posts.

---

## Delete Post

```
DELETE /api/posts/:postId
```

Moderator only.

---

# 11. Frontend Architecture

Frontend follows

```
Page

↓

Custom Hook

↓

React Query

↓

API Client

↓

Backend
```

Pages never fetch data directly.

Components never know about APIs.

Hooks own server interaction.

React Query owns caching.

---

## Pages

* Feed
* Saved Posts
* Not Found

---

## Components

Reusable

* PostCard
* BookmarkButton
* Pagination
* Loading
* EmptyState
* ErrorState

---

## Hooks

* useFeed
* useSavedPosts
* useSavePost
* useRemoveSavedPost

---

## State Management

Server State

* React Query

UI State

* React useState

No Redux required.

---

# 12. Data Flow

## Opening Feed

```
Browser

↓

React Page

↓

useFeed()

↓

React Query

↓

API Client

↓

Express

↓

Service

↓

Repository

↓

Database

↓

Repository

↓

Service

↓

Controller

↓

React Query Cache

↓

UI
```

---

## Saving Post

```
Bookmark Button

↓

Mutation

↓

API

↓

Business Service

↓

Repository

↓

Database

↓

Response

↓

Cache Update

↓

UI Refresh
```

---

## Viewing Saved Posts

```
Saved Page

↓

Hook

↓

API

↓

Business Service

↓

Repository

↓

Database

↓

Cache

↓

Render
```

---

# 13. Sequence Flow Summary

Every request follows the same lifecycle.

```
Client

↓

Router

↓

Authentication

↓

Validation

↓

Controller

↓

Business Service

↓

Repository

↓

Database

↓

Repository

↓

Service

↓

Controller

↓

Response
```

This consistent request pipeline makes the application easier to reason about and test.

---

# 14. Important Engineering Decisions

## Layered Architecture

Chosen to isolate responsibilities and improve maintainability.

---

## Business Logic in Services

Business rules remain independent of

* Express
* React
* Database

making them easy to unit test.

---

## Repository Pattern

Repositories isolate persistence logic.

Database technology can change with minimal business logic impact.

---

## React Query

Chosen for

* server state
* caching
* optimistic updates
* cache invalidation

---

## Soft Delete

Preserves historical save information.

Supports reactivation.

Prevents duplicate records.

---

## RESTful API

Resource-oriented endpoints improve readability and future extensibility.

---

## Type Safety

TypeScript across frontend and backend reduces runtime errors.

---

# 15. Error Handling Strategy

Validation errors

→ 400

Authentication failure

→ 401

Authorization failure

→ 403

Missing resources

→ 404

Unexpected errors

→ 500

A centralized error handler ensures consistent API responses.

---

# 16. Trade-offs

## SQLite vs PostgreSQL

SQLite chosen for assessment simplicity.

Production deployments should use PostgreSQL.

---

## Authentication

Authentication is stubbed.

Real authentication intentionally excluded from scope.

---

## Minimal Feature Scope

Only functionality required for the assignment is implemented.

No

* comments
* likes
* notifications
* search
* admin dashboard

---

## Simple UI

Priority is engineering quality over visual complexity.

---

# 17. Scalability Considerations

The architecture supports future growth.

Potential additions

* Comments
* Likes
* Notifications
* Search
* Infinite scrolling
* User profiles
* Bookmark folders
* Analytics
* Admin dashboard

Most future features require adding new services and repositories without modifying existing layers.

---

# 18. Future Improvements

With additional development time:

* JWT authentication
* Refresh tokens
* Role-based authorization middleware
* API versioning
* OpenAPI / Swagger documentation
* Docker Compose
* CI/CD pipeline
* Rate limiting
* Request logging
* Distributed caching (Redis)
* Background jobs
* Audit logging
* Performance monitoring
* Full responsive UI
* End-to-end tests
* Accessibility improvements
* Search and filtering
* Infinite scrolling
* Cursor-based pagination
* Materialized save counts for large datasets

---

# 19. Testing Strategy

## Unit Tests

Business service

* Save
* Remove
* Reactivation
* Authorization
* Idempotency

---

## Integration Tests

REST API

* Feed
* Save
* Saved Posts
* Authorization

---

## Frontend Tests

* Rendering
* Loading states
* Empty states
* User interactions

---

# 20. Conclusion

This architecture prioritizes correctness, maintainability, and separation of concerns over feature quantity. Every layer has a clearly defined responsibility, allowing the application to remain easy to understand, test, and extend. The design aligns with production engineering practices while remaining appropriately scoped for the assessment's time constraints.

This document serves as the authoritative architectural reference for implementation. Any implementation decisions should follow the principles and boundaries defined here unless superseded by a documented design review.
