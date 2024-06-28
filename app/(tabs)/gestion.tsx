// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import DernieresActualite from '@/components/DerniereActualite';
import ActualiteFuture from '@/components/ActualiteFuture';
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import Box from '@/components/Box';
import MaterielComponent from "@/components/MaterielComponent";
import ReservationComponent from "@/components/ReservationComponent";


// views
import ActualitesView from '@/views/ActualitesView';
import ComiteView from '@/views/ComiteView';
import ContactView from '@/views/ContactView';
import MaterielView from '@/views/MaterielView';
import GestionMaterielView from "@/views/GestionMaterielView";
import MaterielFormulaireView from "@/views/MaterielFormulaireView";
import GestionReservationView from "@/views/GestionReservationView";
import ReservationFormulaireView from "@/views/ReservationFormulaireView";
import GestionCalendrierView from "@/views/GestionCalendrierView";
import EvenementFormulaireView from "@/views/EvenementFormulaireView";
import GestionContactView from "@/views/GestionContactView";
import ContactFormulaireView from "@/views/ContactFormulaireView";

// models
import { Evenement } from '@/models/Evenement';
import { SafeAreaView } from "react-native-safe-area-context";
import { Materiel } from "@/models/Materiel";
import { Reservation } from "@/models/Reservation";
import { Contact } from "@/models/Contact";

const Gestion = () => {

    const menus = [
        { text: 'Matériel', icon: 'wrench' },
        { text: 'Réservation', icon: 'calendar' },
        { text: 'Calendrier', icon: 'newspaper-o' },
        { text: 'Contact', icon: 'envelope' },
    ];

    const materiel = new Materiel(1, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel2 = new Materiel(2, 'Parapluie', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel3 = new Materiel(3, 'Chaise de camping', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel4 = new Materiel(4, 'Table 10x2m', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel5 = new Materiel(5, 'Camion', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const nullMateriel = new Materiel(0, '', 0, false, 0, 0, '');

    const materiels = [materiel, materiel2, materiel3, materiel4, materiel5];

    const reservation = new Reservation(1, new Date(), new Date(), materiel, 1, 'En attente', null, null);
    const reservation2 = new Reservation(2, new Date(), new Date(), materiel2, 3, 'En attente', null, null);
    const reservation3 = new Reservation(3, new Date(), new Date(), materiel3, 20, 'Terminée', null, null);
    const reservation4 = new Reservation(4, new Date(), new Date(), materiel4, 2, 'En attente', null, null);
    const reservation5 = new Reservation(5, new Date(), new Date(), materiel5, 1, 'Terminée', null, null);

    const reservations = [reservation, reservation2, reservation3, reservation4, reservation5];

    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement3 = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2021, 3, 2), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement4 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2023, 7, 9), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement5 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2023, 3, 16), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement6 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2021, 3, 23), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement7 = new Evenement(7, 'CSV - TOURNOI u14 u15 - GYMNASE', new Date(2024, 3, 30), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenements = [evenement, evenement2, evenement3, evenement4, evenement5, evenement6, evenement7];

    const message = new Contact(1, 'Dupont', 'Jean', 'Besoin spécifique pour une fête', 'jeandupont.assoc@gmail.com', 'Bonjour je souhaiterais louer du matériel pour une fête de famille');
    const message2 = new Contact(2, 'Durand', 'Paul', 'Demande de renseignements', 'paul.d@sfr.fr', 'Bonjour, je souhaiterais avoir des informations sur les tarifs de location de matériel');
    const message3 = new Contact(3, 'Martin', 'Marie', 'Demande de réservation', 'martin.marie@gmail.com', 'Bonjour, je souhaiterais réserver du matériel pour une fête de famille');
    const message4 = new Contact(4, 'Lefevre', 'Lucie', 'Demande de devis', 'l.lefevre@yahoo.com', 'Bonjour, je souhaiterais un devis pour une location de matériel');

    const messages = [message, message2, message3, message4];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.colorBlack }}>Gestion</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end', marginRight: 20 }}>
                            <TouchableOpacity>
                                <FontAwesome name="bars" size={24} color={Colors.colorBlack} />
                            </TouchableOpacity>
                        </View>
                    ),
                }
            }> 
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container}>

                    <View style={styles.boxContainer}>
                        {menus.map((menu, index) => (
                            <Box key={index} text={menu.text} icon={menu.icon} onPress={() => false} />
                        ))}
                    </View>

                    {/* <GestionMaterielView materiels={materiels} /> */}
                    
                    {/* <MaterielFormulaireView materiel={nullMateriel} /> */}

                    {/*  */}

                    {/* <GestionReservationView reservations={reservations} /> */}

                    {/* <ReservationFormulaireView reservation={reservation} /> */}

                    {/* <GestionCalendrierView evenements={evenements} /> */}

                    {/* <EvenementFormulaireView evenement={evenement} /> */}

                    {/* <GestionContactView contacts={messages} /> */}

                    {/* <ContactFormulaireView contact={message} /> */}

                    <View style={{ marginBottom: 50 }} />
                    
                </ScrollView>
            </View>

            <StatusBar style="dark" />
        </KeyboardAvoidingView>
    )
}
export default Gestion;

const styles = StyleSheet.create({
    hamburger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
    boxContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        rowGap: 20 
    },
    ajoutBouton: {
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.colorSuccess,
    }
});