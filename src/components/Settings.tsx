import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, MemoryStick, Video, Terminal, LogOut, UserPlus, Palette, AlertTriangle, ChevronDown } from 'lucide-react';
import axios from 'axios';

interface SettingsProps {
  config: any;
  onSave: (config: any) => void;
}

export default function Settings({ config, onSave }: SettingsProps) {
  const [ram, setRam] = useState(config?.ram || 8);
  const [fullscreen, setFullscreen] = useState(config?.fullscreen || false);
  const [shaders, setShaders] = useState(config?.shaders || true);
  const [javaPath, setJavaPath] = useState(config?.javaPath || 'java');
  const [resolution, setResolution] = useState(config?.resolution || '1920x1080');

  useEffect(() => {
    if (config) {
      setRam(config.ram);
      setFullscreen(config.fullscreen);
      setShaders(config.shaders);
      setJavaPath(config.javaPath);
      setResolution(config.resolution);
    }
  }, [config]);

  const handleSave = async () => {
    const newConfig = {
      ram,
      fullscreen,
      shaders,
      javaPath,
      resolution
    };
    await axios.post('/api/config', newConfig);
    onSave(newConfig);
  };

  return (
    <main className="flex-1 flex flex-col h-full relative overflow-hidden">
      <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-6 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-slate-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-white">Launcher Settings</h1>
        </div>
        <button onClick={handleSave} className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">Save Changes</button>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="sticky top-0 z-40 bg-background-dark/95 backdrop-blur-sm border-b border-white/5 py-3 px-10">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            <button className="flex flex-col items-center gap-1 min-w-[4rem]">
              <span className="text-sm font-bold text-white">Account</span>
              <div className="h-1 w-full rounded-full bg-primary shadow-[0_0_10px_rgba(13,242,128,0.6)]"></div>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[4rem] group">
              <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Video</span>
              <div className="h-1 w-full rounded-full bg-transparent group-hover:bg-white/10"></div>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[4rem] group">
              <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Java</span>
              <div className="h-1 w-full rounded-full bg-transparent group-hover:bg-white/10"></div>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[4rem] group">
              <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Launcher</span>
              <div className="h-1 w-full rounded-full bg-transparent group-hover:bg-white/10"></div>
            </button>
          </div>
        </div>

        <div className="p-10 space-y-10 max-w-4xl mx-auto">
          {/* Account Profile */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="text-primary w-5 h-5" />
                Active Profile
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
              <div className="relative flex items-center gap-6 z-10">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-lg bg-obsidian-light border-2 border-primary/30 shadow-lg overflow-hidden flex items-center justify-center">
                    <img src="https://picsum.photos/seed/steve/100/100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-background-dark">PRO</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white truncate">Steve_Gamer123</h3>
                  <p className="text-sm text-primary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Microsoft Account
                  </p>
                </div>
                <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5">
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 relative z-10">
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors">
                  <UserPlus className="w-5 h-5" />
                  Add Alt
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors">
                  <Palette className="w-5 h-5" />
                  Skins
                </button>
              </div>
            </div>
          </section>

          {/* Memory Allocation */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MemoryStick className="text-primary w-5 h-5" />
                Memory Allocation
              </h2>
              <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">64-bit Java</span>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
              <div className="flex justify-between items-end mb-6">
                <label className="text-sm text-slate-400 font-medium">RAM Usage</label>
                <span className="text-3xl font-bold text-primary tracking-tight">{ram.toFixed(1)} <span className="text-sm text-white font-normal">GB</span></span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="32" 
                step="0.5" 
                value={ram} 
                onChange={(e) => setRam(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-3 text-xs text-slate-500 font-mono">
                <span>2GB</span>
                <span>16GB</span>
                <span>32GB</span>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                <AlertTriangle className="text-yellow-500 w-5 h-5" />
                <p className="text-xs text-slate-400 leading-relaxed">Allocating more than 12GB may cause instability on this device.</p>
              </div>
            </div>
          </section>

          {/* Video Settings */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="text-primary w-5 h-5" />
                Video Settings
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div 
                onClick={() => setFullscreen(!fullscreen)}
                className="group rounded-lg bg-white/5 border border-white/10 p-5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer backdrop-blur-md"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Fullscreen Mode</span>
                  <span className="text-xs text-slate-400">Launch game in borderless window</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative ${fullscreen ? 'bg-primary' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${fullscreen ? 'left-7' : 'left-1'}`} />
                </div>
              </div>

              <div 
                onClick={() => setShaders(!shaders)}
                className="group rounded-lg bg-white/5 border border-white/10 p-5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer backdrop-blur-md"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Enable Shaders</span>
                  <span className="text-xs text-slate-400">Iris / Optifine integration</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative ${shaders ? 'bg-primary' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${shaders ? 'left-7' : 'left-1'}`} />
                </div>
              </div>

              <div className="group rounded-lg bg-white/5 border border-white/10 p-5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Java Path</span>
                  <span className="text-xs text-slate-400">Path to your Java executable</span>
                </div>
                <input 
                  type="text" 
                  value={javaPath} 
                  onChange={(e) => setJavaPath(e.target.value)}
                  className="bg-obsidian-light/50 text-sm text-slate-300 border-none rounded-lg focus:ring-1 focus:ring-primary px-3 py-1.5 outline-none"
                />
              </div>

              <div className="group rounded-lg bg-white/5 border border-white/10 p-5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Resolution</span>
                  <span className="text-xs text-slate-400">Default: 1920x1080</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-sm font-mono">Auto</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </section>

          {/* JVM Arguments */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="text-primary w-5 h-5" />
                JVM Arguments
              </h2>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-1 backdrop-blur-md">
              <textarea 
                className="w-full h-32 bg-transparent text-xs font-mono text-slate-300 border-none rounded-lg focus:ring-1 focus:ring-primary p-4 resize-none placeholder-slate-600 outline-none" 
                placeholder="-Xmx4G -Xms4G -Dsun.rmi.dgc.server.gcInterval=2147483646 ..."
                defaultValue="-Xmx8G -Xms8G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
