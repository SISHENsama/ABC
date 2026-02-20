import React from 'react';
import { Home, List, Palette, Puzzle, Settings, Diamond } from 'lucide-react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function Sidebar({ currentScreen, onScreenChange }: SidebarProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'installations' as Screen, icon: List, label: 'Installations' },
    { id: 'skins' as Screen, icon: Palette, label: 'Skins' },
    { id: 'mods' as Screen, icon: Puzzle, label: 'Mods' },
  ];

  return (
    <aside className="w-[80px] h-full z-30 glass-sidebar flex flex-col items-center py-8 gap-8 shrink-0">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <Diamond className="text-primary w-6 h-6" />
      </div>
      
      <nav className="flex flex-col gap-6 w-full items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className="flex flex-col items-center gap-1 group relative w-full"
          >
            {currentScreen === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
            <div className={`p-3 rounded-xl transition-colors ${
              currentScreen === item.id 
                ? 'bg-primary/20 text-primary' 
                : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
            }`}>
              <item.icon className="w-6 h-6" />
            </div>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => onScreenChange('settings')}
          className={`p-3 rounded-xl transition-colors ${
            currentScreen === 'settings'
              ? 'bg-primary/20 text-primary'
              : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
          }`}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
}
