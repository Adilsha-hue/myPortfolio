export type ProjectMetric = {
  label: string
  value: string
  sub?: string
}

export type Project = {
  slug: string
  title: string
  category: string
  tags: string[]
  summary: string
  objective: string
  problemStatement: string
  solutionArchitecture: string
  metrics: ProjectMetric[]
  stack: { group: string; items: string[] }[]
  responsibilities: string[]
  outcome: string
  gradient: string
  icon: string
  badgeText?: string
}

export const projects: Project[] = [
  {
    slug: "smart-autonomous-shopping-trolley",
    title: "Smart Autonomous Shopping Trolley with Robotic Arm",
    category: "Major Project",
    tags: ["Raspberry Pi 4", "Python", "OpenCV", "Arduino", "Robotic Arm"],
    badgeText: "B.Tech Flagship",
    summary:
      "Autonomous shopping trolley featuring an onboard computer vision system, custom 4-DOF robotic arm for item retrieval, and real-time obstacle avoidance.",
    objective:
      "Design and deploy an intelligent autonomous trolley capable of human-following, real-time object classification via camera feed, and robotic pick-and-place operation.",
    problemStatement:
      "Traditional retail shopping requires manual item carriage, tedious shelf reach for differently-abled or elderly shoppers, and slow checkout processes.",
    solutionArchitecture:
      "A dual-tier compute setup: Raspberry Pi 4 handles camera image processing (OpenCV) and path planning algorithms, while an Arduino microcontroller controls DC motor driver H-bridges and 4-axis servo robotic arm kinematics.",
    metrics: [
      { label: "Vision Accuracy", value: "96.5%", sub: "Object detection" },
      { label: "Arm Payload", value: "500g", sub: "Servo torque" },
      { label: "Response Time", value: "<120ms", sub: "Sensor feedback" },
      { label: "Navigation", value: "Auto", sub: "Ultrasonic LiDAR" },
    ],
    stack: [
      { group: "Processing & Vision", items: ["Raspberry Pi 4 (4GB)", "Pi Camera Module v2", "OpenCV", "Python 3.10"] },
      { group: "Control & Actuation", items: ["Arduino Uno", "MG996R Servos (4x)", "L298N Motor Drivers", "High-Torque DC Motors"] },
      { group: "Sensing & Interface", items: ["HC-SR04 Ultrasonic Arrays", "UART Serial Communication", "12V Li-ion Battery Bank"] },
    ],
    responsibilities: [
      "Architected the full-system embedded hardware and communication protocols",
      "Designed and calibrated the 4-DOF robotic arm forward kinematics and inverse kinematic angles",
      "Trained OpenCV color-segmentation and contour detection algorithms for item recognition",
      "Implemented PWM motor velocity control and real-time obstacle avoidance algorithms",
      "Conducted extensive physical load testing and battery endurance optimization",
    ],
    outcome:
      "Presented and published as B.Tech ECE Major Capstone Project with highest honors; fully functional physical prototype demonstrated live.",
    gradient: "from-blue-600 to-sky-400",
    icon: "trolley",
  },
  {
    slug: "iot-automation-and-smart-home",
    title: "IoT Automation & Smart Home Environment",
    category: "Internet of Things",
    tags: ["ESP32", "ESP8266", "MQTT", "Sensors", "Relay Arrays"],
    badgeText: "Connected System",
    summary:
      "Microcontroller-driven smart environment network featuring multi-node wireless telemetry, mobile dashboard control, and automated environmental triggers.",
    objective:
      "Build a low-cost, scalable IoT automation infrastructure that enables real-time sensing, fault-tolerant device switching, and remote telemetry logging.",
    problemStatement:
      "Off-the-shelf smart home setups are expensive, cloud-dependent, and prone to latency and vendor lock-in.",
    solutionArchitecture:
      "ESP32 and NodeMCU microcontrollers communicate over MQTT/WebSockets to local and cloud dashboards, with solid-state relay isolation for high-voltage appliance control.",
    metrics: [
      { label: "Connected Nodes", value: "12+", sub: "Sensors & relays" },
      { label: "Latency", value: "<45ms", sub: "Local WiFi switch" },
      { label: "Power Draw", value: "<1.2W", sub: "Standby power" },
      { label: "Uptime", value: "99.9%", sub: "Reliable operation" },
    ],
    stack: [
      { group: "Microcontrollers", items: ["ESP32 DevKit V1", "NodeMCU ESP8266", "Optocoupler Relay Arrays"] },
      { group: "Sensors & Protocols", items: ["DHT22 Temp/Humidity", "PIR Motion Sensors", "MQTT Protocol", "RESTful WebSockets"] },
      { group: "Software & Firmware", items: ["C++ / Arduino IDE", "AsyncWebServer", "Blynk / Adafruit IO Dashboard"] },
    ],
    responsibilities: [
      "Engineered firmware with non-blocking async timers for multi-sensor sampling",
      "Implemented safety isolation using optocoupled relay modules to switch 230V AC loads",
      "Configured WiFi failover and automatic reconnect loops to prevent node dropouts",
      "Integrated live telemetry graphing and mobile push notifications for critical alerts",
    ],
    outcome:
      "Deployed working prototype systems supporting smart energy management and automated room climate regulation.",
    gradient: "from-emerald-500 to-teal-400",
    icon: "home",
  },
  {
    slug: "autonomous-robotics",
    title: "Autonomous Robotics & Motion Control",
    category: "Robotics",
    tags: ["Differential Drive", "Raspberry Pi", "PWM", "Obstacle Avoidance"],
    badgeText: "Autonomous Platform",
    summary:
      "Autonomous robotic vehicles featuring differential drive kinematics, ultrasonic sensor mapping, and precise servo-driven steering mechanisms.",
    objective:
      "Develop agile mobile robot platforms capable of navigating unknown indoor spaces without human teleoperation.",
    problemStatement:
      "Indoor autonomous mobile robots require low-latency sensor parsing and smooth trajectory planning on constrained embedded hardware.",
    solutionArchitecture:
      "PID speed regulation loops running on hardware microcontrollers paired with supervisory path planning logic on Raspberry Pi.",
    metrics: [
      { label: "Speed Range", value: "1.5 m/s", sub: "Max velocity" },
      { label: "Detection Range", value: "2cm – 400cm", sub: "Ultrasonic" },
      { label: "Turning Radius", value: "Zero", sub: "Differential drive" },
      { label: "Battery Life", value: "4+ hrs", sub: "Continuous test" },
    ],
    stack: [
      { group: "Hardware Platform", items: ["Raspberry Pi 3B+/4", "Dual H-Bridge Motor Drivers", "High-RPM Geared DC Motors"] },
      { group: "Navigation Sensors", items: ["Ultrasonic Array", "Infrared Proximity Sensors", "Opto-Encoders"] },
      { group: "Firmware & Software", items: ["Python", "Embedded C", "GPIO PWM Timing", "PID Motion Algorithms"] },
    ],
    responsibilities: [
      "Built chassis and integrated power distribution circuits with buck converters",
      "Wrote PID motor control algorithms to ensure straight-line tracking and exact rotational turns",
      "Engineered real-time reactive obstacle evasion state machines",
      "Trained students and lab members on robotic chassis construction and wiring best practices",
    ],
    outcome:
      "Served as the core motion baseline for advanced robotics workshops and the Buy-'n-Trolley automated platform.",
    gradient: "from-amber-500 to-orange-400",
    icon: "robot",
  },
  {
    slug: "tinkering-lab-and-stem-labs",
    title: "Tinkering Lab Leadership & STEM Education",
    category: "STEM Education",
    tags: ["Robotics Trainer", "300+ Students", "Curriculum", "Hands-on STEM"],
    badgeText: "Leadership & Impact",
    summary:
      "Leading lab operations, practical robotics courses, and innovative STEM curriculum at BenchMark International School, training over 300+ students.",
    objective:
      "Empower next-generation students with hands-on skills in electronics, microcontroller programming, 3D prototyping, and computational thinking.",
    problemStatement:
      "Traditional school education often lacks practical, hands-on hardware engineering experience, leaving students unexposed to real-world STEM problem solving.",
    solutionArchitecture:
      "A multi-tiered progressive curriculum covering circuit fundamentals, breadboard prototyping, Arduino programming, and competitive robotics builds.",
    metrics: [
      { label: "Students Trained", value: "300+", sub: "K-12 students" },
      { label: "Workshops Led", value: "40+", sub: "Hands-on labs" },
      { label: "Projects Built", value: "85+", sub: "Student prototypes" },
      { label: "Lab Equipment", value: "100%", sub: "Uptime & safety" },
    ],
    stack: [
      { group: "Hardware Kits", items: ["Arduino Education Kits", "Robotics Chassis Kits", "Sensors, LEDs, Motors & Breadboards"] },
      { group: "Lab Tools", items: ["Soldering Stations", "Digital Multimeters", "Oscilloscopes & Power Supplies"] },
      { group: "Pedagogy", items: ["STEM Project-Based Learning", "Design Thinking", "Hardware Debugging"] },
    ],
    responsibilities: [
      "Day-to-day management, procurement, and equipment maintenance of the full Tinkering Lab",
      "Designed and delivered interactive robotics and electronics curricula tailored to student age groups",
      "Mentored student teams for regional robotics competitions and science exhibitions",
      "Maintained hybrid classroom technology and audio-visual IT systems across campus",
    ],
    outcome:
      "Transformed classroom learning into a thriving innovation hub where students independently build working electronics and robotics prototypes.",
    gradient: "from-rose-500 to-pink-400",
    icon: "lab",
  },
  {
    slug: "sensor-based-monitoring-systems",
    title: "Sensor-Based Embedded Monitoring Systems",
    category: "Embedded Systems",
    tags: ["Embedded C", "UART", "I2C", "SPI", "Telemetry"],
    badgeText: "Firmware & Protocols",
    summary:
      "Multi-sensor data acquisition nodes communicating over I2C, SPI, and UART protocols with threshold automation and fault detection.",
    objective:
      "Design robust embedded firmware that continuously samples physical sensors, validates data integrity, and triggers hardware alarms.",
    problemStatement:
      "Industrial and environmental sensors frequently encounter signal noise, bus collisions, and protocol latency without optimized firmware design.",
    solutionArchitecture:
      "Interrupt-driven sampling architecture on microcontrollers with ring buffers and CRC checks over serial interfaces.",
    metrics: [
      { label: "Sampling Rate", value: "1 kHz", sub: "Interrupt driven" },
      { label: "Protocols", value: "3", sub: "I2C, SPI, UART" },
      { label: "Noise Rejection", value: "High", sub: "Digital filtering" },
      { label: "Alert Latency", value: "<15ms", sub: "Hardware interrupt" },
    ],
    stack: [
      { group: "Target MCUs", items: ["ATmega328P", "STM32 / ARM Cortex-M", "ESP32"] },
      { group: "Protocols", items: ["I2C Bus Interfacing", "SPI High-Speed Data", "UART Serial Logs", "PWM Modulation"] },
      { group: "Firmware Stack", items: ["Embedded C", "Bare-Metal Registers", "Interrupt Service Routines (ISRs)"] },
    ],
    responsibilities: [
      "Wrote efficient C drivers for multi-channel ADC readings and external sensors",
      "Configured hardware timers and interrupt service routines for precise timing",
      "Implemented digital moving-average filters to eliminate environmental sensor jitter",
      "Validated signal integrity on digital oscilloscopes and logic analyzers",
    ],
    outcome:
      "Created reusable, hardened embedded libraries applied across IoT products and university research prototypes.",
    gradient: "from-violet-600 to-purple-400",
    icon: "sensor",
  },
  {
    slug: "networking-and-it-infrastructure",
    title: "Enterprise Networking & Campus IT Infrastructure",
    category: "IT Support",
    tags: ["CCNA", "LAN & VLANs", "CCTV Systems", "POS & Security"],
    badgeText: "CCNA Certified",
    summary:
      "Comprehensive network administration, CCTV surveillance deployment, and hardware IT infrastructure for academic and commercial institutions.",
    objective:
      "Ensure uninterrupted campus connectivity, high-bandwidth laboratory network access, and robust IP surveillance security.",
    problemStatement:
      "Educational institutions with hundreds of concurrent users face bandwidth bottlenecks, unauthorized access, and hardware maintenance downtime.",
    solutionArchitecture:
      "Segmented VLAN architecture with QoS traffic prioritization, enterprise router/switch configuration, and centralized NVR IP CCTV feeds.",
    metrics: [
      { label: "Connected Devices", value: "250+", sub: "Active clients" },
      { label: "CCTV Channels", value: "64+", sub: "Centralized NVR" },
      { label: "Network Uptime", value: "99.8%", sub: "High reliability" },
      { label: "Ticket Resolution", value: "<2 hrs", sub: "Average MTTR" },
    ],
    stack: [
      { group: "Network Hardware", items: ["Cisco Managed Switches", "Enterprise Routers", "Gigabit LAN Backbone", "Access Points"] },
      { group: "Surveillance & POS", items: ["IP Dome & Bullet Cameras", "NVR Storage Systems", "POS Terminals", "Biometrics"] },
      { group: "Protocols & Tools", items: ["TCP/IP, DHCP, DNS, VLANs", "Wireshark Packet Analysis", "Subnetting & Routing Tables"] },
    ],
    responsibilities: [
      "Configured router routing tables, subnets, and DHCP pools across academic blocks",
      "Installed, aligned, and maintained 60+ IP CCTV cameras and centralized monitoring stations",
      "Maintained computer labs, digital podiums, POS billing terminals, and classroom AV tech",
      "Provided swift tier-1 and tier-2 IT troubleshooting for staff and faculty",
    ],
    outcome:
      "Maintained high reliability and security standards backed by CCNA Network Fundamentals qualification.",
    gradient: "from-slate-600 to-slate-400",
    icon: "network",
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]