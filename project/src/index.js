import { config } from './config.js';
import { ServerMonitor } from './monitor.js';
import logger from './logger.js';

// Validate required configuration
if (!config.webhookUrl) {
  logger.error('Discord webhook URL is required');
  process.exit(1);
}

if (!config.targetHost) {
  logger.error('Target host is required');
  process.exit(1);
}

// Create and start the monitor
const monitor = new ServerMonitor(
  config.targetHost,
  config.webhookUrl,
  config.checkInterval,
  config.statusInterval
);

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('Received SIGTERM signal');
  monitor.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Received SIGINT signal');
  monitor.stop();
  process.exit(0);
});

// Start monitoring
monitor.start();
logger.info('Monitor started with configuration:', {
  targetHost: config.targetHost,
  checkInterval: config.checkInterval,
  statusInterval: config.statusInterval
});