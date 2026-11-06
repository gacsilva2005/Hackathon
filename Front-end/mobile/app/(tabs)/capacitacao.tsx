import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export default function CapacitacaoScreen() {
  const modules = [
    {
      title: 'Acolhimento Humanizado na Atenção Básica',
      duration: '4 horas • Certificado SUS',
      progress: '100% Concluído',
      completed: true,
    },
    {
      title: 'Manejo Clínico de PrEP e PEP',
      duration: '6 horas • Atualizado 2026',
      progress: 'Em andamento (60%)',
      completed: false,
    },
    {
      title: 'Linhas de Cuidado da População TT',
      duration: '8 horas • Protocolo Municipal',
      progress: 'Disponível',
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Capacitação Profissional</Text>
        <Text style={styles.headerSub}>
          Módulos de formação contínua em saúde integral, acolhimento e direitos.
        </Text>

        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNum}>3</Text>
            <Text style={styles.summaryLabel}>Cursos</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNum}>1</Text>
            <Text style={styles.summaryLabel}>Certificado</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNum}>18h</Text>
            <Text style={styles.summaryLabel}>Carga Total</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Trilhas Recomendadas</Text>
        {modules.map((m, idx) => (
          <View key={idx} style={styles.moduleCard}>
            <View style={styles.iconCircle}>
              <FontAwesome5
                name={m.completed ? 'check-circle' : 'book-reader'}
                size={16}
                color={m.completed ? '#16a34a' : '#2563eb'}
              />
            </View>
            <View style={styles.moduleBody}>
              <Text style={styles.moduleTitle}>{m.title}</Text>
              <Text style={styles.moduleDuration}>{m.duration}</Text>
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.statusBadge,
                    m.completed ? styles.statusCompleted : styles.statusProgress,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      m.completed ? styles.statusTextCompleted : styles.statusTextProgress,
                    ]}
                  >
                    {m.progress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 18,
  },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  moduleCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  moduleBody: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 3,
  },
  moduleDuration: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusCompleted: {
    backgroundColor: '#dcfce7',
  },
  statusProgress: {
    backgroundColor: '#eff6ff',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTextCompleted: {
    color: '#15803d',
  },
  statusTextProgress: {
    color: '#1d4ed8',
  },
});
