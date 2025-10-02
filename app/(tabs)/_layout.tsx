import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration for Cancha Libre
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Inicio',
    },
    {
      name: 'explore',
      route: '/(tabs)/explore',
      icon: 'magnifyingglass',
      label: 'Explorar',
    },
    {
      name: 'bookings',
      route: '/(tabs)/bookings',
      icon: 'calendar',
      label: 'Reservas',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Perfil',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Inicio</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="explore">
          <Icon sf="magnifyingglass" drawable="ic_search" />
          <Label>Explorar</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="bookings">
          <Icon sf="calendar" drawable="ic_calendar" />
          <Label>Reservas</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Perfil</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="bookings" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
