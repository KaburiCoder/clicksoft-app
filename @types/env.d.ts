declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URL: string;
    NEXT_PUBLIC_SOCKET_BACKEND_URL: string;
    NEXT_PUBLIC_DOMAIN: string;

    NEXTAUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
  }
}
