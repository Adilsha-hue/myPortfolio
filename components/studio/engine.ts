export type Pt = { x: number; y: number }

export type ObjKind =
  | "pen"
  | "line"
  | "arrow"
  | "rect"
  | "rrect"
  | "circle"
  | "ellipse"
  | "triangle"
  | "diamond"
  | "pentagon"
  | "hexagon"
  | "star"
  | "burst"
  | "heart"
  | "text"
  | "emoji"
  | "image"

export type FontKey = "inter" | "grotesk" | "serif" | "mono" | "display" | "hand"

export type Filters = {
  brightness: number
  contrast: number
  saturate: number
  blur: number
  grayscale: number
  sepia: number
  hueRotate: number
}

export type Obj = {
  id: string
  kind: ObjKind
  name?: string
  x: number
  y: number
  w: number
  h: number
  rotation: number
  color: string
  fillEnabled: boolean
  fill: string
  fill2?: string
  gradient?: boolean
  gradAngle?: number
  strokeWidth: number
  opacity: number
  hidden?: boolean
  locked?: boolean
  points?: Pt[]
  text?: string
  fontKey?: FontKey
  fontSize?: number
  bold?: boolean
  italic?: boolean
  underline?: boolean
  align?: "left" | "center" | "right"
  lineHeight?: number
  letterSpacing?: number
  fxShadow?: boolean
  fxHollow?: boolean
  fxBg?: string | null
  uppercase?: boolean
  src?: string
  radius?: number
  filters?: Partial<Filters>
  flipH?: boolean
  flipV?: boolean
}

export type BgType = "solid" | "gradient" | "grid" | "dots" | "lines"

export type Bg = {
  type: BgType
  c1: string
  c2: string
  angle: number
}

export type Page = {
  id: string
  name: string
  w: number
  h: number
  bg: Bg
  objs: Obj[]
}

export type ArtboardPreset = { id: string; label: string; sub: string; w: number; h: number }

export const ARTBOARD_PRESETS: ArtboardPreset[] = [
  { id: "insta-post", label: "Instagram Post", sub: "1080 × 1080", w: 1080, h: 1080 },
  { id: "insta-portrait", label: "Instagram Portrait", sub: "1080 × 1350", w: 1080, h: 1350 },
  { id: "story", label: "Story / Reel", sub: "1080 × 1920", w: 1080, h: 1920 },
  { id: "yt-thumb", label: "YouTube Thumbnail", sub: "1280 × 720", w: 1280, h: 720 },
  { id: "presentation", label: "Presentation", sub: "1920 × 1080", w: 1920, h: 1080 },
  { id: "poster-a4", label: "Poster A4", sub: "1240 × 1754", w: 1240, h: 1754 },
  { id: "x-post", label: "X / Twitter Post", sub: "1600 × 900", w: 1600, h: 900 },
  { id: "fb-cover", label: "Facebook Cover", sub: "1640 × 624", w: 1640, h: 624 },
  { id: "business-card", label: "Business Card", sub: "1050 × 600", w: 1050, h: 600 },
  { id: "logo", label: "Logo Square", sub: "800 × 800", w: 800, h: 800 },
]

export const FONTS: Record<FontKey, { label: string; css: string; varName?: string; canvasFallback: string }> = {
  inter: { label: "Inter", css: "var(--font-inter), Inter, system-ui, sans-serif", varName: "--font-inter", canvasFallback: "Inter, system-ui, sans-serif" },
  grotesk: { label: "Grotesk", css: "var(--font-display), 'Space Grotesk', Inter, sans-serif", varName: "--font-display", canvasFallback: "'Space Grotesk', Inter, sans-serif" },
  serif: { label: "Serif", css: "Georgia, 'Times New Roman', serif", canvasFallback: "Georgia, 'Times New Roman', serif" },
  mono: { label: "Mono", css: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", canvasFallback: "ui-monospace, Menlo, Consolas, monospace" },
  display: { label: "Display", css: "'Arial Black', Impact, 'Helvetica Neue', sans-serif", canvasFallback: "'Arial Black', Impact, sans-serif" },
  hand: { label: "Script", css: "'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive", canvasFallback: "'Segoe Script', 'Comic Sans MS', cursive" },
}

export const EMOJI_STACK = `"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`

export const DEFAULT_FILTERS: Filters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
}

