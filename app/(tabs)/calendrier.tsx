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
import ActualiteFuture from '@/components/ActualiteFuture';

// models
import { Evenement } from '@/models/Evenement';


const Calendrier = () => {

    const evenementFutur = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2024, 3, 2), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur2 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2024, 3, 9), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur3 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2024, 3, 16), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur4 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2024, 3, 23), 'Salle des fêtes', 'Venez nombreux', false);

    const evenements = [evenementFutur, evenementFutur2, evenementFutur3, evenementFutur4];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.colorBlack }}>Calendrier</Text>
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
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>
                    
                    <Text style={[Texts.textTitle, Texts.textBold, {width: '70%', marginBottom: 23}]}>
                        Calendrier des événements de l'année {new Date().getFullYear()}
                    </Text>

                    <View style={{rowGap: 23}}>
                        {evenements.map((evenement, index) => (
                            <ActualiteFuture key={index} evenement={evenement} />
                        ))}
                    </View>

                    <View style={{ marginBottom: 50 }} />
                    
                </ScrollView>
            </View>

            <StatusBar style="dark" />
        </KeyboardAvoidingView>
    )
}
export default Calendrier;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
});