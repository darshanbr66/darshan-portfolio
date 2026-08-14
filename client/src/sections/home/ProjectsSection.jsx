import ProjectCard from "../../components/common/ProjectCard";
import { portfolio } from "../../data/portfolio";
import { useProjects } from "../../features/projects/hooks/useProjects";



function ProjectsSection() {

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  return (
    <section
      id="work"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          {/* Section introduction */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Selected work
            </p>

            <h2
              id="projects-heading"
              className="mt-5 max-w-lg text-4xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl"
            >
              Projects
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
              A selection of professional and personal projects.
            </p>
          </div>

          {/* Project list */}
          <div>
            {isLoading && (
              <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16">
                <div className="h-40 animate-pulse border-t border-[var(--color-border)]" />
                <div className="h-40 animate-pulse border-t border-[var(--color-border)]" />
              </div>
            )}

            {isError && (
              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-sm text-[var(--color-muted)]">
                  Unable to load projects right now.
                </p>
              </div>
            )}

            {!isLoading && !isError && projects.length === 0 && (
              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-sm text-[var(--color-muted)]">
                  No projects available.
                </p>
              </div>
            )}

            {!isLoading && !isError && projects.length > 0 && (
              <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    category={project.category}
                    technologies={project.technologies}
                    description={project.shortDescription}
                    githubUrl={
                      project.links?.find((link) => link.label === "GitHub")?.url
                    }
                    liveUrl={
                      project.links?.find((link) => link.label === "Live")?.url
                    }
                    href={`/projects/${project.slug}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;