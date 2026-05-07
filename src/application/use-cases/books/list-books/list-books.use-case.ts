import { Book } from "../../../../domain/books/book.entity.js";
import { IListBooksRepository } from "./list-books.repository.interface.js";
import { ListBooksResponseDto } from "./list-books.response.dto.js";

export class ListBooksUseCase {
  constructor(private readonly repository: IListBooksRepository) {}

  async execute(): Promise<ListBooksResponseDto[]> {
    const books: Book[] = await this.repository.getAll();

    return books.map(
      (book) =>
        new ListBooksResponseDto({
          id: book.id,
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          isAvailable: book.isAvailable,
          createdAt: book.createdAt.toISOString(),
          updatedAt: book.updatedAt.toISOString(),
        }),
    );
  }
}
