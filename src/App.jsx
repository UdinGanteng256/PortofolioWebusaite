import { useEffect } from 'react';
import gsap from 'gsap';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Antigravity from './components/Antigravity';
import LogoLoop from './components/LogoLoop';
import TextCursor from './components/TextCursor';
import GradualBlur from './components/GradualBlur';
import TextType from './components/TextType';
import ModelViewer from './components/ModelViewer';
import QualityToggle from './components/QualityToggle';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiDocker, SiUnity, SiSharp, SiBlender, SiHtml5, SiCss3 } from 'react-icons/si';

const techLogosFrontend = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" }
];

const techLogosBackend = [
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
    { node: <SiUnity />, title: "Unity", href: "https://unity.com" },
    { node: <SiSharp />, title: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { node: <SiBlender />, title: "Blender", href: "https://www.blender.org" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" }
];

/* =========================================
   Helper to initialize GSAP and Interactions
   ========================================= */
const usePortfolioLogic = () => {
    useEffect(() => {
        // ---- GSAP Animations (Migrated from script.js) ---- //
        
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initial setup for GSAP
        gsap.set(".nav-links li", { opacity: 0, y: -20 });
        gsap.set(".hero-content h1", { opacity: 0, y: 30 });
        gsap.set(".hero-content p", { opacity: 0, y: 30 });
        gsap.set(".hero-content .cta-button", { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline();

        // Respect reduced motion preference
        if (prefersReducedMotion) {
            gsap.set(".nav-links li", { opacity: 1, y: 0 });
            gsap.set(".hero-content h1", { opacity: 1, y: 0 });
            gsap.set(".hero-content p", { opacity: 1, y: 0 });
            gsap.set(".hero-content .cta-button", { opacity: 1, scale: 1 });
        } else {
            // Navbar animation
            tl.to(".nav-links li", {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            })
                // Hero content animation
                .to(".hero-content h1", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.2")
                .to(".hero-content p", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .to(".hero-content .cta-button", {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.4");
        }

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate tech cards when section is visible
                    if (entry.target.classList.contains('tech-category')) {
                        gsap.to(entry.target.querySelectorAll('.tech-item'), {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "back.out(1.2)"
                        });
                    }

                    // Animate repo cards when section is visible
                    if (entry.target.classList.contains('repos-grid')) {
                        gsap.to(entry.target.querySelectorAll('.repo-card'), {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.15,
                            ease: "power2.out"
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.section-header, .about-content, .tech-category, .repos-grid, .game-card, .contact-content').forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });

        // Setup initial state for elements to be animated
        gsap.set('.tech-item', { opacity: 0, y: 20, scale: 0.9 });
        gsap.set('.repo-card', { opacity: 0, y: 30 });

        // ---- Custom Cursor & Micro-Interactions ---- //

        // 1. Hover Effects (Links & Buttons)
        const interactables = document.querySelectorAll("a, button, .game-card, .tech-category, .expertise-item, .repo-card");

        const handleMouseEnter = (e) => {
            const el = e.currentTarget;
            if (el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button") {
                document.body.classList.add("cursor-hover");
            } else {
                document.body.classList.add("cursor-link");
            }
        };
        const handleMouseLeave = () => {
            document.body.classList.remove("cursor-hover", "cursor-link");
        };

        interactables.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // 2. Magnetic Buttons Effect
        const magneticElements = document.querySelectorAll(".cta-button, .social-link, .contact-card, .repo-card");

        const handleMagneticMove = (e) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        };
        const handleMagneticLeave = (e) => {
            e.currentTarget.style.transform = "translate(0px, 0px)";
        };

        magneticElements.forEach((el) => {
            el.addEventListener("mousemove", handleMagneticMove);
            el.addEventListener("mouseleave", handleMagneticLeave);
        });

        // Cleanup event listeners when component unmounts
        return () => {
            interactables.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            magneticElements.forEach(el => {
                el.removeEventListener("mousemove", handleMagneticMove);
                el.removeEventListener("mouseleave", handleMagneticLeave);
            });
            observer.disconnect();
        };
    }, []);
};

function App() {
    usePortfolioLogic();

    // Setup navbar scroll effect and active link targeting
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Highlight active nav link
            let current = "";
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Music Player Toggler
    const toggleMusic = () => {
        const bgMusic = document.getElementById('bg-music');
        const musicBtn = document.getElementById('music-toggle');
        const musicInfo = document.querySelector('.music-info');

        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log('Autoplay blocked'));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicInfo.style.opacity = '1';
            musicInfo.style.transform = 'translateX(0)';
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicInfo.style.opacity = '0';
            musicInfo.style.transform = 'translateX(20px)';
        }
    };

    return (
        <>
            {/* New React Three Fiber Background */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, pointerEvents: 'none' }}>
                <Antigravity
                    color={['#fff838', '#f9fb79', '#f4ffa3']}
                    count={400}
                    particleVariance={1}
                    waveAmplitude={2}
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
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>
                <audio id="bg-music" loop>
                    <source src="Chopin - Nocturne op.9 No.2 - andrea romano (youtube).mp3" type="audio/mpeg" />
                </audio>
            </div>

            {/* Navigation */}
            <nav className="navbar">
                <div className="logo">fatihgateng01</div>
                <ul className="nav-links">
                    <li><a href="#home" className="active">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#tech-stack">Tech Stack</a></li>
                    <li><a href="#repositories">Repositories</a></li>
                    <li><a href="#games">Games</a></li>
                    <li><a href="#models">3D Models</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            {/* Home Section */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <h1>
                        <TextType
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor
                            cursorCharacter="_"
                            texts={["Welcome", " this is my website portofolio👋🏻", "Step into another world"]}
                            deletingSpeed={50}
                            variableSpeedEnabled={false}
                            variableSpeedMin={60}
                            variableSpeedMax={120}
                            cursorBlinkDuration={0.5}
                        />
                    </h1>
                    <p>Explore the universe of adventure and fantasy</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <div className="section-header">
                        <h2>About Me</h2>
                        <p className="section-subtitle">Game Developer & UI/UX Designer</p>
                    </div>
                    <div className="about-content">
                        <div className="about-image">
                            <div className="profile-container">
                                <div className="profile-glow"></div>
                                <img src="/foto-diri.jpeg" alt="Muhammad Pathih" className="profile-placeholder" />
                            </div>
                            <div className="location-badge">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>Jakarta Timur</span>
                            </div>
                        </div>
                        <div className="about-text">
                            <div className="about-intro">
                                <h3>Muhammad Pathih</h3>
                                <p className="role-badge">Student at Politeknik Negeri Media Kreatif — Game Technology</p>
                            </div>
                            <div className="about-description">
                                <p>I'm passionate about <span className="highlight">crafting engaging digital experiences</span>
                                    that bridge technology and creativity. Based in Jakarta Timur, I'm currently pursuing Game
                                    Technology at Politeknik Negeri Media Kreatif, where I combine technical expertise with
                                    artistic vision.</p>
                                <p>When I'm not designing interfaces or building games, you'll find me <span
                                    className="highlight-alt">experimenting in the kitchen</span>, <span
                                        className="highlight-alt">training at the gym</span>, or exploring the latest in tech and
                                    design.</p>
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
                                    <span className="expertise-icon">🎨</span>
                                    <div className="expertise-info">
                                        <h4>UI/UX Design</h4>
                                        <p>Crafting intuitive, beautiful interfaces</p>
                                    </div>
                                </div>
                                <div className="expertise-item">
                                    <span className="expertise-icon">💻</span>
                                    <div className="expertise-info">
                                        <h4>Frontend Development</h4>
                                        <p>Creating responsive web applications</p>
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
                                <a href="https://github.com/UdinGanteng256" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://instagram.com/fortune.tihh" target="_blank" rel="noreferrer" className="social-link"
                                    title="Instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="mailto:muhammadpathih@gmail.com" className="social-link" title="Email">
                                    <i className="fas fa-envelope"></i>
                                </a>
                                <a href="tel:+6281292520891" className="social-link" title="Phone">
                                    <i className="fas fa-phone"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section id="tech-stack" className="tech-stack-section">
                <div className="container">
                    <h2>Tech Stack</h2>
                    <p className="section-desc">Technologies I work with</p>

                    <div className="tech-grid" style={{ display: 'block', overflow: 'hidden', padding: '40px 0' }}>
                        <LogoLoop
                            logos={techLogosFrontend}
                            speed={25}
                            direction="left"
                            logoHeight={65}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#000000"
                            ariaLabel="Frontend tech stack"
                        />
                        <div style={{ height: '50px' }} />
                        <LogoLoop
                            logos={techLogosBackend}
                            speed={25}
                            direction="right"
                            logoHeight={65}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#000000"
                            ariaLabel="Backend and architecture tech stack"
                        />
                    </div>
                </div>
            </section>

            {/* Repositories Section */}
            <section id="repositories" className="repos-section">
                <div className="container">
                    <h2>Repositories</h2>
                    <p className="section-desc">Check out my projects on GitHub</p>

                    <div className="repos-grid">
                        <div className="repo-card">
                            <div className="repo-header">
                                <h3><i className="fas fa-folder"></i> my-ecommerce-</h3>
                                <a href="https://github.com/UdinGanteng256/my-ecommerce-" target="_blank" rel="noreferrer" className="repo-link">
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                            <p>E-commerce project built with JavaScript</p>
                            <div className="repo-footer">
                                <span className="repo-lang"><i className="fas fa-circle"></i> JavaScript</span>
                                <span className="repo-date">Feb 21, 2026</span>
                            </div>
                        </div>

                        <div className="repo-card">
                            <div className="repo-header">
                                <h3><i className="fas fa-folder"></i> Rich-in-The-Dungeon-pt-2</h3>
                                <a href="https://github.com/UdinGanteng256/Rich-in-The-Dungeon-pt-2" target="_blank" rel="noreferrer"
                                    className="repo-link">
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                            <p>GIMJAMUTB 2026 - Dungeon Adventure Game</p>
                            <div className="repo-footer">
                                <span className="repo-lang"><i className="fas fa-circle" style={{ color: '#68217a' }}></i> C#</span>
                                <span className="repo-date">Jan 30, 2026</span>
                            </div>
                        </div>

                        <div className="repo-card">
                            <div className="repo-header">
                                <h3><i className="fas fa-folder"></i> Kalkulator-Buku-Bazar</h3>
                                <a href="https://github.com/UdinGanteng256/Kalkulator-Buku-Bazar" target="_blank" rel="noreferrer"
                                    className="repo-link">
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                            <p>Book Store Calculator</p>
                            <div className="repo-footer">
                                <span className="repo-lang"><i className="fas fa-circle" style={{ color: '#f7df1e' }}></i> JavaScript</span>
                                <span className="repo-date">Aug 12, 2025</span>
                            </div>
                        </div>

                        <div className="repo-card">
                            <div className="repo-header">
                                <h3><i className="fas fa-folder"></i> Belanja_Sembako</h3>
                                <a href="https://github.com/UdinGanteng256/Belanja_Sembako" target="_blank" rel="noreferrer" className="repo-link">
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                            <p>HTML Grocery Shopping Template</p>
                            <div className="repo-footer">
                                <span className="repo-lang"><i className="fas fa-circle" style={{ color: '#e34c26' }}></i> HTML</span>
                                <span className="repo-date">Oct 3, 2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="github-stats">
                        <a href="https://github.com/UdinGanteng256" target="_blank" rel="noreferrer" className="github-profile-btn">
                            <i className="fab fa-github"></i> View Full GitHub Profile
                        </a>
                    </div>
                </div>
            </section>

            {/* Games Section */}
            <section id="games" className="games-section">
                <div className="container">
                    <h2>Our Games</h2>
                    <div className="game-cards">
                        <a href="https://cecep271.itch.io/ritd" target="_blank" rel="noreferrer" className="game-card">
                            <i className="fas fa-dungeon"></i>
                            <span>Rich in The Dungeon</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* 3D Models Section */}
            <section id="models" className="models-section">
                <div className="container">
                    <div className="section-header">
                        <h2>3D Models</h2>
                        <p className="section-subtitle">Interactive 3D assets & game models</p>
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
                            <strong>These are free CC0 models</strong> from the <a href="https://github.com/KhronosGroup/glTF-Sample-Models" target="_blank" rel="noreferrer">Khronos Group Sample Models</a>. 
                            Want to add your own? Export from Blender/Maya as .glb, place in <code>/public/models/</code>, and update the modelUrl prop.
                            Find more free models at <a href="https://polyhaven.com" target="_blank" rel="noreferrer">Poly Haven</a>, <a href="https://kenney.nl/assets" target="_blank" rel="noreferrer">Kenney.nl</a>, or <a href="https://sketchfab.com" target="_blank" rel="noreferrer">Sketchfab</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Let's Create Together</h2>
                        <p className="section-subtitle">Available for freelance projects and collaborations</p>
                    </div>
                    <div className="contact-content">
                        <p className="contact-description">Have an idea in mind? Let's build something extraordinary. Reach out and
                            I'll get back to you as soon as possible.</p>
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
                            <a href="https://instagram.com/fortune.tihh" target="_blank" rel="noreferrer" className="contact-card">
                                <div className="contact-icon">
                                    <i className="fab fa-instagram"></i>
                                </div>
                                <div className="contact-info">
                                    <span className="contact-label">Instagram</span>
                                    <span className="contact-value">@fortune.tihh</span>
                                </div>
                            </a>
                            <a href="https://github.com/UdinGanteng256" target="_blank" rel="noreferrer" className="contact-card">
                                <div className="contact-icon">
                                    <i className="fab fa-github"></i>
                                </div>
                                <div className="contact-info">
                                    <span className="contact-label">GitHub</span>
                                    <span className="contact-value">UdinGanteng256</span>
                                </div>
                            </a>
                        </div>
                        <a href="mailto:muhammadpathih@gmail.com" className="cta-button contact-cta">
                            <span>Get in Touch</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 Aurion. All rights reserved.</p>
            </footer>

            {/* Quality Settings Toggle */}
            <QualityToggle />

            {/* Viewport Bottom Gradual Blur */}
            <GradualBlur
                position="bottom"
                height="7rem"
                strength={2}
                divCount={5}
                opacity={1}
                target="page"
                curve="ease-out"
            />
        </>
    );
}

export default App;
