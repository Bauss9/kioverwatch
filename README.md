# Overwatch Dashboard

A professional dark-themed AI monitoring dashboard built with React and Vite.

## Features

### Authentication & Setup
- **Login System** - Secure login with username/password (admin/admin for demo)
- **Session Management** - Token-based authentication with 24-hour auto-logout
- **First-Time Setup Wizard** - Animated camera detection and configuration wizard
- **Local Storage Persistence** - All settings saved locally

### Dashboard
- **Real-time AI Status Monitoring** - Toggle AI detection and monitoring systems on/off
- **Live Statistics** - Track active cameras, detections, threats, and system uptime
- **System Monitoring** - CPU, Storage, and Bandwidth usage
- **Camera Grid** - Monitor 12 camera feeds with status indicators
- **Recent Activity Log** - View real-time events with severity levels in German

### Camera Management
- **Camera Overview** - Full camera management with search and filtering
- **Live Status** - Real-time active/offline/recording indicators
- **Camera Details** - FPS, quality, and technical specifications
- **Interactive Controls** - Hover controls for fullscreen, settings, downloads

### AI Management
- **AI Model Control** - Toggle and configure 4 different AI detection models
- **Detection Zones** - Configure sensitivity zones for specific cameras
- **Global Settings** - Adjust confidence thresholds, delays, and alert frequency
- **Performance Optimization** - Auto-learning and night mode settings
- **Persistent Settings** - All configurations saved to localStorage

### Settings
- **Account Settings** - Manage username, email, password
- **Notifications** - Configure email, push, SMS alerts
- **Security** - Two-factor authentication, auto-logout timing
- **Storage Management** - Retention policies, auto-delete, compression
- **Privacy Controls** - Data anonymization and analytics sharing
- **All Settings Persist** - Saved locally with visual confirmation

### Design
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Theme** - Professional purple/blue gradient theme with smooth animations
- **Glass Morphism** - Modern frosted glass effects throughout
- **Smooth Animations** - Professional transitions and micro-interactions
- **German Language** - Complete German localization

## Tech Stack

- React 18
- Vite
- Lucide React (Icons)
- CSS3 with animations

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Login Credentials
- **Username**: `admin`
- **Password**: `admin`

### First Time Setup
On first login, you'll be greeted with a setup wizard:
1. Click "Kameras erkennen" to start camera detection
2. Wait for the animated search (5 seconds)
3. Name your cameras and assign zones
4. Click "Einrichtung abschließen"

Your cameras will be saved and ready to use!

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
ai-overwatch/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   └── Dashboard.css
│   ├── App.jsx                # Main app component
│   ├── App.css
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Dashboard Features

### Hero Section
- AI Detection toggle with animated orb
- Monitoring system toggle
- Real-time status indicators

### Statistics Cards
- Active/Total Cameras
- Today's Detections
- Active Threats
- System Uptime

### Camera Feed
- Grid view of all cameras
- Status indicators (Active/Offline)
- Placeholder for video feeds (ready for integration)

### Recent Activity
- Color-coded events (Info/Warning/Danger)
- Camera location tracking
- Timestamp for each event

## Customization

### Adding Real Camera Feeds
Replace the placeholder in `Dashboard.jsx` camera grid section with actual video streams.

### Color Scheme
Main colors defined in CSS:
- Primary Purple: `#8b5cf6`
- Secondary Blue: `#6366f1`
- Success Green: `#10b981`
- Warning Orange: `#f59e0b`
- Danger Red: `#ef4444`

### Navigation
Add more menu items in `Sidebar.jsx` menuItems array.

## Notes

### Local Storage Features
- **Authentication Token** - 24-hour session with auto-logout
- **Setup Status** - First-time wizard only shows once
- **Camera Configuration** - All camera settings persist
- **AI Settings** - Model states, zones, and sensitivity levels saved
- **App Settings** - Notifications, security, storage preferences saved

### Data Persistence
All user preferences are stored in browser's localStorage:
- `authToken` - Authentication token
- `tokenExpiry` - Token expiration timestamp
- `setupCompleted` - Setup wizard completion status
- `cameras` - Camera configuration from setup wizard
- `aiModels` - AI model states and settings
- `detectionZones` - Detection zone configurations
- `aiSettings` - Global AI settings
- `appSettings` - App preferences and user settings

### Reset Instructions
To reset the app (show setup wizard again):
```javascript
localStorage.clear()
```
Then refresh the page.

### Development Notes
- All camera feeds are currently placeholders - ready for video stream integration
- Statistics are mock data - connect to your backend API
- Event log uses sample data - integrate with real-time event stream
- All toggles and settings work locally - backend integration ready

Enjoy your Overwatch Dashboard!
