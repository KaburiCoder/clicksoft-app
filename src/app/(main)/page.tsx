import React from "react";
import Test from "../test";
import MainHeader from "@/components/(main)/header/header";
import Logo from "@/components/custom/logo";

export default function MainPage() {
  return (
    <>
      <MainHeader hideBackButton>
        <Logo />
      </MainHeader>
      <Test />
    </>
  );
}
