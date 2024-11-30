import fetch from 'node-fetch';
import logger from './logger.js';

export class DiscordNotifier {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
    this.lastStatus = null;
  }

  async sendEmbed(isUp, responseTime, error = null) {
    if (!this.webhookUrl) {
      logger.error('Discord webhook URL not configured');
      return;
    }

    const timestamp = new Date().toISOString();
    const status = isUp ? 'UP' : 'DOWN';
    
    // Only send notification if status changed
    if (this.lastStatus === status) return;
    this.lastStatus = status;

    const embed = {
      title: `Server Status: ${status}`,
      color: isUp ? 0x00ff00 : 0xff0000,
      fields: [
        {
          name: 'Timestamp',
          value: timestamp,
          inline: true
        },
        {
          name: 'Response Time',
          value: isUp ? `${responseTime}ms` : 'N/A',
          inline: true
        }
      ],
      footer: {
        text: 'Discord Webhook Monitor'
      }
    };

    if (error) {
      embed.fields.push({
        name: 'Error',
        value: error.message
      });
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ embeds: [embed] })
      });

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.statusText}`);
      }
    } catch (err) {
      logger.error('Failed to send Discord notification:', err);
    }
  }

  async sendStatusMessage() {
    if (!this.webhookUrl) return;

    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: '🟢 Webhook Monitor is active and running'
        })
      });
    } catch (err) {
      logger.error('Failed to send status message:', err);
    }
  }
}