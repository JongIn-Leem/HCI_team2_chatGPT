import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts/ChattingContext";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { KebabPortal } from "@/components";

export const ProjectBox = ({
  project,
  isActive,
  isKebabOpen,
  setKebabOpen,
}) => {
  const { setCurrentChat, setCurrentProject } = useChatting();
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

  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setCurrentChat(null);
          setCurrentProject(project);
        }}
        className={classNames(
          "flex justify-between items-center pr-2 w-full rounded-lg mb-0.5 cursor-pointer group hover:bg-gray-200",
          {
            "bg-gray-200": isActive,
          }
        )}
      >
        <div className="flex justify-start items-center">
          <Icons.Folder className="p-2.5 w-10 h-10"></Icons.Folder>
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
      <KebabPortal
        kebabPos={kebabPos}
        kebabRef={kebabRef}
        isKebabOpen={isKebabOpen}
      />
    </div>
  );
};
