import React from 'react';
import { Play, ChevronUp } from 'lucide-react';

export default function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 glass-footer h-[90px] px-10 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="relative w-[300px]">
          <button className="w-full flex items-center justify-between bg-black/20 hover:bg-black/40 rounded-lg px-4 py-3 transition-colors group text-left border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Selected Version</span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Latest Release (1.21.0)
              </span>
            </div>
            <ChevronUp className="text-gray-400 group-hover:text-white transition-colors w-5 h-5" />
          </button>
        </div>
        <div className="h-10 w-[1px] bg-white/10"></div>
        <div className="flex gap-2 text-gray-400 text-xs font-medium">
          <span>Server Status:</span>
          <span className="text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> 
            Online
          </span>
        </div>
      </div>

      <button className="w-[280px] h-14 bg-primary text-background-dark rounded-xl font-black text-xl tracking-widest uppercase neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_0_20px_rgba(87,255,87,0.2)]">
        <span className="relative z-10">Play</span>
        <Play className="relative z-10 w-6 h-6 fill-current" />
        <div className="absolute inset-0 bg-white/30 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
      </button>
    </div>
  );
}
