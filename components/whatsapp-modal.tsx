"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  Megaphone,
  CircuitBoard,
  HelpCircle,
  Copy,
  Check,
  PhoneCall,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function WhatsAppModal() {
  const [open, setOpen] = useState(false)
  const [selectedIntent, setSelectedIntent] = useState<string>("robotics")
  const [customNote, setCustomNote] = useState<string>("")
  const [copiedPhone, setCopiedPhone] = useState(false)

  const phoneNumber = "919946686844"
  const rawNumberDisplay = "+91 9946686844"

  const intents = [
    {
      id: "robotics",
      icon: <Bot className="w-4 h-4 text-primary" />,
      title: "Robotics & STEM Training",
      preset: "Hi Adilsha! I'm interested in discussing a Robotics Workshop / STEM Training program for our school/institution.",
    },
    {
      id: "embedded",
      icon: <CircuitBoard className="w-4 h-4 text-emerald-500" />,
      title: "Embedded & IoT Development",
      preset: "Hi Adilsha! I have an embedded hardware / IoT prototype requirement and would love to collaborate.",
    },
    {
      id: "marketing",
      icon: <Megaphone className="w-4 h-4 text-amber-500" />,
      title: "Performance Marketing & Ads",
      preset: "Hi Adilsha! I'm looking for high-converting Meta Ads, lead generation, and graphic design for our brand.",
    },
    {
      id: "general",
      icon: <Sparkles className="w-4 h-4 text-blue-500" />,
      title: "General Opportunity / Hire",
      preset: "Hi Adilsha! I saw your portfolio and would like to discuss a job / project opportunity with you.",
    },
  ]

  const currentPreset = intents.find((i) => i.id === selectedIntent)?.preset ?? ""

  const handleLaunch = () => {
    const finalMessage = customNote.trim() ? `${currentPreset}\n\nNote: ${customNote}` : currentPreset
    const encoded = encodeURIComponent(finalMessage)
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank")
    setOpen(false)
  }

  const copyPhone = () => {
    navigator.clipboard.writeText("+919946686844")
    setCopiedPhone(true)
    toast.success("Phone number copied to clipboard!")
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <MessageCircle size={16} />
        <span>1-Click WhatsApp</span>
      </button>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-card border rounded-3xl shadow-2xl p-4 sm:p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Connect on WhatsApp</h3>
                    <p className="text-xs text-muted-foreground">Direct conversation with Mohammed Adilsha</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Intent Selection */}
              <div className="py-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Select your inquiry topic:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {intents.map((intent) => (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => setSelectedIntent(intent.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                        selectedIntent === intent.id
                          ? "bg-emerald-500/10 border-emerald-500 text-foreground ring-1 ring-emerald-500"
                          : "bg-muted/40 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {intent.icon}
                      <span className="truncate">{intent.title}</span>
                    </button>
                  ))}
                </div>

                {/* Message Preview */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    Message Preview:
                  </label>
                  <div className="p-3 bg-muted/70 rounded-xl border font-sans text-xs text-foreground/90 italic leading-relaxed">
                    &ldquo;{currentPreset}&rdquo;
                  </div>
                </div>

                {/* Optional Custom Note */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    Add custom message or project link (optional):
                  </label>
                  <textarea
                    rows={2}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g., We have a batch of 40 students starting next month..."
                    className="w-full p-2.5 bg-background border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <Button
                  onClick={handleLaunch}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-5 text-xs sm:text-sm font-semibold rounded-xl gap-2"
                >
                  <Send size={16} /> Open in WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={copyPhone}
                  className="py-5 text-xs rounded-xl gap-1.5 border-dashed"
                >
                  {copiedPhone ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{rawNumberDisplay}</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
