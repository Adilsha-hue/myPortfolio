"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  Bold,
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  Copy,
  Download,
  FlipHorizontal,
  FlipVertical,
  FolderOpen,
  Italic,
  Keyboard,
  Layers,
  LayoutTemplate,
  Lock,
  LockOpen,
  Maximize,
  Minus,
  Paintbrush,
  PenTool,
  Plus,
  Redo2,
  Save,
  ScanText,
  Shapes,
  Trash2,
  Type,
  Underline,
  Undo2,
  Wand2,
  X,
  ZoomIn,
  ZoomOut,
  ImagePlus,
  EyeOff,
} from "lucide-react"
import {
  ARTBOARD_PRESETS,
  DEFAULT_FILTERS,
  FONTS,
  type Bg,
  type FontKey,
  type Obj,
  type ObjKind,
  type Page,
  type Pt,
  cloneWithNewId,
  clamp,
  drawBg,
  drawObj,
  exportPageBlob,
  downloadBlob,
  getBBox,
  hitTest,
  makeObj,
  objCorners,
  rad,
  readableOn,
  recognizeStroke,
  syncTextSize,
  textMetrics,
  uid,
  unionBounds,
} from "./engine"
import { EMOJI_SETS, PALETTES, TEMPLATES, buildPage, magicDesign, recolorObjs, templatePage } from "./content"
import {
  Chip,
  ColorButton,
  ColorSwatchGrid,
  IconBtn,
  PageThumb,
  Popover,
  ShortcutsModal,
  SliderRow,
  Toasts,
  type ToastItem,
} from "./ui"
import {
  BackgroundPanel,
  DrawPanel,
  ElementsPanel,
  LayersPanel,
  MagicPanel,
  TemplatesPanel,
  TextPresetsPanel,
  UploadsPanel,
} from "./panels"
import { FX_PRESETS, TEXT_PRESETS, isShapeTool, type EditorApi, type LayerOp, type Project, type Tool, type Upload } from "./types"

const STORAGE_KEY = "studio_os_project_v1"

type PanelTab = "templates" | "elements" | "text" | "uploads" | "draw" | "background" | "magic" | "layers"

type Drag =
  | null
  | { mode: "pan"; sx: number; sy: number; tx0: number; ty0: number }
  | { mode: "move"; ids: string[]; startPt: Pt; starts: Record<string, Pt>; origs: Record<string, Obj>; moved: boolean }
  | { mode: "resize"; id: string; hx: -1 | 0 | 1; hy: -1 | 0 | 1; orig: Obj }
  | { mode: "rotate"; id: string; center: Pt; startAngle: number; origRot: number }
  | { mode: "marquee"; start: Pt; cur: Pt; baseIds: string[] }
  | { mode: "create"; id: string; startPt: Pt }
  | { mode: "pen"; id: string }
  | { mode: "erase"; erased: boolean }

type HandleDesc =
  | { kind: "resize"; hx: -1 | 0 | 1; hy: -1 | 0 | 1; pos: Pt; cursor: string }
  | { kind: "rotate"; pos: Pt }

const CURSOR_FOR: Record<string, string> = {
  "1,1": "nwse-resize",
  "-1,-1": "nwse-resize",
  "1,-1": "nesw-resize",
  "-1,1": "nesw-resize",
  "1,0": "ew-resize",
  "-1,0": "ew-resize",
  "0,1": "ns-resize",
  "0,-1": "ns-resize",
}

const RAIL_TABS: { id: PanelTab; label: string; icon: typeof Type }[] = [
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "elements", label: "Elements", icon: Shapes },
  { id: "text", label: "Text", icon: Type },
  { id: "uploads", label: "Uploads", icon: ImagePlus },
  { id: "draw", label: "Draw", icon: PenTool },
  { id: "background", label: "Backdrop", icon: Paintbrush },
  { id: "magic", label: "Magic", icon: Wand2 },
  { id: "layers", label: "Layers", icon: Layers },
]

const SHAPE_DEFAULT_SIZE: Partial<Record<ObjKind, [number, number]>> = {
  rect: [260, 200],
  rrect: [260, 180],
  circle: [220, 220],
  ellipse: [280, 190],
  triangle: [230, 210],
  diamond: [220, 220],
  pentagon: [220, 220],
  hexagon: [230, 210],
  star: [230, 230],
  burst: [240, 240],
  heart: [220, 210],
  line: [320, 0],
  arrow: [320, 0],
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 32) || "design"
}

function seedProject(): Project {
  const page = buildPage("Welcome", 1080, 1080, { type: "gradient", c1: "#0b1020", c2: "#312e81", angle: 145 }, [
    { kind: "burst", x: 900, y: 175, w: 235, h: 235, fillEnabled: true, fill: "#f59e0b", color: "#f59e0b", strokeWidth: 0, rotation: 12, opacity: 0.95 },
    { kind: "circle", x: 155, y: 895, w: 310, h: 310, fillEnabled: false, color: "#22d3ee", strokeWidth: 3, opacity: 0.4 },
    { kind: "star", x: 850, y: 865, w: 92, h: 92, fillEnabled: true, fill: "#facc15", color: "#facc15", strokeWidth: 0, rotation: -14 },
    { kind: "rect", x: 540, y: 292, w: 130, h: 6, fillEnabled: true, fill: "#22d3ee", color: "#22d3ee", strokeWidth: 0 },
    { kind: "text", x: 540, y: 338, text: "CANVAS STUDIO", fontSize: 27, fontKey: "mono", bold: true, color: "#67e8f9", letterSpacing: 13, align: "center", w: 720, h: 34, fillEnabled: false },
    { kind: "text", x: 540, y: 470, text: "DESIGN\nANYTHING.", fontSize: 134, fontKey: "grotesk", bold: true, color: "#ffffff", lineHeight: 0.98, align: "center", w: 940, h: 270, fillEnabled: false },
    { kind: "text", x: 540, y: 668, text: "drag · drop · draw · magic ✦", fontSize: 30, fontKey: "inter", bold: false, color: "#cbd5e1", align: "center", w: 720, h: 42, fillEnabled: false },
    { kind: "rrect", x: 540, y: 806, w: 352, h: 98, radius: 49, fillEnabled: false, color: "#ffffff", strokeWidth: 3.5 },
    { kind: "text", x: 540, y: 806, text: "START CREATING →", fontSize: 29, fontKey: "inter", bold: true, color: "#ffffff", letterSpacing: 2, align: "center", w: 352, h: 38, fillEnabled: false },
  ])
  return { version: 1, pages: [page], activeIdx: 0, uploads: [] }
}

async function processImageFile(file: File): Promise<Upload | null> {
  if (!file.type.startsWith("image/")) return null
  const url = await new Promise<string>((res) => {
    const r = new FileReader()
    r.onload = () => res(String(r.result))
    r.readAsDataURL(file)
  })
  const img = await new Promise<HTMLImageElement>((res) => {
    const im = new Image()
    im.onload = () => res(im)
    im.onerror = () => res(im)
    im.src = url
  })
  if (!img.naturalWidth) return null
  const max = 1100
  const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight))
  let src = url
  if (k < 1 || file.size > 800_000) {
    const cv = document.createElement("canvas")
    cv.width = Math.round(img.naturalWidth * k)
    cv.height = Math.round(img.naturalHeight * k)
    cv.getContext("2d")!.drawImage(img, 0, 0, cv.width, cv.height)
    src = cv.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.86)
  }
  return { id: uid(), src, name: file.name.replace(/\.[^.]+$/, "") }
}

