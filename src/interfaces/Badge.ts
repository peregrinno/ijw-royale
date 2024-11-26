export interface Badge {
    uuid: string; // UUID
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    image: string; // URL
  }
  