import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import Lounge from "./pages/Lounge";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lounge" element={isAuthenticated ? <Lounge /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
