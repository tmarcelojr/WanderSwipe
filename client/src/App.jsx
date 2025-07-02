import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TripDashboard from "./pages/TripDashboard";
import TripCreatePage from "./pages/TripCreatePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<TripDashboard />} />
      <Route path="/create-trip" element={<TripCreatePage />} />
    </Routes>
  );
}
