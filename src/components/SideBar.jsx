import * as Icons from "@/assets/svg";
import { useSideBar, useChatting } from "@/contexts";
import {
  ProjectBox,
  ChattingBox,
  ChatSearchModal,
  NewProjectModal,
} from "@/components";
import { useState, useEffect } from "react";
import Wolfram from "@/assets/wolfram";
import Canva from "@/assets/Canva";

export const SideBar = ({ isOpen, openProjects = new Set(), setIsGPT }) => {
  const { sideBarToggle, subSideBarToggle } = useSideBar();
  const {
    chatList,
    currentChat,
    setCurrentChat,
    projectList,
    setCurrentProject,
  } = useChatting();
  const [kebabOpen, setKebabOpen] = useState(null);
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsChatSearchOpen(false);
        setIsNewProjectOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`fixed top-0 z-30 w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-300 
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      <div className="w-full p-2 border-b border-gray-300 flex items-center justify-between">
        <Icons.SideBar
          className={`p-2 w-10 h-10 text-gray-400 rounded-md cursor-pointer hover:bg-gray-200 `}
          onClick={() => sideBarToggle()}
        />
        <div className="flex items-center">
          <div
            className="w-full flex items-center rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsChatSearchOpen(true)}
          >
            <Icons.Search className="p-2 w-10 h-10"></Icons.Search>
          </div>
          <div
            className="w-full flex items-center rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setCurrentChat(null);
              setCurrentProject(null);
            }}
          >
            <Icons.NewChat className="p-2 w-10 h-10"></Icons.NewChat>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-start">
        <div className="w-full flex flex-col items-start p-3">
          <div
            className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setCurrentChat(null);
              setCurrentProject(null);
            }}
          >
            <Icons.ChatGPTLogo className="p-2.5 w-10 h-10"></Icons.ChatGPTLogo>
            <p className="text-base">ChatGPT</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <div
            className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsGPT(true)}
          >
            <Icons.Grid className="p-2.5 w-10 h-10"></Icons.Grid>
            <p className="text-base">GPT</p>
          </div>
          <div className="w-full h-10 flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer">
            <Wolfram className="w-5 h-5 mx-2.5 rounded-full"></Wolfram>
            <p className="text-base">Wolfram</p>
          </div>
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer">
            <Canva className="p-2.5 w-10 h-10"></Canva>
            <p className="text-base">Canva</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <div
            className="w-full flex justify-between items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              subSideBarToggle("project");
            }}
          >
            <div className="flex items-center">
              <Icons.Folder className="p-2.5 w-10 h-10"></Icons.Folder>
              <p className="text-base">프로젝트</p>
            </div>
            <Icons.ArrowRight className="w-4 h-4"></Icons.ArrowRight>
          </div>
          <div
            className="w-full flex justify-between items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              subSideBarToggle("bookmark");
            }}
          >
            <div className="flex items-center">
              <Icons.Keep className="p-2.5 w-10 h-10"></Icons.Keep>
              <p className="text-base">북마크</p>
            </div>
            <Icons.ArrowRight className="w-4 h-4"></Icons.ArrowRight>
          </div>
        </div>

        <div className="w-full flex flex-col items-start p-3">
          <p className="text-gray-400 m-2 text-base">어제</p>
          {[...chatList]
            .filter((chat) => chat.project === null)
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((chat) => (
              <ChattingBox
                key={chat.id}
                chat={chat}
                isActive={currentChat?.id === chat.id}
                kebabOpen={kebabOpen}
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
      {isChatSearchOpen && (
        <ChatSearchModal onClose={() => setIsChatSearchOpen(false)} />
      )}
      {isNewProjectOpen && (
        <NewProjectModal onClose={() => setIsNewProjectOpen(false)} />
      )}
    </div>
  );
};
