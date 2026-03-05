import { env } from '$env/dynamic/private';
export function GET() {
  return new Response(JSON.stringify({
    hasUrl: !!env.DATABASE_URL,
    hasKey: !!env.DATABASE_CERTIFICATE,
  }));
}