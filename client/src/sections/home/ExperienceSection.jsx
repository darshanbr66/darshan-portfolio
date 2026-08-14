import { useExperiences } from "../../features/experience/hook/useExperiences";
function ExperienceSection() {
  const {
    data: experiences = [],
    isLoading,
    isError,
  } = useExperiences();

  return (
    <section
      id="experience"
      className="border-t border-[var(--color-border)]"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-32">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Experience
          </p>

          <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
            Professional Experience
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
            Professional experience and technical context.
          </p>
        </div>

        <div>
          {isLoading && (
            <div className="border-t border-[var(--color-border)] py-8">
              <div className="h-6 w-48 animate-pulse bg-[var(--color-surface-muted)]" />
            </div>
          )}

          {isError && (
            <p className="border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]">
              Unable to load experience.
            </p>
          )}

          {!isLoading && !isError && experiences.length === 0 && (
            <p className="border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]">
              No experience available.
            </p>
          )}

          {!isLoading &&
            !isError &&
            experiences.map((experience) => (
              <article
                key={experience._id}
                className="border-t border-[var(--color-border)] py-8 last:border-b"
              >
                <div className="grid gap-6 sm:grid-cols-[0.8fr_1.2fr] sm:gap-10">
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">
                      {experience.startDate} — {experience.endDate}
                    </p>

                    {experience.location && (
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        {experience.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {experience.role}
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
                      {experience.company}
                    </h3>

                    {experience.technologies?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        {experience.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-sm text-[var(--color-muted)]"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    {experience.description && (
                      <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-muted)]">
                        {experience.description}
                      </p>
                    )}

                    {experience.responsibilities?.length > 0 && (
                      <ul className="mt-6 space-y-3">
                        {experience.responsibilities.map(
                          (responsibility) => (
                            <li
                              key={responsibility}
                              className="text-sm leading-6 text-[var(--color-muted)]"
                            >
                              {responsibility}
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;