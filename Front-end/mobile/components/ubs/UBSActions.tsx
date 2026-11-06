import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { UBS } from '../../types/ubs';

interface UBSActionsProps {
  ubs: UBS;
  onViewMap?: (ubs: UBS) => void;
  onViewFlow?: (ubs: UBS) => void;
}

export default function UBSActions({ ubs, onViewMap, onViewFlow }: UBSActionsProps) {
  const handleCall = () => {
    if (!ubs.phone) {
      Alert.alert('Telefone', 'Telefone de atendimento: (11) 3123-4567');
      return;
    }
    Linking.openURL(`tel:${ubs.phone}`);
  };

  const handleDirections = () => {
    const { latitude, longitude } = ubs.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  if (ubs.hasFlow) {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, styles.btnWhiteBorder]}
          onPress={() => (onViewFlow ? onViewFlow(ubs) : Alert.alert('Linha de Cuidado', ubs.careLineWarning || 'Fluxo de atendimento de saúde integral.'))}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="transit-connection-variant" size={16} color="#111827" />
          <Text style={styles.btnTextBlack}>Ver Fluxo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnGrayFill]}
          onPress={() => onViewMap?.(ubs)}
          activeOpacity={0.8}
        >
          <Feather name="map-pin" size={14} color="#111827" />
          <Text style={styles.btnTextBlack}>Ver no Mapa</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.btn, styles.btnWhiteBorder]}
        onPress={handleCall}
        activeOpacity={0.8}
      >
        <Feather name="phone" size={14} color="#111827" />
        <Text style={styles.btnTextBlack}>Ligar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.btnBlackFill]}
        onPress={handleDirections}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="navigation-variant" size={16} color="#ffffff" />
        <Text style={styles.btnTextWhite}>Como Chegar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnWhiteBorder: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  btnBlackFill: {
    backgroundColor: '#171717',
  },
  btnGrayFill: {
    backgroundColor: '#ececec',
  },
  btnTextBlack: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  btnTextWhite: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
});
