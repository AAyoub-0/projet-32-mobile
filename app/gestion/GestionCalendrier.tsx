// react-native
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import { Stack, router } from "expo-router";
import { useIsFocused } from '@react-navigation/native';

// services
import { getEvenementsByYear } from '@/services/EvenementService';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActualiteFuture from "@/components/ActualiteFuture";
import ActionButton from "@/components/ActionButton";

// models
import { Evenement } from "@/models/Evenement";

const GestionCalendrier = () => {

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [evenements, setEvenements] = useState<Evenement[]>([]);

    useEffect(() => {
        if (isFocused) {
            getEvenementsByYear(new Date().getFullYear()).then((evenements) => {
                setEvenements(evenements);
                setLoading(false);
            });
        }
    }, [isFocused]);

    const OnPressAsync = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        router.push({
            pathname: '/formulaire/EvenementFormulaire',
            params: { parameter: null }
        })
    }

    if(loading) return (<ActivityIndicator size="large" color={Colors.colorPrimary} />);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: 'Gestion des événements',
                    headerBackTitle: 'Retour',
                }
            }>
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                            Gérer le calendrier des événements
                        </Text>

                        <ActionButton text="Ajouter" icon="plus" type="success" onPress={OnPressAsync} isLoading={loading} />
                    </View>

                    <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                    <TextInputFlat placeholder="Rechercher un événement" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
                    
                    <View style={{flexDirection: 'column', rowGap: 20, marginTop: 23}}>
                        {evenements.map((evenement, index) => (
                                <ActualiteFuture key={index} evenement={evenement} onPress={() =>{
                                    router.push({
                                        pathname: '/formulaire/EvenementFormulaire',
                                        params: { parameter: Evenement.toJson(evenement) }
                                    })
                                }}  />
                            ))}
                    </View>

                    <View style={{ marginBottom: 80 }} />

                </ScrollView>
            </View>
        </KeyboardAvoidingView> 
    )
}
export default GestionCalendrier;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
    ajoutBouton: {
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.colorSuccess,
    },
});