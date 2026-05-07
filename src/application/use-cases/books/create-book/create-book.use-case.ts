import { Book } from "../../../../domain/books/book.entity.js";
import { ICreateBookRepository } from "./create-book.repository.interface.js";
import { CreateBookRequestDto } from "./create-book.request.dto.js";
import { CreateBookResponseDto } from "./create-book.response.dto.js";

export class CreateBookUseCase {
  constructor(private readonly repository: ICreateBookRepository) {}

  async execute(dto: CreateBookRequestDto): Promise<CreateBookResponseDto> {
    const exists = await this.repository.existsByIsbn(dto.isbn);
    if (exists) {
      throw new Error("Book with this ISBN already exists");
    }

    const book = Book.create({
      title: dto.title,
      author: dto.author,
      isbn: dto.isbn,
    });

    const savedBook = await this.repository.create(book);

    return new CreateBookResponseDto({
      id: savedBook.id,
      title: savedBook.title,
      author: savedBook.author,
      isbn: savedBook.isbn,
      isAvailable: savedBook.isAvailable,
      createdAt: savedBook.createdAt.toISOString(),
      updatedAt: savedBook.updatedAt.toISOString(),
    });
  }
}
