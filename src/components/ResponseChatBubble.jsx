import { useChatting } from "@/contexts";
import { useState, useRef, useEffect } from "react";

export const ResponseChatBubble = ({
  content,
  setPendingResponse,
  isResponding,
  setIsResponding,
  bindInterruptRef,
}) => {
  const { setChatList, currentChat, setCurrentChat } = useChatting();
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef(null);
  const hasCompleted = useRef(false);

  const onComplete = (finalText) => {
    if (hasCompleted.current) return;
    const newMessage = { role: "assistant", content: finalText };
    hasCompleted.current = true;

    setTimeout(() => {
      setChatList((prev) =>
        prev.map((chat) =>
          chat.id === currentChat.id
            ? {
                ...chat,
                messages: [...chat.messages, newMessage],
                updatedAt: Date.now(),
              }
            : chat
        )
      );
      setCurrentChat((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMessage] } : prev
      );
      setPendingResponse(null);
      setIsResponding(false);
    }, 0);
  };

  useEffect(() => {
    if (bindInterruptRef) {
      bindInterruptRef.current = () => {
        clearInterval(intervalRef.current);
        onComplete(displayed);
      };
    }
  }, [displayed]);

  useEffect(() => {
    if (!isResponding) return;

    let localIndex = 0;
    let localDisplayed = "";

    intervalRef.current = setInterval(() => {
      const nextChar = content.charAt(localIndex);
      localIndex += 1;

      localDisplayed += nextChar;
      setDisplayed(localDisplayed);

      if (localIndex >= content.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        onComplete(localDisplayed);
      }
    }, 15);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isResponding]);

  return (
    <div className="w-full flex justify-start my-2">
      <div className="max-w-[75%] px-4 py-2 rounded-2xl text-base text-left whitespace-pre-line bg-transparent">
        {displayed}
      </div>
    </div>
  );
};
