import React, { useRef } from "react";
import {
  SearchArgs,
  SearchControl,
  SearchControlProps,
  SearchControlRef,
} from "../custom/search-control";
import MainWrapper from "./main-wrapper";
import { ErrorBoundary } from "react-error-boundary";
import { DataWrapper, DataWrapperProps } from "./data-wrapper";
import { ChildrenProps } from "@/lib/props/base-props";
import { SearchErrorFallback } from "../errors/search-error-fallback";

interface Props extends ChildrenProps, SearchControlProps, DataWrapperProps { }

export default function SearchWrapper({
  error,
  onSearch,
  isPending,
  children,
  defaultDateRange,
}: Props) {
  const dataWrapperRef = useRef<HTMLDivElement>(null);
  const searchControlRef = useRef<SearchControlRef>(null);

  function handleSearch(args: SearchArgs): void {
    if (dataWrapperRef.current) dataWrapperRef.current.scrollTop = 0;
    onSearch(args);
  }

  return (
    <MainWrapper>
      <SearchControl
        defaultDateRange={defaultDateRange}
        ref={searchControlRef}
        onSearch={handleSearch}
        isPending={isPending}
      />
      <ErrorBoundary
        fallbackRender={SearchErrorFallback}
        onReset={() => searchControlRef?.current?.search()}
      >
        <DataWrapper ref={dataWrapperRef} isPending={isPending} error={error}>
          {children}
        </DataWrapper>
      </ErrorBoundary>
    </MainWrapper>
  );
}
