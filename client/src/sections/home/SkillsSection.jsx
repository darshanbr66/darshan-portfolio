import { useSkills } from "../../features/skills/hooks/useSkills";

function SkillsSection() {
  const {
    data: skills = [],
    isLoading,
    isError,
  } = useSkills();

  return (
    <section
      id="skills"
      className="border-t border-[var(--color-border)]"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-32">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Technology
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
            Skills
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
            Technologies currently confirmed as part of my development
            experience.
          </p>
        </div>

        <div>
          {isLoading && (
            <div className="border-t border-[var(--color-border)] py-8">
              <div className="h-7 w-40 animate-pulse bg-[var(--color-surface-muted)]" />
            </div>
          )}

          {isError && (
            <p className="border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]">
              Unable to load skills.
            </p>
          )}

          {!isLoading && !isError && skills.length === 0 && (
            <p className="border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]">
              No skills available.
            </p>
          )}

          {!isLoading &&
            !isError &&
            skills.map((skill, index) => (
              <article
                key={skill._id}
                className="flex items-center justify-between gap-6 border-t border-[var(--color-border)] py-7 last:border-b"
              >
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
                    {skill.name}
                  </h3>

                  {skill.description && (
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      {skill.description}
                    </p>
                  )}
                </div>

                <span className="shrink-0 text-xs text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;