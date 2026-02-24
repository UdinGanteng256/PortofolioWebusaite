import React, { useState, useEffect } from 'react';

const TextType = ({
    texts = [],
    text = [], // Fallback if user uses 'text' instead of 'texts' array
    typingSpeed = 75,
    deletingSpeed = 50,
    pauseDuration = 1500,
    showCursor = true,
    cursorCharacter = "_",
    variableSpeedEnabled = false,
    variableSpeedMin = 60,
    variableSpeedMax = 120,
    cursorBlinkDuration = 0.5
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const contentArray = texts.length > 0 ? texts : (text.length > 0 ? text : [""]);

    useEffect(() => {
        let timer;
        const currentText = contentArray[index];

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayedText(prev => prev.slice(0, -1));
                if (displayedText.length <= 1) { // 1 to handle empty state timing perfectly
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % contentArray.length);
                }
            }, deletingSpeed);
        } else {
            if (displayedText.length < currentText.length) {
                const speed = variableSpeedEnabled
                    ? Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin
                    : typingSpeed;
                timer = setTimeout(() => {
                    setDisplayedText(currentText.slice(0, displayedText.length + 1));
                }, speed);
            } else {
                timer = setTimeout(() => setIsDeleting(true), pauseDuration);
            }
        }
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, index, contentArray, typingSpeed, deletingSpeed, pauseDuration, variableSpeedEnabled, variableSpeedMin, variableSpeedMax]);

    return (
        <span style={{ display: 'inline-block' }}>
            {displayedText}
            {showCursor && (
                <span style={{ animation: `blink-cursor ${cursorBlinkDuration}s step-start infinite` }}>
                    {cursorCharacter}
                </span>
            )}
            <style>{`
        @keyframes blink-cursor {
          50% { opacity: 0; }
        }
      `}</style>
        </span>
    );
};

export default TextType;
