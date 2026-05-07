import { useState, useEffect, useRef } from 'react'
import { senatorsByState, stateNames, generateEmailDraft } from '../data/senators'
import catGif from '../../images/typing.gif'
import './Act.css'


// ─── Action Cards Data ────────────────────────────────────────────────────────

const actions = [
  {
    num: '01',
    title: 'Write concise prompts',
    detail: 'Shorter, well-scoped prompts generate shorter responses, reducing the number of tokens produced and the energy consumed per interaction.',
    cite: '[MIT Technology Review, Shao et al.]',
    photo: catGif,
    examples: [
      {
        context: 'Homework',
        before: 'Can you explain everything about the French Revolution, including all the causes, major events, key figures, and how it changed democracy forever?',
        boldWords: ['everything'],
        after:  'What were the 3 main causes of the French Revolution?',
      },
      {
        context: 'Home cooking',
        before: 'Tell me everything I could possibly make with chicken, rice, and broccoli including prep methods, cuisines, and nutrition info.',
        boldWords: ['everything'],
        after:  'Quick dinner idea using chicken, rice, and broccoli?',
      },
      {
        context: 'Trip planning',
        before: 'Give me a complete travel guide to Tokyo with history, neighborhoods, food, transport, culture, packing tips, and what to avoid.',
        boldWords: ['complete'],
        after:  'Top 3 things to do in Tokyo for a first-time visitor?',
      },
    ],
  },
  {
    num: '02',
    title: 'Batch related questions',
    detail: 'Instead of sending five separate queries, combine them into one. Each model call has a fixed overhead cost; batching reduces that overhead.',
    cite: '[Shao et al.]',
    examples: [
      {
        context: 'New gardener',
        before: ['When do I plant tomatoes?', 'How much water does it need?', 'Any pests to watch for?'],
        after:  'When to plant tomatoes, how much water, and common pests — all in one message.',
      },
      {
        context: 'Music producer',
        before: ['What is EQ?', 'What is compression?', 'How do I use them together?'],
        after:  'Quick explanation of EQ vs compression and how to use both in a mix.',
      },
      {
        context: 'Job hunter',
        before: ['How do I write a cover letter?', 'What should I include?', 'How long should it be?'],
        after:  'How do I write a cover letter — what to include and how long it should be?',
      },
    ],
  },
  {
    num: '03',
    title: 'Choose the right model',
    detail: 'A small model like Mistral 7B uses ~0.052 J/token. A reasoning model like DeepSeek R1 uses ~2.37 J/token. For simple tasks, smaller is smarter.',
    cite: '[ML.ENERGY]',
    examples: [
      {
        context: 'Casual use',
        before: 'Using the most powerful AI model to brainstorm a birthday gift for your mom.',
        after:  'Any basic chat model handles "gift ideas for a mom who likes gardening" just fine.',
      },
      {
        context: 'Songwriting',
        before: 'Running a full reasoning model to suggest a rhyme for "blue" in a verse.',
        after:  'A lightweight model is more than enough for rhyme suggestions or lyric tweaks.',
      },
      {
        context: 'Health question',
        before: 'Asking the heaviest reasoning model what ibuprofen does.',
        after:  'A small model answers common health FAQs reliably without the extra compute.',
      },
    ],
  },
  {
    num: '04',
    title: 'Audit your cloud storage',
    detail: 'Unneeded cloud backups, duplicate files, and unused subscriptions place constant load on data infrastructure. Review and trim regularly.',
    cite: '[Greenly]',
    examples: [
      {
        context: 'DIY renovator',
        before: '3 years of contractor quotes, design mood boards, and progress photos — all still backed up to the cloud.',
        after:  'Keep the final plans and best photos; delete everything else once the project is done.',
      },
      {
        context: 'Music producer',
        before: 'Gigabytes of scratch recordings, test renders, and failed beats spread across three cloud drives.',
        after:  'Keep finals and stems; delete scratch files. Your hard drive will thank you too.',
      },
      {
        context: 'Student',
        before: 'Three years of old class notes, duplicate PDFs, and half-finished assignments backed up forever.',
        after:  'A 15-minute end-of-semester cleanup; delete drafts and keep only the finals.',
      },
    ],
  },
]

const bonusTip = {
  title: 'Skip the "thanks!"',
  detail: 'Sending a follow-up message just to say thank you triggers another full model response — tokens in, tokens out, energy spent. If the answer was good, just move on.',
}

// ─── Action Card Component ────────────────────────────────────────────────────

