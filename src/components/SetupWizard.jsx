import { useState, useEffect } from 'react'
import { Camera, Search, CheckCircle, X, Plus } from 'lucide-react'
import './SetupWizard.css'

const SetupWizard = ({ onComplete }) => {
  const [step, setStep] = useState('detect') // detect, searching, found
  const [cameras, setCameras] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleDetectCameras = () => {
    setStep('searching')
    setIsSearching(true)

    // Simulate camera detection after 5 seconds
    setTimeout(() => {
      const detectedCameras = [
        { id: 1, ip: '192.168.1.101', model: 'Hikvision DS-2CD2042', name: 'Kamera 1', zone: 'Eingang', enabled: true },
        { id: 2, ip: '192.168.1.102', model: 'Dahua IPC-HFW2431', name: 'Kamera 2', zone: 'Außenbereich', enabled: true },
        { id: 3, ip: '192.168.1.103', model: 'Hikvision DS-2CD2142', name: 'Kamera 3', zone: 'Parkplatz', enabled: true },
        { id: 4, ip: '192.168.1.104', model: 'Dahua IPC-HFW5442', name: 'Kamera 4', zone: 'Eingang', enabled: true },
        { id: 5, ip: '192.168.1.105', model: 'Hikvision DS-2CD2042', name: 'Kamera 5', zone: 'Lager', enabled: true },
        { id: 6, ip: '192.168.1.106', model: 'Axis M3046-V', name: 'Kamera 6', zone: 'Büro', enabled: true },
        { id: 7, ip: '192.168.1.107', model: 'Hikvision DS-2CD2142', name: 'Kamera 7', zone: 'Außenbereich', enabled: true },
      ]
      setCameras(detectedCameras)
      setIsSearching(false)
      setStep('found')
    }, 5000)
  }

  const updateCamera = (id, field, value) => {
    setCameras(cameras.map(cam =>
      cam.id === id ? { ...cam, [field]: value } : cam
    ))
  }

  const handleComplete = () => {
    // Save cameras to localStorage
    localStorage.setItem('cameras', JSON.stringify(cameras))
    localStorage.setItem('setupCompleted', 'true')
    onComplete()
  }

  return (
    <div className="setup-overlay">
      <div className="setup-wizard">
        <button className="close-button" onClick={onComplete}>
          <X size={20} />
        </button>

        {step === 'detect' && (
          <div className="setup-step detect-step">
            <div className="setup-icon">
              <Camera size={48} />
            </div>
            <h2 className="setup-title">Willkommen bei Overwatch</h2>
            <p className="setup-description">
              Beginnen Sie mit der Einrichtung Ihres Überwachungssystems.
              Wir suchen automatisch nach Kameras in Ihrem Netzwerk.
            </p>
            <button className="setup-button" onClick={handleDetectCameras}>
              <Search size={20} />
              Kameras erkennen
            </button>
          </div>
        )}

        {step === 'searching' && (
          <div className="setup-step searching-step">
            <div className="setup-icon">
              <Search size={48} />
            </div>
            <h2 className="setup-title">Kameras werden gesucht</h2>
            <p className="setup-description">
              Dein System sucht jetzt nach Kameras im Netzwerk...
            </p>

            <div className="search-animation">
              <div className="radar-container">
                <div className="radar-wave"></div>
                <div className="radar-wave delay-1"></div>
                <div className="radar-wave delay-2"></div>
                <div className="radar-dot"></div>
              </div>
            </div>

            <p className="search-info">Das dauert ca. 30 Sekunden.</p>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        )}

        {step === 'found' && (
          <div className="setup-step found-step">
            <div className="found-header">
              <CheckCircle size={40} className="success-icon" />
              <h2 className="setup-title">{cameras.length} Kameras gefunden!</h2>
              <p className="setup-description">
                Benennen Sie Ihre Kameras und wählen Sie die Zonen aus
              </p>
            </div>

            <div className="cameras-list">
              {cameras.map((camera) => (
                <div key={camera.id} className="camera-setup-card">
                  <div className="camera-setup-header">
                    <Camera size={20} />
                    <span className="camera-number">Kamera {camera.id}</span>
                  </div>

                  <div className="camera-preview-box">
                    <div className="camera-placeholder">
                      <Camera size={32} />
                    </div>
                    <div className="camera-ip">{camera.ip}</div>
                    <div className="camera-model">{camera.model}</div>
                  </div>

                  <div className="camera-inputs">
                    <div className="input-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        value={camera.name}
                        onChange={(e) => updateCamera(camera.id, 'name', e.target.value)}
                        placeholder={`Kamera ${camera.id}`}
                      />
                    </div>
                    <div className="input-group">
                      <label>Zone:</label>
                      <select
                        value={camera.zone}
                        onChange={(e) => updateCamera(camera.id, 'zone', e.target.value)}
                      >
                        <option value="Eingang">Eingang</option>
                        <option value="Außenbereich">Außenbereich</option>
                        <option value="Parkplatz">Parkplatz</option>
                        <option value="Lager">Lager</option>
                        <option value="Büro">Büro</option>
                        <option value="Flur">Flur</option>
                        <option value="Empfang">Empfang</option>
                      </select>
                    </div>
                  </div>

                  <div className="camera-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={camera.enabled}
                        onChange={(e) => updateCamera(camera.id, 'enabled', e.target.checked)}
                      />
                      <span className="toggle-switch"></span>
                      <span className="toggle-label">
                        {camera.enabled ? 'Aktiviert' : 'Deaktiviert'}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button className="add-manual-button">
              <Plus size={18} />
              Kamera manuell hinzufügen
            </button>

            <button className="setup-button complete-button" onClick={handleComplete}>
              Einrichtung abschließen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SetupWizard
