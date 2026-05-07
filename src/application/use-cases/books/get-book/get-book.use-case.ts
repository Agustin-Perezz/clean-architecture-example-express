import { Book } from "../../../../domain/books/book.entity.js";
import { IGetBookRepository } from "./get-book.repository.interface.js";
import { GetBookResponseDto } from "./get-book.response.dto.js";

export class GetBookUseCase {
  constructor(private readonly repository: IGetBookRepository) {}

  async execute(id: number): Promise<GetBookResponseDto | null> {
    const book: Book | null = await this.repository.getById(id);
    if (!book) return null;

    return new GetBookResponseDto({
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      isAvailable: book.isAvailable,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
    });
  }
}
