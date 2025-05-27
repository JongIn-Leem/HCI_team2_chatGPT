import { useChatting } from "@/contexts/ChattingContext";
import React from "react";
import classNames from "classnames";

const ChattingBox = ({ chat, isActive }) => {
  const { setCurrentChat } = useChatting();
  return (
    <div
      onClick={() => setCurrentChat(chat)}
      className={classNames("text-left p-2 w-53 rounded-lg mb-2 text-sm", {
        "bg-gray-200  hover:bg-gray-300": isActive,
        "hover:bg-gray-200": !isActive,
      })}
    >
      {chat.title}
    </div>
  );
};

export default ChattingBox;
