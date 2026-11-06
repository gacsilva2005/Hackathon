import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RightsHeader } from '../components/rights/RightsHeader';
import { AISummaryCard } from '../components/rights/AISummaryCard';
import { GuideCard } from '../components/rights/GuideCard';
import { GuideItem } from '../types/rights.types';
import { colors } from '../theme/colors';

interface RightsAndIAScreenProps {
  onDisguiseTrigger: () => void;
}

const mockGuides: GuideItem[] = [
  {
    id: 'cartorios-retificacao',
    category: 'Cartórios SP',
    categoryVariant: 'purple',
    readingTime: '3 min de leitura',
    title: 'Passo a passo simplificado para retificação de prenome e gênero em 2026',
    description: 'Não é mais necessária cirurgia nem laudo psiquiátrico. Veja a lista exata de certidões e como solicitar a gratuidade nos cartórios de SP...',
    linkText: 'Ver Guia Prático',
  },
  {
    id: 'decradi-seguranca',
    category: 'Segurança Pública',
    categoryVariant: 'amber',
    readingTime: '4 min de leitura',
    title: 'Como registrar ocorrência em delegacias especializadas contra crimes de transfobia na Grande SP',
    description: 'Orientações sobre a DECRADI, protocolo humanizado sem revitimização e emissão de B.O. com o nome social respeitado desde a recepção...',
    linkText: 'Ver Protocolo',
  },
  {
    id: 'transcidadania',
    category: 'Trabalho & Renda',
    categoryVariant: 'green',
    readingTime: '2 min de leitura',
    title: 'Programa Transcidadania SP: Abertura de novas vagas e apoio psicossocial',
    description: 'Auxílio mensal para conclusão do ciclo educacional e encaminhamento qualificado para o mercado de trabalho municipal...',
    linkText: 'Consultar Inscrição',
  },
];

export const RightsAndIAScreen: React.FC<RightsAndIAScreenProps> = ({ onDisguiseTrigger }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [activeGuideModal, setActiveGuideModal] = useState<GuideItem | null>(null);

  const filteredGuides = mockGuides.filter((g) => {
    if (category !== 'Todos' && g.category !== category) return false;
    if (search.trim().length > 0 && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.screen}>
      <RightsHeader
        searchQuery={search}
        onSearchChange={setSearch}
        selectedCategory={category}
        onSelectCategory={setCategory}
        onDisguiseTrigger={onDisguiseTrigger}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de Síntese Inteligente com IA */}
        <AISummaryCard />

        {/* Subcabeçalho da Seção de Notícias & Guias Rápidos */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleLeft}>
            <Text style={styles.sectionTitle}>Notícias & Guias Rápidos</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{mockGuides.length} novos</Text>
            </View>
          </View>

          <Text style={styles.verificationText}>Verificação Oficial</Text>
        </View>

        {/* Lista de Guias */}
        {filteredGuides.map((guide) => (
          <GuideCard
            key={guide.id}
            item={guide}
            onPressGuide={(item) => setActiveGuideModal(item)}
          />
        ))}
      </ScrollView>

      {/* Modal de Detalhes do Guia */}
      <Modal
        visible={activeGuideModal !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveGuideModal(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveGuideModal(null)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategoryText}>{activeGuideModal?.category}</Text>
              <TouchableOpacity onPress={() => setActiveGuideModal(null)}>
                <Feather name="x" size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitleText}>{activeGuideModal?.title}</Text>
            <Text style={styles.modalDescText}>{activeGuideModal?.description}</Text>

            <View style={styles.lawBox}>
              <Text style={styles.lawBoxTitle}>Fundamento Jurídico & Garantias:</Text>
              <Text style={styles.lawBoxBody}>
                Conforme ADI 4275 (STF) e Provimento nº 73/2018 do CNJ, o direito à autodeterminação de gênero independe de procedimentos médicos, cirúrgicos ou de parecer pericial.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setActiveGuideModal(null)}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseBtnText}>Entendido</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingBottom: 24,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  sectionTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 6,
  },
  countBadge: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7',
  },
  verificationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
    textTransform: 'uppercase',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 10,
  },
  modalDescText: {
    fontSize: 13.5,
    lineHeight: 20,
    color: '#334155',
    marginBottom: 14,
  },
  lawBox: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },
  lawBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  lawBoxBody: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
  },
  modalCloseBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
