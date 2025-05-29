import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  SideBar,
  Header,
  Prompt,
  ChatBubble,
  ResponseChatBubble,
} from "@/components";
import { useSideBar, useChatting } from "@/contexts";
import { randomResponse } from "@/data/RandomResponse";

export default function MainPage() {
  const { isSideBarOpen } = useSideBar();
  const { chatList, currentChat } = useChatting();

  const HIDE_HEADER_PATHS = [];
  const HIDE_PROMPT_PATHS = [];

  const shouldShowHeader = !HIDE_HEADER_PATHS.includes(location.pathname);
  const shouldShowPrompt = !HIDE_PROMPT_PATHS.includes(location.pathname);

  const activeChat = currentChat
    ? chatList.find((chat) => chat.id === currentChat.id)
    : null;

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
  }, [currentChat]);

  const [isResponding, setIsResponding] = useState(false);
  const [pendingResponse, setPendingResponse] = useState(null);

  useEffect(() => {
    if (isResponding && currentChat) {
      const random =
        randomResponse[Math.floor(Math.random() * randomResponse.length)];
      setPendingResponse(random);
    }
  }, [isResponding]);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-300 overflow-x-hidden transition-all duration-300 ${
          isSideBarOpen ? "w-64" : "w-0"
        }`}
      >
        {isSideBarOpen && <SideBar />}
      </div>
      <div className="flex-1 flex justify-center transition-transform duration-300">
        {shouldShowHeader && <Header activeChat={activeChat} />}
        {activeChat ? (
          <div
            ref={chatRef}
            className="max-h-[calc(100vh - 200px)] w-full overflow-y-auto custom-scrollbar flex justify-center pt-1 mt-14"
          >
            <div className="w-230">
              {activeChat.messages.map((msg, idx) => (
                <ChatBubble key={idx} role={msg.role} content={msg.content} />
              ))}
              {isResponding && pendingResponse && (
                <ResponseChatBubble
                  content={pendingResponse}
                  setPendingResponse={setPendingResponse}
                  isResponding={isResponding}
                  setIsResponding={setIsResponding}
                />
              )}
              <div
                className="bg-transparent"
                style={{ height: `${bottomPadding}px` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className=""></div>
        )}
        {shouldShowPrompt && (
          <Prompt
            chatRef={chatRef}
            setBottomPadding={setBottomPadding}
            isResponding={isResponding}
            setIsResponding={setIsResponding}
          />
        )}
      </div>
    </div>
  );
}
