import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../infrastructure/mikro-orm.config.js";
import { CreateBookRepository } from "../infrastructure/database/sqlite/repositories/books/create-book.repository.js";
import { GetBookRepository } from "../infrastructure/database/sqlite/repositories/books/get-book.repository.js";
import { ListBooksRepository } from "../infrastructure/database/sqlite/repositories/books/list-books.repository.js";
import { UpdateBookRepository } from "../infrastructure/database/sqlite/repositories/books/update-book.repository.js";
import { DeleteBookRepository } from "../infrastructure/database/sqlite/repositories/books/delete-book.repository.js";
import { CreateBookUseCase } from "../application/use-cases/books/create-book/create-book.use-case.js";
import { GetBookUseCase } from "../application/use-cases/books/get-book/get-book.use-case.js";
import { ListBooksUseCase } from "../application/use-cases/books/list-books/list-books.use-case.js";
import { UpdateBookUseCase } from "../application/use-cases/books/update-book/update-book.use-case.js";
import { DeleteBookUseCase } from "../application/use-cases/books/delete-book/delete-book.use-case.js";
import { BooksController } from "./controllers/books/books.controller.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello from Clean Architecture Express + MikroORM!" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

async function bootstrap() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  const createBookRepo = new CreateBookRepository(em);
  const getBookRepo = new GetBookRepository(em);
  const listBooksRepo = new ListBooksRepository(em);
  const updateBookRepo = new UpdateBookRepository(em);
  const deleteBookRepo = new DeleteBookRepository(em);

  const createBookUseCase = new CreateBookUseCase(createBookRepo);
  const getBookUseCase = new GetBookUseCase(getBookRepo);
  const listBooksUseCase = new ListBooksUseCase(listBooksRepo);
  const updateBookUseCase = new UpdateBookUseCase(updateBookRepo);
  const deleteBookUseCase = new DeleteBookUseCase(deleteBookRepo);

  const booksController = new BooksController(
    createBookUseCase,
    getBookUseCase,
    listBooksUseCase,
    updateBookUseCase,
    deleteBookUseCase,
  );

  app.post("/books", (req, res) => booksController.create(req, res));
  app.get("/books", (req, res) => booksController.list(req, res));
  app.get("/books/:id", (req, res) => booksController.getById(req, res));
  app.patch("/books/:id", (req, res) => booksController.update(req, res));
  app.delete("/books/:id", (req, res) => booksController.delete(req, res));

  console.log("MikroORM connected to SQLite database");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

bootstrap().catch(console.error);
