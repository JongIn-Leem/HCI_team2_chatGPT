import { createContext, useState, useContext } from "react";

const DEFAULT_CONTEXT_VALUE = {
  isSideBarOpen: false,
  sideBarToggle: () => {},
};

const SideBarContext = createContext(DEFAULT_CONTEXT_VALUE);

const SideBarProvider = ({ children }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const sideBarToggle = () => {
    setSideBarOpen((prev) => !prev);
  };

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, sideBarToggle }}>
      {children}
    </SideBarContext.Provider>
  );
};

const useSideBar = () => {
  const { isSideBarOpen, sideBarToggle } = useContext(SideBarContext);
  if (!sideBarToggle) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return { isSideBarOpen, sideBarToggle };
};

export { SideBarProvider, useSideBar };
