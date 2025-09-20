import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { GameLayerPlayer } from '../services/gameLayerApi';
import { gameLayerAPI } from '../services/gameLayerApi';

interface UserSelectorProps {
  onUserSelect: (user: GameLayerPlayer) => void;
  selectedUserId?: string;
}

const UserSelector: React.FC<UserSelectorProps> = ({ onUserSelect, selectedUserId }) => {
  const [players, setPlayers] = useState<GameLayerPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Attempting to load players from GameLayer API...');
      console.log('API URL:', 'https://api.gamelayer.co/api/v0/players');
      console.log('API Key:', '06bc187aa7f9329d3c5b2eb70ab99821');
      
      const playersData = await gameLayerAPI.getAllPlayers();
      console.log('Successfully loaded players:', playersData);
      setPlayers(playersData);
    } catch (err) {
      console.error('Failed to load players from API:', err);
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(`API Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setPlayers([]); // No fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const selectedPlayer = players.find(player => player.player === selectedUserId);

  const handlePlayerSelect = async (player: GameLayerPlayer) => {
    try {
      console.log('Loading detailed player data for:', player.player);
      const detailedPlayer = await gameLayerAPI.getPlayer(player.player);
      console.log('Detailed player data:', detailedPlayer);
      onUserSelect(detailedPlayer);
      setIsExpanded(false);
    } catch (err) {
      console.error('Failed to load detailed player data:', err);
      // Fallback to basic player data if detailed fetch fails
      onUserSelect(player);
      setIsExpanded(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Player</Text>
      
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.selectorContent}>
          {loading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : selectedPlayer ? (
            <>
              <Image source={{ uri: selectedPlayer.imgUrl }} style={styles.playerAvatar} />
              <Text style={styles.selectedPlayerName}>{selectedPlayer.name}</Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>Choose a player...</Text>
          )}
          <Text style={styles.dropdownIcon}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadPlayers}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {isExpanded && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {players.length > 0 ? (
              players.map((player) => (
                <TouchableOpacity
                  key={player.player}
                  style={[
                    styles.playerOption,
                    selectedUserId === player.player && styles.selectedPlayerOption
                  ]}
                  onPress={() => handlePlayerSelect(player)}
                >
                  <Image source={{ uri: player.imgUrl }} style={styles.optionAvatar} />
                  <Text style={[
                    styles.optionPlayerName,
                    selectedUserId === player.player && styles.selectedOptionText
                  ]}>
                    {player.name}
                  </Text>
                  {selectedUserId === player.player && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {loading ? 'Loading players...' : 'No players found'}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d1d1f',
    letterSpacing: -0.003,
    marginBottom: 16,
  },
  selectorButton: {
    backgroundColor: 'rgba(120, 120, 128, 0.12)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 128, 0.16)',
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  selectedPlayerName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1d1d1f',
    flex: 1,
  },
  placeholderText: {
    fontSize: 17,
    color: '#8E8E93',
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  errorContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 128, 0.16)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: 200,
  },
  scrollView: {
    maxHeight: 200,
  },
  playerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(120, 120, 128, 0.08)',
  },
  selectedPlayerOption: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  optionAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
  },
  optionPlayerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1d1d1f',
    flex: 1,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default UserSelector;
