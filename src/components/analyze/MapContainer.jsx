// import React from 'react';

// export default function MapContainer({ isResultsMode }) {
//   return (
//     <div className="flex-1 relative bg-[#0b1120] w-full h-full overflow-hidden">
      
//       {/* Map Background Image */}
//       <img 
//         src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000" 
//         className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-40 transition-opacity duration-1000" 
//         alt="Urban City Map" 
//       />
      
//       {/* Dark Overlay to ensure text readability */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120]/20 via-transparent to-[#0b1120]/40 pointer-events-none"></div>

//       {/* UI Overlay Elements */}
//       {isResultsMode && (
//         <>
//           <div className="absolute top-8 left-8 bg-black/60 border border-white/10 p-3 rounded-xl backdrop-blur-lg flex items-center gap-3 text-xs font-bold text-white z-10 shadow-2xl">
//              <span className="text-lg">🗺️</span>
//              <span>View layers: <span className="text-blue-400">Heatmap (Active)</span></span>
//           </div>
          
//           <button className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-3 transition-all active:scale-95 z-10 text-white whitespace-nowrap">
//              <span className="text-xl">✨</span> 
//              <span>Ask CityShield AI</span>
//           </button>
          
//           {/* Zoom Controls */}
//           <div className="absolute top-8 right-8 flex flex-col gap-2 z-10">
//             <button className="w-10 h-10 bg-black/60 border border-white/20 rounded-lg flex items-center justify-center font-bold text-xl hover:bg-white/10 text-white">+</button>
//             <button className="w-10 h-10 bg-black/60 border border-white/20 rounded-lg flex items-center justify-center font-bold text-xl hover:bg-white/10 text-white">−</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import React from 'react';
import MapSection from './MapSection'; // Ensure the path is correct

const MapContainer = ({ isResultsMode, mapData }) => {
  return (
    <div className="flex-1 h-full bg-[#0b1120] relative overflow-hidden">
      {/* If isResultsMode is false, we pass null to MapSection (Shows 20 pins).
        If true, we pass the mapData (Flies to the pinpoint).
      */}
      <MapSection data={isResultsMode ? mapData : null} />
    </div>
  );
};

export default MapContainer;