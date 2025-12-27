"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileImage } from "@/components/profile-image"
import { Code, Palette, Cpu, GraduationCap, Star, Quote, ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Welcome to my portfolio</Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-blue-600">Mohammed Adilsha Afsar M</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Robotics Trainer & Graphic Designer passionate about merging technology with creativity to inspire the
                next generation.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View My Work <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Me
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <ProfileImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600">Services</Badge>
            <h2 className="text-4xl font-bold mb-4">What I Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized services combining robotics education and creative design solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Robotics Training",
                description: "Hands-on robotics courses for students and educators",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Graphic Design",
                description: "Creative visual solutions for brands and businesses",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "STEM Education",
                description: "Innovative curriculum development for STEM programs",
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Programming",
                description: "Arduino, Python, and robotics programming courses",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600">Portfolio</Badge>
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore my latest work in robotics training and graphic design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "STEM Robotics Curriculum",
                category: "Education",
                image: "/placeholder.svg?height=300&width=400&text=Robotics+Curriculum",
              },
              {
                title: "Brand Identity Design",
                category: "Design",
                image: "/placeholder.svg?height=300&width=400&text=Brand+Identity",
              },
              {
                title: "Arduino Workshop Series",
                category: "Training",
                image: "/placeholder.svg?height=300&width=400&text=Arduino+Workshop",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge className="bg-white text-blue-600">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600">View project details →</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="mb-4 bg-white text-blue-600">Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">What People Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "School Principal",
                content: "Outstanding robotics trainer! Students love the hands-on approach.",
              },
              {
                name: "Michael Chen",
                role: "Business Owner",
                content: "Creative and professional design work. Exceeded expectations!",
              },
              {
                name: "Emily Rodriguez",
                role: "STEM Coordinator",
                content: "Innovative curriculum that truly engages students in learning.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 space-y-4">
                    <Quote className="w-8 h-8 opacity-50" />
                    <p className="text-lg leading-relaxed">{testimonial.content}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20"></div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm opacity-80">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing! Get in touch to discuss your project.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start a Conversation <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
