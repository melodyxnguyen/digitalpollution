import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const stats = [
  {
    value: "85×",
    label: "more energy per token: DeepSeek R1 (2.37 J) vs. GPT OSS 20B (0.028 J)",
    cite: "[ML.ENERGY]",
  },
  {
    value: "3.7M tons",
    label: "CO₂e/year projected from OpenAI's Stargate data center, roughly Iceland's entire annual emissions",
    cite: "[IEA]",
  },
  {
    value: "20%",
    label: "of global data center electricity demand may be attributed to AI by end of 2025",
    cite: "[WIRED]",
  },
]

const researchCards = [
  {
    label: "Research Question",
    text: "Do people understand the energy and emissions costs of large language models, and can developer ergonomics, building small task-specific models instead of defaulting to frontier LLMs, shift how AI is used for the benefit of humanity?",
  },
  {
    label: "Method",
    text: "8 expert interviews across energy, healthcare, and tech + direct hardware benchmarks from ML.ENERGY Leaderboard + an interactive educational website + Sentra, a task-specific AI agent built on a student budget.",
  },
  {
    label: "Central Finding",
    text: "For bounded, well-scoped tasks, small models match frontier LLMs at a fraction of the energy cost. The answer to AI's environmental footprint is not rejection; it is specificity.",
  },
]

const expertQuotes = [
  {
    quote: "Large language models have been enormously successful because they are so general. But you can get comparable answers for far less energy cost and monetary cost if you actually just train small classical machine learning models. The hard part is that it requires expertise and time.",
    name: "Akshay Agrawal",
    title: "Co-founder · Marimo · Tech · April 2026",
  },
  {
    quote: "Stochastic automation systems can offer substantial utility but also have the risk of causing serious harm. Hype and imprecise language make this more difficult to navigate. We should describe these systems by what users can do with them, not by anthropomorphic capabilities they purportedly possess, and acknowledge the significant human labor that goes into making these systems work.",
    name: "Bennet Meyers",
    title: "Staff Scientist · SLAC / NREL; Adjunct Professor · Stanford University · Energy & Research · April 2026",
  },
  {
    quote: "This is a multidimensional problem. It is a security issue. It is a national race to AI competence. Everyone is giving incentives but no one is asking who pays for the externalities.",
    name: "Rimvydas Baltaduonis",
    title: "Energy Economist, Lecturer · Stanford University · Energy Policy · March 2026",
  },
  {
    quote: "LLMs exhibit jagged intelligence, excelling at complex tasks while failing simple ones. Tool use remains rudimentary, leaving significant room for the kind of efficient, task-specific design this thesis advocates.",
    name: "Arya Boudaie",
    title: "Software Engineer · Amazon; AI Professor · Pace University · Tech & Academia · Spring 2026",
  },
  {
    quote: "If you are not paying the sticker price, or someone else pays, you do not really think about the energy costs, in the same way that people buy clothing without thinking about labor conditions or materials sourcing.",
    name: "Jonathan Lee",
    title: "Clinical Assistant Professor, Computer Science · Pace University · Academia · April 2026",
  },
  {
    quote: "I would like to see more rigorous oversight of data center operations, a better model for allocating the infrastructure costs so that we do not socialize those costs unnecessarily, and a stronger corporate governance model and legal framework for managing the social, political, and economic risks to society.",
    name: "David P. Chassin, PhD",
    title: "Owner · Eudoxys Sciences LLC; Former Chief Scientist, GISMo · SLAC · Energy Research · February 2026",
  },
  {
    quote: "Orchestration first, automation second. Map the workflow, then automate specific steps, not replace the entire process at once. Our provider onboarding dropped from 90 days to 3 weeks.",
    name: "Dr. Sri Ramesh Eevani",
    title: "AVP Technology · Healthfirst · Healthcare · April 2026",
  },
  {
    quote: "The manual work of cross-referencing regulatory requirements against company documentation is slow, error-prone, and expensive. An AI agent that surfaces evidence gaps before an audit would transform this workflow entirely.",
    name: "Nicole Ha",
    title: "Executive Consultant · BioTech Regulatory, Quality & CMC · Biotech · April 2026",
  },
]

