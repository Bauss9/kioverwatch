import { useState, useRef, useEffect } from 'react'
import {
  Upload,
  Play,
  Pause,
  AlertTriangle,
  Activity,
  Users,
  Eye,
  Zap,
  CheckCircle,
  XCircle,
  Loader,
  Download,
  Trash2,
  Video,
  Brain,
  Shield,
  TrendingUp,
  Film,
  Clock
} from 'lucide-react'
import './AITesting.css'

const AITesting = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('idle') // idle, uploading, processing, complete, error
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFrame, setProcessedFrame] = useState(null)
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({
    currentFrame: 0,
    totalFrames: 0,
    personCount: 0,
    eventCount: 0,
    fps: 0,
    duration: 0
  })
  const [ws, setWs] = useState(null)
  const [testVideos, setTestVideos] = useState([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [showTestVideos, setShowTestVideos] = useState(true)
  const [selectedTestVideo, setSelectedTestVideo] = useState(null)
  const fileInputRef = useRef(null)

  // Fetch test videos on mount
  useEffect(() => {
    fetchTestVideos()
  }, [])

  const fetchTestVideos = async () => {
    setLoadingVideos(true)
    try {
      const response = await fetch('https://python.ghiblification.ai/videos')
      const data = await response.json()
      
      if (data.success) {
        setTestVideos(data.videos)
      }
    } catch (error) {
      console.error('Error fetching test videos:', error)
    } finally {
      setLoadingVideos(false)
    }
  }

  // WebSocket connection
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [ws])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file)
      setSelectedTestVideo(null)
      setShowTestVideos(false)
      setUploadStatus('idle')
      setEvents([])
      setStats({
        currentFrame: 0,
        totalFrames: 0,
        personCount: 0,
        eventCount: 0,
        fps: 0,
        duration: 0
      })
    } else {
      alert('Bitte wählen Sie eine gültige Videodatei aus')
    }
  }

  const handleTestVideoSelect = (video) => {
    setSelectedTestVideo(video)
    setSelectedFile(null)
    setShowTestVideos(false)
    setUploadStatus('idle')
    setEvents([])
    setStats({
      currentFrame: 0,
      totalFrames: 0,
      personCount: 0,
      eventCount: 0,
      fps: 0,
      duration: 0
    })
  }

  const handleUploadAndProcess = async () => {
    if (!selectedFile && !selectedTestVideo) return

    setUploadStatus('uploading')
    setUploadProgress(0)

    try {
      let filename = null

      // If using uploaded file, upload it first
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)

        const response = await fetch('https://python.ghiblification.ai/upload', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()

        if (data.success) {
          filename = data.filename
        } else {
          setUploadStatus('error')
          console.error('Upload failed:', data.error)
          return
        }
      } else if (selectedTestVideo) {
        // Use test video directly
        filename = selectedTestVideo.filename
      }

      setUploadStatus('processing')
      setUploadProgress(100)
      
      // Connect WebSocket for processing
      connectWebSocket(filename)
    } catch (error) {
      setUploadStatus('error')
      console.error('Upload error:', error)
    }
  }

  const connectWebSocket = (filename) => {
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const wsHost = 'python.ghiblification.ai' // Match your API domain
  const websocket = new WebSocket(`${wsProtocol}//${wsHost}/ws/process/${filename}`)

    websocket.onopen = () => {
      console.log('WebSocket connected')
      setIsProcessing(true)
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === 'video_info') {
        setStats(prev => ({
          ...prev,
          totalFrames: data.total_frames,
          fps: data.fps,
          duration: data.duration
        }))
      } else if (data.type === 'frame') {
        // Update processed frame
        setProcessedFrame(`data:image/jpeg;base64,${data.frame_data}`)
        
        // Update stats
        setStats(prev => ({
          ...prev,
          currentFrame: data.frame_number
        }))

        setUploadProgress(data.progress)

        // Process events
        if (data.events && data.events.length > 0) {
          setEvents(prevEvents => {
            const newEvents = data.events.map(evt => ({
              ...evt,
              id: `${evt.frame}-${evt.type}-${Date.now()}-${Math.random()}`
            }))
            
            // Update person count from detection events
            const detectionEvent = data.events.find(e => e.type === 'detection')
            if (detectionEvent) {
              setStats(prev => ({
                ...prev,
                personCount: detectionEvent.count,
                eventCount: prev.eventCount + data.events.length
              }))
            } else {
              setStats(prev => ({
                ...prev,
                eventCount: prev.eventCount + data.events.length
              }))
            }

            return [...newEvents, ...prevEvents].slice(0, 100) // Keep last 100 events
          })
        }
      } else if (data.type === 'complete') {
        setUploadStatus('complete')
        setIsProcessing(false)
        websocket.close()
      } else if (data.type === 'error') {
        setUploadStatus('error')
        setIsProcessing(false)
        console.error('Processing error:', data.message)
      }
    }

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error)
      setUploadStatus('error')
      setIsProcessing(false)
    }

    websocket.onclose = () => {
      console.log('WebSocket closed')
      setIsProcessing(false)
    }

    setWs(websocket)
  }

  const handleReset = () => {
    if (ws) {
      ws.close()
    }
    setSelectedFile(null)
    setSelectedTestVideo(null)
    setShowTestVideos(true)
    setUploadStatus('idle')
    setUploadProgress(0)
    setIsProcessing(false)
    setProcessedFrame(null)
    setEvents([])
    setStats({
      currentFrame: 0,
      totalFrames: 0,
      personCount: 0,
      eventCount: 0,
      fps: 0,
      duration: 0
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getEventIcon = (type, severity) => {
    if (severity === 'high') return <Shield className="event-icon-svg danger" size={18} />
    if (type === 'alert') return <AlertTriangle className="event-icon-svg warning" size={18} />
    if (type === 'emotion') return <Activity className="event-icon-svg info" size={18} />
    if (type === 'activity') return <TrendingUp className="event-icon-svg info" size={18} />
    if (type === 'detection') return <Users className="event-icon-svg success" size={18} />
    return <Eye className="event-icon-svg info" size={18} />
  }

  const getEventClass = (event) => {
    if (event.severity === 'high') return 'danger'
    if (event.type === 'alert') return 'warning'
    if (event.type === 'detection') return 'success'
    return 'info'
  }

  return (
    <div className="ai-testing">
      {/* Header */}
      <div className="testing-header">
        <div>
          <h1 className="testing-title">
            <Brain size={32} />
            KI-Videoanalyse Testen
          </h1>
          <p className="testing-subtitle">
            Laden Sie ein Überwachungsvideo hoch und sehen Sie die KI-Analyse in Echtzeit
          </p>
        </div>
      </div>

      {/* Upload Section */}
      {showTestVideos && (
        <div className="upload-section">
          <div className="upload-card">
            <div className="upload-options">
              {/* Test Videos Section */}
              <div className="test-videos-section">
                <div className="section-header">
                  <Film size={24} />
                  <h3>Test-Videos verwenden</h3>
                </div>
                
                {loadingVideos ? (
                  <div className="loading-videos">
                    <Loader className="spinning" size={32} />
                    <p>Lade Videos...</p>
                  </div>
                ) : testVideos.length > 0 ? (
                  <div className="test-videos-grid">
                    {testVideos.map((video) => (
                      <div
                        key={video.filename}
                        className="test-video-card"
                        onClick={() => handleTestVideoSelect(video)}
                      >
                        <div className="video-thumbnail">
                          <img
                            src={`https://python.ghiblification.ai/thumbnail/${video.filename}`}
                            alt={video.filename}
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div className="thumbnail-placeholder" style={{ display: 'none' }}>
                            <Video size={48} />
                          </div>
                          <div className="play-overlay">
                            <Play size={32} />
                          </div>
                        </div>
                        <div className="video-info-card">
                          <div className="video-name">{video.filename}</div>
                          <div className="video-meta">
                            <span className="video-size">
                              {formatFileSize(video.size)}
                            </span>
                            <span className="video-duration">
                              <Clock size={14} />
                              {formatDuration(video.duration)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-test-videos">
                    <Video size={48} />
                    <p>Keine Test-Videos verfügbar</p>
                    <p className="hint">Laden Sie Videos in den Backend-Ordner "uploads" hoch</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="divider-section">
                <div className="divider-line"></div>
                <span className="divider-text">ODER</span>
                <div className="divider-line"></div>
              </div>

              {/* Upload New Video Section */}
              <div className="upload-new-section">
                <div className="section-header">
                  <Upload size={24} />
                  <h3>Neues Video hochladen</h3>
                </div>
                <div 
                  className="upload-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={48} className="upload-icon" />
                  <h3>Video hochladen</h3>
                  <p>Klicken Sie hier oder ziehen Sie ein Video hierher</p>
                  <p className="upload-hint">Unterstützte Formate: MP4, AVI, MOV</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Video Section */}
      {!showTestVideos && (selectedFile || selectedTestVideo) && (
        <div className="upload-section">
          <div className="upload-card">
            <div className="file-selected">
              <Video size={48} className="file-icon" />
              <div className="file-info">
                <h3>{selectedFile ? selectedFile.name : selectedTestVideo.filename}</h3>
                <p>
                  {selectedFile 
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                    : `${formatFileSize(selectedTestVideo.size)} • ${formatDuration(selectedTestVideo.duration)}`
                  }
                </p>
              </div>
              <button 
                className="btn-remove"
                onClick={handleReset}
                disabled={isProcessing}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {uploadStatus === 'idle' && (
              <button 
                className="btn-primary btn-process"
                onClick={handleUploadAndProcess}
              >
                <Zap size={20} />
                Video analysieren
              </button>
            )}

            {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
              <div className="upload-progress">
                <div className="progress-header">
                  <span className="progress-label">
                    {uploadStatus === 'uploading' ? 'Hochladen...' : 'Verarbeitung läuft...'}
                  </span>
                  <span className="progress-value">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="progress-stats">
                  <span>Frame {stats.currentFrame} / {stats.totalFrames}</span>
                  <span>{stats.fps} FPS</span>
                </div>
              </div>
            )}

            {uploadStatus === 'complete' && (
              <div className="status-message success">
                <CheckCircle size={20} />
                Analyse abgeschlossen!
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="status-message error">
                <XCircle size={20} />
                Fehler bei der Verarbeitung. Bitte versuchen Sie es erneut.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Section */}
      {(isProcessing || uploadStatus === 'complete') && (
        <>
          {/* Stats Grid */}
          <div className="results-stats">
            <div className="stat-card-test">
              <div className="stat-icon-test">
                <Activity size={24} />
              </div>
              <div className="stat-content-test">
                <div className="stat-value-test">{stats.currentFrame}</div>
                <div className="stat-label-test">Aktueller Frame</div>
              </div>
            </div>
            <div className="stat-card-test">
              <div className="stat-icon-test">
                <Users size={24} />
              </div>
              <div className="stat-content-test">
                <div className="stat-value-test">{stats.personCount}</div>
                <div className="stat-label-test">Erkannte Personen</div>
              </div>
            </div>
            <div className="stat-card-test">
              <div className="stat-icon-test">
                <AlertTriangle size={24} />
              </div>
              <div className="stat-content-test">
                <div className="stat-value-test">{stats.eventCount}</div>
                <div className="stat-label-test">Ereignisse</div>
              </div>
            </div>
            <div className="stat-card-test">
              <div className="stat-icon-test">
                <Zap size={24} />
              </div>
              <div className="stat-content-test">
                <div className="stat-value-test">{stats.fps}</div>
                <div className="stat-label-test">FPS</div>
              </div>
            </div>
          </div>

          {/* Video and Events Grid */}
          <div className="results-grid">
            {/* Video Display */}
            <div className="video-display-card">
              <div className="card-header">
                <h2>
                  <Eye size={20} />
                  Verarbeitetes Video
                </h2>
                {isProcessing && (
                  <div className="processing-badge">
                    <Loader size={16} className="spinning" />
                    Live
                  </div>
                )}
              </div>
              <div className="video-container">
                {processedFrame ? (
                  <img 
                    src={processedFrame} 
                    alt="Processed frame"
                    className="processed-frame"
                  />
                ) : (
                  <div className="video-placeholder">
                    <Video size={64} />
                    <p>Warten auf Frames...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Events List */}
            <div className="events-display-card">
              <div className="card-header">
                <h2>
                  <Activity size={20} />
                  Echtzeit-Ereignisse
                </h2>
                <span className="event-count">{events.length}</span>
              </div>
              <div className="events-scroll">
                {events.length === 0 ? (
                  <div className="no-events">
                    <Activity size={48} className="no-events-icon" />
                    <p>Keine Ereignisse bisher</p>
                  </div>
                ) : (
                  <div className="events-list-test">
                    {events.map((event) => (
                      <div 
                        key={event.id} 
                        className={`event-item-test ${getEventClass(event)}`}
                      >
                        <div className="event-icon-container">
                          {getEventIcon(event.type, event.severity)}
                        </div>
                        <div className="event-details">
                          <div className="event-message-test">{event.message}</div>
                          <div className="event-meta-test">
                            <span className="event-type-badge">{event.type}</span>
                            <span className="event-frame">Frame {event.frame}</span>
                            {event.severity && (
                              <span className={`event-severity ${event.severity}`}>
                                {event.severity === 'high' ? 'Hoch' : 
                                 event.severity === 'medium' ? 'Mittel' : 'Niedrig'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      {uploadStatus === 'complete' && (
        <div className="action-buttons">
          <button className="btn-secondary" onClick={handleReset}>
            <Upload size={18} />
            Neues Video analysieren
          </button>
        </div>
      )}
    </div>
  )
}

export default AITesting