import { Book } from "../../../../domain/books/book.entity.js";

export interface IGetBookRepository {
  getById(id: number): Promise<Book | null>;
}
