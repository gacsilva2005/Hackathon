import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ProfessionalHeader } from '../components/professional/ProfessionalHeader';
import { DoctorProfileCard } from '../components/professional/DoctorProfileCard';
import { QuickToolsSection } from '../components/professional/QuickToolsSection';
import { CourseProgressCard } from '../components/professional/CourseProgressCard';
import { ActiveLessonCard } from '../components/professional/ActiveLessonCard';
import { ModulesList } from '../components/professional/ModulesList';
import { UnitImpactCard } from '../components/professional/UnitImpactCard';
import { colors } from '../theme/colors';

export const ProfessionalPortalScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <ProfessionalHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de Perfil do Médico */}
        <DoctorProfileCard />

        {/* Ferramentas Rápidas de Consultório (Calculadora + Guia) */}
        <QuickToolsSection />

        {/* Card de Progresso da Formação LGBTQIAPN+ (65%) */}
        <CourseProgressCard />

        {/* Card da Aula Atual Ativa (Módulo 4 Aula 4 de 6) */}
        <ActiveLessonCard />

        {/* Lista de Módulos (Concluídos e Bloqueados) */}
        <ModulesList />

        {/* Métricas de Impacto na Unidade (Auditado SUS) */}
        <UnitImpactCard />
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
    padding: 16,
    paddingBottom: 24,
    gap: 12,
  },
});
