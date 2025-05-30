import { useRef, useEffect, useState } from "react";
import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts";
import classNames from "classnames";

export const NewProjectModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const {
    chatList,
    currentChat,
    setCurrentChat,
    setCurrentProject,
    setProjectList,
  } = useChatting();
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      id: Date.now(),
      title: projectName,
      createdAt: Date.now(),
    };

    setProjectList((prev) => [...prev, newProject]);
    setCurrentProject(newProject);
    setCurrentChat(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-140 h-80 p-4 px-6 flex flex-col items-center justify-start border-1 border-gray-300 bg-white rounded-xl shadow-xl"
      >
        <div className="w-full mb-7 flex justify-between items-center">
          <p className="text-xl font-semibold">프로젝트 이름</p>
          <Icons.Close
            className="p-2.5 w-10 h-10 rounded-full hover:bg-gray-200"
            onClick={() => onClose()}
          />
        </div>
        <input
          type="text"
          placeholder="예: 생일 파티 계획"
          value={projectName}
          autoFocus
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full h-10 p-4 mb-5 text-lg rounded-lg focus:outline-black focus:outline-3"
        />
        <div className="w-full py-2 mb-7 bg-gray-100 rounded-lg flex justify-between items-center">
          <Icons.Bulb className="ml-1 p-2.5 w-10 h-10 text-gray-600" />
          <div className="ml-2 flex-1 flex flex-col justify-center items-start">
            <p className="text-xs text-gray-700 font-semibold">
              프로젝트란 무엇인가요?
            </p>
            <p className="text-xs text-gray-600">
              프로젝트에서는 한 곳에 파일, 맞춤형 지침을 보관합니다. 지속적으로
              진행되는 작업에,
            </p>
            <p className="text-xs text-gray-600">
              또는 작업을 깔끔히 정리하기에 좋죠.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <div
            className="px-4 py-2 mr-3 border-1 border-gray-200 hover:bg-gray-200 cursor-pointer rounded-full flex justify-center items-center"
            onClick={() => onClose()}
          >
            <p className="font-semibold">취소</p>
          </div>
          <div
            className={classNames(
              "px-4 py-2 hover:opacity-80 rounded-full flex justify-center items-center",
              {
                "cursor-pointer bg-black": projectName.trim(),
                "cursor-not-allowed bg-gray-500": !projectName.trim(),
              }
            )}
            onClick={handleCreateProject}
          >
            <p className="font-semibold text-white">프로젝트 만들기</p>
          </div>
        </div>
      </div>
    </div>
  );
};
