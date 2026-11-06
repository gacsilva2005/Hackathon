import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const CourseProgressCard: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Faixa Superior Escura */}
      <View style={styles.topAccentBar} />

      <View style={styles.contentPadding}>
        {/* Topo: Categoria + Porcentagem */}
        <View style={styles.topRow}>
          <View style={styles.badgeCategory}>
            <Text style={styles.badgeCategoryText}>EDUCAÇÃO PERMANENTE SUS</Text>
          </View>
          <View style={styles.badgePercent}>
            <Text style={styles.badgePercentText}>65%</Text>
          </View>
        </View>

        {/* Título da Formação */}
        <Text style={styles.courseTitle}>
          Formação em Saúde Integral LGBTQIAPN+
        </Text>

        {/* Barra de Progresso */}
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: '65%' }]} />
        </View>

        {/* Rodapé do Progresso */}
        <View style={styles.footerRow}>
          <View style={styles.completedInfo}>
            <Feather name="check" size={13} color="#15803D" style={{ marginRight: 5 }} />
            <Text style={styles.completedText}>2 de 4 módulos concluídos</Text>
          </View>

          <Text style={styles.remainingText}>2 aulas restantes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D6C2AC',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 12,
  },
  topAccentBar: {
    height: 4,
    backgroundColor: colors.primaryDark,
    width: '100%',
  },
  contentPadding: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeCategory: {
    backgroundColor: '#EBF5FB',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeCategoryText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 0.5,
  },
  badgePercent: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgePercentText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#475569',
  },
  remainingText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F172A',
  },
});
