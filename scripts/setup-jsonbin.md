# JSONBin Setup Guide

## 1. Create JSONBin Account
- Go to https://jsonbin.io
- Sign up for a free account
- Create a new collection

## 2. Create Initial Inventory JSON
Create a new bin with this JSON structure:

\`\`\`json
{
  "products": [
    {
      "name": "Yam",
      "price": 25,
      "description": "Fresh organic yam",
      "imageUrl": "https://via.placeholder.com/250x200?text=Yam",
      "stock": 50
    },
    {
      "name": "Rice",
      "price": 15,
      "description": "Premium white rice",
      "imageUrl": "https://via.placeholder.com/250x200?text=Rice",
      "stock": 100
    }
  ]
}
\`\`\`

## 3. Get Your Credentials
- Copy your Bin ID from the URL: `https://jsonbin.io/b/{BIN_ID}`
- Copy your API Key from Account Settings

## 4. Update Environment Variables
Add to your backend `.env` file:
\`\`\`
JSONBIN_BIN_ID=your_bin_id
JSONBIN_API_KEY=your_api_key
