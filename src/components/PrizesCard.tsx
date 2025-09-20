import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Prize } from '../types';

interface PrizesCardProps {
  prizes: Prize[];
  userCoins?: number;
  onPrizePress?: (prize: Prize) => void;
  onViewAllPress?: () => void;
}

const PrizesCard: React.FC<PrizesCardProps> = ({ 
  prizes, 
  userCoins = 0,
  onPrizePress, 
  onViewAllPress 
}) => {
  const getCategoryIcon = (category: Prize['category']) => {
    switch (category) {
      case 'health':
        return '💚';
      case 'fitness':
        return '💪';
      case 'wellness':
        return '🧘';
      case 'lifestyle':
        return '🌟';
      default:
        return '🎁';
    }
  };

  const getCategoryColor = (category: Prize['category']) => {
    switch (category) {
      case 'health':
        return '#2ECC71';
      case 'fitness':
        return '#E74C3C';
      case 'wellness':
        return '#9B59B6';
      case 'lifestyle':
        return '#F39C12';
      default:
        return '#3498DB';
    }
  };

  const canAfford = (prize: Prize) => userCoins >= prize.cost;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Prize Shop</Text>
          <Text style={styles.coinsText}>
            🪙 {userCoins.toLocaleString()} coins
          </Text>
        </View>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {prizes.map((prize) => (
          <TouchableOpacity
            key={prize.id}
            style={[
              styles.prizeCard,
              !prize.isAvailable && styles.unavailablePrize,
              prize.isOwned && styles.ownedPrize
            ]}
            onPress={() => onPrizePress?.(prize)}
            disabled={!prize.isAvailable}
          >
            <View style={styles.prizeImageContainer}>
              <Image source={{ uri: prize.image }} style={styles.prizeImage} />
              {prize.isOwned && (
                <View style={styles.ownedBadge}>
                  <Text style={styles.ownedText}>OWNED</Text>
                </View>
              )}
            </View>

            <View style={styles.prizeInfo}>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryIcon}>
                  {getCategoryIcon(prize.category)}
                </Text>
                <Text style={[
                  styles.categoryText,
                  { color: getCategoryColor(prize.category) }
                ]}>
                  {prize.category.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.prizeTitle}>{prize.title}</Text>
              <Text style={styles.prizeDescription}>{prize.description}</Text>

              <View style={styles.priceContainer}>
                <Text style={[
                  styles.priceText,
                  !canAfford(prize) && styles.insufficientCoins
                ]}>
                  🪙 {prize.cost.toLocaleString()}
                </Text>
                {!prize.isAvailable && (
                  <Text style={styles.unavailableText}>Unavailable</Text>
                )}
              </View>
            </View>

            {prize.isOwned ? (
              <View style={styles.ownedButton}>
                <Text style={styles.ownedButtonText}>✓ Owned</Text>
              </View>
            ) : !prize.isAvailable ? (
              <View style={styles.unavailableButton}>
                <Text style={styles.unavailableButtonText}>Unavailable</Text>
              </View>
            ) : canAfford(prize) ? (
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.insufficientButton}>
                <Text style={styles.insufficientButtonText}>Need More Coins</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  coinsText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  scrollContent: {
    paddingRight: 16,
  },
  prizeCard: {
    width: 200,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  unavailablePrize: {
    opacity: 0.6,
  },
  ownedPrize: {
    backgroundColor: '#E8F5E8',
    borderColor: '#28A745',
  },
  prizeImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  prizeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  ownedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#28A745',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  ownedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  prizeInfo: {
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  prizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  prizeDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  insufficientCoins: {
    color: '#E74C3C',
  },
  unavailableText: {
    fontSize: 12,
    color: '#E74C3C',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#3498DB',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ownedButton: {
    backgroundColor: '#28A745',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  ownedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  unavailableButton: {
    backgroundColor: '#95A5A6',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  unavailableButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  insufficientButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  insufficientButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PrizesCard;
