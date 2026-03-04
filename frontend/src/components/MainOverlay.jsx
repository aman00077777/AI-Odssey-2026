import React, { useEffect, useState } from 'react';
import anime from 'animejs';

import { Link } from 'react-scroll';

const MainOverlay = () => {
    const [scrolled, setScrolled] = useState(false);

    // Countdown state
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', mins: '00', secs: '00'
    });


    // Floating Coming Soon state
    const [comingSoonPos, setComingSoonPos] = useState({ show: false, x: 0, y: 0 });

    const handleComingSoonClick = (e) => {
        // Use clientX and clientY for position fixed
        setComingSoonPos({ show: true, x: e.clientX, y: e.clientY });

        // Hide after 1.5 seconds
        setTimeout(() => {
            setComingSoonPos(prev => ({ ...prev, show: false }));
        }, 1500);
    };

    useEffect(() => {
        // Initial entry animations
        anime({
            targets: '.main-content',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1200,
            easing: 'easeOutCubic'
        });

        anime({
            targets: '.nav-links li',
            opacity: [0, 1],
            translateY: [-20, 0],
            delay: anime.stagger(100),
            duration: 800
        });

        anime({
            targets: '.hero-title, .hero-subtitle, .countdown',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(200),
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
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 1000,
                        easing: 'easeOutCubic'
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
                    <ul className="nav-links">
                        <li><Link activeClass="active" to="home" spy={true} smooth={true} offset={-100} duration={500}>Home</Link></li>
                        <li><Link activeClass="active" to="about" spy={true} smooth={true} offset={-100} duration={500}>About</Link></li>
                        <li><Link activeClass="active" to="games" spy={true} smooth={true} offset={-100} duration={500}>Games</Link></li>
                        <li><Link activeClass="active" to="schedule" spy={true} smooth={true} offset={-100} duration={500}>Schedule</Link></li>
                        <li><Link activeClass="active" to="speakers" spy={true} smooth={true} offset={-100} duration={500}>Speakers</Link></li>
                        <li><Link activeClass="active" to="sponsors" spy={true} smooth={true} offset={-100} duration={500}>Sponsors</Link></li>
                    </ul>
                    <a href="https://forms.gle/VdYfMQMAQvV512dXA" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Register Now</a>
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

                        <div className="countdown" style={{ marginBottom: '80px' }}>
                            {['days', 'hours', 'mins', 'secs'].map((unit, idx) => (
                                <React.Fragment key={unit}>
                                    <div className="time-box">
                                        <span>{timeLeft[unit]}</span>
                                    </div>
                                    {idx < 3 && <div className="time-separator">:</div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Standalone About Section */}
                <section id="about" className="about-sequence section" style={{ background: 'rgba(10, 10, 10, 0.4)', marginTop: '50px', padding: '50px 15px' }}>
                    <div className="container" style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>

                        {/* 2.1 About AI Odyssey (1 Image) */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">AI ODYSSEY 2026</h2>
                            <div className="about-grid">
                                <div className="about-img-grid" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Tech 1" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px', border: '1px solid #333' }} />
                                </div>
                                <div className="about-text" style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.8' }}>
                                    <p style={{ marginBottom: '15px' }}>We are super excited to announce the launch of AI Odyssey 2026 — the ultimate celebration of innovation, creativity, and next-level technology! This isn't just an event; it's a high-energy platform where ideas spark, skills shine, and future tech leaders rise.</p>
                                    <p>This year, we're turning things up by blending the power of Artificial Intelligence with the thrill of gaming. Expect smart strategies, intense challenges, live competition, and mind-blowing innovation — all packed into one electrifying, action-filled experience.</p>
                                </div>
                            </div>
                        </div>

                        {/* 2.2 The AI Department (4 Images) */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">THE AI DEPARTMENT</h2>
                            <div className="about-block-box" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>The Department of Artificial Intelligence at G.H. Raisoni College of Engineering is a dynamic center of innovation and future-ready education. With a strong focus on Artificial Intelligence, Machine Learning, and emerging technologies, the department equips students with the technical expertise and problem-solving abilities required to address real-world challenges.</p>
                            </div>
                            <div className="about-block-box" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>Under the leadership of Dr. Achamma Thomas, Head of the Department (HOD), the department promotes hands-on learning, research-oriented projects, and active participation in national and international competitions. By blending strong academic foundations with practical implementation, it prepares students to become confident AI professionals and future innovators.</p>
                            </div>
                            <div className="ai-dept-images" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                                {[
                                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                                    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                                    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                                    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                                ].map((src, i) => (
                                    <img key={i} src={src} alt="AI Dept" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #333', filter: 'grayscale(0.5) contrast(1.2)' }} />
                                ))}
                            </div>
                        </div>

                        {/* 2.3 Centre of Excellence */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">CENTRE OF EXCELLENCE (AIML)</h2>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>The Centre of Excellence (CoE) in Artificial Intelligence and Machine Learning at G.H. Raisoni College of Engineering, Nagpur, is a dedicated hub for advanced research, innovation, and industry-focused training. It serves as a platform for implementing best practices, conducting cutting-edge research, and nurturing technical excellence in AI and ML.</p>
                            </div>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>Equipped with state-of-the-art laboratories and modern resources, the CoE enables students and faculty to work on transformative, real-world projects across diverse domains. By bridging academic knowledge with practical implementation, the Centre empowers learners to develop impactful AI-driven solutions for industry and society.</p>
                            </div>
                        </div>

                        {/* 2.4 About JARVIS Forum */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">JARVIS FORUM</h2>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>JARVIS is the official student forum of the Department of Artificial Intelligence at G.H. Raisoni College of Engineering, Nagpur. It is dedicated to fostering innovation, creativity, leadership, and technical excellence among students passionate about Artificial Intelligence and emerging technologies.</p>
                            </div>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>As the driving force behind AI Odyssey, JARVIS provides a dynamic platform for students to engage in competitions, workshops, expert sessions, and hands-on projects. Guided by its inspiring vision of promoting practical implementation over theory, the forum empowers students to collaborate, innovate, and grow into future-ready AI professionals.</p>
                            </div>
                        </div>

                        {/* 2.5 About IEEE-CIS, GHRCE */}
                        <div className="about-block" style={{ marginBottom: '60px' }}>
                            <h2 className="section-title">IEEE-CIS, GHRCE</h2>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>The IEEE Computational Intelligence Society (IEEE CIS) is a global community dedicated to advancing computational intelligence technologies such as neural networks, fuzzy systems, and evolutionary algorithms. It promotes innovation, research, and the practical application of intelligent systems across diverse real-world domains.</p>
                            </div>
                            <div className="about-block-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>The IEEE CIS Student Branch Chapter at G.H. Raisoni College of Engineering provides students with a strong platform to explore emerging AI technologies, participate in technical workshops, connect with industry professionals, and develop leadership skills. Through collaborative activities and knowledge-sharing initiatives, the chapter prepares students to excel in the evolving world of Artificial Intelligence and intelligent computing.</p>
                            </div>
                        </div>

                        {/* 2.6 Previous AI Odyssey (4 Images) */}
                        <div className="about-block">
                            <h2 className="section-title">PREVIOUS AI ODYSSEY</h2>
                            <p className="section-subtitle" style={{ textAlign: 'center' }}>A glimpse into our past triumphs.</p>
                            <div className="previous-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                                {[
                                    'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                    'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                                ].map((src, idx) => (
                                    <div key={idx} style={{ height: '140px', background: `url('${src}') center/cover`, borderRadius: '8px', border: '1px solid var(--glass-border)', filter: 'grayscale(0.3)' }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

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
                                { name: 'Catch the word and win', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                                { name: 'Quiz', img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                                { name: 'Treasure Hunt', img: 'https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                                { name: 'Escape room', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                                { name: 'AI or Not', img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                                { name: 'Invento-mania', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                                { name: 'Binary Coding', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                            ].map((game, idx) => (
                                <div className="game-glass-card" key={idx}>
                                    <div className="game-card-img-container">
                                        <div className="game-card-img" style={{ backgroundImage: `url(${game.img})` }}></div>
                                    </div>
                                    <div className="game-card-info">
                                        <h3>{game.name}</h3>
                                        <div className="game-card-actions">
                                            <button className="btn btn-outline" onClick={handleComingSoonClick}>Rule Book</button>
                                            <button className="btn btn-primary" onClick={handleComingSoonClick}>About It</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Schedule Section (Infinity Stones) */}
                <section id="schedule" className="schedule section" style={{ background: 'rgba(10,10,10,0.8)' }}>
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

                {/* 4.5 Speakers Section */}
                <section id="speakers" className="speakers section">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title">Our <span>Speakers</span></h2>
                        <p className="section-subtitle">Insights from industry leaders.</p>

                        <div className="speakers-grid">
                            {[
                                { name: 'Dr. Sarah Connor', role: 'AI Ethics Researcher', desc: 'Pioneer in ethical frameworks for AGI development.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                                { name: 'Alex Turing', role: 'Lead Data Scientist', desc: 'Expert in generative models and natural language processing.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                                { name: 'Elena Rostova', role: 'Robotics Engineer', desc: 'Innovator in human-robot interaction and cognitive automation.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                                { name: 'Marcus Sterling', role: 'Tech Entrepreneur', desc: 'Founder of NextGen AI, focusing on scalable intelligence solutions.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
                            ].map((speaker, idx) => (
                                <div className="speaker-card" key={idx}>
                                    <div className="speaker-img-wrapper">
                                        <img src={speaker.img} alt={speaker.name} />
                                    </div>
                                    <div className="speaker-info">
                                        <h3>{speaker.name}</h3>
                                        <h4>{speaker.role}</h4>
                                        <p>{speaker.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Registration Section */}
                <section id="register" className="section" style={{ textAlign: 'center' }}>
                    <div className="container">
                        <h2 className="section-title">Registration <span>Criteria</span></h2>

                        <div className="criteria-box" style={{ maxWidth: '800px', margin: '0 auto 40px auto', background: 'var(--glass-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--silver)' }}>
                            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                                <li>Must be an enrolled student in a recognized university.</li>
                                <li>Teams can consist of 1 to 4 members.</li>
                                <li>A valid student ID is required for on-campus entry.</li>
                                <li>Registration is non-transferable.</li>
                            </ul>
                        </div>

                    </div>
                </section>

                {/* 6. Sponsors Section (Moved to Bottom) */}
                <section id="sponsors" className="sponsors section" style={{ paddingBottom: '100px', minHeight: '100vh' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title">Our <span>Sponsors</span></h2>
                        <p className="section-subtitle">The visionaries backing our initiative.</p>
                        <div className="sponsors-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px' }}>
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} style={{ width: '150px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333', fontSize: '1.2rem', color: 'var(--silver)', fontWeight: 'bold' }}>
                                    SPONSOR {idx + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Floating Coming Soon Message */}
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
            </div>
        </>
    );
};

export default MainOverlay;
