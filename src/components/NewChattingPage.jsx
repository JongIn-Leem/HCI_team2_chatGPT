import { Prompt } from "@/components";
import { useState } from "react";
import classNames from "classnames";

export const NewChattingPage = ({
  chatRef,
  setBottomPadding,
  isResponding,
  setIsResponding,
  responseInterruptRef,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartTransition = () => {
    setIsTransitioning(true);
  };

  return (
    <div className="relative w-full h-full">
      <div
        className={classNames(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-40 transition-opacity",
          {
            "opacity-0": isTransitioning,
            "opacity-100": !isTransitioning,
          }
        )}
      >
        <p className="text-3xl font-medium mb-10">무엇을 도와드릴까요?</p>
      </div>
      <div
        className={classNames(
          "absolute top-1/2 -translate-x-1/2 left-1/2 transition-all duration-300 shadow-md rounded-3xl",
          {
            "-translate-y-20": !isTransitioning,
            "translate-y-70": isTransitioning,
          }
        )}
      >
        <Prompt
          chatRef={chatRef}
          setBottomPadding={setBottomPadding}
          isResponding={isResponding}
          setIsResponding={setIsResponding}
          responseInterruptRef={responseInterruptRef}
          onSendStartTransition={handleStartTransition}
        />
      </div>
    </div>
  );
};
