import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { DATABASE_URL, DATABASE_CERTIFICATE } from "$env/static/private";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    ca: Buffer.from(DATABASE_CERTIFICATE, "base64").toString(),
    rejectUnauthorized: true,
  }
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
