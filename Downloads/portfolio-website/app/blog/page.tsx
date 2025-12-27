"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of Robotics in Education",
      excerpt:
        "Exploring how robotics is transforming educational experiences and preparing students for future careers.",
      date: "24 APR 2023",
      category: "ROBOTICS",
      image: "/placeholder.svg?height=400&width=600&text=Robotics+Education",
    },
    {
      title: "Design Principles for Effective Educational Materials",
      excerpt: "Key design considerations when creating visual materials for educational purposes.",
      date: "18 MAR 2023",
      category: "DESIGN",
      image: "/placeholder.svg?height=400&width=600&text=Design+Principles",
    },
    {
      title: "Getting Started with Arduino: A Beginner's Guide",
      excerpt: "A step-by-step introduction to Arduino programming for beginners interested in robotics.",
      date: "05 FEB 2023",
      category: "TUTORIAL",
      image: "/placeholder.svg?height=400&width=600&text=Arduino+Guide",
    },
    {
      title: "Color Theory in Educational Design",
      excerpt: "How to use color effectively in educational materials to enhance learning and retention.",
      date: "12 JAN 2023",
      category: "DESIGN",
      image: "/placeholder.svg?height=400&width=600&text=Color+Theory",
    },
    {
      title: "Building Your First Robot: Essential Components",
      excerpt: "A comprehensive guide to the components you'll need for your first robotics project.",
      date: "28 DEC 2022",
      category: "ROBOTICS",
      image: "/placeholder.svg?height=400&width=600&text=Robot+Components",
    },
    {
      title: "The Intersection of Art and Technology in Modern Education",
      excerpt:
        "How combining artistic approaches with technical education creates more well-rounded learning experiences.",
      date: "15 NOV 2022",
      category: "EDUCATION",
      image: "/placeholder.svg?height=400&width=600&text=Art+Technology",
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
            <h1 className="text-4xl font-bold mb-6">My Blog</h1>
            <p className="text-xl text-blue-100">Insights and tutorials on robotics, design, and education</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
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
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover w-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2">
                    {post.category} • {post.date}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full text-xs mt-4">
                      Read
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

