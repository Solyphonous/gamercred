import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { env } from "$env/dynamic/private";

const pool = new Pool({
  user: "postgres",
  host: env.PROD == "true" ? "db" : "localhost",
  database: "gamercred",
  password: env.POSTGRES_PW,
  port: 5432,
});

export async function query(
  text: string,
  params: string[] = [],
): Promise<QueryResult<QueryResultRow>> {
  try {
    const result: QueryResult<QueryResultRow> = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
