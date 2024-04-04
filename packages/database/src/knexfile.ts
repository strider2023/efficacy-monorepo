import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_CLIENT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SSL } =
  process.env;
// import { Config } from 'knex';

// https://www.basedash.com/blog/how-to-configure-knex-js-with-typescript
const config: Knex.Config = {
  client: DB_CLIENT || 'pg',
  connection: {
    host: DB_HOST || "localhost",
    port: parseInt(DB_PORT || "5432"),
    user: DB_USERNAME || "test",
    password: DB_PASSWORD || "test",
    database: DB_DATABASE || "efficacy",
    ssl: DB_SSL ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

export default config;
