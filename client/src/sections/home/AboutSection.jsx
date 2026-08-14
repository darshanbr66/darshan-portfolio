function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-b border-neutral-200"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 sm:px-8 sm:py-24 md:gap-16 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-12 lg:py-32 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Introduction */}
        <div className="max-w-3xl">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 sm:mb-10">
            About
          </p>

          <h2
            id="about-title"
            className="max-w-3xl text-4xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-5xl md:text-6xl"
          >
            Building software across the stack.
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-neutral-600 sm:mt-10 sm:text-lg sm:leading-8">
            <p>
              I am Darshan B R, a Software Engineer and Full-Stack MERN
              Developer based in Bengaluru, Karnataka.
            </p>

            <p>
              I have been working at Sigvitas Private Limited since November
              2024, with experience working with MERN and Python.
            </p>
          </div>
        </div>

        {/* Professional context */}
        <aside className="border-t border-neutral-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Professional context
          </p>

          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                Role
              </dt>
              <dd className="mt-2 text-sm font-medium text-neutral-950">
                Software Engineer
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                Company
              </dt>
              <dd className="mt-2 text-sm font-medium text-neutral-950">
                Sigvitas Private Limited
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                Location
              </dt>
              <dd className="mt-2 text-sm font-medium text-neutral-950">
                Bengaluru, Karnataka
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                Working since
              </dt>
              <dd className="mt-2 text-sm font-medium text-neutral-950">
                November 2024
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                Technologies
              </dt>
              <dd className="mt-2 text-sm font-medium text-neutral-950">
                MERN · Python
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default AboutSection;