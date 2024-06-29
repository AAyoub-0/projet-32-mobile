// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { Stack, Link  } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';

// components
import Box from '@/components/Box';

// models
import { Evenement } from '@/models/Evenement';
import { Materiel } from "@/models/Materiel";
import { Reservation } from "@/models/Reservation";
import { Contact } from "@/models/Contact";

const Gestion = () => {

    const menus = [
        { text: 'Matériel', icon: 'wrench', link: '/gestion/GestionMateriel' },
        { text: 'Réservation', icon: 'calendar', link: '/gestion/GestionReservation'},
        { text: 'Calendrier', icon: 'newspaper-o', link: '/gestion/GestionCalendrier'},
        { text: 'Contact', icon: 'envelope', link: '/gestion/GestionContact'},
    ];

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
                                <Octicons name="feed-person" size={24} color={Colors.colorBlack} />
                            </TouchableOpacity>
                        </View>
                    ),
                }
            }> 
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                    <View style={styles.boxContainer}>
                        {menus.map((menu, index) => (
                            <Link href={menu.link} key={index} asChild>
                                <Box key={index} text={menu.text} icon={menu.icon} />
                            </Link>
                        ))}
                    </View>

                    <View style={{ marginBottom: 50 }} />
                    
                </ScrollView>
            </View>

            <StatusBar style="dark" />
        </KeyboardAvoidingView>
    )
}
export default Gestion;

const styles = StyleSheet.create({
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
    }
});