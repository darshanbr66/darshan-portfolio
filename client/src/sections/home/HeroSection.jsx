import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useContent } from "../../features/content/hooks/useContent";
import Skeleton from "../../components/ui/Skeleton";

function HeroSection() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfile();

  const {
    data: content,
    isLoading: isContentLoading,
    isError: isContentError,
  } = useContent();

  if (isProfileLoading || isContentLoading) {
    return (
      <section className="flex min-h-[calc(100vh-72px)] items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl space-y-6">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-20 w-3/4 rounded-xl" />
            <Skeleton className="h-8 w-2/3 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (
    isProfileError ||
    isContentError ||
    !profile ||
    !content
  ) {
    return (
      <section className="flex min-h-[calc(100vh-72px)] items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Unable to load portfolio content.
          </p>
        </div>
      </section>
    );
  }

  const githubUrl = profile.socialLinks?.find(
    (link) => link.id === "github",
  )?.url;

  const linkedinUrl = profile.socialLinks?.find(
    (link) => link.id === "linkedin",
  )?.url;

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-[1440px] items-center px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="w-full">
          <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
            {/* Main introduction */}

            <div className="max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--color-accent)]" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-sm">
                  {profile.role}
                </p>
              </div>

              <h1 className="mt-7 max-w-5xl text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[var(--color-ink)]">
                {profile.name}
              </h1>

              {profile.title && (
                <p className="mt-8 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.03em] text-[var(--color-ink)] sm:text-3xl lg:text-4xl">
                  {profile.title}
                </p>
              )}

              {profile.headline && (
                <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg sm:leading-8">
                  {profile.headline}
                </p>
              )}

              {/* Primary actions */}

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="/#projects"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[var(--color-ink)]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[var(--color-accent)]
                  "
                >
                  View my work
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href="/#contact"
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-[var(--color-border-strong)]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[var(--color-ink)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-[var(--color-ink)]
                    hover:bg-[var(--color-surface-soft)]
                  "
                >
                  Let's talk
                </a>
              </div>

              {/* Social links */}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      border-b
                      border-transparent
                      pb-1
                      text-sm
                      font-medium
                      text-[var(--color-ink-muted)]
                      transition-colors
                      hover:border-[var(--color-ink)]
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
                      border-b
                      border-transparent
                      pb-1
                      text-sm
                      font-medium
                      text-[var(--color-ink-muted)]
                      transition-colors
                      hover:border-[var(--color-ink)]
                      hover:text-[var(--color-ink)]
                    "
                  >
                    LinkedIn
                  </a>
                )}

                {profile.socialLinks
                  ?.filter(
                    (link) =>
                      link.id !== "github" &&
                      link.id !== "linkedin",
                  )
                  .map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={
                        link.url.startsWith("mailto:")
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        link.url.startsWith("mailto:")
                          ? undefined
                          : "noreferrer"
                      }
                      className="
                        border-b
                        border-transparent
                        pb-1
                        text-sm
                        font-medium
                        text-[var(--color-ink-muted)]
                        transition-colors
                        hover:border-[var(--color-ink)]
                        hover:text-[var(--color-ink)]
                      "
                    >
                      {link.label}
                    </a>
                  ))}

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    border-b
                    border-transparent
                    pb-1
                    text-sm
                    font-medium
                    text-[var(--color-ink-muted)]
                    transition-colors
                    hover:border-[var(--color-ink)]
                    hover:text-[var(--color-ink)]
                  "
                >
                  Resume ↗
                </a>
              </div>
            </div>

            {/* Supporting information */}

            <div className="hidden lg:block">
              <div className="border-l border-[var(--color-border)] pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                  {content.hero.availableForLabel}
                </p>

                <p className="mt-4 text-sm leading-6 text-[var(--color-ink-soft)]">
                  {content.hero.availableForText}
                </p>

                <a
                  href="/#projects"
                  className="
                    mt-10
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--color-ink)]
                    transition-colors
                    hover:text-[var(--color-accent)]
                  "
                >
                  {content.hero.exploreWorkLabel}
                  <ArrowDown size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom visual divider */}

          <div className="mt-20 border-t border-[var(--color-border)] pt-5 sm:mt-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                Portfolio
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                {content.hero.scrollLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;