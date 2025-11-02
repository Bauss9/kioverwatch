import { useState } from 'react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import './Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800))

    if (username === 'admin' && password === 'admin') {
      onLogin()
    } else {
      setError('Fehler: Benutzername oder Passwort falsch!')
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="logo-circle">
            <Eye size={32} className="logo-eye" />
          </div>
          <h1 className="login-title">Willkommen zurück</h1>
          <p className="login-subtitle">Melden Sie sich bei Overwatch an</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="username">Benutzername</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Benutzername eingeben"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">Passwort</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Wird angemeldet...</span>
              </div>
            ) : (
              'Anmelden'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Overwatch © 2025</p>
        </div>
      </div>
    </div>
  )
}

export default Login
