export async function POST(request: Request) {
  try {
    const body = await request.json()
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

    if (!PAYSTACK_SECRET_KEY) {
      return Response.json({ error: "Paystack configuration missing" }, { status: 500 })
    }

    // Initialize transaction with Paystack
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        amount: 100000, // Amount in kobo (divide by 100 for naira)
        metadata: {
          customer_name: body.fullName,
          customer_phone: body.phone,
          customer_address: body.address,
          customer_city: body.city,
          customer_state: body.state,
          customer_zip: body.zipCode,
        },
      }),
    })

    const data = await response.json()
    return Response.json(data.data)
  } catch (error) {
    console.error("Paystack error:", error)
    return Response.json({ error: "Failed to initialize payment" }, { status: 500 })
  }
}
