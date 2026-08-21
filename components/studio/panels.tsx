"use client"

import { useRef, useState } from "react"
import {
  Eraser,
  Eye,
  EyeOff,
  Highlighter,
  ImagePlus,
  Layers,
  Lock,
  LockOpen,
  Minus,
  MoveUp,
  MoveDown,
  PenTool,
  Plus,
  Sparkles,
  Trash2,
  Type,
  Upload,
  Copy,
  ArrowUpRight,
} from "lucide-react"
import {
  ARTBOARD_PRESETS,
  EMOJI_STACK,
  ObjKind,
  drawObj,
  makeObj,
} from "./engine"
import { EMOJI_SETS, GRADIENTS, PALETTES, TEMPLATES } from "./content"
import { CanvasPreview, Chip, ColorSwatchGrid, PanelSection, SliderRow, TemplateThumb } from "./ui"
import { EditorApi, SHAPE_TOOLS, TEXT_PRESETS, type BgTab, type TextPresetId } from "./types"

const SAMPLE_FILL = "#9ca3af"

function shapeSampleObj(kind: ObjKind) {
  const base = makeObj(kind as ObjKind, 0, 0, { fill: SAMPLE_FILL, color: SAMPLE_FILL })
  base.fillEnabled = kind !== "line" && kind !== "arrow"
  if (kind === "line") return { ...base, points: [{ x: -16, y: 12 }, { x: 16, y: -12 }] }
  if (kind === "arrow") return { ...base, points: [{ x: -16, y: 12 }, { x: 16, y: -12 }] }
  return base
}

function ShapeButton({ kind, onClick }: { kind: ObjKind; onClick: () => void }) {
  return (
    <CanvasPreview
      width={44}
      height={44}
      title={kind}
      onClick={onClick}
      className="rounded-lg border border-border bg-neutral-50 dark:bg-neutral-800/60 hover:border-amber-600 hover:shadow-sm transition-all cursor-pointer place-self-center w-[44px]"
      draw={(ctx, w, h) => {
        const o = shapeSampleObj(kind)
        const cx = w / 2
        const cy = h / 2
        o.x = cx
        o.y = cy
        if (kind === "line" || kind === "arrow") {
          o.points = [{ x: cx - 14, y: cy + 10 }, { x: cx + 14, y: cy - 10 }]
          o.w = 28
          o.h = 20
        } else {
          o.w = Math.min(w, h) * 0.62
          o.h = o.w
        }
        o.strokeWidth = 3
        drawObj(ctx, o)
      }}
    />
  )
}

export function TemplatesPanel({ api }: { api: EditorApi }) {
  return (
    <div className="space-y-4">
      <PanelSection title="Templates">
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((def) => (
            <TemplateThumb key={def.id} def={def} onPick={() => api.applyTemplate(def.id)} />
          ))}
        </div>
      </PanelSection>
      <p className="text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-500 font-mono uppercase tracking-wider">
        Applying a template replaces the current page. Undo works (Ctrl+Z).
      </p>
    </div>
  )
}

