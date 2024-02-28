"use client";
import { Socket, io } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "../lib/props/base-props";
import { useSessionEx } from "../lib/hooks/use-session-ex";
import { DataType, JoinRoomDto } from "./dtos/join-room.dto";
import { LeaveRoomDto } from "./dtos/leave-room.dto";
import { emitPaths } from "@/paths";

export enum JoinRoomState {
  LEAVE = 0,
  JOIN = 1,
  ERROR = 2,
}

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  joinRoomState: JoinRoomState;
};

const initialze: SocketContextType = {
  socket: null,
  isConnected: false,
  joinRoomState: JoinRoomState.LEAVE,
};
const SocketContext = createContext<SocketContextType>(initialze);

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider({ children }: ChildrenProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [joinRoomState, setJoinRoomState] = useState<JoinRoomState>(
    JoinRoomState.LEAVE,
  );

  const { user } = useSessionEx();

  useEffect(() => {
    if (!socket || !user || !isConnected) return;

    (async () => {
      const joinRoomArgs: JoinRoomDto = {
        key: user.key,
        localId: user.localId,
        dataType: DataType.WEB,
      };

      const isJoined = await socket?.emitWithAck(
        emitPaths.joinRoom,
        joinRoomArgs,
      );
      setJoinRoomState(isJoined ? JoinRoomState.JOIN : JoinRoomState.ERROR);
    })();

    return () => {
      const leaveRoomArgs: LeaveRoomDto = { key: user.key };
      socket?.emit(emitPaths.leaveRoom, leaveRoomArgs);
      setJoinRoomState(JoinRoomState.LEAVE);
    };
  }, [socket, user, isConnected]);

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
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, joinRoomState }}>
      {children}
    </SocketContext.Provider>
  );
}
