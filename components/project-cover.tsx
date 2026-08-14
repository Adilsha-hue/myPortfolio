import {
  ShoppingCart,
  Home,
  Activity,
  Bot,
  FlaskConical,
  Network,
  Cpu,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  trolley: ShoppingCart,
  home: Home,
  sensor: Activity,
  robot: Bot,
  lab: FlaskConical,
  network: Network,
}

export function ProjectCover({
  icon,
  gradient,
  title,
  tags,
  badgeText,
  className,
}: {
  icon: string
  gradient?: string
  title: string
  tags: string[]
  badgeText?: string
  className?: string
}) {
  const Icon = iconMap[icon] ?? Cpu

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full bg-neutral-900 text-neutral-100 p-5 flex flex-col justify-between overflow-hidden border-b border-neutral-800 transition-colors",
        className,
      )}
    >
      {/* Subtle blueprint grid line */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
          {badgeText || "Hardware System"}
        </span>
        <div className="p-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-300">
          <Icon size={14} />
        </div>
      </div>

      {/* Center Title Accent */}
      <div className="relative z-10 my-auto py-2">
        <p className="font-mono text-xs text-neutral-500 mb-0.5">CASE STUDY</p>
        <p className="font-semibold text-sm sm:text-base text-neutral-100 leading-snug line-clamp-2">
          {title}
        </p>
      </div>

      {/* Bottom Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 pt-1">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800/90 text-neutral-300 border border-neutral-700/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}