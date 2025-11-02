import { useState, useEffect } from 'react'
import {
  Brain,
  Sliders,
  Zap,
  Target,
  Eye,
  Users,
  Car,
  Package,
  AlertTriangle,
  TrendingUp,
  Settings,
  Save,
  RotateCcw,
  CheckCircle2,
  Clock
} from 'lucide-react'
import './AIManagement.css'

const defaultModels = [
  { id: 1, name: 'Personenerkennung', active: true, accuracy: 94, speed: 'Schnell', icon: 'Users' },
  { id: 2, name: 'Fahrzeugerkennung', active: true, accuracy: 91, speed: 'Schnell', icon: 'Car' },
  { id: 3, name: 'Objekterkennung', active: false, accuracy: 88, speed: 'Mittel', icon: 'Package' },
  { id: 4, name: 'Verhaltensanalyse', active: true, accuracy: 86, speed: 'Langsam', icon: 'Target' },
]

const AIManagement = () => {
  const [aiModels, setAiModels] = useState(() => {
    const saved = localStorage.getItem('aiModels')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.map(m => ({
        ...m,
        icon: m.icon === 'Users' ? Users : m.icon === 'Car' ? Car : m.icon === 'Package' ? Package : Target
      }))
    }
    return defaultModels.map(m => ({
      ...m,
      icon: m.icon === 'Users' ? Users : m.icon === 'Car' ? Car : m.icon === 'Package' ? Package : Target
    }))
  })

  const [detectionZones, setDetectionZones] = useState(() => {
    const saved = localStorage.getItem('detectionZones')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Haupteingang Zone', camera: 'KAM-01', enabled: true, sensitivity: 80 },
      { id: 2, name: 'Parkplatz Zone A', camera: 'KAM-02', enabled: true, sensitivity: 70 },
      { id: 3, name: 'Flur 1. OG', camera: 'KAM-03', enabled: true, sensitivity: 60 },
      { id: 4, name: 'Lager Zone', camera: 'KAM-06', enabled: false, sensitivity: 85 },
    ]
  })

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aiSettings')
    return saved ? JSON.parse(saved) : {
      globalSensitivity: 75,
      confidenceThreshold: 70,
      detectionDelay: 2,
      alertFrequency: 5,
      autoLearn: true,
      nightMode: true,
    }
  })

  const [showSaved, setShowSaved] = useState(false)

  const saveToLocalStorage = (models, zones, aiSettings) => {
    const modelsToSave = models.map(m => ({
      ...m,
      icon: m.icon === Users ? 'Users' : m.icon === Car ? 'Car' : m.icon === Package ? 'Package' : 'Target'
    }))
    localStorage.setItem('aiModels', JSON.stringify(modelsToSave))
    localStorage.setItem('detectionZones', JSON.stringify(zones))
    localStorage.setItem('aiSettings', JSON.stringify(aiSettings))
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const toggleModel = (id) => {
    const newModels = aiModels.map(model =>
      model.id === id ? { ...model, active: !model.active } : model
    )
    setAiModels(newModels)
    saveToLocalStorage(newModels, detectionZones, settings)
  }

  const toggleZone = (id) => {
    const newZones = detectionZones.map(zone =>
      zone.id === id ? { ...zone, enabled: !zone.enabled } : zone
    )
    setDetectionZones(newZones)
    saveToLocalStorage(aiModels, newZones, settings)
  }

  const updateZoneSensitivity = (id, value) => {
    const newZones = detectionZones.map(zone =>
      zone.id === id ? { ...zone, sensitivity: parseInt(value) } : zone
    )
    setDetectionZones(newZones)
    saveToLocalStorage(aiModels, newZones, settings)
  }

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveToLocalStorage(aiModels, detectionZones, newSettings)
  }

  const aiStats = {
    totalDetections: 2847,
    accuracy: 92,
    activeModels: aiModels.filter(m => m.active).length,
    processingSpeed: '23ms'
  }

  return (
    <div className="ai-management-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">KI-Verwaltung</h1>
          <p className="page-subtitle">Alle Änderungen werden automatisch gespeichert</p>
        </div>
      </div>

      {showSaved && (
        <div className="save-notification">
          <CheckCircle2 size={20} />
          <span>Automatisch gespeichert</span>
        </div>
      )}

      {/* AI Stats */}
      <div className="ai-stats-grid">
        <div className="ai-stat-card">
          <div className="ai-stat-icon">
            <Brain size={24} />
          </div>
          <div className="ai-stat-content">
            <div className="ai-stat-value">{aiStats.activeModels}/{aiModels.length}</div>
            <div className="ai-stat-label">Aktive Modelle</div>
          </div>
        </div>
        <div className="ai-stat-card">
          <div className="ai-stat-icon">
            <Target size={24} />
          </div>
          <div className="ai-stat-content">
            <div className="ai-stat-value">{aiStats.accuracy}%</div>
            <div className="ai-stat-label">Durchschn. Genauigkeit</div>
          </div>
        </div>
        <div className="ai-stat-card">
          <div className="ai-stat-icon">
            <Zap size={24} />
          </div>
          <div className="ai-stat-content">
            <div className="ai-stat-value">{aiStats.processingSpeed}</div>
            <div className="ai-stat-label">Verarbeitungszeit</div>
          </div>
        </div>
        <div className="ai-stat-card">
          <div className="ai-stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="ai-stat-content">
            <div className="ai-stat-value">{aiStats.totalDetections.toLocaleString('de-DE')}</div>
            <div className="ai-stat-label">Erkennungen (30 Tage)</div>
          </div>
        </div>
      </div>

      <div className="ai-content-grid">
        {/* Left Column */}
        <div className="ai-left-column">
          {/* AI Models Section */}
          <div className="ai-section">
            <div className="ai-section-header">
              <h2 className="ai-section-title">
                <Brain size={20} />
                KI-Modelle
              </h2>
            </div>
            <div className="ai-models-list">
              {aiModels.map((model) => {
                const Icon = model.icon
                return (
                  <div key={model.id} className="ai-model-card">
                    <div className="ai-model-header">
                      <div className="ai-model-icon">
                        <Icon size={20} />
                      </div>
                      <div className="ai-model-info">
                        <h3 className="ai-model-name">{model.name}</h3>
                        <div className="ai-model-stats">
                          <span className="ai-model-stat">Genauigkeit: {model.accuracy}%</span>
                          <span className="ai-model-stat">Geschwindigkeit: {model.speed}</span>
                        </div>
                      </div>
                      <button
                        className={`toggle-btn ${model.active ? 'active' : ''}`}
                        onClick={() => toggleModel(model.id)}
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                    {model.active && (
                      <div className="ai-model-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${model.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detection Zones */}
          <div className="ai-section">
            <div className="ai-section-header">
              <h2 className="ai-section-title">
                <Target size={20} />
                Erkennungszonen
              </h2>
            </div>
            <div className="zones-list">
              {detectionZones.map((zone) => (
                <div key={zone.id} className="zone-card">
                  <div className="zone-header">
                    <div>
                      <h3 className="zone-name">{zone.name}</h3>
                      <p className="zone-camera">{zone.camera}</p>
                    </div>
                    <button
                      className={`toggle-btn ${zone.enabled ? 'active' : ''}`}
                      onClick={() => toggleZone(zone.id)}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                  {zone.enabled && (
                    <div className="zone-sensitivity">
                      <div className="sensitivity-label">
                        <span>Empfindlichkeit</span>
                        <span className="sensitivity-value">{zone.sensitivity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={zone.sensitivity}
                        onChange={(e) => updateZoneSensitivity(zone.id, e.target.value)}
                        className="sensitivity-slider"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Global Settings */}
        <div className="ai-right-column">
          <div className="ai-section">
            <div className="ai-section-header">
              <h2 className="ai-section-title">
                <Sliders size={20} />
                Globale Einstellungen
              </h2>
            </div>
            <div className="settings-form">
              <div className="setting-group">
                <label className="setting-label">
                  <span>Globale Empfindlichkeit</span>
                  <span className="setting-value">{settings.globalSensitivity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.globalSensitivity}
                  onChange={(e) => updateSetting('globalSensitivity', parseInt(e.target.value))}
                  className="setting-slider"
                />
                <p className="setting-description">
                  Steuert die Gesamtempfindlichkeit aller Erkennungsalgorithmen
                </p>
              </div>

              <div className="setting-group">
                <label className="setting-label">
                  <span>Konfidenz-Schwellenwert</span>
                  <span className="setting-value">{settings.confidenceThreshold}%</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={settings.confidenceThreshold}
                  onChange={(e) => updateSetting('confidenceThreshold', parseInt(e.target.value))}
                  className="setting-slider"
                />
                <p className="setting-description">
                  Minimale Konfidenz für eine gültige Erkennung
                </p>
              </div>

              <div className="setting-group">
                <label className="setting-label">
                  <span>Erkennungsverzögerung</span>
                  <span className="setting-value">{settings.detectionDelay}s</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={settings.detectionDelay}
                  onChange={(e) => updateSetting('detectionDelay', parseInt(e.target.value))}
                  className="setting-slider"
                />
                <p className="setting-description">
                  Verzögerung vor Auslösung einer Erkennung
                </p>
              </div>

              <div className="setting-group">
                <label className="setting-label">
                  <span>Benachrichtigungsfrequenz</span>
                  <span className="setting-value">{settings.alertFrequency} Min</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={settings.alertFrequency}
                  onChange={(e) => updateSetting('alertFrequency', parseInt(e.target.value))}
                  className="setting-slider"
                />
                <p className="setting-description">
                  Minimale Zeit zwischen Benachrichtigungen
                </p>
              </div>

              <div className="setting-toggle-group">
                <div className="setting-toggle-item">
                  <div>
                    <div className="setting-toggle-label">Automatisches Lernen</div>
                    <div className="setting-toggle-description">
                      KI lernt automatisch aus neuen Erkennungen
                    </div>
                  </div>
                  <button
                    className={`toggle-btn ${settings.autoLearn ? 'active' : ''}`}
                    onClick={() => updateSetting('autoLearn', !settings.autoLearn)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>

                <div className="setting-toggle-item">
                  <div>
                    <div className="setting-toggle-label">Nachtmodus-Optimierung</div>
                    <div className="setting-toggle-description">
                      Optimierte Erkennung bei schlechten Lichtverhältnissen
                    </div>
                  </div>
                  <button
                    className={`toggle-btn ${settings.nightMode ? 'active' : ''}`}
                    onClick={() => updateSetting('nightMode', !settings.nightMode)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Tips */}
          <div className="ai-section">
            <div className="ai-section-header">
              <h2 className="ai-section-title">
                <AlertTriangle size={20} />
                Leistungs-Tipps
              </h2>
            </div>
            <div className="tips-list">
              <div className="tip-item">
                <CheckCircle2 size={16} />
                <span>Deaktivieren Sie ungenutzte Modelle, um Ressourcen zu sparen</span>
              </div>
              <div className="tip-item">
                <CheckCircle2 size={16} />
                <span>Höhere Schwellenwerte reduzieren Fehlalarme</span>
              </div>
              <div className="tip-item">
                <CheckCircle2 size={16} />
                <span>Erkennungszonen auf relevante Bereiche beschränken</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIManagement
