// import L from 'leaflet';

// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { prominentSites } from '../data/mockSites'; // Path to your data file

// // Marker Fix for Vite
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // Helper to handle auto-movement
// function MapController({ coords, zoom }) {
//   const map = useMap();
//   useEffect(() => {
//     if (coords) {
//       map.flyTo(coords, zoom, { animate: true, duration: 2 });
//       setTimeout(() => { map.invalidateSize(); }, 500);
//     }
//   }, [coords, zoom, map]);
//   return null;
// }

// const MapSection = ({ data }) => {
//   // Center of India for default view
//   const indiaCenter = [20.5937, 78.9629];
//   const zoomLevel = data ? 14 : 5;

//   const getRiskColor = (level) => {
//     if (level === 'High') return '#ef4444';
//     if (level === 'Medium') return '#f59e0b';
//     return '#22c55e';
//   };

//   return (
//     <section className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative">
//       {/* Legend Overlay */}
//       <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 p-3 rounded-lg shadow-md text-xs font-bold text-slate-800 border border-slate-200 backdrop-blur-sm">
//         <p className="mb-2 border-b pb-1 text-slate-500 uppercase">Impact Level</p>
//         <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> High Risk</div>
//         <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium Risk</div>
//         <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Low Risk</div>
//       </div>
//       {/* Stats Card Overlay - Place this inside the <section> but above <MapContainer> */}
// {!data && (
//   <div className="absolute top-6 left-6 z-[1000] bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-white shadow-2xl hidden md:block w-64">
//     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">India Impact Overview</h3>
//     <div className="space-y-3">
//       <div className="flex justify-between items-center">
//         <span className="text-xs text-slate-300">Total Projects</span>
//         <span className="text-lg font-mono font-bold">{prominentSites.length}</span>
//       </div>
//       <div className="flex justify-between items-center text-red-400">
//         <span className="text-xs">High Risk Zones</span>
//         <span className="text-lg font-mono font-bold">
//           {prominentSites.filter(s => s.riskLevel === 'High').length}
//         </span>
//       </div>
//       <div className="flex justify-between items-center text-amber-400">
//         <span className="text-xs">Medium Risk</span>
//         <span className="text-lg font-mono font-bold">
//           {prominentSites.filter(s => s.riskLevel === 'Medium').length}
//         </span>
//       </div>
//       <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden flex">
//         <div className="bg-red-500 h-full" style={{ width: '35%' }}></div>
//         <div className="bg-amber-500 h-full" style={{ width: '40%' }}></div>
//         <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
//       </div>
//       <p className="text-[10px] text-slate-500 italic mt-1 text-center">
//         Live construction monitoring active
//       </p>
//     </div>
//   </div>
// )}
//       <MapContainer center={indiaCenter} zoom={zoomLevel} className="h-full w-full">
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
        
//         <MapController coords={data ? [data.lat, data.lng] : indiaCenter} zoom={zoomLevel} />

//         {/* 1. Show User Search Result */}
//         {data && (
//           <>
//             <Marker position={[data.lat, data.lng]}>
//               <Popup>
//                 <div className="p-1 min-w-[150px]">
//                   <h4 className="font-bold text-red-600 uppercase text-[10px]">Active Analysis</h4>
//                   <h3 className="font-bold text-lg">{data.riskLevel} Risk</h3>
//                   <div className="h-1 w-full bg-slate-200 my-2 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-500" style={{width: `${data.score}%`}}></div>
//                   </div>
//                   <p className="text-sm">Score: <strong>{data.score}/100</strong></p>
//                   <p className="text-[11px] text-slate-600 mt-2 border-t pt-2">{data.mitigationTip}</p>
//                 </div>
//               </Popup>
//             </Marker>
//             <Circle 
//               center={[data.lat, data.lng]} 
//               radius={1000} 
//               pathOptions={{ fillColor: getRiskColor(data.riskLevel), color: getRiskColor(data.riskLevel), fillOpacity: 0.2 }} 
//             />
//           </>
//         )}

