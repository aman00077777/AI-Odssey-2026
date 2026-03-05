import React, { useState, useEffect } from 'react';

const ArcReactorLoader = () => {
    const [mainText, setMainText] = useState('INITIALIZING...');
    const [subText, setSubText] = useState('');
    const fullSubText = '@ WELCOME TO AI ODYSSEY 2026 @';

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullSubText.length) {
                setSubText((prev) => prev + fullSubText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        const textSwitchTimeout = setTimeout(() => {
            setMainText('ACCESS GRANTED');
        }, 2500);

        return () => {
            clearInterval(typingInterval);
            clearTimeout(textSwitchTimeout);
        };
    }, [fullSubText]);

    return (
        <div className="loader-container">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Orbitron:wght@400;700&display=swap');

        .loader-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #0c0a0f;
          overflow: hidden;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .arc-reactor {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 30px rgba(0, 212, 255, 0.1);
          margin-bottom: 40px;
          transition: transform 0.3s ease;
        }

        .core {
          width: 50px;
          height: 50px;
          background: #e0ffff;
          border-radius: 50%;
          box-shadow: 0 0 15px #00d4ff, 0 0 30px #00d4ff, 0 0 60px #00d4ff, inset 0 0 10px #ffffff;
          animation: arc-pulse 2s ease-in-out infinite;
          z-index: 5;
        }

        .ring-outer {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px dashed rgba(0, 212, 255, 0.7);
          animation: arc-spin 6s linear infinite;
        }

        .ring-inner {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top: 3px solid #00d4ff;
          border-bottom: 3px solid #00d4ff;
          animation: arc-spin-reverse 3s linear infinite;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
        }

        .ring-housing {
          position: absolute;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 0 15px rgba(0, 212, 255, 0.8);
        }

        .text-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .main-text {
          font-family: 'Black Ops One', 'Orbitron', cursive;
          color: #ff1744;
          font-size: 2.5rem;
          letter-spacing: 3px;
          text-shadow: 0 0 10px rgba(255, 23, 68, 0.6), 0 0 20px rgba(255, 23, 68, 0.3);
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .sub-text-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .mini-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: arc-spin 1s linear infinite;
          flex-shrink: 0;
        }

        .sub-text {
          color: #ffffff;
          font-family: 'Orbitron', 'Courier New', monospace;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }

        @keyframes arc-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes arc-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes arc-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px #00d4ff, 0 0 30px #00d4ff, 0 0 60px #00d4ff, inset 0 0 10px #ffffff;
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #00d4ff, inset 0 0 15px #ffffff;
          }
        }

        @media (max-width: 768px) {
          .arc-reactor { transform: scale(0.8); margin-bottom: 25px; }
          .main-text { font-size: 1.8rem; letter-spacing: 2px; }
          .sub-text { font-size: 0.75rem; letter-spacing: 1px; }
        }

        @media (max-width: 480px) {
          .arc-reactor { transform: scale(0.7); }
          .main-text { font-size: 1.5rem; }
          .sub-text { font-size: 0.65rem; }
        }
      `}</style>

            <div className="arc-reactor">
                <div className="ring-outer"></div>
                <div className="ring-inner"></div>
                <div className="ring-housing"></div>
                <div className="core"></div>
            </div>

            <div className="text-wrapper">
                <div className="main-text">{mainText}</div>
                <div className="sub-text-wrapper">
                    <div className="mini-spinner"></div>
                    <div className="sub-text">{subText}</div>
                </div>
            </div>
        </div>
    );
};

export default ArcReactorLoader;
