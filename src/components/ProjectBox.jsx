import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts/ChattingContext";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { KebabPortal } from "@/components";

export const ProjectBox = ({ project, kebabOpen, setKebabOpen, isOpen }) => {
  const {
    setChatList,
    projectList,
    setProjectList,
    currentChat,
    setCurrentChat,
    currentProject,
    setCurrentProject,
  } = useChatting();
  const kebabRef = useRef(null);

  const [kebabPos, setKebabPos] = useState({ top: 0, left: 0 });

  const handleKebabClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setKebabPos({
      top: rect.bottom,
      left: rect.right - 35,
    });
    setKebabOpen({ type: "project", id: project.id });
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
    setProjectList((prev) => prev.filter((p) => p.id !== project.id));
    setChatList((prev) => prev.filter((c) => c.project !== project.id));
    setIsDeleteOpen(false);
    setKebabOpen(null);
    setCurrentChat(null);
    setCurrentProject(null);
  };

  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setCurrentChat(null);
          setCurrentProject(project);
        }}
        className={classNames(
          "flex justify-between items-center pr-2 w-full rounded-lg cursor-pointer group hover:bg-gray-200",
          {
            "bg-gray-200": !currentChat && currentProject?.id === project.id,
          }
        )}
      >
        <div className="flex justify-start items-center">
          {isOpen ? (
            <Icons.FolderOpen className="p-2.5 w-10 h-10"></Icons.FolderOpen>
          ) : (
            <Icons.Folder className="p-2.5 w-10 h-10"></Icons.Folder>
          )}
          <p className="text-base">{project.title}</p>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setKebabOpen({ type: "project", id: project.id });
            handleKebabClick(e);
          }}
        >
          <Icons.KebabHorizontal className="w-5 h-5 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
      {kebabOpen?.type === "project" && kebabOpen?.id === project?.id && (
        <KebabPortal
          kebabPos={kebabPos}
          kebabRef={kebabRef}
          kebabOpen={kebabOpen}
          handleDeleteOpen={handleDeleteOpen}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          onClose={() => setIsDeleteOpen(false)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

const DeleteModal = ({ onClose, handleDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-120 h-60 p-4 px-6 flex flex-col items-center justify-start border-1 border-gray-300 bg-white rounded-xl shadow-xl">
        <div className="w-full my-3 flex justify-start items-center">
          <p className="text-xl font-semibold">프로젝트를 삭제할까요?</p>
        </div>
        <hr className="text-gray-300 w-120 mt-3 mb-5"></hr>
        <div className="w-full mb-5 flex flex-col justify-center items-start">
          <p className="text-base font-bold text-start mb-2">
            모든 프로젝트 파일과 채팅이 영구 삭제됩니다.
            <span className="font-medium">
              {" "}
              채팅을 저장하려면 삭제하기 전에 채팅 목록 또는 다른 프로젝트로
              옮겨 주세요.
            </span>
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
            <p className="font-semibold text-white">프로젝트 삭제</p>
          </div>
        </div>
      </div>
    </div>
  );
};
