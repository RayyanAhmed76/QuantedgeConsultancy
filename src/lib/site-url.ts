/** Production site origin. Set NEXT_PUBLIC_SITE_URL on the server (e.g. https://www.example.com). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}
