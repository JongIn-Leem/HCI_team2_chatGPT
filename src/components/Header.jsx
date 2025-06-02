import * as Icons from "@/assets/svg";
import { useState, useEffect } from "react";
import { useSideBar } from "@/contexts";
import { useChatting } from "@/contexts/ChattingContext";

export const Header = () => {
  const { isSideBarOpen, sideBarToggle, subSideBarOpen } = useSideBar();
  const [showIcon, setShowIcon] = useState(true);
  const { currentChat, setCurrentChat, currentProject, setCurrentProject } =
    useChatting();

  useEffect(() => {
    if (isSideBarOpen) {
      const timer = setTimeout(() => setShowIcon(false), 300);
      return () => clearTimeout(timer);
    } else {
      setShowIcon(true);
    }
  }, [isSideBarOpen]);

  return (
    <div
      className={`fixed top-0 z-10 bg-white transition-all duration-300 
        ${isSideBarOpen && subSideBarOpen && "left-128 w-[calc(100%-32rem)] "}
        ${isSideBarOpen && !subSideBarOpen && "left-64 w-[calc(100%-16rem)] "}
        ${!isSideBarOpen && subSideBarOpen && "left-64 w-[calc(100%-16rem)] "}
        ${!isSideBarOpen && !subSideBarOpen && "left-0 w-full "}
        ${!currentChat && currentProject ? "" : "border-b border-gray-300"}`}
    >
      <div className="flex items-center justify-between p-2">
        <div className={`flex `}>
          {showIcon && (
            <div
              className={`flex transition-all duration-300
    ${isSideBarOpen ? "w-0 opacity-0" : "opacity-100"}`}
            >
              <Icons.SideBar
                className={`p-2 w-10 h-10 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-100 `}
                onClick={sideBarToggle}
              />
              <Icons.NewChat
                className="p-2 w-10 h-10 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCurrentChat(null);
                  setCurrentProject(null);
                }}
              />
            </div>
          )}
          {currentChat && currentProject ? (
            <>
              <div className="flex items-center justify-start h-10">
                <p className="text-xl font-bold p-2 px-4 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-100">
                  {currentProject.title}
                </p>
              </div>
              <Icons.ArrowRight className="py-2.5 w-6 h-10 text-gray-400" />
              <div className="flex items-center rounded-xl cursor-pointer hover:bg-gray-100">
                <p className="text-xl font-bold pl-2 text-gray-600 ">
                  {currentChat.title}
                </p>
                <p className="text-sm font-semibold px-1 mt-0.5 ml-1 text-gray-500 rounded-md bg-gray-100">
                  4o
                </p>
                <Icons.ArrowDown className="py-2.5 w-7 h-10 text-gray-400" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center pl-2 rounded-xl cursor-pointer hover:bg-gray-100">
                <p className="px-2 text-xl font-semibold ">ChatGPT</p>
                <p className="text-xl font-semibold text-gray-400">4o</p>
                <Icons.ArrowDown className="py-2.5 w-7 h-10 text-gray-400" />
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Icons.KebabVertical className="p-2 w-10 h-10 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-100" />
          <div className="mr-2 w-9 h-9 rounded-full bg-amber-400 border-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};
