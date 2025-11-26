export async function GET() {
  try {
    // Replace with your JSONBin URL if using cloud storage
    const JSONBIN_URL = process.env.NEXT_PUBLIC_JSONBIN_URL

    if (JSONBIN_URL) {
      const response = await fetch(JSONBIN_URL, {
        headers: {
          "X-Master-Key": process.env.JSONBIN_API_KEY || "",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch from JSONBin")
      }

      const data = await response.json()
      return Response.json(data.record || [])
    }

    // Fallback mock data
    const products = [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 2999900,
        description: "High-quality sound with noise cancellation",
        image: "/wireless-headphones.png",
        category: "Electronics",
      },
    ]

    return Response.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return Response.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
