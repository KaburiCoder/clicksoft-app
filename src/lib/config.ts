export const APP_URL =
  (process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
    : "http://localhost:3010");
