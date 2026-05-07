import { Book } from "../../../../domain/books/book.entity.js";

export interface IListBooksRepository {
  getAll(): Promise<Book[]>;
}
