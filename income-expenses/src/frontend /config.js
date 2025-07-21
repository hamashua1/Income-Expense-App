// Configuration for different environments
const config = {
    development: {
        API_BASE_URL: 'http://localhost:8000'
    },
    production: {
        API_BASE_URL: 'https://income-expense-app-production.up.railway.app' // Replace with your actual domain/IP
        // For IP address, use: 'http://YOUR_SERVER_IP:8000'
        // For domain, use: 'https://your-domain.com'
    }
}

// Detect environment (you can modify this logic as needed)
const environment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'development' 
    : 'production'

// Export the current configuration
window.CONFIG = config[environment]

console.log(`Running in ${environment} mode with API base URL: ${window.CONFIG.API_BASE_URL}`) 