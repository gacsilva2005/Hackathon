import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface FilterSectionCardProps {
  selectedCare: string;
  onSelectCare: (val: string) => void;
  selectedRegion: string;
  onSelectRegion: (val: string) => void;
  selectedSphere: 'all' | 'sus' | 'private';
  onSelectSphere: (val: 'all' | 'sus' | 'private') => void;
  onResetFilters: () => void;
}

export const FilterSectionCard: React.FC<FilterSectionCardProps> = ({
  selectedCare,
  onSelectCare,
  selectedRegion,
  onSelectRegion,
  selectedSphere,
  onSelectSphere,
  onResetFilters,
}) => {
  return (
    <View style={styles.card}>
      {/* Cabeçalho de Filtros */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleLeft}>
          <Feather name="bar-chart-2" size={16} color="#0F172A" style={{ transform: [{ rotate: '90deg' }], marginRight: 6 }} />
          <Text style={styles.headerTitle}>FILTROS APLICADOS (3 ATIVOS)</Text>
        </View>
        <TouchableOpacity onPress={onResetFilters} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.resetText}>Limpar Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Grupo 1: TIPO DE ATENDIMENTO */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupLabel}>TIPO DE ATENDIMENTO</Text>
        <View style={styles.pillsWrap}>
          {/* Saúde Integral (Ativo) */}
          <TouchableOpacity
            onPress={() => onSelectCare('Saúde Integral')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedCare === 'Saúde Integral' ? styles.pillActiveDark : styles.pillInactive,
            ]}
          >
            {selectedCare === 'Saúde Integral' && (
              <Feather name="check" size={13} color="#FFFFFF" style={{ marginRight: 5 }} />
            )}
            <Text
              style={[
                styles.pillText,
                selectedCare === 'Saúde Integral' ? styles.pillTextWhite : styles.pillTextDark,
              ]}
            >
              Saúde Integral
            </Text>
          </TouchableOpacity>

          {/* Acolhimento & Abrigo */}
          <TouchableOpacity
            onPress={() => onSelectCare('Acolhimento & Abrigo')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedCare === 'Acolhimento & Abrigo' ? styles.pillActiveDark : styles.pillInactive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                selectedCare === 'Acolhimento & Abrigo' ? styles.pillTextWhite : styles.pillTextDark,
              ]}
            >
              Acolhimento & Abrigo
            </Text>
          </TouchableOpacity>

          {/* Apoio Jurídico / Delegacias */}
          <TouchableOpacity
            onPress={() => onSelectCare('Apoio Jurídico')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedCare === 'Apoio Jurídico' ? styles.pillActiveDark : styles.pillInactive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                selectedCare === 'Apoio Jurídico' ? styles.pillTextWhite : styles.pillTextDark,
              ]}
            >
              Apoio Jurídico / Delegacias
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grupo 2: REGIÃO DA CIDADE */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupLabel}>REGIÃO DA CIDADE</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionScrollContent}
        >
          {/* CRS Leste (Ativa) */}
          <TouchableOpacity
            onPress={() => onSelectRegion('CRS Leste')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedRegion === 'CRS Leste' ? styles.pillActiveBlue : styles.pillInactive,
            ]}
          >
            <View style={[styles.dot, selectedRegion === 'CRS Leste' && styles.dotBlue]} />
            <Text
              style={[
                styles.pillText,
                selectedRegion === 'CRS Leste' ? styles.pillTextBlue : styles.pillTextDark,
              ]}
            >
              CRS Leste (Ativa)
            </Text>
          </TouchableOpacity>

          {/* CRS Norte */}
          <TouchableOpacity
            onPress={() => onSelectRegion('CRS Norte')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedRegion === 'CRS Norte' ? styles.pillActiveBlue : styles.pillInactive,
            ]}
          >
            <Text style={styles.pillTextDark}>CRS Norte</Text>
          </TouchableOpacity>

          {/* CRS Centro/Oeste */}
          <TouchableOpacity
            onPress={() => onSelectRegion('CRS Centro/Oeste')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedRegion === 'CRS Centro/Oeste' ? styles.pillActiveBlue : styles.pillInactive,
            ]}
          >
            <Text style={styles.pillTextDark}>CRS Centro/Oeste</Text>
          </TouchableOpacity>

          {/* CRS Sul */}
          <TouchableOpacity
            onPress={() => onSelectRegion('CRS Sul')}
            activeOpacity={0.8}
            style={[
              styles.pill,
              selectedRegion === 'CRS Sul' ? styles.pillActiveBlue : styles.pillInactive,
            ]}
          >
            <Text style={styles.pillTextDark}>CRS Sul</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Grupo 3: ESFERA */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupLabel}>ESFERA</Text>
        <View style={styles.segmentedContainer}>
          {/* Todas */}
          <TouchableOpacity
            onPress={() => onSelectSphere('all')}
            style={[
              styles.segmentTab,
              selectedSphere === 'all' && styles.segmentTabActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                selectedSphere === 'all' && styles.segmentTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {/* Rede SUS */}
          <TouchableOpacity
            onPress={() => onSelectSphere('sus')}
            style={[
              styles.segmentTab,
              selectedSphere === 'sus' && styles.segmentTabActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                selectedSphere === 'sus' && styles.segmentTextActive,
              ]}
            >
              Rede SUS
            </Text>
          </TouchableOpacity>

          {/* Privada Aliada */}
          <TouchableOpacity
            onPress={() => onSelectSphere('private')}
            style={[
              styles.segmentTab,
              selectedSphere === 'private' && styles.segmentTabActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                selectedSphere === 'private' && styles.segmentTextActive,
              ]}
            >
              Privada Aliada
            </Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 14,
  },
  headerTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#0F172A',
  },
  resetText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  groupContainer: {
    marginBottom: 14,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillActiveDark: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  pillActiveBlue: {
    backgroundColor: '#EBF5FB',
    borderColor: '#BAE6FD',
  },
  pillInactive: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pillTextWhite: {
    color: '#FFFFFF',
  },
  pillTextDark: {
    color: '#334155',
  },
  pillTextBlue: {
    color: '#0284C7',
    fontWeight: '700',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#64748B',
    marginRight: 6,
  },
  dotBlue: {
    backgroundColor: '#0284C7',
  },
  regionScrollContent: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  segmentTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  segmentTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
});
