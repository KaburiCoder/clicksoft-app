"use client";
import React, { useEffect, useRef, useState } from "react";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths, paths } from "@/paths";
import { useSearchDataStore } from "@/stores/search-data.store";
import { ScanImage } from "@/sockets/models/scan-image";
import { Scan } from "@/sockets/models/scan";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomDrawer, {
  CustomDrawerRef,
} from "@/components/custom/drawer/drawer";

interface Props {
  scan: Scan;
  trigger: React.ReactNode;
}

export default function ScanImagesDrawer({ scan, trigger }: Props) {
  const drawerRef = useRef<CustomDrawerRef>(null);
  const { scanImage } = useSearchDataStore();
  const wheelRef = useRef<HTMLDivElement>(null);
  const { items, inViewEl, handleSearch, isPending } = useEmit<ScanImage>({
    eventName: emitPaths.getScanImage,
    searchState: scanImage,
  });

  useEffect(() => {
    console.log(items);
  }, [items]);

  const components = items?.map((item) => (
    <DrawerInImage key={item.id} scanImage={item} />
  ));

  function handleOpen(): void {
    handleSearch(null, { id: scan.id, code: scan.code });
    drawerRef.current?.open();
  }

  useEffect(() => {
    if (!wheelRef.current) return;

    function handleScroll(this: HTMLDivElement, e: WheelEvent) {
      e.preventDefault();
      const container = wheelRef.current;
      if (container) {
        container.scrollLeft += e.deltaY;
      }
    }

    wheelRef.current.addEventListener("wheel", handleScroll);
    return () => {
      wheelRef.current?.removeEventListener("wheel", handleScroll);
    };
  }, [wheelRef.current]);

  return (
    <>
      <div onClick={handleOpen}>{trigger}</div>
      <CustomDrawer
        ref={drawerRef}
        className="flex flex-col bg-white p-4"
        anchor="bottom"
      >
        <h2 className="text-xl font-semibold">기록지 리스트</h2>
        <div className="text-base text-gray-500">
          이미지를 선택하면 크게 볼 수 있어요.
        </div>
        <div
          ref={wheelRef}
          className="flex h-52 gap-2 overflow-x-auto whitespace-nowrap p-2"
        >
          {isPending && <div>조회 중..</div>}
          {components}
          {inViewEl}
        </div>
      </CustomDrawer>
    </>
  );
}

interface DrawerInImageProps {
  scanImage: ScanImage;
}

function DrawerInImage({ scanImage: { id, image } }: DrawerInImageProps) {
  const { push } = useRouter();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (image.length === 0) return;

    const blob = new Blob([image], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    setImageUrl(imageUrl);
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);

  if (imageUrl) {
    return (
      <Image
        className="h-full w-44 flex-shrink-0 overflow-hidden rounded border border-primary object-cover transition-all hover:scale-105 hover:cursor-pointer"
        onClick={() => push(paths.scanViewer(id))}
        onDragStart={(e) => e.preventDefault()}
        src={imageUrl}
        alt="스캔 이미지"
        width={200}
        height={200}
      />
    );
  }

  return (
    <div className="h-44 w-44 flex-shrink-0 overflow-hidden rounded border border-primary object-cover">
      로딩중..
    </div>
  );
}
