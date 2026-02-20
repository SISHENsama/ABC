export type Screen = 'home' | 'installations' | 'skins' | 'mods' | 'settings';

export interface Installation {
  id: string;
  name: string;
  version: string;
  type: 'Vanilla' | 'Fabric' | 'Forge' | 'Snap';
  lastPlayed: string;
  icon: string;
  active?: boolean;
}

export interface Mod {
  id: string;
  name: string;
  description: string;
  version: string;
  type: string;
  enabled: boolean;
  updateAvailable?: boolean;
  icon: string;
}

export interface Skin {
  id: string;
  name: string;
  resolution: string;
  active: boolean;
  image: string;
  addedAt: string;
}
