# ShopHub E-Commerce System - Setup Guide

## File Structure
\`\`\`
project/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles with theme variables
│   ├── checkout/
│   │   └── page.tsx         # Checkout page
│   └── api/
│       ├── products/
│       │   └── route.ts     # Products API endpoint
│       └── paystack/
│           └── initialize/
│               └── route.ts # Paystack initialization
├── components/
│   ├── layout/
│   │   ├── header.tsx       # Navigation header
│   │   └── footer.tsx       # Footer with links
│   ├── sections/
│   │   ├── hero.tsx         # Hero banner
│   │   └── product-grid.tsx # Product display grid
│   └── products/
│       └── product-card.tsx # Individual product card
└── public/                  # Static assets
\`\`\`

## Environment Variables Required
\`\`\`
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
NEXT_PUBLIC_JSONBIN_URL=your_jsonbin_url_optional
JSONBIN_API_KEY=your_jsonbin_api_key_optional
\`\`\`

## Setup Steps

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Add Paystack Keys**
   - Get keys from: https://dashboard.paystack.com/
   - Add to environment variables

3. **Setup JSONBin (Optional)**
   - Create account at https://jsonbin.io/
   - Create a bin with your products
   - Add URL and API key to env vars

4. **Deploy Backend (Next.js API Routes)**
   - Deploy to Vercel
   - Add environment variables to Vercel dashboard

5. **Deploy Frontend**
   - Same deployment as backend (integrated)
   - Update Paystack public key in header for checkout

## Admin WhatsApp Integration

The backend supports WhatsApp admin commands. Set up separately on your server.

## Security Notes
- All Paystack webhooks are HMAC-SHA512 verified
- Admin WhatsApp limited to 23354048231 only
- Never expose secret keys in frontend
- All sensitive data validated server-side
