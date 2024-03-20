"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import SocketProvider from "../sockets/socket.provider";
import useMobileVh from "./hooks/use-mobile-vh";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useMobileVh();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>{children}</SocketProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
