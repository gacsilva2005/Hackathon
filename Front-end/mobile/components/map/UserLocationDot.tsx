import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function UserLocationDot() {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.3,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <View style={styles.container}>
      {/* Outer Halo */}
      <Animated.View
        style={[
          styles.halo,
          {
            transform: [{ scale: pulse }],
          },
        ]}
      />

      {/* Inner Dot */}
      <View style={styles.dot} />

      {/* "Você está aqui" Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Você está aqui</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#cbd5e1',
    opacity: 0.7,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0f172a', // azul marinho escuro
    borderWidth: 2,
    borderColor: '#ffffff',
    marginTop: 9,
  },
  badge: {
    marginTop: 6,
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
});
