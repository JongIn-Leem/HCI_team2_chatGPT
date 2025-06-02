import * as Icons from "@/assets/svg";
import { Prompt, ProjectChattingBox } from "@/components";
import { useChatting } from "@/contexts";
import { useState } from "react";
import classNames from "classnames";

export const ProjectDetailPage = ({
  chatRef,
  setBottomPadding,
  isResponding,
  setIsResponding,
  responseInterruptRef,
  setIsGPT,
}) => {
  const { chatList, currentProject } = useChatting();
  const [kebabOpen, setKebabOpen] = useState({ type: null, id: null });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartTransition = () => {
    setIsTransitioning(true);
  };

  return (
    <>
      <div className="w-full overflow-y-auto flex flex-col justify-start items-center mt-20">
        <div
          className={classNames(
            "flex justify-center items-center mb-8 transition-opacity",
            {
              "opacity-0": isTransitioning,
              "opacity-100": !isTransitioning,
            }
          )}
        >
          <Icons.Folder className="p-2 w-10 h-10 mr-2" />
          <p className="text-3xl font-medium">{currentProject.title}</p>
        </div>
        <div
          className={classNames("duration-300 shadow-md rounded-3xl mb-8", {
            "translate-y-145": isTransitioning,
          })}
        >
          <Prompt
            chatRef={chatRef}
            setBottomPadding={setBottomPadding}
            isResponding={isResponding}
            setIsResponding={setIsResponding}
            responseInterruptRef={responseInterruptRef}
            onSendStartTransition={handleStartTransition}
            setIsGPT={setIsGPT}
          />
        </div>
        <div
          className={classNames(
            "w-200 flex flex-col justify-start items-center transition-opacity",
            {
              "opacity-0": isTransitioning,
              "opacity-100": !isTransitioning,
            }
          )}
        >
          <div className="w-full h-22 mb-5 flex">
            <div className="w-1/2 h-full px-3 flex justify-between items-center rounded-tl-3xl rounded-bl-3xl border-1 border-gray-200 hover:bg-gray-100 cursor-pointer">
              <div className="p-2 h-full flex flex-col justify-center items-start">
                <p className="text-base font-semibold">파일 추가</p>
                <p className="text-sm text-gray-500">
                  이 프로젝트의 파일이 콘텐츠에 액세스할 수 있습니다
                </p>
              </div>
              <Icons.NewFile className="p-2 mr-2 w-10 h-10" />
            </div>
            <div className="w-1/2 h-full px-3 flex justify-between items-center rounded-tr-3xl rounded-br-3xl border-1 border-gray-200 hover:bg-gray-100 cursor-pointer">
              <div className="p-2 h-full flex flex-col justify-center items-start">
                <p className="text-base font-semibold">지침 추가</p>
                <p className="text-sm text-gray-500">
                  ChatGPT가 프로젝트에 응답하는 방식을 직접 짜세요
                </p>
              </div>
              <Icons.Pen className="p-2 mr-2 w-10 h-10" />
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            {[...chatList]
              .filter((chat) => chat.project === currentProject?.id)
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((chat) => (
                <ProjectChattingBox
                  key={chat.id}
                  chat={chat}
                  isActive={false}
                  isKebabOpen={
                    kebabOpen?.type === "chat" && kebabOpen?.id === chat.id
                  }
                  setKebabOpen={setKebabOpen}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
