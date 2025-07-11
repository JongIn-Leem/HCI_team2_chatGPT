import "./App.css";
import MainPage from "./routes/MainPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SideBarProvider, ChattingProvider } from "./contexts";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <SideBarProvider>
        <ChattingProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </ChattingProvider>
      </SideBarProvider>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
