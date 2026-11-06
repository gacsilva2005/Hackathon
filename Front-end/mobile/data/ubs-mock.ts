import { UBS, FilterTab } from '../types/ubs';

export const UBS_DATA: UBS[] = [
  {
    id: '1',
    name: 'UBS República - Fernanda Sante Limeira',
    shortName: 'UBS República',
    address: 'Praça do Patriarca, 100',
    distance: '450m de você',
    hours: 'Aberto até 19h',
    status: 'open',
    statusLabel: 'Porta Aberta: Testes Rápidos & PrEP',
    tags: ['Rede Sampa Trans', 'Nome Social Garantido', 'Profilaxia PEP'],
    phone: '+551131234567',
    region: 'CRS Centro',
    coordinates: {
      latitude: -23.5489,
      longitude: -46.6388,
    },
  },
  {
    id: '2',
    name: 'CR POP TT Janaina Lima - Bom Retiro',
    shortName: 'CR POP TT',
    address: 'Rua Jaraguá, 866',
    distance: '1.8km de você',
    hours: 'Seg a Sex até 19h',
    weekdays: 'Seg a Sex',
    status: 'requires_referral',
    statusLabel: 'Exige Encaminhamento Prévio',
    tags: ['Ambulatório TT Especializado', 'Processo Transexualizador'],
    careLineWarning:
      'Linha de Cuidado: Início da hormonização exige acolhimento prévio na UBS de referência do seu bairro.',
    hasFlow: true,
    region: 'CRS Centro',
    coordinates: {
      latitude: -23.5321,
      longitude: -46.6450,
    },
  },
  {
    id: '3',
    name: 'UBS Campos Elíseos',
    shortName: 'UBS Campos Elíseos',
    address: 'Rua Helvétia, 40',
    distance: '2.3km de você',
    hours: 'Aberto até 17h',
    status: 'open',
    statusLabel: 'Porta Aberta',
    tags: ['Nome Social Garantido', 'Testagem Rápida'],
    phone: '+551132567890',
    region: 'CRS Centro',
    coordinates: {
      latitude: -23.5390,
      longitude: -46.6480,
    },
  },
  {
    id: '4',
    name: 'CRS Centro',
    shortName: 'CRS Centro',
    address: 'Rua Genebra, 71',
    distance: '1.1km de você',
    hours: 'Aberto até 18h',
    status: 'requires_referral',
    statusLabel: 'Exige Encaminhamento Prévio',
    tags: ['Regulação', 'Especialidades'],
    region: 'CRS Centro',
    coordinates: {
      latitude: -23.5440,
      longitude: -46.6350,
    },
  },
];

export const FILTER_TABS: FilterTab[] = [
  { id: 'all', label: 'Todos os Serviços' },
  { id: 'saude_sus', label: 'Saúde SUS (Sampa Trans)' },
  { id: 'acolhimento', label: 'Acolhimento & Escuta' },
  { id: 'testagem', label: 'Testagem Rápida' },
  { id: 'prep', label: 'PrEP / PEP' },
];

// São Paulo centro — região inicial do mapa
export const INITIAL_REGION = {
  latitude: -23.5430,
  longitude: -46.6420,
  latitudeDelta: 0.025,
  longitudeDelta: 0.025,
};
