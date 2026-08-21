import {
  Bg,
  FontKey,
  Obj,
  Page,
  Pt,
  cloneWithNewId,
  makeObj,
  uid,
} from "./engine"

export type Palette = { id: string; name: string; colors: [string, string, string, string] }

export const PALETTES: Palette[] = [
  { id: "midnight", name: "Midnight", colors: ["#0b1020", "#1c2541", "#5bc0be", "#ffffff"] },
  { id: "sunset", name: "Sunset", colors: ["#2d132c", "#ee453f", "#ff9a3c", "#fff4e0"] },
  { id: "forest", name: "Forest", colors: ["#0e2619", "#14532d", "#84cc16", "#ecfdf5"] },
  { id: "mono", name: "Mono", colors: ["#111111", "#333333", "#888888", "#f5f5f5"] },
  { id: "neon", name: "Neon", colors: ["#05010f", "#7c3aed", "#22d3ee", "#f9f871"] },
  { id: "pastel", name: "Pastel", colors: ["#fdf6f0", "#ffd6e0", "#a2d2ff", "#33415c"] },
  { id: "corporate", name: "Corporate", colors: ["#0f172a", "#1d4ed8", "#38bdf8", "#f8fafc"] },
  { id: "candy", name: "Candy", colors: ["#1b0b2e", "#f72585", "#4cc9f0", "#ffffff"] },
]

export type GradPreset = { c1: string; c2: string; angle: number }

export const GRADIENTS: GradPreset[] = [
  { c1: "#0f172a", c2: "#334155", angle: 135 },
  { c1: "#7f1d1d", c2: "#f97316", angle: 120 },
  { c1: "#4c1d95", c2: "#db2777", angle: 140 },
  { c1: "#064e3b", c2: "#34d399", angle: 130 },
  { c1: "#1e3a8a", c2: "#22d3ee", angle: 125 },
  { c1: "#713f12", c2: "#facc15", angle: 110 },
  { c1: "#831843", c2: "#fb7185", angle: 150 },
  { c1: "#111827", c2: "#6d28d9", angle: 135 },
  { c1: "#fde68a", c2: "#fca5a5", angle: 120 },
  { c1: "#bae6fd", c2: "#c4b5fd", angle: 130 },
  { c1: "#d9f99d", c2: "#67e8f9", angle: 115 },
  { c1: "#fecdd3", c2: "#fed7aa", angle: 100 },
]

export const SWATCHES = [
  "#111111", "#374151", "#6b7280", "#d1d5db", "#ffffff",
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6",
  "#d946ef", "#ec4899", "#f43f5e", "#78350f", "#fef3c7",
]

export const EMOJI_SETS: { label: string; items: string[] }[] = [
  {
    label: "Popular",
    items: ["✨", "🔥", "⭐", "💯", "🚀", "❤️", "⚡", "🎯", "💡", "🏆", "👀", "🙌", "💎", "🌈", "☕", "🎵"],
  },
  {
    label: "Faces",
    items: ["😀", "😎", "🤩", "😂", "🥳", "😍", "🤯", "🫡", "😤", "🤔", "😴", "🤖"],
  },
  {
    label: "Business",
    items: ["📈", "📊", "💰", "💼", "📌", "🗂️", "🖥️", "📱", "🔔", "✅", "📅", "🧠"],
  },
  {
    label: "Fun",
    items: ["🎨", "🎮", "🎬", "🍕", "🍔", "🍩", "🎉", "🎈", "🎁", "🎸", "⚽", "🌊"],
  },
  {
    label: "Nature",
    items: ["🌿", "🌸", "🌻", "🌙", "☀️", "☁️", "🍀", "🦋", "🐾", "🌵", "🍄", "⛰️"],
  },
]

type ObjSeed = Partial<Obj> & { kind: Obj["kind"]; x: number; y: number }

function seedToObj(s: ObjSeed): Obj {
  return makeObj(s.kind, s.x, s.y, s)
}

export function buildPage(name: string, w: number, h: number, bg: Bg, seeds: ObjSeed[]): Page {
  return { id: uid(), name, w, h, bg, objs: seeds.map(seedToObj) }
}

