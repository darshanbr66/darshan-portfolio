function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="border-b border-line"
    >
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-6xl items-center px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="w-full max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Portfolio
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
          >
            Darshan B R
          </h1>

          <div className="mt-6 max-w-2xl">
            <p className="text-lg leading-8 text-ink-muted sm:text-xl">
              Full-Stack MERN Developer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;