function ExpertQuotes() {
  const [index, setIndex] = useState(0)
  const [sliding, setSliding] = useState(false)
  const touchStartX = useRef(null)
  const autoRef = useRef(null)

  function goTo(next) {
    if (sliding) return
    setSliding(true)
    setTimeout(() => {
      setIndex(((next % expertQuotes.length) + expertQuotes.length) % expertQuotes.length)
      setSliding(false)
    }, 320)
  }

  function startAuto() {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => goTo(index + 1), 7000)
  }

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [index])

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 48) {
      dx < 0 ? goTo(index + 1) : goTo(index - 1)
    }
    touchStartX.current = null
  }

  const q = expertQuotes[index]

  return (
    <section className="section expert-quotes-section">
      <div className="container">
        <span className="section-label">Expert Perspectives · {expertQuotes.length} Voices</span>
        <div className="accent-rule" />
        <h2>What Researchers Say</h2>
        <div
          className={`expert-quote-card ${sliding ? 'expert-quote-card--sliding' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="expert-quote-mark">“</div>
          <blockquote className="expert-quote-text">{q.quote}</blockquote>
          <div className="expert-quote-attr">
            <span className="expert-quote-name">{q.name}</span>
            <span className="expert-quote-title">{q.title}</span>
          </div>
        </div>
        <div className="expert-quote-nav">
          <button
            className="expert-nav-arrow"
            onClick={() => goTo(index - 1)}
            aria-label="Previous quote"
          >‹</button>
          <div className="expert-quote-dots">
            {expertQuotes.map((_, i) => (
              <button
                key={i}
                className={`expert-quote-dot ${i === index ? 'expert-quote-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="expert-nav-arrow"
            onClick={() => goTo(index + 1)}
            aria-label="Next quote"
          >›</button>
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
            <Link to="/best-practices" className="btn-sage">Measure My Consumption →</Link>
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

      {/* Core Argument */}
      <section className="argument-strip">
        <div className="container argument-strip-inner">
          <p className="argument-strip-title">
            The most practical path to reducing AI's energy footprint is specificity — small, task-specific models instead of frontier ones.
          </p>
          <p className="argument-strip-sub">
            LLMs are generically powerful but generically expensive. The answer isn't rejection — it's fit. Professionals who repeat the same tasks should reach for smaller, purpose-built models, not frontier ones.
          </p>
          <span className="argument-strip-attr">— Thesis Conclusion · Melody Nguyễn, Pace University 2026</span>
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

          {/* Secondary stats */}
          <div className="secondary-stats">
            <div className="secondary-stat-item">
              <p><strong>2.3 billion</strong> people use cloud storage today, placing constant and growing load on global data infrastructure. <span className="mono-tag">[Greenly]</span></p>
            </div>
            <div className="secondary-stat-item">
              <p>Actual GPU power draw sits at just <strong>25–75%</strong> of rated TDP — benchmarks overstate real-world energy use. <span className="mono-tag">[ML.ENERGY]</span></p>
            </div>
            <div className="secondary-stat-item">
              <p>A Google search uses roughly the energy of a 60W bulb burning for <strong>17 seconds</strong>. A large AI query costs around <strong>10×</strong> more. <span className="mono-tag">[MIT Tech Review]</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo frame */}
      <div className="landing-photo-frame-wrap">
        <div className="container">
          <div className="landing-photo-frame" />
        </div>
      </div>

      {/* Explore the Research */}
      <section className="section nav-teaser">
        <div className="container">
          <span className="section-label">Explore the Research</span>
          <div className="accent-rule" />
          <div className="nav-teaser-grid">
            {[
              { path: '/digital-technologies', num: '01', title: 'Digital Technologies',       desc: 'E-waste, internet pollution, and the full infrastructure lifecycle behind every click.' },
              { path: '/large-language-models', num: '02', title: 'Large Language Models',  desc: 'Training vs. inference, the GPU bottleneck, and why model size is an energy decision.' },
              { path: '/interactive',           num: '03', title: 'Measure',               desc: 'Compare models side-by-side and watch energy accumulate token-by-token in real time.' },
              { path: '/best-practices',        num: '04', title: 'Best Practices',        desc: 'Best practices, curated tools, and what you can do today to reduce your footprint.' },
              { path: '/quiz',                  num: '05', title: 'Quiz',                      desc: 'Test what you\'ve learned about digital pollution and AI\'s environmental footprint.' },
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
