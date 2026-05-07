import { type EntityManager } from "@mikro-orm/core";
import { Book } from "../../../../../domain/books/book.entity.js";
import type { IDeleteBookRepository } from "../../../../../application/use-cases/books/delete-book/delete-book.repository.interface.js";
import { BookEntity } from "../../entities/book.entity.js";

export class DeleteBookRepository implements IDeleteBookRepository {
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

  async delete(id: number): Promise<void> {
    await this.em.transactional(async (em) => {
      const entity = await em.findOne(BookEntity, { id });
      if (!entity) throw new Error("Book not found");
      em.remove(entity);
      await em.flush();
    });
  }
}
