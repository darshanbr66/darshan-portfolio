import ExperienceCard from "../../components/common/ExperienceCard";
import { portfolio } from "../../data/portfolio";

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          {/* Section introduction */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Experience
            </p>

            <h2
              id="experience-heading"
              className="mt-5 max-w-lg text-4xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl"
            >
              Professional Experience
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
              Professional experience and technical context.
            </p>
          </div>

          {/* Experience list */}
          <div>
            {portfolio.experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                {...experience}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;