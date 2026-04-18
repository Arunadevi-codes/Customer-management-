import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/customers/Customers";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/mainLayout";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </AuthProvider>
  );
}

export default App;