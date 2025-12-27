"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of Robotics in Education",
      excerpt:
        "Exploring how robotics is transforming educational experiences and preparing students for future careers.",
      date: "24 APR 2023",
      category: "ROBOTICS",
      image: "/placeholder.svg?height=400&width=600&text=Robotics+Education",
      readTime: "5 min read",
    },
    {
      title: "Design Principles for Effective Educational Materials",
      excerpt: "Key design considerations when creating visual materials for educational purposes.",
      date: "18 MAR 2023",
      category: "DESIGN",
      image: "/placeholder.svg?height=400&width=600&text=Design+Principles",
      readTime: "4 min read",
    },
    {
      title: "Getting Started with Arduino",
      excerpt: "A beginner's guide to Arduino programming and building your first robotics project.",
      date: "05 FEB 2023",
      category: "TUTORIAL",
      image: "/placeholder.svg?height=400&width=600&text=Arduino+Tutorial",
      readTime: "8 min read",
    },
    {
      title: "The Importance of STEM Education",
      excerpt: "Why STEM education matters and how it shapes the future of technology and innovation.",
      date: "22 JAN 2023",
      category: "EDUCATION",
      image: "/placeholder.svg?height=400&width=600&text=STEM+Education",
      readTime: "6 min read",
    },
    {
      title: "Creating Engaging Visual Content",
      excerpt: "Tips and techniques for designing visual content that captures attention and communicates effectively.",
      date: "10 DEC 2022",
      category: "DESIGN",
      image: "/placeholder.svg?height=400&width=600&text=Visual+Content",
      readTime: "5 min read",
    },
    {
      title: "Robotics Competitions: A Learning Experience",
      excerpt: "How participating in robotics competitions benefits students beyond technical skills.",
      date: "28 NOV 2022",
      category: "ROBOTICS",
      image: "/placeholder.svg?height=400&width=600&text=Robotics+Competitions",
      readTime: "7 min read",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600">Blog</Badge>
            <h1 className="text-5xl font-bold mb-4">Latest Articles</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and thoughts on robotics, design, and education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <Badge className="absolute top-4 left-4 bg-white text-blue-600">{post.category}</Badge>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
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
