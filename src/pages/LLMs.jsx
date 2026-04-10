import './LLMs.css'

export default function LLMs() {
  return (
    <main className="page-enter llms-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 02</span>
          <div className="accent-rule" />
          <h1>Large Language Models</h1>
          <p className="page-hero-sub">
            Every AI response travels through physical infrastructure — servers, GPUs, power grids,
            and cooling systems. Understanding where energy costs arise is the first step toward using AI more responsibly.
          </p>
        </div>
      </section>

      {/* Physical Infrastructure */}
      <section className="section">
        <div className="container">
          <span className="section-label">01 · Physical Infrastructure</span>
          <div className="accent-rule" />
          <div className="two-col">
            <div>
              <h2>Servers, Grids & Cooling</h2>
              <p>
                Every interaction with a large language model depends on physical infrastructure:
                data centers filled with GPU clusters, high-voltage power supply, and industrial
                cooling systems operating continuously.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Cooling systems for AI clusters can consume millions to tens of millions of liters
                of water per year — an impact often overlooked in popular discussions of AI
                sustainability [MIT Technology Review]. In water-stressed regions such as California, this is comparable
                to the annual water required to produce thousands of pounds of almonds.
              </p>
              <p style={{ marginTop: '1rem' }}>
                AI workloads are projected to account for up to 20% of global data-center electricity
                demand by the end of 2025 [WIRED].
              </p>
            </div>
            <div className="infra-stats">
              {[
                { stat: '~20%', label: 'of global data-center electricity demand attributed to AI by end of 2025', cite: '[WIRED]' },
                { stat: '10M+', label: 'liters of water per year consumed by some AI cooling systems', cite: '[MIT Technology Review]' },
                { stat: '$M/yr', label: 'cost to power and maintain large AI model infrastructure', cite: '[WIRED]' },
              ].map((s, i) => (
                <div key={i} className="card infra-stat-card">
                  <span className="stat-callout">{s.stat}</span>
                  <p style={{ fontSize: '0.88rem', maxWidth: '100%' }}>{s.label} <span className="mono-tag">{s.cite}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* Training vs Inference */}
      <section className="section">
        <div className="container">
          <span className="section-label">02 · Two Processes</span>
          <div className="accent-rule" />
          <h2>Training vs. Inference</h2>
          <p style={{ marginBottom: '2.5rem' }}>
            Two computational processes dominate LLM energy use — and most people conflate them [Searchlight Institute].
          </p>
          <div className="two-col training-cols">
            <div className="card training-card">
              <span className="mono-tag">Training</span>
              <h3 style={{ marginTop: '0.75rem' }}>Building the Model</h3>
              <p>
                Training involves adjusting billions of parameters through repeated computation on
                massive datasets. It requires hundreds or thousands of GPUs or TPUs operating
                continuously for weeks or months.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                A single state-of-the-art LLM training run can consume megawatt-hours to
                gigawatt-hours of electricity — comparable to the annual energy use of hundreds
                of U.S. households [International Energy Agency, Patterson et al.].
              </p>
              <div className="training-badge training-badge--high">
                Very high one-time cost
              </div>
            </div>
            <div className="card training-card inference-card">
              <span className="mono-tag">Inference</span>
              <h3 style={{ marginTop: '0.75rem' }}>Using the Model</h3>
              <p>
                Inference refers to generating a response after the model is deployed. Each query
                requires the model to execute a full forward pass through its neural network layers
                for every token it produces.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                While a single inference request uses far less energy than training, inference is
                estimated to account for <strong>80–90% of total lifecycle energy</strong> because it
                happens billions of times daily worldwide [Shao et al.].
              </p>
              <div className="training-badge training-badge--sage">
                80–90% of lifecycle energy [Shao et al.]
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* Response verbosity */}
      <section className="section">
        <div className="container">
          <span className="section-label">03 · A Hidden Driver</span>
          <div className="accent-rule" />
          <h2>Response Verbosity & Token Cost</h2>
          <div className="two-col">
            <div>
              <p>
                Every token in a model's reply requires a full forward pass through the GPU.
                Longer responses scale energy consumption nearly linearly with output length.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Research consistently finds that users prefer longer, more elaborate AI responses —
                yet this preference is a meaningful and largely invisible driver of data center
                energy consumption at scale.
              </p>
              <p style={{ marginTop: '1rem' }}>
                "Thinking" models like Qwen 3 Thinking generate extended internal chains of thought
                before producing a visible answer. A single query may trigger tens of thousands
                of internal tokens — consuming energy at an order of magnitude greater per request
                than a standard chat model.
              </p>
            </div>
            <div className="verbosity-visual">
              <div className="verbosity-bar-group">
                <span className="verbosity-label">Short prompt, concise answer</span>
                <div className="verbosity-track">
                  <div className="verbosity-bar" style={{ width: '18%', background: 'var(--sage)' }} />
                </div>
                <span className="verbosity-val">~Low energy</span>
              </div>
              <div className="verbosity-bar-group">
                <span className="verbosity-label">Standard chat model, full answer</span>
                <div className="verbosity-track">
                  <div className="verbosity-bar" style={{ width: '45%', background: 'var(--sage-light)' }} />
                </div>
                <span className="verbosity-val">~Moderate energy</span>
              </div>
              <div className="verbosity-bar-group">
                <span className="verbosity-label">Reasoning model (chain-of-thought)</span>
                <div className="verbosity-track">
                  <div className="verbosity-bar" style={{ width: '95%', background: '#C0392B' }} />
                </div>
                <span className="verbosity-val">~10× more energy</span>
              </div>
              <p className="verbosity-note">Relative energy demand per user query by model type</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* GPU section */}
      <section className="section">
        <div className="container">
          <span className="section-label">04 · Hardware Differences</span>
          <div className="accent-rule" />
          <h2>The GPU Bottleneck & Efficiency Paradox</h2>
          <div className="two-col">
            <div>
              <p>
                Newer GPU architectures like the NVIDIA H100 are considerably more energy-efficient
                per floating-point operation than older accelerators like the A100. But this
                efficiency gain does not automatically reduce total energy use.
              </p>
              <p style={{ marginTop: '1rem' }}>
                More capable hardware enables the deployment of more complex, parameter-rich models —
                including reasoning architectures. The total energy cost per request frequently
                <em> increases</em> even as the underlying silicon becomes more efficient.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This is the <strong>Jevons paradox</strong> applied to AI: efficiency gains enable
                greater consumption, not less. Measuring AI sustainability requires examining
                full system-level costs, not just hardware specifications [ML.ENERGY].
              </p>
            </div>
            <div>
              <div className="gpu-comparison">
                {[
                  { name: 'A100 GPU', gen: 'Older generation', efficiency: 'Lower ops/watt', impact: 'Used for standard chat models' },
                  { name: 'H100 GPU', gen: 'Current generation', efficiency: 'Higher ops/watt', impact: 'Enables complex reasoning models → higher per-request cost' },
                ].map((g, i) => (
                  <div key={i} className={`card gpu-card ${i === 1 ? 'gpu-card--new' : ''}`}>
                    <div className="gpu-card-header">
                      <span className="mono-tag">{g.gen}</span>
                      <h4>{g.name}</h4>
                    </div>
                    <p style={{ fontSize: '0.88rem', maxWidth: '100%' }}>{g.efficiency}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem', maxWidth: '100%' }}>{g.impact}</p>
                  </div>
                ))}
                <div className="jevons-note">
                  <span className="mono-tag">Jevons Paradox</span>
                  <p>Efficiency improvements lead to expanded use, often increasing total consumption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search comparison */}
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
              <p>depending on model size and response length — small models narrow the gap; frontier models widen it</p>
            </div>
          </div>
          <p className="cite-note" style={{ marginTop: '1.5rem' }}>
            Source: [MIT Technology Review]. See the Interactive page to compare specific models.
          </p>
        </div>
      </section>
    </main>
  )
}