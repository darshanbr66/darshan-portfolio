import { ArrowUpRight, Mail } from "lucide-react";

const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/darshanbr66",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darshan-b-r-94ab92269/",
  },
  {
    label: "Email",
    href: "mailto:darshanbr36@gmail.com",
  },
];

function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="border-b border-neutral-200"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 sm:px-8 sm:py-24 md:gap-16 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-12 lg:py-32 xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="max-w-4xl">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 sm:mb-10">
            Software Engineer
          </p>

          <h1
            id="hero-title"
            className="max-w-4xl text-[clamp(3.25rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.055em] text-neutral-950"
          >
            Darshan B R
            <span className="mt-3 block text-neutral-500 sm:mt-4">
              Full-Stack
              <br className="hidden sm:block" /> MERN Developer
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-neutral-600 sm:mt-10 sm:text-lg sm:leading-8">
            Software Engineer working with MERN and Python.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-neutral-950 bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            >
              View Projects
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>

            <button
              type="button"
              disabled
              title="Resume link will be added when the resume is provided"
              aria-label="Resume — link not available yet"
              className="inline-flex min-h-12 cursor-not-allowed items-center justify-center border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-400"
            >
              Resume
            </button>
          </div>

          <nav
            aria-label="Professional profiles"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-200 pt-6 sm:mt-12 sm:pt-7"
          >
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
              >
                {link.label}

                {link.label === "Email" ? (
                  <Mail
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                ) : (
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </a>
            ))}
          </nav>
        </div>

        <aside className="flex flex-col justify-end border-t border-neutral-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Current role
          </p>

          <div className="mt-4">
            <p className="text-base font-medium text-neutral-950">
              Software Engineer
            </p>
            <p className="mt-1 text-sm leading-6 text-neutral-500">
              Sigvitas Private Limited
            </p>
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Since
            </p>

            <p className="mt-3 text-sm text-neutral-700">
              November 2024
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default HeroSection;