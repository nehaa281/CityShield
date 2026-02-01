import React, { useState } from 'react';

export default function ProjectForm({ onAnalyze, projectName, hideHeader = false }) {
  // 1. Equipment state management
  const [equipment, setEquipment] = useState(['Excavators', 'Tower Cranes', 'Cement Mixers']);
  
  // 2. Modal state management
  const [showModal, setShowModal] = useState(false);
  const [newEqName, setNewEqName] = useState("");

  const handleAddEquipment = (e) => {
    e.preventDefault();
    if (newEqName.trim()) {
      setEquipment([...equipment, newEqName.trim()]);
      setNewEqName(""); // Reset input
      setShowModal(false); // Close modal
    }
  };

  const removeEquipment = (itemToRemove) => {
    setEquipment(equipment.filter(item => item !== itemToRemove));
  };

  return (
    <div className="w-full h-full p-10 overflow-y-auto bg-[#0b1120] flex flex-col relative">
      {!hideHeader && (
        <div className="mb-10">
          <p className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Projects / {projectName || "New Analysis"}
          </p>
          {/* Added 'capitalize' class to fix lowercase names like 'metro' */}
          <h1 className="text-4xl font-bold mb-4 tracking-tight text-white capitalize">
            {projectName || "Project Details"}
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Configure construction parameters to predict urban impact for North Indian cityscapes.
          </p>
        </div>
      )}

      <form className="space-y-8 flex-1" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Site Address</label>
          <input 
            type="text" 
            placeholder="e.g. Gurugram Sector 45, India" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 focus:border-blue-500 outline-none text-base transition text-white" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Project Type</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none text-base text-white appearance-none cursor-pointer">
            <option>Residential High-Rise</option>
            <option>Infrastructure/Bridge</option>
            <option>Commercial Hub</option>
          </select>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Duration (Months)</label>
            <input type="number" placeholder="eg. 24" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-base" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Area (sqm)</label>
            <input type="number" placeholder="eg. 12500" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-base" />
          </div>
        </div>

        {/* --- EQUIPMENT LIST SECTION --- */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Equipment List</label>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-wrap gap-3">
            {equipment.map(item => (
              <span key={item} className="bg-blue-600/20 text-blue-400 text-xs font-bold px-4 py-2 rounded-full border border-blue-500/30 flex items-center gap-2">
                {item} 
                <button 
                  type="button" 
                  onClick={() => removeEquipment(item)}
                  className="hover:text-white opacity-60 transition-opacity"
                >
                  ×
                </button>
              </span>
            ))}
            <button 
              type="button" 
              onClick={() => setShowModal(true)}
              className="text-xs text-blue-400 font-bold hover:text-blue-300 ml-2 transition-colors"
            >
              + Add Equipment
            </button>
          </div>
        </div>

        <button  
          type="button" 
          onClick={onAnalyze} 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl mt-10 flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/30 text-lg active:scale-95"
        >
          ⚡ Analyze Impact
        </button>
      </form>

<button   
  type="button" 
  onClick={() => onAnalyze({ lat: 28.4595, lng: 77.0266 })} // Pass dummy or real coords
  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl mt-10 ..."
>
  ⚡ Analyze Impact
</button> 

      {/* --- CUSTOM ADD EQUIPMENT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm transition-all">
          <div className="w-full max-w-sm bg-[#161e2d] border border-white/10 rounded-3xl p-8 shadow-2xl transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-2">Add Equipment</h3>
            <p className="text-gray-400 text-sm mb-6">Enter machinery name to include in simulation.</p>
            
            <form onSubmit={handleAddEquipment}>
              <input 
                autoFocus
                type="text" 
                value={newEqName}
                onChange={(e) => setNewEqName(e.target.value)}
                placeholder="e.g. Tower Crane" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 focus:border-blue-500 outline-none text-white mb-6"
              />
              
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}