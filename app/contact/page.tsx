"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, Linkedin, MapPin, Send, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"success" | "error" | null>(null)

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "mohammedadilshaafsarm@gmail.com",
      href: "mailto:mohammedadilshaafsarm@gmail.com",
      color: "bg-muted text-primary",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+91 9946686844",
      href: "https://wa.me/919946686844",
      color: "bg-muted text-primary",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "Mohammed Adilsha Afsar M",
      href: "https://www.linkedin.com/in/mohd-adilsha",
      color: "bg-muted text-primary",
    },
  ]

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false)
      setStatus("error")
      return
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current!, publicKey)
      .then(
        () => {
          setLoading(false)
          setStatus("success")
          formRef.current?.reset()
        },
        () => {
          setLoading(false)
          setStatus("error")
        }
      )
  }

  const inputClasses =
    "w-full px-4 py-2.5 bg-background border rounded-lg focus:ring-2 focus:ring-ring outline-none transition-colors"

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Get In Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or want to discuss robotics and embedded systems? Let's connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <a href={method.href} target="_blank" rel="noopener noreferrer" className="block group">
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="flex items-center p-6">
                      <div
                        className={`p-4 rounded-lg ${method.color} mr-4 transition-transform duration-300 group-hover:scale-110`}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{method.label}</p>
                        <p className="text-lg font-semibold break-all">{method.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}

            <div className="p-6 bg-card rounded-2xl border flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-primary" />
              <span>Tirur, Malappuram, Kerala, India</span>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-8 rounded-2xl shadow-sm border"
          >
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Send a Quick Message</h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClasses}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-base"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-4 h-4" />
              </Button>

              <div aria-live="polite" className="min-h-6">
                {status === "success" && (
                  <p className="text-green-600 dark:text-green-400 text-center text-sm flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={16} /> Message sent successfully!
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-600 dark:text-red-400 text-center text-sm flex items-center justify-center gap-1.5">
                    <XCircle size={16} /> Failed to send message. Try again.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}