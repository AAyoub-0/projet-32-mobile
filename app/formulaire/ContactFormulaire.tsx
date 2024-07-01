// react-native
import { View, Text, Modal, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useNavigation } from "expo-router";

// services
import { createContact, deleteContact } from "@/services/ContactService";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// models
import { Contact } from "@/models/Contact";

const ContactFormulaire: React.FC = () => {

    const navigation = useNavigation();

    const { parameter } = useLocalSearchParams();

    const [contact, setContact] = useState<Contact>(new Contact(0, '', '', '', ''));
    const [titre, setTitre] = useState<string>('');
    const [reponse, setReponse] = React.useState('');
    const [objetReponse, setObjetReponse] = React.useState('Re: ');

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (parameter) {
            const contactParsed = Contact.fromJson(parameter as any);
            setContact(contactParsed);
            setTitre(contactParsed.nom + ' ' + contactParsed.prenom);
        }
    }, []);

    const HandleSendAsync = async () => {
        setLoading(true);
        try {
            await createContact(new Contact(
                0,
                contact.nom,
                contact.prenom,
                'admin@admin.com',
                reponse,
            ));
            alert('Votre réponse a bien été envoyée !');
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de la réponse:', error);
        }
        finally {
            setLoading(false);
            setModalVisible(false);
        }
    }

    const HandleDeleteAsync = async () => {
        setLoading(true);
        try {
            await deleteContact(contact.id);
            alert('Le message a bien été supprimé !');
            navigation.goBack();
        }
        catch (error) {
            console.error('Erreur lors de la suppression du message:', error);
        }
        finally {
            setLoading(false);
        }
    }

    const validate = () => {
        if(reponse.length === 0){
            alert('Veuillez renseigner un message');
            return false;
        }
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
                        <Text style={[Texts.textTitle, Texts.textSemiBold]}>
                            {titre}
                        </Text>
                        <ActionButton text="Supprimer" icon="trash" type="danger" onPress={HandleDeleteAsync} isLoading={loading} />
                    </View>
                    
                    <Line margin={10} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                    
                    <View style={{flexDirection: 'column', rowGap: 23}}>
                        <Text style={[Texts.textTitle, Texts.textBold]}>
                            {contact.email}
                        </Text>

                        <Text style={[Texts.textBody, Texts.textBold]}>
                            Message
                        </Text>
                        <Line margin={0} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGrayLight} rounded={false} />
                        <Text style={[Texts.textBodySmall, Texts.textSemiBold]}>
                            {contact.message}
                        </Text>
                        <Line margin={0} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGrayLight} rounded={false} />

                        <ActionButton style={{ alignSelf: 'flex-end' }} text="Répondre" icon="reply" type="success" onPress={() => setModalVisible(true)} isLoading={loading} />
                    </View>

                    <View style={{ marginBottom: 50 }} />

                </ScrollView>
            </View>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 50, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <ScrollView style={{  backgroundColor: Colors.colorWhite, padding: 20, borderRadius: 10}} alwaysBounceVertical={false} bounces={false}>
                        <View style={{ rowGap: 23 }}>
                            <Text style={[Texts.textTitle, Texts.textBold]}>
                                Réponse
                            </Text>
                            <TextInputFlat
                                placeholder="Entrez l'objet de votre réponse"
                                value={objetReponse}
                                onChangeText={setObjetReponse}
                                border={[1, 1, 1, 1]}
                                borderRadius={8}
                            />
                            <TextInputFlat
                                placeholder="Entrez votre message de réponse"
                                value={reponse}
                                onChangeText={setReponse}
                                height={300}
                                multiline={true}
                                numberOfLines={10}
                                border={[1, 1, 1, 1]}
                                borderRadius={8}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ActionButton text="Annuler" type="danger" onPress={() => setModalVisible(false)} isLoading={loading} />
                                <ActionButton text="Envoyer" type="success" onPress={HandleSendAsync} isLoading={loading} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

        </KeyboardAvoidingView>
    )
}
export default ContactFormulaire;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});