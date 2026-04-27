import { useState } from 'react'
import { funFacts } from '../data/content'
import { senatorsByState, stateNames, generateEmailDraft } from '../data/senators'
import './Act.css'

// ─── Quiz (moved from FunFacts) ──────────────────────────────────────────────

function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answered, setAnswered] = useState([])

  const q = funFacts[current]

  function handleAnswer(i) {
    if (selected !== null) return
    setSelected(i)
    const correct = i === q.answer
    if (correct) setScore(s => s + 1)
    setAnswered(a => [...a, { selected: i, correct }])
  }

  function next() {
    if (current + 1 >= funFacts.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAnswered([])
  }

  if (finished) {
    const pct = Math.round((score / funFacts.length) * 100)
    return (
      <div className="quiz-result">
        <span className="section-label">Quiz Complete</span>
        <div className="result-score">
          <span className="stat-callout">{score}/{funFacts.length}</span>
          <p>{pct}% correct</p>
        </div>
        <div className="result-message">
          {pct === 100 && <p>Perfect score. You have a strong grasp of AI energy fundamentals.</p>}
          {pct >= 60 && pct < 100 && <p>Good work. Review the sections on the topics you missed to deepen your understanding.</p>}
          {pct < 60 && <p>These are genuinely non-obvious facts — explore the Learn and Explore pages to build more familiarity.</p>}
        </div>
        <div className="result-breakdown">
          {funFacts.map((f, i) => (
            <div key={i} className={`result-item ${answered[i]?.correct ? 'result-item--correct' : 'result-item--wrong'}`}>
              <span className="result-item-mark">{answered[i]?.correct ? '✓' : '✗'}</span>
              <span>{f.question}</span>
            </div>
          ))}
        </div>
        <button className="btn-sage" onClick={restart} style={{ marginTop: '2rem' }}>Retake Quiz</button>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${(current / funFacts.length) * 100}%` }} />
        </div>
        <span className="quiz-counter">{current + 1} / {funFacts.length}</span>
      </div>

      <div className="quiz-question">
        <span className="section-label">Question {current + 1}</span>
        <h3>{q.question}</h3>
      </div>

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (selected !== null) {
            if (i === q.answer) cls += ' quiz-option--correct'
            else if (i === selected && selected !== q.answer) cls += ' quiz-option--wrong'
            else cls += ' quiz-option--dim'
          }
          return (
            <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={selected !== null}>
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className={`quiz-feedback ${selected === q.answer ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
          <span className="feedback-mark">{selected === q.answer ? '✓ Correct' : '✗ Incorrect'}</span>
          <p>{q.explanation}</p>
          <span className="cite-note">Source: {q.source}</span>
        </div>
      )}

      {selected !== null && (
        <button className="btn-sage quiz-next" onClick={next}>
          {current + 1 >= funFacts.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}

// ─── Senator Email Agent ─────────────────────────────────────────────────────

const concernOptions = [
  { id: 'energy',       label: 'Energy consumption',        desc: 'AI data centers draw enormous and growing amounts of electricity' },
  { id: 'water',        label: 'Water usage',               desc: 'Cooling systems consume millions of liters of freshwater' },
  { id: 'transparency', label: 'Lack of transparency',      desc: 'No mandatory disclosure of AI\'s environmental footprint' },
  { id: 'regulation',   label: 'Need for regulation',       desc: 'Stronger oversight of data center planning and operations' },
  { id: 'all',          label: 'All of the above',          desc: 'The full range of environmental and social costs' },
]

function AgentMessage({ children }) {
  return (
    <div className="agent-msg">
      <span className="agent-dot" aria-hidden="true" />
      <div className="agent-msg-body">{children}</div>
    </div>
  )
}

function EmailAgent() {
  const [step, setStep]                   = useState(0)
  const [state, setStateVal]              = useState('')
  const [selectedSens, setSelectedSens]   = useState([])
  const [concern, setConcern]             = useState('')
  const [personalNote, setPersonalNote]   = useState('')
  const [emailDraft, setEmailDraft]       = useState('')
  const [copied, setCopied]               = useState(false)

  const senators = state ? senatorsByState[state] : []

  function handleStateSubmit(e) {
    e.preventDefault()
    if (!state) return
    setSelectedSens([])
    setStep(1)
  }

  function toggleSenator(sen) {
    setSelectedSens(prev => {
      const exists = prev.find(s => s.name === sen.name)
      return exists ? prev.filter(s => s.name !== sen.name) : [...prev, sen]
    })
  }

  function handleSenatorConfirm() {
    if (selectedSens.length === 0) return
    setStep(2)
  }

  function handleConcernSelect(id) {
    setConcern(id)
    setStep(3)
  }

  function handleGenerateEmail() {
    const draft = generateEmailDraft(selectedSens, state, concern, personalNote)
    setEmailDraft(draft)
    setStep(4)
  }

  function handleCopy() {
    navigator.clipboard.writeText(emailDraft).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function handleMailto() {
    const subject = encodeURIComponent('Constituent Request: Action on AI Environmental Regulation')
    const body = encodeURIComponent(emailDraft)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  function restart() {
    setStep(0)
    setStateVal('')
    setSelectedSens([])
    setConcern('')
    setPersonalNote('')
    setEmailDraft('')
  }

  return (
    <div className="agent-widget">
      {/* Step 0 — state selection */}
      <div className="agent-thread">
        <AgentMessage>
          <p>What state are you writing from? I'll look up your U.S. senators.</p>
        </AgentMessage>

        {step === 0 && (
          <form className="agent-input-row" onSubmit={handleStateSubmit}>
            <select
              className="agent-select"
              value={state}
              onChange={e => setStateVal(e.target.value)}
            >
              <option value="">Select your state…</option>
              {stateNames.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn-sage" type="submit" disabled={!state}>Continue →</button>
          </form>
        )}

        {step > 0 && (
          <div className="agent-response-chip">{state}</div>
        )}
      </div>

      {/* Step 1 — senator selection */}
      {step >= 1 && (
        <div className="agent-thread">
          <AgentMessage>
            <p>
              Your senators for {state} are listed below.
              Who would you like to write to?
            </p>
          </AgentMessage>

          {step === 1 && (
            <>
              <div className="senator-cards">
                {senators.map((sen, i) => {
                  const checked = selectedSens.find(s => s.name === sen.name)
                  return (
                    <button
                      key={i}
                      className={`senator-card ${checked ? 'senator-card--selected' : ''}`}
                      onClick={() => toggleSenator(sen)}
                    >
                      <span className="senator-name">{sen.name}</span>
                      <span className={`senator-party senator-party--${sen.party.toLowerCase()}`}>{sen.party}</span>
                    </button>
                  )
                })}
              </div>
              <div className="agent-action-row">
                <button className="btn-sage" onClick={handleSenatorConfirm} disabled={selectedSens.length === 0}>
                  Write to {selectedSens.length === 2 ? 'both' : selectedSens.length === 1 ? selectedSens[0].name.split(' ')[0] : 'selected senator'} →
                </button>
              </div>
            </>
          )}

          {step > 1 && (
            <div className="agent-response-chip">
              {selectedSens.map(s => s.name).join(' & ')}
            </div>
          )}
        </div>
      )}

      {/* Step 2 — concern selection */}
      {step >= 2 && (
        <div className="agent-thread">
          <AgentMessage>
            <p>What aspect of AI's environmental impact concerns you most?</p>
          </AgentMessage>

          {step === 2 && (
            <div className="concern-list">
              {concernOptions.map(opt => (
                <button key={opt.id} className="concern-option" onClick={() => handleConcernSelect(opt.id)}>
                  <span className="concern-label">{opt.label}</span>
                  <span className="concern-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step > 2 && (
            <div className="agent-response-chip">
              {concernOptions.find(c => c.id === concern)?.label}
            </div>
          )}
        </div>
      )}

      {/* Step 3 — personal note */}
      {step >= 3 && (
        <div className="agent-thread">
          <AgentMessage>
            <p>
              Would you like to add a personal note? Something specific to your experience
              makes the email more compelling — but this is optional.
            </p>
          </AgentMessage>

          {step === 3 && (
            <>
              <textarea
                className="agent-textarea"
                rows={4}
                placeholder="e.g. I live near a data center that's expanding, or I work in tech and want to see better standards…"
                value={personalNote}
                onChange={e => setPersonalNote(e.target.value)}
              />
              <div className="agent-action-row">
                <button className="btn-sage" onClick={handleGenerateEmail}>
                  Draft my email →
                </button>
                <button className="btn-ghost" onClick={handleGenerateEmail}>
                  Skip personal note
                </button>
              </div>
            </>
          )}

          {step > 3 && personalNote && (
            <div className="agent-response-chip agent-response-chip--note">"{personalNote}"</div>
          )}
          {step > 3 && !personalNote && (
            <div className="agent-response-chip">Skipped</div>
          )}
        </div>
      )}

      {/* Step 4 — generated email */}
      {step >= 4 && (
        <div className="agent-thread">
          <AgentMessage>
            <p>
              Here is your draft. Edit it however you like — it's yours.
              When you're ready, copy it or open it directly in your email client.
            </p>
          </AgentMessage>

          <textarea
            className="email-draft-area"
            rows={20}
            value={emailDraft}
            onChange={e => setEmailDraft(e.target.value)}
          />

          <div className="email-actions">
            <button className="btn-sage" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <button className="btn-sage" onClick={handleMailto}>
              Open in email app →
            </button>
            {selectedSens.map((sen, i) => (
              <a
                key={i}
                className="btn-ghost"
                href={`${sen.site}/contact`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sen.name.split(' ').slice(-1)[0]}'s contact page ↗
              </a>
            ))}
          </div>

          <p className="agent-restart-note">
            <button className="agent-restart-btn" onClick={restart}>Start over</button>
          </p>
        </div>
      )}

      <p className="agent-data-note">
        Senator data reflects the 119th Congress (January 2025).
        Verify current senators at{' '}
        <a href="https://www.senate.gov/senators/" target="_blank" rel="noopener noreferrer">
          senate.gov/senators
        </a>.
      </p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Act() {
  return (
    <main className="page-enter act-page">
      <section className="page-hero act-hero">
        <div className="container">
          <span className="section-label">Act</span>
          <div className="accent-rule" />
          <h1>Turn knowledge<br /><em>into action</em></h1>
          <p className="page-hero-sub">
            Learning about digital pollution is step one. Step two is making your voice
            heard by the people who write the rules. Use the tool below to draft a
            personalized letter to your U.S. senator — it takes about two minutes.
          </p>
        </div>
      </section>

      {/* Email agent */}
      <section className="section act-agent-section">
        <div className="container act-agent-container">
          <span className="section-label">Write to Your Senator</span>
          <div className="accent-rule" />
          <h2>Draft a Letter to Congress</h2>
          <p className="act-intro">
            Answer a few questions and this tool will write a professional, personalized
            email advocating for AI transparency and data center regulation — with your
            state's senators pre-filled.
          </p>
          <EmailAgent />
        </div>
      </section>

      {/* Quiz */}
      <section className="section act-quiz-section">
        <div className="container quiz-layout">
          <span className="section-label">Test Your Knowledge</span>
          <div className="accent-rule" />
          <h2>How Much Do You Know?</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Six questions on AI energy, digital pollution, and sustainable computing —
            based on real research findings and empirical benchmarks.
          </p>
          <Quiz />
        </div>
      </section>
    </main>
  )
}
