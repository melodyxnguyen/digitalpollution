import imgCodeCarbon from '../../images/codecarbon1.png'
import imgScoreboard from '../../images/scoreboard.jpeg'
import './BestPractices.css'

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BestPractices() {
  return (
    <main className="page-enter best-practices-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 04</span>
          <div className="accent-rule" />
          <h1>Best Practices</h1>
          <p className="page-hero-sub">
            Sustainable AI use is not about using less; it is about using wisely.
            Curated tools and hands-on visualizers to help you measure and understand AI's real energy footprint.
          </p>
        </div>
      </section>

      {/* Curated Tools */}
      <section className="section tools-section">
        <div className="container">
          <span className="section-label">Curated Tools</span>
          <div className="accent-rule" />
          <h2>Measure What Matters</h2>
          <p className="tools-intro">
            These tools let researchers, developers, and curious people see AI's energy footprint
            in real numbers, not estimates.
          </p>
          {/* Screenshot placeholders */}
          <div className="screenshots-grid">
            <div className="screenshot-frame">
              <div className="screenshot-frame-header">
                <span className="screenshot-tool-name">CodeCarbon</span>
              </div>
              <img src={imgCodeCarbon} alt="CodeCarbon interface" className="screenshot-img" />
            </div>
            <div className="screenshot-frame">
              <div className="screenshot-frame-header">
                <span className="screenshot-tool-name">AI Energy Score Leaderboard</span>
              </div>
              <img src={imgScoreboard} alt="AI Energy Score Leaderboard" className="screenshot-img" />
            </div>
          </div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-card-header">
                <span className="tool-num">01</span>
                <a
                  className="tool-name"
                  href="https://codecarbon.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CodeCarbon ↗
                </a>
              </div>
              <p className="tool-desc">
                Tracks and reduces CO₂ emissions from computing. Integrates directly into
                Python projects to measure the carbon footprint of code as it runs.
              </p>
              <blockquote className="tool-quote">
                "AI can benefit society in many ways, but given the energy needed to support
                the computing behind AI, these benefits can come at a high environmental price."
              </blockquote>
              <span className="tool-attr">— Sasha Luccioni</span>
            </div>

            <div className="tool-card">
              <div className="tool-card-header">
                <span className="tool-num">02</span>
                <a
                  className="tool-name"
                  href="https://huggingface.co/spaces/AIEnergyScore/Leaderboard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AI Energy Score Leaderboard ↗
                </a>
              </div>
              <p className="tool-desc">
                A standardized benchmark comparing the energy efficiency of 166+ AI models
                across 10 task types. Built by Sasha Luccioni at Hugging Face, the first
                apples-to-apples comparison of model efficiency at scale.
              </p>
            </div>

            <div className="tool-card">
              <div className="tool-card-header">
                <span className="tool-num">03</span>
                <a
                  className="tool-name"
                  href="https://ml.energy/leaderboard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ML.ENERGY Leaderboard ↗
                </a>
              </div>
              <p className="tool-desc">
                Direct GPU power measurements for LLM inference, reported in joules per
                token. The most granular publicly available dataset on the real energy cost
                of running language models, used as the benchmark source for this research.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="container">
          <div className="block-quote">
            <div className="block-quote-mark">&ldquo;</div>
            <blockquote>
              The dominant research culture rewards scale and performance
              while sidelining environmental and social costs.
            </blockquote>
            <cite>Gebru et al., On the Dangers of Stochastic Parrots, FAccT 2021</cite>
          </div>
        </div>
      </section>
    </main>
  )
}
