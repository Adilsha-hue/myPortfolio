"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileImage } from "@/components/profile-image"
import { ProjectCover } from "@/components/project-cover"
import {
  MapPin,
  Cpu,
  CircuitBoard,
  Wifi,
  Megaphone,
  ArrowRight,
  GraduationCap,
  Award,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stats = [
  { value: "3+", label: "Years Experience", sub: "Robotics, IT & marketing" },
  { value: "4", label: "Tech Domains", sub: "Embedded, IoT, Networking, STEM" },
  { value: "2", label: "Certifications", sub: "CCNA & GEN Emissary" },
  { value: "4", label: "Languages", sub: "English, Hindi, Arabic, Malayalam" },
]

const credentials = ["B.Tech ECE", "CCNA Network Fundamentals", "Tinkering Lab Owner", "IEDC Leader"]

const featured = [
  {
    slug: "smart-autonomous-shopping-trolley",
    category: "Major Project",
    title: "Smart Autonomous Shopping Trolley",
    description: "Raspberry Pi + robotic arm + computer vision for object pickup.",
    gradient: "from-blue-600 to-sky-400",
    icon: "trolley",
  },
  {
    slug: "iot-automation-and-smart-home",
    category: "Internet of Things",
    title: "IoT Automation & Smart Home",
    description: "ESP32/ESP8266 automation, sensor monitoring and wireless control.",
    gradient: "from-emerald-500 to-teal-400",
    icon: "home",
  },
  {
    slug: "autonomous-robotics",
    category: "Robotics",
    title: "Autonomous Robotics",
    description: "Motor control, navigation systems and Raspberry Pi robots.",
    gradient: "from-amber-500 to-orange-400",
    icon: "robot",
  },
]

const terminalLines = [
  { prompt: true, cmd: "about me" },
  { prompt: false, out: "Electronics & Communication Engineer @ Kerala" },
  { prompt: true, cmd: "status" },
  { prompt: false, out: "Open to embedded, IoT & robotics projects" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-7">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <MapPin size={13} className="text-muted-foreground" />
                  Tirur, Kerala, India
                </Badge>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] font-bold leading-[1.05] tracking-tight">
                Mohammed{" "}
                <span className="text-primary">Adilsha&nbsp;Afsar&nbsp;M</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Electronics & Communication Engineer, Robotics Trainer and IoT
                Developer. I build smart embedded systems and inspire the next
                generation through STEM education.
              </p>

              <div className="flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <Badge key={c} variant="outline" className="gap-1">
                    <Award size={12} className="text-primary" />
                    {c}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <Link href="/projects">
                  <Button size="lg" className="group">
                    View My Work
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <ProfileImage />

              {/* Terminal-style identity card */}
              <div className="w-full max-w-sm rounded-xl border bg-card shadow-md overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/60 border-b">
                  <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-green-400" aria-hidden="true" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">adilsha@portfolio</span>
                </div>
                <div className="p-4 font-mono text-[13px] text-muted-foreground space-y-1.5">
                  {terminalLines.map((line, i) => (
                    <div key={i}>
                      {line.prompt ? (
                        <div>
                          <span className="text-green-600 dark:text-green-500">➜</span>{" "}
                          <span className="text-primary">~</span>{" "}
                          <span className="text-foreground">{line.cmd}</span>
                        </div>
                      ) : (
                        <p className="pl-6">{line.out}</p>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center pt-1">
                    <span className="text-green-600 dark:text-green-500">➜</span>{" "}
                    <span className="text-primary">~</span>
                    <span className="animate-pulse text-foreground ml-1">▌</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/50 border-y">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true, margin: "-40px" }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 font-semibold">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="mb-4">Services</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 tracking-tight">What I Offer</h2>
            <p className="text-muted-foreground text-lg">
              Engineering expertise combined with hands-on training and technical
              support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Robotics & STEM Training",
                description: "Hands-on robotics and STEM courses for students and educators",
              },
              {
                icon: <CircuitBoard className="w-6 h-6" />,
                title: "Embedded & IoT",
                description: "Raspberry Pi, Arduino, ESP32 and microcontroller projects",
              },
              {
                icon: <Wifi className="w-6 h-6" />,
                title: "Networking & IT",
                description: "LAN setup, troubleshooting, CCTV and infrastructure",
              },
              {
                icon: <Megaphone className="w-6 h-6" />,
                title: "Digital Marketing",
                description: "SEO, social media and engaging content for brands",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link
                  href="/services"
                  className="group block h-full rounded-lg border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more <ArrowUpRight size={15} />
                    </span>
                  </CardContent>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-muted/50 border-y">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="mb-4">Featured Projects</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              What I've Built
            </h2>
            <p className="text-muted-foreground text-lg">
              Selected case studies across embedded systems, robotics and IoT.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <ProjectCover
                      icon={project.icon}
                      gradient={project.gradient}
                      title={project.title}
                      tags={[project.category]}
                    />
                    <CardContent className="p-6 space-y-3">
                      <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        View case study <ArrowUpRight size={15} />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            {...fadeInUp}
            className="bg-foreground text-background rounded-3xl p-10 md:p-14 text-center shadow-2xl"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              Have a Project in Mind?
            </h2>
            <p className="text-lg mb-8 opacity-80 max-w-xl mx-auto">
              From embedded systems to robotics training — let's build something
              smart together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start a Conversation <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="secondary">
                  <GraduationCap size={18} />
                  About Me
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} /> B.Tech ECE Graduate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} /> CCNA Certified
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}