const relText = (
  pageW: number,
  xFrac: number,
  yFrac: number,
  text: string,
  opts: {
    size: number
    font?: FontKey
    color?: string
    bold?: boolean
    align?: "left" | "center" | "right"
    w?: number
    letterSpacing?: number
    lineHeight?: number
    fxShadow?: boolean
    fxHollow?: boolean
    fxBg?: string
    italic?: boolean
    uppercase?: boolean
  },
): ObjSeed => ({
  kind: "text",
  x: pageW * xFrac,
  y: 0,
  text,
  fontSize: Math.round(opts.size * (pageW / 1080)),
  fontKey: opts.font ?? "inter",
  color: opts.color ?? "#ffffff",
  bold: opts.bold ?? true,
  align: opts.align ?? "center",
  w: opts.w ?? pageW * 0.82,
  h: 40,
  letterSpacing: opts.letterSpacing,
  lineHeight: opts.lineHeight,
  fxShadow: opts.fxShadow,
  fxHollow: opts.fxHollow,
  fxBg: opts.fxBg,
  italic: opts.italic,
  uppercase: opts.uppercase,
})

export type TemplateDef = { id: string; name: string; tag: string; w: number; h: number; make: () => Page }

export function templatePage(def: TemplateDef): Page {
  return def.make()
}

