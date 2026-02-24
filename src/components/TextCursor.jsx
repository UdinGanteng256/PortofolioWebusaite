import React, { useState, useEffect, useRef } from 'react';

const TextCursor = ({
    text = "hello",
    spacing = 80,
    followMouseDirection = false,
    randomFloat = false,
    exitDuration = 0.3,
    removalInterval = 20,
    maxPoints = 10
}) => {
    const [points, setPoints] = useState([]);
    const lastPos = useRef({ x: 0, y: 0 });
    const index = useRef(0);

    useEffect(() => {
        const onMouseMove = (e) => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist >= spacing) {
                lastPos.current = { x: e.clientX, y: e.clientY };
                const angle = Math.atan2(dy, dx);

                let tx = 0, ty = 0;
                if (randomFloat) {
                    tx = (Math.random() - 0.5) * 60;
                    ty = (Math.random() - 0.5) * 60 - 40;
                }

                const newPoint = {
                    id: Date.now() + Math.random(),
                    x: e.clientX + 15, // Offset slightly to not block physical pointer clicks
                    y: e.clientY + 15,
                    char: text[index.current % text.length],
                    angle: followMouseDirection ? angle : 0,
                    tx, ty
                };

                index.current++;

                setPoints(p => {
                    const updated = [...p, newPoint];
                    if (updated.length > maxPoints) {
                        updated.shift();
                    }
                    return updated;
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [text, spacing, followMouseDirection, randomFloat, maxPoints]);

    useEffect(() => {
        if (points.length === 0) return;
        const timer = setInterval(() => {
            setPoints(p => p.length > 0 ? p.slice(1) : []);
        }, removalInterval * 5);
        return () => clearInterval(timer);
    }, [points.length, removalInterval]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10001 }}>
            {points.map(p => (
                <span key={p.id} style={{
                    position: 'absolute',
                    left: p.x,
                    top: p.y,
                    transform: `translate(-50%, -50%) rotate(${p.angle}rad)`,
                    color: 'var(--neon-green, #39FF14)',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-accent, Georgia)',
                    textShadow: '0 0 10px rgba(57, 255, 20, 0.4)',
                    // Pass arbitrary tx/ty via css vars to the dynamic keyframe
                    '--tx': `${p.tx}px`,
                    '--ty': `${p.ty}px`,
                    animation: `floatUp-${exitDuration.toString().replace('.', '')} ${exitDuration}s ease-out forwards` // exit animation
                }}>
                    {p.char}
                </span>
            ))}
            <style>{`
        @keyframes floatUp-${exitDuration.toString().replace('.', '')} {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          10% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.5); }
        }
      `}</style>
        </div>
    );
};

export default TextCursor;
