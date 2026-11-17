import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const ModulesList: React.FC = () => {
  const handleReview = (moduleName: string) => {
    Alert.alert(
      'Revisão de Conteúdo',
      `Abrindo material de estudo e notas técnicas do módulo "${moduleName}".`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>TODOS OS MÓDULOS</Text>

      {/* Módulo 1 */}
      <View style={styles.moduleCard}>
        <View style={styles.leftGroup}>
          <View style={styles.doneCircle}>
            <Feather name="check" size={13} color="#15803D" strokeWidth={3} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.moduleTitle}>1. Acolhimento e Nome Social na Recepção</Text>
            <Text style={styles.moduleSubtitleSuccess}>Concluído • Nota 10</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleReview('Acolhimento e Nome Social na Recepção')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.reviewText}>Revisar</Text>
        </TouchableOpacity>
      </View>

      {/* Módulo 2 */}
      <View style={styles.moduleCard}>
        <View style={styles.leftGroup}>
          <View style={styles.doneCircle}>
            <Feather name="check" size={13} color="#15803D" strokeWidth={3} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.moduleTitle}>2. Manejo Clínico de Hormonioterapia</Text>
            <Text style={styles.moduleSubtitleSuccess}>Concluído • Protocolo SUS</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleReview('Manejo Clínico de Hormonioterapia')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.reviewText}>Revisar</Text>
        </TouchableOpacity>
      </View>

      {/* Módulo 4 (Bloqueado) */}
      <View style={[styles.moduleCard, styles.moduleCardLocked]}>
        <View style={styles.leftGroup}>
          <View style={styles.lockedCircle}>
            <Feather name="lock" size={12} color="#94A3B8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.moduleTitleLocked}>4. Avaliação Prática e Validação Técnica</Text>
            <Text style={styles.moduleSubtitleLocked}>Bloqueado até concluir módulo 3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D6C2AC',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  moduleCardLocked: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  doneCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lockedCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  moduleTitleLocked: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  moduleSubtitleSuccess: {
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },
  moduleSubtitleLocked: {
    fontSize: 11,
    color: '#94A3B8',
  },
  reviewText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});
