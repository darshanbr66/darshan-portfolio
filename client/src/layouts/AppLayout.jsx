import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;