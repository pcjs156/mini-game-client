import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Lounge from "./pages/Lounge";
import { useAuthStore } from "./stores/auth";

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lounge" element={isAuthenticated ? <Lounge /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
