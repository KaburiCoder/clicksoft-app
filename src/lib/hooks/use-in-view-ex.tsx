import { useInView } from "react-intersection-observer";

export function useInViewEx() {
  const { inView, ref } = useInView({ threshold: 0.1 });

  const inViewEl = <div ref={ref} className="h-[1px] w-[1px]" />;

  return { ref, inView, inViewEl };
}
