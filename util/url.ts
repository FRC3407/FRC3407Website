export function getUrl() {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000"
  );
}
