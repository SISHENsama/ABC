import React from 'react';
import { ArrowRight, Newspaper, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex-1 overflow-y-auto px-10 pb-28 scrollbar-hide">
      {/* Hero Banner */}
      <div className="w-full h-[500px] rounded-3xl overflow-hidden relative shadow-2xl group mb-8 border border-white/5 mt-6">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDi-M0Tn2ZU0O2Z4WiEw3e8higmpCnnRVu_M7JV8067M75wLC6INMMihy6v4OvnSR-85W1OMSqXn-q_9XpUXkwVF1VmcZaKxlsT8CnFk3CYECg2V-lo_XMG-CWjf96anZF9OiQ6of_xM-IRaCX-iqnPq0jI06D6vVWs07ikN8FfvV4RvFX2xR3MPEA0KvzB_9nUeydZ-gqyg1xPdULBK-lOlweLK7p_ImLzfXycf36hDsQd2FNfM-GlAK5htu4_fADuKCpYZhk-xg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-background-dark/40 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full p-12 flex flex-col justify-center items-start gap-6 max-w-xl">
          <div className="bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Major Update</span>
          </div>
          <h2 className="text-7xl font-black text-white leading-none tracking-tight drop-shadow-lg">TRICKY<br/>TRIALS</h2>
          <p className="text-gray-200 text-lg font-medium leading-relaxed drop-shadow-md">
            Discover new adventures, treacherous chambers, and the breeze mob in the latest content drop. The challenge awaits those brave enough to enter.
          </p>
          <button className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
            Read Patch Notes 
            <ArrowRight className="text-primary w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Latest News */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-bold flex items-center gap-2">
          <Newspaper className="text-primary w-6 h-6" />
          Latest News
        </h3>
        <button className="text-xs text-gray-400 font-medium hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">View All News</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* News Card 1 */}
        <div className="glass-panel rounded-2xl p-4 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
          <div 
            className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn3S7mpchOtNKu3uojZpQ4lsM7diAAwIQ5QL9d8C3YZHAe-_P7dSNLm6aXAsTB41Vsjsm2DyeQFqhtJUOKLbVRpwxtvH2pZq6vo2r1FeuqtgwCRsNmhuGbSYBoTG4C09NsydRD2jyplWeJEBK5EIuq0ic8ejbUJPuH5sf01GCL2JcEktbtvtkGTMkipKRJ3PCKKARxu41gDTn6F3ue-a89YAoXavfKaiEelclEEmPmwlmPSxDpw4Q84gGqphb1w0qB_v2Zl81t5Nc')" }}
          />
          <div className="flex flex-col justify-center gap-2">
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded w-fit">Patch 1.21.0</span>
            <h4 className="text-white font-bold leading-tight text-lg group-hover:text-primary transition-colors">The Combat Update is Live!</h4>
            <p className="text-gray-400 text-sm line-clamp-2">Adjustments to weapon reach, new enchants and mechanic tweaks.</p>
          </div>
        </div>

        {/* News Card 2 */}
        <div className="glass-panel rounded-2xl p-4 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
          <div 
            className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa7HdhSj7R4GUJ7jyi_nwdzUo6mp9RTr1ip1IsQQr0ZN7RM_xAvaudOBYyhzO-s3Ss6mDSeFREOifAkk2K13l0blS9p4LXhiNUUnNc-wmD8EI4aoCY7ocebkH_-nB1kf4x_SXgovITykx83STxXOHXTVbni7T5zjRjBaRVt9Zw9x3tL_FReqavb9eDDp9LWw2cnm3Uq243XkzISFbsSg4aCO74Kr5sfPgN9kZY0oHOSDqrQECs2LksjA3EMRRzJrkzKXxrVTPrm38')" }}
          />
          <div className="flex flex-col justify-center gap-2">
            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-wider bg-purple-400/10 px-2 py-0.5 rounded w-fit">Marketplace</span>
            <h4 className="text-white font-bold leading-tight text-lg group-hover:text-purple-300 transition-colors">Summer Sale: 50% Off Skins</h4>
            <p className="text-gray-400 text-sm line-clamp-2">Grab your favorite community packs now before they are gone.</p>
          </div>
        </div>

        {/* News Card 3 */}
        <div className="glass-panel rounded-2xl p-4 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-24 h-24 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 border border-white/5">
            <MessageSquare className="text-gray-500 w-8 h-8" />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider bg-blue-400/10 px-2 py-0.5 rounded w-fit">Community</span>
            <h4 className="text-white font-bold leading-tight text-lg group-hover:text-blue-300 transition-colors">Community Highlights</h4>
            <p className="text-gray-400 text-sm line-clamp-2">See the best builds from last month's creative contest.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
