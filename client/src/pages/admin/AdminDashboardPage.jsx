import {
  UserRound,
  Code2,
  BriefcaseBusiness,
  FolderKanban,
  MessageSquare,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    label: "Profile",
    description:
      "Manage your personal and professional information.",
    icon: UserRound,
    path: "/admin/profile",
  },
  {
    label: "Content",
    description:
      "Manage editable text displayed across the portfolio.",
    icon: MessageSquare,
    path: "/admin/content",
  },
  {
    label: "Skills",
    description: "Manage your technical skills.",
    icon: Code2,
    path: "/admin/skills",
  },
  {
    label: "Experience",
    description:
      "Manage your professional experience.",
    icon: BriefcaseBusiness,
    path: "/admin/experience",
  },
  {
    label: "Projects",
    description:
      "Manage projects shown on your portfolio.",
    icon: FolderKanban,
    path: "/admin/projects",
  },
  {
    label: "Files",
    description:
      "Manage images, PDFs, and other uploaded files.",
    icon: Upload,
    path: "/admin/files",
  },
];

function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          Manage your portfolio.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
          Everything displayed on the public portfolio can be
          managed from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <button
              key={section.label}
              type="button"
              onClick={() => navigate(section.path)}
              className="
                group
                w-full
                rounded-2xl
                border
                border-[var(--color-border)]
                bg-transparent
                p-6
                text-left
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[var(--color-border-strong)]
                hover:bg-[var(--color-surface-soft)]
                hover:shadow-[0_8px_30px_rgba(17,17,17,0.06)]
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--color-accent)]
                focus:ring-offset-2
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-soft)] transition-colors group-hover:bg-[var(--color-canvas)]">
                  <Icon
                    size={18}
                    className="text-[var(--color-ink)]"
                  />
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    text-[var(--color-ink-muted)]
                    transition-all
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[var(--color-ink)]
                  "
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                {section.label}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                {section.description}
              </p>

              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                Manage {section.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboardPage;