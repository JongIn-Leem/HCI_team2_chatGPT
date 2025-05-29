import { createPortal } from "react-dom";
import * as Icons from "@/assets/svg";
import React from "react";

export const FilterPortal = ({ isOpen, filterRef, filterPos }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      ref={filterRef}
      className="fixed z-50 w-45 bg-white border border-gray-300 rounded-3xl shadow-md"
      style={{
        top: `${filterPos.top}px`,
        left: `${filterPos.left}px`,
      }}
    >
      <div className="w-full p-2 flex flex-col items-center">
        <div className="w-full px-2 py-1.5 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer">
          <Icons.Edit className="w-5 h-5 mr-2" />
          <p>이름 바꾸기</p>
        </div>
        <div className="w-full px-2 py-1.5 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer">
          <Icons.Folder className="w-5 h-5 mr-2" />
          <p>프로젝트로 이동</p>
        </div>
        <div className="w-full px-2 py-1.5 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer">
          <Icons.Close className="w-5 h-5 mr-2" />
          <p>프로젝트에서 제거</p>
        </div>
        <hr className="text-gray-300 w-[80%] my-1"></hr>
        <div className="w-full px-2 py-1.5 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer">
          <Icons.Folder className="w-5 h-5 mr-2" />
          <p>아카이브에 보관</p>
        </div>
        <div className="w-full px-2 py-1.5 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer">
          <Icons.Close className="w-5 h-5 mr-2 text-red-500" />
          <p className="text-red-500">삭제</p>
        </div>
      </div>
    </div>,
    document.body
  );
};
