import { useState, useEffect, useRef, useMemo } from 'react'
import { encode, decode } from 'gpt-tokenizer'
import { modelData, ENERGY } from '../data/content'
import './Interactive.css'

// ── 1. Model Comparison Slider ──────────────────────────────────────────────
function ModelComparison() {
  const [modelA, setModelA] = useState(0)
  const [modelB, setModelB] = useState(2)

  const a = modelData[modelA]
  const b = modelData[modelB]
  const max = Math.max(a.joulesPerToken, b.joulesPerToken)
  const ratio = max > 0 ? (Math.max(a.joulesPerToken, b.joulesPerToken) / Math.min(a.joulesPerToken, b.joulesPerToken)).toFixed(1) : 1

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

// ── 2. Email vs AI Calculator ───────────────────────────────────────────────
function EmailCalculator() {
  const [emails, setEmails] = useState(1000)
  const [modelSize, setModelSize] = useState('small')

  const emailEnergy_kWh = emails * ENERGY.emailStoredPerYear_kWh
  const aiQuery_kWh = modelSize === 'small' ? ENERGY.aiQuerySmall_kWh : ENERGY.aiQueryLarge_kWh
  const equivalentQueries = Math.round(emailEnergy_kWh / aiQuery_kWh)

  return (
    <div className="tool-section tool-section--alt">
      <div className="container">
      <span className="section-label">Tool 02</span>
      <div className="accent-rule" />
      <h2>Email vs. AI Calculator</h2>
      <p className="tool-desc">
        How does the energy cost of stored emails compare to AI queries?
        Explore the equivalence between everyday digital habits and AI use.
      </p>
      <div className="calc-controls">
        <div className="calc-control">
          <label>Stored emails: <strong>{emails.toLocaleString()}</strong></label>
          <input
            type="range"
            min={100}
            max={50000}
            step={100}
            value={emails}
            onChange={e => setEmails(Number(e.target.value))}
          />
          <div className="range-labels"><span>100</span><span>50,000</span></div>
        </div>
        <div className="calc-control">
          <label>AI model size</label>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${modelSize === 'small' ? 'active' : ''}`}
              onClick={() => setModelSize('small')}
            >Small model</button>
            <button
              className={`toggle-btn ${modelSize === 'large' ? 'active' : ''}`}
              onClick={() => setModelSize('large')}
            >Large model</button>
          </div>
        </div>
      </div>
      <div className="calc-result">
        <div className="calc-result-main">
          <span className="calc-result-num">{equivalentQueries.toLocaleString()}</span>
          <span className="calc-result-label">AI queries</span>
        </div>
        <p className="calc-result-desc">
          The annual energy cost of storing <strong>{emails.toLocaleString()} emails</strong> is
          equivalent to approximately <strong>{equivalentQueries.toLocaleString()}</strong> {modelSize} AI queries.
        </p>
        <div className="calc-breakdown">
          <div className="calc-row">
            <span>Email storage energy/yr</span>
            <span className="mono-tag">{(emailEnergy_kWh * 1000).toFixed(4)} Wh</span>
          </div>
          <div className="calc-row">
            <span>Energy per AI query ({modelSize})</span>
            <span className="mono-tag">{(aiQuery_kWh * 1000).toFixed(2)} Wh</span>
          </div>
        </div>
        <p className="cite-note" style={{ marginTop: '1rem' }}>Sources: [Shao et al., ML.ENERGY, Greenly]</p>
      </div>
      </div>
    </div>
  )
}

// ── 3. Live Energy Meter ────────────────────────────────────────────────────
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
    <div className="tool-section">
      <div className="container">
      <span className="section-label">Tool 03</span>
      <div className="accent-rule" />
      <h2>Live Energy Meter</h2>
      <p className="tool-desc">
        Type a prompt and watch the energy cost accumulate token by token —
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

// ── 4. Tokenizer ────────────────────────────────────────────────────────────
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
    <div className="tool-section tool-section--alt">
      <div className="container">
        <span className="section-label">Tool 04</span>
        <div className="accent-rule" />
        <h2>Token Visualizer</h2>
        <p className="tool-desc">
          LLMs don't read words — they read <em>tokens</em>, subword pieces produced by
          byte-pair encoding. Type anything below to see exactly how GPT-4's tokenizer
          (cl100k_base) splits your text, and what that costs in energy.
        </p>

        <div className="tokenizer-layout">
          {/* Input */}
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

            {/* Model + energy */}
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

          {/* Token visualization */}
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

// ── Page ────────────────────────────────────────────────────────────────────
export default function Interactive() {
  return (
    <main className="page-enter interactive-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 03</span>
          <div className="accent-rule" />
          <h1>Interactive Tools</h1>
          <p className="page-hero-sub">
            Four tools to make AI energy costs tangible. Explore model differences,
            compare familiar digital habits, watch energy accumulate in real time,
            and see exactly how your text is split into tokens.
          </p>
        </div>
      </section>
      <ModelComparison />
      <EmailCalculator />
      <EnergyMeter />
      <Tokenizer />
    </main>
  )
}