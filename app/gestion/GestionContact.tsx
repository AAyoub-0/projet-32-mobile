// react-native
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Stack, router } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActualiteFuture from "@/components/ActualiteFuture";
import MessageComponent from "@/components/MessageComponent";

// models
import { Contact } from "@/models/Contact";

const GestionContact = () => {

    const message = new Contact(1, 'Dupont', 'Jean', 'Besoin spécifique pour une fête', 'jeandupont.assoc@gmail.com', 'Bonjour je souhaiterais louer du matériel pour une fête de famille');
    const message2 = new Contact(2, 'Durand', 'Paul', 'Demande de renseignements', 'paul.d@sfr.fr', 'Bonjour, je souhaiterais avoir des informations sur les tarifs de location de matériel');
    const message3 = new Contact(3, 'Martin', 'Marie', 'Demande de réservation', 'martin.marie@gmail.com', 'Bonjour, je souhaiterais réserver du matériel pour une fête de famille');
    const message4 = new Contact(4, 'Lefevre', 'Lucie', 'Demande de devis', 'l.lefevre@yahoo.com', 'Bonjour, je souhaiterais un devis pour une location de matériel');

    const messages = [message, message2, message3, message4];

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
                <ScrollView style={styles.container}>

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