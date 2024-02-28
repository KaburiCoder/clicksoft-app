import { FallbackProps } from "react-error-boundary";
import ButtonL from "../ui/custom/button-l";
import { LottieExPoint } from "../custom/lotties/lottie-search";

export const SearchErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  // Component logic here
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <LottieExPoint />
      <div className="pb-4 text-xl font-bold text-error">{error?.message}</div>
      <ButtonL
        className="min-w-[18rem]"
        variant={"destructive"}
        onClick={() => resetErrorBoundary()}
      >
        다시 시도
      </ButtonL>
    </div>
  );
};
