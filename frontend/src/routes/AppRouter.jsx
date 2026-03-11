import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "../features/home/pages/Chat";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/chat" />} />

        <Route path="/chat" element={<Chat />} />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;