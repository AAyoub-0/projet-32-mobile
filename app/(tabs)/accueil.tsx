// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { FontAwesome } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import { Stack, router } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import DernieresActualite from '@/components/DerniereActualite';
import ActualiteFuture from '@/components/ActualiteFuture';
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';

// views
import ActualitesView from '@/views/ActualitesView';
import ComiteView from '@/views/ComiteView';
import ContactView from '@/views/ContactView';

// models
import { Evenement } from '@/models/Evenement';
import { SafeAreaView } from "react-native-safe-area-context";

const Accueil = () => {
    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenementFutur = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2024, 3, 2), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur2 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2024, 3, 9), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur3 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2024, 3, 16), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur4 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2024, 3, 23), 'Salle des fêtes', 'Venez nombreux', false);

    const headerHeight = useHeaderHeight()

    const [selected, setSelected] = useState('actualites');

    const handleSelected = (selected: string) => {
        setSelected(selected);
    }

    return (        
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    header: () => (
                        <SafeAreaView style={{ 
                            backgroundColor: Colors.colorPrimary,
                            paddingHorizontal: 20, 
                            height: 120 }} >
                            <View style={styles.hamburger}>
                                <TouchableOpacity onPress={() => {
                                    router.push('/utilisateur/Profile');
                                }}>
                                    <Octicons name="feed-person" size={24} color={Colors.colorWhite} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menus}>
                                <TouchableOpacity style={selected == 'actualites' ? styles.menuSelected : styles.menu} 
                                    onPress={_ => handleSelected('actualites')}>
                                    <Text style={Texts.textLinkWhite}>Actualités</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={selected == 'comité' ? styles.menuSelected : styles.menu} 
                                    onPress={_ => handleSelected('comité')}>
                                    <Text style={Texts.textLinkWhite}>Le Comité</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={selected == 'contacte' ? styles.menuSelected : styles.menu}
                                    onPress={_ => handleSelected('contacte')}>
                                    <Text style={Texts.textLinkWhite}>Nous contacter</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    )
                }}>  
            </Stack.Screen>

            <View style={{paddingTop: headerHeight }}>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>
                    
                    {selected == 'actualites' && <ActualitesView />}

                    {selected == 'comité' && <ComiteView />}

                    {selected == 'contacte' && <ContactView />}

                    <View style={{ marginBottom: 50 }} />

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Accueil;

const styles = StyleSheet.create({
    hamburger: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    menus: {
        flexDirection: 'row',
        columnGap: 20,
    },
    menu: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    menuSelected: {
        backgroundColor: Colors.colorBorderLight,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
    actualiteFuture: {
        flexDirection: 'column',
        rowGap: 23
    },
    leComite: {
        backgroundColor: Colors.colorWhite,
        paddingHorizontal: 15,
        paddingVertical: 17,
        borderRadius: 10,
        shadowColor: Colors.colorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    membre: {
        flexDirection: 'row',
        backgroundColor: Colors.colorSecondary,
        marginHorizontal: 20,
    }
});