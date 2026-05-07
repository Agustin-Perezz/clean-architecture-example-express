import { SqliteDriver } from "@mikro-orm/sqlite";

export default {
  driver: SqliteDriver,
  dbName: "./data/database.db",
  entities: ["./src/infrastructure/database/sqlite/entities/**/*.entity.ts"],
  entitiesTs: ["./src/infrastructure/database/sqlite/entities/**/*.entity.ts"],
};
