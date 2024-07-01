// react-native
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { Stack, router } from "expo-router";
import React,{ useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

// services
import { getContacts } from "@/services/ContactService";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import MessageComponent from "@/components/MessageComponent";

// models
import { Contact } from "@/models/Contact";

const GestionContact = () => {

    const isFocused = useIsFocused();

    const [messages, setMessages] = React.useState<Contact[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    useEffect(() => {
        if(isFocused){
            setIsLoading(true);
            getContacts().then((data) => {
                setMessages(data);
            }).catch((error) => {
                console.error('Erreur lors de la récupération des contacts:', error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [isFocused]);

    if(isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={Colors.colorPrimary} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: 'Gestion des contacts',
                    headerBackTitle: 'Retour',
                }
            }>
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                            Gérer les messages
                        </Text>
                    </View>

                    <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                    <TextInputFlat placeholder="Rechercher un message" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
                    
                    <View style={{flexDirection: 'column', rowGap: 20, marginTop: 23}}>
                        {messages.map((contact, index) => (
                            <MessageComponent key={index} contact={contact} onPress={() => {
                                router.push({
                                    pathname: '/formulaire/ContactFormulaire',
                                    params: { parameter: Contact.toJson(contact) }
                                })
                            }} />
                        ))}
                    </View>

                    <View style={{ marginBottom: 80 }} />
                    
                </ScrollView>
            </View>
        </KeyboardAvoidingView> 
    )
}
export default GestionContact;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
    ajoutBouton: {
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.colorSuccess,
    },
});