# PM2 Setup for Platify API Server

PM2 is now installed and configured to run the API server with auto-restart and startup on boot.

## Current Status

The server is running via PM2 and will:
- ✅ Auto-restart on crashes
- ✅ Start automatically on system reboot
- ✅ Log all output to `/root/platify-core/logs/`

## Useful Commands

### Start/Stop/Restart
```bash
npm run start:pm2      # Start server with PM2
npm run stop:pm2       # Stop server
npm run restart:pm2    # Restart server
npm run pm2:status     # Check server status
npm run pm2:logs       # View server logs
```

### PM2 Direct Commands
```bash
pm2 status                    # View all PM2 processes
pm2 logs platify-api          # View logs (Ctrl+C to exit)
pm2 logs platify-api --lines 50  # View last 50 lines
pm2 monit                     # Monitor CPU/Memory usage
pm2 restart platify-api       # Restart the server
pm2 stop platify-api          # Stop the server
pm2 delete platify-api        # Remove from PM2 (use stop:pm2 instead)
```

### Maintenance
```bash
pm2 save                      # Save current process list
pm2 startup                   # Re-run if system changes
pm2 unstartup systemd         # Remove startup script
```

## Configuration

- **Config file**: `server/ecosystem.config.cjs`
- **Process name**: `platify-api`
- **Port**: 3010 (from PORT env var or default)
- **Logs**: `logs/pm2-out.log` and `logs/pm2-error.log`
- **Auto-restart**: Enabled
- **Start on boot**: Enabled via systemd

## Troubleshooting

If the server isn't starting:
1. Check logs: `pm2 logs platify-api`
2. Check status: `pm2 status`
3. Verify port isn't in use: `lsof -i :3010`
4. Restart: `pm2 restart platify-api`

If you need to update the startup script:
```bash
pm2 unstartup systemd
pm2 startup
pm2 save
```

