import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts/ChattingContext";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { KebabPortal } from "@/components";

export const ChattingBox = ({ chat, isActive, isKebabOpen, setKebabOpen }) => {
  const { setCurrentChat, projectList, setCurrentProject } = useChatting();
  const kebabRef = useRef(null);

  const [kebabPos, setKebabPos] = useState({ top: 0, left: 0 });

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
    const idx = chat.messages.length - 2;
    const title = idx >= 0 ? chat.messages[idx].content : "";
    return title.length > sl ? title.slice(0, sl) + ".." : title;
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
      <KebabPortal
        kebabPos={kebabPos}
        kebabRef={kebabRef}
        isKebabOpen={isKebabOpen}
      />
    </div>
  );
};
