import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-logo">
            <span style={{ color: 'var(--sage)' }}>●</span> Digital Pollution
          </span>
          <p className="footer-tagline">
            Understanding the energy costs of large language models.<br />
            Honors Thesis · Pace University · Pforzheimer Honors College
          </p>
        </div>
        <div className="footer-right">
          <p className="footer-cite">
            Supported by the Pforzheimer Honors College at Pace University.<br />
            Energy benchmarking data from the{' '}
            <a href="https://ml.energy/leaderboard" target="_blank" rel="noreferrer">ML.ENERGY Leaderboard</a>.
          </p>
          <p className="footer-author">Melody Nguyen · Faculty Advisor: Arya Boudaie</p>
        </div>
      </div>
      <div className="footer-bar">
        <div className="container">
          <span>IEEE citation format · References available in the full thesis.</span>
        </div>
      </div>
    </footer>
  )
}
