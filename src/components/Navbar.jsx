import { useState, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const exploreChapters = [
  { path: '/digital-technologies',  chapter: 'Chapter 01', label: 'Digital Technologies' },
  { path: '/large-language-models', chapter: 'Chapter 02', label: 'Large Language Models' },
  { path: '/interactive',           chapter: 'Chapter 03', label: 'Interactive Tools'     },
  { path: '/best-practices',        chapter: 'Chapter 04', label: 'Best Practices'        },
]

const topNavItems = [
  { path: '/act',   label: 'Act'   },
  { path: '/quiz',  label: 'Quiz'  },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()
  const exploreActive = exploreChapters.some(c => c.path === location.pathname)

  function openExplore() {
    clearTimeout(closeTimer.current)
    setExploreOpen(true)
  }

  function closeExplore() {
    closeTimer.current = setTimeout(() => setExploreOpen(false), 180)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">●</span>
          Digital Pollution
        </NavLink>

        <button
          className="navbar-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger-line ${open ? 'open' : ''}`} />
          <span className={`hamburger-line ${open ? 'open' : ''}`} />
          <span className={`hamburger-line ${open ? 'open' : ''}`} />
        </button>

        <ul className={`navbar-links ${open ? 'navbar-links--open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
              onClick={() => setOpen(false)}
              end
            >
              Learn
            </NavLink>
          </li>

          <li
            className="nav-dropdown-parent"
            onMouseEnter={openExplore}
            onMouseLeave={closeExplore}
          >
            <button
              className={`nav-link nav-dropdown-trigger ${exploreActive ? 'nav-link--active' : ''}`}
              onClick={() => setExploreOpen(o => !o)}
              aria-expanded={exploreOpen}
            >
              Explore <span className="nav-chevron">▾</span>
            </button>
            <ul className={`nav-dropdown ${exploreOpen ? 'nav-dropdown--open' : ''}`}>
              {exploreChapters.map(c => (
                <li key={c.path}>
                  <NavLink
                    to={c.path}
                    className={({ isActive }) => `nav-dropdown-item ${isActive ? 'nav-dropdown-item--active' : ''}`}
                    onClick={() => { setOpen(false); setExploreOpen(false) }}
                  >
                    <span className="nav-dropdown-chapter">{c.chapter}</span>
                    <span className="nav-dropdown-label">{c.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          {topNavItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
