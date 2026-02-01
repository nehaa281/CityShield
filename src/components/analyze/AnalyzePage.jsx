// const [mapData, setMapData] = useState(null);
// import React, { useState } from 'react';
// import { useResizable } from '../../hooks/useResizable'; 
// import TopNav from './TopNav';
// import ProjectForm from './ProjectForm';
// import MapContainer from './MapContainer';
// import Dashboard from './Dashboard';
// import ImpactResults from './ImpactResults';

// const AnalyzePage = ({ onBack }) => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [currentProjectName, setCurrentProjectName] = useState("");
//   const [showResults, setShowResults] = useState(false);
  
//   const [allProjects, setAllProjects] = useState([
//     { name: "Gurugram Central Hub", date: "Jan 12, 2026", status: "Completed", impact: "Low" },
//     { name: "Delhi Metro Ext. Phase 4", date: "Dec 05, 2025", status: "In Progress", impact: "High" },
//     { name: "Noida Sector 62 Flyover", date: "Nov 20, 2025", status: "Halted", impact: "Moderate" },
//   ]);

//   // Use your hook: Min 400px, Max 1000px
//   const { width, isResizing, startResizing } = useResizable(480, 400, 1000);

//   // Calculate the scale factor for the content area
//   const scaleFactor = width / 480;

//   const handleStartNewProject = (name) => {
//     setCurrentProjectName(name);
//     setShowResults(false);
//     setActiveTab('projects');
//   };

//   // const handleRunAnalysis = () => {
//   //   const newProject = {
//   //       name: currentProjectName || "Metro Project",
//   //       // UPDATE THIS LINE:
//   //       date: new Date().toLocaleDateString('en-US', { 
//   //       month: 'short', 
//   //       day: 'numeric', 
//   //       year: 'numeric' 
//   //       }),
//   //       status: "IN PROGRESS",
//   //       impact: "High" 
//   //   };
//   //   setAllProjects([newProject, ...allProjects]);
//   //   setShowResults(true); 
//   // };
//   const handleRunAnalysis = (formData) => {
//   // Existing project list logic...
//   setAllProjects([{ name: currentProjectName || "New Site", date: "Feb 1, 2026", status: "Active", impact: "High" }, ...allProjects]);

//   // NEW: Set mapData with consistent keys
//   setMapData({
//       lat: 28.4595, // Replace with dynamic formData.lat if available
//       lng: 77.0266, // Replace with dynamic formData.lng if available
//       name: currentProjectName || "Analysis Target",
//       riskLevel: "High"
//   });

//   setShowResults(true); 
// };
//   return (
//     <div className={`flex flex-col h-screen bg-[#0b1120] text-white overflow-hidden ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
//       <TopNav onBack={onBack} activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="flex flex-1 overflow-hidden">
//         {activeTab === 'dashboard' ? (
//           <Dashboard onCreateNew={handleStartNewProject} projects={allProjects} />
//         ) : (
//           <div className="flex w-full h-full relative">
            
//             {/* DYNAMIC SIDEBAR CONTAINER */}
//             <div 
//               style={{ width: `${width}px` }} 
//               className="h-full flex-shrink-0 relative flex flex-col bg-[#0b1120] border-r border-white/10 overflow-hidden"
//             >
//               {/* 1. FIXED HEADER: Stays the same size while dragging */}
//               <div className="p-8 pb-0 flex-shrink-0 bg-[#0b1120] z-20">
//                 <p className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-1">
//                   Projects / {currentProjectName || "Simulation"}
//                 </p>
//                 <h1 className="text-4xl font-bold mb-2 tracking-tight">
//                   {!showResults ? "Project Details" : "Impact Results"}
//                 </h1>
//                 <p className="text-gray-400 text-sm italic">
//                   {!showResults 
//                     ? "Configure construction parameters to predict urban impact." 
//                     : "Based on projected construction data for Q3 2026."}
//                 </p>
//               </div>

