"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Pen,
  Paintbrush,
  Type,
  Eraser,
  MousePointer2,
  Minus,
  MoveUpRight,
  Square,
  Circle,
  CircleDashed,
  Triangle,
  Star,
  Trash2,
  Download,
  Sparkles,
  Maximize2,
  X,
  ScanText,
  Italic,
} from "lucide-react"

const SWATCHES = [
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#a8a29e",
  "#1f2937",
  "#ffffff",
  "#000000",
]

type Tool =
  | "move"
  | "pen"
  | "marker"
  | "text"
  | "eraser"
  | "line"
  | "arrow"
  | "rect"
  | "circle"
  | "ellipse"
  | "triangle"
  | "star"

type ShapeKind =
  | "line"
  | "arrow"
  | "rect"
  | "circle"
  | "ellipse"
  | "triangle"
  | "star"
  | "pen"
  | "text"

type Obj = {
  id: number
  kind: ShapeKind
  color: string
  size: number
  x: number
  y: number
  w: number
  h: number
  points?: { x: number; y: number }[]
  text?: string
  font?: "mono" | "sans" | "serif"
  bold?: boolean
  italic?: boolean
  fill?: boolean
  opacity?: number
}

const FONT_STACK: Record<"mono" | "sans" | "serif", string> = {
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  sans: "Inter, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
}

const GRID_CLS =
  "bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]"

const FX_FILTERS: { id: string; label: string; css: string }[] = [
  { id: "none", label: "NONE", css: "" },
  { id: "blur", label: "BLUR", css: "blur(2px)" },
  { id: "invert", label: "INVERT", css: "invert(1)" },
  { id: "drop", label: "DROP", css: "drop-shadow(0 0 6px rgba(0,0,0,0.45))" },
  { id: "gray", label: "GRAY", css: "grayscale(1)" },
  { id: "sepia", label: "SEPIA", css: "sepia(0.85)" },
  { id: "hue", label: "HUE", css: "hue-rotate(120deg) saturate(1.4)" },
  { id: "warm", label: "WARM", css: "sepia(0.35) saturate(1.6) contrast(1.05) brightness(1.03)" },
  { id: "cool", label: "COOL", css: "hue-rotate(200deg) saturate(0.85) brightness(1.05)" },
  { id: "punch", label: "PUNCH", css: "contrast(1.25) saturate(1.5) brightness(1.02)" },
  { id: "glow", label: "GLOW", css: "blur(0.6px) brightness(1.15) saturate(1.3)" },
]

const DRAW_TOOLS: { id: Tool; label: string; icon: typeof Pen }[] = [
  { id: "move", label: "MOVE", icon: MousePointer2 },
  { id: "pen", label: "PEN", icon: Pen },
  { id: "marker", label: "MARKER", icon: Paintbrush },
  { id: "text", label: "TEXT", icon: Type },
  { id: "eraser", label: "ERASE", icon: Eraser },
]

const SHAPE_TOOLS: { id: Tool; label: string; icon: typeof Pen }[] = [
  { id: "line", label: "LINE", icon: Minus },
  { id: "arrow", label: "ARROW", icon: MoveUpRight },
  { id: "rect", label: "RECT", icon: Square },
  { id: "circle", label: "CIRCLE", icon: Circle },
  { id: "ellipse", label: "OVAL", icon: CircleDashed },
  { id: "triangle", label: "TRIANGLE", icon: Triangle },
  { id: "star", label: "STAR", icon: Star },
]

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y)

const pointSegDist = (p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) => {
  const l2 = dist(a, b) ** 2
  if (l2 === 0) return dist(p, a)
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2
  t = Math.max(0, Math.min(1, t))
  return dist(p, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) })
}

const farthestPoint = (points: { x: number; y: number }[], ox: number, oy: number) => {
  let best = points[0]
  let bestD = -1
  for (const p of points) {
    const d = Math.hypot(p.x - ox, p.y - oy)
    if (d > bestD) {
      bestD = d
      best = p
    }
  }
  return best
}

