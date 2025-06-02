import {
  Prompt,
  ChatBubble,
  ResponseChatBubble,
  ResponseButtons,
} from "@/components";
import { useChatting } from "@/contexts";

export const ChattingPage = ({
  chatRef,
  bottomPadding,
  setBottomPadding,
  isResponding,
  setIsResponding,
  responseInterruptRef,
  pendingResponse,
  setPendingResponse,
  responseThumbs = {},
  setResponseThumbs,
  setIsGPT,
}) => {
  const { currentChat, currentProject, bookmarkList, setBookmarkList } =
    useChatting();

  return (
    <>
      <div
        ref={chatRef}
        className=" max-h-[calc(100vh - 200px)] w-full overflow-y-auto custom-scrollbar flex justify-center pt-1 mt-14"
      >
        <div className="w-200">
          {currentChat.messages.map((msg, idx) => (
            <div
              key={idx}
              id={`message-${currentChat.id}-${idx}`}
              className="flex flex-col items-start"
            >
              <ChatBubble role={msg.role} content={msg.content} />
              {msg.role === "assistant" && (
                <ResponseButtons
                  thumbs={responseThumbs?.[currentChat.id]?.[idx] || null}
                  setThumbs={(thumb) =>
                    setResponseThumbs((prev) => ({
                      ...prev,
                      [currentChat.id]: {
                        ...prev[currentChat.id],
                        [idx]: thumb,
                      },
                    }))
                  }
                  isBookMarked={bookmarkList.some(
                    (bookmark) =>
                      bookmark.cid === currentChat.id && bookmark.mid === idx
                  )}
                  deleteBookMark={() => {
                    setBookmarkList((prev) =>
                      prev.filter(
                        (b) => !(b.cid === currentChat.id && b.mid === idx)
                      )
                    );
                  }}
                  mid={idx}
                />
              )}
            </div>
          ))}
          {isResponding && pendingResponse && (
            <ResponseChatBubble
              content={pendingResponse}
              setPendingResponse={setPendingResponse}
              isResponding={isResponding}
              setIsResponding={setIsResponding}
              bindInterruptRef={responseInterruptRef}
            />
          )}
          <div
            className="bg-transparent"
            style={{ height: `${bottomPadding}px` }}
          ></div>
        </div>
      </div>
      <div className="z-20 fixed bottom-0 bg-transparent w-230 flex flex-col justify-center items-center">
        <Prompt
          chatRef={chatRef}
          setBottomPadding={setBottomPadding}
          isResponding={isResponding}
          setIsResponding={setIsResponding}
          responseInterruptRef={responseInterruptRef}
          setIsGPT={setIsGPT}
        />
        <p className="w-full h-8 flex items-center justify-center bg-white text-sm text-gray-700">
          ChatGPT는 실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
        </p>
      </div>
    </>
  );
};
