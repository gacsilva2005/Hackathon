import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UBSStatus } from '../../types/ubs';

interface UBSStatusBadgeProps {
  status: UBSStatus;
  label: string;
}

export default function UBSStatusBadge({ status, label }: UBSStatusBadgeProps) {
  const isOpen = status === 'open';

  const bgColor = isOpen ? '#dcfce7' : '#fef3c7';
  const textColor = isOpen ? '#15803d' : '#92400e';
  const iconName = isOpen ? 'check-circle' : 'alert-circle';

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Feather name={iconName as any} size={13} color={textColor} />
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 14,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
