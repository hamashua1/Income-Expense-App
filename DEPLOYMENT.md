# Deployment Guide for Income-Expense App

## Quick Setup Steps

### 1. Update Configuration
Edit `income-expenses/src/frontend/config.js` and replace `'https://your-domain.com'` with your actual server URL:

```javascript
production: {
    API_BASE_URL: 'http://YOUR_SERVER_IP:8000'  // For IP address
    // OR
    API_BASE_URL: 'https://your-domain.com'     // For domain with SSL
}
```

### 2. Server Configuration
Your server is already configured to bind to `0.0.0.0:8000`, which means it will accept connections from any IP address.

## Deployment Options

### Option 1: VPS/Cloud Server (Recommended)

#### Popular Providers:
- **DigitalOcean**: $5-10/month droplets
- **AWS EC2**: Free tier available
- **Linode**: $5/month VPS
- **Vultr**: $2.50-5/month VPS
- **Google Cloud**: Free tier available

#### Steps:
1. **Create a server instance**
2. **Connect via SSH**
3. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. **Upload your app**:
   ```bash
   # Option A: Git clone
   git clone YOUR_REPOSITORY_URL
   cd Income-Expense-App
   
   # Option B: SCP upload
   scp -r Income-Expense-App/ user@YOUR_SERVER_IP:/home/user/
   ```
5. **Install dependencies**:
   ```bash
   npm install
   ```
6. **Update config.js** with your server IP
7. **Start the application**:
   ```bash
   npm start
   ```
8. **Set up process manager** (recommended):
   ```bash
   sudo npm install -g pm2
   pm2 start income-expenses/src/Backend/server.js --name "income-expense-app"
   pm2 startup
   pm2 save
   ```

### Option 2: Free Hosting Platforms

#### Railway (Recommended for beginners)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-deploy your app
4. Update `config.js` with the provided Railway URL

#### Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Update `config.js` with the provided Render URL

#### Heroku
1. Install Heroku CLI
2. Create a `Procfile`:
   ```
   web: npm start
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```
4. Update `config.js` with your Heroku URL

### Option 3: Domain Setup (Optional)

If you want a custom domain instead of an IP address:

1. **Purchase a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Cloudflare
   - Google Domains

2. **Configure DNS**:
   - Create an A record pointing to your server IP
   - Wait for DNS propagation (can take 24-48 hours)

3. **Set up SSL** (for HTTPS):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Configuration Examples

### For IP Address Deployment:
```javascript
// config.js
production: {
    API_BASE_URL: 'http://123.456.789.123:8000'
}
```

### For Domain Deployment:
```javascript
// config.js
production: {
    API_BASE_URL: 'https://your-app-name.com'
}
```

### For Free Platform Deployment:
```javascript
// config.js
production: {
    API_BASE_URL: 'https://your-app-name.railway.app'
    // or
    API_BASE_URL: 'https://your-app-name.onrender.com'
    // or
    API_BASE_URL: 'https://your-app-name.herokuapp.com'
}
```

## Important Notes

1. **Firewall Settings**: Make sure port 8000 is open on your server
2. **Environment Variables**: Consider using environment variables for sensitive data
3. **Database**: Your SQLite database will be created on the server
4. **CORS**: The server is already configured with CORS enabled
5. **HTTPS**: For production, consider setting up SSL/HTTPS

## Testing Your Deployment

1. Visit your deployed URL in a browser
2. Try adding an expense entry
3. Check if data persists after page refresh
4. Test the delete functionality

## Troubleshooting

- **Can't connect**: Check if server is running and port 8000 is accessible
- **CORS errors**: Ensure your API_BASE_URL matches your server URL exactly
- **Database errors**: Check file permissions on the server
- **Module errors**: Run `npm install` to ensure all dependencies are installed 