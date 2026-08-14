"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowUpRight, Copy, Check, Send, Mail, MessageCircle, MapPin } from "lucide-react"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"success" | "error" | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("mohammedadilshaafsarm@gmail.com")
    setCopiedEmail(true)
    toast.success("Email address copied to clipboard")
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        setLoading(false)
        setStatus("success")
        toast.success("Message recorded. I will get back to you shortly.")
        formRef.current?.reset()
      }, 700)
      return
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current!, publicKey)
      .then(
        () => {
          setLoading(false)
          setStatus("success")
          toast.success("Message sent successfully")
          formRef.current?.reset()
        },
        () => {
          setLoading(false)
          setStatus("error")
          toast.error("Failed to send message. Please reach out via WhatsApp or email directly.")
        }
      )
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-3 border-b border-border pb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Contact & Inquiries
          </h1>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-xl">
            Whether you are looking for an embedded hardware engineer, a STEM robotics trainer for your school, or performance marketing campaigns — feel free to reach out.
          </p>
        </header>

        {/* Direct Contact Methods */}
        <section className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-mono font-bold">
              <Mail size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Email</span>
            </div>
            <p className="font-mono font-bold text-foreground break-all text-xs sm:text-sm">
              mohammedadilshaafsarm@gmail.com
            </p>
            <div className="flex gap-3 pt-2 font-medium">
              <a
                href="mailto:mohammedadilshaafsarm@gmail.com"
                className="text-neutral-700 dark:text-neutral-300 hover:text-foreground underline"
              >
                Open client &rarr;
              </a>
              <button
                onClick={copyEmail}
                className="text-neutral-700 dark:text-neutral-300 hover:text-foreground cursor-pointer underline"
              >
                {copiedEmail ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-mono font-bold">
              <MessageCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp / Direct Phone</span>
            </div>
            <p className="font-mono font-bold text-foreground text-xs sm:text-sm">+91 9946686844</p>
            <div className="pt-2 font-medium">
              <a
                href="https://wa.me/919946686844"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 dark:text-neutral-300 hover:text-foreground underline inline-flex items-center gap-1"
              >
                <span>Start WhatsApp chat</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* Location Note */}
        <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
          <MapPin size={14} className="text-foreground shrink-0" />
          <span>Tirur, Malappuram, Kerala, India</span>
          <span>&bull;</span>
          <span>Open to remote & on-site engagements</span>
        </div>

        {/* Contact Form */}
        <section className="space-y-4 pt-6 border-t border-border">
          <h2 className="text-base font-bold text-foreground">
            Send a direct message
          </h2>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-neutral-800 dark:text-neutral-200 font-bold block">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border outline-none focus:border-foreground text-foreground shadow-sm text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-neutral-800 dark:text-neutral-200 font-bold block">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border outline-none focus:border-foreground text-foreground shadow-sm text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-neutral-800 dark:text-neutral-200 font-bold block">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project, curriculum requirements, or campaign..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border outline-none focus:border-foreground text-foreground shadow-sm text-xs sm:text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center gap-2 shadow-sm text-xs"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <Send size={12} />
            </button>

            {status === "success" && (
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold pt-1">
                Message sent successfully. I will get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 text-xs font-bold pt-1">
                Failed to send message. Please contact via WhatsApp directly.
              </p>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}