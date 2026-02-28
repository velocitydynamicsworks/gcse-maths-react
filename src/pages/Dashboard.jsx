import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ total: 0, topics: {} })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const { data } = await supabase
        .from('question_history').select('topic').eq('user_id', user.id)
      if (data) {
        const topics = {}
        data.forEach(r => { topics[r.topic] = (topics[r.topic] || 0) + 1 })
        setStats({ total: data.length, topics })
      }
    }
    load()
  }, [])

  const cards = [
    { icon: '💬', label: 'Ask the AI Tutor', link: '/tutor', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', glow: 'rgba(99,102,241,0.4)' },
    { icon: '⏱️', label: 'Start Exam Mode', link: '/exam', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)', glow: 'rgba(139,92,246,0.4)' },
    { icon: '📚', label: 'View My History', link: '/history', gradient: 'linear-gradient(135deg, #10b981, #059669)', glow: 'rgba(16,185,129,0.4)' },
  ]

  const topicColors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6']

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0f1923 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: '#e2e8f0', padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed', top: '-100px', left: '-100px', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.15) 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '20px', padding: '28px', marginBottom: '24px',
        }}>
          <p style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px', letterSpacing: '0.05em' }}>
            WELCOME BACK
          </p>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '800',
            color: '#f1f5f9', marginBottom: '16px', letterSpacing: '-0.02em',
          }}>
            {user?.email?.split('@')[0]} 👋
          </h1>
          <div style={{
            display: 'inline-flex', alignItems: 'baseline', gap: '8px',
            background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '12px 20px',
          }}>
            <span style={{
              fontSize: '2.5rem', fontWeight: '800',
              background: 'linear-gradient(135deg, #a5b4fc, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{stats.total}</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>questions answered</span>
          </div>
        </div>

        {/* Action Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {cards.map(c => (
            <Link key={c.label} to={c.link} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '18px', padding: '22px',
              textDecoration: 'none', color: '#f1f5f9',
              transition: 'all 0.3s ease', display: 'block',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 15px 40px ${c.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: c.gradient, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.3rem', marginBottom: '14px',
                boxShadow: `0 0 20px ${c.glow}`,
              }}>{c.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{c.label}</div>
              <div style={{ color: '#475569', fontSize: '0.8rem' }}>Tap to open →</div>
            </Link>
          ))}
        </div>

        {/* Topics Breakdown */}
        {Object.keys(stats.topics).length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '24px',
          }}>
            <h2 style={{ fontWeight: '700', color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Topics Practised
            </h2>
            {Object.entries(stats.topics).map(([topic, count], i) => (
              <div key={topic} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '500' }}>{topic}</span>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>{count} questions</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '100px',
                    background: `linear-gradient(90deg, ${topicColors[i % topicColors.length]}, ${topicColors[(i + 1) % topicColors.length]})`,
                    width: `${Math.min((count / stats.total) * 100, 100)}%`,
                    transition: 'width 1s ease',
                    boxShadow: `0 0 10px ${topicColors[i % topicColors.length]}`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}