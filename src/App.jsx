import { useState, useEffect } from "react";
import gsap from "gsap";
import Antigravity from "./components/Antigravity";
import LogoLoop from "./components/LogoLoop";
import Lanyard from "./components/Lanyard";
import TextType from "./components/TextType";
import TextCursor from "./components/TextCursor";
import QualityToggle from "./components/QualityToggle";
import Terminal from "./components/Terminal";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiUnity,
  SiSharp,
  SiBlender,
  SiHtml5,
  SiCss3,
  SiGithub,
  SiInstagram,
} from "react-icons/si";
import {
  Mail,
  MapPin,
  ChevronDown,
  Code,
  Palette,
  Wrench,
  Gamepad2,
  ArrowRight,
  ExternalLink,
  Folder,
  Calendar,
  User,
  Music,
  Moon,
  Sun,
} from "lucide-react";

const techLogosFrontend = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
];

const techLogosBackend = [
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiUnity />, title: "Unity", href: "https://unity.com" },
  { node: <SiSharp />, title: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
  { node: <SiBlender />, title: "Blender", href: "https://www.blender.org" },
];

const expertiseItems = [
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Building immersive gaming experiences",
  },
  {
    icon: Code,
    title: "Full Stack Programming",
    description: "End-to-end web application development",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive, beautiful interfaces",
  },
  {
    icon: Wrench,
    title: "Creative Tools",
    description: "Proficient in industry-standard tools",
  },
];

