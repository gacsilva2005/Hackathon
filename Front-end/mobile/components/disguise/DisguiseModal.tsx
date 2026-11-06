import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';

interface DisguiseModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DisguiseModal({ visible, onClose }: DisguiseModalProps) {
  const [display, setDisplay] = useState('0');

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      return;
    }
    if (val === '=') {
      try {
        // cálculo seguro básico
        const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
        const res = Function(`'use strict'; return (${sanitized})`)();
        setDisplay(String(res));
      } catch {
        setDisplay('0');
      }
      return;
    }
    setDisplay((prev) => (prev === '0' ? val : prev + val));
  };

  const buttons = [
    ['C', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.exitBtn}>
            <Text style={styles.exitText}>✕ Voltar ao app</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.screen}>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {display}
          </Text>
        </View>

        <View style={styles.pad}>
          {buttons.map((row, rIdx) => (
            <View key={rIdx} style={styles.row}>
              {row.map((btn) => {
                const isOp = ['÷', '×', '-', '+', '='].includes(btn);
                const isZero = btn === '0';
                return (
                  <TouchableOpacity
                    key={btn}
                    style={[
                      styles.btn,
                      isOp && styles.btnOp,
                      isZero && styles.btnZero,
                    ]}
                    onPress={() => handlePress(btn)}
                  >
                    <Text style={[styles.btnText, isOp && styles.btnTextOp]}>
                      {btn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  exitBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#262626',
  },
  exitText: {
    color: '#a3a3a3',
    fontSize: 12,
    fontWeight: '500',
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  displayText: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: '300',
  },
  pad: {
    paddingHorizontal: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  btn: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnZero: {
    flex: 2.15,
    aspectRatio: undefined,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  btnOp: {
    backgroundColor: '#f59e0b',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '500',
  },
  btnTextOp: {
    color: '#ffffff',
  },
});
