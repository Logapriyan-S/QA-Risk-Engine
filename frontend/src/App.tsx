import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Risks from "./pages/Risks";
import Testcases from "./pages/Testcases"; // 👈 IMPORT ADDED HERE
import Login from "./pages/Auth/Login";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/risks" element={<Risks />} />
            <Route path="/testcases" element={<Testcases />} /> {/* 👈 ROUTE ADDED HERE */}
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}