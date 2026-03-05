import React, { useState, useEffect } from 'react';
import MainOverlay from './components/MainOverlay';
import ArcReactorLoader from './components/ArcReactorLoader';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The loader animation in ArcReactorLoader switches text at 2.5s.
    // We wait 4 seconds total to let the user read "ACCESS GRANTED" before showing the site.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <ArcReactorLoader /> : <MainOverlay />}
    </div>
  );
}

export default App;
