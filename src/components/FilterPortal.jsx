import { createPortal } from "react-dom";
import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts";

export const FilterPortal = ({
  isOpen,
  setIsFilterOpen,
  filterRef,
  filterPos,
  selectedFilter,
  setSelectedFilter,
}) => {
  const { currentChat, currentProject } = useChatting();
  if (!isOpen) return null;

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

  return createPortal(
    <div
      ref={filterRef}
      className="fixed z-50 w-52 bg-white border border-gray-300 rounded-3xl shadow-md"
      style={{
        top: `${filterPos.top + (currentChat ? 85 : 0)}px`,
        left: `${filterPos.left}px`,
      }}
    >
      <div className="w-full p-2 flex flex-col items-start">
        {selectedFilter && (
          <p className="px-2 py-1.5 text-[0.9rem] text-gray-400">도구</p>
        )}
        {filters.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            onClick={() => handleSelect(id)}
            className={`w-full px-2 py-1.5 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer ${
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
      </div>
    </div>,
    document.body
  );
};
