# Discord Webhook Monitor

A Node.js application that monitors server status and sends notifications to Discord.

## Features

- Real-time server monitoring via HTTP checks
- Discord notifications for status changes
- Color-coded embeds (green for up, red for down)
- Regular "heartbeat" status messages
- Detailed logging
- Configurable check intervals
- Graceful shutdown handling

## Configuration

Create a `.env` file with the following variables:

```env
TARGET_HOST=example.com
DISCORD_WEBHOOK_URL=your_webhook_url_here
CHECK_INTERVAL=15000
STATUS_INTERVAL=300000
```

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

## Environment Variables

- `TARGET_HOST`: The hostname/IP to monitor
- `DISCORD_WEBHOOK_URL`: Your Discord webhook URL
- `CHECK_INTERVAL`: Interval between checks in milliseconds (default: 15000)
- `STATUS_INTERVAL`: Interval between status messages in milliseconds (default: 300000)

## Logging

Logs are stored in the `logs` directory:
- `error.log`: Error-level logs
- `combined.log`: All logs

## Error Handling

The application includes comprehensive error handling:
- Connection timeouts
- Invalid webhook URLs
- Network errors
- Invalid target hosts