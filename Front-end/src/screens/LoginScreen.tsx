import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface LoginScreenProps {
  onLoginSuccess: (profile: 'cidadao' | 'profissional' | 'anonimo') => void;
  onDisguiseTrigger: () => void;
  onBackToApp?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onDisguiseTrigger,
  onBackToApp,
}) => {
  const [profileType, setProfileType] = useState<'cidadao' | 'profissional'>('cidadao');
  
  // Campos Cidadão
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Campos Profissional
  const [councilRegister, setCouncilRegister] = useState('');
  const [councilType, setCouncilType] = useState<'CRM' | 'COREN' | 'CRP'>('CRM');
  const [professionalPassword, setProfessionalPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardContainer}
    >
      {/* Header Institucional Superior 56px */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onBackToApp && (
            <TouchableOpacity
              onPress={onBackToApp}
              style={styles.iconButton}
              accessible={true}
              accessibilityLabel="Voltar ao mapa"
              accessibilityRole="button"
            >
              <Feather name="arrow-left" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.headerSubtitle}>REDE SAMPA TRANS</Text>
            <Text style={styles.headerTitle}>Acesso Seguro</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onDisguiseTrigger}
          style={styles.disguiseButton}
          accessible={true}
          accessibilityLabel="Ativar modo disfarçar"
          accessibilityRole="button"
        >
          <Feather name="shield" size={13} color="#475569" style={{ marginRight: 4 }} />
          <Text style={styles.disguiseText}>Disfarçar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Acolhimento e Trauma-Informed */}
        <View style={styles.welcomeCard}>
          <View style={styles.badgeRow}>
            <View style={styles.susBadge}>
              <Text style={styles.susBadgeText}>SUS</Text>
            </View>
            <Text style={styles.welcomePreTitle}>SÃO PAULO • SAÚDE INTEGRAL</Text>
          </View>
          <Text style={styles.welcomeHeading}>Bem-vinde à Rede Sampa Trans</Text>
          <Text style={styles.welcomeDescription}>
            Navegação segura para cuidados em saúde, hormonização, profilaxias e direitos para pessoas trans e travestis.
          </Text>
        </View>

        {/* Seletor de Perfil (Segmented Control) */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            onPress={() => setProfileType('cidadao')}
            style={[
              styles.segmentedTab,
              profileType === 'cidadao' && styles.segmentedTabActive,
            ]}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: profileType === 'cidadao' }}
          >
            <Feather
              name="user"
              size={15}
              color={profileType === 'cidadao' ? '#FFFFFF' : '#475569'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.segmentedText,
                profileType === 'cidadao' && styles.segmentedTextActive,
              ]}
            >
              Cidadão / Usuário
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setProfileType('profissional')}
            style={[
              styles.segmentedTab,
              profileType === 'profissional' && styles.segmentedTabActive,
            ]}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: profileType === 'profissional' }}
          >
            <MaterialCommunityIcons
              name="stethoscope"
              size={16}
              color={profileType === 'profissional' ? '#FFFFFF' : '#475569'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.segmentedText,
                profileType === 'profissional' && styles.segmentedTextActive,
              ]}
            >
              Profissional SUS
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================================================= */}
        {/* FORMULÁRIO 1: CIDADÃO / USUÁRIO                   */}
        {/* ================================================= */}
        {profileType === 'cidadao' ? (
          <View style={styles.formCard}>
            {/* Aviso de Nome Social Soberano */}
            <View style={styles.socialNameCallout}>
              <Feather name="check-circle" size={16} color="#15803D" style={{ marginTop: 2, marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.socialNameTitle}>Garantia do Nome Social</Text>
                <Text style={styles.socialNameText}>
                  Você é identificado pelo seu Nome Social desde o primeiro acesso, sem necessidade de retificação civil prévia.
                </Text>
              </View>
            </View>

            {/* Botão Oficial Gov.br */}
            <TouchableOpacity
              onPress={() => onLoginSuccess('cidadao')}
              style={styles.govBrButton}
              activeOpacity={0.85}
              accessible={true}
              accessibilityLabel="Entrar com conta gov.br"
              accessibilityRole="button"
            >
              <Text style={styles.govBrLogo}>gov.br</Text>
              <Text style={styles.govBrButtonText}>Entrar com gov.br</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou acesse com Cartão SUS</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Campo Identificador */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CPF OU CARTÃO NACIONAL DE SAÚDE (CNS)</Text>
              <View style={styles.inputWrapper}>
                <Feather name="credit-card" size={16} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  value={identifier}
                  onChangeText={setIdentifier}
                  placeholder="000.000.000-00 ou 15 dígitos do CNS"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  style={styles.inputField}
                />
              </View>
            </View>

            {/* Campo Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SENHA DE ACESSO</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={16} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Sua senha cadastrada"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  style={styles.inputField}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  accessible={true}
                  accessibilityLabel={showPassword ? "Ocultar senha" : "Ver senha"}
                >
                  <Feather name={showPassword ? "eye-off" : "eye"} size={16} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Entrar Cidadão */}
            <TouchableOpacity
              onPress={() => onLoginSuccess('cidadao')}
              style={styles.primarySubmitButton}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={styles.primarySubmitText}>Entrar na Minha Conta</Text>
            </TouchableOpacity>

            {/* Ação Crítica: Navegação Anônima (Trauma-Informed) */}
            <View style={styles.anonymousContainer}>
              <TouchableOpacity
                onPress={() => onLoginSuccess('anonimo')}
                style={styles.anonymousButton}
                activeOpacity={0.85}
                accessible={true}
                accessibilityLabel="Continuar sem login em modo anônimo"
                accessibilityRole="button"
              >
                <Feather name="eye-off" size={15} color="#0B192C" style={{ marginRight: 6 }} />
                <Text style={styles.anonymousButtonText}>
                  Continuar sem Login (Acesso Anônimo Seguro)
                </Text>
              </TouchableOpacity>
              <Text style={styles.anonymousNote}>
                Zero cadastro. Não salvamos cookies nem histórico para sua total privacidade e segurança.
              </Text>
            </View>
          </View>
        ) : (
          /* ================================================= */
          /* FORMULÁRIO 2: PROFISSIONAL DE SAÚDE SUS           */
          /* ================================================= */
          <View style={styles.formCard}>
            <View style={styles.professionalBadgeRow}>
              <Text style={styles.profCardTag}>PORTAL B2B • EDUCAÇÃO PERMANENTE</Text>
              <View style={styles.activePill}>
                <View style={styles.greenPulse} />
                <Text style={styles.activePillText}>SMS-SP Homologado</Text>
              </View>
            </View>

            <Text style={styles.profCardTitle}>Acesso para Equipes de Saúde</Text>
            <Text style={styles.profCardSub}>
              Habilitação técnica para médicos de família, enfermagem e assistentes sociais da rede municipal.
            </Text>

            {/* Seleção do Conselho */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONSELHO PROFISSIONAL</Text>
              <View style={styles.councilToggleRow}>
                {(['CRM', 'COREN', 'CRP'] as const).map((council) => (
                  <TouchableOpacity
                    key={council}
                    onPress={() => setCouncilType(council)}
                    style={[
                      styles.councilBtn,
                      councilType === council && styles.councilBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.councilBtnText,
                        councilType === council && styles.councilBtnTextActive,
                      ]}
                    >
                      {council}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Número do Registro */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NÚMERO DO REGISTRO (COM UF: SP)</Text>
              <View style={styles.inputWrapper}>
                <Feather name="award" size={16} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  value={councilRegister}
                  onChangeText={setCouncilRegister}
                  placeholder="Ex: 182.904-SP"
                  placeholderTextColor="#94A3B8"
                  style={styles.inputField}
                />
              </View>
            </View>

            {/* Senha Profissional */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SENHA CORPORATIVA / SIGA</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={16} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  value={professionalPassword}
                  onChangeText={setProfessionalPassword}
                  placeholder="Senha vinculada ao SIGA Saúde"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={true}
                  style={styles.inputField}
                />
              </View>
            </View>

            {/* Botão Entrar Profissional */}
            <TouchableOpacity
              onPress={() => onLoginSuccess('profissional')}
              style={styles.primarySubmitButton}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={styles.primarySubmitText}>Validar Credenciais e Entrar</Text>
            </TouchableOpacity>

            <View style={styles.profFeaturesBox}>
              <Text style={styles.profFeaturesTitle}>O que você acessa ao entrar:</Text>
              <Text style={styles.profFeatureItem}>• Calculadora hormonal clínica com metas laboratoriais</Text>
              <Text style={styles.profFeatureItem}>• Protocolos de conduta rápida e códigos SIGA (Z76.8)</Text>
              <Text style={styles.profFeatureItem}>• Certificação oficial pela Escola Municipal de Saúde</Text>
            </View>
          </View>
        )}

        {/* Rodapé de Segurança e Criptografia */}
        <View style={styles.footerNote}>
          <Feather name="shield" size={14} color="#64748B" style={{ marginRight: 6 }} />
          <Text style={styles.footerNoteText}>
            Ambiente seguro sob protocolo SUS SP • Conformidade LGPD e sigilo médico ético.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#EFEFEE',
  },
  header: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D9CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  headerSubtitle: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D6C2AC',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  susBadge: {
    backgroundColor: '#0B192C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  susBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  welcomePreTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#64748B',
  },
  welcomeHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  welcomeDescription: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
  },
  segmentedTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
  },
  segmentedTabActive: {
    backgroundColor: '#0B192C',
  },
  segmentedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  segmentedTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D6C2AC',
  },
  socialNameCallout: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  socialNameTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
    marginBottom: 2,
  },
  socialNameText: {
    fontSize: 11,
    color: '#166534',
    lineHeight: 16,
  },
  govBrButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#002B7F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
  },
  govBrLogo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  govBrButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    paddingHorizontal: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#64748B',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E9E1D7',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  eyeButton: {
    padding: 6,
  },
  primarySubmitButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0B192C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  primarySubmitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  anonymousContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
    alignItems: 'center',
  },
  anonymousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#D6C2AC',
    marginBottom: 6,
  },
  anonymousButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B192C',
  },
  anonymousNote: {
    fontSize: 10.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 15,
  },
  professionalBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  profCardTag: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#0284C7',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  activePillText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#15803D',
  },
  profCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  profCardSub: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 14,
  },
  councilToggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  councilBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  councilBtnActive: {
    backgroundColor: '#0B192C',
    borderColor: '#0B192C',
  },
  councilBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  councilBtnTextActive: {
    color: '#FFFFFF',
  },
  profFeaturesBox: {
    backgroundColor: '#FAF8F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9E1D7',
    padding: 12,
    marginTop: 4,
  },
  profFeaturesTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  profFeatureItem: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
    marginBottom: 2,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  footerNoteText: {
    fontSize: 10.5,
    color: '#64748B',
    textAlign: 'center',
  },
});
