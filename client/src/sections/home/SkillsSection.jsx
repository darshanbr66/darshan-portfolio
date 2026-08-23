import SkillItem from "../../components/common/SkillItem";
import { useSkills } from "../../features/skills/hooks/useSkills";
import Skeleton from "../../components/ui/Skeleton";

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
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          {/* Section introduction */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Technology
            </p>

            <h2
              id="skills-heading"
              className="mt-5 max-w-lg text-4xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl"
            >
              Skills
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
              Technologies I use to build practical web applications and
              reliable software.
            </p>
          </div>

          {/* Skills list */}
          <div>
            {isLoading && (
              <div className="border-t border-[var(--color-border)]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-[var(--color-border)] py-7 sm:py-8"
                  >
                    <Skeleton
                      className="h-8 w-48 sm:h-9 sm:w-56"
                      variant="heading"
                    />

                    <Skeleton
                      className="h-3 w-5"
                      variant="text"
                    />
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <p className="border-t border-[var(--color-border)] pt-5 text-sm text-[var(--color-muted)]">
                Unable to load skills right now.
              </p>
            )}

            {!isLoading && !isError && skills.length === 0 && (
              <p className="border-t border-[var(--color-border)] pt-5 text-sm text-[var(--color-muted)]">
                No skills available.
              </p>
            )}

            {!isLoading &&
              !isError &&
              skills.length > 0 &&
              skills.map((skill, index) => (
                <SkillItem
                  key={skill._id}
                  name={skill.name}
                  index={index + 1}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;