import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const QuickToolsSection: React.FC = () => {
  const [modalType, setModalType] = useState<'calc' | 'guide' | null>(null);
  const [selectedGenderTherapy, setSelectedGenderTherapy] = useState<'fem' | 'masc'>('fem');

  return (
    <>
      <View style={styles.container}>
        {/* Cabeçalho da Seção */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="medical-bag" size={16} color="#0F172A" style={{ marginRight: 6 }} />
            <Text style={styles.headerTitle}>FERRAMENTAS RÁPIDAS DE CONSULTÓRIO</Text>
          </View>
          <Text style={styles.protocolYear}>Protocolos 2026</Text>
        </View>

        {/* Grade de 2 Ferramentas */}
        <View style={styles.toolsRow}>
          {/* Card 1: Calculadora Hormonal */}
          <TouchableOpacity
            onPress={() => setModalType('calc')}
            activeOpacity={0.8}
            style={styles.toolCard}
          >
            <View style={[styles.iconBox, { backgroundColor: '#EBF5FB' }]}>
              <MaterialCommunityIcons name="calculator-variant-outline" size={20} color="#0284C7" />
            </View>
            <Text style={styles.toolTitle}>Calculadora Hormonal</Text>
            <Text style={styles.toolSubtitle}>Doses, intervalos e exames</Text>
          </TouchableOpacity>

          {/* Card 2: Guia Sampa Trans */}
          <TouchableOpacity
            onPress={() => setModalType('guide')}
            activeOpacity={0.8}
            style={styles.toolCard}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F0FDF4' }]}>
              <MaterialCommunityIcons name="book-open-outline" size={20} color="#15803D" />
            </View>
            <Text style={styles.toolTitle}>Guia Sampa Trans</Text>
            <Text style={styles.toolSubtitle}>PDF rápido de condutas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Calculadora Hormonal */}
      <Modal
        visible={modalType === 'calc'}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalType(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalType(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Calculadora Hormonal SUS</Text>
              <TouchableOpacity onPress={() => setModalType(null)}>
                <Feather name="x" size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitleText}>
              Parâmetros clínicos e dosagens recomendadas pelo Protocolo Municipal de São Paulo:
            </Text>

            <View style={styles.toggleRow}>
              <TouchableOpacity
                onPress={() => setSelectedGenderTherapy('fem')}
                style={[styles.toggleBtn, selectedGenderTherapy === 'fem' && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, selectedGenderTherapy === 'fem' && styles.toggleTextActive]}>
                  Terapia Feminizante
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedGenderTherapy('masc')}
                style={[styles.toggleBtn, selectedGenderTherapy === 'masc' && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, selectedGenderTherapy === 'masc' && styles.toggleTextActive]}>
                  Terapia Masculinizante
                </Text>
              </TouchableOpacity>
            </View>

            {selectedGenderTherapy === 'fem' ? (
              <View style={styles.doseInfoBox}>
                <Text style={styles.doseTitle}>Valerato de Estradiol + Espironolactona</Text>
                <Text style={styles.doseLine}>• Dose inicial: Estradiol 2mg a 4mg/dia via oral</Text>
                <Text style={styles.doseLine}>• Bloqueador: Espironolactona 50mg a 100mg/dia</Text>
                <Text style={styles.doseLine}>• Meta laboratorial: Estradiol 100-200 pg/mL, Testosterona &lt; 50 ng/dL</Text>
                <Text style={styles.doseLine}>• Monitoramento: TGO/TGP, Potássio e Hemograma a cada 3 meses</Text>
              </View>
            ) : (
              <View style={styles.doseInfoBox}>
                <Text style={styles.doseTitle}>Undecilato / Cipionato de Testosterona</Text>
                <Text style={styles.doseLine}>• Cipionato: 200mg a cada 2 a 3 semanas IM</Text>
                <Text style={styles.doseLine}>• Undecilato: 1000mg a cada 10 a 12 semanas IM</Text>
                <Text style={styles.doseLine}>• Meta laboratorial: Testosterona total 400-700 ng/dL</Text>
                <Text style={styles.doseLine}>• Monitoramento: Hematócrito (risco policitemia) e Perfil Lipídico</Text>
              </View>
            )}

            <TouchableOpacity onPress={() => setModalType(null)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>Concluído</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal Guia Rápido */}
      <Modal
        visible={modalType === 'guide'}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalType(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalType(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Guia de Condutas Rápidas Sampa Trans</Text>
              <TouchableOpacity onPress={() => setModalType(null)}>
                <Feather name="x" size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <View style={styles.doseInfoBox}>
              <Text style={styles.doseTitle}>1. Acolhimento na Atenção Primária (Porta Aberta):</Text>
              <Text style={styles.doseLine}>Garantia incondicional do Nome Social desde a portaria até a prescrição no prontuário.</Text>
              <Text style={styles.doseTitle}>2. Encaminhamento Seguro:</Text>
              <Text style={styles.doseLine}>Inserção no SIGA Saúde com código Z76.8 ou F64.0 (sem patologização nas observações clínicas).</Text>
              <Text style={styles.doseTitle}>3. Prevenção Combinada:</Text>
              <Text style={styles.doseLine}>Disponibilização imediata de PrEP e PEP sem burocracia na unidade.</Text>
            </View>

            <TouchableOpacity onPress={() => setModalType(null)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>Fechar Guia</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.6,
  },
  protocolYear: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toolCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D6C2AC',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  toolSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
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
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitleText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#64748B',
  },
  toggleTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
  doseInfoBox: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  doseTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  doseLine: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    marginBottom: 4,
  },
  modalCloseBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
