import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts/ChattingContext";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { KebabPortal } from "@/components";

export const ChattingBox = ({ chat, isActive, kebabOpen, setKebabOpen }) => {
  const { setChatList, setCurrentChat, projectList, setCurrentProject } =
    useChatting();

  const kebabRef = useRef(null);

  const [kebabPos, setKebabPos] = useState(null);

  const handleKebabClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setKebabPos({
      top: rect.bottom,
      left: rect.right - 35,
    });
    setKebabOpen({ type: "chat", id: chat.id });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target)) {
        setKebabOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setKebabOpen]);

  const chatTitle = (chat) => {
    const sl = chat.project ? 11 : 13;
    const title = chat.title;
    return title.length > sl ? title.slice(0, sl) + ".." : title;
  };

  const [projectMenuPos, setProjectMenuPos] = useState({ top: 0, left: 0 });

  const handleDeleteFromProject = () => {
    setChatList((prev) => {
      const index = prev.findIndex((c) => c.id === chat.id);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = { ...updated[index], project: null };
      return updated;
    });
    const updatedChat = { ...chat, project: null };
    setCurrentChat(updatedChat);
    setCurrentProject(null);
    setKebabOpen(null);
  };

  const handleMoveToProject = (projectId) => {
    setChatList((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, project: projectId } : c))
    );
    const updatedChat = { ...chat, project: projectId };
    setCurrentChat(updatedChat);
    const newProject = projectList.find((p) => p.id === projectId);
    setCurrentProject(newProject || null);
    setKebabOpen(null);
    setProjectMenuPos(null);
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(null);

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
    setKebabOpen(null);
    setCurrentChat(chat);
    setCurrentProject(
      chat.project
        ? projectList.find((project) => project.id == chat.project)
        : null
    );
  };

  const handleDelete = () => {
    setChatList((prev) => prev.filter((c) => c.id !== chat.id));
    setIsDeleteOpen(false);
    setKebabOpen(null);
    setCurrentChat(null);
    setCurrentProject(null);
  };

  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setCurrentChat(chat);
          setCurrentProject(
            chat.project
              ? projectList.find((project) => project.id == chat.project)
              : null
          );
        }}
        className={classNames(
          "flex justify-between items-center p-2 w-full rounded-lg cursor-pointer group ",
          {
            "bg-gray-200 ": isActive,
            "hover:bg-gray-200": !isActive,
          },
          {
            "pl-10": chat.project,
          }
        )}
      >
        <p className="text-base">{chatTitle(chat)}</p>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setKebabOpen({ type: "chat", id: chat.id }); // 현재 chat.id로 모달 열기
            handleKebabClick(e);
          }}
        >
          <Icons.KebabHorizontal className="w-5 h-5 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
      {kebabOpen?.type === "chat" && kebabOpen?.id === chat?.id && (
        <KebabPortal
          kebabPos={kebabPos}
          kebabRef={kebabRef}
          kebabOpen={kebabOpen}
          handleDeleteOpen={handleDeleteOpen}
          handleMoveToProject={handleMoveToProject}
          handleDeleteFromProject={handleDeleteFromProject}
          projectMenuPos={projectMenuPos}
          setProjectMenuPos={setProjectMenuPos}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          chatTitle={chatTitle(chat)}
          onClose={() => setIsDeleteOpen(false)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

const DeleteModal = ({ chatTitle, onClose, handleDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-120 h-60 p-4 px-6 flex flex-col items-center justify-start border-1 border-gray-300 bg-white rounded-xl shadow-xl">
        <div className="w-full my-3 flex justify-start items-center">
          <p className="text-xl font-semibold">채팅을 삭제하시겠습니까?</p>
        </div>
        <hr className="text-gray-300 w-120 mt-3 mb-5"></hr>
        <div className="w-full mb-5 flex flex-col justify-center items-start">
          <p className="text-lg mb-2">
            이 행동으로
            <span className="font-bold"> {chat.title}</span>
            이(가) 삭제됩니다.
          </p>
          <p className="text-sm font-semibold text-gray-500">
            이 채팅에 저장된 메모리를 삭제하려면{" "}
            <u className="cursor-pointer">설정</u>
            으로 가세요.
          </p>
        </div>
        <div className="w-full flex justify-end items-center">
          <div
            className="px-4 py-2 mr-3 border-1 border-gray-300 hover:bg-gray-200 cursor-pointer rounded-full flex justify-center items-center"
            onClick={() => onClose()}
          >
            <p className="font-semibold">취소</p>
          </div>
          <div
            className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => handleDelete()}
          >
            <p className="font-semibold text-white">삭제</p>
          </div>
        </div>
      </div>
    </div>
  );
};