function highlightBoldWords(text, boldWords) {
  if (!boldWords?.length) return text
  const pattern = new RegExp(`(${boldWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text.split(pattern).map((part, i) =>
    pattern.test(part) ? <strong key={i} className="before-highlight">{part}</strong> : part
  )
}

function ActionCard({ p, index, isOpen, onToggle }) {
  const [slide, setSlide] = useState(0)
  const [sliding, setSliding] = useState(false)
  const total = p.examples.length
  const photoLeft = index % 2 === 0
  const autoRef = useRef(null)

  function goTo(next) {
    if (sliding) return
    setSliding(true)
    setTimeout(() => {
      setSlide(((next % total) + total) % total)
      setSliding(false)
    }, 300)
  }

  useEffect(() => {
    if (!isOpen) { clearInterval(autoRef.current); return }
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => goTo(slide + 1), 5000)
    return () => clearInterval(autoRef.current)
  }, [isOpen, slide])

  const ex = p.examples[slide]

  return (
    <div className={`action-full-card ${isOpen ? 'action-full-card--open' : ''}`}>
      <div className={`action-full-split ${!photoLeft ? 'action-full-split--reverse' : ''}`}>
        <div className="action-full-photo-frame">
          {p.photo
            ? <img src={p.photo} alt="" className="action-full-photo-img" />
            : <div className="action-full-photo" aria-hidden="true" />
          }
        </div>
        <div className="action-full-text">
          <span className="action-full-num">{p.num}</span>
          <h3 className="action-full-title">{p.title}</h3>
          <p className="action-full-detail">{p.detail}</p>
          {p.cite && <span className="mono-tag">{p.cite}</span>}
          <button className="action-full-toggle" onClick={onToggle}>
            {isOpen ? '↑ Collapse examples' : 'Real-life examples →'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="action-full-examples">
          <div className="container action-examples-inner">
            <div className={`action-example-slide ${sliding ? 'action-example-slide--sliding' : ''}`}>
              <div className="action-examples-header">
                <span className="action-example-context">{ex.context}</span>
              </div>
              <div className="action-examples-cols">
                <div className="action-example-col action-example-col--before">
                  <span className="action-example-label">Before</span>
                  {Array.isArray(ex.before)
                    ? ex.before.map((line, i) => <p key={i}>"{line}"</p>)
                    : <p>"{highlightBoldWords(ex.before, ex.boldWords)}"</p>
                  }
                </div>
                <span className="action-example-arrow">→</span>
                <div className="action-example-col action-example-col--after">
                  <span className="action-example-label">After</span>
                  <p>"{ex.after}"</p>
                </div>
              </div>
            </div>
            {total > 1 && (
              <div className="action-examples-dots">
                {p.examples.map((_, i) => (
                  <button
                    key={i}
                    className={`action-example-dot ${i === slide ? 'action-example-dot--active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Example ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Senator Email Agent ──────────────────────────────────────────────────────

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

      {step >= 1 && (
        <div className="agent-thread">
          <AgentMessage>
            <p>Your senators for {state} are listed below. Who would you like to write to?</p>
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
                <button className="btn-sage" onClick={handleGenerateEmail}>Draft my email →</button>
                <button className="btn-ghost" onClick={handleGenerateEmail}>Skip personal note</button>
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

      {step >= 4 && (
        <div className="agent-thread">
          <AgentMessage>
            <p>Here is your draft. Edit it however you like — it's yours. When you're ready, copy it or open it directly in your email client.</p>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Act() {
  const [openCard, setOpenCard] = useState(null)

  function toggleCard(i) {
    setOpenCard(prev => (prev === i ? null : i))
  }

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
            email advocating for AI transparency and data center regulation, with your
            state's senators pre-filled.
          </p>
          <EmailAgent />
        </div>
      </section>

      {/* What You Can Do Today */}
      <section className="action-cards-section">
        <div className="container action-cards-header">
          <span className="section-label">In Practice · 4 Actions</span>
          <div className="accent-rule" />
          <h2>What You Can Do Today</h2>
          <p className="action-cards-hint">
            Small choices, real differences. Click any card to see real-life examples.
          </p>
        </div>

        <div className="action-cards-list">
          {actions.map((p, i) => (
            <ActionCard
              key={i}
              p={p}
              index={i}
              isOpen={openCard === i}
              onToggle={() => toggleCard(i)}
            />
          ))}
        </div>

        <div className="container">
          <div className="bonus-tip">
            <span className="section-label">One more thing</span>
            <h4>{bonusTip.title}</h4>
            <p>{bonusTip.detail}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
