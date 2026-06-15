// src/App.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
// @ts-ignore
import { TypeAnimation } from 'react-type-animation';
import "/public/assets/css/particles.css";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const EXPERIENCE = [
  {
    role: "AI Intern",
    company: "Pragmatic Techsoft | Pune, India",
    date: "Dec 2024 - June 2025",
    bullets: [
      "Developed AI-powered tools using API integrations and prompt workflows, enhancing system efficiency and user experience.",
      "Implemented AI solutions for automation and real-time data processing, reducing manual intervention by 50%.",
      "Collaborated with cross-functional teams to deliver key AI applications, improving operational efficiency and engagement."
    ]
  },
  {
    role: "Cybersecurity Intern",
    company: "The Red Users | Remote",
    date: "Aug 2024 - Sept 2024",
    bullets: [
      "Identified and resolved 15 web vulnerabilities, reducing attack surface by 30%.",
      "Implemented intrusion detection systems, preventing over 500 web threats and improving web application security by 40%.",
      "Executed incident response protocols, cutting average downtime and breach impact by 75%."
    ]
  },
  {
    role: "Cybersecurity Intern",
    company: "Intrainz Edu Tech | Remote",
    date: "Dec 2023 - Feb 2024",
    bullets: [
      "Conducted comprehensive risk assessments, identifying and mitigating 15 critical security risks, resulting in a 30% decrease in overall system vulnerabilities.",
      "Executed the deployment of advanced intrusion detection frameworks, identifying and averting over 500 potential threats in real-time, elevating network security by 40% and enhancing system integrity by 45%.",
      "Streamlined incident response procedures, reducing average response time to six hours and cutting potential downtime by 75%."
    ]
  }
];

const CERTIFICATES = [
  { name: "Certified Ethical Hacker", issuer: "EC-Council", year: "2024" },
  { name: "Certified Cloud Digital Leader", issuer: "Google", year: "2024" },
  { name: "Bits & Bytes of Computer Networking", issuer: "Google x Coursera", year: "2023" },
  { name: "Introduction to Cyber security", issuer: "Cisco", year: "2023" },
  { name: "CyberSecurity Essentials", issuer: "Cisco", year: "2023" },
  { name: "SmartInternz Android Dev", issuer: "Google", year: "2023" }
];

const TECH_STACK = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Google Cloud", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
];

const PROJECTS = [
  {
    title: "AWS Secure IaC Platform",
    desc: "Terraform + AWS with security hardening. GitHub Actions CI/CD with Checkov static analysis and explicit threat modeling.",
    link: "https://github.com/ShrivatsaDeshpande/aws-secure-iac-platform"
  },
  {
    title: "Data Exfiltration Detection",
    desc: "A pipeline to detect unauthorized data transfers and data exfiltration attempts in enterprise networks.",
    link: "https://github.com/ShrivatsaDeshpande/Data-Exfiltration-Detection-Pipeline"
  },
  {
    title: "Password Manager",
    desc: "Custom password manager with SHA-256 encryption and Tkinter GUI, enabling secure storage and clipboard entry for 1,000+ users.",
    link: "https://github.com/ShrivatsaDeshpande/"
  },
  {
    title: "Podcast Plus App",
    desc: "Advanced recommendation algorithms and 24/7 universal streaming, boosting engagement by 40%.",
    link: "https://github.com/ShrivatsaDeshpande/"
  },
  {
    title: "Student AI Tools",
    desc: "A collection of AI-powered educational tools for students including code assistance and language learning.",
    link: "https://github.com/ShrivatsaDeshpande/"
  },
  {
    title: "SSA-LAB",
    desc: "Secure Software Architecture lab assignments and implementations.",
    link: "https://github.com/ShrivatsaDeshpande/SSA-LAB"
  }
];

// --- Animation Variants ---
const fadeIn: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const revealVariants: any = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

