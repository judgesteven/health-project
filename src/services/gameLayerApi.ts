// GameLayer API Integration
// Based on the API details from memory: API key = 7391c391afa7e296e669818d925f1a18
// API URL = https://api.gamelayer.co/api/v0, account-id = step-up

const GAMELAYER_CONFIG = {
  API_URL: 'https://api.gamelayer.co/api/v0',
  API_KEY: '06bc187aa7f9329d3c5b2eb70ab99821',
  ACCOUNT_ID: 'health-project',
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'api-key': '06bc187aa7f9329d3c5b2eb70ab99821',
  },
};

export interface GameLayerPlayer {
  player: string; // This is the actual ID field from the API
  name: string;
  imgUrl?: string;
  tags: string[];
  category: string;
  isAvailable: boolean;
  points: number;
  credits: number;
  team: string;
  level: {
    id: string;
    name: string;
    description: string;
    imgUrl: string;
    ordinal: number;
  };
  refreshOffset: string | null;
  createdOn: string;
}

export interface GameLayerMission {
  id: string;
  name: string;
  description: string;
  imgUrl?: string;
  category: string;
  reward?: {
    points: number;
    credits: number;
  };
  objectives?: {
    events: Array<{
      currentCount: number;
      id: string;
      count: number;
    }>;
  };
  // Add other mission properties as needed
}

export interface GameLayerAchievement {
  id: string;
  title: string;
  description: string;
  // Add other achievement properties as needed
}

export interface GameLayerLeaderboard {
  id: string;
  name: string;
  entries: Array<{
    player: string;
    score: number;
    rank: number;
  }>;
}

class GameLayerAPI {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = GAMELAYER_CONFIG.API_URL;
    this.headers = GAMELAYER_CONFIG.HEADERS;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: this.headers,
      };

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GameLayer API Error:', error);
      throw error;
    }
  }

  // Player Management
  async createPlayer(playerName: string, imgUrl?: string): Promise<GameLayerPlayer> {
    // Note: Using PATCH as mentioned in memory for player creation
    return this.makeRequest<GameLayerPlayer>(
      `/players/${playerName}`,
      'PATCH',
      { name: playerName, imgUrl }
    );
  }

  async getPlayer(playerId: string): Promise<GameLayerPlayer> {
    return this.makeRequest<GameLayerPlayer>(`/players/${playerId}?account=${GAMELAYER_CONFIG.ACCOUNT_ID}`);
  }

  async getAllPlayers(): Promise<GameLayerPlayer[]> {
    return this.makeRequest<GameLayerPlayer[]>(`/players?account=${GAMELAYER_CONFIG.ACCOUNT_ID}`);
  }

  // Missions
  async getMissions(playerId?: string): Promise<GameLayerMission[]> {
    const endpoint = playerId 
      ? `/missions?player=${playerId}&account=${GAMELAYER_CONFIG.ACCOUNT_ID}`
      : `/missions?account=${GAMELAYER_CONFIG.ACCOUNT_ID}`;
    return this.makeRequest<GameLayerMission[]>(endpoint);
  }

  async getMission(missionId: string): Promise<GameLayerMission> {
    return this.makeRequest<GameLayerMission>(`/missions/${missionId}?account=${GAMELAYER_CONFIG.ACCOUNT_ID}`);
  }

  // Achievements
  async getAchievements(): Promise<GameLayerAchievement[]> {
    return this.makeRequest<GameLayerAchievement[]>('/achievements');
  }

  async getAchievement(achievementId: string): Promise<GameLayerAchievement> {
    return this.makeRequest<GameLayerAchievement>(`/achievements/${achievementId}`);
  }

  // Leaderboards
  async getLeaderboards(): Promise<GameLayerLeaderboard[]> {
    return this.makeRequest<GameLayerLeaderboard[]>('/leaderboards');
  }

  async getLeaderboard(leaderboardId: string): Promise<GameLayerLeaderboard> {
    return this.makeRequest<GameLayerLeaderboard>(`/leaderboards/${leaderboardId}`);
  }

  // Teams
  async getTeams(): Promise<any[]> {
    return this.makeRequest<any[]>('/teams');
  }

  async getTeam(teamId: string): Promise<any> {
    return this.makeRequest<any>(`/teams/${teamId}`);
  }

  // Prizes/Rewards
  async getPrizes(): Promise<any[]> {
    return this.makeRequest<any[]>('/prizes');
  }

  async getPrize(prizeId: string): Promise<any> {
    return this.makeRequest<any>(`/prizes/${prizeId}`);
  }

  // Events
  async completeEvent(eventId: string, playerId: string): Promise<any> {
    return this.makeRequest<any>(
      `/events/${eventId}/complete`,
      'POST',
      {
        player: playerId,
        account: GAMELAYER_CONFIG.ACCOUNT_ID
      }
    );
  }

  // Player Missions
  async getPlayerMission(playerId: string, missionId: string): Promise<any> {
    return this.makeRequest<any>(`/players/${playerId}/missions/${missionId}?account=${GAMELAYER_CONFIG.ACCOUNT_ID}`);
  }
}

export const gameLayerAPI = new GameLayerAPI();
