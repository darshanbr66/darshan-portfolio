import {
  UserRound,
  Code2,
  BriefcaseBusiness,
  FolderKanban,
  MessageSquare,
  Upload,
} from "lucide-react";

const sections = [
  {
    label: "Profile",
    description: "Manage your personal and professional information.",
    icon: UserRound,
  },
  {
    label: "Content",
    description: "Manage editable text displayed across the portfolio.",
    icon: MessageSquare,
  },
  {
    label: "Skills",
    description: "Manage your technical skills.",
    icon: Code2,
  },
  {
    label: "Experience",
    description: "Manage your professional experience.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Projects",
    description: "Manage projects shown on your portfolio.",
    icon: FolderKanban,
  },
  {
    label: "Files",
    description: "Manage images, PDFs, and other uploaded files.",
    icon: Upload,
  },
];

function AdminDashboardPage() {
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
            <div
              key={section.label}
              className="
                rounded-2xl
                border
                border-[var(--color-border)]
                p-6
                transition
                hover:border-[var(--color-border-strong)]
              "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-soft)]">
                <Icon
                  size={18}
                  className="text-[var(--color-ink)]"
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                {section.label}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                {section.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboardPage;