import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface RightsHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onDisguiseTrigger: () => void;
}

const filterCategories = [
  'Todos',
  'Nome Social',
  'Retificação Civil',
  'Saúde SUS',
  'Segurança Pública',
  'Trabalho & Renda',
];

export const RightsHeader: React.FC<RightsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onDisguiseTrigger,
}) => {
  return (
    <View style={styles.container}>
      {/* Topo: Logo Cidadania & Lei + Título + Botão Disfarçar */}
      <View style={styles.topRow}>
        <View style={styles.logoAndTitle}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="scale-balance" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.overline}>CIDADANIA & LEI</Text>
            <Text style={styles.mainTitle}>Direitos & IA</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onDisguiseTrigger}
          accessible={true}
          accessibilityLabel="Ativar camuflagem de segurança rápida"
          accessibilityRole="button"
          activeOpacity={0.8}
          style={styles.disguiseButton}
        >
          <Feather name="shield" size={13} color="#475569" style={{ marginRight: 4 }} />
          <Text style={styles.disguiseText}>Disfarçar</Text>
        </TouchableOpacity>
      </View>

      {/* Subtítulo Descritivo */}
      <Text style={styles.subtitle}>
        Orientações jurídicas atualizadas e sínteses normativas simplificadas por inteligência artificial.
      </Text>

      {/* Barra de Pesquisa */}
      <View style={styles.searchBox}>
        <Feather name="search" size={16} color="#64748B" style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Buscar lei, nome social, retificação, PrEP..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.clearBtn}
          >
            <Feather name="x" size={12} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Pílulas de Filtro Horizontais */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsScroll}
      >
        {filterCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelectCategory(cat)}
              activeOpacity={0.8}
              style={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
            >
              <Text style={[styles.pillText, isActive ? styles.pillTextActive : styles.pillTextInactive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D9CF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  overline: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 20,
  },
  disguiseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  disguiseText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#64748B',
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillsScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 10,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  pillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  pillTextInactive: {
    color: '#334155',
  },
});
