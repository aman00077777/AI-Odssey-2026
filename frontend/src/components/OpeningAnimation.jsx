import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './OpeningAnimation.css'; // We will create this next for specific animation styles

const OpeningAnimation = ({ onComplete }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // 1. Draw the SVG lines of the abstract Ultron Face
        const timeline = anime.timeline({
            easing: 'easeOutExpo',
        });

        timeline.add({
            targets: '.ultron-paths path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 2000,
            delay: function (el, i) { return i * 150 },
        })
            .add({
                // Fill the eyes with glowing red
                targets: '.ultron-eyes',
                fill: ['transparent', '#e23636'],
                filter: ['drop-shadow(0px 0px 0px #e23636)', 'drop-shadow(0px 0px 20px #e23636)'],
                duration: 1000,
                easing: 'easeInQuad'
            }, '-=500')
            .add({
                targets: '.glitch-text',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800
            }, '-=200');

        // 2. Typing effect for "WELCOME TO AI ODYSSEY 2026"
        setTimeout(() => {
            const speechEl = document.querySelector('.ultron-speech');
            if (!speechEl) return;

            const text = "\"WELCOME TO AI ODYSSEY 2026\"";
            let i = 0;
            speechEl.innerHTML = "";

            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    speechEl.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);

                    // Complete sequence
                    setTimeout(() => {
                        const glitchEl = document.querySelector('.glitch-text');
                        if (glitchEl) {
                            glitchEl.innerText = "ACCESS GRANTED";
                            glitchEl.style.color = '#fff';
                            glitchEl.style.textShadow = '0 0 20px #e23636';
                        }
                        if (speechEl) {
                            speechEl.style.opacity = 0;
                            speechEl.style.transition = "opacity 0.5s ease";
                        }

                        // Fade out the whole overlay
                        anime({
                            targets: containerRef.current,
                            opacity: 0,
                            duration: 1000,
                            delay: 800,
                            easing: 'easeInOutQuad',
                            complete: () => {
                                if (onComplete) onComplete();
                            }
                        });
                    }, 1500);
                }
            }, 60);
        }, 2500);

    }, [onComplete]);

    return (
        <div ref={containerRef} className="opening-overlay-react">
            <div className="ultron-svg-container">
                {/* Abstract Ultron Face SVG */}
                <svg viewBox="0 0 200 200" width="300" height="300" className="ultron-svg">
                    <g className="ultron-paths" fill="none" stroke="#a5a5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Outline */}
                        <path d="M 50 40 L 150 40 L 170 80 L 150 160 L 100 190 L 50 160 L 30 80 Z" />
                        {/* Inner details */}
                        <path d="M 100 40 L 100 90" />
                        <path d="M 70 40 L 60 70" />
                        <path d="M 130 40 L 140 70" />
                        {/* Cheeks */}
                        <path d="M 40 100 L 70 140 L 100 150" />
                        <path d="M 160 100 L 130 140 L 100 150" />
                        {/* Mouth Grille */}
                        <path d="M 70 160 L 130 160" />
                        <path d="M 80 170 L 120 170" />
                        <path d="M 90 180 L 110 180" />
                        <path d="M 100 150 L 100 180" />
                    </g>
                    {/* Eyes */}
                    <g>
                        <polygon className="ultron-eyes" points="60,95 85,90 90,105 55,105" fill="transparent" stroke="#a5a5a5" strokeWidth="2" />
                        <polygon className="ultron-eyes" points="140,95 115,90 110,105 145,105" fill="transparent" stroke="#a5a5a5" strokeWidth="2" />
                    </g>
                </svg>

                <div className="text-container">
                    <h1 className="glitch-text">INITIALIZING...</h1>
                    <div className="ultron-speech"></div>
                </div>
            </div>
        </div>
    );
};

export default OpeningAnimation;
