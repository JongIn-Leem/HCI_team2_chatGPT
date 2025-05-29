import { useRef, useEffect, useState } from "react";
import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts";
import { ChattingBox } from "@/components";

// 로딩 애니메이션 컴포넌트 (심플 버전)
const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center w-full py-10">
    {/* 동그라미 */}
    <div className="animate-spin rounded-full border-4 border-gray-200 border-t-gray-400 w-12 h-12 mb-4"></div>
    {/* 직선들 */}
    <div className="flex gap-2">
      <div className="w-8 h-2 rounded bg-gray-200 animate-pulse" />
      <div className="w-12 h-2 rounded bg-gray-200 animate-pulse" />
      <div className="w-10 h-2 rounded bg-gray-200 animate-pulse" />
    </div>
  </div>
);

export const ChatSearchModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const { chatList, currentChat, setCurrentChat, setCurrentProject } =
    useChatting();

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 검색 시 로딩 처리
  useEffect(() => {
    if (search.trim() !== "") {
      setIsLoading(true);
      setShowNoResult(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowNoResult(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setShowNoResult(false);
    }
  }, [search]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div
        ref={modalRef}
        className="w-180 h-120 flex flex-col items-center justify-start border-1 border-gray-300 bg-white rounded-xl shadow-xl"
      >
        <div className="w-full p-4 flex items-center">
          <input
            type="text"
            placeholder="채팅 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 focus:outline-none text-base rounded-md"
          />
        </div>
        <hr className="text-gray-300 w-full"></hr>
        <div className="w-full overflow-y-auto custom-scrollbar p-2 pr-6 flex flex-col items-center justify-start">
          {/* 검색 입력이 있을 때 */}
          {search.trim() !== "" ? (
            <>
              {isLoading && <LoadingAnimation />}
              {showNoResult && (
                <div className="flex items-center justify-start w-full p-2">
                  <Icons.Search className="p-2 w-10 h-10 text-gray-400 mr-4" />
                  <p className="text-gray-400 text-base font-semibold">
                    검색 결과 없음
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="w-full p-1 flex items-center rounded-lg hover:bg-gray-100"
                onClick={() => {
                  setCurrentChat(null);
                  setCurrentProject(null);
                  onClose();
                }}
              >
                <Icons.NewChat className="p-2.5 w-10 h-10 text-gray-600 mr-2" />
                <p className="text-base">새 채팅</p>
              </div>
              <div className="w-full flex flex-col items-start p-1">
                {/* 기본 채팅 리스트 */}
                <p className="text-gray-600 m-2 text-sm font-semibold">어제</p>
                {[...chatList]
                  .sort((a, b) => b.updatedAt - a.updatedAt)
                  .map((chat) => (
                    <SearchChattingBox
                      key={chat.id}
                      chat={chat}
                      onClose={onClose}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchChattingBox = ({ chat, onClose }) => {
  const { setCurrentChat, projectList, setCurrentProject } = useChatting();

  return (
    <div
      onClick={() => {
        setCurrentChat(chat);
        setCurrentProject(
          chat.project
            ? projectList.find((project) => project.id == chat.project)
            : null
        );
        onClose();
      }}
      className="flex justify-start items-center p-1 w-full rounded-lg cursor-pointer group hover:bg-gray-100"
    >
      <Icons.SpeechBalloons className="p-2.5 w-10 h-10 text-gray-600 mr-2" />
      <p className="text-base">{chat.title}</p>
    </div>
  );
};
