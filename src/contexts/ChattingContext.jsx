import { createContext, useContext, useState } from "react";

const DEFAULT_CONTEXT_VALUE = {
  currentChat: null,
  setCurrentChat: () => {},
};

const ChattingContext = createContext(DEFAULT_CONTEXT_VALUE);

const ChattingProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <ChattingContext.Provider value={{ currentChat, setCurrentChat }}>
      {children}
    </ChattingContext.Provider>
  );
};

const useChatting = () => {
  const { currentChat, setCurrentChat } = useContext(ChattingContext);
  if (!setCurrentChat) {
    throw new Error("useChatting must be used within a ChattingProvider");
  }
  return { currentChat, setCurrentChat };
};

export { ChattingProvider, useChatting };
