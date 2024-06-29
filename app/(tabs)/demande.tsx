// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { Stack, router } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import DernieresActualite from '@/components/DerniereActualite';
import ActualiteFuture from '@/components/ActualiteFuture';
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// models
import { Evenement } from '@/models/Evenement';
import { Materiel } from "@/models/Materiel";
import { SafeAreaView } from "react-native-safe-area-context";

const Demande = () => {

    const headerHeight = useHeaderHeight()

    const materiel = new Materiel(1, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel2 = new Materiel(2, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel3 = new Materiel(3, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel4 = new Materiel(4, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel5 = new Materiel(5, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');

    const materiels = [materiel, materiel2, materiel3, materiel4, materiel5];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.colorBlack }}>Réserver</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end', marginRight: 20 }}>
                            <TouchableOpacity>
                                <Octicons name="feed-person" size={24} color={Colors.colorBlack} />
                            </TouchableOpacity>
                        </View>
                    ),
                }
            }> 
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                <View>
                    <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                        Demande de matériel
                    </Text>

                    <Text style={[Texts.textSubtitle, Texts.textBold, {marginBottom: 23}]}>
                        Les demandes de locations sont destinées uniquement aux habitants de Vaulx Milieu. Le matériel loué ne peut pas quitter la commune de Vaulx Milieu.
                    </Text>

                    <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                        Liste du matériel
                    </Text>

                    <View style={{marginBottom: 23}}>
                        <View style={{ flexDirection: 'column', rowGap: 10 }}>
                            <Text style={[Texts.textBodySmall2, Texts.textSemiBold]}>
                                Sélectionnez le matériel souhaité
                            </Text>
                            <TextInputFlat rightIcon={'search'} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Rechercher un matériel" />
                        </View>

                        {materiels.map((materiel, index) => (
                            <MaterielComponent key={index} materiel={materiel} showPrice={true} onPress={() => {
                                    router.push({
                                        pathname: '/demande/DemandeMateriel',
                                        params: { parameter: Materiel.toJson(materiel) }
                                    })
                            }} />
                        ))}
                </View>
        </View>
                    
                    <View style={{ height: 50 }}></View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Demande;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});