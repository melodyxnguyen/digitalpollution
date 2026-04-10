import { useState } from 'react'
import { funFacts } from '../data/content'
import './FunFacts.css'

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
          {pct === 100 && <p>Perfect score! You have a strong grasp of AI energy fundamentals.</p>}
          {pct >= 60 && pct < 100 && <p>Good work. Review the sections on the topics you missed to deepen your understanding.</p>}
          {pct < 60 && <p>These are genuinely non-obvious facts — consider exploring the LLMs and Interactive pages to build more familiarity.</p>}
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
          <div
            className="quiz-progress-fill"
            style={{ width: `${((current) / funFacts.length) * 100}%` }}
          />
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
            <button
              key={i}
              className={cls}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
            >
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

export default function FunFacts() {
  return (
    <main className="page-enter fun-facts-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 05</span>
          <div className="accent-rule" />
          <h1>Fun Facts & Quiz</h1>
          <p className="page-hero-sub">
            Test your knowledge of AI energy use, digital pollution, and sustainable computing —
            based on real research findings and empirical benchmarks.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="section">
        <div className="container quiz-layout">
          <Quiz />
        </div>
      </section>

      {/* Research highlights */}
      <section className="section highlights-section">
        <div className="container">
          <span className="section-label">Research Highlights</span>
          <div className="accent-rule" />
          <h2>Key Findings from the Literature</h2>
          <div className="highlights-grid">
            {[
              { stat: '70%', text: 'of new AI-related articles present neutral or positive narratives — environmental impact is rarely the focus', cite: '[AI Index Report]' },
              { stat: '<50%', text: 'of survey respondents correctly identify data centers as major contributors to AI\'s environmental footprint', cite: '[Searchlight Institute]' },
              { stat: '800%', text: 'increase in attendance at major AI conferences like NeurIPS over the past decade', cite: '[AI Index Report]' },
              { stat: '4 hrs', text: 'the average person spends on their phone each day — digital pollution grows with every minute online', cite: '[Greenly]' },
            ].map((h, i) => (
              <div key={i} className="card highlight-card">
                <span className="stat-callout">{h.stat}</span>
                <p style={{ maxWidth: '100%', fontSize: '0.9rem', marginTop: '0.5rem' }}>{h.text}</p>
                <span className="mono-tag" style={{ marginTop: '0.75rem', display: 'inline-block' }}>{h.cite}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author story */}
      <section className="section author-section">
        <div className="container">
          <span className="section-label">About This Research</span>
          <div className="accent-rule" />
          <div className="author-layout">
            <div className="author-text">
              <h2>The Author's Story</h2>
              <p>
                I grew up in Arizona and California during the 2010s and experienced firsthand
                the impact of drought and wildfire. Daily conservation practices — reusing water,
                minimizing waste — were part of my upbringing.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Being raised by a Buddhist family taught me the importance of interconnectedness:
                the belief that all humans, animals, and nature are profoundly linked, and damaging
                one part harms the whole. These childhood teachings are my primary motivation for
                understanding how technological progress can align with ethical and environmental responsibility.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Through internships at SLAC National Accelerator Laboratory and research at the
                Stanford Synchrotron Radiation Lightsource, I came to see how thoughtful system
                design can improve scientific throughput while conserving limited resources —
                decisions about when to compute, and how much, carry real environmental implications.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This thesis reflects a search for a middle ground: one that preserves AI's capacity
                to accelerate discovery while emphasizing transparent, efficient, and sustainable use.
              </p>
              <div className="author-meta">
                <div className="author-meta-item">
                  <span className="mono-tag">Researcher</span>
                  <p>Melody Nguyen, Pace University</p>
                </div>
                <div className="author-meta-item">
                  <span className="mono-tag">Faculty Advisor</span>
                  <p>Arya Boudaie, Software Engineer at Amazon</p>
                </div>
                <div className="author-meta-item">
                  <span className="mono-tag">Funding</span>
                  <p>Pforzheimer Honors College at Pace University</p>
                </div>
                <div className="author-meta-item">
                  <span className="mono-tag">Status</span>
                  <p>IRB submitted, awaiting approval</p>
                </div>
              </div>
            </div>
            <div className="author-timeline">
              <h3>Research Journey</h3>
              {[
                { year: '2023', event: 'GISMo Group, SLAC National Accelerator Laboratory', detail: 'Renewable energy web platforms, grid integration research' },
                { year: '2024', event: 'REGROW Project, SLAC', detail: 'California heatwave analysis, photovoltaic grid resilience, marimo visualizations' },
                { year: '2025', event: 'SULI, Stanford Synchrotron Radiation Lightsource', detail: 'Beamline automation, TiO₂ phase transformation, computational efficiency' },
                { year: '2025', event: 'Honors Thesis, Pace University', detail: 'Digital pollution, LLM energy benchmarking, educational website' },
              ].map((t, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="mono-tag">{t.year}</span>
                    <p className="timeline-event">{t.event}</p>
                    <p className="timeline-detail">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
