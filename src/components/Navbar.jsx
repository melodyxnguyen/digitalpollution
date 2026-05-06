import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { path: '/',               label: 'Learn'   },
  { path: '/interactive',    label: 'Explore' },
  { path: '/best-practices', label: 'Measure' },
  { path: '/act',            label: 'Act'     },
  { path: '/quiz',           label: 'Quiz'    },
  { path: '/about',          label: 'About'   },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

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
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                onClick={() => setOpen(false)}
                end={path === '/'}
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
