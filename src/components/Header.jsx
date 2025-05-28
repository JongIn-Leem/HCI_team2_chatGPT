import * as Icons from "@/assets/svg";
import { useState, useEffect } from "react";
import { useSideBar } from "@/contexts";
import { useChatting } from "@/contexts/ChattingContext";

export const Header = ({ activeChat }) => {
  const { isSideBarOpen, sideBarToggle } = useSideBar();
  const [showIcon, setShowIcon] = useState(true);
  const { setCurrentChat, currentProject, setCurrentProject } = useChatting();

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
      className={`fixed top-0 z-10 bg-white transition-all duration-300 border-b border-gray-300 ${
        isSideBarOpen ? "left-64 w-[calc(100%-16rem)]" : "left-0 w-full"
      }`}
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
          {currentProject ? (
            <>
              <div className="flex items-center justify-start h-10">
                <p className="text-xl font-bold p-2 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-100">
                  {currentProject.title}
                </p>
              </div>
              <Icons.ArrowRight className="py-2 w-6 h-10 text-gray-600" />
              <div className="flex items-center rounded-xl cursor-pointer hover:bg-gray-100">
                <p className="text-xl font-bold pl-2 text-gray-600 ">
                  {activeChat.title}
                </p>
                <p className="text-sm pl-2 text-gray-600">4o</p>
                <Icons.ArrowDown className="p-2 w-10 h-10 text-gray-600" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 pl-2 rounded-xl cursor-pointer hover:bg-gray-100">
                <p className="text-xl font-bold text-gray-600 ">ChatGPT</p>
                <p className="text-sm text-gray-600">4o</p>
                <Icons.ArrowDown className="p-2 w-10 h-10 text-gray-600" />
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
