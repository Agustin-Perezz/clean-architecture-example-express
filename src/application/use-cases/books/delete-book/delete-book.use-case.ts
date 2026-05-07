import { Book } from "../../../../domain/books/book.entity.js";
import { IDeleteBookRepository } from "./delete-book.repository.interface.js";
import { DeleteBookResponseDto } from "./delete-book.response.dto.js";

export class DeleteBookUseCase {
  constructor(private readonly repository: IDeleteBookRepository) {}

  async execute(id: number): Promise<DeleteBookResponseDto> {
    const book: Book | null = await this.repository.getById(id);
    if (!book) return new DeleteBookResponseDto(false);

    await this.repository.delete(id);
    return new DeleteBookResponseDto(true);
  }
}
