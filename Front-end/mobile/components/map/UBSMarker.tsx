import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { UBS } from '../../types/ubs';

interface UBSMarkerProps {
  ubs: UBS;
  isSelected?: boolean;
  onPress?: (ubs: UBS) => void;
}

export default function UBSMarker({ ubs, isSelected, onPress }: UBSMarkerProps) {
  const isPopTT = ubs.shortName.includes('CR POP TT');
  const dotColor = isPopTT ? '#b45309' : '#15803d'; // marrom/dourado vs verde

  return (
    <View style={styles.container}>
      {/* Label Capsule */}
      <View style={[styles.bubble, isSelected && styles.bubbleSelected]}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={styles.label}>{ubs.shortName}</Text>
      </View>

      {/* Circular Pin Icon */}
      <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
        {isPopTT ? (
          <FontAwesome5 name="briefcase-medical" size={14} color="#1d4ed8" />
        ) : (
          <MaterialCommunityIcons name="plus" size={20} color="#1d4ed8" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 3,
  },
  bubbleSelected: {
    borderColor: '#2563eb',
    borderWidth: 1.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1f2937',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#93c5fd', // azul claro do screenshot
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  iconCircleSelected: {
    backgroundColor: '#60a5fa',
    transform: [{ scale: 1.1 }],
  },
});
