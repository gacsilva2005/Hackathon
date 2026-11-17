import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/unit/HeroSection';
import { UnitDetailsCard } from './components/unit/UnitDetailsCard';
import { CareFlowStepper } from './components/unit/CareFlowStepper';
import { ServicesGrid } from './components/unit/ServicesGrid';
import { CommunityReviews } from './components/unit/CommunityReviews';
import { BottomNav } from './components/layout/BottomNav';
import { DisguiseModal } from './components/security/DisguiseModal';
import { UnitDetails, CareFlowStep } from './types/unit.types';

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

export const App: React.FC = () => {
  const [isDisguised, setIsDisguised] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFEFEE] flex justify-center selection:bg-slate-800 selection:text-white">
      {/* Container Mobile Viewport Fiel (max-w-md com bordas e sombra sutis) */}
      <main className="w-full max-w-md min-h-screen bg-[#EFEFEE] relative flex flex-col shadow-xl">
        {/* Header Unificado de 56px com backdrop-blur */}
        <Header
          onBack={() => alert('Navegar para lista anterior')}
          onDisguiseTrigger={() => setIsDisguised(true)}
        />

        {/* Hero Image com gradiente e tags contextuais */}
        <HeroSection
          regionTag={mockUnitDetails.regionTag}
          statusTag={mockUnitDetails.statusTag}
        />

        {/* Conteúdo com cards harmoniosos (sem Card Hell) */}
        <div className="px-4 py-4 space-y-3.5 pb-24">
          {/* Card Principal da Unidade */}
          <UnitDetailsCard unit={mockUnitDetails} />

          {/* Stepper de Linha de Cuidado & Acesso SUS */}
          <CareFlowStepper steps={mockCareSteps} />

          {/* Grade 2x2 de Serviços Multidisciplinares */}
          <ServicesGrid />

          {/* Avaliações da Comunidade & Métricas de Segurança */}
          <CommunityReviews />
        </div>

        {/* Barra de Navegação Inferior Fixa */}
        <BottomNav />

        {/* Tela de Camuflagem Rápida (Safety Feature) */}
        <DisguiseModal
          isOpen={isDisguised}
          onExit={() => setIsDisguised(false)}
        />
      </main>
    </div>
  );
};

export default App;
