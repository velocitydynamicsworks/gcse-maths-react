import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const features = [
    { icon: '💬', label: 'AI Tutor', desc: 'Step-by-step answers instantly' },
    { icon: '⏱️', label: 'Exam Mode', desc: 'Timed practice questions' },
    { icon: '📊', label: 'Dashboard', desc: 'Track your progress' },
    { icon: '📚', label: 'History', desc: 'Review past questions' },
  ]

  const topics = ['Percentages', 'Algebra', 'Fractions', 'Ratio', 'Geometry', 'Statistics']

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 30%, #0f1923 60%, #0a0f1e 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: '#e2e8f0',
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* Ambient glow orbs */}
      <div style={{
        position: 'fixed', top: '-200px', left: '-200px',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-200px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', top: '40%', right: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero Section */}
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '80px 24px 60px',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '100px', padding: '6px 16px',
            fontSize: '13px', color: '#a5b4fc',
            marginBottom: '32px', backdropFilter: 'blur(10px)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#6ee7b7',
              boxShadow: '0 0 8px #6ee7b7',
              display: 'inline-block',
            }} />
            Functional Skills Level 2 · UK Standard
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: '800',
            lineHeight: '1.05',
            marginBottom: '24px',
            letterSpacing: '-0.03em',
          }}>
            <span style={{ color: '#f1f5f9' }}>Your Personal</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>GCSE Maths AI</span>
            <br />
            <span style={{ color: '#f1f5f9' }}>Tutor</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#94a3b8', maxWidth: '560px', margin: '0 auto 40px',
            lineHeight: '1.7',
          }}>
            Get instant step-by-step answers, track your progress,
            and practise with timed exams. Built for UK students.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: '16px', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: '64px',
          }}>
            <Link to='/login' style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white', padding: '16px 32px', borderRadius: '14px',
              fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 0 40px rgba(99,102,241,0.6)'
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 0 30px rgba(99,102,241,0.4)'
              }}>
              Get Started Free →
            </Link>
            <Link to='/tutor' style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0', padding: '16px 32px', borderRadius: '14px',
              fontWeight: '600', fontSize: '1.05rem', textDecoration: 'none',
              backdropFilter: 'blur(10px)', transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(255,255,255,0.1)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255,255,255,0.05)'
                e.target.style.transform = 'translateY(0)'
              }}>
              Try the Tutor
            </Link>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px', marginBottom: '64px',
          }}>
            {features.map((f, i) => (
              <div key={f.label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '24px 16px',
                backdropFilter: 'blur(10px)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1 + 0.3}s`,
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{f.icon}</div>
                <div style={{ fontWeight: '700', color: '#f1f5f9', marginBottom: '4px' }}>{f.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Topics Strip */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', padding: '24px',
          }}>
            <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Topics Covered
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {topics.map(t => (
                <span key={t} style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: '#a5b4fc', borderRadius: '100px',
                  padding: '6px 16px', fontSize: '0.85rem', fontWeight: '500',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}