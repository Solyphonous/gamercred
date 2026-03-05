import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { env } from "$env/dynamic/private";

export async function query(
  text: string,
  params: string[] = [],
): Promise<QueryResult<QueryResultRow>> {
  try {
    const pool = new Pool({
      connectionString: env.DATABASE_URL,
      ssl: {
        ca: Buffer.from(env.DATABASE_CERTIFICATE, "base64").toString(),
        rejectUnauthorized: true,
      }
    });

    const result: QueryResult<QueryResultRow> = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
