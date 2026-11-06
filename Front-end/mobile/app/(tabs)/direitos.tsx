import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DireitosScreen() {
  const cards = [
    {
      title: 'Uso do Nome Social no SUS',
      desc: 'Portaria nº 1.820/2009 garante o direito de ser identificado pelo nome social em todos os serviços de saúde.',
      icon: 'card-account-details-outline',
    },
    {
      title: 'Acesso à PrEP e PEP',
      desc: 'Profilaxia Pré e Pós-Exposição ao HIV gratuitas pelo SUS em unidades de referência e porta aberta.',
      icon: 'shield-check-outline',
    },
    {
      title: 'Processo Transexualizador',
      desc: 'Diretrizes de cuidado integral, acolhimento inicial, terapia hormonal e procedimentos cirúrgicos no SUS.',
      icon: 'transit-connection-variant',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Direitos & Guia SUS</Text>
        <Text style={styles.headerSub}>
          Informações claras sobre seus direitos na rede pública de saúde com auxílio de IA.
        </Text>

        {/* AI Prompt Box */}
        <View style={styles.aiBox}>
          <View style={styles.aiHeader}>
            <MaterialCommunityIcons name="robot" size={20} color="#2563eb" />
            <Text style={styles.aiTitle}>Assistente de Direitos</Text>
          </View>
          <Text style={styles.aiText}>
            Tire dúvidas sobre encaminhamentos, leis ou denúncias de discriminação na saúde.
          </Text>
          <TouchableOpacity style={styles.aiBtn}>
            <Feather name="message-square" size={14} color="#ffffff" />
            <Text style={styles.aiBtnText}>Iniciar Consulta Guiada</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Cartilhas de Direitos</Text>
        {cards.map((c, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons name={c.icon as any} size={22} color="#1f2937" />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardDesc}>{c.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 18,
  },
  aiBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 24,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e40af',
  },
  aiText: {
    fontSize: 12,
    color: '#1e3a8a',
    lineHeight: 18,
    marginBottom: 12,
  },
  aiBtn: {
    backgroundColor: '#1d4ed8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  aiBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 16,
  },
});
