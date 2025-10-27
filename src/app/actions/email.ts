"use server"

interface OrderConfirmationData {
  orderNumber: string
  customerName: string
  customerEmail: string
  pickupDate: string
  pickupTime: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  // In a production environment, you would integrate with an email service like:
  // - Resend (resend.com)
  // - SendGrid
  // - AWS SES
  // - Postmark

  // For now, we'll log the email content
  console.log("[v0] Order Confirmation Email")
  console.log("To:", data.customerEmail)
  console.log("Subject: Your Lily's Flowers Order Confirmation")
  console.log("\nEmail Content:")
  console.log(`
    Dear ${data.customerName},

    Thank you for your order! We're excited to prepare your beautiful flowers.

    Order Number: ${data.orderNumber}
    
    Pickup Details:
    - Date: ${new Date(data.pickupDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
    - Time: ${data.pickupTime}
    - Location: 123 Flower Street, Garden City

    Order Summary:
    ${data.items.map((item) => `- ${item.name} × ${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`).join("\n    ")}
    
    Total: $${data.total.toFixed(2)}

    We'll have your order ready for pickup at the scheduled time. If you need to make any changes, please contact us at (555) 123-4567 or hello@lilysflowers.com.

    With love and fresh blooms,
    The Lily's Flowers Team
  `)

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}
