import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const UnitImpactCard: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Topo: Título + Badge Auditado SUS */}
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>IMPACTO NA SUA UNIDADE</Text>
          <Text style={styles.subtitleText}>
            Métricas anônimas da UBS República nos últimos 30 dias
          </Text>
        </View>

        <View style={styles.auditBadge}>
          <Text style={styles.auditBadgeText}>Auditado SUS</Text>
        </View>
      </View>

      {/* 2 Caixas de Métricas */}
      <View style={styles.metricsRow}>
        {/* Caixa 1: Pacientes Acolhidos */}
        <View style={styles.metricBox}>
          <Text style={styles.metricNumber}>48</Text>
          <Text style={styles.metricLabel}>Pacientes Acolhidos</Text>
        </View>

        {/* Caixa 2: Respeito ao Nome Social */}
        <View style={styles.metricBox}>
          <Text style={[styles.metricNumber, styles.greenNumber]}>98%</Text>
          <Text style={styles.metricLabel}>Respeito ao Nome Social</Text>
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  titleArea: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  auditBadge: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  auditBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 2,
  },
  greenNumber: {
    color: '#15803D',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});
