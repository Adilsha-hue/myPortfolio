"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Page, renderPage, uid } from "./engine"
import { SWATCHES } from "./content"
import { templatePage, type TemplateDef } from "./content"

export function PanelSection({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">{title}</div>
        {right}
      </div>
      {children}
    </div>
  )
}

export function IconBtn({
  icon: Icon,
  label,
  onClick,
  active,
  danger,
  disabled,
  compact,
}: {
  icon: LucideIcon
  label: string
  onClick?: (e: React.MouseEvent) => void
  active?: boolean
  danger?: boolean
  disabled?: boolean
  compact?: boolean
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        compact ? "w-7 h-7" : "w-8 h-8"
      } ${
        active
          ? "bg-amber-600 text-white shadow-sm"
          : danger
            ? "text-red-600 dark:text-red-400 hover:bg-red-500/10"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 hover:text-foreground"
      }`}
    >
      <Icon size={compact ? 13 : 15} />
    </button>
  )
}

export function Chip({
  children,
  onClick,
  active,
  title,
}: {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
        active ? "bg-amber-600 text-white shadow-sm" : "bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/80 dark:hover:bg-neutral-700"
      }`}
    >
      {children}
    </button>
  )
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
  onCommit,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (v: number) => void
  onCommit?: () => void
}) {
  return (
    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
      <span className="w-14 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={onCommit}
        onKeyUp={onCommit}
        className="flex-1 h-1 accent-amber-600 cursor-pointer"
      />
      <span className="w-9 text-right tabular-nums text-neutral-500 dark:text-neutral-500">
        {Math.round(value)}
        {suffix}
      </span>
    </label>
  )
}

export function Popover({ trigger, children, align = "left", width = 232 }: { trigger: (open: boolean) => React.ReactNode; children: React.ReactNode | ((close: () => void) => React.ReactNode); align?: "left" | "right"; width?: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey, true)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey, true)
    }
  }, [open])
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div
          className={`absolute top-full mt-2 z-[70] rounded-xl border border-border bg-white dark:bg-neutral-900 shadow-xl p-2.5 space-y-2 ${align === "right" ? "right-0" : "left-0"}`}
          style={{ width }}
          onClick={(e) => e.stopPropagation()}
        >
          {typeof children === "function" ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  )
}

