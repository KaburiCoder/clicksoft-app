import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
interface Props<T> {
  baseItems: T[] | undefined;
  count: number;
}

export function useVirtualized<T>({ baseItems, count }: Props<T>) {
  const [items, setItems] = useState<T[]>();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const isFirstRef = useRef<boolean>(true);

  console.log(isInView);

  useEffect(() => {
    if (!items || items.length === 0) return;

    if (!isFirstRef.current) {
      setItems(undefined);
    }
    isFirstRef.current = false;
  }, [baseItems]);

  useEffect(() => {
    if (!isInView) return;

    setItems((prevItems) => {
      const itemsLength = prevItems?.length ?? 0;
      const sliceItems = baseItems?.slice(itemsLength, itemsLength + count);

      return [...(prevItems ?? []), ...(sliceItems ?? [])];
    });
  }, [isInView, baseItems, setItems, count]);

  const inViewEl = (
    <div
      ref={ref}
      className={items?.length === baseItems?.length ? "" : "pt-1"}
    />
  );

  return {
    inViewEl,
    isInView,
    items,
  };
}
