import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, ZoomIn, RotateCw, Edit3, Upload, Library, MoreVertical, CheckCircle } from 'lucide-react';
import { Skin } from '../types';
import * as skinview3d from 'skinview3d';

interface SkinsProps {
  user: any;
}

export default function Skins({ user }: SkinsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<skinview3d.SkinViewer | null>(null);
  const [currentSkin, setCurrentSkin] = useState<string>(user?.skinUrl || 'https://picsum.photos/seed/steve/100/100');

  useEffect(() => {
    if (canvasRef.current && !viewerRef.current) {
      viewerRef.current = new skinview3d.SkinViewer({
        canvas: canvasRef.current,
        width: 300,
        height: 500,
        skin: currentSkin
      });
      viewerRef.current.animations.add(skinview3d.IdleAnimation);
      viewerRef.current.controls.enableZoom = true;
    }
  }, []);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.loadSkin(currentSkin);
    }
  }, [currentSkin]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentSkin(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const skins: Skin[] = [
    {
      id: '1',
      name: 'Current Skin',
      resolution: '64x64px',
      active: true,
      image: currentSkin,
      addedAt: 'Active',
    }
  ];

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 overflow-hidden">
      {/* Left/Center: 3D Preview Stage */}
      <section className="lg:col-span-8 flex flex-col h-full min-h-[400px] relative rounded-3xl overflow-hidden border border-glass-border shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e24] to-[#0d1410]"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(43,238,121,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(43,238,121,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom pointer-events-none"></div>
        
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="relative transition-transform duration-700 hover:scale-105">
            <canvas ref={canvasRef} className="drop-shadow-[0_20px_50px_rgba(43,238,121,0.25)]" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-obsidian hover:scale-110 transition-all flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-obsidian hover:scale-110 transition-all flex items-center justify-center">
                <ZoomIn className="w-5 h-5" />
              </button>
              <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-obsidian hover:scale-110 transition-all flex items-center justify-center">
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-6 left-6 z-20">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">{skins[0].name}</h2>
              <p className="text-xs text-slate-400">{skins[0].resolution} • Active</p>
            </div>
          </div>
        </div>

        <button className="absolute top-6 right-6 z-20 glass-panel px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          Edit Skin
        </button>
      </section>

      {/* Right: Skin Gallery & Actions */}
      <aside className="lg:col-span-4 flex flex-col gap-6 h-full min-h-0">
        <div className="grid grid-cols-2 gap-3 shrink-0">
          <label className="h-24 rounded-2xl glass-card flex flex-col items-center justify-center gap-2 group hover:border-primary/50 cursor-pointer relative overflow-hidden">
            <input type="file" className="hidden" accept="image/png" onChange={handleUpload} />
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold relative z-10">Upload Skin</span>
          </label>
          <button className="h-24 rounded-2xl glass-card flex flex-col items-center justify-center gap-2 group hover:border-primary/50 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Library className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold relative z-10">Browse Library</span>
          </button>
        </div>

        <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-glass-border flex items-center justify-between shrink-0">
            <h3 className="font-bold text-lg">My Wardrobe</h3>
            <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">12 Skins</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {skins.map((skin) => (
              <div 
                key={skin.id}
                className={`p-3 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
                  skin.active 
                    ? 'bg-primary/10 border border-primary/40' 
                    : 'glass-card hover:bg-white/5'
                }`}
              >
                <div className="size-12 rounded-lg bg-black/40 border border-white/5 overflow-hidden">
                  <img src={skin.image} alt={skin.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate text-white">{skin.name}</h4>
                  <p className={`text-xs truncate ${skin.active ? 'text-primary' : 'text-slate-500'}`}>
                    {skin.addedAt}
                  </p>
                </div>
                {skin.active ? (
                  <CheckCircle className="text-primary w-5 h-5" />
                ) : (
                  <button className="text-slate-500 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
