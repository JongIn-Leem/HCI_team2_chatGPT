import * as Icons from "@/assets/svg";

export const Header = () => {
  return (
    <div className="sticky bg-gray-200 w-full top-0 flex items-center justify-between p-2">
      <div className="flex">
        <Icons.SideBar className="p-2 w-10 h-10 text-gray-600 hover:bg-gray-300 rounded-md cursor-pointer" />
        <Icons.NewChat className="p-2 w-10 h-10 text-gray-600 hover:bg-gray-300 rounded-md cursor-pointer" />
        <div className="flex items-center gap-2 pl-2">
          <p className="text-xl font-bold text-gray-600  hover:bg-gray-300 rounded-md cursor-pointer">
            김철수
          </p>
        </div>
        <Icons.ArrowRight className="p-2 w-10 h-10 text-gray-600" />
        <div className="flex items-center gap-2  hover:bg-gray-300 rounded-md cursor-pointer">
          <p className="text-xl font-bold text-gray-600 ">현재 채팅 제목</p>
          <p className="text-sm text-gray-600">4o</p>
          <Icons.ArrowDown className="p-2 w-10 h-10 text-gray-600" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Icons.KebabVertical className="p-2 w-10 h-10 text-gray-600 hover:bg-gray-300 rounded-md cursor-pointer" />
        <div className="mr-2 w-9 h-9 rounded-full bg-amber-400 border-2 border-white"></div>
      </div>
    </div>
  );
};
