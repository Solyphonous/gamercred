import { Pool } from "pg";
import { POSTGRES_PW } from "$env/static/private";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gamercred",
  password: POSTGRES_PW,
  port: 5432,
});

export function query(text: string, params: string[]) {
  pool.query(text, params);
}
