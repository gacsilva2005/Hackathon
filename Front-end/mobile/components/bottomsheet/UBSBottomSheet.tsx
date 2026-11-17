import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { UBS } from '../../types/ubs';
import UBSCard from '../ubs/UBSCard';

interface UBSBottomSheetProps {
  ubsList: UBS[];
  selectedUBSId: string | null;
  region?: string;
  onSelectUBS: (ubs: UBS) => void;
  onViewMap?: (ubs: UBS) => void;
  onViewFlow?: (ubs: UBS) => void;
  bottomSheetRef?: React.RefObject<BottomSheet>;
}

export default function UBSBottomSheet({
  ubsList,
  selectedUBSId,
  region = 'CRS Centro',
  onSelectUBS,
  onViewMap,
  onViewFlow,
  bottomSheetRef,
}: UBSBottomSheetProps) {
  const internalRef = useRef<BottomSheet>(null);
  const ref = bottomSheetRef ?? internalRef;

  // Snap points cobrindo desde a visualização parcial até a tela cheia
  const snapPoints = useMemo(() => ['36%', '58%', '92%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheetBackground}
      enablePanDownToClose={false}
    >
      {/* Header fixo do BottomSheet */}
      <BottomSheetView style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Mais Próximos de Você (São Paulo)</Text>
          <View style={styles.subRow}>
            <View style={styles.greenDot} />
            <Text style={styles.headerSub}>
              {ubsList.length} unidades verificadas com atendimento hoje
            </Text>
          </View>
        </View>

        {region ? (
          <View style={styles.regionBadge}>
            <Text style={styles.regionText}>{region}</Text>
          </View>
        ) : null}
      </BottomSheetView>

      {/* Lista de UBS com rolagem */}
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ubsList.map((ubs) => (
          <UBSCard
            key={ubs.id}
            ubs={ubs}
            isSelected={ubs.id === selectedUBSId}
            onPress={onSelectUBS}
            onViewMap={onViewMap}
            onViewFlow={onViewFlow}
          />
        ))}
        <View style={styles.bottomSpacer} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  handle: {
    backgroundColor: '#cbd5e1',
    width: 44,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  headerSub: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  regionBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  regionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4b5563',
  },
  scrollContent: {
    paddingTop: 12,
  },
  bottomSpacer: {
    height: 60,
  },
});
