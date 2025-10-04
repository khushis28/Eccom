# EcomPulse Backend

Node.js Express server with **Prometheus** metrics integration for real-time e-commerce analytics.

## Features

- 📊 **Prometheus Metrics Export** - `/metrics` endpoint in Prometheus format
- 🔗 **JSON API** - `/api/metrics` for frontend consumption
- 💰 Sales metrics (revenue, orders, conversion rate)
- 👥 User behavior tracking (active users, sessions, traffic sources)
- 🖥️ Server health monitoring (CPU, memory, disk, network)
- ⚠️ Error monitoring (failed requests, latency, downtime)

## Tech Stack

- **Express.js** - Web framework
- **prom-client** - Prometheus metrics library
- **CORS** - Cross-origin resource sharing

## Installation

```bash
npm install
```

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### 1. Prometheus Metrics (for Grafana)
```
GET http://localhost:5000/metrics
```
Returns metrics in Prometheus format that can be scraped by Prometheus server.

### 2. JSON API (for React Frontend)
```
GET http://localhost:5000/api/metrics
```
Returns metrics in JSON format:
```json
{
  "revenue": 5234,
  "orders": 156,
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

### 3. Health Check
```
GET http://localhost:5000/health
```

## Prometheus Metrics

The following custom metrics are exported:

### Counters
- `ecom_revenue_total` - Total revenue generated
- `ecom_orders_total` - Total number of orders
- `ecom_failed_requests_total` - Total failed requests
- `ecom_downtime_minutes` - Total downtime

### Gauges
- `ecom_conversion_rate` - Current conversion rate
- `ecom_active_users` - Active users count
- `ecom_sessions` - Active sessions
- `ecom_traffic_direct` - Direct traffic
- `ecom_traffic_social` - Social media traffic
- `ecom_traffic_referral` - Referral traffic
- `ecom_server_cpu_usage` - CPU usage %
- `ecom_server_memory_usage` - Memory usage %
- `ecom_server_disk_usage` - Disk usage %
- `ecom_server_network_mbps` - Network traffic
- `ecom_request_latency_ms` - Request latency

## Next Steps

1. Set up Prometheus to scrape metrics from `http://localhost:5000/metrics`
2. Configure Grafana to use Prometheus as data source
3. Create Grafana dashboards to visualize the metrics
4. Connect React frontend to `http://localhost:5000/api/metrics`
