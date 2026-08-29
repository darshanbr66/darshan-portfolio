import {
  LayoutDashboard,
  UserRound,
  FileText,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Upload,
  MessageSquare,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Profile",
    path: "/admin/profile",
    icon: UserRound,
  },
  // {
  //   label: "Content",
  //   path: "/admin/content",
  //   icon: FileText,
  // },
  {
    label: "Skills",
    path: "/admin/skills",
    icon: Code2,
  },
  {
    label: "Experience",
    path: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Files",
    path: "/admin/files",
    icon: Upload,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
];

function AdminSidebar({
  mobile = false,
  onNavigate,
}) {
  if (mobile) {
    return (
      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-[var(--color-surface-soft)] text-[var(--color-ink)]"
                      : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-ink)]"
                  }
                `
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-[var(--color-border)] px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Portfolio
          </p>

          <p className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
            Admin
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    transition-colors
                    ${
                      isActive
                        ? "bg-[var(--color-surface-soft)] text-[var(--color-ink)]"
                        : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-ink)]"
                    }
                  `
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;