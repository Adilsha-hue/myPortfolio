export type Project = {
  slug: string
  title: string
  category: string
  tags: string[]
  summary: string
  objective: string
  stack: { group: string; items: string[] }[]
  responsibilities: string[]
  outcome: string
  gradient: string
  icon: string
}

export const projects: Project[] = [
  {
    slug: "smart-autonomous-shopping-trolley",
    title: "Smart Autonomous Shopping Trolley with Robotic Arm",
    category: "Major Project",
    tags: ["Raspberry Pi 4", "Python", "OpenCV", "Arduino"],
    summary:
      "Autonomous shopping trolley with a robotic arm for object pickup — computer vision, motor control and sensor-based navigation working together.",
    objective:
      "Design an autonomous shopping trolley that follows the customer, detects objects using computer vision and uses a robotic arm to pick them up — a fully integrated hardware-software system.",
    stack: [
      { group: "Hardware", items: ["Raspberry Pi 4", "Arduino", "Pi Camera", "Ultrasonic Sensors", "Servo Motors", "DC Motors"] },
      { group: "Software", items: ["Python", "OpenCV", "GPIO Programming", "Serial Communication (UART)"] },
    ],
    responsibilities: [
      "Designed the autonomous shopping trolley system architecture",
      "Integrated a robotic arm for object pickup",
      "Developed object detection using computer vision (OpenCV)",
      "Implemented obstacle avoidance for safe navigation",
      "Programmed DC motor and servo motor control",
      "Integrated sensor-based navigation and positioning",
      "Built the hardware–software communication layer",
    ],
    outcome:
      "End-to-end embedded project combining computer vision, robotics and embedded programming — my B.Tech major project and a documented reference for full-stack hardware development.",
    gradient: "from-blue-600 to-sky-400",
    icon: "trolley",
  },
  {
    slug: "iot-automation-and-smart-home",
    title: "IoT Automation & Smart Home",
    category: "Internet of Things",
    tags: ["ESP32", "ESP8266", "Sensors", "Wireless"],
    summary:
      "Home automation prototypes and wireless IoT systems built with microcontroller-based automation.",
    objective:
      "Build practical IoT systems that sense the environment and control devices wirelessly — using ESP32 and ESP8266 with sensor interfacing.",
    stack: [
      { group: "Hardware", items: ["ESP32", "ESP8266 / NodeMCU", "Sensors & Actuators", "Relay Modules"] },
      { group: "Software", items: ["Arduino IDE", "Wi-Fi & Wireless Communication", "Sensor Interfacing", "IoT Protocols"] },
    ],
    responsibilities: [
      "Developed home automation prototypes with ESP32 and ESP8266",
      "Built sensor monitoring systems for real-world readings",
      "Implemented wireless IoT communication",
      "Interfaced sensors and actuators with microcontrollers",
      "Designed microcontroller-based automation logic",
    ],
    outcome:
      "A portfolio of working IoT prototypes spanning sensing, control and wireless connectivity — foundation for smart environment deployments.",
    gradient: "from-emerald-500 to-teal-400",
    icon: "home",
  },
  {
    slug: "sensor-based-monitoring-systems",
    title: "Sensor-Based Monitoring Systems",
    category: "Embedded Systems",
    tags: ["Embedded C", "UART", "I2C", "SPI"],
    summary:
      "Microcontroller monitoring solutions with multi-protocol sensor interfacing and data-driven automation.",
    objective:
      "Create reliable embedded monitoring systems that collect sensor data over standard protocols and react automatically.",
    stack: [
      { group: "Hardware", items: ["Arduino UNO", "Raspberry Pi", "Sensors (Analog + Digital)"] },
      { group: "Software", items: ["Embedded C", "UART / I2C / SPI / PWM", "GPIO Programming"] },
    ],
    responsibilities: [
      "Interfaced a range of analog and digital sensors with microcontrollers",
      "Implemented UART, I2C and SPI communication between devices",
      "Used PWM for output control and motor interfaces",
      "Wrote embedded C firmware for data acquisition and logic",
      "Built monitoring loops that react to sensor thresholds",
    ],
    outcome:
      "Demonstrated solid fundamentals in interfacing, serial protocols and firmware — core skill set applied across every later robotics project.",
    gradient: "from-violet-600 to-purple-400",
    icon: "sensor",
  },
  {
    slug: "autonomous-robotics",
    title: "Autonomous Robotics",
    category: "Robotics",
    tags: ["Servo Control", "DC Motors", "Navigation"],
    summary:
      "Autonomous robot platforms with servo/DC motor control, Raspberry Pi and sensor-based navigation.",
    objective:
      "Develop self-driving robot platforms that perceive their environment and navigate without human input.",
    stack: [
      { group: "Hardware", items: ["Raspberry Pi", "Servo Motors", "DC Motors", "Motor Drivers", "Ultrasonic Sensors"] },
      { group: "Software", items: ["Python", "OpenCV", "Embedded C", "Sensor-Based Navigation"] },
    ],
    responsibilities: [
      "Developed autonomous robot motion and control systems",
      "Built servo motor control systems for precision movement",
      "Programmed Raspberry Pi–based robotics",
      "Implemented sensor-based navigation and obstacle avoidance",
      "Integrated motor drivers and power management",
    ],
    outcome:
      "Working mobile robots that navigate autonomously — carried directly into the Buy-'n-Trolley major project and classroom robotics training.",
    gradient: "from-amber-500 to-orange-400",
    icon: "robot",
  },
  {
    slug: "tinkering-lab-and-stem-labs",
    title: "Tinkering Lab & STEM Education",
    category: "STEM Education",
    tags: ["Arduino", "Hands-on Learning", "Robotics"],
    summary:
      "Leading a fully equipped tinkering lab and delivering robotics training for school students.",
    objective:
      "Turn a lab into a space where students build, break and learn — running robotics and STEM sessions that make technology hands-on.",
    stack: [
      { group: "Setup", items: ["Arduino Kits", "Robotics Kits", "Electronic Components", "3D & Assembly Tools"] },
      { group: "Program", items: ["STEM Curriculum", "Hands-on Workshops", "Student Projects"] },
    ],
    responsibilities: [
      "Leading operations of a fully equipped tinkering lab",
      "Delivering robotics and STEM training sessions to students",
      "Encouraging creativity and STEM-based projects",
      "Maintaining lab electronics and equipment",
      "Supporting hybrid learning technology implementation",
    ],
    outcome:
      "Hundreds of students trained in real, hands-on robotics — the lab continues to foster innovation under my day-to-day leadership at BenchMark International School.",
    gradient: "from-rose-500 to-pink-400",
    icon: "lab",
  },
  {
    slug: "networking-and-it-infrastructure",
    title: "Networking & IT Infrastructure",
    category: "IT Support",
    tags: ["LAN", "Router Config", "CCTV", "Troubleshooting"],
    summary:
      "Managed school IT infrastructure — network cameras, POS systems, LAN configuration and technical support.",
    objective:
      "Keep a school's digital backbone running: reliable networking, secure CCTV, working labs and fast, effective technical support.",
    stack: [
      { group: "Infrastructure", items: ["LAN & Router Configuration", "CCTV Systems", "POS Systems", "IP Addressing"] },
      { group: "Support", items: ["Network Troubleshooting", "Computer Lab Management", "Preventive Maintenance"] },
    ],
    responsibilities: [
      "Managed school IT infrastructure including network cameras and POS systems",
      "Configured LAN and internet connectivity",
      "Installed and maintained CCTV systems",
      "Provided technical support across classrooms and administration",
      "Performed hardware troubleshooting and preventive maintenance",
      "Maintained electronic devices and laboratory equipment",
    ],
    outcome:
      "A stable, secure IT environment serving academic and administrative operations — backed by CCNA Network Fundamentals training.",
    gradient: "from-slate-600 to-slate-400",
    icon: "network",
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]