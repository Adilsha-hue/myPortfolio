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
      { src: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
