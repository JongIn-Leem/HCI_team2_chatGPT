import { createPortal } from "react-dom";
import * as Icons from "@/assets/svg";
import React from "react";

const KebabPortal = ({ kebabPos, kebabRef, isKebabOpen }) => {
  if (!isKebabOpen) return null;

  return createPortal(
    <div
      ref={kebabRef}
      style={{ top: `${kebabPos.top}px`, left: `${kebabPos.left}px` }}
      className="fixed w-45 bg-white border border-gray-300 shadow-lg rounded-2xl z-50"
    >
      <div className="w-full p-2 border-b border-gray-300 flex flex-col items-center">
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

export default KebabPortal;
