"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy, Check } from "lucide-react"
import { toast } from "sonner"

type CommandOutput = {
  command: string
  response: React.ReactNode
  timestamp: string
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "whoami",
      response: (
        <div className="space-y-1 text-xs sm:text-sm">
          <p className="text-emerald-400 font-semibold">Mohammed Adilsha Afsar M</p>
          <p className="text-muted-foreground">
            Electronics & Communication Engineer • Robotics Trainer • Performance Marketer
          </p>
        </div>
      ),
      timestamp: "10:00:00",
    },
    {
      command: "focus",
      response: (
        <div className="flex flex-wrap gap-1.5 text-xs">
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Embedded & IoT</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Autonomous Robotics</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Meta Ads & Growth</span>
          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">STEM Tinkering</span>
        </div>
      ),
      timestamp: "10:00:02",
    },
  ])

  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const quickCommands = ["help", "skills", "projects", "marketing", "contact", "cv", "clear"]

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

    if (trimmed === "clear" || trimmed === "cls") {
      setHistory([])
      setInput("")
      return
    }

    let response: React.ReactNode = null

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">Available terminal commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 font-mono">
              <div><span className="text-primary font-bold">whoami</span> - Identity & summary</div>
              <div><span className="text-primary font-bold">skills</span> - Hardware & software stack</div>
              <div><span className="text-primary font-bold">projects</span> - Flagship engineering builds</div>
              <div><span className="text-primary font-bold">marketing</span> - Growth marketing & design</div>
              <div><span className="text-primary font-bold">contact</span> - Phone, email & WhatsApp</div>
              <div><span className="text-primary font-bold">cv</span> - Download Adilsha&apos;s CV</div>
              <div><span className="text-primary font-bold">clear</span> - Clear terminal screen</div>
            </div>
          </div>
        )
        break

      case "whoami":
        response = (
          <div className="text-xs space-y-1">
            <p className="font-semibold text-foreground">Mohammed Adilsha Afsar M — ECE Engineer & Growth Marketer</p>
            <p className="text-muted-foreground">Location: Tirur, Kerala, India • Education: B.Tech ECE (KTU, 2024)</p>
            <p className="text-muted-foreground">Role: Robotics Trainer & IT Staff @ BenchMark International School</p>
          </div>
        )
        break

      case "skills":
        response = (
          <div className="text-xs space-y-2">
            <div>
              <span className="text-primary font-semibold">⚡ Hardware & Embedded:</span>
              <p className="text-muted-foreground">Raspberry Pi 4, Arduino, ESP32, ESP8266, OpenCV, Sensor Interfacing, UART/I2C/SPI</p>
            </div>
            <div>
              <span className="text-primary font-semibold">🚀 Growth & Marketing:</span>
              <p className="text-muted-foreground">Meta Ads Manager, Lead Gen, WhatsApp Funnels, Photoshop, Illustrator, Canva, SEO</p>
            </div>
            <div>
              <span className="text-primary font-semibold">🌐 Networking & Systems:</span>
              <p className="text-muted-foreground">CCNA 200-301, LAN/Router Config, CCTV Infrastructure, Linux, Python, C/C++</p>
            </div>
          </div>
        )
        break

      case "projects":
        response = (
          <div className="text-xs space-y-1.5 font-mono">
            <p className="text-muted-foreground">Selected Flagship Projects:</p>
            <div className="space-y-1">
              <div>🛒 <a href="/projects/smart-autonomous-shopping-trolley" className="text-primary underline hover:text-primary/80">Smart Autonomous Shopping Trolley</a> (Robotic Arm + Computer Vision)</div>
              <div>🏡 <a href="/projects/iot-automation-and-smart-home" className="text-primary underline hover:text-primary/80">IoT Automation & Smart Home</a> (ESP32/ESP8266 + Wireless Cloud)</div>
              <div>🤖 <a href="/projects/autonomous-robotics" className="text-primary underline hover:text-primary/80">Autonomous Mobile Robots</a> (Obstacle Avoidance & Motor Control)</div>
              <div>🔬 <a href="/projects/tinkering-lab-and-stem-labs" className="text-primary underline hover:text-primary/80">Tinkering Lab & STEM Curriculum</a> (300+ Students Mentored)</div>
            </div>
          </div>
        )
        break

      case "marketing":
        response = (
          <div className="text-xs space-y-1">
            <p className="text-emerald-400 font-semibold">Performance Marketing & Creative Direction:</p>
            <p className="text-muted-foreground">• 7+ Brands Managed (HiTech Educare, Jay Bharath College, BenchMark School, Metanoia Dental)</p>
            <p className="text-muted-foreground">• Meta Instant Forms, WhatsApp Lead Generation, Conversion Creatives</p>
            <a href="/marketing" className="text-primary underline font-medium inline-block mt-1">Explore Marketing & Design Portfolio →</a>
          </div>
        )
        break

      case "contact":
        response = (
          <div className="text-xs space-y-1 font-mono">
            <p>📧 Email: <a href="mailto:mohammedadilshaafsarm@gmail.com" className="text-primary underline">mohammedadilshaafsarm@gmail.com</a></p>
            <p>📱 WhatsApp: <a href="https://wa.me/919946686844" target="_blank" rel="noreferrer" className="text-primary underline">+91 9946686844</a></p>
            <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/mohd-adilsha" target="_blank" rel="noreferrer" className="text-primary underline">linkedin.com/in/mohd-adilsha</a></p>
          </div>
        )
        break

      case "cv":
      case "resume":
        response = (
          <div className="text-xs space-y-1">
            <p className="text-emerald-400">📄 CV ready for download:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="/Adilsha_CV.pdf"
                download="Mohammed_Adilsha_CV.pdf"
                className="px-2.5 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1 hover:bg-primary/90"
              >
                Download Engineering CV (PDF)
              </a>
              <a
                href="/design-portfolio.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-secondary text-secondary-foreground text-xs font-semibold inline-flex items-center gap-1 hover:bg-secondary/80"
              >
                View Creative Portfolio (PDF)
              </a>
            </div>
          </div>
        )
        break

      default:
        response = (
          <div className="text-xs text-red-400">
            command not found: &apos;{trimmed}&apos;. Type <span className="text-primary font-bold cursor-pointer underline" onClick={() => handleCommand("help")}>help</span> for a list of available commands.
          </div>
        )
    }

    setHistory((prev) => [...prev, { command: cmd, response, timestamp: now }])
    setInput("")
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
  }

  const copyTerminalOutput = () => {
    const text = history.map((h) => `> ${h.command}`).join("\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Terminal history copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  return (
    <div className="w-full rounded-2xl border bg-card/95 backdrop-blur-md shadow-2xl overflow-hidden border-border/80 transition-all hover:border-primary/40">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/70 border-b border-border/60 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-muted-foreground">
            <TerminalIcon size={13} className="text-primary" />
            <span>adilsha@terminal:~$</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalOutput}
            aria-label="Copy terminal text"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted"
            title="Copy history"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
          <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/30 border-b border-border/40 overflow-x-auto text-[11px] font-mono scrollbar-none">
        <span className="text-muted-foreground flex items-center gap-1 shrink-0">
          <Sparkles size={11} className="text-primary" /> quick:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded-md bg-secondary/80 hover:bg-primary hover:text-primary-foreground text-secondary-foreground transition-colors font-medium cursor-pointer shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Screen */}
      <div
        className="p-4 font-mono text-[13px] text-foreground/90 space-y-3 max-h-72 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">➜</span>
                <span className="text-primary font-semibold">~</span>
                <span className="text-foreground font-semibold">{item.command}</span>
              </div>
              <span className="text-[10px] opacity-60">{item.timestamp}</span>
            </div>
            <div className="pl-4 py-1 text-muted-foreground border-l-2 border-primary/20">{item.response}</div>
          </div>
        ))}

        {/* Input prompt */}
        <form onSubmit={onSubmit} className="flex items-center gap-1.5 pt-1">
          <span className="text-emerald-500 font-bold text-sm">➜</span>
          <span className="text-primary font-semibold text-sm">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' or click a quick tag above..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] text-foreground placeholder:text-muted-foreground/50"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            aria-label="Execute command"
            className="text-muted-foreground hover:text-primary transition-colors p-1"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
