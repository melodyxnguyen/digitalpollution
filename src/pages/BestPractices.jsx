import { useState } from 'react'
import './BestPractices.css'

const practices = [
  {
    num: '01',
    icon: null,
    title: 'Write concise prompts',
    detail: 'Shorter, well-scoped prompts generate shorter responses, reducing the number of tokens produced and the energy consumed per interaction.',
    cite: '[MIT Technology Review, Shao et al.]',
    examples: [
      {
        context: 'Homework',
        before: 'Can you explain everything about the French Revolution, including all the causes, major events, key figures, and how it changed democracy forever?',
        after:  'What were the 3 main causes of the French Revolution?',
      },
      {
        context: 'Home cooking',
        before: 'Tell me everything I could possibly make with chicken, rice, and broccoli including prep methods, cuisines, and nutrition info.',
        after:  'Quick dinner idea using chicken, rice, and broccoli?',
      },
      {
        context: 'Trip planning',
        before: 'Give me a complete travel guide to Tokyo with history, neighborhoods, food, transport, culture, packing tips, and what to avoid.',
        after:  'Top 3 things to do in Tokyo for a first-time visitor?',
      },
    ],
  },
  {
    num: '02',
    icon: null,
    title: 'Batch related questions',
    detail: 'Instead of sending five separate queries, combine them into one. Each model call has a fixed overhead cost; batching reduces that overhead.',
    cite: '[Shao et al.]',
    examples: [
      {
        context: 'New gardener',
        before: '"When do I plant tomatoes?" ... then "How much water?" ... then "Any pests to watch for?"',
        after:  'When to plant tomatoes, how much water, and common pests, all in one message.',
      },
      {
        context: 'Music producer',
        before: '"What is EQ?" / "What is compression?" / "How do I use them together?", sent one at a time.',
        after:  'Quick explanation of EQ vs compression and how to use both in a mix.',
      },
      {
        context: 'Job hunter',
        before: 'Three separate chats: "How do I write a cover letter?" / "What should I include?" / "How long should it be?"',
        after:  'How do I write a cover letter, what to include and how long it should be?',
      },
    ],
  },
  {
    num: '03',
    icon: null,
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
    icon: null,
    title: 'Delete old emails',
    detail: 'Every stored email sits on a server consuming energy. Deleting old emails and unsubscribing from newsletters reduces persistent server load.',
    cite: '[Greenly]',
    examples: [
      {
        context: 'Online shopper',
        before: 'Every brand you have ever bought from sends weekly "deals" you scroll past without opening.',
        after:  'Hit unsubscribe on 3 of them today; takes about a minute.',
      },
      {
        context: 'Small farm',
        before: 'Newsletters from 10 seed companies, equipment dealers, and co-ops piling up unread.',
        after:  'Keep the one or two you actually read; unsubscribe from the rest.',
      },
      {
        context: 'Recent grad',
        before: '9,000 unread emails including newsletters from every school club and campus event from 4 years ago.',
        after:  'Search by sender, bulk-select, and delete; clear a year of old mail in under 10 minutes.',
      },
    ],
  },
  {
    num: '05',
    icon: null,
    title: 'Use Wi-Fi over cellular',
    detail: 'Mobile networks (4G/5G) are less energy-efficient per bit than fixed broadband. Switch to Wi-Fi for data-heavy tasks like video or AI use.',
    cite: '[Greenly]',
    examples: [
      {
        context: 'Commuter',
        before: 'Downloading 4 podcast episodes on 5G while sitting in your apartment.',
        after:  'Download over Wi-Fi before you leave the house.',
      },
      {
        context: 'Farm worker',
        before: 'Uploading drone footage to the cloud on 4G out in the field.',
        after:  'Save the upload for when you are back on the farm network.',
      },
      {
        context: 'Gamer',
        before: 'Downloading a 30 GB update using your phone as a hotspot.',
        after:  'Wait until you are on Wi-Fi; faster and less wasteful.',
      },
    ],
  },
  {
    num: '06',
    icon: null,
    title: 'Keep devices longer',
    detail: 'Manufacturing a new device embeds significant carbon before it is ever turned on. Extending device life is one of the highest-impact individual actions.',
    cite: '[Patterson et al.]',
    examples: [
      {
        context: 'Photographer',
        before: 'Trading in a camera body every year for marginal megapixel improvements.',
        after:  'Invest in lenses; a 4-year-old body still makes great photos.',
      },
      {
        context: 'Home studio',
        before: 'Buying a new audio interface every time a new model drops.',
        after:  'Your current gear makes the same sounds. Use it until it breaks.',
      },
      {
        context: 'Everyday user',
        before: 'Upgrading a phone every 2 years because the new one looks nicer.',
        after:  'Replace the battery instead; it feels like a new phone for a fraction of the cost.',
      },
    ],
  },
  {
    num: '07',
    icon: null,
    title: 'Disable autoplay',
    detail: 'Automatic video playback on YouTube and social platforms continuously loads server bandwidth, even when you are not actively watching.',
    cite: '[Greenly]',
    examples: [
      {
        context: 'Binge watcher',
        before: 'Netflix autoplays the next episode while you are already in bed with your eyes closed.',
        after:  'Enable "manage autoplay" in settings so it stops when your episode ends.',
      },
      {
        context: 'Music listener',
        before: 'Spotify\'s auto-queue runs for 2 hours after your playlist ends, playing songs you did not choose.',
        after:  'Set a sleep timer or turn off autoplay so it stops when your playlist does.',
      },
      {
        context: 'Social scroller',
        before: 'Videos auto-loading on every platform as you scroll even though you are just reading captions.',
        after:  'Disable autoplay in your platform settings; most have a toggle buried in preferences.',
      },
    ],
  },
  {
    num: '08',
    icon: null,
    title: 'Audit your cloud storage',
    detail: 'Unneeded cloud backups, duplicate files, and unused subscriptions place constant load on data infrastructure. Review and trim regularly.',
    cite: '[Greenly]',
    examples: [
      {
        context: 'DIY renovator',
        before: '3 years of contractor quotes, design mood boards, and progress photos, all still backed up to the cloud.',
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
  detail: 'Sending a follow-up message just to say thank you triggers another full model response; tokens in, tokens out, energy spent. If the answer was good, just move on.',
}

const scenarios = [
  {
    title: 'Quick question',
    bad: 'Tell me everything about climate change, its causes, effects, history, and what I can do about it.',
    good: 'What are the top 3 individual actions to reduce carbon footprint?',
    why: 'The concise prompt targets exactly what you need; fewer tokens, less energy, same value.',
  },
  {
    title: 'Choosing a model',
    bad: 'Use GPT-4 or DeepSeek R1 to summarize this 3-sentence email.',
    good: 'Use Mistral 7B or a small chat model for simple summarization tasks.',
    why: 'Reasoning models burn ~85× more energy per token than small models for tasks that don\'t need deep reasoning.',
  },
  {
    title: 'Research task',
    bad: 'Send 10 follow-up queries one at a time as you think of them.',
    good: 'Draft all your questions first, then send them together in one prompt.',
    why: 'Each query carries a fixed infrastructure cost. Batching cuts that overhead significantly.',
  },
]

function PracticeCard({ p, isOpen, onToggle }) {
  const [slide, setSlide] = useState(0)
  const total = p.examples.length
  const hasExamples = total > 0

  function prev(e) {
    e.stopPropagation()
    setSlide(s => (s - 1 + total) % total)
  }
  function next(e) {
    e.stopPropagation()
    setSlide(s => (s + 1) % total)
  }

  const ex = hasExamples ? p.examples[slide] : null
  const clickable = !p.static

  return (
    <div
      className={`card practice-card${isOpen ? ' practice-card--open' : ''}${!clickable ? ' practice-card--static' : ''}`}
      onClick={clickable ? onToggle : undefined}
      role={clickable ? 'button' : undefined}
      aria-expanded={clickable ? isOpen : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e => (e.key === 'Enter' || e.key === ' ') && onToggle()) : undefined}
    >
      <div className="practice-card-top">
        {p.icon && <span className="practice-icon">{p.icon}</span>}
        <span className="practice-num">{p.num}</span>
      </div>
      <h4>{p.title}</h4>
      <p>{p.detail}</p>
      {p.cite && <span className="practice-cite">{p.cite}</span>}

      {isOpen && hasExamples && (
        <div className="practice-expand" onClick={e => e.stopPropagation()}>
          <div className="expand-slide-header">
            <span className="expand-context-label">{ex.context}</span>
            {total > 1 && (
              <div className="expand-nav">
                <button className="expand-nav-btn" onClick={prev} aria-label="Previous example">‹</button>
                <span className="expand-nav-count">{slide + 1} / {total}</span>
                <button className="expand-nav-btn" onClick={next} aria-label="Next example">›</button>
              </div>
            )}
          </div>
          <div className="expand-cols">
            <div className="expand-col expand-col--before">
              <span className="expand-label">Before</span>
              <p>"{ex.before}"</p>
            </div>
            <span className="expand-arrow">→</span>
            <div className="expand-col expand-col--after">
              <span className="expand-label">After</span>
              <p>"{ex.after}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BestPractices() {
  const [openCard, setOpenCard] = useState(null)

  function toggle(i) {
    setOpenCard(prev => (prev === i ? null : i))
  }

  return (
    <main className="page-enter best-practices-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Chapter 04</span>
          <div className="accent-rule" />
          <h1>Best Practices</h1>
          <p className="page-hero-sub">
            Sustainable AI use is not about using less; it is about using wisely.
            These practices reduce your computational footprint without sacrificing productivity.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-label">In Practice · 8 Practices</span>
          <div className="accent-rule" />
          <h2>What You Can Do Today</h2>
          <p className="practices-hint">See how small prompt choices translate into real energy differences. Click any card to see real-life examples.</p>
          <div className="practices-grid">
            {practices.map((p, i) => (
              <PracticeCard
                key={i}
                p={p}
                isOpen={openCard === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          <div className="bonus-tip">
            <span className="section-label">One more thing</span>
            <h4>{bonusTip.title}</h4>
            <p>{bonusTip.detail}</p>
          </div>
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
