'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } }
      })
      if (error) setError(error.message)
      else setMessage('¡Cuenta creada! Revisá tu email para confirmar.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('Email o contraseña incorrectos')
      else { router.push('/'); router.refresh() }
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    border: '2px solid #0F2D1F',
    borderRadius: '12px',
    padding: '12px 16px',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    color: '#0F2D1F',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #0F2D1F',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '4px 4px 0px #0F2D1F',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: 'Fredoka One, cursive',
            fontSize: '36px',
            color: '#0F2D1F',
            marginBottom: '4px',
          }}>
            CollarDog
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#5A6A40' }}>
            {mode === 'login' ? 'Iniciá sesión en tu cuenta' : 'Creá tu cuenta'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#F5F5F5',
          borderRadius: '100px',
          padding: '4px',
          marginBottom: '28px',
          border: '2px solid #0F2D1F',
        }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1,
              padding: '10px',
              borderRadius: '100px',
              border: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: mode === m ? '#0F2D1F' : 'transparent',
              color: mode === m ? '#6EE9A0' : '#5A6A40',
            }}>
              {m === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0F2D1F', display: 'block', marginBottom: '6px' }}>
                Nombre
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" required style={inputStyle} />
            </div>
          )}
          <div>
            <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0F2D1F', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required style={inputStyle} />
          </div>
          <div>
            <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0F2D1F', display: 'block', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} style={inputStyle} />
          </div>

          {error && (
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#CC0000', backgroundColor: '#FFF0F0', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #FFCCCC' }}>
              {error}
            </p>
          )}
          {message && (
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#1A4A35', backgroundColor: '#E8FFF0', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #6EE9A0' }}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%',
            backgroundColor: loading ? '#A0C4B0' : '#0F2D1F',
            color: '#6EE9A0',
            border: '2px solid #0F2D1F',
            borderRadius: '100px',
            padding: '14px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px',
          }}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  )
}