import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';
import Home from './components/Home';
import Installations from './components/Installations';
import Skins from './components/Skins';
import Mods from './components/Mods';
import Settings from './components/Settings';
import { Screen } from './types';
import axios from 'axios';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<{ name: string; uuid: string; skinUrl: string } | null>(null);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // Fetch initial config
    axios.get('/api/config').then(res => setConfig(res.data));

    // Handle OAuth messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setUser(event.data.user);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = async () => {
    const res = await axios.get('/api/auth/url');
    window.open(res.data.url, 'oauth_popup', 'width=600,height=700');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <Home />;
      case 'installations': return <Installations />;
      case 'skins': return <Skins user={user} />;
      case 'mods': return <Mods />;
      case 'settings': return <Settings config={config} onSave={(newConfig: any) => setConfig(newConfig)} />;
      default: return <Home />;
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 font-sans min-h-screen flex relative overflow-hidden h-screen w-full mx-auto">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <Sidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />

      <div className="flex-1 flex flex-col h-full relative z-10">
        <header className="flex items-center justify-between px-10 py-6 w-full shrink-0">
          <div className="flex flex-col">
            <nav className="flex gap-6 text-sm font-medium text-gray-400 mb-1">
              <button className="text-white hover:text-primary transition-colors">Java Edition</button>
              <button className="hover:text-white transition-colors">Bedrock Edition</button>
              <button className="hover:text-white transition-colors">Dungeons</button>
              <button className="hover:text-white transition-colors">Legends</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">Welcome back,</p>
              <p className="text-white font-bold text-sm">{user ? user.name : 'Steve'}</p>
            </div>
            <div className="relative group cursor-pointer" onClick={handleLogin}>
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden bg-obsidian-light shadow-lg">
                <img 
                  alt="User Avatar" 
                  className="w-full h-full object-cover" 
                  src={user ? user.skinUrl : "https://picsum.photos/seed/user1/100/100"} 
                />
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${user ? 'bg-primary' : 'bg-gray-500'} border-2 border-background-dark rounded-full shadow-[0_0_8px_rgba(87,255,87,0.6)]`}></div>
            </div>
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}