//               {/* 2. SCALABLE CONTENT: Scales proportionally using the hook width */}
//               <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#0b1120]">
//                 <div 
//                   style={{ 
//                     width: '480px',
//                     transform: `scale(${scaleFactor})`,
//                     transformOrigin: 'top left'
//                   }}
//                 >
//                   {!showResults ? (
//                     <ProjectForm 
//                       projectName={currentProjectName} 
//                       onAnalyze={handleRunAnalysis} 
//                       hideHeader={true} // Hides the header inside ProjectForm
//                     />
//                   ) : (
//                     <ImpactResults 
//                       projectName={currentProjectName} 
//                       hideHeader={true} // Hides the header inside ImpactResults
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* DRAGGABLE HANDLE */}
//               <div 
//                 onMouseDown={startResizing}
//                 className={`absolute top-0 -right-0.5 w-1 h-full cursor-col-resize z-50 transition-colors ${isResizing ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'hover:bg-blue-500/50'}`}
//               />
//             </div>
            
//             <MapContainer isResultsMode={showResults} mapData={mapData}/>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalyzePage;

import React, { useState } from 'react';
import { useResizable } from '../../hooks/useResizable'; 
import TopNav from './TopNav';
import ProjectForm from './ProjectForm';
import MapContainer from './MapContainer';
import Dashboard from './Dashboard';
import ImpactResults from './ImpactResults';

const AnalyzePage = ({ onBack }) => {
  // 1. ALL STATES MUST BE INSIDE HERE
  const [mapData, setMapData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentProjectName, setCurrentProjectName] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const [allProjects, setAllProjects] = useState([
    { name: "Gurugram Central Hub", date: "Jan 12, 2026", status: "Completed", impact: "Low" },
    { name: "Delhi Metro Ext. Phase 4", date: "Dec 05, 2025", status: "In Progress", impact: "High" },
    { name: "Noida Sector 62 Flyover", date: "Nov 20, 2025", status: "Halted", impact: "Moderate" },
  ]);

  const { width, isResizing, startResizing } = useResizable(480, 400, 1000);
  const scaleFactor = width / 480;

  const handleStartNewProject = (name) => {
    setCurrentProjectName(name);
    setShowResults(false);
    setActiveTab('projects');
    setMapData(null); // Reset map when starting new
  };

  const handleRunAnalysis = (formData) => {
    // Add to project list
    const newProject = { 
      name: currentProjectName || "New Site", 
      date: new Date().toLocaleDateString(), 
      status: "Active", 
      impact: "High" 
    };
    setAllProjects([newProject, ...allProjects]);

    // Update Map State
    setMapData({
        lat: formData?.lat || 28.4595, 
        lng: formData?.lng || 77.0266, 
        name: currentProjectName || "Analysis Target",
        riskLevel: "High"
    });

    setShowResults(true); 
  };

  return (
    <div className={`flex flex-col h-screen bg-[#0b1120] text-white overflow-hidden ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      <TopNav onBack={onBack} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'dashboard' ? (
          <Dashboard onCreateNew={handleStartNewProject} projects={allProjects} />
        ) : (
          <div className="flex w-full h-full relative">
            
            {/* DYNAMIC SIDEBAR CONTAINER */}
            <div 
              style={{ width: `${width}px` }} 
              className="h-full flex-shrink-0 relative flex flex-col bg-[#0b1120] border-r border-white/10 overflow-hidden"
            >
              <div className="p-8 pb-0 flex-shrink-0 bg-[#0b1120] z-20">
                <p className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-1">
                  Projects / {currentProjectName || "Simulation"}
                </p>
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  {!showResults ? "Project Details" : "Impact Results"}
                </h1>
                <p className="text-gray-400 text-sm italic">
                  {!showResults 
                    ? "Configure construction parameters to predict urban impact." 
                    : "Based on projected construction data for Q3 2026."}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#0b1120]">
                <div 
                  style={{ 
                    width: '480px',
                    transform: `scale(${scaleFactor})`,
                    transformOrigin: 'top left'
                  }}
                >
                  {!showResults ? (
                    <ProjectForm 
                      projectName={currentProjectName} 
                      onAnalyze={handleRunAnalysis} 
                      hideHeader={true} 
                    />
                  ) : (
                    <ImpactResults 
                      projectName={currentProjectName} 
                      hideHeader={true} 
                    />
                  )}
                </div>
              </div>

              <div 
                onMouseDown={startResizing}
                className={`absolute top-0 -right-0.5 w-1 h-full cursor-col-resize z-50 transition-colors ${isResizing ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'hover:bg-blue-500/50'}`}
              />
            </div>
            
            <MapContainer isResultsMode={showResults} mapData={mapData}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;


