import { ChildrenClassNameProps, ChildrenProps } from "@/lib/props/base-props";
import SearchDataHeader, { SearchDataHeaderProps } from "./search-data-header";
import { cn } from "@/lib/utils";

interface Props extends SearchDataHeaderProps, ChildrenClassNameProps {
  childrenClassName?: string;
  noBorder?: boolean;
  noShadow?: boolean;
}

export function SearchDataBox({
  contents,
  children,
  className,
  noBorder,
  noShadow,
  childrenClassName,
}: Props) {
  return (
    <div
      className={cn(
        "border-primary-sm shadow-xl",
        noBorder ? "" : "border",
        noShadow ? "" : "shadow-xl",
        className,
      )}
    >
      <SearchDataHeader contents={contents} />
      <div className={cn("whitespace-pre-wrap p-2", childrenClassName)}>
        {children}
      </div>
    </div>
  );
}
