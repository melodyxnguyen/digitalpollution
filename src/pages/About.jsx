import './About.css'

const timeline = [
  {
    year: '2023',
    event: 'SLAC National Accelerator Laboratory, GISMo',
    detail: 'Renewable energy web platforms, grid integration research',
    popup: 'I led publication efforts for SLAC energy initiatives — building platforms for training materials and simulation tools. Through each project I grew aware of hidden complexity: the servers, computation, and cooling infrastructure behind the research were rarely part of the conversation.',
  },
  {
    year: '2024',
    event: 'SLAC, REGROW Project',
    detail: 'Heatwave analysis, photovoltaic grid resilience',
    popup: 'Using Marimo, I analyzed meteorological and energy data from the 2020 California heat wave — integrating temperature, solar irradiance, and wind speed to assess how extreme weather disrupts photovoltaic grids. It made system-level optimization feel urgent and real.',
  },
  {
    year: '2025',
    event: 'Stanford Synchrotron Radiation Lightsource, SULI',
    detail: 'Beamline automation, TiO₂ phase analysis',
    popup: 'At SSRL, I automated beamline experiments to scan only information-rich regions — reducing unnecessary computation while preserving data quality for TiO₂ phase analysis. This was the turning point: decisions about when and how much to compute carry real environmental weight.',
  },
  {
    year: '2025',
    event: 'Honors Thesis, Pace University',
    detail: 'LLM energy benchmarking, educational website',
    popup: 'Central finding: LLMs are generically powerful but generically expensive. The answer lies not in rejection, but specificity — building small, task-specific models that are more efficient, more accurate, and keep sensitive data local.',
  },
  {
    year: '2026',
    event: 'Lead Instructor, iD Tech at Stanford',
    detail: 'Teaching AI, ML, and Python',
    popup: 'Teaching AI to students reinforced what this research kept returning to: the people closest to these tools rarely see the infrastructure behind them. Making that legible — especially for the next generation of builders — is part of why this site exists.',
  },
  {
    year: '2026',
    event: 'Healthfirst',
    detail: 'Business Analyst, Provider Data Management',
    popup: 'Joining Healthfirst\'s Provider Data Management team as Business Analyst and Product Owner. Healthfirst serves nearly two million members across NYC — a chance to apply responsible AI principles from this thesis to real healthcare workflows at scale.',
  },
  {
    year: '2026',
    event: 'M.S. Computer Science, Georgia Tech',
    detail: 'Graduate study in computer science',
    popup: 'Encouraged by thesis advisor Arya Boudaie, continuing at Georgia Tech to study computer science more deeply — with a focus on how AI systems can be built more efficiently, responsibly, and at less environmental cost.',
  },
]

const meta = [
  { label: 'Researcher', value: 'Melody Nguyen, Pace University' },
  { label: 'Faculty Advisor', value: 'Arya Boudaie, Software Engineer at Amazon' },
  { label: 'Funding', value: 'Pforzheimer Honors College at Pace University' },
  { label: 'Presentation', value: 'New York City, May 7th, 2026' },
]

export default function About() {
  return (
    <main className="page-enter about-page">
      <section className="page-hero about-hero">
        <div className="container">
          <span className="section-label">About</span>
          <div className="accent-rule" />
          <h1>The Story Behind<br /><em>Digital Pollution Research</em></h1>
          <p className="page-hero-sub">
            Built by someone who grew up conserving water in the desert, studied energy at national
            laboratories, and inherited Buddhist teachings to care for all living things.
          </p>
        </div>
      </section>

      <section className="section about-story-section">
        <div className="container about-layout">
          <div className="about-text">
            <span className="section-label">Author's Story</span>
            <div className="accent-rule" />
            <h2>Melody Nguyen</h2>
            <p>
              I grew up in Arizona and California during the 2010s and experienced firsthand
              the impact of drought and wildfire. Daily conservation practices like reusing water and minimizing waste were part of my upbringing.
            </p>

            <div className="about-photo-frame" />

            <p>
              Being raised by a Buddhist family taught me the importance of interconnectedness
              where all humans, animals, and nature are profoundly linked, and damaging
              one part harms the whole. These childhood teachings shape my motivation for
              understanding how technological progress can align with ethical and environmental responsibility.
            </p>

            <div className="about-photo-frame" />

            <div className="about-meta-grid">
              {meta.map((m, i) => (
                <div key={i} className="about-meta-item">
                  <span className="mono-tag">{m.label}</span>
                  <p>{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-timeline">
            <span className="section-label">Research Journey</span>
            <div className="accent-rule" />
            <div className="timeline-list">
              {timeline.map((t, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="mono-tag timeline-year">{t.year}</span>
                    <p className="timeline-event">{t.event}</p>
                    <p className="timeline-detail">{t.detail}</p>
                    {t.popup && (
                      <div className="timeline-popup">
                        <p>{t.popup}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
