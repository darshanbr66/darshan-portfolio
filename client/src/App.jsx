import Container from "./components/layout/Container";

function App() {
  return (
    <section className="flex min-h-[calc(100vh-0px)] items-center">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Foundation
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Darshan B R
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted sm:text-lg">
            Portfolio foundation is ready.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default App;