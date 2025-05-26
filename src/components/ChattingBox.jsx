import { useChatting } from "@/contexts/ChattingContext";
import React from "react";
import classNames from "classnames";

const ChattingBox = ({ chat, isActive }) => {
  const { setCurrentChat } = useChatting();
  return (
    <div
      onClick={() => setCurrentChat(chat)}
      className={classNames("text-left p-2 rounded-xl mb-2 text-base", {
        "bg-gray-200 font-semibold hover:bg-gray-300": isActive,
        "hover:bg-gray-200": !isActive,
      })}
    >
      {chat.title}
    </div>
  );
};

export default ChattingBox;
