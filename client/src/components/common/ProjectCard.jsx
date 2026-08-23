import { ArrowUpRight } from "lucide-react";

function ProjectCard({
  index,
  title,
  category,
  technologies = [],
  description,
  githubUrl,
  liveUrl,
  href,
}) {
  return (
    <article className="group flex h-full flex-col border-t border-[var(--color-border)] pt-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {String(index).padStart(2, "0")}
            </span>

            {category && (
              <>
                <span
                  className="h-px w-5 bg-[var(--color-border)]"
                  aria-hidden="true"
                />

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {category}
                </p>
              </>
            )}
          </div>

          <h3 className="text-2xl font-medium tracking-[-0.03em] text-[var(--color-text)] transition-opacity duration-200 group-hover:opacity-70 sm:text-3xl">
            {title}
          </h3>
        </div>

        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-[var(--color-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>

      {/* Description */}
      {description && (
        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-muted)]">
          {description}
        </p>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]"
            >
              {technology}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      {(githubUrl || liveUrl || href) && (
        <div className="mt-auto flex flex-wrap gap-5 pt-8 text-sm">
          {href && (
            <a
              href={href}
              className="border-b border-[var(--color-text)] pb-0.5 text-[var(--color-text)] transition-opacity duration-200 hover:opacity-60"
            >
              View case study
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-[var(--color-border-strong)] pb-0.5 text-[var(--color-text)] transition-opacity duration-200 hover:opacity-60"
            >
              GitHub
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-[var(--color-border-strong)] pb-0.5 text-[var(--color-text)] transition-opacity duration-200 hover:opacity-60"
            >
              Live
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default ProjectCard;