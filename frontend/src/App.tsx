import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Risks from "./pages/Risks";
import Testcases from "./pages/Testcases";
import Login from "./pages/Auth/Login";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="risks" element={<Risks />} />
            <Route path="testcases" element={<Testcases />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}