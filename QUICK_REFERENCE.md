# 🚀 Quick Reference Guide

## 📂 File Purposes

### Backend Files

| File | Purpose | Key Code |
|------|---------|----------|
| `server.js` | Main backend server | Creates metrics, handles HTTP requests |
| `package.json` | Dependencies list | Lists: express, cors, prom-client |

### Frontend Files

| File | Purpose | Key Code |
|------|---------|----------|
| `App.jsx` | Main controller | Fetches data, manages state |
| `Dashboard.jsx` | Layout component | Organizes all charts/cards |
| `MetricCard.jsx` | Shows single metric | Revenue, Orders, etc. |
| `SalesChart.jsx` | Line chart | Revenue/orders trend |
| `ActiveUsersChart.jsx` | Bar chart | Users and sessions |
| `TrafficChart.jsx` | Pie chart | Traffic sources |
| `ServerHealth.jsx` | Progress bars | CPU, Memory, Disk |
| `Header.jsx` | Top navigation | Title and live indicator |

---

## 🎯 Key Functions Explained

### Backend (server.js)

#### `updateMetrics()`
```javascript
function updateMetrics() {
    const revenue = rand(2000, 10000);  // Generate random revenue
    currentMetrics.revenue = revenue;    // Store for later
    revenueCounter.inc(revenue);         // Update Prometheus metric
}
```
**Purpose:** Generates new random metrics every 5 seconds

#### `GET /api/metrics`
```javascript
app.get('/api/metrics', async (req, res) => {
    res.json(currentMetrics);  // Send current data as JSON
});
```
**Purpose:** Sends current metrics to frontend when requested

#### `GET /metrics`
```javascript
app.get('/metrics', async (req, res) => {
    const metrics = await register.metrics();  // Get Prometheus format
    res.end(metrics);
});
```
**Purpose:** Exports metrics in Prometheus format (for Grafana)

---

### Frontend (App.jsx)

#### `fetchMetrics()`
```javascript
const fetchMetrics = async () => {
    const response = await axios.get('http://localhost:5000/api/metrics');
    setMetrics(response.data);  // Update state → triggers re-render
};
```
**Purpose:** Gets latest data from backend and updates UI

#### `useEffect()`
```javascript
useEffect(() => {
    fetchMetrics();                          // Run immediately
    const interval = setInterval(fetchMetrics, 5000);  // Run every 5s
    return () => clearInterval(interval);    // Cleanup
}, []);
```
**Purpose:** Auto-fetches data when page loads and every 5 seconds

---

## 🔄 Data Flow (Simple)

```
1. Backend Timer (every 5s)
   → Runs updateMetrics()
   → Generates random numbers
   → Stores in currentMetrics

2. Frontend Timer (every 5s)
   → Runs fetchMetrics()
   → Calls GET /api/metrics
   → Backend responds with currentMetrics
   → Frontend updates React state
   → UI re-renders with new values
```

---

## 📊 What Each Metric Means

| Metric | Type | Meaning | Range |
|--------|------|---------|-------|
| **revenue** | Counter | Total money earned | $2,000 - $10,000 |
| **orders** | Counter | Number of orders placed | 50 - 500 |
| **conversionRate** | Gauge | % of visitors who buy | 1% - 5% |
| **activeUsers** | Gauge | Users currently online | 20 - 200 |
| **sessions** | Gauge | Active browsing sessions | 100 - 500 |
| **trafficDirect** | Gauge | Direct website visits | 10 - 50 |
| **trafficSocial** | Gauge | Visits from social media | 10 - 50 |
| **trafficReferral** | Gauge | Visits from other sites | 10 - 50 |
| **cpu** | Gauge | CPU usage percentage | 0% - 100% |
| **memory** | Gauge | RAM usage percentage | 0% - 100% |
| **disk** | Gauge | Disk space used | 0% - 100% |
| **network** | Gauge | Network speed (Mbps) | 50 - 1000 |
| **failedRequests** | Counter | Number of errors | 0 - 5 |
| **latency** | Gauge | Response time (ms) | 100 - 1000 |
| **downtime** | Counter | Minutes offline | 0 - 1 |

