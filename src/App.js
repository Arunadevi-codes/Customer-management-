import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from './pages/Sidebar';
import Topbar from './pages/Topbar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  } 
/>

<Route 
  path="/customers" 
  element={
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <Customers />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  } 
/>
        </Routes>
      </BrowserRouter>

      <ToastContainer 
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}

export default App;