export function ElementsPanel({ api }: { api: EditorApi }) {
  const [stickerTab, setStickerTab] = useState(0)
  const shapes = SHAPE_TOOLS.filter((k) => k !== "line" && k !== "arrow")
  return (
    <div className="space-y-4">
      <PanelSection title="Lines & arrows">
        <div className="flex gap-1">
          <ShapeButton kind="line" onClick={() => api.addShape("line")} />
          <ShapeButton kind="arrow" onClick={() => api.addShape("arrow")} />
        </div>
      </PanelSection>
      <PanelSection title="Shapes">
        <div className="grid grid-cols-5 gap-1 justify-items-center">
          {shapes.map((k) => (
            <ShapeButton key={k} kind={k as ObjKind} onClick={() => api.addShape(k as ObjKind)} />
          ))}
        </div>
      </PanelSection>
      <PanelSection
        title="Stickers"
        right={
          <div className="flex gap-1 flex-wrap justify-end max-w-[130px]">
            {EMOJI_SETS.map((s, i) => (
              <Chip key={s.label} active={i === stickerTab} onClick={() => setStickerTab(i)}>
                {s.label.slice(0, 4)}
              </Chip>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-6 gap-1">
          {EMOJI_SETS[stickerTab].items.map((ch, i) => (
            <button
              key={`${ch}${i}`}
              type="button"
              onClick={() => api.addEmoji(ch)}
              className="h-9 rounded-md hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 text-xl leading-none transition-transform hover:scale-110 cursor-pointer"
              style={{ fontFamily: EMOJI_STACK }}
            >
              {ch}
            </button>
          ))}
        </div>
      </PanelSection>
    </div>
  )
}

export function TextPresetsPanel({ api }: { api: EditorApi }) {
  return (
    <div className="space-y-4">
      <PanelSection title="Text styles">
        <div className="space-y-1.5">
          {TEXT_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => api.addTextPreset(p.id)}
              className="w-full text-left px-3 py-3 rounded-lg border border-border bg-white dark:bg-neutral-900 hover:border-amber-600 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div
                className="truncate text-neutral-900 dark:text-neutral-100"
                style={{
                  fontFamily: `var(${p.fontKey === "inter" ? "--font-inter" : p.fontKey === "grotesk" ? "--font-display" : ""}), inherit`,
                  fontWeight: p.bold ? 700 : 400,
                  fontStyle: p.italic ? "italic" : "normal",
                  fontSize: Math.max(13, Math.round(p.fontSize * 0.22)),
                  letterSpacing: p.letterSpacing ? p.letterSpacing * 0.25 : undefined,
                  textTransform: p.uppercase ? "uppercase" : undefined,
                }}
              >
                {p.sample}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">{p.label}</span>
                <Type size={11} className="text-neutral-400 group-hover:text-amber-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </PanelSection>
      <p className="text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-500 font-mono uppercase tracking-wider">
        Double-click any text on canvas to edit it.
      </p>
    </div>
  )
}

export function UploadsPanel({ api }: { api: EditorApi }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) api.handleFiles(Array.from(e.target.files))
          e.target.value = ""
        }}
      />
      <button
        type="button"
        onClick={() => api.requestUploads()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (e.dataTransfer.files?.length) api.handleFiles(Array.from(e.dataTransfer.files))
        }}
        className={`w-full py-6 rounded-xl border-2 border-dashed flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
          dragOver ? "border-amber-600 bg-amber-600/10" : "border-border hover:border-amber-600/60"
        }`}
      >
        <ImagePlus size={20} className="text-amber-600" />
        <span className="text-[11px] font-bold uppercase tracking-wider">Upload images</span>
        <span className="text-[10px] font-mono text-neutral-500">click or drop files</span>
      </button>
      {api.uploads.length > 0 && (
        <PanelSection
          title={`Uploads · ${api.uploads.length}`}
          right={
            <Chip onClick={() => api.requestUploads()}>
              <span className="inline-flex items-center gap-1"><Plus size={10} /> Add</span>
            </Chip>
          }
        >
          <div className="grid grid-cols-2 gap-2">
            {api.uploads.map((u) => (
              <div key={u.id} className="relative group rounded-lg overflow-hidden border border-border bg-white dark:bg-neutral-900">
                <button type="button" onClick={() => api.insertUpload(u)} className="block w-full cursor-pointer" title={`Insert ${u.name}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.src} alt={u.name} className="w-full h-20 object-cover" draggable={false} />
                </button>
                <button
                  type="button"
                  aria-label="Remove upload"
                  onClick={() => api.removeUpload(u.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </PanelSection>
      )}
    </div>
  )
}

export function DrawPanel({ api }: { api: EditorApi }) {
  const tools: { id: EditorApi["tool"]; label: string; icon: typeof PenTool }[] = [
    { id: "pen", label: "Pen", icon: PenTool },
    { id: "marker", label: "Marker", icon: ArrowUpRight },
    { id: "highlighter", label: "Highlight", icon: Highlighter },
    { id: "eraser", label: "Eraser", icon: Eraser },
  ]
  return (
    <div className="space-y-4">
      <PanelSection title="Brushes">
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => api.setTool(t.id)}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                api.tool === t.id
                  ? "border-amber-600 bg-amber-600/10 text-amber-700 dark:text-amber-400"
                  : "border-border hover:border-amber-600/50 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </PanelSection>
      <PanelSection title="Brush color">
        <ColorSwatchGrid value={api.brushColor} onChange={api.setBrushColor} />
      </PanelSection>
      <PanelSection title="Brush size">
        <SliderRow label="Size" min={2} max={48} value={api.brushWidth} suffix="px" onChange={api.setBrushWidth} />
      </PanelSection>
      <PanelSection title="Options">
        <Chip active={api.snapShape} onClick={() => api.setSnapShape(!api.snapShape)}>
          Shape snap {api.snapShape ? "ON" : "OFF"}
        </Chip>
        <p className="text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-500 font-mono uppercase tracking-wider pt-1">
          Draw a rough circle / rect / line / triangle — it snaps to a perfect shape.
          Select a stroke afterwards to run Scribble → Text OCR.
        </p>
      </PanelSection>
    </div>
  )
}

export function BackgroundPanel({ api }: { api: EditorApi }) {
  const [tab, setTab] = useState<BgTab>("solid")
  const [allPages, setAllPages] = useState(false)
  const bg = api.page.bg
  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        <Chip active={tab === "solid"} onClick={() => setTab("solid")}>Solid</Chip>
        <Chip active={tab === "gradient"} onClick={() => setTab("gradient")}>Gradient</Chip>
        <Chip active={tab === "pattern"} onClick={() => setTab("pattern")}>Pattern</Chip>
      </div>

      {tab === "solid" && (
        <PanelSection title="Solid background">
          <ColorSwatchGrid value={bg.c1} onChange={(c) => api.setBg({ type: "solid", c1: c }, allPages)} />
        </PanelSection>
      )}

      {tab === "gradient" && (
        <>
          <PanelSection title="Gradient presets">
            <div className="grid grid-cols-4 gap-1.5">
              {GRADIENTS.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api.setBg({ type: "gradient", c1: g.c1, c2: g.c2, angle: g.angle }, allPages)}
                  className={`h-9 rounded-lg border transition-transform hover:scale-105 cursor-pointer ${bg.type === "gradient" && bg.c1 === g.c1 ? "ring-2 ring-amber-600 border-transparent" : "border-black/10 dark:border-white/15"}`}
                  style={{ background: `linear-gradient(${g.angle}deg, ${g.c1}, ${g.c2})` }}
                  aria-label={`Gradient ${i + 1}`}
                />
              ))}
            </div>
          </PanelSection>
          <PanelSection title="Custom gradient">
            <div className="flex items-center gap-2">
              <input type="color" value={bg.c1} onChange={(e) => api.setBg({ type: "gradient", c1: e.target.value }, allPages)} className="w-8 h-8 rounded cursor-pointer bg-transparent" aria-label="Gradient start" />
              <span className="text-neutral-400">→</span>
              <input type="color" value={bg.c2} onChange={(e) => api.setBg({ type: "gradient", c2: e.target.value }, allPages)} className="w-8 h-8 rounded cursor-pointer bg-transparent" aria-label="Gradient end" />
              <div
                className="flex-1 h-8 rounded-lg border border-black/10 dark:border-white/15"
                style={{ background: `linear-gradient(${bg.angle}deg, ${bg.c1}, ${bg.c2})` }}
              />
            </div>
            <SliderRow label="Angle" min={0} max={360} value={bg.angle} suffix="°" onChange={(v) => api.setBg({ type: "gradient", angle: v }, allPages)} />
          </PanelSection>
        </>
      )}

      {tab === "pattern" && (
        <PanelSection title="Pattern">
          <div className="flex gap-1 mb-2">
            <Chip active={bg.type === "grid"} onClick={() => api.setBg({ type: "grid" }, allPages)}>Grid</Chip>
            <Chip active={bg.type === "dots"} onClick={() => api.setBg({ type: "dots" }, allPages)}>Dots</Chip>
            <Chip active={bg.type === "lines"} onClick={() => api.setBg({ type: "lines" }, allPages)}>Stripes</Chip>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Base</div>
              <input type="color" value={bg.c1} onChange={(e) => api.setBg({ type: bg.type === "solid" || bg.type === "gradient" ? "dots" : bg.type, c1: e.target.value }, allPages)} className="w-full h-8 rounded cursor-pointer bg-transparent" aria-label="Base color" />
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Accent</div>
              <input type="color" value={bg.c2} onChange={(e) => api.setBg({ type: bg.type === "solid" || bg.type === "gradient" ? "dots" : bg.type, c2: e.target.value }, allPages)} className="w-full h-8 rounded cursor-pointer bg-transparent" aria-label="Accent color" />
            </div>
          </div>
        </PanelSection>
      )}

      <Chip active={allPages} onClick={() => setAllPages(!allPages)}>
        Apply to all pages {allPages ? "ON" : "OFF"}
      </Chip>
    </div>
  )
}

export function MagicPanel({ api, busy }: { api: EditorApi; busy?: boolean }) {
  const [prompt, setPrompt] = useState("")
  const gen = () => {
    api.generateMagic(prompt || "bold poster for a creative studio")
    setPrompt("")
  }
  return (
    <div className="space-y-4">
      <PanelSection title="Magic Design ✦">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              gen()
            }
          }}
          rows={3}
          placeholder='Describe your design… e.g. "neon launch poster for a robotics club"'
          className="w-full resize-none rounded-lg border border-border bg-white dark:bg-neutral-900 p-2.5 text-xs outline-none focus:border-amber-600 placeholder:text-neutral-400"
        />
        <button
          type="button"
          onClick={gen}
          disabled={busy}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
        >
          <Sparkles size={13} className={busy ? "animate-pulse" : ""} />
          {busy ? "Generating…" : "Generate design"}
        </button>
      </PanelSection>

      <PanelSection title="Recolor design">
        <div className="grid grid-cols-4 gap-1.5">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              title={p.name}
              onClick={() => api.recolorPage(p.id)}
              className="h-9 rounded-lg border border-black/10 dark:border-white/15 flex items-end justify-end p-1 transition-transform hover:scale-105 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[2]})` }}
            >
              <span className="text-[8px] font-mono font-bold uppercase tracking-wide text-white drop-shadow">{p.name}</span>
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Magic Resize">
        <div className="space-y-1">
          {ARTBOARD_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => api.magicResize(p.id)}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg border border-border hover:border-amber-600 hover:bg-amber-600/5 transition-all cursor-pointer group"
            >
              <span className="text-[11px] font-semibold">{p.label}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-amber-600">{p.sub}</span>
            </button>
          ))}
        </div>
      </PanelSection>

      <p className="text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-500 font-mono uppercase tracking-wider">
        Magic Design builds a full layout locally — same prompt, same result.
      </p>
    </div>
  )
}

