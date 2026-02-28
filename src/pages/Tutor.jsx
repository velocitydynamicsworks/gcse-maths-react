import { useState } from 'react'
import { supabase } from '../supabase'

const TOPICS = ['Percentages', 'Fractions', 'Algebra', 'Ratio', 'Area & Perimeter', 'Statistics', 'Decimals', 'Volume']

const darkCard = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
}

export default function Tutor() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const askQuestion = async () => {
    if (!question.trim()) return
    setLoading(true); setAnswer(''); setSaved(false)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })
      const data = await res.json()
      const ans = data.answer || data.error
      setAnswer(ans)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const topic = TOPICS.find(t => question.toLowerCase().includes(t.toLowerCase())) || 'General'
        await supabase.from('question_history').insert({ user_id: user.id, question, answer: ans, topic })
        setSaved(true)
      }
    } catch { setAnswer('Could not connect to server. Is Flask running?') }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0f1923 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: '#e2e8f0', padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed', top: '-100px', right: '-100px', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: '800',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em', marginBottom: '6px',
          }}>🧠 AI Maths Tutor</h1>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Functional Skills Level 2 · UK Standard</p>
        </div>

        {/* Topic buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => setQuestion(`Give me a practice question about ${t} at GCSE Level 2, then solve it step by step.`)}
              style={{
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                color: '#a5b4fc', borderRadius: '100px', padding: '8px 16px',
                fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.25)' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(99,102,241,0.1)' }}
            >{t}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ ...darkCard, padding: '20px', marginBottom: '16px' }}>
          <textarea
            value={question} onChange={e => setQuestion(e.target.value)}
            placeholder="Type your maths question here...&#10;&#10;e.g. 'What is 35% of 240?' or 'Solve: 3x + 7 = 22'"
            style={{
              width: '100%', minHeight: '110px', padding: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', color: '#e2e8f0',
              fontSize: '16px', resize: 'vertical', outline: 'none',
              fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
              lineHeight: '1.6', boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askQuestion() } }}
          />
          <button onClick={askQuestion} disabled={loading} style={{
            width: '100%', marginTop: '12px', padding: '15px',
            background: loading ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none', borderRadius: '12px', color: 'white',
            fontWeight: '700', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 0 25px rgba(99,102,241,0.35)',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            transition: 'all 0.3s',
          }}>
            {loading ? 'AI is thinking...' : 'Ask AI ✨'}
          </button>
        </div>

        {/* Answer */}
        {answer && (
          <div style={{ ...darkCard, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{
                fontWeight: '700', fontSize: '1rem',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>📚 Answer</h3>
              {saved && (
                <span style={{
                  background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                  color: '#6ee7b7', borderRadius: '100px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: '600',
                }}>✅ Saved</span>
              )}
            </div>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.9', color: '#cbd5e1', fontSize: '0.95rem' }}>{answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}