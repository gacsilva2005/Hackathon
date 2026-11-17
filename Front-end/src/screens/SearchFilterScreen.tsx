import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchHeader } from '../components/search/SearchHeader';
import { FilterSectionCard } from '../components/search/FilterSectionCard';
import { UnitResultCard } from '../components/search/UnitResultCard';
import { UnitResultItem } from '../types/search.types';
import { colors } from '../theme/colors';

interface SearchFilterScreenProps {
  onSelectUnit: (unit: UnitResultItem) => void;
  onDisguiseTrigger: () => void;
}

const mockUnitResults: UnitResultItem[] = [
  {
    id: 'casa-ser',
    name: 'Casa Ser - Cidade Tiradentes',
    categoryTag: 'Saúde Integral • CRS Leste',
    categoryVariant: 'blue',
    address: 'Av. Dr. Guilherme de Abreu Sodré, 485',
    tags: [
      { label: 'Hormonização', variant: 'default', iconName: 'medical' },
      { label: 'Saúde Reprodutiva', variant: 'default' },
      { label: 'SUS Gratuito', variant: 'green' },
    ],
    distanceText: '12 km de você',
    transportIcon: 'bus',
    phone: '(11) 2285-1234',
  },
  {
    id: 'ama-ubs-santo-andre',
    name: 'AMA/UBS Jardim Santo André',
    categoryTag: 'Porta Aberta / Atenção Básica',
    categoryVariant: 'green',
    address: 'Rua Miguel Ferreira de Melo, 497',
    tags: [
      { label: 'Acolhimento Primário', variant: 'default', iconName: 'check' },
      { label: 'Testes Rápidos', variant: 'default' },
      { label: 'SUS Gratuito', variant: 'green' },
    ],
    distanceText: '14 km de você',
    transportIcon: 'compass',
    phone: '(11) 2962-5678',
  },
  {
    id: 'cr-pop-tt-janaina',
    name: 'Centro de Referência Janaina Lima (CR POP TT)',
    categoryTag: 'Ambulatório Especializado TT',
    categoryVariant: 'blue',
    address: 'Rua Jaraguá, 866 - Bom Retiro',
    tags: [
      { label: 'Hormonioterapia', variant: 'default', iconName: 'medical' },
      { label: 'Apoio Multiprofissional', variant: 'default' },
      { label: 'SUS Gratuito', variant: 'green' },
    ],
    distanceText: '1.8 km de você',
    transportIcon: 'compass',
    phone: '(11) 5196-2405',
  },
];

export const SearchFilterScreen: React.FC<SearchFilterScreenProps> = ({
  onSelectUnit,
  onDisguiseTrigger,
}) => {
  const [query, setQuery] = useState('Hormonização Zona Leste');
  const [selectedCare, setSelectedCare] = useState('Saúde Integral');
  const [selectedRegion, setSelectedRegion] = useState('CRS Leste');
  const [selectedSphere, setSelectedSphere] = useState<'all' | 'sus' | 'private'>('sus');

  const handleReset = () => {
    setQuery('');
    setSelectedCare('Saúde Integral');
    setSelectedRegion('CRS Leste');
    setSelectedSphere('all');
  };

  return (
    <View style={styles.screen}>
      {/* Header com Campo de Pesquisa */}
      <SearchHeader
        searchQuery={query}
        onSearchChange={setQuery}
        onClearSearch={() => setQuery('')}
        onBack={() => console.log('Voltar')}
        onDisguiseTrigger={onDisguiseTrigger}
        onFilterToggle={() => console.log('Filtro')}
      />

      {/* Conteúdo Rolável */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloco de Filtros Ativos */}
        <FilterSectionCard
          selectedCare={selectedCare}
          onSelectCare={setSelectedCare}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          selectedSphere={selectedSphere}
          onSelectSphere={setSelectedSphere}
          onResetFilters={handleReset}
        />

        {/* Subcabeçalho de Resultados */}
        <View style={styles.resultsSubheader}>
          <View style={styles.resultsCountLeft}>
            <View style={styles.activeDot} />
            <Text style={styles.resultsCountText}>
              RESULTADOS ENCONTRADOS ({mockUnitResults.length})
            </Text>
          </View>

          <View style={styles.sortBadge}>
            <Text style={styles.sortText}>Ordenado por proximidade</Text>
          </View>
        </View>

        {/* Lista de Cards de Unidades */}
        {mockUnitResults.map((unit) => (
          <UnitResultCard
            key={unit.id}
            item={unit}
            onViewDetails={() => onSelectUnit(unit)}
          />
        ))}
      </ScrollView>

      {/* Botão Fixo de Ação: Ver no Mapa (48px WCAG) */}
      <View style={styles.bottomBarContainer}>
        <TouchableOpacity
          onPress={() => console.log('Ver no mapa')}
          activeOpacity={0.85}
          style={styles.mapButton}
        >
          <MaterialCommunityIcons name="map-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.mapButtonText}>
            Ver Resultados no Mapa ({mockUnitResults.length})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
    gap: 14,
  },
  resultsSubheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 4,
  },
  resultsCountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#15803D',
    marginRight: 6,
  },
  resultsCountText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  sortBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sortText: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '500',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(239, 239, 238, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2D9CF',
  },
  mapButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mapButtonText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
