/**
 * Health Gamification App - Web Version
 * Integrates with GameLayer API for missions, achievements, leaderboards, and prizes
 * Web-optimized version of the mobile app
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { 
  StatusBar, 
  StyleSheet, 
  useColorScheme, 
  View, 
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity
} from 'react-native';

// Import our components
import UserSelector from './src/components/UserSelector';
import ProfileCard from './src/components/ProfileCard';
import StepCountCard from './src/components/StepCountCard';
import MissionsCard from './src/components/MissionsCard';
import RankingsCard from './src/components/RankingsCard';
import PrizesCard from './src/components/PrizesCard';

// Import mock data
import { 
  mockLeaderboard, 
  mockPrizes 
} from './src/utils/mockData';

// Import GameLayer API
import { gameLayerAPI, GameLayerPlayer } from './src/services/gameLayerApi';

// Import mission utilities
import { findDailyMission } from './src/utils/missionUtils';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </View>
  );
}

function AppContent() {
  const [refreshing, setRefreshing] = useState(false);
  const [userCoins, setUserCoins] = useState(1250); // Mock user coins
  const [selectedPlayer, setSelectedPlayer] = useState<GameLayerPlayer | null>(null);
  const [stepCount, setStepCount] = useState(0); // Today's step count
  const [missionRefreshTrigger, setMissionRefreshTrigger] = useState(0); // Trigger for mission refresh

  // Initialize health data service on app start
  useEffect(() => {
    initializeHealthData();
    // Load persisted player data
    loadPersistedPlayer();
  }, []);

  // Load persisted player data from localStorage
  const loadPersistedPlayer = async () => {
    try {
      const persistedPlayerData = localStorage.getItem('selectedPlayer');
      if (persistedPlayerData) {
        const player = JSON.parse(persistedPlayerData);
        setSelectedPlayer(player);
        // Fetch step count for the persisted player
        await fetchStepCount(player.player);
        console.log('Loaded persisted player:', player.name);
      }
    } catch (error) {
      console.error('Failed to load persisted player:', error);
    }
  };

  const initializeHealthData = async () => {
    try {
      // For web, we'll simulate health data since we can't access device sensors
      console.log('Web version: Simulating health data initialization');
      console.log('Health data permissions granted (simulated)');
      // Simulate GameLayer sync
      console.log('Simulating GameLayer sync...');
    } catch (error) {
      console.error('Failed to initialize health data:', error);
    }
  };


  // Fetch step count from GameLayer mission data
  const fetchStepCount = async (playerId: string) => {
    try {
      console.log('Fetching missions to find daily mission for player:', playerId);
      
      // First, get all missions to find the daily one
      const missions = await gameLayerAPI.getMissions(playerId);
      const dailyMission = findDailyMission(missions);
      
      if (!dailyMission) {
        console.log('No daily mission found');
        setStepCount(0);
        return;
      }
      
      console.log('Found daily mission:', dailyMission.id, dailyMission.name);
      
      // Fetch individual mission progress data
      const missionData = await gameLayerAPI.getPlayerMission(playerId, dailyMission.id);
      console.log('Individual mission response:', JSON.stringify(missionData, null, 2));
      
      // Extract currentCount from the individual mission response
      const currentCount = missionData?.progress?.events?.[0]?.currentCount || 0;
      console.log('Extracted currentCount from daily mission:', currentCount);
      setStepCount(currentCount);
    } catch (error) {
      console.error('Failed to fetch step count:', error);
      setStepCount(0);
    }
  };

  // Refresh player data (points, credits, etc.)
  const refreshPlayerData = async (playerId: string) => {
    try {
      console.log('Refreshing player data for:', playerId);
      const playerData = await gameLayerAPI.getPlayer(playerId);
      console.log('Refreshed player data:', JSON.stringify(playerData, null, 2));
      
      // Update the selected player with fresh data
      setSelectedPlayer(playerData);
      
      // Update localStorage with fresh data
      localStorage.setItem('selectedPlayer', JSON.stringify(playerData));
      
      console.log('Player data refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh player data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate refreshing health data and syncing with GameLayer
      console.log('Simulating data refresh...');
      // In a real app, you would also refresh data from GameLayer API
      console.log('Data refreshed');
    } catch (error) {
      console.error('Failed to refresh data:', error);
      Alert.alert('Error', 'Failed to refresh data. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile details coming soon!');
  };

  const handleMissionPress = (mission: any) => {
    Alert.alert('Mission', `Selected: ${mission.title}`);
  };

  const handleViewAllMissions = () => {
    Alert.alert('Missions', 'View all missions coming soon!');
  };

  const handleUserPress = (user: any) => {
    Alert.alert('User Profile', `Viewing ${user.user.name}'s profile`);
  };

  const handleViewAllRankings = () => {
    Alert.alert('Leaderboard', 'Full leaderboard coming soon!');
  };

  const handlePrizePress = (prize: any) => {
    if (prize.isOwned) {
      Alert.alert('Prize', 'You already own this prize!');
    } else if (!prize.isAvailable) {
      Alert.alert('Prize', 'This prize is currently unavailable');
    } else if (userCoins >= prize.cost) {
      Alert.alert(
        'Purchase Prize', 
        `Buy ${prize.title} for ${prize.cost} coins?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Buy', 
            onPress: () => {
              setUserCoins(prev => prev - prize.cost);
              Alert.alert('Success', 'Prize purchased successfully!');
            }
          }
        ]
      );
    } else {
      Alert.alert('Insufficient Coins', 'You need more coins to buy this prize');
    }
  };

  const handleViewAllPrizes = () => {
    Alert.alert('Prize Shop', 'Full prize shop coming soon!');
  };

  const handleAddSteps = async () => {
    if (!selectedPlayer) {
      Alert.alert('Error', 'Please select a player first');
      return;
    }

    try {
      console.log('Completing step-tracker event for player:', selectedPlayer.player);
      
      // Complete the step-tracker event
      const result = await gameLayerAPI.completeEvent('step-tracker', selectedPlayer.player);
      console.log('Event completion result:', result);
      
      // Refresh step count from mission data
      await fetchStepCount(selectedPlayer.player);
      
      // Refresh player data (points, credits, etc.)
      await refreshPlayerData(selectedPlayer.player);
      
      // Trigger mission refresh to update progress bars
      setMissionRefreshTrigger(prev => prev + 1);
      
      Alert.alert('Success', `Steps recorded successfully! New step count: ${stepCount}`);
    } catch (error) {
      console.error('Failed to add steps:', error);
      Alert.alert('Error', 'Failed to add steps. Please try again.');
    }
  };

  // Clear persisted player data
  const clearPersistedPlayer = () => {
    localStorage.removeItem('selectedPlayer');
    setSelectedPlayer(null);
    setStepCount(0);
    console.log('Cleared persisted player data');
  };

  const handleUserSelect = async (player: GameLayerPlayer) => {
    try {
      setSelectedPlayer(player);
      
      // Persist player data to localStorage
      localStorage.setItem('selectedPlayer', JSON.stringify(player));
      
      console.log('Selected player:', player);
      
      // Fetch step count for the selected player
      await fetchStepCount(player.player);
      
      console.log('Player selected:', player.name);
    } catch (error) {
      console.error('Failed to select player:', error);
      Alert.alert('Error', 'Failed to select player. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        <UserSelector 
          onUserSelect={handleUserSelect}
          selectedUserId={selectedPlayer?.player}
        />
        
        {/* Debug Section */}
        {selectedPlayer && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>
              Selected: {selectedPlayer.name} (ID: {selectedPlayer.player})
            </Text>
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={clearPersistedPlayer}
            >
              <Text style={styles.clearButtonText}>Clear Player Data</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredByText}>POWERED BY GAMELAYER</Text>
        </View>
        
        <ProfileCard user={selectedPlayer} onPress={handleProfilePress} />
        <StepCountCard 
          stepCount={stepCount} 
          onAddSteps={handleAddSteps} 
        />
        <MissionsCard 
          selectedPlayerId={selectedPlayer?.player}
          refreshTrigger={missionRefreshTrigger}
          onMissionPress={handleMissionPress}
          onViewAllPress={handleViewAllMissions}
        />
        <RankingsCard 
          leaderboard={mockLeaderboard}
          onUserPress={handleUserPress}
          onViewAllPress={handleViewAllRankings}
        />
        <PrizesCard 
          prizes={mockPrizes}
          userCoins={userCoins}
          onPrizePress={handlePrizePress}
          onViewAllPress={handleViewAllPrizes}
        />
        
        {/* Spacer to ensure scrollable content */}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  poweredByContainer: {
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  poweredByText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8E8E93',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  debugContainer: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  debugText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  spacer: {
    height: 200,
  },
});

export default App;
