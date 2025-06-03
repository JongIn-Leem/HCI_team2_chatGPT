import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts";

const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center w-full py-10">
    <div className="animate-spin rounded-full border-4 border-gray-200 border-t-gray-400 w-12 h-12 mb-4"></div>
    <div className="flex gap-2">
      <div className="w-8 h-2 rounded bg-gray-200 animate-pulse" />
      <div className="w-12 h-2 rounded bg-gray-200 animate-pulse" />
      <div className="w-10 h-2 rounded bg-gray-200 animate-pulse" />
    </div>
  </div>
);

export const ChatSearchModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const { chatList, setCurrentChat, setCurrentProject } = useChatting();
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

  useEffect(() => {
    if (search.trim()) {
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] h-130 bg-white rounded-xl shadow-xl flex flex-col"
      >
        {/* 상단 입력창 */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
          <input
            type="text"
            placeholder="채팅 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-base rounded-md p-2 border border-gray-200 focus:outline-none"
          />
          <Icons.Close
            className="ml-4 p-2.5 w-10 h-10 text-gray-400 rounded-full hover:bg-gray-200 hover:text-black cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* 검색 결과 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
          {search.trim() !== "" ? (
            <>
              {isLoading && <LoadingAnimation />}
              {showNoResult && (
                <div className="flex items-center text-gray-400 gap-2">
                  <Icons.Search className="w-8 h-8" />
                  <p className="text-base font-semibold">검색 결과 없음</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="w-full p-2 flex items-center rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setCurrentChat(null);
                  setCurrentProject(null);
                  onClose();
                }}
              >
                <Icons.NewChat className="p-2.5 w-10 h-10 text-gray-600 mr-2" />
                <p className="text-base">새 채팅</p>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-gray-600 text-sm font-semibold mb-1">어제</p>
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
    </div>,
    document.body
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
            ? projectList.find((project) => project.id === chat.project)
            : null
        );
        onClose();
      }}
      className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <Icons.SpeechBalloons className="p-2.5 w-10 h-10 text-gray-600 mr-2" />
      <p className="text-base text-gray-700">{chat.title}</p>
    </div>
  );
};
