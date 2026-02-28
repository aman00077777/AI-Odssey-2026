import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import axios from 'axios';
import { Link } from 'react-scroll';

const MainOverlay = () => {
    const [scrolled, setScrolled] = useState(false);

    // Countdown state
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', mins: '00', secs: '00'
    });

    // Registration state
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regStatus, setRegStatus] = useState('');

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
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 30);
        countdownDate.setHours(9, 0, 0, 0);

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

        document.querySelectorAll('.section-title, .about-text, .about-image-card, .game-card').forEach((el) => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegStatus('Registering...');
        try {
            const res = await axios.post('http://localhost:5000/api/register', {
                name: regName,
                email: regEmail
            });
            setRegStatus(res.data.message || 'Success!');
            setRegName('');
            setRegEmail('');
        } catch (error) {
            setRegStatus(error.response?.data?.message || 'Error occurred.');
        }
    };

    return (
        <div className="main-content">
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <a href="#" className="logo">AI ODYSSEY</a>
                    <ul className="nav-links">
                        <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
                        <li><Link to="about" smooth={true} duration={500}>About</Link></li>
                        <li><Link to="games" smooth={true} duration={500}>Games</Link></li>
                        <li><Link to="register" smooth={true} duration={500}>Register</Link></li>
                    </ul>
                    <Link to="register" smooth={true} duration={500} className="btn btn-primary">Register Now</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero section">
                <div className="hero-bg"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">Welcome to the <br /><span>AI Odyssey</span></h1>
                    <p className="hero-subtitle">The dawn of a new era. Are you ready to assemble?</p>

                    <div className="countdown">
                        {['days', 'hours', 'mins', 'secs'].map((unit, idx) => (
                            <React.Fragment key={unit}>
                                <div className="time-box">
                                    <span>{timeLeft[unit]}</span>
                                    <div className="label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
                                </div>
                                {idx < 3 && <div className="time-separator">:</div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about section">
                <div className="container relative">
                    <h2 className="section-title">About <span>AI Odyssey</span></h2>
                    <div className="about-grid">
                        <div className="about-text">
                            <p>AI Odyssey is the pinnacle of artificial intelligence gatherings. Inspired by the technological marvels of the superhero universe, we bring together the brightest minds to forge the future.</p>
                            <p>Join us for an immersive experience featuring cutting-edge AI showcases, hands-on workshops, and a chance to network with industry titans.</p>
                            <Link to="register" smooth={true} duration={500} className="btn btn-outline">Join the Initiative</Link>
                        </div>
                        <div className="about-image-card">
                            <div className="glow-effect"></div>
                            <div className="card-content">
                                <h3>"I had strings, but now I'm free."</h3>
                                <p>- The dawn of true AI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Games Section */}
            <section id="games" className="games section">
                <div className="container">
                    <h2 className="section-title">The <span>Games</span></h2>
                    <p className="section-subtitle">Test your intellect in our AI-driven challenges.</p>

                    <div className="games-grid">
                        <div className="game-card">
                            <div className="game-img-wrapper">
                                <div className="game-img game-1-bg"></div>
                            </div>
                            <div className="game-info">
                                <h3>Neural Kombat</h3>
                                <p>Train your AI model to battle in a simulated arena.</p>
                            </div>
                        </div>
                        <div className="game-card">
                            <div className="game-img-wrapper">
                                <div className="game-img game-2-bg"></div>
                            </div>
                            <div className="game-info">
                                <h3>Quantum Heist</h3>
                                <p>Solve cryptographic puzzles to bypass the main security frame.</p>
                            </div>
                        </div>
                        <div className="game-card">
                            <div className="game-img-wrapper">
                                <div className="game-img game-3-bg"></div>
                            </div>
                            <div className="game-info">
                                <h3>Stark Protocol</h3>
                                <p>Build and optimize automation scripts under pressure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section id="register" className="section" style={{ paddingBottom: '100px', textAlign: 'center' }}>
                <div className="container">
                    <h2 className="section-title">Register <span>Now</span></h2>
                    <p className="section-subtitle">Secure your place in the future.</p>
                    <form onSubmit={handleRegister} style={{ maxWidth: '500px', margin: '0 auto', background: 'var(--glass-bg)', padding: '40px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--silver)' }}>Name</label>
                            <input type="text" value={regName} onChange={e => setRegName(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: '#222', color: 'white' }} />
                        </div>
                        <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--silver)' }}>Email</label>
                            <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: '#222', color: 'white' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit</button>
                        {regStatus && <p style={{ marginTop: '20px', color: 'var(--marvel-red)' }}>{regStatus}</p>}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default MainOverlay;
