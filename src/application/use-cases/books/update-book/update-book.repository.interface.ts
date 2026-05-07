import { Book } from "../../../../domain/books/book.entity.js";

export interface IUpdateBookRepository {
  getById(id: number): Promise<Book | null>;
  update(book: Book): Promise<Book>;
}
