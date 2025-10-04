# 🎨 Visual Data Flow Diagram

## Simple Version

```
USER OPENS BROWSER
       ↓
   localhost:3000 (React App Loads)
       ↓
   App.jsx runs useEffect()
       ↓
   axios.get('http://localhost:5000/api/metrics')  ← Makes HTTP Request
       ↓
   Backend receives request
       ↓
   Returns JSON: { revenue: 6543, orders: 234, cpu: 45.2, ... }
       ↓
   Frontend receives JSON
       ↓
   setMetrics(data) ← Updates React State
       ↓
   React Re-renders Dashboard
       ↓
   USER SEES: Charts, Numbers, Graphs
       ↓
   ⏰ Wait 5 seconds...
       ↓
   🔁 REPEAT (Fetch again)
```

---

## Detailed Version

```
┌────────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVER                              │
│                     (localhost:5000)                               │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  server.js STARTS                                        │    │
│  │                                                          │    │
│  │  1. Creates Prometheus Metrics Objects                  │    │
│  │     - revenueCounter                                    │    │
│  │     - ordersCounter                                     │    │
│  │     - cpuGauge, memoryGauge, etc.                      │    │
│  │                                                          │    │
│  │  2. Creates currentMetrics = { revenue: 0, ... }       │    │
│  │                                                          │    │
│  │  3. Starts Timer: setInterval(updateMetrics, 5000)     │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Every 5 seconds:                                                 │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  updateMetrics() function runs                          │    │
│  │                                                          │    │
│  │  revenue = rand(2000, 10000)  → 6543                   │    │
│  │  orders = rand(50, 500)       → 234                    │    │
│  │  cpu = rand(0, 100)           → 45.2                   │    │
│  │                                                          │    │
│  │  currentMetrics.revenue = 6543                         │    │
│  │  currentMetrics.orders = 234                           │    │
│  │  currentMetrics.cpu = 45.2                             │    │
│  │                                                          │    │
│  │  revenueCounter.inc(6543)  (for Prometheus)            │    │
│  │  cpuGauge.set(45.2)        (for Prometheus)            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  API Endpoints Available:                                         │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  GET /api/metrics                                        │    │
│  │  → Returns JSON from currentMetrics object              │    │
│  │                                                          │    │
│  │  GET /metrics                                           │    │
│  │  → Returns Prometheus format                            │    │
│  └──────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
                              ↑
                              │ HTTP Request
                              │ GET /api/metrics
                              │
┌────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (REACT)                            │
│                     (localhost:3000)                               │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  App.jsx LOADS                                           │    │
│  │                                                          │    │
│  │  const [metrics, setMetrics] = useState(null)           │    │
│  │                                                          │    │
│  │  useEffect(() => {                                      │    │
│  │    fetchMetrics()  ← Runs immediately                  │    │
│  │    setInterval(fetchMetrics, 5000)  ← Every 5 sec      │    │
│  │  }, [])                                                 │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  fetchMetrics() function                                 │    │
│  │                                                          │    │
│  │  1. Makes HTTP request:                                 │    │
│  │     axios.get('http://localhost:5000/api/metrics')      │    │
│  │                                                          │    │
│  │  2. Receives response:                                  │    │
│  │     {                                                   │    │
│  │       revenue: 6543,                                   │    │
│  │       orders: 234,                                     │    │
│  │       cpu: 45.2,                                       │    │
│  │       memory: 62.8,                                    │    │
│  │       ...                                              │    │
│  │     }                                                   │    │
│  │                                                          │    │
│  │  3. Updates state:                                      │    │
│  │     setMetrics(response.data)                           │    │
│  │                                                          │    │
│  │  4. React detects state change → RE-RENDERS            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Dashboard Component Renders                             │    │
│  │                                                          │    │
│  │  <Dashboard metrics={metrics} />                        │    │
│  │    ├── <MetricCard value={metrics.revenue} />          │    │
│  │    ├── <SalesChart />                                  │    │
│  │    ├── <ServerHealth cpu={metrics.cpu} />              │    │
│  │    └── <TrafficChart trafficSources={...} />           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  USER SEES ON SCREEN:                                    │    │
│  │                                                          │    │
│  │  💰 Revenue: $6,543                                     │    │
│  │  📦 Orders: 234                                         │    │
│  │  [===== CPU: 45.2% =====]                              │    │
│  │  [Chart shows sales trend]                             │    │
│  │  [Pie chart shows traffic]                             │    │
│  └──────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Timeline View

```
TIME: 0:00 - Backend starts
          ├─ Creates metrics objects
          ├─ Sets currentMetrics = { all values: 0 }
          └─ Starts 5-second timer

