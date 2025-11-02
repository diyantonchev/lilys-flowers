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
    - Location: 123 Tsar Boris III Blvd, Plovdiv 4000, Bulgaria

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

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  // In a production environment, you would integrate with an email service like:
  // - Resend (resend.com)
  // - SendGrid
  // - AWS SES
  // - Postmark

  // For now, we'll log the email content
  console.log("[v0] Contact Form Submission")
  console.log("From:", data.email)
  console.log("Name:", data.name)
  console.log("Phone:", data.phone || "Not provided")
  console.log("Subject:", data.subject)
  console.log("\nMessage Content:")
  console.log(data.message)

  // Log auto-reply to customer
  console.log("\n[v0] Auto-Reply to Customer")
  console.log("To:", data.email)
  console.log("Subject: We received your message - Lily's Flowers")
  console.log("\nEmail Content:")
  console.log(`
    Dear ${data.name},

    Thank you for contacting Lily's Flowers! We've received your message and will get back to you within 24 hours.

    Your Message:
    Subject: ${data.subject}
    ${data.message}

    If you need immediate assistance, please don't hesitate to call us at (555) 123-4567 during business hours:
    Monday-Friday: 9:00 AM - 6:00 PM
    Saturday: 10:00 AM - 5:00 PM

    With love and fresh blooms,
    The Lily's Flowers Team

    ---
    Lily's Flowers
    123 Tsar Boris III Blvd, Plovdiv 4000, Bulgaria
    Phone: (555) 123-4567
    Email: hello@lilysflowers.com
  `)

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}
