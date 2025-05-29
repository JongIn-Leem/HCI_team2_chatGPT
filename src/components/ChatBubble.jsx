export const ChatBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} my-2`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-base text-left whitespace-pre-line ${
          isUser ? "bg-gray-100 " : "bg-transparent"
        }`}
      >
        {content}
      </div>
    </div>
  );
};
