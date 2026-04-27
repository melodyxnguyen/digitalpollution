import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const stats = [
  { value: "80–90%", label: "of LLM energy used during inference, not training", cite: "[Shao et al.]" },
  { value: "2.3B",   label: "people use cloud storage services today",            cite: "[Greenly]" },
  { value: "4×",     label: "TDP estimates can overstate real GPU energy use",    cite: "[ML.ENERGY]" },
]

const researchCards = [
  { label: "Research Question", text: "Do people understand the energy and emissions costs of LLMs, and can a brief educational intervention shift behavioral intentions?" },
  { label: "Central Method",   text: "Educate users on AI's hidden energy costs, equip them with practical tools for sustainable use, and activate civic action toward stronger data center oversight." },
  { label: "Key Output",       text: "An open educational website pairing empirical benchmarks with interactive tools to make AI energy use tangible and personally meaningful." },
]

// Add more quotes here as interviews are completed
const expertQuotes = [
  {
    quote: "I would like to see a more rigorous oversight of data center planning and operations, a better model for allocating the infrastructure costs of building data centers so that we don't socialize those costs unnecessarily, and a stronger corporate governance model and legal framework for managing the social, political, and economic risks to society.",
    name:  "David P. Chassin, PhD",
    title: "Eudoxys Sciences (formerly SLAC National Accelerator Laboratory)",
  },
  {
    quote: "I feel compelled to make people understand that when they use ChatGPT like a calculator, that comes with a cost to the planet.",
    name:  "Sasha Luccioni",
    title: "AI and Climate Lead, Hugging Face",
    source: "NPR, 2024",
  },
]

function ExpertQuotes() {
  const [index, setIndex] = useState(0)
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    if (expertQuotes.length < 2) return
    const id = setInterval(() => {
      setSliding(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % expertQuotes.length)
        setSliding(false)
      }, 400)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const q = expertQuotes[index]

  return (
    <section className="section expert-quotes-section">
      <div className="container">
        <span className="section-label">Expert Perspectives</span>
        <div className="accent-rule" />
        <h2>What Researchers Say</h2>
        <div className={`expert-quote-card ${sliding ? 'expert-quote-card--sliding' : ''}`}>
          <div className="expert-quote-mark">"</div>
          <blockquote className="expert-quote-text">{q.quote}</blockquote>
          <div className="expert-quote-attr">
            <span className="expert-quote-name">{q.name}</span>
            <span className="expert-quote-title">
              {q.title}{q.source ? ` · ${q.source}` : ''}
            </span>
          </div>
        </div>
        <div className="expert-quote-progress">
          <div
            className="expert-quote-progress-fill"
            key={index}
          />
        </div>
      </div>
    </section>
  )
}

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
            Every AI query, email, and cloud upload has a physical cost. Electricity
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

      {/* Expert Perspectives */}
      <ExpertQuotes />

      {/* Research Overview */}
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
              { path: '/interactive',           num: '03', title: 'Explore',               desc: 'Model comparison slider, email calculator, and live energy meter.' },
              { path: '/best-practices',        num: '04', title: 'Measure',               desc: 'Best practices, curated tools, and ways to reduce your footprint.' },
              { path: '/act',                   num: '05', title: 'Act',                   desc: 'Write to your senator and test your knowledge with the quiz.' },
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
