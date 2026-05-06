import './About.css'

const timeline = [
  { year: '2023', event: 'GISMo Group, SLAC National Accelerator Laboratory', detail: 'Renewable energy web platforms, grid integration research' },
  { year: '2024', event: 'REGROW Project, SLAC', detail: 'California heatwave analysis, photovoltaic grid resilience, marimo visualizations' },
  { year: '2025', event: 'SULI, Stanford Synchrotron Radiation Lightsource', detail: 'Beamline automation, TiO₂ phase transformation, computational efficiency' },
  { year: '2025', event: 'Honors Thesis, Pace University', detail: 'Digital pollution, LLM energy benchmarking, educational website' },
  { year: '2026', event: 'Lead Instructor, iD Tech at Stanford University', detail: 'Teaching AI, machine learning, and Python to middle and high school students; course design and hands-on curriculum delivery' },
  { year: '2026', event: 'Healthfirst', detail: 'Business Analyst / Product Owner, Provider Data Management' },
  { year: '2026', event: 'M.S. Computer Science, Georgia Institute of Technology', detail: 'Graduate study in computer science' },
]

const meta = [
  { label: 'Researcher', value: 'Melody Nguyen, Pace University' },
  { label: 'Faculty Advisor', value: 'Arya Boudaie, Software Engineer at Amazon' },
  { label: 'Funding', value: 'Pforzheimer Honors College at Pace University' },
  { label: 'Presentation', value: 'New York City, May 8th, 2026' },
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
            <p>
              Being raised by a Buddhist family taught me the importance of interconnectedness
              where all humans, animals, and nature are profoundly linked, and damaging
              one part harms the whole. These childhood teachings shape my motivation for
              understanding how technological progress can align with ethical and environmental responsibility.
            </p>
            <p>
              Through internships at SLAC National Accelerator Laboratory and research at the
              Stanford Synchrotron Radiation Lightsource, I came to see how thoughtful system
              design can improve scientific throughput while conserving limited resources;
              decisions about when to compute, and how much, carry real environmental implications.
            </p>
            <p>
              Teaching AI, machine learning, and Python to middle and high school students at iD Tech on Stanford's campus
              reinforced what this research kept returning to: the people closest to these tools rarely see the
              infrastructure behind them. Making that infrastructure legible, especially to the next generation of builders,
              is part of why this website exists.
            </p>
            <p>
              This thesis searches for a middle ground: one that preserves AI's capacity
              to accelerate discovery while emphasizing transparent, efficient, and sustainable use.
              That question continues in the next chapter, joining Healthfirst as a Business Analyst and Product Owner
              focused on Provider Data Management, where data quality, system design, and responsible technology intersect.
            </p>

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
