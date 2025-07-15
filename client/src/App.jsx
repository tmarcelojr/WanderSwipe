import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TripDashboard from "./pages/TripDashboard";
import TripCreatePage from "./pages/TripCreatePage";
import SwipeView from "./components/SwipeView";
import TripDetailsPage from "./pages/TripDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<TripDashboard />} />
      <Route path="/trip/new" element={<TripCreatePage />} />
      <Route path="/trip/:id" element={<TripDetailsPage />} />
      <Route path="/swipe" element={<SwipeView />} />
    </Routes>
  );
}