let _uid = Math.floor(Math.random() * 1e6)
export const uid = () => `${Date.now().toString(36)}${(_uid++).toString(36)}`

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
export const rad = (deg: number) => (deg * Math.PI) / 180

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6)
  const num = parseInt(full || "000000", 16)
  return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`
}

export function luminance(hex: string): number {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6)
  const num = parseInt(full || "000000", 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

export const readableOn = (bg: string) => (luminance(bg) > 0.55 ? "#141414" : "#ffffff")

const fontCanvasCache = new Map<FontKey, string>()

export function resolveCanvasStack(key: FontKey): string {
  if (typeof document === "undefined") return FONTS[key]?.canvasFallback ?? "sans-serif"
  const entry = FONTS[key]
  if (!entry) return "sans-serif"
  if (!entry.varName) return entry.canvasFallback
  const cached = fontCanvasCache.get(key)
  if (cached) return cached
  let stack = entry.canvasFallback
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(entry.varName).trim()
    if (raw && raw.length > 2) stack = raw
  } catch {}
  fontCanvasCache.set(key, stack)
  return stack
}

export function fontString(o: Pick<Obj, "fontKey" | "fontSize" | "bold" | "italic">, forMeasure = false): string {
  const size = o.fontSize ?? 48
  const weight = o.bold ? 700 : 400
  const style = o.italic ? "italic " : ""
  const fam = resolveCanvasStack(o.fontKey ?? "inter")
  void forMeasure
  return `${style}${weight} ${size}px ${fam}`
}

export function setCtxText(ctx: CanvasRenderingContext2D, o: Obj) {
  ctx.font = fontString(o)
  ctx.textAlign = o.align ?? "center"
  ctx.textBaseline = "top"
  const ls = o.letterSpacing ?? 0
  try {
    ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${ls}px`
  } catch {}
}

const imgCache = new Map<string, HTMLImageElement>()
const imgPending = new Set<string>()

export function getImage(src: string, onLoad?: () => void): HTMLImageElement | null {
  const hit = imgCache.get(src)
  if (hit) return hit.complete && hit.naturalWidth > 0 ? hit : null
  if (imgPending.has(src)) return null
  imgPending.add(src)
  const im = new Image()
  im.onload = () => {
    imgCache.set(src, im)
    imgPending.delete(src)
    onLoad?.()
  }
  im.onerror = () => imgPending.delete(src)
  im.src = src
  return null
}

export function preloadImages(objs: Obj[], onLoad: () => void) {
  for (const o of objs) if (o.kind === "image" && o.src) getImage(o.src, onLoad)
}

export function filterCss(f?: Partial<Filters>): string {
  if (!f) return "none"
  const parts: string[] = []
  if (f.brightness !== undefined && f.brightness !== 100) parts.push(`brightness(${f.brightness}%)`)
  if (f.contrast !== undefined && f.contrast !== 100) parts.push(`contrast(${f.contrast}%)`)
  if (f.saturate !== undefined && f.saturate !== 100) parts.push(`saturate(${f.saturate}%)`)
  if (f.blur !== undefined && f.blur > 0) parts.push(`blur(${f.blur}px)`)
  if (f.grayscale !== undefined && f.grayscale > 0) parts.push(`grayscale(${f.grayscale}%)`)
  if (f.sepia !== undefined && f.sepia > 0) parts.push(`sepia(${f.sepia}%)`)
  if (f.hueRotate !== undefined && f.hueRotate !== 0) parts.push(`hue-rotate(${f.hueRotate}deg)`)
  return parts.length ? parts.join(" ") : "none"
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2))
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.lineTo(x + w - rr, y)
  ctx.arcTo(x + w, y, x + w, y + rr, rr)
  ctx.lineTo(x + w, y + h - rr)
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr)
  ctx.lineTo(x + rr, y + h)
  ctx.arcTo(x, y + h, x, y + h - rr, rr)
  ctx.lineTo(x, y + rr)
  ctx.arcTo(x, y, x + rr, y, rr)
  ctx.closePath()
}

