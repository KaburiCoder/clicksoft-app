"use client";
import MainHeader from "@/components/(main)/header/header";
import { useSearchDataStore } from "@/stores/search-data.store";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    slug: string[];
  };
}
export default function ScanModalPage({ params: { slug } }: Props) {
  let id = slug?.[0];
  const { scanImage } = useSearchDataStore();
  const item = scanImage?.data?.find((d) => d.id === id);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const image = item?.image;
    if (!image) return;

    const blob = new Blob([image], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    setImageUrl(imageUrl);
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [item?.image]);

  useEffect(() => { }, [item?.image]);

  return (
    <>
      <div className="fixed inset-0 left-0 top-0 z-[51] flex h-full w-full flex-col bg-white">
        <MainHeader className="border-b" showOnlyBackButton />
        <div className="overflow-auto ">
          <img
            className="max-w-[99rem] object-left-top"
            src={imageUrl}
            alt="a"
          />
        </div>
      </div>
    </>
  );
}
