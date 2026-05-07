import "reflect-metadata";
import express from "express";
import mikroOrmConfig from "../infrastructure/mikro-orm.config.js";
import { MikroORM } from "@mikro-orm/core";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express with MikroORM!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

async function bootstrap() {
  await MikroORM.init(mikroOrmConfig);
  console.log("MikroORM connected to SQLite database");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

bootstrap().catch(console.error);
