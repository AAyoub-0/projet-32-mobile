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

// views
import ActualitesView from '../../views/ActualitesView';
import ComiteView from '../../views/ComiteView';
import ContactView from '../../views/ContactView';

// models
import { Evenement } from '../../models/Evenement';
import { SafeAreaView } from "react-native-safe-area-context";

const Actualites = () => {

    const headerHeight = useHeaderHeight()

    return (
        <View style={styles.container}>
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
                </ScrollView>
            </View>
        </View>
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
});