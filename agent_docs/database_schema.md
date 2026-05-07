# Database Schema

## Book Domain Entity (`src/domain/books/book.entity.ts`)

Pure domain entity with no framework decorators.

| Field       | Type     | Access   |
|-------------|----------|----------|
| id          | number   | readonly |
| title       | string   | get/set  |
| author      | string   | get/set  |
| isbn        | string   | get/set  |
| isAvailable | boolean  | get/set  |
| createdAt   | Date     | readonly |
| updatedAt   | Date     | get/set  |

Factory methods:
- `Book.create(params)` — creates a new book (id=0, isAvailable=true)
- `Book.reconstitute(params)` — recreates from persistence
- `book.update(params)` — updates fields and sets updatedAt

## Book MikroORM Entity (`src/infrastructure/database/sqlite/entities/book.entity.ts`)

| Column     | Type     | Modifier          |
|------------|----------|-------------------|
| id         | number   | @PrimaryKey       |
| title      | string   | @Property          |
| author     | string   | @Property          |
| isbn       | string   | @Property(unique)  |
| isAvailable| boolean  | @Property(default=true) |
| createdAt  | Date     | @Property          |
| updatedAt  | Date     | @Property(onUpdate) |

## MikroORM Config (`src/infrastructure/mikro-orm.config.ts`)

- Driver: `SqliteDriver`
- Database: `./data/database.db`
- Entity discovery: `./src/infrastructure/database/sqlite/entities/**/*.entity.ts`

## Repository Pattern

Repository interfaces live in `src/application/repositories/book.repository.interface.ts`:
- `ICreateBookRepository` — create + existsByIsbn
- `IGetBookRepository` — getById
- `IListBooksRepository` — getAll
- `IUpdateBookRepository` — getById + update
- `IDeleteBookRepository` — getById + delete

Implementations live in `src/infrastructure/database/sqlite/repositories/books/book.repository.ts`.

## Conventions

- Domain entities are pure (no decorators, no ORM dependencies)
- MikroORM entities are separate in infrastructure layer
- All write operations use `em.transactional()`
- Data mapping between ORM entities and domain entities done in repositories