//         {/* 2. Show 20 Prominent Sites (Visible when not searching, or always as context) */}
//         {!data && prominentSites.map((site) => (
//           <React.Fragment key={site.id}>
//             <Marker position={[site.lat, site.lng]}>
//               <Popup>
//                 <div className="p-1">
//                   <h3 className="font-bold text-slate-800">{site.name}</h3>
//                   <p className="text-xs font-bold" style={{color: getRiskColor(site.riskLevel)}}>
//                     {site.riskLevel} Risk ({site.score}/100)
//                   </p>
//                   <p className="text-[10px] mt-1 text-slate-500 italic">"{site.tip}"</p>
//                 </div>
//               </Popup>
//             </Marker>
//             <Circle 
//               center={[site.lat, site.lng]} 
//               radius={2000} // Larger circles for "Global" view
//               pathOptions={{ fillColor: getRiskColor(site.riskLevel), color: 'transparent', fillOpacity: 0.1 }} 
//             />
//           </React.Fragment>
//         ))}
//       </MapContainer>
//     </section>
//   );
// };

// export default MapSection;

// import React from 'react';
// import { MapContainer, TileLayer, Circle, Popup, Tooltip } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { prominentSites } from '../../data/mockSites';


// const indiaCenter = [20.5937, 78.9629];
// const zoomLevel = data ? 15 : 5; // Zoom in for pinpoint, zoom out for India

// // Add this component inside MapSection.jsx to handle the movement
// function MapController({ coords, zoom }) {
//   const map = useMap();
//   useEffect(() => {
//     map.flyTo(coords, zoom, { animate: true, duration: 1.5 });
//   }, [coords, zoom]);
//   return null;
// }
// const MapSection = () => {
//   const indiaCenter = [20.5937, 78.9629];
  
//   // Clean, modern colors for the impact zones
//   const getRiskColor = (risk) => {
//     if (risk === 'High') return '#ef4444';   // Red
//     if (risk === 'Medium') return '#f59e0b'; // Amber
//     return '#10b981';                        // Emerald/Green
//   };

//   const stats = {
//     total: prominentSites.length,
//     high: prominentSites.filter(s => s.riskLevel === 'High').length,
//     med: prominentSites.filter(s => s.riskLevel === 'Medium').length
//   };

//   return (
//     <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
      
//       {/* 📊 CLARIFIED STATS CARD */}
// <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xl w-64 hidden md:block">
//   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">National Impact Summary</h3>
  
//   <div className="grid grid-cols-2 gap-4 mb-4">
//     <div>
//       <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//       <p className="text-[10px] text-slate-500 uppercase font-bold text-nowrap">Total Projects</p>
//     </div>
//     <div>
//       <p className="text-2xl font-bold text-red-500">{stats.high}</p>
//       <p className="text-[10px] text-slate-500 uppercase font-bold">High Risk</p>
//     </div>
//   </div>

//   <div className="space-y-1">
//     <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 px-1">
//       <span>High Risk</span>
//       <span>Low Risk</span>
//     </div>
    
//     {/* The Bar Line */}
//     <div className="h-2.5 w-full bg-slate-100 rounded-full flex overflow-hidden border border-slate-200 shadow-inner">
//       <div className="bg-red-500 h-full border-r border-white/20" style={{width: '35%'}}></div>
//       <div className="bg-amber-400 h-full border-r border-white/20" style={{width: '40%'}}></div>
//       <div className="bg-emerald-500 h-full" style={{width: '25%'}}></div>
//     </div>
    
//     <p className="text-[10px] text-slate-400 text-center mt-2 italic font-medium">
//       Proportional Environmental Stress
//     </p>
//   </div>
// </div>

//       {/* 🗺️ THE MAP (Light Theme) */}
//       <MapContainer center={indiaCenter} zoom={5} className="w-full h-full z-0">
//         <TileLayer
//           // Modern Light Gray Voyager Theme
//           url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
//           attribution='&copy; <a href="https://carto.com/">CARTO</a>'
//         />

//         {prominentSites.map((site) => (
//           <Circle 
//             key={site.id}
//             center={[site.lat, site.lng]} 
//             radius={35000} // Increased size slightly for better visibility
//             pathOptions={{ 
//               fillColor: getRiskColor(site.riskLevel), 
//               color: getRiskColor(site.riskLevel), // Border color same as fill
//               weight: 2,
//               fillOpacity: 0.4 
//             }} 
//           >
//             {/* Tooltip shows on hover for quick info */}
//             <Tooltip direction="top" offset={[0, -10]} opacity={1}>
//               <span className="font-bold">{site.name}</span>
//             </Tooltip>

