function ExperienceCard({
  company,
  role,
  startDate,
  endDate,
  location,
  technologies = [],
  description,
  responsibilities = [],
}) {
  return (
    <article className="group border-t border-[var(--color-border)] py-10 sm:py-12 lg:py-14">
      <div
        className="
          grid
          gap-8
          sm:grid-cols-[0.7fr_1.3fr]
          sm:gap-10
          lg:grid-cols-[0.65fr_1.35fr]
          lg:gap-16
        "
      >
        {/* Timeline information */}
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">
            {startDate} — {endDate}
          </p>

          {location && (
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {location}
            </p>
          )}
        </div>

        {/* Experience details */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {role}
          </p>

          <h3
            className="
              mt-3
              text-2xl
              font-medium
              tracking-[-0.03em]
              text-[var(--color-text)]
              sm:text-3xl
            "
          >
            {company}
          </h3>

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
              {description}
            </p>
          )}

          {technologies.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="
                    rounded-full
                    border
                    border-[var(--color-border)]
                    px-3
                    py-1.5
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.1em]
                    text-[var(--color-muted)]
                  "
                >
                  {technology}
                </span>
              ))}
            </div>
          )}

          {responsibilities.length > 0 && (
            <ul className="mt-8 space-y-3">
              {responsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className="
                    relative
                    pl-5
                    text-sm
                    leading-6
                    text-[var(--color-muted)]
                  "
                >
                  <span
                    className="
                      absolute
                      left-0
                      top-[0.65rem]
                      size-1.5
                      rounded-full
                      bg-[var(--color-accent)]
                    "
                  />

                  {responsibility}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;