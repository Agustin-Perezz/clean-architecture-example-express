import { Entity } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/core";
import { User } from "./user.entity.js";
import crypto from "crypto";

let ormInstance: MikroORM | null = null;
let emInstance: ReturnType<MikroORM["em"]["fork"]> | null = null;

async function getEm() {
  if (!ormInstance) {
    ormInstance = await MikroORM.init({
      driver: (await import("@mikro-orm/sqlite")).SqliteDriver,
      dbName: "./data/wrong.db",
      entities: [User],
    });
    emInstance = ormInstance.em.fork();
  }
  return emInstance!;
}

@Entity()
export class UserRepository {
  async findAll(): Promise<User[]> {
    const em = await getEm();
    return await em.findAll(User, {});
  }

  async findById(id: number): Promise<User | null> {
    const em = await getEm();
    return await em.findOne(User, { id });
  }

  async findByEmail(email: string): Promise<User | null> {
    const em = await getEm();
    return await em.findOne(User, { email });
  }

  async create(user: User): Promise<Omit<User, "password">> {
    const em = await getEm();
    user.password = this.hashPassword(user.password);
    await em.persist(user);
    await em.flush();
    const result = { ...user } as User & { password: string };
    void result.password;
    const { password: _password, ...rest } = result;
    void _password;
    return rest as Omit<User, "password">;
  }

  async update(
    id: number,
    data: Partial<User>,
  ): Promise<Omit<User, "password"> | null> {
    const em = await getEm();
    const user = await em.findOne(User, { id });
    if (!user) return null;
    Object.assign(user, data);
    await em.flush();
    const result = { ...user } as User & { password: string };
    void result.password;
    const { password: _password, ...rest } = result;
    void _password;
    return rest as Omit<User, "password">;
  }

  async delete(id: number): Promise<boolean> {
    const em = await getEm();
    const user = await em.findOne(User, { id });
    if (!user) return false;
    await em.remove(user);
    await em.flush();
    return true;
  }

  async query(sql: string): Promise<unknown[]> {
    const em = await getEm();
    const result = await (
      em as unknown as {
        getConnection(): { execute(sql: string): Promise<unknown[]> };
      }
    )
      .getConnection()
      .execute(sql);
    return result;
  }

  private hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) return false;
    return user.password === this.hashPassword(password);
  }
}

export { User };
