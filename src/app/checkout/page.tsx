"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
    specialInstructions: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleContinueToPayment = () => {
    // Store pickup details in localStorage for order confirmation
    localStorage.setItem("lilys-flowers-pickup", JSON.stringify(formData))
    router.push("/checkout/payment")
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.pickupDate && formData.pickupTime

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-xl font-serif font-bold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Pickup Details */}
            <Card className="p-6">
              <h2 className="text-xl font-serif font-bold text-foreground mb-4">Pickup Details</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule your pickup at our store: 123 Flower Street, Garden City
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickupDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Pickup Date *
                  </Label>
                  <Input
                    id="pickupDate"
                    name="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pickupTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Pickup Time *
                  </Label>
                  <Input
                    id="pickupTime"
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Store hours: 9:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes..."
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-serif font-bold text-foreground mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleContinueToPayment}
                disabled={!isFormValid}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Continue to Payment
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
