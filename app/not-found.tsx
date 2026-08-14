import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-32 text-center space-y-4 my-auto">
        <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">404 — Page Not Found</p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          This page does not exist.
        </h1>
        <p className="text-xs text-neutral-500">
          The link you followed may be broken or the page may have been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={13} />
            <span>Return to overview</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
