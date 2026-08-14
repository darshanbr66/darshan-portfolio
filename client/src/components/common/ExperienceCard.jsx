function ExperienceCard({
  company,
  role,
  startDate,
  endDate,
  technologies = [],
}) {
  return (
    <article className="border-t border-[var(--color-border)] py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-12">
        {/* Period */}
        <div>
          <p className="text-sm text-[var(--color-muted)]">
            {startDate} — {endDate}
          </p>
        </div>

        {/* Experience details */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {role}
          </p>

          <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
            {company}
          </h3>

          {technologies.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;