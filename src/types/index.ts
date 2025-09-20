export interface User {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  experience: number;
  totalSteps: number;
  weeklySteps: number;
  dailySteps: number;
  rank: number;
  team?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'steps' | 'distance' | 'calories' | 'time';
  target: number;
  current: number;
  reward: {
    experience: number;
    coins?: number;
  };
  isCompleted: boolean;
  expiresAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  score: number;
  isCurrentUser: boolean;
}

export interface Prize {
  id: string;
  title: string;
  description: string;
  image: string;
  cost: number;
  category: 'health' | 'fitness' | 'wellness' | 'lifestyle';
  isAvailable: boolean;
  isOwned: boolean;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  totalSteps: number;
  rank: number;
  isJoined: boolean;
}
