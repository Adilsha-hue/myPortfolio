"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Educational Robotics Kit",
      description:
        "A comprehensive robotics kit designed for STEM education in middle schools, featuring modular components and detailed lesson plans.",
      tags: ["Robotics", "Education", "Design"],
      image: "/placeholder.svg?height=400&width=600&text=Robotics+Kit",
    },
    {
      title: "Tech Conference Branding",
      description:
        "Complete brand identity for a major technology conference, including logo design, marketing materials, and digital assets.",
      tags: ["Graphic Design", "Branding", "Print"],
      image: "/placeholder.svg?height=400&width=600&text=Branding",
    },
    {
      title: "Robotics Workshop Series",
      description:
        "Curriculum development and visual materials for a 12-week robotics workshop series targeting high school students.",
      tags: ["Curriculum", "Robotics", "Education"],
      image: "/placeholder.svg?height=400&width=600&text=Workshop",
    },
    {
      title: "Smart Home Interface",
      description:
        "UI/UX design for a smart home control application, focusing on intuitive navigation and accessibility.",
      tags: ["UI/UX", "Mobile App", "Smart Tech"],
      image: "/placeholder.svg?height=400&width=600&text=UI+Design",
    },
  ]

  return (
    <main className="flex-1">
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-6">My Projects</h1>
            <p className="text-xl text-blue-100">A showcase of my work in robotics training and graphic design</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex gap-2 mt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full text-xs">
                        View Project
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700 rounded-full text-xs"
                      >
                        Case Study
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