---

## 🎨 React Component Props

### MetricCard
```javascript
<MetricCard
  title="💰 Total Revenue"       // Card header
  value="$6,543"                  // Main number
  subtitle="Last 24 hours"        // Small text
  trend="+12.5%"                  // Percentage change
  trendUp={true}                  // Green (true) or red (false)
  bgColor="bg-gradient-to-br..."  // Tailwind color
/>
```

### ServerHealth
```javascript
<ServerHealth 
  cpu={45.2}      // CPU percentage
  memory={62.8}   // Memory percentage
  disk={38.5}     // Disk percentage
  network={532}   // Network Mbps
/>
```

### TrafficChart
```javascript
<TrafficChart 
  trafficSources={{
    direct: 32,
    social: 28,
    referral: 27
  }}
/>
```

---

## 🛠️ How to Customize

### Change Update Frequency

**Backend (server.js):**
```javascript
// Change from 5 seconds to 10 seconds
setInterval(updateMetrics, 10000);  // 10000ms = 10 seconds
```

**Frontend (App.jsx):**
```javascript
// Change from 5 seconds to 10 seconds
const interval = setInterval(fetchMetrics, 10000);
```

### Change Data Ranges

**Backend (server.js):**
```javascript
// Make revenue higher (between 10,000 and 50,000)
const revenue = rand(10000, 50000);

// Make orders lower (between 10 and 100)
const orders = rand(10, 100);
```

### Add New Metric

**Backend (server.js):**
```javascript
// 1. Create Prometheus metric
const salesGauge = new client.Gauge({
  name: 'ecom_sales_count',
  help: 'Number of sales',
  registers: [register],
});

// 2. Add to currentMetrics
let currentMetrics = {
  // ... existing metrics
  sales: 0,  // Add this
};

// 3. Update in updateMetrics()
function updateMetrics() {
  const sales = rand(50, 200);
  currentMetrics.sales = sales;
  salesGauge.set(sales);
}

// 4. Include in /api/metrics response
app.get('/api/metrics', async (req, res) => {
  const data = {
    // ... existing metrics
    sales: Math.floor(currentMetrics.sales),  // Add this
  };
  res.json(data);
});
```

**Frontend (Dashboard.jsx):**
```javascript
// Add a new card
<MetricCard
  title="🛒 Total Sales"
  value={metrics.sales || 0}
  subtitle="Today"
  trend="+5%"
  trendUp={true}
  bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
/>
```

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill the process using port 5000
# Or change port in server.js:
const PORT = 5001;  // Use different port
```

### Frontend can't connect to backend?
1. Check backend is running: `http://localhost:5000/health`
2. Check CORS is enabled in `server.js`
3. Check frontend is requesting correct URL in `App.jsx`

### Numbers not updating?
1. Open browser console (F12)
2. Check for errors
3. Verify both timers are running:
   - Backend: `setInterval(updateMetrics, 5000)`
   - Frontend: `setInterval(fetchMetrics, 5000)`

---

## 📝 Testing Checklist

- [ ] Backend starts without errors
- [ ] Visit `http://localhost:5000/health` → Shows "healthy"
- [ ] Visit `http://localhost:5000/api/metrics` → Shows JSON
- [ ] Visit `http://localhost:5000/metrics` → Shows Prometheus format
- [ ] Frontend starts without errors
- [ ] Visit `http://localhost:3000` → Dashboard loads
- [ ] Numbers change every 5 seconds
- [ ] Charts animate smoothly
- [ ] No console errors (F12)

---

## 🎯 What You've Built

✅ Real-time dashboard with live updates
✅ Backend API with Prometheus metrics
✅ Beautiful UI with Tailwind CSS
✅ Multiple chart types (Line, Bar, Pie)
✅ Responsive design (works on mobile)
✅ Production-ready architecture

**Next Steps:**
1. Replace random data with real database
2. Set up Prometheus server
3. Create Grafana dashboards
4. Add authentication
5. Deploy to production

---

**You now have a working real-time analytics dashboard!** 🎉
