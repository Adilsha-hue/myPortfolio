"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import {
  Search,
  FileText,
  Briefcase,
  Cpu,
  Megaphone,
  Mail,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react"
import { toast } from "sonner"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      {/* Trigger Button in Navbar / Fixed UI */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-muted/50 hover:bg-muted border rounded-full transition-colors cursor-pointer"
        aria-label="Open Command Palette"
      >
        <Search size={13} className="text-primary" />
        <span className="hidden sm:inline">Quick Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-background border rounded text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Command Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-card border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="w-full">
              <div className="flex items-center px-4 border-b">
                <Search size={18} className="text-muted-foreground mr-3 shrink-0" />
                <Command.Input
                  placeholder="Search projects, skills, CV, marketing..."
                  className="w-full py-3.5 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-muted border rounded text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1 text-sm">
                <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
                  No matching results found.
                </Command.Empty>

                {/* Quick Navigation */}
                <Command.Group heading="Navigation" className="text-[11px] font-semibold text-muted-foreground px-2 py-1">
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <Sparkles size={16} className="text-primary" />
                    <span>Home & Summary</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects"))}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <Cpu size={16} className="text-blue-500" />
                    <span>Engineering & Robotics Projects</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/marketing"))}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <Megaphone size={16} className="text-emerald-500" />
                    <span>Performance Marketing & Creative Work</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/about"))}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <Briefcase size={16} className="text-amber-500" />
                    <span>About Me & Experience</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/services"))}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <Code2 size={16} className="text-purple-500" />
                    <span>Services & STEM Training</span>
                  </Command.Item>
                </Command.Group>

                {/* Featured Projects */}
                <Command.Group heading="Featured Projects" className="text-[11px] font-semibold text-muted-foreground px-2 py-1 pt-2">
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects/smart-autonomous-shopping-trolley"))}
                    className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu size={16} className="text-primary" />
                      <div>
                        <p className="text-xs font-semibold">Smart Autonomous Shopping Trolley</p>
                        <p className="text-[10px] text-muted-foreground">Raspberry Pi + Robotic Arm + OpenCV</p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground" />
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects/iot-automation-and-smart-home"))}
                    className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu size={16} className="text-emerald-500" />
                      <div>
                        <p className="text-xs font-semibold">IoT Automation & Smart Home</p>
                        <p className="text-[10px] text-muted-foreground">ESP32 / ESP8266 Wireless Controllers</p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground" />
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects/tinkering-lab-and-stem-labs"))}
                    className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu size={16} className="text-rose-500" />
                      <div>
                        <p className="text-xs font-semibold">Tinkering Lab & STEM Education</p>
                        <p className="text-[10px] text-muted-foreground">BenchMark International School</p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground" />
                  </Command.Item>
                </Command.Group>

                {/* Quick Actions */}
                <Command.Group heading="Quick Actions & CV" className="text-[11px] font-semibold text-muted-foreground px-2 py-1 pt-2">
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => {
                        window.open("/Adilsha_CV.pdf", "_blank")
                        toast.success("Opening Engineering CV (PDF)")
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <FileText size={16} className="text-primary" />
                    <span>Download Engineering CV (PDF)</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => {
                        window.open("/design-portfolio.pdf", "_blank")
                        toast.success("Opening Creative Portfolio (PDF)")
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <FileText size={16} className="text-emerald-500" />
                    <span>View Creative Director Portfolio (PDF)</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => {
                        window.open("https://wa.me/919946686844?text=Hi%20Adilsha,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!", "_blank")
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <MessageCircle size={16} className="text-green-500" />
                    <span>Quick Chat on WhatsApp (+91 9946686844)</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => {
                        navigator.clipboard.writeText("mohammedadilshaafsarm@gmail.com")
                        toast.success("Copied email: mohammedadilshaafsarm@gmail.com")
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted aria-selected:bg-muted text-foreground"
                  >
                    <Mail size={16} className="text-blue-500" />
                    <span>Copy Email Address</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}
