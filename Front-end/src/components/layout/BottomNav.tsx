import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export type TabType = 'rede' | 'direitos' | 'profissional';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <View style={styles.container}>
      {/* Tab 1: Rede & Mapa */}
      <TouchableOpacity
        onPress={() => onSelectTab('rede')}
        style={[styles.tabButton, activeTab === 'rede' && styles.tabButtonActivePill]}
        activeOpacity={0.7}
      >
        <Feather
          name="map"
          size={19}
          color={activeTab === 'rede' ? colors.primaryDark : '#64748B'}
        />
        <Text style={[styles.tabText, activeTab === 'rede' && styles.tabTextActive]}>
          Rede & Mapa
        </Text>
      </TouchableOpacity>

      {/* Tab 2: Direitos & IA */}
      <TouchableOpacity
        onPress={() => onSelectTab('direitos')}
        style={[styles.tabButton, activeTab === 'direitos' && styles.tabButtonActivePill]}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="scale-balance"
          size={20}
          color={activeTab === 'direitos' ? colors.primaryDark : '#64748B'}
        />
        <Text style={[styles.tabText, activeTab === 'direitos' && styles.tabTextActive]}>
          Direitos & IA
        </Text>
      </TouchableOpacity>

      {/* Tab 3: Área Profissional */}
      <TouchableOpacity
        onPress={() => onSelectTab('profissional')}
        style={[styles.tabButton, activeTab === 'profissional' && styles.tabButtonActivePill]}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="medical-bag"
          size={20}
          color={activeTab === 'profissional' ? colors.primaryDark : '#64748B'}
        />
        <Text style={[styles.tabText, activeTab === 'profissional' && styles.tabTextActive]}>
          Área Profissional
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2D9CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  tabButtonActivePill: {
    backgroundColor: '#EBF5FB',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  tabTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
});
