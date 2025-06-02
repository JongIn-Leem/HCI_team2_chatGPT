import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts/ChattingContext";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { KebabPortal } from "@/components";

export const ProjectBox = ({ project, isOpen, setOpenProjects }) => {
  const {
    setChatList,
    projectList,
    setProjectList,
    currentChat,
    setCurrentChat,
    currentProject,
    setCurrentProject,
  } = useChatting();

  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setCurrentChat(null);
          setCurrentProject(project);
        }}
        className={classNames(
          "flex justify-between items-center pr-2 w-full rounded-lg cursor-pointer hover:bg-gray-200",
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
        {!isOpen ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenProjects((prev) => {
                const newSet = new Set(prev);
                newSet.add(project.id);
                return newSet;
              });
            }}
          >
            <Icons.ArrowDown className="w-5 h-5 text-gray-500 hover:text-black" />
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenProjects((prev) => {
                const newSet = new Set(prev);
                newSet.delete(project.id);
                return newSet;
              });
            }}
          >
            <Icons.ArrowUp className="w-5 h-5 text-gray-500 hover:text-black" />
          </div>
        )}
      </div>
    </div>
  );
};