TIME: 0:00 - Frontend loads in browser
          ├─ App.jsx runs useEffect()
          ├─ Calls fetchMetrics() immediately
          └─ Sets up 5-second polling timer

TIME: 0:01 - Frontend makes first request
          └─ GET http://localhost:5000/api/metrics

TIME: 0:01 - Backend responds
          └─ Sends: { revenue: 0, orders: 0, ... } (initial values)

TIME: 0:01 - Frontend receives data
          ├─ setMetrics({ revenue: 0, ... })
          ├─ React re-renders
          └─ User sees dashboard with initial data

TIME: 0:05 - Backend timer fires (1st time)
          ├─ updateMetrics() runs
          ├─ Generates: revenue=6543, orders=234, cpu=45.2
          └─ Stores in currentMetrics object

TIME: 0:06 - Frontend timer fires (1st poll)
          └─ GET http://localhost:5000/api/metrics

TIME: 0:06 - Backend responds with NEW data
          └─ Sends: { revenue: 6543, orders: 234, cpu: 45.2, ... }

TIME: 0:06 - Frontend updates
          ├─ setMetrics({ revenue: 6543, ... })
          ├─ React re-renders
          └─ 🎉 User sees numbers CHANGE!

TIME: 0:10 - Backend generates new random values again
TIME: 0:11 - Frontend fetches again
TIME: 0:11 - 🎉 Numbers change again!

TIME: 0:15 - Backend generates new values
TIME: 0:16 - Frontend fetches
TIME: 0:16 - 🎉 Numbers change again!

... and so on FOREVER (until you close the page/server)
```

---

## Component Tree

```
Browser Window (localhost:3000)
│
└── <App />
    │
    ├── State: metrics = { revenue, orders, cpu, ... }
    │
    ├── useEffect Hook
    │   ├── Runs on mount: fetchMetrics()
    │   └── Sets interval: every 5s → fetchMetrics()
    │
    ├── <Header />
    │   └── Shows: "EcomPulse" title, "Live" indicator
    │
    └── <Dashboard metrics={metrics} />
        │
        ├── <MetricCard title="Revenue" value={metrics.revenue} />
        ├── <MetricCard title="Orders" value={metrics.orders} />
        ├── <MetricCard title="Active Users" value={metrics.activeUsers} />
        │
        ├── <SalesChart />
        │   └── Shows line chart (uses Recharts library)
        │
        ├── <ActiveUsersChart activeUsers={metrics.activeUsers} />
        │   └── Shows bar chart
        │
        ├── <TrafficChart trafficSources={metrics.trafficSources} />
        │   └── Shows pie chart
        │
        └── <ServerHealth cpu={metrics.cpu} memory={metrics.memory} />
            └── Shows progress bars
```

---

## Data Format Comparison

### JSON API Response (for React)
```json
{
  "revenue": 6543,
  "orders": 234,
  "conversionRate": 3.45,
  "activeUsers": 87,
  "sessions": 245,
  "trafficSources": {
    "direct": 32,
    "social": 28,
    "referral": 27
  },
  "cpu": 45.2,
  "memory": 62.8,
  "disk": 38.5,
  "network": 532,
  "failedRequests": 3,
  "latency": 245,
  "downtime": 0
}
```

### Prometheus Format (for Grafana)
```
# HELP ecom_revenue_total Total revenue generated
# TYPE ecom_revenue_total counter
ecom_revenue_total 6543

# HELP ecom_orders_total Total number of orders
# TYPE ecom_orders_total counter
ecom_orders_total 234

# HELP ecom_server_cpu_usage CPU usage percentage
# TYPE ecom_server_cpu_usage gauge
ecom_server_cpu_usage 45.2

# HELP ecom_active_users Number of currently active users
# TYPE ecom_active_users gauge
ecom_active_users 87
```

---

## Key Takeaways

1. **Backend generates random data every 5 seconds** (simulating real metrics)
2. **Frontend fetches this data every 5 seconds** via HTTP request
3. **React state updates trigger automatic re-render** (makes it look "live")
4. **Data is stored in TWO formats:**
   - JSON for React frontend
   - Prometheus format for Grafana (future use)
5. **Everything is automatic** - no manual refresh needed!
