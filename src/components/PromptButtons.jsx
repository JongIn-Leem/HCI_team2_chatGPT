import { useState, useEffect, useRef } from "react";
import * as Icons from "@/assets/svg";
import { FilterPortal } from "@/components";
import { useChatting } from "@/contexts/";

export const PromptButtons = ({
  isTyping,
  isResponding,
  handleSend,
  responseInterruptRef,
}) => {
  const { currentChat } = useChatting();
  const [hoveredId, setHoveredId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPos, setFilterPos] = useState({ top: 0, left: 0 });
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  const handleFilterClick = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      return;
    }

    const rect = filterButtonRef.current.getBoundingClientRect();
    setFilterPos({
      top: rect.top + window.scrollY + (currentChat ? -215 : 40),
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

  return (
    <div className="flex items-center justify-between">
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
          className="h-10 pr-2 flex items-center hover:bg-gray-100 rounded-full cursor-pointer"
          onMouseEnter={() => setHoveredId("filter")}
          onMouseLeave={() => setHoveredId(null)}
          onClick={handleFilterClick}
        >
          <Icons.Filter className="p-2.5 w-10 h-10" />
          <p className="text-m">도구</p>
        </div>
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

      <FilterPortal
        isOpen={isFilterOpen}
        filterRef={filterRef}
        filterPos={filterPos}
      />
    </div>
  );
};
