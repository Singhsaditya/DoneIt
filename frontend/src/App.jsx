import { useEffect } from "react";
import useHydrateAuth from "./hooks/useHydrateAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

import AppLayout from "./components/layout/AppLayout";
import Toaster from "./components/ui/Toaster";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// App pages
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import TaskForm from "./pages/TaskForm";
import SLAMonitor from "./pages/SLAMonitor";
import Notifications from "./pages/Notifications";
import AuditLogs from "./pages/AuditLogs";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";

/* ===============================
   AUTH GUARD
================================ */
function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* ===============================
   ROLE DASHBOARD
================================ */
function DashboardRouter() {
  const user = useAuthStore((s) => s.user);

  if (user?.role === "admin") return <AdminDashboard />;
  if (user?.role === "manager") return <ManagerDashboard />;
  return <EmployeeDashboard />;
}

export default function App() {
  useEffect(() => { if (localStorage.getItem("token") && window.location.pathname === "/signup") window.location.href = "/"; }, []);
  useHydrateAuth();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        {/* ===============================
            PUBLIC AUTH ROUTES
        ================================ */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />

        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />

        {/* ===============================
            PROTECTED APP ROUTES
        ================================ */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardRouter />} />

          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/:id" element={<TaskDetail />} />

          <Route
            path="tasks/new"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <TaskForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="tasks/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <TaskForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="sla"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <SLAMonitor />
              </ProtectedRoute>
            }
          />

          <Route path="notifications" element={<Notifications />} />

          <Route
            path="audit"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AuditLogs />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ===============================
            FALLBACK
        ================================ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
