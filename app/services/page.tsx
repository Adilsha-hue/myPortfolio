"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Cpu, Palette, GraduationCap, Code, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Robotics Training",
      description: "Comprehensive robotics education programs for students and educators",
      features: [
        "Hands-on robot building",
        "Arduino & Raspberry Pi programming",
        "Competition preparation",
        "Custom curriculum development",
      ],
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Graphic Design",
      description: "Professional design services for businesses and individuals",
      features: [
        "Brand identity & logo design",
        "Marketing materials",
        "Social media graphics",
        "Print & digital design",
      ],
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "STEM Education",
      description: "Innovative STEM curriculum and workshop programs",
      features: ["Workshop facilitation", "Curriculum design", "Teacher training", "Educational content creation"],
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Programming Courses",
      description: "Learn coding fundamentals and robotics programming",
      features: ["Python for beginners", "Arduino programming", "Block-based coding", "Project-based learning"],
    },
  ]

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600">Services</Badge>
            <h1 className="text-5xl font-bold mb-4">What I Offer</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional services combining robotics education and creative design to help you achieve your goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Learn More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Contact me today to discuss how I can help with your project</p>
            <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Contact Me
            </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
