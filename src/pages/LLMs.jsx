import { useState } from 'react'
import imgCooling from '../../images/southmem.jpg'
import './LLMs.css'

// ── Data ──────────────────────────────────────────────────────────────────────

const infraFacts = [
  {
    stat: '~20%',
    label: 'of global data-center electricity demand attributed to AI by end of 2025',
    cite: '[WIRED]',
    detail: 'AI workloads are projected to account for up to 20% of global data-center electricity demand by the end of 2025. Every interaction with a large language model depends on physical infrastructure: data centers filled with GPU clusters, high-voltage power supply, and industrial cooling systems operating continuously.',
  },
  {
    stat: '10M+',
    label: 'liters of water per year consumed by some AI cooling systems',
    cite: '[MIT Technology Review]',
    detail: 'Cooling systems for AI clusters can consume millions to tens of millions of liters of water per year, an impact often overlooked in popular discussions of AI sustainability. In water-stressed regions such as California, this is comparable to the annual water required to produce thousands of pounds of almonds.',
  },
  {
    stat: '$M/yr',
    label: 'cost to power and maintain large AI model infrastructure',
    cite: '[WIRED]',
    detail: 'Powering and maintaining large AI model infrastructure costs millions of dollars per year. These costs span electricity, cooling systems, hardware maintenance, and physical facilities that house the servers, all of which carry environmental and economic weight before a single query is processed.',
  },
]

const trainFacts = [
  {
    tag: 'Training',
    title: 'Building the Model',
    summary: 'A one-time but enormous energy event, comparable to running hundreds of households for a year.',
    badge: 'Very high one-time cost',
    badgeType: 'orange',
    detail: 'Training involves adjusting billions of parameters through repeated computation on massive datasets. It requires hundreds or thousands of GPUs or TPUs operating continuously for weeks or months. A single state-of-the-art LLM training run can consume megawatt-hours to gigawatt-hours of electricity, comparable to the annual energy use of hundreds of U.S. households.',
    cite: '[International Energy Agency, Patterson et al.]',
  },
  {
    tag: 'Inference',
    title: 'Using the Model',
    summary: 'Lower cost per query, but it runs billions of times a day — that adds up to 80–90% of lifecycle energy.',
    badge: '80–90% of lifecycle energy',
    badgeType: 'red',
    detail: 'Inference refers to generating a response after the model is deployed. Each query requires the model to execute a full forward pass through its neural network layers for every token it produces. While a single inference request uses far less energy than training, inference accounts for 80–90% of total lifecycle energy because it happens billions of times daily worldwide.',
    cite: '[Shao et al.]',
  },
]

const verbosityTypes = [
  {
    label: 'Short prompt, concise answer',
    width: '18%',
    color: 'var(--sage)',
    val: '~Low energy',
    detail: 'Targeted prompts with specific, bounded questions produce short responses. Energy scales with token count, so concise answers are meaningfully cheaper. A well-scoped prompt is the single most effective user-level intervention for reducing AI energy consumption.',
  },
  {
    label: 'Standard chat model, full answer',
    width: '45%',
    color: 'var(--energy-yellow)',
    val: '~Moderate energy',
    detail: 'A typical conversational response from a standard chat model uses a moderate number of tokens. Research consistently finds that users prefer longer, more elaborate AI responses, yet this preference is a meaningful and largely invisible driver of data center energy consumption at scale.',
  },
  {
    label: 'Reasoning model (chain-of-thought)',
    width: '95%',
    color: 'var(--energy-red)',
    val: '~10× more energy',
    detail: '"Thinking" models like Qwen 3 Thinking generate extended internal chains of thought before producing a visible answer. A single query may trigger tens of thousands of internal tokens, consuming energy at an order of magnitude greater per request than a standard chat model.',
  },
]

