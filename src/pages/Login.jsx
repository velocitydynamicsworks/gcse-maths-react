import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async () => {
    if (!email || !password) { setMessage('Please fill in both fields.'); return }
    setLoading(true); setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('✅ Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else navigate('/dashboard')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', color: '#f1f5f9',
    fontSize: '16px', outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background 0.2s',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0f1923 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>

      {/* Glow orbs */}
      <div style={{
        position: 'fixed', top: '-150px', left: '-150px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-150px', right: '-150px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px', padding: '40px 36px',
        width: '100%', maxWidth: '420px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧠</div>
          <h1 style={{
            fontSize: '1.7rem', fontWeight: '800', color: '#f1f5f9',
            marginBottom: '6px', letterSpacing: '-0.02em',
          }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>
            GCSE Maths AI Tutor
          </p>
        </div>

        {/* Inputs */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
            EMAIL ADDRESS
          </label>
          <input
            type='email' placeholder='you@example.com'
            value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(99,102,241,0.6)'
              e.target.style.background = 'rgba(99,102,241,0.08)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)'
              e.target.style.background = 'rgba(255,255,255,0.05)'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
            PASSWORD
          </label>
          <input
            type='password' placeholder='••••••••'
            value={password} onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(99,102,241,0.6)'
              e.target.style.background = 'rgba(99,102,241,0.08)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)'
              e.target.style.background = 'rgba(255,255,255,0.05)'
            }}
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleAuth} disabled={loading}
          style={{
            width: '100%', padding: '15px',
            background: loading
              ? 'rgba(99,102,241,0.3)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none', borderRadius: '12px',
            color: 'white', fontWeight: '700', fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 0 25px rgba(99,102,241,0.4)',
            transition: 'all 0.3s ease',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          }}
          onMouseEnter={e => { if (!loading) e.target.style.boxShadow = '0 0 35px rgba(99,102,241,0.6)' }}
          onMouseLeave={e => { if (!loading) e.target.style.boxShadow = '0 0 25px rgba(99,102,241,0.4)' }}
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Log In'}
        </button>

        {/* Message */}
        {message && (
          <div style={{
            marginTop: '16px', padding: '12px 16px',
            background: message.includes('✅')
              ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${message.includes('✅') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: '10px',
            color: message.includes('✅') ? '#6ee7b7' : '#fca5a5',
            fontSize: '0.875rem', textAlign: 'center',
          }}>
            {message}
          </div>
        )}

        {/* Toggle */}
        <p
          onClick={() => { setIsSignUp(!isSignUp); setMessage('') }}
          style={{
            marginTop: '20px', textAlign: 'center',
            color: '#6366f1', cursor: 'pointer',
            fontSize: '0.875rem', fontWeight: '500',
          }}>
          {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </p>

        {/* Back home */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to='/' style={{ color: '#334155', fontSize: '0.8rem', textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </div>

      </div>
    </div>
  )
}