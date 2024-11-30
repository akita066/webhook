import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: join(__dirname, '../.env') });

export const config = {
  targetHost: process.env.TARGET_HOST || 'example.com',
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  checkInterval: parseInt(process.env.CHECK_INTERVAL, 10) || 15000,
  statusInterval: parseInt(process.env.STATUS_INTERVAL, 10) || 300000,
};