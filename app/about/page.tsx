"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileImage } from "@/components/profile-image"
import { AnimatedBackground } from "@/components/animated-background"
import { Award, Briefcase, GraduationCap, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600">About Me</Badge>
            <h1 className="text-5xl font-bold mb-4">Get to Know Me</h1>
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
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Mohammed Adilsha Afsar M</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                I'm a passionate Robotics Trainer and Graphic Designer dedicated to inspiring the next generation
                through technology and creativity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With years of experience in STEM education and design, I combine technical expertise with creative
                vision to deliver exceptional learning experiences and visual solutions. My mission is to make robotics
                and technology accessible and exciting for students of all ages.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When I'm not teaching robotics or designing, you'll find me exploring new technologies, mentoring
                students, or working on innovative projects that bridge the gap between education and industry.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Experience",
                value: "5+ Years",
                description: "In robotics training & design",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Students Taught",
                value: "500+",
                description: "Across various programs",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Projects",
                value: "100+",
                description: "Successfully completed",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Passion",
                value: "100%",
                description: "For education & design",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                    <div className="font-semibold">{stat.title}</div>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">Robotics & Technology</h3>
                  <div className="space-y-3">
                    {[
                      { skill: "Arduino Programming", level: 95 },
                      { skill: "Raspberry Pi", level: 90 },
                      { skill: "Python", level: 85 },
                      { skill: "3D Modeling", level: 80 },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.skill}</span>
                          <span className="text-sm text-gray-600">{item.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-blue-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-purple-600">Design & Creative</h3>
                  <div className="space-y-3">
                    {[
                      { skill: "Graphic Design", level: 95 },
                      { skill: "Brand Identity", level: 90 },
                      { skill: "UI/UX Design", level: 85 },
                      { skill: "Adobe Creative Suite", level: 92 },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.skill}</span>
                          <span className="text-sm text-gray-600">{item.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-purple-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
