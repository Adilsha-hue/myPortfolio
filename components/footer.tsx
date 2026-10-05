import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const serviceLinks = [
    { href: "/services/performance-marketing", label: "Performance Marketer in Kerala" },
    { href: "/services/digital-marketing", label: "Digital Marketer in Kerala" },
    { href: "/services/graphic-design", label: "Graphic Designer in Kerala" },
    { href: "/services/video-editing", label: "Video Editor in Kerala" },
    { href: "/services/robotics-training", label: "Robotics Trainer in Kerala" },
    { href: "/services/stem-trainer", label: "STEM Trainer in Kerala" },
    { href: "/services/iot-embedded", label: "IoT Developer in Kerala" },
  ]
  return (
    <footer className="border-t border-border py-10 sm:py-12 text-xs text-neutral-600 dark:text-neutral-400 bg-background transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="min-w-0">
            <p className="text-foreground font-semibold text-sm">
              Mohammed Adilsha Afsar M <span className="font-normal text-neutral-500">(Adilsha · Mohd Adilsha)</span>
            </p>
            <address className="not-italic text-neutral-600 dark:text-neutral-400 mt-0.5">
              Tirur, Malappuram, Kerala, India &bull; <a href="mailto:mohammedadilshaafsarm@gmail.com" className="hover:underline">mohammedadilshaafsarm@gmail.com</a> &bull; <a href="tel:+919946686844" className="hover:underline">+91 9946686844</a> &bull; {new Date().getFullYear()}
            </address>
            <p className="mt-1.5 max-w-xl leading-relaxed">
              Performance Marketer, Digital Marketer, Graphic Designer, Video Editor, Robotics Instructor, STEM Trainer &amp; IoT Embedded Engineer serving Tirur, Malappuram, Kochi, Kerala &amp; India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 font-medium">
            <a
              href="https://www.linkedin.com/in/mohd-adilsha"
              target="_blank"
              rel="me noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
            <a
              href="https://www.instagram.com/mohd_adilsha/"
              target="_blank"
              rel="me noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
            <a
              href="https://wa.me/919946686844"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>WhatsApp</span>
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
            <a
              href="/Adilsha_CV.pdf"
              download="Mohammed_Adilsha_CV.pdf"
              className="text-neutral-700 dark:text-neutral-300 hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>Resume (PDF)</span>
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
          </div>
        </div>

        <nav aria-label="Services" className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border/60 pt-6">
          {serviceLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground hover:underline transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}