//             {/* Popup shows on click for full info */}
//             <Popup>
//               <div className="p-1 min-w-[120px]">
//                 <h4 className="font-bold text-slate-800 m-0 text-sm">{site.name}</h4>
//                 <div className="flex items-center gap-2 mt-1">
//                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: getRiskColor(site.riskLevel)}}></div>
//                    <span className="text-xs font-bold" style={{color: getRiskColor(site.riskLevel)}}>
//                      {site.riskLevel} Risk ({site.score}/100)
//                    </span>
//                 </div>
//                 <p className="text-[10px] text-slate-500 leading-tight mt-2 italic border-t pt-1">
//                   {site.tip}
//                 </p>
//               </div>
//             </Popup>
//           </Circle>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapSection;
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Circle, Popup, Tooltip, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { prominentSites } from '../../data/mockSites';

// // 1. THIS MUST BE INSIDE THIS FILE
// function MapController({ coords, zoom }) {
//   const map = useMap();
//   useEffect(() => {
//     map.flyTo(coords, zoom, { animate: true, duration: 1.5 });
//   }, [coords, zoom, map]);
//   return null;
// }

// const MapSection = ({ data }) => { // 2. RECEIVE DATA PROP
//   const indiaCenter = [20.5937, 78.9629];
  
//   const getRiskColor = (risk) => {
//     if (risk === 'High') return '#ef4444';
//     if (risk === 'Medium') return '#f59e0b';
//     return '#10b981';
//   };

//   return (
//     <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden bg-white">
      
//       {/* 3. SHOW STATS ONLY IN DASHBOARD MODE (When data is null) */}
//       {!data && (
//         <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xl w-64 hidden md:block">
//            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">National Summary</h3>
//            <p className="text-2xl font-bold text-slate-800">{prominentSites.length} Active Sites</p>
//         </div>
//       )}

//       <MapContainer center={indiaCenter} zoom={5} className="w-full h-full">
//         <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
//         {/* 4. DYNAMIC MOVEMENT */}
//         <MapController 
//           coords={data ? [data.lat, data.lng] : indiaCenter} 
//           zoom={data ? 14 : 5} 
//         />

//         {data ? (
//           // AFTER: Show Single Pin
//           <Circle 
//             center={[data.lat, data.lng]} 
//             radius={800} 
//             pathOptions={{ fillColor: 'red', color: 'red', weight: 2, fillOpacity: 0.6 }}
//           >
//             <Popup><h3 className="font-bold">{data.name}</h3></Popup>
//           </Circle>
//         ) : (
//           // BEFORE: Show All 20 Sites
//           prominentSites.map((site) => (
//             <Circle 
//               key={site.id}
//               center={[site.lat, site.lng]} 
//               radius={30000} 
//               pathOptions={{ fillColor: getRiskColor(site.riskLevel), color: 'transparent', fillOpacity: 0.4 }} 
//             />
//           ))
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapSection;

import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Circle, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { prominentSites } from '../../data/mockSites';

// This helper MUST be inside the file but outside the main component
function MapController({ coords, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, zoom, { animate: true, duration: 1.5 });
    }
  }, [coords, zoom, map]);
  return null;
}

const MapSection = ({ data }) => {
  const indiaCenter = [20.5937, 78.9629];
  
  const getRiskColor = (risk) => {
    if (risk === 'High') return '#ef4444';
    if (risk === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  const stats = {
    total: prominentSites.length,
    high: prominentSites.filter(s => s.riskLevel === 'High').length,
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
      
      {/* Show Stats ONLY if no specific data is searched */}
      {!data && (
        <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xl w-64 hidden md:block text-slate-800">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">National Summary</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Active Sites</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-500">{stats.high}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">High Risk</p>
            </div>
          </div>
        </div>
      )}

      <LeafletMap center={indiaCenter} zoom={5} className="w-full h-full z-0">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
        <MapController 
          coords={data ? [data.lat, data.lng] : indiaCenter} 
          zoom={data ? 14 : 5} 
        />

        {data ? (
          /* AFTER SEARCH: Single Target Site */
          <Circle 
            center={[data.lat, data.lng]} 
            radius={800} 
            pathOptions={{ fillColor: '#ef4444', color: '#ef4444', weight: 2, fillOpacity: 0.6 }}
          >
            <Popup><div className="text-slate-800 font-bold">{data.name}</div></Popup>
          </Circle>
        ) : (
          /* BEFORE SEARCH: All National Sites */
          prominentSites.map((site) => (
            <Circle 
              key={site.id}
              center={[site.lat, site.lng]} 
              radius={30000} 
              pathOptions={{ 
                fillColor: getRiskColor(site.riskLevel), 
                color: 'transparent', 
                fillOpacity: 0.4 
              }} 
            />
          ))
        )}
      </LeafletMap>
    </div>
  );
};

export default MapSection;