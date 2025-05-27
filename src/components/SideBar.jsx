import * as Icons from "@/assets/svg";
import { useSideBar, useChatting } from "@/contexts";
import ChattingBox from "./ChattingBox";

export const SideBar = () => {
  const { sideBarToggle } = useSideBar();
  const { chatList, currentChat, setCurrentChat } = useChatting();

  return (
    <div className="fixed top-0 left-0 z-20 w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-300 transition-transform duration-300">
      <div className="flex w-full p-2 border-b border-gray-300 items-center justify-between">
        <Icons.ChatGPTLogo
          className="p-2 w-10 h-10 rounded-md cursor-pointer hover:bg-gray-300"
          onClick={() => setCurrentChat(null)}
        />
        <Icons.SideBar
          className={`p-2 w-10 h-10 text-gray-300 rounded-md cursor-pointer hover:bg-gray-300 `}
          onClick={sideBarToggle}
        />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-start ">
        <div className="flex flex-col items-start mb-8 m-4">
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.NewChat className="p-2 w-10 h-10"></Icons.NewChat>
            <p className="text-sm">새 채팅</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Search className="p-2 w-10 h-10"></Icons.Search>
            <p className="text-sm">채팅 검색</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Text className="p-2.5 w-10 h-10"></Icons.Text>
            <p className="text-sm">라이브러리</p>
          </div>
        </div>
        <div className="flex flex-col items-start mb-8 m-4">
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2 w-10 h-10"></Icons.Grid>
            <p className="text-sm">Wolfram</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2 w-10 h-10"></Icons.Grid>
            <p className="text-sm">GPT</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2 w-10 h-10"></Icons.Grid>
            <p className="text-sm">GPT</p>
          </div>
        </div>
        <div className="flex flex-col items-start ml-4">
          <p className="text-gray-400 m-2 text-sm">지난 30일</p>
          {chatList.map((chat) => (
            <ChattingBox
              key={chat.id}
              chat={chat}
              isActive={currentChat?.id === chat.id}
            />
          ))}
        </div>
      </div>
      <div className="w-full border-t p-2 border-gray-300">
        <div className="hover:bg-gray-200 rounded-xl p-2 flex items-center">
          <Icons.Plan className="p-2 w-10 h-10"></Icons.Plan>
          <div className="flex flex-col items-start ml-2 mr-2">
            <p className="text-sm">플랜 보기</p>
            <p className="text-xs text-gray-500 text-left">
              제한 없는 액세스, 팀 기능, 그 외에 많은 것들
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
