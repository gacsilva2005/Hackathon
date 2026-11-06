import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClearSearch: () => void;
  onBack?: () => void;
  onDisguiseTrigger: () => void;
  onFilterToggle?: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onBack,
  onDisguiseTrigger,
  onFilterToggle,
}) => {
  return (
    <View style={styles.container}>
      {/* Barra de Navegação Superior */}
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={onBack}
          accessible={true}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={22} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>BUSCA & FILTROS</Text>

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

      {/* Caixa de Pesquisa com Ícone e Controles */}
      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#64748B" style={styles.searchIcon} />

        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Buscar serviços, especialidades..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={onClearSearch}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.clearButton}
          >
            <Feather name="x" size={13} color="#64748B" />
          </TouchableOpacity>
        )}

        {/* Divisor vertical */}
        <View style={styles.divider} />

        {/* Ícone de filtros / sliders */}
        <TouchableOpacity
          onPress={onFilterToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.tuneButton}
        >
          <MaterialCommunityIcons name="tune-variant" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D9CF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#0F172A',
    textTransform: 'uppercase',
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#CBD5E1',
    marginRight: 10,
  },
  tuneButton: {
    padding: 4,
  },
});