const gpuFacts = [
  {
    name: 'A100 GPU',
    tag: 'Older generation',
    summary: 'Lower ops/watt; baseline for standard chat model inference.',
    detail: 'The NVIDIA A100 was a major advance in AI compute when it launched and is still widely deployed for standard chat model inference. Its per-operation energy cost is higher than newer accelerators, but the models it typically runs are smaller and less complex, keeping per-request costs manageable.',
    cite: '[ML.ENERGY]',
  },
  {
    name: 'H100 GPU',
    tag: 'Current generation',
    accentColor: 'var(--energy-orange)',
    summary: 'Higher ops/watt, but enables larger models that cost more energy per query.',
    detail: 'The NVIDIA H100 is considerably more energy-efficient per floating-point operation than the A100. However, this efficiency gain does not automatically reduce total energy use. More capable hardware enables the deployment of more complex, parameter-rich models, including reasoning architectures. The total energy cost per request frequently increases even as the underlying silicon becomes more efficient.',
    cite: '[ML.ENERGY]',
  },
  {
    name: 'Jevons Paradox',
    tag: 'The efficiency trap',
    accentColor: 'var(--energy-red)',
    summary: 'Efficiency improvements tend to expand use, not reduce total consumption.',
    detail: "Named after 19th-century economist William Stanley Jevons, this paradox describes how efficiency improvements in resource use tend to increase total consumption rather than reduce it. Applied to AI: as GPUs become more efficient, they make larger and more complex models economically viable to run. The net result is that total system energy often grows even as hardware improves. Measuring AI sustainability requires examining full system-level costs, not just hardware specs.",
    cite: '[ML.ENERGY]',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LLMs() {
  const [openInfra, setOpenInfra] = useState(null)
  const [openTrain, setOpenTrain] = useState(null)
  const [openVerb,  setOpenVerb]  = useState(null)
  const [openGpu,   setOpenGpu]   = useState(null)

  function toggle(setter, i) {
    setter(prev => prev === i ? null : i)
  }

  return (
    <main className="page-enter llms-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 02</span>
          <div className="accent-rule" />
          <h1>Large Language Models</h1>
          <p className="page-hero-sub">
            Every AI response travels through physical infrastructure, including servers, GPUs, power grids,
            and cooling systems. Understanding where energy costs arise is the first step toward using AI more responsibly.
          </p>
        </div>
      </section>

      {/* 01 · Physical Infrastructure */}
      <section className="section">
        <div className="container">
          <span className="section-label">01 · Physical Infrastructure</span>
          <div className="accent-rule" />
          <h2>Servers, Grids & Cooling</h2>
          <p className="llm-section-intro">
            Every AI interaction depends on data centers drawing enormous amounts of electricity and water, continuously.
            Click any card to learn more.
          </p>
          <div className="llm-cards-grid llm-cards-grid--3">
            {infraFacts.map((f, i) => (
              <div
                key={i}
                className={`llm-card${openInfra === i ? ' llm-card--open' : ''}`}
                onClick={() => toggle(setOpenInfra, i)}
                role="button"
                tabIndex={0}
                aria-expanded={openInfra === i}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(setOpenInfra, i)}
              >
                <span className="llm-card-stat">{f.stat}</span>
                <span className="llm-card-label">{f.label}</span>
                <span className="llm-cite-tag">{f.cite}</span>
                {openInfra === i && (
                  <div className="llm-card-detail"><p>{f.detail}</p></div>
                )}
              </div>
            ))}
          </div>
          <div className="llm-photo-frame">
            <img src={imgCooling} alt="" className="llm-photo-frame-img" />
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* 02 · Training vs Inference */}
      <section className="section">
        <div className="container">
          <span className="section-label">02 · Two Processes</span>
          <div className="accent-rule" />
          <h2>Training vs. Inference</h2>
          <p className="llm-section-intro">
            Two computational processes dominate LLM energy use, and most people conflate them. Click to expand.
          </p>
          <div className="llm-cards-grid llm-cards-grid--2">
            {trainFacts.map((f, i) => (
              <div
                key={i}
                className={`llm-card${i === 1 ? ' llm-card--accent' : ''}${openTrain === i ? ' llm-card--open' : ''}`}
                onClick={() => toggle(setOpenTrain, i)}
                role="button"
                tabIndex={0}
                aria-expanded={openTrain === i}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(setOpenTrain, i)}
              >
                <div className="llm-card-photo-frame" />
                <span className="mono-tag">{f.tag}</span>
                <h3 className="llm-card-title">{f.title}</h3>
                <p className="llm-card-summary">{f.summary}</p>
                <span className={`llm-badge llm-badge--${f.badgeType}`}>{f.badge}</span>
                {openTrain === i && (
                  <div className="llm-card-detail">
                    <p>{f.detail}</p>
                    <span className="cite-note">{f.cite}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* 03 · Verbosity */}
      <section className="section">
        <div className="container">
          <span className="section-label">03 · A Hidden Driver</span>
          <div className="accent-rule" />
          <h2>Longer Answers Use More Energy</h2>
          <p className="llm-section-intro">
            AI builds its reply one word at a time, and each word has an energy cost.
            A short, direct answer uses a fraction of the electricity of a lengthy one.
            Some AI models even generate thousands of hidden words behind the scenes before you see a single line of response.
            Click any row to learn more.
          </p>
          <div className="llm-verbosity-list">
            {verbosityTypes.map((v, i) => (
              <div
                key={i}
                className={`llm-verbosity-row${openVerb === i ? ' llm-verbosity-row--open' : ''}`}
                onClick={() => toggle(setOpenVerb, i)}
                role="button"
                tabIndex={0}
                aria-expanded={openVerb === i}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(setOpenVerb, i)}
              >
                <div className="llm-verbosity-top">
                  <span className="llm-verbosity-label">{v.label}</span>
                  <span className="llm-verbosity-val">{v.val}</span>
                </div>
                <div className="llm-verbosity-track">
                  <div className="llm-verbosity-bar" style={{ width: v.width, background: v.color }} />
                </div>
                {openVerb === i && (
                  <div className="llm-card-detail"><p>{v.detail}</p></div>
                )}
              </div>
            ))}
            <p className="cite-note" style={{ marginTop: '0.5rem' }}>Relative energy demand per user query by model type</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* 04 · GPU Bottleneck */}
      <section className="section">
        <div className="container">
          <span className="section-label">04 · Hardware Differences</span>
          <div className="accent-rule" />
          <h2>Better Hardware Doesn't Always Mean Less Energy</h2>
          <p className="llm-section-intro">
            Newer chips can do more work using less power — but that improvement often just makes it practical to run bigger, more complex AI models.
            The result: total energy use goes up even as the hardware gets more efficient.
            Click any card to learn more.
          </p>
          <div className="llm-cards-grid llm-cards-grid--3">
            {gpuFacts.map((f, i) => (
              <div
                key={i}
                className={`llm-card${openGpu === i ? ' llm-card--open' : ''}`}
                style={f.accentColor ? { borderTopColor: f.accentColor } : undefined}
                onClick={() => toggle(setOpenGpu, i)}
                role="button"
                tabIndex={0}
                aria-expanded={openGpu === i}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(setOpenGpu, i)}
              >
                <span className="mono-tag">{f.tag}</span>
                <h4 className="llm-card-title">{f.name}</h4>
                <p className="llm-card-summary">{f.summary}</p>
                {openGpu === i && (
                  <div className="llm-card-detail">
                    <p>{f.detail}</p>
                    <span className="cite-note">{f.cite}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="llm-photo-frame llm-photo-frame--wide" />
        </div>
      </section>

      {/* 05 · A Familiar Comparison — kept as-is */}
      <section className="section search-compare-section">
        <div className="container">
          <span className="section-label">05 · A Familiar Comparison</span>
          <div className="accent-rule" />
          <h2>AI vs. Conventional Search</h2>
          <div className="compare-grid">
            <div className="card compare-card">
              <span className="mono-tag">Google Search</span>
              <div className="compare-stat">≈ 17 sec</div>
              <p>energy equivalent of a 60W lightbulb</p>
            </div>
            <div className="compare-divider">vs.</div>
            <div className="card compare-card compare-card--ai">
              <span className="mono-tag">AI Response</span>
              <div className="compare-stat compare-stat--ai">Significantly more</div>
              <p>depending on model size and response length; small models narrow the gap, frontier models widen it</p>
            </div>
          </div>
          <p className="cite-note" style={{ marginTop: '1.5rem' }}>
            Source: [MIT Technology Review]. See the Measure page to compare specific models.
          </p>
        </div>
      </section>
    </main>
  )
}
