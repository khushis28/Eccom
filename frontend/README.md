# EcomPulse Frontend

Real-time E-Commerce Analytics Dashboard built with React, Vite, and Tailwind CSS v4.

## Features

- 📊 Real-time metrics visualization
- 💰 Sales performance tracking
- 👥 Active user monitoring
- 🌐 Traffic source analytics
- 🖥️ Server health monitoring
- ⚠️ Error tracking and alerts

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Recharts** - Charts and data visualization
- **Axios** - HTTP client

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

The frontend connects to the backend at `http://localhost:5000/api/metrics`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Dashboard.jsx
│   ├── MetricCard.jsx
│   ├── SalesChart.jsx
│   ├── ActiveUsersChart.jsx
│   ├── TrafficChart.jsx
│   └── ServerHealth.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## API Integration

The dashboard fetches metrics from the backend every 5 seconds for real-time updates.

Metrics include:
- Revenue, Orders, Conversion Rate
- Active Users, Sessions
- Traffic Sources (Direct, Social, Referral)
- Server Health (CPU, Memory, Disk, Network)
- Error Monitoring (Failed Requests, Latency, Downtime)
