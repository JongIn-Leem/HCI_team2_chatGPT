import { createContext, useState, useContext } from "react";

const DEFAULT_CONTEXT_VALUE = {
  isSideBarOpen: false,
  sideBarToggle: () => {},
  isSubSideBarOpen: false,
  subSideBarToggle: () => {},
};

const SideBarContext = createContext(DEFAULT_CONTEXT_VALUE);

const SideBarProvider = ({ children }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [subSideBarOpen, setSubSideBarOpen] = useState(false);

  const sideBarToggle = () => {
    setSideBarOpen((prev) => !prev);
  };
  const subSideBarToggle = (mark) => {
    setSubSideBarOpen(mark);
  };

  return (
    <SideBarContext.Provider
      value={{
        isSideBarOpen,
        sideBarToggle,
        subSideBarOpen,
        subSideBarToggle,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

const useSideBar = () => {
  const { isSideBarOpen, sideBarToggle, subSideBarOpen, subSideBarToggle } =
    useContext(SideBarContext);
  if (!sideBarToggle || !subSideBarToggle) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return { isSideBarOpen, sideBarToggle, subSideBarOpen, subSideBarToggle };
};

export { SideBarProvider, useSideBar };
