import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Gem, Zap } from 'lucide-react-native';
import { gameLayerAPI } from '../services/gameLayerApi';
import { isDailyMission, extractProgressData } from '../utils/missionUtils';

interface MissionEntryProps {
  mission: {
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
  };
  playerId?: string;
  refreshTrigger?: number; // Add refresh trigger prop
  onPress?: () => void;
}

const MissionEntry: React.FC<MissionEntryProps> = ({ mission, playerId, refreshTrigger, onPress }) => {
  const [missionProgress, setMissionProgress] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Safe access to nested properties with fallbacks
  const points = mission.reward?.points || 0;
  const credits = mission.reward?.credits || 0;
  
  // Fetch individual mission progress data
  useEffect(() => {
    if (playerId && isDailyMission(mission)) {
      fetchMissionProgress();
    }
  }, [playerId, mission.id, refreshTrigger]); // Add refreshTrigger dependency

  const fetchMissionProgress = async () => {
    if (!playerId) return;
    
    setLoading(true);
    try {
      const progressData = await gameLayerAPI.getPlayerMission(playerId, mission.id);
      setMissionProgress(progressData);
      console.log(`Mission ${mission.id} progress:`, progressData);
    } catch (error) {
      console.error(`Failed to fetch progress for mission ${mission.id}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  // Get progress data using utility function
  const progressData = extractProgressData(missionProgress, mission);
  const { target, currentProgress, progressPercentage } = progressData;
  
  console.log(`Mission ${mission.id} progress data:`, {
    target,
    currentProgress,
    progressPercentage
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: mission.imgUrl || 'https://via.placeholder.com/240x160/007AFF/FFFFFF?text=Mission' }} 
          style={styles.image} 
        />
        
        {/* Category Badge - Top Left */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{mission.category || 'Mission'}</Text>
        </View>
        
        {/* Points Badge - Bottom Left */}
        <View style={styles.pointsBadge}>
          <Zap size={18} color="#FFFFFF" style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{points}</Text>
        </View>
        
        {/* Credits Badge - Below Points Badge */}
        <View style={styles.creditsBadge}>
          <Gem size={18} color="#FFFFFF" style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{credits}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{mission.description || 'Complete this mission to earn rewards!'}</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <View style={styles.targetContainer}>
            <Text style={styles.targetText}>{currentProgress} / {target}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    width: 380, // Increased width to better fit mission container
  },
  imageContainer: {
    position: 'relative',
    height: 160, // Reduced height
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16, // Increased radius
    paddingHorizontal: 12, // Increased padding
    paddingVertical: 6, // Increased padding
  },
  categoryText: {
    fontSize: 14, // Increased font size
    fontWeight: '600',
    color: '#2C3E50',
    textTransform: 'uppercase',
  },
  pointsBadge: {
    position: 'absolute',
    bottom: 50, // Moved up to make room for credits badge below
    right: 12, // Moved to right side
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 16, // Increased radius
    paddingHorizontal: 12, // Increased padding
    paddingVertical: 6, // Increased padding
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsBadge: {
    position: 'absolute',
    bottom: 12, // Below the points badge
    right: 12, // Moved to right side
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 16, // Increased radius
    paddingHorizontal: 12, // Increased padding
    paddingVertical: 6, // Increased padding
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    marginRight: 6, // Increased margin
  },
  badgeText: {
    fontSize: 14, // Increased font size
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    padding: 16, // Reduced padding
  },
  description: {
    fontSize: 13, // Reduced font size
    color: '#8E8E93',
    marginBottom: 12, // Reduced margin
    lineHeight: 18, // Reduced line height
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 12, // Increased height
    backgroundColor: '#E9ECEF',
    borderRadius: 6, // Increased radius to match height
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 6, // Increased radius to match height
  },
  targetContainer: {
    alignItems: 'flex-end',
  },
  targetText: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
  },
});

export default MissionEntry;
