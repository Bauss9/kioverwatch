import { useState, useEffect } from 'react'
import {
  Brain,
  Camera,
  AlertTriangle,
  Activity,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  HardDrive,
  Cpu,
  Wifi
} from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const [aiStatus, setAiStatus] = useState(true)
  const [monitoringStatus, setMonitoringStatus] = useState(true)
  const [stats, setStats] = useState({
    activeCameras: 8,
    totalCameras: 12,
    detections: 247,
    threats: 3,
    uptime: '99.8%',
    avgResponseTime: '0.23s',
    storage: '67%',
    cpuUsage: '34%',
    bandwidth: '2.3 Mbps'
  })

  const [recentEvents, setRecentEvents] = useState([
    { id: 1, type: 'detection', message: 'Person am Eingang erkannt', camera: 'KAM-01', time: 'vor 2 Min', severity: 'info' },
    { id: 2, type: 'alert', message: 'Ungewöhnliche Bewegung auf Parkplatz', camera: 'KAM-05', time: 'vor 5 Min', severity: 'warning' },
    { id: 3, type: 'threat', message: 'Unbefugter Zugriffsversuch', camera: 'KAM-08', time: 'vor 12 Min', severity: 'danger' },
    { id: 4, type: 'detection', message: 'Fahrzeug am Tor erkannt', camera: 'KAM-02', time: 'vor 15 Min', severity: 'info' },
    { id: 5, type: 'detection', message: 'Bewegung im Flur erkannt', camera: 'KAM-04', time: 'vor 18 Min', severity: 'info' },
    { id: 6, type: 'detection', message: 'Person im Lagerbereich', camera: 'KAM-06', time: 'vor 22 Min', severity: 'info' },
    { id: 7, type: 'alert', message: 'Kamera-Verbindung instabil', camera: 'KAM-07', time: 'vor 28 Min', severity: 'warning' },
  ])

  const cameraPreviews = [
    { id: 1, name: 'Eingang', status: 'active', location: 'Haupttor', fps: 30, quality: 'HD' },
    { id: 2, name: 'Parkplatz', status: 'active', location: 'Zone A', fps: 30, quality: 'HD' },
    { id: 3, name: 'Flur', status: 'active', location: '1. Stock', fps: 25, quality: 'HD' },
    { id: 4, name: 'Hintereingang', status: 'active', location: 'Rückseite', fps: 30, quality: 'FHD' },
    { id: 5, name: 'Empfang', status: 'active', location: 'Lobby', fps: 30, quality: 'FHD' },
    { id: 6, name: 'Lager', status: 'active', location: 'Lagerraum', fps: 20, quality: 'HD' },
    { id: 7, name: 'Büro', status: 'offline', location: '2. Stock', fps: 0, quality: '-' },
    { id: 8, name: 'Dach', status: 'active', location: 'Obergeschoss', fps: 25, quality: 'HD' },
    { id: 9, name: 'Seiteneingang', status: 'active', location: 'Seitentür', fps: 30, quality: 'HD' },
    { id: 10, name: 'Tiefgarage', status: 'active', location: 'UG1', fps: 30, quality: 'FHD' },
    { id: 11, name: 'Cafeteria', status: 'active', location: 'Erdgeschoss', fps: 25, quality: 'HD' },
    { id: 12, name: 'Notausgang', status: 'offline', location: 'Nord', fps: 0, quality: '-' },
  ]

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'danger':
        return <XCircle size={16} />
      case 'warning':
        return <AlertTriangle size={16} />
      default:
        return <CheckCircle size={16} />
    }
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Overwatch Dashboard</h1>
          <p className="dashboard-subtitle">Echtzeit-Überwachung und Bedrohungserkennung</p>
        </div>
        <div className="header-actions">
          <div className="current-time">
            <Clock size={18} />
            <span>{new Date().toLocaleTimeString('de-DE')}</span>
          </div>
        </div>
      </div>

      {/* Hero Section - AI Status */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={20} />
            <span>Erweiterte KI-Überwachung</span>
          </div>
          <h2 className="hero-title">Echtzeit-Bedrohungserkennung Aktiv</h2>
          <p className="hero-description">
            KI-gestützte Überwachung überwacht {stats.activeCameras} Kameras auf Ihrem Gelände.
            Erweiterte Algorithmen erkennen Anomalien und potenzielle Bedrohungen in Echtzeit.
          </p>
          <div className="hero-status-cards">
            <div className="status-card">
              <div className="status-header">
                <Brain size={24} />
                <div className="status-toggle">
                  <button
                    className={`toggle-btn ${aiStatus ? 'active' : ''}`}
                    onClick={() => setAiStatus(!aiStatus)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>
              </div>
              <h3>KI-Erkennung</h3>
              <p className={`status-text ${aiStatus ? 'active' : 'inactive'}`}>
                {aiStatus ? 'Aktiv' : 'Inaktiv'}
              </p>
            </div>
            <div className="status-card">
              <div className="status-header">
                <Shield size={24} />
                <div className="status-toggle">
                  <button
                    className={`toggle-btn ${monitoringStatus ? 'active' : ''}`}
                    onClick={() => setMonitoringStatus(!monitoringStatus)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>
              </div>
              <h3>Überwachung</h3>
              <p className={`status-text ${monitoringStatus ? 'active' : 'inactive'}`}>
                {monitoringStatus ? 'Aktiv' : 'Inaktiv'}
              </p>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="ai-orb">
            <div className="orb-ring"></div>
            <div className="orb-ring delay-1"></div>
            <div className="orb-ring delay-2"></div>
            <Brain size={48} className="orb-icon" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon camera">
            <Camera size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeCameras}/{stats.totalCameras}</div>
            <div className="stat-label">Aktive Kameras</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon activity">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.detections}</div>
            <div className="stat-label">Heutige Erkennungen</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon threat">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.threats}</div>
            <div className="stat-label">Aktive Bedrohungen</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon uptime">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.uptime}</div>
            <div className="stat-label">System-Verfügbarkeit</div>
          </div>
        </div>
      </div>

      {/* Additional System Stats */}
      <div className="stats-grid-secondary">
        <div className="stat-card-small">
          <HardDrive size={20} />
          <div>
            <div className="stat-value-small">{stats.storage}</div>
            <div className="stat-label-small">Speicher</div>
          </div>
        </div>
        <div className="stat-card-small">
          <Cpu size={20} />
          <div>
            <div className="stat-value-small">{stats.cpuUsage}</div>
            <div className="stat-label-small">CPU-Auslastung</div>
          </div>
        </div>
        <div className="stat-card-small">
          <Wifi size={20} />
          <div>
            <div className="stat-value-small">{stats.bandwidth}</div>
            <div className="stat-label-small">Bandbreite</div>
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Camera size={24} />
            Kamera-Übersicht
          </h2>
          <button className="btn-secondary">Alle anzeigen</button>
        </div>
        <div className="camera-grid">
          {cameraPreviews.slice(0, 8).map((camera) => (
            <div key={camera.id} className="camera-card">
              <div className="camera-preview">
                <div className="camera-placeholder">
                  <Camera size={32} className="placeholder-icon" />
                  <span className="placeholder-text">Kamera {camera.id}</span>
                </div>
                <div className={`camera-status-badge ${camera.status}`}>
                  <span className="status-dot"></span>
                  {camera.status === 'active' ? 'Aktiv' : 'Offline'}
                </div>
              </div>
              <div className="camera-info">
                <div className="camera-name">{camera.name}</div>
                <div className="camera-location">{camera.location}</div>
                <div className="camera-meta">
                  <span>{camera.fps} FPS</span>
                  <span>{camera.quality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Activity size={24} />
            Letzte Aktivitäten
          </h2>
          <button className="btn-secondary">Alle anzeigen</button>
        </div>
        <div className="events-list">
          {recentEvents.map((event) => (
            <div key={event.id} className={`event-item ${event.severity}`}>
              <div className="event-icon">
                {getSeverityIcon(event.severity)}
              </div>
              <div className="event-content">
                <div className="event-message">{event.message}</div>
                <div className="event-meta">
                  <span className="event-camera">{event.camera}</span>
                  <span className="event-time">{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
