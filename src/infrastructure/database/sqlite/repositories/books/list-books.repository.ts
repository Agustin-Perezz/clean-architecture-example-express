import { type EntityManager } from "@mikro-orm/core";
import { Book } from "../../../../../domain/books/book.entity.js";
import type { IListBooksRepository } from "../../../../../application/use-cases/books/list-books/list-books.repository.interface.js";
import { BookEntity } from "../../entities/book.entity.js";

export class ListBooksRepository implements IListBooksRepository {
  constructor(private readonly em: EntityManager) {}

  async getAll(): Promise<Book[]> {
    const entities = await this.em.find(BookEntity, {});
    return entities.map((entity) =>
      Book.reconstitute({
        id: entity.id,
        title: entity.title,
        author: entity.author,
        isbn: entity.isbn,
        isAvailable: entity.isAvailable,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }),
    );
  }
}
