import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Target, Trophy } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectCover } from "@/components/project-cover"
import { projects, getProject } from "@/lib/projects"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} | Mohammed Adilsha Afsar M`,
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
    <div className="min-h-screen relative">
      <Navbar />

      <article className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> All projects
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge>{project.category}</Badge>
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{project.summary}</p>
          </header>

          {/* Cover */}
          <div className="mb-10 overflow-hidden rounded-2xl border shadow-sm">
            <ProjectCover
              icon={project.icon}
              gradient={project.gradient}
              title={project.title}
              tags={project.tags}
              className="aspect-[16/7]"
            />
          </div>

          {/* Objective */}
          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-4 tracking-tight">
              <Target size={22} className="text-primary" /> Objective
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.objective}</p>
          </section>

          {/* Stack */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Tech Stack</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.stack.map((group) => (
                <Card key={group.group}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">{group.group}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Responsibilities */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">What I Did</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Outcome */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-4 tracking-tight">
              <Trophy size={22} className="text-primary" /> Outcome
            </h2>
            <div className="bg-muted/60 border rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
            </div>
          </section>

          {/* Next project */}
          <aside className="border-t pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Next project</p>
              <Link
                href={`/projects/${next.slug}`}
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                {next.title}
              </Link>
            </div>
            <Link href={`/projects/${next.slug}`}>
              <Button variant="outline">
                View <ArrowRight size={16} />
              </Button>
            </Link>
          </aside>

          <div className="mt-12 bg-foreground text-background rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Want something like this built?</h2>
            <p className="mt-2 mb-6 opacity-80">Let's turn your idea into a working embedded or robotics system.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start a Conversation <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}