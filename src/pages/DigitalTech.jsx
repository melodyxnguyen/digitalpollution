import { useState } from 'react'
import './DigitalTech.css'

const categories = [
  {
    num: '01',
    icon: '🖥️',
    title: 'Where Does E-Waste Go?',
    preview: 'The hidden cost of making and discarding hardware.',
    modal: {
      heading: 'Hardware, Manufacturing & E-Waste',
      subtitle: 'Every device has a carbon cost before it is ever turned on.',
      facts: [
        { stat: 'Rare Earth Mining', detail: 'Manufacturing a single GPU requires rare earth metals, significant water, and energy-intensive fabrication, before it ever runs a single computation.' },
        { stat: 'Fastest-Growing Waste Stream', detail: 'Electronic waste is the fastest-growing waste stream globally. Most e-waste ends up in landfills, leaching toxic chemicals into soil and water.' },
        { stat: 'Frequent Hardware Turnover', detail: 'Data centers upgrade hardware frequently, generating substantial e-waste even when equipment still functions perfectly well.' },
        { stat: 'What You Can Do', detail: 'Keeping your devices longer is one of the most impactful individual actions; it reduces the manufacturing carbon embedded in every piece of hardware you own.' },
      ],
      cite: '[Patterson et al.]',
    }
  },
  {
    num: '02',
    icon: '⚡',
    title: 'The Machines That Never Sleep',
    preview: 'Data centers run 24/7, and so does their energy demand.',
    modal: {
      heading: 'Data Infrastructure & Energy',
      subtitle: 'The always-on cost of storing and processing the world\'s data.',
      facts: [
        { stat: '24/7 Operation', detail: 'Servers inside data centers never turn off. They continuously consume electricity to store, process, and serve every piece of digital content, including this page.' },
        { stat: 'Water Consumption', detail: 'Cooling systems for AI clusters can consume millions to tens of millions of liters of water per year, an impact rarely discussed in AI sustainability conversations.' },
        { stat: '2.3 Billion Users', detail: 'Approximately 2.3 billion people use cloud storage services today, placing constant and growing load on global data infrastructure.' },
        { stat: 'AI\'s Growing Share', detail: 'AI workloads may account for up to 20% of global data-center electricity demand by the end of 2025, and that share is rising.' },
      ],
      cite: '[MIT Technology Review, WIRED, Greenly]',
    }
  },
  {
    num: '03',
    icon: '📡',
    title: 'Every Click Has a Cost',
    preview: 'Streaming, scrolling, and AI queries all leave a footprint.',
    modal: {
      heading: 'Internet Pollution & Daily Habits',
      subtitle: 'Internet pollution is the energy cost of your active digital life.',
      facts: [
        { stat: 'What Is Internet Pollution?', detail: 'Internet pollution is a subset of digital pollution, focused on the energy cost of active data transmission: streaming, uploading, querying AI, and refreshing social media.' },
        { stat: 'Wi-Fi vs. 4G/5G', detail: 'Streaming video over cellular networks consumes more energy per bit than Wi-Fi. Simply switching to Wi-Fi for data-heavy tasks meaningfully reduces your footprint.' },
        { stat: 'The Email Problem', detail: '36% of Gen Z has over 1,000 unread emails sitting in a server. Each stored email has a small but real carbon cost; multiplied across billions of accounts, it adds up.' },
        { stat: 'AI Queries', detail: 'Every AI response belongs to this category. Each token generated requires a full forward pass through a GPU; longer, more elaborate responses consume more energy.' },
      ],
      cite: '[Greenly]',
    }
  },
]

function Modal({ cat, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-header">
          <span className="modal-icon">{cat.icon}</span>
          <span className="modal-num">{cat.num}</span>
        </div>
        <h2 className="modal-heading">{cat.modal.heading}</h2>
        <p className="modal-subtitle">{cat.modal.subtitle}</p>
        <div className="modal-facts">
          {cat.modal.facts.map((f, i) => (
            <div key={i} className="modal-fact">
              <span className="modal-fact-label">{f.stat}</span>
              <p>{f.detail}</p>
            </div>
          ))}
        </div>
        <p className="modal-cite">Sources: {cat.modal.cite}</p>
      </div>
    </div>
  )
}

export default function DigitalTech() {
  const [active, setActive] = useState(null)

  return (
    <main className="page-enter digital-tech">
      {active !== null && (
        <Modal cat={categories[active]} onClose={() => setActive(null)} />
      )}

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 01</span>
          <div className="accent-rule" />
          <h1>Digital Technologies</h1>
          <p className="page-hero-sub">
            Digital pollution covers the full lifecycle impact of our digital lives,
            from the moment hardware is manufactured to every query you send to an AI today.
            Tap a card to explore each layer.
          </p>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="flow-section">
        <div className="container">
          <div className="flow-diagram">
            <div className="flow-node flow-node--start">Your Digital Life</div>
            <div className="flow-arrow">→</div>
            <div className="flow-categories">
              <div className="flow-node flow-node--cat">E-Waste &amp; Hardware</div>
              <div className="flow-node flow-node--cat">Data Infrastructure</div>
              <div className="flow-node flow-node--cat sage">Internet Pollution</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node flow-node--end">Energy Demand<br />&amp; Emissions</div>
          </div>
        </div>
      </section>

      {/* Three cards */}
      <section className="section">
        <div className="container">
          <div className="category-cards">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="category-card"
                onClick={() => setActive(i)}
              >
                <span className="category-card-icon">{cat.icon}</span>
                <span className="category-card-num">{cat.num}</span>
                <h3 className="category-card-title">{cat.title}</h3>
                <span className="category-card-cta">Learn more →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Consumer actions */}
      <section className="section consumer-section">
        <div className="container">
          <span className="section-label">What You Can Do</span>
          <div className="accent-rule" />
          <h2>Consumer Mitigation Strategies</h2>
          <p style={{ marginBottom: '2rem' }}>
            Individual actions may feel small, but at the scale of billions of users they represent
            a meaningful driver of data center energy demand [Greenly].
          </p>
          <div className="actions-grid">
            {[
              { action: 'Delete old emails', detail: '36% of Gen Z has 1,000+ unread emails. Each stored email has a non-zero carbon cost.' },
              { action: 'Use Wi-Fi over 4G/5G', detail: 'Mobile networks are less energy-efficient per bit than fixed broadband infrastructure.' },
              { action: 'Disable autoplay', detail: 'Automatic video play on YouTube and other platforms continuously loads server bandwidth.' },
              { action: 'Keep devices longer', detail: 'Manufacturing-related e-waste is reduced when you extend the useful life of hardware.' },
              { action: 'Choose local storage', detail: 'Hard drives and SSDs reduce dependence on cloud servers for everyday file storage.' },
              { action: 'Be mindful of AI use', detail: 'Concise prompts, smaller models, and batching queries all reduce inference energy.' },
            ].map((a, i) => (
              <div key={i} className="card action-card">
                <h4>{a.action}</h4>
                <p>{a.detail}</p>
              </div>
            ))}
          </div>
          <p className="cite-note">Sources: [MIT Technology Review, Shao et al., Greenly]</p>
        </div>
      </section>
    </main>
  )
}