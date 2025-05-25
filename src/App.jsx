import "./App.css";
import MainPage from "./routes/MainPage";
import { Header, Prompt } from "@/components";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  const HIDE_HEADER_PATHS = [];
  const HIDE_PROMPT_PATHS = [];

  const shouldShowHeader = !HIDE_HEADER_PATHS.includes(location.pathname);
  const shouldShowPrompt = !HIDE_PROMPT_PATHS.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      {shouldShowPrompt && <Prompt />}
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
