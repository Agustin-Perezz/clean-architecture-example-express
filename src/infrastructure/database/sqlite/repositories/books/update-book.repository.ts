import { type EntityManager } from "@mikro-orm/core";
import { Book } from "../../../../../domain/books/book.entity.js";
import type { IUpdateBookRepository } from "../../../../../application/use-cases/books/update-book/update-book.repository.interface.js";
import { BookEntity } from "../../entities/book.entity.js";

export class UpdateBookRepository implements IUpdateBookRepository {
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

  async update(book: Book): Promise<Book> {
    return this.em.transactional(async (em) => {
      const entity = await em.findOne(BookEntity, { id: book.id });
      if (!entity) throw new Error("Book not found");

      entity.title = book.title;
      entity.author = book.author;
      entity.isbn = book.isbn;
      entity.isAvailable = book.isAvailable;
      entity.updatedAt = new Date();

      await em.flush();

      return Book.reconstitute({
        id: entity.id,
        title: entity.title,
        author: entity.author,
        isbn: entity.isbn,
        isAvailable: entity.isAvailable,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      });
    });
  }
}
