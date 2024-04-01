import React, { useRef, useState } from "react";
import {
  SearchArgs,
  SearchBarDisplay,
  SearchControl,
  SearchControlProps,
  SearchControlRef,
} from "../custom/search-control";
import MainWrapper from "./main-wrapper";
import { ErrorBoundary } from "react-error-boundary";
import { DataWrapper, DataWrapperProps } from "./data-wrapper";
import { ChildrenProps } from "@/lib/props/base-props";
import { SearchErrorFallback } from "../errors/search-error-fallback";

interface Props extends ChildrenProps, SearchControlProps, DataWrapperProps {
  inViewEl?: React.ReactNode;
  graphEl?: React.ReactNode;
  searchBarDisp?: SearchBarDisplay;
}

export default function SearchWrapper(props: Props) {
  const {
    error,
    onSearch,
    isPending,
    children,
    inViewEl,
    graphEl,
    searchBarDisp,
  } = props;

  const dataWrapperRef = useRef<HTMLDivElement>(null);
  const searchControlRef = useRef<SearchControlRef>(null);
  const isGraphExists = graphEl !== undefined;
  const [graphVisible, setGraphVisible] = useState(false);

  function handleSearch(args: SearchArgs): void {
    if (dataWrapperRef.current) dataWrapperRef.current.scrollTop = 0;
    onSearch(args);
  }

  return (
    <>
      <SearchControl
        ref={searchControlRef}
        {...props}
        onSearch={handleSearch}
        showGraphButton={isGraphExists}
        graphVisible={graphVisible}
        display={searchBarDisp}
        onGraphVisibleChange={setGraphVisible}
      />
      <MainWrapper>
        <ErrorBoundary
          fallbackRender={SearchErrorFallback}
          onReset={() => searchControlRef?.current?.search()}
        >
          <DataWrapper
            ref={dataWrapperRef}
            isPending={isPending}
            error={error}
            inView={inViewEl}
          >
            {children}
          </DataWrapper>
        </ErrorBoundary>
      </MainWrapper>
      {graphVisible && graphEl}
    </>
  );
}
