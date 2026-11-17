import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface HeaderProps {
  onBack?: () => void;
  onDisguiseTrigger: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack, onDisguiseTrigger }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botão de retorno */}
      <TouchableOpacity
        onPress={onBack}
        accessible={true}
        accessibilityLabel="Voltar"
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.iconButton}
      >
        <Feather name="arrow-left" size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Identificador Institucional & Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.institutionText}>REDE SAMPA TRANS</Text>
        <Text style={styles.titleText}>Detalhes da Unidade</Text>
      </View>

      {/* Ações da Direita */}
      <View style={styles.rightActions}>
        {/* Salvar */}
        <TouchableOpacity
          onPress={() => setIsSaved(!isSaved)}
          accessible={true}
          accessibilityLabel={isSaved ? "Remover dos salvos" : "Salvar unidade"}
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.bookmarkButton, isSaved && styles.bookmarkButtonActive]}
        >
          <Feather
            name="bookmark"
            size={18}
            color={isSaved ? colors.goldDark : colors.textSecondary}
          />
        </TouchableOpacity>

        {/* Botão de Segurança: Disfarçar */}
        <TouchableOpacity
          onPress={onDisguiseTrigger}
          accessible={true}
          accessibilityLabel="Ativar camuflagem de segurança rápida"
          accessibilityRole="button"
          activeOpacity={0.8}
          style={styles.disguiseButton}
        >
          <Feather name="shield" size={13} color="#475569" style={{ marginRight: 4 }} />
          <Text style={styles.disguiseText}>Disfarçar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D9CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  institutionText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bookmarkButtonActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  disguiseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  disguiseText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
});
