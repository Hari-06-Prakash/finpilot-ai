import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import Income from "./pages/Income";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/expenses" element={<Expenses />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/budget" element={<Budget />} />
        
        <Route path="/income" element={<Income />} />
      </Route>

    </Routes>
  );
}

export default App;