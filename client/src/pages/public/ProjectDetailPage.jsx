import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useProjectBySlug } from "../../features/projects/hooks/useProjectBySlug";

function ProjectDetailPage() {
  const { slug } = useParams();

  const {
    data: project,
    isLoading,
    isError,
  } = useProjectBySlug(slug);

  if (isLoading) {
    return (
      <main className="min-h-screen px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-24 animate-pulse bg-[var(--color-surface-muted)]" />
          <div className="mt-12 h-16 w-full max-w-3xl animate-pulse bg-[var(--color-surface-muted)]" />
        </div>
      </main>
    );
  }

  if (isError || !project) {
    return (
      <main className="min-h-screen px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-[var(--color-muted)]">
            Project not found.
          </p>

          <Link
            to="/#projects"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const githubUrl = project.links?.find(
    (link) => link.label === "GitHub",
  )?.url;

  const liveUrl = project.links?.find(
    (link) => link.label === "Live",
  )?.url;

  return (
    <main className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <header className="mt-16 max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {project.category}
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl lg:text-7xl">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              {project.shortDescription}
            </p>
          )}

          {project.technologies?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="text-sm text-[var(--color-muted)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}

          {(githubUrl || liveUrl) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-[var(--color-border-strong)] px-5 text-sm font-medium transition-colors hover:bg-[var(--color-surface-muted)]"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
              )}

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 bg-[var(--color-text)] px-5 text-sm font-medium text-white transition-opacity hover:opacity-85"
                >
                  <ExternalLink size={16} />
                  Live project
                </a>
              )}
            </div>
          )}
        </header>

        {project.description && (
          <section className="mt-24 max-w-3xl border-t border-[var(--color-border)] pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Overview
            </h2>

            <p className="mt-6 text-base leading-8 text-[var(--color-text)] sm:text-lg">
              {project.description}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProjectDetailPage;