import { portfolio } from "../../data/portfolio";

function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          {/* Introduction */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Contact
            </p>

            <h2
              id="contact-heading"
              className="mt-5 max-w-lg text-4xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl"
            >
              Get in touch.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
              Contact information and a way to get in touch.
            </p>

            <div className="mt-10 space-y-5">
              {portfolio.socialLinks.map((link) => (
                <div key={link.id}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {link.label}
                  </p>

                  <a
                    href={link.href}
                    target={link.id === "email" ? undefined : "_blank"}
                    rel={link.id === "email" ? undefined : "noreferrer"}
                    className="mt-2 inline-block break-all text-base text-[var(--color-text)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition-opacity duration-200 hover:opacity-60"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <form
              className="border-t border-[var(--color-border)]"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="border-b border-[var(--color-border)] py-6">
                <label
                  htmlFor="contact-name"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-4 block w-full border-0 bg-transparent p-0 text-base text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
                  placeholder="Your name"
                />
              </div>

              <div className="border-b border-[var(--color-border)] py-6">
                <label
                  htmlFor="contact-email"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-4 block w-full border-0 bg-transparent p-0 text-base text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
                  placeholder="you@example.com"
                />
              </div>

              <div className="border-b border-[var(--color-border)] py-6">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  className="mt-4 block w-full resize-y border-0 bg-transparent p-0 text-base text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
                  placeholder="Your message"
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="min-h-12 w-full bg-[var(--color-text)] px-6 text-sm font-medium text-[var(--color-surface)] transition-opacity duration-200 hover:opacity-80 sm:w-auto"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;