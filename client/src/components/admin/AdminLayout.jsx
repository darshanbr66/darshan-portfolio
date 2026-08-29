import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}

        <AdminSidebar />

        <div className="min-w-0 flex-1">
          {/* Mobile navigation button */}

          <div className="flex h-16 items-center border-b border-[var(--color-border)] px-4 lg:hidden">
            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              className="
                inline-flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-[var(--color-ink)]
                transition
                hover:bg-[var(--color-surface-soft)]
              "
              aria-label="Open admin navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={21} />
            </button>

            <div className="ml-3">
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                Portfolio Admin
              </p>
            </div>
          </div>

          <AdminHeader />

          <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile navigation drawer */}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}

          <button
            type="button"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-black/30"
            aria-label="Close admin navigation"
          />

          {/* Drawer */}

          <aside
            className="
              relative
              flex
              h-full
              w-72
              max-w-[85vw]
              flex-col
              bg-[var(--color-surface)]
              shadow-xl
            "
          >
            {/* Drawer header */}

            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Portfolio
                </p>

                <p className="mt-1 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                  Admin
                </p>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-[var(--color-ink-muted)]
                  transition
                  hover:bg-[var(--color-surface-soft)]
                  hover:text-[var(--color-ink)]
                "
                aria-label="Close admin navigation"
              >
                <X size={19} />
              </button>
            </div>

            {/* Navigation */}

            <div className="flex-1 overflow-y-auto px-3 py-5">
              <AdminSidebar
                mobile
                onNavigate={closeMobileMenu}
              />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;