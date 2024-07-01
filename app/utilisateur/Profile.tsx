// react-native
import { View, Platform, KeyboardAvoidingView, ScrollView, StyleSheet, Animated } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState, useEffect, useRef } from 'react';
import { Stack } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

// services
import authService from '@/services/UtilisateurService';

// constants
import * as Colors from '@/constants/Colors';

// views
import ConnexionView from '@/views/ConnexionView';
import ProfileView from '@/views/ProfileView';

const Profile = () => {

    const headerHeight = useHeaderHeight();
    const isFocused = useIsFocused();

    const rotation = useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await authService.getToken();
      setIsLoggedIn(!!token);
      console.log('Token:', token);
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


    const SubmitAsync = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: Colors.colorWhite, flex: 1 }}>
            <Stack.Screen options={
                {
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackTitle: 'Retour',
                }
            }>
            </Stack.Screen>

            <View style={{ paddingTop: headerHeight, justifyContent: 'center', flex: 1 }}>
                <ScrollView style={[styles.container]} alwaysBounceVertical={false} bounces={false}>

                    {!isLoggedIn && (<ConnexionView />)} 
                    {isLoggedIn && (<ProfileView />)}

                  <View style={{ marginBottom: 80 }} />

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
            
    )
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});