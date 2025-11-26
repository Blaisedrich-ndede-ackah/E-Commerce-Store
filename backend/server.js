const express = require("express")
const axios = require("axios")
const crypto = require("crypto")
const { Client, LocalAuth } = require("whatsapp-web.js")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

// Configuration
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const ADMIN_PHONE = process.env.ADMIN_PHONE || "23354048231"
const ADMIN_WHATSAPP = `${ADMIN_PHONE}@c.us`

// Initialize WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth(),
})

let isReady = false

client.on("ready", () => {
  console.log("WhatsApp client is ready!")
  isReady = true
})

client.on("message", async (message) => {
  await handleAdminCommand(message)
})

client.on("disconnected", (reason) => {
  console.log("WhatsApp client was logged out", reason)
  isReady = false
})

client.initialize()

// Helper: Fetch inventory from JSONBin
async function getInventory() {
  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      headers: { "X-Master-Key": JSONBIN_API_KEY },
    })
    return response.data.record
  } catch (error) {
    console.error("Error fetching inventory:", error.message)
    return { products: [] }
  }
}

// Helper: Save inventory to JSONBin
async function saveInventory(data) {
  try {
    await axios.put(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, data, {
      headers: { "X-Master-Key": JSONBIN_API_KEY, "Content-Type": "application/json" },
    })
    return true
  } catch (error) {
    console.error("Error saving inventory:", error.message)
    return false
  }
}

// Verify Paystack signature
function verifyPaystackSignature(body, signature) {
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(body).digest("hex")
  return hash === signature
}

// Format order message
function formatOrderMessage(data) {
  const { metadata, reference, amount } = data
  const total = amount / 100
  return `Hello Boss! 🎉

New payment confirmed:
Ref: ${reference}
Amount: GHS ${total}

Customer Details:
Name: ${metadata.customer_name}
Email: ${metadata.customer_email}
Phone: ${metadata.customer_phone}

Items:
${metadata.items}

Order received. Processing now...`
}

// Handle admin commands via WhatsApp
async function handleAdminCommand(message) {
  // Security: Only accept messages from admin
  if (message.from !== ADMIN_WHATSAPP) {
    console.log(`Ignored message from ${message.from}`)
    return
  }

  const text = message.body.trim()

  // Command: !add item="Name" price=50 description="Desc" imageUrl="url" stock=10
  if (text.startsWith("!add")) {
    const itemMatch = text.match(/item="([^"]+)"/)
    const priceMatch = text.match(/price=(\d+)/)
    const descMatch = text.match(/description="([^"]*)"/)
    const imageMatch = text.match(/imageUrl="([^"]*)"/)
    const stockMatch = text.match(/stock=(\d+)/)

    if (itemMatch && priceMatch) {
      const inventory = await getInventory()
      if (!inventory.products) inventory.products = []

      const newProduct = {
        name: itemMatch[1],
        price: Number.parseFloat(priceMatch[1]),
        description: descMatch ? descMatch[1] : "",
        imageUrl: imageMatch ? imageMatch[1] : "https://via.placeholder.com/250x200",
        stock: stockMatch ? Number.parseInt(stockMatch[1]) : 10,
      }

      inventory.products.push(newProduct)
      if (await saveInventory(inventory)) {
        await message.reply(`Command received, Sir! Product "${newProduct.name}" added.`)
      } else {
        await message.reply("Error saving product. Try again.")
      }
    } else {
      await message.reply('Invalid format. Use: !add item="Name" price=50 description="Desc" imageUrl="url" stock=10')
    }
  }

  // Command: !remove item="Name"
  else if (text.startsWith("!remove")) {
    const itemMatch = text.match(/item="([^"]+)"/)
    if (itemMatch) {
      const inventory = await getInventory()
      const initialLength = inventory.products.length
      inventory.products = inventory.products.filter((p) => p.name !== itemMatch[1])

      if (inventory.products.length < initialLength && (await saveInventory(inventory))) {
        await message.reply(`Command received, Sir! Product "${itemMatch[1]}" removed.`)
      } else {
        await message.reply("Product not found.")
      }
    } else {
      await message.reply('Invalid format. Use: !remove item="Name"')
    }
  }

  // Command: !update item="Name" field=value
  else if (text.startsWith("!update")) {
    const itemMatch = text.match(/item="([^"]+)"/)
    const priceMatch = text.match(/price=(\d+)/)
    const stockMatch = text.match(/stock=(\d+)/)

    if (itemMatch) {
      const inventory = await getInventory()
      const product = inventory.products.find((p) => p.name === itemMatch[1])

      if (product) {
        if (priceMatch) product.price = Number.parseFloat(priceMatch[1])
        if (stockMatch) product.stock = Number.parseInt(stockMatch[1])

        if (await saveInventory(inventory)) {
          await message.reply(`Command received, Sir! Product "${itemMatch[1]}" updated.`)
        } else {
          await message.reply("Error updating product. Try again.")
        }
      } else {
        await message.reply("Product not found.")
      }
    } else {
      await message.reply('Invalid format. Use: !update item="Name" price=50 stock=20')
    }
  }

  // Command: !list
  else if (text === "!list") {
    const inventory = await getInventory()
    if (inventory.products.length === 0) {
      await message.reply("No products available.")
    } else {
      const list = inventory.products.map((p) => `• ${p.name} - GHS ${p.price} (Stock: ${p.stock})`).join("\n")
      await message.reply(`Current Inventory:\n\n${list}`)
    }
  }

  // Command: !help
  else if (text === "!help") {
    const help = `Available Commands:
!add item="Name" price=50 description="Desc" imageUrl="url" stock=10
!remove item="Name"
!update item="Name" price=50 stock=20
!list
!help`
    await message.reply(help)
  }
}

// Paystack Webhook
app.post("/webhook/paystack", express.raw({ type: "application/json" }), async (req, res) => {
  const signature = req.headers["x-paystack-signature"]
  const body = req.body

  if (!verifyPaystackSignature(body, signature)) {
    console.log("Invalid signature")
    return res.status(401).json({ success: false, message: "Invalid signature" })
  }

  try {
    const data = JSON.parse(body)

    if (data.event === "charge.success") {
      const message = formatOrderMessage(data.data)

      // Send to admin via WhatsApp
      if (isReady) {
        await client.sendMessage(ADMIN_WHATSAPP, message)
        console.log(`Order notification sent for ref: ${data.data.reference}`)
      } else {
        console.log("WhatsApp client not ready. Message queued.")
      }

      return res.status(200).json({ success: true })
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", whatsappReady: isReady })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
