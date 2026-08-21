import type { Bg, FontKey, Obj, ObjKind, Page } from "./engine"

export type Tool =
  | "select"
  | "text"
  | "pen"
  | "marker"
  | "highlighter"
  | "eraser"
  | Extract<ObjKind, "line" | "arrow" | "rect" | "rrect" | "circle" | "ellipse" | "triangle" | "diamond" | "pentagon" | "hexagon" | "star" | "burst" | "heart">

export const SHAPE_TOOLS: Tool[] = ["line", "arrow", "rect", "rrect", "circle", "ellipse", "triangle", "diamond", "pentagon", "hexagon", "star", "burst", "heart"]

export const isShapeTool = (t: Tool) => (SHAPE_TOOLS as string[]).includes(t)

export type Upload = { id: string; src: string; name: string }

export type Project = {
  version: number
  pages: Page[]
  activeIdx: number
  uploads: Upload[]
}

export type LayerOp = "front" | "forward" | "backward" | "back"

export type TextPresetId = "display" | "heading" | "subheading" | "body" | "caption" | "quote"

export const TEXT_PRESETS: {
  id: TextPresetId
  label: string
  sample: string
  fontSize: number
  fontKey: FontKey
  bold?: boolean
  italic?: boolean
  letterSpacing?: number
  lineHeight?: number
  uppercase?: boolean
}[] = [
  { id: "display", label: "Display", sample: "BIG IDEAS", fontSize: 112, fontKey: "grotesk", bold: true, uppercase: true, lineHeight: 1.0 },
  { id: "heading", label: "Heading", sample: "Heading that pops", fontSize: 64, fontKey: "grotesk", bold: true },
  { id: "subheading", label: "Subheading", sample: "Supporting line of copy", fontSize: 38, fontKey: "inter", bold: true },
  { id: "body", label: "Body", sample: "The quick brown fox jumps over the lazy dog and keeps going.", fontSize: 24, fontKey: "inter", lineHeight: 1.45 },
  { id: "caption", label: "Caption", sample: "SECTION LABEL · 01", fontSize: 16, fontKey: "mono", letterSpacing: 6, uppercase: true },
  { id: "quote", label: "Quote", sample: "\u201CDesign is thinking made visual.\u201D", fontSize: 54, fontKey: "serif", italic: true, lineHeight: 1.28 },
]

export type FxPreset = { id: string; label: string; f: Partial<Obj["filters"]> }

export const FX_PRESETS: FxPreset[] = [
  { id: "original", label: "Original", f: {} },
  { id: "mono", label: "Mono", f: { grayscale: 100 } },
  { id: "noir", label: "Noir", f: { grayscale: 100, contrast: 130, brightness: 92 } },
  { id: "warm", label: "Warm", f: { sepia: 35, saturate: 125 } },
  { id: "cool", label: "Cool", f: { hueRotate: 200, saturate: 110 } },
  { id: "punch", label: "Punch", f: { contrast: 125, saturate: 150 } },
  { id: "fade", label: "Fade", f: { saturate: 60, brightness: 110, contrast: 88 } },
  { id: "dream", label: "Dream", f: { blur: 2, brightness: 112 } },
]

export type BgTab = "solid" | "gradient" | "pattern"

export type EditorApi = {
  page: Page
  selectedIds: string[]
  tool: Tool
  setTool: (t: Tool) => void
  brushColor: string
  brushWidth: number
  snapShape: boolean
  setBrushColor: (c: string) => void
  setBrushWidth: (n: number) => void
  setSnapShape: (b: boolean) => void
  uploads: Upload[]
  requestUploads: () => void
  removeUpload: (id: string) => void
  insertUpload: (u: Upload) => void
  handleFiles: (files: File[]) => void
  applyTemplate: (defId: string) => void
  generateMagic: (prompt: string) => void
  recolorPage: (paletteId: string) => void
  magicResize: (presetId: string) => void
  setBg: (patch: Partial<Bg>, allPages: boolean) => void
  addShape: (kind: ObjKind) => void
  addEmoji: (ch: string) => void
  addTextPreset: (id: TextPresetId) => void
  selectObjs: (ids: string[], additive: boolean) => void
  layerOpOn: (op: LayerOp, id: string) => void
  toggleFlag: (flag: "hidden" | "locked", id: string) => void
  duplicateObj: (id: string) => void
  deleteObj: (id: string) => void
}
