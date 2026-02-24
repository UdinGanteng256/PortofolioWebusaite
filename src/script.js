// script.js - Enhanced GSAP Animations

// Check if GSAP is available
if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Section Animations
    window.addEventListener("load", () => {
        // Hero content animation
        gsap.from(".hero-content h1", {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        });

        gsap.from(".hero-content p", {
            opacity: 0,
            y: 30,
            delay: 0.4,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".hero-content .cta-button", {
            opacity: 0,
            scale: 0.8,
            delay: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    });

    // About Section Animations
    gsap.from(".about-section .section-header", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".profile-container", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(1.7)"
    });

    gsap.from(".location-badge", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 20,
        delay: 0.3,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".about-intro", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".about-description p", {
        scrollTrigger: {
            trigger: ".about-description",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".expertise-item", {
        scrollTrigger: {
            trigger: ".about-expertise",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".about-text .social-links a", {
        scrollTrigger: {
            trigger: ".about-text .social-links",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
    });

    // Tech Stack Section Animations
    gsap.from(".tech-stack-section .section-header", {
        scrollTrigger: {
            trigger: ".tech-stack-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".tech-category", {
        scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    });

    // Repositories Section Animations
    gsap.from(".repos-section .section-header", {
        scrollTrigger: {
            trigger: ".repos-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".repo-card", {
        scrollTrigger: {
            trigger: ".repos-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".github-profile-btn", {
        scrollTrigger: {
            trigger: ".github-stats",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out"
    });

    // Games Section Animations
    gsap.from(".games-section h2", {
        scrollTrigger: {
            trigger: ".games-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".game-card", {
        scrollTrigger: {
            trigger: ".game-cards",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Contact Section Animations
    gsap.from(".contact-section .section-header", {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".contact-description", {
        scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        delay: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".contact-card", {
        scrollTrigger: {
            trigger: ".contact-links",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".contact-cta", {
        scrollTrigger: {
            trigger: ".contact-cta",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)"
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScroll = currentScroll;
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for nebula
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const nebulas = document.querySelectorAll('.nebula');

    nebulas.forEach((nebula, index) => {
        const speed = 0.1 + (index * 0.05);
        nebula.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* =========================================
   CUSTOM CURSOR & MICRO-INTERACTIONS
   ========================================= */

const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

if (cursorDot && cursorRing) {
    // 1. Move Cursor
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Ring follows with slight delay
        cursorRing.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    // 2. Hover Effects (Links & Buttons)
    const interactables = document.querySelectorAll("a, button, .game-card, .tech-category, .expertise-item, .repo-card");

    interactables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            if (el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button") {
                document.body.classList.add("cursor-hover");
            } else {
                document.body.classList.add("cursor-link");
            }
        });

        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover", "cursor-link");
        });
    });

    // 3. Magnetic Buttons Effect
    const magneticElements = document.querySelectorAll(".cta-button, .social-link, .contact-card");

    magneticElements.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate mouse position relative to center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move element slightly towards mouse (strength: 0.3)
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        // Reset transform on mouse leave
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0px, 0px)";
        });
    });
}
