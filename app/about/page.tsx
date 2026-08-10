"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileImage } from "@/components/profile-image"
import { AnimatedBackground } from "@/components/animated-background"
import {
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Cpu,
  Wifi,
  Code2,
  Building2,
  Languages,
  ArrowUpRight,
} from "lucide-react"

const experience = [
  {
    role: "Technical Staff & Robotics Trainer",
    company: "BenchMark International School, Tirur",
    period: "July 2024 – Present",
    points: [
      "Delivering robotics and STEM training sessions to school students",
      "Managing IT infrastructure, including network cameras and POS systems",
      "Leading operations of a fully equipped tinkering lab",
      "Providing technical support for classrooms and digital learning",
    ],
  },
  {
    role: "Digital Marketing Executive",
    company: "HITECH Educare, Tirur",
    period: "October 2023 – Present",
    points: [
      "Executing digital marketing campaigns to enhance online presence and engagement",
      "Utilizing SEO, social media marketing and content creation to attract and retain clients",
    ],
  },
  {
    role: "Robotics & Content Creation Head",
    company: "Cybroque Technologies, Kozhikode",
    period: "June 2023 – June 2024",
    points: [
      "Led robotics initiatives and content creation for a startup incubated under IEDC CEV",
      "Drove innovation and growth within the startup ecosystem",
    ],
  },
  {
    role: "Intern – Electronics & IoT",
    company: "Keltron (Kerala State Electronics Development Corporation), Kochi",
    period: "May 2023",
    points: [
      "Developed IoT systems and Arduino-based automation prototypes",
      "Performed sensor interfacing and studied industrial electronics applications",
    ],
  },
]

const skillsTech = [
  { skill: "Arduino & Microcontrollers", level: 95 },
  { skill: "C & Python Programming", level: 90 },
  { skill: "Raspberry Pi & Embedded C", level: 85 },
  { skill: "ESP32 / ESP8266 Development", level: 90 },
  { skill: "PCB Assembly & Testing", level: 80 },
  { skill: "OpenCV & Computer Vision", level: 75 },
]

const skillsNet = [
  { skill: "IoT System Development", level: 95 },
  { skill: "Networking & LAN Configuration", level: 90 },
  { skill: "Network Troubleshooting & IP Addressing", level: 85 },
  { skill: "CCTV & IT Infrastructure", level: 88 },
  { skill: "Git, GitHub & Linux", level: 80 },
  { skill: "Digital Marketing & SEO", level: 85 },
]

const stats = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Education",
    value: "B.Tech ECE",
    description: "College of Engineering Vadakara, 2020–2024",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Experience",
    value: "2+ Years",
    description: "Robotics training & IT support",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Certified",
    value: "CCNA",
    description: "Cisco 200-301 Network Fundamentals",
  },
  {
    icon: <Languages className="w-8 h-8" />,
    title: "Languages",
    value: "4+",
    description: "English, Hindi, Arabic & Malayalam",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4">About Me</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Get to Know Me</h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <ProfileImage />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-5"
            >
              <h2 className="text-3xl font-bold tracking-tight">Mohammed Adilsha Afsar M</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Electronics & Communication Engineer, Technical Staff, Robotics Trainer, IT Support Specialist and
                Tinkering Lab Owner from Kerala, India — passionate about embedded systems, IoT, robotics and STEM.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                B.Tech graduate in Electronics & Communication Engineering, experienced in hardware-based solutions
                using Raspberry Pi, Arduino, ESP32 and microcontrollers. Skilled in robotics training, embedded
                programming, networking, technical support and electronic project development.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Driven by innovation and entrepreneurship, I lead digital content creation and STEM initiatives,
                combining solid electronics fundamentals with a passion for building reliable real-world systems.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-primary mx-auto">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-primary tracking-tight">{stat.value}</div>
                    <div className="font-semibold">{stat.title}</div>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold mb-8 text-center tracking-tight">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-primary" /> Embedded & Programming
                  </h3>
                  <div className="space-y-4">
                    {skillsTech.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium">{item.skill}</span>
                          <span className="text-sm text-muted-foreground">{item.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-primary h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-primary" /> IoT, Networking & Tools
                  </h3>
                  <div className="space-y-4">
                    {skillsNet.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium">{item.skill}</span>
                          <span className="text-sm text-muted-foreground">{item.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-primary h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl font-bold tracking-tight">Experience</h2>
              <ArrowUpRight size={28} className="text-primary hidden md:block" />
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {experience.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-primary">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{job.role}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {job.period}
                      </Badge>
                    </div>
                    <ul className="mt-4 space-y-2 pl-1 list-disc list-inside text-muted-foreground text-sm">
                      {job.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> Certifications
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    CCNA 200-301: Network Fundamentals
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    GEN Emissary Certificate
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" /> Leadership & Recognition
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                    Chief Creative Officer, IEDC — College of Engineering Vadakara
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
                    Robotics Head, Cybroque Technologies
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}