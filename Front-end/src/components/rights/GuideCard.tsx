import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GuideItem } from '../../types/rights.types';
import { colors } from '../../theme/colors';

interface GuideCardProps {
  item: GuideItem;
  onPressGuide: (item: GuideItem) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ item, onPressGuide }) => {
  const [isSaved, setIsSaved] = useState(false);

  const getBorderColor = () => {
    switch (item.categoryVariant) {
      case 'purple':
        return '#8B5CF6';
      case 'amber':
        return '#F59E0B';
      case 'green':
        return '#15803D';
      default:
        return '#0284C7';
    }
  };

  const getBadgeStyle = () => {
    switch (item.categoryVariant) {
      case 'purple':
        return { bg: '#F3E8FF', border: '#E9D5FF', text: '#7E22CE' };
      case 'amber':
        return { bg: '#FEF3C7', border: '#FDE68A', text: '#B45309' };
      case 'green':
        return { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' };
      default:
        return { bg: '#EBF5FB', border: '#BAE6FD', text: '#0284C7' };
    }
  };

  const badgeTheme = getBadgeStyle();

  return (
    <View style={[styles.card, { borderLeftColor: getBorderColor(), borderLeftWidth: 4 }]}>
      {/* Topo do Card: Categoria & Tempo de Leitura */}
      <View style={styles.topRow}>
        <View style={[styles.categoryBadge, { backgroundColor: badgeTheme.bg, borderColor: badgeTheme.border }]}>
          <Text style={[styles.categoryText, { color: badgeTheme.text }]}>{item.category}</Text>
        </View>

        <View style={styles.timeRow}>
          <Feather name="clock" size={12} color="#64748B" style={{ marginRight: 4 }} />
          <Text style={styles.timeText}>{item.readingTime}</Text>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.titleText}>{item.title}</Text>

      {/* Descrição */}
      <Text style={styles.descText} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Rodapé: Link de Ação + Botão Salvar */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          onPress={() => onPressGuide(item)}
          style={styles.actionLink}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.actionLinkText}>{item.linkText}</Text>
          <Feather name="arrow-right" size={13} color="#0F172A" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSaved(!isSaved)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.bookmarkBtn}
        >
          <Feather
            name="bookmark"
            size={16}
            color={isSaved ? colors.goldDark : '#94A3B8'}
          />
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
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: 20,
  },
  descText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#64748B',
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  bookmarkBtn: {
    padding: 4,
  },
});
