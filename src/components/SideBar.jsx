import * as Icons from "@/assets/svg";
import { chatList } from "@/data/chatData";
import { useSideBar, useChatting } from "@/contexts";
import ChattingBox from "./ChattingBox";

export const SideBar = () => {
  const { sideBarToggle } = useSideBar();
  const { currentChat, setCurrentChat } = useChatting();

  return (
    <div className="fixed top-0 left-0 z-20 w-64 h-screen flex flex-col bg-gray-100 border-r border-gray-300 transition-transform duration-300">
      <div className="flex w-full p-2 border-b border-gray-300 items-center justify-between">
        <Icons.ChatGPTLogo className="p-1 w-8 h-8" />
        <Icons.SideBar
          className={`p-2 w-10 h-10 text-gray-300 rounded-md cursor-pointer hover:bg-gray-300 `}
          onClick={sideBarToggle}
        />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-start ">
        <div className="flex flex-col items-start mb-8 m-4">
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.NewChat className="p-2 w-10 h-10"></Icons.NewChat>
            <p className="text-base">새 채팅</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Search className="p-2 w-10 h-10"></Icons.Search>
            <p className="text-base">채팅 검색</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Text className="p-2.5 w-10 h-10"></Icons.Text>
            <p className="text-base">라이브러리</p>
          </div>
        </div>
        <div className="flex flex-col items-start mb-8 m-4">
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2 w-10 h-10"></Icons.Grid>
            <p className="text-base">Wolfram</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2 w-10 h-10"></Icons.Grid>
            <p className="text-base">GPT</p>
          </div>
          <div className="flex items-center rounded-xl pr-2 hover:bg-gray-200">
            <Icons.Grid className="p-2 w-10 h-10"></Icons.Grid>
            <p className="text-base">GPT</p>
          </div>
        </div>
        <div className="flex flex-col items-start m-4">
          <p className="text-gray-300 m-2">지난 30일</p>
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
          <div className="flex flex-col">
            <p className="text-base">플랜 업그레이드</p>
            <p className="text-sm text-gray-500">최고 모델에 더 많은 액세스</p>
          </div>
        </div>
      </div>
    </div>
  );
};
