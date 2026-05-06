import { useState } from 'react'
import { Link } from 'react-router-dom'
import { funFacts } from '../data/content'
import './Quiz.css'

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
        <div className="result-score-block">
          <span className="result-big-num">{score}<span className="result-denom">/{funFacts.length}</span></span>
          <p className="result-pct">{pct}% correct</p>
        </div>
        <div className="result-message">
          {pct === 100 && <p>Perfect. You have a strong grasp of AI's energy impact.</p>}
          {pct >= 60 && pct < 100 && <p>Good work. Review the sections on topics you missed to go deeper.</p>}
          {pct < 60 && <p>These are genuinely non-obvious concepts; explore the Learn and Measure pages to build more familiarity.</p>}
        </div>
        <div className="result-breakdown">
          {funFacts.map((f, i) => (
            <div key={i} className={`result-item ${answered[i]?.correct ? 'result-item--correct' : 'result-item--wrong'}`}>
              <span className="result-item-mark">{answered[i]?.correct ? '✓' : '✗'}</span>
              <span>{f.question}</span>
            </div>
          ))}
        </div>
        <div className="result-actions">
          <button className="btn-sage" onClick={restart}>Retake Quiz</button>
          <Link to="/best-practices" className="btn-ghost">Go to Measure →</Link>
        </div>
      </div>
    )
  }

  const isCorrect = selected === q.answer
  const isWrong = selected !== null && !isCorrect

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
            else if (i === selected && !isCorrect) cls += ' quiz-option--wrong'
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
              <span className={i === q.answer && selected !== null ? 'option-text--correct' : ''}>{opt}</span>
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
          <span className="feedback-mark">{isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
          <p className="feedback-highlight">{q.highlight}</p>
          <p className="feedback-body">{q.explanation}</p>
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

export default function QuizPage() {
  return (
    <main className="page-enter quiz-page">
      <section className="page-hero quiz-hero">
        <div className="container">
          <span className="section-label">Quiz</span>
          <div className="accent-rule" />
          <h1>Test Your<br /><em>Knowledge</em></h1>
          <p className="page-hero-sub">
            Ten questions on AI energy, digital pollution, and sustainable habits,
            written for everyone, not just developers. No technical background needed.
          </p>
        </div>
      </section>

      <section className="section quiz-main-section">
        <div className="container quiz-layout">
          <Quiz />
        </div>
      </section>
    </main>
  )
}
