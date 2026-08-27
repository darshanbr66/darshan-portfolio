import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import ProjectDetailPage from "../pages/public/ProjectDetailPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

import AdminLayout from "../components/admin/AdminLayout";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";

import AdminProfilePage from "../pages/admin/AdminProfilePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}

        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetailPage />}
          />
        </Route>

        {/* Admin login */}

        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />

        {/* Protected admin */}

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<AdminDashboardPage />}
            />
            <Route
              path="/admin/profile"
              element={<AdminProfilePage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;