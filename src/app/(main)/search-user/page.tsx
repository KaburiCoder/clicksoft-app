import MainHeader from "@/components/(main)/header/header";
import SearchUser from "@/components/(main)/search-user/search-user";

import React from "react";

export default function SearchUserPage() {
  return (
    <>
      <MainHeader hideSearchUserButton>환자검색</MainHeader>
      <SearchUser />
    </>
  );
}
