import fs from 'fs';
import path from 'path';

// Save current environment variables to .env.example
const envExample = `TARGET_HOST=example.com
DISCORD_WEBHOOK_URL=your_webhook_url_here
CHECK_INTERVAL=15000
STATUS_INTERVAL=300000`;

fs.writeFileSync('.env.example', envExample);

// Create a gitignore file
const gitignore = `.env
logs/
node_modules/
.DS_Store`;

fs.writeFileSync('.gitignore', gitignore);

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

console.log('Environment configuration saved and project files prepared for download.');