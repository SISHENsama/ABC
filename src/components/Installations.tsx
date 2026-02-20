import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Sprout, Wrench, Sword, Bug } from 'lucide-react';
import { Installation } from '../types';
import axios from 'axios';

export default function Installations() {
  const [installations, setInstallations] = useState<Installation[]>([]);

  useEffect(() => {
    axios.get('/api/versions').then(res => {
      const versions: string[] = res.data;
      const mapped: Installation[] = versions.map((v, i) => ({
        id: i.toString(),
        name: `Minecraft ${v}`,
        version: v,
        type: v.includes('w') ? 'Snap' : 'Vanilla',
        lastPlayed: 'Never',
        icon: v.includes('w') ? 'bug' : 'grass',
        active: i === 0
      }));
      setInstallations(mapped);
    });
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'grass': return <Sprout className="text-primary w-8 h-8" />;
      case 'wrench': return <Wrench className="text-amber-400 w-8 h-8" />;
      case 'sword': return <Sword className="text-purple-400 w-8 h-8" />;
      case 'bug': return <Bug className="text-red-400 w-8 h-8" />;
      default: return <Sprout className="text-primary w-8 h-8" />;
    }
  };

  const getTagStyle = (type: string) => {
    switch (type) {
      case 'Vanilla': return 'bg-slate-700 text-slate-300';
      case 'Fabric': return 'bg-amber-900/40 text-amber-400 border border-amber-500/20';
      case 'Forge': return 'bg-purple-900/40 text-purple-400 border border-purple-500/20';
      case 'Snap': return 'bg-red-900/40 text-red-400 border border-red-500/20';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full relative overflow-hidden">
      <header className="sticky top-0 z-10 glass-panel border-b border-glass-border px-10 py-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight">Installations</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all active:scale-95 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="font-semibold">New Installation</span>
        </button>
      </header>

      <div className="px-10 py-4 flex gap-3 overflow-x-auto no-scrollbar">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            className="w-full bg-black/20 border border-glass-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" 
            placeholder="Search versions..." 
            type="text"
          />
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium whitespace-nowrap">All Versions</button>
        <button className="px-4 py-2 rounded-lg bg-black/20 border border-glass-border text-slate-400 text-sm font-medium hover:text-white whitespace-nowrap">Modded</button>
        <button className="px-4 py-2 rounded-lg bg-black/20 border border-glass-border text-slate-400 text-sm font-medium hover:text-white whitespace-nowrap">Snapshots</button>
      </div>

      <div className="px-10 pb-28 space-y-3 overflow-y-auto">
        {installations.map((inst) => (
          <div 
            key={inst.id}
            className={`glass-panel rounded-xl p-4 flex items-center gap-4 group cursor-pointer transition-all hover:bg-white/5 relative overflow-hidden ${inst.active ? 'active-glow border-primary/40' : ''}`}
          >
            {inst.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-slate-800 to-black flex items-center justify-center shrink-0 border border-white/10 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/mc/100/100')" }} />
              {getIcon(inst.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-lg truncate">{inst.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getTagStyle(inst.type)}`}>
                  {inst.type}
                </span>
              </div>
              {inst.active ? (
                <p className="text-primary text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Selected Profile
                </p>
              ) : (
                <p className="text-slate-500 text-xs truncate">{inst.version}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-1">
              <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-500 whitespace-nowrap">{inst.lastPlayed}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
