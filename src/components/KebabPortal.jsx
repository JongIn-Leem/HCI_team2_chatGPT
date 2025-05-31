import { createPortal } from "react-dom";
import * as Icons from "@/assets/svg";
import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import { useChatting } from "@/contexts";

export const KebabPortal = ({
  kebabPos,
  kebabRef,
  kebabOpen,
  handleDeleteOpen,
  handleMoveToProject,
  handleDeleteFromProject,
  projectMenuPos,
  setProjectMenuPos,
}) => {
  const { chatList, projectList } = useChatting();

  const projectMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(e.target)
      ) {
        setProjectMenuPos?.(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!kebabOpen) return null;

  const chat =
    kebabOpen.type === "chat"
      ? chatList.find((c) => c.id === kebabOpen.id)
      : null;

  const project = chat ? projectList.find((p) => p.id === chat.project) : null;

  const closeTimerRef = useRef(null);

  const renderProjectMenu = () => {
    if (
      !projectMenuPos ||
      typeof projectMenuPos.top !== "number" ||
      typeof projectMenuPos.left !== "number" ||
      kebabOpen?.type !== "chat" ||
      !chat
    )
      return null;

    return createPortal(
      <div
        ref={projectMenuRef}
        style={{
          top: typeof projectMenuPos?.top === "number" ? projectMenuPos.top : 0,
          left:
            typeof projectMenuPos?.left === "number" ? projectMenuPos.left : 0,
        }}
        onMouseEnter={() => {
          clearTimeout(closeTimerRef.current);
        }}
        onMouseLeave={() => {
          closeTimerRef.current = setTimeout(() => {
            setProjectMenuPos(null);
          }, 200);
        }}
        className="fixed w-48 bg-white border border-gray-300 shadow-md rounded-xl z-50 p-2"
      >
        {projectList
          .filter((p) => p.id !== chat.project)
          .map((p) => (
            <div
              key={p.id}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMoveToProject(p.id);
                setProjectMenuPos(null);
              }}
              className="px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {p.title}
            </div>
          ))}
      </div>,
      document.body
    );
  };

  const renderContent = () => {
    if (kebabOpen.type === "chat" && chat) {
      return (
        <>
          {!project && (
            <>
              <div className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-gray-100 cursor-pointer">
                <Icons.Share className="w-5 h-5 mr-2" />
                <p>공유하기</p>
              </div>
              <div
                className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-gray-100 cursor-pointer"
                onMouseEnter={() => {
                  clearTimeout(closeTimerRef.current);
                  setProjectMenuPos?.({
                    top: kebabPos.top - 170,
                    left: kebabPos.left + 180,
                  });
                }}
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => {
                    setProjectMenuPos?.(null);
                  }, 200);
                }}
              >
                <Icons.Folder className="w-5 h-5 mr-2" />
                <p>프로젝트에 추가</p>
              </div>
            </>
          )}
          <div className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-gray-100 cursor-pointer">
            <Icons.Edit className="w-5 h-5 mr-2" />
            <p>이름 바꾸기</p>
          </div>
          {project && (
            <>
              <div
                className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-gray-100 cursor-pointer"
                onMouseEnter={() => {
                  clearTimeout(closeTimerRef.current);
                  setProjectMenuPos?.({
                    top: kebabPos.top + 40,
                    left: kebabPos.left + 180,
                  });
                }}
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => {
                    setProjectMenuPos?.(null);
                  }, 200);
                }}
              >
                <Icons.Folder className="w-5 h-5 mr-2" />
                <p>프로젝트로 이동</p>
              </div>
              <div
                className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-gray-100 cursor-pointer"
                onClick={handleDeleteFromProject}
              >
                <Icons.Undo className="w-5 h-5 mr-2" />
                <p>{project.title}에서 제거</p>
              </div>
            </>
          )}
          <hr className="text-gray-300 w-[80%] my-1" />
          <div className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-gray-100 cursor-pointer">
            <Icons.FolderBox className="w-5 h-5 mr-2" />
            <p>아카이브에 보관</p>
          </div>
          <div
            className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-red-50 cursor-pointer"
            onClick={handleDeleteOpen}
          >
            <Icons.Bin className="w-5 h-5 mr-2 text-red-600" />
            <p className="text-red-600">삭제</p>
          </div>
        </>
      );
    }

    if (kebabOpen.type === "project") {
      return (
        <div
          className="w-full px-2 py-1.5 flex items-center rounded-xl hover:bg-red-50 cursor-pointer"
          onClick={handleDeleteOpen}
        >
          <Icons.Bin className="w-5 h-5 mr-2 text-red-600" />
          <p className="text-red-600">프로젝트 삭제</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {createPortal(
        <div
          ref={kebabRef}
          style={{ top: `${kebabPos.top}px`, left: `${kebabPos.left}px` }}
          className={classNames(
            "fixed w-50 bg-white border border-gray-300 shadow-lg rounded-2xl z-50",
            {
              "-translate-y-full": kebabOpen.type === "chat" && !chat?.project,
            }
          )}
        >
          <div className="w-full p-2 flex flex-col items-center">
            {renderContent()}
          </div>
        </div>,
        document.body
      )}
      {Boolean(projectMenuPos?.top) &&
        Boolean(projectMenuPos?.left) &&
        kebabOpen?.type === "chat" &&
        renderProjectMenu()}
    </>
  );
};
