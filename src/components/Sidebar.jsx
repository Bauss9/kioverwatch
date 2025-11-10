import {
  LayoutDashboard,
  Camera,
  Brain,
  Settings,
  LogOut,
  Eye,
  Zap,
  TestTube,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import './Sidebar.css'

const Sidebar = ({ activeView, setActiveView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cameras', label: 'Kameras', icon: Camera },
    { id: 'ai-management', label: 'KI-Verwaltung', icon: Brain },
    { id: 'ai-testing', label: 'KI-Tests', icon: TestTube },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
  ]

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenExpiry')
    window.location.reload()
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (viewId) => {
    setActiveView(viewId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      />

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <Eye size={28} />
          </div>
          <h1 className="logo-text">Overwatch</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Abmelden</span>
        </button>
      </div>
    </aside>
    </>
  )
}

export default Sidebar