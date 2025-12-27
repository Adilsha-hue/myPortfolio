"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ProfileImage } from "@/components/profile-image"

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-on-scroll")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                Hello !
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I'm <span className="text-blue-600">Mohammed Adilsha Afsar M</span>,
                <br />
                <span className="text-3xl sm:text-4xl">Robotics Trainer & Graphic Designer</span>
              </motion.h1>
              <motion.p
                className="text-gray-600 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                I create exceptional robotics training programs and stunning graphic designs that combine technical
                expertise with creative vision.
              </motion.p>
              <motion.div
                className="flex gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">Hire Me</Button>
                <Button variant="outline" className="rounded-full border-gray-300 text-gray-700">
                  Whatsapp
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white">
                    <span className="text-xs">+</span>
                  </div>
                  <span className="text-sm font-medium">Robotics Training</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white">
                    <span className="text-xs">+</span>
                  </div>
                  <span className="text-sm font-medium">Graphic Design</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white">
                    <span className="text-xs">+</span>
                  </div>
                  <span className="text-sm font-medium">3D Modeling</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white">
                    <span className="text-xs">+</span>
                  </div>
                  <span className="text-sm font-medium">UI/UX Design</span>
                </motion.div>
              </motion.div>
            </motion.div>
            <ProfileImage />
          </div>
        </section>

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="bg-blue-600 text-white py-16 md:py-24 animate-on-scroll opacity-0 transition-all duration-1000"
        >
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="text-sm text-blue-200 mb-2">— Services</div>
              <h2 className="text-3xl font-bold mb-4">Services I Provide</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white text-gray-800 p-6 rounded-xl"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Robotics Training</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive robotics training programs for all skill levels, from beginners to advanced enthusiasts.
                </p>
              </motion.div>
              <motion.div
                className="bg-white text-gray-800 p-6 rounded-xl"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="m19 12 4 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Graphic Design</h3>
                <p className="text-gray-600 mb-4">
                  Creative and professional graphic design services for branding, marketing materials, and digital
                  assets.
                </p>
              </motion.div>
              <motion.div
                className="bg-white text-gray-800 p-6 rounded-xl"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">3D Modeling</h3>
                <p className="text-gray-600 mb-4">
                  Detailed 3D modeling and design for robotics prototypes, product visualization, and educational
                  materials.
                </p>
              </motion.div>
            </div>
            <div className="flex justify-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 rounded-full"
                  >
                    See More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          className="bg-blue-600 text-white py-16 md:py-24 animate-on-scroll opacity-0 transition-all duration-1000"
        >
          <div className="container">
            <div className="flex flex-col items-start mb-12">
              <div className="text-sm text-blue-200 mb-2">— Projects</div>
              <h2 className="text-3xl font-bold mb-4">My Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Educational Robotics Kit",
                  tags: ["Robotics", "Education", "Design"],
                  image: "/placeholder.svg?height=400&width=600&text=Robotics+Kit",
                },
                {
                  title: "Tech Conference Branding",
                  tags: ["Graphic Design", "Branding", "Print"],
                  image: "/placeholder.svg?height=400&width=600&text=Branding",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-gray-800 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
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
                    <div className="flex gap-2 mt-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full text-xs">
                          Live Preview
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 rounded-full text-xs"
                        >
                          Details
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 rounded-full"
                  >
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          className="py-16 md:py-24 animate-on-scroll opacity-0 transition-all duration-1000"
        >
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="text-sm text-gray-500 mb-2">— Client Testimonials</div>
              <h2 className="text-3xl font-bold mb-4">The Impact of My Work:</h2>
              <h3 className="text-2xl font-bold text-blue-600">Client Testimonials</h3>
            </div>
            <motion.div
              className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Client"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Education Director, TechKids Academy</p>
                </div>
                <div className="ml-auto flex">
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                  <span className="ml-1 text-sm font-medium">5.0</span>
                </div>
              </div>
              <p className="text-gray-600">
                "Mohammed's robotics training program transformed our curriculum. His ability to simplify complex
                concepts for young learners while keeping the material engaging is remarkable. The graphic materials he
                designed for our courses have received praise from parents and students alike. We've seen a 40% increase
                in enrollment since implementing his program."
              </p>
            </motion.div>
            <div className="flex justify-center mt-8 gap-2">
              <button className="w-3 h-3 rounded-full bg-blue-600"></button>
              <button className="w-3 h-3 rounded-full bg-gray-300"></button>
              <button className="w-3 h-3 rounded-full bg-gray-300"></button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-blue-600 text-white py-16 md:py-24 animate-on-scroll opacity-0 transition-all duration-1000">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-full border-8 border-white">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Mohammed Adilsha Afsar M"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-sm text-blue-200 mb-2">— About Me</div>
                <h2 className="text-3xl font-bold mb-4">Who is Mohammed Adilsha Afsar M?</h2>
                <p className="text-blue-100">
                  Mohammed Adilsha Afsar M is a passionate Robotics Trainer and Graphic Designer with a unique blend of
                  technical expertise and creative vision. With years of experience in both fields, Mohammed creates
                  innovative robotics training programs and stunning visual designs.
                </p>
                <div className="grid grid-cols-3 gap-8 mt-4">
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="text-3xl font-bold">50+</span>
                    <span className="text-sm text-blue-200">Training Programs</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <span className="text-3xl font-bold">100+</span>
                    <span className="text-sm text-blue-200">Design Projects</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <span className="text-3xl font-bold">8+</span>
                    <span className="text-sm text-blue-200">Years of Experience</span>
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 rounded-full w-fit"
                    >
                      Download CV
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 animate-on-scroll opacity-0 transition-all duration-1000">
          <div className="container">
            <motion.div
              className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Let's work together</h2>
                  <p className="text-gray-600 mb-8">
                    Have a project in mind? Let's discuss how I can help bring your vision to life.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">mohammed@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full">Send Message</Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

