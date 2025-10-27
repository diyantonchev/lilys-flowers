import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Sparkles, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { bouquets } from "@/lib/flowers-data"

export default function HomePage() {
  const featuredBouquets = bouquets.filter((b) => b.popular)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Hero Content */}
              <div className="flex flex-col gap-6 text-center lg:text-left">
                <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                  <Sparkles className="h-3 w-3" />
                  Fresh Flowers Daily
                </Badge>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Where Every Bouquet Tells <span className="text-primary">Your Story</span>
                </h1>

                <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Create custom arrangements or choose from our curated collection of fresh, beautiful flowers. Perfect
                  for every occasion, delivered with love.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/shop">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                    <Link href="/builder">
                      <Sparkles className="h-4 w-4" />
                      Build Custom Bouquet
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/beautiful-colorful-flower-bouquet-arrangement-with.jpg"
                  alt="Beautiful flower bouquet"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Free Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">On orders over $50 within 10 miles</p>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Fresh Guarantee</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  7-day freshness guarantee on all flowers
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Custom Designs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Build your perfect bouquet with our designer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Bouquets Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">Popular Bouquets</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
                Our most loved arrangements, handcrafted with care and delivered fresh to your door
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBouquets.map((bouquet) => (
                <Card key={bouquet.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={bouquet.image || "/placeholder.svg"}
                      alt={bouquet.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Popular</Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="font-serif">{bouquet.name}</CardTitle>
                    <CardDescription className="leading-relaxed">{bouquet.description}</CardDescription>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">${bouquet.price.toFixed(2)}</span>
                    <Button asChild>
                      <Link href={`/shop?bouquet=${bouquet.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">
                  View All Bouquets
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">Create Your Perfect Bouquet</h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Use our interactive bouquet builder to design a custom arrangement that&apos;s uniquely yours. Choose your
                favorite flowers, colors, and style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/builder">
                    <Sparkles className="h-4 w-4" />
                    Start Building
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
