# No-Database E-Commerce System

A complete e-commerce solution using Paystack for payments, WhatsApp for admin commands, and JSONBin for inventory storage.

## Features

✓ **Customer Frontend** - Browse products and checkout with Paystack  
✓ **Admin Commands** - Manage products via WhatsApp  
✓ **Real-Time Inventory** - JSONBin as serverless database  
✓ **Security** - HMAC signature verification + admin whitelist  
✓ **24/7 Operations** - Persistent Node.js server  

## Quick Start

### 1. Setup JSONBin
- Create account at https://jsonbin.io
- Create new bin with initial inventory
- Copy Bin ID and API Key

### 2. Setup Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Fill in JSONBIN_* and PAYSTACK_SECRET_KEY
npm start
\`\`\`

### 3. Scan WhatsApp QR
- Check server logs for QR code
- Scan with your phone's WhatsApp

### 4. Deploy Frontend
- Update API keys in `frontend/index.html`
- Deploy to Vercel/Netlify

## Admin Commands

- `!add item="Name" price=50 description="Desc" imageUrl="url" stock=10`
- `!remove item="Name"`
- `!update item="Name" price=50 stock=20`
- `!list`
- `!help`

## Security

- Only messages from `23354048231` are processed
- Paystack webhook signature verified with HMAC-SHA512
- Admin commands rejected from any other WhatsApp user
