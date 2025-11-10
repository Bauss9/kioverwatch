import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Cameras from './components/Cameras'
import AIManagement from './components/AIManagement'
import AITesting from './components/AITesting'
import Settings from './components/Settings'
import Login from './components/Login'
import SetupWizard from './components/SetupWizard'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSetupWizard, setShowSetupWizard] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken')
    const tokenExpiry = localStorage.getItem('tokenExpiry')

    if (token && tokenExpiry) {
      const now = new Date().getTime()
      if (now < parseInt(tokenExpiry)) {
        setIsAuthenticated(true)

        // Check if setup is completed
        const setupCompleted = localStorage.getItem('setupCompleted')
        if (!setupCompleted) {
          setShowSetupWizard(true)
        }
      } else {
        // Token expired
        localStorage.removeItem('authToken')
        localStorage.removeItem('tokenExpiry')
      }
    }

    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    // Create fake token and set expiry to 1 day from now
    const token = 'fake-jwt-token-' + Math.random().toString(36).substr(2, 9)
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000) // 1 day

    localStorage.setItem('authToken', token)
    localStorage.setItem('tokenExpiry', expiry.toString())

    setIsAuthenticated(true)

    // Check if it's first time login
    const setupCompleted = localStorage.getItem('setupCompleted')
    if (!setupCompleted) {
      setShowSetupWizard(true)
    }
  }

  const handleSetupComplete = () => {
    setShowSetupWizard(false)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner-large"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      {showSetupWizard && <SetupWizard onComplete={handleSetupComplete} />}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'cameras' && <Cameras />}
        {activeView === 'ai-management' && <AIManagement />}
        {activeView === 'ai-testing' && <AITesting />}
        {activeView === 'settings' && <Settings />}
      </main>
    </div>
  )
}

export default App