function HomePage({ onGetInTouch }) {
  return (
    <section className="page-section hero-section">
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -10, pointerEvents: "none" }}>
        <Antigravity
          color={["#FF0000", "#FFFF00", "#00FF00", "#0000FF"]}
          count={2000}
          particleSize={0.2}
          particleVariance={1.2}
          waveAmplitude={2.2}
        />
      </div>

      <div className="hero-content">
        <p className="hero-role">
          <span className="hero-role-bracket">[</span>
          &nbsp;Game Developer &amp; Full Stack Programmer&nbsp;
          <span className="hero-role-bracket">]</span>
        </p>
        <h1>
          <TextType
            typingSpeed={72}
            pauseDuration={1600}
            showCursor
            cursorCharacter="_"
            texts={[
              "Welcome",
              "to my portfolio👋🏻",
              "Step to another world",
            ]}
            deletingSpeed={45}
            variableSpeedEnabled={false}
            variableSpeedMin={60}
            variableSpeedMax={120}
            cursorBlinkDuration={0.5}
          />
        </h1>
        <p className="hero-tagline">
          Crafting digital experiences that bridge technology and creativity
        </p>
        <div className="hero-actions">
          <button className="cta-button" onClick={onGetInTouch}>
            Get in Touch
          </button>
          <div className="hero-scroll-hint">
            <span>scroll to explore</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage({ isDarkMode }) {
  return (
    <section className="page-section about-section">
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p className="section-subtitle">
            Game Developer &amp; Full Stack Programmer
          </p>
        </div>

        <div className="about-content">
          <div className="about-image">
            <div
              className="lanyard-container"
              style={{
                width: "100%",
                height: "500px",
                position: "relative",
                borderRadius: "20px",
                overflow: "visible",
              }}
            >
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={25} isDarkMode={isDarkMode} />
            </div>
            <div className="location-badge">
              <MapPin size={16} />
              <span>Jakarta Timur</span>
            </div>
          </div>

          <div className="about-text">
            <div className="about-intro">
              <h3>Muhammad Pathih Bataviant</h3>
              <p className="role-badge">
                Student at Politeknik Negeri Media Kreatif — Game Technology
              </p>
            </div>

            <div className="about-description">
              <p>
                I'm passionate about{" "}
                <span className="highlight">
                  crafting engaging digital experiences
                </span>{" "}
                that bridge technology and creativity. Based in Jakarta Timur,
                I'm currently pursuing Game Technology at Politeknik Negeri
                Media Kreatif, where I combine technical expertise with artistic
                vision.
              </p>
              <p>
                When I'm not designing interfaces or building games, you'll find
                me experimenting in the kitchen, training at the gym, or exploring
                the latest in tech and design.
              </p>
            </div>

            <div className="about-expertise">
              {expertiseItems.map((item, index) => (
                <div className="expertise-item" key={index}>
                  <div className="expertise-icon">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="expertise-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <a
                href="https://github.com/UdinGanteng256"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="GitHub"
              >
                <SiGithub size={20} />
              </a>
              <a
                href="https://instagram.com/fortune.tihh"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="Instagram"
              >
                <SiInstagram size={20} />
              </a>
              <a
                href="mailto:muhammadpathih@gmail.com"
                className="social-link"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">
                  10<span className="stat-plus">+</span>
                </span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-num">
                  8<span className="stat-plus">+</span>
                </span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-num">
                  2<span className="stat-plus">+</span>
                </span>
                <span className="stat-label">Years Coding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackPage({ isDarkMode }) {
  const fadeColor = isDarkMode ? "#000000" : "#fdf6e3";
  return (
    <section className="page-section tech-stack-section">
      <div className="container">
        <div className="section-header">
          <h2>Tech Stack</h2>
          <p className="section-desc">Technologies I work with</p>
        </div>

        <div style={{ display: "block", overflow: "hidden", padding: "40px 0" }}>
          <LogoLoop
            logos={techLogosFrontend}
            speed={25}
            direction="left"
            logoHeight={65}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor={fadeColor}
            ariaLabel="Frontend tech stack"
          />
          <div style={{ height: "50px" }} />
          <LogoLoop
            logos={techLogosBackend}
            speed={25}
            direction="right"
            logoHeight={65}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor={fadeColor}
            ariaLabel="Backend and architecture tech stack"
          />
        </div>

        <div className="tech-logos-section">
          <p className="tech-logos-label">Technologies I use</p>
          <div className="tech-logos-grid">
            {[...techLogosFrontend, ...techLogosBackend].map((tech, index) => (
              <a
                key={index}
                href={tech.href}
                target="_blank"
                rel="noreferrer"
                className="tech-logo-item"
                title={tech.title}
              >
                {tech.node}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="page-section contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Let's Create Together</h2>
          <p className="section-subtitle">
            Available for freelance projects and collaborations
          </p>
        </div>

        <div className="contact-content">
          <p className="contact-description">
            Have an idea in mind? Let's build something extraordinary. Reach out
            and I'll get back to you as soon as possible.
          </p>

          <div className="contact-links">
            <a
              href="mailto:muhammadpathih@gmail.com"
              className="contact-card"
            >
              <div className="contact-icon">
                <Mail size={20} />
              </div>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">muhammadpathih@gmail.com</span>
              </div>
            </a>

            <a
              href="https://instagram.com/fortune.tihh"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <SiInstagram size={20} />
              </div>
              <div className="contact-info">
                <span className="contact-label">Instagram</span>
                <span className="contact-value">@fortune.tihh</span>
              </div>
            </a>

            <a
              href="https://github.com/UdinGanteng256"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <SiGithub size={20} />
              </div>
              <div className="contact-info">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">UdinGanteng256</span>
              </div>
            </a>
          </div>

          <a
            href="mailto:muhammadpathih@gmail.com"
            className="cta-button contact-cta"
          >
            <span>Get in Touch</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageKey, setPageKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigateTo = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    setPageKey((prev) => prev + 1);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) {
      gsap.set(".nav-links li", { opacity: 0, y: -20 });
      gsap.to(".nav-links li", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    const bgMusic = document.getElementById("bg-music");
    if (!bgMusic) return;

    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      setIsPlaying(true);
    } else {
      bgMusic.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">fatihgateng01</div>
        <div className="nav-right">
          <ul className={`nav-links${mobileMenuOpen ? " mobile-open" : ""}`}>
            <li>
              <a
                href="#about"
                className={currentPage === "about" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("about");
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#tech-stack"
                className={currentPage === "tech-stack" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("tech-stack");
                }}
              >
                Tech Stack
              </a>
            </li>
            <li>
              <a
                href="#terminal"
                className={currentPage === "terminal" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("terminal");
                }}
              >
                Terminal
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={currentPage === "contact" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          <div
            className={`hamburger${mobileMenuOpen ? " open" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <div className="music-player">
        <button id="music-toggle" className="music-btn" onClick={toggleMusic}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>
          ) : (
            <Music size={16} />
          )}
        </button>
        <div className={`music-info ${isPlaying ? 'visible' : ''}`} style={{
          opacity: isPlaying ? 1 : 0,
          transform: isPlaying ? 'translateX(0)' : 'translateX(20px)',
          transition: 'all 0.35s ease'
        }}>
          <span className="music-title">Chopin - Nocturne</span>
          <div className="music-visualizer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <audio id="bg-music" loop>
          <source
            src="Chopin - Nocturne op.9 No.2 - andrea romano (youtube).mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>

      <div className="page-wrapper" key={pageKey}>
        {currentPage === "home" && (
          <HomePage onGetInTouch={() => navigateTo("about")} />
        )}
        {currentPage === "about" && <AboutPage isDarkMode={isDarkMode} />}
        {currentPage === "tech-stack" && <TechStackPage isDarkMode={isDarkMode} />}
        {currentPage === "terminal" && <Terminal />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      <footer>
        <p>2026 Muhammad Pathih. All rights reserved.</p>
      </footer>

      <QualityToggle />
    </>
  );
}

export default App;