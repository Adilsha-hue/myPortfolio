"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, Linkedin, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+91 9946686844",
      href: "https://wa.me/919946686844",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "Mohammed Adilsha Afsar M",
      href: "https://linkedin.com/in/mohd-adilsha",
      color: "bg-blue-50 text-blue-700",
    },
  ]

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    emailjs
      .sendForm(
        "service_ifc6d0o",        // ✅ Your Service ID
        "template_g6yfoqm",       // ❗ Replace with EmailJS Template ID
        formRef.current!,
        "BRjOiUAitzKcL45wY"         // ❗ Replace with EmailJS Public Key
      )
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

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-600">
            Have a project in mind or want to discuss robotics and design? Let's connect!
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
                transition={{ delay: index * 0.1 }}
              >
                <a href={method.href} target="_blank" rel="noopener noreferrer">
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="flex items-center p-6">
                      <div className={`p-4 rounded-xl ${method.color} mr-4`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{method.label}</p>
                        <p className="text-lg font-semibold">{method.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}

            <div className="p-6 bg-white rounded-2xl border shadow-sm flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-blue-600" />
              <span>Kerala, India</span>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-sm border"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Quick Message</h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Your Name</label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-4 h-4" />
              </Button>

              {status === "success" && (
                <p className="text-green-600 text-center mt-2">
                  ✅ Message sent successfully!
                </p>
              )}

              {status === "error" && (
                <p className="text-red-600 text-center mt-2">
                  ❌ Failed to send message. Try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
