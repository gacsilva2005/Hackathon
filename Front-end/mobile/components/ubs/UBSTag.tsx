import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UBSTagProps {
  label: string;
}

export default function UBSTag({ label }: UBSTagProps) {
  const isBlueTag =
    label.includes('Sampa Trans') ||
    label.includes('Ambulatório TT') ||
    label.includes('Especializado');

  return (
    <View style={[styles.tag, isBlueTag ? styles.blueTag : styles.grayTag]}>
      <Text style={[styles.text, isBlueTag ? styles.blueText : styles.grayText]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  blueTag: {
    backgroundColor: '#dbeafe',
  },
  grayTag: {
    backgroundColor: '#f3f4f6',
  },
  blueText: {
    fontSize: 11,
    color: '#1e40af',
    fontWeight: '600',
  },
  grayText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
});
