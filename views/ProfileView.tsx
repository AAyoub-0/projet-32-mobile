// react-native
import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";

// services
import authService from '@/services/UtilisateurService';

// components
import TextInputFlat from '../components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// constants
import * as Texts from '../constants/Texts';

const ProfilView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await authService.getToken();
        };

        checkLoginStatus();
    }, []);

    const HandleDisconnectAsync = async () => {
        await authService.logout();
        router.push('/accueil');
    }

    return (
        <View style={{ rowGap: 23 }}>
            <Text style={[Texts.textTitle, Texts.textSemiBold, {textAlign: 'center'}]}>
                Informations du profil
            </Text>

            <View>
                <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>
                    Identifiant
                </Text>
                <TextInputFlat value="admin" disabled border={[1, 1, 1, 1]} borderRadius={8} placeholder="" />
            </View>

            <View>
                <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>
                    Mot de passe
                </Text>
                <TextInputFlat value="motDePasseSuperSecret" secureTextEntry disabled border={[1, 1, 1, 1]} borderRadius={8} placeholder="" />
            </View>


            <ActionButton text="Se déconnecter" type="danger" icon="power-off" isLoading={isLoading} onPress={HandleDisconnectAsync} style={{ marginTop: 23 }} />
        </View>
    )
}
export default ProfilView;