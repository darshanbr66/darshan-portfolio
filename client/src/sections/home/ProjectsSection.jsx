function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-line"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Selected work
          </p>

          <h2
            id="projects-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Projects
          </h2>

          <p className="mt-6 text-base leading-8 text-ink-muted sm:text-lg">
            Project case studies will be presented here.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;