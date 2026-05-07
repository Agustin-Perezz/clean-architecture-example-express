# Project Overview

Clean Architecture example REST API using Express 5 and MikroORM with SQLite.

## Architecture (src/)

- **domain/** — Entities (business objects). No framework dependencies. `src/domain/user.entity.ts`
- **infrastructure/** — External concerns (DB config, repositories, external services). `src/infrastructure/mikro-orm.config.ts`
- **presentation/** — HTTP layer (routes, controllers, middleware). Entry point: `src/presentation/index.ts`

Dependencies point inward: presentation → infrastructure → domain. Domain never imports from outer layers.

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

## RTK

Prefix ALL shell commands with `rtk`. Fallback to raw commands only if `rtk` fails.

## Extended Docs

Read these when relevant to your task:
- `agent_docs/database_schema.md` — Entity definitions and ORM config details
