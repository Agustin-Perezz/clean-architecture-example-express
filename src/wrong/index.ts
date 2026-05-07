import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { User } from "./user.entity.js";
import { UserService } from "./user.service.js";

const app = express();
const port = 3001;

app.use(express.json());

const db = await MikroORM.init({
  driver: (await import("@mikro-orm/sqlite")).SqliteDriver,
  dbName: "./data/wrong.db",
  entities: [User],
});

const em = db.em;
const service = new UserService();

app.get("/health", (req, res) => {
  res.json({ status: "ok", db: "connected" });
});

app.get("/users", async (req, res) => {
  const users = await em.findAll(User, {});
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await em.findOne(User, { id });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password too short" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const user = new User();
  user.id = Date.now();
  user.name = name;
  user.email = email;
  user.password = password;
  await em.persist(user);
  await em.flush();
  console.log(`User created: ${user.email}`);
  res.status(201).json(user);
});

app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = await em.findOne(User, { id });
  if (!user) return res.status(404).json({ error: "User not found" });
  if (email && !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  user.name = name || user.name;
  user.email = email || user.email;
  await em.flush();
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await em.findOne(User, { id });
  if (!user) return res.status(404).json({ error: "User not found" });
  await em.remove(user);
  await em.flush();
  res.status(204).send();
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result: { status: number; json: Record<string, unknown> } =
    await service.authenticate(email, password);
  res.status(result.status).json(result.json);
});

app.listen(port, () => {
  console.log(`Wrong architecture server running on http://localhost:${port}`);
});
