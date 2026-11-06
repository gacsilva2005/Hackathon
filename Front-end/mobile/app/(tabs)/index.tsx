import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';

import SearchBar from '../../components/search/SearchBar';
import FilterTabs from '../../components/search/FilterTabs';
import MapContainer from '../../components/map/MapContainer';
import UBSBottomSheet from '../../components/bottomsheet/UBSBottomSheet';
import DisguiseModal from '../../components/disguise/DisguiseModal';

import { UBS_DATA, FILTER_TABS, INITIAL_REGION } from '../../data/ubs-mock';
import { useNearbyUBS } from '../../hooks/useNearbyUBS';
import { useLocation } from '../../hooks/useLocation';
import { UBS } from '../../types/ubs';

export default function RedeMapaScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedUBSId, setSelectedUBSId] = useState<string | null>('1');
  const [isDisguiseOpen, setIsDisguiseOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Hook de localização do usuário
  const { location: userLocation } = useLocation();

  // Localização padrão simulada se GPS não estiver liberado (Praça da Sé/República)
  const effectiveUserLocation = userLocation ?? {
    latitude: -23.5450,
    longitude: -46.6400,
  };

  // Filtragem e ordenação por proximidade
  const filteredUBS = useNearbyUBS(
    UBS_DATA,
    effectiveUserLocation,
    searchQuery,
    activeFilter
  );

  const handleSelectUBS = (ubs: UBS) => {
    setSelectedUBSId(ubs.id);
    bottomSheetRef.current?.snapToIndex(1);
  };

  const handleViewMap = (ubs: UBS) => {
    setSelectedUBSId(ubs.id);
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <View style={styles.container}>
      {/* 🗺️ Mapa de Fundo */}
      <MapContainer
        ubsList={filteredUBS}
        selectedUBSId={selectedUBSId}
        initialRegion={INITIAL_REGION}
        userLocation={effectiveUserLocation}
        onSelectUBS={handleSelectUBS}
      />

      {/* 🔝 Camada Superior (Search + Filtros) */}
      <SafeAreaView edges={['top']} style={styles.topOverlay} pointerEvents="box-none">
        <View style={styles.headerContent}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onDisguise={() => setIsDisguiseOpen(true)}
          />
          <FilterTabs
            tabs={FILTER_TABS}
            activeId={activeFilter}
            onSelect={setActiveFilter}
          />
        </View>
      </SafeAreaView>

      {/* 📋 Painel Deslizável Inferior com Cards */}
      <UBSBottomSheet
        bottomSheetRef={bottomSheetRef}
        ubsList={filteredUBS}
        selectedUBSId={selectedUBSId}
        region="CRS Centro"
        onSelectUBS={handleSelectUBS}
        onViewMap={handleViewMap}
      />

      {/* 🔒 Modo Disfarçar (Calculadora Discreta) */}
      <DisguiseModal
        visible={isDisguiseOpen}
        onClose={() => setIsDisguiseOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    paddingBottom: 4,
  },
});