function polygonPoints(n: number, cx: number, cy: number, rx: number, ry: number, startDeg = -90): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < n; i++) {
    const a = rad(startDeg + (i * 360) / n)
    pts.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry })
  }
  return pts
}

function starPoints(cx: number, cy: number, R: number, inner: number, spikes: number, startDeg = -90): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < spikes * 2; i++) {
    const a = rad(startDeg + (i * 180) / spikes)
    const r = i % 2 === 0 ? R : R * inner
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
  }
  return pts
}

export function shapePolyPoints(kind: Exclude<ObjKind, "text" | "image" | "emoji" | "pen" | "line" | "arrow">, cx: number, cy: number, hw: number, hh: number): Pt[] | null {
  switch (kind) {
    case "triangle": return polygonPoints(3, cx, cy, hw, hh)
    case "diamond": return [{ x: cx, y: cy - hh }, { x: cx + hw, y: cy }, { x: cx, y: cy + hh }, { x: cx - hw, y: cy }]
    case "pentagon": return polygonPoints(5, cx, cy, hw, hh)
    case "hexagon": return polygonPoints(6, cx, cy, hw, hh, 0)
    case "star": return starPoints(cx, cy, Math.max(hw, hh), 0.42, 5)
    case "burst": return starPoints(cx, cy, Math.max(hw, hh), 0.78, 12)
    default: return null
  }
}

function heartPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, hw: number, hh: number) {
  const s = Math.min(hw, hh)
  ctx.beginPath()
  ctx.moveTo(cx, cy + hh * 0.9)
  ctx.bezierCurveTo(cx - hw * 1.1, cy + hh * 0.25, cx - hw * 0.95, cy - hh * 0.85, cx, cy - hh * 0.28)
  ctx.bezierCurveTo(cx + hw * 0.95, cy - hh * 0.85, cx + hw * 1.1, cy + hh * 0.25, cx, cy + hh * 0.9)
  ctx.closePath()
  void s
}

function applyFill(ctx: CanvasRenderingContext2D, o: Obj, cx: number, cy: number, hw: number, hh: number) {
  if (o.gradient && o.fill2) {
    const a = rad(o.gradAngle ?? 45)
    const gx = Math.cos(a) * hw
    const gy = Math.sin(a) * hh
    const g = ctx.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy)
    g.addColorStop(0, o.fill)
    g.addColorStop(1, o.fill2)
    ctx.fillStyle = g
  } else {
    ctx.fillStyle = o.fill
  }
}

export function layoutLines(ctx: CanvasRenderingContext2D, o: Obj): string[] {
  const raw = o.text ?? ""
  const src = o.uppercase ? raw.toUpperCase() : raw
  const paragraphs = src.split("\n")
  const maxW = Math.max(12, o.w)
  const out: string[] = []
  for (const para of paragraphs) {
    if (!para) {
      out.push("")
      continue
    }
    const words = para.split(/(\s+)/)
    let line = ""
    for (const word of words) {
      const test = line + word
      if (ctx.measureText(test.trimEnd()).width <= maxW || !line.trim()) {
        line = test
      } else {
        out.push(line.trimEnd())
        line = word.trimStart()
      }
    }
    out.push(line.trimEnd())
  }
  return out
}

export function textMetrics(ctx: CanvasRenderingContext2D, o: Obj) {
  setCtxText(ctx, o)
  const lines = layoutLines(ctx, o)
  const fs = o.fontSize ?? 48
  const lhm = o.lineHeight ?? 1.18
  let width = 0
  for (const l of lines) width = Math.max(width, ctx.measureText(l).width + (o.letterSpacing ?? 0))
  const height = lines.length * fs * lhm
  return { lines, width, height, fs, lhm }
}

export function syncTextSize(ctx: CanvasRenderingContext2D, o: Obj) {
  const m = textMetrics(ctx, o)
  o.w = Math.max(m.width, 24)
  o.h = m.height
}

