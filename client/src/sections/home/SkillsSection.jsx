import SkillItem from "../../components/common/SkillItem";
import { portfolio } from "../../data/portfolio";

function SkillsSection() {
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
              Technologies currently confirmed as part of my development
              experience.
            </p>
          </div>

          {/* Skills list */}
          <div>
            {portfolio.skills.map((skill, index) => (
              <SkillItem
                key={skill.id}
                {...skill}
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