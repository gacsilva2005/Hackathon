import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const AISummaryCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAudioToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      Alert.alert(
        'Reprodução de Áudio',
        'Reproduzindo síntese por voz dos seus direitos no SUS (Leitor de Acessibilidade).'
      );
    }
  };

  const handleReadFullLaw = () => {
    Alert.alert(
      'Portaria MS nº 2.803',
      'Redefine e amplia o Processo Transexualizador no Sistema Único de Saúde (SUS), garantindo acolhimento integral, hormonioterapia e cirurgias de afirmação de gênero.'
    );
  };

  return (
    <View style={styles.card}>
      {/* Faixa Superior de Destaque */}
      <View style={styles.topAccentBar} />

      <View style={styles.contentPadding}>
        {/* Badges de Topo */}
        <View style={styles.badgesRow}>
          <View style={styles.aiBadge}>
            <MaterialCommunityIcons name="creation" size={13} color="#0284C7" style={{ marginRight: 5 }} />
            <Text style={styles.aiBadgeText}>Síntese Inteligente com IA</Text>
          </View>

          <View style={styles.legislationBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.legislationText}>Legislação Vigente 2026</Text>
          </View>
        </View>

        {/* Título & Portaria */}
        <Text style={styles.titleText}>Resumo com IA: Direitos na Rede SUS 2026</Text>
        <Text style={styles.metaText}>
          Portaria MS nº 2.803 revisada • Protocolo Sampa Trans
        </Text>

        {/* 3 Pontos Chave com Checklist Verde */}
        <View style={styles.bulletsContainer}>
          {/* Ponto 1: Nome Social */}
          <View style={styles.bulletItem}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={11} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.bulletText}>
              O uso do <Text style={styles.boldText}>Nome Social</Text> é garantido por lei em qualquer unidade da rede municipal e estadual, sem exigência de documento retificado prévio.
            </Text>
          </View>

          {/* Ponto 2: PEP */}
          <View style={styles.bulletItem}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={11} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.bulletText}>
              A <Text style={styles.boldText}>Profilaxia Pós-Exposição (PEP)</Text> é gratuita e deve ser iniciada prioritariamente nas primeiras 2h até no máximo 72h após exposição.
            </Text>
          </View>

          {/* Ponto 3: Processo Transexualizador */}
          <View style={styles.bulletItem}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={11} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.bulletText}>
              Centros Especializados municipais (ex: Janaina Lima) oferecem equipe multiprofissional contínua para o <Text style={styles.boldText}>processo transexualizador</Text>.
            </Text>
          </View>
        </View>

        {/* Botões de Ação do Resumo */}
        <View style={styles.actionsRow}>
          <View style={styles.leftButtons}>
            {/* Botão Copiar */}
            <TouchableOpacity
              onPress={handleCopy}
              style={[styles.smallBtn, copied && styles.smallBtnSuccess]}
              activeOpacity={0.8}
            >
              <Feather name={copied ? "check" : "copy"} size={13} color={copied ? "#15803D" : "#334155"} style={{ marginRight: 4 }} />
              <Text style={[styles.smallBtnText, copied && styles.smallBtnTextSuccess]}>
                {copied ? "Copiado!" : "Copiar"}
              </Text>
            </TouchableOpacity>

            {/* Botão Ouvir Resumo */}
            <TouchableOpacity
              onPress={handleAudioToggle}
              style={[styles.smallBtn, isPlayingAudio && styles.smallBtnAudioActive]}
              activeOpacity={0.8}
            >
              <Feather
                name={isPlayingAudio ? "volume-2" : "volume-1"}
                size={13}
                color={isPlayingAudio ? "#0284C7" : "#334155"}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.smallBtnText, isPlayingAudio && styles.smallBtnTextAudio]}>
                {isPlayingAudio ? "Pausar" : "Ouvir Resumo"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ler Portaria */}
          <TouchableOpacity
            onPress={handleReadFullLaw}
            style={styles.linkRight}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.linkText}>Ler portaria</Text>
            <Feather name="external-link" size={12} color="#0F172A" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  topAccentBar: {
    height: 4,
    backgroundColor: colors.primaryDark,
    width: '100%',
  },
  contentPadding: {
    padding: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FB',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
  legislationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#15803D',
    marginRight: 5,
  },
  legislationText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: 23,
  },
  metaText: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 14,
  },
  bulletsContainer: {
    gap: 8,
    marginBottom: 14,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    padding: 10,
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#15803D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#334155',
  },
  boldText: {
    fontWeight: '700',
    color: '#0F172A',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  leftButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  smallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  smallBtnSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  smallBtnAudioActive: {
    backgroundColor: '#EBF5FB',
    borderColor: '#BAE6FD',
  },
  smallBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#334155',
  },
  smallBtnTextSuccess: {
    color: '#15803D',
  },
  smallBtnTextAudio: {
    color: '#0284C7',
  },
  linkRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
});
