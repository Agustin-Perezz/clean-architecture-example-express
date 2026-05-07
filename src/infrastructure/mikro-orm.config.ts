import { SqliteDriver } from "@mikro-orm/sqlite";

export default {
  driver: SqliteDriver,
  dbName: "./data/database.db",
  entities: ["./src/domain/**/*.entity.ts"],
  entitiesTs: ["./src/domain/**/*.entity.ts"],
};
