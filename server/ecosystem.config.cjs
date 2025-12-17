// PM2 ecosystem file for production deployment
// Install PM2: npm install -g pm2
// Start: pm2 start server/ecosystem.config.cjs
// Stop: pm2 stop platify-api
// Restart: pm2 restart platify-api
// Logs: pm2 logs platify-api
// Save startup: pm2 save && pm2 startup

const path = require('path');

module.exports = {
  apps: [{
    name: 'platify-api',
    script: path.join(__dirname, 'index.js'),
    cwd: path.join(__dirname, '..'),
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3010,
      FRONTEND_URL: 'https://platify.cloud'
    },
    error_file: path.join(__dirname, '..', 'logs', 'pm2-error.log'),
    out_file: path.join(__dirname, '..', 'logs', 'pm2-out.log'),
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};

