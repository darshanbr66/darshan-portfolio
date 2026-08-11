import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-line bg-canvas">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={closeMenu}
          className="text-base font-semibold tracking-tight text-ink transition-colors duration-fast hover:text-accent focus-visible:text-accent"
        >
          Darshan B R
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors duration-fast hover:text-accent focus-visible:text-accent"
            >
              {item.label}
            </a>
          ))}

          <div className="ml-2 flex items-center gap-4 border-l border-line pl-6">
            <a
              href="https://github.com/darshanbr66"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-ink-soft transition-colors duration-fast hover:text-accent focus-visible:text-accent"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/darshan-b-r-94ab92269/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-ink-soft transition-colors duration-fast hover:text-accent focus-visible:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </nav>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex size-11 items-center justify-center rounded-md text-ink transition-colors duration-fast hover:bg-surface-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
        >
          {isMenuOpen ? <X size={21} strokeWidth={1.8} /> : <Menu size={21} strokeWidth={1.8} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-line bg-canvas md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex w-full max-w-6xl flex-col px-5 py-5 sm:px-6"
          >
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center border-b border-line text-lg font-medium text-ink transition-colors duration-fast hover:text-accent focus-visible:text-accent"
              >
                {item.label}
              </a>
            ))}

            <div className="flex items-center gap-6 pt-5">
              <a
                href="https://github.com/darshanbr66"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="min-h-11 flex items-center text-sm font-medium text-ink-soft hover:text-accent focus-visible:text-accent"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/darshan-b-r-94ab92269/"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="min-h-11 flex items-center text-sm font-medium text-ink-soft hover:text-accent focus-visible:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;