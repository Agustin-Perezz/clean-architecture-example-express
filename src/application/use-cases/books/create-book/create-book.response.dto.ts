export class CreateBookResponseDto {
  id: number;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(params: {
    id: number;
    title: string;
    author: string;
    isbn: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.author = params.author;
    this.isbn = params.isbn;
    this.isAvailable = params.isAvailable;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
