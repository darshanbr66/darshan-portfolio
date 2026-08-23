import { ArrowUpRight } from "lucide-react";
import { useProfile } from "../../features/profile/hooks/useProfile";
import Skeleton from "../../components/ui/Skeleton";

function AboutSection() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useProfile();

  return (
    <section
      id="about"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        {/* Section heading */}

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-accent)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-sm">
                About
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
            >
              A little about me.
            </h2>
          </div>

          {/* Content */}

          <div>
            {isLoading && (
              <div className="max-w-3xl space-y-4">
                <Skeleton className="h-6 w-full" variant="text" />
                <Skeleton className="h-6 w-11/12" variant="text" />
                <Skeleton className="h-6 w-10/12" variant="text" />
                <Skeleton className="h-6 w-8/12" variant="text" />
              </div>
            )}

            {isError && (
              <p className="text-sm text-[var(--color-ink-muted)]">
                Unable to load profile information.
              </p>
            )}

            {!isLoading && !isError && profile && (
              <>
                {profile.headline && (
                  <p className="max-w-3xl text-2xl font-medium leading-9 tracking-[-0.025em] text-[var(--color-ink)] sm:text-3xl sm:leading-10">
                    {profile.headline}
                  </p>
                )}

                {profile.about && (
                  <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)] sm:text-lg sm:leading-8">
                    {profile.about}
                  </p>
                )}

                {/* Profile facts */}

                <div className="mt-12 grid max-w-3xl grid-cols-1 border-y border-[var(--color-border)] sm:grid-cols-2">
                  {profile.role && (
                    <div className="border-b border-[var(--color-border)] py-6 sm:border-r sm:pr-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                        Role
                      </p>

                      <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">
                        {profile.role}
                      </p>
                    </div>
                  )}

                  {profile.title && (
                    <div className="py-6 sm:pl-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                        Focus
                      </p>

                      <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">
                        {profile.title}
                      </p>
                    </div>
                  )}

                  {profile.location && (
                    <div className="border-t border-[var(--color-border)] py-6 sm:border-r sm:pr-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                        Based in
                      </p>

                      <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">
                        {profile.location}
                      </p>
                    </div>
                  )}

                  {profile.email && (
                    <div className="border-t border-[var(--color-border)] py-6 sm:pl-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                        Email
                      </p>

                      <a
                        href={`mailto:${profile.email}`}
                        className="
                          mt-3
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          font-medium
                          text-[var(--color-ink)]
                          transition-colors
                          hover:text-[var(--color-accent)]
                        "
                      >
                        {profile.email}
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom statement */}

        <div className="mt-20 border-t border-[var(--color-border)] pt-5 sm:mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              Background
            </p>

            <p className="max-w-xl text-sm leading-6 text-[var(--color-ink-muted)] sm:text-right">
              Building practical software with a focus on clean interfaces,
              reliable systems, and meaningful user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;