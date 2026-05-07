import { Book } from "../../../../domain/books/book.entity.js";

export interface ICreateBookRepository {
  create(book: Book): Promise<Book>;
  existsByIsbn(isbn: string): Promise<boolean>;
}
