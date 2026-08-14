import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 text-xs text-neutral-600 dark:text-neutral-400 bg-background transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-baseline justify-between gap-4">
        <div>
          <p className="text-foreground font-semibold text-sm">
            Mohammed Adilsha Afsar M
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
            Tirur, Malappuram, Kerala, India &bull; {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-medium">
          <a
            href="https://www.linkedin.com/in/mohd-adilsha"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>
          <a
            href="https://wa.me/919946686844"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            <span>WhatsApp</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>
          <a
            href="/Adilsha_CV.pdf"
            download="Mohammed_Adilsha_CV.pdf"
            className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>
        </div>
      </div>
    </footer>
  )
}