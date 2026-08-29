import ProjectCard from "../../components/common/ProjectCard";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useContent } from "../../features/content/hooks/useContent";
import Skeleton from "../../components/ui/Skeleton";

function ProjectsSection() {
  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useProjects();

  const {
    data: content,
    isLoading: isContentLoading,
    isError: isContentError,
  } = useContent();

  const isHeaderLoading =
    isProjectsLoading || isContentLoading;

  return (
    <section
      id="projects"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          {/* Section introduction */}

          <div className="lg:sticky lg:top-32 lg:self-start">
            {isHeaderLoading ? (
              <div className="space-y-5">
                <Skeleton
                  className="h-3 w-28 rounded-full"
                  variant="text"
                />

                <Skeleton
                  className="h-12 w-40 rounded-lg"
                  variant="heading"
                />

                <div className="space-y-3">
                  <Skeleton
                    className="h-4 w-full max-w-md"
                    variant="text"
                  />

                  <Skeleton
                    className="h-4 w-11/12 max-w-md"
                    variant="text"
                  />

                  <Skeleton
                    className="h-4 w-9/12 max-w-md"
                    variant="text"
                  />
                </div>
              </div>
            ) : isContentError ? (
              <p className="text-sm text-[var(--color-muted)]">
                Unable to load section content right now.
              </p>
            ) : (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {content?.projects?.sectionLabel ||
                    "Selected work"}
                </p>

                <h2
                  id="projects-heading"
                  className="mt-5 max-w-lg text-4xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl"
                >
                  {content?.projects?.heading || "Projects"}
                </h2>

                {content?.projects?.description && (
                  <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
                    {content.projects.description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Project list */}

          <div>
            {isProjectsLoading && (
              <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="border-t border-[var(--color-border)] pt-5"
                  >
                    <Skeleton
                      className="h-3 w-20"
                      variant="text"
                    />

                    <Skeleton
                      className="mt-5 h-8 w-44"
                      variant="heading"
                    />

                    <Skeleton
                      className="mt-6 h-4 w-full"
                      variant="text"
                    />

                    <Skeleton
                      className="mt-3 h-4 w-10/12"
                      variant="text"
                    />

                    <div className="mt-7 flex gap-4">
                      <Skeleton
                        className="h-3 w-20"
                        variant="text"
                      />

                      <Skeleton
                        className="h-3 w-24"
                        variant="text"
                      />

                      <Skeleton
                        className="h-3 w-16"
                        variant="text"
                      />
                    </div>

                    <Skeleton
                      className="mt-8 h-4 w-28"
                      variant="text"
                    />
                  </div>
                ))}
              </div>
            )}

            {isProjectsError && (
              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-sm text-[var(--color-muted)]">
                  Unable to load projects right now.
                </p>
              </div>
            )}

            {!isProjectsLoading &&
              !isProjectsError &&
              projects.length === 0 && (
                <div className="border-t border-[var(--color-border)] pt-5">
                  <p className="text-sm text-[var(--color-muted)]">
                    No projects available.
                  </p>
                </div>
              )}

            {!isProjectsLoading &&
              !isProjectsError &&
              projects.length > 0 && (
                <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 sm:gap-y-16">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      index={index + 1}
                      title={project.title}
                      category={project.category}
                      technologies={project.technologies}
                      description={project.shortDescription}
                      githubUrl={project.links?.find(
                        (link) => link.label === "GitHub",
                      )?.url}
                      liveUrl={project.links?.find(
                        (link) => link.label === "Live",
                      )?.url}
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