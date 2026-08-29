import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/layout/Footer";
import ScrollControls from "../components/ui/ScrollControls";

function AppLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <ScrollControls />
    </div>
  );
}

export default AppLayout;