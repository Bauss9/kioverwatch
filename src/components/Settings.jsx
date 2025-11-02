import { useState, useEffect } from 'react'
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Lock,
  Eye,
  Download,
  Trash2,
  Save,
  CheckCircle2
} from 'lucide-react'
import './Settings.css'

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('appSettings')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      // Account
      username: 'Administrator',
      email: 'admin@ai-overwatch.de',

      // Notifications
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      alertSounds: true,

      // Security
      twoFactorAuth: true,
      autoLogout: 30,

      // Storage
      retentionDays: 30,
      autoDelete: true,
      compression: true,

      // Privacy
      anonymizeData: false,
      shareAnalytics: true,
    }
  })

  const [showSaved, setShowSaved] = useState(false)

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem('appSettings', JSON.stringify(newSettings))
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const storageStats = {
    used: 234,
    total: 500,
    percentage: 47
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Einstellungen</h1>
          <p className="page-subtitle">Alle Änderungen werden automatisch gespeichert</p>
        </div>
      </div>

      {showSaved && (
        <div className="save-notification">
          <CheckCircle2 size={20} />
          <span>Automatisch gespeichert</span>
        </div>
      )}

      <div className="settings-grid">
        {/* Account Settings */}
        <div className="settings-section">
          <div className="settings-section-header">
            <User size={20} />
            <h2>Konto-Einstellungen</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Benutzername</label>
              <input
                type="text"
                value={settings.username}
                onChange={(e) => updateSetting('username', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>E-Mail-Adresse</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting('email', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <button className="btn-link">Passwort ändern</button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="settings-section-header">
            <Bell size={20} />
            <h2>Benachrichtigungen</h2>
          </div>
          <div className="settings-toggles">
            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Mail size={18} />
                <div>
                  <div className="toggle-title">E-Mail-Benachrichtigungen</div>
                  <div className="toggle-description">Erhalten Sie Benachrichtigungen per E-Mail</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.emailNotifications ? 'active' : ''}`}
                onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Bell size={18} />
                <div>
                  <div className="toggle-title">Push-Benachrichtigungen</div>
                  <div className="toggle-description">Browser-Benachrichtigungen aktivieren</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.pushNotifications ? 'active' : ''}`}
                onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Smartphone size={18} />
                <div>
                  <div className="toggle-title">SMS-Benachrichtigungen</div>
                  <div className="toggle-description">Kritische Alarme per SMS</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.smsNotifications ? 'active' : ''}`}
                onClick={() => updateSetting('smsNotifications', !settings.smsNotifications)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Bell size={18} />
                <div>
                  <div className="toggle-title">Alarm-Töne</div>
                  <div className="toggle-description">Akustische Benachrichtigungen</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.alertSounds ? 'active' : ''}`}
                onClick={() => updateSetting('alertSounds', !settings.alertSounds)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <div className="settings-section-header">
            <Shield size={20} />
            <h2>Sicherheit</h2>
          </div>
          <div className="settings-form">
            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Lock size={18} />
                <div>
                  <div className="toggle-title">Zwei-Faktor-Authentifizierung</div>
                  <div className="toggle-description">Zusätzliche Sicherheitsebene für Ihr Konto</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.twoFactorAuth ? 'active' : ''}`}
                onClick={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="form-group">
              <label>Automatische Abmeldung</label>
              <select
                value={settings.autoLogout}
                onChange={(e) => updateSetting('autoLogout', parseInt(e.target.value))}
                className="form-select"
              >
                <option value={15}>15 Minuten</option>
                <option value={30}>30 Minuten</option>
                <option value={60}>1 Stunde</option>
                <option value={120}>2 Stunden</option>
                <option value={0}>Nie</option>
              </select>
            </div>

            <div className="form-group">
              <button className="btn-link danger">
                <Trash2 size={16} />
                Alle Sitzungen beenden
              </button>
            </div>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="settings-section">
          <div className="settings-section-header">
            <Database size={20} />
            <h2>Speicherverwaltung</h2>
          </div>

          <div className="storage-info">
            <div className="storage-stats">
              <div className="storage-text">
                <span className="storage-used">{storageStats.used} GB</span>
                <span className="storage-total"> von {storageStats.total} GB verwendet</span>
              </div>
              <div className="storage-percentage">{storageStats.percentage}%</div>
            </div>
            <div className="storage-bar">
              <div
                className="storage-fill"
                style={{ width: `${storageStats.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>Aufbewahrungsdauer (Tage)</label>
              <select
                value={settings.retentionDays}
                onChange={(e) => updateSetting('retentionDays', parseInt(e.target.value))}
                className="form-select"
              >
                <option value={7}>7 Tage</option>
                <option value={14}>14 Tage</option>
                <option value={30}>30 Tage</option>
                <option value={60}>60 Tage</option>
                <option value={90}>90 Tage</option>
              </select>
            </div>

            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Trash2 size={18} />
                <div>
                  <div className="toggle-title">Automatisches Löschen</div>
                  <div className="toggle-description">Alte Aufnahmen automatisch entfernen</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.autoDelete ? 'active' : ''}`}
                onClick={() => updateSetting('autoDelete', !settings.autoDelete)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Database size={18} />
                <div>
                  <div className="toggle-title">Video-Komprimierung</div>
                  <div className="toggle-description">Speicherplatz durch Komprimierung sparen</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.compression ? 'active' : ''}`}
                onClick={() => updateSetting('compression', !settings.compression)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="form-group">
              <button className="btn-link">
                <Download size={16} />
                Alle Daten exportieren
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <div className="settings-section-header">
            <Eye size={20} />
            <h2>Datenschutz</h2>
          </div>
          <div className="settings-toggles">
            <div className="settings-toggle-item">
              <div className="toggle-info">
                <Eye size={18} />
                <div>
                  <div className="toggle-title">Daten anonymisieren</div>
                  <div className="toggle-description">Persönliche Daten in Aufzeichnungen unkenntlich machen</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.anonymizeData ? 'active' : ''}`}
                onClick={() => updateSetting('anonymizeData', !settings.anonymizeData)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="toggle-info">
                <CheckCircle2 size={18} />
                <div>
                  <div className="toggle-title">Analyse-Daten teilen</div>
                  <div className="toggle-description">Helfen Sie uns, das System zu verbessern</div>
                </div>
              </div>
              <button
                className={`toggle-btn ${settings.shareAnalytics ? 'active' : ''}`}
                onClick={() => updateSetting('shareAnalytics', !settings.shareAnalytics)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <div className="settings-section-header">
            <Trash2 size={20} />
            <h2>Gefahrenzone</h2>
          </div>
          <div className="danger-actions">
            <div className="danger-item">
              <div>
                <div className="danger-title">Alle Aufnahmen löschen</div>
                <div className="danger-description">Unwiderrufliches Löschen aller gespeicherten Videos</div>
              </div>
              <button className="btn-danger">Löschen</button>
            </div>
            <div className="danger-item">
              <div>
                <div className="danger-title">Auf Werkseinstellungen zurücksetzen</div>
                <div className="danger-description">Alle Einstellungen zurücksetzen</div>
              </div>
              <button className="btn-danger">Zurücksetzen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
