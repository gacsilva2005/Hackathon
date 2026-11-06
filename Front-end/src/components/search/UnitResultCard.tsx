import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { UnitResultItem } from '../../types/search.types';
import { colors } from '../../theme/colors';

interface UnitResultCardProps {
  item: UnitResultItem;
  onViewDetails: (item: UnitResultItem) => void;
}

export const UnitResultCard: React.FC<UnitResultCardProps> = ({ item, onViewDetails }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleCall = () => {
    const cleanPhone = item.phone.replace(/\D/g, '');
    Linking.openURL(`tel:${cleanPhone}`).catch(() => {
      Alert.alert('Chamada', `Ligar para o número ${item.phone}`);
    });
  };

  return (
    <View style={styles.card}>
      {/* Topo do Card: Badge de Categoria e Favorito */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.categoryBadge,
            item.categoryVariant === 'green' ? styles.badgeGreen : styles.badgeBlue,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              item.categoryVariant === 'green' ? styles.badgeGreenText : styles.badgeBlueText,
            ]}
          >
            {item.categoryTag}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsSaved(!isSaved)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.bookmarkButton}
        >
          <Feather
            name="bookmark"
            size={18}
            color={isSaved ? colors.goldDark : '#64748B'}
          />
        </TouchableOpacity>
      </View>

      {/* Nome da Unidade */}
      <Text style={styles.unitName}>{item.name}</Text>

      {/* Endereço */}
      <View style={styles.addressRow}>
        <Feather name="map-pin" size={13} color="#64748B" style={{ marginRight: 6, marginTop: 1 }} />
        <Text style={styles.addressText} numberOfLines={1}>
          {item.address}
        </Text>
      </View>

      {/* Tags de Serviços e Acesso */}
      <View style={styles.tagsRow}>
        {item.tags.map((tag, idx) => (
          <View
            key={idx}
            style={[
              styles.tagBadge,
              tag.variant === 'green' && styles.tagBadgeGreen,
            ]}
          >
            {tag.iconName === 'medical' && (
              <MaterialCommunityIcons name="hospital-box-outline" size={12} color="#475569" style={{ marginRight: 4 }} />
            )}
            {tag.iconName === 'check' && (
              <Feather name="check" size={11} color="#15803D" style={{ marginRight: 4 }} />
            )}
            <Text
              style={[
                styles.tagText,
                tag.variant === 'green' && styles.tagTextGreen,
              ]}
            >
              {tag.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Rodapé: Distância + Ações */}
      <View style={styles.footerRow}>
        {/* Distância com ícone de transporte */}
        <View style={styles.distanceLeft}>
          {item.transportIcon === 'bus' ? (
            <FontAwesome5 name="bus" size={13} color="#475569" style={{ marginRight: 6 }} />
          ) : (
            <Feather name="navigation" size={13} color="#475569" style={{ marginRight: 6 }} />
          )}
          <Text style={styles.distanceText}>{item.distanceText}</Text>
        </View>

        {/* Botões Ligar e Ver Detalhes */}
        <View style={styles.buttonActions}>
          <TouchableOpacity
            onPress={handleCall}
            accessible={true}
            accessibilityLabel={`Ligar para ${item.name}`}
            style={styles.callBtn}
            activeOpacity={0.8}
          >
            <Feather name="phone" size={13} color="#0F172A" style={{ marginRight: 5 }} />
            <Text style={styles.callBtnText}>Ligar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onViewDetails(item)}
            accessible={true}
            accessibilityLabel={`Ver detalhes de ${item.name}`}
            style={styles.detailsBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.detailsBtnText}>Ver Detalhes</Text>
            <Feather name="arrow-right" size={13} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
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
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeBlue: {
    backgroundColor: '#EBF5FB',
    borderColor: '#BAE6FD',
  },
  badgeBlueText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
  badgeGreen: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  badgeGreenText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  categoryText: {
    textTransform: 'none',
  },
  bookmarkButton: {
    padding: 4,
  },
  unitName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressText: {
    fontSize: 12.5,
    color: '#64748B',
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagBadgeGreen: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  tagTextGreen: {
    color: '#15803D',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  distanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  buttonActions: {
    flexDirection: 'row',
    gap: 8,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  callBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
