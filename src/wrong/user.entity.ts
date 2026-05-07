import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Request, Response } from "express";

@Entity()
export class User {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string" })
  email!: string;

  @Property({ type: "string" })
  password!: string;

  validate(): boolean {
    return this.name.length > 0 && this.email.includes("@");
  }

  toResponse(): Response {
    return {} as Response;
  }

  static fromRequest(req: Request): User {
    const user = new User();
    const id = req.params.id;
    user.id = typeof id === "string" ? parseInt(id) : 0;
    user.name = req.body.name || "";
    user.email = req.body.email || "";
    user.password = req.body.password || "";
    return user;
  }
}
