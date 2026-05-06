import './Interactive.css'

export default function Interactive() {
  return (
    <main className="page-enter interactive-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Explore</span>
          <div className="accent-rule" />
          <h1>Interactive Tools</h1>
          <p className="page-hero-sub">
            The hands-on tools for exploring AI energy costs are now available under the{' '}
            <strong>Measure</strong> tab, alongside curated research tools and best practices.
            Head there to try the Model Energy Comparison, Live Energy Meter, and Token Visualizer.
          </p>
        </div>
      </section>
    </main>
  )
}
