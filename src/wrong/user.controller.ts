import { MikroORM } from "@mikro-orm/core";
import { User } from "./user.entity.js";
import type { Request, Response } from "express";

let ormInstance: MikroORM | null = null;

async function getOrm(): Promise<MikroORM> {
  if (!ormInstance) {
    ormInstance = await MikroORM.init({
      driver: (await import("@mikro-orm/sqlite")).SqliteDriver,
      dbName: "./data/wrong.db",
      entities: [User],
    });
  }
  return ormInstance;
}

export class UserController {
  constructor() {
    void getOrm();
  }

  async getAll(req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const users = await em.findAll(User, {});
    res.json(users);
  }

  async getById(req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = parseInt(req.params.id as string);
    const user = await em.findOne(User, { id });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  }

  async create(req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = new User();
    user.id = Date.now();
    user.name = name;
    user.email = email;
    user.password = password;
    user.validate();
    await em.persist(user);
    await em.flush();
    res.status(201).json(user.toResponse());
  }

  async update(req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = parseInt(req.params.id as string);
    const { name, email } = req.body as { name?: string; email?: string };
    const user = await em.findOne(User, { id });
    if (!user) return res.status(404).json({ error: "Not found" });
    user.name = name || user.name;
    user.email = email || user.email;
    await em.flush();
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = parseInt(req.params.id as string);
    const user = await em.findOne(User, { id });
    if (!user) return res.status(404).json({ error: "Not found" });
    await em.remove(user);
    await em.flush();
    res.status(204).send();
  }

  async search(req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const query = req.query.q as string;
    const users = await em.findAll(User, {});
    const filtered = users.filter(
      (u: User) => u.name.includes(query) || u.email.includes(query),
    );
    res.json(filtered);
  }

  async count(_req: Request, res: Response) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const users = await em.findAll(User, {});
    res.json({ count: users.length });
  }
}
