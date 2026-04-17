import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/customers/Customers";

import Sidebar from "./pages/Sidebar";
import Topbar from "./pages/Topbar";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Layout Component
const AuthenticatedLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />

              <Route
                path="/staff"
                element={
                  <div>
                    <h1 className="text-2xl font-bold">Staff Management</h1>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                  </div>
                }
              />

            </Route>
          </Route>

        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;