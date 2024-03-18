export const APP_URL =
  (process.env.NODE_ENV === "production" ? "https://" : "http://") +
  process.env.NEXT_PUBLIC_DOMAIN;
