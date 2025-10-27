"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { sendOrderConfirmationEmail } from "@/app/actions/email"

export default function OrderSuccessPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [pickupDetails, setPickupDetails] = useState<any>(null)
  const [orderNumber, setOrderNumber] = useState<string>("")
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Load pickup details
    const saved = localStorage.getItem("lilys-flowers-pickup")
    if (saved) {
      setPickupDetails(JSON.parse(saved))
    }

    // Generate order number
    const orderNum = `LF${Date.now().toString().slice(-8)}`
    setOrderNumber(orderNum)

    // Send confirmation email
    const sendEmail = async () => {
      if (saved && items.length > 0) {
        const details = JSON.parse(saved)
        try {
          await sendOrderConfirmationEmail({
            orderNumber: orderNum,
            customerName: details.name,
            customerEmail: details.email,
            pickupDate: details.pickupDate,
            pickupTime: details.pickupTime,
            items: items,
            total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
          })
          setEmailSent(true)
        } catch (error) {
          console.error("[v0] Failed to send confirmation email:", error)
        }
      }
    }

    sendEmail()

    // Clear cart after successful order
    const timer = setTimeout(() => {
      clearCart()
      localStorage.removeItem("lilys-flowers-pickup")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!pickupDetails) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We'll have your beautiful flowers ready for pickup.
            </p>
          </div>

          {/* Order Details */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-2xl font-bold text-primary">{orderNumber}</p>
              </div>
              {emailSent && (
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Mail className="w-4 h-4" />
                  <span>Confirmation email sent</span>
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{pickupDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{pickupDetails.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{pickupDetails.phone}</p>
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="bg-secondary/30 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Pickup Details</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Date</p>
                    <p className="font-medium">
                      {new Date(pickupDetails.pickupDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Time</p>
                    <p className="font-medium">{pickupDetails.pickupTime}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm font-medium text-foreground mb-1">Pickup Location</p>
                <p className="text-sm text-muted-foreground">123 Flower Street, Garden City</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Order Items</h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm py-2 border-b border-border/30 last:border-0"
                  >
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t-2 border-border">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-xl text-primary">
                    ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {pickupDetails.specialInstructions && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-1">Special Instructions</p>
                <p className="text-sm">{pickupDetails.specialInstructions}</p>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90" size="lg">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent" size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>

          {/* Help Section */}
          <Card className="mt-6 p-6 bg-secondary/30">
            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@lilysflowers.com</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
