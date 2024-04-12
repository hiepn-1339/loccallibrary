import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
})
