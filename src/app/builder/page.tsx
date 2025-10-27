"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Sparkles, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { flowers, type Flower } from "@/lib/flowers-data"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface SelectedFlower {
  flower: Flower
  quantity: number
}

type Category = "all" | "roses" | "tulips" | "lilies" | "seasonal"

export default function BuilderPage() {
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([])
  const [bouquetName, setBouquetName] = useState("")
  const [category, setCategory] = useState<Category>("all")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredFlowers = useMemo(() => {
    if (category === "all") return flowers.filter((f) => f.inStock)
    return flowers.filter((f) => f.category === category && f.inStock)
  }, [category])

  const totalPrice = useMemo(() => {
    return selectedFlowers.reduce((sum, item) => sum + item.flower.price * item.quantity, 0)
  }, [selectedFlowers])

  const totalFlowers = useMemo(() => {
    return selectedFlowers.reduce((sum, item) => sum + item.quantity, 0)
  }, [selectedFlowers])

  const addFlower = (flower: Flower) => {
    setSelectedFlowers((current) => {
      const existing = current.find((item) => item.flower.id === flower.id)
      if (existing) {
        return current.map((item) => (item.flower.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...current, { flower, quantity: 1 }]
    })
  }

  const updateQuantity = (flowerId: string, delta: number) => {
    setSelectedFlowers((current) => {
      return current
        .map((item) => {
          if (item.flower.id === flowerId) {
            const newQuantity = item.quantity + delta
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const removeFlower = (flowerId: string) => {
    setSelectedFlowers((current) => current.filter((item) => item.flower.id !== flowerId))
  }

  const handleAddToCart = () => {
    if (selectedFlowers.length === 0) {
      toast({
        title: "Empty bouquet",
        description: "Please add some flowers to your bouquet first.",
        variant: "destructive",
      })
      return
    }

    const customBouquetName = bouquetName.trim() || "Custom Bouquet"

    addItem({
      id: `custom-${Date.now()}`,
      name: customBouquetName,
      price: totalPrice,
      image: selectedFlowers[0]?.flower.image ?? "/placeholder.svg",
      type: "custom",
    })

    toast({
      title: "Added to cart",
      description: `${customBouquetName} has been added to your cart.`,
    })

    // Reset builder
    setSelectedFlowers([])
    setBouquetName("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Build Your Bouquet</h1>
              </div>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Create a custom arrangement by selecting your favorite flowers. Mix and match to design the perfect
                bouquet for any occasion.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Flower Selection */}
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground">Select Flowers</h3>
                <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
                  <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="all">All Flowers</TabsTrigger>
                    <TabsTrigger value="roses">Roses</TabsTrigger>
                    <TabsTrigger value="tulips">Tulips</TabsTrigger>
                    <TabsTrigger value="lilies">Lilies</TabsTrigger>
                    <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Flowers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFlowers.map((flower) => (
                  <Card key={flower.id} className="group overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={flower.image || "/placeholder.svg"}
                        alt={flower.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-serif">{flower.name}</CardTitle>
                      <CardDescription className="text-sm line-clamp-1">{flower.description}</CardDescription>
                    </CardHeader>

                    <CardFooter className="flex items-center justify-between pt-0">
                      <span className="text-lg font-bold text-foreground">${flower.price.toFixed(2)}</span>
                      <Button size="sm" onClick={() => addFlower(flower)} className="gap-1">
                        <Plus className="h-3 w-3" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bouquet Summary */}
            <div className="lg:sticky lg:top-20 h-fit">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Your Bouquet
                  </CardTitle>
                  <CardDescription>
                    {totalFlowers === 0
                      ? "Start adding flowers to create your custom bouquet"
                      : `${totalFlowers} ${totalFlowers === 1 ? "flower" : "flowers"} selected`}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Bouquet Name */}
                  <div className="space-y-2">
                    <Label htmlFor="bouquet-name">Bouquet Name (Optional)</Label>
                    <Input
                      id="bouquet-name"
                      placeholder="e.g., Anniversary Bouquet"
                      value={bouquetName}
                      onChange={(e) => setBouquetName(e.target.value)}
                    />
                  </div>

                  {/* Selected Flowers */}
                  {selectedFlowers.length > 0 ? (
                    <div className="space-y-3">
                      <Label>Selected Flowers</Label>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                        {selectedFlowers.map((item) => (
                          <div
                            key={item.flower.id}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
                          >
                            <div className="relative h-12 w-12 rounded overflow-hidden shrink-0">
                              <Image
                                src={item.flower.image || "/placeholder.svg"}
                                alt={item.flower.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{item.flower.name}</p>
                              <p className="text-xs text-muted-foreground">${item.flower.price.toFixed(2)} each</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Button
                                size="icon-sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.flower.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <Button
                                size="icon-sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.flower.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                onClick={() => removeFlower(item.flower.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">No flowers selected yet</p>
                    </div>
                  )}

                  {/* Price Summary */}
                  {selectedFlowers.length > 0 && (
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Assembly</span>
                        <span className="font-medium">$10.00</span>
                      </div>
                      <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">${(totalPrice + 10).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={selectedFlowers.length === 0}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>

              {/* Tips Card */}
              <Card className="mt-4 bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Builder Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <li>• Mix 3-5 flower types for a balanced look</li>
                    <li>• Combine complementary colors</li>
                    <li>• Add 6-12 stems for a full bouquet</li>
                    <li>• Include a variety of heights and textures</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
