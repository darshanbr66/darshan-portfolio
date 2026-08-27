import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth";

function AdminHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-6 sm:px-8">
      <div>
        <p className="text-sm font-medium text-[var(--color-ink)]">
          Portfolio Administration
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          px-3
          py-2
          text-sm
          font-medium
          text-[var(--color-ink-muted)]
          transition-colors
          hover:bg-[var(--color-surface-soft)]
          hover:text-[var(--color-ink)]
        "
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}

export default AdminHeader;