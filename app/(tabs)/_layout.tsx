import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as Colors from '../../constants/Colors';
import * as Texts from '../../constants/Texts';


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
    }}}>
      <Tabs.Screen name="accueil" options={{ tabBarIcon: () => (
        <FontAwesome name="home" size={28} color={Colors.colorPrimary} />
      ), tabBarLabelStyle: {
        ...Texts.textLink
      }}} />
      <Tabs.Screen name="materiel" options={{ tabBarIcon: () => (
        <FontAwesome name="wrench" size={28} color={Colors.colorPrimary} />
      ), tabBarLabelStyle: {
        ...Texts.textLink
      }}} />
      <Tabs.Screen name="demande" options={{ tabBarIcon: () => (
        <FontAwesome name="plus" size={28} color={Colors.colorPrimary} />
      ), tabBarLabelStyle: {
        ...Texts.textLink
      }}} />
      <Tabs.Screen name="actualites" options={{ tabBarIcon: () => (
        <FontAwesome name="newspaper-o" size={28} color={Colors.colorPrimary} />
      ), tabBarLabelStyle: {
        ...Texts.textLink
      }}} />
      <Tabs.Screen name="calendrier" options={{ tabBarIcon: () => (
        <FontAwesome name="calendar" size={28} color={Colors.colorPrimary} />
      ), tabBarLabelStyle: {
        ...Texts.textLink
      }}} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});