import React, { useState } from 'react';
import OpeningAnimation from './components/OpeningAnimation';
import MainOverlay from './components/MainOverlay';
import './index.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="App">
      {showIntro ? (
        <OpeningAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <MainOverlay />
      )}
    </div>
  );
}

export default App;
