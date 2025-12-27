"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? "auto" : "hidden"
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 lg:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={closeMenu}>
              <span className="text-primary">Portfolio</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="container grid gap-6 text-lg font-medium">
            <Link href="#about" className="py-4 border-b border-zinc-200 dark:border-zinc-800" onClick={closeMenu}>
              About
            </Link>
            <Link href="#skills" className="py-4 border-b border-zinc-200 dark:border-zinc-800" onClick={closeMenu}>
              Skills
            </Link>
            <Link href="#projects" className="py-4 border-b border-zinc-200 dark:border-zinc-800" onClick={closeMenu}>
              Projects
            </Link>
            <Link href="#contact" className="py-4 border-b border-zinc-200 dark:border-zinc-800" onClick={closeMenu}>
              Contact
            </Link>
            <Button className="mt-6" onClick={closeMenu}>
              Download CV
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}

