import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Rede & Mapa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="direitos"
        options={{
          title: 'Direitos & IA',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="scale-balance" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="capacitacao"
        options={{
          title: 'Capacitação',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="graduation-cap" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
