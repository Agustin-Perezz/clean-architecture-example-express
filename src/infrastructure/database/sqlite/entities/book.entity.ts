import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class BookEntity {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  title!: string;

  @Property({ type: "string" })
  author!: string;

  @Property({ type: "string", unique: true })
  isbn!: string;

  @Property({ type: "boolean", default: true })
  isAvailable: boolean = true;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
