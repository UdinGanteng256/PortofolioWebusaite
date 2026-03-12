import { useState, useEffect } from "react";
import gsap from "gsap";
import "swiper/css/bundle";
import Antigravity from "./components/Antigravity";
import LogoLoop from "./components/LogoLoop";
import TextCursor from "./components/TextCursor";
import TextType from "./components/TextType";
import ModelViewer from "./components/ModelViewer";
import QualityToggle from "./components/QualityToggle";
import Lanyard from "./components/Lanyard";
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
} from "react-icons/si";

const techLogosFrontend = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiHtml5 />,
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    node: <SiCss3 />,
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
];

const techLogosBackend = [
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiUnity />, title: "Unity", href: "https://unity.com" },
  {
    node: <SiSharp />,
    title: "C#",
    href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  { node: <SiBlender />, title: "Blender", href: "https://www.blender.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
];

const PAGE_LABELS = {
  home: "Home",
  about: "About",
  "tech-stack": "Tech Stack",
  repositories: "Repositories",
  games: "Games",
  models: "3D Models",
  contact: "Contact",
};

const PAGES = Object.keys(PAGE_LABELS);

/* =========================================
   Home Page — Hero / Welcome
   ========================================= */
function HomePage({ onGetInTouch }) {
  return (
    <section className="page-section hero-section">
      {/* Decorative visual layer */}
      <div className="hero-deco" aria-hidden="true">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-ring hero-ring-3" />
        <div className="hero-corner hero-corner-tl" />
        <div className="hero-corner hero-corner-tr" />
        <div className="hero-corner hero-corner-bl" />
        <div className="hero-corner hero-corner-br" />
        <div className="hero-scanlines" />
        <div className="hero-dot-grid" />
      </div>

      <div className="hero-content">
        <p className="hero-role">
          <span className="hero-role-bracket">[</span>
          &nbsp;Game Developer &amp; Full Stack Programmer&nbsp;
          <span className="hero-role-bracket">]</span>
        </p>
        <h1>
          <span className="text-mask">
            <TextType
              typingSpeed={72}
              pauseDuration={1600}
              showCursor
              cursorCharacter="_"
              texts={[
                "Welcome",
                "this my portfolio👋🏻",
                "Step to another world",
              ]}
              deletingSpeed={45}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
            />
          </span>
        </h1>
        <p className="hero-tagline">
          Explore the universe of adventure and fantasy
        </p>
        <div className="hero-actions">
          <button className="cta-button" onClick={onGetInTouch}>
            Get in Touch
          </button>
          <div className="hero-scroll-hint">
            <span>scroll to explore</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   About Page — About Me
   ========================================= */
function AboutPage() {
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
            {/* Interactive Lanyard Canvas sits in the left column */}
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
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={25} />
            </div>
            <div
              className="location-badge"
              style={{ marginTop: "-20px", position: "relative", zIndex: 2 }}
            >
              <i className="fas fa-map-marker-alt"></i>
              <span>Jakarta Timur</span>
            </div>
          </div>
          <div className="about-text">
            <div className="about-intro">
              <h3>Muhammad Pathih</h3>
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
                me{" "}
                <span className="highlight-alt">
                  experimenting in the kitchen
                </span>
                , <span className="highlight-alt">training at the gym</span>, or
                exploring the latest in tech and design.
              </p>
            </div>
            <div className="about-expertise">
              <div className="expertise-item">
                <span className="expertise-icon">🎮</span>
                <div className="expertise-info">
                  <h4>Game Development</h4>
                  <p>Building immersive gaming experiences</p>
                </div>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">💻</span>
                <div className="expertise-info">
                  <h4>Full Stack Programming</h4>
                  <p>End-to-end web application development</p>
                </div>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">🎨</span>
                <div className="expertise-info">
                  <h4>UI/UX Design</h4>
                  <p>Crafting intuitive, beautiful interfaces</p>
                </div>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">🛠️</span>
                <div className="expertise-info">
                  <h4>Creative Tools</h4>
                  <p>Proficient in industry-standard tools</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a
                href="https://github.com/UdinGanteng256"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://instagram.com/fortune.tihh"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="mailto:muhammadpathih@gmail.com"
                className="social-link"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a
                href="tel:+6281292520891"
                className="social-link"
                title="Phone"
              >
                <i className="fas fa-phone"></i>
              </a>
            </div>

            {/* Stats Row */}
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

/* =========================================
   Tech Stack Page
   ========================================= */
function TechStackPage() {
  return (
    <section className="page-section tech-stack-section">
      <div className="container">
        <h2>Tech Stack</h2>
        <p className="section-desc">Technologies I work with</p>
        <div
          className="tech-grid"
          style={{ display: "block", overflow: "hidden", padding: "40px 0" }}
        >
          <LogoLoop
            logos={techLogosFrontend}
            speed={25}
            direction="left"
            logoHeight={65}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#fdf6e3"
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
            fadeOutColor="#fdf6e3"
            ariaLabel="Backend and architecture tech stack"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================
   Repositories Page
   ========================================= */
function RepositoriesPage() {
  return (
    <section className="page-section repos-section">
      <div className="container">
        <h2>Repositories</h2>
        <p className="section-desc">Check out my projects on GitHub</p>
        <div className="repos-grid">
          <div className="repo-card">
            <div className="repo-header">
              <h3>
                <i className="fas fa-folder"></i> my-ecommerce-
              </h3>
              <a
                href="https://github.com/UdinGanteng256/my-ecommerce-"
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <p>E-commerce project built with JavaScript</p>
            <div className="repo-footer">
              <span className="repo-lang">
                <i className="fas fa-circle"></i> JavaScript
              </span>
              <span className="repo-date">Feb 21, 2026</span>
            </div>
          </div>
          <div className="repo-card">
            <div className="repo-header">
              <h3>
                <i className="fas fa-folder"></i> Rich-in-The-Dungeon-pt-2
              </h3>
              <a
                href="https://github.com/UdinGanteng256/Rich-in-The-Dungeon-pt-2"
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <p>GIMJAMUTB 2026 - Dungeon Adventure Game</p>
            <div className="repo-footer">
              <span className="repo-lang">
                <i className="fas fa-circle" style={{ color: "#68217a" }}></i>{" "}
                C#
              </span>
              <span className="repo-date">Jan 30, 2026</span>
            </div>
          </div>
          <div className="repo-card">
            <div className="repo-header">
              <h3>
                <i className="fas fa-folder"></i> Kalkulator-Buku-Bazar
              </h3>
              <a
                href="https://github.com/UdinGanteng256/Kalkulator-Buku-Bazar"
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <p>Book Store Calculator</p>
            <div className="repo-footer">
              <span className="repo-lang">
                <i className="fas fa-circle" style={{ color: "#f7df1e" }}></i>{" "}
                JavaScript
              </span>
              <span className="repo-date">Aug 12, 2025</span>
            </div>
          </div>
          <div className="repo-card">
            <div className="repo-header">
              <h3>
                <i className="fas fa-folder"></i> Belanja_Sembako
              </h3>
              <a
                href="https://github.com/UdinGanteng256/Belanja_Sembako"
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <p>HTML Grocery Shopping Template</p>
            <div className="repo-footer">
              <span className="repo-lang">
                <i className="fas fa-circle" style={{ color: "#e34c26" }}></i>{" "}
                HTML
              </span>
              <span className="repo-date">Oct 3, 2024</span>
            </div>
          </div>
        </div>
        <div className="github-stats">
          <a
            href="https://github.com/UdinGanteng256"
            target="_blank"
            rel="noreferrer"
            className="github-profile-btn"
          >
            <i className="fab fa-github"></i> View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   Games Page
   ========================================= */
function GamesPage() {
  return (
    <section className="page-section games-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Games</h2>
          <p className="section-subtitle">
            Games I&apos;ve built &amp; shipped
          </p>
        </div>

        {/* Game Banner — Rich in The Dungeon */}
        <div className="game-banner">
          <div className="game-banner-visual">
            <div className="game-banner-glow" />
            <div className="game-banner-grid" />
            <i className="fas fa-dungeon" />
          </div>
          <div className="game-banner-info">
            <div className="game-tags">
              <span className="game-tag">Dungeon Crawler</span>
              <span className="game-tag">Unity</span>
              <span className="game-tag">C#</span>
              <span className="game-tag">Jam Entry</span>
            </div>
            <h3 className="game-banner-title">Rich in The Dungeon</h3>
            <p className="game-banner-desc">
              A dungeon crawler adventure built in 48 hours for GIMJAMUTB 2026.
              Navigate procedural rooms, defeat enemies, and collect loot to
              survive the depths — featuring hand-crafted mechanics and original
              level design.
            </p>
            <div className="game-banner-meta">
              <span>
                <i className="fas fa-user"></i>&nbsp;Solo Dev
              </span>
              <span>
                <i className="fas fa-calendar-alt"></i>&nbsp;Jan 2026
              </span>
              <span>
                <i className="fas fa-trophy"></i>&nbsp;GIMJAMUTB 2026
              </span>
            </div>
            <a
              href="https://cecep271.itch.io/ritd"
              target="_blank"
              rel="noreferrer"
              className="game-play-btn"
            >
              <i className="fas fa-play"></i>&nbsp; Play on itch.io
            </a>
          </div>
        </div>

        {/* More games coming soon */}
        <div className="games-coming-soon">
          <i className="fas fa-code"></i>
          <p>More games in development — stay tuned.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   3D Models Page
   ========================================= */
function ModelsPage() {
  return (
    <section className="page-section models-section">
      <div className="container">
        <div className="section-header">
          <h2>3D Models</h2>
          <p className="section-subtitle">
            Interactive 3D assets &amp; game models
          </p>
        </div>
        <div className="models-grid">
          <ModelViewer
            modelUrl="/models/duck.glb"
            title="Classic Duck Model"
            description="A classic 3D test model rendered in real-time. Demonstrates PBR materials, lighting, and shadow rendering. Drag to rotate, scroll to zoom."
            environment="city"
            height="350px"
          />
          <ModelViewer
            modelUrl="/models/sphere.glb"
            title="Material Showcase"
            description="High-detail 3D model showcasing material variants and surface details. Perfect example of production-ready game assets with optimized topology."
            environment="sunset"
            height="350px"
          />
          <ModelViewer
            modelUrl="/models/box.glb"
            title="Simple Geometry"
            description="Clean, low-poly cube demonstrating efficient topology. Perfect example of modular game assets that can be combined to create complex environments."
            environment="night"
            height="350px"
          />
        </div>
        <div className="models-note">
          <i className="fas fa-info-circle"></i>
          <p>
            <strong>These are free CC0 models</strong> from the{" "}
            <a
              href="https://github.com/KhronosGroup/glTF-Sample-Models"
              target="_blank"
              rel="noreferrer"
            >
              Khronos Group Sample Models
            </a>
            . Want to add your own? Export from Blender/Maya as .glb, place in{" "}
            <code>/public/models/</code>, and update the modelUrl prop. Find
            more free models at{" "}
            <a href="https://polyhaven.com" target="_blank" rel="noreferrer">
              Poly Haven
            </a>
            ,{" "}
            <a href="https://kenney.nl/assets" target="_blank" rel="noreferrer">
              Kenney.nl
            </a>
            , or{" "}
            <a href="https://sketchfab.com" target="_blank" rel="noreferrer">
              Sketchfab
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   Contact Page
   ========================================= */
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
            <a href="mailto:muhammadpathih@gmail.com" className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">muhammadpathih@gmail.com</span>
              </div>
            </a>
            <a href="tel:+6281292520891" className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-info">
                <span className="contact-label">Phone</span>
                <span className="contact-value">+62 812-9252-0891</span>
              </div>
            </a>
            <a
              href="https://instagram.com/fortune.tihh"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <i className="fab fa-instagram"></i>
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
                <i className="fab fa-github"></i>
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
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   Main App
   ========================================= */
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageKey, setPageKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    setPageKey((prev) => prev + 1);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Navbar entry animation
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

  // Navbar scroll effect
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

  // Music Player
  const toggleMusic = () => {
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    const musicInfo = document.querySelector(".music-info");
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      musicInfo.style.opacity = "1";
      musicInfo.style.transform = "translateX(0)";
    } else {
      bgMusic.pause();
      musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      musicInfo.style.opacity = "0";
      musicInfo.style.transform = "translateX(20px)";
    }
  };

  return (
    <>
      {/* Particle Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
          pointerEvents: "none",
        }}
      >
        <Antigravity
          color={["#FF0000", "#FFFF00", "#00FF00", "#0000FF"]}
          count={2000}
          particleSize={0.2}
          particleVariance={1.2}
          waveAmplitude={2.2}
        />
      </div>

      {/* Custom Interactive Text Cursor */}
      <TextCursor
        text="asdfghjkzxcvbnmlopoiuytrewq1234567890"
        spacing={80}
        followMouseDirection
        randomFloat
        exitDuration={0.3}
        removalInterval={20}
        maxPoints={10}
      />

      {/* Music Player */}
      <div className="music-player">
        <button id="music-toggle" className="music-btn" onClick={toggleMusic}>
          <i className="fas fa-music"></i>
        </button>
        <div className="music-info">
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

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">fatihgateng01</div>
        <ul className={`nav-links${mobileMenuOpen ? " mobile-open" : ""}`}>
          {PAGES.map((page) => (
            <li key={page}>
              <a
                href={`#${page}`}
                className={currentPage === page ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(page);
                }}
              >
                {PAGE_LABELS[page]}
              </a>
            </li>
          ))}
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
      </nav>

      {/* Page Content — key triggers remount + fade-in animation */}
      <div className="page-wrapper" key={pageKey}>
        {currentPage === "home" && (
          <HomePage onGetInTouch={() => navigateTo("about")} />
        )}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "tech-stack" && <TechStackPage />}
        {currentPage === "repositories" && <RepositoriesPage />}
        {currentPage === "games" && <GamesPage />}
        {currentPage === "models" && <ModelsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Aurion. All rights reserved.</p>
      </footer>

      {/* Quality Settings Toggle */}
      <QualityToggle />
    </>
  );
}

export default App;
