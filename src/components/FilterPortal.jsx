import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts";
import Wolfram from "@/assets/wolfram";
import Canva from "@/assets/Canva";
import Scholar from "@/assets/Scholar";

export const FilterPortal = ({
  setIsFilterOpen,
  filterRef,
  filterPos,
  selectedFilter,
  setSelectedFilter,
  setIsGPT,
}) => {
  const [isGPTOpen, setIsGPTOpen] = useState(false);
  const { currentChat, setCurrentChat, currentProject, setCurrentProject } =
    useChatting();

  const handleSelect = (filterId) => {
    setSelectedFilter(filterId);
    setIsFilterOpen(false);
  };

  const filters = [
    {
      id: "draw",
      label: "이미지 그리기",
      icon: Icons.Draw,
    },
    {
      id: "web",
      label: "웹에서 검색하기",
      icon: Icons.Web,
    },
    {
      id: "edit",
      label: "글쓰기 또는 코딩",
      icon: Icons.Edit,
    },
  ];

  if (!currentProject) {
    filters.push({
      id: "research",
      label: "심층 리서치 실행",
      icon: Icons.DeepResearch,
    });
  }

  const GPTRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (GPTRef.current && !GPTRef.current.contains(e.target)) {
        setIsGPTOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeTimerRef = useRef(null);

  const renderGPT = () => {
    return createPortal(
      <div
        ref={GPTRef}
        style={{
          top: `${filterPos.top + (currentChat ? 32 : 0)}px`,
          left: `${filterPos.left + 185}px`,
        }}
        onMouseEnter={() => {
          clearTimeout(closeTimerRef.current);
        }}
        onMouseLeave={() => {
          closeTimerRef.current = setTimeout(() => {
            setIsGPTOpen(null);
          }, 200);
        }}
        className="fixed w-48 bg-white border border-gray-300 shadow-md rounded-3xl z-50 p-2"
      >
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            handleSelect("Wolfram");
            setIsGPTOpen(null);
          }}
          className={`p-1 h-10 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer`}
        >
          <div className="flex items-center">
            <Wolfram className="w-5 h-5 mx-2.5 rounded-full"></Wolfram>
            <p className={selectedFilter === "Wolfram" ? "text-blue-500" : ""}>
              Wolfram
            </p>
          </div>
          {selectedFilter === "Wolfram" && (
            <Icons.Check className="w-3 h-3 text-blue-500" />
          )}
        </div>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            handleSelect("Canva");
            setIsGPTOpen(null);
          }}
          className={`p-1 h-10 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer`}
        >
          <div className="flex items-center">
            <Canva className="p-2.5 w-10 h-10"></Canva>
            <p className={selectedFilter === "Canva" ? "text-blue-500" : ""}>
              Canva
            </p>
          </div>
          {selectedFilter === "Canva" && (
            <Icons.Check className="w-3 h-3 text-blue-500" />
          )}
        </div>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            handleSelect("Scholar");
            setIsGPTOpen(null);
          }}
          className={`p-1 h-10 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer`}
        >
          <div className="flex items-center">
            <Scholar className="p-2.5 w-10 h-10"></Scholar>
            <p className={selectedFilter === "Scholar" ? "text-blue-500" : ""}>
              Scholar
            </p>
          </div>
          {selectedFilter === "Scholar" && (
            <Icons.Check className="w-3 h-3 text-blue-500" />
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {createPortal(
        <div
          ref={filterRef}
          className="fixed z-50 w-52 bg-white border border-gray-300 rounded-3xl shadow-md"
          style={{
            top: `${filterPos.top + (currentChat ? 32 : 0)}px`,
            left: `${filterPos.left}px`,
          }}
        >
          <div className="w-full p-2 flex flex-col items-start">
            <div className="w-full px-2 py-2 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer">
              <div
                className="flex justify-start items-center"
                onClick={() => {
                  setCurrentChat(null);
                  setCurrentProject(null);
                  setIsGPT(true);
                  setIsFilterOpen(false);
                }}
              >
                <Icons.Grid className="w-5 h-5 mr-2" />
                <p className="text-base">맞춤형 GPT</p>
              </div>
              <Icons.ArrowRight
                className="w-5 h-5"
                onMouseEnter={() => {
                  clearTimeout(closeTimerRef.current);
                  setIsGPTOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => {
                    setIsGPTOpen(false);
                  }, 200);
                }}
              />
            </div>
            {filters.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                onClick={() => handleSelect(id)}
                className={`w-full px-2 py-2 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer ${
                  selectedFilter === id && "text-blue-500"
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-2" />
                  <p>{label}</p>
                </div>
                {selectedFilter === id && (
                  <Icons.Check className="w-3 h-3 text-blue-500" />
                )}
              </div>
            ))}
            {selectedFilter && (
              <div
                onClick={() => {
                  setSelectedFilter(null);
                  setIsFilterOpen(false);
                }}
                className="w-full px-2 py-2 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer"
              >
                <p>선택 안 함</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
      {isGPTOpen && renderGPT()}
    </>
  );
};