export function ColorSwatchGrid({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-10 gap-1">
        {SWATCHES.map((sw) => (
          <button
            key={sw}
            type="button"
            onClick={() => onChange(sw)}
            aria-label={sw}
            className={`h-5 rounded border transition-transform cursor-pointer ${value.toLowerCase() === sw.toLowerCase() ? "ring-2 ring-amber-600 ring-offset-1 dark:ring-offset-neutral-900 scale-110" : "border-black/15 dark:border-white/20"}`}
            style={{ background: sw }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer bg-transparent"
          aria-label="Custom color"
        />
        <input
          value={value}
          onChange={(e) => {
            const v = e.target.value.trim()
            if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v)
          }}
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent border border-border rounded-md px-2 py-1 text-[11px] font-mono uppercase outline-none focus:border-amber-600"
        />
      </div>
    </div>
  )
}

export function ColorButton({ color, label, onChange }: { color: string; label: string; onChange: (c: string) => void }) {
  return (
    <Popover
      width={236}
      trigger={() => (
        <button
          type="button"
          title={label}
          className="h-8 px-1.5 rounded-md flex items-center gap-1.5 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 transition-colors cursor-pointer"
        >
          <span className="w-4.5 h-4.5 w-[18px] h-[18px] rounded border border-black/20 dark:border-white/25" style={{ background: color }} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 hidden xl:inline">{label}</span>
        </button>
      )}
    >
      {(close) => (
        <ColorSwatchGrid
          value={color}
          onChange={(c) => {
            onChange(c)
          }}
        />
      )}
    </Popover>
  )
}

export function CanvasPreview({
  width,
  height,
  draw,
  className,
  onClick,
  title,
}: {
  width: number
  height: number
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
  className?: string
  onClick?: () => void
  title?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef(draw)
  drawRef.current = draw
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width = width * dpr
    cv.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)
    drawRef.current(ctx, width, height)
  }, [width, height])
  const Comp = onClick ? "button" : "div"
  return (
    <Comp type={onClick ? "button" : undefined} onClick={onClick} title={title} className={`block overflow-hidden ${className ?? ""}`}>
      <canvas ref={ref} style={{ width, height }} className="block pointer-events-none" />
    </Comp>
  )
}

export function TemplateThumb({ def, onPick }: { def: TemplateDef; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="group text-left rounded-lg overflow-hidden border border-border bg-white dark:bg-neutral-900 hover:border-amber-600 hover:shadow-md transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
    >
      <CanvasPreview
        width={168}
        height={Math.max(96, Math.round((168 * def.h) / def.w))}
        draw={(ctx, w, h) => {
          const page = templatePage(def)
          void page
          const p = templatePage(def)
          const s = Math.min(w / p.w, h / p.h)
          ctx.save()
          ctx.translate((w - p.w * s) / 2, (h - p.h * s) / 2)
          ctx.scale(s, s)
          renderPage(ctx, p, { scale: 1 })
          ctx.restore()
        }}
      />
      <div className="px-2 py-1.5 border-t border-border">
        <div className="text-[10px] font-bold uppercase tracking-wider truncate">{def.name}</div>
        <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">{def.tag} · {def.w}×{def.h}</div>
      </div>
    </button>
  )
}

export function PageThumb({ page, active, onClick }: { page: Page; active: boolean; onClick: () => void }) {
  const tw = 64
  const th = Math.round((tw * page.h) / page.w)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${active ? "border-amber-500 shadow-md" : "border-transparent opacity-75 hover:opacity-100"}`}
      title={page.name}
    >
      <CanvasPreview
        width={tw}
        height={th}
        draw={(ctx, w, h) => {
          const s = Math.min(w / page.w, h / page.h)
          ctx.save()
          ctx.translate((w - page.w * s) / 2, (h - page.h * s) / 2)
          ctx.scale(s, s)
          renderPage(ctx, page, {})
          ctx.restore()
        }}
      />
    </button>
  )
}

export type ToastItem = { id: string; msg: string }

export function Toasts({ items }: { items: ToastItem[] }) {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-1.5 pointer-events-none">
      {items.map((t) => (
        <div key={t.id} className="px-3 py-1.5 rounded-full bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
          {t.msg}
        </div>
      ))}
    </div>
  )
}

const SHORTCUTS: [string, string][] = [
  ["V / T / P / E", "Select · Text · Pen · Eraser"],
  ["R / O / L / A", "Rect · Ellipse · Line · Arrow"],
  ["Space + Drag", "Pan canvas"],
  ["Scroll / Ctrl+Scroll", "Pan · Zoom"],
  ["Double-click", "Edit text"],
  ["Ctrl+Z / Ctrl+Y", "Undo · Redo"],
  ["Ctrl+C / V / D", "Copy · Paste · Duplicate"],
  ["Ctrl+A", "Select all"],
  ["Delete", "Remove selection"],
  ["Arrows (+Shift)", "Nudge 1px (10px)"],
  ["Ctrl+] / [", "Layer forward / backward"],
  ["Ctrl+Shift+] / [", "Bring to front / back"],
  ["Shift (drag)", "Lock aspect · snap 15°"],
  ["+ / − / 0 / 1", "Zoom in / out / fit / 100%"],
  ["Ctrl+S", "Export PNG"],
  ["Esc", "Deselect · Close"],
]

export function ShortcutsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-md w-full rounded-xl border border-border bg-white dark:bg-neutral-900 shadow-2xl p-5" onClick={(e) => e.stopPropagation()}>
        <div className="text-xs font-bold uppercase tracking-[0.14em] mb-3">Keyboard Shortcuts</div>
        <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
          {SHORTCUTS.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="font-mono font-bold text-amber-600 shrink-0">{k}</span>
              <span className="text-neutral-600 dark:text-neutral-400 text-right">{v}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose} className="mt-4 w-full py-2 rounded-lg bg-foreground text-background text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-90 transition-opacity">
          Close
        </button>
      </div>
    </div>
  )
}

export const newToastId = uid
