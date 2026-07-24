/**
 * Whether a real database is configured. When false, the app runs on the
 * sample catalog and orders are returned ephemerally (not persisted).
 */
export function dbConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(url) && !url!.includes("user:password@host");
}
