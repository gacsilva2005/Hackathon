import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { CareFlowStep } from '../../types/unit.types';
import { colors } from '../../theme/colors';

interface CareFlowStepperProps {
  steps: CareFlowStep[];
}

export const CareFlowStepper: React.FC<CareFlowStepperProps> = ({ steps }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cep, setCep] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = () => {
    if (cep.trim().length > 3) {
      setSearchResult('UBS República / Centro • Av. Ipiranga, 597 (Porta Aberta)');
    }
  };

  return (
    <>
      <View style={styles.card}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="source-fork" size={18} color="#334155" />
            </View>
            <Text style={styles.headerTitle}>Linha de Cuidado & Acesso</Text>
          </View>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolText}>PROTOCOLO SUS</Text>
          </View>
        </View>

        {/* Card Informativo de Acolhimento (Trauma-Informed UX) */}
        <View style={styles.infoBox}>
          <Feather name="info" size={16} color="#B45309" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Unidade terciária especializada. </Text>
            Para início do cuidado, o primeiro acolhimento ocorre via atenção primária (UBS),
            garantindo encaminhamento contínuo e seguro.
          </Text>
        </View>

        {/* Stepper Vertical */}
        <View style={styles.stepperContainer}>
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            return (
              <View key={step.stepNumber} style={styles.stepItem}>
                {/* Linha vertical conectora */}
                {!isLast && <View style={styles.verticalLine} />}

                {/* Marcador do Step */}
                <View style={styles.markerContainer}>
                  {step.status === 'completed' ? (
                    <View style={styles.completedMarker}>
                      <Feather name="check" size={14} color="#FFFFFF" />
                    </View>
                  ) : step.status === 'active' ? (
                    <View style={styles.activeMarker}>
                      <Text style={styles.activeMarkerText}>{step.stepNumber}</Text>
                    </View>
                  ) : (
                    <View style={styles.upcomingMarker}>
                      <Text style={styles.upcomingMarkerText}>{step.stepNumber}</Text>
                    </View>
                  )}
                </View>

                {/* Conteúdo do Step */}
                <View style={styles.stepContent}>
                  <View style={styles.stepTitleRow}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    {step.badge && (
                      <View
                        style={[
                          styles.stepBadge,
                          step.badge.variant === 'green'
                            ? styles.badgeGreen
                            : styles.badgeBlue,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stepBadgeText,
                            step.badge.variant === 'green'
                              ? styles.badgeGreenText
                              : styles.badgeBlueText,
                          ]}
                        >
                          {step.badge.text}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Callout de Ação: Descobrir minha UBS */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          accessible={true}
          accessibilityLabel="Descobrir minha UBS de referência"
          accessibilityRole="button"
          activeOpacity={0.8}
          style={styles.ctaButton}
        >
          <View style={styles.ctaLeft}>
            <View style={styles.compassBox}>
              <Feather name="compass" size={18} color="#334155" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Descobrir minha UBS de referência</Text>
              <Text style={styles.ctaSubtitle}>Localize a unidade mais próxima por endereço ou CEP</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={18} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Modal de Busca de UBS */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Localizar UBS de Referência</Text>
            <Text style={styles.modalSubtitle}>
              Digite seu CEP ou bairro para ver a unidade com acolhimento garantido ao Nome Social:
            </Text>

            <TextInput
              placeholder="Ex: 01130-000 ou Bom Retiro"
              placeholderTextColor="#94A3B8"
              value={cep}
              onChangeText={setCep}
              style={styles.modalInput}
            />

            {searchResult && (
              <View style={styles.searchResultBox}>
                <Text style={styles.searchResultTitle}>Unidade Localizada:</Text>
                <Text style={styles.searchResultText}>{searchResult}</Text>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCancelBtn}
              >
                <Text style={styles.modalCancelText}>Fechar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSearch}
                style={styles.modalConfirmBtn}
              >
                <Text style={styles.modalConfirmText}>Buscar UBS</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  protocolBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  protocolText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#B45309',
    textTransform: 'uppercase',
  },
  infoBox: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  infoIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#334155',
  },
  infoBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  stepperContainer: {
    paddingLeft: 4,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 22,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: 13,
    top: 26,
    bottom: 0,
    width: 2,
    backgroundColor: '#E2E8F0',
  },
  markerContainer: {
    width: 28,
    alignItems: 'center',
    marginRight: 12,
  },
  completedMarker: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#15803D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMarker: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#E2E8F0',
  },
  activeMarkerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  upcomingMarker: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingMarkerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  stepContent: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeGreen: {
    backgroundColor: '#DCFCE7',
    borderColor: '#BBF7D0',
  },
  badgeGreenText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#15803D',
  },
  badgeBlue: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  badgeBlueText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#475569',
  },
  stepDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#475569',
  },
  ctaButton: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E5DDD2',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  compassBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD3C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ctaTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  ctaSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 380,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 14,
  },
  searchResultBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  searchResultTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#15803D',
    marginBottom: 2,
  },
  searchResultText: {
    fontSize: 12.5,
    color: '#166534',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalCancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  modalConfirmBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
