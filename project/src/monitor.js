import { performance } from 'perf_hooks';
import logger from './logger.js';
import { DiscordNotifier } from './discord.js';

export class ServerMonitor {
  constructor(targetHost, webhookUrl, checkInterval, statusInterval) {
    this.targetHost = targetHost;
    this.discord = new DiscordNotifier(webhookUrl);
    this.checkInterval = checkInterval;
    this.statusInterval = statusInterval;
    this.isRunning = false;
    this.checkIntervalId = null;
    this.statusIntervalId = null;
  }

  async checkServer() {
    const startTime = performance.now();
    
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`http://${this.targetHost}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      const responseTime = Math.round(performance.now() - startTime);
      const isUp = response.ok;

      await this.discord.sendEmbed(isUp, responseTime);
      logger.info(`Server check: ${isUp ? 'UP' : 'DOWN'}, Response time: ${responseTime}ms`);
    } catch (error) {
      await this.discord.sendEmbed(false, null, error);
      logger.error('Server check failed:', error);
    }
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    logger.info('Starting server monitor...');

    // Initial check
    this.checkServer();
    this.discord.sendStatusMessage();

    // Schedule regular checks
    this.checkIntervalId = setInterval(() => this.checkServer(), this.checkInterval);
    this.statusIntervalId = setInterval(() => this.discord.sendStatusMessage(), this.statusInterval);
  }

  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    clearInterval(this.checkIntervalId);
    clearInterval(this.statusIntervalId);
    logger.info('Server monitor stopped');
  }
}