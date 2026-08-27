import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader />

          <main className="px-6 py-8 sm:px-8 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;