export function LayersPanel({ api }: { api: EditorApi }) {
  const objs = [...api.page.objs].reverse()
  const nameOf = (o: (typeof objs)[number]) => {
    if (o.kind === "text") return (o.text ?? "Text").slice(0, 22) || "Text"
    if (o.kind === "emoji") return `${o.text ?? "✦"} Sticker`
    if (o.kind === "image") return o.name ?? "Image"
    if (o.kind === "pen") return "Stroke"
    return o.name ?? o.kind.toUpperCase()
  }
  const iconFor = (o: (typeof objs)[number]) => {
    switch (o.kind) {
      case "text": return Type
      case "emoji": return Sparkles
      case "image": return Upload
      case "pen": return PenTool
      default: return Minus
    }
  }
  if (!objs.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
        <Layers size={22} className="text-neutral-400" />
        <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">No layers yet.<br />Add elements from the left.</p>
      </div>
    )
  }
  return (
    <div className="space-y-1">
      {objs.map((o) => {
        const Icon = iconFor(o)
        const selected = api.selectedIds.includes(o.id)
        return (
          <div
            key={o.id}
            className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all ${
              selected ? "border-amber-600 bg-amber-600/10" : "border-transparent hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
            }`}
          >
            <button
              type="button"
              onClick={(e) => api.selectObjs([o.id], e.shiftKey)}
              className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
            >
              <Icon size={13} className={selected ? "text-amber-600 shrink-0" : "text-neutral-400 shrink-0"} />
              <span className={`text-[11px] truncate ${o.hidden ? "line-through opacity-40" : ""}`}>{nameOf(o)}</span>
            </button>
            <button type="button" title="Move up" onClick={() => api.layerOpOn("forward", o.id)} className="opacity-0 group-hover:opacity-100 hover:text-amber-600 cursor-pointer text-neutral-500"><MoveUp size={12} /></button>
            <button type="button" title="Move down" onClick={() => api.layerOpOn("backward", o.id)} className="opacity-0 group-hover:opacity-100 hover:text-amber-600 cursor-pointer text-neutral-500"><MoveDown size={12} /></button>
            <button type="button" title="Duplicate" onClick={() => api.duplicateObj(o.id)} className="opacity-0 group-hover:opacity-100 hover:text-amber-600 cursor-pointer text-neutral-500"><Copy size={12} /></button>
            <button type="button" title={o.hidden ? "Show" : "Hide"} onClick={() => api.toggleFlag("hidden", o.id)} className={`cursor-pointer ${o.hidden ? "text-amber-600" : "text-neutral-500 opacity-0 group-hover:opacity-100 hover:text-amber-600"}`}>
              {o.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
            <button type="button" title={o.locked ? "Unlock" : "Lock"} onClick={() => api.toggleFlag("locked", o.id)} className={`cursor-pointer ${o.locked ? "text-amber-600" : "text-neutral-500 opacity-0 group-hover:opacity-100 hover:text-amber-600"}`}>
              {o.locked ? <Lock size={12} /> : <LockOpen size={12} />}
            </button>
            <button type="button" title="Delete" onClick={() => api.deleteObj(o.id)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer text-neutral-500"><Trash2 size={12} /></button>
          </div>
        )
      })}
      <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 pt-2 pl-1">Top of list = front layer</p>
    </div>
  )
}
