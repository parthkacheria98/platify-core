# Production Deployment Guide

This guide explains how to deploy the Platify website with the contact form email functionality.

## Prerequisites

- Node.js (v18 or higher)
- Nginx installed and running
- PM2 (for process management) - `npm install -g pm2`
- SSL certificate (Let's Encrypt recommended)

## Step 1: Deploy Backend Server

1. **Upload your code** to your server (e.g., `/var/www/platify-core`)

2. **Install dependencies:**
   ```bash
   cd /var/www/platify-core
   npm install
   ```

3. **Create `.env` file** in the root directory:
   ```bash
   nano .env
   ```
   
   Add the following:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=parthkacheria@gmail.com
   SMTP_PASSWORD=bqvx rdlk vpqt phic
   PORT=3001
   FRONTEND_URL=https://platify.cloud
   ```

4. **Start the backend server with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

   This will:
   - Start the server on port 3001
   - Auto-restart on server reboot
   - Keep logs in `./logs/` directory

5. **Verify the server is running:**
   ```bash
   curl http://localhost:3001/health
   ```
   Should return: `{"status":"ok"}`

## Step 2: Build Frontend

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **The built files will be in `dist/` directory**

## Step 3: Configure Nginx

1. **Copy the nginx configuration:**
   ```bash
   sudo cp nginx.conf.example /etc/nginx/sites-available/platify.cloud
   ```

2. **Edit the configuration** to match your setup:
   ```bash
   sudo nano /etc/nginx/sites-available/platify.cloud
   ```
   
   Update:
   - `root` path to point to your `dist` directory (e.g., `/var/www/platify-core/dist`)
   - SSL certificate paths if different
   - Server name if different

3. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/platify.cloud /etc/nginx/sites-enabled/
   ```

4. **Test nginx configuration:**
   ```bash
   sudo nginx -t
   ```

5. **Reload nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

## Step 4: Verify Deployment

1. **Check backend is running:**
   ```bash
   pm2 status
   pm2 logs platify-api
   ```

2. **Test the API endpoint:**
   ```bash
   curl -X POST https://platify.cloud/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

3. **Test the contact form** on your website

## Troubleshooting

### Backend not responding
- Check if PM2 is running: `pm2 status`
- Check logs: `pm2 logs platify-api`
- Verify port 3001 is not blocked: `sudo netstat -tlnp | grep 3001`

### 405 Not Allowed error
- Verify nginx is proxying `/api` requests correctly
- Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Ensure backend server is running on port 3001

### CORS errors
- Verify `FRONTEND_URL` in `.env` matches your domain
- Check server logs for CORS-related errors

### Email not sending
- Verify Gmail app password is correct
- Check server logs: `pm2 logs platify-api`
- Test SMTP connection manually if needed

## Useful Commands

```bash
# View backend logs
pm2 logs platify-api

# Restart backend
pm2 restart platify-api

# Stop backend
pm2 stop platify-api

# View nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Security Notes

- Never commit `.env` file to git (already in `.gitignore`)
- Keep your Gmail app password secure
- Regularly update dependencies: `npm audit fix`
- Monitor PM2 logs for any issues
- Set up firewall rules to only allow necessary ports

