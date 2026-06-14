import { Link } from 'react-router-dom'
import { useTheme } from '../theme'

export default function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 text-[13px] tracking-wide text-white"
      style={{ mixBlendMode: 'difference' }}
    >
      <Link to="/" className="font-serif italic">skdv</Link>
      <div className="flex items-center gap-6 opacity-80">
        <Link to="/about" className="hover:opacity-100 transition">about</Link>
        <Link to="/galaxy" className="hover:opacity-100 transition">galaxy</Link>
        <Link to="/tree" className="hover:opacity-100 transition">tree</Link>
        <button onClick={toggle} aria-label="toggle theme" className="hover:opacity-100 transition">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </nav>
  )
}
