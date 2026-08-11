import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;