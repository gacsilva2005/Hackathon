import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface DisguiseModalProps {
  visible: boolean;
  onExit: () => void;
}

export const DisguiseModal: React.FC<DisguiseModalProps> = ({ visible, onExit }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onExit}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Topo camuflado */}
          <View style={styles.topBar}>
            <View style={styles.topBarLeft}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="#F59E0B" />
              <Text style={styles.appTitle}>Clima & Tempo SP</Text>
            </View>
            <Text style={styles.timeText}>14:30 • Atualizado</Text>
          </View>

          {/* Card Clima */}
          <View style={styles.weatherCard}>
            <Text style={styles.locationText}>São Paulo, SP</Text>
            <View style={styles.tempRow}>
              <Text style={styles.tempText}>23°C</Text>
              <View style={styles.weatherBadge}>
                <Text style={styles.weatherBadgeText}>Parcialmente Nublado</Text>
              </View>
            </View>
            <Text style={styles.weatherSubtext}>
              Umidade: 62% • Vento: 14 km/h • Sem chuva para a próxima hora.
            </Text>
          </View>

          {/* Notícias Neutras */}
          <View style={styles.newsSection}>
            <Text style={styles.newsSectionTitle}>NOTÍCIAS DO DIA</Text>
            <View style={styles.newsCard}>
              <Text style={styles.newsText}>
                Linha 1-Azul do Metrô opera com intervalos normais nesta tarde.
              </Text>
            </View>
            <View style={styles.newsCard}>
              <Text style={styles.newsText}>
                Previsão de temperatura amena para o final de semana na capital paulista.
              </Text>
            </View>
          </View>

          {/* Botão Sutil de Desbloqueio */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={onExit}
              activeOpacity={0.8}
              style={styles.exitButton}
            >
              <Feather name="arrow-left" size={14} color="#334155" style={{ marginRight: 6 }} />
              <Text style={styles.exitText}>Retornar ao app Sampa Trans</Text>
            </TouchableOpacity>
            <Text style={styles.hintText}>Toque acima para restaurar a visualização.</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 16,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  tempText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
  },
  weatherBadge: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  weatherBadgeText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#15803D',
  },
  weatherSubtext: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  newsSection: {
    flex: 1,
  },
  newsSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 10,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  newsText: {
    fontSize: 12.5,
    color: '#334155',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  exitText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#334155',
  },
  hintText: {
    fontSize: 10.5,
    color: '#94A3B8',
    marginTop: 8,
  },
});
