import { type EntityManager } from "@mikro-orm/core";
import { Book } from "../../../../../domain/books/book.entity.js";
import type { IGetBookRepository } from "../../../../../application/use-cases/books/get-book/get-book.repository.interface.js";
import { BookEntity } from "../../entities/book.entity.js";

export class GetBookRepository implements IGetBookRepository {
  constructor(private readonly em: EntityManager) {}

  async getById(id: number): Promise<Book | null> {
    const entity = await this.em.findOne(BookEntity, { id });
    if (!entity) return null;

    return Book.reconstitute({
      id: entity.id,
      title: entity.title,
      author: entity.author,
      isbn: entity.isbn,
      isAvailable: entity.isAvailable,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
