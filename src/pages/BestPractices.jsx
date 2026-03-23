import './BestPractices.css'

const practices = [
  {
    num: '01',
    icon: '✏️',
    title: 'Write concise prompts',
    detail: 'Shorter, well-scoped prompts generate shorter responses — reducing the number of tokens produced and the energy consumed per interaction.',
    cite: '[4], [6]',
  },
  {
    num: '02',
    icon: '📦',
    title: 'Batch related questions',
    detail: 'Instead of sending five separate queries, combine them into one. Each model call has a fixed overhead cost — batching reduces that overhead.',
    cite: '[6]',
  },
  {
    num: '03',
    icon: '🔍',
    title: 'Choose the right model',
    detail: 'A small model like Mistral 7B uses ~0.052 J/token. A reasoning model like DeepSeek R1 uses ~2.37 J/token. For simple tasks, smaller is smarter.',
    cite: '[17]',
  },
  {
    num: '04',
    icon: '🗑️',
    title: 'Delete old emails',
    detail: 'Every stored email sits on a server consuming energy. Deleting old emails and unsubscribing from newsletters reduces persistent server load.',
    cite: '[18]',
  },
  {
    num: '05',
    icon: '📶',
    title: 'Use Wi-Fi over cellular',
    detail: 'Mobile networks (4G/5G) are less energy-efficient per bit than fixed broadband. Switch to Wi-Fi for data-heavy tasks like video or AI use.',
    cite: '[18]',
  },
  {
    num: '06',
    icon: '📱',
    title: 'Keep devices longer',
    detail: 'Manufacturing a new device embeds significant carbon before it is ever turned on. Extending device life is one of the highest-impact individual actions.',
    cite: '[5]',
  },
  {
    num: '07',
    icon: '⏸️',
    title: 'Disable autoplay',
    detail: 'Automatic video playback on YouTube and social platforms continuously loads server bandwidth — even when you are not actively watching.',
    cite: '[18]',
  },
  {
    num: '08',
    icon: '☁️',
    title: 'Audit your cloud storage',
    detail: 'Unneeded cloud backups, duplicate files, and unused subscriptions place constant load on data infrastructure. Review and trim regularly.',
    cite: '[18]',
  },
]

const scenarios = [
  {
    title: 'Quick question',
    bad: 'Tell me everything about climate change, its causes, effects, history, and what I can do about it.',
    good: 'What are the top 3 individual actions to reduce carbon footprint?',
    why: 'The concise prompt targets exactly what you need — fewer tokens, less energy, same value.',
  },
  {
    title: 'Choosing a model',
    bad: 'Use GPT-4 or DeepSeek R1 to summarize this 3-sentence email.',
    good: 'Use Mistral 7B or a small chat model for simple summarization tasks.',
    why: 'Reasoning models burn ~85× more energy per token than small models for tasks that don\'t need deep reasoning.',
  },
  {
    title: 'Research task',
    bad: 'Send 10 follow-up queries one at a time as you think of them.',
    good: 'Draft all your questions first, then send them together in one prompt.',
    why: 'Each query carries a fixed infrastructure cost. Batching cuts that overhead significantly.',
  },
]

export default function BestPractices() {
  return (
    <main className="page-enter best-practices-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 04</span>
          <div className="accent-rule" />
          <h1>Best Practices</h1>
          <p className="page-hero-sub">
            Sustainable AI use is not about using less — it is about using wisely.
            These practices reduce your computational footprint without sacrificing productivity.
          </p>
        </div>
      </section>

      {/* Eight practices grid */}
      <section className="section">
        <div className="container">
          <span className="section-label">8 Practices</span>
          <div className="accent-rule" />
          <h2>What You Can Do Today</h2>
          <div className="practices-grid">
            {practices.map((p, i) => (
              <div key={i} className="card practice-card">
                <div className="practice-card-top">
                  <span className="practice-icon">{p.icon}</span>
                  <span className="practice-num">{p.num}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.detail}</p>
                <span className="practice-cite">{p.cite}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage scenarios */}
      <section className="section scenarios-section">
        <div className="container">
          <span className="section-label">In Practice</span>
          <div className="accent-rule" />
          <h2>Usage Scenarios</h2>
          <p style={{ marginBottom: '2rem' }}>
            See how small prompt choices translate into real energy differences.
          </p>
          <div className="scenarios-list">
            {scenarios.map((s, i) => (
              <div key={i} className="scenario">
                <span className="scenario-title">{s.title}</span>
                <div className="scenario-cols">
                  <div className="scenario-col scenario-col--bad">
                    <span className="scenario-label">Less efficient</span>
                    <p>"{s.bad}"</p>
                  </div>
                  <div className="scenario-arrow">→</div>
                  <div className="scenario-col scenario-col--good">
                    <span className="scenario-label">More efficient</span>
                    <p>"{s.good}"</p>
                  </div>
                </div>
                <div className="scenario-why">
                  <span className="mono-tag">Why it matters</span>
                  <p>{s.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gebru quote */}
      <section className="section quote-section">
        <div className="container">
          <div className="block-quote">
            <div className="block-quote-mark">"</div>
            <blockquote>
              The dominant research culture rewards scale and performance
              while sidelining environmental and social costs.
            </blockquote>
            <cite>Gebru et al., On the Dangers of Stochastic Parrots, FAccT 2021 [2]</cite>
          </div>
        </div>
      </section>
    </main>
  )
}