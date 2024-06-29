import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';


export default function TabLayout() {

  return (
    <Tabs screenOptions={{ tabBarStyle: {
      backgroundColor: Colors.colorWhite,
      shadowColor: Colors.colorBorder,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      borderTopWidth: 2,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }, 
    tabBarActiveTintColor: Colors.colorPrimary,
    tabBarInactiveTintColor: Colors.colorGray,
    tabBarLabelStyle: {
      fontSize: 11,
    }}}>
      <Tabs.Screen name="accueil" options={{ tabBarIcon: ({ color }) => (
        <FontAwesome name="home" size={28} color={color} />
      ), title: "Accueil"}} />
      <Tabs.Screen name="demande" options={{ tabBarIcon: ({ color }) => (
        <FontAwesome name="plus" size={28} color={color} />
      ), title: "Réserver"}} />
      <Tabs.Screen name="calendrier" options={{ tabBarIcon: ({ color }) => (
        <FontAwesome name="calendar" size={28} color={color} />
      ), title: "Calendrier"}} />
      <Tabs.Screen name="gestion" options={{ tabBarIcon: ({ color }) => (
        <FontAwesome name="cogs" size={28} color={color} />
      ), title: "Gestion"}} />
    </Tabs>
  );
}