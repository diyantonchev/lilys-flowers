"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { sendContactEmail } from "@/app/actions/email"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Have a question or special request? We&apos;d love to hear from you. Reach out and let&apos;s create
                something beautiful together.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Phone */}
              <Card className="text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-2">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="tel:+15551234567"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (555) 123-4567
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Sat: 9AM-6PM</p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-2">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:hello@lilysflowers.com"
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    hello@lilysflowers.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">We reply within 24 hours</p>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-2">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Visit Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="text-muted-foreground not-italic">
                    123 Tsar Boris III Blvd
                    <br />
                    Plovdiv 4000, Bulgaria
                  </address>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form and Map */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Fill out the form below and we&apos;ll get back to you as soon as possible. For urgent matters,
                    please call us directly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-32"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Map and Additional Info */}
              <div className="space-y-6">
                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <div className="relative aspect-square lg:aspect-[4/3] bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.8234567890!2d24.7453!3d42.1354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd1a4a4a4a4a4%3A0x0!2zNDLCsDA4JzA3LjQiTiAyNMKwNDQnNDMuMSJF!5e0!3m2!1sen!2sbg!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lily's Flowers Location - Plovdiv, Bulgaria"
                      className="absolute inset-0"
                    />
                  </div>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Lily&apos;s Flowers?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="rounded-full bg-primary/10 p-2 h-fit">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Same-Day Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          Order before 2 PM for same-day delivery within 10 miles
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="rounded-full bg-primary/10 p-2 h-fit">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Custom Arrangements</h4>
                        <p className="text-sm text-muted-foreground">
                          Work with our florists to create the perfect bouquet for any occasion
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="rounded-full bg-primary/10 p-2 h-fit">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Fresh Guarantee</h4>
                        <p className="text-sm text-muted-foreground">
                          All flowers come with our 7-day freshness guarantee
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle>Need Immediate Assistance?</CardTitle>
                    <CardDescription>
                      For urgent orders or questions, give us a call during business hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild variant="default" className="w-full gap-2">
                      <a href="tel:+15551234567">
                        <Phone className="h-4 w-4" />
                        Call (555) 123-4567
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full gap-2">
                      <a href="mailto:hello@lilysflowers.com">
                        <Mail className="h-4 w-4" />
                        Email Us
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Quick answers to common questions</p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What are your delivery areas?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We deliver within Plovdiv and surrounding areas. Same-day delivery is available
                      for orders placed before 2 PM. Delivery is free for orders over 100 BGN.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I customize my bouquet?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely! Use our online bouquet builder or contact us directly to work with one of our
                      florists. We can accommodate special requests, color preferences, and specific flower types.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What is your cancellation policy?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Orders can be cancelled or modified up to 24 hours before the scheduled delivery or pickup time
                      for a full refund. Please contact us as soon as possible if you need to make changes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you do wedding and event flowers?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! We specialize in wedding and event florals. Contact us to schedule a consultation with our
                      design team. We recommend booking at least 3 months in advance for weddings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

