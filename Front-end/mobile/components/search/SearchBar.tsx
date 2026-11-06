import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, spacing, radius, fontSize } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onDisguise?: () => void;
}

export default function SearchBar({ value, onChangeText, onDisguise }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Feather name="search" size={17} color="#4b5563" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar UBS, PrEP, acolhimento, endereço..."
          placeholderTextColor="#6b7280"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.disguiseBtn} onPress={onDisguise} activeOpacity={0.75}>
          <FontAwesome5 name="shield-alt" size={12} color="#111827" />
          <Text style={styles.disguiseText}>Disfarçar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    paddingVertical: 4,
    marginRight: 6,
  },
  disguiseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 5,
  },
  disguiseText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: '700',
  },
});
