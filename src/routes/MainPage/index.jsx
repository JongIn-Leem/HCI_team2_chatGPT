import ChatBubble from "@/components/ChatBubble";
import { chatList } from "@/data/chatData";
import React from "react";
import { SideBar, Header, Prompt } from "@/components";
import { useSideBar, useChatting } from "@/contexts";

export default function MainPage() {
  const { isSideBarOpen } = useSideBar();
  const { currentChat } = useChatting();

  const HIDE_HEADER_PATHS = [];
  const HIDE_PROMPT_PATHS = [];

  const shouldShowHeader = !HIDE_HEADER_PATHS.includes(location.pathname);
  const shouldShowPrompt = !HIDE_PROMPT_PATHS.includes(location.pathname);

  const activeChat = currentChat
    ? chatList.find((chat) => chat.id === currentChat.id)
    : null;

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-300 overflow-hidden transition-all duration-300 ${
          isSideBarOpen ? "w-64" : "w-0"
        }`}
      >
        {isSideBarOpen && <SideBar />}
      </div>
      <div className="flex-1 flex justify-center transition-transform duration-300">
        {shouldShowHeader && <Header activeChat={activeChat} />}

        <div className="w-full overflow-y-auto custom-scrollbar flex justify-center pt-1 mt-14 mb-40">
          <div className="w-250">
            {activeChat ? (
              activeChat.messages.map((msg, idx) => (
                <ChatBubble key={idx} role={msg.role} content={msg.content} />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {shouldShowPrompt && <Prompt />}
      </div>
    </div>
  );
}
