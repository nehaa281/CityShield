import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react'; // Added useState
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Footer from './components/Footer';
import AnalyzePage from './components/analyze/AnalyzePage'; // Added import


import MapSection from './components/analyze/MapSection';

const App = () => {
  // 1. Logic to track which page to show
  const [showDashboard, setShowDashboard] = useState(false);

  // 2. If dashboard state is true, show the AnalyzePage instead of the landing page
  if (showDashboard) {
    return <AnalyzePage onBack={() => setShowDashboard(false)} />;
  }
// const testData = {
//   lat: 29.6139,        // Coordinates for New Delhi
//   lng: 77.2090,
//   score: 82,
//   riskLevel: 'High',
//   aqi: 210,
//   noiseLevel: 75,
//   mitigationTip: "Use noise-reducing barriers and schedule heavy machinery for mid-day."
// };
  return (
    <div className="relative min-h-screen w-full text-white bg-slate-950">
      {/* Background settings remain exactly as you had them */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=2000')`,
        }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col">
          {/* 3. Pass the toggle functions to your buttons */}
          <Navbar onGetStarted={() => setShowDashboard(true)} />
          <Hero onAnalyze={() => setShowDashboard(true)} />
        </div>

        {/* <div className="container mx-auto px-4">
          <MapSection data={null} />
        </div> */}
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default App;