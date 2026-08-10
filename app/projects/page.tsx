"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { ProjectCover } from "@/components/project-cover"
import { projects, projectCategories } from "@/lib/projects"

export default function ProjectsPage() {
  const [active, setActive] = useState("All")

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <Badge className="mb-4">Portfolio</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 tracking-tight">My Projects</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Embedded systems, robotics, IoT, STEM education and IT infrastructure.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter projects">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <ProjectCover
                      icon={project.icon}
                      gradient={project.gradient}
                      title={project.title}
                      tags={project.tags}
                    />
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        View case study →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}