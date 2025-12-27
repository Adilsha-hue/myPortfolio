"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function ProjectsPage() {
  const projects = [
    {
      title: "STEM Robotics Curriculum",
      category: "Education",
      tags: ["Robotics", "Education", "Arduino"],
      description: "Comprehensive robotics curriculum for middle and high school students",
      image: "/placeholder.svg?height=300&width=400&text=Robotics+Curriculum",
    },
    {
      title: "Brand Identity Design",
      category: "Design",
      tags: ["Branding", "Logo", "Visual Identity"],
      description: "Complete brand identity package for a tech startup",
      image: "/placeholder.svg?height=300&width=400&text=Brand+Identity",
    },
    {
      title: "Arduino Workshop Series",
      category: "Training",
      tags: ["Workshop", "Arduino", "Programming"],
      description: "5-week intensive Arduino programming workshop for beginners",
      image: "/placeholder.svg?height=300&width=400&text=Arduino+Workshop",
    },
    {
      title: "Educational Posters",
      category: "Design",
      tags: ["Education", "Print", "Graphics"],
      description: "Series of educational posters for STEM lab environment",
      image: "/placeholder.svg?height=300&width=400&text=Educational+Posters",
    },
    {
      title: "Robot Competition Prep",
      category: "Training",
      tags: ["Competition", "Robotics", "Mentoring"],
      description: "Training program for regional robotics competition teams",
      image: "/placeholder.svg?height=300&width=400&text=Competition+Prep",
    },
    {
      title: "Marketing Campaign",
      category: "Design",
      tags: ["Marketing", "Social Media", "Design"],
      description: "Complete marketing campaign design for educational institution",
      image: "/placeholder.svg?height=300&width=400&text=Marketing+Campaign",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600">Portfolio</Badge>
            <h1 className="text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A showcase of my work in robotics training, graphic design, and STEM education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                  <div className="relative h-56 bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge className="bg-white text-blue-600">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
