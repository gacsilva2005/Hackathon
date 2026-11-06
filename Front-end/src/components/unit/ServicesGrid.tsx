import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ServiceItem } from '../../types/unit.types';

interface ServicesGridProps {
  services?: ServiceItem[];
}

const defaultServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Hormonioterapia',
    subtitle: 'Protocolo SUS',
    category: 'Médico',
    iconName: 'pill',
    accentColor: '#15803D',
  },
  {
    id: '2',
    title: 'Psicologia',
    subtitle: 'Apoio continuado',
    category: 'Apoio',
    iconName: 'brain',
    accentColor: '#0284C7',
  },
  {
    id: '3',
    title: 'Serviço Social',
    subtitle: 'Cidadania & direitos',
    category: 'Social',
    iconName: 'users',
    accentColor: '#B45309',
  },
  {
    id: '4',
    title: 'Nome Social',
    subtitle: 'Orientação cartório',
    category: 'Jurídico',
    iconName: 'badge',
    accentColor: '#7E22CE',
  },
];

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services = defaultServices,
}) => {
  const renderIcon = (name: ServiceItem['iconName'], color: string) => {
    switch (name) {
      case 'pill':
        return <MaterialCommunityIcons name="pill" size={18} color={color} />;
      case 'brain':
        return <MaterialCommunityIcons name="brain" size={18} color={color} />;
      case 'users':
        return <MaterialCommunityIcons name="account-group" size={18} color={color} />;
      case 'badge':
        return <MaterialCommunityIcons name="card-account-details-outline" size={18} color={color} />;
    }
  };

  return (
    <View style={styles.card}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Serviços Oferecidos</Text>
        <Text style={styles.headerSubtitle}>Equipe Multidisciplinar</Text>
      </View>

      {/* Grade 2x2 Harmoniosa */}
      <View style={styles.grid}>
        {services.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: item.accentColor + '12' },
              ]}
            >
              {renderIcon(item.iconName, item.accentColor)}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
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
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '48.5%',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemSubtitle: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
});
