import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UnitDetails } from '../../types/unit.types';
import { colors } from '../../theme/colors';

interface UnitDetailsCardProps {
  unit: UnitDetails;
}

export const UnitDetailsCard: React.FC<UnitDetailsCardProps> = ({ unit }) => {
  const handleCall = () => {
    const cleanPhone = unit.phone.replace(/\D/g, '');
    Linking.openURL(`tel:${cleanPhone}`).catch(() => {
      Alert.alert('Chamada', `Ligar para o número ${unit.phone}`);
    });
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${unit.name} ${unit.address}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`).catch(() => {
      Alert.alert('Como Chegar', `Abrindo rotas para ${unit.address}`);
    });
  };

  return (
    <View style={styles.card}>
      {/* Badge de Classificação */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{unit.typeTag}</Text>
      </View>

      {/* Nome da Unidade */}
      <Text style={styles.titleText}>{unit.name}</Text>

      {/* Endereço e Distância */}
      <View style={styles.infoRow}>
        <Feather name="map-pin" size={15} color="#64748B" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          <Text style={styles.addressRegular}>{unit.address}</Text>
          <Text style={styles.distanceBold}> • {unit.distance}</Text>
        </Text>
      </View>

      {/* Horário */}
      <View style={styles.infoRow}>
        <Feather name="clock" size={15} color="#64748B" style={styles.infoIcon} />
        <Text style={styles.scheduleText}>{unit.schedule}</Text>
      </View>

      {/* Botões de Ação Ergonômicos (Altura WCAG 48px) */}
      <View style={styles.actionsRow}>
        {/* Ligar */}
        <TouchableOpacity
          onPress={handleCall}
          accessible={true}
          accessibilityLabel={`Ligar para ${unit.phone}`}
          accessibilityRole="button"
          activeOpacity={0.8}
          style={styles.callButton}
        >
          <Feather name="phone" size={16} color="#1E293B" style={{ marginRight: 6 }} />
          <Text style={styles.callButtonText}>{unit.phone}</Text>
        </TouchableOpacity>

        {/* Como Chegar */}
        <TouchableOpacity
          onPress={handleDirections}
          accessible={true}
          accessibilityLabel="Abrir rota no mapa"
          accessibilityRole="button"
          activeOpacity={0.85}
          style={styles.navigateButton}
        >
          <Feather name="navigation" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.navigateButtonText}>Como Chegar</Text>
        </TouchableOpacity>
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
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#334155',
  },
  addressRegular: {
    color: '#334155',
  },
  distanceBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  scheduleText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  callButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  navigateButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButtonText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