export function drawObj(ctx: CanvasRenderingContext2D, o: Obj, onImgLoad?: () => void) {
  if (o.hidden) return
  ctx.save()
  ctx.globalAlpha = clamp(o.opacity, 0.02, 1)
  ctx.translate(o.x, o.y)
  if (o.rotation) ctx.rotate(rad(o.rotation))

  const hw = o.w / 2
  const hh = o.h / 2
  const strokeable = o.kind !== "pen" && o.kind !== "text" && o.kind !== "emoji"

  if (strokeable) {
    ctx.strokeStyle = o.color
    ctx.lineWidth = o.strokeWidth
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }

  const fillShape = () => {
    if (!o.fillEnabled) return
    applyFill(ctx, o, 0, 0, hw, hh)
    ctx.save()
    ctx.strokeStyle = "transparent"
    ctx.lineWidth = 0
  }
  const endFill = () => ctx.restore()

  switch (o.kind) {
    case "rect":
    case "rrect": {
      fillShape()
      roundRectPath(ctx, -hw, -hh, o.w, o.h, o.kind === "rrect" ? o.radius ?? 16 : 0)
      if (o.fillEnabled) ctx.fill()
      ctx.stroke()
      endFill()
      break
    }
    case "circle":
    case "ellipse": {
      fillShape()
      ctx.beginPath()
      ctx.ellipse(0, 0, hw, hh, 0, 0, Math.PI * 2)
      if (o.fillEnabled) ctx.fill()
      ctx.stroke()
      endFill()
      break
    }
    case "triangle":
    case "diamond":
    case "pentagon":
    case "hexagon":
    case "star":
    case "burst": {
      const pts = shapePolyPoints(o.kind, 0, 0, hw, hh)!
      fillShape()
      ctx.beginPath()
      pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
      ctx.closePath()
      if (o.fillEnabled) ctx.fill()
      ctx.stroke()
      endFill()
      break
    }
    case "heart": {
      fillShape()
      heartPath(ctx, 0, 0, hw, hh)
      if (o.fillEnabled) ctx.fill()
      ctx.stroke()
      endFill()
      break
    }
    case "line":
    case "arrow": {
      const p0 = o.points?.[0] ?? { x: -hw, y: 0 }
      const p1 = o.points?.[1] ?? { x: hw, y: 0 }
      const ax = p0.x - o.x
      const ay = p0.y - o.y
      const bx = p1.x - o.x
      const by = p1.y - o.y
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(bx, by)
      ctx.stroke()
      if (o.kind === "arrow") {
        const ang = Math.atan2(by - ay, bx - ax)
        const L = Math.max(10, o.strokeWidth * 3.6)
        ctx.beginPath()
        ctx.moveTo(bx, by)
        ctx.lineTo(bx - L * Math.cos(ang - Math.PI / 6.5), by - L * Math.sin(ang - Math.PI / 6.5))
        ctx.moveTo(bx, by)
        ctx.lineTo(bx - L * Math.cos(ang + Math.PI / 6.5), by - L * Math.sin(ang + Math.PI / 6.5))
        ctx.stroke()
      }
      break
    }
    case "pen": {
      const pts = o.points ?? []
      if (!pts.length) break
      ctx.strokeStyle = o.color
      ctx.lineCap = o.strokeWidth > 14 ? "square" : "round"
      ctx.beginPath()
      if (pts.length === 1) {
        ctx.arc(pts[0].x - o.x, pts[0].y - o.y, o.strokeWidth / 2, 0, Math.PI * 2)
        ctx.fillStyle = o.color
        ctx.fill()
        break
      }
      const rel = pts.map((p) => ({ x: p.x - o.x, y: p.y - o.y }))
      ctx.moveTo(rel[0].x, rel[0].y)
      if (rel.length === 2) ctx.lineTo(rel[1].x, rel[1].y)
      else {
        for (let i = 1; i < rel.length - 1; i++) {
          const mx = (rel[i].x + rel[i + 1].x) / 2
          const my = (rel[i].y + rel[i + 1].y) / 2
          ctx.quadraticCurveTo(rel[i].x, rel[i].y, mx, my)
        }
        ctx.lineTo(rel[rel.length - 1].x, rel[rel.length - 1].y)
      }
      ctx.stroke()
      break
    }
    case "emoji": {
      const ch = o.text ?? "✨"
      ctx.font = `${Math.round(Math.max(o.w, o.h))}px ${EMOJI_STACK}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(ch, 0, Math.round(o.h * 0.06))
      break
    }
    case "image": {
      if (!o.src) break
      const im = getImage(o.src, onImgLoad)
      if (!im) break
      ctx.save()
      roundRectPath(ctx, -hw, -hh, o.w, o.h, o.radius ?? 0)
      ctx.clip()
      ctx.filter = filterCss(o.filters)
      const sx = o.flipH ? -1 : 1
      const sy = o.flipV ? -1 : 1
      ctx.translate(sx * hw, sy * hh)
      ctx.scale(sx, sy)
      ctx.drawImage(im, -hw, -hh, o.w, o.h)
      ctx.restore()
      break
    }
    case "text": {
      setCtxText(ctx, o)
      const m = textMetrics(ctx, o)
      const blockH = m.height
      const y0 = -blockH / 2
      if (o.fxBg) {
        ctx.save()
        ctx.fillStyle = o.fxBg
        const padX = m.fs * 0.22
        const padY = m.fs * 0.14
        let maxLineW = 0
        for (const l of m.lines) maxLineW = Math.max(maxLineW, ctx.measureText(l).width)
        roundRectPath(ctx, -maxLineW / 2 - padX, y0 - padY, maxLineW + padX * 2, blockH + padY * 2, m.fs * 0.18)
        ctx.fill()
        ctx.restore()
      }
      if (o.fxShadow) {
        ctx.shadowColor = "rgba(0,0,0,0.42)"
        ctx.shadowBlur = m.fs * 0.32
        ctx.shadowOffsetY = m.fs * 0.14
      }
      m.lines.forEach((line, i) => {
        const ly = y0 + i * m.fs * m.lhm + (m.fs * m.lhm - m.fs) / 2
        if (o.fxHollow) {
          ctx.lineWidth = Math.max(1.4, m.fs * 0.055)
          ctx.strokeStyle = o.color
          ctx.strokeText(line, 0, ly)
        } else {
          ctx.fillStyle = o.color
          ctx.fillText(line, 0, ly)
          if (o.underline) {
            const wLine = ctx.measureText(line).width
            const ux = o.align === "left" ? 0 : o.align === "right" ? -wLine : -wLine / 2
            ctx.save()
            ctx.strokeStyle = o.color
            ctx.lineWidth = Math.max(1.2, m.fs * 0.055)
            ctx.beginPath()
            ctx.moveTo(ux, ly + m.fs * 1.02)
            ctx.lineTo(ux + wLine, ly + m.fs * 1.02)
            ctx.stroke()
            ctx.restore()
          }
        }
      })
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0
      break
    }
  }
  ctx.restore()
}

export function drawBg(ctx: CanvasRenderingContext2D, page: Page) {
  const { bg } = page
  ctx.save()
  if (bg.type === "solid") {
    ctx.fillStyle = bg.c1
  } else if (bg.type === "gradient") {
    const a = rad(bg.angle)
    const dx = Math.cos(a)
    const dy = Math.sin(a)
    const L = (Math.abs(page.w * dx) + Math.abs(page.h * dy)) / 2
    const g = ctx.createLinearGradient(page.w / 2 - dx * L, page.h / 2 - dy * L, page.w / 2 + dx * L, page.h / 2 + dy * L)
    g.addColorStop(0, bg.c1)
    g.addColorStop(1, bg.c2)
    ctx.fillStyle = g
  } else {
    ctx.fillStyle = bg.c1
  }
  ctx.fillRect(0, 0, page.w, page.h)

  if (bg.type === "grid" || bg.type === "dots" || bg.type === "lines") {
    const accent = hexToRgba(bg.c2, bg.type === "dots" ? 0.55 : 0.35)
    if (bg.type === "grid") {
      ctx.strokeStyle = accent
      ctx.lineWidth = 1
      const step = 36
      ctx.beginPath()
      for (let x = 0; x <= page.w; x += step) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, page.h)
      }
      for (let y = 0; y <= page.h; y += step) {
        ctx.moveTo(0, y)
        ctx.lineTo(page.w, y)
      }
      ctx.stroke()
    } else if (bg.type === "dots") {
      ctx.fillStyle = accent
      const step = 26
      for (let x = step / 2; x < page.w; x += step)
        for (let y = step / 2; y < page.h; y += step) {
          ctx.beginPath()
          ctx.arc(x, y, 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
    } else {
      ctx.strokeStyle = accent
      ctx.lineWidth = 10
      const step = 46
      ctx.beginPath()
      for (let x = -page.h; x < page.w + page.h; x += step) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x + page.h, page.h)
      }
      ctx.stroke()
    }
  }
  ctx.restore()
}

export function renderPage(
  ctx: CanvasRenderingContext2D,
  page: Page,
  opts: { scale?: number; transparent?: boolean; onImgLoad?: () => void } = {},
) {
  const scale = opts.scale ?? 1
  ctx.save()
  ctx.scale(scale, scale)
  if (!opts.transparent) drawBg(ctx, page)
  for (const o of page.objs) drawObj(ctx, o, opts.onImgLoad)
  ctx.restore()
}

export async function exportPageBlob(page: Page, format: "png" | "jpg", scale = 2, transparent = false): Promise<Blob> {
  const cv = document.createElement("canvas")
  cv.width = Math.round(page.w * scale)
  cv.height = Math.round(page.h * scale)
  const ctx = cv.getContext("2d")!
  await new Promise<void>((resolve) => {
    const pending = page.objs.filter((o) => o.kind === "image" && o.src && !imgCache.has(o.src)).length
    if (!pending) return resolve()
    let left = pending
    preloadImages(page.objs, () => {
      if (--left <= 0) resolve()
    })
    window.setTimeout(resolve, 2500)
  })
  if (format === "jpg") {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, cv.width, cv.height)
  }
  renderPage(ctx, page, { scale, transparent: transparent && format === "png" })
  return new Promise((resolve) => cv.toBlob((b) => resolve(b!), `image/${format}`, 0.92))
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export function getBBox(o: Obj): { x: number; y: number; w: number; h: number } {
  if ((o.kind === "pen" || o.kind === "line" || o.kind === "arrow") && o.points?.length) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const p of o.points) {
      minX = Math.min(minX, p.x)
      maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y)
      maxY = Math.max(maxY, p.y)
    }
    return { x: minX, y: minY, w: Math.max(maxX - minX, o.strokeWidth, 4), h: Math.max(maxY - minY, o.strokeWidth, 4) }
  }
  return { x: o.x - o.w / 2, y: o.y - o.h / 2, w: Math.max(o.w, 4), h: Math.max(o.h, 4) }
}

export function objCorners(o: Obj): [Pt, Pt, Pt, Pt] {
  const b = getBBox(o)
  const cx = b.x + b.w / 2
  const cy = b.y + b.h / 2
  const a = rad(o.rotation)
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const rot = (dx: number, dy: number): Pt => ({ x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos })
  return [
    rot(-b.w / 2, -b.h / 2),
    rot(b.w / 2, -b.h / 2),
    rot(b.w / 2, b.h / 2),
    rot(-b.w / 2, b.h / 2),
  ]
}

export function unionBounds(objs: Obj[]) {
  if (!objs.length) return null
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const o of objs) {
    for (const c of objCorners(o)) {
      minX = Math.min(minX, c.x)
      maxX = Math.max(maxX, c.x)
      minY = Math.min(minY, c.y)
      maxY = Math.max(maxY, c.y)
    }
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
}

export function hitTest(o: Obj, pt: Pt, slopPx = 4): boolean {
  if (o.hidden) return false
  const b = getBBox(o)
  const cx = b.x + b.w / 2
  const cy = b.y + b.h / 2
  const a = -rad(o.rotation)
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const dx = pt.x - cx
  const dy = pt.y - cy
  const lx = dx * cos - dy * sin
  const ly = dx * sin + dy * cos
  const hw = b.w / 2 + slopPx
  const hh = b.h / 2 + slopPx

  if (o.kind === "pen" || o.kind === "line" || o.kind === "arrow") {
    if (Math.abs(lx) > hw + 8 || Math.abs(ly) > hh + 8) return false
    const thresh = Math.max(8, o.strokeWidth / 2 + slopPx)
    const worldPt = { x: cx + lx, y: cy + ly }
    const pts = o.points ?? []
    for (let i = 0; i < pts.length - 1; i++) {
      if (pointSegDist(worldPt, pts[i], pts[i + 1]) < thresh) return true
    }
    if (pts.length === 1) return Math.hypot(pt.x - pts[0].x, pt.y - pts[0].y) < thresh
    return false
  }
  if (o.kind === "text" || o.kind === "emoji") return Math.abs(lx) <= hw && Math.abs(ly) <= hh
  if (o.kind === "image") return Math.abs(lx) <= hw && Math.abs(ly) <= hh
  return Math.abs(lx) <= hw && Math.abs(ly) <= hh
}

export function pointSegDist(p: Pt, a: Pt, b: Pt): number {
  const l2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
  if (l2 === 0) return Math.hypot(p.x - a.x, p.y - a.y)
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2
  t = clamp(t, 0, 1)
  return Math.hypot(p.x - (a.x + t * (b.x - a.x)), p.y - (a.y + t * (b.y - a.y)))
}

const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y)

const farthestPoint = (points: Pt[], ox: number, oy: number) => {
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

export type Recognized =
  | { type: "line"; x1: number; y1: number; x2: number; y2: number }
  | { type: "circle" | "ellipse" | "rect" | "triangle"; x: number; y: number; w: number; h: number }

export function recognizeStroke(points: Pt[]): Recognized | null {
  if (points.length < 5) return null
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let sumX = 0
  let sumY = 0
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
  if (W < 10 && H < 10) return null

  const a = points[0]
  const b = points[n - 1]

  const len = dist(a, b)
  if (len > 14 && (W > 3 * H || H > 3 * W)) {
    let maxDev = 0
    for (const p of points) maxDev = Math.max(maxDev, pointSegDist(p, a, b))
    if (maxDev < Math.max(5, len * 0.13)) return { type: "line", x1: a.x, y1: a.y, x2: b.x, y2: b.y }
  }

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
    if (cv < 0.17 && mean > 8) {
      const aspect = Math.max(W, H) / Math.max(Math.min(W, H), 1)
      if (aspect < 1.35) return { type: "circle", x: cx - mean, y: cy - mean, w: mean * 2, h: mean * 2 }
      return { type: "ellipse", x: minX, y: minY, w: W, h: H }
    }
  }

  {
    const thresh = Math.max(3, Math.min(W, H) * 0.15)
    let onEdge = 0
    for (const p of points) {
      const d = Math.min(Math.abs(p.x - minX), Math.abs(p.x - maxX), Math.abs(p.y - minY), Math.abs(p.y - maxY))
      if (d < thresh) onEdge++
    }
    if (onEdge / n > 0.8 && W > 12 && H > 12) return { type: "rect", x: minX, y: minY, w: W, h: H }
  }

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
    if (near / n > 0.82 && best > 10) {
      const tX = Math.min(c1.x, c2.x, c3.x)
      const tY = Math.min(c1.y, c2.y, c3.y)
      const tW = Math.max(c1.x, c2.x, c3.x) - tX
      const tH = Math.max(c1.y, c2.y, c3.y) - tY
      return { type: "triangle", x: tX, y: tY, w: tW, h: tH }
    }
  }

  return null
}

export function makeObj(kind: ObjKind, x: number, y: number, extra: Partial<Obj> = {}): Obj {
  const base: Obj = {
    id: uid(),
    kind,
    name: kind.toUpperCase(),
    x,
    y,
    w: 120,
    h: 120,
    rotation: 0,
    color: "#111111",
    fillEnabled: true,
    fill: "#cccccc",
    strokeWidth: 4,
    opacity: 1,
    ...extra,
  }
  if (kind === "text") base.fillEnabled = false
  return base
}

export function cloneWithNewId(o: Obj): Obj {
  const copy: Obj = JSON.parse(JSON.stringify(o))
  copy.id = uid()
  if (copy.points) copy.points = copy.points.map((p) => ({ ...p }))
  return copy
}
