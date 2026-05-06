import { useState, useEffect, useRef, useMemo } from 'react'
import { encode, decode } from 'gpt-tokenizer'
import { modelData } from '../data/content'
import './BestPractices.css'
import './Interactive.css'

// ── Model Comparison ──────────────────────────────────────────────────────────
function ModelComparison() {
  const [modelA, setModelA] = useState(0)
  const [modelB, setModelB] = useState(2)

  const a = modelData[modelA]
  const b = modelData[modelB]
  const max = Math.max(a.joulesPerToken, b.joulesPerToken)
  const ratio = max > 0
    ? (Math.max(a.joulesPerToken, b.joulesPerToken) / Math.min(a.joulesPerToken, b.joulesPerToken)).toFixed(1)
    : 1

  return (
    <div className="tool-section">
      <div className="container">
        <span className="section-label">Tool 01</span>
        <div className="accent-rule" />
        <h2>Model Energy Comparison</h2>
        <p className="tool-desc">
          Select two models to compare their energy cost per token of output.
          Data sourced from the ML.ENERGY Leaderboard [ML.ENERGY].
        </p>
        <div className="model-selectors">
          <div className="model-selector">
            <label>Model A</label>
            <select value={modelA} onChange={e => setModelA(Number(e.target.value))}>
              {modelData.map((m, i) => <option key={i} value={i}>{m.name}</option>)}
            </select>
          </div>
          <div className="model-selector">
            <label>Model B</label>
            <select value={modelB} onChange={e => setModelB(Number(e.target.value))}>
              {modelData.map((m, i) => <option key={i} value={i}>{m.name}</option>)}
            </select>
          </div>
        </div>
        <div className="model-bars">
          {[a, b].map((m, i) => (
            <div key={i} className="model-bar-row">
              <div className="model-bar-meta">
                <span className="model-bar-name">{m.name}</span>
                <span className="mono-tag">{m.params} · {m.type}</span>
              </div>
              <div className="model-bar-track">
                <div
                  className="model-bar-fill"
                  style={{
                    width: `${(m.joulesPerToken / max) * 100}%`,
                    background: i === 0 ? 'var(--sage)' : 'var(--ink)'
                  }}
                />
              </div>
              <span className="model-bar-val">{m.joulesPerToken} J/token</span>
            </div>
          ))}
        </div>
        {modelA !== modelB && (
          <div className="model-insight">
            <span className="model-insight-ratio">{ratio}×</span>
            <p>
              <strong>{ratio}× more energy</strong> per token for{' '}
              {a.joulesPerToken > b.joulesPerToken ? a.name : b.name} compared to{' '}
              {a.joulesPerToken > b.joulesPerToken ? b.name : a.name}.
              For 1,000 tokens, that's{' '}
              {(Math.max(a.joulesPerToken, b.joulesPerToken) * 1000).toFixed(1)} J vs{' '}
              {(Math.min(a.joulesPerToken, b.joulesPerToken) * 1000).toFixed(2)} J.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Live Energy Meter ─────────────────────────────────────────────────────────
function EnergyMeter() {
  const [prompt, setPrompt] = useState('')
  const [running, setRunning] = useState(false)
  const [tokensGenerated, setTokensGenerated] = useState(0)
  const [selectedModel, setSelectedModel] = useState(2)
  const intervalRef = useRef(null)

  const model = modelData[selectedModel]
  const estimatedOutputTokens = Math.max(20, Math.round(prompt.trim().split(/\s+/).length * 3.5))
  const totalJoules = tokensGenerated * model.joulesPerToken
  const progress = estimatedOutputTokens > 0 ? Math.min((tokensGenerated / estimatedOutputTokens) * 100, 100) : 0

  function startMeter() {
    if (running || prompt.trim() === '') return
    setTokensGenerated(0)
    setRunning(true)
    let count = 0
    intervalRef.current = setInterval(() => {
      count++
      setTokensGenerated(count)
      if (count >= estimatedOutputTokens) {
        clearInterval(intervalRef.current)
        setRunning(false)
      }
    }, 40)
  }

  function resetMeter() {
    clearInterval(intervalRef.current)
    setRunning(false)
    setTokensGenerated(0)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div className="tool-section tool-section--alt">
      <div className="container">
        <span className="section-label">Tool 02</span>
        <div className="accent-rule" />
        <h2>Live Energy Meter</h2>
        <p className="tool-desc">
          Type a prompt and watch the energy cost accumulate token by token,
          just as it would on a real GPU. Uses measured J/token values from the ML.ENERGY Leaderboard [ML.ENERGY].
        </p>
        <div className="meter-controls">
          <div className="meter-model-select">
            <label>Model</label>
            <select value={selectedModel} onChange={e => { setSelectedModel(Number(e.target.value)); resetMeter() }}>
              {modelData.map((m, i) => <option key={i} value={i}>{m.name} — {m.joulesPerToken} J/token</option>)}
            </select>
          </div>
          <div className="meter-prompt">
            <label>Your prompt</label>
            <textarea
              rows={3}
              placeholder="Type your prompt here…"
              value={prompt}
              onChange={e => { setPrompt(e.target.value); resetMeter() }}
            />
            <p className="meter-estimate">
              Estimated output: ~{estimatedOutputTokens} tokens
            </p>
          </div>
          <div className="meter-actions">
            <button className="btn btn-primary" onClick={startMeter} disabled={running || prompt.trim() === ''}>
              {running ? 'Generating…' : 'Simulate Response'}
            </button>
            <button className="btn btn-ghost" onClick={resetMeter}>Reset</button>
          </div>
        </div>
        <div className="meter-display">
          <div className="meter-progress-track">
            <div className="meter-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="meter-stats">
            <div className="meter-stat">
              <span className="meter-stat-val">{tokensGenerated}</span>
              <span className="meter-stat-label">tokens generated</span>
            </div>
            <div className="meter-stat">
              <span className="meter-stat-val">{totalJoules.toFixed(3)}</span>
              <span className="meter-stat-label">joules consumed</span>
            </div>
            <div className="meter-stat">
              <span className="meter-stat-val">{(totalJoules / 3600).toExponential(2)}</span>
              <span className="meter-stat-label">watt-hours</span>
            </div>
          </div>
          {tokensGenerated > 0 && !running && (
            <div className="meter-complete">
              <span>✓ Complete — {model.name} used {totalJoules.toFixed(3)} J for this response.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Token Visualizer ──────────────────────────────────────────────────────────
const TOKEN_COLORS = [
  'rgba(107,143,78,0.22)',
  'rgba(196,149,90,0.22)',
  'rgba(90,124,164,0.22)',
  'rgba(176,107,90,0.22)',
  'rgba(90,143,143,0.22)',
  'rgba(122,90,143,0.22)',
]

function Tokenizer() {
  const [text, setText] = useState('The environmental cost of AI is often invisible.')
  const [selectedModel, setSelectedModel] = useState(2)
  const [showIds, setShowIds] = useState(false)

  const { tokenIds, tokenTexts } = useMemo(() => {
    if (!text) return { tokenIds: [], tokenTexts: [] }
    const ids = encode(text)
    const texts = ids.map(id => decode([id]))
    return { tokenIds: ids, tokenTexts: texts }
  }, [text])

  const model = modelData[selectedModel]
  const energyJ = tokenIds.length * model.joulesPerToken

  return (
    <div className="tool-section">
      <div className="container">
        <span className="section-label">Tool 03</span>
        <div className="accent-rule" />
        <h2>Token Visualizer</h2>
        <p className="tool-desc">
          LLMs don't read words — they read <em>tokens</em>, subword pieces produced by
          byte-pair encoding. Type anything below to see exactly how GPT-4's tokenizer
          (cl100k_base) splits your text, and what that costs in energy.
        </p>

        <div className="tokenizer-layout">
          <div className="tokenizer-input-col">
            <label className="tokenizer-label">Your text</label>
            <textarea
              className="tokenizer-textarea"
              rows={6}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste any text…"
            />
            <div className="tokenizer-stats-bar">
              <span className="tokenizer-stat">
                <span className="tokenizer-stat-val">{text.length}</span>
                <span className="tokenizer-stat-key">characters</span>
              </span>
              <span className="tokenizer-divider" />
              <span className="tokenizer-stat">
                <span className="tokenizer-stat-val">{tokenIds.length}</span>
                <span className="tokenizer-stat-key">tokens</span>
              </span>
              {text.length > 0 && (
                <>
                  <span className="tokenizer-divider" />
                  <span className="tokenizer-stat">
                    <span className="tokenizer-stat-val">
                      {(text.length / Math.max(tokenIds.length, 1)).toFixed(2)}
                    </span>
                    <span className="tokenizer-stat-key">chars / token</span>
                  </span>
                </>
              )}
            </div>

            <div className="tokenizer-energy-row">
              <div className="tokenizer-model-select">
                <label className="tokenizer-label">Model (for energy estimate)</label>
                <select
                  value={selectedModel}
                  onChange={e => setSelectedModel(Number(e.target.value))}
                >
                  {modelData.map((m, i) => (
                    <option key={i} value={i}>{m.name} — {m.joulesPerToken} J/token</option>
                  ))}
                </select>
              </div>
              {tokenIds.length > 0 && (
                <div className="tokenizer-energy-result">
                  <span className="tokenizer-energy-val">{energyJ.toFixed(3)} J</span>
                  <span className="tokenizer-energy-desc">
                    to process these {tokenIds.length} tokens on {model.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="tokenizer-vis-col">
            <div className="tokenizer-vis-header">
              <label className="tokenizer-label">Token view</label>
              <button
                className={`tokenizer-ids-toggle ${showIds ? 'active' : ''}`}
                onClick={() => setShowIds(v => !v)}
              >
                {showIds ? 'Hide IDs' : 'Show IDs'}
              </button>
            </div>
            <div className="tokenizer-vis-box">
              {tokenTexts.length === 0 ? (
                <span className="tokenizer-empty">Start typing to see tokens…</span>
              ) : (
                tokenTexts.map((txt, i) => (
                  <span
                    key={i}
                    className="token-chip"
                    style={{ background: TOKEN_COLORS[i % TOKEN_COLORS.length] }}
                    title={`Token ID: ${tokenIds[i]}`}
                  >
                    {txt.replace(/ /g, '·')}
                    {showIds && (
                      <sub className="token-id">{tokenIds[i]}</sub>
                    )}
                  </span>
                ))
              )}
            </div>
            <p className="tokenizer-note">
              Middle dots (·) represent spaces. Hover a token to see its integer ID.
              Encoding: cl100k_base (GPT-4 / GPT-3.5).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

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
                <span className="screenshot-note">screenshot placeholder</span>
              </div>
              <div className="screenshot-placeholder-area">
                Drop CodeCarbon interface screenshot here
              </div>
            </div>
            <div className="screenshot-frame">
              <div className="screenshot-frame-header">
                <span className="screenshot-tool-name">AI Energy Score Leaderboard</span>
                <span className="screenshot-note">screenshot placeholder</span>
              </div>
              <div className="screenshot-placeholder-area">
                Drop AI Energy Score Leaderboard screenshot here
              </div>
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

      <hr className="section-divider" style={{ margin: 0 }} />

      {/* Interactive Tools intro */}
      <section className="section">
        <div className="container">
          <span className="section-label">Try It Yourself</span>
          <div className="accent-rule" />
          <h2>Interactive Tools</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '58ch', marginBottom: 0 }}>
            Three hands-on tools to make AI energy costs tangible. Compare model efficiency,
            watch energy accumulate in real time, and see exactly how your text is split into tokens.
          </p>
        </div>
      </section>

      <ModelComparison />
      <EnergyMeter />
      <Tokenizer />

      <section className="section quote-section">
        <div className="container">
          <div className="block-quote">
            <div className="block-quote-mark">"</div>
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
