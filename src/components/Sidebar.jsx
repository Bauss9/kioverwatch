import { Eye, Camera, BarChart3, Settings, Activity, Brain, LogOut } from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({ activeView, setActiveView }) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenExpiry')
    window.location.reload()
  }
  const menuItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'cameras', icon: Camera, label: 'Kameras' },
    { id: 'ai-management', icon: Brain, label: 'KI-Verwaltung' },
    { id: 'settings', icon: Settings, label: 'Einstellungen' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Eye className="logo-icon" size={32} />
          <span className="logo-text">Overwatch</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">AI</div>
          <div className="user-details">
            <div className="user-name">Administrator</div>
            <div className="user-status">Online</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Abmelden">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
