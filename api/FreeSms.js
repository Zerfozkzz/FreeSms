// This file is for Vercel deployment compatibility
// For Render.com, we use server.js instead

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Moved</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #405DE6; }
            p { color: #666; }
        </style>
    </head>
    <body>
        <h1>🚀 Instagram Cam Bot API</h1>
        <p>This API endpoint is now hosted on Render.com</p>
        <p>Use the main server endpoint instead.</p>
        <p><strong>Usage:</strong> /api/FreeSms.js?chatId=YOUR_CHAT_ID&botToken=YOUR_BOT_TOKEN</p>
    </body>
    </html>
  `);
}
