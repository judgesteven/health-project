import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Activity } from 'lucide-react-native';

interface StepCountCardProps {
  stepCount: number;
  onAddSteps: () => void;
}

const StepCountCard: React.FC<StepCountCardProps> = ({ stepCount, onAddSteps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Activity size={20} color="#2C3E50" style={styles.icon} />
        <Text style={styles.title}>Step Count</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.stepValue}>{stepCount.toLocaleString()}</Text>
        <Text style={styles.stepLabel}>steps today</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddSteps}>
        <Text style={styles.addButtonText}>Add Steps</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stepValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  stepLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20, // Increased radius
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StepCountCard;