export const TEMPLATES: TemplateDef[] = [
  {
    id: "quote-dark",
    name: "Quote Card",
    tag: "Instagram",
    w: 1080,
    h: 1080,
    make: () =>
      buildPage("Quote Card", 1080, 1080, { type: "gradient", c1: "#0b1020", c2: "#1c2541", angle: 135 }, [
        { kind: "circle", x: 900, y: 140, w: 220, h: 220, fillEnabled: false, color: "#5bc0be", strokeWidth: 3, opacity: 0.5 },
        { kind: "star", x: 170, y: 930, w: 90, h: 90, fillEnabled: true, fill: "#5bc0be", color: "#5bc0be", strokeWidth: 2, rotation: -12 },
        { ...relText(1080, 0.5, 0, "\u201CDesign is intelligence made visible.\u201D", { size: 64, font: "serif", color: "#ffffff", w: 800 }), y: 400 },
        { ...relText(1080, 0.5, 0, "— ALINA WEST", { size: 28, color: "#5bc0be", letterSpacing: 8, w: 600 }), y: 660 },
        { kind: "line", x: 540, y: 620, points: [{ x: 420, y: 620 }, { x: 660, y: 620 }] as Pt[], color: "#5bc0be", strokeWidth: 3, w: 240, h: 0 },
      ]),
  },
  {
    id: "sale-bold",
    name: "Mega Sale",
    tag: "Promo",
    w: 1080,
    h: 1080,
    make: () =>
      buildPage("Mega Sale", 1080, 1080, { type: "gradient", c1: "#ee453f", c2: "#ff9a3c", angle: 125 }, [
        { kind: "burst", x: 540, y: 430, w: 720, h: 720, fillEnabled: true, fill: "#2d132c", color: "#2d132c", strokeWidth: 0, opacity: 0.92 },
        { ...relText(1080, 0.5, 0, "MEGA SALE", { size: 118, font: "display", color: "#fff4e0" }), y: 380 },
        { ...relText(1080, 0.5, 0, "UP TO 50% OFF", { size: 44, color: "#ff9a3c", letterSpacing: 10 }), y: 520 },
        { ...relText(1080, 0.5, 0, "THIS WEEKEND ONLY", { size: 26, color: "#ffffff", fxBg: "#2d132c" }), y: 700 },
        { kind: "rrect", x: 540, y: 850, w: 360, h: 96, radius: 48, fillEnabled: false, color: "#fff4e0", strokeWidth: 4 },
        { ...relText(1080, 0.5, 0, "SHOP NOW →", { size: 34, color: "#fff4e0" }), y: 850 },
      ]),
  },
  {
    id: "event-poster",
    name: "Event Poster",
    tag: "Print",
    w: 1240,
    h: 1754,
    make: () =>
      buildPage("Event Poster", 1240, 1754, { type: "solid", c1: "#111111", c2: "#888888", angle: 0 }, [
        { ...relText(1240, 0.5, 0, "SOUND / LIGHT / MOTION", { size: 30, color: "#84cc16", letterSpacing: 14 }), y: 300 },
        { ...relText(1240, 0.5, 0, "NEON\nNIGHTS", { size: 190, font: "display", color: "#ffffff", lineHeight: 0.95, w: 1100 }), y: 560 },
        { ...relText(1240, 0.5, 0, "OPEN AIR FESTIVAL — 2026", { size: 36, color: "#d1d5db", letterSpacing: 6 }), y: 1050 },
        { kind: "rect", x: 620, y: 1220, w: 900, h: 3, fillEnabled: true, fill: "#84cc16", color: "#84cc16", strokeWidth: 0 },
        { ...relText(1240, 0.32, 0, "SAT 09 PM", { size: 42, font: "mono", color: "#84cc16" }), y: 1360 },
        { ...relText(1240, 0.68, 0, "HARBOR PARK", { size: 42, font: "mono", color: "#84cc16" }), y: 1360 },
        { kind: "circle", x: 1060, y: 320, w: 200, h: 200, fillEnabled: true, fill: "#84cc16", color: "#84cc16", strokeWidth: 0, opacity: 0.9 },
        { ...relText(1240, 0.855, 0, "★", { size: 70, color: "#111111" }), y: 320 },
      ]),
  },
  {
    id: "deck-title",
    name: "Deck Title",
    tag: "Presentation",
    w: 1920,
    h: 1080,
    make: () =>
      buildPage("Deck Title", 1920, 1080, { type: "solid", c1: "#f8fafc", c2: "#e2e8f0", angle: 0 }, [
        { kind: "rect", x: 0, y: 1080, w: 1920, h: 14, fillEnabled: true, fill: "#1d4ed8", color: "#1d4ed8", strokeWidth: 0 },
        { ...relText(1920, 0.27, 0, "Q3 STRATEGY", { size: 30, font: "mono", color: "#1d4ed8", align: "left", letterSpacing: 8, w: 700 }), y: 330 },
        { ...relText(1920, 0.29, 0, "Building for\nthe next decade.", { size: 110, font: "grotesk", color: "#0f172a", align: "left", lineHeight: 1.05, w: 900 }), y: 500 },
        { ...relText(1920, 0.29, 0, "Prepared by Studio North · August 2026", { size: 28, color: "#64748b", align: "left", bold: false, w: 700 }), y: 800 },
        { kind: "circle", x: 1520, y: 480, w: 480, h: 480, fillEnabled: true, gradient: true, fill: "#38bdf8", fill2: "#1d4ed8", gradAngle: 135, color: "#38bdf8", strokeWidth: 0 },
        { kind: "hexagon", x: 1660, y: 780, w: 160, h: 160, fillEnabled: false, color: "#0f172a", strokeWidth: 5 },
      ]),
  },
  {
    id: "story-teaser",
    name: "Story Teaser",
    tag: "Story",
    w: 1080,
    h: 1920,
    make: () =>
      buildPage("Story Teaser", 1080, 1920, { type: "gradient", c1: "#4c1d95", c2: "#db2777", angle: 150 }, [
        { kind: "emoji", x: 540, y: 480, w: 180, h: 180, text: "🚀", color: "#ffffff", strokeWidth: 0, fillEnabled: false },
        { ...relText(1080, 0.5, 0, "BIG THINGS\nARE COMING", { size: 96, font: "display", color: "#ffffff", lineHeight: 1.02 }), y: 800 },
        { ...relText(1080, 0.5, 0, "TAP THE LINK — FRIDAY 9AM", { size: 32, color: "#ffffff", letterSpacing: 6 }), y: 1120 },
        { kind: "rrect", x: 540, y: 1420, w: 420, h: 110, radius: 55, fillEnabled: true, fill: "#ffffff", color: "#ffffff", strokeWidth: 0 },
        { ...relText(1080, 0.5, 0, "GET NOTIFIED 🔔", { size: 36, color: "#4c1d95" }), y: 1420 },
        { kind: "burst", x: 180, y: 1650, w: 260, h: 260, fillEnabled: true, fill: "#f9f871", color: "#f9f871", strokeWidth: 0, opacity: 0.9 },
        { kind: "circle", x: 900, y: 250, w: 300, h: 300, fillEnabled: false, color: "#ffffff", strokeWidth: 3, opacity: 0.35 },
      ]),
  },
  {
    id: "yt-thumb",
    name: "YouTube Thumb",
    tag: "Video",
    w: 1280,
    h: 720,
    make: () =>
      buildPage("YouTube Thumb", 1280, 720, { type: "gradient", c1: "#111827", c2: "#6d28d9", angle: 120 }, [
        { kind: "image", x: 940, y: 360, w: 560, h: 560, src: "", radius: 280, fillEnabled: false, color: "#facc15", strokeWidth: 8, hidden: true, name: "PORTRAIT-PLACEHOLDER" },
        { kind: "burst", x: 340, y: 360, w: 620, h: 620, fillEnabled: true, fill: "#facc15", color: "#facc15", strokeWidth: 0, rotation: 8 },
        { ...relText(1280, 0.26, 0, "I BUILT A\nSTUDIO IN\n72 HOURS", { size: 88, font: "display", color: "#111111", lineHeight: 0.98, w: 620 }), y: 350 },
        { ...relText(1280, 0.75, 0, "FULL BUILD 🔧", { size: 44, color: "#ffffff", fxBg: "#dc2626" }), y: 620 },
      ]),
  },
  {
    id: "biz-card",
    name: "Business Card",
    tag: "Print",
    w: 1050,
    h: 600,
    make: () =>
      buildPage("Business Card", 1050, 600, { type: "solid", c1: "#ffffff", c2: "#f1f5f9", angle: 0 }, [
        { kind: "rect", x: 0, y: 300, w: 18, h: 600, fillEnabled: true, gradient: true, fill: "#1d4ed8", fill2: "#38bdf8", gradAngle: 90, color: "#1d4ed8", strokeWidth: 0 },
        { ...relText(1050, 0.54, 0, "ADIL SHA", { size: 64, font: "grotesk", color: "#0f172a", align: "left", w: 700 }), y: 210 },
        { ...relText(1050, 0.545, 0, "Creative Technologist & Marketer", { size: 30, color: "#475569", align: "left", bold: false, w: 700 }), y: 290 },
        { ...relText(1050, 0.545, 0, "+91 00000 00000   ·   hello@studio.design", { size: 24, font: "mono", color: "#1d4ed8", align: "left", bold: false, w: 800 }), y: 420 },
        { kind: "circle", x: 870, y: 460, w: 150, h: 150, fillEnabled: true, gradient: true, fill: "#38bdf8", fill2: "#1d4ed8", gradAngle: 135, color: "#38bdf8", strokeWidth: 0 },
        { ...relText(1050, 0.83, 0, "AS", { size: 52, font: "display", color: "#ffffff" }), y: 460 },
      ]),
  },
  {
    id: "logo-grid",
    name: "Logo Sheet",
    tag: "Brand",
    w: 800,
    h: 800,
    make: () =>
      buildPage("Logo Sheet", 800, 800, { type: "solid", c1: "#fafafa", c2: "#e5e5e5", angle: 0 }, [
        { kind: "circle", x: 230, y: 230, w: 240, h: 240, fillEnabled: true, fill: "#111111", color: "#111111", strokeWidth: 0 },
        { ...relText(800, 0.29, 0, "N.", { size: 96, font: "display", color: "#ffffff" }), y: 225 },
        { kind: "diamond", x: 570, y: 230, w: 220, h: 220, fillEnabled: false, color: "#dc2626", strokeWidth: 8 },
        { ...relText(800, 0.71, 0, "V", { size: 84, font: "grotesk", color: "#dc2626" }), y: 228 },
        { kind: "rrect", x: 230, y: 570, w: 240, h: 240, radius: 56, fillEnabled: true, fill: "#2563eb", color: "#2563eb", strokeWidth: 0 },
        { ...relText(800, 0.29, 0, "◐", { size: 100, color: "#ffffff" }), y: 566 },
        { kind: "hexagon", x: 570, y: 570, w: 230, h: 230, fillEnabled: true, fill: "#16a34a", color: "#16a34a", strokeWidth: 0 },
        { ...relText(800, 0.71, 0, "▲", { size: 76, color: "#ffffff" }), y: 568 },
      ]),
  },
  {
    id: "wallpaper",
    name: "Wallpaper",
    tag: "Phone",
    w: 1080,
    h: 1920,
    make: () =>
      buildPage("Wallpaper", 1080, 1920, { type: "gradient", c1: "#05010f", c2: "#1e1b4b", angle: 160 }, [
        { kind: "circle", x: 540, y: 700, w: 640, h: 640, fillEnabled: true, gradient: true, fill: "#7c3aed", fill2: "#22d3ee", gradAngle: 140, color: "#7c3aed", strokeWidth: 0, opacity: 0.9 },
        { ...relText(1080, 0.5, 0, "STAY\nCURIOUS", { size: 120, font: "grotesk", color: "#ffffff", lineHeight: 1.05, fxShadow: true }), y: 700 },
        { ...relText(1080, 0.5, 0, "· 2026 ·", { size: 36, font: "mono", color: "#c4b5fd", letterSpacing: 16 }), y: 1010 },
        { kind: "star", x: 200, y: 300, w: 70, h: 70, fillEnabled: true, fill: "#f9f871", color: "#f9f871", strokeWidth: 0 },
        { kind: "star", x: 880, y: 1500, w: 54, h: 54, fillEnabled: true, fill: "#f9f871", color: "#f9f871", strokeWidth: 0 },
        { kind: "circle", x: 850, y: 380, w: 26, h: 26, fillEnabled: true, fill: "#ffffff", color: "#ffffff", strokeWidth: 0 },
        { kind: "circle", x: 240, y: 1620, w: 18, h: 18, fillEnabled: true, fill: "#ffffff", color: "#ffffff", strokeWidth: 0 },
      ]),
  },
  {
    id: "minimal-quote",
    name: "Minimal Post",
    tag: "Instagram",
    w: 1080,
    h: 1350,
    make: () =>
      buildPage("Minimal Post", 1080, 1350, { type: "dots", c1: "#fdf6f0", c2: "#f43f5e", angle: 0 }, [
        { kind: "rrect", x: 540, y: 675, w: 880, h: 1150, radius: 40, fillEnabled: true, fill: "#ffffff", color: "#f1d9cb", strokeWidth: 3 },
        { ...relText(1080, 0.5, 0, "SLOW MORNINGS", { size: 34, color: "#f43f5e", letterSpacing: 10 }), y: 380 },
        { ...relText(1080, 0.5, 0, "coffee first,\nworld later.", { size: 92, font: "hand", color: "#334155", lineHeight: 1.15, bold: false }), y: 640 },
        { kind: "emoji", x: 540, y: 950, w: 120, h: 120, text: "☕", color: "#ffffff", strokeWidth: 0, fillEnabled: false },
      ]),
  },
]

