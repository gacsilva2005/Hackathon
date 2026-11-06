import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchFilterScreen } from './src/screens/SearchFilterScreen';
import { UnitDetailsScreen } from './src/screens/UnitDetailsScreen';
import { RightsAndIAScreen } from './src/screens/RightsAndIAScreen';
import { ProfessionalPortalScreen } from './src/screens/ProfessionalPortalScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { BottomNav, TabType } from './src/components/layout/BottomNav';
import { DisguiseModal } from './src/components/security/DisguiseModal';
import { UnitResultItem } from './src/types/search.types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('rede');
  const [redeSubScreen, setRedeSubScreen] = useState<'search' | 'details'>('search');
  const [isDisguised, setIsDisguised] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);
  const [userProfile, setUserProfile] = useState<'cidadao' | 'profissional' | 'anonimo'>('anonimo');

  const handleSelectUnit = (_unit: UnitResultItem) => {
    setRedeSubScreen('details');
  };

  const handleLoginSuccess = (profile: 'cidadao' | 'profissional' | 'anonimo') => {
    setUserProfile(profile);
    setIsLoginView(false);
    if (profile === 'profissional') {
      setActiveTab('profissional');
    } else {
      setActiveTab('rede');
    }
  };

  const renderCurrentTab = () => {
    if (isLoginView) {
      return (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onDisguiseTrigger={() => setIsDisguised(true)}
          onBackToApp={() => setIsLoginView(false)}
        />
      );
    }

    switch (activeTab) {
      case 'rede':
        if (redeSubScreen === 'search') {
          return (
            <SearchFilterScreen
              onSelectUnit={handleSelectUnit}
              onDisguiseTrigger={() => setIsDisguised(true)}
            />
          );
        }
        return (
          <UnitDetailsScreen
            onBack={() => setRedeSubScreen('search')}
            onDisguiseTrigger={() => setIsDisguised(true)}
          />
        );

      case 'direitos':
        return (
          <RightsAndIAScreen
            onDisguiseTrigger={() => setIsDisguised(true)}
          />
        );

      case 'profissional':
        return (
          <ProfessionalPortalScreen />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      {/* Área da Tela Ativa */}
      <View style={styles.contentArea}>
        {renderCurrentTab()}
      </View>

      {/* Navegação Inferior Global (oculta se estiver na tela de login) */}
      {!isLoginView && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'rede') {
              setRedeSubScreen('search');
            }
          }}
        />
      )}

      {/* Modal de Camuflagem Rápida */}
      <DisguiseModal
        visible={isDisguised}
        onExit={() => setIsDisguised(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  contentArea: {
    flex: 1,
  },
});
