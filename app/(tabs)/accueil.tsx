// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import { Stack, router } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// views
import ActualitesView from '@/views/ActualitesView';
import ComiteView from '@/views/ComiteView';
import ContactView from '@/views/ContactView';

// models
import { SafeAreaView } from "react-native-safe-area-context";

const Accueil = () => {
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