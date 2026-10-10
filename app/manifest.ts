import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammed Adilsha Afsar M — Portfolio",
    short_name: "Adilsha",
    description:
      "Mohammed Adilsha Afsar M (Adilsha): Performance Marketer, Digital Marketer, Graphic Designer, Video Editor, Robotics Trainer & IoT Engineer in Kerala, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#09090b",
    icons: [
      { src: "/favicon.ico?v=2", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icon.png?v=2", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  }
}
