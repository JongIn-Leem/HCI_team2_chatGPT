import * as Icons from "@/assets/svg";
import { useSideBar, useChatting } from "@/contexts";
import {
  ProjectBox,
  ChattingBox,
  ChatSearchModal,
  NewProjectModal,
} from "@/components";
import { useState, useEffect } from "react";

export const SideBar = ({ openProjects = new Set() }) => {
  const { sideBarToggle } = useSideBar();
  const {
    chatList,
    currentChat,
    setCurrentChat,
    projectList,
    setCurrentProject,
  } = useChatting();
  const [kebabOpen, setKebabOpen] = useState({ type: null, id: null });
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

  // 컴포넌트 내부 어딘가 (return 바깥)
  const renderChattingBoxes = (project) => {
    const chatsForProject = [...chatList]
      .filter((chat) => chat.project === project.id)
      .sort((a, b) => b.updatedAt - a.updatedAt);

    const top5Chats = chatsForProject.slice(0, 5);
    const hasMoreThanFive = chatsForProject.length > 5;
    const isCurrentChatInTop5 = top5Chats.some(
      (chat) => chat.id === currentChat?.id
    );

    let displayedChats = top5Chats;

    // 현재 채팅이 top5에 없으면 마지막 하나를 빼고 currentChat 추가
    if (
      currentChat &&
      currentChat.project === project.id &&
      !isCurrentChatInTop5
    ) {
      const currentChatFull = chatsForProject.find(
        (chat) => chat.id === currentChat.id
      );
      if (currentChatFull) {
        displayedChats = [...top5Chats.slice(0, 4), currentChatFull];
      }
    }

    return (
      <>
        {displayedChats.map((chat) => (
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
        {hasMoreThanFive && (
          <div
            className="flex justify-start items-center p-2 px-10 w-full rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setCurrentChat(null);
              setCurrentProject(project);
            }}
          >
            모두 보기
          </div>
        )}
      </>
    );
  };

  return (
    <div className="fixed top-0 left-0 z-30 w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-300 transition-transform duration-300 overflow-visible">
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
            className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setCurrentChat(null);
              setCurrentProject(null);
            }}
          >
            <Icons.NewChat className="p-2.5 w-10 h-10"></Icons.NewChat>
            <p className="text-base">새 채팅</p>
          </div>
          <div
            className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsChatSearchOpen(true)}
          >
            <Icons.Search className="p-2.5 w-10 h-10"></Icons.Search>
            <p className="text-base">채팅 검색</p>
          </div>
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer">
            <Icons.Library className="p-2.75 w-10 h-10"></Icons.Library>
            <p className="text-base">라이브러리</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <div
            className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsNewProjectOpen(true)}
          >
            <Icons.NewFolder className="p-2.5 w-10 h-10"></Icons.NewFolder>
            <p className="text-base">새 프로젝트</p>
          </div>
          {projectList
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((project) => (
              <div className="w-full" key={project.id}>
                <ProjectBox
                  project={project}
                  isKebabOpen={
                    kebabOpen?.type === "project" &&
                    kebabOpen?.id === project.id
                  }
                  setKebabOpen={setKebabOpen}
                  isOpen={openProjects.has(project.id)}
                />
                {openProjects.has(project.id) && renderChattingBoxes(project)}
              </div>
            ))}
        </div>
        <div className="w-full flex flex-col items-start p-3">
          <div className="w-full flex items-center rounded-lg pr-2 hover:bg-gray-200 cursor-pointer">
            <Icons.Grid className="p-2.5 w-10 h-10"></Icons.Grid>
            <p className="text-base">GPT</p>
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
      {isChatSearchOpen && (
        <ChatSearchModal onClose={() => setIsChatSearchOpen(false)} />
      )}
      {isNewProjectOpen && (
        <NewProjectModal onClose={() => setIsNewProjectOpen(false)} />
      )}
    </div>
  );
};
