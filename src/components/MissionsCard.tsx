import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { GameLayerMission, gameLayerAPI } from '../services/gameLayerApi';
import MissionEntry from './MissionEntry';

interface MissionsCardProps {
  selectedPlayerId?: string;
  refreshTrigger?: number; // Add refresh trigger prop
  onMissionPress?: (mission: GameLayerMission) => void;
  onViewAllPress?: () => void;
}

const MissionsCard: React.FC<MissionsCardProps> = ({ 
  selectedPlayerId,
  refreshTrigger,
  onMissionPress, 
  onViewAllPress 
}) => {
  const [missions, setMissions] = useState<GameLayerMission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPlayerId) {
      fetchMissions();
    } else {
      setMissions([]);
    }
  }, [selectedPlayerId]);

  const fetchMissions = async () => {
    if (!selectedPlayerId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const missionsData = await gameLayerAPI.getMissions(selectedPlayerId);
      // Filter out HIDDEN category missions
      const visibleMissions = missionsData.filter(mission => mission.category !== 'HIDDEN');
      setMissions(visibleMissions);
    } catch (err) {
      console.error('Failed to fetch missions:', err);
      setError('Failed to load missions');
    } finally {
      setLoading(false);
    }
  };

  const handleMissionPress = (mission: GameLayerMission) => {
    onMissionPress?.(mission);
  };

  if (!selectedPlayerId) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Select a player to view missions</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading missions...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={fetchMissions}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {missions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No missions available</Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {missions.map((mission) => (
            <View key={mission.id} style={styles.missionSection}>
              <View style={styles.header}>
                <Text style={styles.title}>{mission.name || 'Mission'}</Text>
              </View>
              <MissionEntry
                mission={mission}
                playerId={selectedPlayerId}
                refreshTrigger={refreshTrigger}
                onPress={() => handleMissionPress(mission)}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  missionSection: {
    marginRight: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  retryText: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8E8E93',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#E74C3C',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default MissionsCard;
