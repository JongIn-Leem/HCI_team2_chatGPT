import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import * as Icons from "@/assets/svg";
import { useChatting } from "@/contexts";
import { NewProjectModal } from "@/components";

export const ProjectPortal = ({
  setIsProjectOpen,
  projectRef,
  projectPos,
  selectedProject,
  setSelectedProject,
  newProjectModalRef,
}) => {
  const { projectList, setCurrentChat, setCurrentProject } = useChatting();

  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const handleClickOutside = (e) => {
        const projectEl = projectRef.current;
        const modalEl = newProjectModalRef?.current;

        if (
          projectEl &&
          !projectEl.contains(e.target) &&
          !(modalEl && modalEl.contains(e.target))
        ) {
          setIsProjectOpen(false);
          setIsNewProjectOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {createPortal(
        <div
          ref={projectRef}
          className="fixed z-50 w-52 bg-white border border-gray-300 rounded-3xl shadow-md"
          style={{
            top: `${projectPos.top}px`,
            left: `${projectPos.left}px`,
          }}
        >
          <div className="w-full p-2 flex flex-col items-start justify-start">
            {projectList
              .filter((project) => selectedProject?.id !== project.id)
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((project) => (
                <div
                  key={project.id}
                  className="w-full px-2 py-2 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsProjectOpen(false);
                  }}
                >
                  <Icons.Folder className="w-5 h-5 mr-2" />
                  <p>{project.title}</p>
                </div>
              ))}

            {selectedProject && (
              <div
                onClick={() => {
                  setSelectedProject(null);
                  setIsProjectOpen(false);
                }}
                className="w-full px-2 py-2 flex justify-between items-center rounded-xl hover:bg-gray-100 cursor-pointer"
              >
                <p>선택 안 함</p>
              </div>
            )}

            <hr className="text-gray-300 w-[80%] my-1" />

            <div
              className="w-full px-2 py-2 flex justify-start items-center rounded-xl hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsNewProjectOpen(true)}
            >
              <Icons.NewFolder className="w-5 h-5 mr-2" />
              <p>새로운 프로젝트</p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isNewProjectOpen && (
        <NewProjectModal
          onClose={() => setIsNewProjectOpen(false)}
          promptModalRef={newProjectModalRef}
          closeOnOutsideClick={false}
        />
      )}
    </>
  );
};
