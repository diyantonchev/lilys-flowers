"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { flowers, bouquets, type Flower, type Bouquet } from "@/lib/flowers-data"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

type ProductType = "all" | "bouquets" | "individual"
type Category = "all" | "roses" | "tulips" | "lilies" | "seasonal" | "mixed"

export default function ShopPage() {
  const [productType, setProductType] = useState<ProductType>("all")
  const [category, setCategory] = useState<Category>("all")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredProducts = useMemo(() => {
    let products: Array<(Flower | Bouquet) & { productType: "flower" | "bouquet" }> = []

    if (productType === "all" || productType === "bouquets") {
      products = [...products, ...bouquets.map((b) => ({ ...b, productType: "bouquet" as const }))]
    }

    if (productType === "all" || productType === "individual") {
      products = [...products, ...flowers.map((f) => ({ ...f, productType: "flower" as const }))]
    }

    if (category !== "all") {
      products = products.filter((p) => {
        if ("category" in p) {
          return p.category === category
        }
        return false
      })
    }

    return products
  }, [productType, category])

  const handleAddToCart = (product: Flower | Bouquet, type: "flower" | "bouquet") => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance mb-4">Shop Fresh Flowers</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Browse our collection of beautiful bouquets and individual flowers. All arrangements are made fresh
                daily.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6">
              {/* Product Type Filter */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground">Product Type</h3>
                <Tabs value={productType} onValueChange={(v) => setProductType(v as ProductType)}>
                  <TabsList>
                    <TabsTrigger value="all">All Products</TabsTrigger>
                    <TabsTrigger value="bouquets">Bouquets</TabsTrigger>
                    <TabsTrigger value="individual">Individual Flowers</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Category Filter */}
              {(productType === "all" || productType === "individual") && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-foreground">Flower Type</h3>
                  <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
                    <TabsList className="flex-wrap h-auto">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="roses">Roses</TabsTrigger>
                      <TabsTrigger value="tulips">Tulips</TabsTrigger>
                      <TabsTrigger value="lilies">Lilies</TabsTrigger>
                      <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setProductType("all")
                    setCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const isBouquet = "flowers" in product
                  const isPopular = isBouquet && product.popular

                  return (
                    <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isPopular && (
                          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Popular</Badge>
                        )}
                        {!isBouquet && "inStock" in product && !product.inStock && (
                          <Badge variant="secondary" className="absolute top-3 right-3">
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="font-serif text-lg">{product.name}</CardTitle>
                          <Badge variant="outline" className="shrink-0">
                            {isBouquet ? "Bouquet" : "Single"}
                          </Badge>
                        </div>
                        <CardDescription className="leading-relaxed line-clamp-2">
                          {product.description}
                        </CardDescription>
                      </CardHeader>

                      <CardFooter className="flex items-center justify-between pt-0">
                        <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product, isBouquet ? "bouquet" : "flower")}
                          disabled={!isBouquet && "inStock" in product && !product.inStock}
                          className="gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
