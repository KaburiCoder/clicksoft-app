import { useEffect, useRef, useState } from "react";
import { useInViewEx } from "./use-in-view-ex";
interface Props<T> {
  baseItems: T[] | undefined;
  count: number;
  test?: boolean;
}

export function useVirtualized<T>({ baseItems, count, test }: Props<T>) {
  const [items, setItems] = useState<T[]>();
  const { inView, inViewEl, ref } = useInViewEx();
  const isFirstRef = useRef<boolean>(true);

  useEffect(() => {
    if (!items || items.length === 0) {
      if (baseItems?.length === 0) return;
    }

    if (!isFirstRef.current) {
      setItems(undefined);
    }
    isFirstRef.current = false;
  }, [baseItems]);

  useEffect(() => {
    if (!inView) return;

    setItems((prevItems) => {
      const itemsLength = prevItems?.length ?? 0;
      const sliceItems = baseItems?.slice(itemsLength, itemsLength + count);

      return [...(prevItems ?? []), ...(sliceItems ?? [])];
    });
  }, [inView, baseItems, setItems, count]);

  return {
    ref,
    inViewEl,
    isInView: inView,
    items,
  };
}
