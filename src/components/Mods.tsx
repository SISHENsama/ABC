import React, { useState, useCallback, useEffect } from 'react';
import { Search, Bell, Sliders, CheckCircle, Download, ArrowRight, Upload } from 'lucide-react';
import { Mod } from '../types';
import axios from 'axios';

export default function Mods() {
  const [mods, setMods] = useState<Mod[]>([]);

  useEffect(() => {
    fetchMods();
  }, []);

  const fetchMods = async () => {
    const res = await axios.get('/api/mods');
    setMods(res.data);
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files) as File[];
    const modFiles = files.filter(file => file.name.endsWith('.jar') || file.name.endsWith('.zip'));

    if (modFiles.length > 0) {
      // In a real app, you would upload these files
      // For demo, we'll just simulate adding them
      const newMods: Mod[] = modFiles.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name.replace(/\.(jar|zip)$/, ''),
        description: 'Newly installed mod',
        version: 'v1.0.0',
        type: 'Added',
        enabled: true,
        icon: `https://picsum.photos/seed/${file.name}/100/100`,
      }));

      setMods(prev => [...newMods, ...prev]);
    }
  }, []);

  const toggleMod = async (mod: Mod) => {
    try {
      await axios.post('/api/mods/toggle', { file: mod.id, enabled: !mod.enabled });
      fetchMods();
    } catch (err) {
      console.error("Failed to toggle mod", err);
    }
  };

  return (
    <main 
      className="flex-1 flex flex-col h-full relative overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-primary/20 backdrop-blur-md flex items-center justify-center border-4 border-dashed border-primary m-4 rounded-3xl pointer-events-none">
          <div className="flex flex-col items-center gap-4 text-primary">
            <Upload className="w-20 h-20 animate-bounce" />
            <h2 className="text-3xl font-black uppercase tracking-widest">Drop to Install Mods</h2>
            <p className="text-white font-bold">Supports .jar and .zip files</p>
          </div>
        </div>
      )}

      <header className="relative z-10 pt-6 pb-2 px-10 flex flex-col gap-4 bg-gradient-to-b from-[#111814] to-transparent">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-white">Library</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-white/50 group-focus-within:text-primary transition-colors w-5 h-5" />
          </div>
          <input 
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all" 
            placeholder="Search mods, add-ons..." 
            type="text"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button className="p-1 rounded-lg hover:bg-white/10 text-white/50">
              <Sliders className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-primary text-[#111814] text-sm font-bold shadow-[0_0_15px_rgba(19,236,128,0.3)]">All Mods</button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all">Installed</button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all">Update Available</button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all">Disabled</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-10 pb-28 space-y-6">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 mix-blend-overlay"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500"
            style={{ backgroundImage: "url('https://picsum.photos/seed/banner/1200/400')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111814] via-transparent to-transparent"></div>
          <div className="relative p-5 flex flex-col items-start gap-3">
            <div className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-lg border border-primary/30">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Store</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">Discover New<br/>Adventures</h2>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span>Browse 5,000+ verified mods</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mods.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => toggleMod(mod)}
              className={`glass-card rounded-xl p-4 flex items-center gap-4 group transition-all cursor-pointer ${
                mod.enabled ? 'hover:border-primary/30' : 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0'
              }`}
            >
              <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[#283930]">
                <img src={mod.icon} alt={mod.name} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="text-white font-bold text-base truncate pr-2">{mod.name}</h3>
                  <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
                    <input type="checkbox" checked={mod.enabled} className="sr-only peer" readOnly />
                    <div className="w-9 h-5 bg-[#283930] rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 transition-all border border-white/10 peer-checked:bg-primary">
                      <div className={`absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-4 w-4 transition-transform duration-200 ${mod.enabled ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>
                </div>
                <p className="text-white/50 text-xs truncate">{mod.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] bg-white/5 border border-white/5 px-1.5 py-0.5 rounded text-white/60">{mod.version}</span>
                  {mod.enabled && (
                    <span className="text-[10px] text-primary flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" />
                      Active
                    </span>
                  )}
                  {mod.updateAvailable && (
                    <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Download className="w-2.5 h-2.5" /> Update
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
