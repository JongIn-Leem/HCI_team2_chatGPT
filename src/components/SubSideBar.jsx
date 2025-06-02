import * as Icons from "@/assets/svg";
import { useSideBar, useChatting } from "@/contexts";
import {
  ProjectBox,
  ChattingBox,
  KebabPortal,
  NewProjectModal,
} from "@/components";
import { useState, useEffect, useRef } from "react";

export const SubSideBar = ({
  isOpen,
  isSideBarOpen,
  openProjects = new Set(),
  setOpenProjects,
  chatRef,
}) => {
  const { isSubSideBarOpen, subSideBarToggle } = useSideBar();
  const {
    chatList,
    currentChat,
    setCurrentChat,
    projectList,
    setCurrentProject,
    bookmarkList,
    setBookmarkList,
  } = useChatting();

  const [kebabOpen, setKebabOpen] = useState(null);
  const [kebabPos, setKebabPos] = useState(null);
  const kebabRef = useRef(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [visibleBookmark, setVisibleBookmark] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target)) {
        setKebabOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsNewProjectOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isElementVisibleInScroll = (el, container) => {
    if (!el || !container) return false;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return (
      elRect.top >= containerRect.top && elRect.bottom <= containerRect.bottom
    );
  };

  useEffect(() => {
    const scrollEl = chatRef?.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      for (const bookmark of bookmarkList) {
        if (bookmark.cid !== currentChat?.id) continue;

        const el = document.getElementById(
          `message-${bookmark.cid}-${bookmark.mid}`
        );
        if (isElementVisibleInScroll(el, scrollEl)) {
          setVisibleBookmark(`${bookmark.cid}-${bookmark.mid}`);
          return;
        }
      }
      setVisibleBookmark(null);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [bookmarkList, currentChat, chatRef]);

  const handleDelete = (cid, mid) => {
    setBookmarkList((prev) =>
      prev.filter((b) => b.cid !== cid || b.mid !== mid)
    );
    setKebabOpen(null);
  };

  const renderChattingBoxes = (project) => {
    const chatsForProject = [...chatList]
      .filter((chat) => chat.project === project.id)
      .sort((a, b) => b.updatedAt - a.updatedAt);

    const top10 = chatsForProject.slice(0, 10);
    const currentChatIncluded = top10.some(
      (chat) => chat.id === currentChat?.id
    );
    let displayed = top10;

    if (
      currentChat &&
      currentChat.project === project.id &&
      !currentChatIncluded
    ) {
      const found = chatsForProject.find((chat) => chat.id === currentChat.id);
      if (found) displayed = [...top10.slice(0, 9), found];
    }

    return displayed.map((chat) => (
      <ChattingBox
        key={chat.id}
        chat={chat}
        isActive={currentChat?.id === chat.id}
        kebabOpen={kebabOpen}
        setKebabOpen={setKebabOpen}
      />
    ));
  };

  return (
    <div
      className={`fixed top-0 left-0 z-20 w-64 h-screen flex flex-col bg-gray-100 rounded-tr-3xl rounded-br-3xl border-r border-gray-300 
      transition-transform duration-300 ease-in-out 
      ${isOpen && isSideBarOpen ? "translate-x-64" : ""}
      ${isOpen && !isSideBarOpen ? "translate-x-0" : ""}
      ${!isOpen ? "-translate-x-full" : ""}
    `}
    >
      <div className="w-full p-2 border-b border-gray-300 flex items-center justify-between">
        <p className="pl-2 text-lg font-bold">
          {isSubSideBarOpen === "project" ? "프로젝트" : "북마크"}
        </p>
        <div className="flex items-center">
          {isSubSideBarOpen === "project" && (
            <div
              className="flex items-center rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => setIsNewProjectOpen(true)}
            >
              <Icons.Plus className="p-2.5 w-10 h-10" />
            </div>
          )}
          <Icons.DoubleArrowLeft
            className="p-2 w-10 h-10 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={subSideBarToggle}
          />
        </div>
      </div>

      {isSubSideBarOpen === "project" ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-start">
          <div className="w-full flex flex-col items-start p-3">
            {projectList
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((project) => (
                <div key={project.id} className="w-full">
                  <ProjectBox
                    project={project}
                    isOpen={openProjects.has(project.id)}
                    setOpenProjects={setOpenProjects}
                  />
                  {openProjects.has(project.id) && renderChattingBoxes(project)}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-start">
          <div className="w-full flex flex-col items-start p-3">
            {bookmarkList
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((bookmark) => {
                const chat = chatList.find((c) => c.id === bookmark.cid);
                if (!chat || !chat.messages[bookmark.mid]) return null;

                const key = `${bookmark.cid}-${bookmark.mid}`;
                const isActive =
                  currentChat?.id === bookmark.cid && visibleBookmark === key;

                return (
                  <div
                    key={bookmark.id}
                    className={`group w-full px-3 py-2 mb-1 rounded-lg flex items-center justify-between cursor-pointer 
                    ${isActive ? "bg-gray-200" : "hover:bg-gray-200"}`}
                    onClick={() => {
                      setCurrentChat(chat);

                      setTimeout(() => {
                        const el = document.getElementById(
                          `message-${bookmark.cid}-${bookmark.mid}`
                        );
                        const container = chatRef.current;

                        if (el && container) {
                          const elOffsetTop = el.offsetTop;
                          container.scrollTo({
                            top:
                              elOffsetTop -
                              container.clientHeight / 2 +
                              el.clientHeight / 2,
                            behavior: "smooth", // ← 부드러운 이동이 느릴 경우, 이걸 auto로
                          });
                        }
                      }, 50); // ← 최소한의 delay만 줌 (렌더 준비 시간)
                    }}
                  >
                    <p className="text-base">{bookmark.title}</p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        setKebabPos({
                          top: rect.bottom,
                          left: rect.right - 35,
                        });
                        setKebabOpen({ type: "bookmark", id: bookmark.id });
                      }}
                    >
                      <Icons.KebabHorizontal className="w-5 h-5 opacity-0 group-hover:opacity-100" />
                      {kebabOpen?.type === "bookmark" &&
                        kebabOpen?.id === bookmark.id && (
                          <KebabPortal
                            kebabRef={kebabRef}
                            kebabPos={kebabPos}
                            kebabOpen={kebabOpen}
                            handleDelete={() =>
                              handleDelete(bookmark.cid, bookmark.mid)
                            }
                          />
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {isNewProjectOpen && (
        <NewProjectModal onClose={() => setIsNewProjectOpen(false)} />
      )}
    </div>
  );
};