export function recolorObjs(objs: Obj[], palette: Palette): Obj[] {
  const [bgA, accentA, accentB, textC] = palette.colors
  return objs.map((o) => {
    const n = { ...o }
    if (n.kind === "text" || n.kind === "emoji") {
      n.color = textC
      if (n.fxBg) n.fxBg = accentA
    } else if (n.kind === "pen") {
      n.color = accentB
    } else if (n.gradient) {
      n.fill = accentA
      n.fill2 = accentB
    } else if (n.fillEnabled) {
      const wasDark = ["#2d132c", "#111111", "#0f172a"].includes((n.fill || "").toLowerCase())
      n.fill = wasDark ? bgA : accentB
      n.color = wasDark ? accentB : accentA
    } else {
      n.color = accentB
    }
    return n
  })
}

function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

const MAGIC_SUBS = [
  "crafted with intention",
  "made to be noticed",
  "where ideas take shape",
  "designed for momentum",
  "small details, big impact",
  "built different, on purpose",
]

export function magicDesign(prompt: string): Page {
  const clean = prompt.trim() || "bold poster for a creative studio"
  const h = hashStr(clean.toLowerCase())
  const palette = PALETTES[h % PALETTES.length]
  const words = clean.split(/\s+/).filter(Boolean)
  const stop = new Set(["a", "an", "the", "for", "with", "of", "and", "to", "in", "on", "my", "our"])
  const keyWords = words.filter((w) => !stop.has(w.toLowerCase()))
  const title = keyWords.slice(0, 4).join(" ").toUpperCase()
  const sub = keyWords.slice(4).join(" ") || MAGIC_SUBS[h % MAGIC_SUBS.length]
  const [bgA, accA, accB, txtC] = palette.colors
  const layout = h % 3

  const commonSeeds: ObjSeed[] = []
  const W = 1080
  const H = 1350

  if (layout === 0) {
    commonSeeds.push(
      { kind: "rect", x: 0, y: H * 0.62, w: W * 1.2, h: H, rotation: -6, fillEnabled: true, fill: accA, color: accA, strokeWidth: 0 },
      { kind: "circle", x: W * 0.82, y: H * 0.16, w: 240, h: 240, fillEnabled: false, color: accB, strokeWidth: 6 },
      relText(W, 0.5, 0, title, { size: 104, font: "display", color: txtC, lineHeight: 1.02, w: W * 0.86 }),
    )
    commonSeeds.push({ ...relText(W, 0.5, 0, sub.toUpperCase(), { size: 30, color: accB, letterSpacing: 8 }), y: H * 0.74 })
    commonSeeds.push({ kind: "burst", x: W * 0.16, y: H * 0.86, w: 170, h: 170, fillEnabled: true, fill: accB, color: accB, strokeWidth: 0, rotation: 10 })
  } else if (layout === 1) {
    commonSeeds.push(
      { kind: "rrect", x: W * 0.5, y: H * 0.5, w: W * 0.86, h: H * 0.86, radius: 48, fillEnabled: false, color: accA, strokeWidth: 5 },
      { kind: "emoji", x: W * 0.5, y: H * 0.24, w: 150, h: 150, text: ["🔥", "✨", "🚀", "💎", "🎯"][h % 5], color: txtC, strokeWidth: 0, fillEnabled: false },
      relText(W, 0.5, 0, title, { size: 92, font: "grotesk", color: txtC, lineHeight: 1.08, w: W * 0.72 }),
    )
    commonSeeds.push({ ...relText(W, 0.5, 0, sub, { size: 34, color: accA, bold: false }), y: H * 0.62 })
    commonSeeds.push({ ...relText(W, 0.5, 0, "SWIPE UP", { size: 26, color: bgA, fxBg: accB, letterSpacing: 6 }), y: H * 0.78 })
  } else {
    commonSeeds.push(
      { kind: "rect", x: W * 0.5, y: H * 0.5, w: W, h: H, fillEnabled: true, gradient: true, fill: accA, fill2: accB, gradAngle: 135, color: accA, strokeWidth: 0, opacity: 0.18 },
      { kind: "line", x: W * 0.5, y: H * 0.3, points: [{ x: W * 0.2, y: H * 0.3 }, { x: W * 0.8, y: H * 0.3 }] as Pt[], color: accA, strokeWidth: 4, w: W * 0.6, h: 0 },
      relText(W, 0.5, 0, title, { size: 116, font: "serif", color: txtC, lineHeight: 1.04, italic: true, w: W * 0.84 }),
    )
    commonSeeds.push({ ...relText(W, 0.5, 0, `— ${sub}`, { size: 32, color: accA, bold: false }), y: H * 0.58 })
    commonSeeds.push({ kind: "heart", x: W * 0.85, y: H * 0.82, w: 130, h: 130, fillEnabled: true, fill: accA, color: accA, strokeWidth: 0, rotation: -14 })
  }

  const page = buildPage(`Magic · ${title.slice(0, 18)}`, W, H, { type: layout === 2 ? "gradient" : "solid", c1: bgA, c2: layout === 2 ? accA : bgA, angle: 140 }, commonSeeds)
  for (const o of page.objs) if (o.kind === "text") o.color = readableFix(o, txtC, bgA)
  return page
}

function readableFix(o: Obj, txtC: string, bgA: string): string {
  void o
  return luminanceOf(bgA) > 0.6 ? darken(txtC) : txtC === bgA ? "#ffffff" : txtC
}

function luminanceOf(hex: string): number {
  const hh = hex.replace("#", "")
  const full = hh.length === 3 ? hh.split("").map((c) => c + c).join("") : hh.slice(0, 6)
  const num = parseInt(full || "000", 16)
  return (0.2126 * ((num >> 16) & 255) + 0.7152 * ((num >> 8) & 255) + 0.0722 * (num & 255)) / 255
}

function darken(hex: string): string {
  const hh = hex.replace("#", "")
  const full = hh.length === 3 ? hh.split("").map((c) => c + c).join("") : hh.slice(0, 6)
  const num = parseInt(full || "333333", 16)
  const r = Math.round(((num >> 16) & 255) * 0.55)
  const g = Math.round(((num >> 8) & 255) * 0.55)
  const b = Math.round((num & 255) * 0.55)
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`
}
