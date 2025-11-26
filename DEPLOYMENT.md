# Deployment Guide

## Frontend Deployment (Vercel/Netlify)

1. Update `frontend/index.html`:
   - Replace `YOUR_PAYSTACK_PUBLIC_KEY` with your actual public key
   - Replace `YOUR_JSONBIN_BIN_ID` with your JSONBin bin ID
   - Replace `YOUR_JSONBIN_API_KEY` with your JSONBin API key
   - Update `BACKEND_URL` to your deployed backend URL

2. Deploy to Vercel:
   \`\`\`bash
   vercel deploy
   \`\`\`

## Backend Deployment (Render/Railway)

1. Create account on Render.com or Railway.app

2. Connect GitHub repository

3. Create new Web Service with:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `JSONBIN_BIN_ID`
     - `JSONBIN_API_KEY`
     - `PAYSTACK_SECRET_KEY`
     - `ADMIN_PHONE=23354048231`

4. On first deployment, WhatsApp will request QR code scan via logs

## Paystack Webhook Setup

1. Go to Paystack Dashboard > Settings > API Keys & Webhooks

2. Add Webhook URL:
   \`\`\`
   https://your-backend-url.com/webhook/paystack
   \`\`\`

3. Select event: `charge.success`

4. Save and test webhook

## WhatsApp Setup

1. After backend deployment, check logs for QR code
2. Scan QR code with WhatsApp (on phone where bot will operate)
3. Backend will remain logged in
4. Send `!help` from admin phone (23354048231) to verify connection
