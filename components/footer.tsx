import Link from "next/link"
import { Linkedin, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Adilsha</h3>
            <p className="text-sm text-muted-foreground">
              Electronics & Communication Engineer, Robotics Trainer and IoT Developer building smart embedded
              systems and inspiring students through STEM education.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Robotics & STEM Training</li>
              <li>Embedded Systems & IoT</li>
              <li>Networking & IT Support</li>
              <li>Digital Marketing & Content</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/mohd-adilsha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg hover:bg-muted hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:mohammedadilshaafsarm@gmail.com"
                aria-label="Email"
                className="p-2 rounded-lg hover:bg-muted hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-4">
              <MapPin size={15} className="text-primary" />
              Tirur, Kerala, India
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mohammed Adilsha Afsar M. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}