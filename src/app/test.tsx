"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/sockets/socket.provider";
import usePatientStore from "@/stores/patient.store";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Test() {
  const { socket } = useSocket();
  useEffect(() => {
    console.log("in");

    return () => {
      console.log("out");
    };
  }, []);
  const { data, status, update } = useSession();
  const [i, setI] = useState(0);
  const [s, setS] = useState("");
  const { patInfo } = usePatientStore()
  useEffect(() => {
    setS(JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <div>{status}</div>
      {i}
      {s}
      <Button onClick={() => socket?.connect()}>소켓연결</Button>
      <Button
        onClick={() => {
          socket?.disconnect();
        }}
      >
        끊기
      </Button>
      <Button onClick={() => signOut()}>signout</Button>
      <Button onClick={() => update()}>session update</Button>
      <Button onClick={() => setI(i + 1)}>int update</Button>
      <Badge>{patInfo?.suName}</Badge>
    </div>
  );
}
