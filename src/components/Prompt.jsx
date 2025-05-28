import * as Icons from "@/assets/svg";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";
import { useChatting } from "@/contexts/";

export const Prompt = ({ chatRef, lastMsgRef, setBottomPadding }) => {
  const [text, setText] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const { chatList, setChatList, currentChat, setCurrentChat } = useChatting();
  const isComposingRef = useRef(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentChat]);

  useEffect(() => {
    const scroll = chatRef.current;
    if (!scroll) {
      return;
    }

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroll;
      setShowArrow(scrollTop + clientHeight < scrollHeight - 5);
    };

    scroll.addEventListener("scroll", onScroll);
    onScroll();

    return () => scroll.removeEventListener("scroll", onScroll);
  }, [currentChat]);

  const scrollToBottom = () => {
    const scroll = chatRef.current;
    if (scroll) {
      scroll.scrollTo({
        top: scroll.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const estimatePaddingFromText = (text) => {
    const MAX_WIDTH_CHARS = 75; // 한 줄에 들어갈 최대 문자 수 (공백 포함)
    const lineHeight = 22.5; // 한 줄 높이(px)

    const lines = text.split("\n").flatMap((line) => {
      const len = line.length;
      const wrapped = Math.ceil(len / MAX_WIDTH_CHARS);
      return Array(wrapped).fill(1);
    });

    const totalLines = lines.length;

    const padding = Math.max(770 - totalLines * lineHeight, 200); // 최소 200px 보장
    return padding;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposingRef.current) {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      const newMessage = { role: "user", content: text.trim() };

      if (currentChat) {
        setChatList((prevList) =>
          prevList.map((chat) =>
            chat.id === currentChat.id
              ? {
                  ...chat,
                  updatedAt: Date.now(),
                  messages: [...chat.messages, newMessage],
                }
              : chat
          )
        );
      } else {
        const titleText = newMessage.content;
        const title =
          titleText.length > 13 ? titleText.slice(0, 13) + ".." : titleText;
        const newChat = {
          id: Date.now(),
          title,
          updatedAt: Date.now(),
          messages: [newMessage],
        };

        setChatList((prevList) => [newChat, ...prevList]);
        setCurrentChat(newChat);
      }

      setText("");
      const estimatedPadding = estimatePaddingFromText(text.trim());
      setBottomPadding(estimatedPadding);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  };

  return (
    <div
      className={classNames(
        "bg-transparent w-230 flex flex-col justify-center items-center",
        { "fixed bottom-0": currentChat }
      )}
    >
      {currentChat ? (
        <div
          className={classNames(
            "w-10 h-10 mb-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center transition-opacity duration-300",
            {
              "opacity-100": showArrow,
              "opacity-0 pointer-events-none": !showArrow,
            }
          )}
        >
          <Icons.ArrowDown
            className="cursor-pointer"
            onClick={scrollToBottom}
          />
        </div>
      ) : (
        <p className="text-3xl font-medium mb-10">무엇을 도와드릴까요?</p>
      )}
      <div className=" bg-white rounded-3xl border-2 border-gray-200">
        <textarea
          ref={textareaRef}
          className="w-230 h-20 overflow-y-auto p-5 text-lg text-gray-600 bg-transparent outline-none resize-none"
          placeholder="무엇이든 물어보세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => (isComposingRef.current = true)}
          onCompositionEnd={() => (isComposingRef.current = false)}
        ></textarea>
        <div className="flex items-center justify-between">
          <div className="p-2 flex items-center">
            <Icons.Plus className="p-2 w-10 h-10 hover:bg-gray-100 rounded-full cursor-pointer" />
            <div className="h-10 pr-2 flex items-center hover:bg-gray-100 rounded-full cursor-pointer">
              <Icons.Filter className="p-2 w-10 h-10" />
              <p className="text-m">도구</p>
            </div>
          </div>
          <div className="p-2 flex items-center">
            <Icons.Voice className="p-2 w-10 h-10 hover:bg-gray-100 rounded-full cursor-pointer" />
            {text ? (
              <Icons.ArrowUp className="ml-1 p-2 w-10 h-10 text-white bg-black hover:bg-gray-300 rounded-full cursor-pointer" />
            ) : (
              <Icons.VoiceMode className="ml-1 p-2 w-10 h-10 text-white bg-black hover:bg-gray-300 rounded-full cursor-pointer" />
            )}
          </div>
        </div>
      </div>
      {currentChat && (
        <p className="w-full h-5 bg-white text-sm">
          ChatGPT는 실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
        </p>
      )}
    </div>
  );
};
