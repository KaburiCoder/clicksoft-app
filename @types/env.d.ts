declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URL: string;
    NEXT_PUBLIC_MEASUREMENT_ID: string;
    NEXT_PUBLIC_SOCKET_BACKEND_URL: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_ENV: string;
    
    AUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
  }
}
