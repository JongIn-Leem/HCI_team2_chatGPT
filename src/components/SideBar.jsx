import * as Icons from "@/assets/svg";
import { useSideBar, useChatting } from "@/contexts";
import { ProjectBox, ChattingBox } from "@/components";
import { useState } from "react";

export const SideBar = () => {
  const { sideBarToggle } = useSideBar();
  const {
    chatList,
    currentChat,
    setCurrentChat,
    projectList,
    currentProject,
    setCurrentProject,
  } = useChatting();
  const [kebabOpen, setKebabOpen] = useState({ type: null, id: null });

  return (
    <div className="fixed top-0 left-0 z-20 w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-300 transition-transform duration-300 overflow-visible">
      <div className="w-full p-2 border-b border-gray-300 flex items-center justify-between">
        <Icons.ChatGPTLogo
          className="p-2 w-10 h-10 rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => {
            setCurrentChat(null);
            setCurrentProject(null);
          }}
        />
        <Icons.SideBar
          className={`p-2 w-10 h-10 text-gray-400 rounded-md cursor-pointer hover:bg-gray-200 `}
          onClick={sideBarToggle}
        />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-start">
        <div className="w-full flex flex-col items-start p-3">
          <div
            className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200"
            onClick={() => {
              setCurrentChat(null);
              setCurrentProject(null);
            }}
          >
            <Icons.NewChat className="p-2.5 w-10 h-10"></Icons.NewChat>
            <p className="text-base">새 채팅</p>
          </div>
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200">
            <Icons.Search className="p-2.5 w-10 h-10"></Icons.Search>
            <p className="text-base">채팅 검색</p>
          </div>
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200">
            <Icons.Text className="p-2.75 w-10 h-10"></Icons.Text>
            <p className="text-base">라이브러리</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200">
            <Icons.Plus className="p-2.5 w-10 h-10"></Icons.Plus>
            <p className="text-base">새 프로젝트</p>
          </div>
          {projectList.map((project) => (
            <ProjectBox
              key={project.id}
              project={project}
              isActive={currentProject?.id === project.id}
              isKebabOpen={
                kebabOpen?.type === "project" && kebabOpen?.id === project.id
              }
              setKebabOpen={setKebabOpen}
            />
          ))}
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2.5 w-10 h-10"></Icons.Grid>
            <p className="text-base">GPT</p>
          </div>
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200">
            <Icons.Speak className="p-2.5 w-10 h-10"></Icons.Speak>
            <p className="text-base">Sora</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <p className="text-gray-400 m-2 text-base">어제</p>
          {[...chatList]
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((chat) => (
              <ChattingBox
                key={chat.id}
                chat={chat}
                isActive={currentChat?.id === chat.id}
                isKebabOpen={
                  kebabOpen?.type === "chat" && kebabOpen?.id === chat.id
                }
                setKebabOpen={setKebabOpen}
              />
            ))}
        </div>
      </div>
      <div className="w-full border-t p-2 border-gray-300">
        <div className="hover:bg-gray-200 rounded-xl p-2 flex items-center">
          <Icons.Plan className="p-2 w-10 h-10"></Icons.Plan>
          <div className="flex flex-col items-start ml-2 mr-2">
            <p className="text-sm">플랜 보기</p>
            <p className="text-xs text-gray-500 text-left">
              제한 없는 액세스, 팀 기능, 그 외에 많은 것들
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
