"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectCover } from "@/components/project-cover"
import { projects, projectCategories } from "@/lib/projects"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20 space-y-12">
        {/* Header */}
        <section className="space-y-4 pt-4 border-b border-border pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-foreground font-semibold transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Engineering & Robotics Projects
          </h1>

          <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-2xl">
            Selected case studies across autonomous robotics, computer vision, microcontroller firmware (ESP32/Raspberry Pi), sensor telemetry, and STEM lab education.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pt-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-foreground text-background shadow-sm"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-foreground bg-neutral-100 dark:bg-neutral-900 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Project Grid */}
        <section className="grid sm:grid-cols-2 gap-5">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block rounded-xl border border-border hover:border-foreground/50 bg-card overflow-hidden transition-all duration-300 shadow-sm"
            >
              <ProjectCover
                icon={project.icon}
                title={project.title}
                tags={project.tags}
                badgeText={project.badgeText}
              />
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-mono font-semibold">
                  <span>{project.category}</span>
                  <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-foreground transition-colors flex items-center gap-0.5">
                    Read technical breakdown &rarr;
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:underline leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}