// Snap a freehand stroke to a perfect shape (line, circle, ellipse, rect, triangle).
function recognizeStroke(points: { x: number; y: number }[]) {
  if (points.length < 5) return null
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity,
    sumX = 0,
    sumY = 0
  for (const p of points) {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
    sumX += p.x
    sumY += p.y
  }
  const W = maxX - minX
  const H = maxY - minY
  const n = points.length
  const cx = sumX / n
  const cy = sumY / n
  if (W < 6 && H < 6) return null

  const a = points[0]
  const b = points[points.length - 1]

  // LINE
  const len = dist(a, b)
  if (len > 12 && (W > 3 * H || H > 3 * W)) {
    let maxDev = 0
    for (const p of points) maxDev = Math.max(maxDev, pointSegDist(p, a, b))
    if (maxDev < Math.max(4, len * 0.12)) return { type: "line" as const, x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y }
  }

  // CIRCLE / ELLIPSE
  {
    let rSum = 0
    const rs: number[] = []
    for (const p of points) {
      const r = Math.hypot(p.x - cx, p.y - cy)
      rs.push(r)
      rSum += r
    }
    const mean = rSum / n
    let variance = 0
    for (const r of rs) variance += (r - mean) ** 2
    variance /= n
    const cv = Math.sqrt(variance) / Math.max(mean, 0.0001)
    if (cv < 0.18 && mean > 6) {
      const aspect = Math.max(W, H) / Math.max(Math.min(W, H), 1)
      if (aspect < 1.4) return { type: "circle" as const, x: cx - mean, y: cy - mean, w: mean * 2, h: mean * 2 }
      return { type: "ellipse" as const, x: minX, y: minY, w: W, h: H }
    }
  }

  // RECT
  {
    const thresh = Math.max(3, Math.min(W, H) * 0.15)
    let onEdge = 0
    for (const p of points) {
      const d = Math.min(Math.abs(p.x - minX), Math.abs(p.x - maxX), Math.abs(p.y - minY), Math.abs(p.y - maxY))
      if (d < thresh) onEdge++
    }
    if (onEdge / n > 0.8 && W > 10 && H > 10) return { type: "rect" as const, x: minX, y: minY, w: W, h: H }
  }

  // TRIANGLE
  {
    const c1 = farthestPoint(points, cx, cy)
    const c2 = farthestPoint(points, c1.x, c1.y)
    let best = -1
    let c3 = c1
    for (const p of points) {
      const d = Math.min(dist(p, c1), dist(p, c2))
      if (d > best) {
        best = d
        c3 = p
      }
    }
    const thresh = Math.max(4, Math.hypot(W, H) * 0.12)
    let near = 0
    for (const p of points) {
      const d = Math.min(pointSegDist(p, c1, c2), pointSegDist(p, c2, c3), pointSegDist(p, c3, c1))
      if (d < thresh) near++
    }
    if (near / n > 0.8 && best > 8) {
      const tX = Math.min(c1.x, c2.x, c3.x)
      const tY = Math.min(c1.y, c2.y, c3.y)
      const tW = Math.max(c1.x, c2.x, c3.x) - tX
      const tH = Math.max(c1.y, c2.y, c3.y) - tY
      return { type: "triangle" as const, x: tX, y: tY, w: tW, h: tH }
    }
  }

  return null
}

function renderObject(ctx: CanvasRenderingContext2D, o: Obj) {
  ctx.save()
  ctx.strokeStyle = o.color
  ctx.lineWidth = o.size
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.fillStyle = o.color
  ctx.globalAlpha = o.opacity ?? 1
  const fill = !!o.fill && o.kind !== "pen" && o.kind !== "text" && o.kind !== "line" && o.kind !== "arrow"

  switch (o.kind) {
    case "line":
      ctx.beginPath()
      ctx.moveTo(o.x, o.y)
      ctx.lineTo(o.x + o.w, o.y + o.h)
      ctx.stroke()
      break
    case "arrow": {
      const ex = o.x + o.w
      const ey = o.y + o.h
      const ang = Math.atan2(ey - o.y, ex - o.x)
      const L = Math.max(12, o.size * 5)
      ctx.beginPath()
      ctx.moveTo(o.x, o.y)
      ctx.lineTo(ex, ey)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(ex, ey)
      ctx.lineTo(ex - L * Math.cos(ang - Math.PI / 6), ey - L * Math.sin(ang - Math.PI / 6))
      ctx.moveTo(ex, ey)
      ctx.lineTo(ex - L * Math.cos(ang + Math.PI / 6), ey - L * Math.sin(ang + Math.PI / 6))
      ctx.stroke()
      break
    }
    case "rect":
      ctx.beginPath()
      ctx.rect(o.x, o.y, o.w, o.h)
      if (fill) ctx.fill()
      ctx.stroke()
      break
    case "circle": {
      const cxc = o.x + o.w / 2
      const cyc = o.y + o.h / 2
      const r = Math.max(Math.abs(o.w), Math.abs(o.h)) / 2
      ctx.beginPath()
      ctx.arc(cxc, cyc, r, 0, Math.PI * 2)
      if (fill) ctx.fill()
      ctx.stroke()
      break
    }
    case "ellipse": {
      ctx.beginPath()
      ctx.ellipse(o.x + o.w / 2, o.y + o.h / 2, Math.abs(o.w) / 2, Math.abs(o.h) / 2, 0, 0, Math.PI * 2)
      if (fill) ctx.fill()
      ctx.stroke()
      break
    }
    case "triangle":
      ctx.beginPath()
      ctx.moveTo(o.x + o.w / 2, o.y)
      ctx.lineTo(o.x + o.w, o.y + o.h)
      ctx.lineTo(o.x, o.y + o.h)
      ctx.closePath()
      if (fill) ctx.fill()
      ctx.stroke()
      break
    case "star": {
      const sxc = o.x + o.w / 2
      const syc = o.y + o.h / 2
      const R = Math.max(Math.abs(o.w), Math.abs(o.h)) / 2
      const r = R * 0.42
      ctx.beginPath()
      for (let i = 0; i < 10; i++) {
        const ang = -Math.PI / 2 + (i * Math.PI) / 5
        const rr = i % 2 === 0 ? R : r
        const px = sxc + Math.cos(ang) * rr
        const py = syc + Math.sin(ang) * rr
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      if (fill) ctx.fill()
      ctx.stroke()
      break
    }
    case "pen": {
      if (!o.points || o.points.length === 0) break
      ctx.beginPath()
      if (o.points.length === 1) {
        ctx.arc(o.points[0].x, o.points[0].y, o.size / 2, 0, Math.PI * 2)
        ctx.fill()
        break
      }
      ctx.moveTo(o.points[0].x, o.points[0].y)
      for (let i = 1; i < o.points.length - 1; i++) {
        const mx = (o.points[i].x + o.points[i + 1].x) / 2
        const my = (o.points[i].y + o.points[i + 1].y) / 2
        ctx.quadraticCurveTo(o.points[i].x, o.points[i].y, mx, my)
      }
      ctx.lineTo(o.points[o.points.length - 1].x, o.points[o.points.length - 1].y)
      ctx.stroke()
      break
    }
    case "text": {
      const fs = Math.max(14, o.size * 3)
      const fam = FONT_STACK[o.font ?? "mono"]
      const style = o.italic ? "italic" : "normal"
      ctx.font = `${style} ${o.bold === false ? "400" : "700"} ${fs}px ${fam}`
      ctx.textBaseline = "top"
      ctx.fillText(o.text ?? "", o.x, o.y)
      break
    }
  }
  ctx.restore()
}

const getBounds = (o: Obj) => {
  if (o.kind === "text") {
    const fs = Math.max(14, o.size * 3)
    return { x: o.x - 2, y: o.y - 2, w: (o.text?.length ?? 0) * fs * 0.62 + 4, h: fs + 4 }
  }
  if (o.kind === "pen" && o.points?.length) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity
    for (const p of o.points) {
      minX = Math.min(minX, p.x)
      maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y)
      maxY = Math.max(maxY, p.y)
    }
    return { x: minX, y: minY, w: Math.max(maxX - minX, 4), h: Math.max(maxY - minY, 4) }
  }
  const x = Math.min(o.x, o.x + o.w)
  const y = Math.min(o.y, o.y + o.h)
  return { x, y, w: Math.max(Math.abs(o.w), 4), h: Math.max(Math.abs(o.h), 4) }
}

