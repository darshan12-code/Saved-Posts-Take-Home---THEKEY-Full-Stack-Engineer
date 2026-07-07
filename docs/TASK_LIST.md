# TASK_LIST.md

# Community Forum – Saved Posts

**Development Checklist**

**Purpose:** Track implementation progress from project setup to final submission.

**Estimated Total Duration:** ~6 Hours

**Legend**

* ☐ Not Started
* ☑ Completed
* ⏳ In Progress
* ⛔ Blocked

---

# Phase 1 — Project Setup

## Task 1

**Status**

* [ ] Not Started

**Description**

Initialize backend project with TypeScript, Express, and project structure.

**Files Involved**

* backend/package.json
* backend/tsconfig.json
* backend/src/index.ts
* backend/src/app.ts

**Estimated Duration**

10 minutes

**Dependencies**

None

**Suggested Commit**

```text
chore: initialize express backend
```

---

## Task 2

**Status**

* [ ] Not Started

**Description**

Initialize frontend project with React, TypeScript, and Vite.

**Files Involved**

* frontend/package.json
* frontend/tsconfig.json
* frontend/src/main.tsx
* frontend/src/App.tsx

**Estimated Duration**

10 minutes

**Dependencies**

None

**Suggested Commit**

```text
chore: initialize react frontend
```

---

## Task 3

**Status**

* [ ] Not Started

**Description**

Install project dependencies and verify both applications start successfully.

**Files Involved**

* package.json
* lock files

**Estimated Duration**

10 minutes

**Dependencies**

Tasks 1–2

**Suggested Commit**

```text
chore: configure project dependencies
```

---

# Phase 2 — Database

## Task 4

**Status**

* [ ] Not Started

**Description**

Create database schema definitions.

**Files Involved**

