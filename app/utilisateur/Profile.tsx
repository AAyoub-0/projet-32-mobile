// react-native
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Animated, Easing } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { FontAwesome } from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';
import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import Checkbox from 'expo-checkbox';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// views
import ConnexionView from '@/views/ConnexionView';
import ProfileView from '@/views/ProfileView';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';

// models
import { Reservation } from "@/models/Reservation";
import ActionButton from "@/components/ActionButton";

const Profile = () => {

    const headerHeight = useHeaderHeight();

    const rotation = useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(false);

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

                  {/* <ConnexionView /> */}
                  <ProfileView />

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