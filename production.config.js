// Production Configuration
// Use this file to override default settings for production deployment

const productionConfig = {
    // Server settings
    port: process.env.PORT || 8000,
    host: '0.0.0.0', // Already configured in server.js
    
    // CORS settings for production (optional - more secure)
    corsOptions: {
        origin: [
            'https://your-domain.com',           // Replace with your actual domain
            'http://your-server-ip:8000',       // Replace with your server IP
            // Add more allowed origins as needed
        ],
        credentials: true,
        optionsSuccessStatus: 200
    },
    
    // Database settings
    database: {
        path: './database.db',
        // For production, consider moving to a dedicated folder
        // path: '/var/lib/income-expense-app/database.db'
    },
    
    // SSL/Security settings (if using HTTPS)
    ssl: {
        enabled: false, // Set to true if using HTTPS
        // certificatePath: '/path/to/certificate.crt',
        // privateKeyPath: '/path/to/private.key'
    }
}

export default productionConfig

// Usage instructions:
// 1. Update 'your-domain.com' and 'your-server-ip' with actual values
// 2. Import this config in server.js if you want stricter CORS settings
// 3. Set environment variables on your server if needed 