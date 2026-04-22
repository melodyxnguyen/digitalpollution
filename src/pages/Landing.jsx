import { Link } from 'react-router-dom'
import './Landing.css'

const stats = [
  { value: "80–90%", label: "of LLM energy used during inference, not training", cite: "[Shao et al.]" },
  { value: "2.3B", label: "people use cloud storage services today", cite: "[Greenly]" },
  { value: "4×", label: "TDP estimates can overstate real GPU energy use", cite: "[ML.ENERGY]" },
]

const researchCards = [
  { label: "Research Question", text: "Do people understand the energy and emissions costs of LLMs, and can a brief educational intervention shift behavioral intentions?" },
  { label: "Central Method", text: "Pre/post surveys with an interactive educational website as the intervention, measuring changes in knowledge, attitudes, and intentions." },
  { label: "Key Output", text: "An open educational website pairing empirical benchmarks with interactive tools to make AI energy use tangible and personally meaningful." },
]

export default function Landing() {
  return (
    <main className="landing page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-pattern" aria-hidden="true" />
        <div className="container hero-content">
          <span className="section-label">Honors Thesis · Pace University</span>
          <h1 className="hero-title">
            Digital<br />
            <em>Pollution</em>
          </h1>
          <p className="hero-sub">
            Every AI query, email, and cloud upload has a physical cost — electricity
            drawn from grids, water consumed by cooling systems, hardware extracted from the earth.
            This project makes the invisible visible.
          </p>
          <div className="hero-actions">
            <Link to="/interactive" className="btn-sage">Measure My Consumption →</Link>
            <Link to="/digital-technologies" className="btn-ghost">What is Digital Pollution?</Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-callout">{s.value}</span>
              <p className="stat-label">{s.label} <span className="mono-tag">{s.cite}</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* About This Research */}
      <section className="section about-section">
        <div className="container about-container">
          <span className="section-label">About This Research</span>
          <div className="accent-rule" />
          <h2>Understanding the energy costs of large language models</h2>
          <p className="about-body">
            In an age when our lives are increasingly digitized, the environmental costs of
            our digital habits often go unseen. Behind every query to an AI system are data centers
            filled with servers that consume enormous amounts of electricity and water.
          </p>
          <p className="about-body">
            This research evaluates whether targeted education can improve public understanding
            of AI sustainability, and shift behavioral intentions toward more mindful use.
          </p>
          <blockquote className="pull-quote">
            "Any efforts to reduce our current carbon footprint created by digital pollution
            will become more challenging over time." <cite>[Greenly]</cite>
          </blockquote>
        </div>
      </section>

      {/* Research Overview: Question, Method, Output */}
      <section className="section research-overview-section">
        <div className="container">
          <span className="section-label">Research Overview</span>
          <div className="accent-rule" />
          <div className="research-cards-grid">
            {researchCards.map((c, i) => (
              <div key={i} className="research-card">
                <span className="research-card-num">0{i + 1}</span>
                <span className="mono-tag research-card-label">{c.label}</span>
                <p className="research-card-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the Research */}
      <section className="section nav-teaser">
        <div className="container">
          <span className="section-label">Explore the Research</span>
          <div className="accent-rule" />
          <div className="nav-teaser-grid">
            {[
              { path: '/digital-technologies', num: '01', title: 'Digital Technologies', desc: 'E-waste, data infrastructure, and Internet pollution — the full lifecycle.' },
              { path: '/large-language-models', num: '02', title: 'Large Language Models', desc: 'Physical infrastructure, training vs. inference, and the GPU bottleneck.' },
              { path: '/interactive', num: '03', title: 'Interactive Tools', desc: 'Model comparison slider, email calculator, and live energy meter.' },
              { path: '/best-practices', num: '04', title: 'Best Practices', desc: 'Concrete steps to reduce your AI and digital footprint today.' },
              { path: '/fun-facts', num: '05', title: 'Fun Facts & Quiz', desc: 'Test your knowledge and explore research highlights.' },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="nav-card">
                <span className="nav-card-num">{item.num}</span>
                <h3 className="nav-card-title">{item.title}</h3>
                <p className="nav-card-desc">{item.desc}</p>
                <span className="nav-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
