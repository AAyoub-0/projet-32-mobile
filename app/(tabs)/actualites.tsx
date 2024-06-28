// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
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

// views
import ActualitesView from '@/views/ActualitesView';
import ComiteView from '@/views/ComiteView';
import ContactView from '@/views/ContactView';

// models
import { Evenement } from '@/models/Evenement';
import { SafeAreaView } from "react-native-safe-area-context";


const Actualites = () => {

    const headerHeight = useHeaderHeight()

    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement3 = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2021, 3, 2), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement4 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2023, 7, 9), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement5 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2023, 3, 16), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement6 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2021, 3, 23), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');
    const evenement7 = new Evenement(7, 'CSV - TOURNOI u14 u15 - GYMNASE', new Date(2024, 3, 30), 'Salle des fêtes', 'Venez nombreux', false, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenements = [evenement, evenement2, evenement3, evenement4, evenement5, evenement6, evenement7];

    let years = evenements.map(e => e.date.getFullYear());
    years = [...new Set(years)];
    // order years by descending
    years.sort((a, b) => b - a);

    const evenementsByYear = years.map(year => {
        return {
            year: year,
            months: evenements.filter(e => e.date.getFullYear() === year).map(e => e.date.getMonth()),
            evenements: evenements.filter(e => e.date.getFullYear() === year)
        }
    });

    const [selected, setSelected] = useState(evenementsByYear[0].year);
    const [selectedMonth, setSelectedMonth] = useState(evenementsByYear[0].months);

    const handleSelected = (selected: number) => {
        setSelected(selected);
        handleSelectedMonth([...new Set(evenementsByYear.find(e => e.year === selected)?.months)] || []);
    }

    const handleSelectedMonth = (selected: Array<number>) => {
        setSelectedMonth(selected);
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
                            paddingBottom: 5, 
                            paddingHorizontal: 20,
                            height: 140 }} >
                            <View style={styles.hamburger}>
                                <TouchableOpacity>
                                    <FontAwesome name="bars" size={24} color={Colors.colorWhite} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menus}>
                                {years.map((year, key) => {
                                    return (
                                        <TouchableOpacity key={key} style={selected == year ? styles.menuSelected : styles.menu} 
                                            onPress={_ => handleSelected(year)}>
                                            <Text style={Texts.textLinkWhite}>{year}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </SafeAreaView>
                    )
                }}>  
            </Stack.Screen>

            <View style={{paddingTop: headerHeight }}>
                <ScrollView style={styles.container}>
                    <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                        Les actualités de Vaulx-Millieu
                    </Text>

                    {selectedMonth.map((month, key) => {
                        return (
                            <View key={key} style={{ marginBottom: 23 }}>
                                <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 10}]}>
                                    {new Date(2021, month, 1).toLocaleString('fr', { month: 'long' }).charAt(0).toUpperCase() + new Date(2021, month, 1).toLocaleString('fr', { month: 'long' }).slice(1) + ' ' + selected}
                                </Text>
                                <View style={{ flexDirection: 'column', rowGap: 15 }}>
                                    {evenementsByYear.find(e => e.year === selected)?.evenements.filter(e => e.date.getMonth() === month).map((evenement, key) => {
                                        return (
                                            <DernieresActualite key={key} evenement={evenement} />
                                        )
                                    })}
                                </View>
                            </View>
                        )
                    })}

                    <View style={{ height: 50 }}></View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Actualites;

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
    menus: {
        flexDirection: 'row',
        columnGap: 20,
        paddingVertical: 10,
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
});