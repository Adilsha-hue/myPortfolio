"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Cpu, CircuitBoard, Wifi, Megaphone, CheckCircle2, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: <Cpu className="w-10 h-10" />,
      title: "Robotics Training & STEM Education",
      description: "Hands-on robotics and STEM education programs for students and educators",
      features: [
        "Robotics & STEM training sessions for schools",
        "Arduino & Raspberry Pi programming",
        "Competition preparation & mentoring",
        "Custom curriculum development",
      ],
    },
    {
      icon: <CircuitBoard className="w-10 h-10" />,
      title: "Embedded Systems & IoT Development",
      description: "Hardware-based solutions built with microcontrollers and IoT technologies",
      features: [
        "Arduino, ESP32 & ESP8266 development",
        "IoT system development & prototypes",
        "Sensor interfacing & motor control",
        "PCB assembly & testing",
      ],
    },
    {
      icon: <Wifi className="w-10 h-10" />,
      title: "Networking & IT Support",
      description: "Reliable IT infrastructure and network solutions for institutions and businesses",
      features: [
        "LAN & internet configuration",
        "Router configuration & troubleshooting",
        "CCTV installation & maintenance",
        "Computer lab & POS system management",
      ],
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: "Digital Marketing & Content",
      description: "Grow your online presence with effective marketing and engaging content",
      features: [
        "SEO & social media marketing",
        "Content creation & strategy",
        "Brand presence & engagement growth",
        "Digital campaign management",
      ],
    },
  ]

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4">Services</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 tracking-tight">What I Offer</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Engineering, training and technical support — combining embedded systems, robotics and IT expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 tracking-tight">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="block">
                      <Button className="w-full">
                        Get Started <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className="bg-foreground text-background rounded-3xl p-10 md:p-12 text-center shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-80">
              Contact me today to discuss how I can help with your project.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Me <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}