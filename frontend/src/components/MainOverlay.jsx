import React, { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';

import { Link } from 'react-scroll';

// Game Images
import catchWordImg from '../assets/games/catch_word.png';
import quizImg from '../assets/games/quiz.png';
import treasureHuntImg from '../assets/games/treasure_hunt.png';
import escapeRoomImg from '../assets/games/escape_room.png';
import aiOrNotImg from '../assets/games/ai_or_not.png';
import inventoManiaImg from '../assets/games/invento_mania.png';
import binaryCodingImg from '../assets/games/binary_coding.png';

// About Section Images
import prev1 from '../assets/previous/prev1.jpeg';
import prev2 from '../assets/previous/prev2.jpeg';
import prev3 from '../assets/previous/prev3.jpeg';
import prev4 from '../assets/previous/prev4.jpeg';

// Sponsor Logos
import beejaLogo from '../assets/logos/beeja_logo.png';
import campusBodyLogo from '../assets/logos/campus_body_logo.png';
import ghrceLogo from '../assets/logos/ghrce_logo.png';
import ieeeCisLogo from '../assets/logos/ieee_cis_logo.png';
import jarvisLogo from '../assets/logos/jarvis_logo.png';

const MainOverlay = () => {
    const [scrolled, setScrolled] = useState(false);

    // Countdown state
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', mins: '00', secs: '00'
    });


    // Floating Coming Soon state
    const [comingSoonPos, setComingSoonPos] = useState({ show: false, x: 0, y: 0 });

    // Mobile Menu State
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleComingSoonClick = (e) => {
        // Prevent default behavior if it's acting as a link
        e.preventDefault();

        // Use clientX and clientY for position fixed, ensuring we get valid numbers
        const xPos = e.clientX || window.innerWidth / 2;
        const yPos = e.clientY || window.innerHeight / 2;

        console.log("Coming soon clicked:", xPos, yPos);

        setComingSoonPos({ show: true, x: xPos, y: yPos });

        // Hide after 1.5 seconds
        setTimeout(() => {
            setComingSoonPos(prev => ({ ...prev, show: false }));
        }, 1500);
    };

    useEffect(() => {
        // Initial entry animations
        animate('.main-content', {
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1200,
            easing: 'outCubic'
        });

        animate('.nav-links li', {
            opacity: [0, 1],
            translateY: [-20, 0],
            delay: stagger(100),
            duration: 800
        });

        animate('.hero-title, .hero-subtitle, .countdown', {
            opacity: [0, 1],
            translateY: [30, 0],
            delay: stagger(200),
            duration: 1000
        });

        // Initialize Countdown
        const countdownDate = new Date('2026-03-14T00:00:00');

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: days < 10 ? '0' + days : days.toString(),
                hours: hours < 10 ? '0' + hours : hours.toString(),
                mins: mins < 10 ? '0' + mins : mins.toString(),
                secs: secs < 10 ? '0' + secs : secs.toString(),
            });
        }, 1000);

        // Scroll listener for navbar
        const handleScroll = () => {
            if (window.scrollY > 50) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);

        // Scroll reveal using observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target, {
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 1000,
                        easing: 'outCubic'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.section-title, .about-text, .about-image-card, .game-card, .ai-dept-content, .criteria-box, .previous-gallery div, .sponsors-grid div').forEach((el) => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);


    return (
        <>
            {/* Navbar - Moved outside main-content for true fixed positioning */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <a href="#" className="logo">
                        <span className="logo-ai">AI</span> ODYSSEY
                    </a>

                    <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><Link activeClass="active" to="home" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link activeClass="active" to="about" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setMenuOpen(false)}>About</Link></li>
                        <li><Link activeClass="active" to="games" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setMenuOpen(false)}>Games</Link></li>
                        <li><Link activeClass="active" to="schedule" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setMenuOpen(false)}>Schedule</Link></li>
                        <li><Link activeClass="active" to="speakers" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setMenuOpen(false)}>Speakers</Link></li>
                        <li><Link activeClass="active" to="leaderboard" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setMenuOpen(false)}>Leaderboard</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="main-content">

                {/* 1. Consolidated Home Section */}
                <section id="home" className="hero section" style={{ height: 'auto', paddingBottom: '100px' }}>
                    <div className="hero-bg"></div>
                    <div className="container hero-content" style={{ marginTop: '100px' }}>

                        <div className="hero-welcome-wrapper">
                            <div className="welcome-line"></div>
                            <h2 className="welcome-text">WELCOME TO THE</h2>
                            <div className="welcome-line"></div>
                        </div>

                        <h1 className="hero-title-main">
                            <span className="ai-text">AI</span>-<span className="odyssey-text">ODYSSEY</span>
                        </h1>

                        <p className="hero-subtitle">The dawn of a new era. Are you ready to assemble?</p>

                        <div className="countdown" style={{ marginBottom: '40px' }}>
                            {['days', 'hours', 'mins', 'secs'].map((unit, idx) => (
                                <React.Fragment key={unit}>
                                    <div className="time-box">
                                        <span>{timeLeft[unit]}</span>
                                    </div>
                                    {idx < 3 && <div className="time-separator">:</div>}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="hero-cta">
                            <a href="https://forms.gle/VdYfMQMAQvV512dXA" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Register Now</a>
                        </div>
                    </div>
                </section>

                <div className="section-divider"></div>

                {/* 2. Standalone About Section */}
                <section id="about" className="about-sequence section" style={{ background: 'transparent', marginTop: '50px', padding: '50px 15px' }}>
                    <div className="container" style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>

                        {/* 2.1 About AI Odyssey (1 Image) */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">AI ODYSSEY 2026</h2>
                            <div className="about-block-box">
                                <p style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'center' }}>AI Odyssey 2026 is an exciting celebration of innovation, creativity, and technology. The event brings together students to showcase their skills, compete in engaging challenges, and explore the power of Artificial Intelligence. This year’s edition blends AI with the thrill of gaming, creating an action-packed platform where strategy, innovation, and competition come together.</p>
                            </div>
                        </div>

                        {/* 2.2 The AI Department (4 Images) */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">THE AI DEPARTMENT</h2>
                            <div className="about-block-box" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>The Department of Artificial Intelligence at G.H. Raisoni College of Engineering focuses on AI, Machine Learning, and emerging technologies. The department promotes practical learning, research, and participation in national and international competitions. Under the leadership of Dr. Achamma Thomas, it prepares students with strong technical knowledge and problem-solving skills to become future AI professionals.</p>
                            </div>
                            <div className="ai-dept-images">
                                {[
                                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                                    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                                    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                                    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                                ].map((src, i) => (
                                    <div key={i} className="ai-dept-img-card">
                                        <img src={src} alt="AI Dept" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2.3 Centre of Excellence */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">CENTRE OF EXCELLENCE (AIML)</h2>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>The Centre of Excellence in AI and ML at G.H. Raisoni College of Engineering is a hub for advanced research, innovation, and industry-oriented learning. With modern labs and resources, it enables students and faculty to work on real-world AI projects while bridging the gap between academic knowledge and practical implementation.</p>
                            </div>
                        </div>

                        {/* 2.4 About JARVIS Forum */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">JARVIS FORUM</h2>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>JARVIS is the official student forum of the AI Department at G.H. Raisoni College of Engineering. It promotes innovation, leadership, and technical growth through competitions, workshops, and hands-on projects. As the organizer of AI Odyssey, the forum encourages students to collaborate, innovate, and develop practical AI skills.</p>
                            </div>
                        </div>

                        {/* 2.5 About IEEE-CIS, GHRCE */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">IEEE-CIS, GHRCE</h2>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>The IEEE Computational Intelligence Society focuses on advancing technologies such as neural networks, fuzzy systems, and evolutionary algorithms. The IEEE CIS Student Chapter at GHRCE provides students opportunities to explore AI technologies, attend workshops, interact with industry experts, and build leadership skills.</p>
                            </div>
                        </div>

                        {/* 2.6 Previous AI Odyssey (4 Images) */}
                        <div className="about-block">
                            <h2 className="section-title">PREVIOUS AI ODYSSEY</h2>
                            <p className="section-subtitle" style={{ textAlign: 'center' }}>A glimpse into our past triumphs.</p>
                            <div className="previous-gallery">
                                {[prev1, prev2, prev3, prev4].map((src, idx) => (
                                    <div key={idx} className="prev-img-card" style={{ backgroundImage: `url('${src}')` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="section-divider"></div>

                {/* 3. Games Section (Sliding format) */}
                <section id="games" className="games section games-section-container">
                    {/* SVG Filter for the Monotone Noise Effect */}
                    <svg style={{ display: 'none' }}>
                        <filter id="monotone-noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0" />
                        </filter>
                    </svg>

                    <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1400px' }}>
                        <h2 className="section-title">THE <span>GAMES</span></h2>

                        <div className="games-slider-container">
                            {[
                                { name: 'Catch the Word and Win', img: catchWordImg, description: 'Participants search for hidden clues in content to form the correct password. Observation and quick thinking lead to victory.' },
                                { name: 'Quiz', img: quizImg, description: 'A fast-paced quiz testing knowledge of Artificial Intelligence and technology. Speed and accuracy determine the winners.' },
                                { name: 'Treasure Hunt', img: treasureHuntImg, description: 'A campus adventure where teams scan QR codes, decode clues, and solve puzzles to reach the final treasure.' },
                                { name: 'Escape Room', img: escapeRoomImg, description: 'Participants solve puzzles and clues under pressure to unlock stages and escape within the given time.' },
                                { name: 'AI or Not', img: aiOrNotImg, description: 'Players guess whether a creation is AI-generated or human-made and earn points for correct answers.' },
                                { name: 'Invento-Mania', img: inventoManiaImg, description: 'A Shark Tank–style competition where participants pitch AI-based solutions to real-world problems.' },
                                { name: 'Binary Coding', img: binaryCodingImg, description: 'Participants convert given data into binary within a time limit, testing speed and technical accuracy.' }
                            ].map((game, idx) => (
                                <div className="game-glass-card" key={idx}>
                                    <div className="game-card-img-container">
                                        <div className="game-card-img" style={{ backgroundImage: `url(${game.img})` }}></div>
                                    </div>
                                    <div className="game-card-info">
                                        <h3>{game.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#bbb', marginBottom: '15px', lineHeight: '1.4' }}>{game.description}</p>
                                        <div className="game-card-actions" style={{ justifyContent: 'center' }}>
                                            <button className="btn btn-outline" onClick={handleComingSoonClick}>Rule Book</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="section-divider"></div>

                {/* 4. Schedule Section (Infinity Stones) */}
                <section id="schedule" className="schedule section" style={{ background: 'transparent' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title">Infinity Stone <span>Schedule</span></h2>
                        <p className="section-subtitle">Trace the timeline of the Odyssey.</p>

                        <div className="infinity-timeline">
                            <div className="timeline-line"></div>
                            {[
                                { name: "Space", color: "#1E88E5", event: "Registration Begins", time: "09:00 AM" },
                                { name: "Mind", color: "#FFD54F", event: "Inauguration Ceremony", time: "09:30 AM - 10:30 AM" },
                                { name: "Reality", color: "#E53935", event: "Speaker Workshop Session", time: "10:30 AM - 12:00PM" },
                                { name: "Power", color: "#8E24AA", event: <>Games Session (2 Game)<br /><span className="game-subtext">Binary Code<br />Quiz</span></>, time: "12:00 PM - 01:00 AM" },
                                { name: "Time", color: "#43A047", event: "Lunch Break", time: "01:00 PM - 01:45 PM" },
                                { name: "Soul", color: "#FB8C00", event: <>Games Session (2 Game)<br /><span className="game-subtext">1. Shark Tank (Rounds 1: PPT Shortlisting<br />Round 2: Pitch)<br />2. Escape Room</span></>, time: "01:45 PM - 03:45 PM" },
                                { name: "Space", color: "#1E88E5", event: <>Games Session (2 Game)<br /><span className="game-subtext">1. AI Or Not<br />2. Find The Word &amp; Win Points</span></>, time: "3:45 PM - 04:30 PM" },
                                { name: "Mind", color: "#FFD54F", event: "Treasure Hunt", time: "04:30 PM - 05:30 PM" },
                                { name: "Reality", color: "#E53935", event: "Prize Distribution & Closing Ceremony", time: "5:30 PM" }
                            ].map((stone, idx) => (
                                <div className="timeline-item" key={idx}>
                                    <div className="stone-wrapper">
                                        <div className="infinity-stone" style={{ backgroundColor: stone.color, boxShadow: `0 0 20px ${stone.color}` }}></div>
                                    </div>
                                    <div className="timeline-content">
                                        <h4 style={{ color: stone.color }}>{stone.name} Stone</h4>
                                        <h3><span className="event-box">{stone.event}</span></h3>
                                        <span className="time-box">{stone.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="section-divider"></div>

                {/* 4.5 Speakers Section */}
                <section id="speakers" className="speakers section">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title" style={{ fontFamily: "'American Captain', sans-serif", background: 'linear-gradient(to bottom, #8ca8c4 0%, #4a6fa5 50%, #1c3d6e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', WebkitTextStroke: '1px #b0b5b9', filter: 'drop-shadow(0 0 10px rgba(74, 111, 165, 0.4))' }}>Our <span>Speakers</span></h2>
                        <p className="section-subtitle">Insights from industry leaders.</p>

                        <div className="speakers-grid">
                            {[1, 2].map((_, idx) => (
                                <div className="speaker-card" key={idx}>
                                    <h3 className="sparkle-text" style={{ fontFamily: "var(--font-heading)", fontSize: '3rem', letterSpacing: '3px', margin: 0 }}>COMING SOON</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="section-divider"></div>

                <section id="leaderboard" className="leaderboard section" style={{ padding: '60px 15px 40px' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        {/* Final CTA Button */}
                        <div className="leaderboard-cta" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <button onClick={handleComingSoonClick} className="btn btn-primary btn-leaderboard">
                                Leaderboard
                            </button>
                        </div>
                    </div>
                </section>

                <div className="section-divider"></div>

                {/* Sponsors / Partners Section */}
                <section id="sponsors" className="sponsors-section section">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title sponsors-title">OUR <span>PARTNERS</span></h2>
                        <p className="section-subtitle">Proudly supported by our amazing partners.</p>

                        {/* Row 1: Beeja + Campus Body */}
                        <div className="sponsors-logos-row">
                            <div className="sponsor-logo-card sponsor-dark">
                                <img src={beejaLogo} alt="Beeja" className="sponsor-logo-img" />
                            </div>
                            <div className="sponsor-logo-card sponsor-light">
                                <img src={campusBodyLogo} alt="Campus Body RBU" className="sponsor-logo-img" />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="sponsors-divider">
                            <div className="sponsors-divider-line"></div>
                            <span className="sponsors-divider-label">IN ASSOCIATION WITH</span>
                            <div className="sponsors-divider-line"></div>
                        </div>

                        {/* Row 2: IEEE CIS + GHRCE (middle) + JARVIS */}
                        <div className="sponsors-logos-row">
                            <div className="sponsor-logo-card sponsor-light">
                                <img src={ieeeCisLogo} alt="IEEE Computational Intelligence Society" className="sponsor-logo-img" />
                            </div>
                            <div className="sponsor-logo-card sponsor-light">
                                <img src={ghrceLogo} alt="GH Raisoni College of Engineering" className="sponsor-logo-img" />
                            </div>
                            <div className="sponsor-logo-card sponsor-dark">
                                <img src={jarvisLogo} alt="JARVIS - Empowered by Innovation" className="sponsor-logo-img" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating Coming Soon Message - Moved absolutely outside to prevent clipping */}
            {comingSoonPos.show && (
                <div
                    className="floating-coming-soon"
                    style={{
                        left: comingSoonPos.x,
                        top: comingSoonPos.y
                    }}
                >
                    COMING SOON
                </div>
            )}
        </>
    );
}

export default MainOverlay;
