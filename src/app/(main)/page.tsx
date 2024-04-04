import React from "react";
import MainHeader from "@/components/(main)/header/header";
import Logo from "@/components/custom/logo";
import MainBody from "@/components/(main)/main-body";

export default function MainPage() {
  return (
    <>
      <MainHeader hideBackButton>
        <Logo />
      </MainHeader>
      <MainBody />
    </>
  );
}
