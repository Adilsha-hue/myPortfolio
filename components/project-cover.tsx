import { ShoppingCart, Home, Activity, Bot, FlaskConical, Network, CircuitBoard, type LucideIcon } from "lucide-react"
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
  className,
}: {
  icon: string
  gradient: string
  title: string
  tags: string[]
  className?: string
}) {
  const Icon = iconMap[icon] ?? CircuitBoard

  return (
    <div
      className={cn(
        "relative aspect-[16/10] bg-gradient-to-br overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
        gradient,
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Icon className="w-14 h-14 text-white relative drop-shadow-lg" strokeWidth={1.5} />
      <div
        className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-2 relative"
        aria-hidden="true"
      >
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/25 text-white/90 backdrop-blur-sm whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}