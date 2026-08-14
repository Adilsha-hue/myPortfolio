"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, ArrowUpRight, Menu, X, Download } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/projects", label: "Engineering" },
    { href: "/marketing", label: "Marketing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  // Update sliding indicator
  useEffect(() => {
    const activeIndex = navLinks.findIndex((l) => l.href === pathname)
    const el = linkRefs.current[activeIndex]
    const nav = navRef.current
    if (el && nav) {
      const navRect = nav.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setIndicatorStyle({ left: elRect.left - navRect.left, width: elRect.width })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "pt-3" : "pt-0"}`}>
      <div className={`mx-auto transition-all duration-500 ${scrolled ? "max-w-3xl px-3" : "max-w-6xl px-4 sm:px-6"}`}>
        <div
          className={`relative flex items-center justify-between h-14 transition-all duration-500 ${
            scrolled
              ? "bg-background/80 dark:bg-background/75 backdrop-blur-xl rounded-2xl border border-border/60 shadow-lg shadow-black/5 dark:shadow-black/20 px-4"
              : "bg-background/90 backdrop-blur-md border-b border-border px-0"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="shrink-0 group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground hover:opacity-75 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center text-[10px] font-black font-mono leading-none select-none group-hover:scale-95 transition-transform">
              MA
            </span>
            <span className="hidden sm:block">Mohammed Adilsha</span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden md:flex items-center gap-0.5 relative" aria-label="Main navigation">
            {/* Sliding pill indicator */}
            {mounted && indicatorStyle.width > 0 && (
              <motion.span
                className="absolute inset-y-1 rounded-full bg-foreground/10 dark:bg-foreground/15 pointer-events-none"
                animate={indicatorStyle}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linkRefs.current[i] = el }}
                  className={`relative z-10 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-foreground font-bold"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <a
              href="/Adilsha_CV.pdf"
              download="Mohammed_Adilsha_CV.pdf"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-200 hover:text-foreground border border-border/80 rounded-full transition-all duration-200 hover:border-foreground/40 hover:bg-foreground/5"
            >
              <Download size={12} strokeWidth={2.2} />
              <span>CV</span>
            </a>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="relative p-2 text-neutral-500 dark:text-neutral-400 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5 cursor-pointer"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && (
                  <motion.span
                    key={resolvedTheme}
                    initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {resolvedTheme === "dark" ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-500 dark:text-neutral-400 hover:text-foreground rounded-lg transition-colors hover:bg-foreground/5 cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`md:hidden mx-auto mt-2 ${scrolled ? "max-w-3xl px-3" : "max-w-6xl px-4 sm:px-6"}`}
          >
            <div className="bg-background/90 dark:bg-background/85 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
              <nav className="p-2 space-y-0.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-foreground text-background"
                          : "text-neutral-600 dark:text-neutral-300 hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-background/60" />}
                    </Link>
                  )
                })}
              </nav>
              <div className="border-t border-border/60 p-2">
                <a
                  href="/Adilsha_CV.pdf"
                  download="Mohammed_Adilsha_CV.pdf"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-foreground/5 hover:text-foreground transition-colors"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}