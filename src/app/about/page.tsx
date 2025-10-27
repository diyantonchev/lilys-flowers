import Image from "next/image"
import Link from "next/link"
import { Heart, Sparkles, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">
                About <span className="text-primary">Lily&apos;s Flowers</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Where passion for flowers meets artistry. We&apos;ve been creating beautiful moments through fresh blooms
                since 2010.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/flower-shop-interior-with-beautiful-arrangements.jpg"
                  alt="Lily's Flowers shop interior"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">Our Story</h2>
                <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded by Lily Chen in 2010, Lily&apos;s Flowers began as a small neighborhood flower shop with a big
                    dream: to bring joy and beauty into people&apos;s lives through the art of floral design.
                  </p>
                  <p>
                    What started as a passion project has blossomed into a beloved local business, serving thousands of
                    customers for their most special moments. From intimate celebrations to grand events, we&apos;ve been
                    honored to be part of your stories.
                  </p>
                  <p>
                    Today, we combine traditional craftsmanship with modern convenience, offering both curated
                    collections and custom bouquet building. Every arrangement is handcrafted with care, using only the
                    freshest flowers sourced from local and sustainable growers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">What We Stand For</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Our values guide everything we do, from sourcing flowers to serving our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Quality First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    We source only the freshest, highest-quality flowers and guarantee their beauty for 7 days.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Artistry</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Every bouquet is a work of art, carefully designed by our skilled florists with attention to detail.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    We&apos;re proud to support local growers and give back to the community that has supported us.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sustainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    We prioritize eco-friendly practices and work with sustainable growers whenever possible.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">Meet Our Team</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Our talented florists bring years of experience and endless creativity to every arrangement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
                  <Image src="/professional-woman-florist-portrait.jpg" alt="Lily Chen" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Lily Chen</h3>
                  <p className="text-sm text-muted-foreground">Founder & Lead Designer</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
                  <Image src="/professional-woman-florist-portrait-smiling.jpg" alt="Sarah Martinez" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Sarah Martinez</h3>
                  <p className="text-sm text-muted-foreground">Senior Florist</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
                  <Image src="/professional-man-florist-portrait.jpg" alt="James Park" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">James Park</h3>
                  <p className="text-sm text-muted-foreground">Floral Artist</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">
                Ready to Create Something Beautiful?
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Browse our collection or design your own custom bouquet today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/shop">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/builder">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Build Custom Bouquet
                  </Link>
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
