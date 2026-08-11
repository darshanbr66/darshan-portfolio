function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-line"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            About
          </p>

          <h2
            id="about-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            About Darshan
          </h2>

          <p className="mt-6 text-base leading-8 text-ink-muted sm:text-lg">
            Professional background and development approach will be presented
            here.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;