"use client"

import { useCallback, useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage() {
  const { items, total } = useCart()
  const router = useRouter()
  const [pickupDetails, setPickupDetails] = useState<any>(null)

  useEffect(() => {
    // Load pickup details from localStorage
    const saved = localStorage.getItem("lilys-flowers-pickup")
    if (saved) {
      setPickupDetails(JSON.parse(saved))
    }

    // Redirect if cart is empty
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const fetchClientSecret = useCallback(async () => {
    const cartItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }))
    return await createCheckoutSession(cartItems)
  }, [items])

  const handleComplete = useCallback(() => {
    router.push("/checkout/success")
  }, [router])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Payment</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stripe Checkout */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  fetchClientSecret,
                  onComplete: handleComplete,
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-serif font-bold text-foreground mb-4">Order Details</h2>

              {pickupDetails && (
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{pickupDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{pickupDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pickup Date & Time</p>
                    <p className="font-medium">
                      {pickupDetails.pickupDate} at {pickupDetails.pickupTime}
                    </p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
