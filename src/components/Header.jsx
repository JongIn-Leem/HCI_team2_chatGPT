import * as Icons from "@/assets/svg";
import { useState, useEffect } from "react";
import { useSideBar } from "@/contexts";

export const Header = ({ activeChat }) => {
  const { isSideBarOpen, sideBarToggle } = useSideBar();
  const [showIcon, setShowIcon] = useState(true);

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
                className={`p-2 w-10 h-10 text-gray-600 rounded-md cursor-pointer hover:bg-gray-300 `}
                onClick={sideBarToggle}
              />
              <Icons.NewChat className="p-2 w-10 h-10 text-gray-600 hover:bg-gray-300 rounded-md cursor-pointer" />
            </div>
          )}
          {activeChat ? (
            <>
              <div className="flex items-center gap-2 pl-2">
                <p className="text-xl font-bold text-gray-600  hover:bg-gray-300 rounded-md cursor-pointer">
                  김철수
                </p>
              </div>
              <Icons.ArrowRight className="p-2 w-10 h-10 text-gray-600" />
              <div className="flex items-center gap-2 hover:bg-gray-300 rounded-md cursor-pointer">
                <p className="text-xl font-bold text-gray-600 ">
                  {activeChat.title}
                </p>
                <p className="text-sm text-gray-600">4o</p>
                <Icons.ArrowDown className="p-2 w-10 h-10 text-gray-600" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 pl-2 hover:bg-gray-300 rounded-md cursor-pointer">
                <p className="text-xl font-bold text-gray-600 ">ChatGPT</p>
                <p className="text-sm text-gray-600">4o</p>
                <Icons.ArrowDown className="p-2 w-10 h-10 text-gray-600" />
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Icons.KebabVertical className="p-2 w-10 h-10 text-gray-600 hover:bg-gray-300 rounded-md cursor-pointer" />
          <div className="mr-2 w-9 h-9 rounded-full bg-amber-400 border-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};
