import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectCover } from "@/components/project-cover"
import { projects, getProject } from "@/lib/projects"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Mohammed Adilsha`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-12">
        {/* Navigation back */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Title & Metadata */}
        <header className="space-y-4 border-b border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
            <span>{project.category}</span>
            <span>&bull;</span>
            <span>{project.badgeText || "Embedded System"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Technical Cover */}
        <div className="rounded-xl overflow-hidden border border-border shadow-md">
          <ProjectCover
            icon={project.icon}
            title={project.title}
            tags={project.tags}
            badgeText={project.badgeText}
            className="aspect-[16/9] sm:aspect-[16/8] min-h-[180px]"
          />
        </div>

        {/* Technical Specifications & Objective */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
            Objective
          </h2>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
            {project.objective}
          </p>
        </section>

        {/* Problem Statement & Architecture */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
          <div className="space-y-2 p-5 rounded-xl border border-border bg-card shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              The Engineering Problem
            </h3>
            <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-xl border border-border bg-card shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
              System Architecture
            </h3>
            <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              {project.solutionArchitecture}
            </p>
          </div>
        </section>

        {/* Hardware & Software Components */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
            Hardware & Software Components
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.stack.map((group) => (
              <div
                key={group.group}
                className="p-4 rounded-xl border border-border bg-card space-y-2 shadow-sm"
              >
                <h3 className="text-xs font-mono font-bold text-foreground">
                  {group.group}
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-mono">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Responsibilities */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
            Implementation Responsibilities
          </h2>

          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
            {project.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-neutral-500 font-mono font-bold shrink-0 select-none">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcome */}
        <section className="space-y-3 p-5 rounded-xl border border-border bg-card shadow-sm">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
            Outcome & Documentation
          </h2>
          <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
            {project.outcome}
          </p>
        </section>

        {/* Next Project & Inquiry */}
        <footer className="pt-8 border-t border-border space-y-6">
          <div className="flex items-baseline justify-between text-xs font-medium">
            <span className="text-neutral-600 dark:text-neutral-400">Next Case Study:</span>
            <Link
              href={`/projects/${next.slug}`}
              className="font-bold text-foreground hover:underline inline-flex items-center gap-1"
            >
              <span>{next.title}</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="text-sm font-bold text-foreground">
                Interested in building hardware prototypes or STEM training?
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Reach out to discuss technical feasibility, components, and timelines.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-foreground text-background text-xs font-bold shrink-0 hover:opacity-90 transition-opacity"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </footer>
      </main>

      <Footer />
    </div>
  )
}