import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tutor', label: 'Tutor' },
    { to: '/exam', label: 'Exam' },
    { to: '/history', label: 'History' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav style={{
        background: 'rgba(10,10,15,0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '0 20px', height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link to='/' style={{
            fontWeight: '800', fontSize: '1.05rem', textDecoration: 'none',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            🧠 GCSE Maths AI
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className='desktop-nav'>
            {user && navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding: '7px 14px', borderRadius: '8px',
                textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600',
                color: isActive(l.to) ? '#a5b4fc' : '#64748b',
                background: isActive(l.to) ? 'rgba(99,102,241,0.12)' : 'transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (!isActive(l.to)) e.target.style.color = '#94a3b8' }}
                onMouseLeave={e => { if (!isActive(l.to)) e.target.style.color = '#64748b' }}
              >{l.label}</Link>
            ))}

            {user ? (
              <button onClick={handleLogout} style={{
                marginLeft: '8px', padding: '8px 18px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', color: '#94a3b8',
                fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer',
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background = 'rgba(239,68,68,0.1)'; e.target.style.color = '#fca5a5'; e.target.style.borderColor = 'rgba(239,68,68,0.3)' }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#94a3b8'; e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                Log Out
              </button>
            ) : (
              <Link to='/login' style={{
                marginLeft: '8px', padding: '8px 18px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none', borderRadius: '10px', color: 'white',
                fontSize: '0.875rem', fontWeight: '700', textDecoration: 'none',
                boxShadow: '0 0 20px rgba(99,102,241,0.3)',
              }}>
                Log In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'transparent', border: 'none',
              color: '#64748b', cursor: 'pointer', padding: '8px',
              fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            }}
            className='mobile-menu-btn'
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(10,10,15,0.98)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            {user && navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding: '12px 16px', borderRadius: '10px',
                textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem',
                color: isActive(l.to) ? '#a5b4fc' : '#64748b',
                background: isActive(l.to) ? 'rgba(99,102,241,0.12)' : 'transparent',
              }}>{l.label}</Link>
            ))}
            {user ? (
              <button onClick={handleLogout} style={{
                marginTop: '8px', padding: '12px 16px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '10px', color: '#fca5a5',
                fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', textAlign: 'left',
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
              }}>Log Out</button>
            ) : (
              <Link to='/login' style={{
                marginTop: '8px', padding: '12px 16px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '10px', color: 'white',
                fontWeight: '700', textDecoration: 'none', textAlign: 'center',
              }}>Log In</Link>
            )}
          </div>
        )}
      </nav>

      {/* CSS for responsive navbar */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}