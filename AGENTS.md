# Project Overview

Clean Architecture example REST API using Express 5 and MikroORM with SQLite.

## Architecture (src/)

- **domain/** — Pure entities (no framework dependencies). Business objects with factory methods.
  - `src/domain/books/book.entity.ts`
- **application/** — Use cases (business logic orchestration) and repository interfaces.
  - `src/application/use-cases/books/` — One subfolder per operation (create, get, list, update, delete)
  - `src/application/repositories/` — Repository interfaces (contracts) per operation
- **infrastructure/** — External concerns (DB config, MikroORM entities, repository implementations).
  - `src/infrastructure/database/sqlite/entities/` — MikroORM entities (with decorators)
  - `src/infrastructure/database/sqlite/repositories/` — Repository implementations
  - `src/infrastructure/mikro-orm.config.ts`
- **presentation/** — HTTP layer (controllers, routes). Entry point: `src/presentation/index.ts`
  - `src/presentation/controllers/books/books.controller.ts`

Dependencies point inward: presentation → application → domain. Infrastructure implements application interfaces. Domain never imports from outer layers.

## Commands

- Dev server: `rtk npm run dev`
- Build: `rtk npm run build`
- Lint: `rtk npm run lint`
- Lint fix: `rtk npm run lint:fix`
- Typecheck: `rtk npm run typecheck`

Always run `rtk npm run typecheck` and `rtk npm run lint` after changes.

## Key Details

- ESM project (`"type": "module"`) — use `.js` extensions in imports
- TypeScript strict mode enabled
- MikroORM with decorators (`emitDecoratorMetadata`, `experimentalDecorators`)
- SQLite database stored at `./data/database.db`
- Runs on port 3000

## Clean Architecture Rules

1. **Pure Domain** — Domain entities have NO framework decorators. They use factory methods (`create`, `reconstitute`) and getters.
2. **Repository per Operation** — Each use case defines its own repository interface (e.g., `ICreateBookRepository`, `IGetBookRepository`).
3. **Mandatory Transactions** — All write operations use `em.transactional()`.
4. **Dependency Inversion** — Application layer defines interfaces, Infrastructure layer implements them.

## RTK

Prefix ALL shell commands with `rtk`. Fallback to raw commands only if `rtk` fails.

## Extended Docs

Read these when relevant to your task:
- `agent_docs/database_schema.md` — Entity definitions and ORM config details