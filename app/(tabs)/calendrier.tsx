// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import { Stack, router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

// service
import { getEvenementsByYear } from '@/services/EvenementService';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import ActualiteFuture from '@/components/ActualiteFuture';

// models
import { Evenement } from '@/models/Evenement';


const Calendrier = () => {

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

    if(loading) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.colorPrimary} />
        </View>
    )


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
                            <TouchableOpacity onPress={() => {
                                    router.push('/utilisateur/Profile');
                                }}>
                                <Octicons name="feed-person" size={24} color={Colors.colorBlack} />
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