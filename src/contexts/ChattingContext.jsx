import { createContext, useContext, useState } from "react";
import { chatList as initialChatList } from "@/data/chatData";

const DEFAULT_CONTEXT_VALUE = {
  currentChat: null,
  setCurrentChat: () => {},
};

const ChattingContext = createContext(DEFAULT_CONTEXT_VALUE);

const ChattingProvider = ({ children }) => {
  const [chatList, setChatList] = useState(initialChatList);
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <ChattingContext.Provider
      value={{ chatList, setChatList, currentChat, setCurrentChat }}
    >
      {children}
    </ChattingContext.Provider>
  );
};

const useChatting = () => {
  const { chatList, setChatList, currentChat, setCurrentChat } =
    useContext(ChattingContext);
  if (!setCurrentChat || !setChatList) {
    throw new Error("useChatting must be used within a ChattingProvider");
  }

  return { chatList, setChatList, currentChat, setCurrentChat };
};

export { ChattingProvider, useChatting };
