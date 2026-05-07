export type CreateBookParams = {
  title: string;
  author: string;
  isbn: string;
};

export type UpdateBookParams = Partial<CreateBookParams> & {
  isAvailable?: boolean;
};

export class Book {
  private readonly _id: number;
  private _title: string;
  private _author: string;
  private _isbn: string;
  private _isAvailable: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: {
    id: number;
    title: string;
    author: string;
    isbn: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = params.id;
    this._title = params.title;
    this._author = params.author;
    this._isbn = params.isbn;
    this._isAvailable = params.isAvailable;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  static create(params: CreateBookParams): Book {
    return new Book({
      id: 0,
      title: params.title,
      author: params.author,
      isbn: params.isbn,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(params: {
    id: number;
    title: string;
    author: string;
    isbn: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): Book {
    return new Book(params);
  }

  update(params: UpdateBookParams): void {
    if (params.title !== undefined) this._title = params.title;
    if (params.author !== undefined) this._author = params.author;
    if (params.isbn !== undefined) this._isbn = params.isbn;
    if (params.isAvailable !== undefined)
      this._isAvailable = params.isAvailable;
    this._updatedAt = new Date();
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get isbn(): string {
    return this._isbn;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
