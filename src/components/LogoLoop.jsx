import React from 'react';

const LogoLoop = ({
    logos = [],
    speed = 100,
    direction = "left",
    logoHeight = 60,
    gap = 60,
    hoverSpeed = 0,
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor = "#000000",
    ariaLabel = "Logos",
    useCustomRender = false
}) => {
    const content = (
        <div style={{ display: 'flex', gap: `${gap}px`, alignItems: 'center', padding: `0 ${gap / 2}px` }}>
            {logos.map((logo, i) => (
                <a
                    key={i}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: `${logoHeight}px`,
                        fontSize: `${logoHeight}px`,
                        color: 'var(--neon-green, #39FF14)',
                        textDecoration: 'none',
                        transition: scaleOnHover ? 'transform 0.3s ease' : 'none',
                    }}
                    onMouseEnter={e => scaleOnHover ? e.currentTarget.style.transform = 'scale(1.15)' : null}
                    onMouseLeave={e => scaleOnHover ? e.currentTarget.style.transform = 'scale(1)' : null}
                >
                    {logo.node || (logo.src && <img src={logo.src} alt={logo.alt} style={{ height: '100%', objectFit: 'contain' }} />)}
                </a>
            ))}
        </div>
    );

    return (
        <div style={{ position: 'relative', overflow: 'hidden', width: '100%', display: 'flex' }} aria-label={ariaLabel}>
            {fadeOut && (
                <>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100%', background: `linear-gradient(to right, ${fadeOutColor}, transparent)`, zIndex: 2 }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100%', background: `linear-gradient(to left, ${fadeOutColor}, transparent)`, zIndex: 2 }} />
                </>
            )}
            <div style={{ display: 'flex', animation: `marquee ${speed}s linear infinite ${direction === 'right' ? 'reverse' : 'normal'}` }}>
                {content}
                {content}
                {content}
                {content}
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
};

export default LogoLoop;
