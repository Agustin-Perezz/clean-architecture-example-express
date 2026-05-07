import { Book } from "../../../../domain/books/book.entity.js";
import { IUpdateBookRepository } from "./update-book.repository.interface.js";
import { UpdateBookRequestDto } from "./update-book.request.dto.js";
import { UpdateBookResponseDto } from "./update-book.response.dto.js";

export class UpdateBookUseCase {
  constructor(private readonly repository: IUpdateBookRepository) {}

  async execute(
    id: number,
    dto: UpdateBookRequestDto,
  ): Promise<UpdateBookResponseDto | null> {
    const book: Book | null = await this.repository.getById(id);
    if (!book) return null;

    book.update({
      title: dto.title,
      author: dto.author,
      isbn: dto.isbn,
      isAvailable: dto.isAvailable,
    });

    const updatedBook: Book = await this.repository.update(book);

    return new UpdateBookResponseDto({
      id: updatedBook.id,
      title: updatedBook.title,
      author: updatedBook.author,
      isbn: updatedBook.isbn,
      isAvailable: updatedBook.isAvailable,
      createdAt: updatedBook.createdAt.toISOString(),
      updatedAt: updatedBook.updatedAt.toISOString(),
    });
  }
}