* database/schema/*
* database/index.ts

**Estimated Duration**

20 minutes

**Dependencies**

Task 3

**Suggested Commit**

```text
feat: add database schema definitions
```

---

## Task 5

**Status**

* [ ] Not Started

**Description**

Create database migrations.

**Files Involved**

* database/migrations/*

**Estimated Duration**

10 minutes

**Dependencies**

Task 4

**Suggested Commit**

```text
feat: add database migrations
```

---

## Task 6

**Status**

* [ ] Not Started

**Description**

Create seed data for users, courses, enrollments, posts, and saved posts.

**Files Involved**

* database/seed/*

**Estimated Duration**

15 minutes

**Dependencies**

Task 5

**Suggested Commit**

```text
feat: add seed data
```

---

# Phase 3 — Backend Foundation

## Task 7

**Status**

* [ ] Not Started

**Description**

Create backend folder structure and base modules.

**Files Involved**

* routes/
* controllers/
* services/
* repositories/
* middleware/
* validators/
* utils/

**Estimated Duration**

15 minutes

**Dependencies**

Task 6

**Suggested Commit**

```text
chore: create backend architecture
```

---

## Task 8

**Status**

* [ ] Not Started

**Description**

Configure global error handling.

**Files Involved**

* middleware/errorHandler.*
* utils/errors.*

**Estimated Duration**

10 minutes

**Dependencies**

Task 7

**Suggested Commit**

```text
feat: add global error handling
```

---

## Task 9

**Status**

* [ ] Not Started

**Description**

Implement authentication stub.

**Files Involved**

* middleware/auth.*

**Estimated Duration**

10 minutes

**Dependencies**

Task 7

**Suggested Commit**

```text
feat: add authentication middleware
```

---

## Task 10

**Status**

* [ ] Not Started

**Description**

Implement request validation.

**Files Involved**

* validators/*
* middleware/validation.*

**Estimated Duration**

15 minutes

**Dependencies**

Task 9

**Suggested Commit**

```text
feat: add request validation
```

---

# Phase 4 — Feed Feature

## Task 11

**Status**

* [ ] Not Started

**Description**

Implement repository methods for retrieving feed posts.

**Files Involved**

* repositories/PostRepository.*

**Estimated Duration**

20 minutes

**Dependencies**

Task 10

**Suggested Commit**

```text
feat: implement feed repository
```

---

## Task 12

**Status**

* [ ] Not Started

**Description**

Implement feed business logic.

**Files Involved**

* services/FeedService.*

**Estimated Duration**

20 minutes

**Dependencies**

Task 11

**Suggested Commit**

```text
feat: implement feed service
```

---

## Task 13

**Status**

* [ ] Not Started

**Description**

Expose feed endpoint.

**Files Involved**

* controllers/FeedController.*
* routes/feed.*

**Estimated Duration**

15 minutes

**Dependencies**

Task 12

**Suggested Commit**

```text
feat: expose feed api
```

---

# Phase 5 — Save Feature

## Task 14

**Status**

* [ ] Not Started

**Description**

Implement save repository operations.

**Files Involved**

* repositories/SaveRepository.*

**Estimated Duration**

15 minutes

**Dependencies**

Task 13

**Suggested Commit**

```text
feat: implement save repository
```

---

## Task 15

**Status**

* [ ] Not Started

**Description**

Implement save business logic.

**Files Involved**

* services/SaveService.*

**Estimated Duration**

25 minutes

**Dependencies**

Task 14

**Suggested Commit**

```text
feat: implement save business rules
```

---

## Task 16

**Status**

* [ ] Not Started

**Description**

Expose save endpoint.

**Files Involved**

* controllers/SaveController.*
* routes/save.*

**Estimated Duration**

10 minutes

**Dependencies**

Task 15

**Suggested Commit**

```text
feat: expose save endpoint
```

---

# Phase 6 — Remove Saved Post

## Task 17

**Status**

* [ ] Not Started

**Description**

Implement soft delete and save reactivation logic.

**Files Involved**

* SaveService
* SaveRepository

**Estimated Duration**

20 minutes

**Dependencies**

Task 16

**Suggested Commit**

```text
feat: implement save removal and reactivation
```

---

## Task 18

**Status**

* [ ] Not Started

**Description**

Expose remove saved post endpoint.

**Files Involved**

* controllers
* routes

**Estimated Duration**

10 minutes

**Dependencies**

Task 17

**Suggested Commit**

```text
feat: expose remove save endpoint
```

---

# Phase 7 — Saved Posts

## Task 19

**Status**

* [ ] Not Started

**Description**

Implement saved posts repository query.

**Files Involved**

* SaveRepository

**Estimated Duration**

15 minutes

**Dependencies**

Task 18

**Suggested Commit**

```text
feat: implement saved posts repository
```

---

## Task 20

**Status**

* [ ] Not Started

**Description**

Implement saved posts service and API.

**Files Involved**

* SaveService
* SaveController
* Routes

**Estimated Duration**

20 minutes

**Dependencies**

Task 19

**Suggested Commit**

```text
feat: implement saved posts endpoint
```

---

# Phase 8 — Frontend

## Task 21

**Status**

* [ ] Not Started

**Description**

Configure routing, providers, and React Query.

**Files Involved**

* main.tsx
* App.tsx
* router/*
* providers/*

**Estimated Duration**

20 minutes

**Dependencies**

Task 3

**Suggested Commit**

```text
chore: configure frontend providers
```

---

## Task 22

**Status**

* [ ] Not Started

**Description**

Create shared API client.

**Files Involved**

* api/client.*

**Estimated Duration**

10 minutes

**Dependencies**

Task 21

**Suggested Commit**

```text
feat: create api client
```

---

## Task 23

**Status**

* [ ] Not Started

**Description**

Create reusable UI components.

**Files Involved**

* components/PostCard/*
* components/BookmarkButton/*
* components/Pagination/*
* components/Loading/*
* components/EmptyState/*

**Estimated Duration**

25 minutes

**Dependencies**

Task 22

**Suggested Commit**

```text
feat: add reusable ui components
```

---

## Task 24

**Status**

* [ ] Not Started

**Description**

Implement Feed page.

**Files Involved**

* pages/Feed/*
* hooks/useFeed.*

**Estimated Duration**

25 minutes

**Dependencies**

Tasks 13 and 23

**Suggested Commit**

```text
feat: implement feed page
```

---

## Task 25

**Status**

* [ ] Not Started

**Description**

Implement Saved Posts page.

**Files Involved**

* pages/SavedPosts/*
* hooks/useSavedPosts.*

**Estimated Duration**

20 minutes

**Dependencies**

Tasks 20 and 24

**Suggested Commit**

```text
feat: implement saved posts page
```

---

## Task 26

**Status**

* [ ] Not Started

**Description**

Implement save and remove mutations with optimistic updates.

**Files Involved**

* hooks/useSavePost.*
* hooks/useRemoveSavedPost.*

**Estimated Duration**

25 minutes

**Dependencies**

Tasks 16, 18, and 25

**Suggested Commit**

```text
feat: integrate bookmark mutations
```

---

# Phase 9 — Quality

## Task 27

**Status**

* [ ] Not Started

**Description**

Add loading, empty, and error states.

**Files Involved**

* shared UI components
* pages

**Estimated Duration**

15 minutes

**Dependencies**

Task 26

**Suggested Commit**

```text
feat: improve application states
```

---

## Task 28

**Status**

* [ ] Not Started

**Description**

Implement internationalization.

**Files Involved**

* i18n/*
* locale files

**Estimated Duration**

15 minutes

**Dependencies**

Task 27

**Suggested Commit**

```text
feat: add internationalization support
```

---

# Phase 10 — Testing

## Task 29

**Status**

* [ ] Not Started

**Description**

Write backend unit tests for business logic.

**Files Involved**

* tests/services/*

**Estimated Duration**

30 minutes

**Dependencies**

Task 20

**Suggested Commit**

```text
test: add service unit tests
```

---

## Task 30

**Status**

* [ ] Not Started

**Description**

Write API integration tests.

**Files Involved**

* tests/api/*

**Estimated Duration**

20 minutes

**Dependencies**

Task 29

**Suggested Commit**

```text
test: add api integration tests
```

---

# Phase 11 — Documentation

## Task 31

**Status**

* [ ] Not Started

**Description**

Complete project documentation and perform final review.

**Files Involved**

* README.md
* ARCHITECTURE.md
* IMPLEMENTATION_PLAN.md
* PROJECT_RULES.md
* DECISIONS.md
* TASK_LIST.md
* NOTES.md

**Estimated Duration**

20 minutes

**Dependencies**

Tasks 1–30

**Suggested Commit**

```text
docs: finalize project documentation
```

---

# Final Submission Checklist

## Backend

* [ ] Database schema completed
* [ ] Seed data created
* [ ] Repository layer implemented
* [ ] Service layer implemented
* [ ] Controllers remain thin
* [ ] Validation implemented
* [ ] Authentication stub implemented
* [ ] REST API completed

## Frontend

* [ ] Routing configured
* [ ] React Query configured
* [ ] Feed page complete
* [ ] Saved posts page complete
* [ ] Optimistic updates working
* [ ] Error handling complete
* [ ] Empty states complete
* [ ] Loading states complete
* [ ] Internationalization complete

## Quality

* [ ] Unit tests passing
* [ ] API tests passing
* [ ] No TypeScript errors
* [ ] No linting errors
* [ ] Documentation complete
* [ ] Application ready for submission
