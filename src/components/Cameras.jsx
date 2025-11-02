import { useState, useEffect } from 'react'
import {
  Camera,
  Plus,
  Search,
  Maximize2,
  Settings,
  Play,
  Pause,
  Download,
  CheckCircle2,
  XCircle,
  X,
  Minimize2,
  RotateCw,
  Volume2
} from 'lucide-react'
import './Cameras.css'

const Cameras = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [fullscreenCamera, setFullscreenCamera] = useState(null)
  const [cameras, setCameras] = useState([])

  useEffect(() => {
    const savedCameras = localStorage.getItem('cameras')
    if (savedCameras) {
      const parsed = JSON.parse(savedCameras)
      setCameras(parsed.map(cam => ({
        ...cam,
        status: cam.enabled ? 'active' : 'offline',
        fps: cam.fps || 30,
        quality: cam.quality || 'HD',
        recording: cam.enabled || false
      })))
    }
  }, [])

  const filteredCameras = cameras.filter(camera => {
    const matchesSearch = camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camera.zone?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || camera.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status) => {
    if (status === 'active') return <CheckCircle2 size={16} />
    return <XCircle size={16} />
  }

  const activeCameras = cameras.filter(c => c.status === 'active').length
  const offlineCameras = cameras.filter(c => c.status === 'offline').length
  const recordingCameras = cameras.filter(c => c.recording).length

  return (
    <div className="cameras-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Kamera-Verwaltung</h1>
          <p className="page-subtitle">{activeCameras} von {cameras.length} Kameras aktiv</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Kamera hinzufügen
        </button>
      </div>

      <div className="cameras-stats-bar">
        <div className="stat-chip active">
          <CheckCircle2 size={18} />
          <span>{activeCameras} Aktiv</span>
        </div>
        <div className="stat-chip offline">
          <XCircle size={18} />
          <span>{offlineCameras} Offline</span>
        </div>
        <div className="stat-chip recording">
          <Play size={18} />
          <span>{recordingCameras} Aufnahme</span>
        </div>
      </div>

      <div className="cameras-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Kamera suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Alle
          </button>
          <button
            className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Aktiv
          </button>
          <button
            className={`filter-btn ${filterStatus === 'offline' ? 'active' : ''}`}
            onClick={() => setFilterStatus('offline')}
          >
            Offline
          </button>
        </div>
      </div>

      {filteredCameras.length > 0 ? (
        <div className="cameras-grid-large">
          {filteredCameras.map((camera) => (
            <div key={camera.id} className={`camera-card-large ${camera.status}`}>
              <div className="camera-preview-large">
                <div className="camera-placeholder-large">
                  <Camera size={48} className="placeholder-icon-large" />
                  <span className="placeholder-text-large">{camera.name}</span>
                </div>
                <div className={`camera-status-overlay ${camera.status}`}>
                  {getStatusIcon(camera.status)}
                  <span>{camera.status === 'active' ? 'Aktiv' : 'Offline'}</span>
                </div>
                {camera.recording && (
                  <div className="recording-indicator">
                    <span className="rec-dot"></span>
                    REC
                  </div>
                )}
                <div className="camera-overlay-controls">
                  <button
                    className="overlay-btn"
                    title="Vollbild"
                    onClick={() => setFullscreenCamera(camera)}
                  >
                    <Maximize2 size={18} />
                  </button>
                  <button className="overlay-btn" title="Einstellungen">
                    <Settings size={18} />
                  </button>
                  <button className="overlay-btn" title="Herunterladen">
                    <Download size={18} />
                  </button>
                </div>
              </div>
              <div className="camera-card-info">
                <div className="camera-info-header">
                  <div>
                    <h3 className="camera-card-name">{camera.name}</h3>
                    <p className="camera-card-location">{camera.zone || camera.location}</p>
                  </div>
                  <button className="camera-settings-btn">
                    <Settings size={18} />
                  </button>
                </div>
                <div className="camera-specs">
                  <div className="spec-item">
                    <span className="spec-label">FPS</span>
                    <span className="spec-value">{camera.fps}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Qualität</span>
                    <span className="spec-value">{camera.quality}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Status</span>
                    <span className={`spec-value status-${camera.status}`}>
                      {camera.status === 'active' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-cameras">
          <Camera size={64} />
          <h3>Keine Kameras gefunden</h3>
          <p>Passen Sie Ihre Suchkriterien an oder fügen Sie eine neue Kamera hinzu</p>
        </div>
      )}

      {fullscreenCamera && (
        <div className="fullscreen-overlay">
          <div className="fullscreen-container">
            <div className="fullscreen-header">
              <div className="fullscreen-info">
                <h2>{fullscreenCamera.name}</h2>
                <span className="fullscreen-location">{fullscreenCamera.zone || fullscreenCamera.location}</span>
              </div>
              <button className="fullscreen-close" onClick={() => setFullscreenCamera(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="fullscreen-feed">
              <div className="fullscreen-placeholder">
                <Camera size={120} className="fullscreen-camera-icon" />
                <p className="fullscreen-camera-name">{fullscreenCamera.name}</p>
                <p className="fullscreen-camera-detail">Live-Stream Platzhalter</p>
              </div>

              <div className="fullscreen-status-top">
                {fullscreenCamera.recording && (
                  <div className="fullscreen-rec">
                    <span className="rec-dot"></span>
                    AUFNAHME
                  </div>
                )}
                <div className={`fullscreen-status ${fullscreenCamera.status}`}>
                  {getStatusIcon(fullscreenCamera.status)}
                  {fullscreenCamera.status === 'active' ? 'LIVE' : 'OFFLINE'}
                </div>
              </div>

              <div className="fullscreen-timestamp">
                {new Date().toLocaleString('de-DE')}
              </div>
            </div>

            <div className="fullscreen-controls">
              <div className="control-group">
                <button className="control-btn">
                  <Play size={20} />
                  <span>Abspielen</span>
                </button>
                <button className="control-btn">
                  <Pause size={20} />
                  <span>Pause</span>
                </button>
                <button className="control-btn">
                  <Download size={20} />
                  <span>Speichern</span>
                </button>
              </div>

              <div className="control-group">
                <button className="control-btn">
                  <RotateCw size={20} />
                  <span>Drehen</span>
                </button>
                <button className="control-btn">
                  <Volume2 size={20} />
                  <span>Ton</span>
                </button>
                <button className="control-btn">
                  <Settings size={20} />
                  <span>Einstellungen</span>
                </button>
              </div>

              <button className="control-btn minimize" onClick={() => setFullscreenCamera(null)}>
                <Minimize2 size={20} />
                <span>Minimieren</span>
              </button>
            </div>

            <div className="fullscreen-info-panel">
              <div className="info-row">
                <span className="info-label">Kamera ID:</span>
                <span className="info-value">{fullscreenCamera.id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">IP-Adresse:</span>
                <span className="info-value">{fullscreenCamera.ip || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Modell:</span>
                <span className="info-value">{fullscreenCamera.model || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">FPS:</span>
                <span className="info-value">{fullscreenCamera.fps}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Qualität:</span>
                <span className="info-value">{fullscreenCamera.quality}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Zone:</span>
                <span className="info-value">{fullscreenCamera.zone || fullscreenCamera.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cameras
