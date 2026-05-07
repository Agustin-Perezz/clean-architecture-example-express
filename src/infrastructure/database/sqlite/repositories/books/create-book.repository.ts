import { type EntityManager } from "@mikro-orm/core";
import { Book } from "../../../../../domain/books/book.entity.js";
import type { ICreateBookRepository } from "../../../../../application/use-cases/books/create-book/create-book.repository.interface.js";
import { BookEntity } from "../../entities/book.entity.js";

export class CreateBookRepository implements ICreateBookRepository {
  constructor(private readonly em: EntityManager) {}

  async create(book: Book): Promise<Book> {
    return this.em.transactional(async (em) => {
      const entity = new BookEntity();
      entity.title = book.title;
      entity.author = book.author;
      entity.isbn = book.isbn;
      entity.isAvailable = book.isAvailable;
      entity.createdAt = book.createdAt;
      entity.updatedAt = book.updatedAt;

      em.persist(entity);
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

  async existsByIsbn(isbn: string): Promise<boolean> {
    const count = await this.em.count(BookEntity, { isbn });
    return count > 0;
  }
}
