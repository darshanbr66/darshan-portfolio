const footerLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/darshanbr66",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darshan-b-r-94ab92269/",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:darshanbr36@gmail.com",
  },
];

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Darshan B R
        </p>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3"
        >
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel={link.id === "email" ? undefined : "noreferrer"}
              className="text-sm text-[var(--color-text)] transition-opacity duration-200 hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;