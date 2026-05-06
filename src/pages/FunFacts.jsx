import './FunFacts.css'

export default function FunFacts() {
  return (
    <main className="page-enter fun-facts-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Research Highlights</span>
          <div className="accent-rule" />
          <h1>Key Findings</h1>
          <p className="page-hero-sub">
            Selected statistics and findings from the literature on AI energy use,
            digital infrastructure, and public awareness.
          </p>
        </div>
      </section>

      <section className="section highlights-section">
        <div className="container">
          <div className="highlights-grid">
            {[
              { stat: '70%',   text: 'of new AI-related articles present neutral or positive narratives; environmental impact is rarely the focus',                    cite: '[AI Index Report]' },
              { stat: '<50%',  text: 'of survey respondents correctly identify data centers as major contributors to AI\'s environmental footprint',                    cite: '[Searchlight Institute]' },
              { stat: '800%',  text: 'increase in attendance at major AI conferences like NeurIPS over the past decade',                                               cite: '[AI Index Report]' },
              { stat: '4 hrs', text: 'the average person spends on their phone each day, and digital pollution grows with every minute online',                        cite: '[Greenly]' },
            ].map((h, i) => (
              <div key={i} className="card highlight-card">
                <span className="stat-callout">{h.stat}</span>
                <p style={{ maxWidth: '100%', fontSize: '0.9rem', marginTop: '0.5rem' }}>{h.text}</p>
                <span className="mono-tag" style={{ marginTop: '0.75rem', display: 'inline-block' }}>{h.cite}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
