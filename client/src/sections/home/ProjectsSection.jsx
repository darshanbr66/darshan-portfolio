import ProjectCard from "../../components/common/ProjectCard";

const projects = [
  {
    title: "Roster Data Management",
    category: "Professional",
    technologies: [],
    description: null,
  },
  {
    title: "Patent Claim Parsing",
    category: "Professional",
    technologies: [],
    description: null,
  },
  {
    title: "US Patent Blog Application",
    category: "Professional",
    technologies: [],
    description: null,
  },
  {
    title: "Daily Routine App",
    category: "Personal Project",
    technologies: ["MERN"],
    description: null,
    githubUrl: "https://github.com/darshanbr66/daily-routine-app",
    liveUrl: "https://daily-routine-app-zeta.vercel.app",
  },
];

function ProjectsSection() {
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
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;