import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import authService from '@/services/UtilisateurService';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import * as Colors from '@/constants/Colors';

export default function TabLayout() {

  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await authService.getToken();
      setIsLoggedIn(!!token);
    };

    if (isFocused) {
      checkLoginStatus();
    }

    const handleLogin = (data: { email: string; token: string }) => {
      console.log('User logged in:', data);
      setIsLoggedIn(true);
    };

    const handleLogout = () => {
      console.log('User logged out');
      setIsLoggedIn(false);
    };

    authService.on('login', handleLogin);
    authService.on('logout', handleLogout);

    // Cleanup listeners on unmount
    return () => {
      authService.off('login', handleLogin);
      authService.off('logout', handleLogout);
    };
  }, [isFocused]);

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
        <AntDesign name="plussquare" size={24} color={color} />
      ), title: "Réserver"}} />
      <Tabs.Screen name="calendrier" options={{ tabBarIcon: ({ color }) => (
        <FontAwesome name="calendar" size={28} color={color} />
      ), title: "Calendrier"}} />
      <Tabs.Screen name="gestion" options={{ tabBarIcon: ({ color }) => (
        <FontAwesome name="cogs" size={28} color={color} />
      ), title: "Gestion", href: isLoggedIn ? '/gestion' : null}} />
    </Tabs>
  );
}