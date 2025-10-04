# 📊 EcomPulse - Real-Time E-Commerce Analytics Dashboard

A complete real-time analytics dashboard solution with **Prometheus metrics** and **React frontend**, following the exact problem statement requirements.

## 🎯 Project Structure

```
ecom-analytics-dashboard/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── SalesChart.jsx
│   │   │   ├── ActiveUsersChart.jsx
│   │   │   ├── TrafficChart.jsx
│   │   │   └── ServerHealth.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
└── backend/                  # Express + Prometheus
    ├── server.js
    ├── package.json
    └── README.md
```

## ✅ Features Implemented

### Backend (Node.js + Express + Prometheus)
- ✅ **Prometheus metrics endpoint** (`/metrics`) - Ready for Prometheus scraping
- ✅ **JSON API endpoint** (`/api/metrics`) - For React frontend
- ✅ **Custom metrics** using prom-client library:
  - Counters: revenue, orders, failed requests, downtime
  - Gauges: CPU, memory, disk, network, active users, sessions, traffic sources
- ✅ **Real-time data updates** (every 5 seconds)
- ✅ **CORS enabled** for frontend communication

### Frontend (React + Vite + Tailwind CSS v3)
- ✅ **Beautiful responsive dashboard** with Tailwind CSS
- ✅ **Real-time data visualization** using Recharts library
- ✅ **Live polling** (fetches metrics every 5 seconds)
- ✅ **Multiple chart types**: Line, Bar, Pie charts
- ✅ **Key metrics cards** with trend indicators
- ✅ **Server health monitoring** with progress bars
- ✅ **Error monitoring section**

## 🚀 How to Run

### Terminal 1: Start Backend
```powershell
cd "e:\Web_Dev\(0) All Projects\Khushi\EcomPulse\ecom-analytics-dashboard\backend" ; node server.js
```

**Backend URLs:**
- Server: `http://localhost:5000`
- Prometheus Metrics: `http://localhost:5000/metrics`
- JSON API: `http://localhost:5000/api/metrics`
- Health Check: `http://localhost:5000/health`

### Terminal 2: Start Frontend
```powershell
cd "e:\Web_Dev\(0) All Projects\Khushi\EcomPulse\ecom-analytics-dashboard\frontend" ; npm run dev
```

**Frontend URL:**
- Dashboard: `http://localhost:3000`

## 📊 Monitored Metrics

### 💰 Sales Performance
- Total Revenue (USD)
- Total Orders
- Conversion Rate (%)

### 👥 User Behavior
- Active Users (currently online)
- Active Sessions
- Traffic Sources:
  - Direct traffic
  - Social media traffic
  - Referral traffic

### 🖥️ Server Health
- CPU Usage (%)
- Memory Usage (%)
- Disk Usage (%)
- Network Traffic (Mbps)

### ⚠️ Error Monitoring
- Failed Requests count
- Average Latency (ms)
- Total Downtime (minutes)

## 🔧 Tech Stack

### Backend
- **Express.js** - Web framework
- **prom-client** - Prometheus metrics library
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **Recharts** - Charts and data visualization
- **Axios** - HTTP client for API calls

## 📈 Prometheus Integration

The backend exposes metrics in Prometheus format at `/metrics` endpoint:

```
# HELP ecom_revenue_total Total revenue generated
# TYPE ecom_revenue_total counter
ecom_revenue_total 125430

# HELP ecom_active_users Number of currently active users
# TYPE ecom_active_users gauge
ecom_active_users 87

# HELP ecom_server_cpu_usage CPU usage percentage
# TYPE ecom_server_cpu_usage gauge
ecom_server_cpu_usage 45.2
```

## 🎨 Dashboard Features

1. **Live Status Indicator** - Shows real-time connection status
2. **Metric Cards** - Quick overview of key metrics with trends
3. **Sales Trend Chart** - 24-hour revenue and orders visualization
4. **User Metrics** - Active users and sessions bar chart
5. **Traffic Sources** - Pie chart showing traffic distribution
6. **Server Health** - Visual progress bars for CPU, memory, disk
7. **Network Monitor** - Real-time network traffic
8. **Error Dashboard** - Failed requests, latency, and downtime tracking

## 🔮 Next Steps for Grafana Integration

### 1. Install Prometheus
```bash
# Download Prometheus from prometheus.io
# Configure prometheus.yml:
```

```yaml
scrape_configs:
  - job_name: 'ecompulse'
    static_configs:
      - targets: ['localhost:5000']
    metrics_path: '/metrics'
    scrape_interval: 5s
```

### 2. Install Grafana
```bash
# Download Grafana from grafana.com
# Add Prometheus as data source: http://localhost:9090
```

### 3. Create Grafana Dashboard
- Import dashboard or create custom panels
- Query Prometheus metrics (e.g., `ecom_revenue_total`, `ecom_active_users`)
- Set up alerts and notifications

## 📝 Development Commands

### Backend
```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌟 Key Highlights

✅ **Problem Statement Compliance**
- ✅ Real-time analytics dashboard for e-commerce
- ✅ Prometheus integration for metrics collection
- ✅ Ready for Grafana visualization
- ✅ Monitors sales, traffic, and server health

✅ **Production Ready**
- Proper error handling
- CORS configuration
- Health check endpoint
- Scalable architecture

✅ **Modern Tech Stack**
- Latest React 18
- Tailwind CSS for styling
- Prometheus standard metrics
- RESTful API design

## 🎯 Current Status

- ✅ Backend: Running on `http://localhost:5000`
- ✅ Frontend: Running on `http://localhost:3000`
- ✅ Prometheus Metrics: Available at `http://localhost:5000/metrics`
- ✅ Real-time Updates: Working (5-second polling)
- ⏳ Prometheus Server: Not set up yet (next step)
- ⏳ Grafana Dashboard: Not set up yet (next step)

---

**Built with ❤️ for EcomPulse Analytics**
