import * as Icons from "@/assets/svg";

export const Prompt = () => {
  return (
    <div className="fixed bottom-0 w-full flex justify-center items-center">
      <div className="bg-transparent w-[60%] flex flex-col items-center p-2">
        <div className="w-10 h-10 mb-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
          <Icons.ArrowDown className="" />
        </div>
        <div className="w-full rounded-3xl border-2 border-gray-200">
          <textarea
            className="w-full h-25 overflow-y-auto p-5 text-lg text-gray-600 bg-transparent outline-none resize-none"
            placeholder="무엇이든 물어보세요"
          ></textarea>
          <div className="flex items-center justify-between">
            <div className="p-2 flex items-center">
              <Icons.Plus className="p-2 w-10 h-10 hover:bg-gray-300 rounded-full cursor-pointer" />
              <div className="h-10 pr-2 flex items-center hover:bg-gray-300 rounded-full cursor-pointer">
                <Icons.Filter className="p-2 w-10 h-10" />
                <p className="text-m">도구</p>
              </div>
            </div>
            <div className="p-2 flex items-center">
              <Icons.Voice className="p-2 w-10 h-10 hover:bg-gray-300 rounded-full cursor-pointer" />
              <Icons.ArrowUp className="ml-1 p-2 w-10 h-10 text-white bg-black hover:bg-gray-300 rounded-full cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