export function StudioEditor({ onClose }: { onClose: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const jsonInputRef = useRef<HTMLInputElement>(null)
  const measureRef = useRef<CanvasRenderingContext2D | null>(null)

  const docRef = useRef<Project>(seedProject())
  const viewRef = useRef({ z: 0.5, tx: 0, ty: 0 })
  const selRef = useRef<string[]>([])
  const hoverIdRef = useRef<string | null>(null)
  const guidesRef = useRef<{ v: number[]; h: number[] }>({ v: [], h: [] })
  const dragRef = useRef<Drag>(null)
  const clipRef = useRef<Obj[]>([])
  const spaceRef = useRef(false)
  const histRef = useRef<{ stack: string[]; idx: number; lastAt: number }>({ stack: [], idx: -1, lastAt: 0 })
  const saveTimer = useRef<number | null>(null)
  const drawRaf = useRef<number | null>(null)
  const storageWarnRef = useRef(false)

  const [, bumpRev] = useState(0)
  const rerender = useCallback(() => bumpRev((v) => v + 1), [])

  const [tool, setToolState] = useState<Tool>("select")
  const toolRef = useRef(tool)
  toolRef.current = tool

  const [selIds, setSelIds] = useState<string[]>([])
  const [panel, setPanel] = useState<PanelTab | null>("templates")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const editingRef = useRef(editingId)
  editingRef.current = editingId

  const [zoomUi, setZoomUi] = useState(0.5)
  const [histUi, setHistUi] = useState({ undo: false, redo: false })
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; hitId: string | null } | null>(null)
  const [uploads, setUploads] = useState<Upload[]>([])
  const [magicBusy, setMagicBusy] = useState(false)
  const [ocrBusy, setOcrBusy] = useState(false)
  const [brushColor, setBrushColor] = useState("#f59e0b")
  const [brushWidth, setBrushWidth] = useState(6)
  const [snapShape, setSnapShape] = useState(true)

  const drawRef = useRef<() => void>(() => {})
  const scheduleDraw = useCallback(() => {
    if (drawRaf.current !== null) return
    drawRaf.current = requestAnimationFrame(() => {
      drawRaf.current = null
      drawRef.current()
    })
  }, [])

  const measure = () => {
    if (!measureRef.current) {
      const cv = document.createElement("canvas")
      measureRef.current = cv.getContext("2d")
    }
    return measureRef.current!
  }

  const toast = useCallback((msg: string) => {
    const id = uid()
    setToasts((t) => [...t.slice(-2), { id, msg }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400)
  }, [])

  const page = (): Page => docRef.current.pages[docRef.current.activeIdx]

  const objById = (id: string): Obj | undefined => page().objs.find((o) => o.id === id)
  const selObjs = () => page().objs.filter((o) => selRef.current.includes(o.id))

  const updateHistUi = () => {
    const h = histRef.current
    setHistUi({ undo: h.idx > 0, redo: h.idx < h.stack.length - 1 })
  }

  const commit = useCallback((coalesceMs = 0) => {
    const h = histRef.current
    const snap = JSON.stringify(docRef.current)
    const now = Date.now()
    if (coalesceMs > 0 && now - h.lastAt < coalesceMs && h.idx >= 0) {
      h.stack[h.idx] = snap
      h.lastAt = now
      updateHistUi()
      return
    }
    h.stack = h.stack.slice(0, h.idx + 1)
    h.stack.push(snap)
    if (h.stack.length > 60) h.stack.shift()
    h.idx = h.stack.length - 1
    h.lastAt = now
    updateHistUi()
  }, [])

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      saveTimer.current = null
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(docRef.current))
      } catch {
        if (!storageWarnRef.current) {
          storageWarnRef.current = true
          toast("Storage full — export your project")
        }
      }
    }, 700)
  }, [toast])

  const refresh = useCallback(() => {
    scheduleDraw()
    scheduleSave()
    rerender()
  }, [scheduleDraw, scheduleSave, rerender])

  const applySelection = (ids: string[]) => {
    selRef.current = ids
    setSelIds(ids)
    scheduleDraw()
  }

  const restore = (snap: string) => {
    try {
      docRef.current = JSON.parse(snap)
    } catch {
      return
    }
    setUploads(docRef.current.uploads ?? [])
    const valid = new Set(page().objs.map((o) => o.id))
    applySelection(selRef.current.filter((id) => valid.has(id)))
    setEditingId(null)
    refresh()
  }

  const undoFn = () => {
    const h = histRef.current
    if (h.idx <= 0) return
    h.idx -= 1
    restore(h.stack[h.idx])
    updateHistUi()
  }
  const redoFn = () => {
    const h = histRef.current
    if (h.idx >= h.stack.length - 1) return
    h.idx += 1
    restore(h.stack[h.idx])
    updateHistUi()
  }

  function localToWorld(o: Obj, lx: number, ly: number): Pt {
    const b = getBBox(o)
    const cx = b.x + b.w / 2
    const cy = b.y + b.h / 2
    const a = rad(o.rotation)
    return { x: cx + lx * Math.cos(a) - ly * Math.sin(a), y: cy + lx * Math.sin(a) + ly * Math.cos(a) }
  }

  function handlePositions(o: Obj, z: number): HandleDesc[] {
    const b = getBBox(o)
    const hw = b.w / 2
    const hh = b.h / 2
    const dirs: [-1 | 0 | 1, -1 | 0 | 1][] = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ]
    const out: HandleDesc[] = dirs.map(([hx, hy]) => ({
      kind: "resize" as const,
      hx,
      hy,
      pos: localToWorld(o, hx * hw, hy * hh),
      cursor: CURSOR_FOR[`${hx},${hy}`] ?? "move",
    }))
    out.push({ kind: "rotate", pos: localToWorld(o, 0, -hh - 30 / z) })
    return out
  }

  const draw = useCallback(() => {
    const cv = canvasRef.current
    const wrap = wrapRef.current
    if (!cv || !wrap) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const rect = wrap.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = Math.max(1, Math.round(rect.width))
    const H = Math.max(1, Math.round(rect.height))
    if (cv.width !== W * dpr || cv.height !== H * dpr) {
      cv.width = W * dpr
      cv.height = H * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    const proj = docRef.current
    const pg = proj.pages[proj.activeIdx]
    if (!pg) return
    const cam = viewRef.current

    ctx.save()
    ctx.translate(cam.tx, cam.ty)
    ctx.scale(cam.z, cam.z)

    ctx.save()
    ctx.shadowColor = "rgba(0,0,0,0.5)"
    ctx.shadowBlur = 44 / cam.z
    ctx.shadowOffsetY = 16 / cam.z
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, pg.w, pg.h)
    ctx.restore()

    drawBg(ctx, pg)

    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, pg.w, pg.h)
    ctx.clip()
    for (const o of pg.objs) {
      if (o.id === editingRef.current) continue
      drawObj(ctx, o, scheduleDraw)
    }
    ctx.restore()

    const g = guidesRef.current
    if (g.v.length || g.h.length) {
      ctx.strokeStyle = "#ff2fb3"
      ctx.lineWidth = 1 / cam.z
      ctx.setLineDash([8 / cam.z, 6 / cam.z])
      ctx.beginPath()
      for (const x of g.v) {
        ctx.moveTo(x, -pg.h)
        ctx.lineTo(x, pg.h * 2)
      }
      for (const y of g.h) {
        ctx.moveTo(-pg.w, y)
        ctx.lineTo(pg.w * 2, y)
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    const d = dragRef.current
    if (d?.mode === "marquee") {
      const x = Math.min(d.start.x, d.cur.x)
      const y = Math.min(d.start.y, d.cur.y)
      const w = Math.abs(d.cur.x - d.start.x)
      const h = Math.abs(d.cur.y - d.start.y)
      ctx.fillStyle = "rgba(99,102,241,0.12)"
      ctx.strokeStyle = "#6366f1"
      ctx.lineWidth = 1.4 / cam.z
      ctx.setLineDash([6 / cam.z, 4 / cam.z])
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(x, y, w, h)
      ctx.setLineDash([])
    }

    if (toolRef.current === "eraser" && hoverIdRef.current && !d) {
      const ho = pg.objs.find((o) => o.id === hoverIdRef.current)
      if (ho && !ho.hidden) {
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2 / cam.z
        ctx.setLineDash([5 / cam.z, 4 / cam.z])
        const poly = objCorners(ho)
        ctx.beginPath()
        poly.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
        ctx.closePath()
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    for (const id of selRef.current) {
      if (id === editingRef.current) continue
      const o = pg.objs.find((x) => x.id === id)
      if (!o || o.hidden) continue
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = 1.5 / cam.z
      ctx.setLineDash([7 / cam.z, 5 / cam.z])
      const poly = objCorners(o)
      ctx.beginPath()
      poly.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
      ctx.closePath()
      ctx.stroke()
      ctx.setLineDash([])
    }

    if (selRef.current.length === 1 && toolRef.current === "select" && !editingRef.current) {
      const o = pg.objs.find((x) => x.id === selRef.current[0])
      if (o && !o.locked && !o.hidden) {
        const hs = handlePositions(o, cam.z)
        const rotH = hs.find((x) => x.kind === "rotate")!
        const topMid = localToWorld(o, 0, -getBBox(o).h / 2)
        ctx.strokeStyle = "#f59e0b"
        ctx.lineWidth = 1.4 / cam.z
        ctx.beginPath()
        ctx.moveTo(topMid.x, topMid.y)
        ctx.lineTo(rotH.pos.x, rotH.pos.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(rotH.pos.x, rotH.pos.y, 6.5 / cam.z, 0, Math.PI * 2)
        ctx.fillStyle = "#f59e0b"
        ctx.fill()
        for (const h of hs) {
          if (h.kind !== "resize") continue
          const s = 9 / cam.z
          ctx.fillStyle = "#ffffff"
          ctx.strokeStyle = "#d97706"
          ctx.lineWidth = 1.6 / cam.z
          ctx.beginPath()
          ctx.rect(h.pos.x - s / 2, h.pos.y - s / 2, s, s)
          ctx.fill()
          ctx.stroke()
        }
      }
    }

    ctx.restore()
  }, [scheduleDraw])

  drawRef.current = draw

  const applyCam = (z: number, tx: number, ty: number) => {
    viewRef.current = { z, tx, ty }
    setZoomUi(z)
    scheduleDraw()
  }

  const fitView = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const pg = page()
    const z = clamp(Math.min((rect.width - 110) / pg.w, (rect.height - 150) / pg.h), 0.03, 1.4)
    applyCam(z, (rect.width - pg.w * z) / 2, (rect.height - pg.h * z) / 2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const zoomBy = (f: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const cam = viewRef.current
    const z2 = clamp(cam.z * f, 0.04, 4)
    applyCam(z2, rect.width / 2 - (rect.width / 2 - cam.tx) * (z2 / cam.z), rect.height / 2 - (rect.height / 2 - cam.ty) * (z2 / cam.z))
  }

  const toBoard = (clientX: number, clientY: number): Pt => {
    const rect = wrapRef.current!.getBoundingClientRect()
    const cam = viewRef.current
    return { x: (clientX - rect.left - cam.tx) / cam.z, y: (clientY - rect.top - cam.ty) / cam.z }
  }

  const viewCenter = (): Pt => {
    const rect = wrapRef.current!.getBoundingClientRect()
    const cam = viewRef.current
    return { x: (rect.width / 2 - cam.tx) / cam.z, y: (rect.height / 2 - cam.ty) / cam.z }
  }

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    let proj: Project | null = null
    if (raw) {
      try {
        const p = JSON.parse(raw)
        if (p && Array.isArray(p.pages) && p.pages.length && Array.isArray(p.pages[0]?.objs)) proj = p as Project
      } catch {}
    }
    docRef.current = proj ?? seedProject()
    docRef.current.activeIdx = clamp(docRef.current.activeIdx ?? 0, 0, docRef.current.pages.length - 1)
    for (const p of docRef.current.pages) {
      if (!Array.isArray(p.objs)) p.objs = []
      if (!p.bg) p.bg = { type: "solid", c1: "#ffffff", c2: "#94a3b8", angle: 135 }
    }
    setUploads(docRef.current.uploads ?? [])
    histRef.current = { stack: [JSON.stringify(docRef.current)], idx: 0, lastAt: Date.now() }
    updateHistUi()
    const t = window.setTimeout(() => fitView(), 80)
    rerender()
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const cam = viewRef.current
      const rect = wrap.getBoundingClientRect()
      const sx = e.clientX - rect.left
      const sy = e.clientY - rect.top
      if (e.ctrlKey || e.metaKey) {
        const z2 = clamp(cam.z * (e.deltaY < 0 ? 1.12 : 1 / 1.12), 0.04, 4)
        applyCam(z2, sx - (sx - cam.tx) * (z2 / cam.z), sy - (sy - cam.ty) * (z2 / cam.z))
      } else {
        applyCam(cam.z, cam.tx - e.deltaX, cam.ty - e.deltaY)
      }
    }
    wrap.addEventListener("wheel", onWheel, { passive: false })
    return () => wrap.removeEventListener("wheel", onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const ro = new ResizeObserver(() => scheduleDraw())
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [scheduleDraw])

  useEffect(() => {
    return () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(docRef.current))
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (!editingId) return
    const o = objById(editingId)
    setEditValue(o?.text ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId])

  useEffect(() => {
    if (!ctxMenu) return
    const close = () => setCtxMenu(null)
    window.addEventListener("pointerdown", close)
    return () => window.removeEventListener("pointerdown", close)
  }, [ctxMenu])

  const hitHandle = (clientX: number, clientY: number): HandleDesc | null => {
    if (selRef.current.length !== 1 || toolRef.current !== "select") return null
    const o = objById(selRef.current[0])
    if (!o || o.locked || o.hidden) return null
    const rect = wrapRef.current!.getBoundingClientRect()
    const cam = viewRef.current
    for (const h of handlePositions(o, cam.z)) {
      const sx = h.pos.x * cam.z + cam.tx + rect.left
      const sy = h.pos.y * cam.z + cam.ty + rect.top
      if (Math.hypot(clientX - sx, clientY - sy) < 12) return h
    }
    return null
  }

  const topHit = (ptB: Pt): Obj | undefined => {
    const objs = page().objs
    for (let i = objs.length - 1; i >= 0; i--) {
      const o = objs[i]
      if (!o.hidden && hitTest(o, ptB, 4 / viewRef.current.z)) return o
    }
    return undefined
  }

  const setTool = (t: Tool) => {
    setToolState(t)
    if (isShapeTool(t)) setPanel("elements")
  }

  const collectTargets = (exclude: Set<string>) => {
    const pg = page()
    const xs: number[] = [0, pg.w / 2, pg.w]
    const ys: number[] = [0, pg.h / 2, pg.h]
    for (const o of pg.objs) {
      if (exclude.has(o.id) || o.hidden) continue
      const b = getBBox(o)
      xs.push(b.x, b.x + b.w / 2, b.x + b.w)
      ys.push(b.y, b.y + b.h / 2, b.y + b.h)
    }
    return { xs, ys }
  }

  const snapMove = (bounds: { x: number; y: number; w: number; h: number }, exclude: Set<string>) => {
    const tol = 7 / viewRef.current.z
    const tg = collectTargets(exclude)
    const guides: { v: number[]; h: number[] } = { v: [], h: [] }
    let bestDx = Infinity
    let dxFinal = 0
    for (const c of [bounds.x, bounds.x + bounds.w / 2, bounds.x + bounds.w]) {
      for (const tx of tg.xs) {
        const diff = tx - c
        if (Math.abs(diff) <= tol && Math.abs(diff) < Math.abs(bestDx)) {
          bestDx = diff
          dxFinal = diff
          guides.v = [tx]
        }
      }
    }
    let bestDy = Infinity
    let dyFinal = 0
    for (const c of [bounds.y, bounds.y + bounds.h / 2, bounds.y + bounds.h]) {
      for (const ty of tg.ys) {
        const diff = ty - c
        if (Math.abs(diff) <= tol && Math.abs(diff) < Math.abs(bestDy)) {
          bestDy = diff
          dyFinal = diff
          guides.h = [ty]
        }
      }
    }
    return { dx: dxFinal, dy: dyFinal, guides }
  }

  const offsetObj = (o: Obj, dx: number, dy: number) => {
    o.x += dx
    o.y += dy
    if (o.points) for (const p of o.points) {
      p.x += dx
      p.y += dy
    }
  }

  const applyResize = (o: Obj, orig: Obj, hx: -1 | 0 | 1, hy: -1 | 0 | 1, pB: Pt, shiftKey: boolean) => {
    const a = rad(orig.rotation)
    const cos = Math.cos(a)
    const sin = Math.sin(a)
    const inv = (dx: number, dy: number): Pt => ({ x: dx * cos + dy * sin, y: -dx * sin + dy * cos })
    const lp = inv(pB.x - orig.x, pB.y - orig.y)

    if (orig.kind === "text") {
      const fs0 = orig.fontSize ?? 48
      const anchorX = -hx * Math.max(orig.w / 2, 1)
      const anchorY = -hy * Math.max(orig.h / 2, 1)
      if (hx !== 0 && hy !== 0) {
        const f = clamp(Math.abs(lp.x - anchorX) / Math.max(orig.w, 1), 0.05, 8)
        o.fontSize = clamp(Math.round(fs0 * f), 8, 420)
        syncTextSize(measure(), o)
      } else if (hx !== 0) {
        o.w = Math.max(Math.abs(lp.x - anchorX), 26)
        const m = textMetrics(measure(), o)
        o.h = m.height
      } else if (hy !== 0) {
        const f = clamp(Math.abs(lp.y - anchorY) / Math.max(orig.h, 1), 0.05, 8)
        o.fontSize = clamp(Math.round(fs0 * f), 8, 420)
        syncTextSize(measure(), o)
      } else {
        return
      }
      const ncx = hx !== 0 ? anchorX + Math.sign(lp.x - anchorX || 1) * (o.w / 2) : 0
      const ncy = hy !== 0 ? anchorY + Math.sign(lp.y - anchorY || 1) * (o.h / 2) : 0
      o.x = orig.x + ncx * cos - ncy * sin
      o.y = orig.y + ncx * sin + ncy * cos
      return
    }

    const hw0 = Math.max(orig.w / 2, 1)
    const hh0 = Math.max(orig.h / 2, 1)
    const anchorX = -hx * hw0
    const anchorY = -hy * hh0
    let ex = hx !== 0 ? Math.abs(lp.x - anchorX) : orig.w
    let ey = hy !== 0 ? Math.abs(lp.y - anchorY) : orig.h
    ex = Math.max(ex, 14)
    ey = Math.max(ey, 14)
    if (shiftKey && hx !== 0 && hy !== 0 && orig.w > 0 && orig.h > 0) {
      const r = orig.h / orig.w
      if (ex / orig.w > ey / orig.h) ey = ex * r
      else ex = ey / r
    }
    const fx = ex / Math.max(orig.w, 1)
    const fy = ey / Math.max(orig.h, 1)
    const ncx = hx !== 0 ? anchorX + Math.sign(lp.x - anchorX || 1) * (ex / 2) : 0
    const ncy = hy !== 0 ? anchorY + Math.sign(lp.y - anchorY || 1) * (ey / 2) : 0
    const wx = ncx * cos - ncy * sin
    const wy = ncx * sin + ncy * cos
    if (o.points && o.points.length) {
      o.points = o.points.map((p) => {
        const l = inv(p.x - orig.x, p.y - orig.y)
        const sx2 = l.x * fx
        const sy2 = l.y * fy
        return { x: orig.x + wx + sx2 * cos - sy2 * sin, y: orig.y + wy + sx2 * sin + sy2 * cos }
      })
    }
    o.w = ex
    o.h = ey
    o.x = orig.x + wx
    o.y = orig.y + wy
  }

  const eraseAt = (ptB: Pt) => {
    const objs = page().objs
    for (let i = objs.length - 1; i >= 0; i--) {
      const o = objs[i]
      if (o.hidden || o.locked) continue
      if (hitTest(o, ptB, 5 / viewRef.current.z)) {
        objs.splice(i, 1)
        if (dragRef.current?.mode === "erase") dragRef.current.erased = true
        scheduleDraw()
        return
      }
    }
  }

  const onCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button === 2) return
    commitEditing()
    setCtxMenu(null)
    e.currentTarget.setPointerCapture(e.pointerId)

    if (e.button === 1 || spaceRef.current) {
      dragRef.current = { mode: "pan", sx: e.clientX, sy: e.clientY, tx0: viewRef.current.tx, ty0: viewRef.current.ty }
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
      return
    }

    const ptB = toBoard(e.clientX, e.clientY)
    const t = toolRef.current

    if (t === "select") {
      const hd = hitHandle(e.clientX, e.clientY)
      if (hd) {
        const o = objById(selRef.current[0])!
        if (hd.kind === "rotate") {
          const b = getBBox(o)
          const cx = b.x + b.w / 2
          const cy = b.y + b.h / 2
          dragRef.current = { mode: "rotate", id: o.id, center: { x: cx, y: cy }, startAngle: Math.atan2(ptB.y - cy, ptB.x - cx), origRot: o.rotation }
        } else {
          dragRef.current = { mode: "resize", id: o.id, hx: hd.hx, hy: hd.hy, orig: JSON.parse(JSON.stringify(o)) as Obj }
        }
        return
      }
      const hit = topHit(ptB)
      if (hit) {
        let ids: string[]
        if (e.shiftKey) ids = selRef.current.includes(hit.id) ? selRef.current.filter((i) => i !== hit.id) : [...selRef.current, hit.id]
        else if (!selRef.current.includes(hit.id)) ids = [hit.id]
        else ids = selRef.current
        applySelection(ids)
        rerender()
        const movable = ids.map((i) => objById(i)).filter((o): o is Obj => !!o && !o.locked && !o.hidden)
        if (movable.length) {
          const starts: Record<string, Pt> = {}
          const origs: Record<string, Obj> = {}
          for (const o of movable) {
            starts[o.id] = { x: o.x, y: o.y }
            origs[o.id] = JSON.parse(JSON.stringify(o)) as Obj
          }
          dragRef.current = { mode: "move", ids: movable.map((o) => o.id), startPt: ptB, starts, origs, moved: false }
        }
      } else {
        if (!e.shiftKey) applySelection([])
        rerender()
        dragRef.current = { mode: "marquee", start: ptB, cur: ptB, baseIds: e.shiftKey ? [...selRef.current] : [] }
      }
      return
    }

    if (t === "eraser") {
      dragRef.current = { mode: "erase", erased: false }
      eraseAt(ptB)
      return
    }

    if (t === "pen" || t === "marker" || t === "highlighter") {
      const wMul = t === "marker" ? 1.7 : t === "highlighter" ? 2.8 : 1
      const o = makeObj("pen", ptB.x, ptB.y, {
        name: t.toUpperCase(),
        color: brushColor,
        strokeWidth: Math.max(2, brushWidth * wMul),
        opacity: t === "marker" ? 0.55 : t === "highlighter" ? 0.26 : 1,
        points: [{ x: ptB.x, y: ptB.y }],
        fillEnabled: false,
      })
      page().objs.push(o)
      applySelection([])
      dragRef.current = { mode: "pen", id: o.id }
      scheduleDraw()
      return
    }

    if (t === "text") {
      const pg = page()
      const o = makeObj("text", ptB.x, ptB.y, {
        name: "TEXT",
        text: "",
        fontKey: "grotesk",
        fontSize: Math.round(clamp(pg.w * 0.055, 24, 96)),
        bold: true,
        color: readableOn(pg.bg.c1),
        align: "center",
        lineHeight: 1.15,
        w: Math.min(pg.w * 0.72, 860),
        h: 40,
        fillEnabled: false,
      })
      syncTextSize(measure(), o)
      o.x = ptB.x
      o.y = ptB.y
      pg.objs.push(o)
      setToolState("select")
      applySelection([o.id])
      setEditingId(o.id)
      commit()
      refresh()
      return
    }

    if (isShapeTool(t)) {
      const kind = t as ObjKind
      const o = makeObj(kind, ptB.x, ptB.y, {
        name: String(t).toUpperCase(),
        w: 2,
        h: 2,
        fill: "#94a3b8",
        color: "#475569",
        strokeWidth: 4,
        radius: kind === "rrect" ? 22 : 0,
        fillEnabled: kind !== "line" && kind !== "arrow",
      })
      if (kind === "line" || kind === "arrow") {
        o.color = brushColor
        o.points = [
          { x: ptB.x, y: ptB.y },
          { x: ptB.x, y: ptB.y },
        ]
      }
      page().objs.push(o)
      applySelection([o.id])
      rerender()
      dragRef.current = { mode: "create", id: o.id, startPt: ptB }
      scheduleDraw()
    }
  }

  const onCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current
    const cv = canvasRef.current
    const ptB = toBoard(e.clientX, e.clientY)

    if (!d) {
      const hd = hitHandle(e.clientX, e.clientY)
      const hit = toolRef.current === "select" ? topHit(ptB) : undefined
      hoverIdRef.current = toolRef.current === "eraser" ? (topHit(ptB)?.id ?? null) : null
      if (cv) {
        cv.style.cursor = spaceRef.current
          ? "grab"
          : hd
            ? hd.kind === "rotate"
              ? "grab"
              : hd.cursor
            : toolRef.current === "select"
              ? hit
                ? "move"
                : "default"
              : "crosshair"
      }
      if (toolRef.current === "eraser") scheduleDraw()
      return
    }

    if (d.mode === "pan") {
      applyCam(viewRef.current.z, d.tx0 + (e.clientX - d.sx), d.ty0 + (e.clientY - d.sy))
      return
    }

    if (d.mode === "move") {
      const dxRaw = ptB.x - d.startPt.x
      const dyRaw = ptB.y - d.startPt.y
      if (!d.moved && Math.hypot(dxRaw, dyRaw) < 2) return
      d.moved = true
      const moving = d.ids.map((i) => objById(i)).filter((o): o is Obj => !!o)
      for (const o of moving) {
        const og = d.origs[o.id]
        if (!og) continue
        o.x = og.x + dxRaw
        o.y = og.y + dyRaw
        if (og.points) o.points = og.points.map((p) => ({ x: p.x + dxRaw, y: p.y + dyRaw }))
      }
      const before = moving.length ? unionBounds(moving) : null
      let guides = { v: [] as number[], h: [] as number[] }
      if (before && !e.altKey) {
        const snap = snapMove(before, new Set(d.ids))
        if (snap.dx || snap.dy) {
          for (const o of moving) offsetObj(o, snap.dx, snap.dy)
        }
        guides = snap.guides
      }
      guidesRef.current = guides
      scheduleDraw()
      return
    }

    if (d.mode === "resize") {
      const o = objById(d.id)
      if (!o) return
      applyResize(o, d.orig, d.hx, d.hy, ptB, e.shiftKey)
      scheduleDraw()
      return
    }

    if (d.mode === "rotate") {
      const o = objById(d.id)
      if (!o) return
      const ang = Math.atan2(ptB.y - d.center.y, ptB.x - d.center.x)
      let deg = d.origRot + ((ang - d.startAngle) * 180) / Math.PI
      if (!e.altKey) {
        const snapped = Math.round(deg / 15) * 15
        if (Math.abs(deg - snapped) < 4) deg = snapped
      }
      deg = (((deg + 540) % 360) + 360) % 360 - 180
      o.rotation = Math.round(deg * 10) / 10
      scheduleDraw()
      return
    }

    if (d.mode === "marquee") {
      d.cur = ptB
      const x1 = Math.min(d.start.x, ptB.x)
      const y1 = Math.min(d.start.y, ptB.y)
      const x2 = Math.max(d.start.x, ptB.x)
      const y2 = Math.max(d.start.y, ptB.y)
      const hits = page()
        .objs.filter((o) => {
          if (o.hidden || o.locked) return false
          const b = getBBox(o)
          return b.x < x2 && b.x + b.w > x1 && b.y < y2 && b.y + b.h > y1
        })
        .map((o) => o.id)
      const merged = Array.from(new Set([...d.baseIds, ...hits]))
      if (merged.join(",") !== selRef.current.join(",")) applySelection(merged)
      scheduleDraw()
      return
    }

    if (d.mode === "pen") {
      const o = objById(d.id)
      if (!o?.points) return
      const last = o.points[o.points.length - 1]
      if (Math.hypot(ptB.x - last.x, ptB.y - last.y) > 1.4 / viewRef.current.z) {
        o.points.push({ x: ptB.x, y: ptB.y })
        scheduleDraw()
      }
      return
    }

    if (d.mode === "erase") {
      eraseAt(ptB)
      return
    }

    if (d.mode === "create") {
      const o = objById(d.id)
      if (!o) return
      let dx = ptB.x - d.startPt.x
      let dy = ptB.y - d.startPt.y
      if (o.kind === "line" || o.kind === "arrow") {
        o.points = [
          { x: d.startPt.x, y: d.startPt.y },
          { x: d.startPt.x + dx, y: d.startPt.y + dy },
        ]
        o.x = d.startPt.x + dx / 2
        o.y = d.startPt.y + dy / 2
        o.w = Math.abs(dx)
        o.h = Math.abs(dy)
      } else {
        if (e.shiftKey) {
          const s = Math.max(Math.abs(dx), Math.abs(dy))
          dx = (dx < 0 ? -1 : 1) * s
          dy = (dy < 0 ? -1 : 1) * s
        }
        o.w = Math.abs(dx)
        o.h = Math.abs(dy)
        o.x = d.startPt.x + dx / 2
        o.y = d.startPt.y + dy / 2
      }
      scheduleDraw()
    }
  }

  const onCanvasPointerUp = () => {
    const d = dragRef.current
    dragRef.current = null
    guidesRef.current = { v: [], h: [] }
    if (canvasRef.current) canvasRef.current.style.cursor = spaceRef.current ? "grab" : ""
    if (!d) return

    if (d.mode === "move") {
      if (d.moved) {
        commit()
        refresh()
      } else {
        rerender()
      }
      return
    }
    if (d.mode === "resize" || d.mode === "rotate") {
      commit()
      refresh()
      return
    }
    if (d.mode === "erase") {
      if (d.erased) {
        commit()
        refresh()
      }
      return
    }
    if (d.mode === "marquee") {
      rerender()
      return
    }
    if (d.mode === "pen") {
      const o = objById(d.id)
      if (o && o.points) {
        if (o.points.length < 2) {
          page().objs = page().objs.filter((x) => x.id !== o.id)
          applySelection([])
        } else {
          const rec = snapShape ? recognizeStroke(o.points) : null
          if (rec) {
            const style = { color: o.color, strokeWidth: o.strokeWidth }
            page().objs = page().objs.filter((x) => x.id !== o.id)
            let nu: Obj
            if (rec.type === "line") {
              nu = makeObj("line", (rec.x1 + rec.x2) / 2, (rec.y1 + rec.y2) / 2, {
                ...style,
                name: "SNAPPED LINE",
                fillEnabled: false,
                points: [
                  { x: rec.x1, y: rec.y1 },
                  { x: rec.x2, y: rec.y2 },
                ],
                w: Math.abs(rec.x2 - rec.x1),
                h: Math.abs(rec.y2 - rec.y1),
              })
            } else {
              nu = makeObj(rec.type, rec.x + rec.w / 2, rec.y + rec.h / 2, {
                ...style,
                name: `SNAPPED ${rec.type.toUpperCase()}`,
                fillEnabled: false,
                w: rec.w,
                h: rec.h,
              })
            }
            page().objs.push(nu)
            applySelection([nu.id])
            toast(`Snapped → ${rec.type}`)
          } else {
            const b = getBBox(o)
            o.x = b.x + b.w / 2
            o.y = b.y + b.h / 2
            o.w = b.w
            o.h = b.h
            applySelection([o.id])
          }
        }
      }
      commit()
      refresh()
      return
    }
    if (d.mode === "create") {
      const o = objById(d.id)
      if (o) {
        const tiny = o.w < 12 && o.h < 12
        if ((o.kind === "line" || o.kind === "arrow") && tiny) {
          const L = SHAPE_DEFAULT_SIZE[o.kind]?.[0] ?? 320
          o.points = [
            { x: o.x - L / 2, y: o.y },
            { x: o.x + L / 2, y: o.y },
          ]
          o.w = L
          o.h = 0
        } else if (tiny) {
          const def = SHAPE_DEFAULT_SIZE[o.kind] ?? [240, 240]
          o.w = def[0]
          o.h = def[1]
        }
      }
      commit()
      refresh()
    }
  }

  const onCanvasDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ptB = toBoard(e.clientX, e.clientY)
    const hit = topHit(ptB)
    if (!hit) return
    if (hit.locked) {
      applySelection([hit.id])
      rerender()
      return
    }
    applySelection([hit.id])
    if (hit.kind === "text") setEditingId(hit.id)
    rerender()
  }

  const commitEditing = () => {
    const id = editingRef.current
    if (!id) return
    setEditingId(null)
    const o = objById(id)
    if (!o) return
    if (!o.text || !o.text.trim()) {
      page().objs = page().objs.filter((x) => x.id !== id)
      applySelection(selRef.current.filter((i) => i !== id))
    } else {
      syncTextSize(measure(), o)
    }
    commit()
    refresh()
  }

  const mutateSel = (fn: (o: Obj) => void, coalesceMs = 0) => {
    for (const o of selObjs()) {
      if (o.locked) continue
      fn(o)
    }
    refresh()
    commit(coalesceMs)
  }

  const deleteObjs = (ids: string[], force = false) => {
    const kill = new Set(ids)
    const pg = page()
    pg.objs = pg.objs.filter((o) => !kill.has(o.id) || (!force && o.locked))
    applySelection(selRef.current.filter((i) => !kill.has(i)))
    commit()
    refresh()
  }

  const deleteSelection = () => deleteObjs(selRef.current)

  const duplicateObjs = (ids: string[]) => {
    const pg = page()
    const inserts: { after: number; obj: Obj }[] = []
    pg.objs.forEach((o, i) => {
      if (!ids.includes(o.id)) return
      const c = cloneWithNewId(o)
      offsetObj(c, 24, 24)
      inserts.push({ after: i, obj: c })
    })
    inserts.sort((a, b) => b.after - a.after).forEach((ins) => pg.objs.splice(ins.after + 1, 0, ins.obj))
    if (!inserts.length) return 0
    applySelection(inserts.map((ins) => ins.obj.id))
    commit()
    refresh()
    return inserts.length
  }

  const duplicateSelection = () => {
    if (duplicateObjs(selRef.current)) toast("Duplicated")
  }

  const copySelection = () => {
    const objs = selObjs()
    if (!objs.length) return
    clipRef.current = objs.map((o) => JSON.parse(JSON.stringify(o)) as Obj)
    toast(`Copied ${objs.length}`)
  }

  const pasteClipboard = () => {
    if (!clipRef.current.length) return
    const clones = clipRef.current.map((o) => {
      const c = cloneWithNewId(o)
      offsetObj(c, 26, 26)
      return c
    })
    page().objs.push(...clones)
    applySelection(clones.map((c) => c.id))
    commit()
    refresh()
    toast("Pasted")
  }

  const reorder = (op: LayerOp, ids: string[]) => {
    if (!ids.length) return
    const arr = [...page().objs]
    const set = new Set(ids)
    if (op === "front" || op === "back") {
      const moved = arr.filter((o) => set.has(o.id))
      const rest = arr.filter((o) => !set.has(o.id))
      page().objs = op === "front" ? [...rest, ...moved] : [...moved, ...rest]
    } else if (op === "forward") {
      for (let i = arr.length - 2; i >= 0; i--) {
        if (set.has(arr[i].id) && !set.has(arr[i + 1].id)) {
          const tmp = arr[i]
          arr[i] = arr[i + 1]
          arr[i + 1] = tmp
        }
      }
      page().objs = arr
    } else {
      for (let i = 1; i < arr.length; i++) {
        if (set.has(arr[i].id) && !set.has(arr[i - 1].id)) {
          const tmp = arr[i]
          arr[i] = arr[i - 1]
          arr[i - 1] = tmp
        }
      }
      page().objs = arr
    }
  }

  const alignSel = (mode: "l" | "c" | "r" | "t" | "m" | "b") => {
    const sel = selObjs()
    if (!sel.length) return
    const pg = page()
    if (sel.length === 1) {
      const o = sel[0]
      if (mode === "l") o.x = o.w / 2
      if (mode === "c") o.x = pg.w / 2
      if (mode === "r") o.x = pg.w - o.w / 2
      if (mode === "t") o.y = o.h / 2
      if (mode === "m") o.y = pg.h / 2
      if (mode === "b") o.y = pg.h - o.h / 2
    } else {
      const u = unionBounds(sel)
      if (!u) return
      for (const o of sel) {
        if (o.locked) continue
        if (mode === "l") o.x += u.x - (o.x - o.w / 2)
        if (mode === "c") o.x += u.x + u.w / 2 - o.x
        if (mode === "r") o.x += u.x + u.w - (o.x + o.w / 2)
        if (mode === "t") o.y += u.y - (o.y - o.h / 2)
        if (mode === "m") o.y += u.y + u.h / 2 - o.y
        if (mode === "b") o.y += u.y + u.h - (o.y + o.h / 2)
      }
    }
    commit()
    refresh()
  }

  const distributeSel = (axis: "h" | "v") => {
    const sel = selObjs().filter((o) => !o.locked)
    if (sel.length < 3) {
      toast("Select 3+ objects")
      return
    }
    const sorted = [...sel].sort((a, b) => (axis === "h" ? a.x - b.x : a.y - b.y))
    const first = sorted[0]
    const last = sorted[sorted.length - 1]
    const span = axis === "h" ? last.x - first.x : last.y - first.y
    const step = span / (sorted.length - 1)
    sorted.forEach((o, i) => {
      if (axis === "h") o.x = first.x + step * i
      else o.y = first.y + step * i
    })
    commit()
    refresh()
  }

  const addShape = (kind: ObjKind) => {
    const c = viewCenter()
    const def = SHAPE_DEFAULT_SIZE[kind] ?? [240, 240]
    const isLine = kind === "line" || kind === "arrow"
    const o = makeObj(kind, c.x, c.y, {
      name: String(kind).toUpperCase(),
      w: def[0],
      h: def[1],
      fill: "#94a3b8",
      color: "#475569",
      strokeWidth: 4,
      radius: kind === "rrect" ? 22 : 0,
      fillEnabled: !isLine,
    })
    if (isLine) {
      o.color = brushColor
      o.points = [
        { x: c.x - def[0] / 2, y: c.y },
        { x: c.x + def[0] / 2, y: c.y },
      ]
    }
    page().objs.push(o)
    applySelection([o.id])
    commit()
    refresh()
  }

  const addEmoji = (ch: string) => {
    const c = viewCenter()
    const o = makeObj("emoji", c.x, c.y, { name: `STICKER`, text: ch, w: 150, h: 150, fillEnabled: false, strokeWidth: 0 })
    page().objs.push(o)
    applySelection([o.id])
    commit()
    refresh()
  }

  const addTextPreset = (presetId: string) => {
    const p = TEXT_PRESETS.find((x) => x.id === presetId)
    if (!p) return
    const pg = page()
    const c = viewCenter()
    const placeholder =
      p.id === "display"
        ? "YOUR HEADLINE"
        : p.id === "heading"
          ? "Your heading text"
          : p.id === "subheading"
            ? "Subheading goes here"
            : p.id === "caption"
              ? "SECTION LABEL · 01"
              : p.id === "quote"
                ? "\u201CA memorable quote here.\u201D"
                : "Your paragraph text goes here."
    const o = makeObj("text", c.x, c.y, {
      name: p.label.toUpperCase(),
      text: placeholder,
      fontKey: p.fontKey,
      fontSize: Math.round(p.fontSize * clamp(pg.w / 1080, 0.5, 1.6)),
      bold: p.bold,
      italic: p.italic,
      uppercase: p.uppercase,
      letterSpacing: p.letterSpacing,
      lineHeight: p.lineHeight,
      color: readableOn(pg.bg.c1),
      align: p.id === "body" ? "left" : "center",
      w: Math.min(pg.w * 0.76, 900),
      h: 50,
      fillEnabled: false,
    })
    syncTextSize(measure(), o)
    pg.objs.push(o)
    applySelection([o.id])
    setEditingId(o.id)
    commit()
    refresh()
  }

  const handleFiles = async (files: File[]) => {
    const results = await Promise.all(files.slice(0, 12).map(processImageFile))
    const ok = results.filter((r): r is Upload => !!r)
    if (!ok.length) {
      toast("No usable images")
      return
    }
    const next = [...ok, ...uploads].slice(0, 40)
    setUploads(next)
    docRef.current.uploads = next
    toast(`${ok.length} uploaded`)
    insertUpload(ok[0])
  }

  const insertUpload = (u: Upload) => {
    const im = new Image()
    im.onload = () => {
      const pg = page()
      const k = Math.min((pg.w * 0.64) / im.naturalWidth, (pg.h * 0.64) / im.naturalHeight, 1.6)
      const c = viewCenter()
      const o = makeObj("image", c.x, c.y, {
        name: u.name.toUpperCase().slice(0, 18),
        src: u.src,
        w: Math.max(40, Math.round(im.naturalWidth * k)),
        h: Math.max(40, Math.round(im.naturalHeight * k)),
        fillEnabled: false,
        strokeWidth: 0,
        radius: 0,
        filters: { ...DEFAULT_FILTERS },
      })
      pg.objs.push(o)
      applySelection([o.id])
      commit()
      refresh()
    }
    im.src = u.src
  }

  const removeUpload = (id: string) => {
    const next = uploads.filter((u) => u.id !== id)
    setUploads(next)
    docRef.current.uploads = next
    scheduleSave()
  }

  const applyTemplate = (defId: string) => {
    const def = TEMPLATES.find((t) => t.id === defId)
    if (!def) return
    docRef.current.pages[docRef.current.activeIdx] = templatePage(def)
    applySelection([])
    commit()
    fitView()
    refresh()
    toast(`Template · ${def.name}`)
  }

  const generateMagic = (prompt: string) => {
    setMagicBusy(true)
    window.setTimeout(() => {
      docRef.current.pages[docRef.current.activeIdx] = magicDesign(prompt)
      applySelection([])
      setMagicBusy(false)
      commit()
      fitView()
      refresh()
      toast("Magic design ready ✦")
    }, 420)
  }

  const recolorPage = (paletteId: string) => {
    const pal = PALETTES.find((p) => p.id === paletteId)
    if (!pal) return
    const pg = page()
    pg.objs = recolorObjs(pg.objs, pal)
    if (pg.bg.type === "gradient") {
      pg.bg.c1 = pal.colors[0]
      pg.bg.c2 = pal.colors[1]
    } else {
      pg.bg.c1 = pal.colors[0]
      pg.bg.c2 = pal.colors[2]
    }
    commit()
    refresh()
    toast(`Recolored · ${pal.name}`)
  }

  const magicResize = (presetId: string) => {
    const preset = ARTBOARD_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    const pg = page()
    const visible = pg.objs.filter((o) => !o.hidden)
    const u = unionBounds(visible)
    if (u && u.w > 4 && u.h > 4) {
      const s = Math.min((preset.w * 0.86) / u.w, (preset.h * 0.86) / u.h, 3)
      const ocx = u.x + u.w / 2
      const ocy = u.y + u.h / 2
      const ncx = preset.w / 2
      const ncy = preset.h / 2
      for (const o of pg.objs) {
        o.x = ncx + (o.x - ocx) * s
        o.y = ncy + (o.y - ocy) * s
        o.w *= s
        o.h *= s
        if (o.fontSize) o.fontSize = clamp(Math.round(o.fontSize * s), 8, 420)
        if (o.strokeWidth) o.strokeWidth = Math.max(0.5, o.strokeWidth * s)
        if (o.radius) o.radius *= s
        if (o.letterSpacing) o.letterSpacing *= s
        if (o.points) for (const p of o.points) {
          p.x = ncx + (p.x - ocx) * s
          p.y = ncy + (p.y - ocy) * s
        }
      }
    }
    pg.w = preset.w
    pg.h = preset.h
    commit()
    fitView()
    refresh()
    toast(`Resized · ${preset.label}`)
  }

  const setBg = (patch: Partial<Bg>, allPages: boolean) => {
    const targets = allPages ? docRef.current.pages : [page()]
    for (const pg of targets) {
      pg.bg = { ...pg.bg, ...patch }
      if (!pg.bg.c2) pg.bg.c2 = "#94a3b8"
    }
    commit()
    refresh()
  }

  const doExport = async (fmt: "png" | "jpg", scale: number, all: boolean) => {
    toast("Rendering…")
    const proj = docRef.current
    const list = all ? proj.pages : [proj.pages[proj.activeIdx]]
    for (let i = 0; i < list.length; i++) {
      const blob = await exportPageBlob(list[i], fmt, scale)
      const suffix = list.length > 1 ? `-${i + 1}` : ""
      downloadBlob(blob, `${slug(list[i].name)}${suffix}-${scale}x.${fmt === "png" ? "png" : "jpg"}`)
      if (i < list.length - 1) await new Promise((r) => window.setTimeout(r, 380))
    }
    toast(all ? `Exported ${list.length} pages` : "Exported ✓")
  }

  const copyPng = async () => {
    try {
      const blob = await exportPageBlob(page(), "png", 2)
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      toast("PNG copied to clipboard")
    } catch {
      const blob = await exportPageBlob(page(), "png", 2)
      downloadBlob(blob, `${slug(page().name)}.png`)
      toast("Clipboard blocked — downloaded instead")
    }
  }

  const saveJson = () => {
    const blob = new Blob([JSON.stringify(docRef.current)], { type: "application/json" })
    downloadBlob(blob, `studio-project-${Date.now()}.json`)
    toast("Project saved (.json)")
  }

  const loadJson = async (file: File) => {
    try {
      const p = JSON.parse(await file.text())
      if (!p || !Array.isArray(p.pages) || !p.pages.length || !Array.isArray(p.pages[0]?.objs)) throw new Error("bad")
      docRef.current = { version: 1, pages: p.pages, activeIdx: clamp(p.activeIdx ?? 0, 0, p.pages.length - 1), uploads: Array.isArray(p.uploads) ? p.uploads : [] }
      setUploads(docRef.current.uploads)
      applySelection([])
      histRef.current = { stack: [JSON.stringify(docRef.current)], idx: 0, lastAt: Date.now() }
      updateHistUi()
      fitView()
      refresh()
      toast("Project loaded")
    } catch {
      toast("Invalid project file")
    }
  }

  const clearPage = () => {
    page().objs = []
    applySelection([])
    commit()
    refresh()
    toast("Page cleared")
  }

  const addPage = () => {
    const src = page()
    docRef.current.pages.splice(docRef.current.activeIdx + 1, 0, {
      id: uid(),
      name: `Page ${docRef.current.pages.length + 1}`,
      w: src.w,
      h: src.h,
      bg: { ...src.bg },
      objs: [],
    })
    docRef.current.activeIdx += 1
    applySelection([])
    commit()
    fitView()
    refresh()
  }

  const duplicatePage = () => {
    const src = page()
    const copy = JSON.parse(JSON.stringify(src)) as Page
    copy.id = uid()
    copy.name = `${src.name} copy`
    copy.objs = copy.objs.map((o) => ({ ...o, id: uid() }))
    docRef.current.pages.splice(docRef.current.activeIdx + 1, 0, copy)
    docRef.current.activeIdx += 1
    applySelection([])
    commit()
    fitView()
    refresh()
  }

  const deletePage = () => {
    if (docRef.current.pages.length <= 1) {
      toast("Keep at least one page")
      return
    }
    docRef.current.pages.splice(docRef.current.activeIdx, 1)
    docRef.current.activeIdx = clamp(docRef.current.activeIdx, 0, docRef.current.pages.length - 1)
    applySelection([])
    commit()
    fitView()
    refresh()
  }

  const setActivePage = (idx: number) => {
    if (idx === docRef.current.activeIdx) return
    commitEditing()
    docRef.current.activeIdx = idx
    applySelection([])
    fitView()
    refresh()
  }

  const toggleFlag = (flag: "hidden" | "locked", id: string) => {
    const o = objById(id)
    if (!o) return
    o[flag] = !o[flag]
    commit()
    refresh()
  }

  const layerOpOn = (op: LayerOp, id: string) => {
    reorder(op, [id])
    commit()
    refresh()
  }

  const runOcr = async () => {
    const o = objById(selRef.current[selRef.current.length - 1] ?? "")
    if (!o || o.kind !== "pen" || !o.points?.length) return
    setOcrBusy(true)
    toast("Reading handwriting…")
    try {
      const b = getBBox(o)
      const scale = 4
      const pad = 44
      const off = document.createElement("canvas")
      off.width = Math.max(b.w * scale + pad * 2, 260)
      off.height = Math.max(b.h * scale + pad * 2, 120)
      const ctx = off.getContext("2d")!
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, off.width, off.height)
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = Math.max(6, o.strokeWidth * 1.5) * scale
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
      const { createWorker } = await import("tesseract.js")
      let lastPct = 0
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            const pct = Math.round(m.progress * 100)
            if (pct - lastPct >= 25) {
              lastPct = pct
              toast(`Reading… ${pct}%`)
            }
          }
        },
      })
      const { data } = await worker.recognize(off)
      await worker.terminate()
      const text = (data.text ?? "").replace(/\s+/g, " ").trim()
      if (!text) {
        toast("Couldn't read — print larger")
        return
      }
      const pg = page()
      pg.objs = pg.objs.filter((x) => x.id !== o.id)
      const nu = makeObj("text", b.x + b.w / 2, b.y + b.h / 2, {
        name: "HANDWRITING",
        text,
        fontKey: "grotesk",
        bold: true,
        fontSize: clamp(Math.round(b.h * 0.82), 16, 160),
        color: o.color,
        align: "center",
        w: Math.max(b.w * 1.2, 80),
        h: b.h,
        fillEnabled: false,
      })
      syncTextSize(measure(), nu)
      pg.objs.push(nu)
      applySelection([nu.id])
      commit()
      refresh()
      toast(`Text → "${text.slice(0, 22)}${text.length > 22 ? "…" : ""}"`)
    } catch {
      toast("OCR unavailable — check network")
    } finally {
      setOcrBusy(false)
    }
  }

  const pg = page()
  const cam = viewRef.current
  const primary = selIds.length ? objById(selIds[selIds.length - 1]) : undefined
  const selCount = selIds.length
  const single = selCount === 1 ? primary : undefined
  const multi = selCount > 1
  const editingObj = editingId ? objById(editingId) : undefined
  const isText = !!single && single.kind === "text"
  const isImage = !!single && single.kind === "image"
  const isPen = !!single && single.kind === "pen"
  const isEmoji = !!single && single.kind === "emoji"
  const isShapeSel = !!single && !["text", "image", "emoji", "pen"].includes(single.kind)

  const api: EditorApi = {
    page: pg,
    selectedIds: selIds,
    tool,
    setTool,
    brushColor,
    brushWidth,
    snapShape,
    setBrushColor,
    setBrushWidth,
    setSnapShape,
    uploads,
    requestUploads: () => fileInputRef.current?.click(),
    removeUpload,
    insertUpload,
    handleFiles: (files) => void handleFiles(files),
    applyTemplate,
    generateMagic,
    recolorPage,
    magicResize,
    setBg,
    addShape,
    addEmoji,
    addTextPreset,
    selectObjs: (ids, additive) => {
      applySelection(additive ? Array.from(new Set([...selRef.current, ...ids])) : ids)
      rerender()
    },
    layerOpOn,
    toggleFlag,
    duplicateObj: (id) => void duplicateObjs([id]),
    deleteObj: (id) => deleteObjs([id], true),
  }

  const hint = (() => {
    if (ocrBusy) return "READING HANDWRITING…"
    if (magicBusy) return "GENERATING MAGIC DESIGN…"
    if (editingObj) return "TYPE · ESC / CLICK AWAY TO FINISH"
    if (multi) return `${selCount} SELECTED · DRAG TO MOVE · ALT DRAG DISABLES SNAP`
    if (single?.locked) return "LOCKED · UNLOCK IN LAYERS TO EDIT"
    if (single) return "DRAG MOVE · HANDLES RESIZE · TOP HANDLE ROTATES · DBL-CLICK EDITS TEXT"
    if (tool === "select") return "DRAG MARQUEE TO MULTI-SELECT · SHIFT-CLICK ADDS · SPACE+DRAG PANS"
    if (tool === "text") return "CLICK CANVAS TO PLACE TEXT"
    if (tool === "eraser") return "CLICK OR DRAG OVER OBJECTS TO ERASE"
    if (tool === "pen" || tool === "marker" || tool === "highlighter") return "DRAW · ROUGH CIRCLES / RECTS / LINES SNAP TO PERFECT SHAPES"
    if (isShapeTool(tool)) return `DRAG TO DRAW ${String(tool).toUpperCase()} · SHIFT = UNIFORM`
    return ""
  })()

  type CtxItem = { label: string; action: () => void; danger?: boolean }
  const ctxItems: CtxItem[] = []
  if (ctxMenu?.hitId) {
    ctxItems.push(
      { label: "Duplicate", action: () => duplicateObjs([ctxMenu.hitId!]) },
      { label: "Bring to front", action: () => { reorder("front", [ctxMenu.hitId!]); commit(); refresh() } },
      { label: "Forward", action: () => { reorder("forward", [ctxMenu.hitId!]); commit(); refresh() } },
      { label: "Backward", action: () => { reorder("backward", [ctxMenu.hitId!]); commit(); refresh() } },
      { label: "Send to back", action: () => { reorder("back", [ctxMenu.hitId!]); commit(); refresh() } },
      { label: objById(ctxMenu.hitId)?.locked ? "Unlock" : "Lock", action: () => toggleFlag("locked", ctxMenu.hitId!) },
      { label: "Delete", action: () => deleteObjs([ctxMenu.hitId!], true), danger: true },
    )
  } else {
    ctxItems.push(
      { label: "Paste", action: pasteClipboard },
      { label: "Select all", action: () => applySelection(pg.objs.filter((o) => !o.hidden && !o.locked).map((o) => o.id)) },
      { label: "Add heading", action: () => addTextPreset("heading") },
      { label: "Background settings", action: () => setPanel("background") },
      { label: "Clear page", action: clearPage, danger: true },
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-neutral-200/70 dark:bg-[#101010] text-neutral-900 dark:text-neutral-100">
      <header className="min-h-12 shrink-0 flex items-center gap-1.5 sm:gap-2 border-b border-border bg-white/85 dark:bg-neutral-900/85 backdrop-blur px-2 sm:px-3 py-1 relative z-40">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <span className="font-mono font-bold uppercase tracking-[0.18em] text-[10px] sm:text-[11px] whitespace-nowrap truncate">Studio OS · Canvas</span>
        <span className="hidden md:flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          autosave
        </span>
        <span className="hidden lg:inline text-[9px] font-mono uppercase tracking-widest text-neutral-400 truncate">
          {pg.name} · {pg.w}×{pg.h}
        </span>

        <div className="flex items-center gap-0.5 ml-auto min-w-0 overflow-x-auto no-scrollbar shrink-0 max-w-[62vw] sm:max-w-none">
          <IconBtn icon={Undo2} label="Undo (Ctrl+Z)" onClick={undoFn} disabled={!histUi.undo} />
          <IconBtn icon={Redo2} label="Redo (Ctrl+Y)" onClick={redoFn} disabled={!histUi.redo} />
          <div className="w-px h-5 bg-border mx-1 shrink-0 hidden xs:block" />
          <span className="hidden sm:contents">
            <IconBtn icon={Keyboard} label="Shortcuts (?)" onClick={() => setShortcutsOpen(true)} />
            <IconBtn icon={FolderOpen} label="Open project (.json)" onClick={() => jsonInputRef.current?.click()} />
            <IconBtn icon={Save} label="Save project (.json)" onClick={saveJson} />
            <IconBtn icon={Trash2} label="Clear page" onClick={clearPage} danger />
          </span>
          <div className="w-px h-5 bg-border mx-1 shrink-0 hidden sm:block" />
          <Popover
            align="right"
            width={222}
            trigger={() => (
              <button type="button" className="h-8 px-3 rounded-lg bg-foreground text-background text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer">
                <Download size={12} />
                Export
                <ChevronDown size={11} />
              </button>
            )}
          >
            {(close) => (
              <div className="space-y-0.5">
                {[
                  { label: "PNG · 1×", act: () => void doExport("png", 1, false) },
                  { label: "PNG · 2× sharp", act: () => void doExport("png", 2, false) },
                  { label: "JPG · 2×", act: () => void doExport("jpg", 2, false) },
                  { label: "Copy PNG to clipboard", act: () => void copyPng() },
                  { label: "All pages · PNG 2×", act: () => void doExport("png", 2, true) },
                ].map((it) => (
                  <button key={it.label} type="button" onClick={() => { close(); it.act() }} className="w-full text-left px-2.5 py-2 rounded-lg text-[11px] font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                    {it.label}
                  </button>
                ))}
              </div>
            )}
          </Popover>
          <IconBtn icon={X} label="Close studio (Esc)" onClick={() => { commitEditing(); onClose() }} />
        </div>
        <input ref={jsonInputRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) void loadJson(f); e.target.value = "" }} />
        <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files?.length) void handleFiles(Array.from(e.target.files)); e.target.value = "" }} />
      </header>

      <div className="flex flex-1 min-h-0 relative">
        <nav className="w-[52px] shrink-0 border-r border-border bg-white/70 dark:bg-neutral-900/70 backdrop-blur flex flex-col items-center py-1.5 gap-0.5 overflow-y-auto no-scrollbar z-30">
          {RAIL_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              title={t.label}
              onClick={() => setPanel(panel === t.id ? null : t.id)}
              className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-px transition-all cursor-pointer ${
                panel === t.id ? "bg-amber-600 text-white shadow-md" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/80 dark:hover:bg-neutral-800"
              }`}
            >
              <t.icon size={15} />
              <span className="text-[6.5px] font-bold uppercase tracking-wider">{t.label}</span>
            </button>
          ))}
        </nav>

        {panel && (
          <aside className="absolute md:static left-[52px] md:left-auto top-0 bottom-0 z-30 w-[min(264px,calc(100%-52px))] md:w-[266px] shrink-0 border-r border-border bg-white dark:bg-neutral-900 overflow-y-auto p-3 space-y-4 shadow-2xl md:shadow-none">
            <div className="flex items-center justify-between gap-2 sticky -top-3 pt-0.5 bg-white dark:bg-neutral-900 z-10 pb-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                {RAIL_TABS.find((t) => t.id === panel)?.label}
              </span>
              <button
                type="button"
                onClick={() => setPanel(null)}
                aria-label="Close panel"
                className="md:hidden w-7 h-7 inline-flex items-center justify-center rounded-lg hover:bg-neutral-200/80 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            {panel === "templates" && <TemplatesPanel api={api} />}
            {panel === "elements" && <ElementsPanel api={api} />}
            {panel === "text" && <TextPresetsPanel api={api} />}
            {panel === "uploads" && <UploadsPanel api={api} />}
            {panel === "draw" && <DrawPanel api={api} />}
            {panel === "background" && <BackgroundPanel api={api} />}
            {panel === "magic" && <MagicPanel api={api} busy={magicBusy} />}
            {panel === "layers" && <LayersPanel api={api} />}
          </aside>
        )}

        <main className="relative flex-1 min-w-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.09)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[size:22px_22px]">
          {(selCount > 0 || editingObj) && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 max-w-[94%] flex items-center gap-0.5 rounded-xl border border-border bg-white/95 dark:bg-neutral-900/95 backdrop-blur shadow-lg px-1.5 py-1 overflow-x-auto scrollbar-thin">
              {editingObj && <span className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 whitespace-nowrap">Editing · Esc done</span>}

              {!editingObj && isText && single && (
                <>
                  <select
                    value={(single.fontKey ?? "inter") as FontKey}
                    onChange={(e) => mutateSel((o) => { o.fontKey = e.target.value as FontKey })}
                    className="h-7 rounded-md border border-border bg-transparent text-[11px] font-semibold px-1 outline-none cursor-pointer"
                    title="Font family"
                  >
                    {(Object.keys(FONTS) as FontKey[]).map((k) => (
                      <option key={k} value={k}>{FONTS[k].label}</option>
                    ))}
                  </select>
                  <div className="flex items-center rounded-md border border-border mx-0.5 shrink-0">
                    <button type="button" aria-label="Smaller" onClick={() => mutateSel((o) => { o.fontSize = clamp((o.fontSize ?? 48) - 4, 8, 420) })} className="w-6 h-7 inline-flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-neutral-700 cursor-pointer"><Minus size={11} /></button>
                    <input
                      value={single.fontSize ?? 48}
                      onChange={(e) => {
                        const v = Number(e.target.value.replace(/\D/g, ""))
                        if (v >= 8 && v <= 420) mutateSel((o) => { o.fontSize = v }, 700)
                      }}
                      className="w-8 text-center text-[11px] font-bold bg-transparent outline-none"
                    />
                    <button type="button" aria-label="Bigger" onClick={() => mutateSel((o) => { o.fontSize = clamp((o.fontSize ?? 48) + 4, 8, 420) })} className="w-6 h-7 inline-flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-neutral-700 cursor-pointer"><Plus size={11} /></button>
                  </div>
                  <IconBtn icon={Bold} label="Bold" active={!!single.bold} onClick={() => mutateSel((o) => { o.bold = !o.bold })} compact />
                  <IconBtn icon={Italic} label="Italic" active={!!single.italic} onClick={() => mutateSel((o) => { o.italic = !o.italic })} compact />
                  <IconBtn icon={Underline} label="Underline" active={!!single.underline} onClick={() => mutateSel((o) => { o.underline = !o.underline })} compact />
                  <IconBtn
                    icon={single.align === "left" ? AlignLeft : single.align === "right" ? AlignRight : AlignCenter}
                    label="Align text"
                    onClick={() => mutateSel((o) => { o.align = o.align === "left" ? "center" : o.align === "center" ? "right" : "left" })}
                    compact
                  />
                  <Chip active={!!single.uppercase} onClick={() => mutateSel((o) => { o.uppercase = !o.uppercase })}>AA</Chip>
                  <Chip active={!!single.fxShadow} onClick={() => mutateSel((o) => { o.fxShadow = !o.fxShadow })}>Shadow</Chip>
                  <Chip active={!!single.fxHollow} onClick={() => mutateSel((o) => { o.fxHollow = !o.fxHollow })}>Hollow</Chip>
                  <Popover
                    width={238}
                    trigger={() => (
                      <button type="button" title="Highlight behind text" className="h-7 px-2 rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-200/70 dark:hover:bg-neutral-700 transition-colors cursor-pointer" style={single.fxBg ? { background: single.fxBg } : undefined}>
                        HL
                      </button>
                    )}
                  >
                    {(close) => (
                      <div className="space-y-2">
                        <ColorSwatchGrid value={single.fxBg ?? "#facc15"} onChange={(c) => mutateSel((o) => { o.fxBg = c })} />
                        <Chip onClick={() => { mutateSel((o) => { o.fxBg = null }); close() }}>Remove highlight</Chip>
                      </div>
                    )}
                  </Popover>
                </>
              )}

              {!editingObj && isImage && single && (
                <>
                  <div className="flex items-center gap-0.5">
                    {FX_PRESETS.map((fx) => (
                      <Chip key={fx.id} onClick={() => mutateSel((o) => { o.filters = { ...DEFAULT_FILTERS, ...fx.f } })}>
                        {fx.label}
                      </Chip>
                    ))}
                  </div>
                  <Popover
                    width={256}
                    trigger={() => <Chip>Adjust</Chip>}
                  >
                    {single.filters && (
                      <div className="space-y-2">
                        {([
                          ["Brightness", "brightness", 20, 200, "%"],
                          ["Contrast", "contrast", 20, 200, "%"],
                          ["Saturate", "saturate", 0, 250, "%"],
                          ["Blur", "blur", 0, 20, "px"],
                          ["Grayscale", "grayscale", 0, 100, "%"],
                          ["Sepia", "sepia", 0, 100, "%"],
                          ["Hue", "hueRotate", 0, 360, "°"],
                        ] as const).map(([label, key, min, max, suffix]) => (
                          <SliderRow
                            key={key}
                            label={label}
                            min={min}
                            max={max}
                            value={single.filters![key] ?? (DEFAULT_FILTERS as Record<string, number>)[key]}
                            suffix={suffix}
                            onChange={(v) => {
                              single.filters = { ...DEFAULT_FILTERS, ...single.filters, [key]: v }
                              scheduleDraw()
                              rerender()
                            }}
                            onCommit={() => commit(500)}
                          />
                        ))}
                        <Chip onClick={() => mutateSel((o) => { o.filters = { ...DEFAULT_FILTERS } })}>Reset</Chip>
                      </div>
                    )}
                  </Popover>
                  <div className="w-20 shrink-0"><SliderRow label="Round" min={0} max={Math.round(Math.min(single.w, single.h) / 2)} value={Math.round(single.radius ?? 0)} onChange={(v) => { single.radius = v; scheduleDraw(); rerender() }} onCommit={() => commit(500)} /></div>
                  <IconBtn icon={FlipHorizontal} label="Flip horizontal" onClick={() => mutateSel((o) => { o.flipH = !o.flipH })} compact />
                  <IconBtn icon={FlipVertical} label="Flip vertical" onClick={() => mutateSel((o) => { o.flipV = !o.flipV })} compact />
                </>
              )}

              {!editingObj && isPen && single && (
                <>
                  <ColorButton color={single.color} label="Ink" onChange={(c) => mutateSel((o) => { o.color = c })} />
                  <div className="w-20 shrink-0"><SliderRow label="Width" min={1} max={48} value={Math.round(single.strokeWidth)} onChange={(v) => { single.strokeWidth = v; scheduleDraw(); rerender() }} onCommit={() => commit(500)} /></div>
                  <button
                    type="button"
                    disabled={ocrBusy}
                    onClick={() => void runOcr()}
                    className="h-7 px-2.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-emerald-500 disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <ScanText size={12} className={ocrBusy ? "animate-pulse" : ""} />
                    Scribble → Text
                  </button>
                </>
              )}

              {!editingObj && isEmoji && single && (
                <Popover
                  width={240}
                  trigger={() => (
                    <button type="button" className="h-7 px-2 rounded-md text-lg leading-none hover:bg-neutral-200/70 dark:hover:bg-neutral-700 cursor-pointer" style={{ fontFamily: "inherit" }}>
                      {single.text}
                    </button>
                  )}
                >
                  {(close) => (
                    <div className="grid grid-cols-8 gap-1">
                      {EMOJI_SETS[0].items.concat(EMOJI_SETS[1].items.slice(0, 8)).map((ch, i) => (
                        <button key={`${ch}${i}`} type="button" onClick={() => { mutateSel((o) => { o.text = ch }); close() }} className="h-7 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-base leading-none cursor-pointer">
                          {ch}
                        </button>
                      ))}
                    </div>
                  )}
                </Popover>
              )}

              {!editingObj && (isShapeSel || multi) && (
                <>
                  {!multi && single && (
                    <>
                      <ColorButton color={single.fill} label="Fill" onChange={(c) => mutateSel((o) => { o.fill = c })} />
                      <Chip active={!!single.fillEnabled} onClick={() => mutateSel((o) => { o.fillEnabled = !o.fillEnabled })}>Fill</Chip>
                      <ColorButton color={single.color} label="Stroke" onChange={(c) => mutateSel((o) => { o.color = c })} />
                      <div className="w-16 shrink-0"><SliderRow label="Border" min={0} max={40} value={Math.round(single.strokeWidth)} onChange={(v) => { single.strokeWidth = v; scheduleDraw(); rerender() }} onCommit={() => commit(500)} /></div>
                      <Chip active={!!single.gradient} onClick={() => mutateSel((o) => { o.gradient = !o.gradient; if (o.gradient && !o.fill2) o.fill2 = "#111111" })}>Grad</Chip>
                      {single.gradient && (
                        <>
                          <ColorButton color={single.fill2 ?? "#111111"} label="Grad B" onChange={(c) => mutateSel((o) => { o.fill2 = c })} />
                          <div className="w-20 shrink-0"><SliderRow label="Angle" min={0} max={360} value={single.gradAngle ?? 135} suffix="°" onChange={(v) => { single.gradAngle = v; scheduleDraw(); rerender() }} onCommit={() => commit(500)} /></div>
                        </>
                      )}
                      {single.kind === "rrect" && (
                        <div className="w-20 shrink-0"><SliderRow label="Radius" min={0} max={Math.round(Math.min(single.w, single.h) / 2)} value={Math.round(single.radius ?? 0)} onChange={(v) => { single.radius = v; scheduleDraw(); rerender() }} onCommit={() => commit(500)} /></div>
                      )}
                    </>
                  )}
                  <Popover
                    width={224}
                    trigger={() => <Chip>Align</Chip>}
                  >
                    <div className="grid grid-cols-3 gap-1">
                      {(["l", "c", "r"] as const).map((m) => (
                        <button key={m} type="button" title={{ l: "Left", c: "Center", r: "Right" }[m]} onClick={() => alignSel(m)} className="h-8 rounded-md border border-border inline-flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors cursor-pointer">
                          {m === "l" ? <AlignLeft size={14} /> : m === "c" ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                        </button>
                      ))}
                      {(["t", "m", "b"] as const).map((m) => (
                        <button key={m} type="button" title={{ t: "Top", m: "Middle", b: "Bottom" }[m]} onClick={() => alignSel(m)} className="h-8 rounded-md border border-border inline-flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors cursor-pointer">
                          {m === "t" ? <ArrowUp size={14} /> : m === "b" ? <ArrowDown size={14} /> : <span className="text-[10px] font-bold">M</span>}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1 pt-1">
                      <Chip onClick={() => distributeSel("h")}>Dist ↔</Chip>
                      <Chip onClick={() => distributeSel("v")}>Dist ↕</Chip>
                    </div>
                  </Popover>
                  {!multi && single && (
                    <>
                      <IconBtn icon={FlipHorizontal} label="Flip H" onClick={() => mutateSel((o) => { o.flipH = !o.flipH })} compact />
                      <IconBtn icon={FlipVertical} label="Flip V" onClick={() => mutateSel((o) => { o.flipV = !o.flipV })} compact />
                    </>
                  )}
                </>
              )}

              {selCount > 0 && (
                <>
                  <div className="w-px h-5 bg-border mx-0.5 shrink-0" />
                  <Popover width={232} trigger={() => <Chip>Effects</Chip>}>
                    <div className="space-y-2">
                      <SliderRow
                        label="Opacity"
                        min={2}
                        max={100}
                        value={Math.round((primary?.opacity ?? 1) * 100)}
                        suffix="%"
                        onChange={(v) => {
                          for (const o of selObjs()) if (!o.locked) o.opacity = v / 100
                          scheduleDraw()
                        }}
                        onCommit={() => { commit(500); rerender() }}
                      />
                    </div>
                  </Popover>
                  <IconBtn icon={ChevronsUp} label="Bring to front (Ctrl+Shift+])" onClick={() => { reorder("front", selRef.current); commit(); refresh() }} compact />
                  <IconBtn icon={ArrowUp} label="Forward (Ctrl+])" onClick={() => { reorder("forward", selRef.current); commit(); refresh() }} compact />
                  <IconBtn icon={ArrowDown} label="Backward (Ctrl+[)" onClick={() => { reorder("backward", selRef.current); commit(); refresh() }} compact />
                  <IconBtn icon={ChevronsDown} label="Send to back (Ctrl+Shift+[)" onClick={() => { reorder("back", selRef.current); commit(); refresh() }} compact />
                  <div className="w-px h-5 bg-border mx-0.5 shrink-0" />
                  {single && <IconBtn icon={single.locked ? Lock : LockOpen} label={single.locked ? "Unlock" : "Lock"} active={single.locked} onClick={() => toggleFlag("locked", single.id)} compact />}
                  <IconBtn icon={Copy} label="Duplicate (Ctrl+D)" onClick={duplicateSelection} compact />
                  <IconBtn icon={EyeOff} label="Hide" onClick={() => { for (const id of selRef.current) { const o = objById(id); if (o) o.hidden = true } applySelection([]); commit(); refresh() }} compact />
                  <IconBtn icon={Trash2} label="Delete (Del)" onClick={deleteSelection} danger compact />
                </>
              )}
            </div>
          )}

          <div ref={wrapRef} className="absolute inset-x-0 top-0 bottom-12 touch-none">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full block"
              onPointerDown={onCanvasPointerDown}
              onPointerMove={onCanvasPointerMove}
              onPointerUp={onCanvasPointerUp}
              onPointerCancel={onCanvasPointerUp}
              onDoubleClick={onCanvasDoubleClick}
              onContextMenu={(e) => {
                e.preventDefault()
                const ptB = toBoard(e.clientX, e.clientY)
                const hit = topHit(ptB)
                if (hit && !selRef.current.includes(hit.id)) {
                  applySelection([hit.id])
                  rerender()
                }
                setCtxMenu({ x: e.clientX, y: e.clientY, hitId: hit?.id ?? null })
              }}
            />

            {editingObj && editingObj.kind === "text" && (
              <textarea
                autoFocus
                value={editValue}
                onChange={(e) => {
                  const v = e.target.value
                  setEditValue(v)
                  editingObj.text = v
                  if (v.trim()) syncTextSize(measure(), editingObj)
                  scheduleDraw()
                }}
                onBlur={commitEditing}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === "Escape") {
                    e.preventDefault()
                    commitEditing()
                  }
                }}
                onPointerDown={(e) => e.stopPropagation()}
                spellCheck={false}
                className="absolute z-20 bg-transparent outline-none rounded-sm overflow-hidden resize-none"
                style={{
                  left: editingObj.x * cam.z + cam.tx - (editingObj.w * cam.z) / 2,
                  top: editingObj.y * cam.z + cam.ty - (editingObj.h * cam.z) / 2,
                  width: Math.max(editingObj.w * cam.z, 48),
                  height: Math.max(editingObj.h * cam.z, 26),
                  transform: editingObj.rotation ? `rotate(${editingObj.rotation}deg)` : undefined,
                  fontFamily: FONTS[editingObj.fontKey ?? "inter"].css,
                  fontSize: (editingObj.fontSize ?? 48) * cam.z,
                  lineHeight: String(editingObj.lineHeight ?? 1.18),
                  letterSpacing: (editingObj.letterSpacing ?? 0) * cam.z,
                  fontWeight: editingObj.bold ? 700 : 400,
                  fontStyle: editingObj.italic ? "italic" : "normal",
                  textAlign: editingObj.align ?? "center",
                  color: editingObj.fxHollow ? "transparent" : editingObj.color,
                  WebkitTextStroke: editingObj.fxHollow ? `${Math.max(1, (editingObj.fontSize ?? 48) * 0.05) * cam.z}px ${editingObj.color}` : undefined,
                  background: editingObj.fxBg ?? "transparent",
                  textTransform: editingObj.uppercase ? "uppercase" : undefined,
                  textDecoration: editingObj.underline && !editingObj.fxHollow ? "underline" : undefined,
                  caretColor: "#d97706",
                  padding: 0,
                  outline: "1.5px dashed #f59e0b",
                  outlineOffset: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              />
            )}
          </div>

          {hint && (
            <div className="absolute bottom-14 left-3 z-20 pointer-events-none max-w-[60%]">
              <span className="inline-block px-2.5 py-1 rounded-full bg-black/60 text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                {hint}
              </span>
            </div>
          )}

          <footer className="absolute inset-x-0 bottom-0 h-12 border-t border-border bg-white/85 dark:bg-neutral-900/85 backdrop-blur flex items-center gap-2 px-2 z-30">
            <div className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0 py-1.5">
              {docRef.current.pages.map((p, i) => (
                <PageThumb key={p.id} page={p} active={i === docRef.current.activeIdx} onClick={() => setActivePage(i)} />
              ))}
              <div className="flex items-center gap-0.5 pl-1 shrink-0">
                <IconBtn icon={Plus} label="Add page" onClick={addPage} compact />
                <IconBtn icon={Copy} label="Duplicate page" onClick={duplicatePage} compact />
                <IconBtn icon={Trash2} label="Delete page" onClick={deletePage} danger compact disabled={docRef.current.pages.length <= 1} />
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <span className="hidden md:inline text-[9px] font-mono uppercase tracking-widest text-neutral-400 mr-1">
                {pg.objs.filter((o) => !o.hidden).length} objs
              </span>
              <IconBtn icon={ZoomOut} label="Zoom out (−)" onClick={() => zoomBy(1 / 1.15)} compact />
              <button
                type="button"
                onClick={() => {
                  const rect = wrapRef.current?.getBoundingClientRect()
                  if (rect) applyCam(1, (rect.width - pg.w) / 2, (rect.height - pg.h) / 2)
                }}
                className="w-12 text-center text-[10px] font-mono font-bold tabular-nums hover:text-amber-600 transition-colors cursor-pointer"
                title="Reset to 100%"
              >
                {Math.round(zoomUi * 100)}%
              </button>
              <IconBtn icon={ZoomIn} label="Zoom in (+)" onClick={() => zoomBy(1.15)} compact />
              <IconBtn icon={Maximize} label="Fit to screen (0)" onClick={fitView} compact />
            </div>
          </footer>

          {ctxMenu && (
            <div
              className="absolute z-[80] w-44 rounded-xl border border-border bg-white dark:bg-neutral-900 shadow-xl py-1"
              style={{
                left: Math.min(ctxMenu.x, window.innerWidth - 186),
                top: Math.min(ctxMenu.y, window.innerHeight - ctxItems.length * 33 - 20),
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {ctxItems.map((it) => (
                <button
                  key={it.label}
                  type="button"
                  onClick={() => { setCtxMenu(null); it.action() }}
                  className={`w-full text-left px-3 py-1.5 text-[11px] font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${it.danger ? "text-red-600 dark:text-red-400" : ""}`}
                >
                  {it.label}
                </button>
              ))}
            </div>
          )}

          <Toasts items={toasts} />
          <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
        </main>
      </div>
    </div>
  )
}
