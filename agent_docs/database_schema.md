# Database Schema

## User Entity (`src/domain/user.entity.ts`)

| Column | Type     | Modifier    |
|--------|----------|-------------|
| id     | number   | @PrimaryKey |
| name   | string   | @Property   |
| email  | string   | @Property   |

## MikroORM Config (`src/infrastructure/mikro-orm.config.ts`)

- Driver: `SqliteDriver`
- Database: `./data/database.db`
- Entity discovery: `./src/domain/**/*.entity.ts`

## Conventions

- All entities live in `src/domain/` with the `*.entity.ts` suffix
- Use MikroORM decorators: `@Entity`, `@PrimaryKey`, `@Property`
- Repositories go in `src/infrastructure/`