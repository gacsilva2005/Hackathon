import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { CommunityReviewData } from '../../types/unit.types';
import { colors } from '../../theme/colors';

interface CommunityReviewsProps {
  data?: CommunityReviewData;
}

const defaultReviewData: CommunityReviewData = {
  averageRating: 4.8,
  anonymousLabel: '100% Anônimo',
  metrics: [
    { label: 'Respeito ao Nome', score: 4.9 },
    { label: 'Acolhimento Recepção', score: 4.7 },
    { label: 'Segurança Geral', score: 4.8 },
  ],
  testimonial: {
    authorVerifiedText: 'Verificado via Cartão SUS',
    rating: 5,
    quote:
      '“Fui muito bem acolhida pela enfermagem. Chamaram pelo meu nome social desde a portaria sem qualquer constrangimento. Me senti segura do início ao fim.”',
  },
};

export const CommunityReviews: React.FC<CommunityReviewsProps> = ({
  data = defaultReviewData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSendReview = () => {
    setSubmitted(true);
    setTimeout(() => {
      setModalVisible(false);
      setSubmitted(false);
      setFeedbackText('');
    }, 2000);
  };

  return (
    <>
      <View style={styles.card}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Avaliações da Comunidade</Text>
          <View style={styles.headerRight}>
            <View style={styles.anonymousBadge}>
              <Feather name="shield" size={10} color="#15803D" style={{ marginRight: 4 }} />
              <Text style={styles.anonymousText}>{data.anonymousLabel}</Text>
            </View>
            <View style={styles.ratingBox}>
              <FontAwesome name="star" size={13} color="#F59E0B" style={{ marginRight: 4 }} />
              <Text style={styles.ratingText}>{data.averageRating.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* 3 Métricas Humanizadas */}
        <View style={styles.metricsRow}>
          {data.metrics.map((metric, idx) => (
            <View key={idx} style={styles.metricCard}>
              <Text style={styles.metricScore}>{metric.score.toFixed(1)}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        {/* Card do Depoimento */}
        <View style={styles.testimonialBox}>
          <View style={styles.testimonialHeader}>
            {/* 5 Estrelas */}
            <View style={styles.starsRow}>
              {[...Array(data.testimonial.rating)].map((_, i) => (
                <FontAwesome key={i} name="star" size={12} color="#F59E0B" style={{ marginRight: 2 }} />
              ))}
            </View>

            {/* Selo Verificado */}
            <View style={styles.verifiedRow}>
              <Feather name="check-circle" size={12} color="#15803D" style={{ marginRight: 4 }} />
              <Text style={styles.verifiedText}>{data.testimonial.authorVerifiedText}</Text>
            </View>
          </View>

          <Text style={styles.quoteText}>{data.testimonial.quote}</Text>
        </View>

        {/* Botão de Avaliação Anônima (48px) */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          accessible={true}
          accessibilityLabel="Compartilhar avaliação anônima"
          accessibilityRole="button"
          activeOpacity={0.85}
          style={styles.actionButton}
        >
          <Feather name="message-square" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Compartilhar Avaliação Anônima</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Avaliação Segura */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Avaliação Segura & Anônima</Text>
            <Text style={styles.modalSubtitle}>
              Ajude a fortalecer a rede de acolhimento trans. Seus dados nunca são identificados.
            </Text>

            {submitted ? (
              <View style={styles.successBox}>
                <Feather name="check" size={24} color="#15803D" style={{ marginBottom: 6 }} />
                <Text style={styles.successTitle}>Relato Enviado com Sucesso!</Text>
                <Text style={styles.successSub}>Obrigado por apoiar a comunidade.</Text>
              </View>
            ) : (
              <>
                <TextInput
                  placeholder="Escreva como foi seu acolhimento e respeito ao Nome Social..."
                  placeholderTextColor="#94A3B8"
                  value={feedbackText}
                  onChangeText={setFeedbackText}
                  multiline={true}
                  numberOfLines={4}
                  style={styles.feedbackInput}
                />

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.modalCancelBtn}
                  >
                    <Text style={styles.modalCancelText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSendReview}
                    style={styles.modalSubmitBtn}
                  >
                    <Text style={styles.modalSubmitText}>Enviar Relato</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  anonymousBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  anonymousText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricScore: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
  },
  testimonialBox: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#15803D',
  },
  quoteText: {
    fontSize: 12.5,
    fontStyle: 'italic',
    lineHeight: 18,
    color: '#334155',
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
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 380,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: '#0F172A',
    textAlignVertical: 'top',
    height: 90,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalCancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  modalSubmitBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successBox: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#15803D',
    marginBottom: 4,
  },
  successSub: {
    fontSize: 12,
    color: '#475569',
  },
});
