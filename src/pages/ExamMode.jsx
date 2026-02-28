import { useState, useEffect, useRef } from 'react'

const TOPICS = ['Percentages', 'Fractions', 'Algebra', 'Ratio', 'Area', 'Statistics']
const TIME_LIMIT = 300

export default function ExamMode() {
  const [phase, setPhase] = useState('setup')
  const [topic, setTopic] = useState('Percentages')
  const [question, setQuestion] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [solution, setSolution] = useState('')
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (phase === 'answering') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setPhase('reveal'); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  const startExam = async () => {
    setLoading(true); setTimeLeft(TIME_LIMIT); setUserAnswer(''); setSolution('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ask`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: `Give me ONE GCSE Level 2 exam question about ${topic}. Only give me the question, no solution.` })
      })
      const data = await res.json()
      setQuestion(data.answer); setPhase('answering')
    } catch { setQuestion('Could not load question.') }
    setLoading(false)
  }

  const submitAnswer = async () => {
    clearInterval(timerRef.current); setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/ask`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: `The exam question was: ${question}. The student answered: ${userAnswer || 'No answer given'}. Now give the full step-by-step solution and tell them if they were correct.`
      })
    })
    const data = await res.json()
    setSolution(data.answer); setPhase('reveal'); setLoading(false)
  }

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')
  const progress = (timeLeft / TIME_LIMIT) * 100
  const timerColor = timeLeft < 60 ? '#ef4444' : timeLeft < 120 ? '#f59e0b' : '#6ee7b7'

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
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <h1 style={{
          fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: '800',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em', marginBottom: '24px',
        }}>⏱️ Exam Mode</h1>

        {/* SETUP */}
        {phase === 'setup' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px', padding: '32px',
          }}>
            <p style={{ color: '#64748b', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Choose a Topic
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {TOPICS.map(t => (
                <button key={t} onClick={() => setTopic(t)} style={{
                  padding: '10px 20px', borderRadius: '100px', fontWeight: '600',
                  fontSize: '0.88rem', cursor: 'pointer',
                  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                  background: topic === t ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(255,255,255,0.05)',
                  border: topic === t ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: topic === t ? 'white' : '#94a3b8',
                  boxShadow: topic === t ? '0 0 20px rgba(139,92,246,0.4)' : 'none',
                  transition: 'all 0.2s',
                }}>{t}</button>
              ))}
            </div>
            <div style={{
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '14px', padding: '16px', marginBottom: '24px',
              color: '#a78bfa', fontSize: '0.875rem', lineHeight: '1.6',
            }}>
              ⏱️ You will have <strong>5 minutes</strong> to answer one exam-style question.
              Write your full working out for maximum marks.
            </div>
            <button onClick={startExam} disabled={loading} style={{
              width: '100%', padding: '16px',
              background: loading ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              border: 'none', borderRadius: '14px', color: 'white',
              fontWeight: '700', fontSize: '1.05rem', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 0 30px rgba(139,92,246,0.4)',
              fontFamily: "'DM Sans', 'Segoe UI', sans-serif", transition: 'all 0.3s',
            }}>
              {loading ? 'Loading your question...' : 'Start Exam →'}
            </button>
          </div>
        )}

        {/* ANSWERING */}
        {phase === 'answering' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px', padding: '28px',
          }}>
            {/* Timer */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.04em',
                color: timerColor,
                textShadow: `0 0 20px ${timerColor}`,
                transition: 'color 0.5s, text-shadow 0.5s',
              }}>
                {mins}:{secs}
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: '100px',
                height: '4px', marginTop: '10px', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: '100px',
                  background: `linear-gradient(90deg, ${timerColor}, ${timerColor}80)`,
                  width: `${progress}%`, transition: 'width 1s linear, background 0.5s',
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '16px', padding: '20px', marginBottom: '20px',
            }}>
              <p style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Your Question
              </p>
              <p style={{ color: '#e2e8f0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{question}</p>
            </div>

            <textarea
              value={userAnswer} onChange={e => setUserAnswer(e.target.value)}
              placeholder='Write your answer and working out here...'
              style={{
                width: '100%', minHeight: '130px', padding: '14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: '#e2e8f0',
                fontSize: '16px', resize: 'vertical', outline: 'none',
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                lineHeight: '1.6', boxSizing: 'border-box', marginBottom: '16px',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />

            <button onClick={submitAnswer} disabled={loading} style={{
              width: '100%', padding: '16px',
              background: loading ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              border: 'none', borderRadius: '14px', color: 'white',
              fontWeight: '700', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
              boxShadow: loading ? 'none' : '0 0 25px rgba(139,92,246,0.35)',
            }}>
              {loading ? 'Marking...' : 'Submit Answer'}
            </button>
          </div>
        )}

        {/* REVEAL */}
        {phase === 'reveal' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px', padding: '28px',
          }}>
            <h2 style={{
              fontWeight: '800', fontSize: '1.1rem', marginBottom: '20px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>📝 Full Solution</h2>

            {userAnswer && (
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '16px', marginBottom: '20px',
              }}>
                <p style={{ color: '#475569', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Answer
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>{userAnswer}</p>
              </div>
            )}

            <p style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1', lineHeight: '1.9', fontSize: '0.95rem', marginBottom: '24px' }}>
              {solution || 'Time ran out! Here is the solution anyway.'}
            </p>

            <button onClick={() => setPhase('setup')} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              border: 'none', borderRadius: '14px', color: 'white',
              fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
              fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
              boxShadow: '0 0 25px rgba(139,92,246,0.35)',
            }}>
              Try Another Question →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}