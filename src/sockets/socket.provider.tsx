"use client";
import { Socket, io } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "../lib/props/base-props";
import { useSessionEx } from "../lib/hooks/useSessionEx";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const initialze: SocketContextType = { socket: null, isConnected: false };
const SocketContext = createContext<SocketContextType>(initialze);

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider({ children }: ChildrenProps) {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const url = process?.env?.NEXT_PUBLIC_SOCKET_BACKEND_URL;
    if (!url) return;
    const socket = io(url, { transports: ["websocket"] });

    socket.on("connect", async () => {
      setIsConnected(true);
    });
    socket.on("disconnect", async () => {
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
