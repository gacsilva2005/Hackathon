import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UBS } from '../../types/ubs';
import UBSStatusBadge from './UBSStatusBadge';
import UBSTag from './UBSTag';
import UBSActions from './UBSActions';

interface UBSCardProps {
  ubs: UBS;
  isSelected?: boolean;
  onPress?: (ubs: UBS) => void;
  onViewMap?: (ubs: UBS) => void;
  onViewFlow?: (ubs: UBS) => void;
}

export default function UBSCard({
  ubs,
  isSelected,
  onPress,
  onViewMap,
  onViewFlow,
}: UBSCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onPress?.(ubs)}
      activeOpacity={0.9}
    >
      {/* Title */}
      <Text style={styles.name}>{ubs.name}</Text>

      {/* Status Badge */}
      <View style={styles.badgeRow}>
        <UBSStatusBadge status={ubs.status} label={ubs.statusLabel} />
      </View>

      {/* Address line */}
      <Text style={styles.addressLine}>
        <Text style={styles.address}>{ubs.address}</Text>
        <Text style={styles.separator}> • </Text>
        <Text style={styles.distance}>{ubs.distance}</Text>
        <Text style={styles.separator}> • </Text>
        <Text style={styles.hours}>{ubs.hours}</Text>
      </Text>

      {/* Care line warning box */}
      {ubs.careLineWarning && (
        <View style={styles.warningBox}>
          <MaterialCommunityIcons
            name="transit-connection"
            size={18}
            color="#b45309"
            style={styles.warningIcon}
          />
          <Text style={styles.warningText}>
            <Text style={styles.warningBold}>Linha de Cuidado: </Text>
            {ubs.careLineWarning.replace('Linha de Cuidado: ', '')}
          </Text>
        </View>
      )}

      {/* Tags */}
      {ubs.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {ubs.tags.map((tag) => (
            <UBSTag key={tag} label={tag} />
          ))}
        </View>
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Action Buttons */}
      <UBSActions ubs={ubs} onViewMap={onViewMap} onViewFlow={onViewFlow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#2563eb',
    borderWidth: 1.5,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  badgeRow: {
    marginBottom: 8,
  },
  addressLine: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 10,
    lineHeight: 16,
  },
  address: {
    color: '#4b5563',
  },
  separator: {
    color: '#9ca3af',
  },
  distance: {
    color: '#111827',
    fontWeight: '700',
  },
  hours: {
    color: '#4b5563',
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#fef7ed',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  warningIcon: {
    marginTop: 1,
  },
  warningText: {
    flex: 1,
    fontSize: 11,
    color: '#451a03',
    lineHeight: 16,
  },
  warningBold: {
    fontWeight: '700',
    color: '#7c2d12',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginTop: 12,
    marginHorizontal: -4,
  },
});
