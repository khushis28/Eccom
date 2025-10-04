import express from 'express';
import cors from 'cors';
import client from 'prom-client';

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create a Registry to register the metrics
const register = new client.Registry();

// Add default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// ========================================
// Custom Prometheus Metrics
// ========================================

// 💰 Revenue Counter
const revenueCounter = new client.Counter({
    name: 'ecom_revenue_total',
    help: 'Total revenue generated',
    registers: [register],
});

// 📦 Orders Counter
const ordersCounter = new client.Counter({
    name: 'ecom_orders_total',
    help: 'Total number of orders',
    registers: [register],
});

// 📈 Conversion Rate Gauge
const conversionRateGauge = new client.Gauge({
    name: 'ecom_conversion_rate',
    help: 'Current conversion rate percentage',
    registers: [register],
});

// 👥 Active Users Gauge
const activeUsersGauge = new client.Gauge({
    name: 'ecom_active_users',
    help: 'Number of currently active users',
    registers: [register],
});

// 🔗 Sessions Gauge
const sessionsGauge = new client.Gauge({
    name: 'ecom_sessions',
    help: 'Number of active sessions',
    registers: [register],
});

// 🌐 Traffic Sources Gauges
const trafficDirectGauge = new client.Gauge({
    name: 'ecom_traffic_direct',
    help: 'Direct traffic count',
    registers: [register],
});

const trafficSocialGauge = new client.Gauge({
    name: 'ecom_traffic_social',
    help: 'Social media traffic count',
    registers: [register],
});

const trafficReferralGauge = new client.Gauge({
    name: 'ecom_traffic_referral',
    help: 'Referral traffic count',
    registers: [register],
});

// 🖥️ Server Health Gauges
const cpuGauge = new client.Gauge({
    name: 'ecom_server_cpu_usage',
    help: 'CPU usage percentage',
    registers: [register],
});

const memoryGauge = new client.Gauge({
    name: 'ecom_server_memory_usage',
    help: 'Memory usage percentage',
    registers: [register],
});

const diskGauge = new client.Gauge({
    name: 'ecom_server_disk_usage',
    help: 'Disk usage percentage',
    registers: [register],
});

const networkGauge = new client.Gauge({
    name: 'ecom_server_network_mbps',
    help: 'Network traffic in Mbps',
    registers: [register],
});

// ⚠️ Error Monitoring
const failedRequestsCounter = new client.Counter({
    name: 'ecom_failed_requests_total',
    help: 'Total number of failed requests',
    registers: [register],
});

const latencyGauge = new client.Gauge({
    name: 'ecom_request_latency_ms',
    help: 'Average request latency in milliseconds',
    registers: [register],
});

const downtimeCounter = new client.Counter({
    name: 'ecom_downtime_minutes',
    help: 'Total downtime in minutes',
    registers: [register],
});

// ========================================
// Helper Functions
// ========================================

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min, max) => Math.random() * (max - min) + min;

// Store current metric values for easy access
let currentMetrics = {
    revenue: 0,
    orders: 0,
    conversionRate: 0,
    activeUsers: 0,
    sessions: 0,
    trafficDirect: 0,
    trafficSocial: 0,
    trafficReferral: 0,
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    failedRequests: 0,
    latency: 0,
    downtime: 0,
};

// Simulate real-time metrics updates
function updateMetrics() {
    // Sales Performance
    const revenue = rand(2000, 10000);
    const orders = rand(50, 500);
    const conversionRate = randFloat(1, 5);

    currentMetrics.revenue = revenue;
    currentMetrics.orders = orders;
    currentMetrics.conversionRate = conversionRate;

    revenueCounter.inc(revenue);
    ordersCounter.inc(orders);
    conversionRateGauge.set(conversionRate);

    // User Behavior
    const activeUsers = rand(20, 200);
    const sessions = rand(100, 500);

    currentMetrics.activeUsers = activeUsers;
    currentMetrics.sessions = sessions;

    activeUsersGauge.set(activeUsers);
    sessionsGauge.set(sessions);

    // Traffic Sources
    const trafficDirect = rand(10, 50);
    const trafficSocial = rand(10, 50);
    const trafficReferral = rand(10, 50);

    currentMetrics.trafficDirect = trafficDirect;
    currentMetrics.trafficSocial = trafficSocial;
    currentMetrics.trafficReferral = trafficReferral;

    trafficDirectGauge.set(trafficDirect);
    trafficSocialGauge.set(trafficSocial);
    trafficReferralGauge.set(trafficReferral);

    // Server Health
    const cpu = randFloat(0, 100);
    const memory = randFloat(0, 100);
    const disk = randFloat(0, 100);
    const network = rand(50, 1000);

    currentMetrics.cpu = cpu;
    currentMetrics.memory = memory;
    currentMetrics.disk = disk;
    currentMetrics.network = network;

    cpuGauge.set(cpu);
    memoryGauge.set(memory);
    diskGauge.set(disk);
    networkGauge.set(network);

    // Error Monitoring
    const failedReqs = rand(0, 5);
    const latency = rand(100, 1000);
    const downtime = rand(0, 1);

    currentMetrics.latency = latency;

    if (failedReqs > 0) {
        failedRequestsCounter.inc(failedReqs);
        currentMetrics.failedRequests += failedReqs;
    }

    latencyGauge.set(latency);

    if (downtime > 0) {
        downtimeCounter.inc(downtime);
        currentMetrics.downtime += downtime;
    }
}

// Update metrics every 5 seconds
setInterval(updateMetrics, 5000);
updateMetrics(); // Initial update

// ========================================
// API Routes
// ========================================

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
});

// JSON API endpoint for frontend
app.get('/api/metrics', async (req, res) => {
    try {
        // Return current metrics stored in memory
        const data = {
            revenue: Math.floor(currentMetrics.revenue),
            orders: Math.floor(currentMetrics.orders),
            conversionRate: parseFloat(currentMetrics.conversionRate.toFixed(2)),
            activeUsers: Math.floor(currentMetrics.activeUsers),
            sessions: Math.floor(currentMetrics.sessions),
            trafficSources: {
                direct: Math.floor(currentMetrics.trafficDirect),
                social: Math.floor(currentMetrics.trafficSocial),
                referral: Math.floor(currentMetrics.trafficReferral),
            },
            cpu: parseFloat(currentMetrics.cpu.toFixed(2)),
            memory: parseFloat(currentMetrics.memory.toFixed(2)),
            disk: parseFloat(currentMetrics.disk.toFixed(2)),
            network: Math.floor(currentMetrics.network),
            failedRequests: Math.floor(currentMetrics.failedRequests),
            latency: Math.floor(currentMetrics.latency),
            downtime: Math.floor(currentMetrics.downtime),
        };

        res.json(data);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '📊 EcomPulse Backend API',
        endpoints: {
            metrics: '/metrics (Prometheus format)',
            api: '/api/metrics (JSON format)',
            health: '/health',
        },
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Prometheus metrics: http://localhost:${PORT}/metrics`);
    console.log(`🔗 JSON API: http://localhost:${PORT}/api/metrics`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
