import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/unit/HeroSection';
import { UnitDetailsCard } from '../components/unit/UnitDetailsCard';
import { CareFlowStepper } from '../components/unit/CareFlowStepper';
import { ServicesGrid } from '../components/unit/ServicesGrid';
import { CommunityReviews } from '../components/unit/CommunityReviews';
import { UnitDetails, CareFlowStep } from '../types/unit.types';
import { colors } from '../theme/colors';

interface UnitDetailsScreenProps {
  onBack: () => void;
  onDisguiseTrigger: () => void;
}

const mockUnitDetails: UnitDetails = {
  name: 'Centro de Referência Janaina Lima (CR POP TT)',
  typeTag: 'AMBULATÓRIO ESPECIALIZADO TT',
  address: 'Rua Jaraguá, 866 - Bom Retiro',
  distance: '1.8 km de você',
  schedule: 'Segunda a Sexta, das 07h às 19h (Exceto feriados)',
  phone: '(11) 5196-2405',
  regionTag: 'CRS Centro • Bom Retiro',
  statusTag: 'Aberto até 19h',
};

const mockCareSteps: CareFlowStep[] = [
  {
    stepNumber: 1,
    title: '1. UBS do seu Bairro',
    badge: {
      text: 'Porta Aberta',
      variant: 'green',
    },
    description:
      'Primeira escuta e acolhimento com direito integral ao Nome Social e solicitação clínica de vaga.',
    status: 'completed',
  },
  {
    stepNumber: 2,
    title: '2. Agendamento via SIGA Saúde',
    badge: {
      text: 'Fase Atual',
      variant: 'blue',
    },
    description:
      'A regulação agenda a data na Rede Sampa Trans conforme a fila municipal. Você acompanha pela UBS ou SMS.',
    status: 'active',
  },
  {
    stepNumber: 3,
    title: '3. Consulta no CR POP TT',
    description:
      'Recepção pela equipe multiprofissional, acompanhamento laboratorial e início seguro do cuidado.',
    status: 'upcoming',
  },
];

export const UnitDetailsScreen: React.FC<UnitDetailsScreenProps> = ({
  onBack,
  onDisguiseTrigger,
}) => {
  return (
    <View style={styles.screen}>
      <Header onBack={onBack} onDisguiseTrigger={onDisguiseTrigger} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection
          regionTag={mockUnitDetails.regionTag}
          statusTag={mockUnitDetails.statusTag}
        />

        <View style={styles.cardsWrapper}>
          <UnitDetailsCard unit={mockUnitDetails} />
          <CareFlowStepper steps={mockCareSteps} />
          <ServicesGrid />
          <CommunityReviews />
        </View>
      </ScrollView>
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
    paddingBottom: 24,
  },
  cardsWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
});
