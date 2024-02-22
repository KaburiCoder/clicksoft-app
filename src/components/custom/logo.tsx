import { imgPaths } from "@/paths";
import Image from "next/image";
import React from "react";

export default function Logo() {
  return <Image src={imgPaths.logo} alt="로고" width={100} height={100} />;
}
