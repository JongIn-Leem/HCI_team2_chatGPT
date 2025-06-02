import { useEffect, useRef, useState } from "react";
import {
  SideBar,
  Header,
  ChattingPage,
  NewChattingPage,
  ProjectDetailPage,
  GPTPage,
} from "@/components";
import { useSideBar, useChatting } from "@/contexts";
import { randomResponse } from "@/data/RandomResponse";

export default function MainPage() {
  const { isSideBarOpen } = useSideBar();
  const { currentChat, currentProject } = useChatting();

  const HIDE_HEADER_PATHS = [];

  const shouldShowHeader = !HIDE_HEADER_PATHS.includes(location.pathname);

  const chatRef = useRef(null);
  const [bottomPadding, setBottomPadding] = useState(200);

  useEffect(() => {
    const scroll = chatRef.current;
    if (scroll) {
      scroll.scrollTo({
        top: scroll.scrollHeight,
        behavior: "smooth",
      });
    }
    setBottomPadding(200);
  }, [currentChat?.id]);

  const [isGPT, setIsGPT] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [pendingResponse, setPendingResponse] = useState(null);
  const [responseThumbs, setResponseThumbs] = useState({});
  const [openProjects, setOpenProjects] = useState(new Set());
  const responseInterruptRef = useRef(null);

  useEffect(() => {
    if (isResponding && currentChat) {
      const random =
        randomResponse[Math.floor(Math.random() * randomResponse.length)];
      setPendingResponse(random);

      setResponseThumbs((prev) => ({
        ...prev,
        [currentChat.id]: null,
      }));
    }
  }, [isResponding]);

  useEffect(() => {
    if (!currentChat?.project) return;

    setOpenProjects((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentChat.project);
      return newSet;
    });
  }, [currentChat?.project]);

  useEffect(() => {
    if (currentChat || currentProject) {
      setIsGPT(false);
    }
  }, [currentChat, currentProject]);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-300 overflow-x-hidden transition-all duration-300 ${
          isSideBarOpen ? "w-64" : "w-0"
        }`}
      >
        {isSideBarOpen && (
          <SideBar openProjects={openProjects} setIsGPT={setIsGPT} />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-start items-center transition-transform duration-300">
        {shouldShowHeader && <Header setIsGPT={setIsGPT} />}
        {currentChat && (
          <ChattingPage
            chatRef={chatRef}
            bottomPadding={bottomPadding}
            setBottomPadding={setBottomPadding}
            isResponding={isResponding}
            setIsResponding={setIsResponding}
            responseInterruptRef={responseInterruptRef}
            pendingResponse={pendingResponse}
            setPendingResponse={setPendingResponse}
            responseThumbs={responseThumbs}
            setResponseThumbs={setResponseThumbs}
          />
        )}
        {!currentChat && !currentProject && isGPT && <GPTPage />}
        {!currentChat && !currentProject && !isGPT && (
          <NewChattingPage
            chatRef={chatRef}
            setBottomPadding={setBottomPadding}
            isResponding={isResponding}
            setIsResponding={setIsResponding}
            responseInterruptRef={responseInterruptRef}
          />
        )}
        {!currentChat && currentProject && (
          <ProjectDetailPage
            chatRef={chatRef}
            setBottomPadding={setBottomPadding}
            isResponding={isResponding}
            setIsResponding={setIsResponding}
            responseInterruptRef={responseInterruptRef}
          />
        )}
      </div>
    </div>
  );
}