// --- Custom Spotlight Component ---
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      variants={fadeIn}
      className={`relative overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px z-20 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,197,94,.15), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Parallax & Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yHeroImg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-green-500/30 selection:text-green-200 overflow-hidden text-gray-300">

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-[100] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ scaleX }} />

      {/* Background Lights */}
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold tracking-tighter text-white cursor-pointer hover:scale-105 transition-transform">
            Shrivatsa<span className="text-green-500 animate-pulse">.</span>
          </motion.div>
          <div className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={link.name} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
          <motion.a initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} href="#contact" className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] rounded border border-green-600 transition-all active:scale-95">
            Get in touch
          </motion.a>
        </div>
      </nav>

      <main className="pt-32 pb-20 relative z-10">

        {/* HERO SECTION */}
        <section id="home" className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col md:flex-row items-center justify-between gap-12">

          <motion.div style={{ y: yHeroText }} className="flex-1">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight flex flex-col min-h-[140px] md:min-h-[180px]">
              <span className="overflow-hidden pb-2"><motion.span initial="hidden" animate="visible" variants={revealVariants} className="block">Secure Your Future with</motion.span></span>
              <span className="overflow-hidden pb-2 text-green-500 block h-full">
                <TypeAnimation
                  sequence={[
                    'Ethical Hacking Done Right', 2000,
                    'Vulnerability Assessment', 2000,
                    'AI Integrations', 2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <motion.p initial="hidden" animate="visible" variants={fadeIn} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              MSc Cybersecurity student at the University of Bristol. Expert in penetration testing, threat monitoring, and proactive risk mitigation.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#about" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-green-600 hover:bg-green-500 rounded transition-all uppercase tracking-wider hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(34,197,94,0.6)] active:scale-95">
                More About Me
              </a>
              <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white border border-gray-600 hover:border-gray-400 rounded transition-all uppercase tracking-wider hover:-translate-y-1 hover:bg-white/5 active:scale-95">
                Contact Me!
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yHeroImg }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 flex justify-center relative"
          >
            <div className="absolute inset-0 bg-green-500/10 blur-[80px] rounded-full mix-blend-screen" />
            <img
              src="/assets/images/profile.png"
              alt="Profile"
              className="w-full max-w-sm rounded-2xl drop-shadow-[0_0_30px_rgba(34,197,94,0.2)] object-cover border border-gray-800 relative z-10"
            />
          </motion.div>
        </section>

        {/* ACCOLADES SECTION */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-y border-gray-800 bg-black/50">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { num: "12+", label: "Months of Experience" },
              { num: "3", label: "Internships Completed" },
              { num: "6+", label: "Industry Certifications" }
            ].map((stat, i) => (
              <SpotlightCard key={i} className="flex flex-col items-center justify-center p-8 rounded-2xl border border-transparent hover:border-gray-800 transition-colors cursor-default">
                <motion.div whileHover={{ scale: 1.1 }} className="text-5xl md:text-6xl font-black text-white mb-2 transition-transform">{stat.num}</motion.div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-xs group-hover:text-green-400 transition-colors text-center">{stat.label}</div>
              </SpotlightCard>
            ))}
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="max-w-7xl mx-auto px-6 py-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="max-w-2xl mx-auto mb-16 text-center">
            <div className="overflow-hidden pb-2">
              <motion.h2 variants={revealVariants} className="text-3xl md:text-5xl font-bold text-white mb-6">Experience</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto"></motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="max-w-4xl mx-auto text-left relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent"
          >
            {EXPERIENCE.map((exp, i) => (
              <SpotlightCard key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8 p-8 rounded-2xl border border-gray-800 bg-[#111] transition-colors ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] odd:md:mr-auto even:md:ml-auto">
                <div className="flex flex-col w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{exp.role}</h3>
                  <h4 className="text-green-500 font-medium mb-1">{exp.company}</h4>
                  <div className="text-sm text-gray-500 font-mono mb-4">{exp.date}</div>
                  <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </section>

        {/* CERTIFICATES SECTION */}
        <section id="certificates" className="max-w-7xl mx-auto px-6 py-32 bg-gray-900/20 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="max-w-2xl mx-auto mb-16">
            <div className="overflow-hidden pb-2">
              <motion.h2 variants={revealVariants} className="text-3xl md:text-5xl font-bold text-white mb-6">Certifications</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto"></motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {CERTIFICATES.map((cert, i) => (
              <SpotlightCard key={i} className="p-8 rounded-2xl border border-gray-800 bg-[#111] transition-colors flex flex-col items-center justify-center min-h-[220px] hover:border-green-500/50 hover:shadow-[0_10px_30px_-15px_rgba(34,197,94,0.3)] duration-500">
                <div className="px-5 py-2 bg-black border border-gray-800 rounded-full mb-6 flex items-center justify-center text-sm font-black text-green-500 group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-all duration-300 shadow-lg tracking-widest">
                  {cert.year}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{cert.name}</h3>
                <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">{cert.issuer}</p>
              </SpotlightCard>
            ))}
          </motion.div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="tech-stack" className="max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="max-w-2xl mx-auto mb-16">
            <div className="overflow-hidden pb-2">
              <motion.h2 variants={revealVariants} className="text-3xl md:text-5xl font-bold text-white mb-6">Technologies</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto mb-10"></motion.div>

            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4 mb-16">
              {['Metasploit', 'Wireshark', 'Nmap', 'DBMS', 'Data Structures & Algorithms'].map(tag => (
                <span key={tag} className="px-6 py-3 bg-[#111] border border-gray-800 text-gray-400 rounded-full text-sm font-medium hover:text-green-400 hover:border-green-500/50 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {TECH_STACK.map((tech, idx) => (
              <SpotlightCard key={idx} className="p-8 rounded-2xl border border-transparent hover:border-gray-800 transition-colors flex flex-col items-center">
                <img src={tech.src} alt={tech.name} className="h-14 w-14 mb-4 filter grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:drop-shadow-[0_10px_10px_rgba(34,197,94,0.3)]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{tech.name}</span>
              </SpotlightCard>
            ))}
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-32 bg-gray-900/20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="max-w-2xl mb-16">
            <div className="overflow-hidden pb-2">
              <motion.h2 variants={revealVariants} className="text-3xl md:text-5xl font-bold text-white mb-6">Projects</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mb-6"></motion.div>
            <motion.p variants={fadeIn} className="text-gray-400 text-lg">Key projects spanning Cloud Infrastructure, Machine Learning, and Software Security.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {PROJECTS.map((project, i) => (
              <SpotlightCard
                key={i}
                className="p-8 bg-[#111] border border-gray-800 hover:border-green-500/50 transition-all duration-500 flex flex-col rounded-xl hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.2)]"
              >
                <div className="absolute top-4 right-6 text-6xl font-black text-gray-800/30 group-hover:text-green-500/10 transition-colors duration-500">
                  0{i + 1}
                </div>

                <div className="relative z-10 flex flex-col h-full mt-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300 pr-8">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-grow mb-8 group-hover:text-gray-300 transition-colors duration-300">{project.desc}</p>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-green-500 hover:text-green-400 transition-colors w-max mt-auto uppercase tracking-wider">
                    View Project <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="bg-[#111] border border-gray-800 p-10 md:p-20 text-center relative rounded-3xl shadow-2xl">

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="overflow-hidden pb-2">
                <motion.h2 variants={revealVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to secure your network?</motion.h2>
              </div>
              <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto mb-10"></motion.div>

              <motion.form variants={fadeIn} action="https://formspree.io/f/xpqekgow" method="POST" className="flex flex-col gap-6 max-w-md mx-auto text-left">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-green-500 transition-colors">Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-5 py-4 bg-black border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300" />
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-green-500 transition-colors">Email Address</label>
                  <input type="email" id="email" name="email" required className="w-full px-5 py-4 bg-black border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300" />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-green-500 transition-colors">Message</label>
                  <textarea id="message" name="message" required rows={4} className="w-full px-5 py-4 bg-black border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 resize-none"></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-4 mt-4 font-bold text-white bg-green-600 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] rounded transition-all uppercase tracking-wider"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-black py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Shrivatsa. All rights reserved.</div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/ShrivatsaDeshpande" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors text-gray-400">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/shrivatsadeshpande/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors text-gray-400">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="mailto:shrivatsadeshpande11@gmail.com" className="hover:text-green-500 transition-colors text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-6 h-6"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
