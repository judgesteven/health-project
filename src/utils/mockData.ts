import { User, Mission, Achievement, LeaderboardEntry, Prize, Team } from '../types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  avatar: 'https://via.placeholder.com/100x100/4A90E2/FFFFFF?text=AJ',
  level: 12,
  experience: 2450,
  totalSteps: 125000,
  weeklySteps: 45000,
  dailySteps: 8500,
  rank: 15,
  team: 'Fitness Warriors'
};

export const mockMissions: Mission[] = [
  {
    id: 'mission-1',
    title: 'Daily Walker',
    description: 'Walk 10,000 steps today',
    type: 'steps',
    target: 10000,
    current: 8500,
    reward: {
      experience: 100,
      coins: 50
    },
    isCompleted: false,
    expiresAt: '2024-01-20T23:59:59Z'
  },
  {
    id: 'mission-2',
    title: 'Weekend Warrior',
    description: 'Complete 25,000 steps this weekend',
    type: 'steps',
    target: 25000,
    current: 18000,
    reward: {
      experience: 250,
      coins: 100
    },
    isCompleted: false,
    expiresAt: '2024-01-21T23:59:59Z'
  },
  {
    id: 'mission-3',
    title: 'Early Bird',
    description: 'Walk 5,000 steps before 9 AM',
    type: 'steps',
    target: 5000,
    current: 5000,
    reward: {
      experience: 75,
      coins: 25
    },
    isCompleted: true,
    expiresAt: '2024-01-20T09:00:00Z'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'First Steps',
    description: 'Complete your first mission',
    icon: '🏃‍♂️',
    isUnlocked: true,
    unlockedAt: '2024-01-15T10:30:00Z',
    rarity: 'common'
  },
  {
    id: 'achievement-2',
    title: 'Step Master',
    description: 'Walk 100,000 total steps',
    icon: '👑',
    isUnlocked: true,
    unlockedAt: '2024-01-18T15:45:00Z',
    rarity: 'rare'
  },
  {
    id: 'achievement-3',
    title: 'Consistency King',
    description: 'Complete missions for 7 consecutive days',
    icon: '🔥',
    isUnlocked: false,
    rarity: 'epic'
  },
  {
    id: 'achievement-4',
    title: 'Legendary Walker',
    description: 'Walk 1,000,000 total steps',
    icon: '🌟',
    isUnlocked: false,
    rarity: 'legendary'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: 'user-2',
      name: 'Sarah Chen',
      avatar: 'https://via.placeholder.com/50x50/E74C3C/FFFFFF?text=SC'
    },
    score: 125000,
    isCurrentUser: false
  },
  {
    rank: 2,
    user: {
      id: 'user-3',
      name: 'Mike Rodriguez',
      avatar: 'https://via.placeholder.com/50x50/2ECC71/FFFFFF?text=MR'
    },
    score: 118000,
    isCurrentUser: false
  },
  {
    rank: 3,
    user: {
      id: 'user-4',
      name: 'Emma Wilson',
      avatar: 'https://via.placeholder.com/50x50/9B59B6/FFFFFF?text=EW'
    },
    score: 112000,
    isCurrentUser: false
  },
  {
    rank: 15,
    user: {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=AJ'
    },
    score: 85000,
    isCurrentUser: true
  }
];

export const mockPrizes: Prize[] = [
  {
    id: 'prize-1',
    title: 'Premium Water Bottle',
    description: 'Insulated stainless steel water bottle',
    image: 'https://via.placeholder.com/100x100/3498DB/FFFFFF?text=💧',
    cost: 500,
    category: 'health',
    isAvailable: true,
    isOwned: false
  },
  {
    id: 'prize-2',
    title: 'Fitness Tracker',
    description: 'Advanced fitness tracking device',
    image: 'https://via.placeholder.com/100x100/E74C3C/FFFFFF?text=⌚',
    cost: 2000,
    category: 'fitness',
    isAvailable: true,
    isOwned: false
  },
  {
    id: 'prize-3',
    title: 'Yoga Mat',
    description: 'Premium non-slip yoga mat',
    image: 'https://via.placeholder.com/100x100/2ECC71/FFFFFF?text=🧘',
    cost: 800,
    category: 'wellness',
    isAvailable: true,
    isOwned: true
  },
  {
    id: 'prize-4',
    title: 'Healthy Cookbook',
    description: 'Digital cookbook with healthy recipes',
    image: 'https://via.placeholder.com/100x100/F39C12/FFFFFF?text=📚',
    cost: 300,
    category: 'lifestyle',
    isAvailable: true,
    isOwned: false
  }
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Fitness Warriors',
    description: 'A team dedicated to achieving fitness goals together',
    members: 25,
    totalSteps: 1250000,
    rank: 3,
    isJoined: true
  },
  {
    id: 'team-2',
    name: 'Step Masters',
    description: 'Elite walkers pushing the boundaries',
    members: 18,
    totalSteps: 2100000,
    rank: 1,
    isJoined: false
  },
  {
    id: 'team-3',
    name: 'Morning Movers',
    description: 'Early risers who start their day with activity',
    members: 32,
    totalSteps: 980000,
    rank: 5,
    isJoined: false
  }
];
