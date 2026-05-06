import { useState } from 'react'
import { senatorsByState, stateNames, generateEmailDraft } from '../data/senators'
import './Act.css'

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
              makes the email more compelling, but this is optional.
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
              Here is your draft. Edit it however you like; it's yours.
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
            personalized letter to your U.S. senator; it takes about two minutes.
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
            email advocating for AI transparency and data center regulation, with your
            state's senators pre-filled.
          </p>
          <EmailAgent />
        </div>
      </section>

    </main>
  )
}
