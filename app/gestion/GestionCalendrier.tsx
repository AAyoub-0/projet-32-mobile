// react-native
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, router } from "expo-router";

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

    const [loading, setLoading] = useState(false);

    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement3 = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2021, 3, 2), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement4 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2023, 7, 9), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement5 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2023, 3, 16), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement6 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2021, 3, 23), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement7 = new Evenement(7, 'CSV - TOURNOI u14 u15 - GYMNASE', new Date(2024, 3, 30), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenements = [evenement, evenement2, evenement3, evenement4, evenement5, evenement6, evenement7];

    const OnPressAsync = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        router.push({
            pathname: '/formulaire/EvenementFormulaire',
            params: { parameter: null }
        })
    }

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