import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DoctorProfile } from '../../types/professional.types';
import { colors } from '../../theme/colors';

interface DoctorProfileCardProps {
  profile?: DoctorProfile;
}

const defaultProfile: DoctorProfile = {
  name: 'Dr. Marcelo Ramos',
  crm: 'CRM 182.904',
  role: 'Médico de Família',
  unit: 'UBS República (CRS Centro)',
  certificationStatus: 'Habilitação Sampa Trans em andamento',
  avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
};

export const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({
  profile = defaultProfile,
}) => {
  return (
    <View style={styles.card}>
      {/* Avatar com Badge de Verificação */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: profile.avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.verifiedBadge}>
          <Feather name="check" size={10} color="#FFFFFF" strokeWidth={3} />
        </View>
      </View>

      {/* Dados do Médico */}
      <View style={styles.detailsContainer}>
        {/* Linha 1: Nome e CRM */}
        <View style={styles.nameRow}>
          <Text style={styles.doctorName}>{profile.name}</Text>
          <Text style={styles.crmText}>{profile.crm}</Text>
        </View>

        {/* Linha 2: Cargo e Unidade */}
        <Text style={styles.roleText}>
          {profile.role} • {profile.unit}
        </Text>

        {/* Linha 3: Status da Habilitação */}
        <View style={styles.statusBadge}>
          <Feather name="shield" size={11} color="#0B192C" style={{ marginRight: 5 }} />
          <Text style={styles.statusText}>{profile.certificationStatus}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D6C2AC',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E2E8F0',
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#15803D',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  crmText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  roleText: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EBF5FB',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
});
