import { Book } from "../../../../domain/books/book.entity.js";

export interface IDeleteBookRepository {
  getById(id: number): Promise<Book | null>;
  delete(id: number): Promise<void>;
}
