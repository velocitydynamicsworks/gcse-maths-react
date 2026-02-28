import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function History() {
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('question_history').select('*')
        .eq('user_id', user.id).order('created_at', { ascending: false })
      if (data) setHistory(data)
    }
    load()
  }, [])

  const filtered = history.filter(h =>
    h.question.toLowerCase().includes(search.toLowerCase())
  )

  const topicColor = {
    'Percentages': '#6366f1', 'Fractions': '#8b5cf6', 'Algebra': '#ec4899',
    'Ratio': '#10b981', 'Statistics': '#f59e0b', 'Decimals': '#3b82f6',
    'Volume': '#06b6d4', 'General': '#64748b',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0f1923 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: '#e2e8f0', padding: '24px',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <h1 style={{
          fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: '800',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em', marginBottom: '8px',
        }}>📚 My History</h1>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '24px' }}>
          {history.length} questions saved
        </p>

        {/* Search */}
        <input
          placeholder='🔍  Search your questions...'
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px', color: '#f1f5f9',
            fontSize: '16px', outline: 'none', marginBottom: '20px',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            boxSizing: 'border-box', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        />

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#334155' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <p>No questions found.</p>
          </div>
        )}

        {filtered.map(item => {
          const color = topicColor[item.topic] || '#64748b'
          return (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${expanded === item.id ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '16px', marginBottom: '12px',
              transition: 'border-color 0.3s, background 0.3s',
              overflow: 'hidden',
            }}>
              <button
                style={{
                  width: '100%', textAlign: 'left', padding: '18px 20px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: '#e2e8f0', fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                }}
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <p style={{ fontWeight: '600', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5', flex: 1, margin: 0 }}>
                    {item.question}
                  </p>
                  <span style={{ color: '#475569', fontSize: '1.2rem', flexShrink: 0 }}>
                    {expanded === item.id ? '▲' : '▼'}
                  </span>
                </div>
                <span style={{
                  display: 'inline-block', marginTop: '10px',
                  background: `${color}20`, border: `1px solid ${color}40`,
                  color: color, borderRadius: '100px',
                  padding: '3px 12px', fontSize: '0.75rem', fontWeight: '600',
                }}>
                  {item.topic}
                </span>
              </button>

              {expanded === item.id && (
                <div style={{
                  padding: '0 20px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '16px',
                }}>
                  <p style={{
                    fontSize: '0.88rem', color: '#94a3b8',
                    whiteSpace: 'pre-wrap', lineHeight: '1.8',
                  }}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}