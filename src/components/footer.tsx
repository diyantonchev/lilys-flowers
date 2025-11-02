import Link from "next/link"
import { Flower2, MapPin, Clock, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Flower2 className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">Lily's Flowers</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where every bouquet tells your story. Fresh, beautiful flowers for every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shop Flowers
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Build Bouquet
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>hello@lilysflowers.com</span>
              </li>
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Visit Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>
                  123 Tsar Boris III Blvd
                  <br />
                  Plovdiv 4000, Bulgaria
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <span>
                  Mon-Sat: 9AM - 6PM
                  <br />
                  Sun: 10AM - 4PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lily's Flowers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
