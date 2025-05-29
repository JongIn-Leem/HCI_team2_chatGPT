import { useState, useEffect } from "react";
import * as Icons from "@/assets/svg";

export const ResponseButtons = ({ thumbs, setThumbs }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);

  return (
    <div className="w-full px-2 flex justify-start items-center">
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoveredId("copy")}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => {
          navigator.clipboard.writeText("복사할 텍스트");
          setHoveredId(null);
          setIsCopied(true);
        }}
      >
        {isCopied ? (
          <Icons.Check className="p-2.5 w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer" />
        ) : (
          <Icons.Copy className="p-2 w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer" />
        )}
        {!isCopied && hoveredId === "copy" && (
          <div className="absolute top-full mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-lg shadow-md whitespace-nowrap z-10">
            복사
          </div>
        )}
      </div>
      {!thumbs && (
        <>
          <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredId("good")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setThumbs("up");
            }}
          >
            <Icons.Good className="p-2 w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer" />
            {hoveredId === "good" && (
              <div className="absolute top-full mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-lg shadow-md whitespace-nowrap z-10">
                좋은 응답
              </div>
            )}
          </div>

          <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredId("bad")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setThumbs("down");
            }}
          >
            <Icons.Bad className="p-2 w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer" />
            {hoveredId === "bad" && (
              <div className="absolute top-full mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-lg shadow-md whitespace-nowrap z-10">
                별로인 응답
              </div>
            )}
          </div>
        </>
      )}
      {thumbs === "up" && (
        <div className="relative flex flex-col items-center">
          <Icons.GoodFill className="p-2 w-9 h-9 text-black hover:bg-gray-100 rounded-lg cursor-pointer" />
        </div>
      )}
      {thumbs === "down" && (
        <div className="relative flex flex-col items-center">
          <Icons.BadFill className="p-2 w-9 h-9 text-black hover:bg-gray-100 rounded-lg cursor-pointer" />
        </div>
      )}

      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoveredId("edit")}
        onMouseLeave={() => setHoveredId(null)}
      >
        <Icons.Edit className="p-2 w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer" />
        {hoveredId === "edit" && (
          <div className="absolute top-full mt-1 px-2 py-1 text-sm font-semibold text-white bg-black rounded-lg shadow-md whitespace-nowrap z-10">
            캔버스에서 편집
          </div>
        )}
      </div>
    </div>
  );
};
