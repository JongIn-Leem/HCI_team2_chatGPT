import { createContext, useContext, useState } from "react";
import { chatList as initialChatList } from "@/data/chatData";
import { projectList as initialProjectList } from "@/data/projectData";

const DEFAULT_CONTEXT_VALUE = {
  currentChat: null,
  setCurrentChat: () => {},
};

const ChattingContext = createContext(DEFAULT_CONTEXT_VALUE);

const ChattingProvider = ({ children }) => {
  const [chatList, setChatList] = useState(initialChatList);
  const [currentChat, setCurrentChat] = useState(null);
  const [projectList, setProjectList] = useState(initialProjectList);
  const [currentProject, setCurrentProject] = useState(null);

  return (
    <ChattingContext.Provider
      value={{
        chatList,
        setChatList,
        currentChat,
        setCurrentChat,
        projectList,
        setProjectList,
        currentProject,
        setCurrentProject,
      }}
    >
      {children}
    </ChattingContext.Provider>
  );
};

const useChatting = () => {
  const {
    chatList,
    setChatList,
    currentChat,
    setCurrentChat,
    currentProject,
    setCurrentProject,
    projectList,
    setProjectList,
  } = useContext(ChattingContext);
  if (!setCurrentChat || !setChatList) {
    throw new Error("useChatting must be used within a ChattingProvider");
  }

  return {
    chatList,
    setChatList,
    currentChat,
    setCurrentChat,
    currentProject,
    setCurrentProject,
    projectList,
    setProjectList,
  };
};

export { ChattingProvider, useChatting };
