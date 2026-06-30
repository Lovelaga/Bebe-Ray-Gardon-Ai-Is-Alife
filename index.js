const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bebe Ray Gardon AI - Is Alife</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }
        h1 {
          text-align: center;
          margin-bottom: 10px;
        }
        p {
          text-align: center;
          font-size: 18px;
          opacity: 0.9;
        }
        .status {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
        }
        .status h2 {
          margin: 0;
          font-size: 24px;
        }
      </style>
    </head>
    <body>
      <h1>🤖 Bebe Ray Gardon AI</h1>
      <p>Is Alife - Exploring Artificial Life</p>
      <div class="status">
        <h2>✅ Server Running</h2>
        <p>Port: ${PORT}</p>
        <p>Status: Operational</p>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint (for Docker healthcheck)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API endpoint example
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Bebe Ray Gardon AI',
    description: 'Is Alife - Exploring Artificial Life',
    version: '1.0.0',
    status: 'running',
    port: PORT
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT}`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
  console.log(`📊 API Info: http://localhost:${PORT}/api/info`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received: closing server');
  process.exit(0);
});
