export interface DoctorProfile {
  name: string;
  crm: string;
  role: string;
  unit: string;
  certificationStatus: string;
  avatarUrl: string;
}

export interface TrainingModuleItem {
  id: string;
  number: number;
  title: string;
  statusText: string;
  status: 'completed' | 'active' | 'locked';
  scoreText?: string;
}

export interface UnitImpactData {
  unitName: string;
  periodText: string;
  patientsWelcomed: number;
  socialNameRespectRate: number;
  auditTag: string;
}
