import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const ProfessionalHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Lado Esquerdo: Badge SUS + Títulos */}
      <View style={styles.leftGroup}>
        <View style={styles.susBadge}>
          <Text style={styles.susText}>SUS</Text>
        </View>

        <View>
          <Text style={styles.overline}>EDUCAÇÃO PERMANENTE</Text>
          <Text style={styles.title}>Portal do Profissional</Text>
        </View>
      </View>

      {/* Lado Direito: Badge UBS Ativa */}
      <View style={styles.ubsBadge}>
        <View style={styles.greenDot} />
        <Text style={styles.ubsText}>UBS Ativa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D9CF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  susBadge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  susText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  overline: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  ubsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#15803D',
    marginRight: 6,
  },
  ubsText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#15803D',
  },
});
