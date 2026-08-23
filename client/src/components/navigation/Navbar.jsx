import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { useProfile } from "../../features/profile/hooks/useProfile";

const navigationItems = [
  {
    label: "Work",
    href: "/#projects",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Experience",
    href: "/#experience",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: profile } = useProfile();

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const githubUrl = profile?.socialLinks?.find(
    (link) => link.id === "github",
  )?.url;

  const linkedinUrl = profile?.socialLinks?.find(
    (link) => link.id === "linkedin",
  )?.url;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[rgba(255,255,255,0.88)]
            shadow-[0_4px_20px_rgba(17,17,17,0.06)]
            backdrop-blur-xl
          "
        >
          <div className="flex h-[68px] items-center justify-between px-4 sm:px-6">
            {/* Brand */}

            <a
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <span
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--color-ink)]
                  text-sm
                  font-semibold
                  text-[var(--color-canvas)]
                  transition-transform
                  duration-300
                  group-hover:-rotate-6
                "
              >
                D
              </span>

              <div className="hidden sm:block">
                <p
                  className="
                    text-sm
                    font-semibold
                    tracking-tight
                    text-[var(--color-ink)]
                  "
                >
                  {profile?.name || "Darshan B R"}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--color-muted)]
                  "
                >
                  {profile?.role || "Software Engineer"}
                </p>
              </div>
            </a>

            {/* Desktop navigation */}

            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-1 md:flex"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-[var(--color-ink)]
                    transition-all
                    duration-200
                    hover:bg-[var(--color-surface-muted)]
                  "
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop actions */}

            <div className="hidden items-center gap-5 md:flex">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-sm
                    font-medium
                    text-[var(--color-muted)]
                    transition-colors
                    hover:text-[var(--color-ink)]
                  "
                >
                  GitHub
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-sm
                    font-medium
                    text-[var(--color-muted)]
                    transition-colors
                    hover:text-[var(--color-ink)]
                  "
                >
                  LinkedIn
                </a>
              )}

              <a
                href="/#contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[var(--color-ink)]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  !text-[var(--color-surface)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[var(--color-accent)]
                "
              >
                Let's talk
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Mobile menu button */}

            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() =>
                setIsMenuOpen((current) => !current)
              }
              className="
                flex
                size-10
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-surface-muted)]
                text-[var(--color-ink)]
                transition-colors
                hover:bg-[var(--color-border)]
                md:hidden
              "
            >
              {isMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>

          {/* Mobile navigation */}

          {isMenuOpen && (
            <div
              id="mobile-navigation"
              className="
                border-t
                border-[var(--color-border)]
                px-4
                pb-5
                md:hidden
              "
            >
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col"
              >
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      flex
                      min-h-14
                      items-center
                      border-b
                      border-[var(--color-border)]
                      text-base
                      font-medium
                      text-[var(--color-ink)]
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-5 pt-5">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-sm
                      font-medium
                      text-[var(--color-muted)]
                      transition-colors
                      hover:text-[var(--color-ink)]
                    "
                  >
                    GitHub
                  </a>
                )}

                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-sm
                      font-medium
                      text-[var(--color-muted)]
                      transition-colors
                      hover:text-[var(--color-ink)]
                    "
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;