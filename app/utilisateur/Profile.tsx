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

                  <Image style={{ alignSelf: 'center' }} source={require('@/assets/images/logo-couleur.png')} />

                  <View style={{ flexDirection: 'column', rowGap: 23, marginTop: 33 }}>
                    <Text style={[Texts.textTitle, Texts.textSemiBold, {textAlign: 'center'}]}>Connexion</Text>

                    <View>
                      <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Identifiant <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                      <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre identifiant" />
                    </View>

                    <View>
                      <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Mot de passe <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                      <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre mot de passe" />
                      <TouchableOpacity style={{ alignSelf: 'center'}}>
                        <Text style={[Texts.textLink, Texts.textBold, {marginTop: 10}]}>Mot de passe oublié ?</Text>
                      </TouchableOpacity>
                    </View>

                    <ActionButton text="Connexion" type="success" isLoading={isLoading} onPress={SubmitAsync} style={{ marginTop: 23 }} />
                  </View>

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