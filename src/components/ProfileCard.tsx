import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Zap, Gem } from 'lucide-react-native';
import { GameLayerPlayer } from '../services/gameLayerApi';

interface ProfileCardProps {
  user: GameLayerPlayer | null;
  onPress?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onPress }) => {
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUserText}>Select a player to view profile</Text>
      </View>
    );
  }

  const levelName = user.level.name || 'None';
  const teamName = user.team || 'None';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Image 
          source={{ uri: user.imgUrl || 'https://via.placeholder.com/80x80/007AFF/FFFFFF?text=' + user.name.charAt(0) }} 
          style={styles.avatar} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.level}>Level: {levelName}</Text>
          <Text style={styles.team}>Team: {teamName}</Text>
        </View>
      </View>
      
      <View style={styles.badgesContainer}>
        <View style={styles.badge}>
          <Zap size={20} color="#2C3E50" style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{user.points.toLocaleString()}</Text>
        </View>
        <View style={styles.badge}>
          <Gem size={20} color="#2C3E50" style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{user.credits.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: '600',
    marginBottom: 2,
  },
  rank: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  team: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  badge: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badgeIcon: {
    marginRight: 6,
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  experienceContainer: {
    marginBottom: 16,
  },
  experienceText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498DB',
    borderRadius: 4,
  },
  nextLevelText: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  noUserText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    padding: 20,
  },
});

export default ProfileCard;
