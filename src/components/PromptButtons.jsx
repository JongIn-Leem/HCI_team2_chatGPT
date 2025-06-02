import { useState, useEffect, useRef } from "react";
import * as Icons from "@/assets/svg";
import { FilterPortal } from "@/components";
import { useChatting } from "@/contexts/";
import classNames from "classnames";
import Wolfram from "@/assets/wolfram";
import Canva from "@/assets/Canva";

export const PromptButtons = ({
  isTyping,
  isResponding,
  handleSend,
  responseInterruptRef,
  setIsGPT,
}) => {
  const { currentChat } = useChatting();
  const [hoveredId, setHoveredId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPos, setFilterPos] = useState({ top: 0, left: 0 });
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  const handleFilterClick = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      return;
    }

    const rect = filterButtonRef.current.getBoundingClientRect();
    setFilterPos({
      top: rect.top + window.scrollY + (currentChat ? -252 : 40),
      left: rect.left + window.scrollX - 15,
    });
    setIsFilterOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        !filterButtonRef.current.contains(e.target)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = [
    {
      id: "draw",
      label: "이미지 그리기",
      icon: <Icons.Draw className="mr-2 w-5 h-5 text-blue-500" />,
    },
    {
      id: "web",
      label: "웹에서 검색하기",
      icon: <Icons.Web className="mr-2 w-5 h-5 text-blue-500" />,
    },
    {
      id: "edit",
      label: "글쓰기 및 코딩",
      icon: <Icons.Edit className="mr-2 w-5 h-5 text-blue-500" />,
    },
    {
      id: "research",
      label: "심층 리서치",
      icon: <Icons.DeepResearch className="mr-2 w-5 h-5 text-blue-500" />,
    },
    {
      id: "Wolfram",
      label: "Wolfram",
      icon: <Wolfram className="mr-2 w-5 h-5" />,
    },
    {
      id: "Canva",
      label: "Canva",
      icon: <Canva className="mr-2 w-5 h-5" />,
    },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="p-2 flex items-center">
        <div
          className="relative hover:bg-gray-100 rounded-full cursor-pointer"
          onMouseEnter={() => setHoveredId("plus")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Icons.Plus className="p-2.5 w-10 h-10" />
          {hoveredId === "plus" && (
            <div className="absolute top-full translate-y-1.5 left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-md shadow-md whitespace-nowrap z-50">
              사진 및 파일 추가
            </div>
          )}
        </div>

        <div
          ref={filterButtonRef}
          className={classNames(
            "relative h-10 flex items-center hover:bg-gray-100 rounded-full cursor-pointer",
            {
              "bg-gray-100": isFilterOpen,
            }
          )}
          onMouseEnter={() => setHoveredId("filter")}
          onMouseLeave={() => setHoveredId(null)}
          onClick={handleFilterClick}
        >
          {!selectedFilter && <Icons.Filter className="p-2.5 w-10 h-10" />}
          {!selectedFilter && <p className="text-m pr-3">도구</p>}
        </div>
        {selectedFilter && (
          <div
            className="h-10 px-2 py-1 rounded-full hover:bg-blue-50 flex items-center cursor-pointer"
            onMouseEnter={() => setHoveredId("filter")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={handleFilterClick}
          >
            {filterOptions.find((opt) => opt.id === selectedFilter)?.icon}
            <p className="text-[0.9rem] text-blue-500 mr-1">
              {filterOptions.find((opt) => opt.id === selectedFilter)?.label}
            </p>
            <Icons.ArrowDown className="text-blue-500 w-5 h-5" />
          </div>
        )}
      </div>

      <div className="p-2 flex items-center">
        <div
          className="relative hover:bg-gray-100 rounded-full cursor-pointer"
          onMouseEnter={() => setHoveredId("voice")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Icons.Voice className="p-2.5 mr-1 w-10 h-10" />
          {hoveredId === "voice" && (
            <div className="absolute top-full translate-y-1.5 left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-md shadow-md whitespace-nowrap z-50">
              음성 입력
            </div>
          )}
        </div>

        {isResponding && (
          <Icons.Stop
            className="ml-1 p-2 w-10 h-10 text-white bg-black hover:bg-gray-600 rounded-full cursor-pointer"
            onClick={() => {
              responseInterruptRef.current?.();
            }}
          />
        )}

        {!isResponding && isTyping && (
          <Icons.ArrowUpFull
            className="ml-1 p-2.5 w-10 h-10 text-white bg-black hover:bg-gray-600 rounded-full cursor-pointer"
            onClick={handleSend}
          />
        )}

        {!isResponding && !isTyping && (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setHoveredId("voiceMode")}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Icons.VoiceMode className="ml-1 p-2.5 w-10 h-10 text-white rounded-full bg-black hover:bg-gray-600" />
            {hoveredId === "voiceMode" && (
              <div className="absolute top-full translate-y-1.5 left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-md shadow-md whitespace-nowrap z-50">
                음성 모드 사용
              </div>
            )}
          </div>
        )}
      </div>

      {isFilterOpen && (
        <FilterPortal
          setIsFilterOpen={setIsFilterOpen}
          filterRef={filterRef}
          filterPos={filterPos}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          setIsGPT={setIsGPT}
        />
      )}
    </div>
  );
};
