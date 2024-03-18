import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "../utils";
interface Props<T> {
  baseItems: T[] | undefined;
  count: number;
  test?: boolean;
}

export function useVirtualized<T>({ baseItems, count, test }: Props<T>) {
  const [items, setItems] = useState<T[]>();
  const { inView, ref } = useInView({ threshold: 0 });
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

  const inViewEl = (
    <div
      ref={ref}
      className={cn(
        items?.length === baseItems?.length ? "" : "pt-1",
        test ? "bg-red-500" : "",
      )}
    >
      {test ? inView.toString() : undefined}
    </div>
  );

  return {
    ref,
    inViewEl,
    isInView: inView,
    items,
  };
}
