"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const experiences = [
    {
      period: "2020 - Present",
      title: "Lead Robotics Trainer",
      company: "TechKids Academy",
      description: "Developing and delivering robotics training programs for students aged 8-18.",
    },
    {
      period: "2018 - 2020",
      title: "Senior Graphic Designer",
      company: "Creative Solutions Inc.",
      description: "Created visual identities and marketing materials for technology clients.",
    },
    {
      period: "2015 - 2018",
      title: "Robotics Instructor",
      company: "STEM Education Center",
      description: "Taught robotics fundamentals to middle and high school students.",
    },
  ]

  const education = [
    {
      period: "2013 - 2015",
      degree: "Master's in Educational Technology",
      institution: "Tech University",
      description: "Focused on integrating technology in educational environments.",
    },
    {
      period: "2009 - 2013",
      degree: "Bachelor's in Graphic Design",
      institution: "Design Institute",
      description: "Specialized in digital media and interactive design.",
    },
  ]

  return (
    <main className="flex-1">
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-full border-8 border-white">
                <Image
                  src="/images/profile.png"
                  alt="Mohammed Adilsha Afsar M"
                  width={600}
                  height={600}
                  className="object-cover"
                />

                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4">About Me</h1>
              <p className="text-xl text-blue-100">
                I'm Mohammed Adilsha Afsar M, a passionate Robotics Trainer and Graphic Designer with a unique blend of
                technical expertise and creative vision.
              </p>
              <p className="text-blue-100">
                With over 8 years of experience, I've dedicated my career to making robotics accessible to learners of
                all ages while creating visually compelling designs that communicate complex ideas effectively.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-4">
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-3xl font-bold">50+</span>
                  <span className="text-sm text-blue-200">Training Programs</span>
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <span className="text-3xl font-bold">100+</span>
                  <span className="text-sm text-blue-200">Design Projects</span>
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <span className="text-3xl font-bold">8+</span>
                  <span className="text-sm text-blue-200">Years of Experience</span>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 rounded-full w-fit"
                >
                  Download CV
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-8 border-l-2 border-blue-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                    <h3 className="text-xl font-bold mt-1">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-8 border-l-2 border-blue-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                    <h3 className="text-xl font-bold mt-1">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-gray-600 mt-2">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {["Robotics Programming", "3D Modeling", "Circuit Design", "Arduino", "Raspberry Pi"].map(
                  (skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill}</span>
                        <span className="text-gray-500">90%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "90%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-6">Design Skills</h3>
              <div className="space-y-4">
                {["Adobe Photoshop", "Adobe Illustrator", "UI/UX Design", "Brand Identity", "Motion Graphics"].map(
                  (skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill}</span>
                        <span className="text-gray-500">85%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

