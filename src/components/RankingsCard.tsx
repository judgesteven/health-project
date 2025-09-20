import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LeaderboardEntry } from '../types';

interface RankingsCardProps {
  leaderboard: LeaderboardEntry[];
  onUserPress?: (user: LeaderboardEntry) => void;
  onViewAllPress?: () => void;
}

const RankingsCard: React.FC<RankingsCardProps> = ({ 
  leaderboard, 
  onUserPress, 
  onViewAllPress 
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#7F8C8D';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {leaderboard.slice(0, 10).map((entry, index) => (
          <TouchableOpacity
            key={entry.user.id}
            style={[
              styles.leaderboardItem,
              entry.isCurrentUser && styles.currentUserItem
            ]}
            onPress={() => onUserPress?.(entry)}
          >
            <View style={styles.rankContainer}>
              <Text style={[
                styles.rankText,
                { color: getRankColor(entry.rank) }
              ]}>
                {getRankIcon(entry.rank)}
              </Text>
            </View>

            <Image 
              source={{ uri: entry.user.avatar }} 
              style={styles.userAvatar} 
            />

            <View style={styles.userInfo}>
              <Text style={[
                styles.userName,
                entry.isCurrentUser && styles.currentUserName
              ]}>
                {entry.user.name}
              </Text>
              <Text style={styles.userScore}>
                {entry.score.toLocaleString()} steps
              </Text>
            </View>

            {entry.isCurrentUser && (
              <View style={styles.currentUserBadge}>
                <Text style={styles.currentUserBadgeText}>YOU</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Rankings update every hour
        </Text>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  currentUserItem: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#3498DB',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  currentUserName: {
    color: '#3498DB',
  },
  userScore: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  currentUserBadge: {
    backgroundColor: '#3498DB',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  currentUserBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
});

export default RankingsCard;
