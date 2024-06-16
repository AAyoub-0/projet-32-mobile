// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from "expo-router";

// constants
import * as Colors from '../../constants/Colors';
import * as Texts from '../../constants/Texts';

// components
import DernieresActualite from '../../components/DerniereActualite';
import ActualiteFuture from '../../components/ActualiteFuture';
import Line from '../../components/Line';
import TextInputFlat from '../../components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// views
import ActualitesView from '../../views/ActualitesView';
import ComiteView from '../../views/ComiteView';
import ContactView from '../../views/ContactView';
import DemandeValidationView from '../../views/DemandeValidationView';
import DemandeListeView from '../../views/DemandeListeView';
import DemandeMaterielView from '../../views/DemandeMaterielView';

// models
import { Evenement } from '../../models/Evenement';
import { Materiel } from "../../models/Materiel";
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
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    header: () => (
                        <SafeAreaView style={{ 
                            backgroundColor: Colors.colorPrimary, 
                            paddingBottom: 5, 
                            paddingHorizontal: 20}} >
                            <View style={styles.hamburger}>
                                <TouchableOpacity>
                                    <FontAwesome name="bars" size={24} color={Colors.colorWhite} />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    )
                }}>  
            </Stack.Screen>

        <View style={{paddingTop: headerHeight }}>
            <ScrollView style={styles.container}>
                <DemandeValidationView materiel={materiel} />

                {/* <DemandeListeView materiels={materiels} /> */}

                {/* <DemandeMaterielView materiel={materiel} /> */}
                
                <View style={{ height: 50 }}></View>
            </ScrollView>
        </View>
    </KeyboardAvoidingView>
    )
}
export default Demande;

const styles = StyleSheet.create({
    hamburger: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 5,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
});