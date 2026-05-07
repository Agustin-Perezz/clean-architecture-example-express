import type { Request, Response } from "express";
import type { CreateBookUseCase } from "../../../application/use-cases/books/create-book/create-book.use-case.js";
import type { GetBookUseCase } from "../../../application/use-cases/books/get-book/get-book.use-case.js";
import type { ListBooksUseCase } from "../../../application/use-cases/books/list-books/list-books.use-case.js";
import type { UpdateBookUseCase } from "../../../application/use-cases/books/update-book/update-book.use-case.js";
import type { DeleteBookUseCase } from "../../../application/use-cases/books/delete-book/delete-book.use-case.js";

export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBookUseCase: GetBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createBookUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      const status = message.includes("already exists") ? 409 : 500;
      res.status(status).json({ error: message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await this.getBookUseCase.execute(id);
      if (!result) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ error: message });
    }
  }

  async list(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.listBooksUseCase.execute();
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ error: message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await this.updateBookUseCase.execute(id, req.body);
      if (!result) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ error: message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await this.deleteBookUseCase.execute(id);
      if (!result.success) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ error: message });
    }
  }
}