export function InteractiveCreativeStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const miniCanvasRef = useRef<HTMLCanvasElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)
  const objectsRef = useRef<Obj[]>([])
  const selectedRef = useRef<number | null>(null)
  const activeIdRef = useRef<number | null>(null)
  const shapeStartRef = useRef({ x: 0, y: 0 })
  const movingRef = useRef<{ id: number; px: number; py: number } | null>(null)
  const eraseActiveRef = useRef(false)
  const idCounter = useRef(0)
  const demoRef = useRef<number | null>(null)
  const seededRef = useRef(false)
  const pendingTextRef = useRef<{ x: number; y: number } | null>(null)

  const [expanded, setExpanded] = useState(false)
  const [tool, setTool] = useState<Tool>("move")
  const [color, setColor] = useState("#10b981")
  const [size, setSize] = useState(4)
  const [fillEnabled, setFillEnabled] = useState(false)
  const [snapEnabled, setSnapEnabled] = useState(true)
  const [font, setFont] = useState<"mono" | "sans" | "serif">("mono")
  const [bold, setBold] = useState(true)
  const [italic, setItalic] = useState(false)
  const [fx, setFx] = useState(FX_FILTERS[0].id)
  const [demo, setDemo] = useState(false)
  const [version, setVersion] = useState(0)
  const [pendingText, setPendingText] = useState<{ x: number; y: number } | null>(null)
  const [textValue, setTextValue] = useState("")
  const [textifyingId, setTextifyingId] = useState<number | null>(null)
  const [ocrStatus, setOcrStatus] = useState<string | null>(null)
  const [scribble, setScribble] = useState<{ id: number; x: number; y: number; w: number; h: number } | null>(null)

  const bump = () => setVersion((v) => v + 1)

  useEffect(() => {
    pendingTextRef.current = pendingText
    if (pendingText && textInputRef.current) {
      textInputRef.current.focus()
    }
  }, [pendingText])

  // Apply a color: recolors the selected shape live, otherwise sets the active brush color.
  const applyColor = (c: string) => {
    setColor(c)
    const sel = objectsRef.current.find((o) => o.id === selectedRef.current)
    if (sel) {
      sel.color = c
      drawAll()
      bump()
    }
  }

  const applyFont = (f: "mono" | "sans" | "serif") => {
    setFont(f)
    const sel = objectsRef.current.find((o) => o.id === selectedRef.current)
    if (sel && sel.kind === "text") {
      sel.font = f
      drawAll()
      bump()
    }
  }

  const applyBold = () => {
    setBold(!bold)
    const sel = objectsRef.current.find((o) => o.id === selectedRef.current)
    if (sel && sel.kind === "text") {
      sel.bold = !sel.bold
      drawAll()
      bump()
    }
  }

  const applyItalic = () => {
    setItalic(!italic)
    const sel = objectsRef.current.find((o) => o.id === selectedRef.current)
    if (sel && sel.kind === "text") {
      sel.italic = !sel.italic
      drawAll()
      bump()
    }
  }

  const sizeCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)
  }

  const drawAll = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.globalCompositeOperation = "source-over"
    for (const o of objectsRef.current) renderObject(ctx, o)
    const sel = objectsRef.current.find((o) => o.id === selectedRef.current)
    if (sel) {
      const b = getBounds(sel)
      ctx.setLineDash([4, 4])
      ctx.strokeStyle = "#6366f1"
      ctx.lineWidth = 1.2
      ctx.strokeRect(b.x - 4, b.y - 4, b.w + 8, b.h + 8)
      ctx.setLineDash([])
    }
  }

  const drawSpiral = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const maxR = Math.max(rect.width, rect.height) * 0.42
    ctx.globalCompositeOperation = "source-over"
    ctx.lineCap = "round"
    ctx.globalAlpha = 0.85
    for (let t = 0; t <= 1; t += 0.012) {
      const a1 = t * 3.5 * Math.PI * 2
      const a2 = Math.min(t + 0.02, 1) * 3.5 * Math.PI * 2
      const r1 = t * maxR
      const r2 = Math.min(t + 0.02, 1) * maxR
      ctx.strokeStyle = SWATCHES[Math.floor(t * SWATCHES.length) % SWATCHES.length]
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a1) * r1, cy + Math.sin(a1) * r1)
      ctx.lineTo(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  const seedObjects = (rect: { width: number; height: number }) => {
    const pts: { x: number; y: number }[] = []
    const ox = rect.width * 0.18
    const oy = rect.height * 0.3
    for (let t = 0; t <= 1; t += 0.015) {
      const a = t * 3.5 * Math.PI * 2
      const r = t * rect.height * 0.22
      pts.push({ x: ox + Math.cos(a) * r, y: oy + Math.sin(a) * r })
    }
    objectsRef.current.push({ id: ++idCounter.current, kind: "pen", color: "#10b981", size: 3, x: 0, y: 0, w: 0, h: 0, points: pts })
    objectsRef.current.push({ id: ++idCounter.current, kind: "star", color: "#f59e0b", size: 3, x: rect.width * 0.55, y: rect.height * 0.12, w: 70, h: 70 })
    objectsRef.current.push({ id: ++idCounter.current, kind: "circle", color: "#8b5cf6", size: 3, x: rect.width * 0.68, y: rect.height * 0.62, w: 66, h: 66 })
    objectsRef.current.push({
      id: ++idCounter.current,
      kind: "text",
      color: "#1f2937",
      size: 8,
      x: rect.width * 0.08,
      y: rect.height * 0.16,
      w: 0,
      h: 0,
      text: "HELLO — MOVE ME",
      font: "mono",
      bold: true,
    })
  }

  useEffect(() => {
    const mini = miniCanvasRef.current
    if (!mini) return
    sizeCanvas(mini)
    drawSpiral(mini)
    const onResize = () => {
      const prev = mini.getContext("2d")?.getImageData(0, 0, mini.width, mini.height)
      sizeCanvas(mini)
      if (prev) mini.getContext("2d")?.putImageData(prev, 0, 0)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useLayoutEffect(() => {
    if (!expanded) return
    const canvas = canvasRef.current
    if (!canvas) return
    sizeCanvas(canvas)
    if (!seededRef.current) {
      seededRef.current = true
      seedObjects({ width: canvas.getBoundingClientRect().width, height: canvas.getBoundingClientRect().height })
    }
    drawAll()
    const onResize = () => {
      const ctx = canvas.getContext("2d")
      const prev = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      sizeCanvas(canvas)
      if (prev) ctx?.putImageData(prev, 0, 0)
    }
    window.addEventListener("resize", onResize)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (pendingTextRef.current) {
          setPendingText(null)
          setTextValue("")
        } else {
          setExpanded(false)
        }
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !pendingTextRef.current && selectedRef.current !== null) {
        objectsRef.current = objectsRef.current.filter((o) => o.id !== selectedRef.current)
        selectedRef.current = null
        drawAll()
        bump()
      }
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      if (demoRef.current) {
        cancelAnimationFrame(demoRef.current)
        demoRef.current = null
      }
      setDemo(false)
      if (miniCanvasRef.current) {
        const ctx = canvas.getContext("2d")
        const mctx = miniCanvasRef.current.getContext("2d")
        if (ctx && mctx) {
          mctx.setTransform(1, 0, 0, 1, 0, 0)
          mctx.clearRect(0, 0, miniCanvasRef.current.width, miniCanvasRef.current.height)
          mctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, miniCanvasRef.current.width, miniCanvasRef.current.height)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded])

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (demo) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const { x, y } = getPos(e)

    if (tool === "text") {
      e.preventDefault()
      setPendingText({ x, y })
      setTextValue("")
      return
    }

    e.currentTarget.setPointerCapture(e.pointerId)

    if (tool === "move") {
      const hit = objectsRef.current
        .slice()
        .reverse()
        .find((o) => {
          const b = getBounds(o)
          return x >= b.x - 6 && x <= b.x + b.w + 6 && y >= b.y - 6 && y <= b.y + b.h + 6
        })
      if (hit) {
        selectedRef.current = hit.id
        movingRef.current = { id: hit.id, px: x, py: y }
        if (hit.kind === "pen") {
          const b = getBounds(hit)
          setScribble({ id: hit.id, x: b.x, y: b.y, w: b.w, h: b.h })
        } else {
          setScribble(null)
        }
      } else {
        selectedRef.current = null
        setScribble(null)
      }
      drawAll()
      bump()
      return
    }
    if (tool === "eraser") {
      eraseActiveRef.current = true
      return
    }
    setScribble(null)

    const id = ++idCounter.current
    const isPen = tool === "pen" || tool === "marker"
    objectsRef.current.push({
      id,
      kind: isPen ? "pen" : tool,
      color,
      size: tool === "marker" ? Math.max(3, size * 2) : size,
      x,
      y,
      w: 0,
      h: 0,
      points: isPen ? [{ x, y }] : undefined,
      fill: fillEnabled,
      opacity: tool === "marker" ? 0.35 : 1,
    })
    activeIdRef.current = id
    shapeStartRef.current = { x, y }
    drawAll()
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (demo) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const { x, y } = getPos(e)

    if (movingRef.current) {
      const o = objectsRef.current.find((o) => o.id === movingRef.current!.id)
      if (o) {
        const dx = x - movingRef.current.px
        const dy = y - movingRef.current.py
        if (o.kind === "pen" && o.points) {
          for (const p of o.points) {
            p.x += dx
            p.y += dy
          }
        } else {
          o.x += dx
          o.y += dy
        }
        movingRef.current.px = x
        movingRef.current.py = y
        drawAll()
      }
      return
    }

    if (eraseActiveRef.current) {
      const before = objectsRef.current.length
      objectsRef.current = objectsRef.current.filter((o) => {
        const b = getBounds(o)
        return !(x >= b.x - 4 && x <= b.x + b.w + 4 && y >= b.y - 4 && y <= b.y + b.h + 4)
      })
      if (objectsRef.current.length !== before) {
        drawAll()
        bump()
      }
      return
    }

    const id = activeIdRef.current
    const o = objectsRef.current.find((o) => o.id === id)
    if (!o) return
    if (o.kind === "pen") {
      const pts = o.points!
      const last = pts[pts.length - 1]
      if (Math.hypot(x - last.x, y - last.y) > 1.5) {
        pts.push({ x, y })
        drawAll()
      }
    } else {
      o.x = Math.min(shapeStartRef.current.x, x)
      o.y = Math.min(shapeStartRef.current.y, y)
      o.w = Math.abs(x - shapeStartRef.current.x)
      o.h = Math.abs(y - shapeStartRef.current.y)
      drawAll()
    }
  }

  const handlePointerUp = () => {
    if (demo) return
    if (movingRef.current) {
      movingRef.current = null
      bump()
      return
    }
    if (eraseActiveRef.current) {
      eraseActiveRef.current = false
      return
    }
    if (tool === "text") return
    const id = activeIdRef.current
    const o = objectsRef.current.find((o) => o.id === id)
    if (!o) {
      activeIdRef.current = null
      return
    }
    if (o.kind === "pen") {
      const pts = o.points ?? []
      if (pts.length < 2) {
        objectsRef.current = objectsRef.current.filter((x) => x.id !== o.id)
      } else {
        const rec = snapEnabled ? recognizeStroke(pts) : null
        if (rec) {
          o.kind = rec.type
          o.x = rec.x
          o.y = rec.y
          o.w = rec.w
          o.h = rec.h
          o.points = undefined
          o.opacity = tool === "marker" ? 0.35 : 1
          setScribble(null)
        } else {
          const b = getBounds(o)
          setScribble({ id: o.id, x: b.x, y: b.y, w: b.w, h: b.h })
        }
      }
    } else if (Math.abs(o.w) < 4 && Math.abs(o.h) < 4) {
      objectsRef.current = objectsRef.current.filter((x) => x.id !== o.id)
      setScribble(null)
    }
    activeIdRef.current = null
    drawAll()
    bump()
  }

  const commitText = () => {
    if (pendingText) {
      const t = textValue.trim()
      if (t) {
        objectsRef.current.push({
          id: ++idCounter.current,
          kind: "text",
          color,
          size: Math.max(5, size),
          x: pendingText.x,
          y: pendingText.y,
          w: 0,
          h: 0,
          text: t,
          font,
          bold,
        })
        drawAll()
        bump()
      }
    }
    setPendingText(null)
    setTextValue("")
  }

  // Apple-Scribble style: turn a freeform pen stroke into an editable text object via OCR.
  const textifyStroke = async (o: Obj) => {
    if (!o.points || o.points.length < 2) return
    setTextifyingId(o.id)
    setOcrStatus("LOADING OCR ENGINE…")
    try {
      const { createWorker } = await import("tesseract.js")
      const b = getBounds(o)
      const scale = 4
      const pad = 40
      const cw = Math.max(b.w * scale + pad * 2, 240)
      const ch = Math.max(b.h * scale + pad * 2, 100)
      const off = document.createElement("canvas")
      off.width = cw
      off.height = ch
      const ctx = off.getContext("2d")!
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, cw, ch)
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 7 * scale
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      o.points.forEach((p, i) => {
        const px = (p.x - b.x) * scale + pad
        const py = (p.y - b.y) * scale + pad
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.stroke()

      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") setOcrStatus(`READING HANDWRITING… ${Math.round(m.progress * 100)}%`)
        },
      })
      const { data } = await worker.recognize(off)
      await worker.terminate()
      const text = (data.text ?? "").replace(/\s+/g, " ").trim()
      if (text) {
        objectsRef.current = objectsRef.current.filter((x) => x.id !== o.id)
        const nid = ++idCounter.current
        objectsRef.current.push({
          id: nid,
          kind: "text",
          color,
          size: Math.max(5, Math.min(12, b.h / 3)),
          x: b.x,
          y: b.y,
          w: 0,
          h: 0,
          text,
          font,
          bold,
          italic,
        })
        selectedRef.current = nid
        drawAll()
        bump()
        setScribble(null)
        setOcrStatus(`TEXT → "${text}"`)
      } else {
        setOcrStatus("NO TEXT READ — TRY LARGER PRINTED STROKES")
      }
    } catch (err) {
      console.error("OCR failed:", err)
      setOcrStatus("OCR UNAVAILABLE (CHECK NETWORK?)")
    } finally {
      setTextifyingId(null)
      window.setTimeout(() => setOcrStatus(null), 2600)
    }
  }

  const clearCanvas = () => {
    objectsRef.current = []
    selectedRef.current = null
    activeIdRef.current = null
    setScribble(null)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    bump()
  }

  const runDemo = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    clearCanvas()
    drawingLock()
    setDemo(true)
    const rect = canvas.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const startTime = performance.now()
    const duration = 6000
    const maxR = Math.max(rect.width, rect.height) * 0.42
    const turns = 3.5

    const frame = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      if (t >= 1) {
        setDemo(false)
        demoRef.current = null
        return
      }
      ctx.globalCompositeOperation = "source-over"
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.globalAlpha = 0.8
      ctx.lineWidth = 7 - t * 5
      const a1 = t * turns * Math.PI * 2
      const a2 = Math.min(t + 0.025, 1) * turns * Math.PI * 2
      ctx.strokeStyle = SWATCHES[Math.floor(t * SWATCHES.length) % SWATCHES.length]
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a1) * (t * maxR), cy + Math.sin(a1) * (t * maxR))
      ctx.lineTo(cx + Math.cos(a2) * (Math.min(t + 0.025, 1) * maxR), cy + Math.sin(a2) * (Math.min(t + 0.025, 1) * maxR))
      ctx.stroke()
      ctx.globalAlpha = 1
      demoRef.current = requestAnimationFrame(frame)
    }
    demoRef.current = requestAnimationFrame(frame)
  }

  const drawingLock = () => {
    activeIdRef.current = null
    movingRef.current = null
    eraseActiveRef.current = false
  }

  const exportPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `adilsha_creative_canvas_${Date.now()}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const fxStyle = FX_FILTERS.find((f) => f.id === fx)?.css ?? ""
  const selectedObj = objectsRef.current.find((o) => o.id === selectedRef.current)
  const showFontControls = tool === "text" || (selectedObj?.kind === "text" && tool === "move")

  const toolBtnCls = (active: boolean) =>
    `px-2 sm:px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer inline-flex items-center gap-1.5 ${
      active ? "bg-amber-600 text-white shadow-sm" : "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
    }`

  const isShapeTool = (t: Tool) =>
    t === "line" || t === "arrow" || t === "rect" || t === "circle" || t === "ellipse" || t === "triangle" || t === "star"

  return (
    <>
      {/* Compact Collapsed Bar */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setExpanded(true)
          }
        }}
        data-cursor="OPEN STUDIO"
        className="w-full rounded-2xl border border-border bg-card shadow-md overflow-hidden cursor-pointer group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/60"
      >
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              CREATIVE CONSOLE
              <span className="hidden md:inline text-neutral-500 dark:text-neutral-400 normal-case tracking-normal font-medium">
                — performance marketing &amp; creative direction
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-neutral-600 dark:text-neutral-400 font-medium mt-0.5 truncate">
              12 TOOLS &bull; MOVE &bull; SNAP &bull; TEXT &bull; 11 COLOR FX
            </div>
          </div>

          <div className="hidden sm:block shrink-0" data-cursor="PREVIEW">
            <div className={`w-24 sm:w-32 h-14 sm:h-16 rounded-lg overflow-hidden border border-border ${GRID_CLS}`}>
              <canvas ref={miniCanvasRef} className="w-full h-full block pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-foreground text-background rounded-full px-3 sm:px-4 py-2 group-hover:scale-105 transition-transform">
            OPEN STUDIO
            <Maximize2 size={13} />
          </div>
        </div>
      </div>

      {/* Fullscreen Expanded Studio Overlay */}
      {createPortal(
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="studio-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center"
              onClick={() => setExpanded(false)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-2xl font-mono text-xs text-neutral-800 dark:text-neutral-200 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    <span className="text-foreground font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                      CREATIVE CONSOLE &bull; VECTOR ARTBOARD &bull; CH-1
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    <span className="hidden sm:inline">
                      TOOL: {tool} / OBJ: {objectsRef.current.length}
                    </span>
                    <button
                      onClick={() => setExpanded(false)}
                      data-cursor="CLOSE"
                      aria-label="Close studio"
                      className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-border text-neutral-700 dark:text-neutral-300 hover:text-foreground hover:scale-105 transition-all cursor-pointer inline-flex items-center justify-center shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Row A — Core Tools */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-[10px] sm:text-[11px]">
                    TOOLS:
                  </span>
                  {DRAW_TOOLS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setTool(id)}
                      data-cursor="TOOL"
                      className={toolBtnCls(tool === id)}
                    >
                      <Icon size={12} />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Row B — Shapes */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-[10px] sm:text-[11px]">
                    SHAPES:
                  </span>
                  {SHAPE_TOOLS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setTool(id)}
                      data-cursor="SHAPE"
                      className={toolBtnCls(tool === id)}
                    >
                      <Icon size={12} />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Row C — Attributes */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-border">
                    {SWATCHES.map((sw) => (
                      <button
                        key={sw}
                        onClick={() => applyColor(sw)}
                        data-cursor="COLOR"
                        aria-label={`Select color ${sw}`}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border transition-all cursor-pointer ${
                          color === sw
                            ? "border-foreground ring-2 ring-offset-1 ring-foreground scale-110"
                            : "border-black/20 dark:border-white/20"
                        }`}
                        style={{ backgroundColor: sw }}
                      />
                    ))}
                    <label
                      className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-dashed border-neutral-400 cursor-pointer overflow-hidden"
                      title="Pick custom color"
                      data-cursor="CUSTOM"
                    >
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => applyColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-neutral-500">
                        +
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-border text-[10px] sm:text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                    <span>{tool === "text" ? "FONT" : "STROKE"}</span>
                    <input
                      type="range"
                      min={1}
                      max={16}
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="w-16 sm:w-24 accent-foreground cursor-pointer"
                    />
                  </div>

                  {showFontControls && (
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-border">
                      {(["mono", "sans", "serif"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => applyFont(f)}
                          data-cursor="FONT"
                          aria-pressed={font === f}
                          className={`px-2 py-1 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                            font === f
                              ? "bg-amber-600 text-white shadow-sm"
                              : "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                          }`}
                          style={{ fontFamily: FONT_STACK[f] }}
                        >
                          {f === "mono" ? "MONO" : f === "sans" ? "SANS" : "SERIF"}
                        </button>
                      ))}
                      <button
                        onClick={applyBold}
                        data-cursor="BOLD"
                        aria-pressed={bold}
                        className={`px-2 py-1 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                          bold
                            ? "bg-foreground text-background shadow-sm"
                            : "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                        }`}
                      >
                        B
                      </button>
                      <button
                        onClick={applyItalic}
                        data-cursor="ITALIC"
                        aria-pressed={italic}
                        className={`px-2 py-1 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer inline-flex items-center ${
                          italic
                            ? "bg-foreground text-background shadow-sm"
                            : "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                        }`}
                      >
                        <Italic size={11} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      const sel = objectsRef.current.find((o) => o.id === selectedRef.current)
                      if (sel && sel.kind !== "pen" && sel.kind !== "text" && sel.kind !== "line" && sel.kind !== "arrow") {
                        sel.fill = !sel.fill
                        drawAll()
                        bump()
                      } else {
                        setFillEnabled(!fillEnabled)
                      }
                    }}
                    data-cursor="FILL"
                    className={`px-2 sm:px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                      fillEnabled
                        ? "bg-foreground text-background shadow-sm"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-foreground bg-neutral-100 dark:bg-neutral-900 border border-border"
                    }`}
                  >
                    FILL {fillEnabled ? "ON" : "OFF"}
                  </button>

                  <button
                    onClick={() => setSnapEnabled(!snapEnabled)}
                    data-cursor="SNAP"
                    className={`px-2 sm:px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                      snapEnabled
                        ? "bg-foreground text-background shadow-sm"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-foreground bg-neutral-100 dark:bg-neutral-900 border border-border"
                    }`}
                  >
                    SNAP {snapEnabled ? "ON" : "OFF"}
                  </button>

                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={runDemo}
                      disabled={demo}
                      data-cursor="DEMO"
                      className={`px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50 ${
                        demo
                          ? "bg-amber-600 text-white"
                          : "bg-neutral-100 dark:bg-neutral-900 border border-border text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                      }`}
                    >
                      <Sparkles size={12} className={demo ? "animate-pulse" : ""} />
                      <span className="hidden sm:inline">{demo ? "RENDERING" : "DEMO"}</span>
                    </button>
                    <button
                      onClick={exportPng}
                      data-cursor="EXPORT"
                      className="px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] bg-foreground text-background hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Download size={12} />
                      <span className="hidden sm:inline">EXPORT</span>
                    </button>
                    <button
                      onClick={clearCanvas}
                      data-cursor="CLEAR"
                      className="px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] bg-neutral-100 dark:bg-neutral-900 border border-border text-neutral-700 dark:text-neutral-300 hover:text-foreground transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Trash2 size={12} />
                      <span className="hidden sm:inline">CLEAR</span>
                    </button>
                  </div>
                </div>

                {/* Big Drawable Canvas */}
                <div
                  className={`relative h-[40vh] sm:h-[46vh] min-h-[240px] w-full rounded-xl overflow-hidden border border-border ${GRID_CLS}`}
                >
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full block touch-none cursor-crosshair transition-[filter] duration-300"
                    style={{ filter: fxStyle }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  />
                  {pendingText && (
                    <div
                      className="absolute z-20 flex items-start gap-1.5"
                      style={{ left: pendingText.x, top: pendingText.y }}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <input
                        ref={textInputRef}
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitText()
                          if (e.key === "Escape") {
                            setPendingText(null)
                            setTextValue("")
                          }
                        }}
                        onBlur={commitText}
                        placeholder="TYPE & ENTER..."
                        className="w-40 sm:w-56 bg-transparent outline-none border-b-2 border-amber-500/70 text-foreground caret-amber-500"
                        style={{
                          fontSize: Math.max(14, size * 3),
                          lineHeight: 1.2,
                          fontFamily: FONT_STACK[font],
                          fontWeight: bold ? 700 : 400,
                          fontStyle: italic ? "italic" : "normal",
                        }}
                      />
                      <button
                        onClick={commitText}
                        onMouseDown={(e) => e.preventDefault()}
                        data-cursor="ADD"
                        className="px-2 py-0.5 rounded-md bg-foreground text-background text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                      >
                        ADD
                      </button>
                    </div>
                  )}
                  {scribble && !pendingText && !textifyingId && (
                    <div
                      className="absolute z-20 flex items-center gap-1.5"
                      style={{
                        left: Math.max(0, scribble.x + scribble.w - 40),
                        top: Math.max(0, scribble.y - 34),
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-1.5">
                        SCRIBBLE
                      </span>
                      <button
                        onClick={() => {
                          const o = objectsRef.current.find((x) => x.id === scribble.id)
                          if (o) textifyStroke(o)
                        }}
                        data-cursor="TEXTIFY"
                        className="px-2.5 py-1.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm hover:bg-emerald-500 hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <ScanText size={12} />
                        TO TEXT
                      </button>
                    </div>
                  )}
                  {textifyingId && (
                    <div className="absolute top-2 left-2 z-20 flex items-center gap-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-white/90 dark:bg-black/70 px-2.5 py-1 rounded-md border border-emerald-500/40 shadow-sm pointer-events-none">
                      <Sparkles size={11} className="animate-spin" />
                      {ocrStatus ?? "TEXTIFYING…"}
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-neutral-700 backdrop-blur-sm pointer-events-none">
                    {demo
                      ? "DEMO RENDERING"
                      : tool === "move"
                        ? "CLICK & DRAG OBJECTS TO MOVE"
                        : tool === "text"
                          ? "CLICK TO PLACE TEXT"
                          : tool === "eraser"
                            ? "DRAG TO ERASE OBJECTS"
                            : isShapeTool(tool)
                              ? `DRAG TO DRAW ${tool.toUpperCase()} — PEN SNAPS FREEHAND TO SHAPES`
                              : "DRAW — RELEASE TO AUTO-SNAP STROKE TO SHAPE"}
                  </div>
                </div>

                {/* FX Filter Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-[11px] sm:text-xs">
                    FX:
                  </span>
                  <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-border">
                    {FX_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFx(f.id)}
                        data-cursor="FX"
                        className={`px-2 py-1 rounded-md uppercase font-bold tracking-wider text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                          fx === f.id
                            ? "bg-foreground text-background shadow-sm"
                            : "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <span className="ml-auto hidden sm:inline text-neutral-600 dark:text-neutral-400 text-[11px]">
                    MOVE: SELECT &amp; DRAG &bull; DEL: DELETE &bull; ESC: CLOSE
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}