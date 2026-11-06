import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const ActiveLessonCard: React.FC = () => {
  const [lessonModalVisible, setLessonModalVisible] = useState(false);
  const [completedLesson, setCompletedLesson] = useState(false);

  return (
    <>
      <View style={styles.card}>
        {/* Topo: Módulo Atual e Tempo Restante */}
        <View style={styles.topRow}>
          <View style={styles.moduleBadge}>
            <Text style={styles.moduleBadgeText}>MÓDULO ATUAL • AULA 4 DE 6</Text>
          </View>

          <View style={styles.timeInfo}>
            <Feather name="clock" size={12} color="#64748B" style={{ marginRight: 4 }} />
            <Text style={styles.timeText}>12 min restantes</Text>
          </View>
        </View>

        {/* Título da Aula */}
        <Text style={styles.lessonTitle}>
          Direitos Civis, Quebra de Estigma e Notificação de Violência Institucional
        </Text>

        {/* Descrição dos Protocolos */}
        <Text style={styles.lessonDescription}>
          Protocolos de acolhimento sem revitimização, uso do nome social no prontuário e linha direta de apoio à vítima.
        </Text>

        {/* Botão de Ação Ergonômico (48px) */}
        <TouchableOpacity
          onPress={() => setLessonModalVisible(true)}
          accessible={true}
          accessibilityLabel="Continuar aula de direitos civis e acolhimento"
          accessibilityRole="button"
          activeOpacity={0.85}
          style={styles.actionButton}
        >
          <FontAwesome5 name="play" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Continuar Aula • 12 min</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Interativo da Aula */}
      <Modal
        visible={lessonModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLessonModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setLessonModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSub}>Educação Permanente SUS • Aula 4</Text>
              <TouchableOpacity onPress={() => setLessonModalVisible(false)}>
                <Feather name="x" size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>
              Direitos Civis e Combate à Violência Institucional
            </Text>

            <View style={styles.lessonBox}>
              <Text style={styles.lessonBoxTitle}>Condutas Obrigatórias na UBS:</Text>
              <Text style={styles.lessonBoxLine}>
                1. Chamada pública na recepção e consultório EXCLUSIVAMENTE pelo Nome Social declarado.
              </Text>
              <Text style={styles.lessonBoxLine}>
                2. Garantia de privacidade e não constrangimento durante a triagem e coleta de exames.
              </Text>
              <Text style={styles.lessonBoxLine}>
                3. Preenchimento do campo "Identidade de Gênero" e "Nome Social" no prontuário eletrônico municipal.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setCompletedLesson(true);
                setTimeout(() => setLessonModalVisible(false), 1200);
              }}
              style={[styles.finishBtn, completedLesson && styles.finishBtnDone]}
            >
              <Text style={styles.finishBtnText}>
                {completedLesson ? "✓ Aula Marcada como Concluída!" : "Concluir Aula de Hoje"}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moduleBadge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  moduleBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  lessonTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: 22,
  },
  lessonDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#475569',
    marginBottom: 14,
  },
  actionButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0284C7',
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
    lineHeight: 23,
  },
  lessonBox: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  lessonBoxTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  lessonBoxLine: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    marginBottom: 6,
  },
  finishBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtnDone: {
    backgroundColor: '#15803D',
  },
  finishBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
